'use client';

import React, { useEffect } from 'react';

type FilterSectionProps = {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  onClear?: () => void;
  showClear?: boolean;
  children: React.ReactNode;
};

function FilterSection({ title, expanded, onToggle, onClear, showClear, children }: FilterSectionProps) {
  return (
    <div className="bg-white mb-4 rounded-xl shadow-sm border border-gray-100">
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-[13px] text-gray-700"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
          <span
            className={`font-semibold ${
              expanded ? 'text-[var(--primary-blue)]' : 'text-gray-700'
            }`}
          >
            {title}
          </span>
        </div>
        {showClear && (
          <span 
            className="text-[11px] text-[var(--primary-blue)] hover:underline cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onClear && onClear();
            }}
          >
            Clear
          </span>
        )}
      </button>
      {expanded && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

function CheckLabel({ label, checked, onChange }: { label: string; checked?: boolean; onChange?: () => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer text-[13px] text-gray-600">
      <input 
        type="checkbox" 
        className="accent-[var(--primary-blue)]" 
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
}

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { AppDispatch, RootState } from '../../../src/store';
import { fetchCategories, fetchEventsByCategory } from '../../../src/controllers/categoryController';
import { clearCategoryEvents, setSelectedDates, setDateRange, setSelectedPrices } from '../../../src/store/categorySlice';
import { MovieCard } from '../../../src/components/ui/MovieCard';
import { SectionHeader } from '../../../src/components/ui/SectionHeader';
import { CustomDateRangePicker } from '../../../src/components/ui/CustomDateRangePicker';

export default function CategorySlugPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const dispatch = useDispatch<AppDispatch>();

  const { categories, categoriesLoading, categoryEvents, categoryEventsLoading, categoryEventsError, selectedDates, dateRange, selectedPrices } =
    useSelector((state: RootState) => state.categories);

  // Fetch categories if not already loaded
  useEffect(() => {
    if (categories.length === 0) dispatch(fetchCategories());
  }, [dispatch, categories.length]);

  // Fetch events whenever slug changes — cleanup resets state on slug change / unmount
  useEffect(() => {
    let promise: any;
    if (slug) {
      promise = dispatch(fetchEventsByCategory(slug));
    }
    return () => {
      if (promise) promise.abort();
      dispatch(clearCategoryEvents());
    };
  }, [slug, dispatch]);

  const activeCategory = categories.find((c) => c.slug === slug);

  // ── Filter Section (collapsible) ──────────────────────────
  const [expandedFilters, setExpandedFilters] = React.useState<Record<string, boolean>>({
    Categories: true,
    Date: true,
    Languages: true,
    "More Filters": true,
    Price: true,
  });

  const toggleFilterSection = (section: string) => {
    setExpandedFilters((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const [showDateRange, setShowDateRange] = React.useState(false);
  const [showDatePickerModal, setShowDatePickerModal] = React.useState(false);

  const toggleDateFilter = (value: string) => {
    const newDates = selectedDates.includes(value) 
      ? selectedDates.filter(v => v !== value) 
      : [...selectedDates, value];
    dispatch(setSelectedDates(newDates));
  };

  const togglePriceFilter = (value: string) => {
    const newPrices = selectedPrices.includes(value) 
      ? selectedPrices.filter(v => v !== value) 
      : [...selectedPrices, value];
    dispatch(setSelectedPrices(newPrices));
  };

  const isToday = (date: Date, today: Date) => {
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };

  const isTomorrow = (date: Date, today: Date) => {
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return date.getDate() === tomorrow.getDate() && date.getMonth() === tomorrow.getMonth() && date.getFullYear() === tomorrow.getFullYear();
  };

  const isThisWeekend = (date: Date, today: Date) => {
    const day = date.getDay();
    if (day !== 0 && day !== 6) return false;
    
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (today.getDay() === 0) {
      return diffDays === 0;
    }
    
    return diffDays >= 0 && diffDays <= 7 - today.getDay();
  };

  const filteredEvents = React.useMemo(() => {
    let result = [...categoryEvents];

    if (selectedDates.length > 0 || dateRange.start || dateRange.end) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      result = result.filter(event => {
        if (!event.event_date) return false;
        const eventDate = new Date(event.event_date);
        eventDate.setHours(0, 0, 0, 0);

        let matchesPill = false;
        if (selectedDates.length > 0) {
          if (selectedDates.includes('Today') && isToday(eventDate, today)) matchesPill = true;
          if (selectedDates.includes('Tomorrow') && isTomorrow(eventDate, today)) matchesPill = true;
          if (selectedDates.includes('This Weekend') && isThisWeekend(eventDate, today)) matchesPill = true;
        }

        let matchesRange = false;
        if (dateRange.start || dateRange.end) {
          matchesRange = true;
          if (dateRange.start) {
            const start = new Date(dateRange.start);
            start.setHours(0, 0, 0, 0);
            if (eventDate < start) matchesRange = false;
          }
          if (dateRange.end) {
            const end = new Date(dateRange.end);
            end.setHours(0, 0, 0, 0);
            if (eventDate > end) matchesRange = false;
          }
        }

        if (selectedDates.length > 0 && (dateRange.start || dateRange.end)) {
          return matchesPill || matchesRange;
        } else if (selectedDates.length > 0) {
          return matchesPill;
        } else {
          return matchesRange;
        }
      });
    }

    if (selectedPrices.length > 0) {
      result = result.filter(event => {
        const price = parseFloat(event.ticket_price || '0');
        
        if (selectedPrices.includes('Free') && (price === 0 || event.is_free)) return true;
        if (selectedPrices.includes('₹0 – ₹500') && price >= 0 && price <= 500) return true;
        if (selectedPrices.includes('₹501 – ₹2000') && price >= 501 && price <= 2000) return true;
    if (selectedPrices.includes('₹2000+') && price > 2000) return true;

        return false;
      });
    }

    return result;
  }, [categoryEvents, selectedDates, selectedPrices]);

  return (
    <div className="min-h-screen" style={{ background: 'var(--gray-50)' }}>
      <div className="container-max py-8 flex flex-col md:flex-row gap-6">

        {/* ── Left Sidebar ── */}
        <div className="w-full md:w-[270px] flex-shrink-0 hidden md:block">
          <h2 className="text-xl font-black text-gray-800 mb-4">Filters</h2>

          <FilterSection 
            title="Categories" 
            expanded={expandedFilters['Categories']} 
            onToggle={() => toggleFilterSection('Categories')}
          >

            <div className="flex flex-wrap gap-2">
              {categoriesLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <span key={i} className="h-6 w-16 bg-gray-100 rounded animate-pulse inline-block" />
                  ))
                : categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/category/${c.slug}`}
                      className={`px-3 py-1.5 text-[12px] rounded border transition-colors font-medium ${
                        slug === c.slug
                          ? 'border-[var(--primary-blue)] text-[var(--primary-blue)] bg-blue-50'
                          : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50'
                      }`}
                    >
                      {c.name}
                    </Link>
                  ))}
            </div>
          </FilterSection>

          <FilterSection 
            title="Date" 
            expanded={expandedFilters['Date']} 
            onToggle={() => toggleFilterSection('Date')}
            showClear={selectedDates.length > 0 || !!dateRange.start || !!dateRange.end}
            onClear={() => {
              dispatch(setSelectedDates([]));
              dispatch(setDateRange({ start: '', end: '' }));
            }}
          >
            <div className="flex flex-col gap-4">
              {/* Predefined Date Pills */}
              <div className="flex flex-wrap gap-2">
                {['Today', 'Tomorrow', 'This Weekend'].map(label => {
                  const isActive = selectedDates.includes(label);
                  return (
                    <button
                      key={label}
                      onClick={() => toggleDateFilter(label)}
                      className={`px-3 py-1.5 text-[12px] rounded border transition-colors ${
                        isActive 
                          ? 'border-[var(--primary-blue)] text-white bg-[var(--primary-blue)]' 
                          : 'border-gray-200 text-[var(--primary-blue)] bg-white hover:bg-blue-50'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Date Range Checkbox & Inputs */}
              <div>
                <CheckLabel 
                  label="Date Range" 
                  checked={showDateRange || !!dateRange.start || !!dateRange.end}
                  onChange={() => {
                    const isActive = showDateRange || dateRange.start || dateRange.end;
                    if (isActive) {
                      setShowDateRange(false);
                      setShowDatePickerModal(false);
                      dispatch(setDateRange({ start: '', end: '' }));
                    } else {
                      setShowDateRange(true);
                      setShowDatePickerModal(true);
                    }
                  }}
                />
                
                {(showDateRange || dateRange.start || dateRange.end) && (
                  <div className="mt-3 flex items-center gap-2 relative">
                    <button
                      onClick={() => setShowDatePickerModal(!showDatePickerModal)}
                      className="flex-1 flex items-center justify-between text-[11px] border border-gray-200 rounded px-2 py-1.5 outline-none hover:border-[var(--primary-blue)] transition-colors text-gray-600 bg-white"
                    >
                      {dateRange.start ? new Date(dateRange.start).toLocaleDateString('en-GB') : 'dd-mm-yyyy'}
                      <Calendar className="w-3 h-3 text-gray-400" />
                    </button>
                    <span className="text-gray-400 text-[10px]">-</span>
                    <button
                      onClick={() => setShowDatePickerModal(!showDatePickerModal)}
                      className="flex-1 flex items-center justify-between text-[11px] border border-gray-200 rounded px-2 py-1.5 outline-none hover:border-[var(--primary-blue)] transition-colors text-gray-600 bg-white"
                    >
                      {dateRange.end ? new Date(dateRange.end).toLocaleDateString('en-GB') : 'dd-mm-yyyy'}
                      <Calendar className="w-3 h-3 text-gray-400" />
                    </button>

                    {showDatePickerModal && (
                      <CustomDateRangePicker
                        initialStart={dateRange.start}
                        initialEnd={dateRange.end}
                        onApply={(start, end) => {
                          dispatch(setDateRange({ start, end }));
                          setShowDatePickerModal(false);
                        }}
                        onCancel={() => setShowDatePickerModal(false)}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </FilterSection>

          <FilterSection 
            title="Languages" 
            expanded={expandedFilters['Languages']} 
            onToggle={() => toggleFilterSection('Languages')}
          >
            <div className="flex flex-col gap-2">
              <CheckLabel label="English" />
              <CheckLabel label="Hindi" />
              <CheckLabel label="Gujarati" />
            </div>
          </FilterSection>

          {/* <FilterSection 
            title="More Filters" 
            expanded={expandedFilters['More Filters']} 
            onToggle={() => toggleFilterSection('More Filters')}
          >
            <div className="flex flex-col gap-2">
              <CheckLabel label="Online Streaming" />
              <CheckLabel label="Outdoor Events" />
            </div>
          </FilterSection> */}

          <FilterSection 
            title="Price" 
            expanded={expandedFilters['Price']} 
            onToggle={() => toggleFilterSection('Price')}
            showClear={selectedPrices.length > 0}
            onClear={() => dispatch(setSelectedPrices([]))}
          >
            <div className="flex flex-col gap-2">
              {['Free', '₹0 – ₹500', '₹501 – ₹2000','₹2000+'].map(label => (
                <CheckLabel 
                  key={label} 
                  label={label} 
                  checked={selectedPrices.includes(label)}
                  onChange={() => togglePriceFilter(label)}
                />
              ))}
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
          ) : filteredEvents.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-2xl shadow-sm border border-gray-100">
              <p className="text-lg font-bold text-gray-800">No Events Found</p>
              <p className="text-sm text-gray-400 mt-1">
                There are currently no events matching your filters.
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="flex flex-wrap justify-center sm:justify-start gap-6"
            >
              {filteredEvents.map((event) => (
                <div key={event.id} className="w-[160px] sm:w-[207px]">
                  <MovieCard
                    id={event.id}
                    slug={event.slug}
                    title={event.title}
                    description={(event as { hall?: { name?: string; city?: string } }).hall?.name
                      ? `${(event as { hall?: { name?: string; city?: string } }).hall?.name}, ${(event as { hall?: { name?: string; city?: string } }).hall?.city}`
                      : ''}
                    imageUrl={event.banner_url}
                    language={event.language}
                    eventType={event.event_type}
                    eventDate={event.event_date}
                    ticketPrice={event.ticket_price}
                  />
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
