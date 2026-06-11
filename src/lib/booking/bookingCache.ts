import type { EventBookingPayload } from '../../types/booking';

const TTL_MS = 5 * 60 * 1000;
const PREFIX = 'tr-booking:';
// Bump this when the payload shape changes so old cached data is discarded automatically
const CACHE_VERSION = 4;

interface CacheEntry {
  data: EventBookingPayload;
  ts: number;
  v: number;
}

export function getBookingCache(slugOrId: string): EventBookingPayload | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(`${PREFIX}${slugOrId}`);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry;

    // Discard entries from older cache versions
    if (entry.v !== CACHE_VERSION) {
      sessionStorage.removeItem(`${PREFIX}${slugOrId}`);
      return null;
    }

    if (Date.now() - entry.ts > TTL_MS) {
      sessionStorage.removeItem(`${PREFIX}${slugOrId}`);
      return null;
    }

    // Discard cache if partyPlot_id exists on the event but partyPlot data is missing
    // (happens when cache was written before the partyPlot fix)
    const ev = entry.data?.event as any;
    if (ev?.party_plot_id && !entry.data?.partyPlot) {
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
    const entry: CacheEntry = { data, ts: Date.now(), v: CACHE_VERSION };
    sessionStorage.setItem(`${PREFIX}${slugOrId}`, JSON.stringify(entry));
  } catch {
    /* quota exceeded — ignore */
  }
}
