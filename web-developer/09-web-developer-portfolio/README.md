# Phase 1 Capstone - Web Developer Portfolio

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `web-developer` · **Lesson:** `web-developer-portfolio-09` · **Time:** about 15 hours · 20 sessions of 45 minutes · about 5 weeks at 4 sessions a week

---

> Publish a professional, accessible, responsive portfolio containing multiple completed web projects.

---

## Learning objectives

By the end of this project you will be able to:

1. Plan a website around one audience and one goal, and draw its structure before you build it.
2. Choose your strongest projects, and describe each one in plain language: what it is, who it is for, and what you did.
3. Write a case study that shows your process and your decisions, not only the finished result.
4. Reuse your semantic HTML, tokenised CSS, and responsive layout from Courses 1.1 to 1.4 to build a new site quickly.
5. Give a site your own visual identity, and check every colour for contrast.
6. Audit your own site for accessibility with the method from Course 1.5, and fix what you find.
7. Add JavaScript that improves a page without being needed to use it.
8. Test on real devices, keep a page fast, and document your work in a README.
9. Publish your portfolio with GitHub Pages, and decide what personal information never to publish.

## Prerequisites

- **Courses 1.1–1.6.** You have built an accessible, styled, responsive site, audited a page, and written JavaScript.
- **Courses 1.7 and 1.8.** You can use the developer tools to find problems, and you can publish a site with Git and GitHub Pages.
- **At least three finished projects** from Phase 1. They do not need to be perfect.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A modern browser, with its developer tools | Testing widths, the console, and the Network tab | Free |
| A text editor (VS Code recommended) | Writing your portfolio | Free |
| A screen reader: NVDA (Windows), VoiceOver (macOS and iPhone), or TalkBack (Android) | Your accessibility audit | Free |
| [axe DevTools](https://www.deque.com/axe/devtools/) or [WAVE](https://wave.webaim.org/extension/) | Automated checks | Free versions |
| [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) | Checking your colours | Free |
| A GitHub account | Publishing with GitHub Pages | Free |
| A phone | Testing on a real device | Your own |

## What you will build

Your **portfolio**: a small, fast website that shows who you are and what you can build. It has:

- a **home page** that says who you are and what you build, in two sentences;
- a **projects section**, with a card for each Phase 1 project: a picture, what it is, who it was for, the skills it shows, and links to the live project and its code;
- at least one full **case study**: the problem, the audience, your process, your decisions and why, your accessibility work, and what you learned;
- **contact details** that let people reach you without giving away your privacy;
- a small **3D gallery** of your projects, with a plain list of the same projects as the fallback.

This is the capstone of Phase 1: every skill from Courses 1.1 to 1.8 appears in it. It is also the first thing a future employer, client, or teacher will see of your work, so you will keep it and update it for the rest of XR Camp.

The reference solution in [`completed/`](completed/) is Ana's portfolio, with a case study of the Riverside Community Centre site she built in Courses 1.1 to 1.6. Yours will be about your own projects, in your own words.

## Folder guide

```text
09-web-developer-portfolio/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html       # Home page: TODOs 1–4
│   ├── case-study.html  # Case study: TODOs 5–9
│   ├── styles.css       # The Riverside stylesheet, ready to reuse: TODOs 10–11
│   ├── gallery-3d.html  # The 3D gallery, nearly finished: TODO 12
│   ├── portfolio.js     # The project filter (finished)
│   ├── centre.svg, centre-480.jpg, centre-960.jpg   # Drawings of the Riverside centre
│   └── thumb-form.svg, thumb-audit.svg, thumb-explorer.svg   # Simple project pictures
├── completed/           # Reference solution: open this last
├── challenges/          # Three extensions: the first is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. Create a folder called `portfolio` in your `xr-camp` folder, and copy the files from this lesson's `starter` folder into it.
2. Inside `portfolio`, create a folder called `projects`, and copy each Phase 1 project into its own folder there: for example `projects/riverside/`. When you publish, everything goes online together, and your links stay short and relative: `projects/riverside/index.html`.
3. Open each project from its new place, and check that it still works: pictures, styles, and links.
4. Open `portfolio/index.html` in your browser, and the whole `portfolio` folder in your editor.
5. Start a new page in your learner journal called **Portfolio plan**. You will fill it in Sessions 1 to 3.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; Step 1: plan your portfolio | A one-paragraph plan |
| 2 | Step 2: choose your projects and gather evidence | A project inventory |
| 3 | Step 3: information architecture | A sitemap on paper |
| 4 | Step 4: write your words (TODOs 1–2) | Your introduction and About section |
| 5 | Step 5: project cards (TODO 3) | A card for every project |
| 6 | Step 6: contact details and privacy (TODO 4) | A complete home page |
| 7 | Step 7: your visual identity (TODO 10) | Your own colours, with checked contrast |
| 8 | Step 8: responsive layout (TODO 11) | Pages that work from 320 to 1280 pixels |
| 9 | Step 9: the case study's facts, problem, and audience (TODOs 5–6) | The first half of a case study |
| 10 | Step 9, continued: process and decisions (TODO 7) | Three decisions, explained |
| 11 | Step 9, continued: accessibility, results, and learning (TODOs 8–9) | A complete case study |
| 12 | Step 10: JavaScript that improves the page | A project filter you can explain |
| 13 | Step 11: audit your portfolio | An audit table |
| 14 | Step 11, continued: fix what you found | Every finding fixed |
| 15 | Step 12: test on devices, and check the speed | A test log |
| 16 | Step 13: documentation | A README for your portfolio |
| 17 | Step 14: publish | Your portfolio at a public address |
| 18 | The **3D moment** (TODO 12) | A 3D gallery, with a list as the fallback |
| 19 | [Challenge 1](challenges/challenge-1.md) (required): a second case study | Two case studies |
| 20 | [`tests/checklist.md`](tests/checklist.md), Step 15, and **Submitting your work** | A tested, published portfolio |

### Step 1: plan your portfolio

Before any code, answer three questions in your journal:

1. **Who is it for?** Choose one main reader: an employer hiring a junior developer, a small organisation that needs a website, a university, or a scholarship. You cannot write well for everyone at once.
2. **What should they learn in 30 seconds?** Most people skim. Write the one sentence you want them to remember.
3. **What should they do next?** Usually: read a case study, then contact you.

Ana's plan was: *"For small organisations and teams hiring a junior developer. In 30 seconds they should learn that I build websites that everyone can use. Then they should read my Riverside case study and email me."*

### Step 2: choose your projects and gather evidence

Three to five good projects are better than ten small ones. For each project you might include, write down:

| Question | Riverside, for example |
| --- | --- |
| What is it, in one sentence? | A website for a community centre, on any screen |
| Who was it for? | Local families, many on phones |
| What did **you** do? | Everything: content, HTML, CSS, testing |
| Where does it live? | `projects/riverside/index.html` |
| What picture shows it best? | A screenshot of the home page on a phone |
| What are you proud of? | The opening-hours table works with a screen reader |

Then gather your **evidence**: your notes, your test logs from Course 1.4, your audit from Course 1.5, screenshots of before and after. A case study is built from these.

Be honest about what each project was. A practice project, or an imagined organisation like Riverside, is fine: say so. A tutorial you copied step by step is not your project; a tutorial you changed and extended can be, if you say what you added.

### Step 3: information architecture

**Information architecture** means deciding what goes where, and what it is called, before you build. Draw your sitemap on paper:

```text
Home (index.html)
├── About me          (#about)
├── Projects          (#projects)  →  one card per project
│   └── Case study    (case-study.html)
├── How I built this site (#this-site)
├── Contact           (#contact)
└── 3D gallery        (gallery-3d.html)
```

A small portfolio can be one page with sections, plus one page per case study. Name the navigation links in plain words: "Projects", not "Work showcase"; "Contact", not "Let's connect". Every page gets the **same navigation in the same order**, so people never have to learn it twice.

### Step 4: write your words (TODOs 1–2)

Write your words before you style anything. A beautiful page cannot rescue unclear words, and clear words look good even in plain HTML.

- **TODO 1:** your name in the title, the description, and the header.
- **TODO 2:** your introduction and About section.

Tips for plain language:

- Start with who you are and what you build: *"I build websites that everyone can use."*
- Short sentences. One idea each.
- Things a person can **check**, not adjectives. *"I test with a screen reader"* says more than *"passionate about accessibility"*.
- Being a learner is not a weakness. *"I am learning web development at XR Camp"* is true, and it tells people what to expect.
- Read it aloud. If you stumble, rewrite it.

### Step 5: project cards (TODO 3)

Each project is a card in a list, exactly like the programme cards in Course 1.4:

```html
<li class="card project" data-skills="responsive accessibility">
  <img src="centre.svg" alt="" width="800" height="450">
  <h3>Riverside Community Centre website</h3>
  <p>A website for a community centre: opening hours, programmes, and how to visit, on any screen.</p>
  <p><strong>Built for:</strong> local families, many on phones.</p>
  <ul class="tags" aria-label="Skills">
    <li>HTML</li>
    <li>CSS grid</li>
  </ul>
  <p class="links">
    <a href="case-study.html">Read the Riverside case study</a><br>
    <a href="projects/riverside/index.html">Visit the Riverside website</a>
  </p>
</li>
```

Three decisions in this card:

- **`alt=""` on the picture.** The heading already names the project, so the picture adds nothing for a screen-reader user. If your picture shows something the words do not, describe that instead.
- **Link text that says where it goes.** Four cards that all say "Demo" and "Code" give a screen-reader user a list of links that all sound the same. "Visit the Riverside website" is clear anywhere.
- **`width` and `height` on every image.** The browser saves the right space before the picture arrives, so the page does not jump as it loads.

For pictures, use a screenshot of your project, or a simple drawing. Save screenshots at about 1000 pixels wide: a full-size screenshot can be many times heavier than your whole site. Never use photos of other people without their permission, and never screenshots that show real people's names or data.

### Step 6: contact details and privacy (TODO 4)

Your portfolio is public: anyone in the world can read it, and copy it, for ever. Before you write your contact section, decide what **not** to publish:

| Do not publish | Why | Instead |
| --- | --- | --- |
| Your home address | Anyone can find your home | Your city or country, if you want |
| Your personal phone number | Spam, scams, and unwanted calls | An email address |
| Your ID number, birth date, or passport | Identity theft | Nothing: nobody needs these from a portfolio |
| Photos of your children or family | Their privacy is not yours to give away | Nothing |
| Screenshots with real people's data | Their privacy, and possibly the law | Screenshots with made-up data |
| Passwords, API keys, or tokens in your code | Anyone can use them | Keep them out of every public repository |

Make a **new email address just for your portfolio**. If it gets spam, you can close it without losing your personal email. Link to it with `mailto:`:

```html
<a href="mailto:ana.builds@example.com">ana.builds@example.com</a>
```

Show the address as the link text too, so people can copy it if their device has no email app.

### Step 7: your visual identity (TODO 10)

Your stylesheet is the Riverside stylesheet from Courses 1.3 and 1.4. The layout, spacing, and responsive rules already work. To make it yours, change only the **design tokens** at the top: the values, never the names.

Ana chose deep teal, terracotta, and warm sand. Choose colours that feel like you: from your culture, your city, or a place you love. Then check every text colour in the [contrast checker](https://webaim.org/resources/contrastchecker/):

- Text on the background, the surface, and the band: **at least 4.5:1**.
- The focus outline and form borders: **at least 3:1**.

Write the ratios in the comment above your colours, as Ana did. If a colour fails, darken it a little and check again; most colours have a darker version that still feels the same.

Keep system fonts. They cost nothing to download, and the font list already includes fonts for Chinese and for accented letters.

### Step 8: responsive layout (TODO 11)

Your cards are already a responsive grid. In TODO 11, you add one layout for wide screens: the case study's key facts in two columns.

```css
@media (min-width: 48rem) {
  .facts {
    grid-template-columns: max-content 1fr;
    column-gap: var(--space-4);
  }
}
```

`max-content` makes the first column exactly as wide as the longest term, such as "My role"; `1fr` gives the rest to the answers. Then test every page at **320, 390, 768, and 1280 pixels** wide in device mode, as in Course 1.4.

### Step 9: the case study (TODOs 5–9)

Screenshots show **what** you made. A case study shows **how you think**, and that is what people who hire and teach are looking for. Choose the project you learned the most from, not the one that looks best.

| Section | Answers | TODO |
| --- | --- | --- |
| Key facts | Your role, the time, the tools, the links, and an honest note if it was practice | 5 |
| The problem | What people needed, and what was in their way | 6 |
| Who it is for | The people, and one thing about each that changed how you built it | 6 |
| My process | The stages, in order | 7 |
| Decisions | What you chose, why, and what else you considered | 7 |
| Accessibility | What you did, how you tested, and what is not perfect yet | 8 |
| Results and learning | What you can measure, what you learned, and what you would do next | 9 |

The **decisions** are the heart of it. Write each one in three parts:

> **What I chose:** a real table inside a box that scrolls sideways.
> **Why:** a real table lets screen-reader users hear the day with every time.
> **What I considered:** changing the table into blocks with CSS.

A decision that went wrong first, and what you changed, is often the most interesting one to read. Ana's fourth decision is a mistake she found with a screen reader.

**Write about your accessibility work.** Most of it is invisible: nobody can see a good heading order or a label. If you do not say it, nobody will know you did it. Say what is not perfect yet, too: honesty is more convincing than a claim that everything is perfect.

### Step 10: JavaScript that improves the page

Open `portfolio.js`. It is finished: read it, and explain it to yourself line by line. It is the programme explorer from Course 1.6, made smaller: find the elements, listen for a change, decide which cards match, and announce the result.

The important idea is **progressive enhancement**. The filter starts `hidden` in the HTML:

```html
<fieldset id="filters" class="filters" hidden>
```

and only the script shows it:

```js
filters.hidden = false;
```

So if the script fails to load (on a slow connection, or with an error), the visitor sees every project and no broken controls. The page works first, and JavaScript makes it better.

Test it: choose each filter with the mouse, then with the keyboard (**Tab** to the group, then the **arrow keys**), then with your screen reader on, and listen for "Showing 1 of 4 projects".

### Step 11: audit your portfolio

Audit your own portfolio with the method from Course 1.5, on every page:

1. **Keyboard:** Tab through everything. Is focus always visible? Can you reach and use every link and control?
2. **Screen reader:** list the headings and the links. Do they make sense on their own? Does the filter announce its count?
3. **Zoom, colour, and motion:** 200% and 400% zoom; every colour checked; nothing moves on its own.
4. **Automated tool:** run axe DevTools or WAVE on every page. Then remember what it cannot check.

Write every problem in a table, as in Course 1.5:

| # | Problem | WCAG 2.2 | Who it affects | Fix |
| --- | --- | --- | --- | --- |
| 1 | Two cards both have a link called "Demo" | 2.4.4 (and 2.4.9) | Screen-reader users listing links | Say which project each link opens |

Then fix everything, one row at a time. Keep the table: a short version belongs in your "How I built this site" section.

### Step 12: test on devices, and check the speed

Test like Course 1.4, and keep a test log in your journal: device, browser, what worked, what did not.

- Every page at 320, 390, 768, and 1280 pixels.
- On at least one real phone, in portrait and landscape.
- At your phone's biggest text size.

Then check the speed. Open the **Network** tab, tick **Disable cache**, and reload. At the bottom, the tools show how much the page downloaded. Choose a slow connection in the **throttling** menu (for example "Slow 4G"), and reload again: this is how your page feels on a weak mobile signal.

Ana's home page is about 27 KB in total, smaller than a single photo from a phone camera. If yours is much bigger, the usual cause is large pictures: resize them.

### Step 13: documentation

Every repository needs a `README.md`: the page GitHub shows first. Create one in your `portfolio` folder:

```markdown
# Ana's portfolio

My web development portfolio: https://your-username.github.io/portfolio/

## What is in it
- Home page, with my Phase 1 projects
- A case study of the Riverside Community Centre website
- A small 3D gallery, with a plain list as the fallback

## Built with
HTML, CSS, a little JavaScript, and A-Frame for the 3D gallery. No build tools.

## Accessibility
I aim for WCAG 2.2 level AA. Tested with the keyboard, NVDA, VoiceOver,
axe DevTools, 200% zoom, and two phones.

## Run it on your computer
Download the repository and open index.html in a browser.

## Credits
Drawings by XR Camp, shared under CC0.
```

Documentation is part of the work, not extra: it is how the next person, or you in a year, understands what you built.

### Step 14: publish

Publish with Git and GitHub Pages, as in Course 1.8:

1. Create a repository called `portfolio`, and push your `portfolio` folder to it.
2. In the repository's **Settings**, open **Pages**, and publish from your main branch.
3. After a few minutes, your portfolio is at `https://your-username.github.io/portfolio/`.

Before you share the address, check the published site, not your local copy:

- **Every link works.** Links must be relative (`projects/riverside/index.html`), never a path on your computer (`C:\Users\...`).
- **File names match exactly.** On most web servers, including GitHub Pages, `Case-Study.html` and `case-study.html` are different files. Use lower case everywhere.
- **Open it on your phone**, on mobile data, not only on your Wi-Fi.
- **Read it one more time for privacy**, with Step 6's table beside you.

### Step 15: keep it updated

A portfolio is never finished. Put a reminder in your calendar every three months to:

- add your newest project, and remove your weakest one if you have more than five;
- click every link, because links break when things move;
- update the "Last updated" date in the footer;
- read your About section again: does it still describe you?

In every phase of XR Camp, you will add to this portfolio: 3D scenes in Phase 3, XR in Phase 4. You are building it for years, not for this lesson.

## Key code explained

**`hidden` and progressive enhancement.** The `hidden` attribute removes an element from the page and from screen readers. The filter starts hidden, and the script shows it, so the page never shows controls that do not work. `[hidden] { display: none !important; }` in the stylesheet makes sure no other rule can show a hidden element by mistake.

**`data-skills` and `dataset`.** A custom data attribute stores information for your script on the element itself. `card.dataset.skills` reads `data-skills`; `.split(' ')` turns "responsive accessibility" into an array.

**`<dl>`, `<dt>`, `<dd>`.** A description list: each term (`dt`) followed by its description (`dd`). The right element for key facts like "My role" and "Time".

**`aria-current="page"`.** Tells screen readers which navigation link is the page they are on. The stylesheet also underlines it, so it is marked by more than colour.

**`mailto:`.** A link that opens the visitor's email app with your address filled in.

**The list is the source (in the 3D gallery).** The script reads the projects from the plain HTML list and builds one 3D panel for each, so the 3D gallery and its fallback can never disagree.

## 3D moment

Open [`starter/gallery-3d.html`](starter/gallery-3d.html). It is a small gallery room with a framed panel on the wall for each project. Click a panel, or use the **Previous project** and **Next project** buttons: the selected panel gets a red frame and steps forward, the **Open** link changes to that project, and a screen reader announces which one is selected.

In TODO 12, replace the list of projects with your own, then update the scene description to match what you see. You do not write any 3D code: the script builds the panels from your list.

Read the script, and notice four rules you will keep for the rest of XR Camp:

1. **The 2D content comes first.** The plain list is the real content, and it works on every device, with or without WebGL. The 3D is built from it.
2. **Every 3D interaction has a keyboard route.** One function, `select`, is called by a click on a panel and by both buttons.
3. **A scene description** (`id="scene-description"`) says in words what the scene shows.
4. **Comfort.** The camera has no `look-controls` and no `wasd-controls`: the view never moves, and nothing moves on its own. The selected panel changes place instantly, instead of sliding.

The gallery is on its own page, so the A-Frame library downloads only for people who choose to visit it. The manual checks for every 3D page are in [`docs/en/xr-accessibility.md`](../../docs/en/xr-accessibility.md).

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| Every page has a language and a descriptive title | 3.1.1, 2.4.2 | Screen readers use the right voice; tabs and search results make sense. |
| Headings, lists, and landmarks are real HTML | 1.3.1 | People can move by headings and hear "list, 4 items". |
| Informative images have meaningful alt; repeated or decorative ones have `alt=""` | 1.1.1 | Screen-reader users get the information, without noise. |
| Every link says where it goes | 2.4.4, 2.4.9 | "Visit the Riverside website", never "Demo" four times. Level A allows the card around a link to explain it; level AAA (2.4.9) asks for link text that makes sense on its own, which is kinder to everyone. |
| Text contrast at least 4.5:1; focus outline and borders at least 3:1 | 1.4.3, 1.4.11 | Readable in sunlight and with low vision. |
| No sideways scrolling at 320 pixels wide | 1.4.10 | People who zoom to 400% get a 320-pixel page. |
| Everything works with the keyboard, with visible focus | 2.1.1, 2.4.7 | Including the filter and the 3D gallery. |
| The same navigation, in the same order, on every page | 3.2.3 | People learn it once. |
| The filter's result count is announced | 4.1.3 | Screen-reader users know the filter worked. |
| The 3D scene has a text description | 1.1.1 | A canvas is a blank rectangle to a screen reader. |
| Nothing in the 3D scene moves on its own, and the camera never moves | 2.2.2 | No motion to pause, and no motion sickness. |
| No personal information you would not tell a stranger | Good practice (not a WCAG rule) | Your safety, and your family's. |

## Performance considerations

A portfolio is often opened on a phone, by someone deciding in seconds whether to keep reading. Ana's home page, with its stylesheet, script, and four drawings, is about 27 KB. The biggest risk to that is pictures: one full-size screenshot can weigh more than everything else together, so resize screenshots to about 1000 pixels wide, and use `srcset` for large ones, as in Course 1.4.

A-Frame is about 1.3 MB of code (about 350 KB after compression). That is why the 3D gallery has its own page: people who never visit it never download it. The gallery also uses no pictures as textures, only coloured shapes and text, so it loads quickly and works when opened straight from a file.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Only screenshots, no story | People see the result, but not how you think | At least one case study with decisions |
| Too many small projects | The good ones get lost | Three to five of your best |
| "Demo" and "Code" on every card | A list of links that all sound the same | Link text that names the project |
| Your home address or personal phone | Anyone in the world can see them | A portfolio email address |
| Full-size screenshots | A slow page on phones | Resize to about 1000 pixels wide |
| Paths from your computer (`C:\Users\...`) | Broken links once published | Relative paths, in lower case |
| The 3D gallery on the home page | Every visitor downloads A-Frame | 3D on its own page, linked from the home page |
| Adjectives instead of evidence | "Passionate" means nothing to a reader | Say what you did and how you tested it |
| Never updating it | Old projects and broken links | A reminder every three months |

## Troubleshooting

**My site works on my computer, but GitHub Pages shows "404".** Check that your home page is called `index.html`, in lower case, at the top of the repository. After you publish, wait a few minutes and reload.

**The published site has no styles.** The `href` in your `<link>` does not match the file exactly. Compare the capital letters: `Styles.css` and `styles.css` are different files online.

**The project filter does not appear.** That is what should happen when the script does not run. Open the console: check the `<script>` tag's `src` matches `portfolio.js`, and look for a red error.

**The 3D gallery is empty or grey.** A-Frame downloads from the internet, so check your connection. If the device does not support WebGL, the scene cannot draw: the list of projects below it still works, which is exactly why it is there.

**The panels have no names.** A-Frame's text downloads its font from the internet too. Check your connection, and the console.

**A colour fails the contrast check.** Darken the text colour, or lighten the background, a little at a time, until it reaches 4.5:1.

## Challenge extensions

Three extensions, in [`challenges/`](challenges/). The first is required:

1. **[Foundation](challenges/challenge-1.md)** (required): a second case study.
2. **[Creative](challenges/challenge-2.md)**: a personal visual identity, with a palette from your culture and checked contrast.
3. **[Explorer](challenges/challenge-3.md)**: a lightweight mode without pictures, or a print stylesheet.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Write your portfolio's public address in your learner journal.
3. Take screenshots of your home page at 320 and 1280 pixels wide, and one of your case study.
4. When the XR Camp community opens, share your address there, and read two other learners' case studies.
5. In your journal, answer: which decision in your case study are you proudest of, and why?

## Further reading

- [GitHub Docs: Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [GitHub Docs: About READMEs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes)
- [W3C: Easy checks, a first review of web accessibility](https://www.w3.org/WAI/test-evaluate/preliminary/)
- [W3C: Developing an accessibility statement](https://www.w3.org/WAI/planning/statements/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

## Women to Know

**Shirley Wu** is a freelance data-visualization designer, and a teacher of D3.js, a JavaScript library for drawing data on the web, with courses on Frontend Masters. With Nadieh Bremer, she co-created **Data Sketches**, a project and a book.

A portfolio that shows how you got somewhere, not only where you ended, is a kind of teaching. When you write your case study, you do what teachers like Shirley Wu do: you make your process something other people can learn from. Look up Data Sketches, and ask yourself: what does it show besides the finished pictures?

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

Your portfolio uses standards from several groups. The HTML elements, including `<dl>` and the `hidden` attribute, come from the **HTML Living Standard** (WHATWG). Your layout comes from CSS modules written by the **W3C's CSS Working Group**. Your accessibility target, **WCAG 2.2**, comes from the W3C's Web Accessibility Initiative, which also publishes guidance on writing an accessibility statement like your "How I built this site" section. Even the `mailto:` link is a standard: the IETF's RFC 6068.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
