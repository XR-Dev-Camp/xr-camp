# 3D assets and library versions

Two rules keep lessons working for every learner, for years: **pin every library version**, and **keep every asset small**. `scripts/validate-projects.mjs` enforces both in CI.

## Pinned library versions

[`versions.json`](../../versions.json) lists the one version of each 3D library that every lesson must load:

| Library | Pinned version | Load it from |
| --- | --- | --- |
| A-Frame | 1.8.0 | `https://aframe.io/releases/1.8.0/aframe.min.js` |
| three.js | 0.186.1 | `https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.module.min.js` |
| X3DOM | 1.8.3 | `https://www.x3dom.org/download/1.8.3/x3dom.js` and `x3dom.css` |

CI fails any `.html` file that loads a pinned library with `@latest`, with a different version, or with no version at all.

**three.js needs two lines in its import map.** `three.module.min.js` imports `./three.core.js`, which on jsDelivr is the unminified file (about 1.46 MB). Map it to the minified copy, so a page downloads about 0.8 MB instead of 1.85 MB:

```html
<script type="importmap">
  {
    "imports": {
      "three": "https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.module.min.js",
      "https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.core.js": "https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.core.min.js",
      "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.186.1/examples/jsm/"
    }
  }
</script>
```

**Why:** three.js makes breaking changes in most releases. A lesson that loads "latest" works on the day it is written and breaks months later, and a beginner cannot tell whether the bug is theirs or ours. Nothing makes a new learner quit faster.

**Upgrading** is a deliberate change made in one pull request: update `versions.json`, update every lesson that uses the library, and re-test each one against its `tests/checklist.md`.

## Asset budgets

Many XR Camp learners are on phones, slow connections, or metered data where every megabyte costs money.

| Kind | Extensions | Per-file limit |
| --- | --- | --- |
| 3D model | `.glb` `.gltf` `.bin` `.x3d` `.x3dv` | 5 MB |
| Image or texture | `.jpg` `.jpeg` `.png` `.webp` `.avif` `.ktx2` `.gif` | 1 MB |
| Audio | `.mp3` `.ogg` `.m4a` `.wav` `.flac` | 2 MB |
| Video | `.mp4` `.webm` | 10 MB |
| **Whole project folder** | everything | **20 MB** |

These are ceilings, not targets. Most lesson models should be well under 1 MB.

### How to get there

- **Models:** export as binary glTF (`.glb`). Compress geometry with Draco or Meshopt, for example with [gltf-transform](https://gltf-transform.dev/): `gltf-transform optimize in.glb out.glb`.
- **Textures:** 1024 × 1024 is enough for almost everything in a lesson. Use WebP, AVIF, or KTX2 (Basis Universal) rather than PNG.
- **Audio:** use compressed formats (`.ogg` or `.mp3`), never `.wav`, and trim silence.
- **Record the source** of every third-party asset in the project's `ATTRIBUTION.md`, with its license.

## Offline and mainland China

Lessons load every library from its pinned CDN URL by default — that copy is fast and already cached in most learners' browsers. But every pinned file is also vendored, byte-for-byte, under [`/vendor`](../../vendor/README.md), so a lesson keeps working with no network at all, or where a CDN listed above is unreachable (for example, some networks in mainland China block `aframe.io`, `cdn.jsdelivr.net`, or `x3dom.org`).

### Switching a lesson to the vendored copy

Point the page at the vendored file instead of the CDN URL, using the relative path from the lesson page to `/vendor` (typically `../../vendor/...` from a `starter/` or `completed/` folder at a course's normal nesting depth — count the `../` segments for the specific file's actual location).

**A-Frame** (`<script>` tag):

```html
<!-- CDN (default): -->
<script src="https://aframe.io/releases/1.8.0/aframe.min.js"></script>
<!-- Offline / blocked CDN: -->
<script src="../../vendor/aframe/1.8.0/aframe.min.js"></script>
```

**X3DOM** (`<link>` + `<script>`):

```html
<link rel="stylesheet" href="../../vendor/x3dom/1.8.3/x3dom.css">
<script src="../../vendor/x3dom/1.8.3/x3dom.js"></script>
```

**three.js** (import map): replace every `https://cdn.jsdelivr.net/npm/three@0.186.1/...` value with the matching vendored path, keeping the same keys:

```html
<script type="importmap">
  {
    "imports": {
      "three": "../../vendor/three/0.186.1/build/three.module.min.js",
      "../../vendor/three/0.186.1/build/three.core.js": "../../vendor/three/0.186.1/build/three.core.min.js",
      "three/addons/": "../../vendor/three/0.186.1/examples/jsm/"
    }
  }
</script>
```

Only the addon files a lesson actually imports are vendored (see `vendor/README.md` for the full list and their sha256 sums) — `three/addons/` resolves correctly for any of them because the vendored tree mirrors the CDN's `examples/jsm/` layout exactly.

### Alternative public mirrors

If switching to the vendored copy isn't possible (for example, a static host that can't add files), the same pinned files are also reachable through other public CDNs. Treat this list cautiously: availability from mainland China varies by network and over time, and none of these are guaranteed uptime for this programme — the vendored copy in `/vendor` is the only mirror this repository controls. Checked with `curl` on 2026-09-26:

| Mirror | Works for | Notes |
| --- | --- | --- |
| `https://fastly.jsdelivr.net/npm/...` | Everything jsDelivr serves (A-Frame, three.js incl. the minified `three.module.min.js`/`three.core.min.js`, X3DOM) | Same jsDelivr content, alternate edge domain — swap `cdn.jsdelivr.net` for `fastly.jsdelivr.net` in any URL above. Confirmed reachable with `curl` for all three libraries. |
| `https://gcore.jsdelivr.net/npm/...` | Same as above | Another jsDelivr edge domain; same substitution. Confirmed reachable. |
| `https://cdn.jsdelivr.net/npm/x3dom@1.8.3/x3dom.js` and `.../x3dom.css` | X3DOM | jsDelivr also mirrors X3DOM's npm package, as an alternative to `x3dom.org` itself. Confirmed byte-identical (same sha256) to the `x3dom.org` copy vendored here. |
| `https://unpkg.com/aframe@1.8.0/dist/aframe-master.min.js` | A-Frame | Confirmed reachable. |
| `https://unpkg.com/three@0.186.1/examples/jsm/...` | three.js addons (unminified — that's all unpkg has) | Confirmed reachable for `OrbitControls.js` and `GLTFLoader.js`. |
| `https://unpkg.com/three@0.186.1/build/three.module.js` | three.js core, **unminified only** | `three.module.min.js` and `three.core.min.js` are generated by jsDelivr on request and are not published to the npm package itself, so unpkg (which only serves a package's own files) 404s on the minified build files — confirmed. Using unpkg for three.js core means loading the ~1.46 MB unminified `three.module.js`/`three.core.js` and updating the import map's keys to match (no `.min` in the URL), not a drop-in swap for the pinned jsDelivr URLs. |
| `https://registry.npmmirror.com/<pkg>/-/<pkg>-<version>.tgz` (npmmirror, mainland-China-oriented) | Downloading the whole npm package as a tarball | Confirmed reachable for both `three` and `aframe` tarballs. npmmirror's per-file "files" endpoint (e.g. `.../files/build/...`) returned 403/404 for the files tried here, so treat npmmirror as "download and extract the package," not "swap in a direct file URL." |
| `https://cdnjs.cloudflare.com/ajax/libs/...` | Nothing here | Checked: cdnjs does not carry A-Frame or X3DOM at these paths (404). Not usable for this repository's pinned files. |

When in doubt, prefer the vendored copy in `/vendor` — it needs no network judgement call at all, is exactly what `scripts/validate-projects.mjs` checks against, and cannot disappear from a third party's CDN.
