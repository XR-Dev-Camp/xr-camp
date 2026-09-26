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

// --- Service worker: the app shell only. Bundle files are managed directly
// by bundle-store.js (OPFS or the Cache API), not by sw.js's fetch handler —
// this page already needs OPFS access itself, so there is nothing left for
// a fetch-intercepting service worker to add for those files.
async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  try {
    await navigator.serviceWorker.register('sw.js');
  } catch {
    // For example, private browsing in some browsers: the page still works
    // online; it just will not work with the browser fully closed offline.
  }
}

// --- Storage panel -----------------------------------------------------------
async function renderStoragePanel() {
  const estimate = await readStorageEstimate();
  if (!estimate) {
    $('storage-text').textContent = 'This browser does not report storage estimates.';
  } else {
    const percent = estimate.quota ? Math.round((estimate.usage / estimate.quota) * 100) : 0;
    $('storage-text').textContent = `Using ${formatBytes(estimate.usage)} of about ${formatBytes(estimate.quota)} available (${percent}%). Files are saved in ${supportsOPFS() ? 'the Origin Private File System (OPFS)' : "this browser's Cache API (OPFS is not available here)"}.`;
  }
  const persisted = await isPersisted();
  if (persisted) $('persist-status').textContent = 'This storage is already protected from automatic clearing.';
}

$('persist-button').addEventListener('click', async () => {
  const { supported, granted } = await requestPersistence();
  $('persist-status').textContent = !supported
    ? 'This browser does not support requesting persistent storage.'
    : granted
      ? 'Granted: the browser will try not to clear this storage automatically.'
      : 'Not granted this time. The browser decides; installing this app to your home screen can improve the chance.';
});

// --- Mirror (asset base URL) settings -----------------------------------------
$('mirror-url-input').value = isDefaultAssetBaseUrl() ? '' : getAssetBaseUrl();

$('save-mirror-button').addEventListener('click', () => {
  setAssetBaseUrl($('mirror-url-input').value);
  announce(isDefaultAssetBaseUrl() ? 'Asset base URL reset to this site’s own files.' : `Asset base URL saved: ${getAssetBaseUrl()}`);
});
$('reset-mirror-button').addEventListener('click', () => {
  setAssetBaseUrl('');
  $('mirror-url-input').value = '';
  announce('Asset base URL reset to this site’s own files.');
});

// --- Low-data mode -------------------------------------------------------------
const lowDataToggle = $('low-data-toggle');
lowDataToggle.checked = lowDataPreferred();
lowDataToggle.addEventListener('change', () => setLowData(lowDataToggle.checked));

// --- Background Sync status text ----------------------------------------------
$('background-sync-status').textContent = supportsBackgroundSync()
  ? 'This browser supports Background Sync: a paused download can finish even if you close this tab before the connection returns.'
  : 'This browser does not support Background Sync (as of MDN’s current support table, only Chromium-based browsers do). A paused download will resume as soon as this page is open again and the connection returns.';

// --- The bundle list -----------------------------------------------------------
const bundlesEntries = new Map(); // bundleId -> { bundle, manifest, li, controller }

function cardState(bundleId, extra) {
  const entry = bundlesEntries.get(bundleId);
  updateBundleCard(entry.li, { status: isDownloaded(bundleId) ? 'downloaded' : 'idle', ...extra });
}

async function startDownload(bundleId) {
  const entry = bundlesEntries.get(bundleId);
  const { bundle, manifest } = entry;
  const totalBytes = manifest.files.reduce((sum, f) => sum + f.bytes, 0);

  if (lowDataPreferred() && totalBytes > LARGE_DOWNLOAD_BYTES) {
    const ok = window.confirm(`Low-data mode is on. "${bundle.title}" is ${formatBytes(totalBytes)}. Download it anyway?`);
    if (!ok) return;
  }

  entry.controller = new AbortController();
  updateBundleCard(entry.li, { status: 'downloading', loadedBytes: 0, totalBytes });
  announce(`Downloading ${bundle.title}…`);

  try {
    await downloadBundle(bundleId, manifest, {
      signal: entry.controller.signal,
      onProgress: ({ loadedBytes }) => updateBundleCard(entry.li, { status: 'downloading', loadedBytes, totalBytes }),
    });
    clearFromQueue(bundleId);
    updateBundleCard(entry.li, { status: 'downloaded' });
    announce(`${bundle.title} is downloaded and available offline.`);
    renderStoragePanel(); // usage just grew — reflect it immediately, not only on next page load
  } catch (error) {
    if (error.name === 'AbortError') {
      updateBundleCard(entry.li, { status: 'idle' });
      announce(`Download cancelled: ${bundle.title}.`);
      return;
    }
    queueForResume(bundleId);
    await registerResume();
    updateBundleCard(entry.li, { status: 'error', errorMessage: error.message, queued: true });
    announce(`${bundle.title} paused: ${error.message}`);
  }
}

async function resumeQueuedDownloads() {
  for (const bundleId of readQueue()) {
    if (bundlesEntries.has(bundleId)) startDownload(bundleId);
  }
}
watchForResume(resumeQueuedDownloads);

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
