// bundles-ui.js: builds one bundle's card and updates it as its download
// state changes. No fetch, storage, or service-worker code lives here —
// only DOM: main.js decides what happened, this file only shows it.

import { formatBytes } from './manifest-loader.js';

// Finished: builds the (mostly static) card once per bundle. Its progress
// bar, status text, and which buttons are visible are filled in afterwards
// by updateBundleCard() (TODO 13, below), and again every time the
// download's state changes.
export function renderBundleCard(bundle, manifest) {
  const li = document.createElement('li');
  li.dataset.bundleId = bundle.id;

  const heading = document.createElement('strong');
  heading.textContent = bundle.title;

  const size = document.createElement('p');
  size.className = 'hint';
  size.textContent = `${manifest.files.length} file${manifest.files.length === 1 ? '' : 's'}, ${formatBytes(manifest.files.reduce((sum, f) => sum + f.bytes, 0))} total.`;

  const status = document.createElement('p');
  status.className = 'bundle-status';
  status.setAttribute('role', 'status');

  const progress = document.createElement('progress');
  progress.max = 100;
  progress.value = 0;
  progress.hidden = true;
  progress.setAttribute('aria-label', `Download progress: ${bundle.title}`);

  const actions = document.createElement('p');
  actions.className = 'actions';

  const downloadButton = document.createElement('button');
  downloadButton.type = 'button';
  downloadButton.dataset.action = 'download';
  downloadButton.textContent = `Download for offline: ${bundle.title}`;

  const cancelButton = document.createElement('button');
  cancelButton.type = 'button';
  cancelButton.dataset.action = 'cancel';
  cancelButton.textContent = `Cancel download: ${bundle.title}`;
  cancelButton.hidden = true;

  const openLink = document.createElement('a');
  openLink.dataset.action = 'open';
  openLink.href = bundle.sceneUrl;
  openLink.textContent = `Open scene: ${bundle.title}`;
  openLink.hidden = true;

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.dataset.action = 'delete';
  deleteButton.textContent = `Delete bundle: ${bundle.title}`;
  deleteButton.hidden = true;

  actions.append(downloadButton, cancelButton, openLink, deleteButton);
  li.append(heading, size, status, progress, actions);
  return li;
}

// TODO 13: SHOW THE CURRENT STATE.
// `state.status` is one of 'idle', 'downloading', 'downloaded', or 'error'.
// Read each element back out with `li.querySelector(...)`: `.bundle-status`,
// `progress`, `[data-action="download"]`, `[data-action="cancel"]`,
// `[data-action="open"]`, `[data-action="delete"]`.
// - `downloadButton.hidden` when status is 'downloading' or 'downloaded'.
// - `cancelButton.hidden` unless status is 'downloading'.
// - `openLink.hidden` and `deleteButton.hidden` unless status is
//   'downloaded'.
// - `progress.hidden` unless status is 'downloading'.
// - While 'downloading': compute `percent = state.totalBytes ?
//   Math.round((state.loadedBytes / state.totalBytes) * 100) : 0`, set
//   `progress.value = percent`, and write a status line with the percent
//   and both byte counts (formatBytes is imported above).
// - While 'downloaded': a short "Downloaded. Available offline." line.
// - While 'error': if `state.queued` is true, say it is paused and will
//   resume automatically; otherwise say it could not finish. Either way,
//   include `state.errorMessage`.
// - Otherwise ('idle'): "Not downloaded yet."
export function updateBundleCard(li, state) {}
