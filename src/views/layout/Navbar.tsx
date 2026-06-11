"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Menu, X, ChevronRight, ChevronDown, ArrowRight, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../store/uiSlice';
import { RootState } from '../../store';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Typography } from '../ui/Typography';
import { useNavbar } from '../../controllers/useNavbar';
import { fetchCities } from '../../controllers/appController';

export const Navbar = () => {
  const dispatch = useDispatch<any>();
  const {
    location,
    searchQuery,
    isScrolled,
    handleSearch,
    handleToggleMenu,
    isAuthenticated,
    user,
    hydrated,
    handleLocationChange,
  } = useNavbar();

  const { cities } = useSelector((state: RootState) => state.app);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (cities.length === 0) {
      dispatch(fetchCities());
    }
  }, [dispatch, cities.length]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCityDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        {/* Desktop Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-[500px] h-[40px] relative group mx-8">
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

        {/* Right Section: Shared Location + Auth/Menu */}
        <div className="flex items-center gap-3 lg:gap-6 flex-shrink-0">
          
          {/* Location Button (Visible on both Mobile and Desktop) */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className="flex items-center gap-1.5 lg:gap-2 text-[#222222] text-[13px] lg:text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
            >
              <MapPin className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
              <span className="capitalize truncate max-w-[70px] sm:max-w-[100px] lg:max-w-none">{location?.name || 'Loading...'}</span>
              <ChevronDown className={`h-3.5 w-3.5 lg:h-4 lg:w-4 opacity-40 transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isCityDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 lg:left-0 mt-4 w-48 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 py-2 z-50 overflow-hidden"
                >
                  <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Select City
                  </div>
                  {cities.map((city) => (
                    <button
                      key={city.id}
                      onClick={() => {
                        handleLocationChange(city);
                        setIsCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${location?.id === city.id ? 'text-primary font-semibold bg-blue-50/50' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      <span className="capitalize">{city.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center gap-4">
            {hydrated && isAuthenticated ? (
              <>
                <div
                  onClick={handleToggleMenu}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-sm shadow-sm select-none">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="flex flex-col text-left">
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
              </>
            ) : (
              <motion.button
                onClick={() => dispatch(setModal({ isOpen: true, type: "login" }))}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 bg-[#2563EB] text-white px-7 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md shadow-blue-600/20"
              >
                <span>Login</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center">
            <button
              className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              onClick={handleToggleMenu}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Search Bar Row */}
      <div className="lg:hidden w-full px-4 pb-3">
        <div className="w-full h-[38px] relative group shadow-sm rounded-full">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            className="w-full h-full pl-11 pr-4 bg-[#F3F4F6] rounded-full border border-gray-200 focus:border-transparent focus:ring-1 focus:ring-primary/20 text-[13px] placeholder:text-gray-500 outline-none transition-all"
            placeholder="Search movies, events, plays..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
    </nav>
  );
};
