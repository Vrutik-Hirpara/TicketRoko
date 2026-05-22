import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchEventById } from '../controllers/eventController';
import { EventData } from './movieSlice';

/**
 * MODEL: Stores the fetched detail of a single event (by slug).
 * Used by the EventDetailPage view.
 */

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
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action: PayloadAction<EventData>) => {
        state.loading = false;
        state.event = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearEventDetail } = eventDetailSlice.actions;
export default eventDetailSlice.reducer;
