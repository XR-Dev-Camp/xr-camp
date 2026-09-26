// scene-main.js: wires scene.html. Reads which bundle to show from the
// page's own URL (?bundle=history-exhibit), then loads each model through
// resolveModelUrl() — offline-downloaded file first, network second — so
// this exact page works identically whether or not you are connected,
// once its bundle has been downloaded at least once.

import { createApp } from './scene-app.js';
import { createManager } from './scene-loader.js';
import { loadModels, ITEMS } from './scene-exhibit.js';
import { describeExhibit } from './scene-describe.js';
import { readFileUrl, isDownloaded } from './bundle-store.js';
import { resolveAssetUrl } from './mirror.js';

const $ = (id) => document.getElementById(id);
const container = $('canvas-box');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

const bundleId = new URLSearchParams(location.search).get('bundle') ?? 'history-exhibit';
const downloaded = isDownloaded(bundleId);

$('bundle-status').textContent = downloaded
  ? `Showing the offline-downloaded copy of "${bundleId}".`
  : `This bundle is not downloaded yet — loading its models over the network instead. `;
if (!downloaded) {
  const link = document.createElement('a');
  link.href = 'index.html';
  link.textContent = 'Download it for offline use.';
  $('bundle-status').append(link);
}

// TODO 18: OFFLINE FIRST, NETWORK SECOND.
// This is the one place this whole lesson's offline behaviour actually
// comes together: try the offline-saved copy of `path` first
// (`await readFileUrl(bundleId, path)`, imported above from
// bundle-store.js); if that returns a real `blob:` URL, return it. If it
// returns null (never downloaded, or this file did not save), fall back to
// `resolveAssetUrl(path)` (from mirror.js), which honours the configured
// asset base URL — so a regional mirror is used here too, exactly as it is
// for a fresh download.
async function resolveModelUrl(path) {
  return resolveAssetUrl(path);
}

function supportsWebGL2() {
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
}

function renderItemList(items) {
  const list = $('exhibit-list');
  list.replaceChildren(...ITEMS.map((data) => {
    const item = items?.find((i) => i.data.id === data.id);
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = data.name;
    let text = ` — ${data.note}`;
    if (data.kind === 'model' && item) {
      const label = item.status === 'loading' ? 'loading…' : item.status === 'error' ? `failed to load (${item.error})` : 'loaded';
      text = ` — ${label}. ${data.note}`;
    }
    li.append(strong, document.createTextNode(text));
    return li;
  }));
}
renderItemList();

function renderAttribution() {
  const list = $('attribution-list');
  list.replaceChildren(...ITEMS.filter((data) => data.kind === 'model').map((data) => {
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = data.name;
    const credit = document.createElement('p');
    credit.textContent = data.credit;
    const license = document.createElement('p');
    const link = document.createElement('a');
    link.href = data.licenseUrl;
    link.textContent = data.licenseLabel;
    license.append('Licence: ', link);
    li.append(strong, credit, license);
    return li;
  }));
}
renderAttribution();

if (!supportsWebGL2()) {
  $('canvas-box').hidden = true;
  $('no-webgl-message').hidden = false;
  $('scene-description').textContent = 'This browser cannot show the 3D scene: WebGL 2 is unavailable. The list above has the same information.';
} else {
  const loadingBar = $('loading-bar');
  const loadingStatus = $('loading-status');

  function onProgress({ loaded, total }) {
    if (!total) return;
    loadingBar.hidden = false;
    loadingBar.value = Math.round((loaded / total) * 100);
    loadingStatus.textContent = loaded < total ? `Loading models: ${Math.round((loaded / total) * 100)}%` : '';
    if (loaded >= total) loadingBar.hidden = true;
  }

  const app = createApp(container);

  function updateDescription() {
    $('scene-description').textContent = describeExhibit({
      items: app.items,
      animating: app.isAnimating(),
      offline: !navigator.onLine,
    });
  }

  app.resize();
  app.start();
  renderItemList(app.items);
  updateDescription();

  const manager = createManager({ onProgress, onError: () => {} });
  loadModels(app.exhibit, {
    manager,
    resolveUrl: resolveModelUrl,
    onItemReady: () => { renderItemList(app.items); updateDescription(); },
    onItemError: () => { renderItemList(app.items); updateDescription(); },
  });

  const pauseButton = $('pause-toggle');
  function setAnimating(on) {
    app.setAnimating(on);
    pauseButton.setAttribute('aria-pressed', String(!on));
    pauseButton.textContent = on ? 'Pause animation' : 'Resume animation';
    updateDescription();
  }
  setAnimating(!reducedMotion);
  pauseButton.addEventListener('click', () => setAnimating(!app.isAnimating()));

  $('turn-left').addEventListener('click', () => app.controls.rotateLeft(Math.PI / 8));
  $('turn-right').addEventListener('click', () => app.controls.rotateLeft(-Math.PI / 8));
  $('reset-view').addEventListener('click', () => { app.resetView(); updateDescription(); });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) app.stop(); else app.start();
  });

  window.addEventListener('online', updateDescription);
  window.addEventListener('offline', updateDescription);
}
