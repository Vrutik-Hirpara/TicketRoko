'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CityEventsSection } from './CityEventsSection';
import { SectionHeader } from '../ui/SectionHeader';

export const ActiveCityEvents = () => {
  const { cities, loadingCities } = useSelector((state: RootState) => state.app);

  if (loadingCities) return null;

  // Assuming active cities are either marked is_active or we just show a few top ones
  // We'll filter by is_active if it exists, otherwise slice the top 5
  const activeCities = cities.filter((c) => c.is_active !== false).slice(0, 5);

  if (activeCities.length === 0) return null;

  return (
    <section className="container-max py-10 overflow-hidden relative">
      <SectionHeader title="Top Cities" />
      <div className="flex flex-col gap-12 pt-10">
        {activeCities.map((city) => (
          <CityEventsSection key={city.slug} city={city} />
        ))}
      </div>
    </section>
  );
};
