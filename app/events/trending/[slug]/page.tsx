'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Tag, Ticket, Users, ChevronLeft } from 'lucide-react';
import { UPLOADS_URL, getFullImageUrl } from '../../../../src/utils/constants';
import { AppDispatch, RootState } from '../../../../src/store';
import { fetchTrendingEventBySlug } from '../../../../src/controllers/eventController';
import { clearEventDetail } from '../../../../src/store/eventDetailSlice';

// ══════════ REUSABLE ATOMS ══════════

function BookTicketsButton({ fullWidth = false }: { fullWidth?: boolean }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, background: 'var(--primary-blue-hover)' }}
      whileTap={{ scale: 0.97 }}
      className={`text-[15px] font-bold px-12 py-3.5 rounded-md shadow-lg transition duration-200 ${
        fullWidth ? 'w-full' : 'w-full sm:w-auto'
      }`}
      style={{ background: 'var(--primary-blue)', color: 'var(--white)' }}
    >
      Book tickets
    </motion.button>
  );
}

function EventPoster({ src, title, mobile = false }: { src: string; title: string; mobile?: boolean }) {
  return (
    <motion.div
      initial={mobile ? { opacity: 0, scale: 0.92 } : undefined}
      animate={mobile ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.4 }}
      className={`relative rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105 ${
        mobile ? 'w-[200px] h-[290px] flex-shrink-0' : 'w-[220px] h-[320px] md:w-[240px] md:h-[350px]'
      }`}
      style={{
        border: '1.5px solid rgba(255, 255, 255, 0.25)',
        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.65), 0 0 25px rgba(255, 255, 255, 0.05)'
      }}
    >
      <Image src={src} alt={title} fill sizes={mobile ? '200px' : '240px'} className="object-cover" priority />

      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <span
          className="text-[11px] font-bold px-3.5 py-1.5 rounded-full backdrop-blur-md transition-all hover:scale-105"
          style={{
            background: 'rgba(0, 0, 0, 0.72)',
            color: 'var(--white)',
            border: '1.5px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
          }}
        >
          ▶ Trailer
        </span>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 text-center text-[11px] font-bold py-2"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.75) 100%)',
          color: 'var(--white)'
        }}
      >
        In cinemas
      </div>
    </motion.div>
  );
}

function InterestBox({ label, mobile = false }: { label: string; mobile?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg backdrop-blur-sm ${
        mobile ? 'w-full px-4 py-3' : 'gap-4 px-4 py-3 self-start'
      }`}
      style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.08)' }}
    >
      <div className="flex items-center gap-2 text-left">
        <span className="text-xl">👍</span>
        <div>
          <p className="text-[12px] font-bold" style={{ color: 'var(--white)' }}>{label}</p>
          <p className="text-[10px]" style={{ color: 'var(--gray-300)' }}>
            {mobile ? 'Reviews trigger rating status.' : 'Rating will appear once reviews come in.'}
          </p>
        </div>
      </div>
      <button
        className="text-[11px] font-semibold px-2.5 py-1 rounded transition hover:bg-white/10"
        style={{ background: 'rgba(255, 255, 255, 0.08)', color: 'var(--white)', border: '1px solid rgba(255, 255, 255, 0.15)' }}
      >
        Rate now
      </button>
    </div>
  );
}

// ══════════ MAIN TRENDING EVENT DETAIL VIEW ══════════

export default function TrendingEventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const eventSlug = params?.slug as string;
  const dispatch = useDispatch<AppDispatch>();
  const { event, loading, error } = useSelector((state: RootState) => state.eventDetail);

  useEffect(() => {
    if (eventSlug) dispatch(fetchTrendingEventBySlug(eventSlug));
    return () => { dispatch(clearEventDetail()); };
  }, [eventSlug, dispatch]);

  const formatDate = (d?: string) =>
    d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '—';

  const formatTime = (t?: string) => {
    if (!t) return '—';
    const [h, m] = t.split(':');
    const dt = new Date(); dt.setHours(+h, +m);
    return dt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

// Using shared utility to resolve image URLs

  const availableTickets = event ? event.total_tickets - event.sold_tickets : 0;
  const soldPct = event ? Math.min((event.sold_tickets / event.total_tickets) * 100, 100) : 0;
  const interestedCount = event ? event.sold_tickets : 0;
  const interestedLabel = interestedCount >= 1000
    ? `${(interestedCount / 1000).toFixed(1)}K+ are interested`
    : `${interestedCount} are interested`;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--banner-to)' }}>
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full border-4 border-t-transparent animate-spin" style={{ borderColor: 'var(--primary-blue)' }} />
        <p className="text-sm font-medium" style={{ color: 'var(--white)' }}>Loading event details...</p>
      </div>
    </div>
  );

  if (error || !event) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: 'var(--gray-50)' }}>
      <p className="text-sm font-semibold px-6 py-4 rounded-2xl" style={{ color: '#EF4444', background: '#FEF2F2' }}>
        {error || 'Event not found'}
      </p>
      <button onClick={() => router.back()}
        className="text-sm font-semibold px-6 py-3 rounded-full"
        style={{ background: 'var(--primary-blue)', color: 'var(--white)' }}>
        Go Back
      </button>
    </div>
  );

  const eventImage = getFullImageUrl(event.banner_url);

  return (
    <div className="min-h-screen" style={{ background: 'var(--gray-50)' }}>

      {/* HERO BANNER — Desktop & Tablet (>= 640px) */}
      <div className="hidden sm:flex relative w-full overflow-hidden items-center" style={{ background: 'var(--banner-to)', minHeight: 480 }}>
        <div className="absolute inset-0 z-0">
          <Image src={eventImage} alt="" fill sizes="100vw"
            className="object-cover object-center scale-105"
            style={{ filter: 'blur(4px) brightness(0.35)', opacity: 0.55 }}
            priority
          />
        </div>
        <div
          className="absolute inset-0 z-10"
          style={{ background: 'linear-gradient(to right, var(--banner-to) 20%, rgba(15, 23, 42, 0.88) 45%, rgba(15, 23, 42, 0.3) 85%, var(--banner-to) 100%)' }}
        />
        <div className="relative z-20 container-max w-full flex flex-row items-center gap-8 md:gap-10 py-10">
          <div className="flex-shrink-0">
            <EventPoster src={eventImage} title={event.title} />
          </div>
          <div className="flex flex-col justify-center gap-5 flex-1 min-w-0 text-left text-white">
            <h1 className="text-3xl md:text-[2.5rem] font-bold leading-tight tracking-wide" style={{ color: 'var(--white)' }}>
              {event.title}
            </h1>
            <InterestBox label={interestedLabel} />
            <div className="flex flex-wrap items-center gap-2 text-[13px]" style={{ color: 'var(--gray-300)' }}>
              {event.event_type && <span className="font-medium">{event.event_type}</span>}
              {event.event_type && <span style={{ color: 'var(--gray-500)' }}>•</span>}
              <span>{formatDate(event.event_date)}</span>
              {event.city && (<><span style={{ color: 'var(--gray-500)' }}>•</span><span>{event.city}</span></>)}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[12px] font-semibold px-2 py-0.5 rounded-sm"
                style={{ color: 'var(--white)', border: '1px solid rgba(255, 255, 255, 0.25)', background: 'transparent' }}>
                2D
              </span>
              {event.language && (
                <span className="text-[12px] font-semibold px-3 py-0.5 rounded-sm"
                  style={{ color: 'var(--white)', border: '1px solid rgba(255, 255, 255, 0.25)', background: 'transparent' }}>
                  {event.language}
                </span>
              )}
            </div>
            <div className="mt-2"><BookTicketsButton /></div>
          </div>
        </div>
      </div>

      {/* HERO BANNER — Mobile (< 640px) */}
      <div className="flex sm:hidden flex-col w-full py-10" style={{ background: 'var(--banner-to)' }}>
        <div className="container-max flex flex-col items-center gap-8">
          <EventPoster src={eventImage} title={event.title} mobile />
          <div className="w-full flex flex-col gap-4 text-center text-white px-2">
            <h1 className="text-2xl font-bold leading-tight tracking-wide" style={{ color: 'var(--white)' }}>
              {event.title}
            </h1>
            <InterestBox label={interestedLabel} mobile />
            <div className="flex flex-wrap items-center justify-center gap-2 text-[12px]" style={{ color: 'var(--gray-300)' }}>
              {event.event_type && <span>{event.event_type}</span>}
              {event.event_type && <span style={{ color: 'var(--gray-500)' }}>•</span>}
              <span>{formatDate(event.event_date)}</span>
              {event.city && <><span style={{ color: 'var(--gray-500)' }}>•</span><span>{event.city}</span></>}
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-sm"
                style={{ color: 'var(--white)', border: '1px solid rgba(255, 255, 255, 0.2)', background: 'transparent' }}>
                2D
              </span>
              {event.language && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-sm"
                  style={{ color: 'var(--white)', border: '1px solid rgba(255, 255, 255, 0.2)', background: 'transparent' }}>
                  {event.language}
                </span>
              )}
            </div>
            <BookTicketsButton fullWidth />
          </div>
        </div>
      </div>

      {/* DETAILS */}
      <div className="container-max py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 }}
              className="rounded-2xl p-6" style={{ background: 'var(--white)', border: '1px solid var(--gray-200)' }}>
              <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--black)' }}>About the Event</h2>
              <p className="text-[14px] leading-relaxed" style={{ color: 'var(--gray-500)' }}>
                {event.description || 'No description provided.'}
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.16 }}
              className="rounded-2xl p-6" style={{ background: 'var(--white)', border: '1px solid var(--gray-200)' }}>
              <h2 className="text-lg font-bold mb-5" style={{ color: 'var(--black)' }}>Event Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InfoRow icon={<Calendar className="w-4 h-4" />} label="Date" value={formatDate(event.event_date)} />
                <InfoRow icon={<Clock className="w-4 h-4" />} label="Time" value={`${formatTime(event.start_time)} – ${formatTime(event.end_time)}`} />
                <InfoRow icon={<MapPin className="w-4 h-4" />} label="Venue" value={event.address || '—'} />
                <InfoRow icon={<MapPin className="w-4 h-4" />} label="City" value={event.city || '—'} />
                <InfoRow icon={<Tag className="w-4 h-4" />} label="Language" value={event.language || '—'} />
                <InfoRow icon={<Tag className="w-4 h-4" />} label="Category" value={event.event_type || '—'} />
                <InfoRow icon={<Ticket className="w-4 h-4" />} label="Total Tickets" value={event.total_tickets?.toLocaleString('en-IN') || '—'} />
                <InfoRow icon={<Users className="w-4 h-4" />} label="Available" value={availableTickets.toLocaleString('en-IN')} highlight={availableTickets < 50} />
              </div>
            </motion.div>

            {event.organizer && (
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.22 }}
                className="rounded-2xl p-6" style={{ background: 'var(--white)', border: '1px solid var(--gray-200)' }}>
                <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--black)' }}>Organizer</h2>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0"
                    style={{ background: 'var(--primary-blue)', color: 'var(--white)' }}>
                    {event.organizer.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-[15px]" style={{ color: 'var(--black)' }}>{event.organizer.name}</p>
                    <p className="text-[13px]" style={{ color: 'var(--gray-400)' }}>{event.organizer.email}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT sticky booking card */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.18 }}>
            <div className="sticky top-[84px] rounded-2xl p-6 flex flex-col gap-5 shadow-md"
              style={{ background: 'var(--white)', border: '1px solid var(--gray-200)' }}>
              <h2 className="text-lg font-bold" style={{ color: 'var(--black)' }}>Book Tickets</h2>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold" style={{ color: 'var(--primary-blue)' }}>
                  {event.is_free ? 'Free' : `₹${parseFloat(event.ticket_price).toLocaleString('en-IN')}`}
                </span>
                {!event.is_free && <span className="text-[13px]" style={{ color: 'var(--gray-400)' }}>per ticket</span>}
              </div>

              <div>
                <div className="flex justify-between text-[12px] mb-1.5" style={{ color: 'var(--gray-500)' }}>
                  <span>{event.sold_tickets} sold</span>
                  <span>{availableTickets} left</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'var(--gray-100)' }}>
                  <div className="h-full rounded-full animate-pulse"
                    style={{ width: `${soldPct}%`, background: availableTickets < 100 ? '#EF4444' : 'var(--primary-blue)' }} />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Pill label={formatDate(event.event_date)} icon={<Calendar className="w-3 h-3" />} />
                <Pill label={formatTime(event.start_time)} icon={<Clock className="w-3 h-3" />} />
                {event.language && <Pill label={event.language} />}
              </div>

              <BookTicketsButton fullWidth />

              <p className="text-center text-[11px]" style={{ color: 'var(--gray-400)' }}>
                Secure checkout • Instant confirmation
              </p>

              <button onClick={() => router.back()}
                className="flex items-center justify-center gap-1.5 text-[13px] font-medium"
                style={{ color: 'var(--gray-400)' }}>
                <ChevronLeft className="w-4 h-4" /> Back to Events
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value, highlight }: { icon: React.ReactNode; label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex-shrink-0" style={{ color: 'var(--primary-blue)' }}>{icon}</span>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide mb-0.5" style={{ color: 'var(--gray-400)' }}>{label}</p>
        <p className="text-[14px] font-medium" style={{ color: highlight ? '#EF4444' : 'var(--black)' }}>{value}</p>
      </div>
    </div>
  );
}

function Pill({ label, icon }: { label: string; icon?: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1 text-[12px] font-medium px-3 py-1 rounded-full"
      style={{ background: 'var(--gray-100)', color: 'var(--gray-500)' }}>
      {icon}{label}
    </span>
  );
}
