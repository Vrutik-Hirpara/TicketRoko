'use client';

import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';
import { googleLoginThunk } from '../../controllers/authController';
import type { AppDispatch, RootState } from '../../store';

interface GoogleLoginButtonProps {
  returnUrl?: string;
  onError?: (msg: string) => void;
  onSuccess?: (token: string, user: any) => Promise<void> | void;
  mode?: 'login' | 'register';
}

export function GoogleLoginButton({
  returnUrl = '/',
  onError,
  onSuccess,
  mode = 'login',
}: GoogleLoginButtonProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { authLoading, authError } = useSelector((state: RootState) => state.auth);

  const handleSuccess = async (accessToken: string) => {
    const result = await dispatch(googleLoginThunk({ accessToken, mode }));

    if (googleLoginThunk.fulfilled.match(result)) {
      const { token, user } = result.payload;
      if (onSuccess) {
        await onSuccess(token, user);
      } else {
        window.location.href = returnUrl;
      }
    } else {
      const msg =
        (result.payload as string) || 'Google login failed. Please try again.';
      onError?.(msg);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (response) => handleSuccess(response.access_token),
    onError: () => onError?.('Google sign-in was cancelled or failed.'),
  });

  return (
    <button
      type="button"
      disabled={authLoading}
      onClick={() => login()}
      className="flex items-center justify-center w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-60 gap-2"
      style={{
        background: '#fff',
        color: '#1f2937',
        border: '1.5px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = '#f9fafb';
        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.10)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = '#fff';
        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
      }}
    >
      {authLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" style={{ color: '#4285F4' }} />
      ) : (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
          <path fill="#4285F4" d="M533.5 278.4c0-18.5-1.6-36.3-4.6-53.5H272v101.1h147.6c-6.4 34.4-25.4 63.5-54.3 82.9v68.7h87.6c51.3-47.3 80.6-117 80.6-199.2z"/>
          <path fill="#34A853" d="M272 544.3c73.5 0 135.2-24.4 180.3-66.2l-87.6-68.7c-24.3 16.3-55.3 25.9-92.7 25.9-71.3 0-131.9-48-153.6-112.6h-90v70.7c45.2 89.5 138.5 151.9 243.6 151.9z"/>
          <path fill="#FBBC05" d="M118.4 322.7c-10.5-31.6-10.5-65.6 0-97.2v-70.7h-90c-36.5 71.9-36.5 158.5 0 230.4l90-62.5z"/>
          <path fill="#EA4335" d="M272 107.7c39.9-.6 78.5 14.8 107.5 42.6l80.4-80.4C399.5 20.4 336.9-.8 272 .1 166.9.1 73.6 62.5 28.4 152l90 62.5c21.7-64.6 82.3-112.6 153.6-112.6z"/>
        </svg>
      )}
      {authLoading ? 'Signing in…' : 'Continue with Google'}
    </button>
  );
}
