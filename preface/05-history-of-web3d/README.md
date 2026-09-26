# History of Web3D

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `preface` · **Lesson:** `history-of-web3d-05` · **Time:** about 6 hours · 8 sessions of 45 minutes · about 2 weeks at 4 sessions a week

---

> Create a Web3D technology comparison lab containing small examples and a standards timeline.

---

## Learning objectives

By the end of this project you will be able to:

1. Tell the story of 3D on the web, from VRML in 1994 to WebXR and WebGPU today.
2. Explain the difference between **declarative** and **imperative** 3D, with an example of each.
3. Explain why open standards such as X3D, WebGL, and glTF matter to anyone building in 3D.
4. Read a small 3D example in X3D, A-Frame, and three.js, and say what each line does in plain words.
5. Choose a sensible starting tool for a 3D project, and justify the choice.

## Prerequisites

- **Course 0.1: Welcome to XR Camp.** You have built a scene in A-Frame.
- **Course 0.4: History of the Web.** You know what the W3C is and why open standards matter.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A modern browser | Viewing the lab | Free |
| A plain text editor | Editing the lab | Free |
| An internet connection | The three examples download their 3D libraries | Free |
| Your learner journal | Notes and sources | Free |

## What you will build

A **comparison lab**: one page with the same purple box built three ways (in X3D, A-Frame, and three.js), a table comparing them, a timeline of Web3D standards, and your own conclusions.

The three examples are already built for you, in `starter/examples/`. You are the scientist: you study them, change them, and write down what you find.

## Folder guide

```text
05-history-of-web3d/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html       # Begin here: the lab page, with 7 TODOs
│   └── examples/        # The box in X3D, A-Frame, and three.js
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. In your `xr-camp` folder, copy the `starter` folder and rename the copy `web3d-lab`.
2. Open `web3d-lab/index.html` in your browser. After a moment, three purple boxes appear.
3. Also open each file in `web3d-lab/examples/` in your text editor. You will read all three.

## The story

### The first dream: VRML (1994–2003)

Almost as soon as the web existed, people wanted it to be 3D. In **May 1994**, at the very first World Wide Web conference, a session on 3D for the web heard Mark Pesce show a demo he had built with Tony Parisi, and the idea of **VRML**, the Virtual Reality Modeling Language, was born. The idea was simple and bold: a 3D world should be a file you link to, just like a page.

VRML became an international standard in **1997** (VRML97). You could walk through 3D worlds in a browser, but only after installing a plug-in, and 1990s computers and dial-up connections struggled with it. The dream was right; the technology was too early.

### Standards that last: X3D (2004 onwards)

The group that looked after VRML became the **Web3D Consortium**, and it designed VRML's successor: **X3D**, an ISO standard since **2004**. X3D is used where 3D data must stay readable for decades: engineering, medicine, and cultural heritage, such as scans of historical buildings. In **2009**, **X3DOM**, from the Fraunhofer IGD research institute, let X3D sit directly inside an HTML page. That is the first example in your lab.

### 3D without plug-ins: WebGL and the libraries (2010–2015)

The turning point came in **March 2011**, when **WebGL 1.0** let every browser draw fast 3D graphics with no plug-in at all. WebGL is powerful but very low-level: drawing one box takes many lines of code. So people built libraries on top of it:

- **three.js** (2010), started by Ricardo Cabello, now the most widely used 3D library on the web. Your third example.
- **Babylon.js** (2013), started at Microsoft, popular for games.
- **A-Frame** (December 2015), from Mozilla's VR team, which brought back VRML's idea of 3D as tags in a page, this time on top of WebGL, and ready for headsets. Your second example.

### Sharing, immersion, and power: glTF, WebXR, WebGPU (2015–today)

3D models need a common file format, the way photos have JPEG. **glTF**, from the Khronos Group (the organisation behind WebGL), filled that gap: version 1.0 arrived in **October 2015**, version 2.0 in **June 2017**, and in **2022** it became an ISO standard. It is often called "the JPEG of 3D".

In **December 2019**, the **WebXR Device API** shipped in a major browser, so a web page could open inside a virtual or augmented reality headset. And in **May 2023**, **WebGPU** arrived: the successor to WebGL, faster and able to run AI calculations as well as graphics.

Thirty years after VRML, the original dream finally works: a 3D world you can link to, open on a phone, and step into with a headset, with no plug-in, built from open standards.

### Declarative and imperative

This is the most important idea in this lesson, and you will meet it for the rest of your career.

- **Declarative** means you describe **what** you want: "a purple box, here, turned like this". The tool works out how to draw it. X3D and A-Frame are declarative. So is HTML.
- **Imperative** means you give step-by-step instructions for **how**: "make a renderer; make a camera; add a light; make a box; add it to the scene; draw". three.js is imperative. So is most JavaScript.

Declarative is faster to start and easier to read. Imperative is more work and gives you more control. Professionals use both, often in the same project: A-Frame itself is built on three.js.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup, TODOs 1–2, read **The first dream** and **Standards that last** | The lab open, with your name on it |
| 2 | Study `examples/x3dom.html`, then change its colour | Your first edited X3D |
| 3 | Read **3D without plug-ins**; study `examples/aframe.html` and `examples/three.html` | All three examples understood |
| 4 | Read **Declarative and imperative**; TODO 3, the comparison table | A completed table |
| 5 | TODOs 4–5: the timeline up to 2015 | Half the timeline |
| 6 | Read **Sharing, immersion, and power**; TODO 6 | The whole timeline |
| 7 | TODO 7, your conclusions; then [`tests/checklist.md`](tests/checklist.md) | A finished lab |
| 8 | One challenge extension, then **Submitting your work** | A finished lab in your portfolio |

### Studying an example

For each example, open it in your editor and answer three questions in your journal:

1. **Where is the box?** Find the line or lines that create it.
2. **Where is the colour?** Change it to another colour, save, and reload the lab page.
3. **What did the tool do for me?** Look for a camera and lights. If you cannot find them, the tool added them for you.

Colours are written differently in each: X3D uses three numbers from 0 to 1 for red, green, and blue (`0.36 0.16 0.53`), while A-Frame and three.js use the hex codes you met in Course 0.1 (`#5b2a86`). Different tools, different decades, same colour.

### Why the boxes look different

Look closely at the three boxes. They are different sizes, turned differently, and lit differently. Each tool chooses a default camera position and default lights, and the three.js example chooses its own because it has no defaults. **Defaults are decisions someone else made for you.** Noticing them is the first step to controlling them.

## Key code explained

**`<box size="1.5 1.5 1.5">` (X3D)** and **`<a-box>` (A-Frame)** both describe a box with a tag. The browser does not know these tags; the library you load (`x3dom.js` or `aframe.min.js`) teaches it.

**`new THREE.Mesh(geometry, material)` (three.js)** builds the box from two parts: a *geometry* (its shape) and a *material* (how its surface looks). Every 3D engine works this way underneath, including A-Frame.

**`<iframe src="examples/aframe.html" title="The box in A-Frame">`** puts one page inside another. Each example lives in its own page so that each loads only its own library. The `title` is what a screen reader announces for the frame.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| Every example has a text description (`id="scene-description"`) | 1.1.1 | A 3D canvas is invisible to a screen reader without one. |
| Every `<iframe>` has a `title` | 4.1.2 | Otherwise a screen reader announces only "frame". |
| The table has a `<caption>` and `scope` on its headers | 1.3.1 | Each cell stays linked to its row and column. |
| Nothing moves | 2.2.2, 2.3.3 | These examples are still. If you add animation in a challenge, add a pause button too. |
| Code examples scroll sideways inside their box, not the whole page | 1.4.10 | The page stays readable at phone width. |

## Performance considerations

Each example downloads its library the first time: about 1.9 MB of code for three.js (in two files), 0.8 MB for X3DOM, and 1.3 MB for A-Frame. Servers compress these files as they send them, so the actual download is smaller, often about a quarter of that. The iframes use `loading="lazy"`, so on a phone, examples further down the page load only when you scroll to them. On a slow connection, open the lab once while you have a good signal; your browser keeps the libraries afterwards.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Editing the example's file but reloading a different copy | Nothing changes | Check you are editing the file inside the folder you opened |
| Using a hex code in X3D (`#5b2a86`) | The box turns grey or black | X3D uses three numbers from 0 to 1 |
| Deleting the lights in three.js | The box turns black | three.js does not add lights for you |
| Calling three.js "declarative" | A wrong answer in your table | three.js is imperative: it runs instructions |

## Troubleshooting

**An example stays blank.** Its library has not downloaded yet. Check your connection and reload.

**The three.js example is blank, but the others work.** Very old browsers do not support the `importmap` it uses. Update your browser.

**I changed a colour but the lab page did not update.** Reload the lab page itself. If that does not work, open the example page on its own, reload it, then reload the lab.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: change the box to a sphere in all three tools.
2. **[Creative](challenges/challenge-2.md)**: add a fourth example, the same scene as your Course 0.1 world.
3. **[Explorer](challenges/challenge-3.md)**: load a real glTF model in A-Frame.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take a screenshot of your lab, with your table and conclusions visible.
3. Keep it in your learner journal. When the XR Camp community opens, share it there.
4. In your learner journal, answer: do you think of yourself as more of a declarative or an imperative person? Why?

## Further reading

- [Web3D Consortium: X3D](https://www.web3d.org/x3d/what-x3d)
- [Khronos Group: glTF](https://www.khronos.org/gltf/)
- [Khronos Group: WebGL](https://www.khronos.org/webgl/)
- [three.js](https://threejs.org/) and [A-Frame](https://aframe.io/): the two libraries you will use in Phase 3
- [Immersive Web Working Group (W3C)](https://www.w3.org/immersive-web/): where WebXR is written

## Women to Know

**Ada Rose Cannon** co-chairs the W3C's Immersive Web Working Group and Community Group: the people who write **WebXR**, the standard that lets web pages open in headsets. Cannon is a web platform engineer at Apple, working on Safari and WebKit, and earlier spent six years as a developer advocate for Samsung Internet, promoting new web technologies such as WebXR.

The last milestone on your timeline did not simply happen. People like Cannon spent years in meetings, writing specifications, and building demos so that "a 3D world you can link to" would work in every browser. Standards work is one of the careers you will meet in Course 0.9.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

Four open standards appear in this lesson: **X3D** (Web3D Consortium and ISO), **WebGL** (Khronos Group), **glTF** (Khronos Group and ISO), and **WebXR** (W3C). A glTF model you make today should still open in software that has not been written yet. That is what a standard is for.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)

