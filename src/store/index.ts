import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import authReducer from './authSlice';
import appReducer from './appSlice';
import movieReducer from './movieSlice';
import labelReducer from './labelSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    app: appReducer,
    movies: movieReducer,
    labels: labelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

