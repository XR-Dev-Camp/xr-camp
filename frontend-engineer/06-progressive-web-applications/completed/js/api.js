// api.js: everything that talks to the network lives here.

import { API_URL, TIMEOUT_MS, SAMPLE_URL } from './config.js';

// URLSearchParams builds the "?a=1&b=2" part, and encodes it safely.
export function forecastUrl(city) {
  const params = new URLSearchParams({
    latitude: city.latitude,
    longitude: city.longitude,
    daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    timezone: 'auto',
    forecast_days: 7,
  });
  return `${API_URL}?${params}`;
}

// fetch only rejects when there is no answer at all (offline, blocked, timed
// out). A "404" or "500" is still an answer, so check response.ok ourselves.
//
// Course 2.6: it now returns { json, savedAt }. When the service worker
// answers from its cache, it adds an X-Saved-At header with the time it saved
// that answer. savedAt is that time, or null when the answer is live.
export async function fetchJson(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!response.ok) throw new Error(`The server answered ${response.status}.`);
  const savedAt = Number(response.headers.get('X-Saved-At')) || null;
  return { json: await response.json(), savedAt };
}

export function fetchForecast(city) {
  return fetchJson(forecastUrl(city));
}

export function fetchSample() {
  return fetchJson(SAMPLE_URL);
}
