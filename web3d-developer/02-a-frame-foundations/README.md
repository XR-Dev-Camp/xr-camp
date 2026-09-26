# A-Frame Foundations

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `web3d-developer` · **Lesson:** `a-frame-foundations-02` · **Time:** about 12 hours · 16 sessions of 45 minutes · about 4 weeks at 4 sessions a week

---

> Build a browser-based 3D Hello World environment.

---

## Learning objectives

By the end of this project you will be able to:

1. Explain A-Frame's **entity-component system**: every object is an **entity** (an `<a-entity>`), and everything it can do or show comes from the **components** attached to it, each with its own **properties**.
2. Use **primitives** (`<a-box>`, `<a-plane>`, `<a-sky>`, `<a-text>`, and others) as shortcuts that set up several components for you.
3. **Preload** images and audio with `<a-assets>`, and choose a sensible `timeout`.
4. Apply an **image texture** to a primitive with the `material` component.
5. Show **text** with the `text` component, and state exactly which characters its default font can and cannot show.
6. Draw a **canvas-based text texture** for languages the default font cannot show, and explain when to use one.
7. Add **audio** that never plays on its own, with a visible, labelled control to start and stop it.
8. Explain how **`<a-video>`** works, without needing a video file to prove it.
9. Light a scene, and add a **sky** and a **floor**.
10. Set up a **camera** with `look-controls`, turn off `wasd-controls` on purpose, and explain why, in terms of comfort.
11. Explain when a **WebXR "Enter VR" button** appears, and test with a free emulator.
12. Build an always-present **2D fallback** and a **no-WebGL message**, so the room's information never lives only in the picture.

## Prerequisites

- **Web3D Fundamentals (3.1)**, especially the scene graph, cameras, lights, and materials, and your `analysis.md` choice of A-Frame for the virtual exhibit.
- **My XR Camp**, Phase 2's own small app (course map, dashboard, session planner): the same pattern of building one thing across several lessons continues here, with the virtual exhibit instead.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A modern browser with WebGL | The room, and its 2D controls | Free |
| VS Code and a local server | A-Frame's assets need `http://`, not `file://` | Free |
| [Immersive Web Emulator](https://chromewebstore.google.com/detail/immersive-web-emulator/cgffilbpcibhmcfbgggfhfolhkfbhmik) (a free browser extension) | Try VR mode without owning a headset | Free |

A-Frame loads from `aframe.io`, and its default font loads separately from `cdn.aframe.io` **at runtime, every time the scene starts**. If either is slow or blocked where you are (this happens in mainland China), the room itself still loads, but its English and Spanish text panels will not appear until the font arrives, or at all if it never does. The Chinese panel in this lesson does not have this problem, because it is drawn on a `<canvas>` instead: one more reason canvas-drawn text is worth learning.

## What you will build

The virtual exhibit's **first room**: a 3D Hello World environment, built entirely from A-Frame primitives. Ana, the learner in lesson 3.1's `analysis.md`, chose "A-Frame first, then three.js" for exactly this reason: A-Frame lets her build a room like this quickly, in HTML she already knows.

The room has a sky, a floor, a pedestal, three welcome panels in English, Spanish, and Chinese, and a sound marker with a calm loop that only plays when asked. A 2D panel beside it lists everything in words and gives a "Look at" button for each stop, so the whole room is reachable without ever touching the 3D view.

The reference solution is in [`completed/`](completed/). The starter has the page, the styles, and the controls; you write the room itself and the logic that connects it: fifteen TODOs, split between `index.html` (the entities) and `main.js` (the interaction).

## Folder guide

```text
02-a-frame-foundations/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html        # The room: TODOs 1–9
│   ├── main.js            # The interaction: TODOs 10–15
│   └── styles.css         # Finished
├── completed/            # Reference solution: open this last
├── challenges/            # Three challenges: Foundation is required
├── tests/checklist.md     # Self-review before you submit
├── assets/                # The woven-pattern texture and the calm-loop audio
└── screenshots/
```

## Setup

1. In your `virtual-exhibit` folder (started in lesson 3.1), add this lesson's starter files: `index.html`, `main.js`, and `styles.css`, in their own `02-a-frame-foundations` subfolder, alongside a copy of this project's `assets/`.
2. Start your local server, and open `index.html`. The room's sky and floor will be missing until you write TODOs 1–3: that is expected.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; Step 1: entities, components, and primitives (concept) | You can name the three ideas behind every A-Frame tag |
| 2 | Step 2: preloading with `<a-assets>` (TODO 1) | Assets ready before the scene needs them |
| 3 | Step 3: sky, lights, and the floor (TODO 2) | A room with a floor and light |
| 4 | Step 4: the floor's texture, and a primitive with a texture (TODOs 3–4) | Your first image texture, in one tag |
| 5 | Step 5: text panels in English and Spanish (TODOs 5–6) | Two welcome panels, in two languages |
| 6 | Step 6: multilingual text, what the default font cannot show | You know exactly which characters the default font drops |
| 7 | Step 6, continued: a canvas-drawn text texture (TODOs 7, 11) | A Chinese welcome panel that actually shows |
| 8 | Step 7: audio that never autoplays (TODO 8) | A sound marker, silent until asked |
| 9 | Step 7, continued: the Play sound button (TODO 14) | A working, accessible sound toggle |
| 10 | Step 8: video, the optional step | You know how you would add your own clip later |
| 11 | Step 9: the camera, and a comfort note (TODO 9) | You can look around the room |
| 12 | Step 10: the room as data (TODO 10) | `exhibitData` drives the list and the buttons |
| 13 | Step 10, continued: the list and the buttons (TODO 12) | An accessible 2D twin of the room |
| 14 | Step 11: a keyboard route into 3D (TODO 13) | Every stop reachable by keyboard, instantly under reduced motion |
| 15 | Step 12: XR mode, and no WebGL (TODO 15) | Tested with the Immersive Web Emulator; a message if WebGL is missing |
| 16 | [`tests/checklist.md`](tests/checklist.md); one challenge extension; **Submitting your work** | The exhibit's first room, finished |

### Step 1: entities, components, and primitives

Everything in an A-Frame scene is an **entity**: an `<a-entity>`, or nothing at all by itself. What an entity does or shows comes entirely from its **components**, each with its own **properties**, written as `component="property: value; property: value"`:

```html
<a-entity geometry="primitive: box; width: 1; height: 1; depth: 1"
          material="color: #5b2a86"
          position="0 0.5 -2"></a-entity>
```

This is exactly the same entity as:

```html
<a-box color="#5b2a86" position="0 0.5 -2"></a-box>
```

`<a-box>` is a **primitive**: a shortcut tag that sets up the `geometry` and `material` components for you, with sensible defaults. `<a-sky>`, `<a-plane>`, `<a-text>`, `<a-camera>`, and `<a-sound>` are the same idea. Primitives are not a different technology from entities and components: they are the same system, written more briefly. You will use both in this lesson: primitives for the room's simple shapes, and `<a-entity>` with explicit components for the two panels that need one component A-Frame has no primitive for (the sound marker, and the canvas-textured Chinese panel).

### Step 2: preloading with `<a-assets>` (TODO 1)

`<a-assets>` is a primitive too: a place to declare images, audio, and video once, by `id`, so A-Frame can load them **before** the scene needs them, instead of a texture popping in half-drawn or a sound starting late:

```html
<a-assets timeout="10000">
  <img id="woven" src="../assets/woven-pattern.png">
  <audio id="calm-loop" src="../assets/calm-loop.wav"></audio>
</a-assets>
```

Anything else in the scene can then refer to `#woven` or `#calm-loop` instead of the file path again. `timeout` is how long A-Frame waits for every asset before giving up and showing the scene anyway (the default is 3 seconds): on a slow connection, 3 seconds is often not enough, so this lesson sets it to 10.

### Step 3: sky, lights, and the floor (TODO 2)

`<a-sky>` is a giant sphere around the whole scene, coloured (or textured) on the inside. A flat pale colour is enough for a first room. Light it with the same two kinds of light from lesson 3.1: an **ambient** light so shadowed sides are not pure black, and one **directional** light so surfaces show their shape.

### Step 4: a texture on the floor and the pedestal (TODOs 3–4)

The `material` component's `src` property takes an asset reference and uses it as a texture, the same idea as a material's colour, but from an image instead of one flat value:

```html
<a-plane rotation="-90 0 0" width="6" height="6" material="src: #woven; repeat: 4 4"></a-plane>
```

`repeat: 4 4` tiles the image four times across and four times down, so a small, simple texture (this lesson's is 512 × 512 pixels, a few kilobytes) can cover a large floor without looking stretched. The pedestal in TODO 4 uses the same texture on an `<a-box>`, with no `repeat` needed at that size.

The texture itself, `assets/woven-pattern.png`, is a small SVG pattern made for XR Camp, turned into a PNG with a headless-browser screenshot (see [`ATTRIBUTION.md`](ATTRIBUTION.md)). Any image you use as a texture must stay under the 1 MB budget in [`docs/en/3d-assets-and-versions.md`](../../docs/en/3d-assets-and-versions.md): this one is about 2.5 KB.

### Step 5: text panels in English and Spanish (TODOs 5–6)

`<a-text>` is a primitive built on the `text` component:

```html
<a-text value="Welcome to the exhibit" align="center" width="2.4" color="#3f1d5e"></a-text>
```

`width` controls how large the text renders (and where it wraps), not a box around it. Write the English panel, then a Spanish one with plain letters only, for now: the next step explains why.

### Step 6: multilingual text: what the default font can and cannot show

**A-Frame's `text` component draws with one built-in font atlas** (Roboto, in an MSDF format, loaded from `cdn.aframe.io` at runtime): a texture holding a fixed, small set of glyphs, chosen to keep that texture small. This lesson tested it directly, rendering strings in a real A-Frame scene and reading the result pixel by pixel:

| Characters | Shown? |
| --- | --- |
| Plain Latin letters (`a`–`z`, `A`–`Z`), digits, basic punctuation | Yes |
| Spanish accented vowels: `á é í ó ú Á É Í Ó Ú` | **No.** Each one is silently dropped: the letter simply vanishes, with no box or placeholder. |
| `ñ Ñ ü Ü ¿ ¡` | **No,** dropped the same way. |
| Chinese characters (for example `你好`) | **No.** The whole run of CJK characters is dropped. |

This means a Spanish label like "sesión" renders as "sesin", and "diseño" as "diseo" — worse than simply failing to appear, because it looks like a typo rather than a missing feature. **Never write Spanish text with accents or "ñ" into an `<a-text value="...">`.** Either avoid the character (as this lesson's Spanish panel does, deliberately) or draw it as a texture, the same way as Chinese, in the next step.

### Step 6, continued: a canvas-drawn text texture (TODOs 7, 11)

A `<canvas>` has no such limit: `CanvasRenderingContext2D.fillText()` uses the browser's own font engine, the same one that draws every web page, so it can draw any language the operating system has a font for, including Chinese, and Spanish with every accent. TODO 11 draws the Chinese label this way:

```js
const canvas = document.createElement('canvas');
canvas.width = 512;
canvas.height = 256;
const ctx = canvas.getContext('2d');
ctx.font = '600 72px "PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif';
ctx.fillText('欢迎光临', canvas.width / 2, canvas.height / 2);
```

Then it becomes a texture, applied to a plain entity's material, the same way an image would:

```js
const texture = new AFRAME.THREE.CanvasTexture(canvas);
entity.getObject3D('mesh').material.map = texture;
```

This lesson verified the result the same way it tested the default font: by rendering the finished panel in a real browser and reading it back. It shows correctly. A canvas texture also side-steps the `cdn.aframe.io` dependency entirely, since it uses fonts already installed on the device rather than downloading one: one more reason it is the right tool here, not only for the characters it can draw.

### Step 7: audio that never autoplays (TODO 8), and the Play sound button (TODO 14)

The `sound` component plays audio attached to an entity:

```html
<a-entity sound="src: #calm-loop; autoplay: false; loop: true; volume: 0.7"></a-entity>
```

**`autoplay` must stay `false`.** Sound that starts without being asked for is a WCAG failure (1.4.2, Audio Control) and can be startling, especially to someone using a screen reader, whose own speech it would compete with. TODO 14 gives the only way to start it: a real `<button>`, with `aria-pressed` reflecting whether it is playing, so a screen reader announces "pressed" or "not pressed" and the label always matches reality.

The loop itself (`assets/calm-loop.wav`) was generated, not recorded: a short, quiet, two-tone pad, built in Python with `wave` and `numpy`, faded in and out so it loops without a click, mono at 22 050 Hz to keep the file small (about 345 KB, well under the 2 MB audio budget).

### Step 8: video, the optional step

A-Frame's video primitive is `<a-video>`, and it works exactly like the image texture in Step 4, except the source is a `<video>` element in `<a-assets>`:

```html
<a-assets>
  <video id="my-clip" src="my-clip.mp4" muted playsinline></video>
</a-assets>
<a-video src="#my-clip" width="1.6" height="0.9" position="0 1.2 -2"></a-video>
```

This room ships with **no video file**, so there is nothing here that can arrive broken on your machine. When you have a short clip of your own, [Challenge 3](challenges/challenge-3.md) walks through adding it, including captions in the 2D fallback with `<track kind="captions">` on a plain `<video>` element, since `<a-video>` itself has no caption support: the 2D version of the clip is where captions belong.

### Step 9: the camera, and a comfort note (TODO 9)

```html
<a-camera position="0 1.6 1.6" look-controls wasd-controls="enabled: false"></a-camera>
```

`look-controls` lets the learner look around with a mouse, a finger, or a headset's own tracking. `wasd-controls` is A-Frame's built-in walk-around-with-the-keyboard component, and this room turns it off on purpose.

**Comfort note:** when a viewpoint moves through a scene while the body stays still, it can cause **vection**, a mismatch between what the eyes see and what the inner ear feels, which is a common cause of VR motion sickness. A room the learner only ever turns to look around in, never walks through, has nothing that can cause it. Phase 3's later lessons introduce movement carefully, once there is a reason to; this first room does not need it.

### Step 10: the room as data (TODO 10), the list, and the buttons (TODO 12)

One array, `exhibitData`, describes every stop in the room: its `id`, a short `label`, and a `description`. The 2D list and the "Look at" buttons are both built from this one array, so they can never fall out of sync with each other, the way separately hand-written HTML could.

### Step 11: a keyboard route into 3D (TODO 13)

A 3D view that only responds to dragging the mouse has no keyboard route at all. This room's route is the "Look at" buttons: real `<button>` elements, reachable with Tab and activated with Enter or Space, exactly like any other button on the web.

Turning the camera from code is the one genuinely tricky part of this lesson: setting an entity's `rotation` attribute directly does not work, because `look-controls` recalculates the camera's rotation every frame from its own internal `yawObject` and `pitchObject`, to track the mouse or a headset. TODO 13 writes to those two objects instead, computed with `THREE.Matrix4().lookAt()` and `THREE.Euler().setFromRotationMatrix(matrix, 'YXZ')`, exactly the same job `look-controls` already does for mouse movement, aimed at a target instead.

**When the learner has asked for reduced motion**, the turn happens in a single frame, instantly: nothing here is decorative, so nothing here needs to animate. Otherwise, it turns smoothly over about a third of a second, so the room's layout stays understandable rather than jumping.

### Step 12: XR mode, and no WebGL (TODO 15)

A-Frame adds an "Enter VR" button to the scene automatically, but **only when the browser reports that WebXR is available**: on a phone or laptop with no headset connected, it simply does not appear, and nothing else about the page needs to change for that. Test it with the free [Immersive Web Emulator](https://chromewebstore.google.com/detail/immersive-web-emulator/cgffilbpcibhmcfbgggfhfolhkfbhmik) browser extension, which adds a virtual headset and controllers to any WebXR page without owning real hardware.

At the other end, some browsers have no WebGL at all. TODO 15 checks for it directly and, if it is missing, hides the 3D box and shows a plain message, while the 2D list above keeps working exactly as before: nothing about this room's information depends on 3D succeeding.

## Key code explained

**`<a-assets timeout="10000">`** waits up to 10 seconds for every declared asset before showing the scene regardless; the default is 3 seconds.

**`material="src: #woven; repeat: 4 4"`** applies an asset as a texture and tiles it 4 times in each direction.

**`AFRAME.THREE`** is how a plain `<script>` (not a module) reaches the exact three.js build A-Frame ships with, without adding a second import map.

**`entity.getObject3D('mesh')`** returns the underlying three.js `Mesh` for a primitive or a `geometry` + `material` entity, which is what a canvas texture attaches to.

**`lookControls.yawObject.rotation.y` and `.pitchObject.rotation.x`** are the two rotations `look-controls` actually reads every frame; setting an entity's `rotation` attribute directly is overwritten on the next frame.

**`marker.components.sound.playSound()` / `.stopSound()`** start and stop a `sound` component from code, exactly as the Play button does.

## 3D and XR accessibility

This whole lesson is a 3D lesson, so its accessibility is built in rather than a separate moment:

- The room has a **scene description**, and an always-present 2D list built from the same data as the "Look at" buttons.
- Every 3D interaction (looking at a stop, playing the sound) also has a real, labelled `<button>`.
- **Nothing moves unless the learner asks it to.** The camera never walks, and "Look at" turns instantly under reduced motion.
- **Sound never plays on its own**, and its button always shows its current state with `aria-pressed`.
- **A no-WebGL message** keeps the room's information available even when the 3D view cannot run.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| A text description of the room, and a full 2D list of its contents | 1.1.1, 1.3.1 | The picture's information is also in words, always, not only when 3D fails. |
| Every 3D interaction has a real, labelled button | 2.1.1, 4.1.2 | The keyboard reaches everything a mouse can reach. |
| The "Look at" buttons show which stop is active with `aria-pressed` | 4.1.2 | A screen reader announces the current state, not just the label. |
| Sound never autoplays, and its button shows its state | 1.4.2, 4.1.2 | Nothing starts speaking over a screen reader uninvited. |
| The camera never moves unless the learner moves it; "Look at" is instant under reduced motion | 2.2.2, 2.3.3 | No motion to stop, and no motion sickness. |
| The page never scrolls sideways on a phone | 1.4.10 | The room sits above the controls on narrow screens. |

## Performance considerations

The woven-pattern texture is about 2.5 KB and the calm-loop audio about 345 KB: both are small enough that the "download cost" lesson from 3.1 barely applies here, which is the point of using small, self-made assets rather than found photography or recorded audio. `<a-assets>` still matters even for small files: without it, the floor's texture could pop in a frame or two after the floor itself.

The canvas-drawn Chinese label costs one small `<canvas>` element and one texture upload, created once, when the scene finishes loading, not every frame: draw it once and reuse the texture, exactly as this lesson's code does.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Accented Spanish or Chinese text in `<a-text value="...">` | The characters silently vanish | Draw them on a canvas texture instead |
| `sound="autoplay: true"` | Sound starts without being asked for (fails WCAG 1.4.2) | Always `autoplay: false`, with a button |
| Setting an entity's `rotation` to "look at" something | Snaps back next frame | Write to `look-controls`'s `yawObject`/`pitchObject` instead |
| Forgetting `wasd-controls="enabled: false"` | The keyboard silently walks the camera through the room | Turn it off when the room has no reason to be walked through |
| A texture with no `<a-assets>` entry | It can pop in after the shape already appears | Preload it, and give it an id |
| Assuming `cdn.aframe.io` always loads | Text panels are blank where that CDN is slow or blocked | Prefer canvas textures for text that must always appear |

## Troubleshooting

**The room is blank, but the sky shows.** TODOs 3–4 (the floor and the pedestal) are likely missing, or their `material="src: ..."` refers to an asset id that does not match the one in `<a-assets>`.

**The English or Spanish text never appears, only on some networks.** `cdn.aframe.io`, which hosts the default font, is slow or blocked there. This is expected on some connections; see "Required tools" above.

**The Chinese panel is a plain white or grey rectangle.** `applyLabelTexture` ran before the scene's entities existed. Wait for the scene's `loaded` event, as the starter's `init()` already does.

**"Look at" turns the view once, then it drifts or snaps back.** Something is still writing to the entity's `rotation` attribute directly (perhaps from an earlier attempt) instead of to `look-controls`'s internal objects.

**The VR button never appears.** That is correct on a browser or device with no WebXR support. Install the Immersive Web Emulator to test it without a headset.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: add a fourth "Look at" stop of your own, built from a primitive.
2. **[Creative](challenges/challenge-2.md)**: replace the woven pattern with a texture pattern from your own culture, and one welcome-panel language of your own.
3. **[Explorer](challenges/challenge-3.md)**: add a short video clip of your own with `<a-video>`, with captions in its 2D fallback.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take a screenshot of the room, one of the "Look at" buttons with one pressed, and one of the no-WebGL message (you can trigger it by disabling hardware acceleration temporarily).
3. Keep them in your learner journal and portfolio, alongside lesson 3.1's screenshots: this room is the next page of the same exhibit.
4. In your journal, answer: which exhibit stop would you replace with something from your own culture or language, and why?

## Further reading

- [A-Frame: Introduction](https://aframe.io/docs/1.8.0/introduction/)
- [A-Frame: text component](https://aframe.io/docs/1.8.0/components/text.html)
- [A-Frame: sound component](https://aframe.io/docs/1.8.0/components/sound.html)
- [A-Frame: a-assets](https://aframe.io/docs/1.8.0/core/asset-management-system.html)
- [MDN: WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)
- [W3C: XR Accessibility User Requirements](https://www.w3.org/TR/xaur/)

## Women to Know

**Liv Erickson** was the product manager for **Mozilla Hubs**, an open-source, browser-based social VR platform built with A-Frame and three.js on WebGL, which ran on VR headsets, phones, and desktops. (Mozilla has since ended Hubs.) She is now Mozilla's Ecosystem Development Lead.

The room you just built uses the same two technologies Hubs was built on: A-Frame, written as HTML, sitting on top of three.js. Hubs took that same idea, a room made of primitives and components, and let people walk into it together, from a browser, with no headset required to join.

_Facts from public sources, checked 2026. Spotted an error? [Tell us](https://github.com/XR-Dev-Camp/xr-camp/issues)._

## Standards spotlight

The **WebXR Device API** is what lets a browser offer this room in VR at all: it is developed by the **W3C's Immersive Web Working Group**, and it is what A-Frame's automatic "Enter VR" button is built on. It defines how a web page asks for an XR session, gets a headset's and controllers' positions, and renders a stereoscopic view, the same way regardless of which headset or browser the learner uses. Like WebGL and WebGPU in lesson 3.1, it is a standard, not a library: A-Frame is the open-source project built on top of it, which is why XR Camp pins A-Frame's version, but not the API itself.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
