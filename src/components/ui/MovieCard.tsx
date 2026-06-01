'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getFullImageUrl } from '../../utils/constants';

interface MovieCardProps {
  id: number;
  slug: string;
  title: string;
  description?: string;
  imageUrl?: string | null;
  language?: string;
  eventType?: string;
  eventDate?: string;
  onClick?: () => void;
}

export const MovieCard = ({
  id,
  slug,
  title,
  description,
  imageUrl,
  language,
  eventType,
  eventDate,
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
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    } catch {
      return eventDate;
    }
  })() : '';

  return (
    <motion.div
      onClick={handleClick}
      className="w-[207px] cursor-pointer bg-transparent border-0 outline-none select-none flex flex-col group"
    >
      {/* IMAGE CONTAINER (207x352 px) */}
      <div className="relative w-[207px] h-[352px] rounded-[8px] md:rounded-[10px] overflow-hidden shadow-md bg-gray-950">
        <Image
          src={getFullImageUrl(imageUrl)}
          alt={title}
          fill
          sizes="207px"
          priority
          className="object-cover object-center"
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
      </div>
    </motion.div>
  );
};