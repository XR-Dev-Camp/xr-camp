# Rubric: the Phase 3 capstone

Work through this after [`brief.md`](brief.md) and before you submit. Each row is met or not met; there are no partial scores. All eight rows must be met for the capstone to count as complete — this is a required project, not an optional challenge.

| # | Requirement | Met when |
| --- | --- | --- |
| 1 | Exhibits | 3 to 5 exhibits are visible, each on its own pedestal, each distinct (shape, material, or animation). |
| 2 | Info panel | Selecting any exhibit (click, tap, or a Select button) opens a panel naming it and describing it; a loaded model's panel also shows its credit and a licence link. |
| 3 | Keyboard route | Every interaction — select, look around, pause/resume, reload — works with the keyboard alone, reachable by Tab, with a visible focus outline. |
| 4 | Scene description | `id="scene-description"` exists, updates when the exhibit changes, and is built from the same data as the scene (not a separate, hand-written sentence). |
| 5 | 2D twin | The exhibit list is present at all times (not only when WebGL fails), and repeats the scene's own facts. |
| 6 | Performance budget | The README states a budget in numbers; the page measures and shows the live numbers next to it, and says whether the exhibit is within budget. |
| 7 | Attribution | Every third-party asset is credited on an attribution page and in `ATTRIBUTION.md`, with its licence and source linked. |
| 8 | Release notes | `CHANGELOG.md` has a `1.0.0` entry describing what the capstone shipped. |

## Also checked (not scored per row, but required)

- No console errors on the completed page.
- No horizontal overflow at 390 px or 1280 px.
- Reduced motion is respected: animation starts paused when the operating system asks for it, and the Pause button always says what it will do next.
- The camera never moves unless the learner moves it.
- `node scripts/validate-projects.mjs` passes from the repository root.
