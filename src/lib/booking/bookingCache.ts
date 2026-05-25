import type { EventBookingPayload } from '../../types/booking';

const TTL_MS = 5 * 60 * 1000;
const PREFIX = 'tr-booking:';

interface CacheEntry {
  data: EventBookingPayload;
  ts: number;
}

export function getBookingCache(slugOrId: string): EventBookingPayload | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(`${PREFIX}${slugOrId}`);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry;
    if (Date.now() - entry.ts > TTL_MS) {
      sessionStorage.removeItem(`${PREFIX}${slugOrId}`);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

export function setBookingCache(slugOrId: string, data: EventBookingPayload): void {
  if (typeof window === 'undefined') return;
  try {
    const entry: CacheEntry = { data, ts: Date.now() };
    sessionStorage.setItem(`${PREFIX}${slugOrId}`, JSON.stringify(entry));
  } catch {
    /* quota exceeded — ignore */
  }
}
