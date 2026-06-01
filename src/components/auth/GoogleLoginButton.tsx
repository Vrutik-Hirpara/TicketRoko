'use client';

import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { loginUser, registerUser } from '../../controllers/authController';
import { setCredentials } from '../../store/authSlice';
import type { AppDispatch } from '../../store';

interface GoogleLoginButtonProps {
  returnUrl?: string;
  onError?: (msg: string) => void;
  onSuccess?: (token: string, user: any) => Promise<void> | void;
  /** If true, will try register first then login on conflict */
  mode?: 'login' | 'register';
}

interface GoogleUserInfo {
  name: string;
  email: string;
  sub: string;
}

async function fetchGoogleUserInfo(accessToken: string): Promise<GoogleUserInfo> {
  const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error('Failed to fetch Google profile');
  return res.json();
}

/**
 * Derives a stable password from a Google user's sub (unique Google ID).
 * This lets users who sign in with Google always authenticate consistently
 * against the existing email/password backend.
 */
function derivePassword(sub: string): string {
  return `G-${sub.slice(0, 12)}`;
}

export function GoogleLoginButton({ returnUrl = '/', onError, onSuccess, mode = 'login' }: GoogleLoginButtonProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const handleSuccess = async (accessToken: string) => {
    setLoading(true);
    try {
      const profile = await fetchGoogleUserInfo(accessToken);
      const { name, email, sub } = profile;
      const password = derivePassword(sub);

      let token: string;
      let user: Awaited<ReturnType<typeof loginUser>>['user'];

      if (mode === 'register') {
        // Try register first; if email already taken, fall back to login
        try {
          const res = await registerUser({ name, email, password });
          token = res.token;
          user = res.user;
        } catch {
          // email already exists — log them in
          const res = await loginUser({ email, password });
          token = res.token;
          user = res.user;
        }
      } else {
        // Try login first; if not found, register automatically
        try {
          const res = await loginUser({ email, password });
          token = res.token;
          user = res.user;
        } catch {
          // User doesn't exist yet — register them
          const res = await registerUser({ name, email, password });
          token = res.token;
          user = res.user;
        }
      }

      if (onSuccess) {
        await onSuccess(token, user);
      } else {
        dispatch(setCredentials({ token, user }));
        window.location.href = returnUrl;
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Google login failed. Please try again.';
      onError?.(msg);
    } finally {
      setLoading(false);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (response) => handleSuccess(response.access_token),
    onError: () => onError?.('Google sign-in was cancelled or failed.'),
  });

  return (
    <button
      type="button"
      disabled={loading}
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
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" style={{ color: '#4285F4' }} />
      ) : (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
          <path fill="#4285F4" d="M533.5 278.4c0-18.5-1.6-36.3-4.6-53.5H272v101.1h147.6c-6.4 34.4-25.4 63.5-54.3 82.9v68.7h87.6c51.3-47.3 80.6-117 80.6-199.2z"/>
          <path fill="#34A853" d="M272 544.3c73.5 0 135.2-24.4 180.3-66.2l-87.6-68.7c-24.3 16.3-55.3 25.9-92.7 25.9-71.3 0-131.9-48-153.6-112.6h-90v70.7c45.2 89.5 138.5 151.9 243.6 151.9z"/>
          <path fill="#FBBC05" d="M118.4 322.7c-10.5-31.6-10.5-65.6 0-97.2v-70.7h-90c-36.5 71.9-36.5 158.5 0 230.4l90-62.5z"/>
          <path fill="#EA4335" d="M272 107.7c39.9-.6 78.5 14.8 107.5 42.6l80.4-80.4C399.5 20.4 336.9-.8 272 .1 166.9.1 73.6 62.5 28.4 152l90 62.5c21.7-64.6 82.3-112.6 153.6-112.6z"/>
        </svg>
      )}
      {loading ? 'Signing in…' : 'Continue with Google'}
    </button>
  );
}
