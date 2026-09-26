# Accessibility and ethics audit: the gallery talk

This is the audit behind the fixes in this folder. It compares
[`../starter/`](../starter/) (deliberately broken) against this reference
solution, and says which W3C guidance each fix answers.

## Sources checked

- **[XR Accessibility User Requirements (XAUR)](https://www.w3.org/TR/xaur/).**
  This is a **W3C Group Note**, published 25 August 2021 - a record of
  community input, not a W3C Recommendation and not a standard. It lists 19
  numbered "User Needs", each describing what a specific group of disabled
  users needs from an immersive experience. Its scope is disability access
  only: reading it directly, it has no numbered user need for informed
  consent, for what sensor data can reveal, or for personal space and
  harassment controls between users. The three fixes below that involve
  those topics are documented as general ethical-design requirements
  instead, rather than stretched to fit a XAUR number that is not there.
- **[WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/)**, for the
  fixes that also correspond to a testable success criterion.
- [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md), for
  the manual 3D/XR checks every lesson in this repository carries.

## The audit

| # | Problem in `starter/` | Where | Fix in `completed/` | XAUR | WCAG 2.2 |
|---|---|---|---|---|---|
| 1 | No text description of the scene, and no transcript of the talk anywhere on the page. | `js/talk.js`, `main.js` | `#scene-description` and an always-visible transcript list (`#transcript-list`), built from the same `TALK_SCRIPT` data the talk itself uses. | User Need 1 (a user of assistive technology needs to identify objects and locations in an immersive environment) | 1.1.1 Non-text Content; 1.3.1 Info and Relationships |
| 2 | The camera orbits by itself, forever, from the moment the page loads. | `js/app.js` | Removed outright. Only `OrbitControls`, driven by the learner's own drag or arrow keys, ever moves the camera. | User Need 16 (vestibular disorders, epilepsy and photosensitivity may find some interactions trigger motion sickness) | 2.2.2 Pause, Stop, Hide (self-starting movement; see the note in `docs/en/xr-accessibility.md` - this is 2.2.2, not 2.3.3, because nothing here is triggered by a user interaction) |
| 3 | The presenter's idle animation plays unconditionally, with no reduced-motion check and no pause control. | `js/app.js`, `main.js` | Starts paused when `prefers-reduced-motion: reduce` is set; a labelled "Pause presenter animation" button (`aria-pressed`) is always present either way. | User Need 16 | 2.2.2 Pause, Stop, Hide |
| 4 | Captions are drawn onto a plane fixed in **world space** beside the presenter. Look away, or walk past it in VR, and the caption is gone. It also clears on a fixed timer too short to read. | `js/talk.js` | The caption plane is parented to the **camera**, not the scene, so it stays in view like a HUD, mirrored by a DOM `#captions` bar for the non-XR view. Each caption stays up until the next line starts. A "Turn off captions" toggle lets a learner remove them if they prefer the transcript alone. | User Need 19 (users may need to customise captions, subtitles and other text in XR environments); User Need 10 (a deaf or hard-of-hearing person may prefer text to signing or audio) | Good practice (WCAG's captioning criteria, e.g. 1.2.2, are written for prerecorded media; this is live synthesized speech, so no single SC matches exactly) |
| 5 | The talk exists only as speech (`speechSynthesis`); if it is unavailable, or for a learner who cannot hear it, nothing communicates the content. | `js/talk.js` | The transcript (fix 1) carries the full content regardless of speech synthesis, before playback even starts. | User Need 17 (hard-of-hearing users may need accommodations to perceive audio) | 1.1.1 Non-text Content |
| 6 | "Ask a question" exists only as a 3D mesh, positioned high and to one side - reachable in a headset only by raising an arm above shoulder height - with no keyboard route and no on-screen equivalent. | `starter` `main.js`; fixed in `completed` `index.html`/`main.js` | Replaced with an ordinary `<button>` in the page's control panel: reachable by Tab, activated with Enter or Space, at least 44 by 44 CSS pixels. | User Need 2 (interacting without needing a particular bodily movement); User Need 4 (a larger target size for users with limited mobility or restricted vision) | 2.1.1 Keyboard; 2.5.8 Target Size (Minimum) |
| 7 | The whole experience needs WebGL; if it is unavailable, the canvas is hidden and nothing replaces it. | `main.js` | The transcript, the answer text, the camera-personalization panel, and the visitor controls are all ordinary page content outside the canvas, so they work fully with WebGL disabled. | User Need 1 | 1.3.1 Info and Relationships; 4.1.2 Name, Role, Value |
| 8 | The page silently requests camera access on load, with no explanation and no way to decline before it happens. | `js/sensors.js` | Camera access is requested only from a real click on "Turn on camera personalization", after a plain-language notice, and a learner can decline and use the full talk regardless. | *Not covered by XAUR* - its 19 user needs are scoped to disability access, not privacy or consent. | *No matching SC.* General ethical-design requirement: ask before turning on a sensor, from a genuine user gesture, the same rule WebXR itself enforces for entering a session. |
| 9 | Nothing on the page says what a camera frame could reveal. | `js/sensors.js`, `index.html` | A privacy notice, shown before the consent button, states plainly that a camera frame can show more than a face: who else is in the room, what the room looks like, and, over time, things like tiredness. | *Not covered by XAUR* | *No matching SC.* Good practice: transparency about what a sensor can infer, not only what it is nominally "for". |
| 10 | A simulated visitor walks straight at the camera with no limit, and can end up exactly where the learner's head is. | `js/visitor.js` | The visitor stops at a 1.2 m personal-space radius, the way a person pauses before standing nose to nose with a stranger, and announces the stop in a live region. | *Not covered by XAUR* | *No matching SC.* Good practice for shared/social XR: a personal-space boundary between avatars. XR Camp has no live multiplayer server (see the free-tools rule in `docs/en/README.md`), so this visitor is simulated, but the boundary is the same one a real shared space needs. |
| 11 | There is no way to mute or block the visitor. | `js/visitor.js`, `index.html` | "Mute visitor" stops their chatter; "Block visitor" hides them and stops them moving; both are ordinary, keyboard-reachable buttons with `aria-pressed`. | *Not covered by XAUR* | *No matching SC.* Good practice: a real other person in a shared XR space can be far more uncomfortable to have nearby than this capsule is, and needs at least this much control over the interaction. |

## What this leaves out

This audit covers the problems this lesson deliberately built in. It is not
a complete accessibility or ethics review of every possible XR pattern - for
example, it does not cover hand-tracking alternatives (4.2 already did) or
localisation (a later course covers that). Treat it as one worked example of
the audit method, not a checklist that, once satisfied, means an experience
is fully accessible.
