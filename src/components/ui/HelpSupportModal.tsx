'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '../../store';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  FileText,
  Tag,
  MessageSquare,
  HelpCircle,
} from 'lucide-react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.ticketroko.retailian.in/api/';
const cleanBase = BASE_URL.replace(/\/$/, '');

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const inputClass =
  'w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all text-sm';

export const HelpSupportModal = ({ isOpen, onClose }: Props) => {
  const { user, token } = useSelector((state: RootState) => state.auth);

  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [countdown, setCountdown] = useState(5);

  const [formData, setFormData] = useState({
    requester: '',
    email: '',
    contact_number: '',
    subject: '',
    query_type: 'Query',
    description: '',
  });

  // Pre-fill when user is logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        requester: user.name || '',
        email: user.email || '',
        contact_number: (user as any).phone || '',
      }));
    }
  }, [user]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setErrorMsg('');
      setCountdown(5);
    }
  }, [isOpen]);

  // 5-second countdown on success
  useEffect(() => {
    if (status !== 'success') return;
    setCountdown(5);
    const interval = setInterval(() => {
      setCountdown(prev => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  // Redirect when countdown hits 0
  useEffect(() => {
    if (status === 'success' && countdown === 0) {
      onClose();
      router.push('/');
    }
  }, [countdown, status]); // eslint-disable-line react-hooks/exhaustive-deps

  // Block non-numeric keypresses on phone field
  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];
    if (allowed.includes(e.key)) return;
    if (!/^[0-9]$/.test(e.key)) e.preventDefault();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus('idle');

    try {
      const payload = { ...formData, contact_number: Number(formData.contact_number) };
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${cleanBase}/support/`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || 'Submission failed. Please try again.');
      }

      setStatus('success');
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#2563EB]" />
                <span className="text-base font-bold text-gray-900">Help &amp; Support</span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 max-h-[80vh] overflow-y-auto">

              {/* ── Success state */}
              {status === 'success' && (
                <div className="flex flex-col items-center text-center py-8 gap-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">Request Submitted!</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Our support team will get back to you soon.
                    </p>
                    <p className="text-xs text-gray-400 mt-3">
                      Redirecting to home in{' '}
                      <span className="font-bold text-[#2563EB]">{countdown}s</span>…
                    </p>
                  </div>
                  <button
                    onClick={() => { onClose(); router.push('/'); }}
                    className="mt-2 px-8 py-2.5 rounded-full text-white text-sm font-semibold hover:opacity-90 transition-all"
                    style={{ background: 'var(--primary-blue)' }}
                  >
                    Go Home Now
                  </button>
                </div>
              )}

              {/* ── Error state */}
              {status === 'error' && (
                <div className="flex flex-col items-center text-center py-8 gap-4">
                  <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">Submission Failed</p>
                    <p className="text-sm text-gray-500 mt-1">{errorMsg}</p>
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-2 px-8 py-2.5 rounded-full text-white text-sm font-semibold hover:opacity-90 transition-all"
                    style={{ background: 'var(--primary-blue)' }}
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* ── Form */}
              {status === 'idle' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-700">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input required type="text" name="requester" value={formData.requester} onChange={handleChange} placeholder="Full name" className={inputClass} />
                        <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-700">
                        Contact Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          required
                          type="tel"
                          name="contact_number"
                          value={formData.contact_number}
                          onChange={handleChange}
                          onKeyDown={handlePhoneKeyDown}
                          inputMode="numeric"
                          maxLength={10}
                          placeholder="10-digit number"
                          className={inputClass}
                        />
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className={inputClass} />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Subject + Query Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-700">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input required type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Brief subject" className={inputClass} />
                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-700">
                        Query Type <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select required name="query_type" value={formData.query_type} onChange={handleChange} className={`${inputClass} appearance-none`}>
                          <option value="Query">Query</option>
                          <option value="Complaint">Complaint</option>
                          <option value="Refund">Refund</option>
                          <option value="Booking Issue">Booking Issue</option>
                          <option value="Payment Issue">Payment Issue</option>
                          <option value="Technical Issue">Technical Issue</option>
                          <option value="Other">Other</option>
                        </select>
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Describe your issue or query in detail..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all text-sm resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 py-2.5 rounded-full bg-white border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 py-2.5 rounded-full text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50 hover:opacity-90 transition-all"
                      style={{ background: 'var(--primary-blue)' }}
                    >
                      {submitting ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                      ) : (
                        <><Send className="w-4 h-4" /> Submit</>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
