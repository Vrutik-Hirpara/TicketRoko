import type { SeatData, SeatVisualState } from '../../types/booking';
import type { SeatStyle } from '../../components/booking/Seat';

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  if (h.length !== 6) return `rgba(245, 158, 11, ${alpha})`;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function getSeatStyle(visualState: SeatVisualState, fill: string): SeatStyle {
  if (visualState === 'selected') {
    return {
      borderColor: 'var(--seat-selected)',
      background: 'rgba(34, 197, 94, 0.35)',
      boxShadow: '0 0 10px rgba(34, 197, 94, 0.45)',
    };
  }
  if (visualState === 'sold') {
    return {
      borderColor: 'var(--seat-sold-border)',
      background: 'var(--seat-sold-fill)',
      boxShadow: 'none',
    };
  }
  const border = fill.startsWith('#') ? fill : 'var(--seat-available-fill)';
  return {
    borderColor: border,
    background: fill.startsWith('#') ? hexToRgba(fill, 0.22) : 'rgba(245, 158, 11, 0.22)',
    boxShadow: 'none',
  };
}

export function resolveVisualState(seat: SeatData, selected: boolean): SeatVisualState {
  if (seat.status === 'sold') return 'sold';
  if (selected) return 'selected';
  return 'available';
}
