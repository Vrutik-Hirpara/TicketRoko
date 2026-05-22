// Single source of truth for API base URL.
// Set NEXT_PUBLIC_API_URL in your .env.local file.
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

// Derives the uploads domain from the API base URL.
// e.g. https://api.example.com/api  →  https://api.example.com
export const UPLOADS_URL = BASE_URL?.replace(/\/api\/?$/, '');
