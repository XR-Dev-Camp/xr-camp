# Challenge 2: Creative

**Optional.** Roughly 45–60 minutes.

Make the audio guide your own: your language, or a sound that means something to you.

## Task

1. Write a second caption file, `assets/captions-mine.vtt`, with the same cue timings as `assets/captions.vtt` but in your own language, or a language you are learning. Add a second `<track>` element to the `<audio>` element in `index.html` (a different `srclang` and `label`, `default` left only on the original), so a learner can choose either from the browser's own caption menu.
2. Change the pitch, rhythm, or timbre of one pedestal's tone in the Python generation script (adjust the `freq`, `harmonics`, or `dur` values), to something that reminds you of a sound from your own culture or community: a bell, an instrument, a rhythm. Regenerate that one `.wav` file and listen to the difference.
3. Update that pedestal's description in `js/exhibit.js` and the caption text if it now describes something different to you.

## Why this matters

Spatial audio and captions are tools for telling a story. The three.js API does not care whose story it is: the same `PositionalAudio`, the same WebVTT file format, and the same caption paragraph work equally well for a story from any language or culture. This challenge is about noticing that, and using it.

## Done when

- [ ] A second caption track exists, in your own language, with matching cue timings.
- [ ] At least one pedestal's sound has been regenerated with different parameters, and you can explain what you changed.
- [ ] The transcript and scene description still read correctly with your changes.
