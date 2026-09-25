# 挑战 3：探索

**选做。** 约 45 分钟。

创建一个分支，修改一些东西，然后用拉取请求（pull request）合并它。或者，试试在命令行中使用 Git。

## 任务 A：在浏览器中使用分支和拉取请求

1. 在仓库首页打开**分支**菜单（上面写着 `main`）。输入一个新名字 `new-card`，然后选择 **Create branch**（创建分支）。你现在就在 `new-card` 上了。
2. 打开 `index.html`，编辑它，为新的东西添加一张卡片：一个你完成的挑战，或者一个你正在计划的项目。提交到 `new-card`。
3. 刷新你发布的网站。什么都没有变：Pages 发布的是 `main`，而你的修改只在 `new-card` 上。
4. GitHub 会显示一个 **Compare & pull request**（比较并发起拉取请求）按钮。（如果没有，就打开 **Pull requests**（拉取请求）标签页，选择 **New pull request**（新建拉取请求），把 `new-card` 与 `main` 进行比较。）给它一个标题，描述你改了什么、为什么改，然后创建它。
5. 读一读你自己的拉取请求：**Files changed**（已更改的文件）标签页会显示每一行添加和删除的内容。在团队中，就是在这里由别人审查你的工作。
6. 选择 **Merge pull request**（合并拉取请求），然后确认。GitHub 提示时，删除这个分支。
7. 等几分钟，刷新你的网站。新卡片已经上线了。

你也可以在 GitHub Desktop 中做同样的事：**Branch → New branch**（分支 → 新建分支），提交，**Publish branch**（发布分支），然后 **Create Pull Request**（创建拉取请求）。

## 任务 B：在命令行中使用 Git

Git 最初是一个命令行程序，你这周用过的每一个工具，底层运行的都是同一个 Git。从 [git-scm.com](https://git-scm.com/)（英文）安装 Git，打开一个终端（在 Windows 上，用随 Git 一起安装的 **Git Bash**），然后试试：

```sh
git clone https://github.com/your-username/web-projects.git   # copy the repository
cd web-projects                                               # go into it
git status                                                    # what has changed?
git log --oneline                                             # the history, one line each
```

这几条命令依次是：复制仓库；进入仓库；查看改了什么；查看历史，每次提交一行。

在编辑器中修改一个文件，然后：

```sh
git status                                  # your file is listed as modified
git add index.html                          # choose it for the next commit
git commit -m "Improve the introduction"   # save the snapshot, with a message
git push                                    # send it to GitHub
```

这几条命令依次是：你的文件会被列为已修改；选择它放进下一次提交；保存快照并附上消息；发送到 GitHub。

第一次推送时，Git 会要求你登录 GitHub。GitHub 已经不再接受用账号密码来做这件事。如果浏览器中打开了登录窗口，就用它登录；如果没有，[GitHub 文档：在 Git 中缓存 GitHub 凭据](https://docs.github.com/en/get-started/git-basics/caching-your-github-credentials-in-git)（英文）说明了怎样设置。

## 为什么这很重要

分支和拉取请求是每一个软件团队的工作方式，也是你在课程 2.7 中为开源项目（包括 XR Camp）做贡献的方式。命令行就是没有按钮的同一个 Git：教程、求职面试和服务器都会用到它。

## 完成标准

- [ ] **任务 A：** 你的历史中有一个已合并的拉取请求，而且修改已经出现在你已上线的网站上。
- [ ] **或者任务 B：** 你已经在命令行中完成了克隆、提交和推送，并且 `git log --oneline` 显示了你的提交。
