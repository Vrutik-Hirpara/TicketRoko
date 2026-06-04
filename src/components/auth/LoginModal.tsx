'use client';

import React, { FormEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Lock, Loader2, Eye, EyeOff, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { setModal } from '../../store/uiSlice';
import { loginUser } from '../../controllers/authController';
import { setCredentials } from '../../store/authSlice';
import { GoogleLoginButton } from './GoogleLoginButton';
import type { AppDispatch, RootState } from '../../store';

export function LoginModal() {
  const dispatch = useDispatch<AppDispatch>();
  const { isModalOpen, modalType } = useSelector((state: RootState) => state.ui);
  const isOpen = isModalOpen && modalType === 'login';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setPassword('');
      setShowPassword(false);
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    dispatch(setModal({ isOpen: false, type: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { token, user } = await loginUser({ email, password });
      dispatch(setCredentials({ token, user }));
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (token: string, user: any) => {
    dispatch(setCredentials({ token, user }));
    handleClose();
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={handleClose}
      >
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

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Google Sign-In */}
              <div className="flex flex-col gap-3">
                <GoogleLoginButton
                  returnUrl="/"
                  mode="login"
                  onSuccess={handleGoogleSuccess}
                  onError={(msg) => setError(msg)}
                />
                <div className="flex items-center gap-3 mt-1 mb-1">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400">or</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
              </div>

              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="text-sm px-4 py-3 rounded-xl border border-red-200 text-red-700 bg-red-50 font-medium flex items-center gap-2"
                  >
                    <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold shrink-0 select-none">
                      ✕
                    </div>
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="text-xs font-medium mb-1.5 block text-gray-600">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin123@gmail.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium mb-1.5 block text-gray-600">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-gray-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors"
                  >
                    {showPassword ? (
                      <Eye className="w-4 h-4 text-gray-400" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 mt-2 rounded-xl font-bold text-[15px] flex items-center justify-center gap-2 disabled:opacity-60 bg-[#2563EB] text-white hover:bg-blue-700 transition-colors"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
