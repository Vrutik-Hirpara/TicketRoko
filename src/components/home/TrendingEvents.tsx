'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { SectionHeader } from '../ui/SectionHeader';
import { MovieCard } from '../ui/MovieCard';
import { AppDispatch, RootState } from '../../store';
import { fetchTrendingEvents } from '../../controllers/eventController';

/**
 * VIEW: Trending Near You section.
 * Identical design & functionality to RecommendedMovies —
 * only data source differs (fetchTrendingEvents → /events/trending).
 * Drag-to-scroll uses refs (not state) so clicks always reach cards.
 */

export const TrendingEvents = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { trending, trendingLoading, trendingError } = useSelector(
    (state: RootState) => state.movies
  );
  const router = useRouter();

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const isDraggingRef = React.useRef(false);
  const hasDraggedRef = React.useRef(false);
  const startXRef = React.useRef(0);
  const scrollLeftRef = React.useRef(0);

  React.useEffect(() => {
    dispatch(fetchTrendingEvents());
  }, [dispatch]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = 'grabbing';
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
  };

  const handleCardClick = (slug: string) => {
    if (!hasDraggedRef.current) {
      router.push(`/events/trending/${slug}`);
    }
  };

  return (
    <section className="container-max py-10 overflow-hidden">
      <SectionHeader title="Trending Near You" viewAllLink="/events/trending" />

      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="flex gap-8 overflow-x-auto no-scrollbar pt-10 pb-10 px-4 -mx-4 select-none"
        style={{ cursor: 'grab' }}
      >
        {trendingLoading ? (
          // Same loading skeleton as RecommendedMovies
          Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[246px] bg-white rounded-[18px] p-[4px] shadow-xl animate-pulse"
            >
              <div className="w-[238px] h-[161px] rounded-[16px]" style={{ background: 'var(--gray-200)' }} />
              <div className="flex flex-col gap-3 w-[210px] my-[18px] mx-[14px]">
                <div className="h-4 rounded-full w-3/4" style={{ background: 'var(--gray-200)' }} />
                <div className="h-3 rounded-full w-1/2" style={{ background: 'var(--gray-100)' }} />
                <div className="flex justify-end">
                  <div className="h-7 rounded-full w-1/3" style={{ background: 'var(--gray-200)' }} />
                </div>
              </div>
            </div>
          ))
        ) : trendingError ? (
          <div
            className="flex w-full h-[300px] items-center justify-center text-sm"
            style={{ color: '#EF4444' }}
          >
            {trendingError}
          </div>
        ) : trending.length > 0 ? (
          trending.map((event) => (
            <div
              key={event.id}
              className="flex-shrink-0 w-[246px]"
            >
              <MovieCard
                id={event.id}
                slug={event.slug}
                title={event.title}
                description={event.description}
                imageUrl={event.banner_url}
                language={event.language}
                onClick={() => handleCardClick(event.slug)}
              />
            </div>
          ))
        ) : (
          <div
            className="flex w-full h-[300px] items-center justify-center text-sm"
            style={{ color: 'var(--gray-400)' }}
          >
            No trending events available.
          </div>
        )}
      </div>
    </section>
  );
};
