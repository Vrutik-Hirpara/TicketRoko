import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCities } from '../controllers/appController';

export interface City {
  id: number;
  name: string;
  slug: string;
  state: string | null;
  is_active?: boolean;
}

interface AppState {
  location: City | null;
  cities: City[];
  loadingCities: boolean;
  searchQuery: string;
}

const initialState: AppState = {
  location: null,
  cities: [],
  loadingCities: false,
  searchQuery: '',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<City>) => {
      state.location = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCities.pending, (state) => {
      state.loadingCities = true;
    });
    builder.addCase(fetchCities.fulfilled, (state, action) => {
      state.loadingCities = false;
      state.cities = action.payload;
      if (!state.location && action.payload.length > 0) {
        // Default to Ahmedabad or the first one if not found
        const defaultCity = action.payload.find((c: City) => c.slug === 'ahmedabad') || action.payload[0];
        state.location = defaultCity;
      }
    });
    builder.addCase(fetchCities.rejected, (state) => {
      state.loadingCities = false;
    });
  }
});

export const { setLocation, setSearchQuery } = appSlice.actions;
export default appSlice.reducer;
