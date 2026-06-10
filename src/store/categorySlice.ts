import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCategories, fetchEventsByCategory } from '../controllers/categoryController';
import { EventData } from './movieSlice';

export interface CategoryData {
  id: number;
  name: string;
  slug: string;
  color: string;
  icon: string | null;
  is_active: boolean;
}

interface CategoryState {
  categories: CategoryData[];
  categoriesLoading: boolean;
  categoriesError: string | null;

  categoryEvents: EventData[];
  categoryEventsLoading: boolean;
  categoryEventsError: string | null;
  activeSlug: string | null;

  selectedDates: string[];
  dateRange: { start: string; end: string };
  selectedPrices: string[];
  selectedLanguages: string[];
}

const initialState: CategoryState = {
  categories: [],
  categoriesLoading: false,
  categoriesError: null,

  categoryEvents: [],
  categoryEventsLoading: false,
  categoryEventsError: null,
  activeSlug: null,

  selectedDates: [],
  dateRange: { start: '', end: '' },
  selectedPrices: [],
  selectedLanguages: [],
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCategoryEvents: (state) => {
      state.categoryEvents = [];
      state.categoryEventsError = null;
      state.activeSlug = null;
    },
    setSelectedDates: (state, action: PayloadAction<string[]>) => {
      state.selectedDates = action.payload;
    },
    setDateRange: (state, action: PayloadAction<{ start: string; end: string }>) => {
      state.dateRange = action.payload;
    },
    setSelectedPrices: (state, action: PayloadAction<string[]>) => {
      state.selectedPrices = action.payload;
    },
    setSelectedLanguages: (state, action: PayloadAction<string[]>) => {
      state.selectedLanguages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCategories
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesLoading = true;
        state.categoriesError = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<CategoryData[]>) => {
        state.categoriesLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoriesLoading = false;
        state.categoriesError = action.payload as string;
      })

      // fetchEventsByCategory
      .addCase(fetchEventsByCategory.pending, (state) => {
        state.categoryEventsLoading = true;
        state.categoryEventsError = null;
      })
      .addCase(fetchEventsByCategory.fulfilled, (state, action) => {
        state.categoryEventsLoading = false;
        state.categoryEvents = action.payload.events;
        state.activeSlug = action.payload.slug;
      })
      .addCase(fetchEventsByCategory.rejected, (state, action) => {
        state.categoryEventsLoading = false;
        state.categoryEventsError = action.payload as string;
      });
  },
});

export const { clearCategoryEvents, setSelectedDates, setDateRange, setSelectedPrices, setSelectedLanguages } = categorySlice.actions;
export default categorySlice.reducer;
