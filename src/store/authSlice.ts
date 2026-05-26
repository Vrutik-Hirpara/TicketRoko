import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthUser } from '../types/auth';
import { clearStoredAuth, setStoredAuth } from '../lib/auth/storage';

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  hydrated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  hydrated: false,
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
      setStoredAuth(action.payload.token, action.payload.user);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
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
  },
});

export const { setCredentials, logout, setHydrated } = authSlice.actions;
export default authSlice.reducer;
