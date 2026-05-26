'use client';

import Link from 'next/link';
import { Ticket } from 'lucide-react';

interface AuthPageLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export function AuthPageLayout({ title, subtitle, children, footer }: AuthPageLayoutProps) {
  return (
    <div
      className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4 py-10"
      style={{ background: 'var(--booking-bg)' }}
    >
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
            style={{ background: 'var(--primary-blue)' }}
          >
            <Ticket className="w-6 h-6" style={{ color: 'var(--white)' }} />
          </div>
          <h1 className="text-2xl font-bold text-center" style={{ color: 'var(--booking-text)' }}>
            {title}
          </h1>
          <p className="text-sm text-center mt-2" style={{ color: 'var(--booking-text-muted)' }}>
            {subtitle}
          </p>
        </div>

        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{
            background: 'var(--booking-surface)',
            border: '1px solid var(--booking-border)',
          }}
        >
          {children}
        </div>

        <div className="mt-6 text-center text-sm" style={{ color: 'var(--booking-text-muted)' }}>
          {footer}
        </div>

        <p className="text-center mt-6">
          <Link
            href="/"
            className="text-sm font-medium hover:underline"
            style={{ color: 'var(--primary-blue)' }}
          >
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
