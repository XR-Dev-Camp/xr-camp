// manifest-loader.js: fetches the bundle catalogue (data/bundles.json) and
// one bundle's own manifest (data/bundles/<id>.manifest.json). Both are
// small, same-origin JSON files served by this project itself, so they are
// always fetched from here directly — only the bundle's own listed files
// (the models) go through mirror.js's configurable base URL.

const CATALOG_URL = 'data/bundles.json';

export async function fetchCatalog() {
  const response = await fetch(CATALOG_URL);
  if (!response.ok) throw new Error(`Could not load the bundle catalogue (${response.status}).`);
  const data = await response.json();
  return data.bundles;
}

export async function fetchBundleManifest(manifestUrl) {
  const response = await fetch(manifestUrl);
  if (!response.ok) throw new Error(`Could not load this bundle's manifest (${response.status}).`);
  return response.json();
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
