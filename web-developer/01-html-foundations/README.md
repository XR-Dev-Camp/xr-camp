# HTML Foundations

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `web-developer` · **Lesson:** `html-foundations-01` · **Time:** about 12 hours · 16 sessions of 45 minutes · about 4 weeks at 4 sessions a week

> Build an accessible personal or community information website.

---

## Learning objectives

By the end of this project you will be able to:

1. Write a valid HTML document from memory, and explain what each part of the `<head>` does.
2. Choose heading levels based on document structure rather than text size.
3. Use semantic landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`) so that assistive technology can navigate your page.
4. Write alternative text that conveys an image's purpose rather than describing its appearance.
5. Mark up genuinely tabular data with headers and scopes that screen readers can interpret.
6. Embed video or audio with captions and a fallback for browsers that cannot play it.
7. Write link text that makes sense when read out of context.
8. Validate your HTML and read the validator's output.

## Prerequisites

- **Course 0.2 — Computer Fundamentals.** You can create folders, save files, and find them again.
- **Course 0.3 — The Internet and the Web.** You know what a browser requests and what a server returns.

No prior coding experience is assumed. If you have never written a line of code, you are in the right place and starting at the right point.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A modern browser (Firefox, Chrome, Edge, or Safari) | Viewing and inspecting your page | Free |
| A text editor — VS Code, or your system's built-in editor | Writing HTML | Free |
| [W3C Markup Validation Service](https://validator.w3.org/) | Checking your HTML is valid | Free |

Nothing needs to be installed beyond a text editor. You do not need a server, a build tool, or an account anywhere.

## What you will build

A complete, multi-section information website for a real or imagined community organisation — a neighbourhood centre, a club, a library, a mutual aid group, a school society. You may instead build a personal site about yourself. Choose a subject you actually care about; you will be looking at it for ten hours.

The reference solution in [`completed/`](completed/) is a community centre page with an about section, an opening-hours table, a programmes list, an embedded video, and contact details.

**Your page will have no styling.** It will look plain. That is the point of this project — see [Key code explained](#key-code-explained).

## Folder guide

```text
01-html-foundations/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/             # Begin here — a scaffold with 11 TODOs
├── completed/           # Reference solution — open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/              # Images and media
└── screenshots/
```

## Setup

1. Download this project folder, or download the whole repository as a ZIP and find your way to it.
2. Create a folder for your work — somewhere you will find it again, not your Downloads folder.
3. Copy the contents of [`starter/`](starter/) into it.
4. Open `index.html` in your text editor.
5. Open the same file in your browser: **File → Open File**. You will see almost nothing. That is correct.

Keep both windows visible. Every time you save in the editor, reload the browser. That loop — edit, save, reload — is the whole of web development, and you will repeat it thousands of times.

## Walkthrough

The starter contains eleven numbered `TODO` comments. Work through them in order; each builds on the last.

### Plan your sessions

This project is about 16 sessions of 45 minutes. Four sessions a week takes about four weeks. Every session ends with something you can see in the browser, so stopping at the end of any row is safe. If you miss a week, restart at the beginning of your last session.

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Read this guide and complete **Setup** | The starter open in your editor and browser |
| 2 | Steps 1–2: title, description, skip link | A named tab and a working skip link |
| 3 | Steps 3–4: header and navigation | A page heading and a navigation list |
| 4 | Step 5: sections and headings | In-page links that jump to each section |
| 5 | Step 6: write your text | Real paragraphs about your community |
| 6 | Step 6: images and alt text | An image with alt text you have read aloud |
| 7 | Step 7: the table | A table a screen reader can explain |
| 8 | Step 8: lists | Programmes or services as proper lists |
| 9 | Step 8: media and captions | A video or audio clip with captions |
| 10 | Steps 9–10: contact details and footer | A complete page, top to bottom |
| 11 | Step 11: validate | Zero validator errors |
| 12 | Read **Key code explained** and **Accessibility requirements** | Notes in your learner journal |
| 13 | Work through [`tests/checklist.md`](tests/checklist.md) | Every item ticked |
| 14 | One challenge extension | A second page or a personal touch |
| 15 | The **3D moment** | A 3D world inside your page |
| 16 | **Submitting your work** and your reflection | Your page, published and in your portfolio |

### Step 1 — Describe the page (TODO 1–2)

Add a `<meta name="description">` and write a real `<title>`.

Reload. The tab at the top of your browser now shows your title. That is the first thing a screen reader announces, and the text a search engine displays. It is worth more thought than most people give it.

### Step 2 — The skip link (TODO 3)

```html
<a href="#main">Skip to main content</a>
```

Put it immediately after `<body>`. Reload the page and press **Tab** once. The link receives focus.

This exists because a keyboard user would otherwise tab through every navigation link on every page before reaching the content. You are building the accessibility in from the first element rather than retrofitting it later — which is the habit this whole programme is trying to give you.

### Step 3 — Header and heading (TODO 4)

One `<h1>`, naming the site. Then a short paragraph.

Exactly one `<h1>` per page. It answers "what is this page?" — not "what is the biggest text?"

### Step 4 — Navigation as a list (TODO 5)

```html
<nav aria-label="Main">
  <ul>
    <li><a href="#about">About us</a></li>
  </ul>
</nav>
```

It feels like extra typing for something that will render as a plain bulleted list. But a screen reader announces *"list, four items"*, telling the user how much navigation lies ahead before they commit to it. Loose `<a>` elements give them nothing.

### Step 5 — Sections and headings (TODO 6)

Four `<section>` elements, each with an `id` matching a navigation link and an `<h2>`.

Now test your navigation: click a link. The browser jumps to that section. You have built working in-page navigation with no JavaScript at all.

### Step 6 — Text and an image (TODO 7)

Write your paragraphs first, then add the image.

Alt text is the hardest thing in this project. Try this: cover the image with your hand and read your alt text aloud. Did you lose anything? Then it is too short. Are you reciting details nobody needs? Too long.

```html
<img src="../assets/centre-exterior.jpg"
     alt="The centre's front entrance, with a step-free ramp beside the main doors."
     width="800" height="450">
```

That alt text mentions the ramp because *accessibility information matters to this audience*. A different page might reasonably describe the same photograph differently. Context decides.

### Step 7 — A table (TODO 8)

```html
<table>
  <caption>Opening hours during term time</caption>
  <thead>
    <tr><th scope="col">Day</th><th scope="col">Opens</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">Friday</th><td>9am</td></tr>
  </tbody>
</table>
```

The `scope` attributes do the work. They let a screen reader announce *"Friday, Opens, 9am"* instead of an orphaned *"9am"*. Without them the table is a grid of meaningless numbers to anyone who cannot see its shape.

### Step 8 — Lists and media (TODO 9)

Use `<ul>` where order does not matter and `<ol>` where it does. Then add video or audio with `controls`, a `<track kind="captions">`, and fallback content between the tags.

You will need media files. See [`assets/README.md`](assets/README.md) — you can record ten seconds on a phone, or use the placeholder approach described there.

### Step 9 — Contact details (TODO 10)

A `<dl>` pairs each label with its value. Use `tel:` and `mailto:` links so a phone user can tap to dial.

### Step 10 — Footer (TODO 11)

A "back to top" link, small print in `<small>`, and a `<time datetime="2026-07-30">` element.

### Step 11 — Validate

Paste your HTML into the [W3C validator](https://validator.w3.org/#validate_by_input). Fix every error. Warnings are worth reading but not always worth acting on.

Read the messages rather than pattern-matching them. "End tag `li` implied" is telling you something specific about where the browser thinks your list ended.

## Key code explained

### Why your page has no CSS

Open [`completed/index.html`](completed/index.html) in a browser. It is plain: black text, blue links, default fonts. It also *works completely*. You can read it, navigate it by keyboard, and a screen reader announces every part correctly.

This is the single most important idea in the project. A well-structured HTML document is already accessible, already responsive, and already usable. CSS decorates a page that works. It cannot rescue one that does not.

Most beginners learn this backwards — they reach for styling immediately, produce something that looks impressive and is unusable by a large share of their potential audience, and never find out. You are learning it in the right order.

### Landmarks and how screen readers move

`<header>`, `<nav>`, `<main>`, and `<footer>` are *landmarks*. Screen reader users jump directly between them, much as your eye jumps to a heading when skimming.

A page built entirely from `<div>` elements has no landmarks. It renders identically and is dramatically harder to use. This is why "semantic HTML" is not a style preference — the semantics are the accessibility.

### Headings are an outline, not a font size

Heading levels form your document's table of contents. Screen reader users navigate by heading constantly, and skipping from `<h2>` to `<h4>` reads as a missing section — like a book jumping from chapter 2 to section 2.1.3.

If a heading looks too big, that is a CSS problem with a CSS solution. Never solve it by changing the level.

## Accessibility requirements

Your submission must meet all of these. They are checked in [`tests/checklist.md`](tests/checklist.md).

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| `<html lang="en">` (or your language) | 3.1.1 | Tells a screen reader which pronunciation rules to use. Without it, English read by a Spanish voice is incomprehensible. |
| One `<h1>`; no skipped levels | 1.3.1 | Heading navigation is how many users read. |
| Every `<img>` has an `alt` | 1.1.1 | Decorative images take `alt=""` — empty, but present. |
| Skip link, first in `<body>` | 2.4.1 | Bypasses repeated navigation. |
| Link text meaningful alone | 2.4.4 | Users can list every link stripped of context. |
| Tables use `<caption>` and `scope` | 1.3.1 | Associates each cell with its headers. |
| Media has captions | 1.2.2 | Deaf and hard-of-hearing users; noisy and silent environments. |
| Everything reachable by keyboard | 2.1.1 | Many users never touch a mouse. |

**Test it yourself.** Put your mouse away and navigate the whole page with **Tab**, **Shift+Tab**, and **Enter**. If you cannot reach something, neither can a large number of your users. Then try a screen reader — NVDA (Windows, free), VoiceOver (macOS and iOS, built in), or TalkBack (Android, built in). Ten minutes of listening to your own page teaches more than any article.

## Performance considerations

There is no JavaScript and no CSS here, so your page is already fast. Two habits worth forming now:

1. **Set `width` and `height` on images.** The browser reserves the space before the image arrives, so text does not jump as it loads. That jumping is called layout shift, and it is one of the most common complaints about modern websites.
2. **Resize images before uploading.** A photo straight from a phone can be 4 MB. Displayed at 800px wide it needs perhaps 150 KB. On a metered mobile connection, the difference is real money to your reader.

## Common mistakes

| Mistake | Why it is wrong | Instead |
| --- | --- | --- |
| Choosing heading levels by size | Breaks the document outline | Choose by structure; resize with CSS later |
| `alt="image"` or `alt="photo"` | Announces nothing useful | Describe the purpose, or `alt=""` if decorative |
| "Click here" as link text | Meaningless in a link list | Name the destination |
| Tables for layout | Nonsensical to screen readers | Tables for data only |
| Skipping `<caption>` and `scope` | Cells lose their headers | Always include both |
| Multiple `<h1>` elements | Ambiguous page purpose | Exactly one |
| Forgetting `lang` | Wrong screen-reader pronunciation | Set it on `<html>` |
| Ignoring validator errors | Small errors compound | Fix every error before submitting |

## Troubleshooting

**My page is blank.** Check the file is named `index.html` and opened via File → Open File. A blank page usually means an unclosed tag near the top — validate it.

**My image does not appear.** The `src` path is relative to the HTML file. Check spelling and capitalisation: on most web servers `Photo.JPG` and `photo.jpg` are different files, even though Windows treats them as the same.

**My in-page links do nothing.** The `href="#about"` must exactly match an `id="about"`. Case-sensitive, and the `id` itself has no `#`.

**My video does not play.** Browsers support different formats; MP4 with H.264 is the safest. If the fallback text appears instead, the file is missing or the path is wrong.

**The validator reports errors I do not understand.** Fix the first error and revalidate. One unclosed tag often produces a cascade of ten errors that all vanish together.

## 3D moment

In **Welcome to XR Camp** you built a 3D world in your first hour. Now put it inside your page.

1. Copy that world's `index.html` into a folder called `world/`, next to this project's `index.html`.
2. Add it inside one of your sections:

```html
<figure>
  <iframe src="world/index.html"
          title="My first 3D world: a garden with three shapes"
          width="800" height="450" loading="lazy"></iframe>
  <figcaption>My first 3D world. Drag or use the arrow keys to look around.</figcaption>
</figure>
```

The `title` on the `<iframe>` is what a screen reader announces, just like alt text on an image. The `<figcaption>` tells everyone how to use it. Set `width` and `height` for the same reason you set them on images: the page does not jump while the world loads.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)** — add a second page and link the two together.
2. **[Creative](challenges/challenge-2.md)** — make the page genuinely yours: your community, your language, your images.
3. **[Explorer](challenges/challenge-3.md)** — add structured data and an accessibility statement.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Validate at [validator.w3.org](https://validator.w3.org/) with zero errors.
3. Navigate the entire page with only the keyboard.
4. Publish it. You will learn how in **Course 1.8 — Git, GitHub, and Publishing**; if you already know, GitHub Pages works well.
5. Add the link to your portfolio. Share it with other developers (see [where to share your work](../../docs/en/community.md)) too.
6. Write a short reflection in your learner journal: what surprised you about alt text?

## Further reading

- [MDN — Structuring content with HTML](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content)
- [WebAIM — Alternative text](https://webaim.org/techniques/alttext/)
- [W3C — Web Accessibility Tutorials](https://www.w3.org/WAI/tutorials/)
- [HTML Living Standard](https://html.spec.whatwg.org/multipage/) — the actual specification. Dense, but this is where the answers ultimately live.

## Women to Know

**Léonie Watson** is a British accessibility engineer and a screen reader user, and a co-founder of the accessibility consultancy TetraLogical. Watson has served in W3C working groups shaping the web platform standards used in this very project, and has long argued for building accessibility into the web at the specification level rather than bolting it on afterwards.

The connection to this lesson is direct: the landmarks, headings, and alt text you wrote today are useful precisely because people like Watson fought for them to exist in the standards and to be implemented properly in browsers.

_Facts from public sources, checked 2026. Spotted an error? [Tell us](https://github.com/XR-Dev-Camp/xr-camp/issues)._

## Standards spotlight

This project is built entirely on two open standards: the [HTML Living Standard](https://html.spec.whatwg.org/multipage/) (WHATWG) and [WCAG 2.2](https://www.w3.org/TR/WCAG22/) (W3C). Both are public, free to read, and open to comment from anyone — including you. Nothing you wrote today depends on any company's product.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)

