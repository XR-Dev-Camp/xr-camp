# Challenge 2: Creative

**Optional.** Roughly 45-60 minutes.

Make the "Enter VR" experience speak your own language or reflect your own community.

## Task

1. Rewrite the visible text of the Enter VR panel (the legend, the hint, the button's two states, and every `#xr-status` message in `xr.js`) in your own language, or in the plain-language style your own community would find clearest.
2. If your language reads right-to-left, or has different sentence rhythms, check that `#xr-status` still reads naturally as a sentence when its text changes.
3. Optionally, swap in a different object for the jade stone, the clay pot, or the basket ring (built from primitives, as in 3.4's Creative challenge), so the exhibit you step into in VR reflects something from your own culture.
4. Keep every element's `id` the same, so the JavaScript still finds it.

## Why this matters

XR Camp is for women beginners across Latin America and China, and VR headsets are new, sometimes intimidating technology. A learner is far more likely to trust an "Enter VR" button, and to understand what happened when it changes to "Exit VR", if the words around it sound like something a person from their own community would say.

## Done when

- [ ] Every visible string in the Enter VR panel is rewritten in your own words or language.
- [ ] The page still passes `tests/checklist.md`.
- [ ] Nothing that JavaScript looks up by `id` was renamed.
