# Capstone Research and Definition

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `capstone` · **Lesson:** `capstone-research-and-definition-01` · **Time:** about 8 hours · 11 sessions of 45 minutes · about 3 weeks at 4 sessions a week

---

> Produce an approved capstone brief.

---

## Learning objectives

By the end of this project you will be able to:

1. Choose a capstone project you can realistically finish, and explain why it matters.
2. Write a one-page brief that states the problem, the audience, and the scope.
3. Map your stakeholders: who uses it, who approves it, who maintains it after you.
4. Say clearly what is out of scope, and why.
5. Find a real or realistic partner for a spatial-web project (an NGO, museum, school, or library).
6. Get written mentor approval before you build anything.
7. Plan your own sessions across a long project, the way you did in Course 2.3.

## Prerequisites

- **Course 6.1: Career Development and Professional Practice.** You have a portfolio and a plan for what to build next.
- **Course 3.6: Performance Engineering for Web3D**, or an equivalent web3D/XR course, if your capstone will include a 3D or XR prototype (Stage 7.3 assumes this).

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A text editor (VS Code or similar) | Write your brief and stakeholder map in Markdown | Free |
| A local server, for opening the completed example | Same server you already use for other lessons | Free |
| Email or a messaging app your mentor already uses | Getting written mentor approval | Free |

No paid tools, accounts, or API keys are needed for this stage. If your capstone will use a cloud service later, plan for one with a free tier that also works in mainland China (see the tool notes in later stages).

## What you will build

This is Stage 1 of the **Professional Capstone**, five stages that take a real spatial-web project from idea to launch. In this stage you do not write any application code. You write a **capstone brief**, a **stakeholder map**, and get **mentor approval** — the three documents every later stage builds on.

You have two options for what to build:

1. **Continue the virtual exhibit.** Turn the exhibit you built across Phase 3 (`web3d-developer/07`) into a real capstone: a virtual cultural exhibit for a community museum, expanded with the product thinking, system design, and production quality this capstone teaches.
2. **A new partner project.** Propose a spatial-web project for a real or realistic partner — a non-government organisation, a museum, a school, or a library. Keep the scope small enough to finish in five stages.

The reference solution in [`completed/`](completed/) follows Ana, a fictional XR Camp learner, as she plans a virtual exhibit for a fictional community museum in her city. Her brief, stakeholder map, and mentor approval are filled in completely so you can see what "done" looks like; [`completed/index.html`](completed/index.html) presents all three side by side. The starter has three Markdown templates with 6 TODOs between them, plus a rubric that tells you what each level of quality looks like.

## Folder guide

```text
01-capstone-research-and-definition/
├── README.md              # This guide
├── README.es.md           # Spanish
├── README.zh-Hans.md      # Simplified Chinese
├── project.json           # Lesson metadata
├── starter/
│   ├── index.html          # Start page: links to every template below
│   ├── brief.md             # TODOs 1–3: problem, audience, scope
│   ├── stakeholder-map.md   # TODOs 4–5: who is involved, and how
│   ├── mentor-approval.md   # TODO 6: the approval record
│   └── rubric.md            # How this stage is assessed
├── completed/              # Ana's filled-in capstone brief: open this last
├── challenges/             # Three challenges: Foundation is required
├── tests/checklist.md      # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. Copy the `starter/` folder into your own capstone workspace (a new folder, separate from earlier lessons — this project stands on its own).
2. Open `starter/index.html` through a local server. It links to the three templates you will fill in.
3. Read [`starter/rubric.md`](starter/rubric.md) before you write anything, so you know what "approved" looks like.
4. Decide now: continuing the virtual exhibit, or a new partner project. Everything from here on assumes you have picked one.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; read the rubric and Ana's example | A clear idea of what "approved" looks like |
| 2 | Step 1: choose your project and audience | One sentence describing who this is for |
| 3 | Step 2: the problem statement (TODO 1) | A problem statement your mentor could repeat back to you |
| 4 | Step 3: scope, in and out (TODOs 2–3) | A scope list with at least three things you will *not* build |
| 5 | Step 4: find a partner (real or realistic) | A named partner type and a one-line reason they need this |
| 6 | Step 5: the stakeholder map, part 1 (TODO 4) | Every stakeholder listed with their stake in the project |
| 7 | Step 5, continued (TODO 5) | Decisions each stakeholder can make, and how you will reach them |
| 8 | Step 6: risks and open questions | A short list of what could go wrong, and what you still need to find out |
| 9 | Step 7: request mentor approval (TODO 6) | A completed `mentor-approval.md`, sent to your mentor |
| 10 | [`tests/checklist.md`](tests/checklist.md); revise the brief from feedback | A brief ready to be signed off |
| 11 | One challenge extension, then **Submitting your work** | An approved capstone brief |

### Step 1: choose your project and audience

A capstone is only as good as the problem behind it. Before you write anything, answer one question out loud: **who is this for, and what can they not do today that this project will let them do?**

If you are continuing the virtual exhibit, your audience already exists: visitors to a community museum who cannot travel there in person, or who want to revisit an exhibit after their visit. If you are proposing a new partner project, spend this session on the idea alone. Good capstone ideas share three things: a real audience, a scope you can finish in five stages of part-time work, and a reason the web and 3D or XR genuinely help (not just "because it would be cool").

### Step 2: the problem statement (TODO 1)

Open [`starter/brief.md`](starter/brief.md). TODO 1 asks for a **problem statement**: two or three sentences naming the audience, their problem, and why it matters now. Write it as if explaining to someone who has never met you. Avoid words like "innovative" or "revolutionary" — a mentor cannot approve a brief they cannot evaluate.

### Step 3: scope, in and out (TODOs 2–3)

TODO 2 lists what you **will** build across the five stages. TODO 3 is just as important: what you will **not** build, and why. Every capstone that runs out of time skipped this step. Naming three things you are cutting now, in writing, is what lets you say no later without it feeling like failure.

### Step 4: find a partner (real or realistic)

A capstone is stronger with a partner in mind, even a hypothetical one modelled closely on a real kind of organisation. Good partner types for a spatial-web capstone: a **local museum or heritage site** wanting a virtual exhibit, an **NGO** wanting to explain its work to donors, a **school or library** wanting an interactive learning space. Do not name a real organisation as if they have agreed to this unless they genuinely have. It is honest and still useful to write "a small community museum, similar to [type of place]" in your brief.

### Step 5: the stakeholder map (TODOs 4–5)

Open [`starter/stakeholder-map.md`](starter/stakeholder-map.md). A stakeholder map answers, for every person or group who touches this project: what do they need from it, what can they decide, and how will you reach them? TODO 4 asks you to list every stakeholder — visitors, the partner organisation, your mentor, and anyone who maintains the result after you finish. TODO 5 asks you to record how you will communicate with each one, and how often.

### Step 6: risks and open questions

Every real project has things you do not yet know. List them plainly in your brief: a technical risk ("I have not yet confirmed the museum's photos are free to use"), a scope risk ("the partner may want more than five stages allow"), or a skills risk ("I have not built a multi-user scene before"). Naming a risk is not a weakness in a brief; leaving one out that later derails the project is.

### Step 7: request mentor approval (TODO 6)

Open [`starter/mentor-approval.md`](starter/mentor-approval.md). Fill in the summary fields, then send your brief and stakeholder map to your mentor (or, if you do not yet have one, a peer, instructor, or another trusted reviewer) for written approval. Record their decision and any conditions in this file. Do not begin Stage 2 (`02-experience-and-system-design`) until this file says "Approved" or "Approved with changes" and you have made those changes.

## Key code explained

- **Problem statement.** The single sentence a mentor, a partner, or a future teammate could repeat back accurately after reading your brief once.
- **Scope, in and out.** Two lists, not one: what you will build, and what you are deliberately not building. The second list is what protects your five stages from growing without limit.
- **Stakeholder.** Anyone who is affected by, or can affect, the project's outcome — not only the people who use it.
- **Mentor approval.** A written, dated record of sign-off, with any conditions attached. It is the gate between "idea" and "committed project."
- **Partner project.** A real or realistic organisation your capstone serves. It can be entirely hypothetical, as long as your brief is honest about that.

## 3D and XR accessibility

This stage produces no code, so there is nothing to test in a screen reader yet. But the choices you make here decide how accessible your capstone can be later. When you write your problem statement and scope, note who your audience is in terms that matter for accessibility: do they use screen readers, do they have reliable broadband, do they read your language fluently? Stage 2 turns these notes into concrete accessibility requirements, so capture them now while they are fresh, even as a single bullet point in your brief.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why | 
| --- | --- | --- |
| `completed/index.html` declares `lang="en"` | 3.1.1 Language of Page | Assistive technology needs to know which language rules to apply | 
| Every heading follows a logical order (h1, then h2s, no skipped levels) | 1.3.1 Info and Relationships | A screen reader user scans headings to find content | 
| Links to the three documents are visible text, not "click here" | 2.4.4 Link Purpose (In Context) | The link text alone should say what a document is | 
| Focus is visible on every link | 2.4.7 Focus Visible | Keyboard users need to see where they are | 
| Colour contrast on all text meets 4.5:1 | 1.4.3 Contrast (Minimum) | Low-contrast text is unreadable for many users | 

## Performance considerations

`completed/index.html` is a single lightweight page of links and summaries: there is no build step, no image, and no script beyond the shared stylesheet. Keep it that way — this stage is about the documents, not the page that lists them.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Writing the brief in vague, marketing language | A mentor cannot approve what they cannot evaluate | Use plain, specific sentences: who, what problem, what scope |
| Skipping the "out of scope" list | The project grows until Stage 4 runs out of time | Name at least three things you will not build, in writing |
| Starting to code before approval | Work gets thrown away when the brief changes | Wait for "Approved" or "Approved with changes" in `mentor-approval.md` |
| Naming a real organisation that has not agreed to the project | Misrepresents a partnership that does not exist | Describe a realistic partner type instead, until a real one confirms |
| Treating the stakeholder map as a formality | Later stages miss a decision-maker's requirements | Write down what each stakeholder can actually decide |

## Troubleshooting

**I do not have a mentor.** Use a peer, an instructor, or a trusted reviewer instead, and say so in `mentor-approval.md`. The point is an outside check on your plan, not a specific job title.

**My partner idea keeps growing.** Go back to Step 3 and add to your "out of scope" list. A capstone that tries to serve every possible stakeholder rarely finishes any of them well.

**The templates will not open.** Markdown files open in any text editor; you do not need a local server for them. `starter/index.html` does need one (`http://`, not `file://`), because it links to files by relative path.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: Write a one-paragraph "elevator pitch" for your capstone that a stakeholder map alone cannot show — the *why now* of your project.
2. **[Creative](challenges/challenge-2.md)**: Ground the brief in your own language, community, or culture: describe how your capstone reflects a place or community you know personally.
3. **[Explorer](challenges/challenge-3.md)**: Interview a real person close to your intended audience (a friend, family member, or classmate) and add one direct quotation from them to your brief.

## Submitting your work

1. Work through [`tests/checklist.md`](tests/checklist.md).
2. Take a screenshot of your completed `mentor-approval.md` showing an approval decision.
3. Keep your brief, stakeholder map, and mentor approval in your learner journal and portfolio. When the XR Camp community opens, share them there.
4. Journal question: what is the one requirement in your brief you are least confident about, and what would it take to become confident?

## Further reading

- [MDN: Soft skills for web developers](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Soft_skills) 
- [W3C, Accessibility Requirements for People with Low Vision](https://www.w3.org/TR/low-vision-needs/) 
- [Gov.uk Service Manual: Discovery](https://www.gov.uk/service-manual/agile-delivery/how-the-discovery-phase-works) 

## Women to Know

Cristina Junqueira is a Brazilian entrepreneur, born in Ribeirão Preto, who in 2013 co-founded the fintech company Nubank with David Vélez and Edward Wible. Its first product, a no-annual-fee credit card managed entirely from a mobile app, made its first transaction on 1 April 2014 — a simple, sharply scoped answer to a problem millions of people in Brazil faced with traditional banks. Nubank has since grown to serve more than 140 million customers.

Think of Junqueira's story as this stage in miniature: a clearly defined problem, one audience, and one first product, built before anything more ambitious. In 2026 she is leading Nubank's launch into the United States from Miami, still working from the same discipline of naming the problem precisely before building the solution.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

The **W3C's Web Content Accessibility Guidelines (WCAG) 2.2**, published by the Web Accessibility Initiative, is the standard your capstone will ultimately be judged against, starting with the accessibility notes you write in this stage's brief. Later stages test specific success criteria; this stage is where you first commit, in writing, to meeting them.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
