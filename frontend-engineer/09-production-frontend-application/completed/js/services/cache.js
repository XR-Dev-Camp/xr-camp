// cache.js: the last forecast for each city, kept in localStorage with the
// time it was saved. Copied from Course 2.4; the prefix now comes from config.

import { WEATHER_CACHE_PREFIX } from '../config.js';

export function readCache(key, maxMinutes) {
  try {
    const saved = JSON.parse(localStorage.getItem(WEATHER_CACHE_PREFIX + key));
    if (!saved) return null;
    const ageMinutes = (Date.now() - saved.savedAt) / 60000;
    return { data: saved.data, savedAt: saved.savedAt, fresh: ageMinutes < maxMinutes };
  } catch {
    return null;
  }
}

export function writeCache(key, data, savedAt = Date.now()) {
  try {
    localStorage.setItem(WEATHER_CACHE_PREFIX + key, JSON.stringify({ savedAt, data }));
  } catch {
    // Storage switched off or full: the weather still works without a cache.
  }
}
