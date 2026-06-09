'use client';

import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { AppDispatch, RootState } from '../../store';
import { fetchPaginatedEvents } from '../../controllers/eventController';
import { MovieCard } from '../ui/MovieCard';
import { SectionHeader } from '../ui/SectionHeader';

interface CategoryViewProps {
  categoryType: string; // e.g. 'movie', 'play', 'sport', 'activity', 'stream'
  title: string;        // e.g. 'Movies', 'Plays', 'Sports', etc.
}

export const CategoryView: React.FC<CategoryViewProps> = ({ categoryType, title }) => {
  const dispatch = useDispatch<AppDispatch>();
  
  // Use state.movies
  const { allEvents, allEventsLoading, error } = useSelector(
    (state: RootState) => state.movies
  );
  const { location } = useSelector((state: RootState) => state.app);

  // Re-fetch whenever selected city changes
  const citySlug = location?.slug;
  useEffect(() => {
    dispatch(fetchPaginatedEvents({ page: 1, limit: 100 }));
  }, [dispatch, citySlug]);

  // Filter events matching the given category (case-insensitive)
  const filteredEvents = useMemo(() => {
    if (!allEvents) return [];
    return allEvents.filter((event) => {
      if (!event.event_type) return false;
      
      const typeLower = event.event_type.toLowerCase();
      const targetLower = categoryType.toLowerCase();
      
      // Match singular or plural variations (e.g. 'play' matches 'plays', 'sport' matches 'sports')
      return (
        typeLower === targetLower ||
        typeLower === `${targetLower}s` ||
        `${typeLower}s` === targetLower
      );
    });
  }, [allEvents, categoryType]);

  const SkeletonCard = () => (
    <div className="flex-shrink-0 w-[207px] animate-pulse">
      <div className="w-[207px] h-[352px] rounded-[10px] bg-gray-200" />
      <div className="flex flex-col gap-2 mt-3">
        <div className="h-4 rounded bg-gray-200 w-3/4" />
        <div className="h-3 rounded bg-gray-100 w-1/2" />
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
          <SectionHeader title={title} />
          {!allEventsLoading && (
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-2xl self-start sm:self-auto"
              style={{ background: 'var(--white)', border: '1px solid var(--gray-100)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: 'var(--primary-blue)' }} />
              <span className="text-sm font-semibold text-gray-800">
                {filteredEvents.length} {title} Available
              </span>
            </div>
          )}
        </div>

        {/* Loading / Error States */}
        {allEventsLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-y-10 gap-x-6 justify-items-center">
            {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <p className="text-sm font-semibold px-6 py-4 rounded-2xl text-red-700 bg-red-50 border border-red-200">
              {error}
            </p>
            <button
              onClick={() => dispatch(fetchPaginatedEvents({ page: 1, limit: 100 }))}
              className="text-sm font-semibold px-6 py-3 rounded-full text-white transition-colors"
              style={{ background: 'var(--primary-blue)' }}
            >
              Try Again
            </button>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-lg font-bold text-gray-800">No {title} Listed Yet</p>
            <p className="text-sm text-gray-400 mt-1">Check back later for new listings!</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-y-10 gap-x-6 justify-items-center"
          >
            {filteredEvents.map((event) => (
              <MovieCard
                key={event.id}
                id={event.id}
                slug={event.slug}
                title={event.title}
                description={event.description}
                imageUrl={event.banner_url}
                language={event.language}
                eventType={event.event_type}
                eventDate={event.event_date}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};
