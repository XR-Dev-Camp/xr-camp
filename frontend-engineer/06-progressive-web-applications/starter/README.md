# Starter — Progressive Web Applications

Begin here. This is the finished Course 2.4 weather dashboard, plus the new
files that turn it into an app.

- `index.html` starts with TODOs 1–2: link the manifest, and fill
  `manifest.webmanifest` (name, colours, start address, icons).
- `icons/` is finished: SVG and PNG icons, including a maskable one.
- `js/pwa.js` has TODO 3 (register the service worker), TODO 12 (the update
  flow), and TODO 13 (install).
- `sw.js`, the service worker, has TODOs 4–8, 10–11, and 15.
- `js/api.js` has TODO 9 (read the `X-Saved-At` header).
- `js/low-data.js` has TODO 14.
- `offline.html`, `3d-moment.html`, `js/main.js`, and the other files are
  finished. Read them: they already use the functions you will write.
- Until TODO 3 is done there is no service worker, so the dashboard works
  exactly as in Course 2.4. That is expected.

Open everything through `http://localhost` or `http://127.0.0.1`: service
workers need a secure context. While you work, tick **Update on reload** in
DevTools > Application > Service workers.

Full instructions: [`../README.md`](../README.md).
