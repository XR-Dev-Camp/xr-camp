# AI as a Development Assistant

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `frontend-engineer` · **Lesson:** `ai-as-a-development-assistant-08` · **Time:** about 10 hours · 14 sessions of 45 minutes · about 4 weeks at 4 sessions a week

---

> Complete and document an AI-assisted code review without surrendering understanding.

---

## Learning objectives

By the end of this project you will be able to:

1. Choose an AI assistant that works where you live: a hosted one, a Chinese one, or a **local model** on your own computer.
2. Decide what you may **share** with an assistant, and what you must never paste: secrets, personal data, and code you have no right to share.
3. Keep your **understanding first**: explain code in your own words before you ask, predict before you run, and ask for explanations, not only fixes.
4. **Check** every claim an assistant makes against a primary source (MDN, a specification, or a library's official documentation), and spot APIs that do not exist.
5. Give every suggestion a **verdict** (accepted, changed, or rejected), with the evidence, and keep an honest log of how you used AI.
6. Test accessibility **yourself**, with the keyboard and a screen reader, because an assistant reading code cannot hear what a screen reader says.
7. Compare how well an assistant answers in English, Spanish, and Chinese.

## Prerequisites

- **Course 2.3: Application Architecture and Maintainable Code.** The code you review is the session planner you refactored there.
- **Course 0.8: Ethics, Accessibility, Privacy, and Responsible AI**, for the rules this lesson puts into practice.
- **Course 1.8: Git, GitHub, and Publishing**, so you can commit each change on its own.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A modern browser, with its developer tools | Running the planner, testing claims in the Console | Free |
| VS Code and a local server | Modules need `http://` | Free |
| Git | One commit per accepted change, so every change can be undone | Free |
| An AI assistant: hosted, or a local model | The assistant you review with (see Step 2) | Many offer a free tier; check current terms |
| A screen reader: NVDA (Windows), VoiceOver (macOS, iOS), or TalkBack (Android) | Step 7: testing what the assistant cannot | Free |

No account is required by the lesson itself. If you cannot, or do not want to, use an assistant, a local model works without an account, and a classmate or mentor can play the assistant (see **Troubleshooting**).

## What you will build

Not a new part of **My XR Camp**: a documented **AI-assisted code review** that revisits the third part, your session planner from Course 2.3.

You will ask an AI assistant to explain and review a small piece of your code, and you will check every answer. You write down what you asked, what it said, what you checked, your source, your verdict, and what you learned. At the end, you publish the review as a small, accessible web page, and you keep an **AI-use log** of every time you used an assistant.

The point is not the assistant's answers. It is what you can prove about them.

The reference solution in [`completed/`](completed/) is Ana's review, with seven items (two accepted, two changed, and three rejected), and the planner with her two changes. The starter has the planner, templates for the review and the log, a practice exercise on invented APIs, and the review page, with fourteen TODOs.

## Folder guide

```text
08-ai-as-a-development-assistant/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── planner/         # The code under review: the 2.3 planner
│   ├── ai-log.md        # Your rules and your AI-use log: TODOs 1–2
│   ├── review.md        # The review itself: TODOs 3–5, 8–10, 13
│   ├── invented-apis.md # A made-up AI answer to check: TODOs 6–7
│   ├── index.html       # The review, as a web page: TODOs 11–12
│   ├── styles.css       # Finished
│   └── 3d-moment.html   # A three.js scene and an AI explanation to check: TODO 14
├── completed/           # Ana's review: open this last
├── challenges/          # Three extensions
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. Make a new folder, `ai-review`, next to your `my-xr-camp` folder, and copy the starter's files into it.
2. If you finished your own planner in Course 2.3, replace `planner/` with a copy of yours. It is your code: you have the right to share it, and you know what it should do.
3. Make it a Git repository and commit the untouched starter: `git init`, then `git add .` and `git commit -m "Starter"`.
4. Start your local server. Open `planner/index.html` and `planner/check.html`, and check every line of `check.html` says PASS before you begin.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; Step 1: rules first (TODO 1) | Your AI rules, in `ai-log.md` |
| 2 | Step 2: choose an assistant (TODO 2) | An assistant that works where you live, and your first log entry |
| 3 | Step 3: read the code yourself (TODOs 3–4) | Your own explanation of `store.js`, written before any AI |
| 4 | Step 4: ask for explanations (TODO 5) | Two review items, each with a verdict |
| 5 | Step 5: invented APIs (TODO 6) | Four claims checked against MDN |
| 6 | Step 5, continued (TODO 7) | Each claim tested in the Console |
| 7 | Step 6: ask for a review (TODO 8) | Three more review items |
| 8 | Step 6, continued: apply what you accepted | One commit per change, and `check.html` still passes |
| 9 | Step 7: accessibility with AI, and without it (TODO 9) | Keyboard and screen-reader notes, and one more item |
| 10 | Step 8: other languages (TODO 10) | The same question in two languages, compared |
| 11 | Step 9: publish the review (TODOs 11–12) | The review as a web page |
| 12 | Step 9, continued (TODO 13) | What you learned, and a page that passes the checklist |
| 13 | The **3D moment** (TODO 14) | Every three.js claim checked against the docs |
| 14 | [`tests/checklist.md`](tests/checklist.md), the Foundation challenge, then **Submitting your work** | A reviewed and improved third part of My XR Camp |

### Step 1: rules first (TODO 1)

An **AI assistant** is a program trained on huge amounts of text and code. It predicts a likely answer to what you write. It is often useful, and it is often wrong, in the same confident voice. It does not look anything up unless the tool says it does, and even then it can misread what it found.

Before you paste anything into one, decide your rules. Write them at the top of `ai-log.md`:

- **Never paste secrets**: passwords, API keys, tokens, `.env` files, private keys. Assume anything you paste is stored, may be read by people at the company, and may be used to train future models, unless the terms clearly say otherwise.
- **Never paste personal data**: names, emails, phone numbers, addresses, or anyone's saved data. Your planner's saved sessions are personal data too.
- **Only paste code you have the right to share**: your own, or code whose licence allows it. Not a classmate's code, and not an employer's or client's code, without permission.
- **Follow your school's or employer's rules.** Many have an AI policy. Where it is stricter than yours, it wins. If you are not sure, ask.
- **Say where AI helped.** In this lesson, the log does that. In your portfolio, one sentence is enough: "I used an AI assistant to review this code, and checked every suggestion."

**Who owns code an AI writes?** It depends on the country, and the law is still changing. Each assistant's terms of use say what they allow. Generated code can sometimes closely match existing code that has its own licence. The safe habits: keep generated pieces small, understand every line, and say where AI helped.

### Step 2: choose an assistant (TODO 2)

There are three kinds. Any of them works for this lesson.

| Kind | Examples | Good to know |
| --- | --- | --- |
| **Hosted, from Western companies** | ChatGPT, Claude, Gemini, Microsoft Copilot | Run on the company's computers. Many are not reachable from mainland China. |
| **Hosted, from Chinese companies** | Qwen (千问, formerly 通义), DeepSeek, Kimi, Doubao (豆包) | Usually reachable from mainland China, and often good in Chinese. Some may be harder to reach from elsewhere. |
| **Local models**, on your own computer | Ollama or LM Studio, running an open-weight model | Nothing you type leaves your computer, and it works offline once downloaded. Needs a recent computer with plenty of memory; models are often several gigabytes. Smaller models make more mistakes. |

Many offer a free tier; check the current terms, including any minimum age. Which services are reachable, and what they cost, changes often, and differs by country, so check what works where you are, today. Some assistants also work inside your code editor; for this lesson, a chat window is enough, because you want to see and log every question.

No assistant is always right, and none is the "safe" one. The method in this lesson is the same for all of them.

In `ai-log.md`, write which assistant you chose and why, and add your first log entry. Log every conversation from now on: the date, the assistant, what you asked for, what you shared, and what you kept.

### Step 3: read the code yourself (TODOs 3–4)

**Understanding first.** If you ask before you read, you cannot tell a good answer from a bad one.

Choose a **small** piece: one or two files, under about 200 lines. Ana chose `store.js` and `main.js`. Write your scope at the top of `review.md` (TODO 3).

Then read your files with no assistant open, and explain them in your own words (TODO 4). For `store.js`: what does it keep? Who may change it? What happens, in order, when someone presses **Done**? Write down anything you do not understand as a question. Those questions become your first prompts.

### Step 4: ask for explanations (TODO 5)

Now open the assistant. Four habits keep you in charge:

1. **Small prompts.** One question, one piece of code. "Explain this function" beats "review my app".
2. **Ask for explanations, not only fixes.** "Why does this work?" teaches you. "Fix it" only gives you code you did not write.
3. **Explain it back.** After an answer, write it in your own words, without looking. If you cannot, ask again, differently.
4. **Predict before you run.** Before you test a claim, write what you expect to happen. Then run it. A wrong prediction is where learning happens.

A good first prompt looks like this:

```text
I am learning JavaScript. Here is one function from my own project.
Explain what the line with || does, step by step, with an example.
Do not rewrite the code.

export function bySchedule(a, b) {
  return DAYS.indexOf(a.day) - DAYS.indexOf(b.day) || a.time.localeCompare(b.time);
}
```

You can test code from the real page in the browser's **Console**. On the planner page, this loads the same store the page uses:

```js
const store = await import('./js/store.js');
const stop = store.subscribe((sessions) => console.log('Now', sessions.length));
```

Add a session, and watch the message. Then call `stop()`, add another, and watch nothing happen.

Fill in two review items (TODO 5), one per question. Each has six parts: **what I asked**, **what it said**, **what I checked**, **source**, **verdict**, and **what I learned**.

| Verdict | Means |
| --- | --- |
| **Accepted** | Checked, correct, and used as it was. |
| **Changed** | Partly right: you used it after fixing or adapting it. |
| **Rejected** | Wrong, invented, or not right for this code, and you can show why. |

"Checked" means something you can point to: a documentation page, a specification, a test you ran, or a prediction you compared. "It sounded right" is not a check.

### Step 5: invented APIs (TODOs 6–7)

Assistants sometimes **invent** things: a method that does not exist, an option no function takes, or a rule about how the browser behaves that is not true. It usually looks exactly like real code, with a plausible name. This is often called a **hallucination**.

Open [`starter/invented-apis.md`](starter/invented-apis.md). It is an "AI answer" about the planner, **written by XR Camp as a made-up example**, with four claims. Some are wrong. For each one (TODO 6):

1. Find the method or behaviour on **MDN** (developer.mozilla.org). MDN documents the web standards, in several languages, including Spanish and Chinese.
2. Write what MDN says, in your own words, and link to the page.
3. Give your verdict.

Then test each claim in the Console (TODO 7). Three quick tests:

```js
'focusNext' in HTMLElement.prototype   // Does the method exist at all?
localStorage.getItem('no-such-key')    // What do you get for a missing key?
[3, 1, 2].sort((a, b) => a - b, { copy: true })   // Does an extra argument do anything?
```

Notice the third one. JavaScript silently ignores extra arguments, so an invented option causes **no error**. The code runs, and quietly does the wrong thing. That is why "it ran" is not the same as "it is right".

### Step 6: ask for a review (TODO 8)

Now ask the assistant to review your code, one file at a time:

```text
Review this JavaScript module from my own learning project.
List possible bugs, security problems, and unclear code.
For each one, say how confident you are, and why.
Explain; do not rewrite the whole file.
```

For each finding, write a review item (TODO 8): at least three more. Some findings will be true in general, but not in your code. Ana's assistant warned that `toggleSession` would crash if an id did not exist. True, but in her planner, every id comes from a button drawn from the store a moment earlier. Knowing your code is what lets you say "not here, and here is why".

Then apply what you accepted or changed, **one change per commit**, and run `check.html` after each. If a check fails, you know exactly which change did it: `git restore` the file, or `git revert` the commit.

### Step 7: accessibility with AI, and without it (TODO 9)

Ask the assistant: "Is this form accessible? What would a screen-reader user hear?" Log the answer. It may be useful. It may also be wrong, because an assistant reads code, and accessibility is about what people actually experience.

Then test it yourself:

1. **Keyboard only.** Unplug the mouse, or do not touch it. Add a session, mark it done, delete it. Can you always see where focus is?
2. **Screen reader.** Turn on NVDA, VoiceOver, or TalkBack. Do the same three things. Then press **Enter** in the empty topic box. What do you hear?

Write what the assistant said and what you found, side by side (TODO 9). Ana's assistant said the form "looks accessible". Her screen reader said nothing at all when she pressed Enter in the empty topic box, because focus was already there. See item 7 in her review.

### Step 8: other languages (TODO 10)

Assistants are often trained on more English than anything else, so their answers in other languages can be weaker, or just different. Ask one of your earlier questions again in Spanish, in Chinese, or in your own language. Compare:

- Is the explanation still **correct**?
- Are technical words translated, left in English, or mixed? Check them against MDN in that language.
- Is the code the same? Are comments translated?
- Which answer would you rather learn from?

Write your comparison in `review.md` (TODO 10). There is no right result: you are collecting evidence.

### Step 9: publish the review (TODOs 11–13)

`index.html` turns your review into a page someone else can read. It has:

- A **summary table**: one row per review item, with its verdict. On a narrow screen, the table scrolls sideways inside its own box, and the page does not. The box can take keyboard focus, so it can be scrolled without a mouse.
- **One section per item**, with the six parts in a description list (`<dl>`).
- Verdicts in **words**, with a border. Colour only helps.
- Any quote in another language marked with `lang`, for example `<span lang="es">`, so a screen reader pronounces it correctly.

Fill in the table (TODO 11) and the sections (TODO 12). Then finish `review.md` with what you learned (TODO 13): what did the assistant do well, where was it wrong, and would you use it the same way again?

## Key code explained

**`await import('./js/store.js')` in the Console.** A dynamic import loads a module from the Console. Because the page already loaded the same file, you get the **same** module, with the same state, so you can test the real store.

**`'focusNext' in HTMLElement.prototype`.** Every element's methods live on its prototype. `in` asks "does this name exist anywhere on it?" `false` means the browser you are using does not have this method, whatever an assistant says. Check MDN to see whether any browser has it.

**`<div class="table-scroll" role="region" aria-labelledby="summary-caption" tabindex="0">`.** `tabindex="0"` lets keyboard users focus the box and scroll it with the arrow keys. `role="region"` with a name tells screen-reader users what they have landed on.

**`<th scope="col">` and `<th scope="row">`.** Headers for columns and rows, so a screen reader can say "Verdict: Rejected" as you move through the table.

**`THREE.MathUtils.degToRad(30)`** in the 3D moment. three.js measures rotation in radians; a full turn is `2 * Math.PI`. `degToRad` lets you write the angle you think in.

## 3D moment

Open [`starter/3d-moment.html`](starter/3d-moment.html): a purple torus knot, lit from the upper right, turning slowly. Below it is the code, and an "AI explanation" of the code, **made up by XR Camp** for practice. Some of its seven claims are wrong.

Check every claim against the official three.js documentation at [threejs.org/docs](https://threejs.org/docs/) (TODO 14). Search for the class name, such as `DirectionalLight`, and read its description. Where you can, test the claim too: change one value, reload, look, and change it back. Try swapping `MeshStandardMaterial` for `MeshBasicMaterial`, or removing `degToRad`. Would you have felt comfortable watching the result?

three.js is a library, not a web standard, so MDN does not document it: its own docs are the primary source. Then compare with [`completed/3d-moment.html`](completed/3d-moment.html), where Ana checked each claim.

Last, do it for real: ask your own assistant to explain the same code, log the conversation, and check its answer the same way.

The scene describes itself in text, starts still if you asked your device to reduce motion, and has a **Pause animation** button that stops the animation loop completely.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| The summary table has a caption and column and row headers | 1.3.1 | The structure is available to screen readers, not only visible. |
| The table's scrolling box can be focused and is named | 2.1.1, 4.1.2 | Keyboard users can scroll it, and know what it is. |
| The page never scrolls sideways at 320 CSS pixels; only the table's box may | 1.4.10 | Data tables are one of the exceptions reflow allows. |
| Verdicts are words, with colour as a second signal | 1.4.1 | Nobody has to tell green from red. |
| Quotes in other languages have `lang` | 3.1.2 | Screen readers switch pronunciation. |
| Headings in order: one `h1`, `h2` sections, `h3` items | 1.3.1 | People can jump through the review by heading. |
| The planner's errors are announced | 3.3.1, 4.1.3 | Ana's item 7: the message must reach screen-reader users too. |
| The 3D scene has a text description, can be paused, and respects reduced motion | 1.1.1, 2.2.2 | Information and movement are never forced on anyone. |

## Performance considerations

A **local model** uses your own processor and memory. On an older laptop, answers can be slow, and your other programs slower. Close what you do not need, and choose a smaller model if it struggles. A hosted assistant uses almost nothing on your computer, but needs a connection.

Suggestions from assistants are not free either. Review what they add to your page: a new library "just for this", a second copy of the same function, or a listener added on every render. Ask "what does this cost?" as well as "does it work?"

The 3D moment turns by `speed × seconds` since the last frame, so it turns at the same speed on a 60 Hz and a 120 Hz screen. **Pause** passes `null` to `setAnimationLoop`, so no frames are drawn at all while it is still.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Pasting a whole project | Long, vague answers, and maybe secrets you did not notice | One small piece at a time |
| Asking "fix it" | You get code you cannot explain | Ask why, then fix it yourself |
| "It ran, so it's right" | Invented options fail silently | Check the docs, and test what it should do |
| Trusting a confident answer | Wrong answers sound just as sure | Every claim needs a source |
| Accepting several changes in one commit | When something breaks, you cannot tell which | One change per commit |
| Rejecting without evidence | Your verdict is only an opinion | Link the page, or show the test |
| Skipping the screen reader because the AI said "accessible" | Real barriers stay | Test with people's real tools |
| Logging only the good answers | The log stops being honest | Log every use, including the useless ones |

## Troubleshooting

**The assistant I wanted is not available where I live.** Try one from the other group in Step 2, or a local model. If none works, a classmate, mentor, or study group can play the assistant: they answer your questions, and you check them exactly the same way.

**The local model is very slow, or will not start.** Choose a smaller model in Ollama or LM Studio, close other programs, and check your free disk space.

**The assistant refuses, or gives a very short answer.** Make the prompt smaller, say you are learning, and paste only the code the question is about.

**MDN does not mention the method at all.** That is evidence too. Search MDN, then test with `in` in the Console. If both come back empty, the method almost certainly does not exist.

**`await import(...)` fails in the Console.** Run it on the planner page itself, served over `http://`, and check the path: `./js/store.js` is relative to the page.

**`check.html` fails after a change.** Restore the file (`git restore planner/js/utils.js`), and look again at what the change did.

## Challenge extensions

Three extensions, in [`challenges/`](challenges/):

1. **[Foundation](challenges/challenge-1.md)** (required): review one more small file, from start to finish, including at least one rejection with evidence.
2. **[Creative](challenges/challenge-2.md)**: run a whole review in your own language, and build a glossary of the terms the assistant used, checked against MDN in that language.
3. **[Explorer](challenges/challenge-3.md)**: set a trap. Ask several assistants, including a local model, about an API that does not exist, and compare which ones tell you so.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take a screenshot of your review page, and one of `check.html` with every check passing.
3. Keep them, your `review.md`, your `ai-log.md`, and your checked 3D moment in your learner journal and portfolio. Share them with other developers: see [where to share your work and ask for help](../../docs/en/community.md).
4. In your journal, answer: which wrong claim would you have believed without checking, and what will you do differently next time you ask an assistant for help?

## Further reading

- [MDN Web Docs](https://developer.mozilla.org/): the reference you check against, also in Spanish and Chinese
- [MDN: Storage.getItem()](https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem)
- [MDN: HTMLElement.focus()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus)
- [MDN: ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions)
- [three.js documentation](https://threejs.org/docs/)
- [W3C: AI & the Web](https://www.w3.org/reports/ai-web-impact/)
- [W3C WAI: Easy checks, a first review of web accessibility](https://www.w3.org/WAI/test-evaluate/preliminary/)

## Women to Know

**Danqi Chen 陈丹琦** is an associate professor of computer science at Princeton, where she co-leads the Princeton NLP Group and is an associate director of Princeton Language and Intelligence. She is from Changsha, in Hunan, and as a high-school student there she won a gold medal at the 2008 International Olympiad in Informatics (IOI).

Her Stanford PhD, on neural reading comprehension, helped shape question-answering research, and she now works on large language models, the kind of technology behind the assistants in this lesson. When you ask an assistant a question and check its answer, you are working on the same problem from the other side.

_Facts from public sources, checked 2026. Spotted an error? [Tell us](https://github.com/XR-Dev-Camp/xr-camp/issues)._

## Standards spotlight

When you check an assistant, you need something to check it **against**. For the web, that is the standards: the WHATWG's **HTML** and **DOM** standards (`focus()`, `localStorage`), Ecma International's **ECMAScript** (`Array.prototype.sort`), and the W3C's **WCAG** and **WAI-ARIA**. MDN documents them, with notes on which browsers support each feature. If a method is not in the standards or on MDN, no browser is required to have it.

The W3C is also looking at AI itself. Its 2024 Team report, **AI & the Web**, discusses how machine-learning models affect the web, and possible areas for standards work. It is a report, not a standard. The W3C's **Web Machine Learning Working Group** develops APIs for running machine-learning models in the browser.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
