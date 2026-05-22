import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchEventBySlug, fetchTrendingEventBySlug } from '../controllers/eventController';
import { EventData } from './movieSlice';


interface EventDetailState {
  event: EventData | null;
  loading: boolean;
  error: string | null;
}

const initialState: EventDetailState = {
  event: null,
  loading: false,
  error: null,
};

const eventDetailSlice = createSlice({
  name: 'eventDetail',
  initialState,
  reducers: {
    clearEventDetail: (state) => {
      state.event = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventBySlug.fulfilled, (state, action: PayloadAction<EventData>) => {
        state.loading = false;
        state.event = action.payload;
      })
      .addCase(fetchEventBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Trending detail page — /events/trending/:slug
      .addCase(fetchTrendingEventBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingEventBySlug.fulfilled, (state, action: PayloadAction<EventData>) => {
        state.loading = false;
        state.event = action.payload;
      })
      .addCase(fetchTrendingEventBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearEventDetail } = eventDetailSlice.actions;
export default eventDetailSlice.reducer;
