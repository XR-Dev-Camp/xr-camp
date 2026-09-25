# Challenge 1: Foundation

**Required.** Roughly 45 minutes.

A search box that filters lessons by title.

## Task

1. Add a labelled search box above the map: `<label for="search">Search lessons</label>` and `<input id="search" type="search">`.
2. In `main.js`, when it changes (`input` event), draw again with only the lessons whose title includes the search words. Make both lower case first.
3. It must work together with "ready only": both filters at once.
4. Update `#summary` to say how many lessons match, so screen readers hear it.

## Why this matters

Combining filters is where many apps get confusing. If every filter is a small function, and `draw` applies them all, adding a new one is easy and safe.

## Done when

- [ ] Typing filters the lessons, in any case.
- [ ] Search and "ready only" work together.
- [ ] The summary announces how many match.
