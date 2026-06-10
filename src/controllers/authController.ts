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

export async function refreshAuthToken(refreshToken: string): Promise<{ accessToken: string; refreshToken?: string }> {
  const result = await postJson<AuthApiResult>('/auth/refresh', {
    refreshToken,
  });

  const data = result.data || (result as any);
  if (!data) {
    throw new Error(result.message || 'Invalid refresh response from server');
  }

  const newToken = data.accessToken ?? 
                   data.access_token ?? 
                   data.token ?? 
                   (result as any).token ?? 
                   (result as any).accessToken ?? 
                   (result as any).access_token;

  const newRefreshToken = data.refreshToken ?? 
                          data.refresh_token ?? 
                          (result as any).refreshToken ?? 
                          (result as any).refresh_token;

  if (!newToken || result.success === false) {
    throw new Error(result.message || 'Invalid refresh token');
  }

  if (newRefreshToken) {
    const { setStoredRefreshToken } = await import('../lib/auth/storage');
    setStoredRefreshToken(newRefreshToken);
  }

  return { accessToken: newToken, refreshToken: newRefreshToken };
}

// ── Google OAuth thunk ────────────────────────────────────────────────────────
import { createAsyncThunk } from '@reduxjs/toolkit';

interface GoogleAuthPayload {
  /** Raw Google OAuth access token from useGoogleLogin */
  accessToken: string;
  /** kept for backward-compat with GoogleLoginButton props */
  mode?: 'login' | 'register';
}

export const googleLoginThunk = createAsyncThunk<AuthResponse, GoogleAuthPayload>(
  'auth/googleLogin',
  async ({ accessToken }, { rejectWithValue }) => {
    try {
      const result = await postJson<AuthApiResult>('/auth/google-login', {
        token: accessToken,
      });

      return parseAuthResponse(result);
    } catch (err: any) {
      return rejectWithValue(err.message || 'Google login failed. Please try again.');
    }
  }
);

