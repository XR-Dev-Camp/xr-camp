# Organizations Building the Future

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `preface` · **Lesson:** `organizations-building-the-future-07` · **Time:** about 6 hours · 8 sessions of 45 minutes · about 2 weeks at 4 sessions a week

---

> Create an interactive ecosystem map connecting standards organizations to technologies.

---

## Learning objectives

By the end of this project you will be able to:

1. Explain what a web standard is, and why the web needs them.
2. Name the organisations behind the technologies you will use at XR Camp, and what each one does.
3. Describe how an idea becomes a standard.
4. Find a real, free way to take part yourself.

## Prerequisites

- **Course 0.4: History of the Web** and **Course 0.5: History of Web3D.** You have met W3C, WHATWG, Khronos, and the Web3D Consortium.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A modern browser | Your map, and each organisation's website | Free |
| A plain text editor | Writing your map | Free |

## What you will build

An interactive map of ten organisations: what each one does, which technologies it looks after, and how people can take part. Visitors can filter it by technology ("show me who is behind XR"). Below the map, you explain how a standard is made, and choose one way you will take part.

The reference solution in [`completed/`](completed/) is Ana's map.

## Folder guide

```text
07-organizations-building-the-future/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/             # Begin here: the map, with 5 TODOs
├── completed/           # Reference solution: open this last
├── challenges/          # Three optional extensions
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. Copy this lesson's `starter` folder into your `xr-camp` folder and rename it `who-builds-the-web`.
2. Open `who-builds-the-web/index.html` in your browser and your text editor.
3. Try the filter buttons. The W3C card is complete; the others are waiting for you.

## The story

### Why the web needs standards

A page you write today works in Chrome, Firefox, Safari, and Edge, on Windows, Android, and iPhone, in Lima and in Chengdu. That is not an accident. It works because the companies that make browsers agreed on shared rules, called **standards**, and wrote them down where anyone can read them.

Without standards, every browser would behave differently, and you would have to build every page several times. With them, you build once, for everyone.

### The organisations

| Organisation | What it does | Technologies you will use |
| --- | --- | --- |
| **W3C**, the World Wide Web Consortium | Founded by Tim Berners-Lee in 1994. Writes most web standards. | CSS, WCAG, SVG, WebXR, WebGPU |
| **WHATWG** | Formed by browser makers in 2004. Maintains the HTML Living Standard, which W3C also endorses. | HTML, DOM, Fetch, URL |
| **Ecma International** | Its committee TC39 maintains ECMAScript, the standard behind JavaScript. | JavaScript |
| **IETF**, the Internet Engineering Task Force | Writes internet protocols as documents called RFCs. | HTTP, TLS, DNS |
| **Khronos Group** | A consortium of companies writing graphics and 3D standards. | WebGL, glTF, OpenXR, KTX |
| **Web3D Consortium** | Looks after X3D, which grew from VRML. | X3D |
| **Open Geospatial Consortium (OGC)** | Writes standards for maps and location data. | Web map services, CityGML, 3D Tiles |
| **Metaverse Standards Forum** | Founded in 2022. Brings standards bodies and companies together; it does not write standards itself. | Coordination between standards |
| **Open Source Initiative (OSI)** | Maintains the Open Source Definition and approves open-source licences. | Open-source licences |
| **XR Guild** | A professional association for people who work in XR, focused on ethics. | Ethical principles for XR |

Notice that some technologies you might expect to belong together do not: **WebGL** comes from Khronos, but **WebGPU**, its successor, comes from W3C. Knowing who looks after what tells you where to look for answers, and where to report problems.

### How a standard is made

The details differ between organisations, but the path is similar:

1. **An idea.** Someone has a problem the web cannot solve yet.
2. **Incubation.** People describe the problem and possible solutions in public, often in a W3C **Community Group** or a short document called an **explainer**.
3. **A working group** agrees to write a **specification**: a precise description of how the technology must behave.
4. **Drafts and wide review.** Experts review the draft for accessibility, privacy, security, and internationalisation.
5. **Implementations and tests.** Browsers build it, and a shared test suite checks that they all behave the same.
6. **A standard.** When it works interoperably, meaning in more than one browser, it becomes a W3C Recommendation.

This takes years, on purpose: once millions of websites depend on a standard, it can almost never change.

### You can take part

Standards are not only written by big companies. Many organisations have free, open ways in:

- **W3C Community Groups** are free for anyone to join, including the Immersive Web Community Group, where WebXR ideas start.
- **WHATWG and TC39** discuss their work in public on GitHub, where anyone can read and comment.
- **The IETF** has no membership: anyone can join its mailing lists.
- **Reporting a bug** in a browser, or a mistake in documentation such as MDN, is a real contribution.

Others, such as Khronos and the Web3D Consortium, are membership organisations, but publish their specifications for everyone to use.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; read **Why the web needs standards**; TODO 1 | Your map open, with your name on it |
| 2 | Read **The organisations**; TODO 2 for the first four cards | Half the map |
| 3 | TODO 2 for the remaining cards, visiting each organisation's website | Every card explained |
| 4 | TODO 3: add OSI and XR Guild | A map of ten organisations |
| 5 | Read **How a standard is made**; TODO 4 | The path from idea to standard |
| 6 | Read **You can take part**; TODO 5 | Your own plan to take part |
| 7 | [`tests/checklist.md`](tests/checklist.md) | A finished map |
| 8 | One challenge extension, then **Submitting your work** | Your map in your portfolio |

### Adding a card (TODO 3)

Copy a whole card, from `<li class="org"` to its `</li>`, and paste it at the end of the list. Change the name, the sentence, the technologies, and the joining information.

Then set its `data-tags` so the filters find it: `open` for open source and ethics, and `xr` as well for the XR Guild. The filter buttons read these tags.

## Key code explained

**`data-tags`.** Attributes that start with `data-` are yours to invent. Here they store which filters each card belongs to. The script reads them, and browsers ignore them otherwise.

**`aria-pressed` on the filter buttons.** A filter is a button that stays on. `aria-pressed="true"` tells screen readers it is selected, and the CSS uses the same attribute to colour it: one source of truth for both.

**The count in a live region.** "Showing 3 of 10 organisations" is announced when it changes, so screen-reader users know the filter worked.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| Works without JavaScript | 4.1.2 | Every visitor sees every organisation. |
| Filter state is exposed with `aria-pressed` | 4.1.2 | Screen readers say which filter is on. |
| Filter results are announced | 4.1.3 | Status messages reach everyone. |
| Selected filters differ by more than colour | 1.4.1 | The selected button is filled in, not only recoloured. |

## Performance considerations

Ten cards, one small script, no images: the page loads instantly. Filtering hides cards rather than reloading anything, so it is instant too.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Assuming one organisation owns "the web" | Looking for answers in the wrong place | Check who maintains each technology |
| Forgetting `data-tags` on a new card | The card never appears when filtered | Give every card at least one tag |
| Copying descriptions from each website | You do not remember them | One sentence, in your own words |

## Troubleshooting

**My new card does not appear with any filter.** Check its `data-tags`: the words must exactly match the buttons' `data-filter` values, in lower case.

**The filter buttons do not appear.** Check you did not delete the `<script>` at the bottom.

## Challenge extensions

Three optional extensions, in [`challenges/`](challenges/):

1. **[Foundation](challenges/challenge-1.md)**: find three standards you used today without knowing it.
2. **[Creative](challenges/challenge-2.md)**: add an organisation from your own region.
3. **[Explorer](challenges/challenge-3.md)**: join a W3C Community Group.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take a screenshot of your map with the **XR** filter on.
3. Keep it in your learner journal. When the XR Camp community opens, share it there.
4. In your journal, answer: which organisation would you most like to work with one day, and why?

## Further reading

- [W3C: Standards and the process](https://www.w3.org/standards/)
- [WHATWG: FAQ](https://whatwg.org/faq)
- [TC39: How JavaScript evolves](https://tc39.es/)
- [W3C Community Groups](https://www.w3.org/community/)

## Women to Know

**Xiaoqian Wu (吴小倩)** joined W3C in 2013 and has been the site manager of W3C China since 2018, as well as W3C's Director of China Member Relations. She is the W3C team contact for the Web Applications and Web Editing working groups, for the MiniApps working group, and for the Chinese Web Interest Group.

That last group matters for learners: web standards must work for every language and writing system, and people like Wu make sure Chinese-language needs are part of the conversation from the start.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

This whole lesson is a standards spotlight. One more detail worth knowing: W3C's process requires **wide review** of every specification, including by groups focused on accessibility and internationalisation, before it can become a standard. The web is built to include people by design, not as an afterthought.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
