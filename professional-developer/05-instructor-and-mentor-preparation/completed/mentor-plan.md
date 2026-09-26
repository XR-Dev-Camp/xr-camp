# Mentor plan: a Phase 1 learner finishing the Riverside site

This is Ana's filled-in mentor plan, following [`starter/mentor-plan-template.md`](../starter/mentor-plan-template.md). Your own plan should follow the same shape, for a real or realistically imagined mentee of your own; do not copy Ana's choices.

## Mentee and goal

- **Who:** a learner partway through **Phase 1: Web Developer**, stuck between Course 1.4 (Responsive Design) and Course 1.5, unsure whether her Riverside community-centre site actually works for a visitor on a slow connection.
- **Goal for this mentoring cycle:** finish Course 1.5 and present a working, responsive, accessible version of the Riverside site to me, in a real 20-minute walkthrough.
- **Length of this plan:** six weeks, one 45-minute session every two weeks (three sessions total).

## Session structure

| Part | Minutes | What happens |
| --- | --- | --- |
| Check-in | 5 | I ask what got easier since last time, and what she is avoiding. Avoidance usually points at the real blocker. |
| Review real work | 20 | We open her actual Riverside site together, on my screen and hers, at both mobile and desktop width. I never review a description of the work; I review the work. |
| Teach one concept | 15 | I introduce exactly one idea tied to something I just saw in her code — for example, one session, `clamp()` for fluid type sizing, because her headings were overflowing at narrow widths. |
| Set the next visible goal | 5 | She names, in her own words, the one thing she will finish before we meet again. |

## Worked examples you will use

`frontend-engineer/02-the-document-object-model-and-dynamic-interfaces/completed/` — its "3D moment" and its plain responsive layout are close to where she is stuck, and it is a project she can read end to end in one sitting rather than a snippet out of context.

## Giving feedback

- **When work is wrong:** I name the specific line or behaviour, not the person — "this heading overflows its container at 320px wide" rather than "your layout is broken" — and I ask what she expected to happen before I explain what actually happens.
- **When work is right:** I say exactly what worked and why it worked, so she can repeat it on purpose next time — "using `role="list"` there was correct, and here is the exact bug it prevents in Safari" — instead of a general "good job."
- **When she is stuck:** I ask what she has already tried and what the error message actually says, in that order, before I offer a fix. Most of the time, saying the error message out loud gets her most of the way there herself.

## Accessible and low-bandwidth mentoring

- Every session is voice-only by default, over whichever call tool has the lowest bandwidth requirement available to both of us; I send a short written summary afterward for anyone who prefers reading to a recording.
- Any material I share works offline once downloaded, and I never require a specific paid tool to open it.
- She is writing in her second language; I keep my own sentences short, avoid idioms, and check understanding by asking her to restate a concept in her own words, not by asking "does that make sense?"

## Inclusive and safe mentoring

- This mentoring relationship follows [`.github/CODE_OF_CONDUCT.md`](../../../.github/CODE_OF_CONDUCT.md).
- **If something goes wrong:** if she reports harm, discomfort, or a boundary problem — from me, or from anyone else in the community — I do not investigate or resolve it myself. I tell her how to reach **conduct@xrcamp.dev**, and I report it there too if she asks me to, or if I witness it directly.
- **Boundaries:** contact stays inside the agreed channel and the agreed two-week cadence; I do not ask for or share personal contact details outside it, and sessions end on time even mid-topic, with the remainder carried to next time.

## Graduation: contributing back

Once she has a finished, accessible Riverside site, her next visible goal becomes a real contribution: fixing one confusing sentence or missing alt text she personally found frustrating in an existing XR Camp lesson, opened as a real pull request that satisfies the ten checks in [`.github/CONTRIBUTING.md`](../../../.github/CONTRIBUTING.md). Finding and fixing one small, real problem is a more honest first contribution than writing a whole new lesson before she has seen how the review process works.
