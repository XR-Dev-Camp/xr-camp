// download-manager.js: downloads one scene bundle's files, in order, with
// combined progress across all of them and a real Cancel button. Finished
// files are handed to bundle-store.js to save; a file that is already saved
// (because an earlier attempt got partway through, or because a person
// clicked Download again) is skipped, which is what makes "resume after
// losing the connection" (see background-sync.js) just a second call to
// this same function.

import { resolveAssetUrl } from './mirror.js';
import { readFileUrl, saveFile, markDownloaded } from './bundle-store.js';

// Reads a fetch Response's body with a reader, instead of response.blob(),
// so onProgress can report real bytes-so-far while a big model is still
// arriving — a plain .blob() call gives no progress at all until the whole
// file is already in memory.
async function readWithProgress(response, onBytes) {
  const total = Number(response.headers.get('Content-Length')) || 0;
  const reader = response.body.getReader();
  const chunks = [];
  let loaded = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    loaded += value.byteLength;
    onBytes(loaded, total);
  }
  return new Blob(chunks);
}

// Downloads every file in `manifest.files` that is not already saved for
// this bundle. `onProgress({ loadedBytes, totalBytes, path })` is called
// throughout; `signal` is an AbortController's signal, so Cancel (or a page
// unload) can stop a fetch mid-file, not just between files.
//
// Throws the fetch's own AbortError when `signal` was the cause (a
// deliberate Cancel); a caller distinguishes that from a network failure by
// checking `error.name === 'AbortError'`.
export async function downloadBundle(bundleId, manifest, { onProgress, signal } = {}) {
  const already = await Promise.all(manifest.files.map((file) => readFileUrl(bundleId, file.path)));
  const totalBytes = manifest.files.reduce((sum, file) => sum + file.bytes, 0);
  let doneBytes = already.reduce((sum, url, index) => sum + (url ? manifest.files[index].bytes : 0), 0);

  for (const [index, file] of manifest.files.entries()) {
    if (already[index]) continue; // already saved from an earlier attempt

    const url = resolveAssetUrl(file.path);
    const response = await fetch(url, { signal });
    if (!response.ok) throw new Error(`${file.path}: server answered ${response.status}`);

    const startBytes = doneBytes;
    const blob = await readWithProgress(response, (loaded) => {
      onProgress?.({ loadedBytes: startBytes + loaded, totalBytes, path: file.path });
    });
    await saveFile(bundleId, file.path, blob);
    doneBytes = startBytes + file.bytes;
    onProgress?.({ loadedBytes: doneBytes, totalBytes, path: file.path });
  }

  markDownloaded(bundleId, manifest.files.length);
}

// --- The resume queue --------------------------------------------------------
// A small localStorage list of bundle ids whose download did not finish
// because the network went away mid-file (not because someone clicked
// Cancel). background-sync.js reads and clears this list once the
// connection is back, whether that "once back" is signalled by a real
// Background Sync event or, on a browser without that API, the window's
// own `online` event.

const QUEUE_KEY = 'xrcamp-scene-bundles:pending-downloads';

export function queueForResume(bundleId) {
  const queue = new Set(readQueue());
  queue.add(bundleId);
  writeQueue([...queue]);
}

export function readQueue() {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function writeQueue(queue) {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch {
    // Storage switched off: nothing this project can queue for later.
  }
}

export function clearFromQueue(bundleId) {
  writeQueue(readQueue().filter((id) => id !== bundleId));
}
