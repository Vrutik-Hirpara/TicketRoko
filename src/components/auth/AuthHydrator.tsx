'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setHydrated } from '../../store/authSlice';
import { getStoredToken, getStoredUser } from '../../lib/auth/storage';
import type { AuthUser } from '../../types/auth';
import type { AppDispatch } from '../../store';

export function AuthHydrator({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = getStoredToken();
    let user: AuthUser | null = null;

    try {
      const raw = getStoredUser();
      if (raw) user = JSON.parse(raw) as AuthUser;
    } catch {
      user = null;
    }

    dispatch(setHydrated({ token, user }));
  }, [dispatch]);

  return <>{children}</>;
}
