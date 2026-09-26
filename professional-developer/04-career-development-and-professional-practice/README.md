# Career Development and Professional Practice

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `professional-developer` · **Lesson:** `career-development-and-professional-practice-04` · **Time:** about 12 hours · 16 sessions of 45 minutes · about 4 weeks at 4 sessions a week

---

> Create a professional career package and public case study.

---

## Learning objectives

By the end of this project you will be able to:

1. Build an accessible CV as a plain HTML page, with its own print stylesheet so it prints or saves to PDF cleanly.
2. Write a public case study of a real project that explains your process and trade-offs, not only the finished result.
3. Write a LinkedIn-style profile (headline, about, experience, skills) that can be pasted into any professional networking service.
4. Prepare a portfolio walkthrough script and a list of real questions to ask an interviewer.
5. Identify realistic ways to find freelance clients, and write a simple, specific proposal.
6. Estimate a project's time as a range with a buffer, without relying on a market rate you cannot verify.
7. Write a basic invoice, and describe payment options in general terms appropriate to a client's country.
8. Explain, in plain language, what a freelance contract's scope, payment terms, intellectual property, and asset licensing commonly cover — while recognising this is not legal advice.

## Prerequisites

- **Course 1.9: Web Developer Portfolio** — this lesson adds a CV and a case study to the portfolio site you already built.
- **Course 3.7: Interactive Web3D Experience** and **Course 4.6: Immersive Web Experience** — your case study is about the virtual cultural exhibit these two capstones built.
- **Preface: Careers in the Spatial Web** — read only; this lesson turns that overview into real, finished documents.
- Comfortable writing semantic HTML and reading a stylesheet; no new programming language is introduced here.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A text editor (for example VS Code) | Write your documents and pages | Free |
| A modern browser | Open your pages, and test printing to PDF | Free |
| A local server (the one already used throughout this course) | View your pages at `http://`, not `file://` | Free |

No paid account, sign-up, or subscription is required anywhere in this lesson.

## What you will build

A small, real career package: an accessible CV you could actually send to someone, a public case study of the virtual cultural exhibit you built across Phases 3 and 4, a LinkedIn-style profile, interview preparation, and three short reference documents on freelancing and contracts. None of this is a simulation exercise with invented facts — every document is meant to describe your own real XR Camp work, in your own words.

The reference solution is in [`completed/`](completed/): Ana's own filled-in career package. Your starter project has **14 numbered TODOs** across seven files.

## Folder guide

```text
04-career-development-and-professional-practice/
├── README.md
├── starter/                    # begin here
│   ├── index.html              # TODOs 1-4: your accessible CV
│   ├── print.css                # TODO 5: the print stylesheet
│   ├── case-study.html          # TODOs 6-7: the exhibit case study
│   ├── linkedin-profile.md      # TODO 8
│   ├── interview-prep.md        # TODO 9
│   ├── freelancing-basics.md    # TODOs 10-13
│   ├── contract-overview.md     # TODO 14
│   └── styles.css
├── completed/                   # reference solution (Ana's career package)
├── challenges/                  # Three challenges: Foundation is required
├── tests/                       # self-review checklist
├── assets/
└── screenshots/
```

## Setup

1. Open `starter/index.html` through the local server this course uses (not by double-clicking the file).
2. Have your Phase 1 portfolio (Course 1.9) and your Phase 3/4 capstone exhibits open in other tabs; you will link to and summarise real work from both.
3. Read `preface/09-careers-in-the-spatial-web`'s headings once, as a refresher on the range of roles this course prepares you for.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Step 1: what a career package is, and why each piece exists | A short list, in your journal, of which of your real projects will anchor each document |
| 2 | Step 2: your CV's header and contact section (TODO 1) | A name, role line, and a safe, professional contact list |
| 3 | Step 2, continued: the skills table (TODO 2) | A table of skills you have actually practised |
| 4 | Step 2, continued: your projects timeline (TODO 3) | Real project entries, linked to finished work |
| 5 | Step 2, continued: education and availability (TODO 4) | A finished CV page, ready to view on screen |
| 6 | Step 3: writing print styles (TODO 5) | A CV that also prints, or saves to PDF, cleanly |
| 7 | Step 4: the case study's problem, role, and approach (TODO 6) | The first half of a real case study |
| 8 | Step 4, continued: result and what you would change (TODO 7) | A finished public case study |
| 9 | Step 5: a LinkedIn-style profile (TODO 8) | A headline, about section, and skills list ready to paste anywhere |
| 10 | Step 6: interview preparation (TODO 9) | A walkthrough script and a real list of questions to ask |
| 11 | Step 7: finding clients and a simple proposal (TODOs 10-11) | A filled-in proposal for a real or imagined small project |
| 12 | Step 7, continued: estimating with a buffer (TODO 12) | An honest hours estimate with a buffer, no invented rate |
| 13 | Step 7, continued: invoicing basics (TODO 13) | A short, correct description of what an invoice needs |
| 14 | Step 8: the contract overview (TODO 14) | A plain-language explanation of scope, payment, IP, and licensing |
| 15 | [`tests/checklist.md`](tests/checklist.md) | A complete, checked career package |
| 16 | One challenge extension, then **Submitting your work** | A published, shareable career package |

### Step 1: what a career package is

A career package is the set of documents that let a stranger judge your work without meeting you first: a CV that summarises it, a case study that explains one project in depth, a profile that fits a networking service's format, and preparation for the conversation that follows if someone is interested. Every document in this lesson is built from work you have already done in this course — the point is not to invent a career, but to describe a real one clearly enough that someone else can trust it.

### Step 2: your accessible CV (TODOs 1-4)

`index.html` is a plain HTML page, not a template from a resume-building service: you control every heading, every list, and every link, which means you also control whether it is accessible. Build it in order: a header with your name and a role line, a skills table, a projects timeline linking to work you have actually finished (your Phase 1 portfolio, and the virtual cultural exhibit), and an education and availability section.

Two rules matter throughout: never put a home address, a phone number, or a real personal email in this shared coursework — use an invented but real-looking address, the way Ana's portfolio does — and never list a skill you have not actually practised. A CV that undersells you honestly is far less risky than one a follow-up question exposes as inflated.

```html
<ul class="contact-list" role="list">
  <li><a href="mailto:ana.builds@example.com">ana.builds@example.com</a></li>
  <li>Remote, based in a UTC-6 time zone</li>
</ul>
```

### Step 3: a print stylesheet (TODO 5)

A CV that only looks good on screen fails the moment someone prints it or saves it as a PDF to attach to an email. `print.css` is loaded with `media="print"`, so it never affects how the page looks in a browser tab; it only applies when the page is actually printed.

```html
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="print.css" media="print">
```

A good print stylesheet removes anything unusable on paper (a "Print this page" button prints nothing useful once it is already printed), switches to black text on white for ink and contrast, and prints a link's destination next to its text, since a reader on paper cannot click it:

```css
a[href^="http"]::after {
  content: " (" attr(href) ")";
}
```

### Step 4: a public case study of the virtual exhibit (TODOs 6-7)

`case-study.html` is written for a stranger, not for you. Someone reading it was not there while you built your Phase 3 and Phase 4 exhibit, so it needs to state what a screenshot alone cannot show: the problem you set out to solve, your role, the real steps of your approach (loading models, measuring and improving performance, adding WebXR, checking accessibility), the result, and — just as important — what you would do differently next time. A case study that only lists finished features reads like a product page; one that names a real trade-off reads like the work of a professional.

State any performance numbers the way Course 3.6 taught you to: "on my machine," never as a general claim.

### Step 5: a LinkedIn-style profile (TODO 8)

`linkedin-profile.md` is written in the shape a professional networking profile expects — a headline, a short "about" paragraph, experience, and a skills list — so it can be adapted to whichever real service you eventually use, without being tied to one company's product. Keep the headline to one line naming what you build and one thing that makes your work distinct, and keep every skill honest.

### Step 6: interview preparation (TODO 9)

`interview-prep.md` has two parts. A **portfolio walkthrough script** is a short, rehearsed path through your own work: open with the problem you solved, show the accessible fallback before the flashy version, demonstrate one interaction by keyboard, name one real trade-off, and close with what you would do next. **Questions to ask the interviewer** matter just as much as your answers: they are how you find out whether a role actually fits you, including, for a remote role, how the team works across time zones.

### Step 7: freelancing basics (TODOs 10-13)

`freelancing-basics.md` covers four things a new freelancer needs immediately: realistic ways to find a first client (starting with people and organisations who can already see your real work), a simple proposal template that states what is, and is not, included, an honest way to estimate time as a range plus a buffer instead of a single guessable number, and what a basic invoice must contain. This document also covers working with clients in a different time zone, including clients in Latin America or mainland China: agree the meeting time, the currency, and the payment method in writing, and ask rather than assume what is normal on the client's end. No rate, fee, or price appears anywhere in this document; naming one here would go stale and could mislead you later.

### Step 8: an overview of contracts (TODO 14)

`contract-overview.md` explains four things almost every freelance contract covers — scope, payment terms, intellectual property, and licensing of assets — in plain language, and is marked clearly, at the top and here again: **this is not legal advice, and laws differ by country.** Its job is to help you recognise what a real contract should cover and ask informed questions, not to replace a qualified professional when real money or a real dispute is involved.

## Key code explained

- **`media="print"`.** A `<link>` attribute that tells the browser to apply that stylesheet only when the page is printed or exported to PDF, never on screen, so one HTML file can have two clean designs.
- **`content: attr(href)` in `::after`.** Generated content that reads an element's own `href` attribute and prints it after the link text — useful only in print, since a screen reader already announces a link's destination another way.
- **`break-inside: avoid`.** A print rule asking the browser not to split one CV entry, like a single job, across a page break.
- **A range plus a buffer.** Naming a task's estimate as "6-9 hours" instead of "7 hours," then adding roughly 15-25% on top for the unplanned parts every real project has, communicates honest uncertainty instead of false precision.
- **"Not legal advice."** A plain statement that a document explains general practice, not a specific jurisdiction's law, so the reader knows to check with a qualified person before relying on it for a real decision.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| Document language is declared | 3.1.1 | Screen readers choose the correct pronunciation and voice |
| One `<h1>`, logical heading order in every section | 2.4.6, 1.3.1 | Lets a screen reader user navigate the CV by heading, the way a sighted reader skims it |
| Every link's purpose is clear from its text or context | 2.4.4 | "Case study: the virtual cultural exhibit" tells a screen reader user what they will get; "click here" does not |
| Lists styled with `list-style: none` keep `role="list"` | 1.3.1 | Safari drops a list's implicit list semantics once it has no bullets, unlike other browsers |
| Table headers use `scope` and the table has a caption | 1.3.1 | A screen reader can announce which skill area a row belongs to |
| Focus is visible on every link and button | 2.4.7 | Keyboard users must always see where they are |
| Colour contrast meets AA | 1.4.3 | Every heading and body of text must be readable |
| Content reflows without loss at narrow widths | 1.4.10 | A CV should be as readable on a phone as on a laptop |

## Performance considerations

This lesson's deliverable is text and one small print stylesheet: no images, no 3D, and only a few lines of JavaScript for the print button. Its whole weight is a stylesheet already shared with the rest of the course. There is nothing here to optimise for load time; the discipline that matters instead is keeping every document short enough that a busy hiring manager or client will actually finish reading it.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Listing a skill you have not actually practised | A follow-up question in an interview exposes the gap | List only what you have really built or used |
| Putting a real home address, phone number, or personal email in shared coursework | Personal information ends up in a public repository | Use an invented but real-looking contact address, as Ana's does |
| Estimating a project as one fixed number of hours | The first small surprise makes the estimate wrong and looks like a broken promise | Give a range, and add an explicit buffer |
| A proposal with no list of what is *not* included | The project quietly grows without anyone agreeing to the extra work | State what is out of scope, and how a change gets handled |
| Naming a specific rate, fee, or "typical" price in a shared document | The number goes stale, or misleads someone in a different market | Describe method and process; leave the number for a real, private conversation |
| Assuming a client's payment method or time zone habits without asking | A payment fails, or a meeting is scheduled at an unworkable hour for one side | Agree currency, payment method, and meeting times in writing, explicitly |

## Troubleshooting

**The print preview looks unstyled.** Check that `print.css` is linked with `media="print"` (not `media="screen"` or no media attribute at all), and that you are triggering an actual print preview (Ctrl/Cmd+P), not just resizing the window.

**Firefox's print preview looks different from Chrome's.** Firefox's print preview opens as a separate simplified view with its own "More settings" panel for margins and scale; check "Print backgrounds" is off if you want the page to use `print.css`'s plain white background rather than any screen colours that leak through.

**A link's destination does not appear when printed.** The `::after` rule only matches links whose `href` starts with `http` or `mailto:`; a relative link like `case-study.html` deliberately does not print a raw path, since it makes no sense once the page is on paper.

**The accessibility checker flags a list.** If you added a `<ul>` styled with `list-style: none` and did not add `role="list"`, VoiceOver on Safari will read it as plain text with no list semantics at all; Chrome's and Firefox's screen reader support does not have this gap, which is exactly why it is easy to miss during testing.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: get one real person to read your CV and case study, and record their feedback honestly.
2. **[Creative](challenges/challenge-2.md)**: root your case study and proposal in a project or problem from your own language, culture, or community.
3. **[Explorer](challenges/challenge-3.md)**: add `schema.org` structured data to your CV page, and check it validates.

## Submitting your work

1. Work through [`tests/checklist.md`](tests/checklist.md) completely.
2. Take a screenshot of your finished `index.html`, printed to PDF, and of your case study.
3. Keep them in your learner journal and portfolio. When the XR Camp community opens, share them there.
4. Journal question: which document in this career package was hardest to write honestly, and why?

## Further reading

- [MDN: CSS media queries and the print media type](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/print) — how `media="print"` and `@page` work
- [MDN: Generated content (`::before`/`::after`) and `attr()`](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_generated_content) — how to print a link's destination
- [WCAG 2.2 quick reference](https://www.w3.org/WAI/WCAG22/quickref/) — the success criteria this lesson cites
- [schema.org: Person](https://schema.org/Person) — the structured-data vocabulary used in the Explorer challenge
- [W3C XR Accessibility User Requirements (XAUR)](https://www.w3.org/TR/xaur/) — referenced by the case study's exhibit work

## Women to Know

**Sandra Cauffman** grew up in poverty in San José, Costa Rica, and became a Costa Rican electrical engineer and physicist. She joined NASA in 1988 and rose through senior leadership over a 37-year career: deputy project manager of the MAVEN Mars mission, deputy (and for 17 months, acting) director of NASA's Earth Science Division, and later deputy director of its Astrophysics Division. She retired from NASA in 2025 to focus on mentoring young people, especially women and Latinas, in STEM.

A career built across decades, several very different roles, and eventually a deliberate shift toward mentoring is exactly the kind of long professional practice this lesson's small documents are a first sketch of: naming your work honestly, at every stage, so the next opportunity can find you.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

This lesson leans on two ordinary web standards rather than a single specification. The CSS Working Group's print-related features — the `print` value for the `media` attribute, the `@page` rule, and properties like `break-inside` — are part of the same CSS the rest of this course has used, just applied to a different output device than a screen. Separately, schema.org (a shared vocabulary maintained jointly by Google, Microsoft, Yahoo, and Yandex, built to be embedded in ordinary HTML) defines types like `Person` that a search engine or another tool can read directly out of a page like this lesson's CV, which is what the Explorer challenge tries.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
