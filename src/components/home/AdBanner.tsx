'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchAdvertisement } from '../../controllers/adController';
import { nextAd } from '../../store/adSlice';
import { UPLOADS_URL } from '../../utils/constants';

export const AdBanner = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { ads, currentIndex, loading } = useSelector((state: RootState) => state.ad);
  const [imagesReady, setImagesReady] = useState(false);
  const loadedCountRef = useRef(0);

  // Fetch all ads once
  useEffect(() => {
    if (ads.length === 0) dispatch(fetchAdvertisement());
  }, [dispatch, ads.length]);

  // Auto-rotate ONLY after all ad images have loaded — prevents network hits on rotation
  useEffect(() => {
    if (ads.length <= 1 || !imagesReady) return;
    const timer = setInterval(() => {
      dispatch(nextAd());
    }, 4000);
    return () => clearInterval(timer);
  }, [dispatch, ads.length, imagesReady]);

  // Always render the container to reserve space — prevents CLS from the section
  // suddenly appearing with 97px height after ads load.
  if (loading || ads.length === 0) {
    return (
      <div className="container-max pb-10">
        <div className="w-full rounded-[10px] h-[97px] bg-transparent" />
      </div>
    );
  }

  const ad = ads[currentIndex];
  const href = ad.thumbnail_url ? `${ad.thumbnail_url}` : ad.url_link || '#';

  return (
    <div className="container-max pb-10">
      <div className="relative w-full rounded-[10px] overflow-hidden h-[97px] bg-gray-200">

        {/*
         * Render ALL ad images stacked on top of each other.
         * Only the active ad is visible (opacity 1); others are hidden (opacity 0).
         * This keeps every <img> permanently in the DOM — no unmount/remount —
         * so the browser never re-downloads images on rotation.
         * All images are preloaded via the hidden elements on first render.
         */}
        {ads.map((item, i) => {
          const imgSrc = `${UPLOADS_URL}/${item.image_url}`;
          const isActive = i === currentIndex;
          const adHref = item.thumbnail_url
            ? `${item.thumbnail_url}`
            : item.url_link || '#';

          return (
            <a
              key={item.id}
              href={adHref}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 block cursor-pointer transition-opacity duration-500"
              style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? 'auto' : 'none' }}
              aria-hidden={!isActive}
            >
              <img
                src={imgSrc}
                alt={item.title || 'Advertisement'}
                className="w-full h-full object-cover"
                // fetchpriority for the first ad; low for the rest
                {...(i === 0 ? { fetchPriority: 'high' as any } : { fetchPriority: 'low' as any })}
                onLoad={() => {
                  loadedCountRef.current += 1;
                  if (loadedCountRef.current >= ads.length) {
                    setImagesReady(true);
                  }
                }}
              />
            </a>
          );
        })}

        {/* Dot indicators */}
        {ads.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {ads.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const times = ((i - currentIndex) + ads.length) % ads.length;
                  for (let t = 0; t < times; t++) dispatch(nextAd());
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
