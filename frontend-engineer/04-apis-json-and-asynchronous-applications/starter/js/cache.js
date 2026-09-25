// cache.js: keep the last answer for each city in localStorage, with the time
// it was saved, so the dashboard can show something at once, and offline.

const PREFIX = 'my-xr-camp-weather:';

// TODO 9: Export readCache(key, maxMinutes) and writeCache(key, data).
// - writeCache saves JSON.stringify({ savedAt: Date.now(), data }) under
//   PREFIX + key, inside try/catch.
// - readCache returns null if nothing is saved (or anything fails); otherwise
//   { data, savedAt, fresh }, where fresh is true if it is younger than
//   maxMinutes. (Date.now() - savedAt) is in milliseconds: divide by 60000.
export function readCache() {
  return null;
}

export function writeCache() {}
