'use client';

import { FormEvent, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthPageLayout } from '../../src/components/auth/AuthPageLayout';
import { GoogleLoginButton } from '../../src/components/auth/GoogleLoginButton';
import { loginUser } from '../../src/controllers/authController';
import { setCredentials } from '../../src/store/authSlice';
import { useCompletePendingBooking } from '../../src/hooks/useCompletePendingBooking';
import type { AppDispatch } from '../../src/store';

import { LoginFormComponent } from '../../src/components/auth/LoginFormComponent';

function LoginForm() {
  const searchParams = useSearchParams();

  const returnUrl = searchParams.get('returnUrl') || '/';
  const checkout = searchParams.get('checkout') === '1';

  const registerHref = (returnUrl === '/' && !checkout)
    ? '/register'
    : `/register?returnUrl=${encodeURIComponent(returnUrl)}${checkout ? '&checkout=1' : ''}`;

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
      <LoginFormComponent returnUrl={returnUrl} checkout={checkout} />
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
