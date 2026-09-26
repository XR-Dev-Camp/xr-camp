# Third-Party Notices

Third-party software distributed with, or loaded by, projects in this repository, together with the notices their licenses require.

## Status

Three libraries are vendored under [`/vendor`](../vendor/README.md), mirroring the exact CDN files pinned in `versions.json`. Preface and Phase 1 projects otherwise intentionally use no libraries — learners write plain HTML, CSS, and JavaScript.

## Vendored libraries

| Library | Version | Introduced in | License | Purpose |
| --- | --- | --- | --- | --- |
| A-Frame | 1.8.0 | `web3d-developer/02-a-frame-foundations` | MIT | Declarative WebXR scenes |
| three.js | 0.186.1 | `web3d-developer/04-threejs-foundations` | MIT | Browser 3D graphics |
| X3DOM | 1.8.3 | `web3d-developer/01-web3d-fundamentals` | MIT (dual MIT/GPL-3.0 upstream; this repo uses the MIT terms) | Declarative X3D in HTML |

Full license texts are reproduced in each library's own `vendor/<library>/<version>/LICENSE` (or `LICENSE.md`) file. `vendor/README.md` lists every mirrored file with its sha256.

## Rules

1. **Lessons load the pinned CDN URL by default.** The CDN copy is fast and already cached in most learners' browsers, so lessons keep using `https://aframe.io/...`, `https://cdn.jsdelivr.net/npm/three@...`, and `https://www.x3dom.org/...` as their primary `<script>`/`<link>`/import-map source.
2. **Every pinned file is also vendored**, byte-for-byte, in `/vendor` with its license (see the table above and `vendor/README.md`). This is what keeps the programme's offline requirement true without giving up the speed of a CDN.
3. **For offline use, or where a CDN is blocked** (for example, mainland China — see the "Offline and mainland China" section of `docs/en/3d-assets-and-versions.md`), point the page's `<script src>`, `<link href>`, or import map at the vendored copy under `/vendor` instead of the CDN URL.
4. **Record the version.** "Latest" is not a version.
5. **Reproduce the license text**, not merely its name — most licenses require this.
6. **Prefer permissively licensed, actively maintained libraries** with a genuine accessibility story.
7. **Every dependency is a teaching decision.** A learner will ask why it is there. Be able to answer.
8. **`scripts/validate-projects.mjs` enforces #2**: for every pinned-library URL a lesson loads, the matching file must exist under `vendor/<library>/<version>/...`, or CI fails with the missing path.

## Format for each entry

```text
### <name> <version>
Source:  <url>
License: <SPDX identifier>
Used in: <project paths>
Why:     <one sentence: what it does and why nothing simpler suffices>

<full license text>
```
