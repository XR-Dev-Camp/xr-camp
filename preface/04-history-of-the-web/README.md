# History of the Web

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `preface` · **Lesson:** `history-of-the-web-04` · **Time:** about 5 hours · 7 sessions of 45 minutes · about 2 weeks at 4 sessions a week

---

> Build and publish a responsive timeline of major web milestones.

---

## Learning objectives

By the end of this project you will be able to:

1. Tell the story of the web in five eras, from the first ideas about linked documents to 3D, XR, and AI.
2. Explain the difference between the internet and the web, and why it matters.
3. Explain why the web is open and free to build on, and who keeps it that way.
4. Mark up a timeline with an ordered list and machine-readable dates.
5. Find, check, and cite a source for a historical fact.

## Prerequisites

- **Course 0.1: Welcome to XR Camp.** You can open a file in your browser and your text editor, change it, save, and reload.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A modern browser | Viewing your timeline | Free |
| A plain text editor | Editing your timeline | Free |
| Your learner journal | Notes and sources | Free |

## What you will build

A timeline of the web that works on a phone and on a wide screen, with milestones from five eras and a final section for milestones from your own life.

The reference solution in [`completed/`](completed/) is Ana's timeline. The styling is done for you in the starter; your job is the history.

## Folder guide

```text
04-history-of-the-web/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/             # Begin here: a timeline with one milestone per era and 9 TODOs
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. In your `xr-camp` folder, copy the `starter` folder and rename the copy `web-timeline`.
2. Open `web-timeline/index.html` in your browser and in your text editor, side by side.
3. Make the browser window narrow, then wide. The timeline rearranges itself. That is responsive design, and you will learn to build it in Phase 1.

## The story

Read one era per session, then add its milestones to your timeline. The milestones in **bold** are in the reference solution; you can use them, or find your own.

### Before the web (1945–1988)

The web began as a dream long before it was a technology. In **1945**, the engineer Vannevar Bush imagined a desk called the *memex* that would store documents and link them together, the way the mind jumps from one idea to the next. In **1965**, Ted Nelson gave that idea a name: *hypertext*, text that links to other text. In **1968**, Douglas Engelbart showed a room full of people a mouse, clickable links, and two people editing the same document from different places. It became known as "The Mother of All Demos".

Meanwhile a network was growing. In **1969**, two computers in California exchanged the first message on ARPANET. On **1 January 1983**, ARPANET switched to TCP/IP, the rules computers still use to exchange data today.

**The internet is not the web.** The internet is the network: the cables, radio links, and rules that move data between computers. The web is one thing that runs on it: pages, joined by links, that you read in a browser. Email and video calls use the internet without being part of the web.

### The document web (1989–1998)

In **March 1989**, Tim Berners-Lee, a British scientist at CERN, the European physics laboratory in Switzerland, proposed a way for researchers to share documents through links. By **December 1990**, the first web server, the first browser, and the first website were running at CERN. A student intern, Nicola Pellow, wrote a simple **line-mode browser** so that people could use the web from basic text terminals, not only from expensive workstations. From its first year, the web was meant for everyone.

The most important decision came on **30 April 1993**: CERN put the web's software in the public domain. Anyone could build a browser, a server, or a website without asking permission or paying. That is why you can learn web development for free today, and why XR Camp can exist.

The web then spread fast. The **Mosaic** browser (1993) showed images inside pages. On **20 April 1994**, **China** made its first full connection to the internet, after Hu Qiheng of the Chinese Academy of Sciences persuaded the US National Science Foundation to allow it. In **October 1994**, Berners-Lee founded the **World Wide Web Consortium (W3C)** to write the web's standards, and Håkon Wium Lie proposed **CSS**. In **1995**, Brendan Eich created **JavaScript** at Netscape, and in China **Zhang Shuxin** founded Yinghaiwei, often called the country's first internet company.

### The application web (1999–2006)

Pages started to become programs. In **May 1999**, the first **Web Content Accessibility Guidelines (WCAG 1.0)** set out how to make the web usable by disabled people. The same year, Internet Explorer 5 gained a way to fetch data without reloading the page, and other browsers soon copied it. By **2005**, Gmail and Google Maps showed what that made possible, and the technique was given a name: **Ajax**. In **2004**, browser makers formed the **WHATWG** to keep HTML evolving for applications.

### The everywhere web (2007–2019)

In **June 2007** the iPhone went on sale with a full web browser, and phones began to replace computers as the way most people reach the web. Designers had to respond: in **May 2010**, Ethan Marcotte named **responsive web design**, one page that adapts to every screen. **HTML5** (2014) added native video, audio, and graphics. In **2015**, Frances Berriman and Alex Russell named **progressive web apps**: websites that install like apps and keep working offline. In **May 2019**, W3C and WHATWG agreed to maintain a single HTML standard together.

### The spatial and intelligent web (2011–today)

In **March 2011**, **WebGL** let browsers draw fast 3D graphics without plug-ins, and the web gained a third dimension. In **December 2019**, the **WebXR Device API** shipped in a major browser, so a website could open inside a virtual or augmented reality headset. In **November 2022**, **ChatGPT** was released, and AI assistants began to change how people search, learn, and write code. In **May 2023**, **WebGPU** brought modern graphics and AI computation to the browser. And in **October 2023**, **WCAG 2.2** updated the accessibility rules that every one of these technologies must still follow.

This is the part of the story XR Camp is about, and the part you are about to help write.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup, TODOs 1–2, read **Before the web**, TODO 3 | Your name on the page and the first era complete |
| 2 | Read **The document web**, TODO 4 | Ten milestones |
| 3 | Read **The application web** and **The everywhere web**, TODOs 5–6 | Four eras complete |
| 4 | Read **The spatial and intelligent web**, TODO 7 | The whole history of the web |
| 5 | TODOs 8–9: your own milestones and sources | A timeline that includes you |
| 6 | Work through [`tests/checklist.md`](tests/checklist.md) | Every item ticked |
| 7 | One challenge extension, then **Submitting your work** | A finished timeline in your portfolio |

### Adding a milestone

Every milestone is the same block of HTML:

```html
<li>
  <time datetime="1994-04-20">20 April 1994</time>
  <h3>China connects</h3>
  <p>China's first full connection to the internet goes live.</p>
</li>
```

Copy a whole block, from `<li>` to `</li>`, paste it after the last one in the same era, and change the three lines inside. Keep the milestones in date order: the list is numbered, so its order is part of its meaning.

### Your own milestones (TODO 8)

History is not only what happened to famous people. When did the internet reach your town? When did you, or your mother, first go online? Ask someone older than you. Write down what they say, and when you add it, note in your journal where it came from.

## Key code explained

**`<ol>`: an ordered list.** A timeline is a list where order matters, so it is an ordered list. A screen reader announces "list, 10 items" and reads each item's position, so a listener knows how far through the history they are.

**`<time datetime="1994-04-20">`.** The text between the tags is for people, and can be written in any language or format: *20 April 1994*, *20 de abril de 1994*, *1994年4月20日*. The `datetime` attribute is for machines, always written year-month-day. Search engines, calendars, and translation tools read it, whatever language the page is in.

**`<section aria-labelledby="...">`.** Each era is a section named by its heading, so screen-reader users can jump from era to era.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| Milestones are an ordered list | 1.3.1 | The order is part of the meaning. |
| Every date has a `datetime` | 1.3.1 | Machines read dates reliably in any language. |
| Headings in order: one `h1`, eras as `h2`, milestones as `h3` | 1.3.1, 2.4.6 | Headings are how many people move through a long page. |
| The page works at phone width | 1.4.10 | Nothing should need sideways scrolling. |
| `lang` matches your language | 3.1.1 | Tells a screen reader how to pronounce your words. |

## Performance considerations

This page is only HTML and a little CSS: no images, no scripts, no downloads. It loads almost instantly, even on a slow connection. That is worth remembering when you start adding 3D later. Every feature has a cost, so add it only when it helps the reader.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Pasting a block inside another block | Milestones nest inside each other | Paste after a `</li>`, never before one |
| Forgetting `datetime`, or writing it as `20/04/1994` | Machines cannot read the date | Always year-month-day: `1994-04-20` |
| Milestones out of order | The numbered list tells a false story | Keep each era in date order |
| A fact with no source | Nobody can check it | Note every source in your journal |

## Troubleshooting

**The layout broke after I pasted.** You probably pasted part of a block. Every `<li>` needs its `</li>`. Undo, and copy the whole block again.

**A milestone appears in the wrong era.** It is inside the wrong `<ol>`. Cut it and paste it into the right section.

**Two sources give different dates.** That happens often in history. Prefer the source closest to the event: the organisation's own archive, or a record written at the time. Mention the disagreement in your journal.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: add your country's first internet connection, with a source.
2. **[Creative](challenges/challenge-2.md)**: interview someone about their first time online.
3. **[Explorer](challenges/challenge-3.md)**: visit the first website ever made, and compare it with a website today.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take a screenshot of your timeline at phone width and at full width.
3. Keep both in your learner journal. Share them with other developers: see [where to share your work and ask for help](../../docs/en/community.md). (You will learn to publish the page itself in Course 1.8.)
4. In your learner journal, answer: which milestone surprised you most, and why?

## Further reading

- [CERN: The birth of the web](https://home.cern/science/computing/the-birth-of-the-web/)
- [The first website, restored by CERN](https://info.cern.ch/hypertext/WWW/TheProject.html)
- [W3C: About W3C and its history](https://www.w3.org/about/)
- [Internet Hall of Fame: Hu Qiheng](https://www.internethalloffame.org/inductee/qiheng-hu/)
- [Ethan Marcotte: Responsive Web Design (A List Apart, 2010)](https://alistapart.com/article/responsive-web-design/)

## Women to Know

**Zhang Shuxin (张树新)** founded Yinghaiwei (瀛海威) in 1995, often called China's first internet company. It sold dial-up access to ordinary households and ran one of the country's first online services, at a time when very few people in China had ever been online. In its early years it put up a famous billboard in Beijing's Zhongguancun district asking how far China was from the information superhighway.

Yinghaiwei did not survive, and its story is often told in China as a lesson about being too early. But being early is also what pioneers do. Many of the milestones on your timeline were built by people whose first attempts failed.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

The web works on any device, in any country, in any browser, because its rules are open standards: **HTML** (WHATWG), **CSS** (W3C), and **JavaScript** (Ecma International, as ECMAScript). No company owns them, anyone can read them for free, and anyone can take part in writing them. You will meet the organisations behind them in Course 0.7.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)

