'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { AppDispatch, RootState } from '../../store';
import { fetchCategories } from '../../controllers/categoryController';

export const CategoryNav = () => {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { categories, categoriesLoading } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    if (categories.length === 0) dispatch(fetchCategories());
  }, [dispatch, categories.length]);

  const shouldHide =
    pathname === '/login' || pathname === '/register' || pathname.startsWith('/booking');
  if (shouldHide) return null;

  return (
    <div className="w-full bg-[#F5F5F5] border-b border-gray-200">
      <div className="container-max flex items-center justify-between h-[42px] overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-6 whitespace-nowrap py-1">
          {categoriesLoading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <span key={i} className="h-4 w-16 bg-gray-200 rounded animate-pulse inline-block" />
              ))}
            </>
          ) : categories.length === 0 ? (
            <span className="text-gray-400 text-[13px]">No categories</span>
          ) : (
            categories.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className={`text-[13px] transition-colors duration-150 ${
                    isActive
                      ? 'text-[var(--primary-blue)] font-bold'
                      : 'text-gray-700 hover:text-[var(--primary-blue)] font-medium'
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
