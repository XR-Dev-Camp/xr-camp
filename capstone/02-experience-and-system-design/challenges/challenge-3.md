# Challenge 3: Explorer

**Optional stretch.** Roughly 90 minutes.

Design your data model to support a second language from the start.

## Task

1. In `data-model.md`, revise your primary content type so every text field (titles, descriptions, labels) can hold values in more than one language — for example, an object with `title.en` and `title.es` rather than a single `title` string.
2. Note, in the same document, how your API sketch (`api.md`) would choose which language to return, and what happens if a translation is missing.
3. Add one entry to your test plan (`test-plan.md`) that checks this behaviour once Stage 3 has code to test.

## Why this matters

XR Camp is written in English first and translated later, and its own catalog and content files use this exact pattern. Designing for more than one language from the start, even before you have translations, avoids an expensive redesign later — this is real practice for how the course you are taking is itself built.

## Done when

- [ ] At least one content type supports multiple languages by field, not by duplicating whole records.
- [ ] The API sketch explains how a language is chosen, including a fallback.
- [ ] The test plan includes a check for missing-translation behaviour.
