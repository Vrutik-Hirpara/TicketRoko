
'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const MovieCard = ({ 
  title, 
  genre, 
  imageUrl 
}: { 
  title: string; 
  genre: string; 
  imageUrl: string;
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      whileHover={{ y: -8 }}
        onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
      className="relative aspect-[3.5/4.5] cursor-pointer bg-white rounded-[12px] shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden border border-gray-100"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 bg-gray-200">
        <motion.div 
          initial={false}
          animate={{
            top: isHovered ? 0 : '45%',
            right: isHovered ? 0 : 0,
            bottom: isHovered ? 0 : 0,
            left: isHovered ? 0 : '55%',
            borderRadius: isHovered ? 8 : 8,
          }}
          transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
          className="absolute overflow-hidden shadow-xl"
        >
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 1 }}
            className="relative w-full h-full"
          >
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Dark Overlay */}
          <motion.div 
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" 
          />
        </motion.div>

        {/* Stable Hover Trigger (Invisible layer over the small image area) */}
       

        {/* Content Layer */}
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col p-6 md:p-10 pt-8 md:pt-12">
          {/* Top Header */}
          <div className="flex justify-between items-center mb-2 md:mb-4">
            <motion.span 
              animate={{ color: isHovered ? '#facc15' : '#B36B16' }}
              className="text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-colors"
            >
              {genre.split(' • ')[0]}
            </motion.span>
          </div>

          <motion.h3 
            animate={{ color: isHovered ? '#ffffff' : '#222222' }}
            className="text-xl md:text-3xl font-black leading-[1.1] max-w-[85%] md:max-w-[90%]"
          >
            {title}
          </motion.h3>

          {/* Bottom Content */}
          <motion.div 
            animate={{ 
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 24
            }}
            transition={{ duration: 0.5, delay: isHovered ? 0.1 : 0 }}
            className="mt-auto"
          >
            <p className="text-white/70 text-[14px] leading-relaxed mb-8 line-clamp-2">
              Experience the magic of {title} in cinemas. Book your seats now for an unforgettable experience.
            </p>
            
            <button className="bg-white text-black py-4 px-8 rounded-full flex items-center justify-between pointer-events-auto hover:bg-yellow-400 transition-all w-full">
              <span className="font-black text-[13px] uppercase tracking-wider">
                Book Now
              </span>
              
              <div className="bg-black/5 p-1 rounded-full">
                <ChevronRight className="h-4 w-4" />
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};