import { createAsyncThunk } from '@reduxjs/toolkit';
import { LabelData } from '../store/labelSlice';

const BASE_URL = 'https://api.ticketroko.retailian.in/api';

/**
 * CONTROLLER: Handles all label/promo API calls.
 * Dispatched from View components, results handled by labelSlice reducers.
 */

export const fetchLabels = createAsyncThunk<LabelData[], void>(
  'labels/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/labels/`);
      if (!response.ok) {
        return rejectWithValue(`HTTP error: ${response.status}`);
      }
      const result = await response.json();
      if (result.success && result.data) {
        return result.data as LabelData[];
      }
      return rejectWithValue('Unexpected response format');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error fetching labels');
    }
  }
);
