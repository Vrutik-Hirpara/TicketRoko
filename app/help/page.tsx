'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '../../src/store';
import { SectionHeader } from '../../src/components/ui/SectionHeader';
import { Send, Loader2, CheckCircle, Phone, Mail, FileText, Tag, MessageSquare } from 'lucide-react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.ticketroko.retailian.in/api/';
const cleanBase = BASE_URL.replace(/\/$/, '');

export default function HelpPage() {
  const router = useRouter();
  const { user, token } = useSelector((state: RootState) => state.auth);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    requester: '',
    email: '',
    contact_number: '',
    subject: '',
    query_type: 'Query',
    description: '',
  });

  // Pre-fill with logged-in user info
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        requester: user.name || '',
        email: user.email || '',
        contact_number: user.phone || '',
      }));
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        contact_number: Number(formData.contact_number),
      };

      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${cleanBase}/support/`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || 'Failed to submit. Please try again.');
      }

      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success screen
  if (success) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center" style={{ background: 'var(--gray-50)' }}>
        <div className="max-w-md w-full mx-auto text-center flex flex-col items-center bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-5">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Request Submitted!</h1>
          <p className="text-gray-500 text-sm mb-8">
            Thank you for reaching out. Our support team will get back to you shortly.
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-8 py-3 rounded-full text-white text-sm font-semibold hover:opacity-90 transition-all"
            style={{ background: 'var(--primary-blue)' }}
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  // ── Form
  return (
    <div className="min-h-screen py-12" style={{ background: 'var(--gray-50)' }}>
      <div className="container-max max-w-2xl mx-auto">

        <div className="mb-8">
          <SectionHeader title="Help & Support" />
          <p className="text-gray-500 mt-2 text-sm">
            Fill in the details below and our team will get back to you as soon as possible.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl text-red-700 bg-red-50 border border-red-200 text-sm font-medium">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 space-y-6"
        >
          {/* Name + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Your Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  required
                  type="text"
                  name="requester"
                  value={formData.requester}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all text-sm"
                />
                <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  required
                  type="tel"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all text-sm"
                />
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all text-sm"
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            </div>
          </div>

          {/* Subject + Query Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Subject <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  required
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Brief subject"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all text-sm"
                />
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Query Type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  required
                  name="query_type"
                  value={formData.query_type}
                  onChange={handleChange}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all text-sm appearance-none"
                >
                  <option value="Query">Query</option>
                  <option value="Complaint">Complaint</option>
                  <option value="Refund">Refund</option>
                  <option value="Booking Issue">Booking Issue</option>
                  <option value="Payment Issue">Payment Issue</option>
                  <option value="Technical Issue">Technical Issue</option>
                  <option value="Other">Other</option>
                </select>
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              placeholder="Describe your issue or query in detail..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all text-sm resize-none"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 border-t border-gray-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="px-7 py-2.5 rounded-full bg-white border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-2.5 rounded-full text-white text-sm font-semibold flex items-center gap-2 disabled:opacity-50 hover:opacity-90 transition-all"
              style={{ background: 'var(--primary-blue)' }}
            >
              {submitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
              ) : (
                <><Send className="w-4 h-4" /> Submit Request</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
