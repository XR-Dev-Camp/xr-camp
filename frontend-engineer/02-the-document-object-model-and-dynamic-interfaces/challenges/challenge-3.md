# Challenge 3: Explorer

**Optional.** Roughly 60 minutes.

Reorder goals with Move up and Move down buttons.

## Task

1. Give each goal two more buttons: **Move up** and **Move down**, each with an `aria-label` that names the goal.
2. When pressed, swap the goal with its neighbour in `state.goals`, save, and move the item in the page. Move its **neighbour**, not the item itself: for Move up, `item.after(item.previousElementSibling)`; for Move down, `item.before(item.nextElementSibling)`.
3. Check that focus stays on the button that was pressed. (If you move the focused item itself, it leaves the page for a moment, and the browser drops focus. Then you would have to call `button.focus()` again.)
4. Hide or disable Move up on the first goal and Move down on the last.
5. Announce the new position: "Finish Phase 1 moved to position 1 of 3".

## Why this matters

Drag-and-drop is common, but it is impossible for many keyboard and screen-reader users. Buttons that move items are the accessible alternative, and many design systems provide both.

## Done when

- [ ] Goals can be reordered with the keyboard, and the order survives a reload.
- [ ] Focus stays on the pressed button, and the new position is announced.
