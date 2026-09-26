# Project check

Work through this list before you submit.

## The dashboard
- [ ] The page has one clear `<h1>` and a logical heading order.
- [ ] Every section explains one part of the pipeline, in plain language, with no invented status or live data.
- [ ] Every link resolves (the exhibit, both workflow files, and `.github/workflows/validate.yml`).

## The pipeline (deploy.yml)
- [ ] `validate` checks both HTML and links, and runs first.
- [ ] `accessibility` runs a headless `pa11y` audit and depends on `validate` (`needs:`).
- [ ] `build` uploads a Pages artifact with `actions/upload-pages-artifact`.
- [ ] `approve` uses `environment: name: production`, matching an environment with Required reviewers configured in your repository's Settings.
- [ ] `deploy` has its own `pages: write` and `id-token: write` permissions, and uses `actions/deploy-pages`.
- [ ] A push tagged `v*` publishes a GitHub Release with generated notes.

## Rollback (rollback.yml)
- [ ] The workflow only starts by hand (`workflow_dispatch`), with a `tag` input.
- [ ] It checks out the requested tag, not the branch, and waits for the same manual approval.
- [ ] A successful rollback adds a note to the redeployed tag's release.

## Accessibility
- [ ] The dashboard passes a WCAG 2.2 AA check (for example, `pa11y`).
- [ ] The keyboard can reach every link on the dashboard.
- [ ] Focus is visible at all times.
- [ ] Colour contrast meets WCAG 2.2 AA.

## Responsiveness
- [ ] The dashboard works at mobile width.
- [ ] Nothing overflows horizontally.

## Quality
- [ ] The browser console has no errors on `index.html`.
- [ ] Action versions in both workflow files are pinned, not `@main` or `@latest`.
- [ ] Comments explain intent, not syntax.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] After a deploy, the live exhibit's scene description still matches what the 3D view shows.
- [ ] After a deploy, every 3D interaction (turn, select, pause) still works by keyboard alone.
- [ ] After a deploy, the exhibit still starts with animation paused for `prefers-reduced-motion`, and the Pause button still works.
- [ ] After a rollback, the same three checks pass again on the redeployed version.
