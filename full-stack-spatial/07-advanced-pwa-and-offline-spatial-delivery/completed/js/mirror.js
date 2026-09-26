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

export function getAssetBaseUrl() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved) return saved;
  } catch {
    // Storage switched off: fall back to the default below.
  }
  return DEFAULT_BASE;
}

// A base URL always ends in "/", so joining it with a bare file name never
// produces a missing or doubled slash. An empty or whitespace-only value
// clears the setting and returns to the built-in default.
export function setAssetBaseUrl(url) {
  const trimmed = url.trim();
  try {
    if (!trimmed) localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, trimmed.endsWith('/') ? trimmed : `${trimmed}/`);
  } catch {
    // Storage switched off: the choice lasts until the page closes, held
    // only in whatever variable called this — nothing more to do here.
  }
}

export function isDefaultAssetBaseUrl() {
  return getAssetBaseUrl() === DEFAULT_BASE;
}

// Resolves one file's relative path (as written in a bundle manifest, e.g.
// "Fox.glb") against the current asset base URL. A mirror is a different
// origin, so its server must send CORS headers (Access-Control-Allow-Origin)
// for fetch() to read the response — the same rule Course 5.1 covered for
// any cross-origin API. Without CORS, the request still reaches the mirror,
// but this code cannot read the answer, and download.js reports it as a
// failed file rather than guessing why.
export function resolveAssetUrl(path) {
  return new URL(path, new URL(getAssetBaseUrl(), document.baseURI)).href;
}
