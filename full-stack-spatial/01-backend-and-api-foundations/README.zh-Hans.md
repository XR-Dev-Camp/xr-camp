# Backend and API Foundations

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程：** `full-stack-spatial` · **课时：** `backend-and-api-foundations-01` · **时长：** 约 14 小时 · 19 次学习，每次 45 分钟 · 每周 4 次，约 5 周

---

> 构建一个由 API 支撑的应用，用来保存空间内容或设置。

---

## 学习目标

完成本项目后，你将能够：

1. 用 Node 内置的 **`node:http`** 模块搭建一个 HTTP 服务器，不用任何框架，也没有任何依赖。
2. 设计一个小型 **JSON API**：路由、方法，以及一个必须符合特定形状的请求体。
3. 选择正确的**状态码**（200、204、400、404、405、413、415、500），并解释每一个各自向客户端做出了什么承诺。
4. 手动**验证**一个请求体，把一次失败变成一份清晰的字段错误列表，而不是一次崩溃。
5. 从**环境变量**读取配置，配一份 `.env.example` 文件，且不把任何密钥提交到版本库。
6. 添加 **CORS** 响应头，让一个本地源上的页面能够调用另一个源上的 API，并解释为什么通配符源在这里是合理的选择，但以后不是。
7. 用**同一个服务器**同时提供客户端页面和 JSON API，并让客户端在那个服务器没有运行时也能（以简化的方式）继续工作。
8. 用 Node 内置的测试运行器 **`node:test`** 编写并运行自动化测试。

## 先决条件

- **课程 2.1：现代 JavaScript**（`async`/`await`、模块、`try`/`catch`）。
- **课程 3.4：three.js 基础**（本课的设置所属的那个展品；你不需要记住它的代码，只需要知道它存在）。
- 能够自如地在终端中运行命令（课程 1.7 或同等水平）。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| Node.js，一个 LTS 版本（20 或更高） | 运行服务器及其测试；不用再安装别的 | 免费 |
| 一个现代浏览器，带开发者工具 | 测试客户端，并查看网络请求 | 免费 |
| 一个终端 | 启动服务器，运行 `curl` 和 `npm test` | 免费 |
| VS Code（或任意编辑器）和一个用于纯客户端视图的本地服务器 | 模块需要 `http://`，而不是 `file://` | 免费 |

Node.js 在 Windows、macOS 和 Linux 上运行方式相同，其安装程序在任何地方（包括中国大陆）都无需付费账号即可使用（可直接从 [nodejs.org](https://nodejs.org/) 下载，也可以通过 `winget`、Homebrew 或 `apt` 等包管理器安装）。

## 你将构建什么

来自 **Web3D Developer**（课程 3.4）的展品获得了一个**设置面板**：一个小型网页，你可以在其中选择展示哪些展品、相机从哪里开始、你的语言，以及是否允许场景中的物体移动。它背后是一个你从零开始编写的小型 **Node.js API**：它验证你发送给它的内容，把它保存到一个文件里，并在被请求时把它交还给你。

这也是第一节明确指出一个好的 API 不应该隐藏什么的课：网络失败时会发生什么，请求体格式错误时会发生什么，或者服务器根本没有运行时会发生什么。你在这里构建的客户端在以上任何一种情况下都不会崩溃——它会转而把你的设置保存在这个浏览器里，并告诉你它这样做了。

参考答案在 [`completed/`](completed/) 中：一个 `server/` 文件夹（API，位于 `server.js`、`routes.js`、`validation.js` 和 `store.js` 中），旁边是客户端（`index.html`、`styles.css`、`js/`），由同一个服务器作为静态文件提供。起始代码在两者中共有 **13 个 TODO**。

## 文件夹说明

```text
01-backend-and-api-foundations/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html, styles.css   # The client page: finished
│   ├── js/main.js       # The settings form and API/localStorage logic: TODOs 10-11
│   ├── js/scene.js      # The 3D view: TODO 12
│   └── server/
│       ├── server.js        # The HTTP server, routing, CORS, static files: TODOs 1, 7-9
│       ├── routes.js        # Route handlers: TODOs 3, 5-6
│       ├── validation.js    # validateSettings(): TODO 2
│       ├── store.js         # Reads and writes the settings file: TODO 4
│       ├── server.test.js   # node:test: TODO 13
│       ├── .env.example     # Copy to .env to change PORT etc.
│       └── package.json     # "type": "module", no dependencies
├── completed/            # Reference solution: open this last
├── challenges/            # Three challenges: Foundation is required
├── tests/checklist.md    # Self-review before you submit
├── assets/
└── screenshots/
```

本课的 `package.json` 没有列出任何依赖：每个服务器文件都只用到了 Node 自带的能力（`node:http`、`node:fs`、`node:test` 等等）。课程 5.4 是第一节添加真正依赖包（`ws`，用于 WebSocket）的课，并在本仓库的 `versions.json` 中锁定到一个确切版本，就像 `versions.json` 已经为每一节 3D 课锁定 three.js 和 A-Frame 的版本那样。

## 环境配置

1. 在你其他 XR Camp 项目旁边新建一个文件夹 `exhibit-api`，把 `starter/` 文件夹的内容复制进去。
2. 在它的 `server/` 文件夹中打开一个终端，检查你的 Node 版本：`node --version`。你需要 20 或更高版本。
3. 在同一个文件夹中，把 `.env.example` 复制为 `.env`。默认值原样即可使用；你会在第 1 步再回来处理它。
4. 到第 1 步时启动服务器：`node server.js`（或者 `npm start`，效果相同）。随时可以用 Ctrl+C 停止它。
5. 若要单独查看客户端、不带 API（就像它被测试的方式那样），通过任意本地服务器打开 `index.html`，例如 `python3 -m http.server 8766`，或 VS Code 的 Live Server。

## 分步讲解

### 规划你的学习节奏

| 节次 | 你要做的事 | 完成后你将拥有 |
| --- | --- | --- |
| 1 | 环境配置；阅读 `validation.js`、`store.js` 和 `routes.js`，看看哪些部分已经完成 | 为服务器的每个文件写出一句话的职责说明 |
| 2 | 第 1 步：第一个 HTTP 服务器（TODO 1，第一部分） | `node server.js` 打印出 "Exhibit settings server listening on..." |
| 3 | 第 1 步，续：从 `.env` 读取端口（TODO 1，第二部分） | 修改 `.env` 中的 `PORT` 会改变服务器监听的端口 |
| 4 | 第 2 步：验证一个设置对象（TODO 2） | 在 Node REPL 中给 `validateSettings()` 输入一个好的和一个坏的设置对象，能看出哪些字段失败了，以及原因 |
| 5 | 第 3 步：`GET /api/settings`（TODO 3） | 在浏览器中访问 `http://127.0.0.1:8877/api/settings`，会以 JSON 形式看到默认设置 |
| 6 | 第 4 步：保存到文件（TODO 4） | 重启服务器后设置保持不变；出现一个 `data/settings.json` 文件 |
| 7 | 第 5 步：`PUT /api/settings`（TODO 5） | 一条 `curl -X PUT` 命令会改变已保存的展品；一个无效的请求体会返回 400，附带字段错误 |
| 8 | 第 6 步：`DELETE /api/settings`（TODO 6） | `curl -X DELETE` 会重置文件，`GET` 会再次显示默认值 |
| 9 | 第 7 步：把所有路由整合在一起，并返回 JSON 格式的 404（TODO 7） | 访问一个虚构的路径会返回一条清晰的 JSON 错误，而不是崩溃 |
| 10 | 第 8 步：为 localhost 配置 CORS（TODO 8） | 从另一个端口打开客户端，控制台中不再出现 CORS 错误 |
| 11 | 第 9 步：从同一个服务器提供客户端（TODO 9） | `http://127.0.0.1:8877/` 显示（尚未完成的）设置面板 |
| 12 | 第 10 步：设置面板在启动时加载（TODO 10） | 打开页面时，面板显示已保存的展品、相机视角和语言 |
| 13 | 第 10 步，续：保存与重置（TODO 11） | 勾选一个框并按下**保存设置**会更新磁盘上的文件；**恢复默认值**会带回默认设置 |
| 14 | 第 11 步：展品读取设置，第一部分（TODO 12） | 取消勾选「Jade stone」会把它从 3D 视图和描述中移除，不需要重新加载 |
| 15 | 第 11 步，续：相机预设与减少动态效果（TODO 12） | 选择「Close-up」会移动相机；暂停按钮和你设备的减少动态效果设置都能停止旋转 |
| 16 | 第 12 步：用 `node:test` 测试（TODO 13） | `node --test` 打印出每个测试都通过 |
| 17 | [`tests/checklist.md`](tests/checklist.md)，以及下方的 3D 与 XR 无障碍检查 | 一个完成的设置面板 |
| 18 | 一个拓展挑战 | — |
| 19 | **提交作业** | 截图和一篇学习日志 |

### 第 1 步：第一个 HTTP 服务器，以及环境变量（TODO 1）

`node:http` 的 `createServer()` 接收一个函数：每个请求都会运行一次，带着一个 `req`（请求）对象和一个 `res`（响应）对象。不需要安装任何其他东西：

```js
const server = createServer(async (req, res) => {
  sendJson(res, 200, { ok: true }); // a placeholder, until Step 7
});
server.listen(PORT);
```

**环境变量**是一个存在于你代码之外、活在进程运行环境中的设置，这样同一份代码就能在不同的机器上（或对不同的开发者）表现不同，而无需任何人去修改文件。`process.loadEnvFile()`（现代 Node 内置，不需要安装包）会把 `.env` 读入 `process.env`；`.env` 本身从不提交到版本库，这正是 `.env.example` 存在的原因，用来展示里面应该放什么。读取端口时带上一个兜底值，这样即使 `.env` 缺失或不完整，服务器依然能启动：

```js
const PORT = Number(process.env.PORT) || 8877;
```

### 第 2 步：验证一个设置对象（TODO 2）

客户端可以发送任何内容。**验证**就是决定「任何内容」是否足够接近你所要求的东西的那段代码，然后你才把它交给 `save()`、一条数据库记录，或者另一个用户的屏幕。本课的设置对象恰好有四个字段：

```js
{
  visibleExhibits: ['clay-pot', 'jade-stone'], // a non-empty subset of KNOWN_EXHIBITS
  cameraStart: 'front',                        // one of CAMERA_PRESETS
  language: 'en',                              // one of LANGUAGES
  reducedMotion: false,                        // a boolean
}
```

`validateSettings()` 检查每个字段，把它发现的每一个问题都收集进同一个 `errors` 数组，而不是在第一个问题处就停下——一个正在修改表单的学习者想要一次看到全部错误，而不是一个一个地看。它在成功时返回一个**新**对象，只复制这四个已知字段——绝不会复制原始请求体，因为它可能携带你从未要求过的额外属性。

### 第 3 步：`GET /api/settings`（TODO 3）

这个 API 中最简单的路由：加载设置（或者，第一次时加载默认值），并以 JSON 形式把它发回去，状态码为 200。这里几乎没有什么真正会失败的地方——一个缺失的文件不是一个错误，它只是意味着还没有人保存过任何东西。

### 第 4 步：把设置保存到文件（TODO 4）

`store.js` 是这个项目中唯一接触磁盘的文件。目前，那个「磁盘」就是一个 JSON 文件：`writeFile(DATA_FILE, JSON.stringify(settings, null, 2), 'utf8')`，以及用 `readFile` 加 `JSON.parse` 把它读回来。一旦你需要保存不止一种数据，课程 5.3 就会用一个真正的数据库替换这个文件；把所有文件系统调用都放在 `store.js` 里面，意味着那次替换只会动到这一个文件。

### 第 5 步：`PUT /api/settings`（TODO 5）

`PUT` 的意思是「用我发送给你的内容替换这个资源」。这个处理函数会：

1. 拒绝 `Content-Type` 不是 `application/json` 的请求——状态码为 **415 Unsupported Media Type**。
2. 读取请求体，并拒绝过大的请求体（**413**）或不是有效 JSON 的请求体（**400**）。
3. 验证它。无效的设置会得到 **400 Bad Request**，问题列表放在 `details` 中。
4. 保存有效的设置，并以 **200 OK** 返回它。

```sh
curl -X PUT http://127.0.0.1:8877/api/settings \
  -H "Content-Type: application/json" \
  -d '{"visibleExhibits":["jade-stone"],"cameraStart":"close","language":"en","reducedMotion":true}'
```

### 第 6 步：`DELETE /api/settings`（TODO 6）

把已保存的设置重置为默认值，并回复 **204 No Content**：请求成功了，除了一个空的响应体之外，没有更有用的话可说。`204` 状态码带响应体实际上是违反 HTTP 规范的——这里让 `res.end()` 不带任何参数是正确做法，而不是疏忽。

### 第 7 步：路由，以及不会导致崩溃的错误（TODO 7）

传给 `createServer()` 的请求监听函数，是唯一读取 `req.method` 和 URL 的 `pathname`、并决定由 `routes.js` 中哪个函数来处理它的地方。有两类匹配不上任何路由的请求，会得到一条清晰的 JSON 回答，而不是什么都没有：一个已知路由上的未知方法（**405 Method Not Allowed**），以及任何以 `/api/` 开头但不是 `/api/settings` 的路径（**404 Not Found**）。把这一切包在一个 `try`/`catch` 里是一张安全网，而不是那些具体检查的替代品：客户端发来的任何内容都不应该能直接终止进程，所以一个意外错误依然会变成一个 **500** 响应，并被记录在服务器上，而不是一个挂起的连接。

### 第 8 步：为 localhost 配置 CORS（TODO 8）

除非服务器明确允许，否则浏览器会阻止一个页面读取来自不同**源**（不同的协议、主机或端口）的响应——这就是跨源资源共享（Cross-Origin Resource Sharing，CORS）。从 `http://127.0.0.1:8766`（一个简单的静态服务器）测试本课的客户端、访问 `http://127.0.0.1:8877` 上的 API，就跨过了这条边界，即便两者都是「localhost」。三个响应头说明了谁可以请求，以及如何请求：

```js
res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
```

在带 JSON 请求体的 `PUT` 或 `DELETE` 请求之前，浏览器会先发送一个 `OPTIONS` **预检**请求，来征求许可——它自身不携带任何请求体，因此总是得到一个简短的、空的 `204` 回答。

### 第 9 步：从同一个服务器提供客户端（TODO 9）

任何不是 `/api/...` 的 `GET` 请求都会被当作一次文件请求：`/` 会变成 `/index.html`，文件从 `server/` 旁边的文件夹中读取，并附带正确的 `Content-Type` 发送回去。有一项检查比看起来更重要：`normalize()` 会在与客户端文件夹比较之前，先折叠掉像 `/../server/store.js` 这样的路径，这样一次请求就无法读取它本不该访问的文件。课程 5.5 会深入研究这一类被称为**路径穿越（path traversal）**的漏洞。

### 第 10 步：设置面板（TODO 10-11）

`js/main.js` 会在页面打开时先尝试 `fetch('/api/settings')` 来加载设置。如果因为任何原因失败——完全没有服务器、一次网络错误，或者（正如本仓库自身的无障碍检查所做的那样）一个用自己的 404 来响应 `/api/settings` 的普通静态文件服务器——页面就会回退到 `localStorage`，并说明这一点：

```js
setStatus('Server not running: settings are saved in this browser only.', 'offline');
```

一旦那个回退机制启用，之后每一次保存和重置也都会直接走 `localStorage`，而不是每次点击都重新尝试（并再次失败）那个 API。这正是让 `completed/index.html` 能作为一个普通文件、在一个普通静态服务器上正常工作的原因——而这恰好就是本仓库自身的无障碍检查加载它的方式。

### 第 11 步：展品读取设置（TODO 12）

`js/scene.js` 中的 `applySettings(settings)` 是唯一一个把一个设置对象转变为 three.js 实际显示内容的函数：哪些展品可见、跳转到四个固定相机位置中的哪一个，以及玉石是否被允许旋转。它会在页面加载时调用一次，并在每次「保存」改变设置时再次调用——因此 3D 视图与正确状态之间永远只隔着一个设置对象，这正是课程 3.4 的 `describeExhibit()` 用于其文字描述的同一条规则。

### 第 12 步：用 `node:test` 测试（TODO 13）

`node:test` 和 `node:assert` 随 Node 本身一起提供：不需要安装任何包，`npm test`（或 `node --test`）就能运行它们。`server.test.js` 会在一个空闲端口（`listen(0)`）上启动真正的服务器，并使用一个用后即弃的设置文件，然后用 `fetch()` 调用它的路由，就像 `curl` 或浏览器所做的那样。一个失败的测试会指明确切的行号，以及它期望的确切值和实际得到的值——比每次修改 `routes.js` 中的一行代码后都手动点击表单要快得多。

## 关键代码解析

**`process.loadEnvFile()`。** 不需要任何包就加入了 Node：它把一个 `.env` 文件读入 `process.env`。这里用 `try`/`catch` 包裹是因为一次新的检出（checkout）还没有 `.env`，而这不应该算作一个错误。

**`readJsonBody(req)` 返回一个 Promise。** `req` 是一个流：数据是随时间分块到达的，而不是一次性全部到达，所以读取一个完整的请求体，意味着监听 `'data'` 事件、收集它们，并在 `'end'` 触发时才 resolve。这和课程 2.1 的 `fetch()` 调用所 resolve 的形状相同，只是运行在服务器上而不是浏览器里。

**`structuredClone(DEFAULT_SETTINGS)`。** 深度复制一个对象，是现代 JavaScript 的内置能力。没有它，`resetSettings()` 每次都会交出同一个数组引用，之后对某个调用者副本的修改就可能悄悄改写共享的默认值。

**`import.meta.url === pathToFileURL(process.argv[1]).href`。** 一个模块层面的「这个文件是否被直接运行」检查。它让 `server.test.js` 能够 `import` 这个服务器（以拿到 `server` 对象），而不会让那次导入本身就开始监听一个真实的网络端口。

**`normalize(join(CLIENT_DIR, requestedPath))`。** 单独使用 `join` 会欣然构造出一个包含 `..` 的路径；`normalize` 会折叠这些片段，这样后面的穿越检查才能真正捕捉到它们。

## 3D 与 XR 无障碍

这个展品的视图刻意做得很小：一个固定在四个预设位置之一的相机，没有可以拖来拖去而迷失方向的操作，唯一会动的东西是那块玉石。即便这个更小的界面，也仍然需要本课程中每一个 3D 场景都要做的相同检查：

- **场景描述**（`#scene-description`）：由 3D 视图所读取的同一份 `EXHIBITS` 列表和同一个设置对象构建而成，因此文字描述永远不可能与画面不一致。
- **2D 替代方案**：3D 视图下方的展品列表会说明每一件展品的名称，以及它当前是否被展示，无论 WebGL 是否能正常工作。
- **每一种交互都有键盘路径**：这里的每一个控件都是普通的复选框、单选按钮、`<select>` 或 `<button>`——没有拖拽，没有只能悬停触发的控件，也没有只有鼠标才能到达的交互。
- **减少动态效果**：首次访问时会检查 `prefers-reduced-motion`，如果它被设置就以暂停状态开始；**暂停动画**始终也能正常工作，它的标签和 `aria-pressed` 状态始终与实际发生的情况一致，而不是与页面加载时按钮所说的内容一致。
- **舒适度**：相机只会移动到你选择的一个位置（四个预设之一）；它绝不会自行移动，也没有任何东西会在你没有要求的情况下缩放、倾斜或抖动。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| 每个表单字段都有一个可见的、写在 HTML 中的标签 | 1.3.1、3.3.2 | 一个没有 `<label>` 的复选框或单选按钮，没有屏幕阅读器能播报的名称。 |
| 来自 400 响应的字段错误以文字形式出现在表单旁边 | 3.3.1 | 消息保持可读，并且保持在原地，而不是像 `alert()` 一样消失。 |
| 状态横幅是一个实时区域（`role="status"`） | 4.1.3 | 「Settings saved」和离线消息能传达给屏幕阅读器用户，而无需他们主动去寻找它。 |
| 可见的文字开头就是每个按钮的无障碍名称 | 2.5.3 | 「Save settings」，而不是一个使用语音的人无法说出来的图标。 |
| 3D 场景可以暂停，并且尊重减少动态效果 | 2.2.2 | 动态效果绝不会被强加给任何人；这个设置会持续生效，是一个真实的、持久的选择，而不是一次性的关闭。 |
| 每个用 `list-style: none` 设置样式的列表都保留 `role="list"` | 良好实践 | Safari 会在用 CSS 去掉项目符号后丢失列表语义。 |

## 性能注意事项

这个服务器每次需要时都会读写一个小的 JSON 文件——对一个学习者的设置来说完全够用，也刻意与一个真正的多用户服务形成对比，在那种服务中，每个请求都触碰磁盘是无法扩展的。这个 3D 场景刻意保持轻量：三个简单的网格，没有贴图，动画也只限于一个物体，因此这节课的重量落在 API 上，而不是渲染上。当标签页被隐藏时（`visibilitychange`）调用 `renderer.setAnimationLoop(null)`，意味着一个打开着设置面板的闲置标签页不消耗任何成本。

## 常见错误

| 错误 | 会发生什么 | 应该怎么做 |
| --- | --- | --- |
| 不经验证就信任请求体 | 一个学习者（或一个 bug）发送 `{}`，你保存的文件就报废了 | 每一次保存之前都先调用 `validateSettings()` |
| 每个响应都返回 `200`，即使是错误 | 客户端如果不读响应体就无法分辨成功与失败 | 使用与实际情况相符的状态码（见第 5 步中的表格） |
| 忘记在 `OPTIONS` 预检请求上添加 CORS 响应头，只把它加到真正的请求上 | 浏览器会在真正的请求被发送之前就将其阻止 | 对每一个请求都调用 `setCorsHeaders(res)`，包括 `OPTIONS` |
| 读取 `process.env.PORT` 时不带兜底值 | 在一台没有 `.env` 文件的机器上，服务器会立即崩溃 | `Number(process.env.PORT) \|\| 8877` |
| 假设 API 总是在那里 | 客户端在一个普通静态服务器上，或者完全没有网络时会报错 | 先尝试 API，回退到 `localStorage`，并说明这一点 |

## 故障排查

**`curl: (7) Failed to connect`。** 服务器没有运行，或者运行在与你预期不同的端口上。检查 `.env` 中的 `PORT`，以及 `node server.js` 打印出的消息。

**`EADDRINUSE`。** 已经有别的东西在监听那个端口（也许是你之前启动、又忘了停止的一个服务器）。停止它，或者修改 `.env` 中的 `PORT`。

**即使 `node server.js` 正在运行，设置面板依然显示「Server not running」。** 你是通过一个*不同*的服务器（或者直接作为文件）打开的 `index.html`，而不是通过 8877 端口上的 Node 服务器。改为打开 `http://127.0.0.1:8877/`——课程 5.1 的服务器会自己提供客户端。

**控制台中 `fetch` 因 CORS 错误而失败**（Firefox：「Cross-Origin Request Blocked」；Safari：「Origin ... is not allowed by Access-Control-Allow-Origin」）。完成 TODO 8，并确认 `.env` 中的 `ALLOWED_ORIGIN` 与之匹配（或者是 `*`）。

**`node --test` 卡住不动，或者之后的一次运行复用了旧数据。** 确保 `server.test.js` 在导入 `server.js` *之前*，先把 `process.env.DATA_FILE` 设置为一个临时路径——一旦一个模块被加载，它顶层的常量（比如 `DATA_FILE`）就不会再重新读取环境变量。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)**：添加一个 `GET /api/health` 路由，以及第五个设置项。
2. **[创意](challenges/challenge-2.zh-Hans.md)**：用你自己的语言，添加属于你自己的展品和相机预设。
3. **[探索](challenges/challenge-3.zh-Hans.md)**：添加一份由服务器保存的设置历史记录，以及一个「撤销」路由。

## 提交作业

1. 完成 [`tests/checklist.md`](tests/checklist.md) 中的每一项。
2. 给设置面板拍一张截图，再给显示每一项 `node --test` 检查通过的终端拍一张截图。
3. 把它们保存在你的学习日志和作品集中。也可以和其他开发者分享：参见[在哪里分享你的作品和寻求帮助](../../docs/en/community.md)（英文）。
4. 学习日志问题：当你真正理解了某个状态码实际上对客户端做出了什么承诺之后，哪一个状态码最让你意外，为什么？

## 延伸阅读

- [MDN: An overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)（英文）
- [MDN: HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)（英文）
- [Node.js docs: node:http](https://nodejs.org/api/http.html)（英文）
- [Node.js docs: node:test](https://nodejs.org/api/test.html)（英文）
- [MDN: Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)（英文）

## 值得认识的女性

**Marcia Villalba** 是一位常驻赫尔辛基的乌拉圭软件工程师。从 2019 年到 2026 年，她在 AWS 的 serverless 团队担任了约七年的首席开发者布道师（Principal Developer Advocate），是一位 AWS Serverless Hero，并创办了 Desplegando.cloud——一个西班牙语社区、YouTube 频道和课程平台，教授 AWS、无服务器计算和 AI 智能体。

清晰地、用自己的语言解释一个服务器、一个 API 和一个客户端是如何拼合在一起的，正是本课第一次要求你练习的技能。Marcia 多年来一直在为西语开发者社区做着完全相同的事情，从 AWS 自己的舞台，到她自己搭建的一个平台。

_资料来自公开来源，于 2026 年核实。发现错误？[告诉我们](https://github.com/XR-Dev-Camp/xr-camp/issues)。_

## 标准聚焦

这个服务器使用的是 **HTTP**，由 IETF 标准化（最新的 HTTP 语义规范是 RFC 9110），包括本课所依赖的这些状态码。`fetch()`、它所交换的请求与响应对象，以及 CORS，都属于 WHATWG 的 **Fetch 标准**；你的 API 发送和接收的 JSON 遵循 **ECMA-404**，即 JSON 数据交换格式。要正确使用这些，都不需要框架，只需要理解每一个各自承诺了什么。

## 许可协议

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
