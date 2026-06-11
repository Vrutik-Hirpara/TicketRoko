'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getFullImageUrl } from '../../utils/constants';

interface MovieCardProps {
  id: number;
  index?: number;       // used to set priority only for first-viewport cards
  slug: string;
  title: string;
  description?: string;
  imageUrl?: string | null;
  language?: string;
  eventType?: string;
  eventDate?: string;
  ticketPrice?: string | number;
  onClick?: () => void;
}

export const MovieCard = ({
  id,
  index = 99,
  slug,
  title,
  description,
  imageUrl,
  language,
  eventType,
  eventDate,
  ticketPrice,
  onClick,
}: MovieCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(`/events/${slug}`);
    }
  };

  const formattedDate = eventDate ? (() => {
    try {
      const d = new Date(eventDate);
      if (isNaN(d.getTime())) return eventDate;
      const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
      const day = d.getDate();
      const month = d.toLocaleDateString('en-US', { month: 'short' });
      return `${weekday}, ${day} ${month}`;
    } catch {
      return eventDate;
    }
  })() : '';

  return (
    <motion.div
      onClick={handleClick}
      className="w-full cursor-pointer bg-transparent border-0 outline-none select-none flex flex-col group"
    >
      {/* IMAGE CONTAINER */}
      <div className="relative w-full aspect-[207/352] rounded-[8px] md:rounded-[10px] overflow-hidden shadow-md bg-gray-950">
        <Image
          src={getFullImageUrl(imageUrl)}
          alt={title}
          fill
          // Only eagerly load cards visible in the first viewport (first ~4).
          // All others lazy-load as the user scrolls — prevents bandwidth waste.
          priority={index < 4}
          loading={index < 4 ? 'eager' : 'lazy'}
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          quality={80}
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        {formattedDate && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-[13px] font-medium px-2 py-1.5 flex items-center justify-center gap-1.5">
            <span>{formattedDate}</span>
          </div>
        )}
      </div>

      {/* CONTENT BELOW IMAGE */}
      <div className="flex flex-col mt-2 px-1 text-left">
        {/* TITLE */}
        <h3 className="text-[16px] leading-[20px] font-bold text-gray-900 line-clamp-1">
          {title}
        </h3>

        {/* EVENT TYPE / GENRES */}
        <p className="text-[13px] leading-[18px] text-gray-500 mt-1 line-clamp-1">
          {eventType || description || 'Event'}
        </p>

        {/* TICKET PRICE */}
        {/* {ticketPrice && (
          <p className="text-[13px] leading-[18px] text-gray-900 font-medium mt-1">
            ₹ {parseFloat(ticketPrice.toString()).toLocaleString('en-IN')} onwards
          </p>
        )} */}
      </div>
    </motion.div>
  );
};