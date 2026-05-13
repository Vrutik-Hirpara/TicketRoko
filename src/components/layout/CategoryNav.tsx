'use client';

import React from 'react';
import Link from 'next/link';
import { Film, Calendar, Theater, Trophy, Bike, Tag, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  { name: 'Movies', icon: Film, active: true },
  { name: 'Events', icon: Calendar },
  { name: 'Plays', icon: Theater },
  { name: 'Sports', icon: Trophy },
  { name: 'Activities', icon: Bike },
  { name: 'Offers', icon: Tag },
  { name: 'Gift Cards', icon: Gift },
];

export const CategoryNav = () => {
  return (
    <div className="w-full bg-white border-b border-gray-100 sticky top-[72px] z-40">
      <div className="container-max flex items-center h-[60px]">
        <div className="flex items-center justify-between w-full h-full">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/${cat.name.toLowerCase().replace(' ', '-')}`}
              className="relative flex items-center gap-3 h-full group whitespace-nowrap px-2"
            >
              <cat.icon className={`h-5 w-5 transition-colors ${cat.active ? 'text-primary' : 'text-gray-400 group-hover:text-primary'}`} />
              <span className={`text-[14px] font-bold tracking-tight transition-colors ${cat.active ? 'text-primary' : 'text-gray-500 group-hover:text-primary'}`}>
                {cat.name}
              </span>
              {cat.active && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-t-full"
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
