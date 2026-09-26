# Welcome to XR Camp

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `preface` · **Lesson:** `welcome-to-xr-camp-01` · **Time:** about 2 hours · 3 sessions of 45 minutes · about 1 week at 4 sessions a week

---

> Build your first 3D world in your first hour, then make a learning plan that fits your life.

---

## Welcome

XR Camp is a free school for people who want to build the web of the future: websites you can walk around in, 3D worlds that run in a browser, and experiences you can step into with a headset. It is built first for women in Latin America and China, and it is free for everyone.

You do not need any experience. Many people starting today have never written code. By the end of this first session you will have built a 3D world anyway.

## Learning objectives

By the end of this project you will be able to:

1. Open a web page from your own computer in a browser.
2. Change a 3D scene by editing its code, and see the result.
3. Explain why a 3D world needs a text description, and write one.
4. Make a realistic plan for when and how you will study.

## Prerequisites

None. This is where everyone starts.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A computer with a modern browser (Firefox, Chrome, Edge, or Safari) | Seeing your world | Free |
| A plain text editor: Notepad (Windows), TextEdit (Mac), or [VS Code](https://code.visualstudio.com/) | Changing your world | Free |
| An internet connection, the first time you open the page | Downloading A-Frame, the 3D tool | Free |
| Your learner journal: a notebook, or the XR Camp Learner Journal template | Your plan and reflections | Free |

**Using TextEdit on a Mac?** Open **Format → Make Plain Text** before you save. Otherwise TextEdit quietly saves formatting codes into your file and the page breaks.

## What you will build

A small 3D garden that you can look around and walk through, with your name on it: your colours, your shapes, and a written description so that people who cannot see it can still picture it.

The reference solution in [`completed/`](completed/) is Ana's version: a pink evening sky, three shapes on the grass, and a moon that rises and sinks gently.

Then, in session 3, you will build something just as important: a plan for fitting XR Camp into your real week.

## Folder guide

```text
01-welcome-to-xr-camp/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/             # Begin here: a 3D world with 6 TODOs
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. Download this project folder, or download the whole repository as a ZIP.
2. Create a folder called `xr-camp` somewhere you will find it again: your Documents folder is a good choice, your Downloads folder is not.
3. Copy the `starter` folder into it and rename the copy `my-first-world`.
4. Open `my-first-world/index.html` in your **browser**: double-click it, or use **File → Open File**. After a moment, a 3D garden appears.
5. Open the same file in your **text editor**: right-click it and choose **Open with**.

Keep both windows side by side. Every time you save in the editor, reload the browser. That loop (edit, save, reload) is how every web developer works, and you have just started doing it.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup, then TODOs 1–4 | A 3D world with your name, sky, and colours |
| 2 | TODOs 5–6, then the checklist | Your own shape, and a description that matches |
| 3 | **Make your plan** | A weekly study plan in your learner journal |

The starter has six numbered `TODO` comments. Find each one in your editor and do what it says.

### Step 1: Put your name on it (TODO 1–2)

Change the text inside `<title>` and inside `<h1>` to your own name, for example `Ana's first 3D world`.

Save, reload. The browser tab and the heading now show your name. The title is also the first thing a screen reader says when the page opens.

### Step 2: Change the sky (TODO 3)

```html
<a-sky color="#f6d6e0"></a-sky>
```

`#f6d6e0` is a colour written as a code. Try a few: `#1b1b3a` is night, `#ffd8a8` is sunrise. Search the web for "colour picker" to find the code for any colour you like.

### Step 3: Move a shape (TODO 4)

```html
<a-box position="-1.5 0.5 -4" color="#5b2a86"></a-box>
```

The three numbers in `position` are **left/right**, **up/down**, and **near/far**. Change one number at a time, save, and reload to see what it does. Negative near/far numbers are in front of you.

This is the idea behind all 3D: every object has a position in space, described with three numbers. You will use it for the rest of the programme.

### Step 4: Add your own shape (TODO 5)

Copy the whole `<a-box ...></a-box>` line, paste it where TODO 5 says, and change `a-box` to `a-cone` in **both** places. Give it a new colour and a new position.

Nothing appears? Check that you changed both the opening `<a-cone` and the closing `</a-cone>`, and that the position is not inside another shape.

### Step 5: Describe your world (TODO 6)

Read the paragraph with `id="scene-description"`. It still describes the old world. Rewrite it so it matches yours.

Close your eyes and ask someone to read your description aloud. Can you picture the scene? That is the test. A blind visitor, or someone whose phone cannot show 3D, gets only these words, so they matter as much as the shapes.

### Step 6: Walk around

Drag with your mouse or finger to look around. Press **W A S D** or the **arrow keys** to walk. If you have a VR headset, open the page in its browser and press the **VR** button in the corner.

### Step 7: Make your plan (session 3)

Most people who stop learning to code do not stop because it is too hard. They stop because life gets busy and there is no plan for when to study. Make yours now, in your learner journal:

1. **Why are you here?** One or two sentences. You will reread this on a hard day.
2. **What do you want to build?** A website for your community, a 3D museum, a new career. Anything.
3. **When will you study?** Pick four 45-minute sessions a week: which days, what time, and where. Be realistic. Two sessions a week also works; everything just takes twice as long.
4. **What will get in the way?** Children, shifts, slow internet, tiredness. Write one thing you will do about each.
5. **Who will you tell?** Learning with someone else makes you far more likely to keep going. The XR Camp community will blossom soon; until then, tell a friend.

**How long does it take?** XR Camp is long, because it takes you all the way to professional. That is why every phase ends with its own certificate: you do not have to finish everything to get something real. At four sessions a week, Phase 1 (Become a Web Developer) takes about eight months, and at the end of it you can build and publish accessible websites.

## Key code explained

**Why does 3D look like HTML?** A-Frame, the tool loaded by the `<script>` line, adds new tags such as `<a-box>` and `<a-sky>` to the browser. Tags are the language of the web, so you can build 3D with the same skills you will learn for ordinary web pages. In Phase 3 you will learn how it works underneath.

**Why is the version number (`1.8.0`) in the address?** So your world keeps working exactly as you left it, even after A-Frame releases new versions.

**What is the script at the bottom?** It makes the **Pause animation** button work, and stops the animation automatically for people who have asked their device to reduce motion. Moving images can make some people dizzy or unwell. You will write code like this yourself in Phase 1.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| A description of the scene that matches it | 1.1.1 | The only way someone who cannot see the 3D world can experience it. |
| A way to pause the animation | 2.2.2 | Anything that moves for more than five seconds must be stoppable. |
| Animation stops when reduced motion is on | 2.3.3 | Motion can cause dizziness and nausea. |
| Moving around works with the keyboard | 2.1.1 | Not everyone can use a mouse or a touchscreen. |
| `<html lang="en">` (or your language) | 3.1.1 | Tells a screen reader how to pronounce your words. |

## Performance considerations

A-Frame is a large download the first time the page opens: about 1.3 MB of code, or about 350 KB after the server compresses it. After that your browser remembers it. If your connection is slow or metered, open the page once on a good connection and it will load quickly afterwards.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Saving from a word processor (Word, rich-text TextEdit) | The page is blank or shows code | Use a plain text editor |
| Changing `<a-box` but not `</a-box>` | The shape disappears | Change the opening and closing tags together |
| Deleting a `"` quote mark | Later shapes vanish | Every attribute value sits inside a pair of quotes |
| Forgetting to update the description | Blind visitors get the wrong picture | Update the words whenever you change the world |

## Troubleshooting

**The page is white and nothing appears.** A-Frame downloads from the internet the first time. Check your connection, wait a moment, and reload.

**I changed the code but nothing changed.** Did you save? Did you reload the browser? Are you editing the same file you opened in the browser?

**A shape is missing.** It may be behind you or inside another shape. Look around, or change its position to `0 1 -3`: straight ahead and close.

**The keys do not move me.** Click or tap the 3D world once, then try again.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: add two more shapes and describe them.
2. **[Creative](challenges/challenge-2.md)**: build a place from your own life.
3. **[Explorer](challenges/challenge-3.md)**: use the A-Frame Inspector to build visually.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take a screenshot of your world. (Search the web for "how to take a screenshot" and your device if you are unsure.)
3. Keep your screenshot and your scene description in your learner journal. When the XR Camp community opens, share them there.
4. In your learner journal, write one sentence: how did it feel to build a 3D world in your first hour?

## Further reading

- [A-Frame documentation: Introduction](https://aframe.io/docs/1.8.0/introduction/): the tool you used today.
- [W3C: Stories of web users](https://www.w3.org/WAI/people-use-web/user-stories/): how people with disabilities use the web.

## Women to Know

_To be chosen from the roster in [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md). Every biography must be checked against primary sources before publication._

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)

