import { BASE_URL } from '../../utils/constants';

export interface ApiErrorBody {
  message?: string;
  errors?: Record<string, string[]>;
}

function extractErrorMessage(body: ApiErrorBody, fallback: string): string {
  if (body.message) return body.message;
  if (body.errors) {
    const first = Object.values(body.errors).flat()[0];
    if (first) return first;
  }
  return fallback;
}

/**
 * POST JSON to the TicketRoko API (never FormData).
 */
export async function postJson<TResponse>(
  path: string,
  body: object,
  options?: { token?: string },
): Promise<TResponse> {
  const url = `${BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (options?.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  let response: Response;

  try {
    response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      cache: 'no-store',
      credentials: 'omit',
    });
  } catch {
    throw new Error('Network error. Please check your connection and try again.');
  }

  let result: unknown = {};
  try {
    const text = await response.text();
    result = text ? JSON.parse(text) : {};
  } catch {
    if (!response.ok) {
      if (response.status === 401 && typeof window !== 'undefined') {
        const { clearStoredAuth } = await import('../auth/storage');
        clearStoredAuth();
        window.location.href = '/login';
        throw new Error('Session expired');
      }
      throw new Error(`Request failed (${response.status})`);
    }
    throw new Error('Invalid response from server');
  }

  const r = result as { success?: boolean; message?: string; data?: unknown };

  if (!response.ok) {
    if (response.status === 401 && typeof window !== 'undefined') {
      const { clearStoredAuth } = await import('../auth/storage');
      clearStoredAuth();
      window.location.href = '/login';
      throw new Error('Session expired');
    }
    throw new Error(extractErrorMessage(r as ApiErrorBody, `Request failed (${response.status})`));
  }

  if (r.success === false) {
    throw new Error(r.message || 'Request failed');
  }

  return result as TResponse;
}
