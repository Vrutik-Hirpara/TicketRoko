import { BASE_URL } from '../../utils/constants';

/**
 * GET JSON from the TicketRoko API with optional auth token.
 */
export async function getJson<TResponse>(
  path: string,
  options?: { token?: string; signal?: AbortSignal },
): Promise<TResponse> {
  const url = `${BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

  const headers: Record<string, string> = {
    Accept: 'application/json',
  };

  if (options?.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  let response: Response;

  try {
    response = await fetch(url, {
      method: 'GET',
      headers,
      cache: 'no-store',
      credentials: 'omit',
      signal: options?.signal,
    });
  } catch (err: any) {
    if (err.name === 'AbortError') throw err;
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

  if (!response.ok) {
    if (response.status === 401 && typeof window !== 'undefined') {
      const { clearStoredAuth } = await import('../auth/storage');
      clearStoredAuth();
      window.location.href = '/login';
      throw new Error('Session expired');
    }
    const r = result as { message?: string };
    throw new Error(r.message || `Request failed (${response.status})`);
  }

  return result as TResponse;
}
