# Challenge 2: Creative

**Optional.** Roughly 60 minutes.

Notes on each lesson.

## Task

1. Give each lesson row a **Notes** button that opens a small form below it: a labelled text area and a **Save note** button.
2. Save notes in the state (for example `state.notes[lessonId]`), in `state.js`, and in `localStorage`.
3. When a lesson has a note, show a short preview under its title.
4. After saving, move focus back to the Notes button and announce "Note saved".

## Why this matters

A dashboard that holds your own thoughts becomes yours: learners who write notes remember more. Technically, it combines everything in this lesson: state, delegation, dynamic forms, and focus.

## Done when

- [ ] Notes open, save, and survive a reload.
- [ ] Focus returns to the Notes button after saving.
