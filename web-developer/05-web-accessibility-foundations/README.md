# Web Accessibility Foundations

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `web-developer` · **Lesson:** `web-accessibility-foundations-05` · **Time:** about 10 hours · 14 sessions of 45 minutes · about 4 weeks at 4 sessions a week

---

> Audit and repair an inaccessible website.

---

## Learning objectives

By the end of this project you will be able to:

1. Audit a web page using the keyboard, a screen reader, zoom, and automated tools.
2. Explain each problem you find: what it is, who it affects, and which WCAG 2.2 success criterion it fails.
3. Fix structure, images, links, forms, colour, focus, and motion problems.
4. Use a screen reader to navigate by headings, links, landmarks, and form fields.
5. Explain what automated tools can and cannot find.
6. Write an audit report that helps people fix things.

## Prerequisites

- **Course 0.8: Ethics, Accessibility, Privacy, and Responsible AI.** You know POUR and the idea of an audit.
- **Courses 1.1–1.4.** You have built accessible structure, forms, styles, and responsive layouts.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| Your keyboard | The most important test | Free |
| A screen reader: [NVDA](https://www.nvaccess.org/) (Windows), VoiceOver (macOS and iPhone, built in), or TalkBack (Android, built in) | Hearing the page | Free |
| [axe DevTools](https://www.deque.com/axe/devtools/) or [WAVE](https://wave.webaim.org/extension/) browser extension | Automated checks | Free versions |
| [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) | Colour contrast | Free |

## What you will build

Two things:

1. **A repaired page.** The starter is the Riverside **events page**, built with at least fifteen accessibility problems on purpose. You find every one, and fix it.
2. **An audit report**, `audit.html`: a table of every problem, the WCAG criterion it fails, who it affects, and how you fixed it.

The reference solution is in [`completed/`](completed/): the repaired page and Ana's audit.

## Folder guide

```text
05-web-accessibility-foundations/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html       # The inaccessible events page: audit and fix it
│   ├── centre-960.jpg, divider.svg
│   └── 3d-moment.html   # An inaccessible 3D scene, for the 3D moment
├── completed/
│   ├── index.html       # The repaired page
│   ├── audit.html       # Ana's audit report
│   └── 3d-moment.html   # The repaired 3D scene
├── challenges/          # Three optional extensions
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. Copy this lesson's `starter` folder into your `xr-camp` folder and rename it `accessibility-audit`.
2. Make a copy of `index.html` called `original.html`, and never change it: you will compare against it at the end.
3. Create an empty `audit.html` with a heading and a table for your findings (copy the structure from Course 0.8's report).
4. Install axe DevTools or WAVE, and turn on your screen reader once to make sure it works.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; read **Who this is for** | Your audit folder ready |
| 2 | Step 1: keyboard test | Keyboard findings |
| 3 | Step 2: learn your screen reader | You can move by headings and links |
| 4 | Step 2: screen-reader test | Screen-reader findings |
| 5 | Step 3: zoom, colour, and motion | Visual findings |
| 6 | Step 4: automated tools | Tool findings, and what they missed |
| 7 | Step 5: write the report | A complete audit table |
| 8 | Step 6: fix structure: language, title, headings, landmarks | A page with a clear outline |
| 9 | Step 6: fix images, links, and colour | Meaningful alt text and links |
| 10 | Step 6: fix the table and the form | A readable table and a usable form |
| 11 | Step 6: fix focus, motion, and contrast | A page you can use and read |
| 12 | Step 7: test again, and compare with `original.html` | Every finding fixed |
| 13 | The **3D moment** | An audited, repaired 3D scene |
| 14 | [`tests/checklist.md`](tests/checklist.md), a challenge, and **Submitting your work** | A repaired page and a report |

### Who this is for

About one in six people worldwide lives with a significant disability, and many more have temporary or situational limits: a broken arm, bright sunlight, a noisy room, a slow connection. An accessibility audit asks one question again and again: **who cannot use this, and why?**

The four WCAG principles from Course 0.8 organise the answers: **perceivable**, **operable**, **understandable**, and **robust**.

### Step 1: the keyboard test

Put the mouse away. On `index.html`:

1. Press **Tab** from the top. Is there a skip link? Can you **see** where focus is at every moment?
2. Can you reach **everything** you could click? Can you use it with **Enter** or **Space**?
3. Does focus move in a **logical order**, top to bottom?

Write down every problem, with where it happened.

### Step 2: the screen-reader test

Learn the basic commands for your screen reader first:

| Action | NVDA (Windows) | VoiceOver (Mac) | TalkBack (Android) |
| --- | --- | --- | --- |
| Turn on or off | **Ctrl + Alt + N** | **⌘ + F5** | Settings → Accessibility → TalkBack |
| Read the next item | **↓** | **Control + Option + →** | Swipe right |
| Next heading | **H** | **Control + Option + ⌘ + H** | Choose "Headings" in the reading controls, then swipe down |
| List all headings or links | **Insert + F7** | **Control + Option + U** (the rotor) | Reading controls |
| Activate | **Enter** | **Control + Option + Space** | Double-tap |

Then listen to the page. Ask: Is there a page title and a main heading? Can I move by headings? Does every image say something useful, or nothing at all if it is decorative? Does every link make sense on its own? Does every form field say what it is?

Your first time with a screen reader will feel strange and fast. Slow its speech down in its settings, and be patient: this is how many of your users read every page.

### Step 3: zoom, colour, and motion

1. **Zoom to 200%**, then 400%. Is anything cut off, or overlapping?
2. **Check every text colour** with the contrast checker: 4.5:1 for normal text.
3. **Is any information given only by colour?** Imagine the page in black and white.
4. **Does anything move** for more than five seconds? Can you pause it? Does it stop when "reduce motion" is on in your system settings?

### Step 4: automated tools

Run axe DevTools or WAVE on the page. They find some problems quickly and reliably, such as missing alt text, missing labels, low contrast, and a missing page language, and they are worth running on every page you build.

But notice what they **cannot** find: whether alt text is **meaningful**, whether a link's words make sense, whether colour is the only clue, whether the focus order is **logical**. Automated tools find only a part of accessibility problems. The rest takes a person.

### Step 5: write the report

For every problem, write one row:

| # | Problem | WCAG 2.2 | Who it affects | Fix |
| --- | --- | --- | --- | --- |
| 5 | Photo has no alt text | 1.1.1 | Blind and low-vision people | Alt text that says what matters: the ramp |

Describe the effect on **people**, not only the rule. A report that says "fails 1.1.1" is correct; one that says "blind visitors cannot tell there is a step-free entrance" gets fixed.

Look up each criterion in [WCAG 2.2 at a glance](https://www.w3.org/WAI/standards-guidelines/wcag/glance/) and the W3C's "Understanding" pages, which explain every criterion in plain language.

### Step 6: fix everything

Fix the page, one finding at a time, in the order of your report. Number each fix in an HTML comment to match your report, as the reference solution does. You already know how to do almost all of it from Courses 1.1 to 1.4.

Two fixes that may be new:

- **Moving content:** the simplest fix for a scrolling banner is to make it still. If movement is essential, add a pause button, and respect `prefers-reduced-motion`.
- **Positive `tabindex`:** delete it. `tabindex="0"` (reachable in natural order) and `tabindex="-1"` (reachable only by script) are useful; any number above zero breaks the order for everyone.

### Step 7: test again

Repeat Steps 1 to 4 on your repaired page. Then open `original.html` and your repaired `index.html` side by side, with your screen reader on. Hearing the difference is the best way to understand what you did.

## Key code explained

**`alt=""`.** An empty alt tells screen readers the image is decorative, so they skip it. Leaving `alt` out completely is different: many screen readers then read the file name.

**`role="status"`.** A live region, like `aria-live="polite"`: the thank-you message is announced when it appears, without moving focus.

**`<th scope="row">`.** The first cell of each row is a header too, so a screen reader says "Community lunch, Places, Full".

**The first rule of ARIA:** if a native HTML element does the job, use it. `<button>` is always better than `<span role="button" tabindex="0">`, because it already works with the keyboard and every assistive technology.

## 3D moment

Open [`starter/3d-moment.html`](starter/3d-moment.html) and audit it like the events page. It is a 3D logo that spins forever, has no description, and changes colour only when you click it with a mouse. Find at least three problems. Then compare with [`completed/3d-moment.html`](completed/3d-moment.html), where:

1. a **text description** says what is in the scene, and updates when it changes;
2. a real **button** does the same thing as clicking the cube, so the keyboard can reach it;
3. the spin is **slower**, can be **paused**, and starts paused for people who ask for reduced motion.

Automated tools cannot see inside a 3D scene at all, so every 3D audit is a manual audit. You will use this checklist again in Phases 3 and 4: [`docs/en/xr-accessibility.md`](../../docs/en/xr-accessibility.md).

## Accessibility requirements

Your repaired page must pass every item in [`tests/checklist.md`](tests/checklist.md), including these WCAG 2.2 success criteria:

| Requirement | WCAG 2.2 |
| --- | --- |
| Images have suitable text alternatives | 1.1.1 |
| Structure is in the HTML: headings, tables, labels, landmarks | 1.3.1 |
| Colour is not the only way to tell | 1.4.1 |
| Text contrast is at least 4.5:1 | 1.4.3 |
| Everything works with the keyboard | 2.1.1 |
| Moving content can be paused | 2.2.2 |
| A skip link bypasses repeated content | 2.4.1 |
| The page has a descriptive title | 2.4.2 |
| Focus order is logical | 2.4.3 |
| Link purpose is clear | 2.4.4 |
| Focus is visible | 2.4.7 |
| The page language is set | 3.1.1 |
| Form fields have labels | 3.3.2 |
| Controls expose their name and role | 4.1.2 |

## Performance considerations

Accessibility fixes are almost free for performance: real HTML elements are lighter than `div`s with scripts attached, and removing the endless animation saves battery and processing on every device.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Trusting an automated score | Many problems go unfound | Always test with keyboard and screen reader |
| `alt="image"` or a file name | Noise, not information | Say what matters, or `alt=""` |
| Adding ARIA to fix a `div` button | Fragile, and still incomplete | Use a real `<button>` |
| Fixing the look but not the code | "Full" in red and bold: still colour only | Say it in words |
| Reporting only the rule number | Nobody understands the impact | Say who is affected, and how |

## Troubleshooting

**My screen reader talks over everything.** Press **Ctrl** to stop NVDA or VoiceOver speaking. Slow the speech rate down in its settings.

**VoiceOver's keyboard commands do nothing.** Check that VoiceOver is on (**⌘ + F5**), and hold **Control + Option** together with the other keys.

**The automated tool says the page is fine, but it is not.** That is the lesson. Trust your keyboard and your ears.

## Challenge extensions

Three optional extensions, in [`challenges/`](challenges/):

1. **[Foundation](challenges/challenge-1.md)**: record a keyboard-only walkthrough of your repaired page.
2. **[Creative](challenges/challenge-2.md)**: add captions and a transcript to a short video about your community.
3. **[Explorer](challenges/challenge-3.md)**: write an accessibility statement for your site.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take a screenshot of your audit table, and one of the automated tool's result for your repaired page.
3. Keep them in your learner journal and portfolio: an audit report is a strong portfolio piece. When the XR Camp community opens, share it there.
4. In your journal, answer: what did you hear with the screen reader that surprised you?

## Further reading

- [W3C: Easy checks, a first review of web accessibility](https://www.w3.org/WAI/test-evaluate/preliminary/)
- [W3C: WCAG 2 at a glance](https://www.w3.org/WAI/standards-guidelines/wcag/glance/)
- [WebAIM: Using NVDA to evaluate web accessibility](https://webaim.org/articles/nvda/)
- [WebAIM: Using VoiceOver to evaluate web accessibility](https://webaim.org/articles/voiceover/)
- [W3C: Stories of web users](https://www.w3.org/WAI/people-use-web/user-stories/)

## Women to Know

**Shaomei Wu** was a research scientist at Facebook and Instagram, where she was lead author of the research that designed and deployed Facebook's automatic alt text: descriptions of photos generated for blind people using screen readers. She later founded and leads **AImpower.org**, a US nonprofit that builds technology together with marginalised communities, such as people who stutter.

Automatic alt text is exactly the kind of help this lesson is about, and also a reminder of its limit: a machine can say "two people smiling outdoors", but only a person who knows the context can write "the centre's step-free entrance".

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

WCAG 2.2 is organised as **success criteria** at three levels: A, AA, and AAA. Most laws and policies require **level AA**, which is what XR Camp aims for. The W3C also publishes **WAI-ARIA**, the attributes like `aria-describedby` and `aria-pressed` you have used, and its guide to using them well.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
