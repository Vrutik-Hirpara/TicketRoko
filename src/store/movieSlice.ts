import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchRecommendedMovies } from '../controllers/eventController';

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

interface MovieState {
  movies: EventData[];
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  loading: false,
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
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { clearMovies } = movieSlice.actions;
export default movieSlice.reducer;
