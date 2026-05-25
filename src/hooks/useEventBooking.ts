'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchEventBooking } from '../controllers/eventController';
import { getBookingCache, setBookingCache } from '../lib/booking/bookingCache';
import {
  bookingPayloadToEvent,
  normalizeApiSeats,
} from '../lib/booking/seatMapper';
import type { BookingEvent, EventBookingPayload, SeatData, SectionSummary } from '../types/booking';
import { getEventBannerUrl } from '../utils/constants';

interface UseEventBookingResult {
  event: BookingEvent | null;
  seats: SeatData[];
  sectionSummary: SectionSummary[];
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export function useEventBooking(slug: string): UseEventBookingResult {
  const [payload, setPayload] = useState<EventBookingPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const applyPayload = useCallback(
    (data: EventBookingPayload) => {
      setPayload(data);
      setBookingCache(slug, data);
      setError(null);
    },
    [slug],
  );

  const load = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);

    try {
      const data = await fetchEventBooking(slug);
      applyPayload(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load booking');
    } finally {
      setLoading(false);
    }
  }, [slug, applyPayload]);

  useEffect(() => {
    if (!slug) return;

    const cached = getBookingCache(slug);
    if (cached) {
      setPayload(cached);
      setLoading(false);
      fetchEventBooking(slug)
        .then(applyPayload)
        .catch(() => {});
      return;
    }

    load();
  }, [slug, load, applyPayload]);

  const event = useMemo(
    () =>
      payload
        ? bookingPayloadToEvent(payload, getEventBannerUrl(payload.event.banner_url))
        : null,
    [payload],
  );

  const defaultPrice = event?.ticketPrice ?? 1000;

  const seats = useMemo(
    () => (payload ? normalizeApiSeats(payload.seats, defaultPrice) : []),
    [payload, defaultPrice],
  );

  const sectionSummary = payload?.sectionSummary ?? [];

  return {
    event,
    seats,
    sectionSummary,
    loading,
    error,
    retry: load,
  };
}
