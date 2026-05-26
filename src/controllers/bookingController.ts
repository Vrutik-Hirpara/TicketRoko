import { postJson } from '../lib/api/postJson';
import type { PendingBooking } from '../lib/booking/pendingBooking';

/** Matches POST /bookings/create API contract */
export interface CreateBookingBody {
  event_id: string;
  payment_method: string;
  seat_ids: number[];
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
  };
}

export async function createBooking(
  pending: PendingBooking,
  token: string,
): Promise<CreateBookingResult> {
  const result = await postJson<CreateBookingApiResult>(
    '/bookings/create',
    buildCreateBookingPayload(pending),
    { token },
  );

  return result.data ?? (result as unknown as CreateBookingResult);
}
