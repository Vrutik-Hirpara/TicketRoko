'use client';

import type { SeatData } from '../../types/booking';
import { formatCurrency } from '../../lib/booking/seatLayout';

interface BookingSummaryProps {
  selectedSeats: SeatData[];
  quantity: number;
  totalFormatted: string;
  showTiming: string | null;
  onProceed: () => void;
  submitting?: boolean;
}

export function BookingSummary({
  selectedSeats,
  quantity,
  totalFormatted,
  showTiming,
  onProceed,
  submitting = false,
}: BookingSummaryProps) {
  const hasSelection = quantity > 0;

  return (
    <div
      className="rounded-2xl p-5 sm:p-6 flex flex-col gap-5 h-fit sticky top-[88px]"
      style={{
        background: 'var(--booking-surface-elevated)',
        border: '1px solid var(--booking-border)',
      }}
    >
      <h3 className="text-lg font-bold" style={{ color: 'var(--booking-text)' }}>
        Booking Summary
      </h3>

      {showTiming && (
        <p className="text-sm" style={{ color: 'var(--booking-text-muted)' }}>
          Show: <span style={{ color: 'var(--booking-text)' }}>{showTiming}</span>
        </p>
      )}

      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span style={{ color: 'var(--booking-text-muted)' }}>Selected Seats</span>
          <span className="font-semibold text-right max-w-[55%] break-words" style={{ color: 'var(--booking-text)' }}>
            {hasSelection ? selectedSeats.map((s) => s.seat_name).join(', ') : '—'}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span style={{ color: 'var(--booking-text-muted)' }}>Quantity</span>
          <span className="font-semibold" style={{ color: 'var(--booking-text)' }}>
            {quantity}
          </span>
        </div>
        <div className="h-px my-1" style={{ background: 'var(--booking-border)' }} />
        <div className="flex justify-between items-baseline">
          <span className="text-sm font-medium" style={{ color: 'var(--booking-text-muted)' }}>
            Total Amount
          </span>
          <span className="text-2xl font-extrabold" style={{ color: 'var(--booking-accent)' }}>
            {hasSelection ? totalFormatted : formatCurrency(0)}
          </span>
        </div>
      </div>

      <button
        type="button"
        disabled={!hasSelection || submitting}
        onClick={onProceed}
        className="w-full py-3.5 rounded-xl font-bold text-[15px] transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
        style={{
          background: hasSelection ? 'var(--booking-accent)' : 'var(--seat-available)',
          color: 'var(--white)',
        }}
      >
        {submitting ? 'Processing…' : 'Proceed'}
      </button>
    </div>
  );
}
