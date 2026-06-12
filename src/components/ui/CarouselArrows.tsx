'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselArrowsProps {
  showLeft: boolean;
  showRight: boolean;
  onScroll: (direction: 'left' | 'right') => void;
  topOffset?: string;
}

export const CarouselArrows: React.FC<CarouselArrowsProps> = ({ 
  showLeft, 
  showRight, 
  onScroll,
  topOffset = '176px'
}) => {
  return (
    <>
      {showLeft && (
        <button
          onClick={() => onScroll('left')}
          className={`absolute -left-4 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition-all duration-300 z-40 shadow-2xl border border-white/10 cursor-pointer`}
          style={{ top: topOffset }}
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
      )}

      {showRight && (
        <button
          onClick={() => onScroll('right')}
          className={`absolute -right-4 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition-all duration-300 z-40 shadow-2xl border border-white/10 cursor-pointer`}
          style={{ top: topOffset }}
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      )}
    </>
  );
};
