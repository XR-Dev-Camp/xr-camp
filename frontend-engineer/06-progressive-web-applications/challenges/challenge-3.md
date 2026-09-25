# Challenge 3: Explorer

**Optional stretch.** Roughly 90 minutes.

Turn a second My XR Camp app into a PWA, and compare what each one needs.

## Task

1. Choose one of your earlier apps: the course map (Course 2.1), the learning dashboard (Course 2.2), or the session planner (Course 2.3).
2. Give it a manifest and icons, a service worker with a precached shell in a versioned cache, and an offline page. Reuse your `pwa.js`: it should need no changes. If it does, improve it until it does not.
3. Decide on a strategy for each kind of request, and write it down in a small table in your journal: which files, which strategy, and why. The planner saves everything in `localStorage`, so it may need no data strategy at all. The course map reads `data/catalog.json`: is that shell (cache first) or data (network first, or stale-while-revalidate)?
4. Try **stale-while-revalidate** for one of them: answer from the cache at once, and fetch a fresh copy in the background for next time. Compare how it feels with network first, online and on **Slow 4G**.
5. Give both apps different cache names (`planner-shell-v1`, not `weather-shell-v1`) and check that each app's `activate` deletes only its own old caches. Two apps on the same origin share one set of caches.

## Why this matters

A strategy is a decision about what matters more for each request: speed, freshness, or working offline. Making that decision twice, for two different apps, is how you learn that there is no single right answer, only a reason for each choice.

## Done when

- [ ] The second app installs, opens offline, and shows your offline page for unsaved pages.
- [ ] Your journal has a table of requests, strategies, and reasons.
- [ ] You tried stale-while-revalidate and wrote one sentence about how it felt.
- [ ] Neither app deletes the other's caches.
