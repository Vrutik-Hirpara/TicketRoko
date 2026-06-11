'use client';

import { useState } from 'react';
import { Minus, Plus, ChevronLeft, MapPin, Ticket, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { BookingEvent } from '../../types/booking';
import type { CheckoutSelection } from '../../hooks/useBookingCheckout';
import { getEventBannerUrl } from '../../utils/constants';

interface PartyPlotSelectionProps {
  event: BookingEvent;
  onProceed: (selection: CheckoutSelection) => void;
  submitting?: boolean;
}

export function PartyPlotSelection({
  event,
  onProceed,
  submitting = false,
}: PartyPlotSelectionProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const partyPlot = event.partyPlot;

  if (!partyPlot) return null;

  const totalAmount = quantity * event.ticketPrice;
  const available = partyPlot.available_tickets;

  const handleIncrement = () => {
    if (quantity < available) setQuantity((q) => q + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  const handleBook = () => {
    onProceed({
      selectedSeats: [],
      quantity,
      totalAmount,
      numTickets: quantity,
    });
  };

  return (
    <section
      className="container-max pb-32 lg:pb-12 pt-4 sm:pt-6 overflow-x-hidden"
      id="seat-selection"
    >
      {/* ── Back button + page title ── */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full flex items-center justify-center border transition-all hover:bg-blue-50 hover:border-blue-300"
          style={{ borderColor: 'var(--booking-border)', color: 'var(--booking-text)' }}
          aria-label="Go back"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--booking-text-muted)' }}>
            Party Plot
          </p>
          <h1
            className="text-lg sm:text-xl font-bold leading-tight"
            style={{ color: 'var(--booking-text)' }}
          >
            {event.title}
          </h1>
        </div>
      </div>

      {/* ── Main card ── */}
      <div className="max-w-2xl mx-auto">
        <div
          className="rounded-2xl overflow-hidden border shadow-sm"
          style={{ background: 'var(--booking-surface)', borderColor: 'var(--booking-border)' }}
        >
          {/* Hero image */}
          {partyPlot.image ? (
            <div className="relative w-full h-52 sm:h-72">
              <Image
                src={getEventBannerUrl(partyPlot.image)}
                alt={partyPlot.name}
                fill
                className="object-cover"
                priority
              />
              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              {/* Name over image */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-300 mb-1">
                  Party Plot
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {partyPlot.name}
                </h2>
              </div>
            </div>
          ) : (
            /* No image — text header */
            <div
              className="px-6 pt-6 pb-5 border-b"
              style={{ borderColor: 'var(--booking-border)' }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
                Party Plot
              </span>
              <h2
                className="text-2xl font-extrabold mt-1"
                style={{ color: 'var(--booking-text)' }}
              >
                {partyPlot.name}
              </h2>
            </div>
          )}

          {/* Info badges row */}
          <div
            className="flex flex-wrap items-center gap-3 px-5 py-4 border-b text-xs font-medium"
            style={{ borderColor: 'var(--booking-border)', color: 'var(--booking-text-muted)' }}
          >
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              {event.city}
            </span>
            <span className="w-px h-4 bg-gray-200" />
            <span className="flex items-center gap-1.5">
              <Ticket className="w-3.5 h-3.5 text-blue-500" />
              ₹{event.ticketPrice.toLocaleString('en-IN')} per ticket
            </span>
            <span className="w-px h-4 bg-gray-200" />

          </div>

          {/* Description */}
          {partyPlot.description && (
            <div
              className="px-5 py-4 border-b text-sm leading-relaxed"
              style={{ borderColor: 'var(--booking-border)', color: 'var(--booking-text-muted)' }}
            >
              {partyPlot.description}
            </div>
          )}

          {/* Ticket selector */}
          <div className="px-5 py-5">
            <div
              className="flex items-center justify-between rounded-xl px-5 py-4 border"
              style={{ borderColor: 'var(--booking-border)', background: 'var(--booking-surface-elevated)' }}
            >
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--booking-text)' }}>
                  Number of Tickets
                </p>

              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  className="w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all disabled:opacity-40 hover:bg-blue-50 hover:border-blue-400"
                  style={{ borderColor: 'var(--booking-border)', color: 'var(--booking-text)' }}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span
                  className="w-8 text-center font-extrabold text-xl tabular-nums"
                  style={{ color: 'var(--booking-text)' }}
                >
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  disabled={quantity >= available}
                  className="w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all disabled:opacity-40 hover:bg-blue-50 hover:border-blue-400"
                  style={{ borderColor: 'var(--booking-border)', color: 'var(--booking-text)' }}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer — total + CTA */}
          <div
            className="flex items-center justify-between px-5 py-4 border-t"
            style={{ borderColor: 'var(--booking-border)', background: 'var(--booking-surface-elevated)' }}
          >
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--booking-text-muted)' }}>
                Total
              </p>
              <p className="text-2xl font-extrabold" style={{ color: 'var(--booking-text)' }}>
                ₹{totalAmount.toLocaleString('en-IN')}
              </p>
            </div>

            <button
              onClick={handleBook}
              disabled={submitting || available < 1}
              className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ width: 'auto', paddingLeft: '28px', paddingRight: '28px', fontSize: '15px' }}
            >
              {submitting ? 'Processing…' : 'Proceed to Pay'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
