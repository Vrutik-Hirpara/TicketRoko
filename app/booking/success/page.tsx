'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Loader2 } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');
  const eventSlug = searchParams.get('event');

  return (
    <div
      className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4"
      style={{ background: 'var(--booking-bg)' }}
    >
      <div
        className="max-w-md w-full rounded-2xl p-8 text-center"
        style={{
          background: 'var(--booking-surface)',
          border: '1px solid var(--booking-border)',
        }}
      >
        <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--booking-accent)' }} />
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--booking-text)' }}>
          Booking confirmed!
        </h1>
        <p className="text-sm mb-6" style={{ color: 'var(--booking-text-muted)' }}>
          Your seats have been reserved successfully.
        </p>
        {ref && (
          <p className="text-sm font-mono mb-6 px-3 py-2 rounded-lg" style={{ background: 'var(--booking-surface-elevated)', color: 'var(--booking-text)' }}>
            Ref: {ref}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/events"
            className="px-6 py-3 rounded-xl font-semibold text-sm"
            style={{ background: 'var(--primary-blue)', color: 'var(--white)' }}
          >
            Browse events
          </Link>
          {eventSlug && (
            <Link
              href={`/events/${eventSlug}`}
              className="px-6 py-3 rounded-xl font-semibold text-sm"
              style={{
                border: '1px solid var(--booking-border)',
                color: 'var(--booking-text)',
              }}
            >
              Event details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--booking-bg)' }}>
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--primary-blue)' }} />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
