'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export const MovieCard = ({
  title,
  genre,
  imageUrl,
}: {
  title: string;
  genre: string;
  imageUrl: string;
}) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl p-2 shadow-xl hover:shadow-xl transition-all duration-300 w-full"
    >
      {/* Image Section */}
      <div className="relative w-full aspect-[16/12] rounded-2xl overflow-hidden mb-4">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />

        {/* Heart Icon */}
        <button className="absolute top-3 right-3   rounded-full ">
          <Heart className="w-5 h-5 text-gray-500 hover:text-red-500 transition-colors" />
        </button>
      </div>

      {/* Content */}
      <div className="px-2 pb-1">
        <h3 className="text-[18px] font-semibold text-gray-900 line-clamp-1">
          {title}
        </h3>

        <p className="text-[15px] text-gray-500 mt-2">
          {genre}
        </p>

        
      </div>
    </motion.div>
  );
};