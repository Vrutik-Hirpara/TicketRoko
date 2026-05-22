'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

/**
 * REUSABLE UI COMPONENT: MovieCard
 * Original design preserved — only additions:
 *  - id prop for navigation to /events/:id on click
 *  - language prop (dynamic from API, was previously hardcoded "Gujarati")
 */

interface MovieCardProps {
  id: number;
  title: string;
  description?: string;
  imageUrl?: string | null;
  language?: string;
}

export const MovieCard = ({
  id,
  title,
  description,
  imageUrl,
  language,
}: MovieCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/events/${id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
      className="w-[246px] bg-white rounded-[18px] p-[4px] shadow-xl cursor-pointer"
    >
      {/* IMAGE */}
      <div className="relative w-[238px] h-[161px] rounded-[16px] overflow-hidden">
        <Image
          src={imageUrl || '/placeholder.jpg'}
          alt={title}
          fill
          sizes="246px"
          className="object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col gap-[14px] w-[210px] my-[18px] mx-[14px]">
        {/* TITLE */}
        <h3 className="text-[18px] font-semibold leading-[22px] text-black line-clamp-1">
          {title}
        </h3>

        {/* GENRE / DESCRIPTION */}
        <p className="text-[15px] leading-[20px] text-gray-600 line-clamp-1">
          {description}
        </p>

        {/* BOTTOM */}
        <div className="flex items-center justify-between">
          <div />

          {/* Language — dynamic from API */}
          {language && (
            <div
              className="text-white text-[14px] font-medium px-4 py-1 rounded-full"
              style={{ background: 'var(--primary-blue)' }}
            >
              {language}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};