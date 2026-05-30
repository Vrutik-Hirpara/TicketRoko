'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { Search, MapPin, ChevronDown, ArrowRight, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { RootState } from '../../store';
import { logout as logoutAction } from '../../store/authSlice';

export const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, user, hydrated } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logoutAction());
    window.location.href = '/login';
  };

  return (
    <nav className="w-full h-[72px] bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container-max h-full flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
            <Image 
              src="/TicketRoko_logo.png" 
              alt="TicketRoko" 
              width={180} 
              height={40} 
              priority
              style={{ height: 'auto' }}
              className="object-contain"
            />
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-[600px] h-[40px] relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            className="w-full h-full pl-12 pr-4 bg-[#F3F4F6] rounded-full border-none focus:ring-1 focus:ring-primary/20 text-sm placeholder:text-gray-400 outline-none transition-all"
            placeholder="Search movies, events, plays, sports and activities..."
          />
        </div>

        {/* Location and Login */}
        <div className="flex items-center gap-8">
          <button className="flex items-center gap-2 text-[#222222] text-sm font-medium hover:text-primary transition-colors">
            <MapPin className="h-4 w-4" />
            <span>Ahmedabad</span>
            <ChevronDown className="h-4 w-4 opacity-40" />
          </button>

          {/* Login / Auth Button */}
          {hydrated && isAuthenticated ? (
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100">
                <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-sm shadow-sm select-none">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-semibold text-gray-800 leading-tight">
                    {user?.name}
                  </span>
                  <span className="text-[10px] text-gray-400 leading-tight">
                    {user?.role || 'User'}
                  </span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-gray-500 hover:text-red-600 px-3.5 py-2 rounded-full text-sm font-medium transition-colors hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline">Logout</span>
              </motion.button>
            </div>
          ) : (
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 bg-[#2563EB] text-white px-7 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md shadow-blue-600/20 flex-shrink-0"
              >
                <span>Login</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

