'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import { MovieCard } from '../ui/MovieCard';

const movies = [
  { title: "Tanu Weds Manu Returns", genre: "Comedy • Drama", imageUrl: "/chhava1.jpg" },
  { title: "Bhool Bhulaiyaa 3", genre: "Horror • Comedy", imageUrl: "/chhava2.jpg" },
  { title: "Hera Pheri 3", genre: "Comedy", imageUrl: "/chhava3.jpg" },
  { title: "Singham Again", genre: "Action • Crime", imageUrl: "/chhava4.jpg" },
  { title: "Gadar 2", genre: "Action • Drama", imageUrl: "/gadar2.jpg" },
  { title: "Stree 2", genre: "Horror • Comedy", imageUrl: "/chhava1.jpg" },
  { title: "Animal", genre: "Action • Drama", imageUrl: "/chhava2.jpg" },
  { title: "Pathaan", genre: "Action • Thriller", imageUrl: "/chhava3.jpg" },
];

export const RecommendedMovies = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);

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
    const walk = (x - startX) * 2; // Scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="container-max py-10 overflow-hidden">
      <SectionHeader 
        title="Recommended for You" 
        viewAllLink="/movies" 
      />

      {/* <motion.div 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.7
            }
          }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
        className={`flex gap-8 overflow-x-auto no-scrollbar pt-10 pb-10 px-4 -mx-4 cursor-grab active:cursor-grabbing select-none ${isDragging ? 'scroll-smooth-none' : ''}`}
      >
        {movies.map((movie, idx) => (
          <motion.div
            key={idx}
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 }
            }}
            className={`flex-shrink-0 w-[260px] md:w-[340px] ${isDragging ? 'pointer-events-none' : ''}`}
          >
            <MovieCard 
              title={movie.title}
              genre={movie.genre}
              imageUrl={movie.imageUrl}
            />
          </motion.div>
        ))}
      </motion.div> */}
      <motion.div
  ref={scrollRef}
  onMouseDown={handleMouseDown}
  onMouseUp={handleMouseUp}
  onMouseLeave={handleMouseUp}
  onMouseMove={handleMouseMove}
  // variants={{
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.7
  //     }
  //   }
  // }}
  // initial="hidden"
  // whileInView="visible"
  // viewport={{ once: true, amount: 0.8 }}
  className={`flex gap-4 overflow-x-auto no-scrollbar pt-10 pb-10 px-4 -mx-4 cursor-grab active:cursor-grabbing select-none ${
    isDragging ? 'scroll-smooth-none' : ''
  }`}
>
  {movies.map((movie, idx) => (
    <motion.div
      key={idx}
      // variants={{
      //   hidden: { opacity: 0, x: 50 },
      //   visible: { opacity: 1, x: 0 }
      // }}
      className={`flex-shrink-0 w-[250px] md:w-[265px] ${
        isDragging ? 'pointer-events-none' : ''
      }`}
    >
      <MovieCard
        title={movie.title}
        genre={movie.genre}
        imageUrl={movie.imageUrl}
      />
    </motion.div>
  ))}
</motion.div>
    </section>
  );
};
