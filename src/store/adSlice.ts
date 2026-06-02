import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAdvertisement } from '../controllers/adController';

export interface AdData {
  id: number;
  title: string;
  image_url: string;
  thumbnail_url: string | null;
  url_link: string | null;
}

interface AdState {
  ads: AdData[];
  currentIndex: number;
  loading: boolean;
  error: string | null;
}

const initialState: AdState = {
  ads: [],
  currentIndex: 0,
  loading: false,
  error: null,
};

const adSlice = createSlice({
  name: 'ad',
  initialState,
  reducers: {
    nextAd: (state) => {
      if (state.ads.length > 1) {
        state.currentIndex = (state.currentIndex + 1) % state.ads.length;
      }
    },
    setAdIndex: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0 && action.payload < state.ads.length) {
        state.currentIndex = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdvertisement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdvertisement.fulfilled, (state, action: PayloadAction<AdData[]>) => {
        state.loading = false;
        state.ads = action.payload;
        state.currentIndex = 0;
      })
      .addCase(fetchAdvertisement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { nextAd } = adSlice.actions;
export default adSlice.reducer;
