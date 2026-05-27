'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  ChevronDown,
  Info,
  Heart,
  Search,
} from 'lucide-react';
import type { BookingEvent } from '../../types/booking';

interface EventBookingDetailsProps {
  event: BookingEvent;
  selectedTiming: string | null;
  onSelectTiming: (timing: string) => void;
  onBookTickets: () => void;
  showSeatSection: boolean;
}

export function EventBookingDetails({
  event,
  selectedTiming,
  onSelectTiming,
  onBookTickets,
  showSeatSection,
}: EventBookingDetailsProps) {
  const router = useRouter();

  // Generate only the event's exact date
  const dateList = useMemo(() => {
    const startFrom = new Date(event.date);

    // Check if startFrom is a valid Date
    if (isNaN(startFrom.getTime())) {
      return [];
    }

    const weekday = startFrom.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    const day = startFrom.getDate();
    const month = startFrom.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const fullStr = startFrom.toDateString();

    return [{ weekday, day, month, fullStr }];
  }, [event.date]);

  const [selectedDate, setSelectedDate] = useState(dateList[0]?.fullStr || '');

  // Dynamic list of cinemas based only on actual event data (no dummy/mock entries)
  const cinemas = useMemo(() => {
    const hallName = event.hallName || 'Mamta Hall';
    return [
      {
        id: 1,
        name: hallName,
        city: event.city || '',
        // cancellation: 'Cancellation available',
        favored: false,
        timings: event.showTimings.map((time) => ({
          time,
          format: '2D',
          status: 'available' as 'available' | 'fast-filling',
        })),
      },
    ];
  }, [event]);

  // Extract metadata age restriction or default to U/A
  const ageRestriction = event.ageRestriction || 'U/A';

  return (
    <div className="w-full bg-[#f2f2f2] min-h-screen text-gray-900 pb-20">

      {/* 1. MOVIE TITLE HEADER BLOCK */}
      <header className="bg-white border-b border-gray-200 py-5 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <button
              onClick={() => router.back()}
              className="p-1 rounded-full hover:bg-gray-100 transition mt-1"
              aria-label="Back"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div className="text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight leading-tight">
                {event.title} - {event.language}
              </h1>

              {/* Metadata Sub-labels */}
              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs md:text-sm" style={{ color: 'var(--gray-500)' }}>
                <span className="px-2 py-0.5 border border-gray-300 rounded-full font-medium" style={{ background: 'var(--duration-bg)', borderColor: 'var(--duration-border)' }}>
                  Movie runtime: 2h 15m
                </span>
                <span className="px-2 py-0.5 border border-gray-300 rounded-full font-medium" style={{ background: 'var(--age-restriction-bg)', color: 'var(--age-restriction-color)', borderColor: 'var(--age-restriction-border)' }}>
                  {ageRestriction}
                </span>
                <span className="px-2 py-0.5 border border-gray-300 rounded-full font-medium" style={{ background: 'var(--eventtype-bg)', borderColor: 'var(--eventtype-border)' }}>
                  {event.eventType}
                </span>
                <span className="px-2 py-0.5 border border-gray-300 rounded-full font-medium" style={{ background: 'var(--format-bg)', borderColor: 'var(--format-border)' }}>
                  2D
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. DATE SELECTOR & FILTERS ROW */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-3 py-3">

          {/* Horizontal scrollable date selection */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
            {dateList.map((item, idx) => {
              const isSelected = selectedDate === item.fullStr || dateList.length === 1;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(item.fullStr)}
                  className={`flex flex-col items-center justify-center min-w-[62px] h-[72px] rounded-lg transition-all border ${isSelected
                      ? 'bg-[var(--primary-blue)] border-[var(--primary-blue)] text-white shadow-md'
                      : 'border-transparent text-gray-600 hover:text-gray-950 hover:bg-gray-50'
                    }`}
                >
                  <span className="text-[10px] font-semibold tracking-wider">{item.weekday}</span>
                  <span className="text-lg font-extrabold mt-0.5 leading-none">{item.day}</span>
                  <span className="text-[9px] font-bold tracking-wider mt-0.5">{item.month}</span>
                </button>
              );
            })}
          </div>

          {/* BookMyShow Style Filters */}
          {/* <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 select-none overflow-x-auto no-scrollbar py-1">
            <span className="px-3 py-2 border border-gray-200 rounded-md bg-white font-medium cursor-pointer hover:bg-gray-50 shrink-0">
              {event.language} • 2D
            </span>
            <span className="px-3 py-2 border border-gray-200 rounded-md bg-white font-medium cursor-pointer hover:bg-gray-50 shrink-0 flex items-center gap-1">
              Price Range <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </span>
            <span className="px-3 py-2 border border-gray-200 rounded-md bg-white font-medium cursor-pointer hover:bg-gray-50 shrink-0 flex items-center gap-1">
              Special Formats <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </span>
            <span className="px-3 py-2 border border-gray-200 rounded-md bg-white font-medium cursor-pointer hover:bg-gray-50 shrink-0 flex items-center gap-1">
              Preferred Time <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </span>
            <span className="px-3 py-2 border border-gray-200 rounded-md bg-white font-medium cursor-pointer hover:bg-gray-50 shrink-0 flex items-center gap-1">
              Sort By <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </span>
            <button className="p-2 border border-gray-200 rounded-md bg-white hover:bg-gray-50 shrink-0">
              <Search className="w-3.5 h-3.5 text-gray-500" />
            </button>
          </div> */}

        </div>
      </div>

      {/* 3. SHOWTIME LEGEND / STATUS BAR */}
      {/* <div className="bg-[#f9f9f9] border-b border-gray-200 px-4 md:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-gray-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 cursor-pointer hover:text-gray-800">
              🕒 Late night shows
            </span>
            <span className="flex items-center gap-1.5 cursor-pointer hover:text-gray-800">
              🌅 Early morning shows
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4abd5d]" /> AVAILABLE
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff9800]" /> FAST FILLING
            </span>
          </div>
        </div>
      </div> */}

      {/* 4. THEATER / SHOWTIME LIST */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100 overflow-hidden">
          {cinemas.map((cinema) => (
            <div key={cinema.id} className="p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-6">

              {/* Cinema Info block */}
              <div className="md:w-1/3 flex items-start gap-3.5 text-left shrink-0">
                {/* <button className="text-gray-400 hover:text-[#f84464] transition mt-1">
                  <Heart className={`w-[18px] h-[18px] ${cinema.favored ? 'fill-[#f84464] text-[#f84464]' : ''}`} />
                </button> */}
                <div>
                  <h3 className="font-bold text-gray-900 text-[15px] md:text-[16px] hover:underline cursor-pointer flex items-center gap-1">
                    {cinema.name}
                    <Info className="w-4 h-4 text-gray-400 cursor-pointer inline" />
                  </h3>

                  {/* Cancellation Label */}
                  {/* <span className="inline-block mt-2 text-[11px] font-semibold text-gray-400">
                    {cinema.cancellation}
                  </span> */}
                </div>
              </div>

              {/* Show timings block */}
              <div className="flex-1 flex flex-wrap gap-3">
                {cinema.timings.map((t, idx) => {
                  const isFastFilling = t.status === 'fast-filling';
                  return (
                    <button
                      key={idx}
                      onClick={() => onSelectTiming(t.time)}
                      className={`min-w-[106px] px-3 py-2 border rounded-md text-center transition hover:scale-[1.02] cursor-pointer flex flex-col items-center justify-center ${isFastFilling
                          ? 'border-[#ff9800] text-[#ff9800] hover:bg-[#ff9800]/5'
                          : 'border-[#4abd5d] text-[#4abd5d] hover:bg-[#4abd5d]/5'
                        }`}
                    >
                      <span className="text-[13px] font-bold">{t.time}</span>
                      <span className="text-[9px] font-semibold text-gray-400 mt-0.5">{t.format}</span>
                    </button>
                  );
                })}
              </div>

            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
