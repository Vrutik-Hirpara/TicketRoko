import { createAsyncThunk } from '@reduxjs/toolkit';
import { EventData } from '../store/movieSlice';
import type { EventBookingPayload } from '../types/booking';
import { BASE_URL } from '../utils/constants';
import { RootState } from '../store';

/**
 * CONTROLLER: Handles all event-related API calls.
 * Dispatched from View components, results handled by movieSlice / eventDetailSlice reducers.
 */

// Home section — fetch all recommended events (no pagination)
export const fetchRecommendedMovies = createAsyncThunk<EventData[], void, { state: RootState }>(
  'movies/fetchRecommended',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const citySlug = state.app.location?.slug;
      const endpoint = citySlug ? `${BASE_URL}/events/city/${citySlug}` : `${BASE_URL}/events/`;
      const response = await fetch(endpoint);
      if (!response.ok) return rejectWithValue(`HTTP error: ${response.status}`);
      const result = await response.json();
      if (result.success && result.data) return result.data as EventData[];
      return rejectWithValue('Unexpected response format');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error fetching events');
    }
  }
);

// Events listing page — fetch with pagination
interface FetchPaginatedParams {
  page: number;
  limit: number;
}

interface PaginatedResponse {
  data: EventData[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const fetchPaginatedEvents = createAsyncThunk<PaginatedResponse, FetchPaginatedParams, { state: RootState }>(
  'movies/fetchPaginated',
  async ({ page, limit }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const citySlug = state.app.location?.slug;
      const endpoint = citySlug
        ? `${BASE_URL}/events/city/${citySlug}?page=${page}&limit=${limit}`
        : `${BASE_URL}/events?page=${page}&limit=${limit}`;

      const response = await fetch(endpoint);
      if (!response.ok) return rejectWithValue(`HTTP error: ${response.status}`);
      const result = await response.json();
      if (result.success && result.data) {
        return {
          data: result.data as EventData[],
          pagination: result.pagination ?? {
            total: result.data.length,
            page,
            limit,
            totalPages: 1,
          },
        };
      }
      return rejectWithValue('Unexpected response format');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error fetching events');
    }
  }
);

interface FilteredEventsParams extends FetchPaginatedParams {
  startDate?: string | null;
  endDate?: string | null;
  minPrice?: number | string | null;
  maxPrice?: number | string | null;
}

function buildQuery(params: Record<string, string | number | null | undefined>) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') return;
    search.append(k, String(v));
  });
  const s = search.toString();
  return s ? `?${s}` : '';
}

// Events listing page — fetch filtered with pagination
export const fetchFilteredPaginatedEvents = createAsyncThunk<
  PaginatedResponse,
  FilteredEventsParams,
  { state: RootState }
>(
  'movies/fetchFilteredPaginated',
  async ({ page, limit, startDate, endDate, minPrice, maxPrice }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const citySlug = state.app.location?.slug;

      const qs = buildQuery({
        page,
        limit,
        startDate,
        endDate,
        minPrice,
        maxPrice,
      });
      const endpoint = citySlug 
        ? `${BASE_URL}/events/city/${citySlug}${qs}` 
        : `${BASE_URL}/events${qs}`;
      const response = await fetch(endpoint);
      if (!response.ok) return rejectWithValue(`HTTP error: ${response.status}`);
      const result = await response.json();
      if (result.success && result.data) {
        return {
          data: result.data as EventData[],
          pagination: result.pagination ?? {
            total: result.data.length,
            page,
            limit,
            totalPages: 1,
          },
        };
      }
      return rejectWithValue('Unexpected response format');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error fetching filtered events');
    }
  }
);

/** Resolve numeric event id from slug (booking-layout uses id, not slug) */
async function resolveEventId(slugOrId: string): Promise<string> {
  if (/^\d+$/.test(slugOrId)) return slugOrId;

  const response = await fetch(`${BASE_URL}/events/${slugOrId}`);
  if (!response.ok) {
    throw new Error(`Event not found (${response.status})`);
  }

  const result = await response.json();
  const id = result?.data?.id;
  if (!id) throw new Error('Event not found');

  return String(id);
}

/**
 * Booking page — GET /events/:id/booking-layout
 * @see https://api.ticketroko.retailian.in/api/events/2/booking-layout
 */
export async function fetchEventBooking(slugOrId: string): Promise<EventBookingPayload> {
  const eventId = await resolveEventId(slugOrId);

  const response = await fetch(`${BASE_URL}/events/${eventId}/booking-layout`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to load booking layout (${response.status})`);
  }

  const result = await response.json();
  if (result.success && result.data) {
    return result.data as EventBookingPayload;
  }

  throw new Error('Unexpected booking layout response');
}

// Event Detail page — fetch single event by slug
export const fetchEventBySlug = createAsyncThunk<EventData, string>(
  'eventDetail/fetchBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/events/${slug}`);
      if (!response.ok) return rejectWithValue(`HTTP error: ${response.status}`);
      const result = await response.json();
      if (result.success && result.data) return result.data as EventData;
      return rejectWithValue('Unexpected response format');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error fetching event detail');
    }
  }
);

// Trending section — fetch trending events from /events/trending
export const fetchTrendingEvents = createAsyncThunk<EventData[], void, { state: RootState }>(
  'movies/fetchTrending',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const citySlug = state.app.location?.slug;
      
      const response = await fetch(`${BASE_URL}/events/trending`);
      if (!response.ok) return rejectWithValue(`HTTP error: ${response.status}`);
      
      const result = await response.json();
      if (result.success && result.data) {
        const allTrending = result.data as EventData[];
        // Backend doesn't support ?city= for trending, so we filter locally
        if (citySlug) {
          return allTrending.filter(event => event.city?.toLowerCase() === citySlug.toLowerCase());
        }
        return allTrending;
      }
      return rejectWithValue('Unexpected response format');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error fetching trending events');
    }
  }
);

// Fetch specific trending event detail by slug from /events/trending/:slug
export const fetchTrendingEventBySlug = createAsyncThunk<EventData, string>(
  'eventDetail/fetchTrendingBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/events/${slug}`);
      if (!response.ok) return rejectWithValue(`HTTP error: ${response.status}`);
      const result = await response.json();
      if (result.success && result.data) return result.data as EventData;
      return rejectWithValue('Unexpected response format');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error fetching trending event detail');
    }
  }
);
