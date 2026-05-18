'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';

const trendingItems = [
  { title: "Arijit Singh Concert", venue: "EKA Arena, Ahmedabad", date: "24", month: "May", image: "/image1.jpg" },
  { title: "Sunburn Festival", venue: "GMDC Ground, Ahmedabad", date: "15", month: "Dec", image: "/image2.jpg" },
  { title: "Comedy Express", venue: "The Laugh Store, Mumbai", date: "10", month: "Jun", image: "/image1.jpg" },
  { title: "IPL 2025 Final", venue: "Narendra Modi Stadium", date: "28", month: "May", image: "/image2.jpg" },
  { title: "Stand-up Special", venue: "Canvas Laugh Club", date: "05", month: "Jul", image: "/image1.jpg" },
];

export const TrendingEvents = () => {
  return (
    <section className="container-max footer-gradient pt-10 overflow-hidden">
      <SectionHeader 
        title="Trending Near You" 
        viewAllLink="/events" 
      />

      <motion.div 
        // variants={{
        //   hidden: { opacity: 0 },
        //   visible: {
        //     opacity: 1,
        //     transition: {
        //       staggerChildren: 0.1
        //     }
        //   }
        // }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
        className="flex gap-8 overflow-x-auto no-scrollbar pt-10 pb-10 px-6"
      >
        {trendingItems.map((item, i) => (
          <motion.div 
            key={i} 
            // variants={{
            //   hidden: { opacity: 0, y: 40, scale: 0.9 },
            //   visible: { 
            //     opacity: 1, 
            //     y: 0, 
            //     scale: 1,
            //     transition: { duration: 0.6, ease: "easeOut" }
            //   }
            // }}
            whileHover={{ y: -10 }}
            className="relative w-[240px] md:w-[300px] h-[170px] md:h-[210px] flex-shrink-0 group cursor-pointer"
          >
            {/* Slanted Card Container */}
            <div className="w-full h-full rounded-[24px] overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 transform -skew-x-12 relative border border-white/50">
              {/* Inner Image Wrapper */}
              <div className="absolute inset-0 w-[130%] h-[130%] -left-[15%] -top-[15%] transform skew-x-12 bg-gray-100">
                <Image
                  src={item.image}
                  fill
                  priority={i < 2}
                  sizes="300px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  alt="Trending"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Date Badge - Calendar Style */}
            <div className="absolute -top-5 -right-5 bg-white rounded-[14px] shadow-[0_15px_30px_rgba(37,99,235,0.15)] overflow-hidden z-30 transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 border border-blue-50/50">
              <div className="bg-[#2563EB] px-3 py-1.5 flex items-center justify-center">
                <span className="text-[10px] font-black text-white uppercase tracking-[0.1em] leading-none">
                  {item.month}
                </span>
              </div>
              <div className="px-4 py-2.5 flex items-center justify-center bg-white">
                <span className="text-[22px] font-black text-[#1e293b] leading-none">
                  {item.date}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
