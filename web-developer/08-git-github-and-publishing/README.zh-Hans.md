# Git、GitHub 与发布

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程:** `web-developer` · **课时:** `git-github-and-publishing-08` · **时长:** 约 9 小时 · 12 次学习，每次 45 分钟 · 每周 4 次，约 3 周

---

> 发布第一阶段的作品集和项目合集。

---

## 学习目标

完成本项目后，你将能够：

1. 解释什么是版本控制，以及什么是仓库、提交、分支和 `main`。
2. 解释 Git 和 GitHub 的区别：Git 是一个工具，GitHub 是一个存放 Git 仓库的网站。
3. 为发布准备一个文件夹：文件名整齐、链接在网上能用、没有任何私密内容。
4. 只用浏览器创建仓库、上传文件并提交修改。
5. 用 GitHub Desktop 克隆一个仓库，在自己的电脑上修改，提交，然后推送。
6. 用 Markdown 写一份 README，让陌生人知道你的项目是什么、怎么使用。
7. 用 GitHub Pages 发布一个网站，并在手机上测试它。
8. 选择一份许可协议，解释为什么代码和文字内容常常使用不同的许可协议，并为别人的作品署名。
9. 大致解释什么是复刻（fork）和拉取请求（pull request）。

## 先决条件

- **课程 0.1：欢迎来到 XR Camp。** 你已经有了第一个 3D 世界，放在一个叫 `my-first-world` 的文件夹里。
- **课程 1.1–1.6。** 你已经有了 Riverside Community Centre（河畔社区中心）网站或你自己的网站，包括报名表单、无障碍审查和项目浏览器。
- **一个你能收到邮件的电子邮箱地址**，用来注册免费的 GitHub 账号。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| 一个现代浏览器 | 使用 GitHub 网站，并测试你发布的网站 | 免费 |
| 一个 GitHub 账号 | 存放并发布你的仓库 | 免费 |
| [GitHub Desktop](https://desktop.github.com/)（Windows 或 macOS） | 在你自己的电脑上操作仓库 | 免费 |
| 一个文本编辑器（推荐 VS Code） | 编写你的合集页面和 README | 免费 |
| 一部手机（可选，但推荐） | 3D 时刻：在真实设备上打开你的世界 | 用你自己的 |

如果你用的是 Linux，或者在一台不能安装程序的电脑上，就全部使用第 6 步和第 7 步中的浏览器操作方式。这足以完成整节课。

## 你将构建什么

一个**公开仓库**，存放你在第一阶段构建的每一个项目，并发布成一个真正的网站，有自己的网址，你可以把它发给任何人：

- 一个**项目合集页面** `index.html`：你发布的网站的首页，每个项目都有一张卡片和一个清楚的链接。
- 一份 **README**，向任何找到这个仓库的人说明它。
- 一份**许可协议**，说明别人可以怎样使用你的作品；以及对所有你用到但不是你做的东西的**署名**。
- 你的 **3D 世界**，放到网上，在你自己的手机上打开。

参考解决方案在 [`completed/`](completed/) 中：Ana 的合集页面，以及示例 README、许可协议和 `.gitignore` 文件。起始文件包括带有十个 TODO 的合集页面，以及带有九个 TODO 的 README 模板。

## 文件夹说明

```text
08-git-github-and-publishing/
├── README.md               # This guide
├── README.es.md            # Spanish
├── README.zh-Hans.md       # Simplified Chinese
├── project.json            # Lesson metadata
├── starter/
│   ├── index.html          # Begin here: your collection page, with 10 TODOs
│   └── README-template.md  # Your repository's README, with 9 TODOs
├── completed/              # Reference solution: open this last
│   ├── index.html          # Ana's collection page
│   ├── README-example.md   # A model README
│   ├── LICENSE-example     # The MIT Licence, filled in
│   └── gitignore-example   # A small .gitignore
├── challenges/             # Three extensions
├── tests/checklist.md      # Self-review before you submit
├── assets/
└── screenshots/
```

## 环境配置

1. 在你的 `xr-camp` 文件夹中，为本课新建一个文件夹，命名为 `web-projects`。这个文件夹将成为你的仓库。
2. 把课程 0.1 中 `my-first-world` 文件夹的一份**副本**复制进去，再把课程 1.1–1.6 中网站文件夹的一份**副本**复制进去，并改名为 `riverside`（或者你自己网站的一个简短名字）。在副本上操作，原件就能保持安全。
3. 把 `starter/index.html` 和 `starter/README-template.md` 复制到 `web-projects` 中，并把模板改名为 `README.md`。

你的文件夹现在是这样的：

```text
web-projects/
├── index.html          # your collection page
├── README.md           # your README
├── my-first-world/
│   └── index.html
└── riverside/
    ├── index.html
    ├── join.html
    ├── audit.html
    ├── styles.css
    └── explorer/
        └── ...
```

> **如果你在中国大陆。** GitHub 和 GitHub Pages 在那里可能很慢或不稳定，有些日子可能根本打不开。许多人曾经用来代替它的 Gitee Pages，已经在 2024 年停止服务。托管方案会变化，所以请到[开发者互相帮助的社区](../../docs/en/community.md)（英文）问问现在什么方法可行。除了上传和发布，本课的其他内容都可以离线完成：Git 和 GitHub Desktop 会把你的完整历史保存在你自己的电脑上，而你的合集页面可以直接从文件夹中打开。你现在就可以完成第 1–5 步和第 11 步，等网络条件允许时再发布。

## 分步讲解

### 规划你的学习时间

| 次数 | 学习内容 | 完成成果 |
| --- | --- | --- |
| 1 | 环境配置；第 1 步：版本控制；第 2 步：你的 GitHub 账号 | 一个已开启双重身份验证的账号 |
| 2 | 第 3 步：准备你的文件夹 | 一个整齐、没有任何私密内容的文件夹 |
| 3 | 第 4 步：合集页面（TODO 1–7） | 一个链接到你的 3D 世界和网站的首页 |
| 4 | 第 4 步（续，TODO 8），并测试每一个链接 | 一个在你的电脑上能正常工作的完整合集页面 |
| 5 | 第 5 步：README | 一份陌生人也能照着做的 `README.md` |
| 6 | 第 6 步：创建仓库并上传文件 | 你的项目放在 GitHub 上，这是你的第一次提交 |
| 7 | 第 7 步：提交和历史（TODO 9） | 第二次提交，以及一份你读得懂的历史 |
| 8 | 第 8 步：GitHub Pages | 你的合集有了一个真正的网址 |
| 9 | 第 9 步：在线测试，以及 **3D 时刻** | 你的 3D 世界在你自己的手机上打开 |
| 10 | 第 10 步：GitHub Desktop | 一处在电脑上做的修改，已推送并上线 |
| 11 | 第 11 步：许可协议、署名和 `.gitignore`；[挑战 1](challenges/challenge-1.zh-Hans.md)（TODO 10） | 仓库中有了许可协议和署名 |
| 12 | 第 12 步：分支、复刻和拉取请求；[`tests/checklist.md`](tests/checklist.md)；**提交作业** | 一个已发布、已测试的合集，并把网址记在学习日志中 |

### 第 1 步：什么是版本控制

你可能保存过这样的文件：`site-final.html`、`site-final-2.html`，还有 `site-final-REALLY.html`。**版本控制**把这件事做得更好：它记住每个文件的每一个版本，谁改了它、什么时候改的、为什么改，还能让你回到其中任何一个版本。

你需要知道的词：

| 词 | 意思 |
| --- | --- |
| **仓库**（Repository，简称「repo」） | 一个会记录历史的项目文件夹：每个文件，加上它以前的每一个版本。 |
| **提交**（Commit） | 整个项目在某一时刻的快照，附带一条简短的消息，说明改了什么。你的历史就是一串提交。 |
| **分支**（Branch） | 仓库中一条独立的工作线，让你可以尝试新东西，而不改变主版本。 |
| **`main`** | 主分支：大家看到的版本，也是 GitHub Pages 会发布的版本。 |
| **克隆**（Clone） | 仓库在你自己电脑上的完整副本，包含全部历史，并且仍然与原仓库相连。 |
| **推送**（Push） | 把你的新提交从电脑发送到 GitHub。 |

**Git** 是做版本控制的工具。它在你的电脑上运行，是免费的开源软件。**GitHub** 是一个在网上存放 Git 仓库的网站，让你可以分享仓库、和别人一起工作，并发布它们。先有 Git；GitHub 是围绕 Git 建立的多个服务之一。

### 第 2 步：你的 GitHub 账号

1. 打开 [github.com](https://github.com/)（英文）并注册。
2. **仔细选择你的用户名。** 它会成为你网站网址的一部分，雇主也可能看到它。它不必是你的真实全名：简短、专业、容易拼写的名字最好。
3. 如果 GitHub 还没有要求你开启，就在账号设置中开启**双重身份验证**（two-factor authentication）。你的仓库将存放你的作品集：要像保护你的邮箱一样保护它。
4. 在 **Settings → Emails**（设置 → 电子邮件）中，开启 **Keep my email addresses private**（保持我的电子邮件地址私密）。这样 GitHub 就会在你的提交中使用一个私密的「noreply」地址，而不是你的真实地址。

### 第 3 步：准备你的文件夹

一个从电脑上打开时能正常工作的网站，放到网上仍然可能出问题。上传任何东西之前，先检查四件事。

**1. 名称。** 使用小写字母、数字和连字符：`my-first-world`、`join.html`、`centre-960.jpg`。不要有空格，不要有带重音的字母，也不要用中文。

**2. 大小写必须完全一致。** 在 Windows 和 macOS 上，`Styles.css` 和 `styles.css` 通常会打开同一个文件。但在运行 GitHub Pages 的服务器上，它们是两个不同的文件，所以指向 `Styles.css` 的链接什么也找不到。在你的 HTML 中找出每一个 `href` 和 `src`，把每一个都和真实的文件名逐个字母地对照。

**3. 链接必须是相对链接。** 像 `riverside/join.html` 或 `../styles.css` 这样的链接在哪里都能用。以 `C:\Users\...` 或 `file:///` 开头的链接指向的是**你的**电脑，对其他所有人都是坏的。在你的文件中搜索 `C:\` 和 `file:`，把找到的都改掉。

**4. 没有任何私密内容。** 你上传到公开仓库的一切，任何人都能读到，而且很难彻底删除。检查每一个文件，包括注释，看看有没有：

- 任何形式的密码、密钥或验证码。
- 你的家庭住址、电话号码，或者别人的。
- 没有同意公开的真实人物的照片，尤其是孩子的照片。
- 你本来不想放进去的文件：笔记、草稿、下载的文件。

每一个作为页面的文件夹，都需要一个叫 `index.html` 的文件：当有人访问 `.../my-first-world/` 时，服务器会在那个文件夹中寻找 `index.html`。

### 第 4 步：合集页面（TODO 1–8）

在编辑器和浏览器中打开 `index.html`。它是你仓库的首页：人们打开你的网址时看到的第一样东西。样式已经写好了，所以你只需要写 HTML。

逐个完成 TODO 1–8：

- **TODO 1–3** 在 `<head>` 中：页面的语言、描述和标题。标题是屏幕阅读器说出的第一句话，也是浏览器标签页上的名字，所以要让它说明这是谁的项目。
- **TODO 4–5** 是你的名字和自我介绍。你不必使用真实全名。这个页面将会公开。
- **TODO 6–8** 是卡片：每个项目一张。每张卡片是一个列表项：

  ```html
  <li class="card">
    <h3>Programme explorer</h3>
    <p class="course">Course 1.6</p>
    <p>Search and filter the centre's programmes as you type.</p>
    <p class="built-with">Built with HTML, CSS, and JavaScript.</p>
    <p class="view"><a href="riverside/explorer/index.html">Use the programme explorer</a></p>
  </li>
  ```

**链接文字必须说明链接去哪里。** 屏幕阅读器用户可以把页面上所有的链接列出来，脱离上下文来听。五个都写着「View project」（查看项目）的链接听起来一模一样；而「Visit my first 3D world」（访问我的第一个 3D 世界）和「Use the programme explorer」（使用项目浏览器）就不会。

然后**测试每一个链接**：从你的文件夹中打开页面，逐个点击。再按 **Tab** 键走遍整个页面：跳转链接应该最先出现，每个链接都应该显示清楚的焦点轮廓。

TODO 9 和 10 在后面的第 7 步和第 11 步中完成。

### 第 5 步：README（Markdown）

**README** 是仓库的大门。GitHub 会把 `README.md` 显示在文件列表下方，所以它是访客最先读到的东西。你的 README 要回答：这是什么？我怎样看到它？它是怎样做出来的？里面有谁的作品？我可以怎样使用它？

`.md` 表示 **Markdown**：纯文本，加上几个符号，GitHub 会把它们变成标题、列表和链接：

```markdown
# A heading (level 1)
## A smaller heading (level 2)

A paragraph is just text. **Two stars** make bold text.

- A list item
- Another list item

[Words people click](https://example.com/)
![Alt text that describes the picture](screenshots/home.png)
```

它和 HTML 的作用一样，只是打字更少：`#` 就是 `<h1>`，`##` 就是 `<h2>`，`-` 是一个列表项。标题仍然要按顺序排列，链接文字仍然要说明链接去哪里。

打开你的 `README.md`，逐个完成其中的 TODO。完成后，和 [`completed/README-example.md`](completed/README-example.md) 对比。你发布的网站的网址（TODO 3）要到第 8 步才有：现在先留着。

### 第 6 步：创建仓库并上传文件

1. 在 GitHub 上，打开任意页面顶部的 **+** 菜单，选择 **New repository**（新建仓库）。
2. 把它命名为 `web-projects`。加上一句话的描述。
3. 选择 **Public**（公开）。在免费账号上，GitHub Pages 只发布公开仓库。
4. 让添加 README、`.gitignore` 和许可协议的选项保持**关闭**：你会带上自己的文件。
5. 选择 **Create repository**（创建仓库）。

你的新仓库是空的，GitHub 会显示一页设置说明。找到 **upload an existing file**（上传现有文件）的链接。（在一个已经有文件的仓库中，它在 **Add file → Upload files**（添加文件 → 上传文件）下面。）

6. 在电脑上打开你的 `web-projects` 文件夹。选中**里面的所有东西**：`index.html`、`README.md` 和那两个文件夹。把它们拖到上传页面上。你可以拖动整个文件夹。
7. 在文件列表下方，写一条**提交消息**：`Add Phase 1 projects and collection page`。
8. 选择 **Commit directly to the `main` branch**（直接提交到 `main` 分支），然后按绿色按钮提交。

这就是你的第一次提交。你的文件和 README 现在出现在仓库的首页上了。

拖动的是 `web-projects` 的**内容**，而不是这个文件夹本身。如果你拖的是文件夹，所有东西都会深一层，落在 `web-projects/web-projects/` 里，Pages 就找不到你的 `index.html` 了。

浏览器一次最多可以上传 100 个文件，每个文件必须小于 25 MB。如果文件更多，就分几轮上传，每轮一次提交。

### 第 7 步：提交和历史（TODO 9）

现在在浏览器中做一个小修改，看看 Git 是怎样记住它的。

1. 在仓库首页打开 `index.html`，选择**铅笔**图标来编辑它。
2. 完成 TODO 9：添加一个指向你的仓库的链接。它的网址就是你浏览器地址栏中现在显示的：`https://github.com/your-username/web-projects`。
3. 提交，消息写 `Link to the repository from the collection page`。

现在打开仓库的**历史**：在文件列表顶部附近，有一个带时钟图标、显示提交次数的链接。你会看到每一次提交，最新的在最前面，附有消息、作者和时间。选择其中一次，GitHub 会准确显示改了什么：删除的行是红色，添加的行是绿色。

**好的提交消息**用一句简短的话说明这次提交做了什么：「Fix the broken link to the join form」（修复指向报名表单的坏链接）、「Add a card for the programme explorer」（为项目浏览器添加一张卡片）。将来的你在寻找某个东西是什么时候坏掉的时，会感谢现在的你。「Update」（更新）和「changes」（修改）什么也没告诉她。

什么都不会丢失：以前的每一个版本都保留在历史中。

### 第 8 步：GitHub Pages

**GitHub Pages** 能把一个仓库变成一个网站。

1. 在你的仓库中，打开 **Settings**（设置），然后在侧边菜单中打开 **Pages**。
2. 在 **Build and deployment**（构建和部署）下，把 **Source**（来源）设为 **Deploy from a branch**（从分支部署）。
3. 在 **Branch**（分支）下，选择 **`main`**，文件夹保持 **`/ (root)`**（根目录），然后选择 **Save**（保存）。
4. 等待。最多可能要 10 分钟。刷新 Pages 设置页面：网站准备好后，会显示你的网址和一个 **Visit site**（访问网站）按钮。

你的网址是：

```text
https://your-username.github.io/web-projects/
```

打开它。这就是你的合集，在真正的互联网上。任何地方的任何人都能打开它。

从现在起，**每一次提交到 `main`，都会在几分钟内自动更新你的网站**。回到你的 README，完成 TODO 3（你的网址），然后提交。

关于 GitHub Pages，要知道三件事：

- **它是公开的。** 把你发布的网站上的一切都当作全世界任何人都能看到。
- **它是用来放静态网站的**：HTML、CSS、JavaScript、图片和 3D 模型。它不能保存人们在你的报名表单中输入的内容。表单仍然会打开它的「thanks」（感谢）页面，但什么也不会保存；而且因为表单使用 `method="get"`，输入的内容会出现在感谢页面的网址中。在线测试时，请使用编造的信息。GitHub 也说明，Pages 网站不应该用于敏感交易，例如发送密码或信用卡号码。
- **它有限额**，但对作品集来说很宽裕：一个已发布的网站最大可以有 1 GB。

名字恰好是 `your-username.github.io` 的仓库，会变成网址为 `https://your-username.github.io/` 的网站，不带文件夹名。每个账号可以有一个。现在先把这个名字留着：你可能会想把它用在你的作品集上。

### 第 9 步：在线测试

打开你发布的网站，在**那里**测试，而不是在你的电脑上：

1. 点击合集页面上的每一个链接。出现 **404** 页面，意味着某个路径或大小写不一致（第 3 步）。
2. 检查每个页面上的样式和图片都加载出来了。
3. 打开项目浏览器，保存一个项目，然后刷新。它的 `localStorage` 在网上也能用，但和你电脑上的那一个是分开的：对浏览器来说，不同的网址就是不同的网站。
4. 然后在手机上完成下面的 **3D 时刻**。

### 第 10 步：GitHub Desktop

做小修改，浏览器就够了。真正干活时，你会在自己的电脑上、在编辑器里修改文件，再把它们发送到 GitHub。**GitHub Desktop** 让这件事变得简单，不需要输入命令。

1. 安装 [GitHub Desktop](https://desktop.github.com/)（英文），打开它，用你的 GitHub 账号登录。
2. **克隆**你的仓库：在仓库的 GitHub 页面上，打开绿色的 **Code**（代码）菜单并选择 **Open with GitHub Desktop**（用 GitHub Desktop 打开）；或者在 GitHub Desktop 中选择 **File → Clone repository**（文件 → 克隆仓库）。选择存放位置，然后点 **Clone**（克隆）。

   选择一个**不**被 OneDrive、Dropbox 或 iCloud 同步的文件夹：同步应用和 Git 可能会互相干扰。克隆下来的文件夹现在是你的工作副本；原来的 `web-projects` 文件夹可以留作备份。
3. 在编辑器中打开克隆的文件夹，做一处修改：改进合集页面上的一段项目描述。保存。
4. 在 GitHub Desktop 中，**Changes**（更改）标签页会列出这个文件，并显示改动的行。在左下角写一段摘要（也就是你的提交消息），然后选择 **Commit to main**（提交到 main）。
5. 你的提交现在只在你的电脑上。选择 **Push origin**（推送到 origin）把它发送到 GitHub。
6. 等一两分钟，刷新你发布的网站。你的修改已经上线了。

**克隆和下载是不同的。** **Code → Download ZIP**（代码 → 下载 ZIP）给你的是文件现在的样子：没有历史，也和 GitHub 没有联系。克隆给你的是完整的历史，以及一个你可以从中提交和推送的副本。

**如果你也在浏览器中编辑**，你的电脑还不知道那些提交。在 GitHub Desktop 中开始工作之前，先选择 **Fetch origin**（从 origin 获取），如果它提示，再选择 **Pull origin**（从 origin 拉取）。先拉取，再工作，然后提交，最后推送：这个习惯能避免大多数问题。

### 第 11 步：许可协议、署名和 .gitignore

**许可协议。** 许可协议是一段简短的法律文字，说明别人可以拿你的作品做什么。没有许可协议，法律会把所有权利都给你，任何人都不能复制、修改或分享你的作品。在 GitHub 上，人们仍然可以查看和复刻一个公开仓库，因为 GitHub 的条款允许这样做，但他们不能做更多的事。如果你希望别人从你的代码中学习并重复使用它，就用一份许可协议说清楚。

**代码和文字内容通常使用不同的许可协议**，因为它们是不同种类的作品：

- **软件许可协议**，例如 **MIT 许可协议**（MIT Licence），是为代码写的。MIT 很短：任何人都可以使用、复制、修改和分享代码，只要保留你的版权声明和许可协议文字；如果代码出了问题，你不承担责任。它是 GitHub 上最常见的许可协议之一。
- **知识共享（Creative Commons）许可协议**是为文字、图片、视频和音乐写的。知识共享组织自己建议**不要**把它的许可协议用于软件：它们没有处理软件需要的东西，例如源代码。

XR Camp 正是这样做的。它的仓库有两个许可协议文件：[`LICENSE-CODE`](../../LICENSE-CODE) 用于代码，[`LICENSE-CONTENT`](../../LICENSE-CONTENT) 用于课程和文档，采用 **CC BY-NC-SA 4.0**：

| 部分 | 意思 |
| --- | --- |
| **BY** | 署名：注明作者。 |
| **NC** | 非商业性使用：不能用它来赚钱。 |
| **SA** | 相同方式共享：如果你修改并分享它，要使用同样的许可协议。 |

对于你的仓库，[`completed/`](completed/) 中的示例对代码使用 MIT 许可协议，对文字和图片保留所有权利。选择你觉得合适的方式。你的项目是从 XR Camp 的起始文件发展出来的，所以要为 XR Camp 署名，并读一读 `LICENSE-CODE`，看看它允许什么。

在浏览器中添加许可协议：选择 **Add file → Create new file**（添加文件 → 创建新文件），把它命名为 `LICENSE`，GitHub 会提供一个 **Choose a license template**（选择许可协议模板）按钮。填上年份和你的名字，然后提交。

**署名。** 所有你用到但不是你做的东西，都需要署名：它的标题、作者、来源和许可协议。A-Frame（MIT）、XR Camp 的课程、一张照片、一种字体。把它们放在你 README 的 **Credits**（致谢）部分，或者像每一节 XR Camp 课程那样，放在单独的 `ATTRIBUTION.md` 中。挑战 1 会带你完成这两种做法。

**`.gitignore`。** 放在仓库顶层、名为 `.gitignore` 的文件，列出 Git 永远不应该添加的文件。GitHub Desktop 和命令行 Git 会遵守它；但浏览器上传会原样添加你拖进去的文件，所以拖之前要检查。

```text
.DS_Store
Thumbs.db
.env
private/
```

`.DS_Store`（macOS）和 `Thumbs.db`（Windows）是电脑自己生成的文件。`.env` 是开发者经常用来存放密钥的文件。`private/` 会忽略整个文件夹。参见 [`completed/gitignore-example`](completed/gitignore-example)。

**永远不要提交密码、密钥或个人数据。** 在之后的提交中删除一个文件，**并不会**把它从历史中去掉：任何人仍然可以打开旧的提交并读到它。如果某个秘密信息被提交过，就把它当作已经公开：立刻修改密码，或者作废那个密钥。

### 第 12 步：分支、复刻和拉取请求

你一直都在 `main` 上工作，对个人项目来说这没问题。团队的工作方式不同，你在课程 2.7 中也会这样工作。基本思路是这样的：

- **分支**是一条独立的工作线。你创建一个叫 `new-card` 的分支，在那里修改东西，而 `main` 和你已上线的网站会保持原样。
- **拉取请求**（pull request）请求把一个分支上的修改合并到另一个分支中。它会显示每一行改动，在任何人按下 **Merge**（合并）之前，大家都可以在上面发表评论。
- **复刻**（fork）是**别人**仓库的一份属于你自己的副本，放在你的账号下。你修改自己的复刻，然后发起一个拉取请求，向原仓库建议你的修改。

开源就是这样运作的，XR Camp 也一样：在你的复刻中修正某节课里的一个错别字，发起一个拉取请求，然后由一位维护者审查并合并它。挑战 3 让你在自己的仓库中试一试分支和拉取请求。

## 关键代码解析

**`href="riverside/join.html"`。** 一个**相对**路径：「从这个页面所在的位置，进入 `riverside`，然后打开 `join.html`」。它在你的电脑上和网上都能用，因为这些文件夹是一起移动的。

**`index.html`。** 当网址以文件夹名结尾时，服务器发送的文件。`https://your-username.github.io/web-projects/` 会发送 `web-projects/index.html`。

**`[Words people click](address)`。** 一个 Markdown 链接。规则和 HTML 一样：文字要说明它去哪里。

**`.gitignore` 的每一行。** 每行一个模式。写一个名字，会在任何位置忽略这个文件；以 `/` 结尾的名字会忽略整个文件夹；`*` 表示「任何内容」，所以 `*.key` 会忽略所有以 `.key` 结尾的文件。

许可协议中的 **`Copyright (c) 2026 Ana`**。许可协议只有写明谁拥有权利才有效。把年份和名字换成你自己的。

## 3D 时刻

你在课程 0.1 中做的第一个 3D 世界就在你的仓库里，在 `my-first-world/` 中，所以它已经发布了：

```text
https://your-username.github.io/web-projects/my-first-world/
```

1. 在你的**手机**上打开这个网址。直接输入会很慢：可以在电脑上打开你的合集页面，把链接发给自己；或者输入更短的合集网址，再点击指向你的世界的链接。
2. **检查它加载出来了。** 过一会儿，天空和形状就会出现。用手指拖动来四处看看。如果页面一直是白的，说明 A-Frame 还在从网上下载：等一等，再刷新一次。
3. **检查它仍然无障碍。** 发布后的世界必须仍然能做到它在你电脑上做到的一切：
   - **场景描述**在页面上，而且仍然和你的世界相符。
   - **Pause animation**（暂停动画）按钮能让移动的形状停下来，再让它重新开始。
   - 在手机的无障碍设置中开启**减少动态效果**后，动画根本不会开始。
4. 在手机上给你的世界截一张图，放进你的学习日志。

你在 XR Camp 第一个小时里做出的世界，现在已经在互联网上了，你只要发送一个链接，就能给任何人看。XR Camp 中的每一个 3D 项目都会用同样的方式发布。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| 合集页面有一个说明这是谁的项目的标题 | 2.4.2 | 这是屏幕阅读器说出的第一句话，也是标签页上的名字。 |
| 每个链接都说明它去哪里 | 2.4.4 | 要写「Use the programme explorer」（使用项目浏览器），而不是「View」（查看）。 |
| 项目是一个真正的列表，有真正的标题 | 1.3.1 | 屏幕阅读器会朗读「列表，5 项」，并且可以在标题之间跳转。 |
| 设置了页面的语言 | 3.1.1 | 屏幕阅读器会使用正确的语音。 |
| 一个跳转链接，以及可见的焦点轮廓 | 2.4.1、2.4.7 | 键盘用户可以直接跳到项目，而且总能看到自己在哪里。 |
| 发布后的 3D 世界保留它的描述和暂停按钮 | 1.1.1、2.2.2 | 发布不能让它失去原本让它无障碍的东西。 |
| README 中的截图有替代文本 | 1.1.1 | README 也是一个网页。 |
| README 的标题按顺序排列，链接文字具有描述性 | 良好做法（不是 WCAG 规则） | 使用屏幕阅读器的人也会阅读仓库。 |

## 性能注意事项

你的整个合集大概只有几 MB，其中大部分是图片；一个 HTML 页面只有几 KB。GitHub Pages 很快，但它不能把大图片变小：让每张图片都控制在 XR Camp 的 1 MB 预算以内，并使用课程 1.4 中的响应式图片。A-Frame 是从 `aframe.io` 加载的，而不是从你的仓库，所以它不计入你的网站。不要把你不发布的大文件放进仓库，例如原始照片和视频：你提交的每个文件都会留在历史中，让每一次克隆都变得更大。

## 常见错误

| 错误做法 | 会发生什么 | 正确做法 |
| --- | --- | --- |
| 上传的是文件夹，而不是它的内容 | 你的网站深了一层；网址显示 404 | 拖动 `web-projects` **里面**的文件和文件夹 |
| 链接中写 `Styles.css`，磁盘上是 `styles.css` | 在你的电脑上能用，在网上找不到 | 大小写完全一致；使用小写文件名 |
| 以 `C:\` 或 `file:///` 开头的链接 | 除了你，对所有人都是坏的 | 使用相对链接：`riverside/index.html` |
| 像「update」这样的提交消息 | 你在历史中什么也找不到 | 说明改了什么：「Fix the join form link」（修复报名表单链接） |
| 在新的提交中删除密码 | 它仍然在历史中 | 永远不要提交它；如果已经提交了，立刻修改 |
| 在浏览器和电脑上都编辑，却没有拉取 | GitHub Desktop 拒绝推送 | 先 **Fetch**（获取）和 **Pull**（拉取），再工作 |
| 没有许可协议 | 没有人可以合法地重复使用你的作品 | 添加一个 `LICENSE` 文件 |
| 克隆到 OneDrive、Dropbox 或 iCloud 文件夹中 | 奇怪的冲突和重复的文件 | 克隆到一个不被同步的文件夹中 |

## 故障排查

**我的网址显示 404 页面。** 开启 Pages 后等 10 分钟，再刷新。然后在 **Settings → Pages** 中检查：分支是 `main`，文件夹是 `/ (root)`；并且 `index.html` 在仓库的顶层，而不是在另一个文件夹里。文件名必须恰好是 `index.html`，全部小写。

**我的网址显示的是 README，而不是合集页面。** 只有在没有 `index.html` 的时候，GitHub Pages 才会把 `README.md` 当作首页。检查 `index.html` 是否在顶层，并且拼写为小写。

**页面能加载，但没有样式或图片。** 某个 `href` 或 `src` 中的路径或大小写和真实文件不一致。打开浏览器的开发者工具，在 **Console**（控制台）中找到缺失文件的名字，逐个字母地对照。

**我的修改没有出现在网站上。** 你提交了吗？如果用的是 GitHub Desktop，推送了吗？Pages 需要几分钟来更新。然后不使用缓存重新加载：**Ctrl + Shift + R**（在 Mac 上是 **⌘ + Shift + R**；在 Safari 中是 **⌘ + Option + R**）。在手机上，关闭标签页，再重新打开网址。

**GitHub Desktop 不能推送：它说有更新的提交。** 自从你上次拉取以来，有人（很可能是你自己在浏览器中）向 GitHub 提交了内容。依次选择 **Fetch origin**、**Pull origin**，然后 **Push origin**。

**我的 3D 世界在手机上是白的。** 检查手机是否联网：A-Frame 第一次需要从网上下载。如果还是不出现，就在电脑上打开同一个网址。如果在电脑上能用，那么可能是手机不支持 WebGL：页面上的场景描述正是为这种情况准备的。

## 拓展挑战

三个拓展，位于 [`challenges/`](challenges/)：

1. **[基础](challenges/challenge-1.zh-Hans.md)**（必做）—— 为你的仓库添加许可协议和署名。
2. **[创意](challenges/challenge-2.zh-Hans.md)** —— 用你自己的语言写一份 README。
3. **[探索](challenges/challenge-3.zh-Hans.md)** —— 创建一个分支，修改一些东西，然后用拉取请求合并它；或者试试在命令行中使用 Git。

## 提交作业

1. 完成 [`tests/checklist.md`](tests/checklist.md) 中的每一项。
2. 把你发布的网址和仓库的网址写进学习日志。
3. 把你的 3D 世界在手机上的截图，以及一张合集页面的截图，保存在学习日志和作品集中。也可以和其他开发者分享你发布的网址（参见[在哪里分享你的作品](../../docs/en/community.md)，英文）。
4. 在学习日志中回答：你会把网址发给的第一个人是谁？你希望对方看到什么？

## 延伸阅读

- [GitHub 文档：关于 Git](https://docs.github.com/en/get-started/using-git/about-git)（英文）
- [GitHub 文档：创建新仓库](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)（英文）
- [GitHub 文档：向仓库添加文件](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)（英文）
- [GitHub 文档：为 GitHub Pages 网站配置发布来源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)（英文）
- [GitHub 文档：GitHub Pages 的限制](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)（英文）
- [GitHub 文档：在 GitHub Desktop 中提交和审查更改](https://docs.github.com/en/desktop/making-changes-in-a-branch/committing-and-reviewing-changes-to-your-project-in-github-desktop)（英文）
- [GitHub 文档：为仓库授予许可](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository)（英文）
- [GitHub 文档：忽略文件](https://docs.github.com/en/get-started/git-basics/ignoring-files)（英文）
- [Choose a License](https://choosealicense.com/)（选择许可协议，英文）

## 值得认识的女性

**Tracy Chou** 是一位软件工程师，曾是 Quora 和 Pinterest 的早期工程师之一。2013 年 10 月，她在 GitHub 上发起了一个众包仓库，收集科技公司中女性工程师的数据：个人和公司都可以把自己的数字添加进去。2018 年，她创办了 Block Party，这是一个对抗网络骚扰的工具，后来发展成一个社交媒体隐私工具；2026 年 3 月，DeleteMe 收购了 Block Party。

仓库不只是用来放代码的。Tracy Chou 用一个仓库，公开地收集那些很难找到的数字，任何人都能看到它们，也能往里面添加。你在本课中学到的一切（一个公开仓库、一份说明它的 README、来自许多人的提交）都可以成为推动改变的工具。

> **编辑说明 —— 发布前须核实。** 「值得认识的女性」栏目中的生平陈述必须与原始资料核对，并在可行时于本课上线前与本人确认。参见 [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md)。

## 标准聚焦

**Git** 是免费的开源软件，所以任何人都可以使用它、研究它，并用它托管仓库。**Markdown** 最初没有精确的定义，所以不同的工具会把同一个文件显示得不一样；**CommonMark** 是一份对它定义严格的规范，而 GitHub Flavored Markdown（GitHub 风格的 Markdown）是 CommonMark 的严格超集。许可协议也有标准的简称：**SPDX** 许可协议列表给每一种许可协议一个标识符，例如 `MIT` 和 `CC-BY-NC-SA-4.0`，让工具能够读懂它们。开放源代码促进会（Open Source Initiative）负责批准哪些许可协议属于「开源」：MIT 获得了批准；CC BY-NC-SA 4.0 没有，因为它禁止商业使用。

## 许可协议

代码：[`LICENSE-CODE`](../../LICENSE-CODE) · 内容：[`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
