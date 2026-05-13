'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const categories = [
  { name: 'Movies', icon: '/movie.svg', active: true },
  { name: 'Events', icon: '/events.svg' },
  { name: 'Plays', icon: '/Plays.svg' },
  { name: 'Sports', icon: '/sports.svg' },
  { name: 'Activities', icon: '/Activity.svg' },
  { name: 'Offers', icon: '/Offers.svg' },
  { name: 'Gift Cards', icon: '/Gift.svg' },
];

export const CategoryNav = () => {
  return (
    <div className="w-full bg-white border-b border-gray-100 sticky top-[72px] z-40">
      <style dangerouslySetInnerHTML={{ __html: `
        .blue-icon {
          filter: invert(27%) sepia(91%) saturate(2352%) hue-rotate(211deg) brightness(95%) contrast(93%) !important;
        }
        .group:hover .blue-icon-hover {
          filter: invert(27%) sepia(91%) saturate(2352%) hue-rotate(211deg) brightness(95%) contrast(93%) !important;
        }
      `}} />
      <div className="container-max flex items-center h-[60px]">
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05 }
            }
          }}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-between w-full h-full"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.name}
              variants={{
                hidden: { opacity: 0, y: 5 },
                visible: { opacity: 1, y: 0 }
              }}
              className="h-full flex items-center"
            >
              <Link
                href={`/${cat.name.toLowerCase().replace(' ', '-')}`}
                className="relative flex items-center gap-3 h-full group whitespace-nowrap px-4"
              >
                <div className="flex items-center justify-center w-5 h-5 shrink-0">
                  <Image 
                    src={cat.icon} 
                    alt={cat.name}
                    width={20}
                    height={20}
                    quality={100}
                    unoptimized
                    className={`object-contain transition-all duration-300 ${cat.active ? 'blue-icon' : 'opacity-60 group-hover:opacity-100 blue-icon-hover'}`}
                  />
                </div>
                <span className={`text-[14px] font-bold tracking-tight transition-colors ${cat.active ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`}>
                  {cat.name}
                </span>
                {cat.active && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600 rounded-t-full"
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
