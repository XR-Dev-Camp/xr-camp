// main.js: wires index.html's settings and bundle list to every other
// module. No storage, network, or service-worker API is called directly
// from here except the service worker's own registration — everything else
// goes through the small, single-purpose modules this lesson builds.

import { fetchCatalog, fetchBundleManifest, formatBytes } from './manifest-loader.js';
import { downloadBundle, queueForResume, clearFromQueue, readQueue } from './download-manager.js';
import { isDownloaded, deleteBundle, supportsOPFS } from './bundle-store.js';
import { readStorageEstimate, requestPersistence, isPersisted } from './storage-panel.js';
import { getAssetBaseUrl, setAssetBaseUrl, isDefaultAssetBaseUrl } from './mirror.js';
import { lowDataPreferred, setLowData, LARGE_DOWNLOAD_BYTES } from './low-data.js';
import { supportsBackgroundSync, registerResume, watchForResume } from './background-sync.js';
import { renderBundleCard, updateBundleCard } from './bundles-ui.js';

const $ = (id) => document.getElementById(id);
const statusEl = $('status');

function announce(text) {
  statusEl.textContent = text;
}

// Finished: the service worker's only job in this lesson is the app shell
// (see sw.js) — bundle files are managed directly by bundle-store.js.
async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  try {
    await navigator.serviceWorker.register('sw.js');
  } catch {
    // For example, private browsing in some browsers: the page still works
    // online; it just will not work with the browser fully closed offline.
  }
}

// TODO 15: THE STORAGE PANEL.
// - renderStoragePanel(): `const estimate = await readStorageEstimate()`.
//   If it is null, set `$('storage-text').textContent` to a line saying
//   this browser does not report storage estimates. Otherwise compute
//   `percent = estimate.quota ? Math.round((estimate.usage /
//   estimate.quota) * 100) : 0` and write a line using `formatBytes` for
//   both numbers, the percent, and `supportsOPFS()` to say which storage
//   system files are saved in. Then `const persisted = await
//   isPersisted()`; if true, add a note to `$('persist-status')` that this
//   storage is already protected.
// - The click handler below: call `requestPersistence()` and write its
//   result into `$('persist-status')` — handle "not supported", "granted",
//   and "not granted" as three different messages.
async function renderStoragePanel() {}

$('persist-button').addEventListener('click', async () => {});

// TODO 16: THE ASSET BASE URL (MIRROR) SETTINGS.
// - On load, set `$('mirror-url-input').value` to '' if
//   `isDefaultAssetBaseUrl()` is true, or to `getAssetBaseUrl()` otherwise
//   (so the field only shows a value when it differs from the default).
// - "Save asset base URL" button: call `setAssetBaseUrl($('mirror-url-
//   input').value)`, then `announce(...)` a confirmation naming the new
//   value (or that it was reset, if `isDefaultAssetBaseUrl()` is now true).
// - "Reset to default" button: `setAssetBaseUrl('')`, clear the input's
//   value, and announce the reset.
$('save-mirror-button').addEventListener('click', () => {});
$('reset-mirror-button').addEventListener('click', () => {});

// Finished: the learner's low-data choice, read on load and saved on change.
const lowDataToggle = $('low-data-toggle');
lowDataToggle.checked = lowDataPreferred();
lowDataToggle.addEventListener('change', () => setLowData(lowDataToggle.checked));

// Finished: Background Sync support, shown once on load.
$('background-sync-status').textContent = supportsBackgroundSync()
  ? 'This browser supports Background Sync: a paused download can finish even if you close this tab before the connection returns.'
  : 'This browser does not support Background Sync (as of MDN’s current support table, only Chromium-based browsers do). A paused download will resume as soon as this page is open again and the connection returns.';

// --- The bundle list -----------------------------------------------------------
const bundlesEntries = new Map(); // bundleId -> { bundle, manifest, li, controller }

function cardState(bundleId, extra) {
  const entry = bundlesEntries.get(bundleId);
  updateBundleCard(entry.li, { status: isDownloaded(bundleId) ? 'downloaded' : 'idle', ...extra });
}

// TODO 14: DOWNLOAD A BUNDLE, WITH LOW-DATA, PROGRESS, CANCEL, AND RESUME.
// - Look up `{ bundle, manifest }` from `bundlesEntries.get(bundleId)`, and
//   compute `totalBytes` by summing `manifest.files`' `bytes`.
// - If `lowDataPreferred()` is true and `totalBytes > LARGE_DOWNLOAD_BYTES`,
//   ask `window.confirm(...)` naming the bundle and its size (formatBytes);
//   if the learner cancels, return without downloading.
// - Create `entry.controller = new AbortController()`. Set the card to
//   'downloading' (0 bytes so far) with `updateBundleCard`, and `announce`
//   that the download started.
// - `try`: `await downloadBundle(bundleId, manifest, { signal:
//   entry.controller.signal, onProgress: ({ loadedBytes }) =>
//   updateBundleCard(entry.li, { status: 'downloading', loadedBytes,
//   totalBytes }) })`. On success: `clearFromQueue(bundleId)`, set the card
//   to 'downloaded', announce it is available offline, and call
//   `renderStoragePanel()` again so the usage number updates immediately.
// - `catch (error)`: if `error.name === 'AbortError'`, this was a
//   deliberate Cancel — set the card back to 'idle', announce the
//   cancellation, and return (do not queue it). Otherwise: `queueForResume(
//   bundleId)`, `await registerResume()` (asks Background Sync to wake this
//   up later, where supported), set the card to 'error' with
//   `errorMessage: error.message` and `queued: true`, and announce the
//   pause.
async function startDownload(bundleId) {}

async function resumeQueuedDownloads() {
  for (const bundleId of readQueue()) {
    if (bundlesEntries.has(bundleId)) startDownload(bundleId);
  }
}
watchForResume(resumeQueuedDownloads);

// Finished: loads the catalogue, then each bundle's own manifest, builds
// its card, and wires the three button actions plus the plain "Open scene"
// link (which needs no JavaScript at all).
async function loadBundles() {
  let catalog;
  try {
    catalog = await fetchCatalog();
  } catch (error) {
    announce(`Could not load the bundle list: ${error.message}`);
    return;
  }

  const list = $('bundles-list');
  for (const bundle of catalog) {
    let manifest;
    try {
      manifest = await fetchBundleManifest(bundle.manifestUrl);
    } catch (error) {
      announce(`Could not load "${bundle.title}": ${error.message}`);
      continue;
    }

    const li = renderBundleCard(bundle, manifest);
    list.append(li);
    bundlesEntries.set(bundle.id, { bundle, manifest, li, controller: null });
    cardState(bundle.id);

    li.addEventListener('click', (event) => {
      const action = event.target.closest('[data-action]')?.dataset.action;
      if (!action) return;
      if (action === 'download') startDownload(bundle.id);
      if (action === 'cancel') bundlesEntries.get(bundle.id).controller?.abort();
      if (action === 'delete') {
        if (!window.confirm(`Delete the downloaded files for "${bundle.title}"? You can download it again later.`)) return;
        deleteBundle(bundle.id).then(() => {
          updateBundleCard(li, { status: 'idle' });
          announce(`Deleted: ${bundle.title}.`);
          renderStoragePanel(); // usage just shrank — reflect it immediately
        });
      }
      // action === 'open' is a plain <a href>: no JavaScript needed to follow it.
    });
  }

  resumeQueuedDownloads();
}

registerServiceWorker();
renderStoragePanel();
loadBundles();
