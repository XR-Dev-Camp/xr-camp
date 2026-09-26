// storage-panel.js: tells a learner how much of their device's storage this
// project is using, and lets them ask the browser to keep it. Both APIs
// live on the StorageManager interface, at navigator.storage.

// TODO 6: READ THE STORAGE ESTIMATE.
// navigator.storage.estimate() is supported in every current browser (per
// MDN), but is still worth a feature check: a very old browser, or a page
// not running in a secure context (https:// or localhost), will not have
// it. If `!navigator.storage?.estimate`, return null. Otherwise, `const {
// usage = 0, quota = 0 } = await navigator.storage.estimate()` (both are in
// bytes; `usage` covers everything this origin has stored anywhere — OPFS,
// the Cache API, and localStorage together), and return `{ usage, quota }`.
// Make the function async. main.js's renderStoragePanel() already handles a
// null result.
export async function readStorageEstimate() {
  return null;
}

// TODO 7: REQUEST PERSISTENT STORAGE.
// navigator.storage.persist() asks the browser not to auto-evict this
// origin's storage under disk pressure (the default, "best effort" mode,
// can be cleared without warning). If `!navigator.storage?.persist`, return
// `{ supported: false, granted: false }`. Otherwise, `const granted = await
// navigator.storage.persist()` and return `{ supported: true, granted }`.
// The browser decides whether to grant it — often based on signals like the
// page being installed or bookmarked — and there is no dialog to point at;
// a learner can only see the result. Support: broad in Chromium and
// Firefox; Safari does not implement the Storage API's persistence request
// as of the current MDN browser-support table.
export async function requestPersistence() {
  return { supported: false, granted: false };
}

export async function isPersisted() {
  if (!navigator.storage?.persisted) return false;
  return navigator.storage.persisted();
}
