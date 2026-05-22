import { createAsyncThunk } from '@reduxjs/toolkit';
import { EventData } from '../store/movieSlice';
import { BASE_URL } from '../utils/constants';

/**
 * CONTROLLER: Handles all event-related API calls.
 * Dispatched from View components, results handled by movieSlice / eventDetailSlice reducers.
 */

// Home section — fetch all recommended events (no pagination)
export const fetchRecommendedMovies = createAsyncThunk<EventData[], void>(
  'movies/fetchRecommended',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/events/`);
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

export const fetchPaginatedEvents = createAsyncThunk<PaginatedResponse, FetchPaginatedParams>(
  'movies/fetchPaginated',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/events?page=${page}&limit=${limit}`);
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

// Event Detail page — fetch single event by numeric ID
export const fetchEventById = createAsyncThunk<EventData, number>(
  'eventDetail/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/events/${id}`);
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
export const fetchTrendingEvents = createAsyncThunk<EventData[], void>(
  'movies/fetchTrending',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/events/trending`);
      if (!response.ok) return rejectWithValue(`HTTP error: ${response.status}`);
      const result = await response.json();
      if (result.success && result.data) return result.data as EventData[];
      return rejectWithValue('Unexpected response format');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error fetching trending events');
    }
  }
);
