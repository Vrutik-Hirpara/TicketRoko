'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

const MIN_SCALE = 0.32;

export interface HallViewportScale {
  viewportRef: RefObject<HTMLDivElement | null>;
  scale: number;
  scaledWidth: number;
  scaledHeight: number;
}

/**
 * Scales hall canvas to fit the viewport; enables scroll when layout is still larger than container.
 */
export function useHallViewportScale(
  canvasWidth: number,
  canvasHeight: number,
): HallViewportScale {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el || canvasWidth <= 0 || canvasHeight <= 0) return;

    const update = () => {
      const pad = 12;
      const maxW = el.clientWidth - pad;
      const maxH = el.clientHeight - pad;
      if (maxW <= 0 || maxH <= 0) return;

      const scaleX = maxW / canvasWidth;
      const scaleY = maxH / canvasHeight;
      const fit = Math.min(1, scaleX, scaleY);
      setScale(Math.max(MIN_SCALE, fit));
    };

    update();
    requestAnimationFrame(update);
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, [canvasWidth, canvasHeight]);

  return {
    viewportRef,
    scale,
    scaledWidth: Math.ceil(canvasWidth * scale),
    scaledHeight: Math.ceil(canvasHeight * scale),
  };
}
