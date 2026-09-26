// bundle-store.js: where a downloaded bundle's files actually live. Two
// storage systems, chosen per file:
//
// - The Origin Private File System (OPFS), reached through
//   navigator.storage.getDirectory(). It behaves like a small, private
//   drive for this origin: real files and folders, not just key/value
//   pairs, meant for exactly this job — storing bigger binary files a page
//   manages itself. Support: Chrome/Edge 108+, Firefox 111+, Safari 15.2+
//   (per MDN; always feature-detect rather than trust a browser/version
//   guess, since exact behaviour has changed across versions).
// - The Cache API (`caches`), the same storage sw.js already uses for the
//   app shell. It stores Request/Response pairs and is supported anywhere
//   service workers are, which is effectively every current browser.
//
// This lesson stores every model file in OPFS when it is available (a
// closer match to "a big file this page owns"), and falls back to the
// Cache API when it is not — so the download and delete features below
// work the same way either way, and the rest of this project never needs
// to know which one actually holds a given file.

export function supportsOPFS() {
  return typeof navigator.storage?.getDirectory === 'function';
}

// One OPFS subdirectory per bundle, so deleting a bundle is deleting one
// folder, not hunting for loose files by name.
async function opfsBundleDir(bundleId, { create = false } = {}) {
  const root = await navigator.storage.getDirectory();
  return root.getDirectoryHandle(bundleId, { create });
}

function cacheName(bundleId) {
  return `scene-bundle-${bundleId}`;
}

// Saves one file's bytes for a bundle. `blob` is the whole downloaded file
// (download-manager.js reads the response body itself, for progress, and
// hands the finished Blob here — this module only ever stores a complete
// file, never a partial one). Returns which store the file actually landed
// in, so bundle-store.js's own record of the bundle (see markDownloaded)
// can find it again later.
export async function saveFile(bundleId, path, blob) {
  if (supportsOPFS()) {
    const dir = await opfsBundleDir(bundleId, { create: true });
    const fileHandle = await dir.getFileHandle(path, { create: true });
    // createWritable() is OPFS's own streaming write; it exists so a large
    // file never has to sit fully in a second copy of memory just to be
    // saved. Course scope keeps this to one write() call, since download-
    // manager.js already assembled the whole Blob for its own progress
    // reporting.
    const writable = await fileHandle.createWritable();
    await writable.write(blob);
    await writable.close();
    return 'opfs';
  }

  const cache = await caches.open(cacheName(bundleId));
  // A cache stores Response objects, keyed by Request/URL, not by an
  // arbitrary file name — a synthetic same-origin URL under this bundle's
  // own path keeps every bundle's files from colliding with each other or
  // with the app shell's own cache.
  await cache.put(new Request(`/scene-bundles/${bundleId}/${path}`), new Response(blob));
  return 'cache';
}

// Reads a saved file back as a `blob:` object URL, ready to hand straight
// to GLTFLoader. Returns null if the file is not saved anywhere, so
// scene-main.js can fall back to fetching it over the network instead.
export async function readFileUrl(bundleId, path) {
  if (supportsOPFS()) {
    try {
      const dir = await opfsBundleDir(bundleId);
      const fileHandle = await dir.getFileHandle(path);
      const file = await fileHandle.getFile();
      return URL.createObjectURL(file);
    } catch {
      // Not found in OPFS — fall through to the cache, in case this bundle
      // was downloaded on a browser or version without OPFS and later
      // opened on one that has it.
    }
  }
  const cache = await caches.open(cacheName(bundleId));
  const response = await cache.match(new Request(`/scene-bundles/${bundleId}/${path}`));
  if (!response) return null;
  return URL.createObjectURL(await response.blob());
}

// Removes every file this bundle saved, in whichever store holds them.
// Deletes both, unconditionally: a bundle downloaded before a browser
// update changed OPFS support could have files in either place, and
// deleting from a store that never held anything for this bundle is a safe
// no-op.
export async function deleteBundle(bundleId) {
  if (supportsOPFS()) {
    const root = await navigator.storage.getDirectory();
    await root.removeEntry(bundleId, { recursive: true }).catch(() => {});
  }
  await caches.delete(cacheName(bundleId));
  clearDownloadRecord(bundleId);
}

// --- The small local record of "which bundles are downloaded" --------------
// OPFS and the Cache API both say what they hold, but asking them file by
// file on every page load is slower than reading one localStorage key, and
// this record is also what lets the bundle list show a status instantly,
// before either storage system has answered anything.

const RECORD_KEY = 'xrcamp-scene-bundles:downloaded';

function readRecord() {
  try {
    return JSON.parse(localStorage.getItem(RECORD_KEY) ?? '{}');
  } catch {
    return {};
  }
}

export function isDownloaded(bundleId) {
  return Boolean(readRecord()[bundleId]);
}

export function markDownloaded(bundleId, totalFiles) {
  const record = readRecord();
  record[bundleId] = { downloadedAt: Date.now(), totalFiles };
  try {
    localStorage.setItem(RECORD_KEY, JSON.stringify(record));
  } catch {
    // Storage switched off: the bundle's files are still saved; only this
    // convenience record is lost, so the UI will show it as "not
    // downloaded" until the files are checked directly.
  }
}

export function clearDownloadRecord(bundleId) {
  const record = readRecord();
  delete record[bundleId];
  try {
    localStorage.setItem(RECORD_KEY, JSON.stringify(record));
  } catch {
    // See markDownloaded: nothing more to do if storage is unavailable.
  }
}
