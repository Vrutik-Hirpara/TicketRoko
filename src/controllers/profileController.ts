import { createAsyncThunk } from '@reduxjs/toolkit';
import { getJson } from '../lib/api/getJson';
import { RootState } from '../store';

// ── Types ────────────────────────────────────────────────────────────────

export interface BookingItem {
  id: number;
  booking_ref: string;
  event_id: number;
  user_id: number;
  total_amount: string;
  payment_method: string;
  status: string;
  created_at: string;
  updated_at: string;
  event?: {
    id: number;
    title: string;
    slug: string;
    event_date: string;
    start_time: string;
    end_time: string;
    city: string;
    banner_url: string;
    ticket_price: string;
    language: string;
    event_type: string;
  };
  seats?: Array<{
    id: number;
    row_label: string;
    col_number: number;
    seat_label: string;
  }>;
}

export interface ProfileEvent {
  id: number;
  title: string;
  slug: string;
  description: string;
  event_date: string;
  start_time: string;
  end_time: string;
  city: string;
  address: string;
  banner_url: string;
  ticket_price: string;
  total_tickets: number;
  sold_tickets: number;
  is_free: boolean;
  language: string;
  event_type: string;
  status: string;
  hall?: {
    id: number;
    name: string;
    city: string;
  };
  Category?: {
    id: number;
    name: string;
    slug: string;
    color: string;
  };
}

interface BookingsApiResponse {
  success?: boolean;
  data?: BookingItem[];
  bookings?: BookingItem[];
  message?: string;
}

interface EventsApiResponse {
  success?: boolean;
  data?: ProfileEvent[];
  events?: ProfileEvent[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// ── Thunks ───────────────────────────────────────────────────────────────

export const fetchMyBookings = createAsyncThunk<
  BookingItem[],
  { signal?: AbortSignal } | undefined,
  { state: RootState }
>(
  'profile/fetchMyBookings',
  async (args, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) throw new Error('Not authenticated');

      const result = await getJson<BookingsApiResponse>('/bookings/my-bookings', {
        token,
        signal: args?.signal,
      });

      return result.data || result.bookings || [];
    } catch (err: any) {
      if (err.name === 'AbortError') throw err;
      return rejectWithValue(err.message || 'Failed to fetch bookings');
    }
  }
);

export const fetchPastEvents = createAsyncThunk<
  ProfileEvent[],
  { page?: number; limit?: number; signal?: AbortSignal } | undefined,
  { state: RootState }
>(
  'profile/fetchPastEvents',
  async (args, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) throw new Error('Not authenticated');

      const page = args?.page || 1;
      const limit = args?.limit || 20;

      const result = await getJson<EventsApiResponse>(
        `/events?page=${page}&limit=${limit}&search=&period=past`,
        { token, signal: args?.signal }
      );

      return result.data || result.events || [];
    } catch (err: any) {
      if (err.name === 'AbortError') throw err;
      return rejectWithValue(err.message || 'Failed to fetch past events');
    }
  }
);

export const fetchUpcomingEvents = createAsyncThunk<
  ProfileEvent[],
  { page?: number; limit?: number; signal?: AbortSignal } | undefined,
  { state: RootState }
>(
  'profile/fetchUpcomingEvents',
  async (args, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) throw new Error('Not authenticated');

      const page = args?.page || 1;
      const limit = args?.limit || 20;

      const result = await getJson<EventsApiResponse>(
        `/events?page=${page}&limit=${limit}&search=&period=upcoming`,
        { token, signal: args?.signal }
      );

      return result.data || result.events || [];
    } catch (err: any) {
      if (err.name === 'AbortError') throw err;
      return rejectWithValue(err.message || 'Failed to fetch upcoming events');
    }
  }
);
