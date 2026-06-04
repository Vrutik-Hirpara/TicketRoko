'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Ticket, Calendar, MapPin, ChevronRight, Clock, AlertCircle } from 'lucide-react';
import { AppDispatch, RootState } from '../../../src/store';
import { fetchMyBookings } from '../../../src/controllers/profileController';
import { getFullImageUrl } from '../../../src/utils/constants';
import { MovieCard } from '../../../src/components/ui/MovieCard';

export default function MyBookingsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isAuthenticated, hydrated } = useSelector((s: RootState) => s.auth);
  const { bookings, bookingsLoading, bookingsError } = useSelector((s: RootState) => s.profile);

  useEffect(() => {
    if (!hydrated) return;
    if (!isAuthenticated) { router.replace('/login'); return; }
    const controller = new AbortController();
    dispatch(fetchMyBookings({ signal: controller.signal }));
    return () => controller.abort();
  }, [dispatch, hydrated, isAuthenticated, router]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
    });
  };

  const statusColor = (status: string) => {
    if (status === 'confirmed' || status === 'success') return 'bg-green-700 text-green-700';
    if (status === 'pending') return 'bg-yellow-100 text-yellow-700';
    if (status === 'cancelled' || status === 'failed') return 'bg-red-100 text-red-700';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-max py-8 mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-500 text-sm mt-1">View all your bookings & purchases</p>
        </div>

        {/* Loading */}
        {bookingsLoading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 animate-pulse flex gap-4">
                <div className="w-16 h-20 bg-gray-200 rounded-lg shrink-0" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {bookingsError && !bookingsLoading && (
          <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-100 text-red-600">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm">{bookingsError}</p>
          </div>
        )}

        {/* Empty */}
        {!bookingsLoading && !bookingsError && bookings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Ticket className="w-14 h-14 text-gray-200 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700">No bookings yet</h3>
            <p className="text-gray-400 text-sm mt-1 mb-6">Book an event to see your tickets here</p>
            <Link href="/" className="px-6 py-2.5 bg-[var(--primary-blue)] text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
              Explore Events
            </Link>
          </div>
        )}

        {/* Booking Cards */}
        {!bookingsLoading && bookings.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          >
            {bookings.map((booking, i) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col relative"
              >
                <div className="relative group">
                  <MovieCard
                    id={booking.event?.id || booking.event_id}
                    slug={booking.event?.slug || ''}
                    title={booking.event?.title || `Booking #${booking.booking_ref}`}
                    description={booking.event?.city || 'Event'}
                    imageUrl={booking.event?.banner_url || ''}
                    language={booking.event?.language || ''}
                    eventType={booking.event?.event_type || ''}
                    eventDate={booking.event?.event_date || ''}
                  />
                  <div className="absolute top-2 right-2 pointer-events-none z-10 flex flex-col items-end gap-1">
                    <span className={`px-2 py-0.5 text-white text-[10px] font-semibold rounded-full shadow-sm ${statusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>

                {/* Booking details appended below the MovieCard */}
                <div className="mt-2 bg-white rounded-lg p-3 border border-gray-100 shadow-sm flex flex-col gap-1.5 text-xs">
                  <div className="flex justify-between items-center text-gray-700">
                    <span className="font-semibold text-gray-500">Ref:</span>
                    <span className="font-mono text-[11px]">{booking.booking_ref}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-500">Amount:</span>
                    <span className="font-bold text-[var(--primary-blue)]">₹{parseFloat(booking.total_amount || '0').toFixed(0)}</span>
                  </div>
                  {booking.seats && booking.seats.length > 0 && (
                    <div className="flex items-center gap-1.5 text-gray-600 border-t border-gray-50 pt-1.5 mt-1">
                      <Ticket className="w-3.5 h-3.5 shrink-0" />
                      <span className="line-clamp-1">{booking.seats.map(s => s.seat_label).join(', ')}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
