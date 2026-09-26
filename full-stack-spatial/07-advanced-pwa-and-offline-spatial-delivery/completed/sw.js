// sw.js: the service worker. Unlike Course 4.6's, this one has one job:
// keep the app shell (this page, its scripts, and the bundle catalogue)
// available with no network, using cache-first, the same as before. It does
// NOT intercept requests for a bundle's own files (the models): those are
// fetched and stored directly by bundle-store.js, in OPFS or the Cache API,
// because storing them there is the whole subject of this lesson, and
// because OPFS is only reachable from the page (or a worker it talks to),
// not usefully from a fetch handler here.

const VERSION = 'v1';
const SHELL_CACHE = `scene-bundles-shell-${VERSION}`;

const SHELL = [
  './',
  'index.html',
  'scene.html',
  'offline.html',
  'styles.css',
  'manifest.webmanifest',
  'data/bundles.json',
  'data/bundles/history-exhibit.manifest.json',
  'js/mirror.js',
  'js/manifest-loader.js',
  'js/bundle-store.js',
  'js/storage-panel.js',
  'js/download-manager.js',
  'js/low-data.js',
  'js/background-sync.js',
  'js/bundles-ui.js',
  'js/main.js',
  'js/scene-loader.js',
  'js/scene-exhibit.js',
  'js/scene-describe.js',
  'js/scene-app.js',
  'js/scene-main.js',
  'icons/icon.svg',
];

// scene.html's three.js engine, loaded from a CDN through its import map —
// about 700 KB together, so, like Course 4.6's 3D-moment library, it is
// cached separately and skipped when the device asks to save data. These
// exact addresses must match scene.html's import map. jsdelivr sends
// "Access-Control-Allow-Origin: *", so these are normal (CORS) responses,
// not opaque ones, and can be read back out of the cache correctly.
const THREE_JS = [
  'https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.module.min.js',
  'https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.core.min.js',
  'https://cdn.jsdelivr.net/npm/three@0.186.1/examples/jsm/controls/OrbitControls.js',
  'https://cdn.jsdelivr.net/npm/three@0.186.1/examples/jsm/loaders/GLTFLoader.js',
  // GLTFLoader.js itself imports these two (checked by reading its source):
  'https://cdn.jsdelivr.net/npm/three@0.186.1/examples/jsm/utils/BufferGeometryUtils.js',
  'https://cdn.jsdelivr.net/npm/three@0.186.1/examples/jsm/utils/SkeletonUtils.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);
    await cache.addAll(SHELL);
    // A service worker cannot read localStorage (the page's low-data
    // choice lives there), only the device-level signal, if the browser
    // exposes one at all.
    if (!self.navigator.connection?.saveData) {
      // The 3D library is a bonus at install time: if it fails, the app
      // shell still installs, and cacheFirst() above will still save it
      // the first time a scene page is actually opened online.
      await cache.addAll(THREE_JS).catch(() => {});
    }
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const name of await caches.keys()) {
      if (name.startsWith('scene-bundles-shell-') && name !== SHELL_CACHE) await caches.delete(name);
    }
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  if (request.mode === 'navigate') {
    event.respondWith(pageOrOffline(request));
    return;
  }

  // A bundle's own asset files (this project's own assets/ folder, or a
  // configured regional mirror at a different origin entirely) are managed
  // solely by bundle-store.js, in OPFS or its own Cache API entry. Leaving
  // them alone here — not calling event.respondWith at all — means the
  // browser handles that request exactly as it would with no service
  // worker installed, so there is exactly one place any bundle file is
  // ever cached, never two copies of the same 370 KB model.
  const isBundleAsset = request.url.includes('/assets/') || new URL(request.url).origin !== self.location.origin && !THREE_JS.includes(request.url);
  if (isBundleAsset) return;

  event.respondWith(cacheFirst(request));
});

// Cache first, for the app shell and for scene.html's three.js library: the
// files listed in SHELL only change when VERSION does, so the saved copy is
// always right. Anything not already saved (including the three.js core,
// OrbitControls, and GLTFLoader modules that scene.html's import map pulls
// from a CDN) is fetched from the network and saved the first time it
// succeeds — so visiting a scene once online, before ever downloading its
// bundle, is also what makes the *engine* itself (not the models, which
// bundle-store.js handles separately) available offline afterwards.
async function cacheFirst(request) {
  const saved = await caches.match(request);
  if (saved) return saved;
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(SHELL_CACHE);
    cache.put(request, response.clone()).catch(() => {});
  }
  return response;
}

async function pageOrOffline(request) {
  const saved = await caches.match(request, { ignoreSearch: true });
  if (saved) return saved;
  try {
    return await fetch(request);
  } catch {
    return caches.match('offline.html');
  }
}

// --- Background Sync: wake the page (or the browser, briefly) up to finish
// a paused download. This event only ever fires in a browser that supports
// the Background Sync API (see js/background-sync.js) — everywhere else,
// the page's own `online` listener does the same job while it is open.
self.addEventListener('sync', (event) => {
  if (event.tag !== 'resume-downloads') return;
  event.waitUntil((async () => {
    const clientsList = await self.clients.matchAll({ type: 'window' });
    for (const client of clientsList) client.postMessage({ type: 'RESUME_DOWNLOADS' });
  })());
});
