// pwa.js: registering the service worker, offering updates, and offering
// installation. Copied from Course 2.6, with every sentence moved to the
// locale files. Each message also keeps its key in data-i18n, so if the
// learner changes language while it is showing, translatePage() updates it.

import { t } from '../i18n.js';

function say(element, key) {
  element.dataset.i18n = key;
  element.textContent = t(key);
}

// Register the service worker. onUpdateReady(worker) is called when a new
// version has installed and is waiting.
export async function registerServiceWorker({ onUpdateReady = () => {} } = {}) {
  if (!('serviceWorker' in navigator)) return null;   // older browser, or not a secure context

  let registration;
  try {
    registration = await navigator.serviceWorker.register('sw.js');
  } catch {
    return null;   // for example, private browsing in some browsers: carry on without it
  }

  // Only an update waits. On the first visit there is no controller yet.
  const hasOldVersion = () => Boolean(navigator.serviceWorker.controller);
  if (registration.waiting && hasOldVersion()) onUpdateReady(registration.waiting);
  registration.addEventListener('updatefound', () => {
    const worker = registration.installing;
    worker?.addEventListener('statechange', () => {
      if (worker.state === 'installed' && hasOldVersion()) onUpdateReady(worker);
    });
  });
  return registration;
}

// Ask the waiting worker to take over, then reload once it has. Only
// because the learner pressed Reload: never by surprise.
export function applyUpdate(worker) {
  navigator.serviceWorker.addEventListener('controllerchange', () => location.reload(), { once: true });
  worker.postMessage({ type: 'SKIP_WAITING' });
}

// "A new version is ready", in a role="status" element that is always on the
// page, with a real Reload button.
export function showUpdateBanner(worker, { message, button }) {
  say(message, 'update.ready');
  button.hidden = false;
  button.addEventListener('click', () => {
    button.disabled = true;
    say(message, 'update.updating');
    applyUpdate(worker);
  }, { once: true });
}

export function isInstalled() {
  return window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
}

// beforeinstallprompt only exists in Chromium browsers. Everywhere else, the
// written steps on the page are the way to install.
export function offerInstall({ button, status }) {
  let deferred = null;

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferred = event;
    button.hidden = false;
  });

  button.addEventListener('click', async () => {
    if (!deferred) return;
    deferred.prompt();
    const { outcome } = await deferred.userChoice;
    deferred = null;
    button.hidden = true;
    if (outcome === 'dismissed') say(status, 'install.dismissed');
  });

  window.addEventListener('appinstalled', () => {
    button.hidden = true;
    say(status, 'install.done');
  });
}
