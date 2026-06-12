'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MovieCard } from '../ui/MovieCard';
import { CarouselArrows } from '../ui/CarouselArrows';
import { RootState } from '../../store';
import { BASE_URL } from '../../utils/constants';
import { EventData } from '../../store/movieSlice';

export const CategoryEventsSection = ({ category }: { category: any }) => {
  const { location } = useSelector((state: RootState) => state.app);
  const router = useRouter();

  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const isDraggingRef = React.useRef(false);
  const hasDraggedRef = React.useRef(false);
  const startXRef = React.useRef(0);
  const scrollLeftRef = React.useRef(0);

  const [showLeftArrow, setShowLeftArrow] = React.useState(false);
  const [showRightArrow, setShowRightArrow] = React.useState(false);

  const citySlug = location?.slug;

  useEffect(() => {
    let isMounted = true;
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const endpoint = citySlug 
          ? `${BASE_URL}/events/category/${category.slug}?city=${citySlug}` 
          : `${BASE_URL}/events/category/${category.slug}`;
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        const json = await res.json();
        if (isMounted) {
          if (json.success && Array.isArray(json.data)) {
            setEvents(json.data);
          } else {
            setEvents([]);
          }
          setLoading(false);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Error fetching events');
          setLoading(false);
        }
      }
    };
    fetchEvents();
    return () => { isMounted = false; };
  }, [category.slug, citySlug]);

  const updateArrowVisibility = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const canScrollLeft = el.scrollLeft > 5;
    const canScrollRight = el.scrollLeft < el.scrollWidth - el.clientWidth - 5;
    setShowLeftArrow(canScrollLeft);
    setShowRightArrow(canScrollRight);
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(updateArrowVisibility, 500);
    window.addEventListener('resize', updateArrowVisibility);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateArrowVisibility);
    };
  }, [events, updateArrowVisibility]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grabbing';
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 2;
    if (Math.abs(x - startXRef.current) > 4) hasDraggedRef.current = true;
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
    updateArrowVisibility();
  };

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 1195;
    el.scrollTo({
      left: el.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
      behavior: 'smooth'
    });
    setTimeout(updateArrowVisibility, 350);
  };

  const handleCardClick = (slug: string) => {
    if (!hasDraggedRef.current) {
      router.push(`/events/${slug}`);
    }
  };

  if (!loading && !error && events.length === 0) {
    return null; // Do not render section if no events
  }

  return (
    <div className="relative" style={{ minHeight: '380px' }}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-2xl font-bold text-gray-900 capitalize">{category.name}</h3>
      </div>

      <div className="relative w-full">
        <CarouselArrows 
          showLeft={showLeftArrow} 
          showRight={showRightArrow} 
          onScroll={scroll} 
        />

        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onScroll={updateArrowVisibility}
          className="flex gap-8 overflow-x-auto no-scrollbar pt-4 pb-8 select-none scroll-smooth snap-x snap-mandatory"
          style={{ cursor: 'grab' }}
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[207px] animate-pulse snap-start"
              >
                <div className="w-[207px] h-[352px] rounded-[10px] bg-gray-200" />
                <div className="flex flex-col gap-2 mt-3">
                  <div className="h-4 rounded bg-gray-200 w-3/4" />
                  <div className="h-3 rounded bg-gray-100 w-1/2" />
                </div>
              </div>
            ))
          ) : error ? (
            <div
              className="flex w-full h-[300px] items-center justify-center text-sm"
              style={{ color: '#EF4444' }}
            >
              {error}
            </div>
          ) : events.length > 0 ? (
            events.map((event, idx) => (
              <div
                key={event.id}
                className="flex-shrink-0 w-[207px] snap-start"
              >
                <MovieCard
                  id={event.id}
                  index={idx}
                  slug={event.slug}
                  title={event.title}
                  description={event.description}
                  imageUrl={event.banner_url}
                  language={event.language}
                  eventType={event.event_type}
                  eventDate={event.event_date}
                  onClick={() => handleCardClick(event.slug)}
                />
              </div>
            ))
          ) : null}
        </div>
      </div>
    </div>
  );
};
