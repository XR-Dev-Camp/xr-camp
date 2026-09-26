// download-manager.js: downloads one scene bundle's files, in order, with
// combined progress across all of them and a real Cancel button. Finished
// files are handed to bundle-store.js to save; a file that is already saved
// (because an earlier attempt got partway through, or because a person
// clicked Download again) is skipped, which is what makes "resume after
// losing the connection" (see background-sync.js) just a second call to
// this same function.

import { resolveAssetUrl } from './mirror.js';
import { readFileUrl, saveFile, markDownloaded } from './bundle-store.js';

// TODO 8: DOWNLOAD WITH PROGRESS, SKIPPING SAVED FILES.
// - readWithProgress(response, onBytes): read `Number(response.headers.get(
//   'Content-Length')) || 0` as `total`. Get a reader with
//   `response.body.getReader()`. Loop: `const { done, value } = await
//   reader.read()`; break when `done`; otherwise push `value` onto an
//   array, add `value.byteLength` to a running `loaded` total, and call
//   `onBytes(loaded, total)`. When the loop ends, return `new Blob(chunks)`.
//   (response.blob() alone would give no progress until the whole file has
//   already arrived — that is the one thing this function exists to avoid.)
// - downloadBundle(bundleId, manifest, { onProgress, signal }): for each
//   file in manifest.files, first check `await readFileUrl(bundleId,
//   file.path)` — if it already has a saved copy, skip straight to the next
//   file (add its bytes to a running "already done" total so the overall
//   percentage stays accurate). For a file not yet saved:
//     1. `resolveAssetUrl(file.path)` for the URL.
//     2. `await fetch(url, { signal })`; if `!response.ok`, throw an Error
//        naming the file and the status.
//     3. `await readWithProgress(response, (loaded) => onProgress?.({
//        loadedBytes: <already-done bytes> + loaded, totalBytes, path:
//        file.path }))`.
//     4. `await saveFile(bundleId, file.path, blob)`.
//   After every file, call `markDownloaded(bundleId, manifest.files.length)`
//   (finished, below).
//   Letting `fetch`'s own AbortError propagate (do not catch it here) is
//   what lets a caller's `error.name === 'AbortError'` check tell a
//   deliberate Cancel apart from a real network failure.
export async function downloadBundle(bundleId, manifest, { onProgress, signal } = {}) {}

// --- The resume queue --------------------------------------------------------
// A small localStorage list of bundle ids whose download did not finish
// because the network went away mid-file (not because someone clicked
// Cancel). background-sync.js reads and clears this list once the
// connection is back, whether that "once back" is signalled by a real
// Background Sync event or, on a browser without that API, the window's
// own `online` event.

const QUEUE_KEY = 'xrcamp-scene-bundles:pending-downloads';

// TODO 9: THE RESUME QUEUE.
// - readQueue(): inside try/catch, `JSON.parse(localStorage.getItem(
//   QUEUE_KEY) ?? '[]')`; return `[]` on any error.
// - queueForResume(bundleId): build a `Set` from `readQueue()`, `.add(
//   bundleId)`, and save `[...that set]` with `writeQueue` (finished,
//   below) — a Set is only used here to avoid the same id appearing twice.
// - clearFromQueue(bundleId): `writeQueue(readQueue().filter((id) => id !==
//   bundleId))`.
// main.js calls all three around every download attempt.
export function queueForResume(bundleId) {}

export function readQueue() {
  return [];
}

function writeQueue(queue) {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch {
    // Storage switched off: nothing this project can queue for later.
  }
}

export function clearFromQueue(bundleId) {}
