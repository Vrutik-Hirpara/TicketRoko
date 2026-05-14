'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import { MovieCard } from '../ui/MovieCard';

const movies = [
  {
    title: "Tanu Weds Manu Returns",
    genre: "Comedy • Drama",
    rating: 8.2,
    imageUrl: "/chhava1.jpg"
  },
  {
    title: "Bhool Bhulaiyaa 3",
    genre: "Horror • Comedy",
    rating: 7.8,
    imageUrl: "/chhava2.jpg"
  },
  {
    title: "Hera Pheri 3",
    genre: "Comedy",
    rating: 8.3,
    imageUrl: "/chhava3.jpg"
  },
  {
    title: "Singham Again",
    genre: "Action • Crime",
    rating: 7.7,
    imageUrl: "/chhava4.jpg"
  },
  {
    title: "Gadar 2",
    genre: "Action • Drama",
    rating: 9.0,
    imageUrl: "/gadar2.jpg"
  }
];

export const RecommendedMovies = () => {
  return (
    <section className="container-max py-16">
      <SectionHeader 
        title="Recommended for You" 
        viewAllLink="/movies" 
      />

      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 my-10"
      >
        {movies.map((movie, idx) => (
          <motion.div
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <MovieCard {...movie} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
