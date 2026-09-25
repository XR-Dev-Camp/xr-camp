// sw.js: the service worker. It sits between the pages and the network, and
// decides, for every request, whether to answer from the cache or the network.
//
// It lives next to index.html, so its scope is this folder: it can control
// index.html, 3d-moment.html, and offline.html, but nothing above them.

// Change this number every time you change any file in SHELL. A new number
// means a new cache: the browser installs the new worker, fills the new cache,
// and the activate step below deletes the old one.
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

// The 3D moment's library: about 1.3 MB, so it is cached separately, and
// skipped when the device asks to save data. It must be exactly the same
// address as AFRAME_URL in js/config.js. aframe.io sends
// "Access-Control-Allow-Origin: *", so this is a normal (CORS) response, not
// an opaque one.
const THREE_D = ['https://aframe.io/releases/1.8.0/aframe.min.js'];

// Weather answers from this origin use the network first (see networkFirst).
const API_ORIGIN = 'https://api.open-meteo.com';

// On a slow connection, wait this long for the network before using a saved
// answer. Shorter than the page's own 8-second timeout, so the page never
// gives up before the service worker has had a chance to help.
const NETWORK_TIMEOUT_MS = 4000;

// --- Install: save the app shell ---------------------------------------------
// If any file in SHELL fails to download, addAll fails, and so does the whole
// install: the old worker keeps running. You never get half an app.
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);
    await cache.addAll(SHELL);
    // Workers can read the Save-Data setting too, in browsers that have it.
    if (!self.navigator.connection?.saveData) {
      // The 3D library is a bonus: if it fails, the app still installs.
      await cache.addAll(THREE_D).catch(() => {});
    }
  })());
});

// --- Activate: delete old caches -----------------------------------------------
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const name of await caches.keys()) {
      if (name.startsWith('weather-shell-') && name !== SHELL_CACHE) await caches.delete(name);
    }
    // Take control of pages that are already open, without a reload.
    await self.clients.claim();
  })());
});

// --- Update: the page asks the waiting worker to take over -------------------
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

// --- Fetch: choose a strategy for each request -------------------------------
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;          // let the browser handle it

  const url = new URL(request.url);
  if (url.origin === API_ORIGIN) {
    event.respondWith(networkFirst(request));
  } else if (request.mode === 'navigate') {
    event.respondWith(pageOrOffline(request));
  } else {
    event.respondWith(cacheFirst(request));
  }
});

// Cache first, for the app shell: the files only change when VERSION does, so
// the saved copy is always right, and it is instant. Anything not saved goes
// to the network. The 3D library is saved the first time it is fetched, so
// visiting the 3D moment once online also makes it work offline.
async function cacheFirst(request) {
  const saved = await caches.match(request);
  if (saved) return saved;
  const response = await fetch(request);
  if (THREE_D.includes(request.url) && response.ok) {
    const cache = await caches.open(SHELL_CACHE);
    await cache.put(request, response.clone());
  }
  return response;
}

// Pages: the saved page if there is one; otherwise the network; and if the
// network fails too, the offline page, never the browser's own error.
async function pageOrOffline(request) {
  const saved = await caches.match(request, { ignoreSearch: true });
  if (saved) return saved;
  try {
    return await fetch(request);
  } catch {
    return caches.match('offline.html');
  }
}

// Network first, with a timeout, for weather answers: a forecast should be as
// fresh as possible, so ask the network. Save every good answer. If the
// network fails, or is slower than NETWORK_TIMEOUT_MS, use the saved answer.
async function networkFirst(request) {
  const cache = await caches.open(DATA_CACHE);
  const network = fetch(request).then(async (response) => {
    if (response.ok) await cache.put(request, await stamp(response.clone()));
    return response;
  });
  network.catch(() => {});   // a failure is handled below; do not report it twice

  const timeout = new Promise((resolve) => { setTimeout(resolve, NETWORK_TIMEOUT_MS); });
  try {
    const first = await Promise.race([network, timeout]);
    if (first) return first;          // the network answered in time
  } catch {
    // Offline or blocked: fall through to the saved answer.
  }
  const saved = await cache.match(request);
  // Nothing saved: keep waiting for the network, or pass on its error, so the
  // page shows its own error state.
  return saved ?? network;
}

// A saved answer can be old. Add the time it was saved as a header, so the
// page can say "saved at 14:05" instead of pretending it is live.
async function stamp(response) {
  const headers = new Headers(response.headers);
  headers.set('X-Saved-At', String(Date.now()));
  return new Response(await response.blob(), { status: response.status, statusText: response.statusText, headers });
}
