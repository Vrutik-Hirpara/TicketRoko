import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../utils/constants';
import { CategoryData } from '../store/categorySlice';
import { EventData } from '../store/movieSlice';
import { RootState } from '../store';

// Fetch all active categories
export const fetchCategories = createAsyncThunk<CategoryData[], void>(
  'categories/fetchAll',
  async (_, { rejectWithValue, signal }) => {
    try {
      const res = await fetch(`${BASE_URL}/categories/`, { signal });
      if (!res.ok) return rejectWithValue(`HTTP error: ${res.status}`);
      const json = await res.json();
      const items = json?.data ?? json;
      if (!Array.isArray(items)) return rejectWithValue('Unexpected response format');
      return items
        .map((c: any) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          color: c.color || '#6366f1',
          icon: c.icon || null,
          is_active: c.is_active,
        })) as CategoryData[];
    } catch (err: any) {
      return rejectWithValue(err.message || 'Network error fetching categories');
    }
  }
);

// Fetch events for a specific category slug
export const fetchEventsByCategory = createAsyncThunk<
  { events: EventData[]; slug: string },
  string,
  { state: RootState }
>(
  'categories/fetchEventsBySlug',
  async (slug, { getState, rejectWithValue, signal }) => {
    try {
      const state = getState();
      const citySlug = state.app.location?.slug;
      const endpoint = citySlug 
        ? `${BASE_URL}/events/category/${slug}?city=${citySlug}` 
        : `${BASE_URL}/events/category/${slug}`;
      const res = await fetch(endpoint, { signal });
      if (!res.ok) return rejectWithValue(`HTTP error: ${res.status}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return { events: json.data as EventData[], slug };
      }
      return rejectWithValue('Unexpected response format');
    } catch (err: any) {
      return rejectWithValue(err.message || 'Network error fetching category events');
    }
  }
);
