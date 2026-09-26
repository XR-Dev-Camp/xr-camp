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

// TODO 11: FEATURE-DETECT AND REGISTER.
// - supportsBackgroundSync(): return true only if `'serviceWorker' in
//   navigator && 'SyncManager' in window` — MDN's recommended way to check
//   for the API itself (this does not guarantee a specific registration
//   will succeed, which is why the next function still uses try/catch).
// - registerResume(): if `!supportsBackgroundSync()`, return false.
//   Otherwise, `const registration = await navigator.serviceWorker.ready`;
//   if `!registration.sync`, return false (defensive: SyncManager can exist
//   without every registration exposing `.sync`). Otherwise, inside
//   try/catch, `await registration.sync.register('resume-downloads')` and
//   return true; return false in the catch (for example, permission
//   denied — the online-event fallback below still applies).
export function supportsBackgroundSync() {
  return false;
}

export async function registerResume() {
  return false;
}

// TODO 12: WATCH FOR THE SIGNAL TO RESUME.
// Call `onResume` when it is time to try any queued downloads again.
// - If supportsBackgroundSync(): listen on
//   `navigator.serviceWorker.addEventListener('message', ...)`, and call
//   `onResume()` when `event.data?.type === 'RESUME_DOWNLOADS'` (sw.js's
//   'sync' handler sends this to every open page).
// - Always also `window.addEventListener('online', onResume)`, even where
//   Background Sync exists: it costs nothing, and it is the only signal at
//   all while this page has no active service worker registration yet (for
//   example, its first visit).
export function watchForResume(onResume) {}
