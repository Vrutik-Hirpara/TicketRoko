'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import { MovieCard } from '../ui/MovieCard';
import { AppDispatch, RootState } from '../../store';
import { fetchRecommendedMovies } from '../../controllers/eventController';

/**
 * VIEW: Recommended Movies / Events section.
 * Dispatches fetchRecommendedMovies on mount via Controller.
 * Reads state from Redux store (Model).
 */

export const RecommendedMovies = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, loading, error } = useSelector((state: RootState) => state.movies);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  React.useEffect(() => {
    dispatch(fetchRecommendedMovies());
  }, [dispatch]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="container-max py-10 overflow-hidden">
      <SectionHeader
        title="Recommended for You"
        viewAllLink="/events"
      />

      <motion.div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex gap-8 overflow-x-auto no-scrollbar pt-10 pb-10 px-4 -mx-4 cursor-grab active:cursor-grabbing select-none ${isDragging ? 'scroll-smooth-none' : ''}`}
      >
        {loading ? (
          <div className="flex w-full h-[300px] items-center justify-center text-gray-400 text-sm">
            Loading recommended events...
          </div>
        ) : error ? (
          <div className="flex w-full h-[300px] items-center justify-center text-red-400 text-sm">
            {error}
          </div>
        ) : movies.length > 0 ? (
          movies.map((movie) => (
            <motion.div
              key={movie.id}
              className={`flex-shrink-0 w-[246px] ${isDragging ? 'pointer-events-none' : ''}`}
            >
              <MovieCard
                title={movie.title}
                description={movie.description}
                imageUrl={movie.banner_url}
              />
            </motion.div>
          ))
        ) : (
          <div className="flex w-full h-[300px] items-center justify-center text-gray-400 text-sm">
            No recommended events available.
          </div>
        )}
      </motion.div>
    </section>
  );
};
