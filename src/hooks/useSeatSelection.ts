'use client';

import { useCallback, useMemo, useState } from 'react';
import type { SeatData } from '../types/booking';
import { formatCurrency } from '../lib/booking/seatLayout';
import { getBookableSeats } from '../lib/booking/seatMapper';
import { getPendingBooking } from '../lib/booking/pendingBooking';

export function useSeatSelection(seats: SeatData[], eventSlug?: string) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(() => {
    if (typeof window !== 'undefined') {
      const pending = getPendingBooking();
      if (pending && pending.seatIds && (!eventSlug || pending.eventSlug === eventSlug)) {
        const validIds = pending.seatIds.filter((id) => seats.some((s) => s.id === id));
        if (validIds.length > 0) {
          return new Set(validIds);
        }
      }
    }
    return new Set();
  });

  const bookableSeats = useMemo(() => getBookableSeats(seats), [seats]);

  const seatById = useMemo(() => {
    const map = new Map<number, SeatData>();
    bookableSeats.forEach((s) => map.set(s.id, s));
    return map;
  }, [bookableSeats]);

  const toggleSeat = useCallback((seat: SeatData) => {
    if (seat.status === 'sold' || seat.is_space) return;

    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(seat.id)) next.delete(seat.id);
      else next.add(seat.id);
      return next;
    });
  }, []);

  const selectedSeats = useMemo(
    () =>
      Array.from(selectedIds)
        .map((id) => seatById.get(id))
        .filter((s): s is SeatData => Boolean(s))
        .sort((a, b) => a.seat_name.localeCompare(b.seat_name)),
    [selectedIds, seatById],
  );

  const totalAmount = useMemo(
    () => selectedSeats.reduce((sum, seat) => sum + seat.price, 0),
    [selectedSeats],
  );

  return {
    selectedSeats,
    selectedIds,
    selectedSeatNames: selectedSeats.map((s) => s.seat_name),
    quantity: selectedSeats.length,
    totalAmount,
    totalFormatted: formatCurrency(totalAmount),
    toggleSeat,
    isSelected: (seatId: number) => selectedIds.has(seatId),
  };
}
