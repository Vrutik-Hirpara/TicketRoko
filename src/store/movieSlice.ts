import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchRecommendedMovies, fetchPaginatedEvents, fetchTrendingEvents } from '../controllers/eventController';

/**
 * MODEL: Defines the EventData shape and Redux state for movies/events.
 * API calls are handled in controllers/eventController.ts.
 */

export interface OrganizerData {
  id: number;
  name: string;
  email: string;
}

export interface EventData {
  id: number;
  organizer_id: number;
  hall_id: number;
  category_id: number;
  title: string;
  slug: string;
  description: string;
  event_date: string;
  start_time: string;
  end_time: string;
  city: string;
  address: string;
  banner_url: string | null;
  ticket_price: string;
  total_tickets: number;
  sold_tickets: number;
  is_free: boolean;
  is_trending: boolean;
  language: string;
  event_type: string;
  status: string;
  background_image_url?: string | null;
  age_restriction?: string | null;
  rejection_reason: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  organizer?: OrganizerData;
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
  trending: EventData[];
  pagination: Pagination | null;
  loading: boolean;
  allEventsLoading: boolean;
  trendingLoading: boolean;
  error: string | null;
  trendingError: string | null;
}

const initialState: MovieState = {
  movies: [],
  allEvents: [],
  trending: [],
  pagination: null,
  loading: false,
  allEventsLoading: false,
  trendingLoading: false,
  error: null,
  trendingError: null,
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
      })

      // fetchTrendingEvents (Trending Near You section)
      .addCase(fetchTrendingEvents.pending, (state) => {
        state.trendingLoading = true;
        state.trendingError = null;
      })
      .addCase(fetchTrendingEvents.fulfilled, (state, action: PayloadAction<EventData[]>) => {
        state.trendingLoading = false;
        state.trending = action.payload;
      })
      .addCase(fetchTrendingEvents.rejected, (state, action) => {
        state.trendingLoading = false;
        state.trendingError = action.payload as string;
      });
  },
});

export const { clearMovies, clearAllEvents } = movieSlice.actions;
export default movieSlice.reducer;
