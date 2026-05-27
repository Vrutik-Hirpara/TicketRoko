'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { MovieCard } from '../ui/MovieCard';
import { AppDispatch, RootState } from '../../store';
import { fetchRecommendedMovies } from '../../controllers/eventController';

/**
 * VIEW: Recommended Movies / Events section.
 * Drag-to-scroll uses refs (not state) — clicks always reach cards.
 * On card click → navigates to /events/:id via MovieCard.
 */

export const RecommendedMovies = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, loading, error } = useSelector((state: RootState) => state.movies);
  const router = useRouter();

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const isDraggingRef = React.useRef(false);
  const hasDraggedRef = React.useRef(false);
  const startXRef = React.useRef(0);
  const scrollLeftRef = React.useRef(0);

  const [showLeftArrow, setShowLeftArrow] = React.useState(false);
  const [showRightArrow, setShowRightArrow] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchRecommendedMovies());
  }, [dispatch]);

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
  }, [movies, updateArrowVisibility]);

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
    // Mathematically perfect step: 5 cards (207px width + 32px gap) = 1195px
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

  return (
    <section className="container-max py-10 overflow-hidden relative">
      <SectionHeader title="Recommended for You" viewAllLink="/events" />

      <div className="relative w-full">
        {/* Left Arrow Button */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute -left-4 top-[176px] -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition-all duration-300 z-40 shadow-2xl border border-white/10 cursor-pointer"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
        )}

        {/* Right Arrow Button */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute -right-4 top-[176px] -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition-all duration-300 z-40 shadow-2xl border border-white/10 cursor-pointer"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        )}

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
          ) : movies.length > 0 ? (
            movies.map((movie) => (
              <div
                key={movie.id}
                className="flex-shrink-0 w-[207px] snap-start"
              >
                <MovieCard
                  id={movie.id}
                  slug={movie.slug}
                  title={movie.title}
                  description={movie.description}
                  imageUrl={movie.banner_url}
                  language={movie.language}
                  eventType={movie.event_type}
                  onClick={() => handleCardClick(movie.slug)}
                />
              </div>
            ))
          ) : (
            <div
              className="flex w-full h-[300px] items-center justify-center text-sm"
              style={{ color: 'var(--gray-400)' }}
            >
              No recommended events available.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
