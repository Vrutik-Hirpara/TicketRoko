'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Play } from 'lucide-react';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    title: "Stream. Book.\nEnjoy More.",
    subtitle: "Flat 20% OFF up to ₹100*",
    movieTitle: "CHHAAVA",
    genres: "Action • Drama • History",
    rating: "UA 16+",
    image: "/chhava1.jpg",
    color: "#0055FF"
  },
  {
    id: 2,
    title: "Big Screen.\nBigger Thrills.",
    subtitle: "Buy 1 Get 1 Free on Weekend*",
    movieTitle: "GLADIATOR II",
    genres: "Action • Adventure • Drama",
    rating: "UA 18+",
    image: "/chhava2.jpg",
    color: "#D41D24"
  },
  {
    id: 3,
    title: "Musical Magic.\nLive Events.",
    subtitle: "Exclusive Early Bird 15% OFF*",
    movieTitle: "ARARAARI",
    genres: "Music • Festival • Concert",
    rating: "ALL",
    image: "/chhava3.jpg",
    color: "#7C3AED"
  },
  {
    id: 4,
    title: "Laughter Therapy.\nStand-up Special.",
    subtitle: "Group Discount of 10%*",
    movieTitle: "COMEDY NIGHT",
    genres: "Comedy • Solo • Live",
    rating: "15+",
    image: "/chhava4.jpg",
    color: "#10B981"
  }
];

export const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container-max py-8">
      <div className="relative w-full h-[375px] rounded-[12px] overflow-hidden shadow-2xl bg-black ">        <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex items-center"
        >
          {/* Background Movie Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={slides[current].image}
              alt={slides[current].movieTitle}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center scale-105"
            />
          </div>

          {/* Content Side */}
          <div
            className="hero-content-side relative z-20 h-full w-full xl:w-[50%] flex flex-col justify-end xl:justify-center px-6 md:px-16 pb-12 xl:pb-0 text-white overflow-hidden"
            style={{ '--hero-color': slides[current].color } as any}
          >
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 z-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            <style dangerouslySetInnerHTML={{ __html: `
              @media (max-width: 1279px) {
                .hero-content-side {
                  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%) !important;
                }
              }
              @media (min-width: 1280px) {
                .hero-content-side {
                  background-color: var(--hero-color) !important;
                  clip-path: polygon(0 0, 92% 0, 78% 70%, 88% 100%, 0 100%) !important; 
                }
              }
            `}} />

            <motion.div 
              key={`content-${current}`}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative z-10"
            >
              <div className="flex items-center gap-2 mb-4 xl:mb-6">
                <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                  <span className="text-[10px] md:text-[11px] font-bold text-white uppercase tracking-wide flex items-center gap-2">
                    <Play className="h-2 w-2 fill-white" /> LIMITED TIME OFFER
                  </span>
                </div>
              </div>

              <h1 className="text-[24px] md:text-[36px] xl:text-[44px] font-black leading-[1.1] tracking-tight whitespace-pre-line mb-3 xl:mb-4">
                {slides[current].title}
              </h1>

              <p className="text-[14px] md:text-[18px] font-bold text-white/90">
                {slides[current].subtitle.split('20% OFF').map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && <span className="text-[#00FFD1] font-black">20% OFF</span>}
                  </React.Fragment>
                ))}
              </p>

              <div className="flex items-center gap-4 xl:gap-6 mt-8 xl:mt-12">
                <button className="bg-white text-gray-900 px-6 md:px-8 py-2.5 md:py-3.5 rounded-xl font-black text-[12px] md:text-[14px] flex items-center gap-3 hover:scale-105 transition-all shadow-2xl group">
                  Book Now <ChevronRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-[9px] md:text-[10px] text-white/40 font-bold tracking-widest uppercase">*T&C Apply*</span>
              </div>
            </motion.div>
          </div>

          {/* Right Side Movie Details - Visible only on Desktop */}
          <div className="relative z-20 flex-1 flex flex-col items-center justify-center pr-20 hidden xl:flex">
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <h2 className="text-[68px] font-extrabold text-white uppercase leading-none tracking-normal drop-shadow-xl">
                {slides[current].movieTitle}
              </h2>

              <div className="flex items-center gap-4 mt-4 text-white/90 font-semibold text-[12px] uppercase tracking-[2px]">
                
                <span>
                  {slides[current].genres}
                </span>

                <span className="border border-white/20 px-2 py-1 rounded-md text-[10px] bg-black/40">
                  {slides[current].rating}
                </span>

              </div>

              <button className="mt-8 bg-[#0055FF] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-3 hover:bg-blue-600 transition-all shadow-xl">
                <Play className="h-4 w-4 fill-white" />
                Book Tickets
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-30">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-500 ${current === i ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
