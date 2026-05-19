import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchLabels } from '../controllers/labelController';

/**
 * MODEL: Defines the LabelData shape and Redux state for promotional labels.
 * API calls are handled in controllers/labelController.ts.
 */

export interface LabelData {
  id: number;
  name: string;
  slug: string;
  image_url: string;
  thumbnail_url: string;
  bg_color: string;
  tagline: string;
  description: string | null;
  badge_text: string;
  discount_text: string;
  terms_text: string;
  tags: string;
  age_rating: string;
  url_link: string;
  cta_text: string;
  sort_order: number;
  is_featured: boolean;
  is_active: boolean;
}

interface LabelState {
  labels: LabelData[];
  loading: boolean;
  error: string | null;
}

const initialState: LabelState = {
  labels: [],
  loading: false,
  error: null,
};

const labelSlice = createSlice({
  name: 'labels',
  initialState,
  reducers: {
    clearLabels: (state) => {
      state.labels = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLabels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLabels.fulfilled, (state, action: PayloadAction<LabelData[]>) => {
        state.loading = false;
        state.labels = action.payload;
      })
      .addCase(fetchLabels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearLabels } = labelSlice.actions;
export default labelSlice.reducer;
