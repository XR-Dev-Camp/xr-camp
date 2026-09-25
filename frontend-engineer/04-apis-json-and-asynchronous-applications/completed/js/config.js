// config.js: settings for the study-week weather dashboard.

// Open-Meteo: free, no key, no account, and it allows requests from any
// website (CORS). Weather data by Open-Meteo.com, under CC BY 4.0.
export const API_URL = 'https://api.open-meteo.com/v1/forecast';

// Cities with their coordinates, so we never need a second API to look them
// up. Add your own: find the latitude and longitude on any map.
export const CITIES = [
  { id: 'mexico-city', name: 'Mexico City', latitude: 19.43, longitude: -99.13 },
  { id: 'guatemala-city', name: 'Guatemala City', latitude: 14.63, longitude: -90.51 },
  { id: 'bogota', name: 'Bogotá', latitude: 4.71, longitude: -74.07 },
  { id: 'lima', name: 'Lima', latitude: -12.05, longitude: -77.04 },
  { id: 'sao-paulo', name: 'São Paulo', latitude: -23.55, longitude: -46.63 },
  { id: 'beijing', name: 'Beijing', latitude: 39.9, longitude: 116.4 },
  { id: 'chengdu', name: 'Chengdu', latitude: 30.66, longitude: 104.07 },
];

// A saved forecast younger than this is used without asking the API again.
export const CACHE_MINUTES = 30;

// Give up on a request after this long, and show the error state.
export const TIMEOUT_MS = 8000;

// Sample data with exactly the same shape as the API's answer.
export const SAMPLE_URL = 'data/sample-forecast.json';
