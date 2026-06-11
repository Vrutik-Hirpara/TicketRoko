import { postJson } from '../lib/api/postJson';
import { BASE_URL } from '../utils/constants';
import type { PendingBooking } from '../lib/booking/pendingBooking';

/** Matches POST /bookings/create API contract */
export interface CreateBookingBody {
  event_id: string;
  payment_method: string;
  seat_ids: number[];
  num_tickets?: number;
}

export interface CreateBookingResult {
  booking_id?: number;
  booking_ref?: string;
  message?: string;
}

interface CreateBookingApiResult {
  success?: boolean;
  data?: CreateBookingResult;
  message?: string;
}

export const DEFAULT_PAYMENT_METHOD = 'cash';

export function buildCreateBookingPayload(pending: PendingBooking): CreateBookingBody {
  return {
    event_id: String(pending.eventId),
    payment_method: pending.paymentMethod ?? DEFAULT_PAYMENT_METHOD,
    seat_ids: pending.seatIds,
    num_tickets: pending.numTickets,
  };
}

export async function createBooking(
  pending: PendingBooking,
  token: string,
): Promise<CreateBookingResult> {
  // Party plot booking: POST /party-plots/{event_id}/book-tickets
  if (pending.numTickets && pending.numTickets > 0) {
    const url = `${BASE_URL}/party-plots/${pending.eventId}/book-tickets`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ num_tickets: pending.numTickets }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result?.message || `Booking failed (${response.status})`);
    }
    return result.data ?? (result as unknown as CreateBookingResult);
  }

  // Hall / seat-map booking: POST /bookings/create
  const result = await postJson<CreateBookingApiResult>(
    '/bookings/create',
    buildCreateBookingPayload(pending),
    { token },
  );

  return result.data ?? (result as unknown as CreateBookingResult);
}
