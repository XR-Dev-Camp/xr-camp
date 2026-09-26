# Challenge 3: Explorer

**Optional stretch.** Roughly 90 minutes.

Add a staging environment, so changes reach a real URL before anyone has to approve them for production.

## Task

1. Add a `staging` environment (no required reviewers) and a `deploy-staging` job that runs after `build`, deploying to it on every push to `main`, in parallel with the existing `approve`/`deploy` path to production.
2. GitHub Pages serves only one live site per repository, so give staging its own path or its own Pages project: either publish it to a `gh-pages`-style branch under a `/staging/` path with `actions/upload-pages-artifact`'s `path` pointed at a folder that includes both, or (more advanced) deploy staging to a second, separate repository dedicated to it.
3. Update the release dashboard with a "Staging vs. production" section explaining the difference: staging deploys automatically and needs no approval; production always waits for one.
4. Confirm a push to `main` updates staging immediately, while production still waits at the `approve` job until you approve it.

## Why this matters

Most real teams do not deploy straight to production. A staging environment is where a team, or a single reviewer, can see a change live before deciding whether the public should see it too — the same idea as the manual-approval gate, one step earlier.

## Done when

- [ ] Staging deploys automatically, on every push to `main`.
- [ ] Production still requires manual approval, unchanged.
- [ ] The dashboard explains the difference between the two.
