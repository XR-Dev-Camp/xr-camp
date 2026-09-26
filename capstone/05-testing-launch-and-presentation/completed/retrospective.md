# Retrospective

## What took longer than planned

Stage 2's design took two extra sessions: the first draft of the data model did not separate `title` from `description` by language, and reworking it after realising this (prompted by Challenge 3) meant redoing part of the scene graph documentation too.

## What feedback changed

The Stage 3 design review's feedback about the Pause button's slow visible confirmation directly changed how every later interactive control announces its state — visible text and `aria-pressed` now always update together, everywhere in the build.

## What I would do differently next time

Show wireframes to a real person (Stage 2's Challenge 1) *before* finalising the data model, not after — the feedback would have caught the language-field issue a full stage earlier. I would also start the changelog from session one of Stage 3, rather than mostly from Stage 4, since reconstructing the earliest entries from memory was the hardest part of writing this case study.
