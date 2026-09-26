# Advanced A-Frame and Interaction

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `web3d-developer` · **Lesson:** `advanced-a-frame-and-interaction-03` · **Time:** about 14 hours · 19 sessions of 45 minutes · about 5 weeks at 4 sessions a week

---

> Build an interactive virtual museum, cultural exhibit, or learning experience.

---

## Learning objectives

By the end of this project you will be able to:

1. Write a custom **A-Frame component**, with its own `schema`, `init()`, `update()`, `tick()`, and `remove()` lifecycle methods.
2. Communicate between a component and the rest of the page with **`el.emit()`** and **`el.addEventListener()`**, including bubbling custom events.
3. Wire up the **`cursor`** component for mouse and touch input (`rayOrigin: mouse`), and explain when a **gaze/fuse cursor** is the better choice, and its accessibility cost.
4. Configure a **`raycaster`** to test only a chosen set of entities, with `objects: .interactive`.
5. Add **`laser-controls`** so a VR controller can select the same exhibits, with no extra code, and test it with the Immersive Web Emulator.
6. Drive the **`animation`** component from an event, so an exhibit turns or lifts only when it is selected, never on its own.
7. Build an HTML **info panel** that stays in sync with the 3D scene, using one shared function for every input method.
8. Add **positional audio** with the `sound` component (`positional: true`), started only by a button, never automatically.
9. Explain the **comfort** rules this lesson follows: no forced camera movement, and instant transitions under reduced motion.

## Prerequisites

- **A-Frame Foundations (3.2)**: the entity-component system, primitives, `<a-assets>`, the `sound` and `text` components, and your working `completed/` room, which this lesson continues directly.
- **My XR Camp**, Phase 2's own small app (course map, dashboard, session planner): the same pattern of building one thing across several lessons continues here, with the virtual exhibit.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A modern browser with WebGL | The room, and its 2D controls | Free |
| VS Code and a local server | A-Frame's assets need `http://`, not `file://` | Free |
| [Immersive Web Emulator](https://chromewebstore.google.com/detail/immersive-web-emulator/cgffilbpcibhmcfbgggfhfolhkfbhmik) browser extension | Test `laser-controls` and VR mode without owning a headset | Free |

## What you will build

Your exhibit's first room (3.2) gains a second stop and, more importantly, a reason to click on anything in it. You will write one custom A-Frame component, `interactive-exhibit`, and attach it to every exhibit stop; write one shared function, `selectExhibit()`, that a mouse click, a finger tap, a VR controller's trigger, and a keyboard button all call; and build an info panel that reacts to whichever one fired.

The reference solution is in [`completed/`](completed/). `starter/main.js` has 18 numbered TODOs; three of them (TODOs 4, 10, and 15) are small HTML changes in `starter/index.html`, marked there with matching comments.

## Folder guide

```text
03-advanced-a-frame-and-interaction/
├── README.md
├── starter/        # begin here
├── completed/      # reference solution
├── challenges/          # Three challenges: Foundation is required
├── tests/          # self-review checklist
├── assets/
└── screenshots/
```

## Setup

1. Open this folder in VS Code.
2. Start a local server at the repository root (for example the Live Server extension, or `python3 -m http.server 8766`), since A-Frame's `<a-assets>` and ES modules both require `http://`.
3. Open `starter/index.html` through that server. You should see the room from 3.2, with the "Select" buttons, idle-animation, and input-mode controls already visible but doing nothing yet.
4. Keep `completed/index.html` open in a second tab as a working reference, and the browser console open to catch mistakes early.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; Step 1: from 3.2's room to this lesson's room (concept) | You can point to what is new in this lesson's HTML |
| 2 | Step 2: your first custom component: the schema (TODO 2) | An `interactive-exhibit` component that accepts attributes |
| 3 | Step 3: `init()`, and events with `el.addEventListener` (TODO 3) | Hovering an exhibit highlights it |
| 4 | Step 4: the `cursor` and `raycaster` components (TODO 4) | Clicking an exhibit fires the component's `onClick` |
| 5 | Step 5: `update()`, and reacting to a changed property (TODO 5) | Selecting an exhibit toggles its `selected` state |
| 6 | Step 6: one function for every input: `selectExhibit()` (TODO 6) | A single, shared "choose this exhibit" code path |
| 7 | Step 6, continued: the keyboard route (TODO 7) | Every exhibit reachable by a real, labelled button |
| 8 | Step 7: events with `el.emit`, and the scene-level listener (TODO 8) | The info panel starts reacting to a selection |
| 9 | Step 8: the `animation` component, driven by an event (TODO 9) | The pedestal turns when selected |
| 10 | Step 8, continued: a second exhibit and a second action (TODOs 10–11) | A story lantern that lifts when selected |
| 11 | Step 9: comfort and reduced motion (concept, reviewed inside TODO 9) | You can explain why reduced motion skips the animation component entirely |
| 12 | Step 10: the info panel and the status region (TODO 12) | `#scene-description` and `#status` update on selection |
| 13 | Step 11: positional audio with `sound` (TODO 13) | A chime that plays from the bell's own position, only on request |
| 14 | Step 12: the gaze/fuse cursor, and its trade-off (TODO 14) | A working input-mode toggle, and a sentence explaining its cost |
| 15 | Step 13: `laser-controls` for VR (TODO 15) | Tested with the Immersive Web Emulator |
| 16 | Step 14: `tick()`, a self-running lifecycle method (TODO 16) | A subtle idle pulse on the selected exhibit |
| 17 | Step 15: `remove()`, and cleaning up after yourself (TODO 17) | Removing an exhibit's component leaves nothing running |
| 18 | Step 16: the Pause button (TODO 18) | A working, accessible way to stop the idle pulse by hand |
| 19 | [`tests/checklist.md`](tests/checklist.md); the Foundation challenge; **Submitting your work** | An interactive exhibit, finished |

### Step 1: from 3.2's room to this lesson's room

Open `starter/index.html` beside your own 3.2 `completed/index.html`. The sky, the lights, the floor, the woven-pattern pedestal, and the English welcome panel are unchanged. What is new: a chime bell (built from 3.2's sound marker), a place for a second exhibit, an info panel, and controls for input mode and the idle animation. None of it does anything yet — that is everything this lesson adds.

### Step 2: your first custom component: the schema (TODO 2)

```js
AFRAME.registerComponent('interactive-exhibit', {
  schema: {
    exhibitId: { type: 'string' },
    action: { type: 'string', default: 'turn', oneOf: ['turn', 'lift', 'none'] },
    selected: { type: 'boolean', default: false },
  },
  // ...
});
```

`AFRAME.registerComponent(name, definition)` teaches A-Frame a new attribute: after this call, any entity can write `interactive-exhibit="exhibitId: woven-panel; action: turn"`, and A-Frame parses that string into `this.data` inside the component, using the types and defaults the `schema` declares. This is the same mechanism the built-in `sound` and `light` components use; you are writing one of the same kind, not something separate from them.

### Step 3: `init()`, and events with `el.addEventListener` (TODO 3)

```js
init() {
  this.onClick = this.onClick.bind(this);
  this.el.addEventListener('click', this.onClick);
},
onClick() {
  selectExhibit(this.data.exhibitId);
},
```

`init()` runs exactly once, when the component first attaches to an entity: it is where you set up things that should exist for the entity's whole life, like event listeners. `this.el` is the entity the component is attached to, a real DOM element with `addEventListener` like any other. `'click'` here is not a mouse-only event: the next step explains where it actually comes from.

### Step 4: the `cursor` and `raycaster` components (TODO 4)

```html
<a-camera id="camera" cursor="rayOrigin: mouse; fuse: false"
          raycaster="objects: .interactive; far: 20"></a-camera>
```

`raycaster` casts an invisible line from the camera and reports which entities it crosses; `objects: .interactive` tells it to test only entities carrying that CSS class, so the sky, the floor, and the text panels are never candidates, which also keeps the raycast cheap. `cursor`, attached to the same entity, turns those raycaster hits into familiar DOM-style events: `mouseenter`, `mouseleave`, and `click`, on the intersected entity. `rayOrigin: mouse` means the ray follows the mouse pointer (or a finger, on touch); `fuse: false` means selecting requires an explicit click or tap, not a timed dwell. This is why TODO 3's `'click'` listener works for both a mouse and a touchscreen with no extra code: `cursor` already unified them.

### Step 5: `update()`, and reacting to a changed property (TODO 5)

```js
update(oldData) {
  if (this.data.selected === oldData.selected) return;
  this.el.classList.toggle('is-selected', this.data.selected);
  if (this.data.selected) {
    this.el.emit('exhibit-selected', { id: this.data.exhibitId }, true);
    this.playAction();
  }
},
```

`update(oldData)` runs once right after `init()`, and again every time any schema property changes, whether that change came from a click, a keyboard button, or the browser's dev tools. `oldData` is the previous `this.data`, so comparing the two tells you exactly what changed, instead of re-running every effect on every call. Guarding on `this.data.selected === oldData.selected` means the turn or lift only plays on the frame the exhibit actually becomes selected, not every time `update()` runs for an unrelated reason.

### Step 6: one function for every input: `selectExhibit()` (TODO 6)

```js
function selectExhibit(id) {
  for (const item of exhibitData) {
    const el = document.querySelector(`#${item.id}`);
    if (el) el.setAttribute('interactive-exhibit', 'selected', item.id === id);
  }
}
```

This is the whole idea of the lesson, in five lines. `setAttribute('interactive-exhibit', 'selected', true)` sets one property of an already-attached component without touching the others (`exhibitId` and `action` stay whatever they were), and it is what actually triggers TODO 5's `update()`. Whether `selectExhibit()` is called from a raycaster click, a VR controller's trigger, or a keyboard press, it runs the exact same code: not two implementations that happen to agree, one implementation with several doors into it.

### Step 7: the keyboard route (TODO 7)

```js
button.addEventListener('click', () => selectExhibit(item.id));
```

Every exhibit's "Select" button calls `selectExhibit()` directly. This is what "every 3D interaction also works from the 2D panel with the keyboard, the same `select-exhibit` code path" means concretely: it is not a second feature that happens to produce a similar result, it is the same function, called from a `<button>` instead of a cursor event.

### Step 8: events with `el.emit`, and the scene-level listener (TODO 8)

```js
this.el.emit('exhibit-selected', { id: this.data.exhibitId }, true);
```

```js
scene.addEventListener('exhibit-selected', (evt) => {
  const item = exhibitData.find((entry) => entry.id === evt.detail.id);
  if (item) updateInfoPanel(item);
});
```

`el.emit(name, detail, bubbles)` fires a custom DOM event on that entity, carrying `detail` as its payload. The third argument, `true`, makes it bubble: the event travels up through the entity tree to `<a-scene>`, exactly the way a click on a nested `<span>` bubbles up to `document`. Because it bubbles, `main.js` needs only one listener, on the scene, to hear "some exhibit was selected" from any of them, instead of one listener per exhibit.

### Step 9: the `animation` component, driven by an event (TODOs 9, 11)

```js
this.el.setAttribute('animation__turn', {
  property: 'rotation',
  to: `${x} ${y + 180} ${z}`,
  dur: 700,
  easing: 'easeOutQuad',
});
```

A-Frame's `animation` component tweens one property from its current value to `to` over `dur` milliseconds. Setting it from JavaScript, inside `playAction()`, right when an exhibit becomes selected, is what "driven by events" means here: the animation is not declared once and looped forever, it is created in reaction to `exhibit-selected`, plays once, and is done. `animation__turn` and `animation__lift` (a second one, for the story lantern) are two independently named instances of the same component on the same entity, which is why both can exist without conflicting.

**Comfort and reduced motion:** when `window.__reducedMotion` is `true`, `playAction()` skips the `animation` component completely and writes the finished rotation or position straight to `this.el.object3D` in one frame. There is nothing decorative in this turn or lift: it exists to confirm a selection, and reduced motion gets that confirmation without the motion itself.

### Step 10: the info panel and the status region (TODO 12)

```html
<p id="scene-description">…</p>
<p id="status" role="status"></p>
```

`updateInfoPanel(item)` writes to both. `#scene-description` is the always-present, readable description of what is currently selected — the same information a sighted learner sees in the room. `#status`, with `role="status"`, is a **live region**: a screen reader announces its new text automatically, without the learner needing to move focus there. Writing to both from the one place `exhibit-selected` is handled keeps them from ever disagreeing.

### Step 11: positional audio with `sound` (TODO 13)

```html
<a-sphere id="chime-bell"
          sound="src: #chime-sound; positional: true; autoplay: false; loop: false; volume: 0.9; maxDistance: 6"></a-sphere>
```

`positional: true` ties the sound's perceived direction and loudness to this entity's position in the room, through the Web Audio API's spatial panner: it gets quieter as the camera moves away, and (with stereo output) seems to come from the bell's side of the room rather than everywhere at once. `autoplay` stays `false`, exactly as in 3.2: TODO 13's "Play chime" button, shown only once the bell is selected, is the only way to start it.

### Step 12: the gaze/fuse cursor, and its trade-off (TODO 14)

```js
camera.setAttribute('cursor', {
  rayOrigin: gazeOn ? 'entity' : 'mouse',
  fuse: gazeOn,
  fuseTimeout: 1200,
});
```

`rayOrigin: 'entity'` casts the ray from the camera's own forward direction, so simply looking at an exhibit aims at it: a **gaze cursor**. `fuse: true` makes selection happen automatically after `fuseTimeout` milliseconds of holding that gaze, with no click needed at all — this is a **fuse cursor**, named for how it "fuses" a selection after a delay. This matters for headsets with no handheld controller, or for learners who cannot operate a trigger or a mouse button. **The trade-off:** a forced dwell time is a fixed, non-negotiable wait for everyone, which can be difficult for a learner with limited fine motor control (holding a view perfectly steady) or anyone who simply wants longer to decide before acting. This lesson keeps click/tap selection as the default and gaze as an explicit, visible opt-in, never the only way in.

### Step 13: `laser-controls` for VR (TODO 15)

```html
<a-entity laser-controls="hand: right" raycaster="objects: .interactive; far: 20"></a-entity>
```

`laser-controls` combines A-Frame's `tracked-controls` (reading a VR controller's position and buttons), a visible laser line, and the same cursor/raycaster machinery as Step 4, aimed from the controller instead of the camera. Pulling the trigger emits the same `'click'` event that a mouse click or a tap does, on whichever entity the laser is pointing at — which is why TODO 3's listener, written for the mouse, already works for a VR controller with no changes. Test this with the [Immersive Web Emulator](https://chromewebstore.google.com/detail/immersive-web-emulator/cgffilbpcibhmcfbgggfhfolhkfbhmik): it adds a virtual headset and two virtual controllers to any WebXR page, so you can try `laser-controls` without owning real hardware.

### Step 14: `tick()`, a self-running lifecycle method (TODO 16)

```js
tick(time) {
  if (!this.data.selected || window.__reducedMotion) return;
  const scale = 1 + Math.sin(time / 260) * 0.04;
  this.el.object3D.scale.set(scale, scale, scale);
},
```

`tick(time)` runs on every rendered frame, roughly 60 times a second, and is how A-Frame components animate things the `animation` component was not built for, like a continuous oscillation tied to elapsed time rather than a start and end value. The guard clause matters twice over: it costs nothing for the two exhibits that are not selected, and reduced motion turns it off entirely, since a gentle pulse is exactly the kind of self-running motion that setting exists to stop.

### Step 15: `remove()`, and cleaning up after yourself (TODO 17)

```js
remove() {
  this.el.removeEventListener('click', this.onClick);
  this.el.removeAttribute('animation__turn');
},
```

`remove()` runs when the component (or its whole entity) is taken out of the scene. Every listener `init()` added must be removed here, using the exact same bound function reference, or the entity keeps responding to clicks after it is supposedly gone, and every `animation` attribute this component started should be cleared, or it keeps running against a detached object. This is the reason `init()` stored `this.onClick = this.onClick.bind(this)` instead of passing an inline arrow function to `addEventListener`: you cannot remove a listener you never kept a reference to.

### Step 16: the Pause button (TODO 18)

The idle pulse from Step 14 is the only thing in this room that ever moves without a learner asking it to. `wirePauseButton()` gives it an explicit, labelled, `aria-pressed` toggle, independent of the automatic reduced-motion check: someone who has not set a system-wide reduced-motion preference can still choose to stop it by hand, at any time.

## Key code explained

**`this.el.setAttribute(componentName, property, value)`** updates one property of a component already on an entity, triggering that component's `update(oldData)` without touching its other properties.

**`el.emit(name, detail, bubbles)`** fires a custom event on an entity; `bubbles: true` lets one listener, higher up the tree (here, on `<a-scene>`), hear it from any entity that fires it.

**`raycaster="objects: .interactive"`** restricts which entities a raycaster tests, both for correctness (the sky is never "clicked") and for performance.

**`cursor="rayOrigin: mouse"` vs `rayOrigin: 'entity'`** chooses whether the ray follows the pointer/finger or the camera's own gaze direction; `fuse` adds a timed, hands-free selection on top of either.

**`laser-controls="hand: left"`** is a ready-made bundle of `tracked-controls`, a raycaster, a laser line, and cursor-style click events, aimed from a VR controller instead of the camera.

**`animation__turn` / `animation__lift`** are two independently named instances of the built-in `animation` component on one entity: the suffix after the double underscore is arbitrary, chosen so both can coexist.

## 3D and XR accessibility

This whole lesson is a 3D lesson, so its accessibility is built in rather than a separate moment:

- Every exhibit's information lives in `exhibitData`, once, and drives the 2D list, the "Select" buttons, and the info panel, so none of them can fall out of sync (WCAG 1.3.1).
- **Every 3D interaction has a real, labelled `<button>`** that calls the same `selectExhibit()` function as a click, a tap, or a VR controller's trigger.
- **`#status` is a live region** that announces the newly selected exhibit without moving focus.
- **Nothing moves unless the learner asks it to.** The camera never walks; turning and lifting happen only in response to a selection; reduced motion replaces them with an instant change; the idle pulse has its own Pause button.
- **The chime never plays on its own**, and its button always shows whether it is playing, via `aria-pressed`.
- **Gaze/fuse selection is opt-in**, with its dwell-time cost explained where the learner turns it on, not hidden as the only input method.
- **A no-WebGL message** keeps the room's information available even when the 3D view cannot run.
- **Every exhibit works seated.** All three sit at or below standing eye height and within arm's reach of the camera's starting position, so nothing requires standing up or walking to reach, in VR or otherwise.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| Every exhibit's information is in the 2D list and the info panel, not only the 3D scene | 1.1.1, 1.3.1 | The picture's information is also in words, always. |
| Every 3D interaction has a real, labelled button reaching the same function | 2.1.1, 4.1.2 | The keyboard reaches everything a mouse, a tap, or a VR trigger can reach. |
| `#status` announces the selected exhibit | 4.1.3 | A screen-reader user learns what changed without hunting for it. |
| Turning and lifting are instant under reduced motion; the idle pulse has a Pause button and stops under reduced motion | 2.2.2, 2.3.3 | No self-running motion the learner cannot stop, and no motion sickness trigger. |
| The chime never autoplays; its button shows its state | 1.4.2, 4.1.2 | Nothing starts speaking over a screen reader uninvited. |
| The camera never moves unless the learner moves it | Good practice | Comfort: no vection, no forced viewpoint change. |
| The page never scrolls sideways on a phone | 1.4.10 | The room sits above the controls on narrow screens. |

## Performance considerations

Three `interactive-exhibit` components, each with a `tick()`, sounds more expensive than it is: the guard clause at the top of `tick()` returns immediately for any exhibit that is not currently selected, so at most one of the three ever does the `Math.sin()` and scale-set work on a given frame. `raycaster="objects: .interactive"` keeps every raycast limited to three entities instead of the whole scene graph, including the floor and sky. The reused chime asset (about 345 KB) adds nothing new to the room's download beyond 3.2.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Passing an inline arrow function to `addEventListener` in `init()` | `remove()` cannot remove it (no matching reference) | Bind and store the function on `this` in `init()`, then pass that same reference to both calls |
| Forgetting the third argument to `el.emit()` | The event never reaches a scene-level listener | Pass `true` to make it bubble |
| Writing to `this.el.object3D.rotation` directly for a non-reduced-motion turn | No easing, no duration, and TODO 17 has nothing to clean up | Use `setAttribute('animation__turn', {...})` so the `animation` component owns it |
| Raycasting the whole scene (no `objects` filter) | The sky, floor, and text panels become clickable, and raycasting costs more | `raycaster="objects: .interactive"` |
| `sound="positional: true"` with no `maxDistance` in mind | The chime is audible from anywhere in the room, defeating the point of positional audio | Set a `maxDistance` that matches the room's actual scale |
| Making gaze/fuse the only input method | Anyone who cannot hold a steady gaze for the fuse timeout is locked out | Keep click/tap as the default; make gaze an explicit, reversible toggle |

## Troubleshooting

**Clicking an exhibit does nothing, but hovering highlights it.** `onMouseEnter`/`onMouseLeave` (from `cursor`'s `mouseenter`/`mouseleave`) are wired, but the `'click'` listener, or `selectExhibit()` itself, is still a placeholder.

**The keyboard "Select" buttons work, but clicking the 3D exhibit does not (or the reverse).** Confirm both paths call the exact same `selectExhibit(id)`; if either one has its own separate logic, they will drift apart over time.

**The chime plays instantly on page load.** Check `autoplay` is `false` on the `sound` attribute; a stray `autoplay: true` from copy-pasting will bypass the button entirely.

**The gaze cursor selects things instantly, with no dwell.** `fuse` was left `false` when switching `rayOrigin` to `'entity'`; both need to change together.

**`laser-controls` shows no laser in the emulator.** Confirm `xr-mode-ui="enabled: true"` is set on `<a-scene>` (Firefox and Safari currently have limited or no WebXR emulator support; use Chrome for this step) and that you pressed "Enter VR" first — the laser only renders inside an active XR session.

**An exhibit keeps reacting to clicks after you thought you removed it.** `remove()` is missing its `removeEventListener` calls, or is calling them with a different function reference than `init()` added.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: add a fourth interactive exhibit, using the same component and the same shared code path.
2. **[Creative](challenges/challenge-2.md)**: replace one exhibit with something from your own culture, community, or language.
3. **[Explorer](challenges/challenge-3.md)**: add a second interaction type ("examine") to `interactive-exhibit`, with its own keyboard route.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take a screenshot of the room with one exhibit selected, one of the info panel showing that exhibit's description, and one of the gaze-cursor toggle turned on.
3. Keep them in your learner journal and portfolio. Share them with other developers: see [where to share your work and ask for help](../../docs/en/community.md).
4. In your journal, answer: which input method would you rely on if you could not use a mouse or a touchscreen, and did this lesson's gaze cursor and `laser-controls` genuinely give you that option?

## Further reading

- [A-Frame: Component](https://aframe.io/docs/1.8.0/core/component.html)
- [A-Frame: cursor component](https://aframe.io/docs/1.8.0/components/cursor.html)
- [A-Frame: laser-controls component](https://aframe.io/docs/1.8.0/components/laser-controls.html)
- [A-Frame: animation component](https://aframe.io/docs/1.8.0/components/animation.html)
- [W3C: WebXR Device API, Input](https://www.w3.org/TR/webxr/#input)

## Women to Know

**Karina Acuña** is a Bogotá-based digital designer and XR creator who co-founded and leads, as CEO, the creative-technology studio Shift Active. She describes creating "Mujer Aumentada," an initiative teaching women and young people to build augmented-reality filters, which launched at the first Women in Games event in Barranquilla, Colombia, in 2020.

This lesson's exhibit is small, but the idea behind it, letting more people build and shape immersive experiences rather than only viewing them, is the same one Acuña's initiative has been teaching in Colombia since 2020: interaction design and creation as a skill anyone can learn, not a specialist's domain.

_Facts from public sources, checked 2026. Spotted an error? [Tell us](https://github.com/XR-Dev-Camp/xr-camp/issues)._

## Standards spotlight

The **WebXR Device API**, published by the **W3C's Immersive Web Working Group**, defines the input model this lesson relies on. Each connected controller, hand, or gaze-only input is exposed to the page as an `XRInputSource`, which reports a `targetRayMode` (`tracked-pointer` for a handheld controller, `gaze` for a headset with no controller, or `screen` for a phone-based session), a `handedness`, and, where relevant, a `gamepad` for its buttons. The API defines `selectstart`, `select`, and `selectend` events on the `XRSession` to represent a single, primary action, whether it comes from pulling a trigger, tapping a touchscreen, or a timed gaze; A-Frame's `laser-controls` and `cursor` components, which this lesson uses directly, are built on top of exactly this model, which is why the same `'click'` event works across all of them.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
