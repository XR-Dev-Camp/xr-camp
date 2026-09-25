// pwa.js: everything that makes the dashboard an app: registering the
// service worker, offering updates, and offering installation.
// Every feature is checked before it is used, so in a browser without it the
// dashboard still works exactly as it did in Course 2.4.

// Register the service worker. onUpdateReady(worker) is called when a new
// version has installed and is waiting for the pages to let it take over.
export async function registerServiceWorker({ onUpdateReady = () => {} } = {}) {
  if (!('serviceWorker' in navigator)) return null;   // older browser, or not a secure context

  let registration;
  try {
    registration = await navigator.serviceWorker.register('sw.js');
  } catch {
    return null;   // for example, private browsing in some browsers: carry on without it
  }

  // Only an *update* waits. On the very first visit there is no controller
  // yet, and the new worker simply becomes active.
  const hasOldVersion = () => Boolean(navigator.serviceWorker.controller);

  // A new version may already be waiting from an earlier visit.
  if (registration.waiting && hasOldVersion()) onUpdateReady(registration.waiting);

  // Or one may arrive while this page is open.
  registration.addEventListener('updatefound', () => {
    const worker = registration.installing;
    worker?.addEventListener('statechange', () => {
      if (worker.state === 'installed' && hasOldVersion()) onUpdateReady(worker);
    });
  });

  return registration;
}

// Ask the waiting worker to take over, then reload once it has, so the page
// and the worker are the same version. The reload happens only because the
// learner pressed Reload: never by surprise.
export function applyUpdate(worker) {
  navigator.serviceWorker.addEventListener('controllerchange', () => location.reload(), { once: true });
  worker.postMessage({ type: 'SKIP_WAITING' });
}

// Show "A new version is ready" with a real Reload button. The message is
// written into a role="status" element that is always on the page, so screen
// readers announce it without moving anyone's focus.
export function showUpdateBanner(worker, { message, button }) {
  message.textContent = 'A new version of this app is ready.';
  button.hidden = false;
  button.addEventListener('click', () => {
    button.disabled = true;
    message.textContent = 'Updating…';
    applyUpdate(worker);
  }, { once: true });
}

// True when the page is running as an installed app, in its own window.
// navigator.standalone is Safari's older, non-standard version of the same idea.
export function isInstalled() {
  return window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
}

// beforeinstallprompt only exists in Chromium browsers (Chrome, Edge, Samsung
// Internet, and others). Everywhere else, the written instructions on the page
// are the way to install, so the button stays hidden.
export function offerInstall({ button, status }) {
  let deferred = null;

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();          // keep the browser's own mini-bar away; we offer a button
    deferred = event;
    button.hidden = false;
  });

  button.addEventListener('click', async () => {
    if (!deferred) return;
    deferred.prompt();
    const { outcome } = await deferred.userChoice;
    deferred = null;                 // each event can prompt only once
    button.hidden = true;
    if (outcome === 'dismissed') status.textContent = 'Not installed. You can install it later from the browser menu.';
  });

  window.addEventListener('appinstalled', () => {
    button.hidden = true;
    status.textContent = 'Installed. You can open Study-week weather from your home screen or app list.';
  });
}
