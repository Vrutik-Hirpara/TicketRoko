'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface MovieCardProps {
  title: string;
  genre: string;
  rating: number;
  imageUrl: string;
}

export const MovieCard = ({ title, genre, rating, imageUrl }: MovieCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="flex flex-col group cursor-pointer bg-white rounded-[8px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-300"
    >
      {/* Image */}
      <div className="p-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[8px]">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute top-3 right-3 z-10">
            <button className="">
              <Heart className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-2 pb-3">

        <h3 className="font-semibold text-[#111827] text-base leading-tight line-clamp-2 min-h-[48px]">
          {title}
        </h3>

        <p className="text-gray-500 text-sm mt-1">
          {genre}
        </p>

        <div className="flex items-center gap-1 mt-3">
          <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-semibold text-gray-700">
            {rating}
          </span>
        </div>

      </div>
    </motion.div>
  );
};
