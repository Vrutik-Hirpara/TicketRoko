"use client";

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { toggleSidebar } from '../../store/uiSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, MapPin, ChevronRight } from 'lucide-react';
import { Typography } from '../ui/Typography';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const Sidebar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.isSidebarOpen);

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[300px] bg-white z-[70] shadow-2xl p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <Typography variant="h3">Menu</Typography>
              <button 
                onClick={() => dispatch(toggleSidebar())}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-8 flex-1">
              {/* Search in Mobile */}
              <div className="flex flex-col gap-3">
                <Typography variant="span" className="text-gray-500 font-bold uppercase tracking-wider">Search</Typography>
                <Input 
                  icon={<Search className="w-5 h-5" />}
                  placeholder="Movies, Events..."
                />
              </div>

              {/* Location in Mobile */}
              <div className="flex flex-col gap-3">
                <Typography variant="span" className="text-gray-500 font-bold uppercase tracking-wider">Location</Typography>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                  <MapPin className="w-5 h-5 text-primary-blue" />
                  <Typography className="font-bold">Ahmedabad</Typography>
                </div>
              </div>

              {/* Auth */}
              <div className="mt-auto">
                <Button className="w-full">
                  Login <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
