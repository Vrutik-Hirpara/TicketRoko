'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import type { SeatData } from '../types/booking';
import type { BookingEvent } from '../types/booking';
import { createBooking } from '../controllers/bookingController';
import { savePendingBooking, clearPendingBooking } from '../lib/booking/pendingBooking';
import { RootState } from '../store';
import { useDispatch } from 'react-redux';

export interface CheckoutSelection {
  selectedSeats: SeatData[];
  quantity: number;
  totalAmount: number;
  numTickets?: number;
}

export function useBookingCheckout(event: BookingEvent, selectedTiming: string | null) {
  const router = useRouter();
  const dispatch = useDispatch();
  const authState = useSelector((s: RootState) => s.auth);
  const { isAuthenticated, hydrated } = authState;
  let { token } = authState;
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const returnUrl = `/events/${event.slug}/book`;

  const proceedToCheckout = useCallback(
    async (selection: CheckoutSelection) => {
      if (!selectedTiming || selection.quantity === 0) return;

      if (!event.eventId) {
        setError('Event information is missing. Please reload the page.');
        return;
      }

      const pending = {
        eventId: event.eventId,
        eventSlug: event.slug,
        eventTitle: event.title,
        seatIds: selection.selectedSeats.map((s) => s.id),
        seatNames: selection.selectedSeats.map((s) => s.seat_name),
        showTiming: selectedTiming,
        paymentMethod: 'cash',
        totalAmount: selection.totalAmount,
        quantity: selection.quantity,
        numTickets: selection.numTickets,
      };

      savePendingBooking(pending);

      if (!hydrated) return;

      if (!isAuthenticated || !token) {
        router.push(
          `/login?returnUrl=${encodeURIComponent(returnUrl)}&checkout=1`,
        );
        return;
      }

      setSubmitting(true);
      setError(null);

      try {
        const result = await createBooking(pending, token!);
        clearPendingBooking();
        const ref = result.booking_ref ? `&ref=${encodeURIComponent(result.booking_ref)}` : '';
        router.push(`/booking/success?event=${encodeURIComponent(event.slug)}${ref}`);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Booking failed');
      } finally {
        setSubmitting(false);
      }
    },
    [event, selectedTiming, hydrated, isAuthenticated, token, router, returnUrl],
  );

  const redirectToAuth = useCallback(
    (mode: 'login' | 'register') => {
      const path = mode === 'login' ? '/login' : '/register';
      router.push(`${path}?returnUrl=${encodeURIComponent(returnUrl)}&checkout=1`);
    },
    [router, returnUrl],
  );

  return { proceedToCheckout, redirectToAuth, submitting, error, setError };
}
