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

  // Generate deterministic rating and votes count based on id to match BookMyShow feel
  const ratingBase = 8.0 + ((id * 17) % 19) / 10; // returns 8.0 to 9.8
  const votesBase = ((id * 137) % 99) + 1; // returns 1 to 100
  const votesText = votesBase > 50 ? `${(votesBase / 10).toFixed(1)}K` : `${votesBase * 100}`;
  const ratingStr = `${ratingBase.toFixed(1)}/10`;
  const votesStr = `${votesText}+ Votes`;

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