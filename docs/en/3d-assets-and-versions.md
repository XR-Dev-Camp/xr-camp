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

## Hosting note

Lessons currently load libraries from public CDNs and are published on GitHub. Mirrors for regions where those services are unreliable (for example, mainland China) will be handled separately. Because every URL is pinned, a mirror only needs to host these exact files.
