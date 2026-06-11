'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchEventBooking } from '../controllers/eventController';
import { getBookingCache, setBookingCache } from '../lib/booking/bookingCache';
import {
  bookingPayloadToEvent,
  normalizeApiSeats,
} from '../lib/booking/seatMapper';
import type { BookingEvent, EventBookingPayload, SeatData, SectionSummary } from '../types/booking';
import { getEventBannerUrl, UPLOADS_URL } from '../utils/constants';
import { io } from 'socket.io-client';

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

  // ── Polling fallback: refresh seat layout every 15s in case socket event is missed ──
  useEffect(() => {
    if (!slug) return;
    const interval = setInterval(() => {
      load();
    }, 15000);
    return () => clearInterval(interval);
  }, [slug, load]);

  useEffect(() => {
    const eventId = payload?.event?.id;
    if (!eventId || !slug) return;

    console.log('[Socket] Connecting to:', UPLOADS_URL, '| Event ID:', eventId, '| Slug:', slug);

    const socket = io(UPLOADS_URL);

    socket.on('connect', () => {
      console.log('[Socket] CONNECTED ✅', socket.id);
      // Try joining with BOTH the numeric ID and slug — backend may use either
      socket.emit('join:event', eventId);
      socket.emit('join:event', String(eventId));
      socket.emit('join:event', slug);
      console.log('[Socket] Joined room with id:', eventId, 'and slug:', slug);
    });

    socket.on('connect_error', (err) => {
      console.error('[Socket] CONNECTION ERROR ❌', err.message, err);
    });

    socket.onAny((event, ...args) => {
      console.log('[Socket] EVENT:', event, args);
    });

    socket.on('seats:booked', ({ seat_ids }: { seat_ids: any[] }) => {
      console.log('[Socket] seats:booked received ✅ seat_ids:', seat_ids);
      if (!seat_ids || !Array.isArray(seat_ids)) return;

      const bookedIds = seat_ids.map(Number);

      setPayload((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          seats: prev.seats.map((seat) =>
            bookedIds.includes(Number(seat.id)) ? { ...seat, status: 'sold' as const } : seat
          ),
        };
      });

      // Refresh layout after a small delay (backend db commit time)
      setTimeout(() => load(), 1500);
    });

    return () => {
      socket.emit('leave:event', eventId);
      socket.emit('leave:event', slug);
      socket.disconnect();
      console.log('[Socket] Disconnected from event:', eventId);
    };
  }, [payload?.event?.id, slug]);

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
