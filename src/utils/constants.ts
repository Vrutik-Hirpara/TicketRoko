// // Single source of truth for API base URL.
// // Set NEXT_PUBLIC_API_URL in your .env.local file.
// export const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

// // Derives the uploads domain from the API base URL.
// // e.g. https://api.example.com/api  →  https://api.example.com
// export const UPLOADS_URL = BASE_URL?.replace(/\/api\/?$/, '');

// /**
//  * Resolves any banner_url from the API to a full absolute image URL.
//  * Handles 3 cases:
//  *  1. Already absolute (https://...) → return as-is
//  *  2. Relative path (/uploads/events/...) → prepend UPLOADS_URL (domain only)
//  *  3. Null / undefined → return fallback placeholder
//  */
// export function getFullImageUrl(url?: string | null): string {
//   const fallback =
//     'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=60';
//   if (!url) return fallback;
//   if (url.startsWith('http://') || url.startsWith('https://')) return url;
//   // Relative path already includes /uploads/... — just prepend domain
//   return `${UPLOADS_URL}${url}`;
// }
// Single source of truth for API base URL.
// Set NEXT_PUBLIC_API_URL in your .env.local file.
export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.ticketroko.retailian.in/api/';

// Derives the uploads domain from the API base URL.
// e.g. https://api.example.com/api  →  https://api.example.com
export const UPLOADS_URL = BASE_URL?.replace(/\/api\/?$/, '');

/**
 * Resolves any banner_url from the API to a full absolute image URL.
 */
export function getFullImageUrl(url?: string | null): string {
  // Default image from public folder
  const fallback = "/event_placeholder.png";

  // If no image
  if (!url) return fallback;

  // Only allow uploaded images
  if (url.startsWith("/uploads")) {
    return `${UPLOADS_URL}${url}`;
  }

  // Block external images and show default image
  return fallback;
}

/** Banner for booking/detail — allows absolute URLs from API (e.g. Unsplash) */
export function getEventBannerUrl(url?: string | null): string {
  const fallback = "/event_placeholder.png";
  if (!url) return fallback;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/uploads")) return `${UPLOADS_URL}${url}`;
  return fallback;
}