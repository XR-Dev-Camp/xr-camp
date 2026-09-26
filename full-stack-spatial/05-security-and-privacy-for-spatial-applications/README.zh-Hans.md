# Security and Privacy for Spatial Applications

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程：** `full-stack-spatial` · **课时：** `security-and-privacy-for-spatial-applications-05` · **时长：** 约 12 小时 · 16 次学习，每次 45 分钟 · 每周 4 次，约 4 周

---

> 完成一次安全与隐私审查，并进行一次修复冲刺。

## 学习目标

完成本项目后，你将能够：

1. 为一个小型 Web 应用构建一张 STRIDE 风格的威胁建模表，为每一类威胁在该应用自己的代码中指出一个具体的例子。
2. 解释为什么一个在服务器上被清理（sanitize）过的存储值，和一个用 `textContent` 渲染它的客户端，是针对同一个存储型 XSS（跨站脚本，Cross-Site Scripting）漏洞的两道独立防线，以及为什么单靠其中任何一道都不足以永远依赖。
3. 编写一个从 `script-src` 中去掉 `'unsafe-inline'` 的内容安全策略（Content Security Policy，CSP）响应头，并解释这个具体的移除操作防范了服务器端清理所不能防范的什么内容。
4. 解释为什么一个被提交到版本控制中的密钥，在被提交的那一刻起就已经泄露，即使之后的一次提交把它删除了也无法改变这一点，并把一个密钥从硬编码的源代码中移到一个环境变量中。
5. 识别一个 IDOR（不安全的直接对象引用，Insecure Direct Object Reference）漏洞，通过在每一次请求上检查所有权或可见性来修复它，并解释为什么对一个缺失的资源和一个被禁止访问的资源都返回同一个「未找到」响应是一个刻意的选择，而不是一个疏忽。
6. 解释一条详细的错误消息会向攻击者泄露什么，并用一条面向客户端的通用消息，加上服务器端的日志记录，取代它。
7. 对一个位置字段应用数据最小化：不存储超出一项功能实际需要的精度，并解释一个「以防万一」而保留的全精度 GPS 坐标所带来的隐私代价。
8. 运行 `npm audit`，阅读它的输出，并解释它能够、以及不能够告诉你关于一个项目真实安全状况的哪些信息。

## 先决条件

- **课程 5.4：实时与多用户应用**——本课的起始代码原样复用了它的账户路由、会话 Cookie、CSRF（跨站请求伪造，Cross-Site Request Forgery）令牌，以及 WebSocket 升级的身份验证；审查的目标是构建在这个基础之上的新代码。
- **课程 5.2：身份验证与用户账户**——密码哈希、会话和 CSRF，全部延续下来。
- 能够自如地阅读你没有写过、也没有刚看着它崩溃的服务器代码——本课的起始代码运行良好，其中的漏洞是逻辑上的，而不是崩溃。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| Node.js 22.5 或更高（推荐 LTS「24 Krypton」） | 运行服务器 | 免费 |
| npm（随 Node.js 一起提供） | 安装本课唯一的依赖包 `ws`，并运行 `npm audit` | 免费 |
| 一个文本编辑器（例如 VS Code） | 阅读并修复服务器和客户端代码 | 免费 |
| 一个浏览器（Chrome、Firefox、Safari 或 Edge） | 在修复每一个漏洞之前，先亲自尝试一下它 | 免费 |

Node.js 可以从 [nodejs.org](https://nodejs.org/) 下载；中国大陆的学习者也可以使用 [npmmirror 的 Node.js 镜像](https://registry.npmmirror.com/binary.html?path=node/)。如果 `npm install` 很慢，改为运行 `npm install --registry=https://registry.npmmirror.com`。

## 你将构建什么

课程 5.2 的 README 曾经许下过这个时刻的承诺：「阅读课程 5.5，它会回到一个和这个项目一样的项目中，去发现并修复其中被刻意埋下的漏洞。」本课兑现了这个承诺。起始代码是一个小型空间应用——账户、带有可选粗略位置的已保存场景、留在一个场景上的简短文字注释，以及一个共享的聊天房间——完全构建在课程 5.4 已经教会你信任的那套账户、会话、CSRF 和 WebSocket 身份验证代码之上。其中有七处是被刻意破坏的：注释中的存储型 XSS、聊天中的存储型 XSS、没有内容安全策略、一个直接提交在 `config.js` 中的密钥、按 id 查询场景的接口上的一个 IDOR、会泄露调用栈的错误响应，以及一个毫无理由地以全精度 GPS 存储的场景位置。每一个含有漏洞的文件顶部都重复着同一条警告：**刻意留有漏洞——仅供在 localhost 上学习使用；切勿部署。** 服务器只会绑定到 `127.0.0.1`。

你的工作不是添加一项功能。而是找到这七个编号的 TODO 中的每一个，理解它*为什么*是一个真正的漏洞（而不只是一种风格上的抱怨），修复它，并看着一个失败的 `node --test` 套件一次一个测试地变绿。[`completed/`](completed/) 是已修复的参考版本：一份威胁模型、一份严格的 CSP、一个从环境变量加载的密钥、场景接口上每一次请求都有的权限检查、通用的错误消息、经过最小化处理的位置数据、一次经过解释的 `npm audit` 运行记录，以及一份 [`SECURITY.md`](completed/SECURITY.md)，描述这个项目的维护者希望人们如何报告一个真实的漏洞。

这是贯穿第 5 阶段的持续性**虚拟文化展览**的第五步。它不会给这个展览添加一项新功能；它让课程 5.1–5.4 已经构建的功能，在继续构建下去时变得更安全。

## 文件夹说明

```text
05-security-and-privacy-for-spatial-applications/
├── README.md
├── starter/                      # begin here -- deliberately vulnerable, runs fine
│   ├── index.html, styles.css, js/main.js, js/net.js, js/scene.js
│   └── server/
│       ├── migrations/                       # numbered .sql files, run in order
│       ├── cookies.js, sessions.js, auth.js, rateLimit.js, wsAuth.js, rooms.js   # carried over from 5.4, unchanged
│       ├── db.js, validation.js, sanitize.js, env.js  # new for this lesson
│       ├── config.js          # TODO 4: a secret, hardcoded
│       ├── routes.js          # TODO 1, 5, 6, 7
│       ├── realtime.js        # TODO 2
│       ├── server.js          # TODO 3, 6
│       └── server.test.js     # one test per TODO -- run `npm test` and watch it fail
├── completed/                    # reference solution, plus SECURITY.md
├── challenges/                   # Three challenges: Foundation is required
├── tests/                        # self-review checklist
├── assets/
└── screenshots/
```

## 环境配置

1. 打开一个终端，运行 `node --version`。你需要 22.5 或更高版本；本课程是针对 Node 24（当前的 LTS 版本）编写和测试的。
2. `cd` 进入 `starter/server`，运行 `npm install`——这会恰好安装一个包，`ws`，锁定在 [`package.json`](starter/server/package.json) 中的确切版本。`node_modules/` 会被创建在磁盘上，但绝不会被提交到版本库（见 `.gitignore`）。
3. 把 `starter/server/.env.example` 复制为 `starter/server/.env`。你现在还不需要设置 `APP_SECRET`——起始代码的 `config.js` 还没有读取它（那是 TODO 4 的事）。
4. 用任意静态文件服务器从仓库根目录提供整个仓库（例如 `python3 -m http.server 8766`），这样 `starter/index.html` 就会通过 `http://` 打开，而不是 `file://`。
5. 在第二个终端中，从 `starter/server` 运行 `node server.js`。你应该会看到 `Security and privacy lab listening on http://127.0.0.1:8890`，以及一次性的一行 `ExperimentalWarning: SQLite is an experimental feature`。两者都是预期之内的。
6. 打开已提供的 `starter/index.html`，注册一个账户，并登录。一切都能正常工作——这正是让本课成为一次审查冲刺、而不是一节「起始代码坏了」的课的原因：你要找的，是一个能正常运行的应用依然可能存在的错误。
7. 从 `starter/server` 运行 `npm test`（这会运行 `node --test`，并给每个测试设置 15 秒的超时，这样一个在你工作期间暂时处于损坏状态的测试就不会拖住整个套件）。每一个测试都应该失败。阅读每一条失败消息——它会准确说明哪里出了问题，并指出修复它的那个 TODO。

## 分步讲解

### 规划你的学习节奏

| 节次 | 你要做的事 | 完成后你将拥有 |
| --- | --- | --- |
| 1 | 阅读下方的威胁模型和「哪里出了问题」部分；运行起始代码；运行 `npm test` 并阅读每一条失败消息。 | 一份用你自己的话写出的、需要修复的七件事清单。 |
| 2 | TODO 1a：在 `routes.js` 的 `createAnnotation` 中、在 `insertAnnotation` 之前调用 `sanitizeText`。 | 已存储的注释文字中不再残留任何标记，即使在客户端改动之前也是如此。 |
| 3 | TODO 1b：把 `js/main.js` 的 `renderAnnotations` 从 `innerHTML` 改为 `textContent`/`createElement`。 | 注释存储型 XSS 的测试通过。 |
| 4 | TODO 2a：在 `realtime.js` 的聊天处理函数中、在转发一条消息之前调用 `sanitizeText`。 | 被转发的聊天文字中不再残留任何标记，即使在客户端改动之前也是如此。 |
| 5 | TODO 2b：把 `js/main.js` 的 `appendChatMessage` 从 `innerHTML` 改为 `createElement`/`textContent`。 | 聊天存储型 XSS 的测试通过。 |
| 6 | TODO 3：在 `server.js` 中添加一个 `Content-Security-Policy` 响应头，`script-src` 中不含 `'unsafe-inline'`。 | CSP 测试通过；应用依然正常工作（因为没有内联脚本会被破坏）。 |
| 7 | TODO 4a：重写 `config.js`，从 `process.env` 读取 `APP_SECRET`，缺失时抛出错误。 | 没有 `APP_SECRET` 时服务器拒绝启动。 |
| 8 | TODO 4b：在 `starter/server/.env` 中设置一个真实的 `APP_SECRET`（生成一个；见 `.env.example`）。 | 服务器再次启动；密钥测试通过。 |
| 9 | TODO 5：在 `routes.js` 的 `getScene` 中，在每一次请求上都检查调用者是否拥有这个场景、或者这个场景是否公开，两种情况都返回同一个 404。 | 两个 IDOR 测试都通过。 |
| 10 | TODO 6：把 `formatServerError` 中原始的 `error.message`/`error.stack` 替换为一条固定的、通用的消息；为你自己保留 `console.error(error)`。 | 详细错误信息的测试通过。 |
| 11 | TODO 7：在 `routes.js` 的 `createScene` 中，在一个场景的位置被存储之前，先对它调用 `roundLocation`。 | 位置最小化的测试通过。 |
| 12 | 从头到尾运行 `npm test`。 | 一个完整的、全绿的套件：全部八个测试都通过。 |
| 13 | 从 `server/` 运行 `npm audit`。阅读它的输出（见下方「哪里出了问题：npm audit」），并在你的学习日志中写下它发现了什么，以及你会采取什么行动。 | 一份关于一次真实 `npm audit` 运行的简短书面记录，而不是对它可能会说什么的猜测。 |
| 14 | 重新阅读威胁模型表格。对于每一行，检查你修复后的代码是真正关闭了那一行的威胁，还是只是让它变得更难了一些。 | 关于哪些威胁被完全关闭、哪些只是被削弱的笔记（见「常见错误」）。 |
| 15 | 从头到尾完成 [`tests/checklist.md`](tests/checklist.md)，包括它的「3D 与 XR（人工）」部分。对 `completed/index.html` 运行那里描述的本地 `pa11y` 检查。 | 每一项都已勾选，或者对未能测试的部分及原因做了说明。 |
| 16 | 完成必做的[基础挑战](challenges/challenge-1.zh-Hans.md)，然后**提交作业**。 | 截图、你的学习日志条目，以及一个你从头到尾都理解的项目。 |

### 第 1 步：先阅读，再修复（暂时没有 TODO）

打开 `starter/server/server.test.js`。每一个测试都在它的标题和失败消息中说明了它要检查的漏洞。在修改任何代码之前，先把全部八个都读一遍——它们就是本课「已修复」意味着什么的规格说明，就像一份 bug 报告在一次真实的审查中所扮演的角色一样。

### 第 2-3 步：注释中的存储型 XSS（TODO 1a-b）

一条注释的文字会经历这样的旅程：浏览器 → `POST /api/scenes/:id/annotations` → `insertAnnotation` → SQLite → `GET /api/scenes/:id` → 再次回到浏览器，对之后的每一位查看者都是如此。要让在这里输入的一个 `<script>` 标签永远不会执行，必须同时满足两件事：服务器不能把它当作看起来可执行的标记来存储（`sanitize.js` 的 `sanitizeText`，从 `routes.js` 中调用），而客户端绝不能把一个字符串交给 `innerHTML`（`js/main.js` 的 `renderAnnotations`，它应该改为构建 DOM 节点并设置 `textContent`）。只修复两者之一，依然能通过今天这个测试、在这个具体的应用中——但请见「常见错误」，了解为什么这和真正的安全并不是一回事。

### 第 4-5 步：聊天中的存储型 XSS（TODO 2a-b）

同样的模式，只是发生在一个 WebSocket 上，而不是一个 REST 接口上：`realtime.js` 的消息处理函数必须在广播之前先清理，而 `js/main.js` 的 `appendChatMessage` 绝不能使用 `innerHTML`。课程 5.4 自己的聊天功能本来就已经使用了 `textContent`；本课的起始代码是从那里刻意后退的一步，好让你能看清楚，当它不在那里时会发生什么改变。

### 第 6 步：一份内容安全策略（TODO 3）

打开 `server.js`。在每一个响应上添加一个 `Content-Security-Policy` 响应头，把 `script-src` 限制为 `'self'` 和这个页面加载的唯一一个外部脚本（`https://aframe.io`)——并且不含 `'unsafe-inline'`。见下方「内容安全策略」，了解为什么即使 TODO 1 和 TODO 2 都已经修复，这一点依然重要，以及为什么这里的 `style-src` 依然允许 `'unsafe-inline'`。

### 第 7-8 步：提交在代码中的一个密钥（TODO 4a-b）

打开 `config.js`。`APP_SECRET` 把守着 `GET /api/admin/stats`（`routes.js`），却以明文硬编码在一个本课程每一位学习者都能读到的文件中——而且，在一个真实的版本库中，它会永远存在于每一次克隆、以及每一次曾经包含过它的提交中，即使之后有一次提交把它删除了也不例外。修复 `config.js`，让它从 `process.env.APP_SECRET` 读取，缺失时抛出错误；然后把 `.env.example` 复制为 `.env`，并设置一个真实的值（`.env` 已经在 `.gitignore` 中）。

### 第 9 步：场景接口上的一个 IDOR（TODO 5）

打开 `routes.js` 的 `getScene`。它目前会把任何一个场景按 id 返回给任何一个已登录的调用者——没有任何检查来确认调用者是否拥有它、或者它是否公开。修复它，在返回任何内容之前先检查 `scene.ownerId === auth.user.id || scene.isPublic`，并且无论这个场景是不存在、还是仅仅不属于这个调用者查看，都回应同一个 404。见下方「IDOR」，了解为什么这个具体的选择（对两种情况用同一个状态码）很重要。

### 第 10 步：详细的错误消息（TODO 6）

打开 `routes.js` 的 `formatServerError`。它目前会在每一次未处理的异常中，把 `error.message` 和 `error.stack` 返回给客户端。把它的返回值替换成一条固定的、通用的消息。`server.js` 中的 `console.error(error)` 已经为你记录了真实的错误——那一行不需要改变。

### 第 11 步：不必要地存储的位置（TODO 7）

打开 `routes.js` 的 `createScene`。它会把一个场景的 `locationLat`/`locationLng` 原封不动地存储起来——全精度 GPS，且无限期保留。在这个值到达 `insertScene` 之前，先对它调用 `sanitize.js` 的 `roundLocation`。见下方「数据最小化」，了解为什么「我们以后可能会用到它」本身并不能构成保留超出一项功能当前所需精度的理由。

## 威胁模型

对这个应用自身功能的一次 STRIDE 风格审视，采用一次真实审查会采用的方式：每一件可能出错的事情一行，而不是每一个笼统的类别一行。

| STRIDE 类别 | 本应用中的具体威胁 | 在哪里被处理 |
| --- | --- | --- |
| **S**poofing（身份伪装） | 攻击者通过猜测或窃取一个会话 Cookie，以另一个人的身份登录。 | 会话 id 是 `crypto.randomBytes(32)`（课程 5.2 的 `sessions.js`，未改动）；Cookie 带有 `HttpOnly`（阻止客户端脚本读取 Cookie），因此客户端脚本无法读取它，即使是一段通过了 TODO 1/2 的脚本也不行。 |
| **T**ampering（篡改） | 一条 WebSocket 消息声称拥有一个不属于它的 `username`。 | `realtime.js` 从不从传入的消息中读取身份字段；每一条被转发的消息都从 `member.username` 打上标记，这个值在连接建立时、从经过身份验证的会话中被设置一次。 |
| **R**epudiation（否认） | 事后不存在任何记录能说明是谁创建了一个场景或留下了一条注释。 | `scenes.owner_id` 和 `annotations.author_id` 永远是经过身份验证的调用者自己的 id，在服务器端设置，绝不取自请求体。 |
| **I**nformation disclosure（信息泄露） | 一个私密场景被一个不拥有它的账户读取（TODO 5）；一份调用栈告诉攻击者一个错误来自哪个文件、哪一行（TODO 6）；一个全精度位置准确地暴露了某人曾经站在哪里（TODO 7）。 | `getScene` 的所有权/可见性检查；`formatServerError` 的通用消息；`roundLocation` 的数据最小化。 |
| **D**enial of service（拒绝服务） | 来自一个连接的大量聊天消息或登录尝试。 | 原样延续自课程 5.2/5.4：`rateLimit.js` 用于登录尝试，而本课的 `realtime.js` 继承了 5.4 的按连接设计（为聊天/场景接口添加一个完整的速率限制器，是本课的探索挑战，不是本课的必做要求）。 |
| **E**levation of privilege（权限提升） | 任何读到这个仓库源代码（或它已提交的历史记录）的人，都能调用 `GET /api/admin/stats`——一个本应只留给运行这个服务器的人使用的接口。 | TODO 4：`APP_SECRET` 从硬编码的源代码移到了一个绝不会被提交的环境变量中。 |

## 哪里出了问题，以及如何修复它

**存储型 XSS（TODO 1、TODO 2）。** [MDN 的跨站脚本文章](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS)和 [OWASP 跨站脚本防护速查表](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)描述的是同一种形状：不可信的文本到达了一个会把它解释为标记的地方。这个应用中有两个这样的地方（客户端中的 `innerHTML`），以及一份未经清理就到达这两处的输入（注释、聊天）。修复方式是两道独立的防线：`sanitize.js` 的 `sanitizeText` 在文本被存储之前，先剥离任何看起来像 HTML 标签的东西；客户端则用 `textContent`/`createElement` 渲染，无论其参数包含什么内容，它都绝不会把它解释为标记。单靠任何一道防线，就已经足以让今天这个测试不再失败——但两道防线加在一起，就意味着一个未来的客户端、一个调试工具，或者一个不那么谨慎的导出功能，不再是唯一挡在一条已存储消息和一段正在运行的脚本之间的东西。

**内容安全策略（TODO 3）。** [MDN 的 Content-Security-Policy 文章](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)把 CSP 描述为针对注入脚本的第二道、独立的防线：即使像 TODO 1/2 那样的一个存储型 XSS 漏洞真的存在、并且被漏看了，一个严格的 `script-src`（不含 `'unsafe-inline'`，不含 `'unsafe-eval'`）也会完全阻止一个被注入的内联 `<script>` 或一个 `onerror` 处理函数运行，因为浏览器会拒绝执行策略没有明确允许的内联脚本。这个项目自己的脚本全部都是外部文件，所以从 `script-src` 中去掉 `'unsafe-inline'` 在这里不需要任何代价。`style-src` 依然允许 `'unsafe-inline'`，因为 A-Frame 会在运行时直接设置元素样式（这是大多数 WebGL/3D 库广为人知的一个限制）——这在这里是一个可以接受的权衡，因为一次纯 CSS 的注入无法执行 JavaScript，也无法读取一个 Cookie，而且这个应用从不会用用户文本来构建一个样式。

**密钥管理（TODO 4）。** 一个密钥的保密性在它被提交的那一刻就已经终结——不是在有人注意到的那一刻，也不会因为之后有一次提交把它删除而被撤销，因为它依然留在这个仓库的历史记录中。[OWASP 密钥管理速查表](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)建议密钥应该完全存在于版本控制之外（一个环境变量，从一个本身就被 gitignore 排除的文件中加载），并且一旦曾经暴露过，就应该被轮换——而不仅仅是被搬到别处。本课的修复完成了第一件事；一次真正的事件响应还需要第二件事，这正是为什么 `completed/SECURITY.md` 描述的是如何报告一次泄露，而不仅仅是如何修复一次泄露。

**IDOR（TODO 5）。** 一个不安全的直接对象引用（Insecure Direct Object Reference，IDOR）正是这个应用最初的 `getScene`：一个调用者可以控制（或者可以被交给他、或者可以猜到，因为这些是被直接打印回它自己所有者面前的 UUID）的 id，被用来获取一条记录，却没有任何检查来确认调用者是否被允许查看它。[OWASP 访问控制速查表](https://cheatsheetseries.owasp.org/cheatsheets/Access_Control_Cheat_Sheet.html)明确指出，这项检查必须在每一次触及这个对象的请求上都运行一次，而不是只在调用者以后可能绕过的某个节点上运行一次。修复后的版本刻意地对「一个场景不存在」和「一个场景对这个调用者不可见」这两种情况都回应同一个 404：把这两者区分开来，会让攻击者能够一次一个猜测地枚举出哪些私密场景 id 存在，而完全不需要读到任何一个。

**详细的错误消息（TODO 6）。** 一份调用栈会告诉读到它的人：哪些文件存在、哪一行失败了，有时还有一个包的版本号，或者一段查询语句的片段——这些信息对一个只需要知道「出了点问题」的学习者毫无用处，却对一个正在试探这个应用弱点的人非常有用。这个修复把细节恰好留在有用的地方：`console.error(error)`，留在运行这个服务器的人的终端里，绝不出现在浏览器收到的响应体中。

**数据最小化（TODO 7）。** 一个精确到小数点后六位的 GPS 坐标，能确定一座具体的建筑，有时甚至是一个具体的房间。这个项目自己的场景从来都只需要「大致在哪里」——这里没有任何地方会把一个位置读回来用于驾车导航或精确定位。`roundLocation` 会在一个位置被写入磁盘之前，就把它四舍五入到小数点后一位度数（大约 11 公里），因此这份不必要的精度从一开始就不会被捕获，而不只是事后被隐藏起来。这正是课程 5.2 的账户删除和数据导出设计所指向的同一个原则：只收集一项功能真正需要的东西。

**`npm audit`。** 从 `server/`（在 `npm install` 之后）运行 `npm audit`。它会用一个公开的已知漏洞数据库，检查这个项目的唯一依赖 `ws`，以及 `ws` 自身依赖的一切，并按严重程度报告任何匹配项。在阅读它的输出之前，有两件事值得了解：一次干净的 `npm audit` 只意味着今天在这份依赖树中没有发现任何*已知、已公开*的漏洞——不代表这份代码是安全的，也不代表不存在任何尚未被发现和公开的漏洞。请去阅读它实际报告了什么（一次真实的运行可能什么都不显示，也可能在 `ws` 自身依赖的某个包中显示出一些内容，具体取决于你运行它的确切时间），而不是相信写在这里的一个固定数字，因为这个公告数据库会随时间变化。

## 关键代码解析

- **清理和安全渲染是两道不同的防线，而不是同一个修复重复了两次。** `sanitize.js` 的 `sanitizeText` 改变的是被存储的内容；`js/main.js` 的 `textContent` 改变的是一个已经在内存中的值如何被显示。其中任何一个单独出现一个 bug，另一个依然会屹立不倒——这正是深度防御（defense in depth）的全部意义所在（见「常见错误」）。
- **`findSceneById` 和一个「为查看者准备的」函数之间的区别。** `db.js` 刻意没有把它那个朴素的查询函数命名为 `getSceneSafely` 之类的名字——因为这样一个名字，只有当未来每一个读到它的人都记得它暗示着什么的时候，才真正意味着「已经检查过」。用一个朴素的名字命名它，并把真正的权限检查放在 `routes.js` 的 `getScene` 中，让「是谁检查了这是被允许的？」这个问题有了一个显而易见的地方可以查找答案。
- **对「未找到」和「不是你的」使用同一个 404。** 对这两种情况使用不同的状态码，会让攻击者在完全不读到任何一个私密 id 的情况下，就知道哪些私密 id 存在——见 OWASP 访问控制速查表关于这个具体模式的指导。
- **`formatServerError` 是一个纯函数，被直接测试。** 与其试图强行让一次真实的 HTTP 请求把服务器搞崩溃（这很脆弱，而且一个经过良好验证的服务器本来就很少会意外这样做），本课把错误格式化这个决定抽取成了它自己的一个小函数，并用一个合成的错误直接测试它——这和许多代码库选择单独测试一个格式化函数、而不是只通过整个技术栈来测试它，是同一个原因。
- **`roundLocation` 在 `insertScene` 之前运行，而不是之后。** 对一个已经写入磁盘的值做四舍五入，保护不了任何已经泄露出去的东西；这个修复必须放在写入路径上，在这个精确值被持久化之前。

## 3D 与 XR 无障碍

- **场景描述。** `#scene-description` 用纯文本说明当前打开的是哪个场景、它的可见性，以及它的注释数量——由 3D 视图所读取的同一份数据构建而成。
- **3D 视图的一个 2D 孪生体。** `#scene-detail-list` 始终保存着和 3D 标记相同的场景事实，无论 WebGL 是否可用。
- **每一种交互都有键盘路径。** 打开一个场景、创建一个场景，以及添加一条注释，都是普通的按钮和表单字段——这里没有任何东西需要在 3D 画布内部点击或拖拽。
- **减少动态效果与一个暂停控件。** 当设置了 `prefers-reduced-motion: reduce` 时，场景标记的待机旋转会以暂停状态开始，而**暂停动画**按钮（带有 `aria-pressed`）无论这个偏好设置如何都能正常工作。
- **舒适度。** 相机在整节课中都是固定的；这里没有任何东西会移动视角本身。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| `#scene-description` 由与 3D 标记相同的数据构建而成 | 1.1.1、1.3.1 | 文字永远不可能与画面相矛盾。 |
| `#chat-log` 带有 `role="log"` 和 `aria-live="polite"` | 4.1.3 | 一条新的聊天消息不需要把焦点移入日志中就会被播报。 |
| 每个表单都有一个可见的提交按钮 | 良好实践 | 自动化检查工具（以及键盘用户）总能找到如何提交它。 |
| 动画尊重 `prefers-reduced-motion`，并提供一个暂停按钮 | 2.2.2 | 学习者没有要求的自行启动的动态效果，必须能够被停止。 |
| 每个用 `list-style: none` 设置样式的 `<ul>` 都保留 `role="list"` | 良好实践 | 否则 Safari 会从一个被去掉列表样式的 `<ul>` 中丢失列表语义。 |

## 性能注意事项

- **`sanitizeText` 只在写入时运行一次，而不是每次读取都运行。** 在一个值被存储时就清理它，意味着之后每一次 `GET` 返回的都已经是一个安全的字符串，而不是在每一次读取它的请求中都重复同样的正则表达式运算。
- **`roundLocation` 同时也缩小了被存储和被传输的内容。** 一个被四舍五入到小数点后一位度数的值压缩得稍好一些，也少了一个理由去担心一次数据库备份或导出会泄露出比一项功能所需更多的精度。
- **管理接口的三个计数都是简单的 `COUNT(*)` 查询。** 没有连接（join），没有对用户数据的全表扫描——一个调试用的接口，理应花费和它所返回信息的价值相称的、尽可能少的成本。

## 常见错误

| 错误 | 会发生什么 | 应该怎么做 |
| --- | --- | --- |
| 只修复客户端（`textContent`）或只修复服务器（`sanitizeText`），就认为 TODO 1/2 已经完成 | 剩下的那唯一一道防线，只需要未来一次改动，就会变成阻止存储型 XSS 的唯一屏障——一个新的客户端、一个调试工具，或者之后添加的一个不那么谨慎的模板 | 同时修复两道防线；把每一道都当作独立完整的，而不是与另一道冗余 |
| 在客户端检查一个场景的所有权（隐藏一个按钮），而不是在 `routes.js` 中检查 | 任何打开了浏览器开发者控制台的人，都能直接调用这个 API，完全绕过那个被隐藏的按钮 | 在服务器上、在每一次请求中都强制执行每一项权限检查——客户端的隐藏只是一种礼貌，绝不是一个保证 |
| 对「不是你的」返回 403，对「不存在」返回 404 | 攻击者可以通过观察返回的是哪个状态码，在完全不读到任何一个的情况下，得知哪些私密场景 id 存在 | 像修复后的 `getScene` 那样，对两种情况都回应同一个 404 |
| 把一次干净的 `npm audit` 当作应用是安全的证明 | `npm audit` 只检查依赖中*已知、已公开*的漏洞——它对这个项目自己的代码只字未提，包括本课审查的其他一切内容 | 阅读 `npm audit` 实际检查的是什么（见「哪里出了问题：npm audit」），并单独持续审查你自己的代码 |
| 只在显示时对一个位置做四舍五入，而在存储时保留精确值 | 精确的值已经存在于磁盘上了（以及任何在「仅显示时四舍五入」这个改动被加入之前所做的备份中）——这次暴露已经发生了 | 像 `createScene` 的修复那样，在这个值被存储之前就先做四舍五入 |

## 故障排查

**`ExperimentalWarning: SQLite is an experimental feature and might change at any time`。** 这是预期之内的，每次导入 `node:sqlite` 都会出现。这是一条警告，不是一个错误——服务器会继续运行。

**启动修复后的服务器时出现 `Error: APP_SECRET is not set.`。** 在你把 `.env.example` 复制为 `.env` 并设置一个真实的值（TODO 4b）之前，这是预期之内的。这正是这个修复在起作用：服务器宁可拒绝在没有密钥的情况下启动，也不会悄悄地套用一个默认值。

**一个修复看起来是对的，但 `npm test` 依然失败。** 请阅读断言消息，而不只是测试的标题——有几个测试检查的不止一件事（例如，IDOR 测试同时检查了一个陌生人是否被拒绝*以及*所有者和一个公开场景是否依然能正常工作）。重新阅读那个具体失败的 `assert` 调用。

**在中国大陆，`npm install` 失败，或者非常慢。** 改为运行 `npm install --registry=https://registry.npmmirror.com`，而不是默认的注册表。

**8890 端口已经被占用。** 在 `server/.env` 中设置一个不同的 `PORT`，并相应地更新 `ALLOWED_ORIGIN`。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)**：添加第八个审查目标——注释和场景创建接口上缺失的一个速率限制——以及一个证明它已被修复的 `node:test`。
2. **[创意](challenges/challenge-2.zh-Hans.md)**：为一个来自你自己生活、文化或社区的小应用，写出你自己的 STRIDE 威胁模型。
3. **[探索](challenges/challenge-3.zh-Hans.md)**：为聊天和注释接口添加一个真正的按连接速率限制，采用课程 5.4 的 `realtime.js` 已经为位置更新使用过的那种形式。

## 提交作业

1. 完成 [`tests/checklist.md`](tests/checklist.md)。
2. 拍摄截图：你的终端显示 `npm test` 完全通过（8/8）、你的 `npm audit` 输出，以及应用中一个场景、一条注释和一条聊天消息全部可见的样子。
3. 把它们保存在你的学习日志和作品集中。也可以和其他开发者分享：参见[在哪里分享你的作品和寻求帮助](../../docs/en/community.md)（英文）。
4. 学习日志问题：挑选本课七个修复中的一个，用你自己的话描述，一个真正的攻击者用未修复的版本能够做到什么——不是「它不安全」，而是这个漏洞具体允许了什么行动（读取谁的数据、运行什么代码、得知什么事实）。

## 延伸阅读

- [OWASP Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)（英文）
- [OWASP Access Control Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Access_Control_Cheat_Sheet.html)（英文）
- [OWASP Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)（英文）
- [MDN: Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)（英文）
- [MDN: Cross-Site Scripting (XSS)](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS)（英文）

## 值得认识的女性

**Beatriz Busaniche** 是一位阿根廷自由软件与数字权利活动家，也是一位大学讲师（任教于布宜诺斯艾利斯大学和拉丁美洲社会科学院），现任 Fundación Vía Libre 主席，2005 年曾担任拉丁美洲自由软件基金会的创始财务主管，并公开发起过反对布宜诺斯艾利斯人脸识别大规模监控的运动。

她的工作提醒我们，本课的这些修复并不只是一份检查清单：一个「以防万一」而保留的精确位置（TODO 7），或者一个被悄悄跳过的权限检查（TODO 5），正是那种在一座城市的监控系统这个规模上，会变成她毕生投入的公众运动主题的、看似微小的技术决定。

> **编者注：发布前请核实。** 「值得认识的女性」中的人物信息必须以一手资料核实，并在可行时于课程上线前与本人确认。参见 [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md)。

## 标准聚焦

本课添加的内容安全策略由 W3C Web 应用安全工作组的 CSP Level 3 规范定义。`completed/SECURITY.md` 所遵循的漏洞披露实践，非正式地参照了 IETF 的 RFC 9116——「一种用于辅助安全漏洞披露的文件格式」（`security.txt`）——一种让一个项目在一个可预期的固定位置说明它希望别人如何报告一个安全问题的标准化方式。OWASP 本身并不是一个正式的标准组织；它的速查表系列是一份被广泛引用的、关于当前最佳实践的社区共识，这正是为什么本课把它的说法与 OWASP、以及 MDN 和各项 RFC 一起核对，而不是把 OWASP 当作唯一的来源。

## 许可协议

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
