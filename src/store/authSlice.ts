import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthUser } from '../types/auth';
import { clearStoredAuth, setStoredAuth, setStoredRefreshToken } from '../lib/auth/storage';
import { googleLoginThunk } from '../controllers/authController';

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  hydrated: boolean;
  authLoading: boolean;
  authError: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  hydrated: false,
  authLoading: false,
  authError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: AuthUser; token: string }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.authError = null;
      setStoredAuth(action.payload.token, action.payload.user);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.authError = null;
      clearStoredAuth();
    },
    setHydrated: (
      state,
      action: PayloadAction<{ user: AuthUser | null; token: string | null }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = !!action.payload.token;
      state.hydrated = true;
    },
    clearAuthError: (state) => {
      state.authError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleLoginThunk.pending, (state) => {
        state.authLoading = true;
        state.authError = null;
      })
      .addCase(googleLoginThunk.fulfilled, (state, action) => {
        state.authLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.authError = null;
        setStoredAuth(action.payload.token, action.payload.user);
        if (action.payload.refreshToken) {
          setStoredRefreshToken(action.payload.refreshToken);
        }
      })
      .addCase(googleLoginThunk.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = action.payload as string;
      });
  },
});

export const { setCredentials, logout, setHydrated, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
