import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Tag, X, Loader2 } from 'lucide-react';
import { getJson } from '../../lib/api/getJson';

interface PastEventModalProps {
  selectedEvent: any;
  onClose: () => void;
}

export const PastEventModal: React.FC<PastEventModalProps> = ({ selectedEvent, onClose }) => {
  const [detailedEvent, setDetailedEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!selectedEvent?.slug) {
      setDetailedEvent(null);
      return;
    }

    let isMounted = true;
    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const response = await getJson<any>(`/events/${selectedEvent.slug}`);
        if (isMounted) {
          setDetailedEvent(response.data || response);
        }
      } catch (error) {
        console.error('Failed to fetch event details', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchDetails();

    return () => {
      isMounted = false;
    };
  }, [selectedEvent?.slug]);

  // Use detailedEvent if available, otherwise fallback to the basic selectedEvent passed as prop
  const displayEvent = detailedEvent || selectedEvent;

  return (
    <AnimatePresence>
      {selectedEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-[20px] font-bold text-[#0F172A]">Event Details</h2>
              <button
                onClick={onClose}
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-sm border border-gray-200 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
                
                {/* DATE */}
                <div className="flex items-start gap-4">
                  <Calendar className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-1">Date</span>
                    <span className="text-[15px] font-medium text-gray-900">
                      {new Date(displayEvent.event_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                {/* TIME */}
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-1">Time</span>
                    <span className="text-[15px] font-medium text-gray-900">
                      {displayEvent.start_time ? displayEvent.start_time.substring(0,5) : ''} - {displayEvent.end_time ? displayEvent.end_time.substring(0,5) : ''}
                    </span>
                  </div>
                </div>

                {/* VENUE */}
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-1">Venue</span>
                    <span className="text-[15px] font-medium text-gray-900">{displayEvent.address || 'N/A'}</span>
                  </div>
                </div>

                {/* CITY */}
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-1">City</span>
                    <span className="text-[15px] font-medium text-gray-900 capitalize">{displayEvent.city || 'N/A'}</span>
                  </div>
                </div>

                {/* LANGUAGE */}
                <div className="flex items-start gap-4">
                  <Tag className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-1">Language</span>
                    <span className="text-[15px] font-medium text-gray-900">{displayEvent.language || 'N/A'}</span>
                  </div>
                </div>

                {/* CATEGORY */}
                <div className="flex items-start gap-4">
                  <Tag className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-1">Category</span>
                    <span className="text-[15px] font-medium text-gray-900">{displayEvent.Category?.name || displayEvent.event_type || 'Other'}</span>
                  </div>
                </div>

              </div>

              {/* Section Prices */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="text-[16px] font-bold text-[#0F172A] mb-4">Section Prices</h3>
                {isLoading ? (
                  <div className="flex justify-center items-center py-6">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                  </div>
                ) : displayEvent.sectionPrices && displayEvent.sectionPrices.length > 0 ? (
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex flex-col gap-3">
                    {displayEvent.sectionPrices.map((section: any) => (
                      <div key={section.id} className="flex justify-between items-center text-[15px] border-b border-gray-200/60 last:border-0 pb-3 last:pb-0">
                        <span className="text-[#64748B] font-medium">{section.section_label}</span>
                        <span className="font-bold text-[#0F172A]">
                          {parseFloat(section.price) === 0 ? 'Free' : `₹${parseFloat(section.price).toLocaleString('en-IN')}`}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 text-center">
                    <span className="text-[#64748B] text-[14px]">No section prices available for this event.</span>
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
