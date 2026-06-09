import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../utils/constants';
import { City } from '../store/appSlice';
import { RootState } from '../store';

export const fetchCities = createAsyncThunk<City[], void, { state: RootState }>(
  'app/fetchCities',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;
      
      const headers: HeadersInit = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${BASE_URL}/cities/`, { headers });
      if (!response.ok) return rejectWithValue(`HTTP error: ${response.status}`);
      const result = await response.json();
      if (result.success && result.data) return result.data as City[];
      return rejectWithValue('Unexpected response format');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error fetching cities');
    }
  }
);
