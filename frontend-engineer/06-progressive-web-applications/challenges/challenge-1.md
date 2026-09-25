# Challenge 1: Foundation

**Required.** Roughly 45 minutes.

Always know whether you are online, and which version is running.

## Task

1. Add an **Offline** badge near the heading: the word "Offline", with a border (never colour alone). Show it when `navigator.onLine` is `false`, and update it on the window's `online` and `offline` events.
2. Announce the change in the existing status region: "You are offline. Saved forecasts still work." and "Back online."
3. Show the running version in small text at the bottom of the page: "Version v1". The page cannot read `sw.js`'s variables, so ask the worker: send it a message `{ type: 'GET_VERSION' }`, and in `sw.js` answer with `event.source.postMessage({ type: 'VERSION', version: VERSION })`. Listen with `navigator.serviceWorker.addEventListener('message', …)`.
4. Change `VERSION` to `v2`, press **Reload** when offered, and check that the line changes.

`navigator.onLine` is only a hint: `true` means "connected to a network", not "the internet works". That is why the forecast still has its own error states.

## Why this matters

People trust an app that tells them what is going on. And when a learner reports a bug, "which version are you running?" is the first question every team asks.

## Done when

- [ ] The badge appears and disappears when you tick and untick **Offline**, and each change is announced.
- [ ] The badge says "Offline" in words.
- [ ] The version line comes from the service worker, and changes after an update.
