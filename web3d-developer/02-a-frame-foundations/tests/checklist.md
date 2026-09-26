# Project check

Work through this list before you submit.

## The room
- [ ] The sky, floor, and pedestal all appear, and the pedestal and floor share the woven texture.
- [ ] The English and Spanish welcome panels show their full text (test with the font's CDN reachable).
- [ ] The Chinese welcome panel shows its text correctly: it is drawn as a canvas texture, not an `<a-text>`.
- [ ] The sound marker is visible, and pressing "Play calm sound" starts a quiet, looping sound; pressing it again stops it.
- [ ] The console shows no errors.

## Data and controls
- [ ] `exhibitData` has one entry per stop, and the 2D list and the "Look at" buttons are both built from it.
- [ ] Every "Look at" button turns the camera to face its stop.
- [ ] `#scene-description` updates to name the stop you last looked at.

## Accessibility
- [ ] Every control is a real, labelled `<button>`, reachable with the keyboard alone.
- [ ] The sound button's `aria-pressed` always matches whether the sound is playing.
- [ ] The active "Look at" button's `aria-pressed` matches which stop the camera faces.
- [ ] At 390 pixels wide, the page does not scroll sideways.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] The scene description and the 2D list describe everything in the room, correctly.
- [ ] With reduced motion turned on, "Look at" snaps to its target instantly, with no turning animation.
- [ ] The camera never moves or turns unless a "Look at" button is pressed or the learner drags the view themselves.
- [ ] The sound never plays until the "Play calm sound" button is pressed.
- [ ] With WebGL disabled (or on a browser without it), the no-WebGL message appears and the 2D list still works.
- [ ] The "Enter VR" button appears when tested with the Immersive Web Emulator, and does not appear without it.
