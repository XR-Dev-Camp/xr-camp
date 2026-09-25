# Project check

Work through this list before you submit.

## Behaviour
- [ ] Every line in your `behaviour.md` works the same in the old and new planners, except the deliberate changes you listed.
- [ ] Sessions saved by the old planner still appear in the new one.
- [ ] A topic like `<b>Hello</b>` is shown exactly as typed.
- [ ] An empty topic shows a message next to the field; there is no `alert()`.
- [ ] Every line of `check.html` says PASS.
- [ ] The console shows no errors.

## Structure
- [ ] Every file's job can be said in one sentence.
- [ ] No magic numbers: 45, 4, and the storage key appear only in `config.js`.
- [ ] Only `store.js` changes the sessions or touches `localStorage`.
- [ ] Components build elements and never change the state.
- [ ] No `innerHTML` with anything a user typed.
- [ ] Actions use ids, not array positions.
- [ ] No global variables, no dead code, no comments that only repeat the code.
- [ ] You committed after each step, with a message saying what changed.

## Focus and announcements
- [ ] The form is written in HTML, with a visible label for every field.
- [ ] After adding, focus stays in the topic box.
- [ ] After Done or Not done, focus is on that session's button in its new list.
- [ ] After Delete, focus moves to the next session, the previous one, or the topic box.
- [ ] Every change is announced by a screen reader.
- [ ] Every button's name starts with its visible word and includes the session: "Delete: CSS grid".

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] The scene description names every exhibit, in order, and says whether anything moves.
- [ ] With reduced motion on, nothing turns; the Pause animation button stops and restarts turning, from the keyboard.
- [ ] Adding one line to `EXHIBITS` adds an object, its pedestal, and its description.
- [ ] Nothing flashes, and the camera never moves on its own.
