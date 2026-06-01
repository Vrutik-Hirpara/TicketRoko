"use client";

import { Provider } from 'react-redux';
import { store } from './index';
import { AuthHydrator } from '../components/auth/AuthHydrator';
import { GoogleOAuthProvider } from '@react-oauth/google';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''}>
      <Provider store={store}>
        <AuthHydrator>{children}</AuthHydrator>
      </Provider>
    </GoogleOAuthProvider>
  );
}

