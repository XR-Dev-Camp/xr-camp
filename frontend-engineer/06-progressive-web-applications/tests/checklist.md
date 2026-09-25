# Project check

Work through this list before you submit.

## Manifest and icons
- [ ] **Application > Manifest** shows the name, short name, start address, scope, `standalone` display, and both colours, with no errors.
- [ ] It lists a 192-pixel and a 512-pixel icon, and a maskable icon whose picture stays inside the safe zone.
- [ ] `index.html` links the manifest, a `theme-color`, and an `apple-touch-icon`.

## Service worker and offline
- [ ] **Application > Service workers** shows the worker "activated and is running".
- [ ] **Cache storage** has one `weather-shell-` cache with every file in `SHELL`, and a `weather-data` cache after a forecast has loaded.
- [ ] With **Offline** ticked, the dashboard reloads, and shows a forecast (or the sample data).
- [ ] With Local Storage cleared and **Offline** ticked, the forecast says "Saved by this app at…", never "Live data".
- [ ] Offline, a page that is not saved shows `offline.html`, not the browser's error.
- [ ] Changing `VERSION` leaves only the new shell cache after the update, and keeps `weather-data`.
- [ ] You can explain, in one sentence each, why the shell is cache first and the weather is network first with a timeout.

## Update and install
- [ ] After changing `VERSION`, the page says "A new version of this app is ready." and shows **Reload**; nothing reloads until it is pressed.
- [ ] **Reload** works with the keyboard, and the page then runs the new version.
- [ ] In a Chromium browser, the app can be installed; the Install button appears only when `beforeinstallprompt` fires.
- [ ] The page gives written install steps for other browsers, without promising what they cannot do.

## Low data
- [ ] Low-data mode hides the link to the 3D moment and says why.
- [ ] With low-data mode on, `3d-moment.html` does not download A-Frame (check the Network panel), and still shows the description and table.
- [ ] Where the browser has `navigator.connection`, turning on its data saver switches low-data mode on; the learner's own choice still wins.

## Accessibility
- [ ] The update message is in a `role="status"` element, and **Reload**, **Install**, and **Load the 3D scene** are real buttons.
- [ ] After **Load the 3D scene**, focus is on the scene description.
- [ ] At 320 pixels wide, nothing scrolls sideways except the forecast table.
- [ ] The console shows no errors (apart from failed requests while you test offline).

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] Opened once online, the 3D moment opens offline, with its seven bars.
- [ ] The scene description names the warmest and the wettest day, with their numbers, in both modes.
- [ ] The table under the scene has every value the bars show.
- [ ] Nothing moves, and the camera stays still.
