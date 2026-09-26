# Project check

Work through this list before you submit.

## Structure
- [ ] The page has a valid document structure.
- [ ] `<html lang>` changes to match the chosen language, and persists across a reload.
- [ ] There is one clear main heading.

## Internationalization
- [ ] Switching language updates every visible string, the 3D labels, the scene description, and the 2D twin — nothing is left in the previous language.
- [ ] The saved language choice survives closing and reopening the page.
- [ ] `Intl.NumberFormat`, `Intl.DateTimeFormat`, `Intl.RelativeTimeFormat`, and `Intl.PluralRules` are each used at least once, and none of them is replaced by a hand-written list of names or a manual singular/plural `if`.
- [ ] Turning on pseudo-localization visibly stretches and marks every string, with no plain, un-stretched text left showing (a sign of a string that bypassed `t()`).
- [ ] A missing key in a draft locale falls back to English instead of crashing or showing blank text.

## Chinese typography
- [ ] Selecting 简体中文 shows a real Chinese typeface (not visibly slanted or missing glyphs) on every UI string and 3D label.
- [ ] No Chinese text is shown in a faux-italic slant.

## Accessibility
- [ ] Every visible label starts its element's accessible name (2.5.3), in every language, including the longer Spanish and shorter Chinese versions.
- [ ] The keyboard can reach every interactive control, including the 3D exhibit's Select buttons and the language switcher.
- [ ] Focus is visible at all times.
- [ ] Colour contrast meets WCAG 2.2 AA in every language.
- [ ] The experience respects reduced-motion preferences.
- [ ] `role="list"` is set on every list styled with `list-style: none`.

## Responsiveness
- [ ] The page works at mobile width, in all three languages and with pseudo-localization on.
- [ ] Nothing overflows horizontally at 390px or 1280px, in any language.

## Quality
- [ ] The browser console has no errors, and no "Missing string" warnings, in any language.
- [ ] Code is formatted consistently and meaningfully named.
- [ ] Comments explain intent, not syntax.

## Translation QA checklist
Work through this once for `es.js` and once for `zh-Hans.js` before either
stops being a draft (see "Translation QA checklist" in the README for the
full explanation of each item):
- [ ] Every key in `en.js` exists here, or is deliberately left for fallback.
- [ ] No key still contains English text copied by mistake.
- [ ] Every `{placeholder}` from the English string is still present, spelled the same.
- [ ] Plural forms use the categories the language actually needs (Chinese needs only `other`; Spanish needs `one` and `other`, the same as English).
- [ ] Numbers, dates, and times are never hard-coded in a string — they come from a `{placeholder}` filled by an `Intl` call.
- [ ] A native speaker has read every string in context (on the running page, not in the source file) and confirmed tone, formality, and meaning.
- [ ] The `draft: true` flag is removed only after that native-speaker review.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] Every 3D label (clay pot, basket ring, jade stone) is readable, correctly spelled, and not clipped in all three languages, including the accented Spanish and the Chinese characters.
- [ ] `id="scene-description"` exists and its text changes correctly when the language or the selection changes.
- [ ] The jade stone's turning stops immediately when reduced motion is on, and the Pause animation button both stops and restarts it, with `aria-pressed` reflecting the current state.
- [ ] Everything in the 3D view has a full 2D equivalent (the twin list and the info panel), in every language.
- [ ] Orbiting the camera keeps every label facing the viewer.
