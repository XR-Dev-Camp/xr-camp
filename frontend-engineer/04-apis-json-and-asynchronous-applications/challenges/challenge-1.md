# Challenge 1: Foundation

**Required.** Roughly 45 minutes.

Remember the learner's choices, and say how fresh the data is in human words.

## Task

1. Save the chosen city and the "Use sample data" setting in `localStorage` (in a small module of their own, not in `cache.js`: one job per file). Restore them when the page loads.
2. Replace "Saved in this browser at 14:05" with a relative time: "updated 5 minutes ago", "updated 2 hours ago". Use `Intl.RelativeTimeFormat`, which speaks every language:

   ```js
   new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(-5, 'minute')   // "5 minutes ago"
   ```

3. Write it as a pure function, `describeAge(savedAt, now)`, so you can test it with fixed times (pass `now` in, rather than calling `Date.now()` inside).
4. Check it: 30 seconds ago, 5 minutes ago, 3 hours ago, 2 days ago.

## Why this matters

"14:05" makes the learner do arithmetic; "5 minutes ago" does not. And remembering someone's city, so they never choose it again, is the kind of small care that makes people come back to an app.

## Done when

- [ ] Reloading keeps the city and the sample-data setting.
- [ ] The source line says how long ago the data was saved.
- [ ] `describeAge` is pure, and you checked it with four fixed times.
