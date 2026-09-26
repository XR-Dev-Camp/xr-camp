// config.js: every setting for My XR Camp, in one place.
// The settings from Courses 2.2 to 2.6 were in five config files. Now there
// is one, grouped by the part of the app that uses it.

// --- The release -----------------------------------------------------------
// Semantic versioning: MAJOR.MINOR.PATCH (Course 2.7). When you change it,
// change VERSION in sw.js to the same value, and add a CHANGELOG.md entry.
// check.html checks that sw.js and this file agree.
export const APP_VERSION = '1.0.0';

// --- Languages ---------------------------------------------------------------
// Each code is a BCP 47 language tag, the same kind <html lang> uses, and
// the name of a file in js/locales/. Names are written in their own language,
// so everyone can find theirs.
export const LOCALES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'zh-Hans', name: '中文（简体）' },
];
export const DEFAULT_LOCALE = 'en';

// --- Views -------------------------------------------------------------------
// Each id is a <section id> in index.html, and an address: index.html#planner.
export const VIEWS = ['dashboard', 'course', 'planner', 'weather', 'app'];
export const DEFAULT_VIEW = 'dashboard';

// --- Saved in this browser ---------------------------------------------------
// The same keys as the earlier lessons, so a learner's saved progress,
// sessions, and forecasts carry over (when served from the same address).
export const PROGRESS_KEY = 'my-xr-camp-progress';          // Courses 2.2 and 2.5
export const PLANNER_KEY = 'xrc_s';                         // Course 2.3
export const WEATHER_CACHE_PREFIX = 'my-xr-camp-weather:';  // Course 2.4
export const LOW_DATA_KEY = 'my-xr-camp-weather:low-data';  // Course 2.6
export const LANGUAGE_KEY = 'my-xr-camp-language';          // new in 2.9

// --- Course data (Courses 2.1 and 2.2) ---------------------------------------
export const CATALOG_URL = 'data/catalog.json';

// --- Session planner (Course 2.3) -------------------------------------------
// Stored in English, in week order, and used to sort. Only the names shown
// on the page are translated (see weekdayName in i18n.js).
export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const SESSION_MINUTES = 45;
export const WEEKLY_GOAL = 4;

// --- Study-week weather (Courses 2.4 and 2.6) --------------------------------
// Open-Meteo: free, no key, no account. Weather data by Open-Meteo.com, under
// CC BY 4.0. City names are translated: see "city.<id>" in js/locales/.
export const API_URL = 'https://api.open-meteo.com/v1/forecast';
export const CITIES = [
  { id: 'mexico-city', latitude: 19.43, longitude: -99.13 },
  { id: 'guatemala-city', latitude: 14.63, longitude: -90.51 },
  { id: 'bogota', latitude: 4.71, longitude: -74.07 },
  { id: 'lima', latitude: -12.05, longitude: -77.04 },
  { id: 'sao-paulo', latitude: -23.55, longitude: -46.63 },
  { id: 'beijing', latitude: 39.9, longitude: 116.4 },
  { id: 'chengdu', latitude: 30.66, longitude: 104.07 },
];
export const CACHE_MINUTES = 30;
export const TIMEOUT_MS = 8000;
export const SAMPLE_URL = 'data/sample-forecast.json';

// --- The 3D view (new in 2.9) ------------------------------------------------
// Pinned to the version in versions.json. Loaded only when the learner asks.
export const AFRAME_URL = 'https://aframe.io/releases/1.8.0/aframe.min.js';
export const AFRAME_SIZE_MB = 1.3;
