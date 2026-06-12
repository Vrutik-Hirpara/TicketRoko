'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { setModal } from '../../store/uiSlice';
import { LoginFormComponent } from './LoginFormComponent';
import type { AppDispatch, RootState } from '../../store';

export function LoginModal() {
  const dispatch = useDispatch<AppDispatch>();
  const { isModalOpen, modalType } = useSelector((state: RootState) => state.ui);
  const isOpen = isModalOpen && modalType === 'login';

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    dispatch(setModal({ isOpen: false, type: undefined }));
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm overflow-y-auto"
        onClick={handleClose}
      >
        <div className="min-h-full flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
              <p className="text-sm text-gray-500 mt-1">Sign in to continue to TicketRoko</p>
            </div>

            <LoginFormComponent onSuccess={handleClose} returnUrl="/" />
          </div>
        </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
