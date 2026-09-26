// mirror.js: the configurable asset base URL. A school or community with
// slow or expensive links to the outside internet can host its own copy of
// this project's data/ and assets/ folders (a "regional mirror") on a local
// server or a nearby machine. Nothing else in this project needs to change:
// every bundle file path in a manifest is relative, and this module is the
// one place that turns a relative path into a real URL.

const KEY = 'xrcamp-scene-bundles:asset-base-url';

// With no mirror configured, bundle files are fetched from this project's
// own assets/ folder, one level up from completed/ or starter/ (the same
// place ../assets/Fox.glb already sits, from Course 3.5).
const DEFAULT_BASE = '../assets/';

// TODO 1: THE ASSET BASE URL.
// - getAssetBaseUrl(): inside try/catch, read localStorage.getItem(KEY). If
//   it is truthy, return it. Otherwise (or if storage throws), return
//   DEFAULT_BASE.
// - setAssetBaseUrl(url): trim the string. If the trimmed value is empty,
//   localStorage.removeItem(KEY) (this clears the setting, back to the
//   default). Otherwise localStorage.setItem(KEY, ...), making sure the
//   saved value ends with "/" (add one if it does not) — every call site
//   joins this with a bare file name, so a missing slash would merge two
//   path segments into one word. Wrap both branches in try/catch.
// - resolveAssetUrl(path): return `new URL(path, new URL(getAssetBaseUrl(),
//   document.baseURI)).href`. The inner `new URL` turns a possibly-relative
//   base into an absolute one first (URL's second argument must itself be
//   absolute, or a second relative URL); the outer one then joins `path`
//   onto it.
// main.js, download-manager.js, and scene-main.js already call all three.
export function getAssetBaseUrl() {
  return DEFAULT_BASE;
}

export function setAssetBaseUrl(url) {}

export function resolveAssetUrl(path) {
  return path;
}

export function isDefaultAssetBaseUrl() {
  return getAssetBaseUrl() === DEFAULT_BASE;
}
