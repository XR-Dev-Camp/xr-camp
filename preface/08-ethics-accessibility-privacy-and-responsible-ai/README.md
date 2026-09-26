# Ethics, Accessibility, Privacy, and Responsible AI

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `preface` · **Lesson:** `ethics-accessibility-privacy-and-responsible-ai-08` · **Time:** about 7 hours · 10 sessions of 45 minutes · about 3 weeks at 4 sessions a week

---

> Audit a digital experience and publish a personal ethical development pledge.

---

## Learning objectives

By the end of this project you will be able to:

1. Explain why the choices developers make can help or harm real people.
2. Describe disability and accessibility, and the four WCAG principles.
3. Apply data minimisation, and recognise when consent is not real.
4. Name and recognise common deceptive design patterns.
5. Describe the particular risks of immersive experiences, and how to reduce them.
6. Explain how AI systems can be biased, and why people must know when they are talking to AI.
7. Respect copyright, credit others' work, and check where content comes from.
8. Write a personal pledge for how you will build.

## Prerequisites

- **Courses 0.1–0.7.** In particular, you have met WCAG in Course 0.4.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A modern browser | The site you audit, and your report | Free |
| A plain text editor | Writing your report and pledge | Free |
| Your keyboard | Testing without a mouse | Free |

## What you will build

An ethics audit report of **MegaDeals**, a fictional online shop made for this lesson with problems planted on purpose, and your own **pledge**: the promises you make about everything you will build.

The reference solution in [`completed/`](completed/) is Ana's report and pledge. The shop is in [`starter/shop-demo.html`](starter/shop-demo.html). It is deliberately bad: do not copy anything from it.

## Folder guide

```text
08-ethics-accessibility-privacy-and-responsible-ai/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html       # Begin here: your report, with 7 TODOs
│   └── shop-demo.html   # The fictional shop you audit
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. Copy this lesson's `starter` folder into your `xr-camp` folder and rename it `ethics-audit`.
2. Open `ethics-audit/shop-demo.html` in your browser: this is what you audit.
3. Open `ethics-audit/index.html` in your browser and your text editor: this is your report.

## The story

### Technology is not neutral

Every choice a developer makes decides who can use a product, what it does with their information, and how it treats them. A button built as a `div` shuts out keyboard users. A pre-ticked box shares someone's data without them really choosing. A face-recognition system trained mostly on light-skinned faces fails more often on dark-skinned ones. None of these needs bad intentions: only a developer who did not ask the right questions. This lesson is about asking them.

### Accessibility and disability

The World Health Organization estimates that about 1.3 billion people, around one in six, live with a significant disability. Some are blind or have low vision; some are Deaf or hard of hearing; some cannot use a mouse or a touchscreen; some find complex pages hard to follow. Many people become disabled at some point in their lives, through age, illness, or injury, and anyone can be temporarily limited: a broken arm, bright sunlight on a screen, a noisy bus.

The **Web Content Accessibility Guidelines (WCAG)** describe how to build for all of them, organised around four principles, often remembered as **POUR**:

- **Perceivable:** people can see, hear, or feel the content. Images have text alternatives; videos have captions.
- **Operable:** people can use it: with a keyboard, with enough time, without flashing that could trigger seizures.
- **Understandable:** the content and controls are clear and predictable, and errors are explained.
- **Robust:** it works with browsers and assistive technology, now and in the future.

You have followed these principles since your first lesson. From here on, you will also test for them.

### Privacy and data minimisation

Every piece of personal information you collect is a responsibility: it must be stored safely, and it can be stolen, leaked, or misused. The simplest rule is **data minimisation**: collect only what you need, keep it only as long as you need it, and never collect "just in case".

**Consent** means a real choice: freely given, informed, and easy to take back. A box that is already ticked, a "yes" button bigger than the "no", or a cancel process hidden behind phone calls is not real consent. Many countries now have data-protection laws, including in Latin America and China, and they increasingly say the same.

### Deceptive design patterns

**Deceptive patterns** (also called dark patterns, a name coined by the designer Harry Brignull in 2010) are designs that trick people into doing things they did not mean to do. Common ones:

| Pattern | What it does |
| --- | --- |
| **Fake urgency and scarcity** | Countdowns and "only 2 left!" messages that are not true |
| **Hidden costs** | Fees that appear only at the last step |
| **Confirmshaming** | Making you feel foolish for saying no |
| **Pre-ticked boxes** | Agreeing on your behalf unless you notice |
| **Hard to cancel** | Easy to join, almost impossible to leave |
| **Nagging** | Asking again and again until you give in |

### Safety in immersive environments

3D and XR bring new responsibilities:

- **Comfort.** Movement you do not control can cause motion sickness. Never move the camera on its own; offer seated modes and teleporting.
- **Physical safety.** People in a headset cannot see the real room. Keep experiences within reach, and warn before anything needs movement.
- **Personal space and harassment.** In shared spaces, people need ways to block, mute, report, and keep others at a distance.
- **Sensitive data.** Headsets can record head and hand movement, eye direction, and room layouts, which can reveal a lot about a person. Treat them as personal data.

### Cultural representation

Who appears in your images, avatars, and stories, and how? Show people and cultures, including your own, as they would want to be shown: not as stereotypes, costumes, or decoration. When you tell someone else's story or use their cultural heritage, ask them, and credit them.

### Bias and responsible AI

AI systems learn from data, and data reflects the world, including its unfairness. A system trained mostly on one language, accent, or skin tone will often work worse for everyone else. Responsible AI means:

- **Testing** with the people it will be used by, including in their own languages.
- **Disclosing** when people are talking to AI, and what it is used for.
- **Keeping a human responsible** for important decisions.
- **Checking** AI output before you trust it or publish it.

You will use AI as a development assistant in Course 2.8, with exactly these rules.

### Copyright and provenance

Images, music, 3D models, fonts, and code all belong to someone. Before you use something, check its **licence**: Creative Commons licences, for example, often require you to credit the creator, and some forbid commercial use. Every XR Camp project has an `ATTRIBUTION.md` file for exactly this.

**Provenance** means knowing where content came from, which matters more now that AI can generate realistic images, voices, and video. Say when something is AI-generated, and be careful with content whose origin you cannot check.

### The XR Guild

The **XR Guild** is a professional association for people who work in XR, built around ethical practice. Read its principles on its website, and compare them with your own pledge.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; read **Technology is not neutral**; TODOs 1–2 | Your report open, with your name on it |
| 2 | Read **Accessibility and disability**; test MegaDeals with your keyboard | Notes on what you could not do |
| 3 | TODO 3 | The accessibility table |
| 4 | Read **Privacy and data minimisation**; TODO 4 | The privacy table |
| 5 | Read **Deceptive design patterns**; TODO 5 | The deceptive patterns table |
| 6 | Read **Bias and responsible AI**; TODO 6 | The AI section |
| 7 | Read **Safety**, **Representation**, **Copyright**, and **The XR Guild** | Notes for your pledge |
| 8 | TODO 7: your pledge | A pledge in your own words |
| 9 | [`tests/checklist.md`](tests/checklist.md), then Challenge 1: a real site | A second audit |
| 10 | Another challenge, then **Submitting your work** | Your report and pledge in your portfolio |

### How to audit

1. **Put the mouse away.** Press **Tab** through the whole page. Can you reach and press everything?
2. **Read everything**, including the small print and the grey text.
3. **Fill in the form** (without submitting). For every field, ask: does this shop really need this?
4. **Wait and reload.** Does anything change that should not?
5. **Ask who could be harmed**, and how you would fix it.

## Key code explained

This lesson is mostly about judgement, not code. Two things to notice in `shop-demo.html`:

- **`<div class="buy" onclick="...">`** looks like a button, but it is not one: it cannot be reached with Tab or pressed with Enter. A real `<button>` gets all of that for free.
- **The countdown script** sets the timer to 5:00 every time the page loads. Reading code like this is how you prove urgency is fake.

## Accessibility requirements

For your own report:

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| Tables have captions and headers | 1.3.1 | Findings keep their meaning for screen-reader users. |
| Headings in order | 1.3.1, 2.4.6 | Your report is easy to navigate. |
| Links say where they go | 2.4.4 | "MegaDeals", not "click here". |
| `lang` matches your language | 3.1.1 | Correct pronunciation. |

## Performance considerations

Ethics includes cost: a page that downloads megabytes of trackers and images costs people on metered connections real money. When you audit a real site in Challenge 1, count its requests in the Network tab, as you did in Course 0.3.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Only listing problems | The report does not help anyone | Give a fix for each problem |
| Blaming the people who made it | Defensiveness, no change | Describe the effect on people, and the fix |
| Auditing only with a mouse | You miss the most common barrier | Always start with the keyboard |
| Writing a pledge you cannot keep | It means nothing | Five real promises beat twenty vague ones |

## Troubleshooting

**I cannot find the deceptive patterns.** Read the grey text, wait five minutes, and reload the page. Then read the countdown script at the bottom of the file.

**My tables look broken.** Every row needs `<tr>` and `</tr>`, and every row needs the same number of cells as the header.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: audit a real website you use.
2. **[Creative](challenges/challenge-2.md)**: write your pledge in your own language, and share it with someone.
3. **[Explorer](challenges/challenge-3.md)**: test an AI tool for bias in your language.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take a screenshot of your pledge.
3. Keep your report in your learner journal. Share your pledge with other developers (see [where to share your work](../../docs/en/community.md)).
4. In your journal, answer: which finding would you most want to fix, and why?

## Further reading

- [W3C: Introduction to web accessibility](https://www.w3.org/WAI/fundamentals/accessibility-intro/)
- [W3C: WCAG 2 at a glance](https://www.w3.org/WAI/standards-guidelines/wcag/glance/)
- [Deceptive Design](https://www.deceptive.design/): examples of deceptive patterns
- [Creative Commons: About the licences](https://creativecommons.org/cc-licenses/)
- [XR Guild](https://xrguild.org/)

## Women to Know

**Nina da Hora** is a Brazilian computer scientist widely known as an anti-racist hacker ("hacker antirracista"). Her master's research at UNICAMP, completed in 2026, studied why facial-recognition and computer-vision systems fail on Black faces, and in 2020 she founded Instituto da Hora, a nonprofit working for digital rights.

Her work is a reminder of the first idea in this lesson: technology is not neutral. Asking who a system fails, and why, is part of a developer's job.

_Facts from public sources, checked 2026. Spotted an error? [Tell us](https://github.com/XR-Dev-Camp/xr-camp/issues)._

## Standards spotlight

**WCAG** is written by the W3C's Accessibility Guidelines Working Group, and it is the basis of accessibility law in many countries. The current version, **WCAG 2.2**, was published in October 2023. The next generation, **WCAG 3**, is being written in public, and anyone can read the drafts and send comments.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
