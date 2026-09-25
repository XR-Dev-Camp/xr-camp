# Bug reports: Riverside programme explorer

Ten bugs, found and fixed by Ana. Devices: Windows laptop (Chrome), Android phone (Chrome).

## Bug 1: The page has no styling

- **Steps:** Open the explorer.
- **Expected:** The Riverside colours and layout. **Actual:** Plain black text.
- **Found with:** Network panel: `style.css` returned **404 Not Found**.
- **Cause:** The `<link>` asked for `style.css`; the file is `styles.css`.
- **Fix:** `index.html`, the `<link>` in the `<head>`.

## Bug 2: The page shows no programmes, and the "Who is it for?" label does nothing

- **Steps:** Open the explorer; click the "Who is it for?" label.
- **Expected:** Eight programmes; clicking the label selects the menu. **Actual:** No programmes; the label focuses the search box.
- **Found with:** Console: `Cannot read properties of null (reading 'value')`; then the Elements panel showed two elements with `id="search"`.
- **Cause:** The audience `<select>` had `id="search"` instead of `id="audience"`, so the script could not find it.
- **Fix:** `index.html`, the `<select>`'s `id`.

## Bug 3: Still no programmes

- **Found with:** Console, after fixing Bug 2: `Cannot read properties of null (reading 'replaceChildren')` in `explorer.js`.
- **Cause:** `querySelector('#result')`; the list's id is `results`.
- **Fix:** `explorer.js`, section 2.

## Bug 4: The programme names are invisible

- **Expected:** Dark headings on each card. **Actual:** Blank space above each description.
- **Found with:** Elements panel on a heading: a late rule sets `color: #fdfcf8`, the same as the background. Contrast 1:1.
- **Fix:** Deleted the rule from section 9 of `styles.css`.

## Bug 5: The page scrolls sideways on a phone

- **Found with:** Device mode at 390 pixels: the filters box stuck out. The Styles panel showed `width: 900px`.
- **Fix:** Deleted the fixed width from `styles.css`.

## Bug 6: Saved buttons do not change colour

- **Found with:** Styles panel: `colr` is crossed out with a warning icon: an invalid property.
- **Fix:** `color`, in `styles.css`.

## Bug 7: "Free only" ticks itself, and some programmes vanish

- **Steps:** Load the page, then type "lunch" in the search box.
- **Expected:** "Free only" stays unticked, and Community lunch appears. **Actual:** The box is already ticked when the page loads, the programmes that are not free are missing, and "lunch" finds nothing.
- **Found with:** A **breakpoint** on the `matches` function: stepping through, `freeCheckbox.checked` changed while the function ran.
- **Cause:** `freeCheckbox.checked = true && !programme.free` **assigns** instead of checking. Because `=` runs last, it sets the box to `true && !programme.free`, which is `true` for every programme that is not free, so those programmes vanish and the box ticks itself.
- **Fix:** `if (freeCheckbox.checked && !programme.free)` in `explorer.js`.

## Bug 8: The count says there are 7 programmes, but there are 8

- **Found with:** `console.log(programmes.length)` printed 8.
- **Cause:** `programmes.length - 1` in the count message.
- **Fix:** `explorer.js`, `showResults`.

## Bug 9: The ✕ button is announced as "button" with no name

- **Found with:** axe DevTools ("Buttons must have discernible text"), and NVDA, which announced just "button".
- **Cause:** The ✕ is inside `<span aria-hidden="true">`, so the button had no text a screen reader could use.
- **Fix:** `aria-label="Clear search"` on the button in `index.html`.

## Bug 10: Screen readers stay silent when the filters change

- **Found with:** NVDA: typing in the search box announced nothing. The Elements panel showed `#count` had no `role`.
- **Fix:** `role="status"` on `#count` in `index.html`.
