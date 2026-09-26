// background-sync.js: resuming a download after the connection comes back,
// even if this page was not the one to notice.
//
// The Background Sync API lets a service worker register to be woken up
// once the browser judges the connection is back, and keep working even if
// every tab of this app has since been closed. As of MDN's browser-support
// table, it ships only in Chromium-based browsers (Chrome, Edge, Opera,
// Samsung Internet); Firefox and Safari do not implement it. This module
// always feature-detects, and falls back to the page's own `online` event —
// which fires in every browser, but only while a tab of this app is open.
//
// window.SyncManager existing is the recommended way to check for the API
// itself (per MDN); it does not guarantee a specific registration will
// succeed, which is why registerResume() below still wraps the call in
// try/catch.

export function supportsBackgroundSync() {
  return 'serviceWorker' in navigator && 'SyncManager' in window;
}

// Asks the active service worker to fire a 'sync' event, tagged
// 'resume-downloads', the next time the browser decides the connection is
// usable. sw.js's own 'sync' listener then tells every open page to resume
// (see watchForResume below) — this project keeps the actual download code
// in the page, not the service worker, since that is where OPFS access and
// the download's progress UI already live.
export async function registerResume() {
  if (!supportsBackgroundSync()) return false;
  const registration = await navigator.serviceWorker.ready;
  if (!registration.sync) return false; // defensive: SyncManager can exist without every registration exposing .sync
  try {
    await registration.sync.register('resume-downloads');
    return true;
  } catch {
    return false; // for example, permission denied — the online-event fallback still applies below
  }
}

// Calls `onResume` when it is time to try any queued downloads again.
// Wires whichever mechanism this browser actually has; a caller never needs
// to know which one fired.
export function watchForResume(onResume) {
  if (supportsBackgroundSync()) {
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data?.type === 'RESUME_DOWNLOADS') onResume();
    });
  }
  // Always also listen for `online`, even where Background Sync exists: it
  // costs nothing, and it is the only signal at all while this page has no
  // active service worker registration yet (for example, its first visit).
  window.addEventListener('online', onResume);
}
