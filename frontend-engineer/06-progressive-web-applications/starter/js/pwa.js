// pwa.js: everything that makes the dashboard an app: registering the
// service worker, offering updates, and offering installation.
// Every feature is checked before it is used, so in a browser without it the
// dashboard still works exactly as it did in Course 2.4.

// TODO 3: REGISTER THE SERVICE WORKER. Make this function async.
// - If !('serviceWorker' in navigator), return null: an older browser, or a
//   page that is not a secure context (https, localhost, or 127.0.0.1).
// - Otherwise: registration = await navigator.serviceWorker.register('sw.js'),
//   inside try/catch (return null in catch), and return registration.
// Reload, then open DevTools > Application > Service workers.
//
// TODO 12: NOTICE A WAITING UPDATE. Before returning, call
// onUpdateReady(worker) in two cases, but only when
// navigator.serviceWorker.controller exists (a first visit has nothing to
// update):
//   1. registration.waiting is already set (from an earlier visit).
//   2. registration fires 'updatefound': take registration.installing,
//      listen for its 'statechange', and when its state is 'installed'.
export function registerServiceWorker({ onUpdateReady = () => {} } = {}) {
  return null;
}

// TODO 12, continued: write applyUpdate(worker). Listen once for
// navigator.serviceWorker's 'controllerchange' and call location.reload()
// then; and send the worker worker.postMessage({ type: 'SKIP_WAITING' }).
export function applyUpdate(worker) {}

// TODO 12, continued: showUpdateBanner(worker, { message, button }) writes
// "A new version of this app is ready." into message (a role="status"
// element already on the page), shows the button, and on click disables it,
// writes "Updating…", and calls applyUpdate(worker).
export function showUpdateBanner(worker, { message, button }) {}

// Finished: true when the page is running as an installed app, in its own
// window. navigator.standalone is Safari's older, non-standard version.
export function isInstalled() {
  return window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
}

// TODO 13: OFFER INSTALLATION WHERE THE BROWSER ALLOWS IT.
// beforeinstallprompt only exists in Chromium browsers. Listen for it on
// window: call event.preventDefault(), keep the event in a variable, and show
// the button. On click: event.prompt(), then
// const { outcome } = await event.userChoice; forget the event (it works
// once), hide the button, and if outcome is 'dismissed', say so in status.
// Also listen for window's 'appinstalled': hide the button, and write
// "Installed." and where to find the app into status.
export function offerInstall({ button, status }) {}
