# Spatial Audio, Media, and Presence

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `immersive-developer` · **Lesson:** `spatial-audio-media-and-presence-05` · **Time:** about 10 hours · 14 sessions of 45 minutes · about 4 weeks at 4 sessions a week

---

> Create an immersive media or storytelling scene.

---

## Learning objectives

By the end of this project you will be able to:

1. Create and configure a **`THREE.PositionalAudio`**, and explain `setRefDistance()`, `setRolloffFactor()`, `setMaxDistance()`, and the three Web Audio distance models: `'linear'`, `'inverse'`, and `'exponential'`.
2. Attach a `PositionalAudio` to any `Object3D` so it inherits that object's position every frame, and place a **`THREE.AudioListener`** on the camera so panning is always measured from the viewer.
3. Explain why an `AudioContext` starts **suspended**, and resume it from inside a genuine user gesture, alongside three.js's own `play()` and `pause()`.
4. Build a texture that changes over time with **`THREE.CanvasTexture`**: redraw a canvas every frame, and set `texture.needsUpdate` so three.js re-uploads it.
5. Explain the difference between `CanvasTexture` and **`THREE.VideoTexture`**, and when you would reach for each.
6. Author a **WebVTT** caption file, and read its cues in JavaScript with the **`TextTrack`** API: `track.mode`, the `cuechange` event, and `track.activeCues`.
7. Build an always-present **transcript** from the same cues a captions track uses, so the information never lives in only one place.
8. Apply the "user-started audio only" rule and the reduced-motion rule together, in one scene that has both sound and moving visuals.

## Prerequisites

- **WebXR Foundations (4.1)**: this lesson's starter is 4.1's completed exhibit, including its "Enter VR" button. You should be comfortable with `renderer.xr`, `OrbitControls`, and `renderer.setAnimationLoop`.
- **XR Input and Interaction (4.2)**, **Spatial UX Design (4.3)**, and **Immersive Accessibility and Ethics (4.4)**, if completed, are helpful background but not required.
- **My XR Camp**, Phase 2's own small app: the same idea of building one thing across several lessons continues here, with the virtual exhibit gaining a voice.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A Chromium-based desktop browser (Chrome or Edge) | WebGL 2, the Web Audio API, and DevTools | Free |
| A local server | Modules, import maps, and media files all need `http://` | Free |
| Python 3 with `numpy` (optional) | Only needed if you want to regenerate or add your own procedural sounds, as this lesson's own `assets/*.wav` files were made | Free |

The `three` library loads from `cdn.jsdelivr.net`; if that is slow or blocked where you are, download the pinned files once where they work and change the import map to point at your own copy. Nothing in this lesson needs any paid account, API key, or text-to-speech service.

## What you will build

The exhibit from 4.1 gains a voice. Each of the three pedestals now plays its own quiet, looping sound with `THREE.PositionalAudio`, so the balance between them shifts as you move around the exhibit, the same idea a real audio guide, or your own two ears, rely on. A small screen above the exhibit, built from a redrawn `<canvas>` rather than a video file, shows a short audio guide with captions; the same captions and a full transcript are always readable on the page, whether or not you have pressed play.

All of the audio in this project is procedurally generated (see [`ATTRIBUTION.md`](./ATTRIBUTION.md)): no recording equipment, no licensed sound library, and no text-to-speech tool was used or is needed. Nothing plays until you ask it to.

The reference solution is in [`completed/`](completed/). The starter is 4.1's finished exhibit with three new files (`js/audio.js`, `js/video.js`, `js/captions.js`) and small additions to three others: ten TODOs in total.

## Folder guide

```text
05-spatial-audio-media-and-presence/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html, styles.css    # The page, audio guide player, captions, and transcript (finished)
│   └── js/
│       ├── app.js                # The engine, from 4.1: TODOs 3, 9
│       ├── exhibit.js            # The objects, from 4.1 (finished)
│       ├── xr.js                 # Entering and leaving VR, from 4.1 (finished)
│       ├── audio.js              # New: pedestal spatial sound. TODOs 1-2
│       ├── video.js              # New: the canvas-driven story screen. TODO 6
│       ├── captions.js           # New: reading WebVTT cues. TODOs 7-8
│       ├── describe.js           # The description: TODO 10
│       └── main.js               # Wiring the page: TODOs 4-5
├── completed/            # Reference solution: open this last
├── challenges/           # Three challenges: Foundation is required
├── tests/checklist.md    # Self-review before you submit
├── assets/               # Procedurally generated .wav files and captions.vtt
└── screenshots/
```

## Setup

1. Copy the starter into your `virtual-exhibit` folder, alongside your earlier work, and commit it with Git.
2. Start your local server, and open `index.html`. The desktop exhibit and "Enter VR" panel work exactly as they did at the end of 4.1. The audio guide player, caption paragraph, and transcript list are visible but do not yet do anything.
3. Look at `assets/` before you start: three short pedestal sounds, one longer guide track, and `captions.vtt`, all already generated for you. You do not need Python for this lesson unless you attempt the Creative or Foundation challenges.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup: copy 4.1's completed exhibit in as this lesson's starter, and read the new HTML | The unchanged exhibit, plus an audio guide player and an empty transcript |
| 2 | Step 1: `THREE.PositionalAudio` and its distance settings (TODO 1) | Each pedestal sound loads with its distance model configured, though nothing plays yet |
| 3 | Step 2: attaching a sound to its pedestal's mesh (TODO 2) | Each sound inherits its pedestal's own position |
| 4 | Step 3: the `AudioListener`, added to the camera (TODO 3) | Sounds now measure distance from wherever the camera actually is |
| 5 | Step 4: resuming the `AudioContext` inside a real click (TODO 4) | Pressing "Start pedestal sounds" makes sound, for the first time |
| 6 | Step 5: wiring the distance-model select (TODO 5) | Switching `linear`, `inverse`, and `exponential` changes the falloff live |
| 7 | Step 6: drawing a frame onto the story screen's canvas (TODO 6) | The screen shows a moving gradient and caption text |
| 8 | Step 7: reading captions with `cuechange` (TODO 7) | The caption paragraph updates as the audio guide plays |
| 9 | Step 8: building the transcript from the same track (TODO 8) | The transcript list appears, and stays even when nothing is playing |
| 10 | Step 9: hooking the story screen into the render loop (TODO 9) | The screen keeps animating every frame, in time with the rest of the scene |
| 11 | Step 10: extending the scene description (TODO 10) | The description reports whether sounds are playing, which distance model is chosen, and the current caption |
| 12 | Testing: reduced motion, keyboard-only use, and the 2D/3D fallback, against [`docs/en/xr-accessibility.md`](../../docs/en/xr-accessibility.md) | Confirmation that sound, captions, and the transcript all work without WebGL, and that nothing autoplays |
| 13 | [`tests/checklist.md`](tests/checklist.md) | A finished, story-telling exhibit |
| 14 | One challenge extension, then **Submitting your work** | Your chosen extension, and the exhibit ready to submit |

### Step 1: `PositionalAudio` and its distance settings (TODO 1)

`THREE.PositionalAudio` wraps the Web Audio API's `PannerNode`. `setRefDistance(1.2)` sets the distance, in this scene's own metres, at which a sound plays at its recorded volume; `setRolloffFactor(1.5)` controls how quickly it fades beyond that; `setMaxDistance(10)` clamps how far the distance calculation goes (all three verified directly against three.js r186's own source, `src/audio/PositionalAudio.js`). `setDistanceModel('inverse')` chooses `'inverse'`, the Web Audio API's own default (verified on MDN's `PannerNode` reference), out of the three models it defines.

### Step 2: attaching a sound to its pedestal (TODO 2)

`THREE.Audio` and its subclasses are `Object3D` instances, exactly like a mesh or a light. `mesh.add(sound)` makes the sound a child of that pedestal's mesh: every frame, three.js reads the sound's world position straight from its parent's `matrixWorld`, the same mechanism a light or a camera uses, and passes it to the underlying `PannerNode`.

### Step 3: the `AudioListener` (TODO 3)

An `AudioListener` represents the "ears" in the scene: the point every `PositionalAudio` measures its distance and direction from. `camera.add(listener)` keeps it exactly where the viewer is looking from, on the desktop view and inside a WebXR headset alike, with no extra code needed for either mode.

### Step 4: starting audio from a real click (TODO 4)

Browsers start every `AudioContext` **suspended** until a genuine user gesture resumes it; three.js's own source does not call `resume()` for you (verified in r186's `src/audio/Audio.js`). This lesson's own rule, "nothing plays sound until you ask it to", happens to need exactly the same thing: calling `listener.context.resume()` and then `play()` on every sound, all inside one button's `click` handler.

### Step 5: comparing distance models (TODO 5)

Calling `setDistanceModel()` again on an already-playing sound changes its behaviour immediately: nothing needs to be stopped or restarted. Wiring the `<select>`'s `change` event to call it on every pedestal sound turns the three distance models from a definition you read into something you can hear the difference between, live, while walking around the exhibit.

### Step 6: the story screen's canvas (TODO 6)

`THREE.CanvasTexture` does not watch its own canvas: after every draw, `texture.needsUpdate = true` tells three.js to re-upload the pixels to the GPU before the next frame. Without that line, whatever was drawn first stays on the screen forever. A real `THREE.VideoTexture` does not need this line at all: it checks the video element's own `readyState` each frame instead (see r186's `src/textures/VideoTexture.js`), which is the main practical difference between the two, explored further in the Explorer challenge.

### Step 7: reading captions with `cuechange` (TODO 7)

A `<track>` element's `TextTrack` defaults to `mode: 'disabled'`, which loads nothing at all. Setting `track.mode = 'hidden'` loads its cues and fires `cuechange` whenever the set of currently active cues changes, without also turning on the browser's own caption rendering, which this lesson does not use: it has its own caption paragraph and canvas text instead.

### Step 8: the transcript, from the same cues (TODO 8)

A `<track>`'s cues are not available the instant the element exists in the DOM. The `'load'` event on the `<track>` element itself, not the `<audio>` element, fires once its WebVTT file has actually been fetched and parsed; that is the moment to read `track.cues` and build the transcript's list items.

### Step 9: hooking the story screen into the render loop (TODO 9)

`app.js`'s `onFrame()` lets any module register a function to run once per rendered frame, desktop or XR, without needing a reference to the renderer or its own render loop. `video.js`'s `drawFrame()` is registered this way from `main.js`, which keeps `app.js` in charge of exactly one render loop, the same principle 4.1 already established for the XR frame loop itself.

### Step 10: the scene description reports it all (TODO 10)

`describeExhibit()` already told a screen-reader user what was in the exhibit. Now it also needs to say whether the pedestal sounds are playing, which distance model is currently chosen, and what the story screen's caption currently reads, so a learner who cannot see the canvas or hear the audio still knows exactly what state the scene is in.

## Key code explained

**`new THREE.PositionalAudio(listener)`** creates a spatial sound that must be given a buffer (`setBuffer()`) before it can play, and must be a descendant of some `Object3D` to have a meaningful position; a `PositionalAudio` with no parent behaves as if it were at the scene's origin.

**`listener.context.resume()`** resumes the shared Web Audio `AudioContext` that every `THREE.Audio` and `THREE.PositionalAudio` in a scene shares through their common `AudioListener`; it must be called from inside a real user gesture, and three.js never calls it for you.

**`texture.needsUpdate = true`** is what makes a `CanvasTexture` (or any texture whose source keeps changing) actually reach the GPU again; `VideoTexture` sets this for you automatically, once per frame, whenever the underlying `<video>` has a new frame ready.

**`track.mode = 'hidden'`** loads a `<track>`'s cues and fires its events without drawing the browser's own caption overlay; `'showing'` would draw that overlay too (useful for a real `<video>`, not used by this lesson's `<audio>`), and the default, `'disabled'`, loads nothing at all.

**`track.activeCues`** is a live list of every `VTTCue` currently "on screen" at the audio's current time; for a caption file with no overlapping cues, like this lesson's, it holds at most one cue.

## 3D and XR accessibility

- The scene description (`#scene-description`) reports the pedestal sounds' state, the chosen distance model, and the story screen's current caption, alongside everything 4.1 already described.
- No sound plays automatically: the pedestal sounds and the audio guide both wait for a real click, either on "Start pedestal sounds" or on the audio guide's own native play button.
- The camera never moves on its own, and nothing about spatial audio changes that: `PositionalAudio` only changes volume and stereo balance, never anyone's viewpoint.
- Every action available through sound (hearing which pedestal is closer) has a full, equally capable alternative in text: the always-present exhibit list, caption paragraph, and transcript.
- With reduced motion on, the jade stone's spin and the story screen's own animation both start paused; this has no effect on sound, since the reduced-motion preference is about movement, not audio.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| No audio plays automatically; a click is always required first | Good practice | Autoplaying sound is disorienting, especially with headphones or a headset, and some learners rely on their own screen-reader audio, which competing sound would drown out. |
| The audio guide has a synchronized text alternative (captions) | 1.2.2 | The `<track kind="captions">` element gives a text alternative for the guide's audio content, timed to it. |
| A full transcript exists, independent of whether the audio has ever played | 1.2.1 | The transcript in `#transcript` carries the same information as the audio guide, for anyone who cannot or does not want to play audio. |
| The caption paragraph (`#caption-text`) is a live region | Good practice | A screen-reader user hears each caption change as it happens, without needing to keep re-reading the page. |
| Sound state and distance-model changes are reflected in the scene description | Good practice | A learner who cannot see the exhibit or the controls still has one place that says exactly what is happening. |
| The story screen's animation respects `prefers-reduced-motion`, and a Pause button controls it | 2.2.2 | A screen that keeps moving on its own can be distracting or uncomfortable for some learners; both the automatic check and the manual button give control back. |

## Performance considerations

Decoding three short `.wav` files and one longer one is cheap: together they are under 1.5 MB, decoded once by the Web Audio API and then looped or played from memory, not streamed. Redrawing a 512×288 canvas once per frame and re-uploading it as a texture is a small, constant cost, well within what a phone-class GPU handles alongside three plain-primitive meshes; a much larger canvas, or updating several such textures at once, is where this approach would start to cost more than a real video does. Three.js already updates every `PositionalAudio`'s position from its parent's `matrixWorld` as part of the same matrix updates the renderer does every frame regardless, so spatial audio itself adds no extra per-frame traversal of the scene graph.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Calling `sound.play()` before the `AudioContext` has been resumed | The call succeeds without an error, but nothing is heard | Call `listener.context.resume()` first, inside the same click handler |
| Forgetting `mesh.add(sound)` | The sound plays at the same volume everywhere, since it measures distance from the scene's origin | Attach every `PositionalAudio` to the object it should sound like it is coming from |
| Leaving a `<track>`'s `mode` at its default | `cuechange` never fires, and `track.cues` stays empty | Set `track.mode = 'hidden'` (or `'showing'`) before relying on either |
| Forgetting `texture.needsUpdate = true` after drawing on a `CanvasTexture`'s canvas | The screen shows only the very first frame, forever | Set it every time, right after the draw calls that changed the canvas |
| Writing captions that describe speech the audio does not actually contain | Captions mislead a learner about what they are hearing | Say plainly, as this project's own `ATTRIBUTION.md` does, when audio is not real speech |
| Reading `track.cues` immediately after creating a `<track>` element | The list is empty; the file has not loaded yet | Wait for the `<track>`'s own `'load'` event, or check `readyState === 2` |

## Troubleshooting

**Pressing "Start pedestal sounds" makes no sound, with no error.** The `AudioContext` is probably still suspended. Check that `listener.context.resume()` runs before `play()`, inside the click handler itself. In Firefox, check `about:preferences#privacy` has not blocked autoplay for the whole site; a direct click should still be allowed either way.

**Sounds play at full volume everywhere, with no distance effect.** Check that `mesh.add(sound)` ran for every pedestal (TODO 2), and that the sound is not still parented to the scene itself.

**The caption paragraph never updates.** Check `track.mode` is set to `'hidden'`, not left at its default; DevTools' Elements panel can show a `<track>`'s current `readyState` and `mode` if you inspect it directly.

**The transcript stays empty.** The `<track>`'s `'load'` event may have already fired before your listener was attached, especially on a fast local server. Check the `readyState === 2` fallback in `buildTranscript()`.

**The story screen shows only one frame, or is blank.** Check `texture.needsUpdate = true` runs after every draw in `drawFrame()`, and that `app.onFrame()` is actually calling it (TODO 9): a common mistake is filling in `drawFrame()` correctly but forgetting to wire it into the render loop at all.

**On Safari, the audio guide's captions button does not appear.** This is expected: Safari's native caption menu on `<audio>` (as opposed to `<video>`) is limited. This lesson does not depend on it: the caption paragraph and transcript are read directly from the same `<track>`'s cues in JavaScript, and work the same in every current browser.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: give the story screen its own quiet spatial sound, attached to it the same way the pedestals' sounds are attached to them.
2. **[Creative](challenges/challenge-2.md)**: add a second caption track in your own language, and regenerate one pedestal's sound with parameters that mean something to you.
3. **[Explorer](challenges/challenge-3.md)**: replace the canvas-driven story screen with a real `THREE.VideoTexture`, using a short clip of your own.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take screenshots: the exhibit before any sound is started, the audio guide playing with its caption visible, the transcript, and your chosen challenge extension.
3. Keep them, and this project, in your learner journal and portfolio. When the XR Camp community opens, share them there.
4. In your journal, answer: why does an `AudioContext` start suspended, and what could go wrong for a learner if a real project ignored that and tried to play sound the moment its page loaded?

## Further reading

- [W3C: Web Audio API](https://www.w3.org/TR/webaudio/)
- [MDN: Web Audio spatialization basics](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Web_audio_spatialization_basics)
- [MDN: `PannerNode`](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode)
- [W3C: WebVTT: The Web Video Text Tracks Format](https://www.w3.org/TR/webvtt1/)
- [three.js docs: `PositionalAudio`](https://threejs.org/docs/#api/en/audio/PositionalAudio)

## Women to Know

**Nonny de la Peña** is an American journalist widely credited with creating "immersive journalism". Her *Hunger in Los Angeles* was the first VR documentary and New Frontier's first VR piece at Sundance, in 2012; she went on to found Emblematic Group, and is now founding director of Arizona State University's Narrative and Emerging Media program.

Her work put a real story, told with sound and a scene around the viewer, at the centre of what a headset could be for, years before this lesson's own tools existed. The captions, transcript, and quiet spatial sounds you built here are small, present-day pieces of the same idea: presence and story, working together, and always with a way in for anyone who cannot, or would rather not, rely on the audio alone.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

The **Web Audio API**, behind every `AudioContext`, `PannerNode`, and this lesson's `THREE.PositionalAudio`, is published by the W3C's Web Audio Working Group; as of mid-2026 it is a Working Draft on the Recommendation track, not yet a finished Recommendation. **WebVTT**, the caption file format behind `assets/captions.vtt` and the `<track>` element, is published by the W3C's Timed Text Working Group, and is further along: a Candidate Recommendation Draft. Three.js implements both underlying web platform features rather than inventing its own: `PositionalAudio` is a thin wrapper around the standard `PannerNode`, and `<track>`'s `TextTrack` API is used directly, unchanged, in `captions.js`.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
