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
 * Displays all recommended events in a beautiful responsive grid.
 * Integrates pagination fetching from API via Controller.
 * Reuses the exquisite MovieCard component.
 */
export default function EventsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { allEvents, allEventsLoading, pagination, error } = useSelector(
    (state: RootState) => state.movies
  );

  const [page, setPage] = useState(1);
  const [limit] = useState(20); // Fetches 20 data items at a time

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

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    if (!pagination) return [];
    const totalPages = pagination.totalPages;
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container-max">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-6 mb-10 gap-4">
          <SectionHeader title="Recommended Events" />
          <div className="bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center gap-2 self-start md:self-auto">
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-sm font-semibold text-gray-700">
              Total Events: {pagination?.total ?? 0}
            </span>
          </div>
        </div>

        {/* Loading State */}
        {allEventsLoading || (!pagination && !error) ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-items-center">
            {Array.from({ length: limit }).map((_, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[250px] md:w-[265px] flex justify-center"
              >
                <div className="w-[246px] h-[340px] bg-white rounded-[18px] p-4 shadow-md animate-pulse flex flex-col gap-4">
                  <div className="w-full h-[161px] bg-gray-200 rounded-[16px]"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mt-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="flex justify-between items-center mt-auto">
                    <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-7 bg-gray-200 rounded-full w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-red-500 text-lg font-semibold bg-red-50 px-6 py-4 rounded-2xl border border-red-100 max-w-md shadow-sm">
              {error}
            </div>
            <button
              onClick={() => dispatch(fetchPaginatedEvents({ page, limit }))}
              className="mt-6 bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition shadow"
            >
              Try Again
            </button>
          </div>
        ) : allEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-gray-500 text-lg font-medium">No events found.</p>
          </div>
        ) : (
          <>
            {/* Events Grid */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-items-center"
            >
              {allEvents.map((event) => (
                <motion.div
                  key={event.id}
                  className="flex-shrink-0 w-[250px] md:w-[265px] flex justify-center"
                >
                  <MovieCard
                    title={event.title}
                    description={event.description}
                    imageUrl={event.banner_url}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination Controls */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-16">
                {/* Prev Button */}
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className={`flex items-center justify-center w-11 h-11 rounded-xl transition border shadow-sm ${page === 1
                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-blue-600'
                    }`}
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Page Number Buttons */}
                <div className="flex items-center gap-1.5">
                  {getPageNumbers().map((num) => (
                    <button
                      key={num}
                      onClick={() => handlePageClick(num)}
                      className={`w-11 h-11 rounded-xl text-sm font-semibold transition border ${page === num
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/10'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-blue-600'
                        }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNextPage}
                  disabled={page === pagination.totalPages}
                  className={`flex items-center justify-center w-11 h-11 rounded-xl transition border shadow-sm ${page === pagination.totalPages
                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-blue-600'
                    }`}
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}