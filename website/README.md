# xrcamp.dev

The XR Camp website: one page in three languages, with a 3D world behind it
that you can scroll through, and step into with a VR or AR headset.

Everything here is something XR Camp teaches: HTML, CSS, JavaScript, A-Frame,
and WebXR. No framework, no build tools beyond Node.

## How it works

- **The page is plain, accessible HTML.** Every word is in the page itself.
- **The 3D scene is an enhancement.** `assets/scene.js` loads A-Frame (pinned
  to 1.8.0) only after the page is ready, and only if the device can draw 3D
  and has not asked to save data. It follows the rules in
  [`docs/en/xr-accessibility.md`](../docs/en/xr-accessibility.md):
  - The camera moves only when you scroll. It never moves on its own.
  - With reduced motion turned on, nothing animates and the camera cuts
    instead of gliding. A **Pause motion** button does the same for anyone.
  - A **3D scene** switch turns it off completely. The choice is remembered.
  - In a headset, travel between worlds is an instant jump, never smooth motion.
- **The eight worlds are the eight phases**, each built from what that phase
  teaches: a garden of primitives, a web page, connected components, a 3D
  object, a portal, multi-user orbs, a tower, and a star.

## Files

| File | What it is |
| --- | --- |
| `src/strings.mjs` | Every word on the site, in English, Spanish, and Simplified Chinese |
| `src/page.mjs` | The page template |
| `build.mjs` | Writes the pages, reading lesson counts and times from the repository's `catalog.json` |
| `assets/site.css` | Styles |
| `assets/scene.js` | The 3D and WebXR layer |
| `index.html`, `es-419/index.html`, `zh-hans/index.html` | The built pages: publish these with `assets/` |
| `archive/index-2025.html` | The previous homepage, kept for reference |

## Build

```sh
node build.mjs
```

It reads `../catalog.json`, at the root of this repository. Rebuild whenever lessons
change status, so the "lessons ready" counts stay true.

## Preview

Pages load `scene.js` as a module, which browsers block on `file://` pages, so
use a local server:

```sh
python3 -m http.server 8765
```

Then open <http://localhost:8765/>. To test WebXR without a headset, use the
Immersive Web Emulator browser extension.

## Publish

Upload `index.html`, `es-419/`, `zh-hans/`, and `assets/` to the web host.
`src/`, `build.mjs`, and `archive/` do not need to be published.

## Translations

The Spanish and Chinese text in `src/strings.mjs` are drafts and need review
by native speakers before launch.
