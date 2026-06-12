'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CalendarDays, AlertCircle } from 'lucide-react';
import { AppDispatch, RootState } from '../../../src/store';
import { fetchUpcomingEvents } from '../../../src/controllers/profileController';
import { MovieCard } from '../../../src/components/ui/MovieCard';

export default function UpcomingEventsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isAuthenticated, hydrated } = useSelector((s: RootState) => s.auth);
  const { upcomingEvents, upcomingEventsLoading, upcomingEventsError, upcomingEventsPagination } = useSelector((s: RootState) => s.profile);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!hydrated) return;
    dispatch(fetchUpcomingEvents({ page, limit: 20 }));
  }, [dispatch, hydrated, page]);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-max py-8 mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Upcoming Events</h1>
          <p className="text-gray-500 text-sm mt-1">Your upcoming booked experiences</p>
        </div>

        {upcomingEventsLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
                <div className="h-40 bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {upcomingEventsError && !upcomingEventsLoading && (
          <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-100 text-red-600">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm">{upcomingEventsError}</p>
          </div>
        )}

        {!upcomingEventsLoading && !upcomingEventsError && upcomingEvents.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <CalendarDays className="w-14 h-14 text-gray-200 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700">No upcoming events</h3>
            <p className="text-gray-400 text-sm mt-1 mb-6">Events you have booked will appear here</p>
            <Link href="/" className="px-6 py-2.5 bg-[var(--primary-blue)] text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
              Explore Events
            </Link>
          </div>
        )}

        {!upcomingEventsLoading && upcomingEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          >
            {upcomingEvents.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <div className="relative group">
                  <MovieCard
                    id={event.id}
                    slug={event.slug}
                    title={event.title}
                    description={event.description}
                    imageUrl={event.banner_url}
                    language={event.language}
                    eventType={event.event_type}
                    eventDate={event.event_date}
                    ticketPrice={event.ticket_price}
                  />
                  <div className="absolute top-2 right-2 pointer-events-none z-10">
                    <span className="px-2 py-0.5 bg-[var(--primary-blue)] text-white text-[10px] font-semibold rounded-full shadow-sm">
                      Upcoming
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!upcomingEventsLoading && upcomingEventsPagination && upcomingEventsPagination.totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-4">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600 font-medium">
              Page {page} of {upcomingEventsPagination.totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(upcomingEventsPagination.totalPages, p + 1))}
              disabled={page >= upcomingEventsPagination.totalPages}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
