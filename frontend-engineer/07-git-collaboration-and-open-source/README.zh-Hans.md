# Git 协作与开源

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程：** `frontend-engineer` · **课时：** `git-collaboration-and-open-source-07` · **时长：** 约 9 小时 · 12 次学习，每次 45 分钟 · 每周 4 次，约 3 周

---

> 通过一个议题和一次拉取请求完成一次贡献。

---

## 学习目标

完成本项目后，你将能够：

1. 解释一个开源项目是如何运作的：维护者、贡献者、许可证、`CONTRIBUTING.md`，以及行为准则。
2. 撰写一条清晰的**议题（issue）**，并用标签来组织工作。
3. 创建一个**分支（branch）**，并发起一个链接到对应议题的**拉取请求（pull request）**。
4. 友善而有效地**审查（review）**别人的拉取请求，并回应对你自己拉取请求的审查意见。
5. 解决一次**合并冲突（merge conflict）**，并解释它为什么会发生。
6. 通过 **fork（分叉）** 为一个不属于你的项目做贡献。
7. 撰写**发布说明（release notes）**，为版本打标签，并发布一个 release。

## 先决条件

- **课程 1.8：Git、GitHub 与发布。** 你已经有了 GitHub 账号，并且已经提交（commit）和推送（push）过代码。
- **课程 2.3：应用架构。** 小步提交，一次只改一件事。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| 一个 GitHub 账号（来自课程 1.8） | 议题、拉取请求、审查、release | 免费 |
| GitHub Desktop，或终端中的 Git | 在你的电脑上创建分支和合并 | 免费 |
| VS Code | 解决合并冲突 | 免费 |
| 一位学习伙伴（推荐） | 互相审查对方的工作 | 免费 |

**没有伙伴？** 每一步都可以一个人完成：你自己扮演两个角色，从一个分支发起拉取请求，再自己审查它。这样没那么有趣，但学到的技能是一样的。

**如果 GitHub 在你所在地区较慢或被屏蔽：** GitHub 在中国大陆可以使用，但可能较慢或不太稳定。你可以完全在 **Gitee**（gitee.com）上完成整节课，它也有中文的议题、拉取请求、审查和 release 功能：把 `starter/practice-copy/` 中的文件上传到一个新的 Gitee 仓库中。Gitee 注册需要手机号，并且可能会先审核新的公开仓库，之后其他人才能看到它。你也可以完全只用 Git，在自己的电脑上练习分支、合并和冲突，完全不需要任何账号。

## 你将构建什么

这次不是一个页面，而是一份**贡献记录**。在你自己那份 XR Camp 练习仓库的副本中，你会开设议题、通过拉取请求修复它们、审查伙伴的工作、解决一次合并冲突、修复一个 3D 场景中真实存在的无障碍问题，并发布一个带有说明的 release。每一步都会留下一条公开、可链接的记录，你可以在作品集或面试中展示它。

这个练习仓库是一个**模板（template）**：<https://github.com/XR-Dev-Camp/contribution-practice>。你永远不会直接向它发送改动：你会创建自己的副本，这样你就是这个副本的维护者，可以放心地犯错误。

[`completed/`](completed/) 文件夹展示了 Ana 的副本最终的样子，包含示例拉取请求、审查意见和发布说明。

## 文件夹说明

```text
07-git-collaboration-and-open-source/
├── README.md            # 本指南
├── README.es.md         # 西班牙语
├── README.zh-Hans.md    # 简体中文
├── project.json         # 课时元数据
├── starter/
│   ├── practice-copy/   # 练习仓库的文件，用于 Gitee 或离线使用
│   └── contribution-log.md   # 在这里记录每一个议题、审查和拉取请求
├── completed/           # Ana 完成后的作品和示例文字
│   ├── index.html, 3d/index.html   # 修复后的页面
│   ├── CHANGELOG.md, pull-request-example.md, contribution-log.md
├── challenges/          # 三个拓展挑战：基础挑战为必做
├── tests/checklist.md   # 提交前的自查清单
├── assets/
└── screenshots/
```

## 环境配置

1. 登录 GitHub。打开 <https://github.com/XR-Dev-Camp/contribution-practice>，按下 **Use this template → Create a new repository**。命名为 `contribution-practice`，设为 **Public（公开）**，并创建它。
2. 邀请你的学习伙伴：**Settings → Collaborators → Add people**。也接受对方的邀请，这样你们就可以在彼此的副本中工作了。
3. 开启 Pages：**Settings → Pages**，**Deploy from a branch**，选 `main`，`/ (root)`，**Save**。几分钟后，你的学习技巧墙就会上线。
4. 把 `starter/contribution-log.md` 复制到一个安全的地方：你的学习日志，或者你的作品集仓库。

## 分步讲解

### 规划你的学习节奏

| 节次 | 你要做的事 | 完成后你将拥有 |
| --- | --- | --- |
| 1 | 环境配置：你的副本、一位伙伴、Pages | 你自己的练习仓库，已上线 |
| 2 | 第 1 步：开源是如何运作的 | 你已经像贡献者一样读过 `CONTRIBUTING.md` |
| 3 | 第 2 步：议题与标签 | 你的仓库中有六个议题 |
| 4 | 第 3 步：一个分支和你的第一个拉取请求 | 一个写着 `Fixes #3` 的拉取请求 |
| 5 | 第 4 步：审查 | 你第一次审查伙伴的工作 |
| 6 | 第 5 步：回应与合并 | 你第一个被合并的拉取请求 |
| 7 | 第 6 步：一次故意制造的合并冲突 | 一个已解决的冲突 |
| 8 | 第 7 步：**3D 时刻** | 一个已合并的无障碍 3D 示例 |
| 9 | 第 8 步：fork 与真实项目 | 你知道如何在任何地方做贡献了 |
| 10 | 第 9 步：发布说明与一次 release | 1.1.0 版本，已发布 |
| 11 | [`tests/checklist.md`](tests/checklist.md) | 一份完整的贡献记录 |
| 12 | 一个拓展挑战，然后是**提交作业** | 一份可以展示的贡献记录 |

### 第 1 步：开源是如何运作的

**开源（open-source）**软件以一种允许任何人阅读、使用、修改和分享它的许可证发布。Web 的很大一部分都建立在开源之上：A-Frame、three.js、Git 本身，以及你用来测试的浏览器，绝大部分都是用开源代码构建的。

每个项目中的人都扮演着两种角色：

- **维护者（maintainer）**决定哪些内容会被采纳。他们负责审查、合并和发布。他们往往是志愿者，时间有限。
- **贡献者（contributor）**提出改动建议：任何人都可以，包括你。

在为任何项目做贡献之前，先读三个文件：**README**（这是什么）、**CONTRIBUTING.md**（他们希望你如何帮忙），以及**许可证**（你可以用它做什么）。许多项目还有一份**行为准则（code of conduct）**：人们应该如何彼此相待。现在就去读一读你练习仓库中的 `CONTRIBUTING.md`。在开始一个大改动之前，你必须先做什么？

### 第 2 步：议题与标签

**议题（issue）**是关于某件待办事项的公开记录：一个 bug、一个想法、一个问题。好的议题能为所有人节省时间。比较一下：

| 弱 | 强 |
| --- | --- |
| 「3D 页面坏了」 | 「3D 示例：屏幕阅读器完全没有提及场景的任何信息」 |
| 「不能用」 | 复现步骤、你期望发生什么、实际发生了什么、你使用的浏览器 |

在你的副本中打开 `GOOD-FIRST-ISSUES.md`。针对每一个问题，开一个新议题（**Issues → New issue**）：模板会引导你回答正确的问题。给每一个议题打上标签：**bug**、**enhancement**，或 **good first issue**。标签能让贡献者找到适合自己的工作。和你的伙伴分工这些议题，并各自**分配（assign）**给自己，这样你们就不会同时修复同一个问题。

### 第 3 步：一个分支和你的第一个拉取请求

在一个共享项目中，永远不要直接在 `main` 上工作。创建一个**分支（branch）**：一条独立的工作线，在被审查之前不会影响 `main`。

先从标题里的那个拼写错误开始（议题 3），直接在浏览器中操作：打开 `index.html`，按下铅笔图标（**Edit this file**），修复它，然后选择 **Create a new branch for this commit and start a pull request**。把分支命名为 `fix-heading-typo`。

在**拉取请求（PR）**中，填写模板，并在「Why?」下面写上 `Fixes #3`。当这个 PR 被合并时，GitHub 会自动关闭议题 3。然后请你的伙伴进行审查（右侧的 **Reviewers**）。

用 GitHub Desktop 或终端来做同样的事情，看起来是这样的：

```bash
git switch -c fix-heading-typo     # 创建一个分支并切换到它
# 编辑 index.html，然后：
git commit -am "Fix the typo in the study tips heading"
git push -u origin fix-heading-typo
```

### 第 4 步：审查

**代码审查（code review）**是团队中大部分学习发生的地方。打开你伙伴的 PR，进入 **Files changed** 标签页。点击某一行旁边的 **+** 号来评论它。要提出一个具体的修改建议，可以使用 **Insert a suggestion**：对方可以一键采纳它。

完成后，按下 **Review changes**，然后选择：

- **Comment（评论）**：提出问题或一些小想法。
- **Approve（批准）**：可以合并了。
- **Request changes（请求修改）**：有些东西必须先改一改。

友善而有用的审查意见是具体的，会解释原因，并且始终针对代码本身，而不是针对写代码的人：

| 没有帮助 | 有帮助 |
| --- | --- |
| 「这是错的。」 | 「描述里说这些形状会转动，但这个球没有动。你能说明一下具体是哪些形状会转吗？」 |
| 「颜色不好看。」 | 「`#999999` 在白色背景上的对比度大约是 2.8:1；WCAG 要求 4.5:1。`#595959` 就能通过。」 |
| （对做得好的地方只字不提） | 「很不错：这段替代文本写得非常清晰。」 |

批准之前先测试一下：打开该分支版本的页面，用键盘操作一遍。

### 第 5 步：回应与合并

当审查要求修改时，在**同一个分支**上进行修改并重新推送：PR 会自动更新。回复每一条评论（「已修复，谢谢」），并点击 **Resolve conversation**。不要把这当成针对你个人：每个开发者的代码每天都会收到审查意见。

一旦被批准，就**合并（merge）**它。GitHub 提供了三种方式：

- **Create a merge commit（创建合并提交）**：保留每一个提交，再加上一个把它们合并在一起的提交。
- **Squash and merge（压缩并合并）**：把 PR 中的所有提交合并成 `main` 上的一个干净的提交。适合小的修复。
- **Rebase and merge（变基并合并）**：把每个提交重新应用在 `main` 之上，不产生额外的合并提交。

在本课程中，使用 **Squash and merge**。然后删除这个分支（GitHub 会提供一个按钮）：它已经完成了自己的使命。

### 第 6 步：一次故意制造的合并冲突

当两个分支以不同的方式修改了同样的代码行时，就会发生**合并冲突（merge conflict）**。Git 无法知道你想要哪一种，所以它会请一个人来做决定。

和你的伙伴一起，在其中一个人的副本中故意制造一次冲突：

1. 你们俩都从 `main` 创建一个分支：`add-tip-ana` 和 `add-tip-lucia`（用你们各自的名字）。
2. 你们俩都按照 `CONTRIBUTING.md` 的要求，在 `index.html` 中**同一个列表的末尾**添加自己的学习技巧，并各自发起一个拉取请求。
3. 合并第一个。第二个现在会显示 **This branch has conflicts that must be resolved**。
4. 按下 **Resolve conflicts**。你会看到冲突标记：

```text
<<<<<<< add-tip-lucia
      <li>Explain your code to a friend who does not code. … (Lucía)</li>
=======
      <li>Read the error message out loud. … (Ana)</li>
>>>>>>> main
```

`=======` 上面的部分是一个分支的内容；下面的部分是另一个分支的内容。决定这个文件最终应该是什么内容（在这里：两条技巧都保留），删除这三行标记，按下 **Mark as resolved**，再按下 **Commit merge**。在 VS Code 中，同样的标记会带有按钮：**Accept Current Change**、**Accept Incoming Change**、**Accept Both Changes**。

冲突不是一个错误，也没有什么东西坏掉了。这是 Git 在小心谨慎地工作。

### 第 7 步：3D 时刻

议题 1 和 2 都和 `3d/index.html` 有关：地板上有三个形状，其中两个在旋转。使用屏幕阅读器的用户完全听不到关于这个场景的任何信息，而且这个旋转永远不会停止，即使对那些设备要求减少动效的人也是如此。分别用两个拉取请求修复它们，一个议题对应一个：

- **议题 1**：在场景前面添加一段带有 `id="scene-description"` 的段落，说明这些形状、它们的颜色，以及从左到右的排列顺序。
- **议题 2**：把循环播放的 `animation` 属性替换成一个小组件，让它检查一个 `motion.paused` 标志位；当 `prefers-reduced-motion: reduce` 被设置时以暂停状态开始，并添加一个带有 `aria-pressed` 的**暂停动画**按钮。你在课程 2.3 中正好做过一模一样的事情。

只有在你的 PR 被合并之后，才去查看 [`completed/3d/index.html`](completed/3d/index.html)。然后阅读 [`completed/pull-request-example.md`](completed/pull-request-example.md)：它展示了 Ana 针对议题 1 的 PR、审查意见，以及她的回复。

像这样的小型无障碍修复，是你能为真实的开源 3D 项目做出的最有价值的贡献之一：维护者往往很乐意接受这类修复，而且它们也很容易审查。

### 第 8 步：fork 与真实项目

在你的练习副本中，你是一名协作者。而在大多数真实项目中，你不是：你无法直接向它们推送分支。所以你要创建一个 **fork（分叉）**：一份连接到原始仓库（**上游，upstream**）的、属于你自己的副本。

1. 在该项目的页面上按下 **Fork**。
2. 在你的 fork 中创建一个分支，并在那里提交你的改动。
3. 发起一个**从你 fork 的分支，指向上游 `main` 分支**的拉取请求。GitHub 会通过一个 **Contribute** 按钮提供这个选项。
4. 维护者会像你的伙伴那样审查它。要耐心一些：他们可能需要几天甚至几周的时间。
5. 之后再开始新的工作之前，先用 **Sync fork** 把他们最新的改动同步过来。

模板会给你一份独立的副本；而 fork 则始终与它的原始仓库保持连接，这样你就可以把改动发回去。这就是两者的区别。

XR Camp 本身也欢迎贡献：拼写错误、更清晰的表述、翻译，以及无障碍方面的修复。在做出较大的改动之前，先阅读它的[贡献指南](../../.github/CONTRIBUTING.md)，并先开一个议题。

### 第 9 步：发布说明与一次 release

**release** 是一个可以被信赖的、有名字的版本：「1.1.0 能正常工作；1.2.0 新增了一个功能」。许多项目使用**语义化版本号（semantic versioning）**，形如 `MAJOR.MINOR.PATCH`：

- **PATCH**（1.0.**1**）：只有修复。
- **MINOR**（1.**1**.0）：新增了不会破坏任何东西的新功能。
- **MAJOR**（**2**.0.0）：可能会破坏人们所依赖内容的改动。

你的修复和新增的技巧构成了 **1.1.0**。在 `CHANGELOG.md` 中为使用这个项目的人撰写发布说明，而不是为你自己：对他们来说发生了什么变化，用简明的语言，附上议题编号。把你写的内容和 [`completed/CHANGELOG.md`](completed/CHANGELOG.md) 比较一下。

然后发布它：**Releases → Draft a new release**，创建标签 `v1.1.0`，起一个标题，粘贴你的说明（或者试试 **Generate release notes**，然后编辑它生成的内容），最后 **Publish release**。

## 关键代码解析

拉取请求描述中的 **`Fixes #3`**，会在这个 PR 被合并进默认分支时自动关闭议题 3。`Closes #3` 和 `Resolves #3` 效果相同。

**`git switch -c 名字`** 会创建一个新分支并切换到它。（较早的教程会用 `git checkout -b 名字`：效果是一样的。）

**冲突标记**：`<<<<<<<` 标记第一个版本的开始，`=======` 用来分隔它们，`>>>>>>>` 标记第二个版本的结束。留有标记的文件是坏的：一定要把这三种标记全部删除。

**`git tag v1.1.0`**：如果你从终端发布 release，这会给当前提交打上一个版本名称；然后用 `git push origin v1.1.0` 把它推送到 GitHub。GitHub 的 **Draft a new release** 会替你完成这两步。

## 无障碍要求

以下要求适用于你在练习仓库中修改的页面。

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| 页面设置了语言 | 3.1.1 | 屏幕阅读器会选择正确的朗读音色（议题 6）。 |
| 小号文字至少有 4.5:1 的对比度 | 1.4.3 | 每个人都能读清楚它（议题 4）。 |
| 3D 场景有文字描述 | 1.1.1 | 信息不会只存在于画面中（议题 1）。 |
| 动态内容可以被暂停 | 2.2.2 | 动效绝不会被强加给任何人（议题 2）。 |
| 审查者用键盘进行测试 | 2.1.1 | 无障碍性会在每一次审查中被检查，而不是等到最后才检查。 |

## 性能注意事项

这个 3D 示例中循环播放的动画，即使没有什么需要移动，也一直在运行。修复后的版本在 A-Frame 的帧循环内部检查一个标志位，暂停时就不再改变任何东西。审查正是发现这类浪费的好时机：问一句「这真的需要一直运行吗？」。

## 常见错误

| 错误 | 会发生什么 | 应该怎么做 |
| --- | --- | --- |
| 直接在 `main` 上工作 | 未经审查的改动会直接上线 | 每个改动都用一个分支 |
| 一个巨大的拉取请求 | 没有人能好好审查它 | 小的 PR，一个议题对应一个 |
| 没有先开议题 | 两个人修复了同一个问题，或者维护者拒绝了它 | 先开一个议题，或者认领一个 |
| 文件中留下了冲突标记 | 页面上会显示 `<<<<<<<` | 把这三种标记行全部删除 |
| 把审查意见当成针对个人的批评 | 你就无法从中学到东西了 | 评论针对的是代码，不是你 |
| 没读 `CONTRIBUTING.md` 就贡献 | 你的 PR 会被关闭 | 每个项目都要先读一读它 |

## 故障排查

**我无法向别人的仓库推送一个分支。** 你不是协作者。请对方把你加为协作者，或者做一个 fork（第 8 步）。

**Resolve conflicts 按钮是灰色的。** 这个冲突对浏览器编辑器来说太复杂了。用 VS Code 来解决：把两个分支都拉取下来，合并，修正标记，提交，再推送。

**`Fixes #3` 没有关闭这个议题。** 这个 PR 被合并进了一个不是默认分支的分支，或者这个关键词写在了拉取请求的标题或某条评论里，而不是它的描述中。手动关闭这个议题，并把 PR 链接过去。

**合并之后，我的 Pages 网站没有更新。** 等几分钟，然后不使用缓存重新加载页面（课程 1.8）。

**Gitee：我的仓库其他人看不到。** Gitee 上新的公开仓库可能会先经过审核。等一等，或者改用私有仓库，并把你的伙伴添加为成员。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)**：审查三个拉取请求，并写一份关于友善审查的简短指南。
2. **[创意](challenges/challenge-2.zh-Hans.md)**：通过一次拉取请求，把这个 3D 示例翻译成你的语言。
3. **[探索](challenges/challenge-3.zh-Hans.md)**：为一个真实的开源项目做出一次真实的贡献。

## 提交作业

1. 完成 [`tests/checklist.md`](tests/checklist.md) 中的每一项。
2. 你的贡献记录，连同其中的链接，就是你的提交内容：每一个议题、审查、拉取请求，以及那次 release。
3. 把它保存在你的学习日志和作品集中。也可以和其他开发者分享：参见[在哪里分享你的作品和寻求帮助](../../docs/en/community.md)（英文）。
4. 在你的学习日志中回答：对你工作的一次审查，教会了你什么是你自己无法独自发现的？

## 延伸阅读

- [GitHub Docs: About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)（英文）
- [GitHub Docs: Resolving a merge conflict on GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github)（英文）
- [GitHub Docs: About forks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks)（英文）
- [Open Source Guides: How to contribute to open source](https://opensource.guide/how-to-contribute/)（英文）
- [Semantic Versioning](https://semver.org/)（英文）

## 值得认识的女性

**Gabriela de Queiroz** 是一位在巴西长大的统计学家和数据科学家。2012 年，她在旧金山创立了 R-Ladies（现名 RLadies+），如今它已经发展成一个覆盖全球、拥有超过 200 个分会的网络，服务于 R 语言编程社区中的女性和性别少数群体。2023 年，她入选「100 位人工智能伦理领域杰出女性」榜单。

开源是由社区造就的，而不仅仅是代码。R-Ladies 最初只是一次聚会，后来变成了一个让成千上万女性找到她们第一批协作者、审查者和导师的地方——而这正是一位学习伙伴和一个练习仓库开始能够给予你的东西。

> **编者注：发布前请核实。** 「值得认识的女性」中的人物信息必须以一手资料核实，并在可行时于课程上线前与本人确认。参见 [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md)。

## 标准聚焦

开源许可证同样是标准化的：**开源促进会（Open Source Initiative，OSI）**会依据其「开源定义」来审核各种许可证，而 **SPDX** 会为每一种许可证提供一个简短、精确的标识符（`MIT`、`CC0-1.0`、`Apache-2.0`），这样工具和人都能一眼看出一个项目允许做什么。Web 标准也是以同样公开的方式开发的：W3C 和 WHATWG 都在 GitHub 上接受议题和拉取请求，所以本课所学的这些技能，正是人们为 Web 平台本身做贡献的方式。

## 许可协议

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
