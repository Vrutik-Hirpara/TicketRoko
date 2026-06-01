'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const CategoryNav = () => {
  const pathname = usePathname();

  const categories = [
    { name: 'Movies', href: '/movies' },
    { name: 'Stream', href: '/stream' },
    { name: 'Events', href: '/events' },
    { name: 'Plays', href: '/plays' },
    { name: 'Sports', href: '/sports' },
    { name: 'Activities', href: '/activities' },
  ];

  const rightOptions = [
    { name: 'ListYourShow', href: '/list-your-show' },
    { name: 'Corporates', href: '/corporates' },
    { name: 'Offers', href: '/offers' },
    { name: 'Gift Cards', href: '/giftcards' },
  ];

  // Don't show category bar on login/register/booking pages
  const shouldHide = pathname === '/login' || pathname === '/register' || pathname.startsWith('/booking');
  if (shouldHide) return null;

  return (
    <div className="w-full bg-[#F5F5F5] border-b border-gray-200">
      <div className="container-max flex items-center justify-between h-[42px] overflow-x-auto no-scrollbar">
        {/* Left Categories (Scrollable on mobile) */}
        <div className="flex items-center gap-6 whitespace-nowrap py-1">
          {categories.map((cat) => {
            const isActive = pathname === cat.href;
            return (
              <Link
                key={cat.name}
                href={cat.href}
                className={`text-[13px] transition-colors duration-150 ${
                  isActive ? 'text-[#2563EB] font-bold' : 'text-gray-700 hover:text-[#2563EB] font-medium'
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>

        {/* Right Options (Hidden on smaller screens to match BookMyShow) */}
        {/* <div className="hidden lg:flex items-center gap-6 whitespace-nowrap">
          {rightOptions.map((opt) => {
            const isActive = pathname === opt.href;
            return (
              <Link
                key={opt.name}
                href={opt.href}
                className={`text-[12px] transition-colors duration-150 ${
                  isActive ? 'text-[#2563EB] font-bold' : 'text-gray-500 hover:text-[#2563EB] font-medium'
                }`}
              >
                {opt.name}
              </Link>
            );
          })}
        </div> */}
      </div>
    </div>
  );
};
