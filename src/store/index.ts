import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import authReducer from './authSlice';
import appReducer from './appSlice';
import movieReducer from './movieSlice';
import labelReducer from './labelSlice';
import eventDetailReducer from './eventDetailSlice';
import categoryReducer from './categorySlice';
import adReducer from './adSlice';
import profileReducer from './profileSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    app: appReducer,
    movies: movieReducer,
    labels: labelReducer,
    eventDetail: eventDetailReducer,
    categories: categoryReducer,
    ad: adReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

