'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleLoginButton } from './GoogleLoginButton';
import { loginUser } from '../../controllers/authController';
import { setCredentials } from '../../store/authSlice';
import { useCompletePendingBooking } from '../../hooks/useCompletePendingBooking';
import type { AppDispatch } from '../../store';

interface LoginFormComponentProps {
  returnUrl?: string;
  checkout?: boolean;
  onSuccess?: () => void;
}

export function LoginFormComponent({ returnUrl = '/', checkout = false, onSuccess }: LoginFormComponentProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { completeIfPending, completing } = useCompletePendingBooking();

  const registerHref = (returnUrl === '/' && !checkout)
    ? '/register'
    : `/register?returnUrl=${encodeURIComponent(returnUrl)}${checkout ? '&checkout=1' : ''}`;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { token, user } = await loginUser({ email, password });
      dispatch(setCredentials({ token, user }));
      await completeIfPending(returnUrl, checkout);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (token: string, user: any) => {
    dispatch(setCredentials({ token, user }));
    await completeIfPending(returnUrl, checkout);
    if (onSuccess) onSuccess();
  };

  const busy = loading || completing;

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Google Sign-In */}
        <div className="flex flex-col gap-3">
          <GoogleLoginButton
            returnUrl={returnUrl}
            mode="login"
            onSuccess={handleGoogleSuccess}
            onError={(msg) => setError(msg)}
          />
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: 'var(--booking-border)' }} />
            <span className="text-xs" style={{ color: 'var(--booking-text-muted)' }}>or</span>
            <div className="flex-1 h-px" style={{ background: 'var(--booking-border)' }} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="text-sm px-4 py-3 rounded-xl border border-red-200 text-red-700 bg-red-50 font-medium flex items-center gap-2"
            >
              <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold shrink-0 select-none">
                ✕
              </div>
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--booking-text-muted)' }}>
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--booking-text-muted)' }} />
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin123@gmail.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none focus:ring-2"
              style={{
                background: 'var(--booking-surface-elevated)',
                color: 'var(--booking-text)',
                border: '1px solid var(--booking-border)',
              }}
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--booking-text-muted)' }}>
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--booking-text-muted)' }} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none focus:ring-2"
              style={{
                background: 'var(--booking-surface-elevated)',
                color: 'var(--booking-text)',
                border: '1px solid var(--booking-border)',
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <Eye className="w-4 h-4" style={{ color: 'var(--booking-text-muted)' }} />
              ) : (
                <EyeOff className="w-4 h-4" style={{ color: 'var(--booking-text-muted)' }} />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={busy}
          className="w-full py-3.5 rounded-xl font-bold text-[15px] flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
          style={{ background: 'var(--primary-blue)', color: 'var(--white)' }}
        >
          {busy ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
          {completing ? 'Completing booking…' : busy ? 'Signing in…' : 'Sign in'}
        </button>
        
        <p className="text-xs text-center text-gray-500 mt-2">
          By continuing, you agree to our{' '}
          <Link href="/terms-conditions" className="text-blue-600 hover:underline">Terms & Conditions</Link>
          {' '}and{' '}
          <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
        </p>
      </form>
    </div>
  );
}
