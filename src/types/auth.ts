export interface AuthUser {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  role?: string;
  avatar_url?: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user: AuthUser;
}
