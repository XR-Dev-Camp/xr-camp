// manifest-loader.js: fetches the bundle catalogue (data/bundles.json) and
// one bundle's own manifest (data/bundles/<id>.manifest.json). Both are
// small, same-origin JSON files served by this project itself, so they are
// always fetched from here directly — only the bundle's own listed files
// (the models) go through mirror.js's configurable base URL.

const CATALOG_URL = 'data/bundles.json';

// TODO 2: LOAD THE CATALOGUE AND A BUNDLE'S MANIFEST.
// - fetchCatalog(): await fetch(CATALOG_URL). If !response.ok, throw a new
//   Error naming the status code. Otherwise, await response.json() and
//   return its `.bundles` array.
// - fetchBundleManifest(manifestUrl): the same shape, fetching
//   `manifestUrl` instead, returning the parsed JSON object directly (not
//   `.bundles` — a bundle manifest is one object, not a list).
// Make both functions async. main.js's loadBundles() already calls both.
export async function fetchCatalog() {
  return [];
}

export async function fetchBundleManifest(manifestUrl) {
  return { files: [] };
}

export function totalBytes(manifest) {
  return manifest.files.reduce((sum, file) => sum + file.bytes, 0);
}

// A small, shared way to show a byte count as something a person can read.
// Kept here, not duplicated in every UI file, so "1.2 MB" always means the
// same thing everywhere on this page.
export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB'];
  let value = bytes / 1024;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  return `${value.toFixed(1)} ${units[unitIndex]}`;
}
