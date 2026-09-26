# Completed — Internationalization and Localization

The reference solution. Open it after you have tried the starter.

- `js/config.js`: the three languages, and the compact three-item exhibit data.
- `js/i18n.js`: choosing and loading a language (from Course 2.9), plus this
  lesson's new `Intl.NumberFormat`, `Intl.DateTimeFormat`, and
  `Intl.RelativeTimeFormat` calls, and the pseudo-localization hook.
- `js/pseudo.js`: the pseudo-localization transform.
- `js/exhibit.js`: the three pedestals (clay pot, basket ring, jade stone),
  geometry only, no text.
- `js/labels.js`: canvas-drawn 3D name labels, in whatever language and
  script the label needs.
- `js/app.js`: the three.js renderer, camera, and OrbitControls.
- `js/main.js`: wires the DOM, the language switcher, the Select buttons, the
  Intl demo panel, and the pseudo-localization toggle together.
- `js/locales/en.js`, `es.js`, `zh-Hans.js`: every string, in three
  languages. `es.js` and `zh-Hans.js` are marked `draft: true` and still need
  a native-speaker review — see "Translation QA checklist" in the README.

Open everything through a local server (http://).

Full instructions: [`../README.md`](../README.md).
