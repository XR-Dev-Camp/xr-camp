# Web3D Fundamentals

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `web3d-developer` · **Lesson:** `web3d-fundamentals-01` · **Time:** about 14 hours · 19 sessions of 45 minutes · about 5 weeks at 4 sessions a week

---

> Create a technology comparison laboratory with compact examples and written analysis.

---

## Learning objectives

By the end of this project you will be able to:

1. Place objects in 3D with **coordinates** (x, y, z, in metres), and explain which way each axis points.
2. Explain the **scene graph**: objects are nested, and children move with their parents.
3. **Transform** objects: position, rotation (degrees and radians), and scale.
4. Choose a **camera**, perspective or orthographic, and explain field of view.
5. Light a scene with **ambient**, **directional**, and **point** lights.
6. Explain how a **material** decides how a surface reacts to light.
7. Compare **WebGL**, **three.js**, **A-Frame**, and **X3D**, and describe Babylon.js, PlayCanvas, and WebGPU, and choose one for a project, with reasons.
8. Describe any 3D scene in words, so the information never lives only in the picture.

## Prerequisites

- **Phase 2: Become a Frontend Engineer**, especially modules (2.1) and one-job-per-file architecture (2.3).
- **Course 0.5: History of Web3D** tells the story of these technologies. This lesson is about how they work.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A modern browser with WebGL | Every page in this lesson | Free |
| VS Code and a local server | Modules and import maps need `http://` | Free |
| The browser's **Network** panel | Measuring what each library costs to download | Free |

**Check WebGL first:** open `compare/webgl.html`. If you see an orange triangle, your browser is ready. If not, update your browser, or turn on hardware acceleration in its settings.

The libraries load from `cdn.jsdelivr.net`, `aframe.io`, and `x3dom.org`. If one is slow or blocked where you are, download the file once where it works, save it next to the page, and change the address to the local file.

## What you will build

The first part of the **virtual exhibit** that you will grow all through Phase 3: a **Web3D laboratory** in two halves.

1. **The concepts lab** (`index.html`): one small exhibit, a table with a clay pot and a stone, and a panel of controls. Move the stone, turn the table, switch cameras, change the lights and materials, and watch the scene, its **description**, and its **scene graph** change together.
2. **The engine comparison** (`compare/`): the same exhibit built with raw WebGL (just one triangle, to see why engines exist), three.js, A-Frame, and X3D. Then a written **analysis** comparing them, and three more technologies you research: Babylon.js, PlayCanvas, and WebGPU.

The reference solution is in [`completed/`](completed/). The starter has the pages, the controls, and the scene objects; you write the parts that connect them: fifteen TODOs.

## Folder guide

```text
01-web3d-fundamentals/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html, styles.css    # The lab's page and controls (finished)
│   ├── lab.js                    # The lab: TODOs 2–12
│   ├── analysis.md               # Your comparison: TODO 13
│   └── compare/
│       ├── webgl.html, x3d.html  # Finished: read them
│       ├── three.html            # TODO 14
│       └── aframe.html           # TODO 15
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. Copy the starter into a new folder, `virtual-exhibit`, and commit it with Git. You will add to this folder all through Phase 3.
2. Start your local server, and open `index.html`. The controls are there, but nothing happens yet, and the scene is blank: that is expected until TODO 12.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; Step 1: what a 3D scene is made of (TODO 1) | You can name the parts of a scene |
| 2 | Step 2: rendering (TODO 12) | The exhibit on screen |
| 3 | Step 3: coordinates (TODO 2) | The stone moves in x, y, and z |
| 4 | Step 4: rotation and scale (TODOs 3–4) | The table turns; the pot grows |
| 5 | Step 5: the scene graph (TODO 5) | You can explain parents and children |
| 6 | Step 5, continued: `add` versus `attach` | You know why the stone jumped |
| 7 | Step 6: cameras (TODO 6) | Perspective and orthographic |
| 8 | Step 7: lights (TODOs 7–8) | Ambient, sun, and lamp |
| 9 | Step 8: materials (TODO 9) | Basic, Lambert, and Standard |
| 10 | Step 9: describing the scene (TODO 10) | A description that follows every change |
| 11 | Step 9, continued (TODO 11) | The scene graph as a list |
| 12 | Step 10: raw WebGL | You know what engines do for you |
| 13 | Step 11: the exhibit in three.js (TODO 14) | Version two |
| 14 | Step 12: the exhibit in A-Frame (TODO 15) | Version three |
| 15 | Step 13: X3D, and measuring | Four versions, measured |
| 16 | Step 14: researching Babylon.js, PlayCanvas, and WebGPU | Notes on three more |
| 17 | Step 15: your analysis (TODO 13) | A written comparison, and a choice |
| 18 | [`tests/checklist.md`](tests/checklist.md) | A finished lab |
| 19 | One challenge extension, then **Submitting your work** | The first part of the virtual exhibit |

### Step 1: what a 3D scene is made of (TODO 1)

Every 3D engine, whatever its name, has the same parts:

| Part | What it is | In the lab |
| --- | --- | --- |
| **Scene** | The world: a tree of everything in it | The room |
| **Mesh** | A visible object: a **geometry** (its shape, made of triangles) plus a **material** (how its surface looks) | Table, pot, stone |
| **Light** | Where light comes from | Ambient, sun, lamp |
| **Camera** | Where you look from, and how much you see | Your eye |
| **Renderer** | Turns all of it into pixels on a `<canvas>`, using WebGL | The picture |

**TODO 1:** read the top half of `starter/lab.js` (down to the cameras) and find each part in the table above. Do not change anything yet.

### Step 2: rendering (TODO 12)

`renderer.render(scene, camera)` draws one picture: this scene, from this camera. Nothing more.

Most 3D examples draw 60 pictures a second, forever, in an **animation loop**. This lab does not: nothing moves on its own, so it draws only when you change a control. That is called **rendering on demand**, and it lets the graphics chip rest, which saves a phone's battery. Write TODO 12, reload, and the exhibit appears.

### Step 3: coordinates (TODO 2)

Positions are three numbers, **x, y, z**, measured in **metres** from the centre of the world:

- **x** runs left (negative) to right (positive).
- **y** runs down to **up**. The floor is at y = 0.
- **z** runs away from you (negative) to **toward you** (positive).

The red, green, and blue lines in the lab are the **axes**: x is red, y green, z blue (RGB = XYZ, a helpful rhyme). Use real sizes: a table is about 0.75 m high. In VR, sizes are real, and a table 10 m tall feels wrong.

### Step 4: rotation and scale (TODOs 3–4)

A **transform** is an object's position, rotation, and scale. Rotation has a trap:

- **three.js measures angles in radians.** A full turn is 2π (about 6.28), and a right angle is π / 2.
- **A-Frame and most people use degrees.** A full turn is 360.

The slider gives degrees, so convert: `THREE.MathUtils.degToRad(90)` gives π / 2. Forgetting this is the most common three.js mistake: a table turned "90" radians spins more than fourteen times.

**Scale** multiplies size: 2 is twice as big, 0.5 half. `setScalar(2)` scales all three directions at once.

### Step 5: the scene graph (TODO 5)

Objects in a scene are nested, like HTML elements. The table is a **Group**: an invisible parent that holds its top, its legs, the pot, and the stone. When the parent moves, turns, or grows, its **children** go with it: turn the table, and everything on it turns too.

A child's position is measured **from its parent**, not from the centre of the world. Try it: in TODO 5, first use `scene.add(stone)` to take the stone off the table, then turn the table and tick the box again. The stone jumps, because the same numbers now mean "from the table", not "from the room". `attach()` instead recalculates the numbers so the stone stays exactly where it is. That difference is worth a whole session.

The **Scene graph** list under the picture shows the tree. It is also the scene's 2D twin: a screen-reader user can explore the structure there.

### Step 6: cameras (TODO 6)

- A **perspective camera** works like an eye: far things look smaller. Its **field of view** (FOV) is how wide it sees, in degrees (in three.js, the vertical angle). A small FOV is like zooming in; a big one sees more, but stretches the edges.
- An **orthographic camera** keeps everything the same size at any distance, like an architect's plan. Good for maps, diagrams, and 2D games.

After changing a camera's settings, call `updateProjectionMatrix()`, or nothing changes.

### Step 7: lights (TODOs 7–8)

| Light | Like | Shadows and shape |
| --- | --- | --- |
| **Ambient** | Light bounced everywhere | Lights every side equally: no shape at all |
| **Directional** | The sun: parallel rays from far away | Shows shape; direction is what matters |
| **Point** | A light bulb | Shines in every direction from one spot, and fades with distance |

Turn ambient light to 0: the shadowed sides go black. Turn it up to 2: everything looks flat. Good lighting is a balance, usually a little ambient light and one or two others.

### Step 8: materials (TODO 9)

A material decides how a surface answers light:

- **Basic** ignores lights entirely: one flat colour. Cheap to draw, and good for interface elements.
- **Lambert** is matte, like clay or paper.
- **Standard** is **physically based** (PBR): **roughness** (0 is a mirror-like polish, 1 is chalky) and **metalness** (0 is paint or stone, 1 is bare metal). Most modern 3D models, including glTF files, use this kind.

Try **Basic** with the lamp on and off: nothing changes. That is how you know a material ignores light.

### Step 9: describing the scene (TODOs 10–11)

A 3D scene is a picture drawn by JavaScript, and screen readers cannot see into it. So every scene in XR Camp has a **scene description**: the same information in words, built **from the same values** as the scene, so it can never be out of date. In the lab it says where the stone is, how far the table is turned, which camera you look through, and which lights are on.

This is not only for blind learners. It helps anyone on a slow device where the 3D will not load, and it forces you to know what your scene actually shows.

### Step 10: raw WebGL

Open `compare/webgl.html` and read its code. **WebGL** is the browser's built-in graphics API, standardised by the Khronos Group. It knows nothing about tables, cameras, or lights: only **triangles**, and two tiny programs called **shaders** that run on the graphics chip. One positions the corners (the vertex shader); the other colours the pixels (the fragment shader).

Forty lines, for one flat triangle. Everything in the lab (lights, materials, cameras, the scene graph) is thousands of lines of engine code turning your ideas into triangles and shaders. That is what an engine is for.

### Step 11: the exhibit in three.js (TODO 14)

**three.js** is the most widely used JavaScript 3D library. You create each object yourself, in code, and ask the renderer to draw. Build the exhibit in `compare/three.html` in as few lines as you can, with the same positions and colours as the lab.

### Step 12: the exhibit in A-Frame (TODO 15)

**A-Frame** is built on three.js, but you write **HTML**: `<a-box>`, `<a-cylinder>`. It adds a camera and lights if you do not, and a VR button, and it measures rotation in **degrees**. Build the same exhibit in `compare/aframe.html`. Which was quicker to write? Which is easier to read?

### Step 13: X3D, and measuring

Open `compare/x3d.html`. **X3D** is an ISO standard from the Web3D Consortium, older than WebGL, and still used for scientific, medical, and cultural-heritage models. X3DOM is a JavaScript library that shows X3D in web pages. Notice the nesting: a `Transform` holds a `Shape`, which holds an `Appearance` and a geometry.

Now **measure**. Open each page with the **Network** panel, reload, and note the size of the library it downloads (the "transferred" column). Also count the lines of scene code. Put both in your analysis.

### Step 14: researching Babylon.js, PlayCanvas, and WebGPU

Three more you should know. Read each one's home page and one example, and take notes:

- **Babylon.js**: a complete open-source engine, backed by Microsoft, with physics, an editor, and many tools built in.
- **PlayCanvas**: an open-source engine with an online visual editor, popular for games and product viewers.
- **WebGPU**: not an engine, but the newer graphics API after WebGL, from the W3C. It gives more direct access to the graphics chip, including for general computing. three.js and Babylon.js can already use it.

### Step 15: your analysis (TODO 13)

Fill in `analysis.md`: the two tables, what you learned, and which technology you will use for the virtual exhibit, and why. There is no single right answer: a good answer names the trade-offs. Compare yours with [`completed/analysis.md`](completed/analysis.md) only when you have finished.

## Key code explained

**`THREE.MathUtils.degToRad(deg)`** converts degrees to radians: `deg × π / 180`.

**`parent.attach(child)`** moves `child` to a new parent **without moving it in the world**. `parent.add(child)` keeps its numbers, so it moves.

**`camera.updateProjectionMatrix()`** must follow any change to `fov`, `aspect`, or an orthographic camera's edges.

**`renderer.setPixelRatio(Math.min(devicePixelRatio, 2))`** draws sharply on high-density screens, but never more than twice the pixels: a phone with a ratio of 3 would otherwise draw more than twice as many pixels as at 2, for little visible gain.

**`new ResizeObserver(…)`** redraws when the canvas's box changes size, not only when the window does.

**The import map** maps `three` to the pinned three.js file, and maps three.js's own `three.core.js` to its minified copy (see [`docs/en/3d-assets-and-versions.md`](../../docs/en/3d-assets-and-versions.md)).

## 3D and XR accessibility

This whole lesson is a 3D lesson, so its accessibility is built in rather than a separate moment:

- Every page has a **scene description**, and the lab's changes as you work.
- The lab's **scene graph list** is a 2D twin of the scene's structure.
- Every control is a standard form control, with a visible label: sliders work with the arrow keys.
- **Nothing moves** unless you change a control, so there is nothing to pause, and no motion sickness. Every camera is fixed.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| Every scene has a text description that follows its changes | 1.1.1 | The picture's information is also in words. |
| Every control has a visible label, and its value is shown | 1.3.1, 3.3.2 | Everyone knows what each slider does and where it is. |
| Controls work with the keyboard | 2.1.1 | Sliders, menus, and buttons are standard controls. |
| The lamp button shows its state with `aria-pressed` | 4.1.2 | Screen readers say "pressed" or "not pressed". |
| Nothing moves on its own | 2.2.2 | No motion to stop, and nothing to make anyone dizzy. |
| The page never scrolls sideways on a phone | 1.4.10 | The scene sits above the controls on narrow screens. |

## Performance considerations

This lesson's biggest performance lesson is the one you measure yourself: **libraries cost data**. A-Frame downloads about 350 KB compressed, three.js about 190 KB, and raw WebGL nothing. On a prepaid phone plan, that difference is real money. Choose the smallest tool that does the job, and load it only on pages that need it.

Rendering on demand is the second: a scene that draws 60 times a second keeps the graphics chip busy and the battery draining, even when nothing changes. Phase 3's performance lesson (3.6) goes much further.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Degrees given to three.js | The table spins wildly | `degToRad` |
| Radians given to A-Frame | The table barely turns | A-Frame uses degrees |
| Changing `fov` without `updateProjectionMatrix()` | Nothing changes | Always call it after |
| `add` when you meant `attach` | The object jumps | `attach` keeps its place in the world |
| Only ambient light | Everything looks flat, with no shape | Add a directional light |
| Only a directional light | The shadowed sides are black | Add a little ambient light |
| Sizes in random units | Everything is wrong in VR | Metres, at real-world sizes |

## Troubleshooting

**The canvas is blank.** TODO 12 is missing, or there is an error in the Console. Check that you opened the page through `http://`.

**`Failed to resolve module specifier "three"`.** The import map is missing, or appears after the module script. It must come first.

**The X3D page is blank.** X3DOM draws only when its script and stylesheet both load: check the Network panel for `x3dom.js` and `x3dom.css`.

**Everything is black.** No light reaches the objects: check the lights' intensity, or use a Basic material to test.

**The A-Frame scene fills the page, or shows a VR button.** Keep `embedded` and `xr-mode-ui="enabled: false"` on `<a-scene>`.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: add a fourth object, and a slider that controls its colour's lightness.
2. **[Creative](challenges/challenge-2.md)**: an object from your own culture, built from primitive shapes, with a description.
3. **[Explorer](challenges/challenge-3.md)**: build the exhibit in Babylon.js or PlayCanvas, or render the three.js version with WebGPU.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take screenshots of the lab with the stone off the table and the table turned, and of your four comparison pages side by side.
3. Keep them, and your `analysis.md`, in your learner journal and portfolio. Share them with other developers: see [where to share your work and ask for help](../../docs/en/community.md).
4. In your journal, answer: which idea in this lesson surprised you, and how would you explain it to a friend using only objects on a real table?

## Further reading

- [MDN: WebGL API](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
- [three.js manual: Scene graph](https://threejs.org/manual/#en/scenegraph)
- [three.js manual: Cameras](https://threejs.org/manual/#en/cameras)
- [A-Frame: Introduction](https://aframe.io/docs/1.8.0/introduction/)
- [MDN: WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## Women to Know

**Kelsey Gilbert** is a graphics engineer at Mozilla. She has been the editor of the Khronos Group's **WebGL 2.0** specification, and she co-chaired (in 2023), then chaired (in 2024), the W3C's GPU for the Web Working Group, which develops **WebGPU**.

The raw WebGL page you read in this lesson works the same way in every browser because people like her write the specification, line by line, and get browser makers to agree on it. Two of the technologies in your comparison table carry her work.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

Three standards bodies appear in this one lesson. **WebGL** is a Khronos Group standard, based on OpenGL ES. **WebGPU**, and its shading language **WGSL**, are developed by the W3C's GPU for the Web Working Group. **X3D** is an international standard, ISO/IEC 19775, maintained by the Web3D Consortium. Libraries like three.js and A-Frame are not standards: they are open-source projects built on top of them, which is why they can change faster, and why XR Camp pins their versions.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
