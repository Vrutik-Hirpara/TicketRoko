import type { ApiSeat, BookingEvent, CanvasBounds, EventBookingPayload, SeatData, SectionLabelPosition } from '../../types/booking';
import type { EventData } from '../../store/movieSlice';

export const SEAT_SIZE = 28;
export const CANVAS_PADDING = 48;

export function parseSeatPrice(price: string | number, fallback: number): number {
  const n = typeof price === 'string' ? parseFloat(price) : price;
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export function normalizeApiSeat(seat: ApiSeat, defaultPrice: number): SeatData {
  return {
    id: seat.id,
    seat_name: seat.seat_name,
    row_label: seat.row_label,
    section_label: seat.section_label ?? '',
    status: seat.status,
    seat_type: seat.seat_type,
    is_space: seat.is_space,
    x_pos: seat.x_pos,
    y_pos: seat.y_pos,
    fill: seat.fill || 'var(--seat-available-fill)',
    price: parseSeatPrice(seat.price, defaultPrice),
  };
}

export function normalizeApiSeats(seats: ApiSeat[], defaultPrice: number): SeatData[] {
  return seats.map((s) => normalizeApiSeat(s, defaultPrice));
}

/** Seats rendered on the canvas (excludes spacer placeholders) */
export function getBookableSeats(seats: SeatData[]): SeatData[] {
  return seats.filter((s) => !s.is_space && s.x_pos > 0 && s.y_pos > 0 && s.status !== 'space');
}

export function computeCanvasBounds(seats: SeatData[]): CanvasBounds {
  const bookable = getBookableSeats(seats);
  if (bookable.length === 0) {
    return { minX: 0, minY: 0, width: 400, height: 300 };
  }

  const xs = bookable.map((s) => s.x_pos);
  const ys = bookable.map((s) => s.y_pos);
  const minX = Math.min(...xs) - CANVAS_PADDING;
  const minY = Math.min(...ys) - CANVAS_PADDING;
  const maxX = Math.max(...xs) + SEAT_SIZE + CANVAS_PADDING;
  const maxY = Math.max(...ys) + SEAT_SIZE + CANVAS_PADDING;

  return {
    minX,
    minY,
    width: maxX - minX,
    height: maxY - minY,
  };
}

export function getSeatPosition(seat: SeatData, bounds: CanvasBounds) {
  return {
    left: seat.x_pos - bounds.minX,
    top: seat.y_pos - bounds.minY,
  };
}

export function getSectionLabelPositions(
  seats: SeatData[],
  sectionSummary: { label: string; fill: string }[],
): SectionLabelPosition[] {
  const bookable = getBookableSeats(seats);
  const positions: SectionLabelPosition[] = [];

  for (const section of sectionSummary) {
    const inSection = bookable.filter((s) => s.section_label === section.label);
    if (inSection.length === 0) continue;

    const avgX = inSection.reduce((sum, s) => sum + s.x_pos, 0) / inSection.length;
    const minY = Math.min(...inSection.map((s) => s.y_pos));

    positions.push({
      label: section.label,
      fill: section.fill,
      x: avgX,
      y: minY - 20,
    });
  }

  return positions;
}

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

export function bookingPayloadToEvent(
  payload: EventBookingPayload,
  bannerUrl: string,
): BookingEvent {
  const { event, hall, availableSeats, totalSeats } = payload;
  const start = formatDisplayTime(event.start_time);
  const ticketPrice = parseFloat(event.ticket_price) || 1000;

  return {
    eventId: event.id,
    slug: event.slug,
    title: event.title,
    description: event.description || '',
    bannerImage: bannerUrl,
    backgroundImageUrl: event.background_image_url || null,
    ageRestriction: event.age_restriction || null,
    date: formatDisplayDate(event.event_date),
    startTime: start,
    endTime: formatDisplayTime(event.end_time),
    city: event.city || '—',
    address: event.address || '—',
    language: event.language || 'English',
    eventType: event.event_type || 'Other',
    ticketPrice,
    totalSeats: totalSeats ?? event.total_tickets,
    availableSeats: availableSeats ?? event.total_tickets - event.sold_tickets,
    hallName: hall?.name,
    showTimings: [start],
  };
}

export function eventDataToBookingFromApi(event: EventData, bannerUrl: string): BookingEvent {
  const start = formatDisplayTime(event.start_time);
  const ticketPrice = parseFloat(event.ticket_price) || 1000;

  return {
    eventId: event.id,
    slug: event.slug,
    title: event.title,
    description: event.description || '',
    bannerImage: bannerUrl,
    backgroundImageUrl: event.background_image_url || null,
    ageRestriction: event.age_restriction || null,
    date: formatDisplayDate(event.event_date),
    startTime: start,
    endTime: formatDisplayTime(event.end_time),
    city: event.city || '—',
    address: event.address || '—',
    language: event.language || 'English',
    eventType: event.event_type || 'Other',
    ticketPrice,
    totalSeats: event.total_tickets,
    availableSeats: event.total_tickets - event.sold_tickets,
    showTimings: [start],
  };
}
