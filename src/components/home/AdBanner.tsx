'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { AppDispatch, RootState } from '../../store';
import { fetchAdvertisement } from '../../controllers/adController';
import { nextAd } from '../../store/adSlice';
import { UPLOADS_URL } from '../../utils/constants';

export const AdBanner = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { ads, currentIndex, loading } = useSelector((state: RootState) => state.ad);

  // Fetch all ads once
  useEffect(() => {
    if (ads.length === 0) dispatch(fetchAdvertisement());
  }, [dispatch, ads.length]);

  // Auto-rotate every 4 seconds
  useEffect(() => {
    if (ads.length <= 1) return;
    const timer = setInterval(() => {
      dispatch(nextAd());
    }, 4000);
    return () => clearInterval(timer);
  }, [dispatch, ads.length]);

  if (loading || ads.length === 0) return null;

  const ad = ads[currentIndex];
  const imgSrc = `${UPLOADS_URL}${ad.image_url}`;
  const href = ad.thumbnail_url
    ? `${ad.thumbnail_url}`
    : ad.url_link || '#';

  return (
    <div className="container-max pb-10">
      <div className="relative w-full rounded-[10px] overflow-hidden h-[97px]">
        <AnimatePresence mode="wait">
          <motion.a
            key={ad.id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 block cursor-pointer"
          >
            <img
              src={imgSrc}
              alt={ad.title || 'Advertisement'}
              className="w-full h-full object-cover"
            />
          </motion.a>
        </AnimatePresence>

        {/* Dot indicators */}
        {ads.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {ads.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  // Jump to specific ad
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
