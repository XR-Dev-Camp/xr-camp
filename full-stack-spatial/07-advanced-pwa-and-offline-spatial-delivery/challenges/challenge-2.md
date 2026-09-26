# Challenge 2: Creative

**Optional.** Roughly 45-60 minutes.

Customize the project so it reflects your own interests, community, or language.

## Task

1. Write a small JSON "postcard" file about a real place in your own community — a market, a park, a building, a landmark — with fields like `title`, `language`, `description`, and a couple of `facts` (short, true statements you can back up). Keep it under a few hundred words; this is data, not a document.
2. Save it as `assets/my-postcard.json`, and add a `bytes` entry for it (check its real size) to a new bundle manifest, `data/bundles/my-postcard.manifest.json`, following the same shape as `history-exhibit.manifest.json`.
3. Add your new bundle to `data/bundles.json`'s `bundles` array, with a `title` in your own language and a `sceneUrl` — for this challenge, `sceneUrl` can simply point to a short `postcard.html` page you write, which fetches and displays the downloaded JSON file's fields as ordinary, accessible HTML (a heading, a paragraph, and a list — no 3D needed for this one).
4. Download your new bundle from the bundle list, then confirm it opens and works with your browser offline.

## Why this matters

A scene bundle does not have to be a 3D scene: the manifest, download, and storage system this lesson builds works for any set of files a learner wants to make available offline. Building one around something from your own life is a genuine, low-risk way to prove you understand the whole pipeline, not only the one example this lesson ships with.

## Done when

- [ ] `data/bundles/my-postcard.manifest.json` lists your own file(s) and their real byte sizes.
- [ ] Your bundle appears in the bundle list, downloads with progress, and can be deleted.
- [ ] `postcard.html` shows your content, and still shows it with the browser offline, after the bundle has been downloaded once.
