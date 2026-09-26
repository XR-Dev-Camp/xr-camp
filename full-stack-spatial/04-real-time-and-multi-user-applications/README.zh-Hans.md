# Real-Time and Multi-User Applications

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程：** `full-stack-spatial` · **课时：** `real-time-and-multi-user-applications-04` · **时长：** 约 17 小时 · 23 次学习，每次 45 分钟 · 每周 4 次，约 6 周

> **这是一节较长的课程（23 次学习）。** 一步一步来：每次学习仍然会以一个你亲手完成的成果结束，步骤之间休息一下也完全没问题。

---

> 构建一个小型协作式 3D 世界。

## 学习目标

完成本项目后，你将能够：

1. 解释什么是一次 WebSocket 升级（upgrade），以及为什么验证它需要用到一个 HTTP 请求已经携带的同一个会话 Cookie，而不是页面自己发明的一个令牌。
2. 构建一个小型的内存房间注册表：加入一个房间、离开它，并向除一个人之外的每个成员广播一条消息。
3. 以一个固定的最大速率发送位置更新，并在浏览器收到的更新之间进行插值，让一个远程虚拟形象的动作即使是分步到达，看起来也是流畅的。
4. 在服务器上验证、清理（sanitize）并限制聊天文本的速率，不依赖发送端客户端声称自己已经做过的任何事情。
5. 解释一个客户端本地的管理操作（静音）和一个由服务器强制执行的管理操作（屏蔽）之间的区别，并把两者都实现出来。
6. 从一条 WebSocket 消息把一份管理举报写入数据库，永远从举报者自己经过身份验证的会话中取得他的名字，绝不从消息体中取得。
7. 自动重新连接一个断开的 WebSocket，使用指数退避（exponential backoff）和抖动（jitter），而不是在它一恢复就立刻猛烈冲击服务器。
8. 凭记忆列出一个实时服务器绝不应该仅凭客户端一面之词就采信的内容——其中包括身份、速率、位置和房间成员资格。

## 先决条件

- **课程 5.3：数据库与空间应用数据**——本课复用它的账户、会话和 SQLite 配置，并在同一个数据库中添加一张新表（`reports`）。
- **课程 5.2：身份验证与用户账户**——会话、CSRF，以及本课的 WebSocket 升级所复用的那个 Cookie。
- **课程 5.1：后端与 API 基础**——路由、JSON 请求体和状态码。
- 能够自如地同时运行两件事：两个终端，以及——为了真正的测试——两个浏览器窗口。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| Node.js 22.5 或更高（推荐 LTS「24 Krypton」） | 运行服务器 | 免费 |
| npm（随 Node.js 一起提供） | 安装本课唯一的依赖包 `ws` | 免费 |
| 一个文本编辑器（例如 VS Code） | 编写服务器和客户端代码 | 免费 |
| 两个浏览器窗口或标签页（Chrome、Firefox、Safari 或 Edge） | 同时用不止一个成员测试这个房间——本课无法只靠一个人完整测试 | 免费 |

Node.js 可以从 [nodejs.org](https://nodejs.org/) 下载；中国大陆的学习者也可以使用 [npmmirror 的 Node.js 镜像](https://registry.npmmirror.com/binary.html?path=node/)。本课会安装一个 npm 包，`ws`——这是整个 XR Camp 中的第一个依赖（课程 5.1-5.3 只使用了 Node 自身内置的模块）。`npm install` 只需要一次互联网连接；如果 npmjs.com 速度很慢，改为运行 `npm install --registry=https://registry.npmmirror.com`。在那之后，`node_modules/` 就在磁盘上了，服务器和其他每一节课一样可以离线运行。

## 你将构建什么

课程 5.3 给了每个账户一个属于自己的场景数据库。本课把几个已登录的账户*彼此*连接在一起、同时在线：一个小型的共享房间，每一个打开页面的人都能看到其他所有人的移动，接近实时——通过一个 WebSocket 连接，而不是一个请求—响应式的 API。你将用课程 5.2 构建的会话 Cookie 来验证 WebSocket 升级本身，维护一个小型的内存注册表来记录谁在房间里，以受限的速率转发位置更新、并在客户端做插值让动作看起来流畅，添加经过清理且有速率限制的聊天，并给学习者一种屏蔽、静音和举报某人的方式——其中举报会被真正写入数据库，因为这是本课整个管理故事中唯一一个必须在重启后存活、并最终送达一个人手中的部分。

这是贯穿第 5 阶段的持续性**虚拟文化展览**的第四步：5.1 给了它一个 API，5.2 给了它账户，5.3 给了它一个真正的数据库，而本课给了它同一时间、同一个房间里的其他人。课程 5.5 会回到这个完全相同的服务器上，去找出并修复一个像这样的实时功能容易出现的安全问题。

参考答案在 [`completed/`](completed/) 中；起始代码在 `server/` 和 `js/` 中共有 **16 个编号的 TODO**，其中 `db.js`、`auth.js`、`sessions.js`、`rateLimit.js`、`cookies.js` 和 `routes.js` 都被延续下来并已完成（本课不会重新教授账户或 SQLite），这样你就能专注于新的内容：WebSocket 升级、房间、速率限制、清理、管理、插值和重新连接。

## 文件夹说明

```text
04-real-time-and-multi-user-applications/
├── README.md
├── starter/                      # begin here
│   ├── index.html, styles.css
│   ├── js/
│   │   ├── net.js                # TODO 12, 13: reconnect, throttled sends
│   │   ├── scene.js              # TODO 14: interpolation
│   │   └── main.js               # TODO 15, 16: chat, block/mute/report UI
│   └── server/
│       ├── migrations/           # numbered .sql files, run in order
│       ├── db.js, auth.js, sessions.js, rateLimit.js, cookies.js, routes.js   # carried over
│       ├── validation.js         # TODO 2: position, chat, and report checks
│       ├── sanitize.js           # TODO 3: chat text cleanup
│       ├── wsAuth.js             # TODO 4: authenticate the upgrade
│       ├── rooms.js              # TODO 5: join, leave, broadcast, presence
│       ├── realtime.js           # TODO 6-9: position, chat, block, report
│       ├── server.js             # TODO 10: the `upgrade` event
│       └── server.test.js        # TODO 11: two-client assertions
├── completed/                    # reference solution
├── challenges/                   # Three challenges: Foundation is required
├── tests/                        # self-review checklist
├── assets/
└── screenshots/
```

## 环境配置

1. 打开一个终端，运行 `node --version`。你需要 22.5 或更高版本；本课程是针对 Node 24（当前的 LTS 版本）编写和测试的。
2. `cd` 进入 `starter/server`，运行 `npm install`——这是 XR Camp 中第一节需要安装东西的课，它恰好只安装一个包，`ws`，锁定在 [`package.json`](starter/server/package.json) 中的确切版本。`node_modules/` 会被创建在磁盘上，但绝不会被提交到版本库（见 `.gitignore`）。
3. 把 `starter/server/.env.example` 复制为 `starter/server/.env`（只有当 8880 端口已经被别的东西占用时，才需要调整 `PORT`）。
4. 用任意静态文件服务器从仓库根目录提供整个仓库（例如 `python3 -m http.server 8766`，或者本课程自己的工具已经在运行的那一个），这样 `starter/index.html` 就会通过 `http://` 打开，而不是 `file://`。
5. 在第二个终端中，从 `starter/server` 运行 `node server.js`。你应该会看到 `Real-time room server listening on http://127.0.0.1:8880`，以及一次性的一行 `ExperimentalWarning: SQLite is an experimental feature`。两者都是预期之内的；见故障排查。
6. 打开已提供的 `starter/index.html`，注册一个账户，并登录。在 TODO 10（WebSocket 升级）完成之前，房间面板会出现，但什么都不会连接——在这个阶段这是预期之内的。
7. 从第 15 步开始的每一次测试，都请在**两个**浏览器窗口中打开页面（或者一个普通窗口和一个隐私/无痕窗口），用两个不同的账户登录，观察一个如何影响另一个。

## 分步讲解

### 规划你的学习节奏

| 节次 | 你要做的事 | 完成后你将拥有 |
| --- | --- | --- |
| 1 | 阅读这份分步讲解和起始文件；运行服务器，确认 `node --version`、`npm install` 和 `node server.js` 都能正常工作。 | 起始代码正在运行，以及前方 16 个 TODO 的一份计划。 |
| 2 | TODO 1：编写 `migrations/002_create_reports.sql`。 | `node --test` 能顺利通过迁移，不报错（针对 `reports` 本身的断言之后再加）。 |
| 3 | TODO 2a-b：`validation.js` 中的 `validatePosition` 和 `validateChatText`。 | 一个简单的草稿脚本（或调试器）能显示两者都会拒绝一个越界或空值。 |
| 4 | TODO 2c：`validateReport`。 | 同样的简单检查，用于一份缺少原因的举报。 |
| 5 | TODO 3：`sanitize.js` 中的 `sanitizeChatText`。 | `node --test`（一旦第 16 步写好）会检查这一点，但现在先手动确认控制字符和多余空白都被移除了。 |
| 6 | TODO 4：`wsAuth.js` 中的 `authenticateUpgrade`。 | 一个已经可以调用、但尚未接入 `server.js` 的函数（那是第 15 步的事）。 |
| 7 | TODO 5a-b：`rooms.js` 中的 `joinRoom`、`leaveRoom` 和 `presenceList`。 | 一个你可以从草稿脚本中操练的房间注册表。 |
| 8 | TODO 5c：`rooms.js` 中的 `broadcast`，包括被屏蔽监听者的过滤。 | 整个 `rooms.js` 都已完成。 |
| 9 | TODO 6：`realtime.js` 中的 `handlePosition`。 | 位置消息受到速率限制、经过验证，并被转发——一旦第 15 步完成就可以测试。 |
| 10 | TODO 7：`isChatRateLimited` 和 `handleChat`。 | 聊天经过验证、清理、速率限制，并被转发。 |
| 11 | TODO 8：`handleBlock`。 | 屏蔽会切换 `blockedUserIds`，并加以确认。 |
| 12 | TODO 9：`handleReport`。 | 一份举报会从服务器自己的花名册中解析出目标的当前用户名，并调用 `insertReport`。 |
| 13 | 现在 TODO 6-9 都已完成，从头到尾重新阅读一遍 `realtime.js`，检查它使用服务器自己对一个连接身份的记录、而不是刚刚收到的消息的每一处。 | 用你自己的话，为学习目标 8 写下答案笔记。 |
| 14 | TODO 10：`server.js` 中的 `upgrade` 事件。 | 第一个真正端到端的时刻：打开两个浏览器标签页，用两个账户登录，看到彼此的虚拟形象和花名册行出现。 |
| 15 | TODO 11a-b：完成 `server.test.js` 中的双客户端在场/位置/聊天测试，以及它的清理测试。 | 又多了两个通过的测试。 |
| 16 | TODO 11c-d：完成举报和屏蔽的测试；运行 `node --test` 直至全部通过。 | 整个服务器都拥有一个全绿的测试套件。 |
| 17 | TODO 12a-b：`js/net.js` 中的 `backoffDelay` 和 `scheduleReconnect`。 | 停止服务器，观察状态横幅宣布重新连接的尝试，重启服务器，观察它自行恢复。 |
| 18 | TODO 13：`js/net.js` 中带速率限制的 `sendPosition`。 | 按住一个移动按钮不再每秒发送超过 10 条位置消息（在网络面板中检查 WS 帧）。 |
| 19 | TODO 14a-b：`js/scene.js` 中的 `setRemoteTarget` 和 `currentInterpolated`。 | 打开两个标签页时，另一位学习者的虚拟形象会在位置之间滑动，而不是跳跃。 |
| 20 | TODO 15：`js/main.js` 中聊天表单的提交处理函数。 | 聊天在两个标签页中都能正常工作，且顺序正确。 |
| 21 | TODO 16a-c：`js/main.js` 中的 `toggleMute`、`toggleBlock`、`openReport`/`closeReport`。 | 静音、屏蔽和举报都能从花名册表格中正常工作；如果你检查数据库，会看到一条举报出现（见故障排查）。 |
| 22 | 从头到尾完成 [`tests/checklist.md`](tests/checklist.md)，包括它的「3D 与 XR（人工）」部分，用真实键盘，如果有的话，再用一次屏幕阅读器。 | 每一项都已勾选，或者对未能测试的部分及原因做了说明。 |
| 23 | 完成必做的[基础挑战](challenges/challenge-1.zh-Hans.md)，然后完成创意或探索挑战中的一个，然后**提交作业**。 | 截图、你的学习日志，以及一个可以展示的项目。 |

### 第 1 步：阅读一个 WebSocket 连接的形状（暂时没有 TODO）

一个 HTTP 请求只回应一次然后结束。一个 WebSocket 也是从一个 HTTP 请求开始的——带有一个 `Upgrade: websocket` 请求头——但服务器不是返回一个响应体，而是把底层的 TCP 连接交给一个不同的协议，之后任何一方都可以在任意时刻发送一条消息，只要这个连接保持打开。`server.js` 在 Node 自己的 `upgrade` 事件上监听这一点，就在那个已经响应 `/api/...` 路由的同一个 `http.Server` 上。这个事件本身完全不能证明是谁在发起请求；`wsAuth.js`（第 6 步）才是真正检查这一点的地方。

### 第 2 步：唯一一张新表（TODO 1）

打开 `server/migrations/002_create_reports.sql`。里面的注释描述了每一列，风格和 `001_create_users.sql`（已经完成，延续自课程 5.3）相同：每个文件一条语句，普通的列类型，用 `REFERENCES` 表示唯一的那个外键。

```sql
-- from 001_create_users.sql, already finished:
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL
);
```

`db.js`（延续下来的，已完成）已经导出了 `insertReport` 和 `listReportsForRoom`——一旦这个迁移存在，这些函数就有了可以写入和读取的表。

### 第 3 步：验证一个位置和一条聊天消息（TODO 2a-b）

打开 `server/validation.js`。`validateCredentials`（已经完成，来自课程 5.2）展示了这个项目中每一个验证器都遵循的模式：检查形状，收集每一个问题而不是在第一个问题处停下，并返回 `{ valid, errors, value }`，其中 `value` 只包含这个服务器自己判断为接下来可以安全使用的那些字段——绝不包含输入中恰好携带的任何额外内容。

```js
// The shape every validator in this file follows:
export function validateSomething(input) {
  const errors = [];
  // ...checks that push to `errors`...
  if (errors.length > 0) return { valid: false, errors, value: null };
  return { valid: true, errors: [], value: { /* only the checked fields */ } };
}
```

`validatePosition` 检查四个数字；`validateChatText` 检查一个字符串的长度。两者都不会改变文本本身——那是 `sanitizeChatText`（第 5 步）的工作，被刻意分开（见关键代码解析）。

### 第 4 步：验证一份举报（TODO 2c）

`validateReport` 检查 `reason` 是否是一份固定列表（`REPORT_REASONS`）中的一个，而不是任意字符串——之后审阅举报的管理者需要一小组已知的类别，而不是举报者可能用一百种不同方式措辞的自由文本。

### 第 5 步：清理聊天文本（TODO 3）

打开 `server/sanitize.js`。`js/main.js` 已经用 `textContent` 渲染每一行聊天，无论内容是什么，它都不能执行一个 `<script>` 标签——那为什么还要在服务器上也做清理呢？因为 `textContent` 是*这一课*客户端的属性，没有任何东西能阻止未来的一个客户端、一个调试工具，或者一次接入另一个聊天系统的集成改用 `innerHTML`，而它并不知道这段文本从未被检查过这一点。深度防御意味着两层都不会信任对方已经完成了这项工作。

### 第 6 步：验证升级请求（TODO 4）

打开 `server/wsAuth.js`。它复用了课程 5.2 已经写好的两个函数——`parseCookies` 和 `getSession`——和 `routes.js` 中的 `requireAuth` 对一个普通 HTTP 请求所做的完全一样。这里唯一新的地方是它*何时*运行：在一个 WebSocket 连接被允许存在之前，而不是之后。

### 第 7-8 步：房间注册表（TODO 5a-c）

打开 `server/rooms.js`。一个房间是一个 `Map<connectionId, member>`，保存在这个模块自己的内存中。`joinRoom` 和 `leaveRoom` 是成员关系的两面；`presenceList` 把房间的成员转换成一份朴素的、由服务器构建的快照，作为一位刚加入的学习者收到的「已经有谁在这里」。`broadcast` 是 `realtime.js` 中每一个消息处理函数都会调用的、用来把一条消息扇出去的唯一函数——这也是唯一一个强制执行屏蔽（TODO 8）的地方，因此没有任何一个独立的处理函数能够忘记检查它。

### 第 9 步：位置更新（TODO 6）

打开 `server/realtime.js`。`handlePosition` 在验证*之前*先做速率限制——一个发送更新速度快于 `POSITION_MIN_INTERVAL_MS` 的客户端不会得到任何回应，甚至连一个错误都没有，因为在一个健康的连接中这种情况会持续发生（见第 18 步），不是一个值得报告的错误。每一条被转发的位置都从 `member.userId` 和 `member.username`——服务器自己对这个连接身份的记录——中取得发送者的名字，绝不来自传入的消息，因为消息可以声称自己是任何人。

### 第 10 步：聊天（TODO 7）

`isChatRateLimited` 为这个连接自己最近的发送时间保留一个滑动窗口；`handleChat` 检查它、验证、清理，并且——和位置更新不同——也把这条消息转发回它自己的发送者，这样每个人的聊天记录（包括发送者自己）都会以相同的顺序显示消息。

### 第 11 步：屏蔽（TODO 8）

`handleBlock` 很短：从 `member.blockedUserIds` 中添加或移除一个 userId。所有真正的强制执行早已存在于 `rooms.js` 的 `broadcast`（第 8 步）中——这个函数只需要维护这个 Set 的正确性。

### 第 12 步：举报（TODO 9）

`handleReport` 从房间自己的花名册（`presenceList`）中解析出被举报账户的*当前*用户名，而不是从客户端发来的任何内容中解析——否则一个客户端就可以针对一个它自己选择、和 `targetUserId` 毫无关系的用户名提交举报。举报者的 id 永远来自 `member.userId`，原因和登录从不从请求体中取一个账户 id 是一样的。

### 第 14 步：接通升级（TODO 10）

打开 `server/server.js`。`upgrade` 事件是本课的全部身份验证和房间逻辑真正连接到一个真实网络套接字的唯一地方：检查路径，调用 `authenticateUpgrade`，如果失败就用一个普通的 HTTP 响应拒绝它，否则就把这个套接字交给 `wss.handleUpgrade`，并调用 `handleConnection`。这也是你第一次能真正测试这一切的时刻——完成之后就打开两个浏览器标签页试试看。

### 第 15-16 步：完成测试（TODO 11a-d）

打开 `server/server.test.js`。两个身份验证测试已经能通过（课程 5.2 的会话逻辑从未改变）；四个 TODO 测试则考验自那以来构建的一切。请仔细阅读每一个测试上方的注释——特别要注意，在已完成的测试中，`collectMessages` 是在等待（await）一个套接字的 `'open'` 事件*之前*就附加到它上面的，而不是之后：服务器可以在握手一完成的瞬间就作出回应，而这可能早于你测试函数下一行原本会执行的时刻。晚附加监听器一拍，就会悄无声息地丢失那条消息。

### 第 17 步：重新连接（TODO 12a-b）

打开 `js/net.js`。`backoffDelay` 是「带完全抖动的指数退避」：每一次重试都会等待一段*随机*的时间，上限是一个每次尝试都翻倍的天花板，并被限制在 `MAX_DELAY_MS` 之内。这种随机性不是装饰——如果没有它，每一位 Wi-Fi 同时断开的学习者都会在同一时刻步调一致地重试，这几乎是一个正在努力恢复的服务器所能遇到的最糟糕的模式。

### 第 18 步：限制位置发送的速率（TODO 13）

`sendPosition` 会丢弃任何在它上一次真正发送之后、不到 `POSITION_SEND_INTERVAL_MS` 就发生的调用。`js/main.js` 可以在每一帧动画中都调用它，而不需要知道或关心这个限制——这也正是为什么 `server/realtime.js` 自己的速率限制（第 9 步）不能被去掉：这个客户端侧的节流只是一种礼貌，不是一个保证，因为没有任何东西能阻止一个不同的客户端无视它。

### 第 19 步：插值远程位置（TODO 14a-b）

打开 `js/scene.js`。一条位置消息最多每秒到达 10 次；这个场景的渲染频率远高于此。`setRemoteTarget` 记录一个虚拟形象*曾经在*哪里（`from`）以及它*正要去*哪里（`to`）；`currentInterpolated`（由渲染循环在每一帧调用，已经完成）在 `INTERPOLATION_MS` 的时间内于两者之间做缓动。有一个值得反复阅读的细节：`from` 被设置为这个虚拟形象*当前实际渲染出的*位置，而不是它之前的目标——因此一次在缓动过程中途到达的更新，会从眼睛实际所在的位置开始下一次缓动，不会出现任何肉眼可见的跳变。

### 第 20 步：发送聊天（TODO 15）

打开 `js/main.js`。这个提交处理函数很短，因为有趣的工作已经在服务器上完成了（第 10 步）：它只需要读取输入框内容，防范一个空消息或一个缺失的连接，并调用 `net.sendChat`。

### 第 21 步：从界面上屏蔽、静音和举报（TODO 16a-c）

`toggleMute` 从不与服务器通信——见关键代码解析，了解为什么这在这里是正确的做法，而不是一个走捷径。`toggleBlock` 则会通信，通过 `net.sendBlock`。`openReport`/`closeReport` 管理一个小表单的可见性和焦点；一旦你写好了这两个函数，真正的举报会由那个表单（已经完成的）提交处理函数发送出去。

## 关键代码解析

- **验证一个 `upgrade` 事件，而不是一次 `WebSocket` 构造函数调用。** 浏览器的 `WebSocket` 无法设置自定义请求头，因此它无法像 `fetch()` 那样携带一个持有即生效的令牌（bearer token）。对于一个同源的 URL，它*能*做的是发送页面的普通 Cookie——就像一个带 `credentials: 'include'` 的同源 `fetch()` 那样。`wsAuth.js` 会在协议切换之前那个普通的 HTTP 请求上读取这个 Cookie，早于 `ws` 看到这个套接字之前。
- **验证和清理是两个不同的函数。** `validateChatText` 回答是或否；`sanitizeChatText` 改变这个值。把它们分开意味着每一个都很容易单独进行单元测试，也意味着未来一次规则变化（比如新增一个被禁止的字符）只需要改动恰好一个函数，而不是一个同时还会改变自己输入的验证器。
- **服务器端的速率限制，即使客户端已经自我节流。** `js/net.js` 的 `sendPosition` 和聊天表单都会拦下过快的发送——但一个被修改过或手写的客户端不会这样做。`server/realtime.js` 自己的限制（`POSITION_MIN_INTERVAL_MS`、`CHAT_MAX_MESSAGES`）才是真正强制执行这条规则的地方；客户端版本的存在只是为了做一个好公民，并避免浪费的往返请求。
- **静音是本地的；屏蔽由服务器强制执行。** 静音立即改变你自己浏览器所显示的内容，不需要往返请求——适合「我个人不想看到这个」，一种只需要你自己的浏览器去执行的偏好。屏蔽则要求服务器完全停止把那个人转发给你，因此即使他们的客户端试图无视它，屏蔽依然有效——适合「让这个人无法再联系到我」，一个只有控制着真正发送内容的服务器才能做出的保证。
- **插值把分步动作变成了运动。** 每秒十次更新本身并不流畅；在一次更新预计所需的时间内，在最后两个已知位置之间做缓动，才让它读起来像是连续的运动——实时游戏和协作工具正是出于同样的原因使用这项技术。
- **带完全抖动的指数退避。** 每次失败的尝试后都把等待时间翻倍，直到一个上限，这样能防止一个已经在挣扎的服务器因为挣扎得越厉害就受到更猛烈的冲击。在此之上再加上随机性（而不是每次都等待完整的上限），能把许多同时掉线的客户端的重连尝试分散开，而不是让它们全部在同一时刻重试。

## 3D 与 XR 无障碍

- **场景描述。** `#scene-description` 用纯文本说明你自己的大致位置、朝向，以及房间里还有谁——由 3D 视图所渲染的同一份数据构建而成（WCAG 1.1.1、1.3.1）。
- **仅用键盘移动。** 每一次移动和转向都是一个按钮，而不是一个拖拽手势——这个项目从不要求学习者在 3D 画布内点击并拖拽来参与这个房间。
- **3D 视图的一个 2D 孪生体。** 花名册表格始终保存着每个成员精确的位置和朝向，无论 WebGL 是否可用，也无论 3D 视图是否已经渲染出来。
- **聊天是一个实时区域，不只是像素。** `#chat-log` 带有 `role="log"` 和 `aria-live="polite"`，因此一条新消息不需要焦点移动到那里就会被播报。
- **减少动态效果与一个暂停控件。** 当设置了 `prefers-reduced-motion: reduce` 时，虚拟形象的待机摆动会以暂停状态开始，而**暂停动画**按钮（带有 `aria-pressed`）无论这个偏好设置如何都能正常工作。学习者自己的虚拟形象从不摆动——见 `js/scene.js` 中关于原因的注释，以及下方的常见错误。
- **舒适度。** 相机在整节课中都是固定的；加入一个房间、移动或聊天，都绝不会移动视角本身。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| 花名册中的每一个操作按钮都有一个能区分身份的 `aria-label`（「Mute: alice」，而不只是「Mute」） | 2.5.3、4.1.2 | 好几行可能有着标签完全相同的按钮；无障碍名称必须说明它作用于哪个成员。 |
| `#chat-log` 带有 `role="log"` 和 `aria-live="polite"` | 4.1.3 | 一条新的聊天消息不需要把焦点移入日志中就会被播报。 |
| 花名册表格带有一个 `<caption>` 以及 `<th scope="col">`/`<th scope="row">` | 1.3.1 | 屏幕阅读器会播报每一个数字属于哪个成员、哪个轴。 |
| 移动是键盘可操作的按钮，绝不是画布拖拽 | 2.1.1 | 加入房间并在其中移动，完全可以只用 `Tab` 和 `Enter`/空格键完成。 |
| 动画尊重 `prefers-reduced-motion`，并提供一个暂停按钮 | 2.2.2 | 学习者没有要求的自行启动的动态效果，必须能够被停止。 |
| 每个用 `list-style: none` 设置样式的 `<ul>` 都保留 `role="list"` | 良好实践 | 否则 Safari 会从一个被去掉列表样式的 `<ul>` 中丢失列表语义。 |

## 性能注意事项

- **速率限制同时也是一份带宽预算。** 每个连接每秒十次位置更新，是本课选择的上限，因为一个小型房间（十几位学习者左右）能舒适地保持在一条家庭网络或一个共享校园网络所能承载的范围之内；一个大得多的房间就需要降低这个上限、批量处理更新，或者只向附近的成员转发。
- **`broadcast` 会跳过已关闭的套接字。** 在每一次 `send` 之前检查 `member.ws.readyState === member.ws.OPEN`，能避免向一个已经在关闭途中的套接字写入所带来的开销（以及抛出的错误）。
- **插值很廉价；更多历史记录则不然。** 本课对每个远程虚拟形象只保留一个 `from` 位置和一个 `to` 位置——在这个更新速率下，这已经足够实现流畅的动作。一个还试图在更新之间*预测*运动的系统会需要更多的历史记录和更多的数学运算，而这份收益是大多数小型房间并不需要的。
- **心跳间隔调用了 `unref()`。** `setInterval(...).unref()` 告诉 Node，仅凭这一个计时器不应该让进程持续运行——这对 `server.test.js` 很重要，它需要服务器能够在测试文件之间完全关闭。

## 常见错误

| 错误 | 会发生什么 | 应该怎么做 |
| --- | --- | --- |
| 信任传入的 WebSocket 消息内部的一个 `userId` 或 `username` 字段 | 任何客户端都可以声称自己是任何人；一份举报、一条聊天消息或一次位置更新都可能被伪造成别人 | 始终使用服务器自己在 `member` 上的记录（在连接建立时、从经过身份验证的会话中设置一次） |
| 只在客户端限制位置发送的速率 | 一个被修改过或手写的客户端可以想多快发就多快发 | 在 `server/realtime.js` 中再次强制执行同样的限制，独立于客户端 |
| 在已经广播*之后*才检查 `if (Date.now() - member.lastPositionAt < ...)` | 速率限制没有任何作用——代价高昂的那部分（扇出给每一个其他成员）已经发生了 | 在验证或广播任何内容之前，先检查速率限制 |
| 让学习者自己的虚拟形象以和远程虚拟形象相同的方式摆动 | 3D 中显示的位置会与花名册表格中的精确数字、以及真正发送给服务器的数字产生偏差 | 只对远程虚拟形象做待机动画；学习者自己的虚拟形象永远精确地停留在上一次移动放下它的地方 |
| 用一个固定的延迟重新连接（`setTimeout(open, 1000)`） | 每一个连接同时掉线的客户端——比如一次共享 Wi-Fi 的抖动——都会在同一时刻反复步调一致地重试 | 带抖动的指数退避（TODO 12），让重试在时间上分散开来 |

## 故障排查

**`ExperimentalWarning: SQLite is an experimental feature and might change at any time`。** 这是预期之内的，每次导入 `node:sqlite` 都会出现。这是一条警告，不是一个错误——服务器会继续运行。

**登录后房间面板出现了，但什么都没有连接。** 在 TODO 10 完成之前，`server.js` 根本没有任何 `upgrade` 处理函数，因此 `js/net.js` 的每一次连接尝试都只会一直挂起，直到浏览器放弃。这在第 14 步之前是预期之内的。

**`Error: This test is not implemented yet — see TODO 11a`（或 11b/11c/11d）。** 在你完成那个 TODO 之前，这是预期之内的——这些是刻意留下的占位符，不是起始代码中的一个 bug。

**一个 WebSocket 连接上了，然后立刻以代码 `1008` 关闭。** `room` 查询参数没有匹配到 `rooms.js` 中的 `KNOWN_ROOMS`。`js/net.js` 总是请求 `main-hall`；检查你是不是只在两个文件中的一个里修改了这个字符串。

**用同一个账户登录的两个标签页表现怪异。** 本课的模型是每次登录对应一个连接，而不是每个账户对应一个连接；用同一个账户登录两次，会创建两个恰好共享同一个用户名的独立房间成员。请用两个不同的账户来正确地测试。

**在中国大陆，`npm install` 失败，或者非常慢。** 改为运行 `npm install --registry=https://registry.npmmirror.com`，而不是默认的注册表。

**一份举报似乎没有被保存。** 本课没有用来读回举报的界面（一个管理者的审阅工具超出了本课的范围）——从 `server/` 中运行 `node -e "const {db}=await import('./db.js'); console.log(db.prepare('SELECT * FROM reports').all())"`（不设置 `DB_FILE`，这样它读取的就是正在运行的服务器所使用的同一个文件），或者写一个简短的草稿脚本。

**8880 端口已经被占用。** 在 `server/.env` 中设置一个不同的 `PORT`，并相应地更新 `ALLOWED_ORIGIN`。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)**：添加一种「挥手」手势消息类型，并以位置更新被转发的相同方式转发它。
2. **[创意](challenges/challenge-2.zh-Hans.md)**：让这个房间反映出你自己的语言、文化或社区。
3. **[探索](challenges/challenge-3.zh-Hans.md)**：一个第二个房间，以及一种在它们之间移动的方式。

## 提交作业

1. 完成 [`tests/checklist.md`](tests/checklist.md)。
2. 拍摄截图：两个浏览器标签页各自显示对方的虚拟形象和花名册行，带有双方消息的聊天记录，以及 `node --test` 显示全部通过的终端输出。
3. 把它们保存在你的学习日志和作品集中。也可以和其他开发者分享：参见[在哪里分享你的作品和寻求帮助](../../docs/en/community.md)（英文）。
4. 学习日志问题：本课在客户端和服务器上都强制执行了同一条规则（速率限制、验证、「这个连接是谁」），并明确不信任客户端那一份副本。在你自己的项目中——本课或更早的一课——找出一个你只在界面上检查过某件事的地方，并解释一个打开了浏览器开发者控制台的学习者能对此做些什么。

## 延伸阅读

- [MDN: The WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)（英文）
- [MDN: Writing WebSocket servers](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers)（英文）
- [`ws` package documentation](https://github.com/websockets/ws)（英文）
- [AWS Architecture Blog: Exponential Backoff And Jitter](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/)（英文）
- [OWASP Cheat Sheet Series: WebSocket Security](https://cheatsheetseries.owasp.org/cheatsheets/WebSocket_Security_Cheat_Sheet.html)（英文）

## 值得认识的女性

**Sylvia Xueni Pan** 是伦敦大学金史密斯学院（Goldsmiths, University of London）的虚拟现实教授，在那里她共同主持虚拟与增强现实理学/文学硕士项目以及 SeeVR 实验室，研究共享虚拟空间中的社交互动、临场感和虚拟形象。她共同教授一门 Coursera 虚拟现实专项课程，据她自己统计，注册学习者已超过 10 万人。

她的研究——人们如何在一个共享虚拟空间中感知并与彼此的虚拟形象互动——正是本课这个小房间背后更深层的主题：位置更新、在场名单，以及本课的 WebSocket 连接所要创造的那种「有另一个人和我在一起」的感觉。

> **编者注：发布前请核实。** 「值得认识的女性」中的人物信息必须以一手资料核实，并在可行时于课程上线前与本人确认。参见 [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md)。

## 标准聚焦

WebSocket 协议本身是 IETF 的 RFC 6455，而本课客户端代码所调用的、面向浏览器的 API（`new WebSocket(...)`、它的事件、它的方法）由 WHATWG 的活标准 HTML Standard 定义，并与 W3C 协调一致。Node 的 `ws` 包（本课唯一的依赖）为服务器实现了 RFC 6455 的协议一侧；浏览器原生实现了客户端一侧，这正是为什么 `js/net.js` 从不需要一个库来使用这个协议。

## 许可协议

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
