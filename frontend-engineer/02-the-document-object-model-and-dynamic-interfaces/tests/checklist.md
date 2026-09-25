# Project check

Work through this list before you submit.

## Behaviour
- [ ] Every lesson has a checkbox named "Done: <lesson title>".
- [ ] Ticking a lesson updates its phase, the overall progress, and Next up.
- [ ] Goals can be added and removed; an empty goal is refused with a message.
- [ ] Progress and goals survive a reload.
- [ ] The console shows no errors.

## Code
- [ ] One `change` listener on the map, and one `click` listener on the goals list (delegation).
- [ ] Only `state.js` touches `localStorage`.
- [ ] Ticking a lesson updates only what changed; nothing is redrawn.

## Focus and announcements
- [ ] After ticking with Space, focus stays on the checkbox.
- [ ] After adding a goal, focus stays in the input.
- [ ] After removing a goal, focus moves to the next goal, the previous one, or the input.
- [ ] Every change is announced by a screen reader.
- [ ] Progress bars always have their value in words.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] Every shape in the 3D moment can be added, selected, and removed from the panel with the keyboard.
- [ ] The scene description lists every shape and which one is selected.
- [ ] Nothing moves on its own, and the camera never moves unless you move it.
