'use client';

import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
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
  const { authLoading } = useSelector((state: RootState) => state.auth);

  const handleCredentialResponse = async (response: CredentialResponse) => {
    if (!response.credential) {
      onError?.('No credential received from Google.');
      return;
    }

    // response.credential is the Google ID token (JWT) — exactly what the backend expects
    const result = await dispatch(googleLoginThunk({ accessToken: response.credential, mode }));

    if (googleLoginThunk.fulfilled.match(result)) {
      const { token, user } = result.payload;
      if (onSuccess) {
        await onSuccess(token, user);
      } else {
        window.location.href = returnUrl;
      }
    } else {
      const msg = (result.payload as string) || 'Google login failed. Please try again.';
      onError?.(msg);
    }
  };

  if (authLoading) {
    return (
      <div
        className="flex items-center justify-center w-full py-3.5 rounded-xl font-semibold text-sm gap-2"
        style={{
          background: '#fff',
          color: '#1f2937',
          border: '1.5px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}
      >
        <Loader2 className="w-5 h-5 animate-spin" style={{ color: '#4285F4' }} />
        Signing in…
      </div>
    );
  }

  return (
    <div className="w-full [&>div]:w-full">
      <GoogleLogin
        onSuccess={handleCredentialResponse}
        onError={() => onError?.('Google sign-in was cancelled or failed.')}
        size="large"
        width="400"
        theme="outline"
        text="continue_with"
        shape="pill"
      />
    </div>
  );
}
