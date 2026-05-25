'use client';

import { formatCurrency } from '../../lib/booking/seatLayout';

interface SeatTooltipProps {
  seatName: string;
  price: number;
  sectionLabel: string;
}

export function SeatTooltip({ seatName, price, sectionLabel }: SeatTooltipProps) {
  return (
    <div
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none min-w-[120px] px-3 py-2.5 rounded-lg shadow-xl"
      style={{
        background: 'var(--booking-surface-elevated)',
        border: '1px solid var(--booking-border)',
      }}
    >
      <p className="text-sm font-bold text-center" style={{ color: 'var(--booking-text)' }}>
        {seatName}
      </p>
      <p className="text-base font-bold text-center mt-0.5" style={{ color: 'var(--tooltip-price)' }}>
        {formatCurrency(price)}
      </p>
      {sectionLabel && (
        <p className="text-[11px] text-center mt-1" style={{ color: 'var(--booking-text-muted)' }}>
          {sectionLabel}
        </p>
      )}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0"
        style={{
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderTop: '6px solid var(--booking-border)',
        }}
      />
    </div>
  );
}
