'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '../../src/store';
import { SectionHeader } from '../../src/components/ui/SectionHeader';

export default function PartnerPage() {
  const router = useRouter();
  const { user, token, isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    event_name: '',
    event_type: 'talk_show',
    event_description: '',
    event_date: '',
    start_time: '',
    end_time: '',
    expected_capacity: '',
    venue_address: '',
    event_pincode: '',
    organizing_committee: 'educational_institute',
    food_required: false,
    sponsorship_required: false,
    ticketroko_services_required: true,
    services_details: '',
    vendor_name: '',
    vendor_identity_type: 'aadhaar_card',
    vendor_identity_number: '',
    vendor_address: '',
    email: '',
    phone: '',
    alternate_email: '',
    alternate_phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // Handle checkboxes
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user || !token) {
      setError("Please login first to submit a partner request.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const payload = {
        ...formData,
        user_id: user.id,
        expected_capacity: parseInt(formData.expected_capacity as string) || 0,
        is_completed: true
      };

      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.ticketroko.retailian.in/api/';
      const response = await fetch(`${baseUrl}/vendor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSuccess(true);
        // Optional: clear form or redirect
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const data = await response.json().catch(() => null);
        setError(data?.message || "Failed to submit request. Please verify your details.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen py-16" style={{ background: 'var(--gray-50)' }}>
        <div className="container-max max-w-3xl mx-auto text-center flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 text-4xl">
            ✓
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Request Submitted!</h1>
          <p className="text-gray-500 mb-8 max-w-lg">
            Thank you for partnering with TicketRoko. Our team has received your event details and will get back to you shortly.
          </p>
          <button onClick={() => router.push('/')} className="px-8 py-3 rounded-full text-white bg-[#2563EB] hover:opacity-90 font-medium">
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12" style={{ background: 'var(--gray-50)' }}>
      <div className="container-max max-w-4xl mx-auto">
        <div className="mb-8">
          <SectionHeader title="Partner With Us" />
          <p className="text-gray-500 mt-2">Fill in the details below to list your event or collaborate with TicketRoko.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl text-red-700 bg-red-50 border border-red-200 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 space-y-10">
          
          {/* Section 1: Event Details */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">Event Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Event Name *</label>
                <input required type="text" name="event_name" value={formData.event_name} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all text-sm" placeholder="E.g., Tech Conference 2026" />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Event Type *</label>
                <select required name="event_type" value={formData.event_type} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all text-sm">
                  <option value="talk_show">Talk Show</option>
                  <option value="annual_function">Annual Function</option>
                  <option value="seminar">Seminar</option>
                  <option value="event_hosting">Event Hosting</option>
                  <option value="get_together">Get Together</option>
                  <option value="music_show">Music Show</option>
                  <option value="movie_show">Movie Show</option>
                  <option value="live_show">Live Show</option>
                  <option value="others">Others</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Event Description *</label>
                <textarea required name="event_description" value={formData.event_description} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all text-sm resize-none" placeholder="Describe your event..." />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Event Date *</label>
                <input required type="date" name="event_date" value={formData.event_date} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Start Time *</label>
                  <input required type="time" name="start_time" value={formData.start_time} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all text-sm" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">End Time *</label>
                  <input required type="time" name="end_time" value={formData.end_time} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all text-sm" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Expected Capacity *</label>
                <input required type="number" min="1" name="expected_capacity" value={formData.expected_capacity} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all text-sm" placeholder="E.g., 500" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Organizing Committee *</label>
                <select required name="organizing_committee" value={formData.organizing_committee} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all text-sm">
                  <option value="educational_institute">Educational Institute</option>
                  <option value="others">Others</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Venue Address *</label>
                <input required type="text" name="venue_address" value={formData.venue_address} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all text-sm" placeholder="Full address of the venue" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Event Pincode *</label>
                <input required type="text" name="event_pincode" value={formData.event_pincode} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all text-sm" placeholder="E.g., 382330" />
              </div>
            </div>
          </div>

          {/* Section 2: Requirements & Services */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">Requirements & Services</h3>
            <div className="flex flex-col gap-4 mb-6">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" name="food_required" checked={formData.food_required} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB] transition-colors cursor-pointer" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Food / Catering Required</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" name="sponsorship_required" checked={formData.sponsorship_required} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB] transition-colors cursor-pointer" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Sponsorship Required</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" name="ticketroko_services_required" checked={formData.ticketroko_services_required} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB] transition-colors cursor-pointer" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">TicketRoko Services Required</span>
              </label>
            </div>

            {formData.ticketroko_services_required && (
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Services Details</label>
                <textarea name="services_details" value={formData.services_details} onChange={handleChange} rows={2} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all text-sm resize-none" placeholder="Describe the specific services you need from TicketRoko..." />
              </div>
            )}
          </div>

          {/* Section 3: Vendor Details */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">Vendor / Organizer Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Vendor / Organizer Name *</label>
                <input required type="text" name="vendor_name" value={formData.vendor_name} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all text-sm" placeholder="Your full name or company name" />
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Vendor Address *</label>
                <input required type="text" name="vendor_address" value={formData.vendor_address} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all text-sm" placeholder="Your address" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Identity Type *</label>
                <select required name="vendor_identity_type" value={formData.vendor_identity_type} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all text-sm">
                  <option value="aadhaar_card">Aadhaar Card</option>
                  <option value="pan_card">PAN Card</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Identity Number *</label>
                <input required type="text" name="vendor_identity_number" value={formData.vendor_identity_number} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all text-sm" placeholder="ID Number" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Primary Email *</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all text-sm" placeholder="email@example.com" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Primary Phone *</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all text-sm" placeholder="10-digit mobile number" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Alternate Email</label>
                <input type="email" name="alternate_email" value={formData.alternate_email} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all text-sm" placeholder="alternate@example.com (Optional)" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Alternate Phone</label>
                <input type="tel" name="alternate_phone" value={formData.alternate_phone} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all text-sm" placeholder="Alternate mobile number (Optional)" />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
            <button type="button" onClick={() => router.push('/')} className="px-8 py-3 rounded-full bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 font-medium">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-10 py-3 rounded-full text-white bg-[#2563EB] disabled:opacity-50 hover:opacity-90 font-medium">
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
