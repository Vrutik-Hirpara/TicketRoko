import { createSlice } from '@reduxjs/toolkit';
import {
  fetchMyBookings,
  fetchPastEvents,
  fetchUpcomingEvents,
  BookingItem,
  ProfileEvent,
} from '../controllers/profileController';

interface ProfileState {
  bookings: BookingItem[];
  bookingsLoading: boolean;
  bookingsError: string | null;

  pastEvents: ProfileEvent[];
  pastEventsLoading: boolean;
  pastEventsError: string | null;
  pastEventsPagination: { page: number; totalPages: number; total: number } | null;

  upcomingEvents: ProfileEvent[];
  upcomingEventsLoading: boolean;
  upcomingEventsError: string | null;
  upcomingEventsPagination: { page: number; totalPages: number; total: number } | null;
}

const initialState: ProfileState = {
  bookings: [],
  bookingsLoading: false,
  bookingsError: null,

  pastEvents: [],
  pastEventsLoading: false,
  pastEventsError: null,
  pastEventsPagination: null,

  upcomingEvents: [],
  upcomingEventsLoading: false,
  upcomingEventsError: null,
  upcomingEventsPagination: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile: () => initialState,
  },
  extraReducers: (builder) => {
    // ── My Bookings ──
    builder
      .addCase(fetchMyBookings.pending, (state) => {
        state.bookingsLoading = true;
        state.bookingsError = null;
      })
      .addCase(fetchMyBookings.fulfilled, (state, action) => {
        state.bookingsLoading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchMyBookings.rejected, (state, action) => {
        state.bookingsLoading = false;
        state.bookingsError = action.payload as string;
      });

    // ── Past Events ──
    builder
      .addCase(fetchPastEvents.pending, (state) => {
        state.pastEventsLoading = true;
        state.pastEventsError = null;
      })
      .addCase(fetchPastEvents.fulfilled, (state, action) => {
        state.pastEventsLoading = false;
        state.pastEvents = action.payload.events;
        state.pastEventsPagination = action.payload.pagination ? {
          page: action.payload.pagination.page,
          totalPages: action.payload.pagination.totalPages,
          total: action.payload.pagination.total,
        } : null;
      })
      .addCase(fetchPastEvents.rejected, (state, action) => {
        state.pastEventsLoading = false;
        state.pastEventsError = action.payload as string;
      });

    // ── Upcoming Events ──
    builder
      .addCase(fetchUpcomingEvents.pending, (state) => {
        state.upcomingEventsLoading = true;
        state.upcomingEventsError = null;
      })
      .addCase(fetchUpcomingEvents.fulfilled, (state, action) => {
        state.upcomingEventsLoading = false;
        state.upcomingEvents = action.payload.events;
        state.upcomingEventsPagination = action.payload.pagination ? {
          page: action.payload.pagination.page,
          totalPages: action.payload.pagination.totalPages,
          total: action.payload.pagination.total,
        } : null;
      })
      .addCase(fetchUpcomingEvents.rejected, (state, action) => {
        state.upcomingEventsLoading = false;
        state.upcomingEventsError = action.payload as string;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
