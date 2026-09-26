# Challenge 3: Explorer

**Optional stretch.** Roughly 90 minutes.

Add a fourth locking mode: hand-relative (sometimes called "palm UI"), which only makes sense once real hand or controller tracking is available — connect it to what you already know from **4.2: XR Input and Interaction**.

## Task

1. Read back over your notes from 4.2 on `XRControllerModelFactory` and controller/hand poses. This challenge does not require you to rebuild that lesson's interaction lab — only to reuse the idea of "an object placed relative to a tracked hand or controller".
2. In `js/layout.js`, add a fourth function, `applyHandLock(object, handOrControllerSpace, localOffset)`, that positions `object` relative to a tracked `XRSpace` the way `applyBodyLock` positions it relative to the camera. If you do not have a headset with hand tracking to test against, you can simulate the tracked space with the Immersive Web Emulator from 4.1, or by temporarily substituting any other Object3D (a cube standing in for a hand) so you can prove the positioning maths works.
3. Add a fourth option to the goals panel's lock-mode controls, and wire it through `setLockMode`.
4. Update `js/describe.js` and your `design-rationale.md` to explain when a hand-relative panel makes sense and when it does not (consider what happens to it when hands are not visible to the headset's cameras).

## Why this matters

Real spatial interfaces mix several anchoring strategies depending on what a headset can actually track, and hand tracking is one of the least reliable inputs (see 4.2's own caution about varying support). Designing for a mode that can silently disappear is a harder, more realistic problem than the three modes this lesson guarantees.

## Done when

- [ ] `applyHandLock` exists and is exercised by something you can demonstrate, even a stand-in object.
- [ ] The goals panel can be switched into the new mode from the page's controls.
- [ ] `design-rationale.md` explains a real limitation of hand-relative UI, not just how you built it.
