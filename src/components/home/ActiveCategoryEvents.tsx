'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CategoryEventsSection } from './CategoryEventsSection';

import { SectionHeader } from '../ui/SectionHeader';

export const ActiveCategoryEvents = () => {
  const { categories, categoriesLoading } = useSelector((state: RootState) => state.categories);

  if (categoriesLoading) return null;

  const activeCategories = categories.filter((c) => c.is_active);

  if (activeCategories.length === 0) return null;

  return (
    <section className="container-max py-10 overflow-hidden relative">
      <SectionHeader title="Top Categories" />
      <div className="flex flex-col gap-12 pt-10">
        {activeCategories.map((cat) => (
          <CategoryEventsSection key={cat.slug} category={cat} />
        ))}
      </div>
    </section>
  );
};
