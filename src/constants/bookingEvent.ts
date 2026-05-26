import type { BookingEvent } from '../types/booking';

export const AMAZONE_BOOKING_EVENT: BookingEvent = {
  eventId: 2,
  slug: 'amazone-event',
  title: 'Amazone Event',
  description:
    'Experience an unforgettable live event at the heart of London City. Premium seating, world-class production, and an atmosphere you will remember long after the curtains close.',
  bannerImage: '/image1.jpg',
  date: '8 April 2026',
  startTime: '10:57 AM',
  endTime: '3:57 PM',
  city: 'London City',
  address: '202B, Torronto Downtown London City',
  language: 'English',
  eventType: 'Other',
  ticketPrice: 1000,
  totalSeats: 53,
  availableSeats: 46,
  showTimings: ['10:57 AM', '1:00 PM', '4:30 PM'],
};
