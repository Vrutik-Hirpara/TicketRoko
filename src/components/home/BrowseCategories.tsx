'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchCategories } from '../../controllers/categoryController';
import { SectionHeader } from '../ui/SectionHeader';

export const BrowseCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, categoriesLoading } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    if (categories.length === 0) dispatch(fetchCategories());
  }, [dispatch, categories.length]);

  // Generate a lighter tint from the hex color for the box background
  const lighten = (hex: string, amount: number) => {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, ((num >> 16) & 0xff) + Math.round((255 - ((num >> 16) & 0xff)) * amount));
    const g = Math.min(255, ((num >> 8) & 0xff) + Math.round((255 - ((num >> 8) & 0xff)) * amount));
    const b = Math.min(255, (num & 0xff) + Math.round((255 - (num & 0xff)) * amount));
    return `rgb(${r},${g},${b})`;
  };

  return (
    <section className="container-max py-10">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader title="Browse by Categories" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 pt-10"
        >
          {categoriesLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl bg-gray-100 animate-pulse h-[140px]" />
              ))
            : categories.map((cat) => (
                <motion.div
                  key={cat.slug}
                  initial="initial"
                  whileHover="hover"
                  className="group cursor-pointer"
                >
                  <Link href={`/category/${cat.slug}`}>
                    <div
                      className="rounded-xl border border-transparent hover:border-gray-200 shadow-sm hover:shadow-md transition-all duration-500 py-4 flex flex-col items-center justify-center"
                      style={{ backgroundColor: lighten(cat.color, 0.85) }}
                    >
                      <motion.div
                        className="w-20 h-20 rounded-full mb-4 flex items-center justify-center shadow-inner"
                        style={{ backgroundColor: lighten(cat.color, 0.75) }}
                      >
                        {cat.icon ? (
                          <div className="relative w-10 h-10">
                            <Image src={cat.icon} alt={cat.name} fill className="object-contain" unoptimized />
                          </div>
                        ) : (
                          <span className="text-2xl font-bold" style={{ color: cat.color }}>
                            {cat.name.charAt(0)}
                          </span>
                        )}
                      </motion.div>

                      <h3 className="text-[17px] font-bold text-center text-gray-800 group-hover:text-blue-600 transition-colors">
                        {cat.name}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
        </motion.div>
      </div>
    </section>
  );
};