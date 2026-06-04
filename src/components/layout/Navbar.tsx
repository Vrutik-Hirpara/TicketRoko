'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { Search, MapPin, ChevronDown, ArrowRight, LogOut, Menu, X, ChevronRight, Ticket, History, CalendarDays, HelpCircle, Settings, Handshake, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RootState } from '../../store';
import { logout as logoutAction } from '../../store/authSlice';

export const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, user, hydrated } = useSelector((state: RootState) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const handleLogout = () => {
    dispatch(logoutAction());
    setIsSidebarOpen(false);
    window.location.href = '/login';
  };

  return (
    <>
    <nav className="w-full h-[72px] bg-white border-b border-gray-100 sticky top-0 z-40">
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
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-2"
              >
                <Menu className="h-6 w-6 text-gray-700" />
              </button>
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

    {/* Sidebar Overlay */}
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[60]"
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-[360px] max-w-full bg-white z-[70] shadow-2xl flex flex-col overflow-y-auto"
          >
            {/* Header */}
            <div className="p-5 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Hey! {user?.name || 'User'}</h2>
                <Link href="/profile/edit" onClick={() => setIsSidebarOpen(false)} className="text-gray-500 text-sm flex items-center mt-1 hover:underline">
                  Edit Profile <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </Link>
              </div>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Info Banner */}
            <div className="mx-5 mb-5 p-4 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-between cursor-pointer group">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">Get tickets on Whatsapp/SMS!</h3>
                  <p className="text-[13px] text-orange-600 mt-0.5">Add your Mobile Number</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-orange-400 group-hover:text-orange-600 transition-colors" />
            </div>

            {/* Menu Items */}
            <div className="flex-1 flex flex-col">
              <Link href="/bookings/my-bookings" onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-between px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-4">
                  <Ticket className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  <div>
                    <h3 className="text-[15px] font-medium text-gray-800">My Booking</h3>
                    <p className="text-[12px] text-gray-400 mt-0.5">View all your bookings & purchases</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </Link>

              <Link href="/profile/past-events" onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-between px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-4">
                  <History className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  <div>
                    <h3 className="text-[15px] font-medium text-gray-800">Past Events</h3>
                    <p className="text-[12px] text-gray-400 mt-0.5">View events you have attended</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </Link>

              <Link href="/profile/upcoming-events" onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-between px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-4">
                  <CalendarDays className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  <div>
                    <h3 className="text-[15px] font-medium text-gray-800">Upcoming Events</h3>
                    <p className="text-[12px] text-gray-400 mt-0.5">Your upcoming booked experiences</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </Link>
              
              <Link href="/support" onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-between px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-4">
                  <HelpCircle className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  <div>
                    <h3 className="text-[15px] font-medium text-gray-800">Help & Support</h3>
                    <p className="text-[12px] text-gray-400 mt-0.5">View commonly asked queries and Chat</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </Link>
              
              <Link href="/settings" onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-between px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-4">
                  <Settings className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  <div>
                    <h3 className="text-[15px] font-medium text-gray-800">Accounts & Settings</h3>
                    <p className="text-[12px] text-gray-400 mt-0.5">Location, Payments, Permissions & More</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </Link>

              <Link href="/partner" onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-between px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-4">
                  <Handshake className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  <div>
                    <h3 className="text-[15px] font-medium text-gray-800">Partner With Us</h3>
                    <p className="text-[12px] text-gray-400 mt-0.5">List your event or collaborate with us</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </Link>
            </div>

            {/* Sign out button */}
            <div className="p-6 mt-auto border-t border-gray-100">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2.5 border border-[#2563EB] text-[#2563EB] rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
};

