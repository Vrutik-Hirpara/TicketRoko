'use client';

import { memo } from 'react';
import type { SeatData, SeatVisualState } from '../../types/booking';
import { SEAT_SIZE } from '../../lib/booking/seatMapper';

export interface SeatStyle {
  borderColor: string;
  background: string;
  boxShadow: string;
}

interface SeatProps {
  seat: SeatData;
  visualState: SeatVisualState;
  left: number;
  top: number;
  style: SeatStyle;
  onToggle: (seat: SeatData) => void;
  onHover: (seatId: number | null) => void;
}

function SeatComponent({ seat, visualState, left, top, style, onToggle, onHover }: SeatProps) {
  const isSold = visualState === 'sold';
  const isSelected = visualState === 'selected';

  return (
    <button
      type="button"
      disabled={isSold}
      onClick={() => onToggle(seat)}
      onMouseEnter={() => onHover(seat.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(seat.id)}
      onBlur={() => onHover(null)}
      aria-label={`Seat ${seat.seat_name}${isSold ? ', sold' : isSelected ? ', selected' : ', available'}`}
      aria-pressed={isSelected}
      className="absolute rounded-md transition-transform duration-150 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-90 disabled:hover:scale-100"
      style={{
        left,
        top,
        width: SEAT_SIZE,
        height: SEAT_SIZE,
        borderWidth: 2,
        borderStyle: 'solid',
        ...style,
      }}
    />
  );
}

export const Seat = memo(SeatComponent, (prev, next) =>
  prev.seat.id === next.seat.id &&
  prev.visualState === next.visualState &&
  prev.left === next.left &&
  prev.top === next.top &&
  prev.style.borderColor === next.style.borderColor,
);
