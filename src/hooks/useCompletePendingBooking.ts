'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { createBooking } from '../controllers/bookingController';
import { clearPendingBooking, getPendingBooking } from '../lib/booking/pendingBooking';
import { RootState } from '../store';

export function useCompletePendingBooking() {
  const router = useRouter();
  const token = useSelector((s: RootState) => s.auth.token);
  const [completing, setCompleting] = useState(false);

  const completeIfPending = useCallback(
    async (returnUrl: string, shouldCheckout: boolean) => {
      const pending = getPendingBooking();

      if (!shouldCheckout || !token || !pending) {
        router.push(returnUrl);
        return;
      }

      setCompleting(true);
      try {
        const result = await createBooking(pending, token);
        clearPendingBooking();
        const ref = result.booking_ref ? `&ref=${encodeURIComponent(result.booking_ref)}` : '';
        router.push(
          `/booking/success?event=${encodeURIComponent(pending.eventSlug)}${ref}`,
        );
      } catch {
        router.push(returnUrl);
      } finally {
        setCompleting(false);
      }
    },
    [token, router],
  );

  return { completeIfPending, completing };
}
