import { createAsyncThunk } from '@reduxjs/toolkit';
import { EventData } from '../store/movieSlice';

const BASE_URL = 'https://api.ticketroko.retailian.in/api';

/**
 * CONTROLLER: Handles all event-related API calls.
 * Dispatched from View components, results handled by movieSlice reducers.
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
