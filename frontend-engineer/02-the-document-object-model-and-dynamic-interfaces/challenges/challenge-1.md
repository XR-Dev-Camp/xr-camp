# Challenge 1: Foundation

**Required.** Roughly 45 minutes.

A "Show only lessons not done yet" filter that keeps focus sensible.

## Task

1. Add a labelled checkbox above the map: "Show only lessons not done yet".
2. When it is on, hide lessons that are done, using the `hidden` attribute rather than redrawing, so nothing else changes.
3. Now tick a lesson while the filter is on: it disappears. Where is focus now? Move it to the next visible checkbox in the same phase, or the phase's heading if none are left (give headings `tabindex="-1"` so they can receive focus from a script).
4. Announce how many lessons are left in `#status`.

## Why this matters

Filters and focus often fight: the element you just used disappears. Deciding where focus goes when something vanishes is one of the most important skills in building dynamic interfaces.

## Done when

- [ ] The filter hides done lessons without redrawing the page.
- [ ] Ticking a lesson while filtering moves focus somewhere sensible.
- [ ] The number of lessons left is announced.
