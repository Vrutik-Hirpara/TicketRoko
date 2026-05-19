'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchLabels } from '../../controllers/labelController';

/**
 * VIEW: Hero Banner — full-image carousel.
 * Shows only image_url + cta_text button (redirects to url_link).
 * No color panels, no text overlay content.
 */

export const HeroBanner = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { labels, loading } = useSelector((state: RootState) => state.labels);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    dispatch(fetchLabels());
  }, [dispatch]);

  // Auto-advance
  useEffect(() => {
    if (labels.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % labels.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [labels.length]);

  if (loading) {
    return (
      <div className="container-max py-8">
        <div className="w-full h-[375px] rounded-[12px] bg-gray-900 animate-pulse" />
      </div>
    );
  }

  if (labels.length === 0) return null;

  return (
    <div className="container-max py-8">
      <div className="relative w-full h-[220px] sm:h-[300px] md:h-[375px] rounded-[12px] overflow-hidden shadow-2xl bg-black">

        <AnimatePresence mode="wait">
          <motion.div
            key={labels[current].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            {/* Full Responsive Image */}
            <Image
              src={labels[current].image_url}
              alt={labels[current].name}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
              className="object-cover object-center"
            />

            {/* Subtle bottom gradient for button visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* CTA Button */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
              <motion.a
                href={labels[current].url_link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-white text-gray-900 px-8 py-3 rounded-xl font-black text-[13px] md:text-[15px] shadow-2xl hover:shadow-white/20 transition-shadow whitespace-nowrap"
              >
                {labels[current].cta_text}
              </motion.a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 right-6 flex gap-2 z-30">
          {labels.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                current === i ? 'w-8 bg-white' : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
