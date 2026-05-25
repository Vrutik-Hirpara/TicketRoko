'use client';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useEventBooking } from '../../../../src/hooks/useEventBooking';

const EventBookingFlow = dynamic(
  () =>
    import('../../../../src/components/booking/EventBookingFlow').then((m) => ({
      default: m.EventBookingFlow,
    })),
  { ssr: false },
);

export default function EventBookPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { event, seats, sectionSummary, loading, error, retry } = useEventBooking(slug);

  if (loading && !event) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: 'var(--booking-bg)' }}
      >
        <div
          className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
          style={{ borderColor: 'var(--primary-blue)' }}
        />
        <p className="text-sm" style={{ color: 'var(--booking-text-muted)' }}>
          Loading booking…
        </p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4 px-4"
        style={{ background: 'var(--booking-bg)' }}
      >
        <p className="text-sm text-center" style={{ color: 'var(--seat-sold-border)' }}>
          {error || 'Event not found'}
        </p>
        <button
          type="button"
          onClick={retry}
          className="text-sm font-semibold px-6 py-3 rounded-xl"
          style={{ background: 'var(--primary-blue)', color: 'var(--white)' }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <EventBookingFlow event={event} seats={seats} sectionSummary={sectionSummary} />
  );
}
