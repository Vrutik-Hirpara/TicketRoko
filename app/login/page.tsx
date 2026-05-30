'use client';

import { FormEvent, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthPageLayout } from '../../src/components/auth/AuthPageLayout';
import { loginUser } from '../../src/controllers/authController';
import { setCredentials } from '../../src/store/authSlice';
import { useCompletePendingBooking } from '../../src/hooks/useCompletePendingBooking';
import type { AppDispatch } from '../../src/store';

function LoginForm() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { completeIfPending, completing } = useCompletePendingBooking();

  const returnUrl = searchParams.get('returnUrl') || '/';
  const checkout = searchParams.get('checkout') === '1';

  // Build clean URL without redundant query parameters
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const busy = loading || completing;

  return (
    <AuthPageLayout
      title="Sign in to continue"
      subtitle={
        checkout
          ? 'Log in to complete your seat booking'
          : 'Welcome back to TicketRoko'
      }
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link
            href={registerHref}
            className="font-semibold hover:underline"
            style={{ color: 'var(--primary-blue)' }}
          >
            Register
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-gray-400 hover:text-gray-200 transition-colors"
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
          className="w-full py-3.5 rounded-xl font-bold text-[15px] flex items-center justify-center gap-2 disabled:opacity-60"
          style={{ background: 'var(--primary-blue)', color: 'var(--white)' }}
        >
          {busy ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
          {completing ? 'Completing booking…' : busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </AuthPageLayout>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: 'var(--booking-bg)' }}
        >
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--primary-blue)' }} />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
