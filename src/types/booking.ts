import type { EventData } from '../store/movieSlice';

export type SeatStatus = 'available' | 'sold' | 'space';
export type SeatType = string;

export interface ApiSeat {
  id: number;
  hall_id: number;
  seat_name: string;
  row_label: string;
  col_index: number;
  seat_type: SeatType;
  is_space: boolean;
  section_label: string | null;
  price: string | number;
  x_pos: number;
  y_pos: number;
  fill: string;
  sort_order: number;
  is_active: boolean;
  status: SeatStatus;
  booking?: {
    booking_id: number;
    booking_ref: string;
    status: string;
    user: { id: number; name: string; email: string; phone: string | null };
  } | null;
}

export interface SectionSummary {
  label: string;
  fill: string;
  total: number;
  available: number;
  sold: number;
}

export interface HallInfo {
  id: number;
  name: string;
  city: string;
}

export interface EventBookingPayload {
  event: EventData;
  hall: HallInfo;
  seats: ApiSeat[];
  bookedSeatIds: number[];
  totalSeats: number;
  soldSeats: number;
  availableSeats: number;
  sectionSummary: SectionSummary[];
}

/** Normalized seat used by UI components */
export interface SeatData {
  id: number;
  seat_name: string;
  row_label: string;
  section_label: string;
  status: SeatStatus;
  seat_type: SeatType;
  is_space: boolean;
  x_pos: number;
  y_pos: number;
  fill: string;
  price: number;
}

export interface BookingEvent {
  slug: string;
  title: string;
  description: string;
  bannerImage: string;
  date: string;
  startTime: string;
  endTime: string;
  city: string;
  address: string;
  language: string;
  eventType: string;
  ticketPrice: number;
  totalSeats: number;
  availableSeats: number;
  hallName?: string;
  showTimings: string[];
}

export type SeatVisualState = 'available' | 'selected' | 'sold';

export interface CanvasBounds {
  minX: number;
  minY: number;
  width: number;
  height: number;
}

export interface SectionLabelPosition {
  label: string;
  fill: string;
  x: number;
  y: number;
}
