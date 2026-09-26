# Project check

Work through this list before you submit.

## Behaviour

- [ ] The dashboard, course map, planner, and weather views each show real data, and switching between them (by clicking a nav link, or by typing a `#view` address directly) shows the right one.
- [ ] Progress, planned sessions, the language choice, and the low-data choice are all still there after a reload.
- [ ] The weather view shows a live forecast when online, and the sample forecast, never a blank view, when it cannot reach the network.
- [ ] Pressing **See my progress in 3D** shows a bar chart that matches the dashboard's table exactly.

## Structure

- [ ] The page has a valid document structure, and its language is identified, and updates when the learner switches language.
- [ ] Each view has exactly one visible `<h1>`.
- [ ] `role="list"` is set on every list styled with `list-style: none` (Safari does not expose the list role otherwise).

## Accessibility

- [ ] Every button, link, and field has a visible label, and the keyboard can reach and operate all of them.
- [ ] Focus is visible at all times, and moves to each view's heading when you navigate to it.
- [ ] Status changes ("A new version is ready", a session added, weather loaded, a language switched) are announced, without moving focus away from what you were doing.
- [ ] Colour is never the only way a status (ready, coming soon, done) is shown.
- [ ] Colour contrast meets WCAG 2.2 AA in every language, including the longer German-length text that Spanish sometimes produces.
- [ ] The experience respects `prefers-reduced-motion`.

## Multilingual-ready

- [ ] Every UI string comes from a locale file; none is hard-coded in a component.
- [ ] The language switcher sets `<html lang>` and updates every visible view immediately, with no reload.
- [ ] Numbers, dates, and percentages are formatted with `Intl`, not written by hand.
- [ ] Draft translations (Spanish, Simplified Chinese) show a visible notice saying they are drafts.
- [ ] Layouts survive text expansion: nothing overflows or overlaps when Spanish strings run longer than their English originals.

## Offline and installable

- [ ] The app can be installed (or, where the browser does not support it, written steps are shown).
- [ ] With the network switched off, every view still works from previously loaded data, and an unsaved page shows `offline.html`.
- [ ] Changing the service worker's version and reloading shows the update prompt, and pressing its button updates without losing saved data.

## Responsiveness

- [ ] The app works at 390 px and at 1280 px wide.
- [ ] Nothing overflows horizontally at either width.

## Quality

- [ ] `check.html` runs, and every check passes.
- [ ] The browser console has no errors on any page.
- [ ] Code is formatted consistently and meaningfully named.
- [ ] Comments explain intent, not syntax.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a
person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] `#scene-description` names every column and its value, and matches the 2D table exactly.
- [ ] With reduced motion on, the scene looks and behaves exactly as it does with reduced motion off, because nothing in it ever animates.
- [ ] Every piece of information the 3D view shows also appears in the 2D table beside it.
- [ ] Nothing flashes, and the camera never moves on its own.
- [ ] The 3D library never loads before the "See my progress in 3D" button is pressed (checked in the Network panel).
