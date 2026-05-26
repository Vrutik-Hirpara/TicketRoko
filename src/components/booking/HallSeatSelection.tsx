'use client';

import type { SeatData, SectionSummary } from '../../types/booking';
import type { CheckoutSelection } from '../../hooks/useBookingCheckout';
import { useSeatSelection } from '../../hooks/useSeatSelection';
import { SeatMap } from './SeatMap';
import { BookingSummary } from './BookingSummary';
import { MobileBookingBar } from './MobileBookingBar';

interface HallSeatSelectionProps {
  seats: SeatData[];
  sectionSummary?: SectionSummary[];
  hallName?: string;
  showTiming: string | null;
  onProceed: (selection: CheckoutSelection) => void;
  submitting?: boolean;
}

export function HallSeatSelection({
  seats,
  sectionSummary,
  hallName,
  showTiming,
  onProceed,
  submitting = false,
}: HallSeatSelectionProps) {
  const {
    selectedSeats,
    quantity,
    totalFormatted,
    totalAmount,
    toggleSeat,
    selectedIds,
  } = useSeatSelection(seats);

  const handleProceed = () => {
    onProceed({
      selectedSeats,
      quantity,
      totalAmount,
    });
  };

  return (
    <section id="seat-selection" className="container-max pb-28 lg:pb-16 pt-4 sm:pt-6 overflow-x-hidden">
      <div className="mb-6 sm:mb-8 text-center sm:text-left">
        <h2 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--booking-text)' }}>
          Select Your Seats
        </h2>
        {showTiming && (
          <p className="text-sm mt-1" style={{ color: 'var(--booking-text-muted)' }}>
            Show time: {showTiming}
          </p>
        )}
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
