// bundles-ui.js: builds one bundle's card and updates it as its download
// state changes. No fetch, storage, or service-worker code lives here —
// only DOM: main.js decides what happened, this file only shows it.

import { formatBytes } from './manifest-loader.js';

// Builds the (mostly static) card once per bundle. Its progress bar,
// status text, and which buttons are visible are filled in afterwards by
// updateBundleCard(), and again every time the download's state changes —
// so main.js never has to rebuild the whole list just to move a number.
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

// Updates one already-rendered card's dynamic parts. `state.status` is one
// of 'idle', 'downloading', 'downloaded', or 'error'.
export function updateBundleCard(li, state) {
  const status = li.querySelector('.bundle-status');
  const progress = li.querySelector('progress');
  const downloadButton = li.querySelector('[data-action="download"]');
  const cancelButton = li.querySelector('[data-action="cancel"]');
  const openLink = li.querySelector('[data-action="open"]');
  const deleteButton = li.querySelector('[data-action="delete"]');

  downloadButton.hidden = state.status === 'downloading' || state.status === 'downloaded';
  cancelButton.hidden = state.status !== 'downloading';
  openLink.hidden = state.status !== 'downloaded';
  deleteButton.hidden = state.status !== 'downloaded';
  progress.hidden = state.status !== 'downloading';

  if (state.status === 'downloading') {
    const percent = state.totalBytes ? Math.round((state.loadedBytes / state.totalBytes) * 100) : 0;
    progress.value = percent;
    status.textContent = `Downloading: ${percent}% (${formatBytes(state.loadedBytes)} of ${formatBytes(state.totalBytes)}).`;
  } else if (state.status === 'downloaded') {
    status.textContent = 'Downloaded. Available offline.';
  } else if (state.status === 'error') {
    status.textContent = state.queued
      ? `Paused: ${state.errorMessage} It will resume automatically once the connection is back.`
      : `Could not finish downloading: ${state.errorMessage}`;
  } else {
    status.textContent = 'Not downloaded yet.';
  }
}
