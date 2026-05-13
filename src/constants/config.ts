export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.ticketroko.com/v1',
  TIMEOUT: 10000,
};

export const ROUTES = {
  HOME: '/',
  MOVIES: '/movies',
  EVENTS: '/events',
  PLAYS: '/plays',
  SPORTS: '/sports',
  ACTIVITIES: '/activities',
  OFFERS: '/offers',
  GIFT_CARDS: '/gift-cards',
};
