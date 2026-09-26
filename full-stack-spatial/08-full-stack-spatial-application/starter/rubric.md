# Rubric: the Phase 5 capstone

Work through this after [`brief.md`](brief.md) and before you submit. Each row is met or not met; there are no partial scores. All eight rows must be met for the capstone to count as complete -- this is a required project, not an optional challenge.

| # | Requirement | Met when |
| --- | --- | --- |
| 1 | Inherited fixes hold | `npm test` in `server/` passes all eight tests carried over from Course 5.5 (stored-XSS, CSP, secret handling, IDOR, error messages, location minimisation). |
| 2 | Description draft | Selecting an open scene and choosing "Draft description" shows text built from that scene's own name and annotations, from the "mock" provider, with no network call and no invented facts. |
| 3 | Human review before saving | A draft is never saved automatically: the learner can read and edit it in the textarea, and it is written to the database only after "Save description" is pressed. |
| 4 | Access control on the new feature | Any signed-in account that can view a scene can request a draft for it; only the scene's owner can save a description to it, even on a public scene. |
| 5 | Output encoding | A saved description is rendered with `textContent`, never `innerHTML`, matching how annotations and chat are already rendered elsewhere in this app. |
| 6 | Both tests pass | `npm test` in `server/` passes all ten tests, including the two new ones for the description draft and save. |
| 7 | Deployment notes | [`../deployment-notes.md`](../deployment-notes.md) explains running this on your own computer and, optionally, on a small server you control, with no paid service required. |
| 8 | Release notes | `CHANGELOG.md` has a `1.0.0` entry describing what this capstone shipped. |

## Also checked (not scored per row, but required)

- No console errors on the completed page.
- No horizontal overflow at 390 px or 1280 px.
- `completed/index.html` passes as a static, `file://` page with no server running (the CI accessibility check never starts one).
- Reduced motion is respected: the scene's animation starts paused when the operating system asks for it, and the Pause button always says what it will do next.
- The server only ever binds to `127.0.0.1` -- never `0.0.0.0` -- unless you have deliberately followed `deployment-notes.md`'s reverse-proxy setup.
- `node scripts/validate-projects.mjs` passes from the repository root.
