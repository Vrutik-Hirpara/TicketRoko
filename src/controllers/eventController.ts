import { createAsyncThunk } from '@reduxjs/toolkit';
import { EventData } from '../store/movieSlice';

const BASE_URL = 'https://api.ticketroko.retailian.in/api';

/**
 * CONTROLLER: Handles all event-related API calls.
 * Dispatched from View components, results handled by movieSlice reducers.
 */

export const fetchRecommendedMovies = createAsyncThunk<EventData[], void>(
  'movies/fetchRecommended',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/events/`);
      if (!response.ok) {
        return rejectWithValue(`HTTP error: ${response.status}`);
      }
      const result = await response.json();
      if (result.success && result.data) {
        return result.data as EventData[];
      }
      return rejectWithValue('Unexpected response format');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error fetching events');
    }
  }
);
