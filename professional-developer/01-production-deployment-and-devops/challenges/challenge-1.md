# Challenge 1: Foundation

**Required.** Roughly 45 minutes.

Add a safe way to test the pipeline's early jobs without ever reaching deploy.

## Task

1. In your own copy of `deploy.yml`, add a second trigger input to `workflow_dispatch`: a boolean `dry_run`, defaulting to `false`.
2. Add `if: github.event.inputs.dry_run != 'true'` to the `build`, `approve`, and `deploy` jobs, so a dry run stops after `accessibility`.
3. Run the workflow by hand once with `dry_run` set to `true`, and confirm in the Actions tab that only `validate` and `accessibility` ran.
4. Run it again with `dry_run` set to `false` (or leave it at its default) and confirm the full pipeline runs as before.

## Why this matters

A real team changes a pipeline often: a new check, a different Node version, a renamed job. Testing that change safely, without a real deployment and without waiting for someone to approve it, is what lets a team improve its pipeline with confidence instead of fear.

## Done when

- [ ] `dry_run` exists as a `workflow_dispatch` input, with a sensible default.
- [ ] A dry run visibly stops before `build`.
- [ ] A normal run still completes the full pipeline.
