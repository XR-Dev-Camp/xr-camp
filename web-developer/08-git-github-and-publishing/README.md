# Git, GitHub, and Publishing

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `web-developer` · **Lesson:** `git-github-and-publishing-08` · **Time:** about 9 hours · 12 sessions of 45 minutes · about 3 weeks at 4 sessions a week

---

> Publish the Phase 1 portfolio and project collection.

---

## Learning objectives

By the end of this project you will be able to:

1. Explain what version control is, and what a repository, a commit, a branch, and `main` are.
2. Explain the difference between Git, the tool, and GitHub, a website that stores Git repositories.
3. Prepare a folder for publishing: tidy file names, links that work online, and nothing private.
4. Create a repository, upload your files, and commit changes, using only a browser.
5. Clone a repository with GitHub Desktop, make a change on your own computer, commit it, and push it.
6. Write a README in Markdown that tells a stranger what your project is and how to use it.
7. Publish a website with GitHub Pages, and test it on a phone.
8. Choose a licence, explain why code and written content often have different licences, and credit other people's work.
9. Explain, in outline, what a fork and a pull request are.

## Prerequisites

- **Course 0.1: Welcome to XR Camp.** You have your first 3D world, in a folder called `my-first-world`.
- **Courses 1.1–1.6.** You have your Riverside Community Centre site, or your own site, with its join form, accessibility audit, and programme explorer.
- **An email address** you can read, to create a free GitHub account.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A modern browser | GitHub's website, and testing your published site | Free |
| A GitHub account | Storing your repository and publishing it | Free |
| [GitHub Desktop](https://desktop.github.com/) (Windows or macOS) | Working with your repository on your own computer | Free |
| A text editor (VS Code recommended) | Writing your collection page and README | Free |
| A phone (optional, but recommended) | The 3D moment: opening your world on a real device | Your own |

On Linux, or on a computer where you cannot install programs, use the browser workflow in Steps 6 and 7 for everything. It is enough to finish the whole lesson.

## What you will build

A **public repository** that holds every project you built in Phase 1, published as a real website with its own address, which you can send to anyone:

- A **project collection page**, `index.html`: the home page of your published site, with a card and a clear link for each project.
- A **README** that explains the repository to anyone who finds it.
- A **licence** that says how other people may use your work, and **credits** for everything you used that you did not make.
- Your **3D world**, online, opened on your own phone.

The reference solution is in [`completed/`](completed/): Ana's collection page, and model README, licence, and `.gitignore` files. The starter has the collection page with ten TODOs, and a README template with nine.

## Folder guide

```text
08-git-github-and-publishing/
├── README.md               # This guide
├── README.es.md            # Spanish
├── README.zh-Hans.md       # Simplified Chinese
├── project.json            # Lesson metadata
├── starter/
│   ├── index.html          # Begin here: your collection page, with 10 TODOs
│   └── README-template.md  # Your repository's README, with 9 TODOs
├── completed/              # Reference solution: open this last
│   ├── index.html          # Ana's collection page
│   ├── README-example.md   # A model README
│   ├── LICENSE-example     # The MIT Licence, filled in
│   └── gitignore-example   # A small .gitignore
├── challenges/             # Three extensions
├── tests/checklist.md      # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. Make a new folder for this lesson's work, called `web-projects`, in your `xr-camp` folder. This folder will become your repository.
2. Copy into it a **copy** of your `my-first-world` folder from Course 0.1, and a **copy** of your site folder from Courses 1.1–1.6, renamed `riverside` (or a short name for your own site). Work on copies, so your originals stay safe.
3. Copy `starter/index.html` and `starter/README-template.md` into `web-projects`, and rename the template `README.md`.

Your folder now looks like this:

```text
web-projects/
├── index.html          # your collection page
├── README.md           # your README
├── my-first-world/
│   └── index.html
└── riverside/
    ├── index.html
    ├── join.html
    ├── audit.html
    ├── styles.css
    └── explorer/
        └── ...
```

> **If you are in mainland China.** GitHub and GitHub Pages can be slow or unreliable there, and some days they may not load at all. Gitee Pages, which many people once used instead, stopped its service in 2024. Hosting options change, so ask in one of the [communities where developers help each other](../../docs/en/community.md) what works now. Everything in this lesson except uploading and publishing also works offline: Git and GitHub Desktop keep your full history on your own computer, and your collection page opens from your folder. You can do Steps 1–5 and Step 11 now, and publish when a connection allows.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; Step 1: version control; Step 2: your GitHub account | An account with two-factor authentication on |
| 2 | Step 3: prepare your folder | A tidy folder with nothing private in it |
| 3 | Step 4: the collection page (TODOs 1–7) | A home page that links to your 3D world and your site |
| 4 | Step 4, continued (TODO 8), and testing every link | A finished collection page that works on your computer |
| 5 | Step 5: the README | A `README.md` a stranger can follow |
| 6 | Step 6: create a repository and upload your files | Your projects on GitHub, in your first commit |
| 7 | Step 7: commits and history (TODO 9) | A second commit, and a history you can read |
| 8 | Step 8: GitHub Pages | Your collection at a real web address |
| 9 | Step 9: test online, and the **3D moment** | Your 3D world open on your own phone |
| 10 | Step 10: GitHub Desktop | A change made on your computer, pushed, and live |
| 11 | Step 11: licences, credits, and `.gitignore`; [Challenge 1](challenges/challenge-1.md) (TODO 10) | A licence and credits in your repository |
| 12 | Step 12: branches, forks, and pull requests; [`tests/checklist.md`](tests/checklist.md); **Submitting your work** | A published, tested collection, and its address in your journal |

### Step 1: what version control is

You have probably saved files like `site-final.html`, `site-final-2.html`, and `site-final-REALLY.html`. **Version control** does that job properly: it remembers every version of every file, who changed it, when, and why, and lets you go back to any of them.

The words you need:

| Word | Means |
| --- | --- |
| **Repository** (or "repo") | A project folder whose history is tracked: every file, plus every earlier version of it. |
| **Commit** | A saved snapshot of the whole project at one moment, with a short message saying what changed. Your history is a list of commits. |
| **Branch** | A separate line of work inside the repository, so you can try something without changing the main version. |
| **`main`** | The main branch: the version everyone sees, and the one GitHub Pages will publish. |
| **Clone** | A full copy of a repository on your own computer, with all its history, still connected to the original. |
| **Push** | Sending your new commits from your computer up to GitHub. |

**Git** is the tool that does version control. It runs on your computer, and it is free, open-source software. **GitHub** is a website that stores Git repositories online, so you can share them, work on them with other people, and publish them. Git came first; GitHub is one of several services built around it.

### Step 2: your GitHub account

1. Go to [github.com](https://github.com/) and sign up.
2. **Choose your username carefully.** It will be part of your website's address, and employers may see it. It does not have to be your full real name: something short, professional, and easy to spell is best.
3. Turn on **two-factor authentication** in your account settings, if GitHub has not already asked you to. Your repository will hold your portfolio: protect it like your email.
4. In **Settings → Emails**, turn on **Keep my email addresses private**. GitHub then uses a private "noreply" address on your commits instead of your real one.

### Step 3: prepare your folder

A site that works when you open it from your computer can still break online. Check four things before you upload anything.

**1. Names.** Use lowercase letters, numbers, and hyphens: `my-first-world`, `join.html`, `centre-960.jpg`. No spaces, no accents.

**2. Capital letters must match exactly.** On Windows and macOS, `Styles.css` and `styles.css` usually open the same file. On the server that runs GitHub Pages, they are two different files, so a link to `Styles.css` finds nothing. Search your HTML for every `href` and `src`, and check each one against the real file name, letter by letter.

**3. Links must be relative.** A link such as `riverside/join.html` or `../styles.css` works everywhere. A link that starts with `C:\Users\...` or `file:///` points to **your** computer, and breaks for everyone else. Search your files for `C:\` and `file:` and fix any you find.

**4. Nothing private.** Everything you upload to a public repository can be read by anyone, and is very hard to remove completely. Look through every file, including comments, for:

- Passwords, keys, or codes of any kind.
- Your home address, your phone number, or anyone else's.
- Photos of real people who have not agreed, especially children.
- Files you did not mean to include: notes, drafts, downloads.

Every folder that is a page needs a file called `index.html`: when someone visits `.../my-first-world/`, the server looks for `index.html` in that folder.

### Step 4: the collection page (TODOs 1–8)

Open `index.html` in your editor and your browser. It is your repository's home page: the first thing people see at your address. The styles are finished, so you only write HTML.

Work through TODOs 1–8:

- **TODOs 1–3** are in the `<head>`: the page's language, its description, and its title. The title is the first thing a screen reader says, and the name on the browser tab, so make it say whose projects these are.
- **TODOs 4–5** are your name and introduction. You do not have to use your full real name. This page will be public.
- **TODOs 6–8** are the cards: one for each project. Each card is a list item:

  ```html
  <li class="card">
    <h3>Programme explorer</h3>
    <p class="course">Course 1.6</p>
    <p>Search and filter the centre's programmes as you type.</p>
    <p class="built-with">Built with HTML, CSS, and JavaScript.</p>
    <p class="view"><a href="riverside/explorer/index.html">Use the programme explorer</a></p>
  </li>
  ```

**Link text must say where the link goes.** A screen-reader user can list every link on a page, out of context. Five links that all say "View project" sound identical; "Visit my first 3D world" and "Use the programme explorer" do not.

Then **test every link**: open the page from your folder, and click each one. Also press **Tab** through the page: the skip link should appear first, and every link should show a clear focus outline.

TODOs 9 and 10 come later, in Steps 7 and 11.

### Step 5: the README (Markdown)

A **README** is the front door of a repository. GitHub shows `README.md` below the list of files, so it is the first thing a visitor reads. Yours answers: what is this, how do I see it, how was it built, who else's work is in it, and how may I use it?

`.md` means **Markdown**: plain text, with a few symbols that GitHub turns into headings, lists, and links:

```markdown
# A heading (level 1)
## A smaller heading (level 2)

A paragraph is just text. **Two stars** make bold text.

- A list item
- Another list item

[Words people click](https://example.com/)
![Alt text that describes the picture](screenshots/home.png)
```

It works like HTML, with less typing: `#` is `<h1>`, `##` is `<h2>`, and `-` is a list item. Headings still go in order, and link text still says where it goes.

Open your `README.md` and work through its TODOs. Compare with [`completed/README-example.md`](completed/README-example.md) when you have finished. The address of your published site (TODO 3) comes in Step 8: leave it for now.

### Step 6: create a repository and upload your files

1. On GitHub, open the **+** menu at the top of any page, and choose **New repository**.
2. Name it `web-projects`. Add a one-sentence description.
3. Choose **Public**. On a free account, GitHub Pages only publishes public repositories.
4. Leave the options to add a README, a `.gitignore`, and a licence **off**: you are bringing your own files.
5. Choose **Create repository**.

Your new repository is empty, and GitHub shows a page of set-up instructions. Look for the link to **upload an existing file**. (On a repository that already has files, it is under **Add file → Upload files**.)

6. Open your `web-projects` folder on your computer. Select **everything inside it**: `index.html`, `README.md`, and the two folders. Drag them onto the upload page. You can drag whole folders.
7. Under the list of files, write a **commit message**: `Add Phase 1 projects and collection page`.
8. Choose **Commit directly to the `main` branch**, and press the green button to commit.

That was your first commit. Your files, and your README, are now on your repository's front page.

Drag the **contents** of `web-projects`, not the folder itself. If you drag the folder, everything ends up one level too deep, in `web-projects/web-projects/`, and Pages will not find your `index.html`.

The browser can upload up to 100 files at a time, and each file must be under 25 MB. If you have more files, upload them in several rounds, each with its own commit.

### Step 7: commits and history (TODO 9)

Now make a small change in the browser, and see how Git remembers it.

1. On your repository's front page, open `index.html`, and choose the **pencil** icon to edit it.
2. Do TODO 9: add a link to your repository. Its address is the one in your browser's address bar right now: `https://github.com/your-username/web-projects`.
3. Commit, with the message `Link to the repository from the collection page`.

Now open your repository's **history**: the link that shows how many commits there are, near the top of the file list, with a clock icon. You see every commit, newest first, with its message, author, and time. Choose one, and GitHub shows exactly what changed: removed lines in red, added lines in green.

**Good commit messages** say what the commit does, in a short sentence: "Fix the broken link to the join form", "Add a card for the programme explorer". Your future self, looking for when something broke, will thank you. "Update" and "changes" tell her nothing.

Nothing is ever lost: every earlier version stays in the history.

### Step 8: GitHub Pages

**GitHub Pages** turns a repository into a website.

1. In your repository, open **Settings**, then **Pages** in the side menu.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Under **Branch**, choose **`main`**, keep the folder as **`/ (root)`**, and choose **Save**.
4. Wait. It can take up to 10 minutes. Reload the Pages settings page: when the site is ready, it shows your address and a **Visit site** button.

Your address is:

```text
https://your-username.github.io/web-projects/
```

Open it. That is your collection, on the real internet. Anyone, anywhere, can open it.

From now on, **every commit to `main` updates your site** automatically, within a few minutes. Go back to your README, do TODO 3 (your address), and commit.

Three things to know about GitHub Pages:

- **It is public.** Treat everything on your published site as visible to anyone in the world.
- **It is for static sites**: HTML, CSS, JavaScript, images, and 3D models. It cannot store what people type into your join form. The form still opens its "thanks" page, but nothing is saved, and because the form uses `method="get"`, whatever was typed appears in the thanks page's address. When you test it online, use made-up details. GitHub also says Pages sites should not be used for sensitive transactions, such as sending passwords or credit card numbers.
- **It has limits**, generous for a portfolio: a published site can be up to 1 GB.

A repository named exactly `your-username.github.io` becomes a site at `https://your-username.github.io/`, with no folder name. Each account can have one. Keep that name free for now: you may want it for your portfolio.

### Step 9: test online

Open your published site and test it **there**, not on your computer:

1. Click every link on the collection page. A **404** page means a path or a capital letter does not match (Step 3).
2. Check that styles and images load on every page.
3. Open the programme explorer, save a programme, and reload. Its `localStorage` works online too, but it is separate from the one on your computer: a different address is a different site to the browser.
4. Then do the **3D moment**, below, on your phone.

### Step 10: GitHub Desktop

The browser is enough for small changes. For real work, you edit files on your own computer, in your editor, and send them to GitHub. **GitHub Desktop** makes that easy, without typing commands.

1. Install [GitHub Desktop](https://desktop.github.com/), open it, and sign in with your GitHub account.
2. **Clone** your repository: on its GitHub page, open the green **Code** menu and choose **Open with GitHub Desktop**, or in GitHub Desktop choose **File → Clone repository**. Choose where to keep it, then **Clone**.

   Choose a folder that OneDrive, Dropbox, or iCloud does **not** sync: syncing apps and Git can get in each other's way. The cloned folder is now your working copy; your original `web-projects` folder can stay as a backup.
3. Open the cloned folder in your editor, and make a change: improve a project description on your collection page. Save.
4. In GitHub Desktop, the **Changes** tab lists the file, and shows the changed lines. Write a summary (your commit message) at the bottom left, and choose **Commit to main**.
5. Your commit is on your computer only. Choose **Push origin** to send it to GitHub.
6. Wait a minute or two, and reload your published site. Your change is live.

**Cloning and downloading are different.** **Code → Download ZIP** gives you the files as they are now: no history, and no connection to GitHub. Cloning gives you the whole history, and a copy you can commit from and push.

**If you also edit in the browser**, your computer does not know about those commits yet. Before you start work in GitHub Desktop, choose **Fetch origin**, then **Pull origin** if it offers it. Pull first, then work, then commit, then push: that habit avoids most problems.

### Step 11: licences, credits, and .gitignore

**Licences.** A licence is a short legal text that says what other people may do with your work. Without one, the law gives you all the rights, and nobody may copy, change, or share your work. On GitHub, people can still view and fork a public repository, because GitHub's terms allow that, but they may do nothing more. If you want people to learn from your code and reuse it, say so with a licence.

**Code and written content usually get different licences**, because they are different kinds of work:

- **Software licences**, such as the **MIT Licence**, are written for code. MIT is short: anyone may use, copy, change, and share the code, as long as they keep your copyright notice and licence text, and you are not responsible if it breaks. It is one of the most common licences on GitHub.
- **Creative Commons licences** are written for words, pictures, video, and music. Creative Commons itself recommends **not** using its licences for software: they do not deal with things software needs, such as source code.

XR Camp does exactly this. Its repository has two licence files: [`LICENSE-CODE`](../../LICENSE-CODE) for code, and [`LICENSE-CONTENT`](../../LICENSE-CONTENT) for lessons and documentation, which uses **CC BY-NC-SA 4.0**:

| Part | Means |
| --- | --- |
| **BY** | Credit the author. |
| **NC** | Non-commercial: no using it to make money. |
| **SA** | Share alike: if you change it and share it, use the same licence. |

For your repository, the model in [`completed/`](completed/) uses the MIT Licence for code, and keeps all rights to the words and pictures. Choose what you are comfortable with. Your projects grew from XR Camp's starter files, so credit XR Camp, and read `LICENSE-CODE` to see what it allows.

To add a licence in the browser: **Add file → Create new file**, name it `LICENSE`, and GitHub offers a **Choose a license template** button. Fill in the year and your name, and commit.

**Credits.** Everything you used that you did not make needs a credit: its title, its author, where it came from, and its licence. A-Frame (MIT), XR Camp's lessons, a photo, a font. Put them in your README's **Credits** section, or in a separate `ATTRIBUTION.md`, as every XR Camp lesson does. Challenge 1 walks you through both.

**`.gitignore`.** A file called `.gitignore`, at the top of the repository, lists files Git should never add. GitHub Desktop and command-line Git follow it; a browser upload adds exactly the files you drag, so check before you drag.

```text
.DS_Store
Thumbs.db
.env
private/
```

`.DS_Store` (macOS) and `Thumbs.db` (Windows) are files your computer makes on its own. `.env` is a file where developers often keep secret keys. `private/` ignores a whole folder. See [`completed/gitignore-example`](completed/gitignore-example).

**Never commit passwords, keys, or personal data.** Deleting a file in a later commit does **not** remove it from the history: anyone can still open the old commit and read it. If a secret is ever committed, treat it as public: change the password, or cancel the key, straight away.

### Step 12: branches, forks, and pull requests

You have worked on `main` the whole time, which is fine for a personal project. Teams work differently, and you will too, in Course 2.7. Here is the idea:

- A **branch** is a separate line of work. You make a branch called `new-card`, change things there, and `main`, and your live site, stay exactly as they were.
- A **pull request** asks for the changes on one branch to be merged into another. It shows every changed line, and people can comment on it, before anyone presses **Merge**.
- A **fork** is your own copy of **someone else's** repository, under your account. You change your fork, then open a pull request to suggest your change to the original.

That is how open source works, including XR Camp: fix a typo in a lesson in your fork, open a pull request, and a maintainer reviews and merges it. Challenge 3 lets you try a branch and a pull request in your own repository.

## Key code explained

**`href="riverside/join.html"`.** A **relative** path: "from where this page is, go into `riverside`, and open `join.html`". It works on your computer and online, because the folders move together.

**`index.html`.** The file a server sends when an address ends with a folder name. `https://your-username.github.io/web-projects/` sends `web-projects/index.html`.

**`[Words people click](address)`.** A Markdown link. The same rule as HTML: the words say where it goes.

**`.gitignore` lines.** One pattern per line. A name ignores that file anywhere; a name ending in `/` ignores a whole folder; `*` means "anything", so `*.key` ignores every file ending in `.key`.

**`Copyright (c) 2026 Ana`** in the licence. The licence only works if it says who holds the rights. Replace the year and name with yours.

## 3D moment

Your first 3D world from Course 0.1 is in your repository, in `my-first-world/`, so it is already published:

```text
https://your-username.github.io/web-projects/my-first-world/
```

1. On your **phone**, open that address. Typing it is slow: open your collection page on your computer, and send yourself the link, or type the shorter collection address and tap the link to your world.
2. **Check it loaded.** After a moment, the sky and shapes appear. Drag with your finger to look around. If the page stays white, A-Frame is still downloading from the internet: wait, and reload once.
3. **Check it is still accessible.** The published world must still do everything it did on your computer:
   - The **scene description** is on the page, and still matches your world.
   - The **Pause animation** button stops the moving shape, and starts it again.
   - With **reduced motion** turned on in your phone's accessibility settings, the animation does not start at all.
4. Take a screenshot of your world on your phone, for your journal.

A world you built in your first hour at XR Camp is now on the internet, and you can show it to anyone by sending one link. Every 3D project in XR Camp will be published the same way.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| The collection page has a title that says whose projects these are | 2.4.2 | It is the first thing a screen reader says, and the name on the tab. |
| Every link says where it goes | 2.4.4 | "Use the programme explorer", not "View". |
| Projects are a real list, with real headings | 1.3.1 | Screen readers announce "list, 5 items", and can jump between headings. |
| The page's language is set | 3.1.1 | The screen reader uses the right voice. |
| A skip link, and a visible focus outline | 2.4.1, 2.4.7 | Keyboard users can skip to the projects, and always see where they are. |
| The published 3D world keeps its description and pause button | 1.1.1, 2.2.2 | Publishing it must not lose what made it accessible. |
| Screenshots in your README have alt text | 1.1.1 | The README is a web page too. |
| README headings in order, and descriptive link text | Good practice (not a WCAG rule) | People who use screen readers read repositories too. |

## Performance considerations

Your whole collection is probably a few megabytes, most of it images; a page of HTML is a few kilobytes. GitHub Pages is fast, but it cannot make a big image small: keep every picture within XR Camp's budget of 1 MB, and use the responsive images from Course 1.4. A-Frame is loaded from `aframe.io`, not from your repository, so it does not count towards your site. Keep large files you do not publish, such as original photos and videos, out of your repository: every file you commit stays in its history, and makes every clone bigger.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Uploading the folder instead of its contents | Your site is one level too deep; the address shows a 404 | Drag the files and folders **inside** `web-projects` |
| `Styles.css` in a link, `styles.css` on disk | Works on your computer, missing online | Match capitals exactly; use lowercase names |
| Links starting `C:\` or `file:///` | Broken for everyone but you | Relative links: `riverside/index.html` |
| Commit messages like "update" | You cannot find anything in your history | Say what changed: "Fix the join form link" |
| Deleting a password in a new commit | It is still in the history | Never commit it; if you did, change it at once |
| Editing in the browser and on your computer without pulling | GitHub Desktop refuses to push | **Fetch** and **Pull** first, then work |
| No licence | Nobody may legally reuse your work | Add a `LICENSE` file |
| Cloning into a OneDrive, Dropbox, or iCloud folder | Strange conflicts and duplicated files | Clone into a folder that is not synced |

## Troubleshooting

**My address shows a 404 page.** Wait 10 minutes after turning Pages on, and reload. Then check, in **Settings → Pages**, that the branch is `main` and the folder is `/ (root)`, and that `index.html` is at the top of your repository, not inside another folder. The name must be exactly `index.html`, in lowercase.

**My address shows my README instead of my collection page.** GitHub Pages uses `README.md` as the home page only when there is no `index.html`. Check that `index.html` is at the top level, and spelled in lowercase.

**The page loads, but without styles or pictures.** A path or capital letter in a `href` or `src` does not match the real file. Open the browser's developer tools, look in the **Console** for the missing file's name, and compare it letter by letter.

**My change is not on my site.** Did you commit, and, in GitHub Desktop, push? Pages takes a few minutes to update. Then reload without the cache: **Ctrl + Shift + R** (on a Mac, **⌘ + Shift + R**; in Safari, **⌘ + Option + R**). On a phone, close the tab and open the address again.

**GitHub Desktop will not push: it says there are newer commits.** Someone, probably you in the browser, committed to GitHub since your last pull. Choose **Fetch origin**, then **Pull origin**, then **Push origin**.

**My 3D world is white on my phone.** Check your phone is online: A-Frame downloads from the internet the first time. If it still does not appear, open the same address on a computer. If it works there, the phone may not support WebGL: the scene description on the page is exactly for this case.

## Challenge extensions

Three extensions, in [`challenges/`](challenges/):

1. **[Foundation](challenges/challenge-1.md)** (required): add a licence and credits to your repository.
2. **[Creative](challenges/challenge-2.md)**: a README in your own language.
3. **[Explorer](challenges/challenge-3.md)**: make a branch, change something, and merge it with a pull request, or try Git on the command line.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Write your published address, and your repository's address, in your learner journal.
3. Keep your screenshot of your 3D world on your phone, and one of your collection page, in your journal and portfolio. Share your published address with other developers (see [where to share your work](../../docs/en/community.md)).
4. In your journal, answer: who is the first person you will send your address to, and what do you want them to see?

## Further reading

- [GitHub Docs: About Git](https://docs.github.com/en/get-started/using-git/about-git)
- [GitHub Docs: Creating a new repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)
- [GitHub Docs: Adding a file to a repository](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
- [GitHub Docs: Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub Docs: GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- [GitHub Docs: Committing and reviewing changes in GitHub Desktop](https://docs.github.com/en/desktop/making-changes-in-a-branch/committing-and-reviewing-changes-to-your-project-in-github-desktop)
- [GitHub Docs: Licensing a repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository)
- [GitHub Docs: Ignoring files](https://docs.github.com/en/get-started/git-basics/ignoring-files)
- [Choose a License](https://choosealicense.com/)

## Women to Know

**Tracy Chou** is a software engineer who was one of the early engineers at Quora and at Pinterest. In October 2013 she started a crowdsourced GitHub repository of data about women in engineering at tech companies: people and companies added their own numbers to it. In 2018 she founded Block Party, a tool against online harassment that later grew into a social-media privacy tool; DeleteMe acquired Block Party in March 2026.

A repository is not only for code. Tracy Chou used one to collect numbers that were hard to find, in public, where anyone could see them and add to them. Everything you learned in this lesson (a public repository, a README that explains it, commits from many people) can be a tool for change.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

**Git** is free, open-source software, so anyone can use it, study it, and host repositories with it. **Markdown** began without a precise definition, so different tools showed the same file differently; **CommonMark** is a strongly defined specification of it, and GitHub Flavored Markdown is a strict superset of CommonMark. Licences have standard short names too: the **SPDX** licence list gives each one an identifier, such as `MIT` and `CC-BY-NC-SA-4.0`, so tools can read them. The Open Source Initiative approves licences as "open source": MIT is approved; CC BY-NC-SA 4.0 is not, because it forbids commercial use.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
