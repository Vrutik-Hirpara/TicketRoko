import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchRecommendedMovies, fetchPaginatedEvents } from '../controllers/eventController';

/**
 * MODEL: Defines the EventData shape and Redux state for movies/events.
 * API calls are handled in controllers/eventController.ts.
 */

export interface EventData {
  id: number;
  title: string;
  description: string;
  banner_url: string | null;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface MovieState {
  movies: EventData[];
  allEvents: EventData[];
  pagination: Pagination | null;
  loading: boolean;
  allEventsLoading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  allEvents: [],
  pagination: null,
  loading: false,
  allEventsLoading: false,
  error: null,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearMovies: (state) => {
      state.movies = [];
      state.error = null;
    },
    clearAllEvents: (state) => {
      state.allEvents = [];
      state.pagination = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchRecommendedMovies (home section — no pagination)
      .addCase(fetchRecommendedMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendedMovies.fulfilled, (state, action: PayloadAction<EventData[]>) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchRecommendedMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchPaginatedEvents (events listing page — with pagination)
      .addCase(fetchPaginatedEvents.pending, (state) => {
        state.allEventsLoading = true;
        state.error = null;
      })
      .addCase(fetchPaginatedEvents.fulfilled, (state, action) => {
        state.allEventsLoading = false;
        state.allEvents = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchPaginatedEvents.rejected, (state, action) => {
        state.allEventsLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMovies, clearAllEvents } = movieSlice.actions;
export default movieSlice.reducer;
