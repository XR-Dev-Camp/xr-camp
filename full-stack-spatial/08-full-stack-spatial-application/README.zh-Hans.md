# Phase 5 Capstone - Full-Stack Spatial Application

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程：** `full-stack-spatial` · **课时：** `full-stack-spatial-application-08` · **时长：** 约 25 小时 · 34 次学习，每次 45 分钟 · 每周 4 次，约 9 周

---

> 把第 5 阶段的每一节课都整合进一个经过审查、修复了安全问题的全栈空间应用中，附带一份可选的 AI 描述草稿功能，以及针对本地环境或小型服务器的部署说明。

## 学习目标

完成本项目后，你将能够：

1. 把好几节课积累下来的服务器代码——一个 API、账户、一个数据库、实时房间，以及一次安全审查——整合进一个正在运行的应用中，而不重写任何已经能正常工作的部分。
2. 在写代码之前先阅读一份任务说明和一份评分标准，并对照评分标准的每一行来检查已完成的工作，而不是凭一种笼统的「完成了」的感觉。
3. 给一个已经加固过的代码库添加一项新功能，而不重新打开它已经修复的任何一个漏洞：复用每一次其他写入操作已经在用的同一个所有权检查、同一个清理函数，以及同一条 CSRF 规则。
4. 解释为什么一个会写入数据库的 AI 功能需要一个人工审核步骤，并构建一个让草稿永远无法自行到达存储层的机制。
5. 为一个小型应用编写部署说明，说明在你自己的电脑上运行它、和在一台你控制的小型服务器上运行它之间，什么会改变，什么绝不能改变。
6. 解释「一项功能已经完成」和「一项功能已经完成、*并且*依然能通过每一个此前写好的测试」之间的区别。
7. 撰写发布说明，向一个在构建过程中不在场的人，描述一个项目的某个具体版本实际发布了什么内容。

## 先决条件

- **课程 5.5：空间应用的安全与隐私**——这个结业项目从那一课已修复的服务器原样开始：经过清理的文本、一份严格的内容安全策略、一个从环境变量加载的密钥、一项 IDOR 检查、通用的错误消息，以及经过最小化处理的位置数据。
- **课程 5.3：数据库与空间应用数据**以及**课程 5.4：实时与多用户应用**——这个结业项目的服务器依然原样使用着的已保存场景模式和实时聊天房间。
- **课程 5.6：面向空间计算的人工智能**——这个结业项目自己的新功能所遵循的那种不依赖服务商的设计（一个「mock」服务商，并且绝不在未经审核的情况下保存一份 AI 回复）。
- 能够自如地阅读并扩展你不是刚从零开始写的服务器代码——本课的大部分内容是整合，而不是全新的架构设计。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| Node.js 22.5 或更高（推荐 LTS「24 Krypton」） | 运行服务器，包括 `node:sqlite` | 免费 |
| npm（随 Node.js 一起提供） | 安装本课唯一的依赖包 `ws` | 免费 |
| 一个文本编辑器（例如 VS Code） | 阅读并完成服务器和客户端代码 | 免费 |
| 一个浏览器（Chrome、Firefox、Safari 或 Edge） | 使用你构建的应用 | 免费 |

Node.js 可以从 [nodejs.org](https://nodejs.org/) 下载；中国大陆的学习者也可以使用 [npmmirror 的 Node.js 镜像](https://registry.npmmirror.com/binary.html?path=node/)。如果 `npm install` 很慢，改为运行 `npm install --registry=https://registry.npmmirror.com`。

## 你将构建什么

这是第 5 阶段一节课接一节课构建起来的**虚拟文化展览**的第九步，也是最后一步——和它之前的每一节课不同，这一节要求你把各个部分整合在一起，而不是独自添加一个新的部分。`starter/` 和 `completed/` 都从课程 5.5 那个已经修复好的服务器开始：一个带验证和环境变量的 API（5.1）、带哈希密码和会话的账户（5.2）、保存在 SQLite 中的场景和注释（5.3）、一个基于 WebSocket 的实时共享聊天房间（5.4），以及 5.5 全部七项安全修复——全都已经就位、没有改动，并且已经过测试。这些都不是这里的 TODO。

这个结业项目自己新添加的，是一项小小的、可选的新功能：一份场景的 **AI 描述草稿**，遵循课程 5.6 的规则——一份草稿绝不会自行被保存。一个确定性的、离线的「mock」服务商，会从一个场景自己的名称和注释出发，构建出一段简短的描述——没有网络调用，没有成本，也没有编造出任何原本不存在的东西——而一个人必须先阅读它，可以选择编辑它，然后选择「保存」，它才会被写入数据库。六个编号的 TODO（8-13，延续在 5.5 的 1-7 之后，那些已经修复好了）把这项功能端到端地接通：[`server/ai.js`](starter/server/ai.js) 构建草稿，[`server/routes.js`](starter/server/routes.js) 和 [`server/server.js`](starter/server/server.js) 暴露并路由它，[`js/ai.js`](starter/js/ai.js) 和 [`js/main.js`](starter/js/main.js) 从浏览器中调用它。[`completed/`](completed/) 是已完成的参考答案。在开始之前请先阅读 [`starter/brief.md`](starter/brief.md) 和 [`starter/rubric.md`](starter/rubric.md)——这个结业项目，就像课程 3.7 的结业项目一样，从一份任务说明开始。

在代码之外，这个结业项目还要求提供一个真实的小型项目在被任何人运行之前所需要的两份文档：[`deployment-notes.md`](deployment-notes.md)，解释如何在你自己的电脑上、或者在一台你控制的小型服务器上运行它，两种情况都不需要任何付费服务；以及 `CHANGELOG.md`，描述这个版本实际发布了什么。

## 文件夹说明

```text
08-full-stack-spatial-application/
├── README.md
├── deployment-notes.md        # running this on localhost, or a small server you control
├── starter/                   # begin here: brief.md, rubric.md, and 6 numbered TODOs (8-13)
│   ├── brief.md
│   ├── rubric.md
│   ├── index.html, styles.css
│   ├── js/                    # main.js, net.js, scene.js (carried over from 5.5, unchanged); ai.js (TODO 12)
│   ├── SECURITY.md
│   ├── CHANGELOG.md
│   └── server/
│       ├── migrations/                                    # numbered .sql files, run in order; 004 is new
│       ├── auth.js, cookies.js, sessions.js, rateLimit.js, wsAuth.js, rooms.js, realtime.js  # carried over, unchanged
│       ├── db.js, validation.js, sanitize.js, config.js, env.js                              # carried over, unchanged
│       ├── ai.js                                          # this capstone's new module (TODO 8)
│       ├── routes.js                                      # carried over, plus TODO 9 and TODO 10
│       ├── server.js                                      # carried over, plus TODO 11
│       ├── server.test.js
│       ├── package.json, .env.example, .gitignore
│       └── data/                                          # created at runtime, never committed
├── completed/                 # reference solution
│   ├── index.html, styles.css, js/, server/
│   ├── SECURITY.md, CHANGELOG.md
├── challenges/                # Three challenges: Foundation is required
├── tests/                     # self-review checklist
├── assets/
└── screenshots/
```

## 环境配置

1. 先阅读 [`starter/brief.md`](starter/brief.md) 和 [`starter/rubric.md`](starter/rubric.md)。
2. `cd starter/server`。
3. `npm install`（恰好安装 `ws@8.21.3`，锁定在仓库的 `versions.json` 中；不提交任何锁文件）。
4. 把 `.env.example` 复制为 `.env`，并设置你自己的 `APP_SECRET`（绝不要重用示例中的值）。
5. `npm start`，然后在浏览器中打开它打印出的地址。
6. 在第二个终端中，从同一个文件夹运行 `npm test`。十个测试中应该已经有八个通过——那些是延续自课程 5.5 的测试。剩下的两个，是针对这个结业项目自己的 AI 描述功能的，一旦你完成 TODO 8-13,它们就会通过。
7. 在你的编辑器中打开 `starter/index.html`，并配合下方的分步讲解。

## 分步讲解

### 规划你的学习节奏

| 节次 | 你要做的事 | 完成后你将拥有 |
| --- | --- | --- |
| 1 | 阅读 `brief.md` 和 `rubric.md`；浏览 5.1-5.7 已完成的文件夹，了解这个结业项目复用了什么。 | 一份关于什么已经完成、TODO 8-13 还需要什么的简短笔记。 |
| 2 | 配置 `starter/server`（`npm install`、`.env`、`npm start`），确认继承下来的应用能够原样运行。 | 起始应用运行在 `http://127.0.0.1:8891`。 |
| 3 | 完整阅读 `server/routes.js` 和 `server/db.js`：账户、场景和注释。 | 关于 `canView` 的笔记，以及哪个函数检查所有权、哪个只是读取的笔记。 |
| 4 | 阅读 `server/realtime.js`、`server/rooms.js`，以及 `server/server.js` 的内容安全策略。 | 关于实时聊天房间和 CSP 响应头两者是如何已经正常工作的笔记。 |
| 5 | 运行 `npm test`；在写任何新代码之前，确认全部八个继承下来的测试都通过。 | 一个已知良好的起点，落实成文字（一次通过的测试运行）。 |
| 6 | 创建一个账户，创建一个场景，添加一条注释，并发送一条聊天消息。 | 由你自己完整地、端到端地使用了一遍整个继承下来的应用。 |
| 7 | 阅读 `server/ai.js` 的注释，以及这份 README 中「带审核的 AI 描述草稿」部分。 | 在写 `describeScene` 之前，清楚地知道它必须做什么。 |
| 8 | 第 3 步：在 `server/ai.js` 中实现 `describeScene` 的模拟路径（TODO 8）。 | `describeScene` 为一个没有注释的场景返回一份真实的草稿。 |
| 9 | 确认 `describeScene` 也能处理一个有注释的场景，并拒绝一个不受支持的服务商。 | 一段提到了注释文字的描述，以及在其他情况下抛出的一个清晰的错误。 |
| 10 | 第 4 步：在 `server/routes.js` 中实现 `describeScene` 的路由处理函数（TODO 9）。 | `POST /api/scenes/:id/describe` 为场景的所有者返回一份草稿。 |
| 11 | 确认同一个路由对这个账户看不到的一个场景返回 404，与 `getScene` 保持一致。 | 这个草稿路由和其他每一个场景路由一样严格。 |
| 12 | 第 5 步：在 `server/routes.js` 中实现 `saveDescription` 的路由处理函数（TODO 10）。 | `PUT /api/scenes/:id/description` 为所有者保存一份经过清理的描述。 |
| 13 | 确认同一个路由拒绝一个非所有者，即使是在一个公开场景上。 | 一个比它旁边的读取路由更严格的保存路由。 |
| 14 | 第 6 步：在 `server/server.js` 中接通这两个新路由（TODO 11）。 | 两个路由都能通过 HTTP 访问，而不只是可以作为函数调用。 |
| 15 | 运行 `npm test`；确认描述草稿的测试通过。 | 10 个测试中有 9 个变绿。 |
| 16 | 再次运行 `npm test`；确认保存描述的测试通过。 | 10 个测试全部变绿。 |
| 17 | 阅读 `js/main.js` 中已有的账户、场景和聊天接线代码。 | 关于 TODO 12-13 将会复用的 `api()` 和 `showFieldErrors()` 模式的笔记。 |
| 18 | 第 7 步：在 `js/ai.js` 中实现 `requestDescriptionDraft`（TODO 12，第一部分）。 | 一个能正常工作、你可以在浏览器控制台中测试的网络调用。 |
| 19 | 第 7 步，续：在 `js/ai.js` 中实现 `saveDescription`（TODO 12，第二部分）。 | 两个客户端函数都已完成。 |
| 20 | 第 8 步（第一部分）：在 `js/main.js` 中实现 `renderSavedDescription`（TODO 13，第一部分）。 | 一旦存在一份已保存的描述，它就会显示在页面中。 |
| 21 | 第 8 步，续（第二部分）：在 `js/main.js` 中接通 Draft 和 Save 按钮（TODO 13，第二部分）。 | 在你的浏览器中，点击就能让整个功能正常工作。 |
| 22 | 手动测试：起草一份描述，编辑它，保存它，重新打开这个场景，确认它被持久保存了下来。 | 一份能在一次页面重新加载后依然存在的描述。 |
| 23 | 手动测试：确认一个能查看、但不拥有一个公开场景的账户，可以为它起草一份描述，但不能保存它。 | 仅限所有者保存的这条规则不仅被测试套件验证过，也被手动确认过。 |
| 24 | 对新的描述面板做一次仅用键盘的检查：用 Tab 键到达两个按钮和文本框。 | 确认整个功能在没有鼠标的情况下也能使用。 |
| 25 | 完整阅读 `deployment-notes.md`。 | 用你自己的话，对「我到底能在哪里运行这个东西？」给出一个清晰的答案。 |
| 26 | 阅读 `SECURITY.md` 和 `CHANGELOG.md`；如果你的构建有所不同，编辑 `CHANGELOG.md` 的 `1.0.0` 条目。 | 两份文档都准确地描述了你的构建。 |
| 27 | 无障碍检查：`#scene-description`、实时区域，以及整个页面的标题层级顺序。 | 通过自己大声朗读一遍，确认了与屏幕阅读器相关的文字是准确的。 |
| 28 | 一次减少动态效果的检查：确认当操作系统要求时，场景标记的动画会以暂停状态开始。 | 在你浏览器的模拟环境中，减少动态效果的行为是正确的。 |
| 29 | 在 390 像素和 1280 像素宽度下测试；修复任何横向溢出。 | 一个在两种宽度下都能正常工作的页面。 |
| 30 | 重新阅读 `server/validation.js` 和 `server/sanitize.js`；确认描述字段遵循与其他每一个已存储字段相同的规则。 | 确信这个应用中没有任何字段是「意外地」被以不同方式验证或清理的。 |
| 31 | 从头到尾完成 `tests/checklist.md`。 | 每一个方框都已勾选，或者对每一个未勾选的都做了修复。 |
| 32 | 完成基础挑战（`challenges/challenge-1.zh-Hans.md`）。 | 必做挑战完成。 |
| 33 | 选择创意或探索挑战，并开始动手。 | 你所选拓展的第一个可用版本。 |
| 34 | 完成你选择的挑战；最终提交：截图、重新检查过的清单，以及你对学习日志问题的回答。 | 一个准备好提交的结业项目。 |

### 第 1 步：阅读任务说明和评分标准

打开 [`starter/brief.md`](starter/brief.md) 和 [`starter/rubric.md`](starter/rubric.md)。就像课程 3.7 的结业项目一样，这一个也是从一份任务说明和一份评分标准开始的，而不仅仅是一份 TODO 列表——在写任何代码之前先把两者都读一遍。

### 第 2 步：浏览起始代码

在动手修改 `server/ai.js` 之前，先阅读 `server/routes.js`、`server/db.js`、`server/realtime.js` 和 `server/server.js`。这些文件全部都是课程 5.5 已修复的代码，没有任何改动。运行 `npm test`，确认它的全部八个测试都通过——这就是你已知良好的起点。

### 第 3 步：`server/ai.js` 的模拟服务商（TODO 8）

当 `AI_PROVIDER` 是 `"mock"`（默认值）时，`describeScene(scene, annotations)` 必须使用已经写好的辅助函数 `mockDescription()`，返回 `{ description, provider }`；在其他情况下，则要抛出一个指名这个服务商的 `AiConfigError`。这是本课中唯一一个若要接通一个真实的 AI 服务商就需要改动的文件——见它顶部的注释，以及本课的探索挑战。

### 第 4 步：`describeScene` 的路由处理函数（TODO 9）

在 `server/routes.js` 中处理 `POST /api/scenes/:id/describe`：查找这个场景，除非 `canView(scene, auth.user.id)`（这正是 `getScene` 在它上方两个函数已经使用过的同一个检查）为真，否则返回 404，然后调用 `server/ai.js` 的 `describeScene`，并返回它的结果。绝不能让这个函数向数据库写入任何东西。

### 第 5 步：`saveDescription` 的路由处理函数（TODO 10）

处理 `PUT /api/scenes/:id/description`：检查 `requireCsrf`，然后要求 `scene.ownerId === auth.user.id`——这刻意比第 4 步更严格，因为读取一个公开场景和写入它是不同的权限。验证请求体，像 `createAnnotation` 那样把它送进 `sanitizeText`，然后调用 `updateSceneDescription`。

### 第 6 步：接通这两个新路由（TODO 11）

在 `server/server.js` 中，匹配这两条新路径并调用 `requireAuth`，然后调用第 4-5 步中的那两个函数，遵循这个文件中每一个其他已认证路由已经使用的那种确切模式。

### 第 7 步：客户端的网络调用（TODO 12）

在 `js/ai.js` 中，`requestDescriptionDraft` 和 `saveDescription` 是两次 `fetch()` 调用，形式与 `js/main.js` 自己的 `api()` 辅助函数在这个应用其他地方已经使用的形式相同——一次草稿请求不需要 CSRF 令牌（它只读取），一次保存请求则需要（它会写入）。

### 第 8 步：接通描述面板（TODO 13）

在 `js/main.js` 中，`renderSavedDescription` 用 `textContent` 显示一份已保存的描述，两个点击监听器调用第 7 步的函数，并以这个文件中每一个其他表单已经使用的相同方式处理它们的结果——从结构上说，构建或更新一个场景的描述，和创建一个场景并不是一种特殊情况。

## 关键代码解析

- **`canView` 与仅限所有者的检查**：`describeScene` 的路由复用了 `getScene` 那个确切的 `canView` 检查（所有者或公开），因为读取一份草稿和读取场景本身一样敏感。`saveDescription` 使用了一个更严格的检查（只用 `scene.ownerId === auth.user.id`），因为写入并非如此：一个公开场景可以被任何人*读取*，但只有它的所有者才能改变它。
- **一份从不由构建它的文件保存的草稿**：`server/ai.js` 的 `describeScene` 永远只返回一个值——它从不调用一个数据库函数。整个这个应用中唯一能够写入一个 `description` 列的函数，是 `db.js` 的 `updateSceneDescription`，它恰好从一个地方被调用（`routes.js` 的 `saveDescription`），并且只有在一个人按下「保存」之后才会被调用。
- **模拟服务商是确定性的**：`mockDescription()` 只从一个场景自己的 `name`、`isPublic`，加上它注释中已经清理过的 `text` 构建它的句子——同一个场景总是产生同一份草稿，草稿中的任何内容都不曾对请求它的人隐藏过。
- **清理一份已保存的描述**：一份被一个人批准过的描述，一旦到达服务器，依然是用户可控的文本，因此 `saveDescription` 在存储它之前，会把它送进 `sanitize.js` 的 `sanitizeText`——和 `createAnnotation` 已经使用的是同一个函数。
- **`ALTER TABLE`，而不是一个新的迁移执行器**：`migrations/004_add_scene_description.sql` 给已有的 `scenes` 表添加了一列，由课程 5.3 构建的同一个迁移执行器运行；这个结业项目为了多保存一个字段，不需要任何新的数据库代码。

## 3D 与 XR 无障碍

这个 3D 视图和课程 5.4 引入的是同一个固定相机的 A-Frame 场景：一个盒子和一个文字标签，显示当前打开的是哪个场景，并配有一个用于其待机旋转的暂停/继续按钮。这个结业项目没有添加任何新的 3D 元素——描述面板刻意是一个 2D 表单，因为一份描述是用来阅读的文字，而不是能从空间化中受益的东西。`#scene-description` 依然从 3D 视图所使用的同一份数据描述当前打开的场景；它不会重复一份已保存的 AI 描述，后者在描述面板中有它自己可见的文字。每一种交互——打开一个场景、添加一条注释、起草并保存一份描述、发送聊天——都有一条完整的键盘路径，3D 视图旁边的 2D 场景详情列表携带着 3D 视图所显示的每一项事实。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| `#scene-description` 随着打开的场景更新 | 1.1.1、1.3.1 | 一位屏幕阅读器用户得到的事实，和一位视力正常的用户在 3D 视图中看到的完全相同。 |
| 描述面板的文本框有一个可见的、程序化的标签 | 1.3.1、2.5.3 | 这样一项辅助技术，以及一位快速扫视的视力正常用户，都能知道这个字段是做什么的。 |
| Draft 和 Save 都能仅用键盘到达并操作 | 2.1.1 | 这两个按钮都不是 3D 交互，但它们都位于一个紧挨着 3D 交互的面板中，这个应用的整条键盘路径必须保持完整不断。 |
| 场景标记的待机旋转在 `prefers-reduced-motion: reduce` 下以暂停状态开始 | 2.2.2 | 自行启动的动态效果必须能够暂停或被避免；当操作系统要求更少的动态效果时，这个应用干脆完全不启动它。 |
| 字段错误与它们所属的字段相关联，并会被播报 | 4.1.3（关于具体措辞的良好实践） | `showFieldErrors` 会写入相关控件旁边的一个 `role="list"`，与这个应用中的每一个其他表单保持一致。 |

## 性能注意事项

模拟 AI 服务商不发起任何网络调用，也不做任何有意义的计算——构建一份草稿的速度和字符串拼接一样快，因此这个结业项目本身不会带来任何新的性能问题。5.1-5.5 中每一条现有的考量都依然原样适用：每一次查询都使用预处理语句，登录尝试有一个速率限制，（聊天房间中的）位置更新被节流到一个合理的速率。如果你完成了探索挑战、接通了一个真实的 AI 服务商，请为网络延迟做好预算，并按照课程 5.6 的做法，为一次真实调用能够被发起的频率添加一个小的速率限制。

## 常见错误

| 错误 | 会发生什么 | 应该怎么做 |
| --- | --- | --- |
| 直接从 `describeScene` 的路由中保存一份草稿，跳过审核步骤 | 一句 AI 生成的话到达了数据库，却从未有任何人读过它 | 只从 `saveDescription` 中调用 `updateSceneDescription`，并且只在一个人按下「保存」之后 |
| 把 `saveDescription` 也复用成 `getScene` 的那个 `canView` 检查 | 任何能够查看一个公开场景的账户，也能够覆盖它的描述 | 保存路由只单独使用 `scene.ownerId === auth.user.id` |
| 在客户端用 `innerHTML` 存储这份描述 | 正好重新打开了课程 5.5 在注释和聊天中修复过的那个存储型 XSS 漏洞 | 用 `textContent` 来设置它，与 `renderAnnotations` 和 `appendChatMessage` 保持一致 |
| 在保存请求上忘记添加 CSRF 令牌，却在草稿请求上没有忘记 | 即使代码在其他方面看起来是对的，保存请求也会以 403 失败 | 一个只读请求不需要 CSRF 令牌；一个会写入的请求，根据 `requireCsrf`，总是需要 |

## 故障排查

**`server/routes.js` 中出现 `describeScene is not a function`（或类似错误）。** 在 TODO 8 完成之前，这是预期之内的——`server/ai.js` 的 `describeScene` 必须存在并被导出，`routes.js` 才能导入并调用它。

**草稿请求和保存请求都返回 404，即使对场景的所有者也是如此。** 先检查 TODO 11：如果这两个新路由没有在 `server/server.js` 中被匹配和接通，那么无论 `routes.js` 做了什么，对它们的每一次请求都会落入通用的 `/api/` 404。

**编辑了草稿文字之后，一份已保存的描述看起来没有变化。** Save 按钮保存的是当前文本框中的内容，而不是原始的草稿——在按下 Save 之前，确认你的编辑确实被输入到了 `#description-draft` 中。

**一个修复看起来是对的，但 `npm test` 依然失败。** 请阅读断言消息，而不只是测试的标题——这两个新测试各自检查了不止一件事（例如，保存测试同时检查了一个陌生人是否被拒绝*以及*所有者保存的文字是否经过了清理）。

**在中国大陆，`npm install` 失败，或者非常慢。** 改为运行 `npm install --registry=https://registry.npmmirror.com`，而不是默认的注册表。

**8891 端口已经被占用。** 在 `server/.env` 中设置一个不同的 `PORT`，并相应地更新 `ALLOWED_ORIGIN`。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)**：给描述草稿接口添加一个速率限制，采用 `rateLimit.js` 已经为登录尝试使用过的那种形式，并添加一个证明它已经就位的 `node:test`。
2. **[创意](challenges/challenge-2.zh-Hans.md)**：用你自己的语言或风格改写模拟描述的措辞，让它听起来像是来自你自己社区或文化的一位策展人真正会写出的东西。
3. **[探索](challenges/challenge-3.zh-Hans.md)**：在 `server/ai.js` 中实现课程 5.6 的 `openai-compatible` 或 `local` 服务商路径，接通一个真实的接口（一个托管的 API，或者通过 Ollama 或 LM Studio 接入的一个本地模型），而不是模拟服务商。

## 提交作业

1. 完成 [`tests/checklist.md`](tests/checklist.md)。
2. 拍摄截图：你的终端显示 `npm test` 完全通过（10/10），以及应用中一个场景、一条注释、一条聊天消息和一份已保存的 AI 描述全部可见的样子。
3. 把它们保存在你的学习日志和作品集中。也可以和其他开发者分享：参见[在哪里分享你的作品和寻求帮助](../../docs/en/community.md)（英文）。
4. 学习日志问题：用你自己的话描述，如果这个结业项目 AI 功能中的「人工审核」步骤被移除，会出什么问题——不是「它可能是错的」，而是对这个应用某个真实版本的一位真实用户来说，一个具体的、切实的后果。

## 延伸阅读

- [MDN: Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)（英文）
- [OWASP Access Control Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Access_Control_Cheat_Sheet.html)（英文）
- [Node.js docs: SQLite](https://nodejs.org/api/sqlite.html)（英文）
- [MDN: WebSockets API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)（英文）
- [Keep a Changelog](https://keepachangelog.com/)（英文）

## 值得认识的女性

**Juliana Rotich** 是一位肯尼亚技术专家，她于 2008 年联合创办了 Ushahidi——一款免费开源的众包与危机地图软件，最初是为了标绘 2007-08 年肯尼亚大选后暴力事件的报告而构建的，此后被部署到世界各地——她后来又联合创办了 BRCK。

Ushahidi 一开始正是这个结业项目所练习构建的那种小型、紧迫的工具：一个能运行的服务器、一个把报告和地点关联起来的数据库，以及在压力之下依赖它的真实的人。本课所要求的这种严谨态度——在给已经能用的东西添加内容之前先审查它，并清楚地写下如何运行和部署你所构建的东西——正是一个需要在危机中被信任的工具，从一开始就必须具备的那种严谨态度。

> **编者注：发布前请核实。** 「值得认识的女性」中的人物信息必须以一手资料核实，并在可行时于课程上线前与本人确认。参见 [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md)。

## 标准聚焦

这个结业项目自己的新功能，无论是读取请求还是写入请求，都遵循 W3C/WHATWG Fetch 标准的 `fetch()` 语义，并原样保持着课程 5.5 已经落实的 W3C Web 应用安全工作组的内容安全策略 3 级（Level 3）保护措施。模拟 AI 服务商的请求与回复形状，映照的是课程 5.6 引入的那种兼容 OpenAI 的聊天补全约定——一种被广泛采用、却没有被正式标准化的 API 形状，被多个托管和本地模型服务器使用，这正是为什么本课把它当作一种可以围绕其设计的通用惯例，而不是一个由某个组织颁布的标准。

## 许可协议

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
