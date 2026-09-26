# Project brief: My XR Camp 1.0

## The problem

Across Courses 2.1 to 2.6 you built five small, separate pages: a course map,
a dashboard, a session planner, a study-week weather forecast, and a
`<lesson-card>` component. Each works. None of them talk to each other, and
none of them is something you could hand a friend to install on her phone.

## The task

Combine them into **one** small application: **My XR Camp**. It must:

- Show the course map, a progress dashboard, the session planner, and
  study-week weather, as views of one page (simple in-page navigation).
- Read and write the same `localStorage` keys your earlier lessons used, so
  a learner's progress and planned sessions carry over.
- Install, and work offline, with a visible version number and an accessible
  "update available" prompt (Course 2.6).
- Work in at least one language other than English, chosen with a switcher
  that sets `<html lang>`, even if that language is only a short first draft.
- Offer a **3D moment**: a "See my progress in 3D" feature that loads its
  3D library only when pressed, and never blocks the rest of the app.
- Ship as version **1.0.0**, with a `CHANGELOG.md` entry and an honest
  AI-use log (Course 2.8).

## What is out of scope

- A build step, bundler, or framework: this is still plain HTML, CSS, and
  JavaScript modules, like every lesson before it.
- Full translation review: a short, flagged first draft is enough for two
  languages. Full internationalisation is Course 6.2.
- Any paid service, account, or API key.

## Where to start

Read [`../README.md`](../README.md) in full, then follow its "Plan your
sessions" table. Check your work against [`rubric.md`](rubric.md) before you
submit.
