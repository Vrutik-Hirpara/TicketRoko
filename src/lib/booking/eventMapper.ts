import type { EventData } from '../../store/movieSlice';
import type { BookingEvent } from '../../types/booking';
import { AMAZONE_BOOKING_EVENT } from '../../constants/bookingEvent';

function formatDisplayDate(dateStr?: string): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatDisplayTime(timeStr?: string): string {
  if (!timeStr) return '—';
  const [h, m] = timeStr.split(':');
  const dt = new Date();
  dt.setHours(+h, +m);
  return dt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

export function eventDataToBookingEvent(event: EventData, bannerFallback: string): BookingEvent {
  const available = event.total_tickets - event.sold_tickets;
  const start = formatDisplayTime(event.start_time);

  return {
    slug: event.slug,
    title: event.title,
    description: event.description || AMAZONE_BOOKING_EVENT.description,
    bannerImage: bannerFallback,
    date: formatDisplayDate(event.event_date),
    startTime: start,
    endTime: formatDisplayTime(event.end_time),
    city: event.city || '—',
    address: event.address || '—',
    language: event.language || 'English',
    eventType: event.event_type || 'Other',
    ticketPrice: parseFloat(event.ticket_price) || AMAZONE_BOOKING_EVENT.ticketPrice,
    totalSeats: event.total_tickets,
    availableSeats: available,
    showTimings: [start, '1:00 PM', '4:30 PM'],
  };
}

export function getDemoBookingEvent(slug: string): BookingEvent {
  return { ...AMAZONE_BOOKING_EVENT, slug };
}
