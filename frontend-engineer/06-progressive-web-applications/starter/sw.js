// sw.js: the service worker. It sits between the pages and the network, and
// decides, for every request, whether to answer from the cache or the network.
//
// It lives next to index.html, so its scope is this folder: it can control
// index.html, 3d-moment.html, and offline.html, but nothing above them.
//
// A service worker has no page: no document, no window, no localStorage.
// Its console.log messages appear in DevTools > Application > Service workers
// (Chrome: click "inspect" next to the worker; Firefox: about:debugging).

// Change this number every time you change any file in SHELL.
const VERSION = 'v1';
const SHELL_CACHE = `weather-shell-${VERSION}`;
const DATA_CACHE = 'weather-data';

// The app shell: every file the pages need to open with no internet.
const SHELL = [
  './',
  'index.html',
  'offline.html',
  '3d-moment.html',
  'styles.css',
  'manifest.webmanifest',
  'js/api.js',
  'js/cache.js',
  'js/config.js',
  'js/forecast.js',
  'js/low-data.js',
  'js/main.js',
  'js/pwa.js',
  'js/view.js',
  'data/sample-forecast.json',
  'icons/icon.svg',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
];

// The 3D moment's library: about 1.3 MB. Exactly the same address as
// AFRAME_URL in js/config.js.
const THREE_D = ['https://aframe.io/releases/1.8.0/aframe.min.js'];

const API_ORIGIN = 'https://api.open-meteo.com';
const NETWORK_TIMEOUT_MS = 4000;

// TODO 4: THE LIFECYCLE. Listen for the worker's own events, and log them:
//   self.addEventListener('install', () => console.log('installed', VERSION));
//   self.addEventListener('activate', () => console.log('activated', VERSION));
// Reload the page and watch the worker in DevTools > Application.

// TODO 5: PRECACHE THE SHELL. In the install listener, call
// event.waitUntil(...) with an async function that opens SHELL_CACHE with
// caches.open() and saves every file with cache.addAll(SHELL).
// waitUntil tells the browser "not installed until this promise settles".

// TODO 6: CACHE FIRST. Listen for 'fetch'. Ignore anything that is not a GET
// (just return). Otherwise event.respondWith(cacheFirst(event.request)).
// Write cacheFirst(request): return await caches.match(request) if it
// found something; otherwise return fetch(request).

// TODO 7: PAGES AND THE OFFLINE PAGE. In the fetch listener, when
// request.mode === 'navigate', respond with pageOrOffline(request) instead:
// the saved page (caches.match(request, { ignoreSearch: true })), or else
// fetch(request) inside try, and in catch return caches.match('offline.html').

// TODO 8: NETWORK FIRST, WITH A TIMEOUT, FOR THE WEATHER. When
// new URL(request.url).origin === API_ORIGIN, respond with
// networkFirst(request). In networkFirst:
//   1. Start fetch(request). When it answers ok, put a stamped copy in
//      DATA_CACHE: cache.put(request, await stamp(response.clone())).
//   2. Race it against a timeout of NETWORK_TIMEOUT_MS
//      (Promise.race([network, timeout])). If the network wins, return it.
//   3. If it fails or is too slow, return the saved answer
//      (cache.match(request)), or, if nothing is saved, the network promise.
// stamp() is finished, below.

// TODO 10: CLEAN UP OLD VERSIONS. In the activate listener, use
// event.waitUntil to loop over await caches.keys(), and caches.delete()
// every name that starts with 'weather-shell-' but is not SHELL_CACHE.
// Then call self.clients.claim() to control pages that are already open.

// TODO 11: LET THE PAGE CHOOSE WHEN TO UPDATE. Listen for 'message'. If
// event.data?.type === 'SKIP_WAITING', call self.skipWaiting().

// TODO 15: THE 3D MOMENT OFFLINE. In install, after the shell, also
// cache.addAll(THREE_D), unless self.navigator.connection?.saveData is true.
// Add .catch(() => {}) so a failed 3D download never stops the install. And
// in cacheFirst, when THREE_D.includes(request.url) and the network answer
// is ok, put a copy in SHELL_CACHE, so opening the 3D moment once saves it.

// Finished: a saved answer can be old. Add the time it was saved as a header,
// so the page can say "saved at 14:05" instead of pretending it is live.
async function stamp(response) {
  const headers = new Headers(response.headers);
  headers.set('X-Saved-At', String(Date.now()));
  return new Response(await response.blob(), { status: response.status, statusText: response.statusText, headers });
}
