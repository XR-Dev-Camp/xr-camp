# Git Collaboration and Open Source

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `frontend-engineer` · **Lesson:** `git-collaboration-and-open-source-07` · **Time:** about 9 hours · 12 sessions of 45 minutes · about 3 weeks at 4 sessions a week

---

> Complete a contribution through an issue and pull request.

---

## Learning objectives

By the end of this project you will be able to:

1. Explain how an open-source project works: maintainers, contributors, licences, `CONTRIBUTING.md`, and a code of conduct.
2. Write a clear **issue**, and use labels to organise work.
3. Make a **branch**, and open a **pull request** that links its issue.
4. **Review** someone else's pull request kindly and usefully, and respond to reviews of your own.
5. Resolve a **merge conflict**, and explain why it happened.
6. Contribute to a project you do not own, with a **fork**.
7. Write **release notes**, tag a version, and publish a release.

## Prerequisites

- **Course 1.8: Git, GitHub, and Publishing.** You have a GitHub account, and you have committed and pushed.
- **Course 2.3: Application Architecture.** Small commits, one change at a time.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A GitHub account (from Course 1.8) | Issues, pull requests, reviews, releases | Free |
| GitHub Desktop, or Git in a terminal | Branches and merges on your computer | Free |
| VS Code | Resolving merge conflicts | Free |
| A study partner (recommended) | Reviewing each other's work | Free |

**No partner?** Every step works alone: you play both roles, opening a pull request from a branch and reviewing it yourself. It is less fun, but you learn the same skills.

**If GitHub is slow or blocked where you are:** GitHub works in mainland China, but it can be slow or unreliable. You can do this whole lesson on **Gitee** (gitee.com), which has issues, pull requests, reviews, and releases in Chinese: upload the files in `starter/practice-copy/` to a new Gitee repository. Gitee needs a phone number to sign up, and may review a new public repository before others can see it. You can also practise branches, merges, and conflicts with Git alone, on your computer, with no account at all.

## What you will build

Not a page this time: a **track record**. Working in your own copy of the XR Camp practice repository, you will open issues, fix them through pull requests, review a partner's work, resolve a merge conflict, fix a real accessibility problem in a 3D scene, and publish a release with notes. Every step leaves a public, linkable record that you can show in a portfolio or an interview.

The practice repository is a **template**: <https://github.com/XR-Dev-Camp/contribution-practice>. You never send changes to it: you make your own copy, so you are the maintainer, and you can make mistakes safely.

The [`completed/`](completed/) folder shows what Ana's copy looked like at the end, with example pull requests, reviews, and release notes.

## Folder guide

```text
07-git-collaboration-and-open-source/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── practice-copy/   # The practice repository's files, for Gitee or offline use
│   └── contribution-log.md   # Record every issue, review, and pull request here
├── completed/           # Ana's finished work and example writing
│   ├── index.html, 3d/index.html   # The fixed pages
│   ├── CHANGELOG.md, pull-request-example.md, contribution-log.md
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. Sign in to GitHub. Open <https://github.com/XR-Dev-Camp/contribution-practice>, and press **Use this template → Create a new repository**. Name it `contribution-practice`, make it **Public**, and create it.
2. Invite your study partner: **Settings → Collaborators → Add people**. Accept their invitation too, so you can work in each other's copies.
3. Turn on Pages: **Settings → Pages**, **Deploy from a branch**, `main`, `/ (root)`, **Save**. After a few minutes, your study tips wall is online.
4. Copy `starter/contribution-log.md` somewhere safe: your learner journal, or your portfolio repository.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup: your copy, a partner, Pages | Your own practice repository, online |
| 2 | Step 1: how open source works | You have read `CONTRIBUTING.md` like a contributor |
| 3 | Step 2: issues and labels | Six issues in your repository |
| 4 | Step 3: a branch and your first pull request | A pull request that says `Fixes #3` |
| 5 | Step 4: reviewing | Your first review of your partner's work |
| 6 | Step 5: responding and merging | Your first merged pull request |
| 7 | Step 6: a merge conflict, on purpose | A conflict, resolved |
| 8 | Step 7: the **3D moment** | An accessible 3D example, merged |
| 9 | Step 8: forks and real projects | You know how to contribute anywhere |
| 10 | Step 9: release notes and a release | Version 1.1.0, published |
| 11 | [`tests/checklist.md`](tests/checklist.md) | A complete contribution log |
| 12 | One challenge extension, then **Submitting your work** | A track record to show |

### Step 1: how open source works

**Open-source** software is published with a licence that lets anyone read, use, change, and share it. Most of the web runs on it: A-Frame, three.js, Git itself, and the browsers you test in are built largely from open-source code.

Every project has people in two roles:

- **Maintainers** decide what goes in. They review, merge, and release. They are often volunteers, with little time.
- **Contributors** suggest changes: anyone, including you.

Before contributing to any project, read three files: the **README** (what it is), **CONTRIBUTING.md** (how they want help), and the **licence** (what you may do with it). Many projects also have a **code of conduct**: how people must treat each other. Read your practice repository's `CONTRIBUTING.md` now. What must you do before starting a big change?

### Step 2: issues and labels

An **issue** is a public note about something to do: a bug, an idea, a question. Good issues save everyone time. Compare:

| Weak | Strong |
| --- | --- |
| "3D page broken" | "3D example: screen readers hear nothing about the scene" |
| "doesn't work" | Steps to see it, what you expected, what happened, your browser |

Open `GOOD-FIRST-ISSUES.md` in your copy. For each problem, open a new issue (**Issues → New issue**): the templates will ask the right questions. Give each one a label: **bug**, **enhancement**, or **good first issue**. Labels let contributors find work that suits them. Split the issues with your partner, and **assign** yourselves, so you do not both fix the same thing.

### Step 3: a branch and your first pull request

Never work directly on `main` in a shared project. Make a **branch**: a separate line of work that does not touch `main` until it is reviewed.

Start with the typo in the heading (issue 3), right in the browser: open `index.html`, press the pencil (**Edit this file**), fix it, then choose **Create a new branch for this commit and start a pull request**. Name the branch `fix-heading-typo`.

In the **pull request** (PR), fill in the template, and write `Fixes #3` under "Why?". When the PR is merged, GitHub closes issue 3 by itself. Then request a review from your partner (**Reviewers**, on the right).

With GitHub Desktop or a terminal, the same thing looks like this:

```bash
git switch -c fix-heading-typo     # make a branch and move to it
# edit index.html, then:
git commit -am "Fix the typo in the study tips heading"
git push -u origin fix-heading-typo
```

### Step 4: reviewing

**Code review** is where most learning in a team happens. Open your partner's PR, and the **Files changed** tab. Click the **+** beside a line to comment on it. To propose an exact change, use **Insert a suggestion**: they can accept it with one click.

When you finish, press **Review changes**, and choose:

- **Comment**: questions or small thoughts.
- **Approve**: it is ready.
- **Request changes**: something must change first.

Kind, useful reviews are specific, explain why, and talk about the code, never the person:

| Unhelpful | Helpful |
| --- | --- |
| "This is wrong." | "The description says the shapes turn, but the ball does not move. Could you say which ones turn?" |
| "Bad colour." | "`#999999` is about 2.8:1 on white; WCAG asks for 4.5:1. `#595959` passes." |
| (silence about good work) | "Nice: the alt text is really clear." |

Test before you approve: open the branch's version of the page, and try it with the keyboard.

### Step 5: responding and merging

When a review asks for changes, make them in the **same branch** and push again: the PR updates by itself. Reply to each comment ("Fixed, thank you"), and **Resolve conversation**. Do not take it personally: every developer's code gets review comments, every day.

Once it is approved, **merge** it. GitHub offers three ways:

- **Create a merge commit**: keeps every commit, plus one that joins them.
- **Squash and merge**: turns all the PR's commits into one clean commit on `main`. Good for small fixes.
- **Rebase and merge**: replays each commit on top of `main`, with no merge commit.

For this course, use **Squash and merge**. Then delete the branch (GitHub offers a button): it has done its job.

### Step 6: a merge conflict, on purpose

A **merge conflict** happens when two branches change the same lines in different ways. Git cannot know which one you want, so it asks a person.

Make one on purpose, with your partner, in one of your copies:

1. You both make a branch from `main`: `add-tip-ana` and `add-tip-lucia` (with your names).
2. You both add your study tip **at the end of the same list** in `index.html`, following `CONTRIBUTING.md`, and open a pull request each.
3. Merge the first one. The second now says **This branch has conflicts that must be resolved**.
4. Press **Resolve conflicts**. You will see the conflict markers:

```text
<<<<<<< add-tip-lucia
      <li>Explain your code to a friend who does not code. … (Lucía)</li>
=======
      <li>Read the error message out loud. … (Ana)</li>
>>>>>>> main
```

The part above `=======` is one branch; the part below is the other. Decide what the file should say (here: both tips), delete the three marker lines, press **Mark as resolved**, then **Commit merge**. In VS Code, the same markers appear with buttons: **Accept Current Change**, **Accept Incoming Change**, **Accept Both Changes**.

A conflict is not an error, and nothing is broken. It is Git being careful.

### Step 7: the 3D moment

Issues 1 and 2 are about `3d/index.html`: three shapes on a floor, two of them spinning. A screen-reader user hears nothing about the scene, and the spinning never stops, even for people whose device asks for less motion. Fix both, in two separate pull requests, one per issue:

- **Issue 1**: add a paragraph with `id="scene-description"` before the scene, naming the shapes, their colours, and their order, left to right.
- **Issue 2**: replace the looping `animation` attributes with a small component that checks one `motion.paused` flag, start paused when `prefers-reduced-motion: reduce` is set, and add a **Pause animation** button with `aria-pressed`. You did exactly this in Course 2.3.

Look at [`completed/3d/index.html`](completed/3d/index.html) only after your PRs are merged. Then read [`completed/pull-request-example.md`](completed/pull-request-example.md): it shows Ana's PR for issue 1, the review, and her reply.

Small accessibility fixes like these are some of the most valuable contributions you can make to real open-source 3D projects: maintainers are often glad of them, and they are easy to review.

### Step 8: forks and real projects

In your practice copy, you are a collaborator. In most real projects, you are not: you cannot push branches to them. So you make a **fork**: your own copy of their repository, linked to the original (the **upstream**).

1. Press **Fork** on the project's page.
2. Make a branch in your fork, and commit your change there.
3. Open a pull request **from your fork's branch to the upstream's `main`**. GitHub offers this with a **Contribute** button.
4. The maintainers review it, like your partner did. Be patient: they may take days or weeks.
5. Before starting more work later, **Sync fork** to bring in their latest changes.

A template gives you an independent copy; a fork stays connected to its original, so you can send changes back. That is the difference.

XR Camp itself is open to contributions: typos, clearer sentences, translations, and accessibility fixes. Read its [contributing guide](../../.github/CONTRIBUTING.md) first, and open an issue before a big change.

### Step 9: release notes and a release

A **release** is a named version that people can rely on: "1.1.0 works; 1.2.0 adds a feature". Many projects use **semantic versioning**, `MAJOR.MINOR.PATCH`:

- **PATCH** (1.0.**1**): fixes only.
- **MINOR** (1.**1**.0): new features that do not break anything.
- **MAJOR** (**2**.0.0): changes that might break what people rely on.

Your fixes and new tips make **1.1.0**. Write release notes in `CHANGELOG.md` for the people who use the project, not for you: what changed for them, in plain words, with issue numbers. Compare yours with [`completed/CHANGELOG.md`](completed/CHANGELOG.md).

Then publish it: **Releases → Draft a new release**, create the tag `v1.1.0`, give it a title, paste your notes (or try **Generate release notes**, and edit what it writes), and **Publish release**.

## Key code explained

**`Fixes #3`** in a pull request description closes issue 3 when the PR is merged into the default branch. `Closes #3` and `Resolves #3` work too.

**`git switch -c name`** makes a new branch and moves to it. (Older tutorials use `git checkout -b name`: the same thing.)

**Conflict markers**: `<<<<<<<` starts the first version, `=======` separates them, `>>>>>>>` ends the second. A file with markers left in it is broken: always delete all three.

**`git tag v1.1.0`** marks the current commit with a version name, if you release from a terminal; then `git push origin v1.1.0` sends it to GitHub. GitHub's **Draft a new release** does both for you.

## Accessibility requirements

These apply to the pages you change in the practice repository.

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| The page's language is set | 3.1.1 | Screen readers choose the right voice (issue 6). |
| Small text has at least 4.5:1 contrast | 1.4.3 | Everyone can read it (issue 4). |
| The 3D scene is described in text | 1.1.1 | The information is not only in the picture (issue 1). |
| Moving content can be paused | 2.2.2 | Movement is never forced on anyone (issue 2). |
| Reviewers test with the keyboard | 2.1.1 | Accessibility is checked in every review, not at the end. |

## Performance considerations

The 3D example's looping animations kept running even when nothing needed to move. The fixed version checks one flag inside A-Frame's frame loop, and stops changing anything when paused. Reviews are a good moment to spot waste like this: ask "does this need to run all the time?"

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Working on `main` | Unreviewed changes go straight live | One branch per change |
| One huge pull request | Nobody can review it well | Small PRs, one issue each |
| No issue first | Two people fix the same thing, or the maintainer says no | Open or claim an issue |
| Leaving conflict markers in a file | The page shows `<<<<<<<` | Delete all three marker lines |
| Taking review comments personally | You stop learning from them | Comments are about code, not you |
| Contributing without reading `CONTRIBUTING.md` | Your PR is closed | Read it first, every project |

## Troubleshooting

**I cannot push a branch to someone's repository.** You are not a collaborator. Ask them to add you, or fork it (Step 8).

**The Resolve conflicts button is greyed out.** The conflict is too complex for the browser editor. Resolve it in VS Code: pull both branches, merge, fix the markers, commit, and push.

**`Fixes #3` did not close the issue.** The PR was merged into a branch that is not the default one, or the keyword is in the pull request's title or a comment instead of its description. Close the issue by hand, and link the PR.

**My Pages site did not update after merging.** Wait a few minutes, then reload without the cache (Course 1.8).

**Gitee: my repository is not visible to others.** New public repositories on Gitee may be reviewed first. Wait, or use a private repository and add your partner as a member.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: review three pull requests, and write a short guide to kind reviews.
2. **[Creative](challenges/challenge-2.md)**: translate the 3D example into your language, through a pull request.
3. **[Explorer](challenges/challenge-3.md)**: make a real contribution to a real open-source project.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Your contribution log, with links, is your submission: every issue, review, pull request, and the release.
3. Keep it in your learner journal and portfolio. When the XR Camp community opens, share it there.
4. In your journal, answer: what did a review of your work teach you that you would not have found alone?

## Further reading

- [GitHub Docs: About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- [GitHub Docs: Resolving a merge conflict on GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github)
- [GitHub Docs: About forks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks)
- [Open Source Guides: How to contribute to open source](https://opensource.guide/how-to-contribute/)
- [Semantic Versioning](https://semver.org/)

## Women to Know

**Gabriela de Queiroz** is a Brazilian-raised statistician and data scientist. In 2012, in San Francisco, she founded R-Ladies (now RLadies+), which has grown into a global network of more than 200 chapters for women and gender minorities in the R programming community. In 2023 she was named to the "100 Brilliant Women in AI Ethics" list.

Open source is made by communities, not only by code. R-Ladies began as one meetup, and became a place where thousands of women found their first collaborators, reviewers, and mentors: exactly what a study partner and a practice repository start to give you.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

Open-source licences are standardised too: the **Open Source Initiative** (OSI) reviews licences against its Open Source Definition, and **SPDX** gives each licence a short, exact identifier (`MIT`, `CC0-1.0`, `Apache-2.0`) so tools and people can tell at a glance what a project allows. Web standards are developed in the open in the same way: the W3C and WHATWG take issues and pull requests on GitHub, so the skills in this lesson are exactly how people contribute to the web platform itself.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
