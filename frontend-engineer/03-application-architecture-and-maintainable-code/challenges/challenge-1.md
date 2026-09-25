# Challenge 1: Foundation

**Required.** Roughly 45 minutes.

Add a feature to the clean planner, and see how the structure helps.

## Task

1. Add an **Edit** button to every session in "Still to do". Pressing it replaces the session's text with a labelled text box ("Topic for Tuesday at 19:00") and a **Save** button. Pressing Save (or Enter) changes the topic.
2. Add a new action to the store, `renameSession(id, topic)`, which refuses an empty topic.
3. Keep focus sensible: into the text box when editing starts, back on the session's Edit button after saving. Announce the change.
4. Keep a list of every file you changed, and why.
5. Now imagine adding the same feature to `old/app.js`. Which parts would you have to touch?

## Why this matters

The point of architecture is not tidiness for its own sake: it is that the next change is easy. If your list in step 4 says "store: new action; component: new button; main: one more case in the click listener", the structure is doing its job.

## Done when

- [ ] Sessions can be renamed with the keyboard alone.
- [ ] An empty topic is refused, with a message next to the field.
- [ ] Only the store changes the state; the component only builds.
- [ ] Your journal has the list of changed files, and your answer to step 5.
