export interface PendingBooking {
  eventId: number;
  eventSlug: string;
  eventTitle: string;
  seatIds: number[];
  seatNames: string[];
  /** UI only — not sent to bookings/create API */
  showTiming?: string;
  paymentMethod?: string;
  totalAmount: number;
  quantity: number;
}

const KEY = 'tr_pending_booking';

export function savePendingBooking(data: PendingBooking): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(KEY, JSON.stringify(data));
}

export function getPendingBooking(): PendingBooking | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PendingBooking) : null;
  } catch {
    return null;
  }
}

export function clearPendingBooking(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(KEY);
}
