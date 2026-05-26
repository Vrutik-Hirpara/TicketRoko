import type { AuthResponse, LoginCredentials, RegisterCredentials } from '../types/auth';
import { postJson } from '../lib/api/postJson';
import { setStoredRefreshToken } from '../lib/auth/storage';

interface AuthApiData {
  accessToken?: string;
  access_token?: string;
  token?: string;
  refreshToken?: string;
  refresh_token?: string;
  user?: AuthResponse['user'];
}

interface AuthApiResult {
  success?: boolean;
  data?: AuthApiData;
  message?: string;
}

function parseAuthResponse(result: AuthApiResult): AuthResponse {
  // Try to use result.data, or fall back to the result object itself
  const data = result.data || (result as any);
  
  if (!data) {
    throw new Error(result.message || 'Invalid auth response from server');
  }

  const token = data.accessToken ?? 
                data.access_token ?? 
                data.token ?? 
                (result as any).token ?? 
                (result as any).accessToken ?? 
                (result as any).access_token;

  let user = data.user ?? (result as any).user;
  
  // If the user fields are at the container level rather than nested under 'user'
  if (!user && (data.email || data.id || (result as any).email)) {
    user = data;
  }

  const refreshToken = data.refreshToken ?? 
                       data.refresh_token ?? 
                       (result as any).refreshToken ?? 
                       (result as any).refresh_token;

  if (!token || !user) {
    const isSuccess = result.success === true || 
                     (result.message && /success/i.test(result.message)) ||
                     (data && (data.success === true || (data.message && /success/i.test(data.message))));

    if (isSuccess) {
      return {
        token: token || '',
        refreshToken: refreshToken || '',
        user: {
          id: user?.id || 0,
          name: user?.name || 'User',
          email: user?.email || '',
          phone: user?.phone ?? null,
          role: user?.role || 'User',
          avatar_url: user?.avatar_url ?? null,
        },
      };
    }
    throw new Error(result.message || 'Invalid auth response from server');
  }

  if (refreshToken) {
    setStoredRefreshToken(refreshToken);
  }

  return {
    token,
    refreshToken,
    user: {
      id: user.id || 0,
      name: user.name || 'User',
      email: user.email || '',
      phone: user.phone ?? null,
      role: user.role || 'User',
      avatar_url: user.avatar_url ?? null,
    },
  };
}

export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
  const result = await postJson<AuthApiResult>('/auth/login', {
    email: credentials.email.trim(),
    password: credentials.password,
  });

  return parseAuthResponse(result);
}

export async function registerUser(credentials: RegisterCredentials): Promise<AuthResponse> {
  const result = await postJson<AuthApiResult>('/auth/register', {
    name: credentials.name.trim(),
    email: credentials.email.trim(),
    password: credentials.password,
  });

  return parseAuthResponse(result);
}
