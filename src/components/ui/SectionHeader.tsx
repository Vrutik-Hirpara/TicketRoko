'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  viewAllLink?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const SectionHeader = ({ title, viewAllLink, icon, className = "" }: SectionHeaderProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex   items-center justify-between ${className}`}
    >
      <div className="flex items-center gap-3">
        {/* Default blue bar or custom icon */}
        {icon ? (
          <div className="flex items-center justify-center">
            {icon}
          </div>
        ) : (
          <span className="w-1.5 h-10 bg-[#2563EB] rounded-full inline-block shadow-[0_0_15px_rgba(37,99,235,0.3)]"></span>
        )}
        
        <h2 className="text-[18px] md:text-[28px] font-black text-[#111827] tracking-tight">
          {title}
        </h2>
      </div>

      {viewAllLink && (
        <Link 
          href={viewAllLink} 
          className="text-[#2563EB] text-[15px] font-bold flex items-center gap-1 hover:underline group transition-all"
        >
          View All 
          <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      )}
    </motion.div>
  );
};
