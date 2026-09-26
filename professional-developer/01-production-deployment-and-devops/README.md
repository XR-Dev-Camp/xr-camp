# Production Deployment and DevOps

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `professional-developer` · **Lesson:** `production-deployment-and-devops-01` · **Time:** about 12 hours · 16 sessions of 45 minutes · about 4 weeks at 4 sessions a week

---

> Create and document a production release pipeline.

---

## Learning objectives

By the end of this project you will be able to:

1. Explain what a **CI/CD pipeline** is, and describe it as a sequence of jobs that each must pass before the next runs.
2. Write a **GitHub Actions** workflow with jobs for validation, an accessibility audit, a build, and a deployment.
3. Validate a project's HTML and links automatically, and run a headless **accessibility audit** with `pa11y`.
4. Deploy a static site to **GitHub Pages** using GitHub's own official actions.
5. Configure an **environment** with required reviewers, so a release needs a human's manual approval.
6. Perform a **rollback**: redeploy a previous, already-tested release instead of "undoing" a change.
7. Publish **release notes** automatically from a version tag.
8. Read and explain someone else's real CI/CD workflow, as this project's case study does.

## Prerequisites

- **Course 1.8: Git, GitHub, and Publishing** (commits, branches, tags, and pushing to GitHub).
- **Course 3.7: Interactive Web3D Experience** (the exhibit you will deploy here).
- A free [GitHub](https://github.com/) account.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A GitHub account and a repository you control | Actions and Pages both need one | Free |
| A modern browser | Reading the Actions tab, and the deployed site | Free |
| A text editor | Writing the dashboard and the workflow files | Free |

## What you will build

The exhibit is finished (it is the Phase 3 capstone from Course 3.7). This project is about everything that happens **after** the code is written: a pipeline that checks it, deploys it, and lets a team roll it back if something goes wrong.

You will write two example GitHub Actions workflows and a small, accessible **release dashboard** page that documents what they do. `starter/app/` holds the exhibit you are deploying (do not edit it); the pipeline treats it as the thing being shipped, not as something to change.

The reference solution is in [`completed/`](completed/). The starter has 12 TODOs, across `index.html` and the two workflow files.

## Folder guide

```text
01-production-deployment-and-devops/
├── README.md
├── starter/
│   ├── index.html        # The release dashboard: TODOs 1-3
│   ├── styles.css        # Finished (shared tokens, plus this lesson's own section)
│   ├── app/               # The virtual exhibit you will deploy (do not edit)
│   └── workflows/
│       ├── deploy.yml     # TODOs 4-9
│       └── rollback.yml   # TODOs 10-12
├── completed/            # Reference solution: open this last
├── challenges/           # Three challenges: Foundation is required
├── tests/checklist.md    # Self-review before you submit
├── assets/
└── screenshots/
```

`workflows/` is not `.github/workflows/`: a workflow file only runs from that exact folder at the root of a repository, so these are examples you copy into your own repository once they are finished (the README's Setup section says how).

## Setup

1. Make a new, empty repository on GitHub (public, so GitHub Pages can serve it for free), and clone it.
2. Copy `starter/app/`, `starter/index.html`, and `starter/styles.css` into the root of your new repository.
3. Copy `starter/workflows/deploy.yml` and `starter/workflows/rollback.yml` into a new `.github/workflows/` folder at that same root. Nothing will run yet: both files are unfinished, and GitHub Actions simply skips a job with no steps.
4. Commit and push. Open your repository's **Settings → Pages**, and set **Source** to "GitHub Actions".
5. Open **Settings → Environments**, create an environment named `production`, and tick **Required reviewers**, adding yourself. This is the setting that turns Step 7's `approve` job into a real approval gate: nothing in a workflow file can request that approval on its own.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; explore `app/` in a browser, and read this repo's real [`.github/workflows/validate.yml`](../../.github/workflows/validate.yml) once, without changing it | The exhibit running locally |
| 2 | Step 1: the dashboard's heading (TODO 1) | A page that says what it documents |
| 3 | Step 1, continued: the pipeline stages list (TODO 2) | Six stages listed, in order |
| 4 | Step 1, continued: the rollback and outside-GitHub sections (TODO 3) | A finished dashboard |
| 5 | Step 2: case study — read `validate.yml` job by job | Notes on its four jobs, ready for the README |
| 6 | Step 3: the validate job (TODO 4) | HTML and link checks passing in the Actions tab |
| 7 | Step 4: the accessibility job (TODO 5) | A `pa11y` audit passing |
| 8 | Step 5: the build job (TODO 6) | A Pages artifact uploaded |
| 9 | Step 6: the approval and deploy jobs (TODOs 7-8) | A run paused for approval, then a live Pages URL |
| 10 | Step 7: release notes (TODO 9) | A tagged push publishes a GitHub Release |
| 11 | Step 8: the rollback trigger (TODO 10) | A `workflow_dispatch` form with a `tag` input |
| 12 | Step 8, continued: rebuilding and redeploying a tag (TODOs 11-12) | An older tag live again, noted on its release |
| 13 | Step 9: options outside GitHub, cautiously | A short written comparison, in your own words |
| 14 | Step 10: an end-to-end dry run of the whole pipeline | Every job green, from push to release |
| 15 | [`tests/checklist.md`](tests/checklist.md) | A finished pipeline |
| 16 | One challenge extension, then **Submitting your work** | A documented release pipeline |

### Step 1: the release dashboard (TODOs 1-3)

Start with `index.html`: a small, static page that explains the pipeline to a person, in plain language, without calling any live API. That keeps it free, offline-friendly, and honest — it never claims to show a status it cannot actually check.

TODO 1 is the heading and opening paragraph. TODO 2 is the "Pipeline stages" list: an `<ol class="stage-list" role="list">` with one `<li>` per job, each with its own `<h3>` and a short `<p>`. Write these two after you have read the case study (Step 2) and before you write the workflows (Step 3 onward), so the words match what the YAML actually does. TODO 3 is the rollback explanation, written last, once `rollback.yml` exists.

### Step 2: case study — this repository's own pipeline

Open [`.github/workflows/validate.yml`](../../.github/workflows/validate.yml), at the root of this repository. It is the real workflow that checks every lesson, including this one, before it can be merged. It has four jobs:

- **`structure`** runs `node scripts/validate-projects.mjs` and `node scripts/build-readmes.mjs --check`: the same kind of mechanical structure check you are about to add for the exhibit, applied here to lesson content and its generated READMEs.
- **`secrets`** downloads a pinned version of the `gitleaks` command-line tool and scans the whole Git history for credentials. It checks out with `fetch-depth: 0` (the full history, not just the latest commit) because a secret committed once and later deleted is still in that history.
- **`links`** runs `lycheeverse/lychee-action` against every Markdown file, accepting a short list of HTTP status codes (`403`, `429`) that mean "a real site refused an automated request", not "the link is broken".
- **`accessibility`** installs a pinned version of `pa11y` and audits every `completed/index.html` in the repository in headless Chrome, with `--no-sandbox` and SwiftShader flags because the runner has no GPU and normally blocks Chrome's sandbox. Its own comments say exactly what you will rediscover in Step 4: `pa11y` cannot see inside a 3D canvas, which is why the manual "3D and XR" checklist exists alongside it.

Every job you write from here on reuses one of these four ideas: a mechanical check, a security scan, a link check, or a headless accessibility audit.

### Step 3: the validate job (TODO 4)

In `workflows/deploy.yml`, the `validate` job runs first. It checks out the code, then:

```yaml
- name: Validate HTML
  run: |
    npm install --no-save html-validate@11
    npx html-validate --rule "no-redundant-role:off" --rule "prefer-native-element:off" --rule "long-title:off" 'app/**/*.html'
- name: Check links
  uses: lycheeverse/lychee-action@v2
  with:
    args: >-
      --no-progress --exclude-loopback --max-retries 3 --timeout 30
      --accept 200,202,206,403,429
      'app/**/*.html'
    fail: true
```

`html-validate` checks the markup itself (unclosed tags, invalid attributes); `lychee` checks that every link in it actually resolves. Neither needs an account or an API key. The three rules turned off would otherwise flag the exhibit's own deliberate choices: `role="list"` on a styled `<ul>`/`<ol>` (restores list semantics for older Safari VoiceOver), a landmark built with `role="region"` on a `<div>`, and titles that are descriptive rather than short.

### Step 4: the accessibility job (TODO 5)

`accessibility` runs after `validate` (`needs: validate`). It installs `pa11y`, exactly as the case study's own job does, and audits `app/index.html`:

```yaml
- name: Audit the exhibit
  run: |
    echo '{ "chromeLaunchConfig": { "args": ["--no-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] }, "timeout": 120000 }' > /tmp/pa11y.json
    npx pa11y --config /tmp/pa11y.json --standard WCAG2AA "file://$PWD/app/index.html"
```

This checks the rendered DOM: every label, heading, and live region around the 3D view. It cannot look inside the WebGL canvas, so `tests/checklist.md` still needs its "3D and XR (manual)" section for a person to check the scene itself.

### Step 5: the build job (TODO 6)

`build` runs after `accessibility`. GitHub's own official actions package a static site as a "Pages artifact":

```yaml
- uses: actions/configure-pages@v6
- uses: actions/upload-pages-artifact@v5
  with:
    path: app
```

`configure-pages` reads your repository's Pages settings; `upload-pages-artifact` zips the folder you name and stores it for the deploy job to publish. There is no build tool here because the exhibit is plain HTML, CSS, and JavaScript; a project using a bundler would run its build command first, and upload that command's output folder instead.

### Step 6: manual approval, then deploy (TODOs 7-8)

`approve` runs after `build`, and does almost nothing itself: one step that echoes a message. What matters is `environment: name: production`, matching the environment you created in Setup. GitHub pauses the run at this job until a required reviewer approves it from the Actions tab — the same review a pull request gets, but for a release.

`deploy` runs after `approve`, with its own `permissions: pages: write` and `id-token: write` (Pages authenticates with a short-lived OpenID Connect token, so only this one job should be allowed to request it):

```yaml
environment:
  name: github-pages
  url: ${{ steps.deployment.outputs.page_url }}
steps:
  - id: deployment
    uses: actions/deploy-pages@v5
```

The `github-pages` environment is created automatically the first time this runs; its URL then appears next to every deployment in your repository's **Environments** tab.

### Step 7: release notes (TODO 9)

The `release` job runs only when the push was a version tag (`if: startsWith(github.ref, 'refs/tags/v')`). It uses the GitHub CLI, `gh`, already installed on every runner — no extra action or account:

```yaml
- name: Create the release
  env:
    GH_TOKEN: ${{ github.token }}
  run: gh release create "${{ github.ref_name }}" --title "${{ github.ref_name }}" --generate-notes
```

`--generate-notes` builds the notes from commits and merged pull requests since the previous tag, so writing good commit messages and pull request titles is part of writing good release notes.

### Step 8: the rollback workflow (TODOs 10-12)

`rollback.yml` is a second, separate file, started only by hand (`workflow_dispatch`), never on push. TODO 10 adds a `tag` input, so the Actions tab shows a text box for it. TODO 11 repeats the build job, but passes `ref: ${{ inputs.tag }}` to `actions/checkout`, so it checks out that exact tag instead of the current branch. TODO 12 repeats the approval and deploy jobs unchanged, then adds a `note` job that uses `gh release view` and `gh release edit` to append a line to that tag's existing release, recording that it went live again, when, and who approved it.

A rollback here never rewrites history or deletes a bad release: it republishes an older, already-tested one, honestly, with a record of what happened.

### Step 9: mainland-China-friendly options, cautiously

GitHub Actions and GitHub Pages are both free, but GitHub's domains are slow or blocked for some visitors in mainland China. Write a short paragraph, for your own dashboard or notes, naming two options without committing to either: **Gitee Go**, a CI/CD product on the Chinese platform Gitee that can build and deploy to a server you control, and a **self-hosted runner**, which keeps your workflow files here on GitHub while the machine that executes them sits on a network closer to your audience. Gitee Pages, Gitee's own free static-hosting product, stopped serving in 2024, so do not suggest it. Note, in your own words, that hosting terms change, and anyone relying on this should check the current terms themselves.

### Step 10: an end-to-end dry run

Push a small change to `main`, watch every job run in order in the Actions tab, approve the pause when it appears, and confirm the exhibit loads at its live Pages URL. Then push a tag (`git tag v0.1.0 && git push origin v0.1.0`) and confirm a GitHub Release appears with generated notes. Finally, run `rollback.yml` by hand against that same tag, and confirm the release gains its rollback note.

## Key code explained

**`needs: validate`.** A job with no `needs` starts immediately; naming another job's id here makes GitHub Actions wait for it to succeed first, which is how a pipeline becomes a sequence instead of six jobs racing each other.

**`environment: name: production`, with no `url`.** An environment does not have to deploy anything: naming one here is only a way to attach that environment's protection rules (required reviewers) to this one job.

**`permissions` on a job, not only at the top of the file.** The top-level `permissions: contents: read` is the default every job gets; a job that needs more, like `deploy`'s `pages: write` and `id-token: write`, states it there, so no other job in the file can request the same access by accident.

**`if: startsWith(github.ref, 'refs/tags/v')`.** `github.ref` is the full ref that triggered the run (`refs/heads/main` for a branch, `refs/tags/v1.0.0` for a tag); checking its prefix is how a job runs only for tagged releases, not every push.

**`${{ steps.deployment.outputs.page_url }}`.** A step's `id` lets a later expression read what it produced; `deploy-pages` outputs the live URL, and the environment's `url` field is how it ends up shown next to the deployment in GitHub's own UI.

## 3D and XR accessibility

The exhibit itself already meets its own accessibility requirements (Course 3.7 built them: a scene description, a full 2D twin, keyboard controls, and a reduced-motion check with a pause button). This project does not change any of that; it makes sure a pipeline never publishes a version that breaks it.

`pa11y`, in the accessibility job, reads the rendered page: it checks labels, headings, contrast, and status messages, but it cannot see whether the WebGL canvas actually shows the fox, the truck, or anything at all. That gap is exactly what the case study's own comment says about the repository's `accessibility` job, and it is why `tests/checklist.md` keeps a manual "3D and XR" section: after every deploy, and especially after every rollback, a person still opens the live URL and checks the scene by eye and by keyboard.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| The dashboard has one clear heading, and a logical heading order | 1.3.1, 2.4.6 | Screen-reader users skim a page by its headings. |
| Every section is reachable and readable without JavaScript | 4.1.2 | The dashboard is static; nothing should depend on a script running. |
| Status and result text ("Approved.", a pipeline failure) is never colour alone | 1.4.1 | Some readers cannot see colour, and some jobs' logs are colourless text. |
| Links describe their destination in their own text, not "click here" | 2.4.4 | A link read out of context must still make sense. |
| Text meets 4.5:1 contrast against its background | 1.4.3 | Reuses this repository's existing colour tokens, already checked. |

## Performance considerations

The exhibit itself needs no build step, so `upload-pages-artifact` uploads it directly: a larger project would add a build job first, and its own performance budget (bundle size, image weight) belongs there, not in the deploy job. Keeping validation, the accessibility audit, and the build as separate jobs, each with `needs`, also means a fast failure: an invalid link fails in seconds, well before the slower accessibility audit or a deploy even starts, so a broken pull request never idles a runner waiting for the approval step.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Putting `pages: write` and `id-token: write` at the top of the file | Every job, not only `deploy`, can request a Pages deployment token | Set those permissions on the `deploy` job alone |
| Expecting the approval to work with no environment configured | The job runs immediately; nothing pauses | Create the `production` environment, and tick Required reviewers, in Settings |
| Treating a rollback as deleting the bad release | The release history stops matching what was actually shipped | Redeploy the old tag, and add a note; never delete the record |
| Copying `deploy.yml` into `workflows/.github/workflows/` inside this lesson folder | Nothing runs: GitHub only reads `.github/workflows/` at a repository's root | Copy it to `.github/workflows/` at the root of your own repository |
| Forgetting `--generate-notes` (or a `body`) on `gh release create` | The release publishes with no notes at all | Always pass `--generate-notes`, or write notes yourself |

## Troubleshooting

**The Actions tab shows no runs at all.** Check the workflow file is at `.github/workflows/deploy.yml`, at your repository's root, not inside a `workflows/` folder anywhere else, and that you pushed it to the branch named in `on: push: branches:`.

**The `approve` job is stuck, but nothing seems to be waiting.** Open the run itself (not just the Actions tab list); GitHub shows the "Review pending deployments" prompt on the run's own page, not on the repository's main Actions list. Firefox and Safari show it in the same place.

**`deploy` fails with a permissions or "not authorized" error.** Check `permissions: pages: write` and `id-token: write` are set on the `deploy` job itself, and that Settings → Pages → Source is "GitHub Actions", not "Deploy from a branch".

**`gh: command not found`, locally.** `gh` is preinstalled on GitHub-hosted runners; on your own machine, install the [GitHub CLI](https://cli.github.com/) if you want to test release commands before pushing.

**The live site shows an old version after a rollback.** Check you approved the rollback's own pause in the Actions tab (Step 8); a run left waiting for approval never deploys.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: add a `workflow_dispatch` "dry run" option to `deploy.yml` that runs validation and the accessibility audit only, with no deploy.
2. **[Creative](challenges/challenge-2.md)**: rewrite the release dashboard's wording and the release-notes template for your own project, community, or language.
3. **[Explorer](challenges/challenge-3.md)**: add a staging environment, deployed on every push to `main`, with production still gated behind manual approval and a tag.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take a screenshot of a completed Actions run (all jobs green) and one of the live GitHub Pages URL.
3. Keep them in your learner journal and portfolio. Share them with other developers: see [where to share your work and ask for help](../../docs/en/community.md).
4. In your journal, answer: what would go wrong if `deploy` ran with no `needs: approve`, and why does that matter more for a real project than for this exercise?

## Further reading

- [GitHub Actions documentation](https://docs.github.com/en/actions)
- [GitHub Docs: Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub Docs: Using environments for deployment](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)
- [GitHub CLI manual: `gh release`](https://cli.github.com/manual/gh_release)
- [pa11y documentation](https://github.com/pa11y/pa11y)

## Women to Know

**Fernanda G. Weiden** is a Brazilian free-software advocate from Porto Alegre. She was a founding council member of the Free Software Foundation Latin America (2005), served as FSFE Vice President from 2009 to 2011, contributed to Debian and Debian Women, and helped organise the FISL conference. She later led production and site-reliability engineering at Google and Facebook, before serving as CTO of VTEX from 2022 to 2023.

Production and site-reliability engineering is exactly this lesson's territory: keeping something real running, safely, after it ships. Fernanda's path, from community free-software organising to leading production engineering at some of the largest platforms in the world, shows that the two are not separate careers.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

GitHub Actions workflows are YAML, a data format defined by the [YAML specification](https://yaml.org/spec/), and GitHub Pages serves plain HTTP over TLS, standardised by the IETF. Manual-approval environments and OpenID Connect deployment tokens are GitHub's own platform features, not a web standard, but the accessibility this pipeline checks for is: WCAG 2.2, published by the W3C's Web Accessibility Initiative, is what `pa11y`'s `--standard WCAG2AA` flag actually tests against.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
