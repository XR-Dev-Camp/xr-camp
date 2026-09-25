// api.js: everything that talks to the network lives here.

import { API_URL, TIMEOUT_MS, SAMPLE_URL } from './config.js';

// TODO 2: Export forecastUrl(city). Build the query with URLSearchParams:
// latitude, longitude, daily (the three variables, joined by commas),
// timezone: 'auto', and forecast_days: 7. Return `${API_URL}?${params}`.
// console.log the result and open it in a tab: is it the same JSON as TODO 1?

// TODO 5: Export async fetchJson(url):
// - await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) })
// - if !response.ok, throw new Error(`The server answered ${response.status}.`)
//   (fetch does NOT reject for 404 or 500: those are still answers)
// - return response.json()

export function fetchForecast(city) {
  return fetchJson(forecastUrl(city));
}

export function fetchSample() {
  return fetchJson(SAMPLE_URL);
}
