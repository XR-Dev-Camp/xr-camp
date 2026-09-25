# Challenge 3: Explorer

**Optional.** Roughly 45 minutes.

Make a branch, change something, and merge it with a pull request. Or, try Git on the command line.

## Task A: a branch and a pull request, in the browser

1. On your repository's front page, open the **branch** menu (it says `main`). Type a new name, `new-card`, and choose **Create branch**. You are now on `new-card`.
2. Open `index.html`, edit it, and add a card for something new: a challenge you completed, or a project you are planning. Commit to `new-card`.
3. Reload your published site. Nothing has changed: Pages publishes `main`, and your change is only on `new-card`.
4. GitHub offers a **Compare & pull request** button. (If not, open the **Pull requests** tab and choose **New pull request**, with `new-card` compared to `main`.) Give it a title, describe what you changed and why, and create it.
5. Read your own pull request: the **Files changed** tab shows every added and removed line. This is where, in a team, someone would review your work.
6. Choose **Merge pull request**, and confirm. Then delete the branch when GitHub offers.
7. Wait a few minutes, and reload your site. The new card is live.

You can do the same in GitHub Desktop: **Branch → New branch**, commit, **Publish branch**, then **Create Pull Request**.

## Task B: Git on the command line

Git began as a command-line program, and every tool you have used this week runs the same Git underneath. Install Git from [git-scm.com](https://git-scm.com/), open a terminal (on Windows, **Git Bash**, which comes with it), and try:

```sh
git clone https://github.com/your-username/web-projects.git   # copy the repository
cd web-projects                                               # go into it
git status                                                    # what has changed?
git log --oneline                                             # the history, one line each
```

Change a file in your editor, then:

```sh
git status                                  # your file is listed as modified
git add index.html                          # choose it for the next commit
git commit -m "Improve the introduction"   # save the snapshot, with a message
git push                                    # send it to GitHub
```

The first time you push, Git asks you to sign in to GitHub. GitHub no longer accepts your account password for this. If a sign-in window opens in your browser, use it; if not, [GitHub Docs: Caching your GitHub credentials in Git](https://docs.github.com/en/get-started/git-basics/caching-your-github-credentials-in-git) explains how to set it up.

## Why this matters

Branches and pull requests are how every software team works, and how you will contribute to open source, including XR Camp, in Course 2.7. The command line is the same Git without the buttons: tutorials, job interviews, and servers all use it.

## Done when

- [ ] **Task A:** your history shows a merged pull request, and the change is on your live site.
- [ ] **Or Task B:** you have cloned, committed, and pushed from the command line, and `git log --oneline` shows your commit.
