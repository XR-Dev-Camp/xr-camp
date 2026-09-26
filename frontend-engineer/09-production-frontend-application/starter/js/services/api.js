// api.js: everything that talks to the weather service. Copied from Course 2.6.

import { API_URL, TIMEOUT_MS, SAMPLE_URL } from '../config.js';

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

// Returns { json, savedAt }. savedAt is set when the service worker answered
// from its cache (the X-Saved-At header from Course 2.6), and null when live.
export async function fetchJson(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!response.ok) throw new Error(`status ${response.status}`);
  const savedAt = Number(response.headers.get('X-Saved-At')) || null;
  return { json: await response.json(), savedAt };
}

export const fetchForecast = (city) => fetchJson(forecastUrl(city));
export const fetchSample = () => fetchJson(SAMPLE_URL);
