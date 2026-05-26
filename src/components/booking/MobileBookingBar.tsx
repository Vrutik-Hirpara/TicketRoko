'use client';

import type { SeatData } from '../../types/booking';

interface MobileBookingBarProps {
  selectedSeats: SeatData[];
  quantity: number;
  totalFormatted: string;
  onProceed: () => void;
  submitting?: boolean;
}

export function MobileBookingBar({
  selectedSeats,
  quantity,
  totalFormatted,
  onProceed,
  submitting = false,
}: MobileBookingBarProps) {
  const hasSelection = quantity > 0;

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-4 py-3"
      style={{
        background: 'rgba(17, 24, 39, 0.95)',
        borderTop: '1px solid var(--booking-border)',
        paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
      }}
    >
      <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
        <div className="flex-1 min-w-0">
          {hasSelection ? (
            <>
              <p className="text-[11px] font-medium truncate" style={{ color: 'var(--booking-text-muted)' }}>
                {selectedSeats.map((s) => s.seat_name).join(', ')}
              </p>
              <p className="text-lg font-bold" style={{ color: 'var(--booking-accent)' }}>
                {totalFormatted}
                <span className="text-xs font-normal ml-1.5" style={{ color: 'var(--booking-text-muted)' }}>
                  · {quantity} seat{quantity !== 1 ? 's' : ''}
                </span>
              </p>
            </>
          ) : (
            <p className="text-sm" style={{ color: 'var(--booking-text-muted)' }}>
              Select seats to continue
            </p>
          )}
        </div>

        <button
          type="button"
          disabled={!hasSelection || submitting}
          onClick={onProceed}
          className="flex-shrink-0 px-5 py-2.5 rounded-xl font-bold text-sm disabled:opacity-40 hover:opacity-90"
          style={{
            background: hasSelection ? 'var(--booking-accent)' : 'var(--seat-available)',
            color: 'var(--white)',
          }}
        >
          {submitting ? '…' : 'Proceed'}
        </button>
      </div>
    </div>
  );
}
