# Completed — Progressive Web Applications

The reference solution: the Course 2.4 weather dashboard as an installable,
offline-capable app. Open it after you have tried the starter.

- `manifest.webmanifest`: name, start address, scope, standalone display,
  colours, and icons (one maskable).
- `icons/`: self-made SVG icons, and PNGs rendered from them.
- `sw.js`: precaches the app shell in a versioned cache; cache first for the
  shell; network first with a 4-second timeout for Open-Meteo (saved answers
  are stamped with `X-Saved-At`); `offline.html` for pages that are not saved;
  deletes old shell caches on activate; `SKIP_WAITING` for the update flow;
  precaches A-Frame for the 3D moment unless the device asks to save data.
- `js/pwa.js`: registers the worker, notices a waiting update and offers
  **Reload**, and offers an Install button where `beforeinstallprompt` exists.
- `js/low-data.js`: low-data mode from `navigator.connection?.saveData` and
  the learner's own choice.
- `js/api.js`: returns `{ json, savedAt }`, so pages can say how old data is.
- `js/main.js`: the Course 2.4 dashboard, plus the update message, install,
  and low-data wiring.
- `offline.html`: the page shown offline for anything not saved.
- `3d-moment.html`: the forecast as 3D bars; loads A-Frame only when wanted,
  and opens offline.

Weather data by [Open-Meteo.com](https://open-meteo.com/), under CC BY 4.0.
Open everything through `http://localhost` or `http://127.0.0.1`.
