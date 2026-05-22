'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { AppDispatch, RootState } from '../../../src/store';
import { fetchTrendingEvents } from '../../../src/controllers/eventController';
import { MovieCard } from '../../../src/components/ui/MovieCard';
import { SectionHeader } from '../../../src/components/ui/SectionHeader';

/**
 * VIEW: Dedicated Trending Events page.
 * Accessible via /events/trending browser URL.
 * Fetches directly from the https://api.ticketroko.retailian.in/api/events/trending endpoint.
 */
export default function TrendingEventsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { trending, trendingLoading, trendingError } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    dispatch(fetchTrendingEvents());
  }, [dispatch]);

  const SkeletonCard = () => (
    <div className="flex-shrink-0 w-[246px] bg-white rounded-[18px] p-[4px] shadow-xl animate-pulse">
      <div className="w-[238px] h-[161px] rounded-[16px]" style={{ background: 'var(--gray-200)' }} />
      <div className="flex flex-col gap-3 w-[210px] my-[18px] mx-[14px]">
        <div className="h-4 rounded-full w-3/4" style={{ background: 'var(--gray-200)' }} />
        <div className="h-3 rounded-full w-1/2" style={{ background: 'var(--gray-100)' }} />
        <div className="flex justify-end">
          <div className="h-7 rounded-full w-1/3" style={{ background: 'var(--gray-200)' }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-10" style={{ background: 'var(--gray-50)' }}>
      <div className="container-max">

        {/* Header */}
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 gap-4"
          style={{ borderBottom: '1px solid var(--gray-200)' }}
        >
          <SectionHeader title="Trending Events" />
          {trending.length > 0 && (
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-2xl self-start sm:self-auto"
              style={{ background: 'var(--white)', border: '1px solid var(--gray-100)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
            >
              <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: 'var(--primary-blue)' }} />
              <span className="text-sm font-semibold" style={{ color: 'var(--black)' }}>
                {trending.length} Trending Events
              </span>
            </div>
          )}
        </div>

        {/* Loading */}
        {trendingLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-items-center">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : trendingError ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <p className="text-sm font-semibold px-6 py-4 rounded-2xl"
              style={{ color: '#EF4444', background: '#FEF2F2', border: '1px solid #FECACA' }}>
              {trendingError}
            </p>
            <button
              onClick={() => dispatch(fetchTrendingEvents())}
              className="text-sm font-semibold px-6 py-3 rounded-full transition"
              style={{ background: 'var(--primary-blue)', color: 'var(--white)' }}
            >
              Try Again
            </button>
          </div>
        ) : trending.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-lg font-medium" style={{ color: 'var(--gray-500)' }}>No trending events found.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-items-center"
          >
            {trending.map((event) => (
              <MovieCard
                key={event.id}
                id={event.id}
                slug={event.slug}
                title={event.title}
                description={event.description}
                imageUrl={event.banner_url}
                language={event.language}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
