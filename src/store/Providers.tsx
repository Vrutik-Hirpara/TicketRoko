"use client";

import { Provider } from 'react-redux';
import { store } from './index';
import { AuthHydrator } from '../components/auth/AuthHydrator';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthHydrator>{children}</AuthHydrator>
    </Provider>
  );
}
