# Open Source, Standards, and Technical Leadership

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `professional-developer` · **Lesson:** `open-source-standards-and-technical-leadership-03` · **Time:** about 12 hours · 16 sessions of 45 minutes · about 4 weeks at 4 sessions a week

---

> Publish an open-source contribution and standards participation plan.

---

## Learning objectives

By the end of this project you will be able to:

1. Explain how a W3C Community Group differs from a chartered Working Group, and how a spec moves between them.
2. Create a free W3C account and join a Community Group whose mission fits something you have built.
3. Write an explainer that follows the W3C TAG's explainer template.
4. Recognize, and write, a spec issue that gives a maintainer everything they need to act on it.
5. File a real issue or pull request on a real public repository, and record what happens.
6. Leave a specific, kind, and useful review comment on someone else's real work.
7. Set up the basics a small open-source project needs to run itself: governance, a code of conduct, and a licence chosen from the SPDX License List.
8. Write a short decision record, and describe how you would mentor the next person who joins your project.

## Prerequisites

- **Course 2.7: Git Collaboration and Open Source** — this lesson assumes you can already open an issue, make a branch, and open a pull request.
- **Course 6.1: Production Deployment and DevOps** — comfortable working with a GitHub repository and its Actions tab.
- Comfortable writing Markdown; no new programming language is introduced in this lesson.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A GitHub account | File and review real issues and pull requests | Free |
| A free W3C account | Join a Community Group | Free ([create one](https://www.w3.org/account/request/)) |
| A text editor (for example VS Code) | Write your documents and page | Free |
| A modern browser | Read specs, and open your finished page | Free |

W3C's own site and GitHub are both reachable from mainland China; if either is slow or blocked on your network, a mirror or VPN permitted by your institution, or simply reading a spec's plain-text or PDF export, both work for the reading parts of this lesson.

## What you will build

A standards participation plan and a real, filed open-source contribution: not a simulation. You will create a free W3C account, join a real Community Group, write an explainer using the real W3C TAG template, plan and (in the required challenge) file a real spec issue, make and record a real contribution to a public repository, review someone else's real work, and design the governance, code of conduct, and licence for a small open-source project of your own. This is the "publish and lead" half of Phase 6: everything earlier in this phase shipped code; this lesson ships you, as a person other maintainers can work with.

The reference solution is in [`completed/`](completed/): Ana's own filled-in plan, and the small accessible page that presents it. Your starter project has **15 numbered TODOs** across seven files.

## Folder guide

```text
03-open-source-standards-and-technical-leadership/
├── README.md
├── starter/                  # begin here
│   ├── standards-plan.md     # TODOs 1, 2, 7, 9, 13
│   ├── explainer-draft.md    # TODOs 3-6
│   ├── contribution-record.md # TODO 8
│   ├── mini-project/         # TODOs 10-12
│   │   ├── GOVERNANCE.md
│   │   ├── CODE_OF_CONDUCT.md
│   │   └── decision-record-0001-choose-a-licence.md
│   └── index.html            # TODOs 14-15
├── completed/                 # reference solution (Ana's plan)
├── challenges/                # Three challenges: Foundation is required
├── tests/                     # self-review checklist
├── assets/
└── screenshots/
```

## Setup

1. Open `starter/index.html` through the local server the rest of this course uses (not by double-clicking the file).
2. If you do not already have a free W3C account, create one now at [w3.org/account/request](https://www.w3.org/account/request/); it takes a few minutes and needs only an email address.
3. Keep your GitHub account signed in; you will use it for real, in this lesson.
4. If you want a refresher on issues, branches, and pull requests, re-read [`frontend-engineer/07-git-collaboration-and-open-source`](../../frontend-engineer/07-git-collaboration-and-open-source/README.md) — read only, it is already finished.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Step 1: how the web becomes a standard; list three specs you already rely on without knowing it | A short list, in your own journal, of standards behind tools you already use |
| 2 | Step 2: create your free W3C account and browse Community Groups (TODO 1) | An account, and one Community Group chosen and recorded |
| 3 | Step 2, continued: join the group, read its charter (TODO 2) | A short, honest reason why that group fits |
| 4 | Step 3: the explainer template; draft the Introduction (TODO 3) | An opening paragraph a stranger could understand |
| 5 | Step 3, continued: Goals, Non-goals, and User research (TODO 4-5) | A scoped, well-motivated feature idea |
| 6 | Step 3, continued: Proposed approach and Considered alternatives (TODO 5-6) | A sketched approach, and a rejected alternative explained |
| 7 | Step 3, continued: accessibility/i18n/privacy/security and stakeholder feedback (TODO 6) | A finished explainer draft |
| 8 | Step 4: anatomy of a good spec issue; draft yours (TODO 7) | A clear, specific issue title and body, ready to file |
| 9 | Step 5: make a real contribution (TODO 8) | A real issue or pull request, filed on a real repository |
| 10 | Step 6: review someone else's real work (TODO 9) | A specific, kind, useful comment, actually left |
| 11 | Step 7: maintainer basics — governance and a code of conduct (TODOs 10-11) | Two filled project documents |
| 12 | Step 7, continued: choosing a licence with SPDX (TODO 12) | A decision record naming an exact SPDX identifier |
| 13 | Step 8: technical leadership — a mentoring plan (TODO 13) | A short, concrete mentoring paragraph |
| 14 | Step 9: build the accessible summary page (TODOs 14-15) | A finished page presenting your whole plan |
| 15 | [`tests/checklist.md`](tests/checklist.md) | A complete, checked plan |
| 16 | One challenge extension, then **Submitting your work** | A published contribution and a finished plan |

### Step 1: how the web becomes a standard

Every tag, attribute, and API you have used in this course started as someone's idea, written down, argued over, and eventually agreed on. The **World Wide Web Consortium (W3C)** publishes the formal Recommendation Track: a **Working Draft** becomes a **Candidate Recommendation** once it is stable enough to implement and test, then a **Proposed Recommendation**, then a **W3C Recommendation** once the W3C's member organizations formally review and approve it. Long before any of that, most ideas start much more informally, in a **Community Group**: open to anyone with a free W3C account, no membership fee, and no requirement to represent an employer. A Community Group's own reports are not standards; they are where an idea gets shaped enough that a chartered Working Group might one day take it on.

Other organizations run their own, differently-shaped processes for the parts of the web platform W3C does not cover: **WHATWG** maintains the HTML and DOM Living Standards, and the **IETF** publishes the RFCs behind HTTP and TLS. All of them share one habit this lesson practises directly: they take proposals, issues, and pull requests from the public, on the open web, the same way any open-source project does.

### Step 2: a free W3C account and a Community Group (TODOs 1-2)

Create your account, then browse the list of Community Groups at [w3.org/community/groups](https://www.w3.org/community/) for one whose mission connects to something you built earlier in this course — accessibility, internationalization, and immersive web are all active areas. Joining costs nothing and requires no employer's permission, but it is not consequence-free: every participant agrees to the **W3C Community Contributor License Agreement (CLA)**, a real legal document covering copyright and a royalty-free patent commitment for anything you contribute to that group's work. Read it before you click join.

```markdown
<!-- TODO 1 in standards-plan.md -->
Created a free W3C account on <date>. Chosen group: <name>.
```

### Step 3: writing an explainer (TODOs 3-6)

An **explainer** is a plain-language document written before a formal spec: it exists to be readable by someone who is not a specification expert, so a wider set of people can give feedback early, when it is still cheap to change direction. `starter/explainer-draft.md` follows the real, current [W3C TAG explainer template](https://w3ctag.github.io/explainer-explainer/) section by section. Open that page once, in full, before you start writing: it explains why each section exists, not only what to put in it.

Work through the sections in order: Introduction, Goals, Non-goals, User research, Proposed approach, Considered alternatives, the combined Accessibility/Internationalization/Privacy/Security section, and Stakeholder feedback. Every explainer needs a genuine alternative you rejected, and a genuine, specific piece of feedback you expect, not a vague "some people might disagree."

### Step 4: filing a good spec issue (TODO 7)

A good issue gives a maintainer everything they need to act, without them having to ask a follow-up question first:

- **One issue, one problem.** Two unrelated complaints in one issue means whichever is easier gets addressed and the other gets forgotten.
- **A specific, searchable title.** "Clarify recommended practice for X" is findable later; "confusing" is not.
- **Context, not just a request.** Say what you tried, what you expected, and what happened, or, for a documentation or spec-wording issue, quote the exact text you think should change.
- **Check for a duplicate first.** Search the repository's issues, open and closed, before filing.

Draft yours in `standards-plan.md`, section 4. Filing it for real, on a real repository, is this lesson's required Foundation challenge (see [`challenges/challenge-1.md`](challenges/challenge-1.md)).

### Step 5: making a real contribution (TODO 8)

Filing a spec issue is one kind of contribution; a small, real, filed pull request is another, and often an easier place to start. A documentation fix, a broken-link report, or a "good first issue" on a project you already use are all legitimate. `contribution-record.md` asks you to document one for real: what you changed, why you chose it, what made it a good issue or pull request by Step 4's standard, and what happened after you filed it.

### Step 6: reviewing others' work (TODO 9)

Reviewing is a skill of its own, separate from writing code. A useful review comment names something specific (a line, a word, a behaviour), explains why it matters, and stays kind: assume the author had a reason for their choice, and ask about it before assuming it was a mistake. Find one real, open pull request or issue outside your own work, read it closely enough to say something specific, and leave a comment. Record what you said, and what happened, in `standards-plan.md`, section 6.

### Step 7: running a small open-source project (TODOs 10-12)

A project needs more than code to run itself once more than one person is involved:

- **Governance** (`mini-project/GOVERNANCE.md`) names who can do what, and how a decision gets made. Without it, every decision becomes a private argument instead of a known process.
- **A code of conduct** (`mini-project/CODE_OF_CONDUCT.md`) sets the behaviour expected of everyone, and, just as importantly, names a real way to report a problem. Adopting a well-known template, such as the [Contributor Covenant](https://www.contributor-covenant.org/), means contributors already know roughly what to expect.
- **A licence** makes the project legally usable at all. Without one, copyright defaults to "all rights reserved," and no one else may legally use, copy, or contribute to it, no matter how public the repository looks. The [SPDX License List](https://spdx.org/licenses/) gives each licence a short, exact identifier (`MIT`, `Apache-2.0`, `GPL-3.0-only`) that tools and people can check at a glance; write yours as a **decision record**, in `mini-project/decision-record-0001-choose-a-licence.md`.

### Step 8: technical leadership: decision records and mentoring (TODO 13)

A **decision record** (sometimes called an Architecture Decision Record, or ADR) is a short, dated note capturing one decision, its context, and its consequences, so someone who joins later can understand a choice without asking the person who made it. You already wrote one, for your licence, in Step 7; the habit generalizes to any decision worth remembering. The other half of technical leadership is quieter: how you treat the next person who shows up. Write, in `standards-plan.md` section 8, how you would mentor someone joining your chosen Community Group or your mini-project, and how you would give feedback on their first pull request.

### Step 9: the accessible plan page (TODOs 14-15)

Everything above lives in Markdown documents; the last step presents it as one small, accessible web page a reviewer, a mentor, or a future employer could open without downloading anything. Build `index.html` with one `<section>` per part of the plan, each with its own heading, and link every section back to the document it summarizes rather than repeating that document in full.

## Key code explained

- **Community Group vs. Working Group.** A Community Group is open to anyone with a free W3C account and produces reports with no formal standing on their own; a Working Group is chartered by W3C's member organizations and is the only kind of group that can advance a specification along the Recommendation Track.
- **The W3C Community Contributor License Agreement (CLA).** The agreement every Community Group participant accepts, covering copyright terms for contributed material and a royalty-free patent licensing commitment. It is a real, binding agreement, not a formality to skip past.
- **Explainer.** A plain-language document, written before a formal specification, whose job is to make an idea reviewable by people who are not specification experts, so problems surface while they are still cheap to fix.
- **`aria-describedby`.** An existing, ordinary HTML/ARIA attribute that points from one element to the text that describes it; the reference explainer proposes recommending it by name for 3D scenes, rather than inventing a new attribute.
- **SPDX identifier.** A short, exact string (`MIT`, `Apache-2.0`) that names one specific licence unambiguously, so a tool or a person never has to guess which "MIT-style" licence a project actually means.
- **Decision record.** A short, dated note with Status, Context, Decision, and Consequences sections, written so a choice remains understandable to someone who was not in the room when it was made.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| Document language is declared | 3.1.1 | Screen readers choose the correct pronunciation and voice |
| One `<h1>`, logical heading order in every section | 2.4.6, 1.3.1 | Lets a screen reader user navigate the plan by heading, the way a sighted reader skims it |
| Every link's purpose is clear from its text or context | 2.4.4 | "Read the full explainer draft" tells a screen reader user what they will get; "click here" does not |
| Lists styled with `list-style: none` keep `role="list"` | 1.3.1 | Safari drops a list's implicit list semantics once it has no bullets, unlike other browsers |
| Focus is visible on every link | 2.4.7 | Keyboard users must always see where they are |
| Colour contrast meets AA | 1.4.3 | The status words ("Done", "Planned") must be readable, not decorative |
| Status is never colour alone | Good practice | "Done" and "Planned" are both words, not only different colours |

## Performance considerations

This lesson's deliverable is text: Markdown documents and one small HTML page, no images, no 3D, and no JavaScript. Its whole weight is a stylesheet already shared with the rest of the course. There is nothing here to optimize; the discipline that matters instead is keeping every document short enough that a busy maintainer will actually read it, which is its own kind of performance.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Treating a Community Group's report as if it were a Recommendation | Claims a feature is "standard" when it has not passed formal review | Say "under discussion in the \<name\> Community Group," and check its actual status |
| Filing a vague issue ("this doesn't work") | A maintainer has to ask several follow-up questions, or closes it | Give a specific title, exact context, and what you expected instead |
| Writing an explainer with only an API sketch, no Goals or Alternatives | Reviewers cannot tell what problem it solves or whether a simpler fix exists | Follow every section of the real template, in order |
| Choosing a licence by copying a project you liked, without reading it | You may end up promising something (like sharing all changes back) you did not intend | Pick an exact SPDX identifier and write down the trade-off, as a decision record |
| A code of conduct that says "contact a maintainer" with no address | A report has nowhere real to go | Name a specific, monitored reporting path |

## Troubleshooting

**No Community Group seems to fit.** Browse the full list at [w3.org/community](https://www.w3.org/community/) rather than only the well-known ones; there are hundreds, on narrow topics. If none fit, four people can propose a new one together.

**A pull request review bot asks you to sign something.** Many real repositories run an automated Contributor License Agreement or Developer Certificate of Origin (DCO) check on a first pull request. Read what it actually asks before agreeing; it is normal and expected, not a sign you did something wrong.

**Your `index.html` fails a link check.** A relative link from `completed/index.html` to a file in `mini-project/` needs the folder name in the path (`mini-project/GOVERNANCE.md`), not just the file name.

**The accessibility checker flags a list.** If you added a `<ul>` styled with `list-style: none` and did not add `role="list"`, VoiceOver on Safari will read it as plain text with no list semantics at all; Chrome's and Firefox's screen reader support does not have this gap, which is exactly why it is easy to miss during testing.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: file the spec issue you planned, for real.
2. **[Creative](challenges/challenge-2.md)**: root your explainer and mini-project in a problem from your own language, culture, or community.
3. **[Explorer](challenges/challenge-3.md)**: write a second, harder decision record and get one real review of it.

## Submitting your work

1. Work through [`tests/checklist.md`](tests/checklist.md) completely.
2. Take a screenshot of your real, filed issue or pull request, and of your finished `index.html`.
3. Keep them in your learner journal and portfolio. When the XR Camp community opens, share them there.
4. Journal question: what was harder to get right, the technical explainer or the plain-language plan around it, and why?

## Further reading

- [W3C Community Groups](https://www.w3.org/community/) — how to browse, join, or start one
- [How to Write an Explainer (W3C TAG)](https://w3ctag.github.io/explainer-explainer/) — the full template this lesson uses
- [W3C Process Document](https://www.w3.org/policies/process/) — the formal Recommendation Track, for anyone who wants the full detail
- [SPDX License List](https://spdx.org/licenses/) — the exact identifiers behind open-source licences
- [Contributor Covenant](https://www.contributor-covenant.org/) — a widely used code of conduct template

## Women to Know

**Chen Yang (Emily), 陈阳,** works in mainland China. She was a core co-founder, in 2014, of Kaiyuanshe (开源社), a Chinese open-source community alliance, and later chaired it in 2023. In 2008 she started the GNOME.Asia Summit, and she is a former director of the GNOME Foundation board. She has worked as an engineer and product manager at Sun, Oracle, and Microsoft.

Kaiyuanshe and GNOME.Asia are exactly the kind of open, community-run structures this lesson asks you to practise joining: a group anyone can propose, that decides things together, and that keeps growing because people like Chen Yang keep showing up to organise it, year after year, not only to write its code.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

This whole lesson is the standards spotlight. The **W3C** publishes formal Recommendations through its Process Document, moving a spec through Working Draft, Candidate Recommendation, and Proposed Recommendation before a final vote by its member organizations; its **Community Groups** work earlier and more informally, open to anyone with a free account, under a Community Contributor License Agreement covering copyright and patents. Other bodies run their own tracks for the parts of the platform W3C does not own: **WHATWG** maintains the HTML and DOM Living Standards, and the **IETF** publishes the RFCs behind the network protocols underneath all of it. Every one of them takes public issues and pull requests, which is why the skills in Course 2.7 and in this lesson are not two different things: they are the same skill, aimed at the web platform itself instead of at one course project.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
