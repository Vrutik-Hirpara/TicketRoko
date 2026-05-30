'use client';

import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import type { BookingEvent, SeatData, SectionSummary } from '../../types/booking';
import { useBookingCheckout } from '../../hooks/useBookingCheckout';
import { EventBookingDetails } from './EventBookingDetails';
import { BookTicketsButton } from './BookTicketsButton';

const HallSeatSelection = dynamic(
  () => import('./HallSeatSelection').then((m) => ({ default: m.HallSeatSelection })),
  {
    ssr: false,
    loading: () => (
      <div
        className="container-max py-12 flex justify-center"
        style={{ color: 'var(--booking-text-muted)' }}
      >
        Loading seat map…
      </div>
    ),
  },
);

interface EventBookingFlowProps {
  event: BookingEvent;
  seats: SeatData[];
  sectionSummary?: SectionSummary[];
}

export function EventBookingFlow({ event, seats, sectionSummary }: EventBookingFlowProps) {
  const router = useRouter();
  const [selectedTiming, setSelectedTiming] = useState<string | null>(event.startTime || event.showTimings[0] || null);
  const [showSeatSection, setShowSeatSection] = useState(true);

  const { proceedToCheckout, submitting, error: checkoutError } = useBookingCheckout(
    event,
    selectedTiming,
  );

  const scrollToSeats = useCallback(() => {
    requestAnimationFrame(() => {
      document.getElementById('seat-selection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  const handleSelectTiming = useCallback(
    (timing: string) => {
      setSelectedTiming(timing);
      setShowSeatSection(true);
      scrollToSeats();
    },
    [scrollToSeats],
  );

  const handleBookTickets = useCallback(() => {
    if (!selectedTiming) {
      handleSelectTiming(event.showTimings[0]);
      return;
    }
    setShowSeatSection(true);
    scrollToSeats();
  }, [selectedTiming, event.showTimings, handleSelectTiming, scrollToSeats]);

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden" style={{ background: 'var(--booking-bg)' }}>
      {/* <div className="container-max pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm font-medium mb-2 transition-opacity hover:opacity-80"
          style={{ color: 'var(--booking-text-muted)' }}
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
      </div> */}

      {checkoutError && (
        <div className="container-max mb-4">
          <p
            className="text-sm px-4 py-3 rounded-xl"
            style={{ color: 'var(--seat-sold-border)', background: 'var(--seat-sold-fill)' }}
          >
            {checkoutError}
          </p>
        </div>
      )}

      {!showSeatSection && (
        <EventBookingDetails
          event={event}
          selectedTiming={selectedTiming}
          onSelectTiming={handleSelectTiming}
          onBookTickets={handleBookTickets}
          showSeatSection={showSeatSection}
        />
      )}

      {showSeatSection && selectedTiming && (
        <HallSeatSelection
          event={event}
          seats={seats}
          sectionSummary={sectionSummary}
          hallName={event.hallName}
          showTiming={selectedTiming}
          onProceed={proceedToCheckout}
          submitting={submitting}
        />
      )}

      {!showSeatSection && (
        <div
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-4 py-3 backdrop-blur-md"
          style={{
            background: 'rgba(17, 24, 39, 0.95)',
            borderTop: '1px solid var(--booking-border)',
            paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
          }}
        >
          <BookTicketsButton fullWidth onClick={handleBookTickets} />
        </div>
      )}
    </div>
  );
}
