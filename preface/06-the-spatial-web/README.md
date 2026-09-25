# The Spatial Web

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `preface` · **Lesson:** `the-spatial-web-06` · **Time:** about 5 hours · 7 sessions of 45 minutes · about 2 weeks at 4 sessions a week

---

> Compare and document a 2D interface, interactive 3D application, and immersive experience.

---

## Learning objectives

By the end of this project you will be able to:

1. Explain the difference between a 2D interface, interactive 3D, and an immersive experience.
2. Define virtual reality, augmented reality, and mixed reality, and give an example of each.
3. Explain what spatial computing, digital twins, and geographic information systems are.
4. Describe where immersive technology helps people, and where it gets in the way.
5. Choose the right dimension for a piece of content, and justify the choice.

## Prerequisites

- **Course 0.1: Welcome to XR Camp.** You have built a scene in A-Frame.
- **Course 0.5: History of Web3D.** You know what WebXR is.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A modern browser | All three views | Free |
| A plain text editor | Your comparison page | Free |
| An internet connection, the first time | Downloading A-Frame | Free |
| A VR headset or an AR-capable phone (optional) | The immersive view | Not required |

You do **not** need a headset. If your device cannot show VR or AR, the page says so, and the lesson works without it.

## What you will build

One page that shows the same object three ways (a flat card, an interactive 3D model, and an immersive view) and a comparison table in your own words.

The reference solution in [`completed/`](completed/) is Ana's tomato plant. You will choose an object from your own region.

## Folder guide

```text
06-the-spatial-web/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/             # Begin here: the three views, with 6 TODOs
├── completed/           # Reference solution: open this last
├── challenges/          # Three optional extensions
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. Copy this lesson's `starter` folder into your `xr-camp` folder and rename it `spatial-web`.
2. Open `spatial-web/index.html` in your browser and your text editor.
3. Drag the 3D plant to look around it. Then read what the immersive section says about your device.

## The story

### From flat screens to space

For most of its history, the web has been flat: text and pictures on a rectangle. That is not a limitation: it is why the web works on every phone and computer in the world. But some things are hard to understand from a flat picture: the shape of a heart, the size of a building, the way a machine's parts fit together. For those, the web can now use a third dimension.

### Three kinds of experience

- **2D interface:** pages, forms, lists, maps. Fast, familiar, and the easiest to make accessible.
- **Interactive 3D:** a 3D scene inside a normal page, which you turn and explore with a mouse or a finger. You built one in Course 0.1.
- **Immersive experience:** the scene surrounds you. You step inside it with a headset, or see it placed in your room through a phone.

### VR, AR, and MR

- **Virtual reality (VR)** replaces what you see with a digital world. You wear a headset, and the room around you disappears.
- **Augmented reality (AR)** adds digital things to the real world: a virtual plant on your real table, seen through your phone's camera or through glasses.
- **Mixed reality (MR)** is AR where the digital things understand and respond to the real space: a virtual ball that bounces off your real wall.

**XR** (extended reality) is the umbrella word for all three, and **WebXR** is the web standard that lets a web page open in any of them, from a link, with no app to install, in browsers that support it.

### Spatial computing, digital twins, and maps

- **Spatial computing** means computers that understand the space around them and people in it: where the walls are, where your hands are, where you are looking.
- A **digital twin** is a live digital copy of something real (a building, a factory, a city) that updates with data from sensors, so people can check or plan without being there.
- A **geographic information system (GIS)** stores and shows data about places: maps, roads, rivers, flood zones. The spatial web joins these maps with 3D and XR.

### AI and the spatial web

AI is starting to understand 3D spaces as well as text and images: describing a scene in words for someone who cannot see it, or building a 3D model from photos. You will build with these ideas in Phase 5.

### Where immersive helps, and where it does not

Immersive experiences are strongest where **space, size, or presence matter**: training for dangerous jobs safely, visiting a museum or a heritage site you cannot travel to, understanding anatomy, planning a building before it is built.

They are the wrong choice for **information that is quicker to read**, such as opening hours, a timetable, or a form. They also cost more data, need more capable devices, can cause motion sickness, and are harder to make accessible. A good spatial developer knows when *not* to use 3D.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; read **From flat screens to space** and **Three kinds of experience**; TODO 1 | The three views open, with your name on the page |
| 2 | Choose your object; TODO 2 | Your 2D card |
| 3 | TODO 3 | Your object in 3D, with a matching description |
| 4 | Read **VR, AR, and MR**; TODO 4 | Your immersive view explained |
| 5 | Read **Spatial computing** and **AI and the spatial web**; TODO 5 | A completed comparison table |
| 6 | Read **Where immersive helps**; TODO 6; [`tests/checklist.md`](tests/checklist.md) | A finished page |
| 7 | One challenge extension, then **Submitting your work** | Your page in your portfolio |

### Choosing your object (TODO 2)

Choose something from your own life or region that is interesting in 3D: a maize plant, a clay pot, a tea bush, a lantern, a musical instrument. Build it from the same simple shapes (boxes, cylinders, cones, spheres) that you used in Course 0.1.

### Matching the three views (TODO 3)

Change the 3D shapes' colours, sizes, and positions to match your object. Then rewrite the scene description: someone who cannot see the 3D view must still be able to picture it.

## Key code explained

**`<svg>`: a drawing made of code.** The 2D drawing is SVG: shapes like `<rect>` and `<circle>` with positions and colours. `role="img"` and `<title>` make it one image to a screen reader, with a text alternative.

**`<a-scene embedded>`.** As in Course 0.1, the scene sits inside the page rather than covering it.

**Feature detection.** The script asks the browser whether it supports VR and AR (`navigator.xr.isSessionSupported`), and only then shows the buttons. Never show a button that cannot work.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| The SVG has a text alternative | 1.1.1 | A drawing needs words for people who cannot see it. |
| The 3D scene has a matching description | 1.1.1 | The same, for the 3D view. |
| The immersive buttons only appear when they work | Good practice (not a WCAG rule) | No dead ends. |
| The comparison table has a caption and headers | 1.3.1 | Each cell keeps its meaning. |

## Performance considerations

The 2D view costs a few kilobytes. The 3D view downloads A-Frame (about 1.3 MB of code, about 350 KB after the server compresses it) the first time. That difference is the whole argument of this lesson: every dimension you add has a cost for the people you build for.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Using 3D because it looks impressive | Slower, harder pages | Use 3D only when shape or space matter |
| Changing the 3D scene but not the description | Screen-reader users get the wrong object | Update the words with the scene |
| Mixing up AR and VR | Confusing explanations | VR replaces the world; AR adds to it |

## Troubleshooting

**The 3D view is empty.** A-Frame downloads from the internet the first time. Check your connection and reload.

**No VR or AR buttons appear.** Your device does not support them, which is normal on most computers. The page tells you so. Try Challenge 3 to test with an emulator.

## Challenge extensions

Three optional extensions, in [`challenges/`](challenges/):

1. **[Foundation](challenges/challenge-1.md)**: classify five real products as 2D, 3D, VR, AR, or MR.
2. **[Creative](challenges/challenge-2.md)**: design an immersive idea for your community, and decide honestly whether it should be immersive.
3. **[Explorer](challenges/challenge-3.md)**: try your page in VR with a browser emulator.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take a screenshot of each of the three views (or the immersive section's message).
3. Keep them in your learner journal. When the XR Camp community opens, share them there.
4. In your journal, answer: which view explains your object best, and why?

## Further reading

- [MDN: WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)
- [MDN: SVG tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch)
- [W3C: Immersive Web Working Group](https://www.w3.org/immersive-web/)

## Women to Know

**Fei-Fei Li (李飞飞)** is a Stanford computer scientist who created ImageNet, the collection of labelled photographs that sparked modern deep learning. She co-directs Stanford's Human-Centered AI Institute and co-founded AI4ALL, a nonprofit that helps students from groups under-represented in AI to study it and build careers in it. In 2024 she co-founded World Labs, where, as CEO, she works on what she calls "spatial intelligence": AI that understands 3D worlds.

She grew up in Chengdu before moving to the United States at sixteen. Her work connects two ideas from this lesson: computers learning to see, and computers learning to understand space.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

**WebXR** is written by the W3C's Immersive Web Working Group, so the same page can open in headsets and phones from different companies. Its rules for asking permission before using cameras and sensors are part of the standard, not an afterthought.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
