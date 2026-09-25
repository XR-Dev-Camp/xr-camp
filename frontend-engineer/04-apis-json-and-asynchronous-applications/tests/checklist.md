# Project check

Work through this list before you submit.

## Behaviour
- [ ] Choosing a city shows its 7-day forecast, with the driest day picked out.
- [ ] A city you have already seen appears at once, from the cache, with the time it was saved.
- [ ] Offline, with no saved copy: a clear error and a **Try again** button.
- [ ] Offline, with a saved copy: the saved forecast, saying it could not update.
- [ ] "Use sample data" works with no internet at all.
- [ ] Switching cities quickly never shows the wrong city.
- [ ] The console shows no errors (apart from the failed request itself, when you test offline).

## Code
- [ ] Only `api.js` calls `fetch`; only `cache.js` touches `localStorage`.
- [ ] `response.ok` is checked, and every request has a timeout.
- [ ] `toDays` and `driestDay` are pure.
- [ ] The URL is built with `URLSearchParams`.
- [ ] No API key anywhere in the code.

## Accessibility
- [ ] The forecast is a `<table>` with a `<caption>` and header cells for columns and rows.
- [ ] Loading, success, and failure are announced.
- [ ] The driest day is marked in words, not only colour.
- [ ] At 320 pixels wide, only the table scrolls sideways, never the page, and it can be scrolled with the keyboard.
- [ ] The data source is credited on the page.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] The scene description names the warmest and the wettest day, with their numbers.
- [ ] The table under the scene has every value the bars show.
- [ ] Nothing moves, and the camera stays still.
- [ ] Rain is shown by colour **and** in the description and table.
