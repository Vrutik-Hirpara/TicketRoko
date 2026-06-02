'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchLabels } from '../../controllers/labelController';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const HeroBanner = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { labels, loading } = useSelector((state: RootState) => state.labels);
  const [current, setCurrent] = useState(0);
  const [slideWidth, setSlideWidth] = useState(1240);
  const [slideGap, setSlideGap] = useState(24);
  const [windowWidth, setWindowWidth] = useState(1440);
  const autoPlayRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    dispatch(fetchLabels());
  }, [dispatch]);

  // Handle responsive sizing dynamically
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      if (width < 1024) {
        // Mobile & Tablet: Only 1 centered slide visible, taking up maximum width with clean 16px margins
        setSlideWidth(width - 32);
        setSlideGap(0); // No gap needed for single image view
      } else {
        // Desktop: Center-mode carousel with left and right slides visible
        setSlideWidth(Math.min(1240, width * 0.78));
        setSlideGap(16); // Tight BookMyShow gap
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Format labels to handle infinite sliding smoothly
  const getDisplayLabels = () => {
    if (labels.length === 0) return [];
    if (labels.length === 1) return labels;
    if (labels.length === 2) {
      return [labels[0], labels[1], labels[0], labels[1]];
    }
    return labels;
  };

  const displayLabels = getDisplayLabels();
  const N = displayLabels.length;

  const nextSlide = () => {
    if (N <= 1) return;
    setCurrent((prev) => (prev + 1) % N);
  };

  const prevSlide = () => {
    if (N <= 1) return;
    setCurrent((prev) => (prev - 1 + N) % N);
  };

  // Keep auto-play function reference updated
  useEffect(() => {
    autoPlayRef.current = nextSlide;
  });

  // Auto-play interval
  useEffect(() => {
    if (N <= 1) return;
    const play = () => {
      if (autoPlayRef.current) autoPlayRef.current();
    };
    const timer = setInterval(play, 5000);
    return () => clearInterval(timer);
  }, [N]);

  if (loading) {
    return (
      <div className="w-full bg-[#121212] py-4 lg:py-6 flex justify-center items-center">
        <div 
          className="rounded-[8px] md:rounded-[12px] bg-gray-800 animate-pulse shadow-2xl"
          style={{
            width: `${slideWidth}px`,
            height: windowWidth < 640 ? '180px' : windowWidth < 1024 ? '260px' : '380px'
          }}
        />
      </div>
    );
  }

  if (labels.length === 0) return null;

  const isDesktop = windowWidth >= 1024;

  return (
    <div className="w-full bg-[#ffffff] py-4 lg:py-6 overflow-hidden relative select-none flex flex-col items-center justify-center">
      {/* Slider Viewport Container */}
      <div className="relative w-full h-[180px] sm:h-[260px] md:h-[320px] lg:h-[380px] overflow-visible">
        
        {/* Infinite Center Mode Slider Track */}
        <div className="relative w-full h-full">
          {displayLabels.map((label, index) => {
            // Shortest circular offset calculation
            let offset = index - current;
            if (N > 2) {
              if (offset < -N / 2) offset += N;
              if (offset > N / 2) offset -= N;
            }

            const isActive = offset === 0;

            // Opacity rules: Below 1024px, hide all side slides completely. Above 1024px, hide only far-off slides.
            let opacity = 0;
            if (isActive) {
              opacity = 1;
            } else if (isDesktop && Math.abs(offset) === 1) {
              opacity = 1;
            }

            return (
              <div
                key={`${label.id}-${index}`}
                onClick={() => {
                  if (!isActive && isDesktop) {
                    setCurrent(index);
                  } else if (isActive && label.url_link) {
                    window.open(label.url_link, '_blank', 'noopener,noreferrer');
                  }
                }}
                className={`absolute top-0 bottom-0 left-1/2 flex items-center justify-center transition-all duration-500 ease-in-out ${
                  isActive ? 'z-30 cursor-pointer' : 'z-20'
                } ${!isActive && isDesktop ? 'cursor-pointer' : ''}`}
                style={{
                  width: `${slideWidth}px`,
                  transform: `translate3d(calc(-50% + ${offset * (slideWidth + slideGap)}px), 0, 0)`,
                  opacity: opacity,
                  pointerEvents: isActive ? 'auto' : isDesktop ? 'auto' : 'none',
                }}
              >
                {/* Slide Card */}
                <div className="relative w-full h-full rounded-[8px] md:rounded-[12px] overflow-hidden shadow-2xl bg-[#1f1f1f] group">
                  {/* Banner Image */}
                  <Image
                    src={label.image_url}
                    alt={label.name}
                    fill
                    priority={isActive}
                    sizes={`${slideWidth}px`}
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.01]"
                  />

                  {/* Dark Overlays for Non-active banners on Desktop */}
                  {!isActive && isDesktop && (
                    <div className="absolute inset-0 bg-black/55 hover:bg-black/45 transition-all duration-300 rounded-[8px] md:rounded-[12px]" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows - Visible on all screen sizes */}
        {N > 1 && (
          <>
            {/* Left Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-40 shadow-2xl border border-white/10 cursor-pointer flex"
            >
              <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
            </button>

            {/* Right Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-40 shadow-2xl border border-white/10 cursor-pointer flex"
            >
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
            </button>
          </>
        )}
      </div>

      {/* Pagination Indicators / Dots - Positioned exactly like BookMyShow */}
      {labels.length > 1 && (
        <div className="flex gap-2 mt-4 z-30">
          {labels.map((_, i) => {
            // Match the display index correctly when duplicating
            const isActive = current % labels.length === i;
            return (
              <button
                key={i}
                onClick={() => {
                  if (labels.length === 2) {
                    setCurrent(current % 2 === i ? current : (current + 1) % 4);
                  } else {
                    setCurrent(i);
                  }
                }}
                className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                  isActive ? 'w-8 bg-white' : 'w-2 bg-white/35 hover:bg-white/50'
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
