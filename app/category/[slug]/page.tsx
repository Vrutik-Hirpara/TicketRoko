'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { AppDispatch, RootState } from '../../../src/store';
import { fetchCategories, fetchEventsByCategory } from '../../../src/controllers/categoryController';
import { clearCategoryEvents } from '../../../src/store/categorySlice';
import { MovieCard } from '../../../src/components/ui/MovieCard';
import { SectionHeader } from '../../../src/components/ui/SectionHeader';

export default function CategorySlugPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const dispatch = useDispatch<AppDispatch>();

  const { categories, categoriesLoading, categoryEvents, categoryEventsLoading, categoryEventsError, activeSlug } =
    useSelector((state: RootState) => state.categories);

  // Fetch categories if not already loaded
  useEffect(() => {
    if (categories.length === 0) dispatch(fetchCategories());
  }, [dispatch, categories.length]);

  // Fetch events whenever slug changes
  useEffect(() => {
    if (slug && slug !== activeSlug) {
      dispatch(fetchEventsByCategory(slug));
    }
    return () => { dispatch(clearCategoryEvents()); };
  }, [slug, dispatch]);

  const activeCategory = categories.find((c) => c.slug === slug);

  // ── Filter Section (collapsible) ──────────────────────────
  const [expandedFilters, setExpandedFilters] = React.useState<Record<string, boolean>>({
    Categories: true,
  });
  const toggleFilter = (name: string) =>
    setExpandedFilters((prev) => ({ ...prev, [name]: !prev[name] }));

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-white mb-4 rounded-xl shadow-sm border border-gray-100">
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-[13px] text-gray-700"
        onClick={() => toggleFilter(title)}
      >
        <div className="flex items-center gap-2">
          {expandedFilters[title] ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
          <span
            className={`font-semibold ${
              expandedFilters[title] ? 'text-[var(--primary-blue)]' : 'text-gray-700'
            }`}
          >
            {title}
          </span>
        </div>
        <span className="text-[11px] text-[var(--primary-blue)] hover:underline cursor-pointer">
          Clear
        </span>
      </button>
      {expandedFilters[title] && <div className="px-4 pb-4">{children}</div>}
    </div>
  );

  const CheckLabel = ({ label }: { label: string }) => (
    <label className="flex items-center gap-2 cursor-pointer text-[13px] text-gray-600">
      <input type="checkbox" className="accent-[var(--primary-blue)]" />
      {label}
    </label>
  );

  return (
    <div className="min-h-screen" style={{ background: 'var(--gray-50)' }}>
      <div className="container-max py-8 flex flex-col md:flex-row gap-6">

        {/* ── Left Sidebar ── */}
        <div className="w-full md:w-[270px] flex-shrink-0 hidden md:block">
          <h2 className="text-xl font-black text-gray-800 mb-4">Filters</h2>

          <FilterSection title="Categories">
            <div className="flex flex-wrap gap-2">
              {categoriesLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <span key={i} className="h-6 w-16 bg-gray-100 rounded animate-pulse inline-block" />
                  ))
                : categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/category/${c.slug}`}
                      className={`px-3 py-1.5 text-[12px] rounded border transition-colors ${
                        slug === c.slug
                          ? 'border-[var(--primary-blue)] text-[var(--primary-blue)] bg-blue-50 font-semibold'
                          : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50'
                      }`}
                    >
                      {c.name}
                    </Link>
                  ))}
            </div>
          </FilterSection>

          <FilterSection title="Date">
            <div className="flex flex-col gap-2">
              <CheckLabel label="Today" />
              <CheckLabel label="Tomorrow" />
              <CheckLabel label="This Weekend" />
            </div>
          </FilterSection>

          <FilterSection title="Languages">
            <div className="flex flex-col gap-2">
              <CheckLabel label="English" />
              <CheckLabel label="Hindi" />
              <CheckLabel label="Gujarati" />
            </div>
          </FilterSection>

          <FilterSection title="More Filters">
            <div className="flex flex-col gap-2">
              <CheckLabel label="Online Streaming" />
              <CheckLabel label="Outdoor Events" />
            </div>
          </FilterSection>

          <FilterSection title="Price">
            <div className="flex flex-col gap-2">
              <CheckLabel label="Free" />
              <CheckLabel label="₹0 – ₹500" />
              <CheckLabel label="₹501 – ₹2000" />
            </div>
          </FilterSection>

          <button
            className="w-full py-2.5 mt-2 bg-white rounded-lg text-[13px] font-semibold transition-colors"
            style={{
              color: 'var(--primary-blue)',
              border: '1px solid var(--primary-blue)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#EFF6FF')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
          >
            Browse by Venues
          </button>
        </div>

        {/* ── Main Content ── */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-6">
            <div className="mb-4">
              <SectionHeader
                title={`${activeCategory?.name || 'Events'} In Your City`}
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categoriesLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="h-8 w-20 bg-gray-200 rounded-full animate-pulse inline-block" />
                  ))
                : categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/category/${c.slug}`}
                      className={`px-4 py-1.5 text-[12px] rounded-full border font-medium transition-colors ${
                        slug === c.slug
                          ? 'text-white bg-[var(--primary-blue)] border-[var(--primary-blue)]'
                          : 'border-[var(--primary-blue)] text-[var(--primary-blue)] bg-white hover:bg-blue-50'
                      }`}
                    >
                      {c.name}
                    </Link>
                  ))}
            </div>
          </div>

          {/* Events Grid */}
          {categoryEventsLoading ? (
            <div className="flex justify-center py-20">
              <div
                className="animate-spin rounded-full h-8 w-8 border-b-2"
                style={{ borderColor: 'var(--primary-blue)' }}
              />
            </div>
          ) : categoryEventsError ? (
            <div className="py-10 text-center text-red-500 font-medium bg-red-50 rounded-xl border border-red-100">
              {categoryEventsError}
            </div>
          ) : categoryEvents.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-2xl shadow-sm border border-gray-100">
              <p className="text-lg font-bold text-gray-800">No Events Found</p>
              <p className="text-sm text-gray-400 mt-1">
                There are currently no events in this category.
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {categoryEvents.map((event) => (
                <MovieCard
                  key={event.id}
                  id={event.id}
                  slug={event.slug}
                  title={event.title}
                  description={(event as any).hall?.name
                    ? `${(event as any).hall.name}, ${(event as any).hall.city}`
                    : ''}
                  imageUrl={event.banner_url}
                  language={event.language}
                  eventType={event.event_type}
                  eventDate={event.event_date}
                  ticketPrice={event.ticket_price}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
