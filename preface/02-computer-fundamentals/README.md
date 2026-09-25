# Computer Fundamentals

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `preface` · **Lesson:** `computer-fundamentals-02` · **Time:** about 6 hours · 8 sessions of 45 minutes · about 2 weeks at 4 sessions a week

---

> Create a complete XR Camp learning folder and safely configure a browser and development workspace.

---

## Learning objectives

By the end of this project you will be able to:

1. Name your device's operating system and find its version.
2. Use the keyboard shortcuts every developer uses dozens of times a day.
3. Create, name, and find files and folders, and read a file extension.
4. Explain the difference between a file on your computer and a file in the cloud.
5. Keep your browser up to date, and use tabs, bookmarks, and screenshots.
6. Protect your accounts with strong passwords, a password manager, and two-step sign-in, and recognise a scam.
7. Follow a calm, repeatable routine when something goes wrong.

## Prerequisites

- **Course 0.1: Welcome to XR Camp.** You have opened a file in a browser and in a text editor.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| Your computer: Windows, macOS, ChromeOS, or Linux | Everything | Free |
| A modern browser | The web | Free |
| A plain text editor | Your setup page | Free |

**Only have a phone?** You can follow most of this lesson on an Android phone with a free code-editor app, and the rest of XR Camp is easier on a computer. Many public libraries and community centres have computers you can use; this lesson also teaches you how to keep your work safe on a shared one.

## What you will build

Two things that you will use for the rest of XR Camp:

1. **Your XR Camp folder**: one tidy place for every lesson, project, and note.
2. **Your setup page**: a small web page that records how your computer is set up, the shortcuts you know, and what to do when something breaks. It is your first reference document, written by you, for you.

The reference solution in [`completed/`](completed/) is Ana's setup page.

## Folder guide

```text
02-computer-fundamentals/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/             # Begin here: a setup page with 8 TODOs
├── completed/           # Reference solution: open this last
├── challenges/          # Three optional extensions
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. Open your `xr-camp` folder from Course 0.1.
2. Copy this lesson's `starter` folder into it and rename the copy `my-setup`.
3. Open `my-setup/index.html` in your browser and in your text editor, side by side, as you did in Course 0.1.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Step 1: your device and operating system (TODOs 1–2) | Your device described on your page |
| 2 | Step 2: keyboard, mouse, touch, and trackpad (TODO 3) | A table of shortcuts you have practised |
| 3 | Step 3: files, folders, and extensions (TODO 4) | Your XR Camp folder, organised |
| 4 | Step 4: downloads, uploads, and the cloud (TODO 5) | A backup plan for your work |
| 5 | Step 5: your browser (TODO 6) | An up-to-date browser, set up for learning |
| 6 | Step 6: passwords, two-step sign-in, and scams (TODO 7) | Safer accounts |
| 7 | Step 7: when something goes wrong (TODO 8) | Your own troubleshooting routine |
| 8 | [`tests/checklist.md`](tests/checklist.md), a challenge, and **Submitting your work** | A finished setup page |

### Step 1: your device (TODOs 1–2)

A computer, a tablet, and a phone all run an **operating system**: the program that runs every other program. The main ones are Windows, macOS, ChromeOS, and Linux on computers, and Android and iOS on phones.

Find yours:

| System | Where to look |
| --- | --- |
| Windows | **Start → Settings → System → About** |
| macOS | **Apple menu → About This Mac** |
| ChromeOS | **Settings → About ChromeOS** |
| Android | **Settings → About phone** |
| iPhone | **Settings → General → About** |

Write your device and system on your page. You will need this information whenever you ask for help: "it doesn't work" is hard to answer; "it doesn't work in Firefox on Windows 11" is not.

### Step 2: keyboard, mouse, touch, and trackpad (TODO 3)

Developers use the keyboard far more than the mouse. These shortcuts work in almost every program. On a Mac, use **Command (⌘)** where this table says **Ctrl**.

| Action | Windows, ChromeOS, Linux | macOS |
| --- | --- | --- |
| Copy | Ctrl + C | ⌘ + C |
| Paste | Ctrl + V | ⌘ + V |
| Cut | Ctrl + X | ⌘ + X |
| Undo | Ctrl + Z | ⌘ + Z |
| Save | Ctrl + S | ⌘ + S |
| Find on the page | Ctrl + F | ⌘ + F |
| Select all | Ctrl + A | ⌘ + A |
| Reload the page | Ctrl + R or F5 | ⌘ + R |
| New tab | Ctrl + T | ⌘ + T |
| Switch between programs | Alt + Tab | ⌘ + Tab |

Practise each one, then put the ones you learned in the table on your page. **Undo** is the most important: nothing you do in a text editor is permanent if you can undo it.

The **Tab** key moves between links and buttons on a web page. Many people navigate the whole web this way, which is why every page you build at XR Camp must work with the keyboard alone.

### Step 3: files, folders, and extensions (TODO 4)

A file's name ends with an **extension** that tells the computer what kind of file it is: `index.html` is a web page, `photo.jpg` is an image, `notes.txt` is plain text.

Many computers hide extensions, which causes confusing mistakes like `index.html.txt`. Turn them on:

- **Windows 11:** File Explorer → **View → Show → File name extensions**.
- **macOS:** Finder → **Settings → Advanced → Show all filename extensions**.

Now organise your XR Camp folder like this:

```text
xr-camp/
├── my-first-world/     # from Course 0.1
├── my-setup/           # this lesson
├── journal/            # your learner journal and notes
└── downloads/          # lessons you have downloaded
```

**Naming rules that will save you hours:** use lower-case letters, numbers, and hyphens. No spaces, no accents, no capital letters: `my-first-world`, not `My First World!`. Web servers treat `Photo.jpg` and `photo.jpg` as different files, and spaces in names break links.

### Step 4: downloads, uploads, and the cloud (TODO 5)

- **Downloading** copies a file from the internet to your device. It usually lands in your **Downloads** folder: move it into `xr-camp/` straight away.
- **Uploading** copies a file from your device to the internet.
- **The cloud** means files stored on someone else's computer, such as Google Drive, OneDrive, iCloud, or Baidu Netdisk, and synced to yours.

Cloud storage is useful as a backup, but it can cause surprises: a file may show in your folder but not actually be on your computer until it downloads. Keep your working folder on your device, and use the cloud or a USB drive as a copy.

Write your backup plan on your page: where your copy lives, and how often you make it.

### Step 5: your browser (TODO 6)

Use a modern browser, and keep it updated: updates fix security holes and add the web features you will learn.

| Browser | Check for updates |
| --- | --- |
| Chrome | **⋮ menu → Help → About Google Chrome** |
| Firefox | **☰ menu → Help → About Firefox** |
| Edge | **… menu → Help and feedback → About Microsoft Edge** |
| Safari | Updates with macOS: **System Settings → General → Software Update** |

Then practise:

- **Bookmarks:** bookmark this lesson and the XR Camp repository.
- **Tabs:** keep your lesson in one tab and your work in another.
- **Screenshots**, which you will use to submit work:
  - Windows: **Windows key + Shift + S**
  - macOS: **⌘ + Shift + 4**, then drag
  - ChromeOS: **Ctrl + Shift + Show windows**
  - Android: **Power + Volume down**
  - iPhone: **Side button + Volume up**

### Step 6: passwords, two-step sign-in, and scams (TODO 7)

Your accounts will soon hold your code, your portfolio, and your professional reputation. Protect them now.

1. **Use a password manager.** It remembers a different strong password for every site, so you only remember one. Your browser has one built in, and free ones such as Bitwarden work across devices.
2. **Turn on two-step sign-in** (also called two-factor authentication, or 2FA) for your email first. Even if someone steals your password, they cannot sign in without your phone.
3. **Recognise scams.** Be suspicious of any message that is urgent, asks for a password or a code, or has a link you did not expect. XR Camp will never ask for your password, and is completely free: anyone asking you to pay for it is lying.

**Never write a real password on your setup page.** Write only *that* you did each step.

On a shared or public computer: use a private or incognito window, never let the browser save your password, and always sign out.

### Step 7: when something goes wrong (TODO 8)

Every developer's day involves things not working. The difference between a beginner and a professional is not fewer problems: it is a calm routine for solving them.

1. **Read the message.** Error messages usually say what is wrong.
2. **Save and reload.** Many problems are an unsaved file or a stale page.
3. **Undo your last change.** If it worked before, the problem is in what you just did.
4. **Restart the program**, then the computer.
5. **Search for the exact error message**, in quotes.
6. **Ask for help**, with your device, system, browser, what you expected, what happened, and a screenshot.

Write your own version of this routine on your page, in your own words.

## Key code explained

**`<dl>`, `<dt>`, and `<dd>`: a description list.** Your device section pairs names with values ("System: Windows 11"). That is exactly what a description list is for, and a screen reader announces the pairs clearly.

**`<kbd>`: keyboard input.** Wrapping a key in `<kbd>` (`<kbd>Ctrl</kbd> + <kbd>C</kbd>`) tells browsers and assistive technology that it is something to press, not something to read.

**`<ol>` for the troubleshooting routine.** The steps have an order, so it is an ordered list.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| One `<h1>`, sections as `<h2>` | 1.3.1 | Headings are how screen-reader users move through a page. |
| Shortcut table has `<th scope>` and a `<caption>` | 1.3.1 | Each key stays linked to its action. |
| Keys marked up with `<kbd>` | 1.3.1 | Keys are announced as keys. |
| `lang` matches your language | 3.1.1 | Correct pronunciation. |

## Performance considerations

The page is plain HTML and a little CSS: it opens instantly, even from a USB drive with no internet. A reference page you need when things break must work when things break.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Hidden file extensions | You save `index.html.txt` without noticing | Turn extensions on (Step 3) |
| Spaces or capitals in names | Links break on a web server | Lower case, numbers, hyphens |
| Working from the Downloads folder | Files get lost or deleted | Move everything into `xr-camp/` |
| Writing real passwords down | Anyone who sees the page has them | Record the step, never the secret |

## Troubleshooting

**My file opens as text, not a web page.** Check the extension is `.html`, not `.html.txt`.

**I can't find my Downloads folder.** Open your browser's downloads list (**Ctrl + J** on Windows and ChromeOS, **⌘ + Option + L** on Mac) and choose **Show in folder**.

**The screenshot shortcut does nothing.** Some keyboards need the **Fn** key too. Search "screenshot" and your device's model.

## Challenge extensions

Three optional extensions, in [`challenges/`](challenges/):

1. **[Foundation](challenges/challenge-1.md)**: a two-minute keyboard-only drill.
2. **[Creative](challenges/challenge-2.md)**: your setup page and folders in your own language.
3. **[Explorer](challenges/challenge-3.md)**: install VS Code and open your XR Camp folder in it.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take a screenshot of your setup page and of your XR Camp folder.
3. Keep both in your learner journal. When the XR Camp community opens, share them there.
4. In your journal, answer: which shortcut will save you the most time?

## Further reading

- [MDN: Dealing with files](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Dealing_with_files)
- [W3C: Keyboard accessibility](https://www.w3.org/WAI/perspective-videos/keyboard/)

## Women to Know

**Cecilia Berdichevsky** is known as Argentina's first programmer. In 1961 she wrote and ran the first program on Clementina, the Ferranti Mercury computer at the University of Buenos Aires, Argentina's first computer for scientific research.

Clementina filled a room and was programmed with punched paper tape. The phone in your pocket is millions of times more powerful. But the habits Berdichevsky needed, such as organising work carefully, checking each step, and knowing exactly what the machine is doing, are the same ones you practised in this lesson.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject or their institution before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

File names and extensions work across every system because of shared conventions and standards. The media types that tell a browser "this is HTML" or "this is a JPEG image" (`text/html`, `image/jpeg`) are registered with IANA, the same organisation that coordinates internet addresses. You will meet them again when you publish your first site.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
