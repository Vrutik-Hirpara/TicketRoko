'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';

export const ExploreMore = () => {
  const categories = ['Concerts', 'Plays', 'Sports', 'Workshops', 'Family Activities'];


  return (
    <section className="container-max py-16 border-t border-gray-50">
      <SectionHeader 
        title="Explore More" 
        viewAllLink="/explore" 
      />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pt-10">
        {categories.map((title, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -12 }}
            className="relative h-[240px] rounded-[24px] overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            <Image
              src='/event_placeholder.png'
              fill
              sizes="(max-width: 768px) 50vw, 20vw"
              className="object-cover group-hover:scale-110 transition-transform duration-1000"
              alt={title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
              <span className="text-white font-black text-xl tracking-tight">{title}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
