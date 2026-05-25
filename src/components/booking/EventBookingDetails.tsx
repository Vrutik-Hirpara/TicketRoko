'use client';

import Image from 'next/image';
import {
  Calendar,
  Clock,
  MapPin,
  Tag,
  Ticket,
  Users,
  Languages,
  ChevronDown,
} from 'lucide-react';
import type { BookingEvent } from '../../types/booking';
import { formatCurrency } from '../../lib/booking/seatLayout';
import { BookTicketsButton } from './BookTicketsButton';
import { EventDetailRow } from './EventDetailRow';
import { ShowTimeSelector } from './ShowTimeSelector';

interface EventBookingDetailsProps {
  event: BookingEvent;
  selectedTiming: string | null;
  onSelectTiming: (timing: string) => void;
  onBookTickets: () => void;
  showSeatSection: boolean;
}

export function EventBookingDetails({
  event,
  selectedTiming,
  onSelectTiming,
  onBookTickets,
  showSeatSection,
}: EventBookingDetailsProps) {
  return (
    <section className="w-full">
      <div className="relative w-full h-[200px] sm:h-[260px] md:h-[300px] overflow-hidden">
        <Image
          src={event.bannerImage}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, var(--booking-bg) 0%, rgba(10,15,26,0.55) 45%, rgba(10,15,26,0.2) 100%)',
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 container-max pb-6 sm:pb-8">
          <h1
            className="text-2xl sm:text-4xl font-bold tracking-tight"
            style={{ color: 'var(--booking-text)' }}
          >
            {event.title}
          </h1>
          <p
            className="text-sm mt-2 line-clamp-2 max-w-2xl"
            style={{ color: 'var(--booking-text-muted)' }}
          >
            {event.description}
          </p>
        </div>
      </div>

      <div className="container-max py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div
              className="rounded-2xl p-5 sm:p-6"
              style={{
                background: 'var(--booking-surface)',
                border: '1px solid var(--booking-border)',
              }}
            >
              <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--booking-text)' }}>
                Event Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <EventDetailRow icon={<Calendar className="w-4 h-4" />} label="Date" value={event.date} />
                <EventDetailRow icon={<Clock className="w-4 h-4" />} label="Start Time" value={event.startTime} />
                <EventDetailRow icon={<Clock className="w-4 h-4" />} label="End Time" value={event.endTime} />
                <EventDetailRow icon={<MapPin className="w-4 h-4" />} label="City" value={event.city} />
                <EventDetailRow icon={<MapPin className="w-4 h-4" />} label="Address" value={event.address} />
                <EventDetailRow icon={<Languages className="w-4 h-4" />} label="Language" value={event.language} />
                <EventDetailRow icon={<Tag className="w-4 h-4" />} label="Event Type" value={event.eventType} />
                <EventDetailRow
                  icon={<Ticket className="w-4 h-4" />}
                  label="Ticket Price"
                  value={formatCurrency(event.ticketPrice)}
                />
                <EventDetailRow
                  icon={<Users className="w-4 h-4" />}
                  label="Available Seats"
                  value={`${event.availableSeats} / ${event.totalSeats}`}
                />
              </div>
            </div>

            <div
              className="rounded-2xl p-5 sm:p-6"
              style={{
                background: 'var(--booking-surface)',
                border: '1px solid var(--booking-border)',
              }}
            >
              <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--booking-text)' }}>
                About
              </h2>
              <p className="text-[14px] leading-relaxed" style={{ color: 'var(--booking-text-muted)' }}>
                {event.description}
              </p>
            </div>

            <div
              className="rounded-2xl p-5 sm:p-6"
              style={{
                background: 'var(--booking-surface)',
                border: '1px solid var(--booking-border)',
              }}
            >
              <ShowTimeSelector
                timings={event.showTimings}
                selectedTiming={selectedTiming}
                onSelect={onSelectTiming}
              />

              {showSeatSection && (
                <p
                  className="mt-6 flex items-center justify-center gap-2 text-sm"
                  style={{ color: 'var(--booking-accent)' }}
                >
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                  <span>Scroll down to select your seats</span>
                </p>
              )}
            </div>
          </div>

          <div className="hidden lg:block">
            <div
              className="sticky top-[88px] rounded-2xl p-6 flex flex-col gap-5"
              style={{
                background: 'var(--booking-surface-elevated)',
                border: '1px solid var(--booking-border)',
              }}
            >
              <h3 className="text-lg font-bold" style={{ color: 'var(--booking-text)' }}>
                Ready to book?
              </h3>
              <p className="text-3xl font-extrabold" style={{ color: 'var(--primary-blue)' }}>
                {formatCurrency(event.ticketPrice)}
                <span className="text-sm font-normal ml-2" style={{ color: 'var(--booking-text-muted)' }}>
                  onwards
                </span>
              </p>
              <BookTicketsButton
                fullWidth
                onClick={onBookTickets}
                label={selectedTiming ? `Continue · ${selectedTiming}` : 'Book Tickets'}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
