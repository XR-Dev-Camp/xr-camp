# Experience and System Design

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `capstone` · **Lesson:** `experience-and-system-design-02` · **Time:** about 10.5 hours · 14 sessions of 45 minutes · about 4 weeks at 4 sessions a week

---

> Produce the full product and technical design.

---

## Learning objectives

By the end of this project you will be able to:

1. Turn an approved brief into concrete user journeys.
2. Sketch wireframes for the screens or scenes your capstone needs.
3. Design a spatial layout for a 3D or XR scene, on paper, before building it.
4. Draw a scene graph: the entities, hierarchy, and their relationships.
5. Design a simple data model for your project's content.
6. Sketch the API your front end needs, even if it is a small, local one.
7. Write a security and privacy plan appropriate to a small, free-tools project.
8. Write a test plan that says how you will check accessibility, performance, and localisation later.

## Prerequisites

- **Stage 7.1: Capstone Research and Definition.** You need an approved brief, stakeholder map, and mentor approval before this stage begins.
- **Course 5.4: Real-Time and Multi-User Applications**, and **Course 5.5: Security and Privacy for Spatial Applications**, if your capstone needs either.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A text editor | Fill in the eight design templates | Free |
| Paper, or any drawing tool you already have | Sketching wireframes and spatial layouts before digitising them | Free |
| A local server, for the completed example | Same server as other lessons | Free |

No paid design tools are required. If you prefer a diagramming tool, choose one with a free tier that works in mainland China (for example, a locally installed drawing program, or plain ASCII diagrams in Markdown, which every template here uses).

## What you will build

Stage 2 of the Professional Capstone: the **full design** for your approved capstone, before any production code is written. You will produce eight documents: user journeys, wireframes guidance, a spatial layout, a scene graph, a data model, an API sketch, a security plan, and a test plan.

The reference solution in [`completed/`](completed/) continues Ana's Aurora Community Museum exhibit from Stage 1: a single gallery room, one visitor journey, and a small, honest data model for a handful of objects. [`completed/index.html`](completed/index.html) presents all eight documents. The starter has the same eight templates, with 10 TODOs across them, plus this stage's rubric.

## Folder guide

```text
02-experience-and-system-design/
├── README.md
├── project.json
├── starter/
│   ├── index.html            # Start page: links to every template below
│   ├── journeys.md            # TODOs 1–2: user journeys
│   ├── wireframes.md           # TODO 3: wireframe guidance and sketches
│   ├── spatial-layout.md       # TODO 4: the 3D/XR scene, on paper
│   ├── scene-graph.md          # TODO 5: entities and hierarchy
│   ├── data-model.md           # TODOs 6–7: your content's shape
│   ├── api.md                  # TODO 8: the API your front end calls
│   ├── security-plan.md        # TODO 9: security and privacy
│   ├── test-plan.md            # TODO 10: how you will test later stages
│   └── rubric.md               # How this stage is assessed
├── completed/                # Ana's filled-in design: open this last
├── challenges/                # Three challenges: Foundation is required
├── tests/checklist.md
├── assets/
└── screenshots/
```

## Setup

1. Confirm Stage 1's `mentor-approval.md` says "Approved" or "Approved with changes" (with changes made) before you start.
2. Copy `starter/` into your capstone workspace, alongside your Stage 1 documents.
3. Open `starter/index.html` through a local server, and read [`starter/rubric.md`](starter/rubric.md) first.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; re-read your Stage 1 brief | A design session that starts from your approved scope |
| 2 | Step 1: user journeys, part 1 (TODO 1) | One journey mapped step by step |
| 3 | Step 1, continued (TODO 2) | A second journey, for a different stakeholder |
| 4 | Step 2: wireframes (TODO 3) | A sketch (paper or digital) for every screen or scene |
| 5 | Step 3: spatial layout, part 1 | A rough floor plan of your 3D/XR scene |
| 6 | Step 3, continued (TODO 4) | A spatial layout with distances and sightlines noted |
| 7 | Step 4: scene graph (TODO 5) | A tree of every entity in your scene and its parent |
| 8 | Step 5: data model, part 1 (TODO 6) | A list of every content type your project needs |
| 9 | Step 5, continued (TODO 7) | Fields and relationships for each content type |
| 10 | Step 6: API sketch (TODO 8) | A short list of endpoints or functions your front end calls |
| 11 | Step 7: security and privacy plan (TODO 9) | A plan naming what data you collect and how you protect it |
| 12 | Step 8: test plan (TODO 10) | A plan for accessibility, performance, and localisation testing |
| 13 | [`tests/checklist.md`](tests/checklist.md); request mentor approval | A design ready for sign-off |
| 14 | One challenge extension, then **Submitting your work** | An approved system design |

### Step 1: user journeys (TODOs 1–2)

Open [`starter/journeys.md`](starter/journeys.md). A user journey is a numbered sequence of steps a real person takes to reach a goal: arriving, deciding what to do, acting, and leaving with something they wanted. Write one journey for your primary audience (TODO 1) and one for a different stakeholder from your Stage 1 map, such as the person maintaining the project (TODO 2).

### Step 2: wireframes (TODO 3)

Open [`starter/wireframes.md`](starter/wireframes.md). A wireframe is a rough sketch of a screen or scene's layout, with no colours or polish: boxes, labels, and arrows. Sketch one for every screen or scene in your scope, on paper or in a simple tool, then describe each sketch in words in this file (a photograph of a paper sketch, described in words, is perfectly valid here — this template asks for the description, not the image itself).

### Step 3: spatial layout (TODO 4)

Open [`starter/spatial-layout.md`](starter/spatial-layout.md). For a 3D or XR capstone, plan the space before you build it: where is the camera or the visitor's starting point, what can they see first, how far apart are objects, and where do they walk or look next? A simple ASCII floor plan, like the ones in `web3d-developer`, is enough.

### Step 4: scene graph (TODO 5)

Open [`starter/scene-graph.md`](starter/scene-graph.md). A scene graph is a tree: every entity in your scene, and which entity is its parent. Drawing it before you code tells you, in advance, what moves together (a child moves with its parent) and what your code will need to create and update.

### Step 5: data model (TODOs 6–7)

Open [`starter/data-model.md`](starter/data-model.md). List every content type your capstone needs (TODO 6) — for Ana, this is "exhibit object," with fields like a title, description, and material. Then describe the fields and relationships for each type (TODO 7): what is required, what is optional, and how types relate to each other.

### Step 6: API sketch (TODO 8)

Open [`starter/api.md`](starter/api.md). Even a capstone with no server needs to know what data its front end asks for and when. Sketch this as a short list: a function name or endpoint, what it needs, and what it returns — whether that is a real HTTP endpoint or a function reading a local JSON file.

### Step 7: security and privacy plan (TODO 9)

Open [`starter/security-plan.md`](starter/security-plan.md). Name plainly what personal data, if any, your capstone collects, where it is stored, and who can see it. A project that collects nothing beyond anonymous visits should say so explicitly — that is a valid, and often the best, answer for a small free-tools project.

### Step 8: test plan (TODO 10)

Open [`starter/test-plan.md`](starter/test-plan.md). Write down, before Stage 3 begins, how you will test the prototype: which accessibility checks (screen reader, keyboard, reduced motion), which performance budget, and which languages you will check for localisation readiness, even if translation itself comes later.

## Key code explained

- **User journey.** A numbered sequence of steps a real person takes, from arriving with a goal to leaving having reached it (or not, if you are also mapping a failure path).
- **Scene graph.** A tree of entities where each child inherits its parent's position and rotation — the same structure A-Frame and three.js use at runtime.
- **Data model.** The shape of your content: what types exist, what fields each has, and how types relate to each other, independent of any particular database or format.
- **API sketch.** The list of requests your front end makes, described by what they need and what they return, before you decide how they are implemented.
- **Security and privacy plan.** A short, honest statement of what data is collected, where it lives, and who can access it — even when the answer is "none."

## 3D and XR accessibility

This stage plans accessibility rather than testing it, but the plans matter: a spatial layout that assumes only pointer input, or a scene graph with no described alternative for a visual scene, cannot become accessible later without a redesign. As you write `spatial-layout.md` and `scene-graph.md`, note for every interaction: what does it look like, and what is the keyboard or button-based equivalent? Your `test-plan.md` should list the specific manual 3D/XR checks (scene description, keyboard route, reduced motion, a 2D fallback, comfort) you will run once Stage 3 has a working prototype.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| `completed/index.html` declares `lang="en"` | 3.1.1 Language of Page | Assistive technology needs to know which language rules to apply |
| Headings follow a logical order across all eight linked documents | 1.3.1 Info and Relationships | Screen reader users scan headings to navigate |
| Every table has a caption and `<th scope>` | 1.3.1 Info and Relationships | Table structure must be programmatically available |
| Links describe their destination ("Read the data model", not "click here") | 2.4.4 Link Purpose (In Context) | Link text alone should say what a document is |
| Colour contrast on all text meets 4.5:1 | 1.4.3 Contrast (Minimum) | Low-contrast text is unreadable for many users |

## Performance considerations

Design documents cost nothing at runtime, but the decisions in `spatial-layout.md` and `scene-graph.md` set your Stage 3 performance budget. Note a rough triangle and draw-call target now (as `web3d-developer/06` teaches), so Stage 3 has a number to test against instead of guessing after the fact.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Designing screens before writing the user journey | Screens solve a problem no one asked for | Write the journey first; let it drive what each screen needs to show |
| Skipping the scene graph because "it's just one object" | Stage 3 code has no plan for how objects relate, and grows tangled | Draw the tree even for a small scene; it stays useful as the scene grows |
| A security plan that only says "nothing to worry about" | Real data practices (analytics, local storage, forms) go unexamined | List every place data is collected or stored, even briefly, before deciding it is low-risk |
| Writing the test plan after Stage 3 is built | Testing becomes an afterthought, and issues are expensive to fix | Write the test plan now, so Stage 3 is built with it in mind |
| Copying a data model from an unrelated project | Fields that do not fit your content make later work harder | Model your own content's real fields, even if the list is short |

## Troubleshooting

**I do not know how to draw a scene graph.** Start from the top: your `<a-scene>` or three.js `Scene`. Add one line per entity, indented under its parent. If an object moves or rotates together with another, it is that object's child.

**My data model keeps growing.** Go back to your Stage 1 "out of scope" list. If a field only supports something you decided not to build, cut it.

**I'm not sure what belongs in the API sketch if I have no server.** List the local functions that load or save your content (for example, "loadExhibits(): reads `data/exhibits.json`, returns an array of exhibit objects"). The shape matters more than whether it is local or remote.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: Walk a friend or classmate through your primary user journey using only your wireframes, and record what confused them.
2. **[Creative](challenges/challenge-2.md)**: Design one part of your spatial layout around a specific cultural or community reference from your own background.
3. **[Explorer](challenges/challenge-3.md)**: Design your data model so it could support a second language from day one, and document how.

## Submitting your work

1. Work through [`tests/checklist.md`](tests/checklist.md).
2. Take a screenshot of your scene graph and your spatial layout.
3. Keep all eight documents in your learner journal and portfolio. When the XR Camp community opens, share them there.
4. Journal question: which of your eight documents changed the most between your first draft and your mentor-approved version, and why?

## Further reading

- [W3C WAI: Planning and Managing Web Accessibility](https://www.w3.org/WAI/planning-and-managing/) 
- [OWASP: Threat Modeling](https://owasp.org/www-community/Threat_Modeling) 
- [MDN: Heading hierarchy and semantic structure](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements) 

## Women to Know

Diana Trujillo is an aerospace engineer, born in Cali, Colombia, who emigrated to the United States at 17 and spent 14 years at NASA's Jet Propulsion Laboratory working on the Curiosity and Perseverance Mars rovers, leading the team that designed Perseverance's robotic arm. In February 2021 she hosted NASA's first-ever Spanish-language broadcast of a planetary landing, "Juntos perseveramos." In 2023 she became the first Latina certified as a NASA flight director at Johnson Space Center.

A robotic arm only works because its full system — joints, sensors, software, and the people who operate it — was designed together before a single part was built. That is the discipline this stage asks of you: journeys, layout, data, and security, planned as one system before you write any production code.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

The **W3C's WAI-ARIA 1.2** specification and the **OWASP Top 10** (a community-maintained list of the most common web application security risks) are both worth knowing at design time. ARIA patterns tell you, before you code, what role and state attributes a custom control will need; the OWASP list tells you what to plan defences against in your security plan, even for a small, free-tools project.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
