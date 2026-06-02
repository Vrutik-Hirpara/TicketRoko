import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../utils/constants';
import { AdData } from '../store/adSlice';

// Fetch ALL active advertisements
export const fetchAdvertisement = createAsyncThunk<AdData[], void>(
  'ad/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/advertisements`);
      if (!res.ok) return rejectWithValue(`HTTP error: ${res.status}`);
      const json = await res.json();
      if (json.success && json.data) {
        const list = Array.isArray(json.data) ? json.data : [json.data];
        return list as AdData[];
      }
      return rejectWithValue('No advertisement data found');
    } catch (err: any) {
      return rejectWithValue(err.message || 'Network error fetching advertisements');
    }
  }
);
