# Developer Tools, Debugging, and Testing

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `web-developer` · **Lesson:** `developer-tools-debugging-and-testing-07` · **Time:** about 9 hours · 12 sessions of 45 minutes · about 3 weeks at 4 sessions a week

---

> Complete a guided debugging and accessibility challenge.

---

## Learning objectives

By the end of this project you will be able to:

1. Use the browser's developer tools: Elements and Styles, Console, Network, device mode, and the debugger.
2. Find why a style does not apply, and fix it.
3. Read a JavaScript error, find its line, and fix its cause.
4. Pause a script with a breakpoint and step through it line by line.
5. Find accessibility problems with automated tools and with your own testing.
6. Test systematically with a checklist.
7. Write a bug report someone else can act on.

## Prerequisites

- **Course 1.6: JavaScript Foundations.** You built the programme explorer.
- **Course 1.5: Web Accessibility Foundations.** You know how to audit a page.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| Chrome, Edge, or Firefox, with developer tools | Every step | Free |
| [axe DevTools](https://www.deque.com/axe/devtools/) or [WAVE](https://wave.webaim.org/extension/) | Automated accessibility checks | Free versions |
| A screen reader (NVDA, VoiceOver, or TalkBack) | Hearing the page | Free |
| A local server, such as VS Code's Live Server (recommended) | The Network panel works best over `http://` | Free |

## What you will build

Nothing new, on purpose: you will **fix** something. The starter is the programme explorer from Course 1.6 with **ten bugs** planted in its HTML, CSS, JavaScript, and accessibility. The guide below tells you the **symptoms**, as a user would report them, but not the causes. Your job is to find and fix every one, and write a bug report for each in `bug-reports.md`.

The reference solution in [`completed/`](completed/) is the fixed explorer, and Ana's ten bug reports.

## Folder guide

```text
07-developer-tools-debugging-and-testing/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html, explorer.js, styles.css   # The explorer, with 10 bugs
│   ├── bug-reports.md   # A template for your reports
│   └── 3d-moment.html   # A broken 3D scene
├── completed/
│   ├── index.html, explorer.js, styles.css   # Fixed
│   ├── bug-reports.md   # Ana's reports
│   └── 3d-moment.html   # The fixed scene
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. Copy this lesson's `starter` folder into your `xr-camp` folder as `debugging`.
2. Open it with a local server if you can (in VS Code, **Go Live** with the Live Server extension), or open `index.html` directly.
3. Open your developer tools: **F12**, or right-click the page and choose **Inspect**. On a Mac: **⌘ + Option + I**.

## The symptoms

A visitor sent the centre these complaints. Every one is real, and some have more than one cause.

1. "The page looks like a plain text document. Where are the colours?"
2. "No programmes appear at all."
3. "When I click the 'Who is it for?' label, the cursor jumps to the search box."
4. "The programme cards seem to have no names."
5. "On my phone I have to scroll sideways to see the filters."
6. "When I save a programme, its button does not change."
7. "The 'Free only' box ticks itself, and when I type 'lunch', nothing comes up."
8. "The count says there are 7 programmes in total, but there are 8."
9. "My screen reader says 'button', but not what the button does."
10. "My screen reader does not tell me when the results change."

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; Step 1: a tour of the developer tools | You can open every panel |
| 2 | Step 2: the Network panel | Symptom 1 fixed |
| 3 | Step 3: the Console | The first JavaScript error fixed |
| 4 | Step 3, continued | Programmes appear |
| 5 | Step 4: Elements and Styles | Symptoms 3, 4, and 6 fixed |
| 6 | Step 5: device mode | Symptom 5 fixed |
| 7 | Step 6: breakpoints | Symptom 7 fixed |
| 8 | Step 6, continued: stepping and watching values | Symptom 8 fixed |
| 9 | Step 7: accessibility tools and a screen reader | Symptoms 9 and 10 fixed |
| 10 | Step 8: test with a checklist, and finish your bug reports | Ten reports |
| 11 | The **3D moment** | A debugged 3D scene |
| 12 | [`tests/checklist.md`](tests/checklist.md), a challenge, and **Submitting your work** | A working explorer |

### Step 1: a tour of the developer tools

| Panel | What it shows | Use it when |
| --- | --- | --- |
| **Elements** (Firefox: **Inspector**) | The page's HTML as the browser sees it, live | Something is missing, in the wrong place, or has the wrong attribute |
| **Styles** (inside Elements; Firefox: **Rules**) | Every CSS rule on the selected element, including crossed-out losers | A style does not apply |
| **Console** | Errors, warnings, and your `console.log` messages | Anything involving JavaScript |
| **Network** | Every file the page requested, and whether it arrived | Something did not load |
| **Sources** (Firefox: **Debugger**) | Your scripts, with breakpoints | Code runs but does the wrong thing |
| **Device mode** | The page at any screen size | Layout problems on phones |
| **Performance** | What the browser spends its time on | The page is slow |

### Step 2: the Network panel (symptom 1)

Open **Network**, then reload the page. Every row is a file. Look at the **Status** column: **200** is fine; **404** means "not found". A 404 for a stylesheet means the page has no styles.

Compare the file name the page asks for with the name of the file on disk, letter by letter.

### Step 3: the Console (symptom 2)

Open **Console** and reload. A red message is an error, with the file and line number on the right. Click it to jump to the line.

`Cannot read properties of null` almost always means `querySelector` found **nothing**: the selector does not match any element. Compare it with the HTML. Fix one error, reload, and see if another appears: errors often hide behind each other.

### Step 4: Elements and Styles (symptoms 3, 4, and 6)

Right-click the problem and choose **Inspect**. The Elements panel jumps to that element.

- **Symptom 3:** a label is linked to a control by `for` and `id`. Look at the `id`s of the controls near it. Is any `id` used twice? An `id` must be unique on a page.
- **Symptom 4:** select a card's heading. In Styles, find which rule sets its `color`. What is it, and what is the background?
- **Symptom 6:** select a saved button. A property with a **yellow warning icon** or a line through it is invalid or overridden. Hover over the icon to see why.

You can edit styles right in the panel to test a fix, but those changes disappear on reload: copy the fix into your file.

### Step 5: device mode (symptom 5)

Turn on device mode (**Ctrl + Shift + M**, or **⌘ + Shift + M** on a Mac, with the tools open; in Firefox, **Responsive Design Mode**, **⌘ + Option + M** on a Mac) and choose 390 pixels wide. Something sticks out to the right. Select it, and look for a fixed `width` in Styles.

### Step 6: breakpoints (symptoms 7 and 8)

Some bugs cause no error: the code runs, but does the wrong thing. For those, **pause** it:

1. Open **Sources** (Firefox: **Debugger**) and open `explorer.js`.
2. Click the line number at the start of the `matches` function. A blue marker appears: a **breakpoint**.
3. Type "lunch" in the search box. The page freezes at your breakpoint.
4. Hover over any variable to see its value, or look in the **Scope** panel.
5. Press **Step over** (the curved arrow, or **F10**) to run one line at a time, and watch the values change.

Watch `freeCheckbox.checked` as you step through the `if` lines. Does it change? Should reading a value ever change it?

For symptom 8, a `console.log` is often quicker: log `programmes.length` just before the count is written, and compare it with the message.

### Step 7: accessibility tools and a screen reader (symptoms 9 and 10)

Run axe DevTools or WAVE. They will find one of the two remaining problems immediately. The other takes a person: turn on your screen reader, type in the search box, and listen. Should anything be announced? Compare the count paragraph with the explorer from Course 1.6.

### Step 8: test with a checklist, and report

Once everything is fixed, test the whole explorer with [`tests/checklist.md`](tests/checklist.md): every feature, every input method, at every width. A checklist catches what you forgot to try.

Then finish `bug-reports.md`. A good bug report lets someone who has never seen the problem reproduce it in one minute:

- a **title** that says what is wrong;
- **steps to reproduce**, numbered;
- **expected** and **actual** results;
- the **device and browser**;
- what you found, and how you fixed it.

"It doesn't work" is not a bug report. "In Chrome on Android, 'Free only' is ticked when the page loads, and typing 'lunch' shows no results" is.

## Key code explained

**`=` and `===`.** `=` **assigns**: it changes a value. `===` **compares**: it asks whether two values are equal. `if (freeCheckbox.checked = true)` changes the checkbox, every time. Some teams use a linter, a tool that warns about exactly this.

**Unique `id`s.** Many things depend on them: labels, `aria-describedby`, `querySelector`, in-page links. Two elements with the same `id` break all of them, often silently.

**Accessible names.** A button's name comes from its text. The ✕ in the search box is inside `<span aria-hidden="true">`, so screen readers ignore it, and the button has no text at all. It needs `aria-label="Clear search"`.

## 3D moment

Open [`starter/3d-moment.html`](starter/3d-moment.html). The lantern garden should have three lanterns against a night sky. It is broken in three ways: the sky is the wrong colour, a lantern is missing, and after a minute the page gets slower and slower.

1. Press **Ctrl + Alt + I** (on a Mac, **Control + Option + I**) to open the **A-Frame Inspector**. Click each lantern in the scene graph on the left and read its `position`. Remember from Course 0.1: in front of the camera, the third number (near/far) is negative.
2. Select the sky. Is its colour a valid colour code?
3. Close the Inspector, open the **Performance** panel (or Chrome's **Performance monitor**, from the tools' **⋮ → More tools** menu) and watch for a minute. Something keeps growing. Find the script that causes it.

Compare with [`completed/3d-moment.html`](completed/3d-moment.html), where each fix is explained in a comment. Performance bugs like the third one are the most common problems in real 3D projects; you will meet them properly in Course 3.6.

## Accessibility requirements

The fixed explorer must meet everything from Course 1.6, including:

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| Every button has an accessible name | 4.1.2 | "Clear search", not just "button". |
| Every label points to exactly one control | 1.3.1, 3.3.2 | Unique `id`s. |
| Text contrast at least 4.5:1 | 1.4.3 | The headings must be visible. |
| No sideways scrolling at 320 pixels | 1.4.10 | Content reflows on phones. |
| Result changes are announced | 4.1.3 | Status messages reach screen-reader users. |

## Performance considerations

The Network panel also shows how much each file weighs and how long it took. Look at your explorer: a few kilobytes of HTML, CSS, and JavaScript. Then look at the 3D moment: A-Frame is the largest file. The Performance panel shows the rest of the story: work that keeps growing, like the fireflies, makes any device slow eventually.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Fixing styles only in the Styles panel | The fix vanishes on reload | Copy it into your file |
| Fixing several things at once | You do not know which change worked | One fix, then reload and test |
| Ignoring warnings | Small problems stay hidden | Read yellow warnings too |
| Trusting only automated tools | Half the bugs stay | Test with the keyboard and a screen reader |
| Vague bug reports | Nobody can reproduce them | Steps, expected, actual, device |

## Troubleshooting

**The Network panel is empty.** It records only while open: open it first, then reload.

**My breakpoint never pauses.** The code on that line never ran. Check that the event that should run it actually happened, or put the breakpoint earlier.

**The A-Frame Inspector shortcut does nothing.** Click the scene once first, then press the keys.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: plant five bugs of your own, and swap with a partner.
2. **[Creative](challenges/challenge-2.md)**: explain one bug, and how you found it, in your own language.
3. **[Explorer](challenges/challenge-3.md)**: profile a real website with the Performance panel.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take a screenshot of the fixed explorer with the console open and empty, and one of a breakpoint paused on a line.
3. Keep them and your `bug-reports.md` in your learner journal and portfolio. Share them with other developers: see [where to share your work and ask for help](../../docs/en/community.md).
4. In your journal, answer: which bug took longest to find, and which tool finally found it?

## Further reading

- [Chrome DevTools documentation](https://developer.chrome.com/docs/devtools)
- [Firefox DevTools User Docs](https://firefox-source-docs.mozilla.org/devtools-user/)
- [MDN: What went wrong? Troubleshooting JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong)
- [A-Frame: Visual Inspector and dev tools](https://aframe.io/docs/1.8.0/introduction/visual-inspector-and-dev-tools.html)

## Women to Know

**Marian Villa** is a developer and community builder in Medellín, Colombia. In 2016 she co-founded **PionerasDev**, a Colombian non-profit community that teaches women to code, mainly JavaScript. She was a Google Developer Expert in UI/UX, and is now a Google Developer Expert in Web Technologies.

Communities like PionerasDev are where many developers learn the skill in this lesson: not writing code that never breaks, but finding out calmly why it did, and helping each other do it.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

Browsers run the same shared tests to make sure they behave the same: the **Web Platform Tests**, a public collection of tests for web standards that browser makers write and run together. When a browser fails one, that is a bug report too, and anyone can see the results at wpt.fyi.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
