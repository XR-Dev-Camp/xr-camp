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

// TODO 3: FEATURE-DETECT OPFS, AND SAVE A FILE.
// - supportsOPFS(): return true only if
//   `typeof navigator.storage?.getDirectory === 'function'`.
// - saveFile(bundleId, path, blob): if supportsOPFS(), get this bundle's
//   own OPFS subdirectory with `await opfsBundleDir(bundleId, { create:
//   true })` (finished, below), then
//   `dir.getFileHandle(path, { create: true })`, open it for writing with
//   `await fileHandle.createWritable()`, `await writable.write(blob)`, and
//   `await writable.close()`. Return the string 'opfs'.
//   Otherwise: `await caches.open(cacheName(bundleId))` (finished, below),
//   then `cache.put(new Request(...), new Response(blob))` — see
//   readFileUrl below for the exact synthetic URL to use as the key.
//   Return the string 'cache'.
export function supportsOPFS() {
  return false;
}

async function opfsBundleDir(bundleId, { create = false } = {}) {
  const root = await navigator.storage.getDirectory();
  return root.getDirectoryHandle(bundleId, { create });
}

function cacheName(bundleId) {
  return `scene-bundle-${bundleId}`;
}

export async function saveFile(bundleId, path, blob) {}

// TODO 4: READ A SAVED FILE BACK.
// Return a `blob:` object URL, ready to hand straight to GLTFLoader, or
// null if the file is not saved anywhere.
// - If supportsOPFS(): inside try/catch, get the bundle's directory (no
//   `create` option this time — it must already exist), then
//   `dir.getFileHandle(path)`, `await fileHandle.getFile()`, and return
//   `URL.createObjectURL(file)`. On any error (not found), fall through
//   to the cache check below instead of returning early — a bundle
//   downloaded before a browser update changed OPFS support could have
//   files in either place.
// - Otherwise (or after a failed OPFS lookup): open
//   `caches.open(cacheName(bundleId))`, `cache.match(new
//   Request(\`/scene-bundles/${bundleId}/${path}\`))` (this exact synthetic
//   URL is also what saveFile's cache branch must use as its key). If no
//   match, return null; otherwise `URL.createObjectURL(await
//   response.blob())`.
export async function readFileUrl(bundleId, path) {
  return null;
}

// TODO 5: DELETE A BUNDLE.
// Remove every file this bundle saved, in whichever store holds them:
// - If supportsOPFS(): `const root = await navigator.storage.getDirectory()`,
//   then `await root.removeEntry(bundleId, { recursive: true })`, wrapped
//   so a missing folder does not throw (`.catch(() => {})` works well).
// - Always also `await caches.delete(cacheName(bundleId))` — unconditional,
//   since a bundle downloaded on a browser without OPFS support needs this
//   branch, and running it when there is nothing to delete is a safe no-op.
// - Finally, call `clearDownloadRecord(bundleId)` (finished, below).
export async function deleteBundle(bundleId) {}

// --- The small local record of "which bundles are downloaded" --------------
// Finished: OPFS and the Cache API both say what they hold, but asking them
// file by file on every page load is slower than reading one localStorage
// key, and this record is also what lets the bundle list show a status
// instantly, before either storage system has answered anything.

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
