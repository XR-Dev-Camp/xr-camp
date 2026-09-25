// cache.js: keep the last answer for each city in localStorage, with the time
// it was saved, so the dashboard can show something at once, and offline.

const PREFIX = 'my-xr-camp-weather:';

export function readCache(key, maxMinutes) {
  try {
    const saved = JSON.parse(localStorage.getItem(PREFIX + key));
    if (!saved) return null;
    const ageMinutes = (Date.now() - saved.savedAt) / 60000;
    return { data: saved.data, savedAt: saved.savedAt, fresh: ageMinutes < maxMinutes };
  } catch {
    return null;
  }
}

export function writeCache(key, data) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify({ savedAt: Date.now(), data }));
  } catch {
    // Storage switched off or full: the dashboard still works without a cache.
  }
}
