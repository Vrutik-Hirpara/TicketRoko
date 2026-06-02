'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import type { BookingEvent, SeatData, SectionSummary } from '../../types/booking';
import type { CheckoutSelection } from '../../hooks/useBookingCheckout';
import { useSeatSelection } from '../../hooks/useSeatSelection';
import { SeatMap } from './SeatMap';
import { BookingSummary } from './BookingSummary';
import { MobileBookingBar } from './MobileBookingBar';

interface HallSeatSelectionProps {
  event: BookingEvent;
  seats: SeatData[];
  sectionSummary?: SectionSummary[];
  hallName?: string;
  showTiming: string | null;
  onProceed: (selection: CheckoutSelection) => void;
  submitting?: boolean;
}

export function HallSeatSelection({
  event,
  seats,
  sectionSummary,
  hallName,
  showTiming,
  onProceed,
  submitting = false,
}: HallSeatSelectionProps) {
  const router = useRouter();
  const {
    selectedSeats,
    quantity,
    totalFormatted,
    totalAmount,
    toggleSeat,
    selectedIds,
  } = useSeatSelection(seats, event.slug);

  const handleProceed = () => {
    onProceed({
      selectedSeats,
      quantity,
      totalAmount,
    });
  };

  return (
    <section id="seat-selection" className="container-max pb-28 lg:pb-16 pt-4 sm:pt-6 overflow-x-hidden">
      {/* ── Movie/Event Premium Header Block ── */}
      <div className="mb-6 sm:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[color:var(--booking-border)]">
        <div className="flex items-start gap-3 text-left">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full transition mt-1 flex items-center justify-center hover:bg-black/5"
            style={{ background: 'var(--booking-surface-elevated)', color: 'var(--booking-text)' }}
            aria-label="Back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-tight" style={{ color: 'var(--booking-text)' }}>
              {event.title} - {event.language}
            </h1>
            
            {/* Metadata Sub-labels */}
            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs" style={{ color: 'var(--booking-text-muted)' }}>
              <span className="px-2.5 py-0.5 border rounded-full font-medium" style={{ background: 'var(--booking-surface)', borderColor: 'var(--booking-border)' }}>
                Movie runtime: 2h 15m
              </span>
              <span className="px-2.5 py-0.5 border rounded-full font-medium" style={{ background: 'var(--booking-surface)', borderColor: 'var(--booking-border)', color: 'var(--booking-text)' }}>
                {event.ageRestriction || 'U'}
              </span>
              <span className="px-2.5 py-0.5 border rounded-full font-medium" style={{ background: 'var(--booking-surface)', borderColor: 'var(--booking-border)' }}>
                {event.eventType}
              </span>
              <span className="px-2.5 py-0.5 border rounded-full font-medium" style={{ background: 'var(--booking-surface)', borderColor: 'var(--booking-border)' }}>
                2D
              </span>
            </div>
          </div>
        </div>

        {/* Date, Time & Venue info */}
        <div className="flex flex-wrap md:flex-nowrap items-center gap-3 self-start md:self-center text-left md:text-right mt-2 md:mt-0">
          <div className="px-4 py-2 rounded-xl border flex flex-col md:items-end justify-center" style={{ background: 'var(--booking-surface)', borderColor: 'var(--booking-border)' }}>
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--booking-text-muted)' }}>Date & Time</span>
            <span className="text-sm font-extrabold mt-0.5" style={{ color: 'var(--booking-text)' }}>{event.date} • {showTiming}</span>
          </div>
          <div className="px-4 py-2 rounded-xl border flex flex-col md:items-end justify-center" style={{ background: 'var(--booking-surface)', borderColor: 'var(--booking-border)' }}>
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--booking-text-muted)' }}>Cinema / Hall</span>
            <span className="text-sm font-extrabold mt-0.5" style={{ color: 'var(--booking-text)' }}>{hallName || 'Mamta Hall'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 xl:gap-10 items-start min-w-0">
        <div
          className="min-w-0 w-full rounded-2xl p-3 sm:p-4 md:p-5 overflow-visible"
          style={{
            background: 'var(--booking-surface)',
            border: '1px solid var(--booking-border)',
          }}
        >
          <SeatMap
            seats={seats}
            sectionSummary={sectionSummary}
            hallName={hallName}
            selectedIds={selectedIds}
            onToggleSeat={toggleSeat}
          />
        </div>

        <div className="hidden xl:block">
          <BookingSummary
            selectedSeats={selectedSeats}
            quantity={quantity}
            totalFormatted={totalFormatted}
            showTiming={showTiming}
            onProceed={handleProceed}
            submitting={submitting}
          />
        </div>
      </div>

      <div className="hidden sm:block xl:hidden mt-6">
        <BookingSummary
          selectedSeats={selectedSeats}
          quantity={quantity}
          totalFormatted={totalFormatted}
          showTiming={showTiming}
          onProceed={handleProceed}
          submitting={submitting}
        />
      </div>

      <MobileBookingBar
        selectedSeats={selectedSeats}
        quantity={quantity}
        totalFormatted={totalFormatted}
        onProceed={handleProceed}
        submitting={submitting}
      />
    </section>
  );
}
