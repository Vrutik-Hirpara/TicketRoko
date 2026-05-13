import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  location: string;
  searchQuery: string;
}

const initialState: AppState = {
  location: 'Ahmedabad',
  searchQuery: '',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setLocation, setSearchQuery } = appSlice.actions;
export default appSlice.reducer;
