# Challenge 3: Explorer

**Optional stretch.** Roughly 60–90 minutes.

Add **Undo** to the store.

## Task

1. Because every change goes through three actions, the store can remember what the state was before each one. Keep a history: before an action changes anything, push a copy of `sessions` onto an array (`structuredClone(sessions)` makes a deep copy).
2. Export `undo()`, which puts back the last copy and calls `commit()`. Limit the history to the last 20 changes.
3. Add an **Undo** button to the page, disabled when there is nothing to undo. Announce what was undone: "Undid: Deleted CSS grid."
4. Add keyboard support: **Ctrl + Z** (**⌘ + Z** on a Mac), but not while focus is in a text box, where it already undoes typing.
5. After Undo, where should focus go? Decide, and write down why.

## Why this matters

Undo is almost impossible in the old planner, because anything could change `a` at any time. In the new one it is a small addition, because there is exactly one door into the state. That is what "one place for state" buys you, and it is how frameworks like Redux make undo and time-travel debugging possible.

## Done when

- [ ] Add, Done, and Delete can each be undone, in order.
- [ ] The Undo button is disabled when there is nothing to undo.
- [ ] Ctrl + Z / ⌘ + Z works, except inside text boxes.
- [ ] Each undo is announced.
