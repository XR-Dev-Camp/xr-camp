# AI for Spatial Computing

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `full-stack-spatial` · **Lesson:** `ai-for-spatial-computing-06` · **Time:** about 14 hours · 19 sessions of 45 minutes · about 5 weeks at 4 sessions a week

---

> Build an AI-assisted spatial tool while documenting human review and safeguards.

---

## Learning objectives

By the end of this project you will be able to:

1. Build an AI feature as one provider-neutral module, and switch between a deterministic offline mock, any OpenAI-compatible hosted endpoint, and a local model (Ollama or LM Studio) by changing only environment variables.
2. Build a prompt from a scene's own structured data — never from a picture of it — and explain why that keeps a feature small, cheap, and usable by someone who cannot see the scene at all.
3. Ask a model to reply as strict JSON, parse that reply defensively, and reject a malformed reply instead of guessing at what it might have meant.
4. Cross-check a model's reply against the real data it was given, to catch the specific, common failure of a model naming something that is not actually there.
5. Explain the difference between an AI-generated draft and saved application data, and require a person to read and approve a draft before anything reaches the database.
6. Apply data minimisation to a prompt: send only the fields a feature needs, and explain what this project has no personal data to leak in the first place.
7. Add a cost- and rate-limit control in front of any feature that can call a paid API, separate from a login rate limit's job.
8. Write an AI-use disclosure a person can read before they decide to use a feature.

## Prerequisites

- **Course 5.3: Databases and Spatial Application Data** — this lesson reuses its scene, scene-object, and annotation schema, and its `node:sqlite` approach, for the data every AI feature here reads.
- **Course 5.1: Backend and API Foundations** — routes, JSON bodies, validation, and status codes.
- Comfort with `async`/`await` and reading a stack trace, from **Course 4 (Frontend Engineer)**.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| Node.js 22.5 or later (LTS "24 Sinnamon" recommended) | Runs the server, including the built-in `node:sqlite` module | Free |
| A text editor (e.g. VS Code) | Writing the server and client code | Free |
| A modern browser (Chrome, Firefox, Safari, or Edge) | Running the tool and testing your work | Free |
| Ollama or LM Studio (optional) | Running a local model on your own machine, for the Explorer challenge | Free |

Node.js can be downloaded from [nodejs.org](https://nodejs.org/); learners in mainland China can also use the [npmmirror Node.js mirror](https://registry.npmmirror.com/binary.html?path=node/) if the official site is slow. Nothing in this lesson needs an npm package: `node:sqlite`, `node:http`, `node:crypto`, and `node:test` all ship inside Node itself, and the AI provider — real or mock — is called with the browser and Node's own built-in `fetch()`. If you try the optional Explorer challenge with a hosted, OpenAI-compatible provider instead of a local model, check that provider's own pricing and current terms yourself; this course names no specific provider.

## What you will build

Course 5.3 gave the exhibit a real database of saved scenes, made of exhibits with positions and rotations, plus short annotations. This lesson adds two small AI-assisted tools on top of that same data: a button that **drafts a plain-language description** of a scene from its own saved data (for accessibility, and for anyone who cannot see the 3D view), and a box where you can **search scenes in plain language** instead of scrolling a list. Both features are built on one new file, `server/ai.js`, which knows nothing about HTTP or SQLite — only how to turn a scene (or a list of scenes) into a prompt, call whichever provider is configured, and turn its reply back into something the rest of the server can trust or safely reject.

This lesson has no accounts: Course 5.2 already teaches those, and Course 5.5 hardens them, so every scene here is shared, local, single-tenant data — the smallest scope that still lets both AI features do something real. The reference solution is in [`completed/`](completed/); the starter has **18 numbered TODOs**, almost all in `server/ai.js`, `server/db.js`, `server/routes.js`, `server/server.js`, and `js/main.js`, with `js/scene.js` (the 3D view itself), `server/exhibits.js`, and the rest of `server/routes.js`'s scene and annotation CRUD carried over finished, so this lesson can focus on the AI module.

## Folder guide

```text
06-ai-for-spatial-computing/
├── README.md
├── starter/                 # begin here
│   ├── index.html, styles.css, js/
│   │   ├── scene.js          # the 3D view — finished, carried over from 5.3
│   │   └── main.js           # TODO 17, TODO 18
│   └── server/
│       ├── exhibits.js       # the shared exhibit list — finished
│       ├── db.js              # TODO 1, TODO 2
│       ├── validation.js      # TODO 3
│       ├── ai.js               # TODO 4-13 — this lesson's real subject
│       ├── routes.js           # TODO 14, TODO 15
│       ├── server.js           # TODO 16
│       ├── server.test.js      # node:test, using the mock provider
│       └── .env.example
├── completed/                # reference solution
├── challenges/                # Three challenges: Foundation is required
├── tests/                     # self-review checklist
├── assets/
└── screenshots/
```

## Setup

1. Open a terminal and run `node --version`. You need 22.5 or later; this course is written and tested against Node 24 (the current LTS).
2. `cd` into `starter/server` and copy `.env.example` to `.env`. Leave `AI_PROVIDER` set to `mock` for now — that is what every TODO up to the Explorer challenge is tested against.
3. From `starter/server`, run `node server.js`. You should see `AI-assisted scene tool listening on http://127.0.0.1:8886` and a line about seed data not being created yet — both expected before TODO 1; see Troubleshooting.
4. Open `http://127.0.0.1:8886/` in your browser. The exhibit shows its default arrangement; nothing else works yet.
5. In a second terminal, from `starter/server`, run `node --test`. Every test should fail with a clear `TODO n: ... is not implemented yet` message — that is your map of the lesson, in order.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Read this Walkthrough; run the Setup steps above. | A server that starts, and a full, failing test suite naming every TODO ahead. |
| 2 | TODO 1: `db.js`'s `insertScene` and `insertObjects`, in one transaction. | `curl -X POST http://127.0.0.1:8886/api/scenes -d '...'` returns `201` with a real `id`. |
| 3 | TODO 2: `db.js`'s `updateScene` and `saveDescription`. | Restarting the server now seeds three sample scenes (`seedIfEmpty` can finally insert); `GET /api/scenes` lists them. |
| 4 | TODO 3: `validation.js`'s `validateSearchQuery` and `validateDescriptionSave`. | A 500-character query, sent by hand with `curl`, is rejected with a `400` before `ai.js` is ever involved. |
| 5 | TODO 4: `ai.js`'s `buildDescriptionPrompt`. | Logging its return value shows a two-message prompt containing only a scene's own name, exhibits, positions, and annotations — nothing else. |
| 6 | TODO 5: `ai.js`'s `parseDescriptionReply`. | Feeding it `'{"description": "ok"}'` and `'not json'` by hand in a scratch script returns the right thing and throws the right thing. |
| 7 | TODO 6: `ai.js`'s `checkDescriptionForHallucinations`. | A hand-written fake description mentioning an exhibit not in the scene comes back with a warning naming it. |
| 8 | TODO 7: `ai.js`'s `describeScene`, tying TODOs 4-6 together. | `node --test`'s two description tests turn green. |
| 9 | TODO 8: `ai.js`'s `buildSearchPrompt`, and TODO 9: `parseSearchReply`. | The search prompt's "data sent" contains only scene ids, names, exhibits, and annotation text. |
| 10 | TODO 10: `ai.js`'s `filterMatchesAgainstRealScenes`. | The hallucination-guard test (an invented scene id being dropped) passes. |
| 11 | TODO 11: `ai.js`'s `searchScenes`, tying TODOs 8-10 together. | `node --test`'s search tests turn green. |
| 12 | TODO 12: `ai.js`'s `callOpenAiShapedEndpoint`. | The file now has everything it needs to reach a real provider later — nothing to test yet with `AI_PROVIDER=mock`, but re-read TODOs 4-11 and confirm none of them assumed anything mock-specific. |
| 13 | TODO 13: `ai.js`'s `checkAiRateLimit`. | Calling it more than `AI_MAX_CALLS_PER_WINDOW` times in a scratch script returns `false` from the extra calls. |
| 14 | TODO 14: `routes.js`'s `generateDescription` and `saveDescriptionRoute`. | `curl -X POST .../describe` returns a draft; `curl -X PUT .../description` saves it; `GET` on the scene now shows it. |
| 15 | TODO 15: `routes.js`'s `searchScenesRoute`. | `curl -X POST /api/search -d '{"query":"jade"}'` returns a real, matching scene. |
| 16 | TODO 16: `server.js`'s two new routes. | Every route in the project is reachable over HTTP for the first time — re-run all of `node --test`. |
| 17 | TODO 17: `js/main.js`'s `generateDescription` and `saveDescription`. | In the browser: save a scene, generate a draft, edit it, save it, reload the page, and see it persisted under "Saved description". |
| 18 | TODO 18: `js/main.js`'s `searchScenes`. | Typing "jade" into the search box and pressing it (or Enter) opens a matching scene. |
| 19 | Work through [`tests/checklist.md`](tests/checklist.md); complete the required [Foundation challenge](challenges/challenge-1.md); one more challenge extension, then **Submitting your work**. | Every checklist item checked, your own small extension, and a project you are ready to show. |

### Step 1: Read the schema and the shape of a "draft" (no TODO yet)

Before writing anything, notice the one rule every TODO in this lesson has to respect: **a draft is not saved data.** `server/ai.js` never calls `db.js`. `server/routes.js`'s `generateDescription` route only ever returns what `ai.js` gave it; `saveDescriptionRoute` is a *separate* route, called only when a person clicks "Save this description" in the browser, after reading (and, if they choose, editing) the draft. If you find yourself writing code in `ai.js` that imports `db.js`, stop — that is the one boundary this lesson asks you not to cross.

### Step 2: Scene storage (TODO 1, TODO 2)

`db.js`'s schema is two tables: `scenes` (with a `description` and `description_reviewed_at` column, new for this lesson) and `scene_objects`, plus `annotations` — the same shapes Course 5.3 used, minus the `owner_id` this lesson's account-free scope does not need. Finish `insertScene` and its `insertObjects` helper (TODO 1), then `updateScene` and `saveDescription` (TODO 2), following the instructions in each function's comment. `saveDescription` is short — one `UPDATE`, one new timestamp — and it is the *only* function in the whole project allowed to write a description.

### Step 3: Guard the AI request bodies (TODO 3)

`validation.js`'s `validateSearchQuery` and `validateDescriptionSave` follow the same `{ valid, errors, value }` shape every other validator in this course uses. The reason they exist is cost, not just correctness: every character a learner sends is a character `ai.js` may have to pay a real provider to read, so rejecting an oversized request here is cheaper than rejecting it after a network round trip.

### Step 4: Build the description prompt (TODO 4)

`ai.js`'s `sceneDataForPrompt` (finished for you) turns a scene into `{ name, exhibits: [...], annotations: [...] }` — only what the description feature needs, built from the exhibit ids and numbers already in the database, never from an image. Finish `buildDescriptionPrompt`, which wraps that data in a two-message prompt:

```js
{
  messages: [
    { role: 'system', content: JSON_ONLY_SYSTEM_MESSAGE },
    { role: 'user', content: '...instructions... Scene data: {"name":"...","exhibits":[...]}' },
  ],
  dataSent: { name: '...', exhibits: [...], annotations: [...] },
}
```

`dataSent` is returned all the way to the browser (see TODO 14 and TODO 17), so a learner can open "Data sent to the AI provider" in the UI and see, in their own project, exactly what left it — a direct, hands-on way to check the "send only what is needed" rule for yourself, rather than take this README's word for it.

### Step 5: Parse and validate the reply (TODO 5)

A model is asked to reply as JSON; nothing in this project trusts that it actually will. Finish `parseDescriptionReply`: `JSON.parse` the raw text (throwing an `AiResponseError` if that fails), check the parsed value has a non-empty string `description`, and throw the same error type if it does not. This function runs on *every* reply, including the mock provider's — `mockDescriptionReply` (finished for you) already returns exactly the shape this function expects, which is what lets the mock provider stand in for a real one everywhere in this lesson, including in `server.test.js`.

### Step 6: Check the reply against the real data (TODO 6)

`checkDescriptionForHallucinations` is this course's smallest fact-checker: for every exhibit in the shared `EXHIBITS` list, if its name is mentioned in the description but its id is not actually in `scene.objects`, that is a warning worth a person's attention before they save the text. It is a heuristic, not a guarantee — a description can still mislead in other ways — but it catches the specific, common failure of a model inventing an exhibit, and it is cheap to compute because the "real data" it checks against is already sitting in memory.

### Step 7: Tie it together (TODO 7)

`describeScene` is the only function `routes.js` calls. Finish it to: build the prompt (TODO 4), get a raw reply (the mock provider directly, for `AI_PROVIDER=mock`, or `callProvider` for a real one), parse it (TODO 5) with **one retry** if a real provider's reply fails to parse (a sharper, second request naming what was wrong with the first), then run the hallucination check (TODO 6) and return everything — description, warnings, provider name, and the data that was sent — without saving any of it.

### Step 8: The search prompt and its reply (TODO 8, TODO 9)

The same three-step shape repeats for search: `buildSearchPrompt` (TODO 8) sends only each scene's id, name, exhibit list, and annotation text — capped at `MAX_SCENES_IN_PROMPT` scenes, since the *number* of scenes drives the prompt's size and cost the same way message length does. `parseSearchReply` (TODO 9) checks the reply has a `matches` array (each entry with a string `sceneId` and `reason`) and a string `explanation`.

### Step 9: The hallucination guard for search (TODO 10)

A model can only have been shown the scene ids `scenesDataForPrompt` included — so any `sceneId` it returns that is not one of the real ids passed in did not come from the data. Finish `filterMatchesAgainstRealScenes` to split a reply's matches into `kept` (a real id) and `dropped` (everything else), and see the README's "Key code explained" for why this, not the model's good behaviour, is what `routes.js` actually relies on.

### Step 10: Tie search together (TODO 11)

`searchScenes` mirrors `describeScene` from Step 7: build the prompt, get a raw reply, parse it (with the same one-retry pattern for real providers), filter it against the real scene list, and return the survivors plus the explanation.

### Step 11: Reach a real provider (TODO 12)

`callOpenAiShapedEndpoint` is the only function in this project that calls `fetch()` against something outside this process. Finish it to `POST` `{AI_BASE_URL}/chat/completions` with the shape described in its comment, and to turn a missing configuration, a failed request, and a malformed response into the three different error types (`AiConfigError`, `AiRequestError`, `AiResponseError`) `routes.js` already knows how to turn into the right HTTP status. `AI_PROVIDER=openai-compatible` and `AI_PROVIDER=local` both call this same function — only `AI_BASE_URL`, `AI_MODEL`, and whether a key is set differ between them.

### Step 12: A budget for real calls (TODO 13)

`checkAiRateLimit` caps how many AI calls this project will make in a 15-minute window, no matter whether any of them turn out to be useful — a real provider bills per call (or, for a local model, spends time and battery) whether or not `routes.js` ends up using the answer. Finish it as a small, shared counter; the comment above it explains why this is a different job from a login rate limit.

### Step 13: Wire the routes (TODO 14, TODO 15)

`routes.js`'s `generateDescription`, `saveDescriptionRoute`, and `searchScenesRoute` are this course's usual shape: load the scene (or the scene list), check the rate limit where one applies, validate the body, call into `ai.js`, and turn its result — or one of its three error types, via the already-finished `sendAiError` — into a response. None of them are long; the work is already done in `db.js`, `validation.js`, and `ai.js`.

### Step 14: Route the two new paths (TODO 16)

`server.js` matches every path with a small regular expression — the same no-router-package choice every lesson in this course has made. Add `DESCRIBE_PATH` and `DESCRIPTION_PATH`, matching `/api/scenes/<id>/describe` and `/api/scenes/<id>/description`, and wire them in *above* the more general scene-id matching further down, the same way the existing annotation routes are ordered.

### Step 15: Wire the client (TODO 17, TODO 18)

`js/main.js`'s `generateDescription`, `saveDescription`, and `searchScenes` each make one `fetch()` call and update a handful of elements already in `index.html` — the draft box, its warnings and "data sent" details, the saved-description line, and the search results list. Every value shown is exactly what the server returned; none of it is reworded or summarised further in the browser.

## Key code explained

- **One module owns the model.** `ai.js` is the only file that builds a prompt or reads a raw reply. `routes.js` calls `describeScene(scene)` or `searchScenes(query, scenes)` and gets back plain data — it has no idea whether `AI_PROVIDER` is `mock`, `openai-compatible`, or `local`. That is what makes swapping providers a one-line `.env` change instead of a rewrite.
- **"Reply as JSON, then check it anyway."** Every prompt in this project ends with an instruction to reply as a single JSON object. Every reply is still parsed defensively (`parseDescriptionReply`, `parseSearchReply`) and rejected — never guessed at — if it does not match the expected shape. The instruction lowers the chance of a malformed reply; the parser is what actually protects the rest of the server from one.
- **The hallucination guard is a cross-check against real data, not the model's word.** `checkDescriptionForHallucinations` compares a draft to `scene.objects`; `filterMatchesAgainstRealScenes` compares a search reply's scene ids to the real list that was sent. Neither trusts the model to have stayed accurate — both verify it independently, in code this project controls.
- **A draft and a save are two different routes.** `POST /api/scenes/:id/describe` returns text; only `PUT /api/scenes/:id/description` — a separate request, sent only when a person clicks "Save this description" — ever calls `db.js`'s `saveDescription`. This is the whole mechanism behind "a person reviews it first": there is no code path where a generated draft reaches the database on its own.
- **Data minimisation is a function, not a policy document.** `sceneDataForPrompt` and `scenesDataForPrompt` are the only two places that decide what a prompt contains, and both build it field by field from the scene's own visible data — never a wholesale dump of a database row, and (because this lesson has no accounts) nothing that could identify a person in the first place.
- **A rate limit for cost, not just for security.** `checkAiRateLimit` counts every AI call, successful or not, against one shared budget — different from a login rate limit, which only counts *failed* attempts. A production version would track this per API key or per account (Course 5.8); this project's single shared bucket is a deliberate simplification for a tool with no accounts.

## 3D and XR accessibility

- **Scene description.** `#scene-description` is built from the same `objects` array the 3D view renders, every time a scene loads or changes (WCAG 1.1.1, 1.3.1) — this is separate from, and always present regardless of, the AI-drafted description this lesson adds, which only ever fills the "Saved description" line after a person approves it.
- **Keyboard-only editing.** Every position and rotation is a `<input type="number">`; this project never asks a learner to drag anything in 3D.
- **A 2D twin of the 3D view.** The position/rotation table under the canvas holds the same numbers the 3D view shows, whether or not WebGL is available.
- **Annotations exist as real text.** The floating markers `scene.js` draws over the canvas are decorative; `#annotation-list` is the accessible, always-present copy.
- **Reduced motion and a Pause control.** The jade stone's turn starts paused when `prefers-reduced-motion: reduce` is set, and the **Pause animation** button (with `aria-pressed`) works regardless of that preference.
- **Comfort.** The camera never moves except once, to its fixed starting position.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| An AI-generated draft is visually and textually distinguishable from saved content | 1.4.1 | The "Saved description" line and the dashed-border draft box never rely on colour alone to say which is which — the surrounding words say it too. |
| Every AI response's warnings and errors appear as text, in a list | 1.4.1, 3.3.1 | A rejected or flagged reply must not be signalled by colour alone. |
| `role="list"` on every `<ul>` styled with `list-style: none` | Good practice | Safari otherwise drops list semantics from a list-styled-away `<ul>`. |
| The position/rotation table has a `<caption>` and `<th scope>` | 1.3.1 | A screen reader announces which exhibit and which axis each number belongs to. |
| Animation respects `prefers-reduced-motion` and offers a Pause button | 2.2.2 | Self-starting motion the learner did not ask for must be stoppable. |
| Every interaction (arranging a scene, generating a draft, searching) has a keyboard route | 2.1.1 | Nothing in either AI feature depends on a mouse. |

## Performance considerations

- **Cap the prompt, not just the reply.** `MAX_SCENES_IN_PROMPT` bounds how many scenes `buildSearchPrompt` ever sends, independent of `validateSearchQuery`'s limit on the query text itself — both drive cost and latency together.
- **`max_tokens` bounds the reply too.** `MAX_RESPONSE_TOKENS` caps how long a real provider's answer is allowed to be, so a single request has a predictable upper cost even before this project's own rate limit is considered.
- **The mock provider costs nothing and answers instantly.** Every automated test, and this lesson's default `.env`, uses it — a real provider is opt-in, for the Explorer challenge or beyond.
- **A shared rate limit, not one per request.** `checkAiRateLimit`'s in-memory counter is checked before a prompt is even built, so an over-budget request never reaches `ai.js` at all.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Sending a whole database row (or the whole scenes table) to the model | Costs more, is slower, and risks sending a field nobody meant to share | Build a small, explicit "data for prompt" object, field by field, the way `sceneDataForPrompt` does |
| Trusting `JSON.parse(reply).description` without checking it exists and is a string | A model that replies with prose, an error message, or a differently-shaped object crashes the route, or silently saves `"undefined"` | Parse and validate the shape before using any field, and throw a typed error on anything else |
| Saving a generated description directly, without a review step | A hallucinated or inaccurate description reaches real users with no person having read it | Return a draft from one route; only ever save from a separate route a person triggers themselves |
| Assuming a model that named a real-looking id used a real one | A search reply can name a scene id that was never in the data it was given | Filter every model-supplied id against the real list before using it for anything |
| Committing a real API key in `.env` (or anywhere else) | The key is exposed to anyone with repository access, and to a paid provider's abuse | Keep real keys only in an uncommitted `.env`; commit `.env.example` with placeholders only |

## Troubleshooting

**`ExperimentalWarning: SQLite is an experimental feature and might change at any time`.** Expected, every time `node:sqlite` is imported. It is a warning, not an error.

**`Seed data was not created (expected until TODO 1 is done)`.** Exactly what it says — `seedIfEmpty()` needs `insertScene` (TODO 1) to work. It will seed the next time the server starts once TODO 1 is finished.

**`AI provider not configured: AI_PROVIDER=openai-compatible needs AI_BASE_URL and AI_MODEL set`.** Set both in `.env` (see `.env.example`), or switch back to `AI_PROVIDER=mock`.

**`AI provider request failed: Could not reach the AI provider at http://127.0.0.1:11434/v1`.** For `AI_PROVIDER=local`: Ollama or LM Studio is not running, or is running on a different port than `AI_LOCAL_KIND`'s default assumes. Confirm the port in that tool's own docs and set `AI_BASE_URL` yourself if it differs.

**`429 Too many AI requests`.** You (or your tests) hit `AI_MAX_CALLS_PER_WINDOW` calls inside the 15-minute window `ai.js` tracks. Wait, or lower your own testing frequency — this is deliberate, not a bug.

**`AI reply was invalid and was rejected`.** A real provider replied with something that was not the exact JSON shape this project asked for, even after one retry. This is the malformed-reply path working as designed: nothing was saved, and the error names what was wrong.

**Port 8886 is already in use.** Set a different `PORT` in `server/.env`, and update `ALLOWED_ORIGIN` to match.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: extend the hallucination check to also flag a description that leaves out an exhibit that *is* in the scene.
2. **[Creative](challenges/challenge-2.md)**: add a fourth exhibit of your own, from your own language, culture, or community, and confirm both AI features handle it correctly.
3. **[Explorer](challenges/challenge-3.md)**: connect a real local model through Ollama or LM Studio, and compare its output to the mock provider's.

## Submitting your work

1. Work through [`tests/checklist.md`](tests/checklist.md).
2. Take screenshots: a generated draft description before saving, the same scene with its description saved, and a search result with its explanation.
3. Keep them in your learner journal and portfolio. When the XR Camp community opens, share them there.
4. Journal question: this project shows every AI draft before saving it, and shows exactly what data was sent. Find one place in the interface where a person could still click "Save" without really reading the draft first. What is one small, low-friction change that would make that a little harder, without turning a genuinely quick, confident review into a chore?

## Further reading

- [MDN: Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Ollama documentation: OpenAI compatibility](https://github.com/ollama/ollama/blob/main/docs/openai.md)
- [LM Studio documentation: Local Server](https://lmstudio.ai/docs/app/api)
- [OWASP Top 10 for Large Language Model Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [Node.js docs: `node:sqlite`](https://nodejs.org/api/sqlite.html)

## Women to Know

**Xin Luna Dong (董欣)** was born and educated in China (Nankai University, then a master's at Peking University, before a PhD in the USA) and now works in the USA as Principal Scientist at Meta Reality Labs, where she leads machine-learning work on AI agents for Ray-Ban Meta smart glasses. Before Meta, she spent nearly a decade building knowledge graphs at Google (Knowledge Vault and the Knowledge Graph) and Amazon (the Product Graph). She is both an ACM Fellow and an IEEE Fellow, recognised for her work on knowledge-graph construction and data integration.

Her career sits directly behind this lesson's two features: a knowledge graph is exactly a structure built to answer "what do we actually know, and how confident are we in it" — the same question `checkDescriptionForHallucinations` and `filterMatchesAgainstRealScenes` ask about a much smaller model reply, and the same discipline that keeps an AI feature grounded in real, verified data rather than in what a model merely sounds confident about.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

Every reply this project reads is JSON, a data format standardised twice over: as [ECMA-404](https://ecma-international.org/publications-and-standards/standards/ecma-404/) (Ecma International) and, in an equivalent text, as [RFC 8259](https://www.rfc-editor.org/rfc/rfc8259) (the IETF), which is also why `JSON.parse` behaves the same in every browser and in Node. The *shape* this lesson's `messages` array and `choices[0].message.content` reply follow — the "chat completions" request and response format — is different: it is not administered by ISO, W3C, or the IETF. It began as one company's API and has since been widely copied (including by Ollama and LM Studio, which is exactly what "OpenAI-compatible" means in this lesson) because enough of the ecosystem adopted it, not because a standards body ratified it — a useful, common, and worth-knowing distinction between a de jure standard and a de facto one.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
