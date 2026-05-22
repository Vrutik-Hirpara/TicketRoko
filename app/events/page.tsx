'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AppDispatch, RootState } from '../../src/store';
import { fetchPaginatedEvents } from '../../src/controllers/eventController';
import { MovieCard } from '../../src/components/ui/MovieCard';
import { SectionHeader } from '../../src/components/ui/SectionHeader';

/**
 * VIEW: Events Listing Page.
 * Responsive grid. Clicking a card navigates to /events/:slug.
 */
export default function EventsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { allEvents, allEventsLoading, pagination, error } = useSelector(
    (state: RootState) => state.movies
  );

  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  useEffect(() => {
    dispatch(fetchPaginatedEvents({ page, limit }));
  }, [dispatch, page, limit]);

  const handlePrevPage = () => {
    if (page > 1) { 
      setPage(page - 1); 
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }
  };
  
  const handleNextPage = () => {
    if (pagination && page < pagination.totalPages) { 
      setPage(page + 1); 
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }
  };

  const handlePageClick = (n: number) => { 
    setPage(n); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const getPageNumbers = () => pagination ? Array.from({ length: pagination.totalPages }, (_, i) => i + 1) : [];

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
          <SectionHeader title="All Events" />
          {pagination && (
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-2xl self-start sm:self-auto"
              style={{ background: 'var(--white)', border: '1px solid var(--gray-100)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
            >
              <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: 'var(--primary-blue)' }} />
              <span className="text-sm font-semibold" style={{ color: 'var(--black)' }}>
                {pagination.total} Events
              </span>
            </div>
          )}
        </div>

        {/* Loading */}
        {allEventsLoading || (!pagination && !error) ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-items-center">
            {Array.from({ length: limit }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <p className="text-sm font-semibold px-6 py-4 rounded-2xl"
              style={{ color: '#EF4444', background: '#FEF2F2', border: '1px solid #FECACA' }}>
              {error}
            </p>
            <button
              onClick={() => dispatch(fetchPaginatedEvents({ page, limit }))}
              className="text-sm font-semibold px-6 py-3 rounded-full transition"
              style={{ background: 'var(--primary-blue)', color: 'var(--white)' }}
            >
              Try Again
            </button>
          </div>
        ) : allEvents.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-lg font-medium" style={{ color: 'var(--gray-500)' }}>No events found.</p>
          </div>
        ) : (
          <>
            {/* Events Grid */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-items-center"
            >
              {allEvents.map((event) => (
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

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-14 flex-wrap">
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className="flex items-center justify-center w-10 h-10 rounded-xl transition border"
                  style={{
                    background: page === 1 ? 'var(--gray-100)' : 'var(--white)',
                    color: page === 1 ? 'var(--gray-400)' : 'var(--black)',
                    border: '1px solid var(--gray-200)',
                    cursor: page === 1 ? 'not-allowed' : 'pointer',
                  }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {getPageNumbers().map((num) => (
                  <button
                    key={num}
                    onClick={() => handlePageClick(num)}
                    className="w-10 h-10 rounded-xl text-sm font-semibold transition border"
                    style={{
                      background: page === num ? 'var(--primary-blue)' : 'var(--white)',
                      color: page === num ? 'var(--white)' : 'var(--black)',
                      border: page === num ? '1px solid var(--primary-blue)' : '1px solid var(--gray-200)',
                    }}
                  >
                    {num}
                  </button>
                ))}

                <button
                  onClick={handleNextPage}
                  disabled={page === pagination.totalPages}
                  className="flex items-center justify-center w-10 h-10 rounded-xl transition border"
                  style={{
                    background: page === pagination.totalPages ? 'var(--gray-100)' : 'var(--white)',
                    color: page === pagination.totalPages ? 'var(--gray-400)' : 'var(--black)',
                    border: '1px solid var(--gray-200)',
                    cursor: page === pagination.totalPages ? 'not-allowed' : 'pointer',
                  }}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}