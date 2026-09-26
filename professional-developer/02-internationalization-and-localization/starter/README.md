# Starter — Internationalization and Localization

Begin here.

- `js/config.js` holds every setting, including the list of languages.
  **TODO 1** is here: add the Simplified Chinese entry.
- `js/i18n.js` copies its language-choosing machinery unchanged from
  Course 2.9. **TODOs 2-4** add three new `Intl` formatters at the bottom of
  the file: `formatVisitorCount`, `formatOpenedDate`, `formatOpenedRelative`.
- `js/locales/es.js` and `js/locales/zh-Hans.js` are each missing two keys on
  purpose. **TODO 5** is to translate and add them.
- `js/exhibit.js` builds the three pedestals. **TODO 6** is the one shape it
  leaves for you: `buildJadeStone()`.
- `js/labels.js` draws each pedestal's name label on a `<canvas>`, so it can
  show Chinese characters and accented Spanish that A-Frame and three.js's
  built-in text cannot. **TODO 7** is the drawing code.
- `js/app.js` has a short **TODO 8** about billboarding labels (a one-line
  decision, explained in a comment, once you see why sprites make it free).
- `js/main.js` wires the page together. **TODO 9** is selection and the info
  panel; **TODO 10** is marking the current language button; **TODO 12** is
  the pseudo-localization checkbox.
- `js/pseudo.js` is empty. **TODO 11** is the pseudo-localization transform
  itself — the last piece, and the one that lets you test everything above
  before a single word is professionally translated.

Until the TODOs are done, the console shows "Missing string" warnings and the
3D pedestals show no labels: that is expected. Open with a keyboard only at
least once — every control here is a real `<button>`, so Tab and Enter
already work.

Open everything through a local server (http://).

Full instructions: [`../README.md`](../README.md).
