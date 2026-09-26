# Challenge 2: Creative

**Optional.** Roughly 45–60 minutes.

Customize the project so it reflects your own interests, community, or language.

## Task

1. Replace one exhibit's `label` and `description` with something from your own culture, community, or a place that matters to you: an object, a tradition, a story. Plain language, one or two sentences, is enough.
2. If you write it in Spanish or Chinese, check it against the README's "Multilingual text" note from 3.2: plain Spanish (no accents or "ñ") is safe in an `<a-text>`, but accented Spanish and any Chinese text need a canvas-drawn texture instead, the same technique 3.2 used for the Chinese welcome panel.
3. Give your renamed exhibit its own `action` (turn, lift, or none) and decide whether it should have a chime, and if so, why: does the sound suit what the exhibit represents?
4. Update the info panel text so what a screen-reader user hears matches what a sighted user sees, in your own words.

## Why this matters

The exhibits so far are generic (a pedestal, a lantern, a bell). An exhibit that means something to you is worth more to a learner, and to anyone who visits your version of the room later. Multilingual-safe text is not a one-time fix in 3.2: it is a habit to check every time you add a label.

## Done when

- [ ] At least one exhibit's label and description are your own, and remain a WCAG 1.3.1-correct match between the 3D scene, the info panel, and the 2D list.
- [ ] Any accented or non-Latin text you added uses a canvas texture, not `<a-text>`.
- [ ] The exhibit still works from every input: click, "Select" button, and (if you test it) gaze or a VR controller.
