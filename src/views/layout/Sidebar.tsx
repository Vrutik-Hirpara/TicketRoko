'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { RootState } from '../../store';
import { toggleSidebar } from '../../store/uiSlice';
import { logout } from '../../store/authSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronRight, 
  LogOut, 
  Ticket, 
  History, 
  Calendar, 
  HelpCircle, 
  Settings, 
  Handshake, 
  Info,
  User as UserIcon
} from 'lucide-react';
import { Typography } from '../ui/Typography';

export const Sidebar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isOpen = useSelector((state: RootState) => state.ui.isSidebarOpen);
  const { isAuthenticated, user, hydrated } = useSelector((state: RootState) => state.auth);

  const handleSignOut = () => {
    dispatch(logout());
    dispatch(toggleSidebar());
    window.location.href = '/login';
  };

  const menuItems = [
    { 
      label: 'My Booking', 
      sublabel: 'View all your bookings & purchases', 
      icon: Ticket, 
      href: '/bookings/my-bookings' 
    },
    { 
      label: 'Past Events', 
      sublabel: 'View events you have attended', 
      icon: History, 
      href: '/profile/past-events' 
    },
    { 
      label: 'Upcoming Events', 
      sublabel: 'Your upcoming booked experiences', 
      icon: Calendar, 
      href: '/profile/upcoming-events' 
    },
    { 
      label: 'Help & Support', 
      sublabel: 'View commonly asked queries and Chat', 
      icon: HelpCircle, 
      href: '/help' 
    },
    { 
      label: 'Accounts & Settings', 
      sublabel: 'Location, Payments, Permissions & More', 
      icon: Settings, 
      href: '/settings' 
    },
    { 
      label: 'Partner With Us', 
      sublabel: 'List your event or collaborate with us', 
      icon: Handshake, 
      href: '/partner' 
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(toggleSidebar())}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-[360px] max-w-[90vw] bg-white z-[70] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header: Hey! Edit Profile */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white relative">
              <div className="flex flex-col text-left">
                <Typography variant="h3" className="text-gray-900 font-bold leading-tight">
                  Hey! {hydrated && isAuthenticated && user?.name ? user.name : ''}
                </Typography>
                {hydrated && isAuthenticated ? (
                  <Link 
                    href="/profile" 
                    onClick={() => dispatch(toggleSidebar())}
                    className="text-xs text-gray-500 hover:text-primary flex items-center gap-0.5 mt-1 font-medium transition-colors"
                  >
                    Edit Profile <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <span className="text-xs text-gray-500 mt-1">Unlock helpful features by logging in</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
                  <UserIcon className="w-6 h-6" />
                </div>
                <button 
                  onClick={() => dispatch(toggleSidebar())}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors absolute top-3 right-3"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Info Banner: Get tickets on Whatsapp/SMS */}
            <div className="bg-[#FFFDF5] border-b border-[#FEF3C7] px-5 py-3.5 flex items-start gap-3">
              <Info className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
              <div className="flex flex-col text-left">
                <span className="text-[13px] font-semibold text-[#92400E]">
                  Get tickets on Whatsapp/SMS!
                </span>
                <span className="text-xs text-[#B45309] mt-0.5">
                  Add your Mobile Number
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#D97706] ml-auto self-center" />
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto py-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link 
                    key={index} 
                    href={hydrated && isAuthenticated ? item.href : '/login'} 
                    onClick={() => dispatch(toggleSidebar())}
                    className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors border-b border-gray-50 group"
                  >
                    <Icon className="w-5 h-5 text-gray-500 group-hover:text-primary-blue transition-colors" />
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-medium text-gray-800 group-hover:text-gray-900 transition-colors">
                        {item.label}
                      </span>
                      <span className="text-[11px] text-gray-400 mt-0.5">
                        {item.sublabel}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-gray-400 transition-colors" />
                  </Link>
                );
              })}
            </div>

            {/* Footer: Signout/Login Button */}
            <div className="p-5 border-t border-gray-100 bg-white">
              {hydrated && isAuthenticated ? (
                <button
                  onClick={handleSignOut}
                  className="w-full py-3 rounded-xl border font-bold text-base transition-all duration-200 flex items-center justify-center gap-2"
                  style={{
                    borderColor: 'var(--primary-blue)',
                    color: 'var(--primary-blue)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(37, 99, 235, 0.04)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                  }}
                >
                  <LogOut className="w-5 h-5" />
                  Sign out
                </button>
              ) : (
                <Link href="/login" onClick={() => dispatch(toggleSidebar())}>
                  <button
                    className="w-full py-3 rounded-xl font-bold text-base text-white transition-all duration-200 flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: 'var(--primary-blue)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--primary-blue-hover)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--primary-blue)';
                    }}
                  >
                    Sign in
                  </button>
                </Link>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
