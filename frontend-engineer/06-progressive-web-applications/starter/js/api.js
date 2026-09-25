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
// Course 2.6: it now returns { json, savedAt }. main.js and the 3D moment
// already use savedAt to say "Saved by this app at 14:05".
//
// TODO 9: TELL THE TRUTH ABOUT AGE. When the service worker answers from its
// cache, stamp() has added an X-Saved-At header. Read it:
// Number(response.headers.get('X-Saved-At')) || null
// and return it as savedAt. null means the answer is live.
export async function fetchJson(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!response.ok) throw new Error(`The server answered ${response.status}.`);
  return { json: await response.json(), savedAt: null };
}

export function fetchForecast(city) {
  return fetchJson(forecastUrl(city));
}

export function fetchSample() {
  return fetchJson(SAMPLE_URL);
}
