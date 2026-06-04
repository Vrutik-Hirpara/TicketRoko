"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Menu, X, ChevronRight, ChevronDown, ArrowRight, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setModal } from '../../store/uiSlice';
import type { AppDispatch } from '../../store';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Typography } from '../ui/Typography';
import { useNavbar } from '../../controllers/useNavbar';

export const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    location, 
    searchQuery, 
    isScrolled, 
    handleSearch, 
    handleToggleMenu,
    isAuthenticated,
    user,
    hydrated,
    handleLogout
  } = useNavbar();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'nav-blur shadow-lg' : 'bg-white border-b border-gray-100'}`}>
      <Container className="flex items-center justify-between h-[64px] md:h-[72px]">
        {/* Logo */}
        <Link href="/">
          <div className="relative w-[140px] md:w-[180px] h-[32px] md:h-[40px] cursor-pointer flex-shrink-0">
            <Image 
              src="/TicketRoko_logo.png" 
              alt="TicketRoko" 
              fill 
              priority
              sizes="180px"
              className="object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        {/* <div className="hidden lg:flex items-center flex-1  gap-8 justify-between">
          
          <div className="flex-1 max-w-[600px] h-[40px] relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              className="w-full h-full pl-12 pr-4 bg-[#F3F4F6] rounded-full border-none focus:ring-1 focus:ring-primary/20 text-sm placeholder:text-gray-400 outline-none transition-all"
              placeholder="Search movies, events, plays, sports and activities..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-8">
            <button className="flex items-center gap-2 text-[#222222] text-sm font-medium hover:text-primary transition-colors">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
              <ChevronDown className="h-4 w-4 opacity-40" />
            </button>

            
          </div>
          <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 bg-[#2563EB] text-white px-7 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md shadow-blue-600/20"
            >
              <span>Login</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
        </div> */}
<div className="hidden lg:flex items-center flex-1 gap-8 justify-between">
  
  {/* Location and Search Bar combined in one div */}
<div className="flex items-center gap-4 flex-1 max-w-[800px]">
  {/* Search Bar */}
  <div className="flex-1 h-[40px] relative group">
    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
      <Search className="h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
    </div>
    <input
      type="text"
      className="w-full h-full pl-12 pr-4 bg-[#F3F4F6] rounded-full border-none focus:ring-1 focus:ring-primary/20 text-sm placeholder:text-gray-400 outline-none transition-all"
      placeholder="Search movies, events, plays, sports and activities..."
      value={searchQuery}
      onChange={(e) => handleSearch(e.target.value)}
    />
  </div>

  {/* Location Button */}
  <button className="flex items-center gap-2 text-[#222222] text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">
    <MapPin className="h-4 w-4" />
    <span>{location}</span>
    <ChevronDown className="h-4 w-4 opacity-40" />
  </button>
</div>

  {/* Login / Auth Button */}
  {hydrated && isAuthenticated ? (
    <div className="flex items-center gap-4 flex-shrink-0">
      <div 
        onClick={handleToggleMenu}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors"
      >
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
      <button 
        className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        onClick={handleToggleMenu}
        aria-label="Toggle menu"
      >
        <Menu className="w-6 h-6" />
      </button>
    </div>
  ) : (
    <button onClick={() => dispatch(setModal({ isOpen: true, type: 'login' }))}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 bg-[#2563EB] text-white px-7 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md shadow-blue-600/20 flex-shrink-0"
      >
        <span>Login</span>
        <ArrowRight className="h-4 w-4" />
      </motion.button>
    </button>
  )}
</div>
        {/* Mobile Menu Toggle */}
        <div className="flex lg:hidden items-center gap-4">
          <button 
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            onClick={handleToggleMenu}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </Container>
    </nav>
  );
};
