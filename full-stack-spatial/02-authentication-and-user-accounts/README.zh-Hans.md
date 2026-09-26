# Authentication and User Accounts

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程：** `full-stack-spatial` · **课时：** `authentication-and-user-accounts-02` · **时长：** 约 19 小时 · 25 次学习，每次 45 分钟 · 每周 4 次，约 6 周

---

> 构建一个安全的学习者账户与个人资料原型。

---

## 学习目标

完成本项目后，你将能够：

1. 用 **`node:crypto` 的 `scrypt`**（一种慢哈希算法，用于安全地存储密码）为密码计算哈希，为每个用户使用一个随机的 salt（盐值），并使用 OWASP 密码存储速查表目前推荐的参数；用 **`timingSafeEqual`**（一种防止通过响应耗时推测出内容的安全比较方法）而不是 `===` 来校验一个密码是否匹配这个哈希。
2. 用简单的语言解释为什么一个会话 id 是一个「持有即生效」的令牌（bearer token），用 **`randomBytes`** 生成一个，并在服务器端同时强制执行一个空闲超时和一个绝对超时。
3. 用 **`HttpOnly`**（阻止 JavaScript 读取 Cookie）、**`SameSite=Lax`**（限制跨站请求携带 Cookie）和 **`Secure`**（仅在请求真正通过 HTTPS 时添加，要求 Cookie 只能通过加密连接发送）设置一个会话 Cookie，并解释每个属性各自阻止了什么。
4. 用同步器令牌模式（synchronizer-token pattern）为每一个会改变状态的请求添加 **CSRF（跨站请求伪造）防护**，并解释为什么仅凭一个 Cookie 无法证明一个请求确实来自你自己的页面。
5. 为登录和账户找回添加一个简单、诚实的内存**速率限制（rate limit）**，并说明它真正的局限性。
6. 把**所有权**（这是谁的数据行？）和**角色**（这个账户被允许做什么？）区分开，并用不同的检查分别强制执行它们。
7. 在没有邮件服务的情况下设计**账户找回**、**隐私控制**、**数据导出**和**账户删除**，并解释每一种设计各自接受了什么样的权衡。
8. 解释一个**passkey（通行密钥，WebAuthn）**会从这整节课中移除掉什么，并知道去哪里阅读它的规范。

## 先决条件

- **课程 5.1：后端与 API 基础**（展品设置 API、`node:http`、路由、验证、环境变量和 CORS——本课在它之上添加账户功能）。
- **课程 2.1：现代 JavaScript**（`async`/`await`、模块、`try`/`catch`）。
- 能够自如地在终端中运行命令，并用 `curl` 读取一个 JSON 响应。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| Node.js，一个 LTS 版本（22 或更高） | 运行服务器及其测试；不用再安装别的 | 免费 |
| 一个现代浏览器，带开发者工具 | 测试客户端，并查看 Cookie 和网络请求 | 免费 |
| 一个终端 | 启动服务器，运行 `curl` 和 `npm test` | 免费 |
| VS Code（或任意编辑器）和一个用于纯客户端视图的本地服务器 | 模块需要 `http://`，而不是 `file://` | 免费 |

Node.js 在 Windows、macOS 和 Linux 上运行方式相同，其安装程序在任何地方（包括中国大陆）都无需付费账号即可使用（可直接从 [nodejs.org](https://nodejs.org/) 下载，也可以通过 `winget`、Homebrew 或 `apt` 等包管理器安装）。

## 你将构建什么

课程 5.1 的展品有一个设置文件，被每一个打开页面的人共享。本课给每一位学习者自己的**账户**：一个只有她自己知道的用户名和密码，用来保护她自己保存的展品设置不受任何其他人（包括彼此）的影响。存在两种**角色**：**访客**（默认角色）只能读取或修改自己的设置，而**策展人**除此之外还可以撰写一条每位访客都能看到的简短说明，并查看哪些账户选择了共享自己的设置。

你在这里构建的几乎每一部分，都在回答一个真实产品必须诚实回答的问题：*当这一切出问题时会发生什么？* 当有人尝试一千个密码时会发生什么？当一个 Cookie 泄露时会发生什么？当一个标签页在共享电脑上一直保持登录状态时会发生什么？当有人想要离开并带走自己的数据时会发生什么？本课不会为了更快地做出一个演示而跳过这些问题——它们本身就是这节课。

参考答案在 [`completed/`](completed/) 中：一个 `server/` 文件夹（`server.js`、`routes.js`、`auth.js`、`sessions.js`、`rateLimit.js`、`validation.js`、`store.js`），旁边是课程 5.1 构建的同一类客户端（`index.html`、`styles.css`、`js/`），由同一个服务器作为静态文件提供。起始代码在两者中共有 **21 个 TODO**。

**这是一个学习用的原型，不是生产环境的安全建议。** 它尽可能贴近地遵循了当前具体的指导意见（在全文中都有引用，并在撰写本课时对照了 Node 自身的文档以及 OWASP 速查表系列进行了核对）——这是一个单进程、单机、没有数据库的课程项目所能做到的最大限度。在这套设计真正保护一个真实账户之前，请让具备安全专业知识的人评审它——并阅读课程 5.5，它会回到一个和这个项目一样的项目中，去发现并修复其中被刻意埋下的漏洞。

## 文件夹说明

```text
02-authentication-and-user-accounts/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html, styles.css   # The client page: finished
│   ├── js/main.js       # The account and settings panels: TODOs 17-20
│   ├── js/scene.js      # The 3D view: finished (Course 5.1's work)
│   └── server/
│       ├── server.js        # Routing, cookies, CORS, static files: TODO 16
│       ├── routes.js        # Route handlers: TODOs 8-15
│       ├── auth.js          # Password/recovery-code hashing: TODOs 1-2
│       ├── sessions.js      # The session store and CSRF tokens: TODOs 4-5
│       ├── rateLimit.js     # Failed-attempt counting: TODO 6
│       ├── validation.js    # validateCredentials(): TODO 3
│       ├── store.js         # Accounts and the curator's note on disk: TODO 7
│       ├── server.test.js   # node:test: TODO 21
│       ├── .env.example     # Copy to .env to change PORT, CURATOR_USERNAMES, etc.
│       └── package.json     # "type": "module", no dependencies
├── completed/            # Reference solution: open this last
├── challenges/            # Three challenges: Foundation is required
├── tests/checklist.md    # Self-review before you submit
├── assets/
└── screenshots/
```

本课的 `package.json` 依然没有列出任何依赖：每个服务器文件都只用到了 Node 自带的能力（`node:http`、`node:crypto`、`node:fs`、`node:test` 等等）。课程 5.4 是第一节添加真正依赖包（`ws`，用于 WebSocket）的课，并在本仓库的 `versions.json` 中锁定到一个确切版本。

## 环境配置

1. 在你其他 XR Camp 项目旁边新建一个文件夹 `exhibit-accounts`，把 `starter/` 文件夹的内容复制进去。
2. 在它的 `server/` 文件夹中打开一个终端，检查你的 Node 版本：`node --version`。你需要 22 或更高版本。
3. 在同一个文件夹中，把 `.env.example` 复制为 `.env`。在到达第 13 步之前，把 `CURATOR_USERNAMES` 设置为一个你打算注册的用户名（例如 `curator-jane`），这样你就有一个策展人账户可以用来测试。
4. 到第 16 步时启动服务器：`node server.js`（或者 `npm start`）。随时可以用 Ctrl+C 停止它。
5. 若要单独查看客户端、不带 API（就像它被测试的方式那样），通过任意本地服务器打开 `index.html`，例如 `python3 -m http.server 8766`。

## 分步讲解

### 规划你的学习节奏

| 节次 | 你要做的事 | 完成后你将拥有 |
| --- | --- | --- |
| 1 | 环境配置；阅读 `auth.js`、`sessions.js`、`rateLimit.js`、`store.js` 和 `routes.js`，看看哪些部分已经完成 | 为服务器的每个文件写出一句话的职责说明 |
| 2 | 第 1 步：为密码计算哈希并校验（TODO 1） | 在 Node REPL 中给 `hashSecret()` 两次输入同一个密码，会产生两个*不同*的字符串，而 `verifySecret()` 会说两者都是正确的 |
| 3 | 第 2 步：一次性找回码（TODO 2） | 在 REPL 中调用 `generateRecoveryCode()`，每次都返回一个可读的、用连字符分组的字符串 |
| 4 | 第 3 步：验证用户名和密码（TODO 3） | 给 `validateCredentials()` 输入一个过短的密码和一个带大写字母的用户名，能看出哪条规则失败了，以及用户名被转换成了小写 |
| 5 | 第 4 步：会话，以及两种超时（TODO 4） | 在 REPL 中先调用 `createSession()`，再调用 `getSession()`，能返回这个会话；用一个虚构的 id 调用 `getSession()` 会返回 `null` |
| 6 | 第 5 步：安全地比较一个 CSRF 令牌（TODO 5） | `verifyCsrfToken()` 只对分配给某个会话的那个确切令牌返回 `true` |
| 7 | 第 6 步：一个简单的速率限制（TODO 6） | 连续调用 `recordFailedAttempt()` 五次后，`isRateLimited()` 返回 `true`；第六次调用依然返回 `true` |
| 8 | 第 7 步：磁盘上的账户（TODO 7） | 在 REPL 中先调用 `insertAccount()`，再调用 `findAccountByUsername()`，会返回同一个账户 |
| 9 | 第 8 步：Cookie、`requireAuth` 和 `requireCsrf`（TODO 8） | 通读你自己写的代码，你能解释这个 Cookie 的四个属性各自的作用 |
| 10 | 第 9 步：`POST /api/auth/register`（TODO 9） | 一次 `curl` 注册会返回 `201`、一个公开的账户对象，以及一个找回码 |
| 11 | 第 10 步：`POST /api/auth/login`（TODO 10） | 一次正确的登录会设置一个 Cookie；一个错误的密码和一个未知的用户名会得到完全相同的 `401` 和消息 |
| 12 | 第 11 步：登出，以及 `GET /api/auth/me`（TODO 11） | 登出之后，再用旧的 Cookie 请求 `/api/settings`，会返回 `401` |
| 13 | 第 12 步：属于每个账户自己的设置（TODO 12） | 用两个不同的 Cookie 测试两个账户，永远不会看到或修改对方的设置 |
| 14 | 第 13 步：策展人的说明和面板（TODO 13） | 一个访客账户尝试编辑说明时会得到 `403`；你的策展人账户则可以 |
| 15 | 第 14 步：账户找回（TODO 14） | 一个来自注册时的找回码能重置密码、签发一个新的找回码，并让所有设备都登出 |
| 16 | 第 15 步：隐私、导出和删除（TODO 15） | `GET /api/account/export` 下载你的数据；`DELETE /api/account` 需要你的密码 |
| 17 | 第 16 步：接通服务器（TODO 16） | `node server.js` 启动，`http://127.0.0.1:8878/` 显示（尚未完成的）页面 |
| 18 | 第 17 步：打开时加载会话、设置和说明（TODO 17） | 在已登录状态下重新加载页面依然保持登录 |
| 19 | 第 18 步：账户表单（TODO 18） | 你可以在页面上完成注册、保存找回码、登录、登出，并用找回码重置密码 |
| 20 | 第 19 步：你的设置和策展人的说明（TODO 19） | 保存设置会改变 3D 视图；你的策展人账户可以编辑共享说明 |
| 21 | 第 20 步：在浏览器中处理隐私、导出和删除（TODO 20） | 隐私复选框、下载按钮和账户删除都能在页面上正常工作 |
| 22 | 第 21 步：用 `node:test` 测试（TODO 21） | `node --test` 打印出每个测试都通过（整个测试套件需要真实的时间——见第 21 步） |
| 23 | [`tests/checklist.md`](tests/checklist.md)，以及下方的 3D 与 XR 无障碍检查 | 一个完成的账户与设置面板 |
| 24 | 一个拓展挑战 | — |
| 25 | **提交作业** | 截图和一篇学习日志 |

### 第 1 步：为密码计算哈希并校验（TODO 1）

密码绝不能按照学习者输入的原样存储：任何曾经读取过这个文件的人（一个 bug、一次备份、一个攻击者）都会读到里面的每一个密码。**`scrypt`**（内置于 `node:crypto`，并对照 [Node.js `crypto.scrypt` 文档](https://nodejs.org/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback)核实过）会把一个密码变成一个**哈希（hash）**，其计算过程被刻意设计得又慢又耗内存，这样对一份被盗的文件尝试数百万次猜测也会很慢。[OWASP 密码存储速查表](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)目前对 scrypt 的首要推荐参数是 `N=2**17, r=8, p=1`——每个哈希大约需要 128 MiB 内存，这正是为什么 `auth.js` 把 scrypt 自身的 `maxmem` 选项调高到超过其 32 MiB 默认值的原因：

```js
export const SCRYPT_PARAMS = { N: 2 ** 17, r: 8, p: 1 };
// r * 128 * N bytes ≈ 128 MiB
```

每个密码还会得到自己独立的随机 **salt（盐值）**（`randomBytes(16)`），这样两个使用相同密码的账户就永远不会产生相同的哈希——如果没有盐值，攻击者只需要用一份预先计算好的常见密码表，就能一次性对每一个已存储的哈希、同时对每一个账户进行比对。盐值本身不是秘密：它就存放在哈希旁边，在本课格式所保持在一起的同一个字符串中：`scrypt$N$r$p$saltHex$hashHex`。

校验一个密码，意味着重新计算同一个哈希，并把它与已存储的值进行比较——用 **`crypto.timingSafeEqual`**，绝不用 `===`：

```js
return timingSafeEqual(actual, expected); // not `actual === expected`
```

`===` 对两个字节字符串是从左到右比较、遇到第一个不匹配就停止，所以耗费的时间会泄露出开头有多少个字节已经是正确的——这就是一种**时序侧信道（timing side channel）**。`timingSafeEqual` 对两个长度相同的缓冲区总是花费相同的时间（如果长度不同则会抛出错误，这正是为什么 `verifySecret()` 在调用它之前，会先把 `actual` 构造成与 `expected` 相同的长度）。

### 第 2 步：一次性找回码（TODO 2）

第 1 步中的同一对 `hashSecret()`/`verifySecret()` 函数，还保护着第二种秘密：一个**找回码**，在注册时生成一次（`randomBytes(10)`，格式化成可读的分组），并且只向学习者展示恰好一次。课程 5.5 阅读速查表的习惯在这里同样适用：关于*存储*这个秘密，没有任何新东西需要学习，因为它的存储方式和密码完全一样。

### 第 3 步：验证用户名和密码（TODO 3）

`validateCredentials()` 遵循 [NIST SP 800-63B](https://pages.nist.gov/800-63-3/sp800-63b.html)（数字身份指南，5.1.1.2 节）：检查一个密码的**长度**，而不是它的组成成分。这里没有任何规则要求必须有一个符号、一个数字或一个大写字母——那些规则只会把人们推向可预测的替换（比如 `P@ssw0rd1`），却没有真正有效地拖慢一个真实的攻击者，NIST 自己的指南也已经放弃了这些规则。本课的最低要求（10 个字符）是一个刻意保守的下限，高于 NIST 自身 8 个字符的最低要求。用户名在每一次检查和每一次查找之前都会被去除首尾空格并转换为小写，因此「Ana」和「ana」永远是同一个账户。

### 第 4 步：会话，以及两种超时（TODO 4）

一个**会话 id** 是一个持有即生效的令牌（bearer token）：谁持有它，谁就会被当作那个账户，因此 `createSession()` 用 `randomBytes(32)` 生成一个——256 位，远高于 [OWASP 会话管理速查表](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)要求的 64 位最低标准——绝不使用 `Math.random()` 或一个计数器，因为那样的话攻击者是可以预测的。`getSession()` 强制执行两种超时，两者都在服务器端检查（绝不信任客户端的时钟）：一个**空闲超时**（30 分钟没有请求）和一个**绝对超时**（8 小时，即使在持续使用中也是如此）。一个因为任何一种原因而过期的会话，会在下一次任何人试图使用它时被删除。

### 第 5 步：安全地比较一个 CSRF 令牌（TODO 5）

`verifyCsrfToken()` 使用了和第 1 步密码校验相同的 `timingSafeEqual` 模式，原因也相同：用 `===` 比较一个秘密令牌会一次泄露一个字节。一个 CSRF 令牌到底防范的是什么，会在第 8 步、当 `requireCsrf()` 被写出来可以使用之后，得到完整的解释。

### 第 6 步：一个简单的速率限制（TODO 6）

`rateLimit.js` 用一个普通的 `Map` 按键（`login:<username>` 或 `recover:<username>`）统计失败尝试的次数，并在 15 分钟内的第六次尝试上返回 `429 Too Many Requests`。这是一个真实的、能起作用的限制——同时也是一个真实的、有明确记录的限制：它存活在单个进程的内存中，因此一次重启就会清空它；而且，光是知道一个用户名，就足以在那个时间窗口内、故意通过让密码失败几次，把这个用户名的主人锁在外面。一个生产环境的服务会在此之外再加上按 IP 的限制，通常还会加一个验证码（CAPTCHA），并让计数器在每个服务器进程之间共享（课程 5.8）。

### 第 7 步：磁盘上的账户（TODO 7）

`store.js` 是唯一接触磁盘的文件，这和课程 5.1 的 `store.js` 遵循的是同一条规则。每个账户都是一个 JSON 对象——`{ id, username, passwordHash, recoveryCodeHash, role, privacySharesSettings, settings, createdAt }`——存放在 `data/accounts.json` 中的同一个数组里。`passwordHash` 和 `recoveryCodeHash` 永远是第 1 步产生的那种自描述字符串，绝不是明文。

### 第 8 步：Cookie、`requireAuth` 和 `requireCsrf`（TODO 8）

四个 Cookie 属性，以及每个属性各自阻止了什么：

| 属性 | 阻止了什么 |
| --- | --- |
| `HttpOnly` | 阻止 JavaScript（这个页面自己的代码，或者，如果它曾经在这里运行过，一个攻击者的代码）用 `document.cookie` 读取这个 Cookie。 |
| `SameSite=Lax` | 阻止大多数跨站请求携带这个 Cookie——这是 CSRF 防御的一层，而不是全部防御。 |
| `Secure`（只有当请求通过 HTTPS 时才会添加） | 阻止这个 Cookie 通过未加密的连接被发送。关于这在 `http://127.0.0.1` 上意味着什么，见「故障排查」。 |
| `Max-Age` | 阻止这个 Cookie 比它所代表的会话存活得更久——一旦过了这么多秒，浏览器会自行删除它。 |

`requireAuth(req)` 读取 `server.js` 已经解析进 `req.cookies` 里的 `sid` Cookie，查找对应的会话，并加载它所属的账户——每一个受保护的路由都从这一项检查开始。`requireCsrf(req, session, res)` 是第二项、独立的检查，只用在某些内容即将改变之前：它把一个 `X-CSRF-Token` 请求头与这个会话在登录时被分配到的令牌进行比较。**仅凭一个 Cookie 无法证明一个请求确实来自你自己的页面**，因为浏览器会自动把 Cookie 附加到来自*任何*网站的请求上——包括一个攻击者专门构造出来、想让你的浏览器在你用一个恰好已经登录的会话下做一件你从未要求过的事情的网站。这就是「跨站请求伪造（Cross-Site Request Forgery，CSRF）」的含义，而这正是一个自定义请求头（一个跨站 `<form>` 自己无法添加）所能防止的（[OWASP CSRF 防护速查表](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)把这称为同步器令牌模式，synchronizer-token pattern）。

### 第 9 步：`POST /api/auth/register`（TODO 9）

创建一个角色为 `visitor` 的账户（如果这个用户名在 `CURATOR_USERNAMES` 中，则为 `curator`），为它的密码和一个全新的找回码计算哈希，并把找回码恰好返回一次。注册**不会**自动帮你登录——第 10 步的登录是一个独立的、刻意设计的步骤，这样学习者就永远不会在没有证明过一次密码的情况下就处于登录状态。

```sh
curl -i -X POST http://127.0.0.1:8878/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"ana","password":"a-very-good-password"}'
```

### 第 10 步：`POST /api/auth/login`（TODO 10）

这个路由中最重要的一行，就是把「没有这个账户」和「密码错误」一视同仁地处理的那一行：

```js
if (!account || !passwordOk) {
  recordFailedAttempt(rateLimitKey);
  return sendJson(res, 401, { error: 'Invalid username or password.' });
}
```

把这两者区分开来，正是攻击者一次猜测一次地建立起一份真实用户名列表的方法。一次正确的登录会创建一个新的会话（绝不会重用一个登录之前就存在的会话——这正是防范**会话固定（session fixation）**的手段，即攻击者提前把一个会话 id 交给受害者），并设置第 8 步中描述的那个 Cookie。

### 第 11 步：登出，以及 `GET /api/auth/me`（TODO 11）

登出本身也是一个会改变状态的请求，因此它需要和其他任何请求一样的 CSRF 检查。`GET /api/auth/me` 之所以存在，是因为一次页面重新加载会丢失本课只保存在内存中（绝不放进第二个、JavaScript 可读的 Cookie 里）的那个 CSRF 令牌：客户端会在加载时调用它一次，从服务器端依然有效的会话中把自己的令牌重新取回来。

### 第 12 步：属于每个账户自己的设置（TODO 12）

整个「所有权」的想法可以浓缩成一行：

```js
const updated = await updateAccount(auth.account.id, { settings: value });
```

`auth.account.id` 来自**会话**，绝不来自客户端在请求体中发送的任何内容。一个客户端可以在一个 JSON 请求体里写入它想要的任何 id；这里从不要求它这样做，即使它这样做了，也绝不会被信任。一旦涉及一个真正的数据库，课程 5.3 会把同样的规则称为「按行的权限」。

### 第 13 步：策展人的说明和面板（TODO 13）

一项角色检查回答的是一个与 `requireAuth` 的「你是否已登录？」不同的问题——它问的是「你被允许做*这件事*吗，具体来说？」：

```js
if (auth.account.role !== 'curator') {
  return sendJson(res, 403, { error: 'Only a curator can edit this note.' });
}
```

`listSharedAccounts()` 会在构建响应*之前*，就先按 `privacySharesSettings` 进行过滤——一个从未选择加入共享的账户，绝不会以任何形式、哪怕是隐藏的形式，出现在策展人的面板中。

### 第 14 步：账户找回（TODO 14)

这门课程没有邮件服务器，所以不存在「重置链接已发送到你的邮箱」这种东西。取而代之的是第 9 步中的一次性找回码：谁能证明自己持有那个找回码，谁就可以设置一个新密码。同时丢失密码和找回码，就意味着这个账户无法找回——对于这样规模的项目来说，这是一个真实的、可以接受的权衡，也是一个值得大声说出来、而不是藏起来的权衡。一次成功的找回会撤销这个账户的每一个现存会话（`destroyAllSessionsForUser`），因为更改密码是一次凭证变更，而 OWASP 的会话管理速查表恰好要求这样做。

### 第 15 步：隐私、导出和删除（TODO 15）

两个小而刻意的设计选择：`updatePrivacy()` 是 `privacySharesSettings` 发生变化的唯一途径，并且它总是作用于 `auth.account.id`，绝不作用于请求体中提供的某个 id。`removeAccount()` 会再次要求输入当前密码，即使会话本身已经证明了是谁在发出请求——一个被盗用或共享的会话（比如一台没锁屏就被留下的笔记本电脑）依然可以读取这个页面，但不应该能够在没有进一步证明的情况下，悄悄删除真正所有者的账户。

### 第 16 步：接通服务器（TODO 16）

课程 5.1 的 API 使用了 `Access-Control-Allow-Origin: '*'`，这对一个以读取为主、无需登录的 API 来说是没问题的。这一课的 API 会设置一个 Cookie，因此不能使用通配符：浏览器会拒绝把一个带凭证（携带 Cookie）的响应暴露给一个被回复了 `*` 的源页面。`ALLOWED_ORIGIN` 必须改为指定一个确切的源，并与 `Access-Control-Allow-Credentials: true` 配对使用。

### 第 17 步：打开时加载会话、设置和说明（TODO 17）

`loadMe()` 遵循的是课程 5.1 的 `loadSettings()` 曾遵循的同一条「绝不能拒绝」的规则：一个 `401` 意味着「服务器正在运行，没有人登录」（这不是一个错误）；任何其他失败——完全没有服务器，或者本仓库自身的无障碍检查所使用的那种普通静态服务器——都意味着「离线」，而无论哪种情况，页面都必须渲染出一些合理的内容。

### 第 18 步：账户表单（TODO 18）

注册、登录、登出和找回，都接入了第 9-11 步和第 14 步构建的路由。找回码会显示在页面中一个带有 `user-select: all` 的 `<output>` 元素里（见 `styles.css`），这样便于选中和复制——绝不会用浏览器的 `alert()`，因为有些屏幕阅读器对它的播报效果很差，而且它一旦被关闭就消失了。

### 第 19 步：你的设置和策展人的说明（TODO 19）

课程 5.1 构建的同一个设置表单，现在每一次 `PUT` 和 `DELETE` 都会带上 `credentials: 'include'` 和一个 `X-CSRF-Token` 请求头一起发送。一个策展人说明的表单只会出现在已登录的策展人面前；其他所有人看到的说明都是只读文本。

### 第 20 步：在浏览器中处理隐私、导出和删除（TODO 20）

`export-button` 的处理函数展示了在没有专门服务器路由的情况下，客户端下载一个文件的完整模式：用 fetch 获取 JSON，把它包进一个 `Blob`，用 `URL.createObjectURL` 处理它，点击一个临时的 `<a download>`，然后用 `URL.revokeObjectURL` 释放它，好让浏览器能回收内存。

### 第 21 步：用 `node:test` 测试（TODO 21）

`fetch()`（Node 自己的实现，基于 undici 构建）不是一个浏览器：它不会替你存储或重新发送 Cookie。每一个需要保持登录状态的测试，都会从一次登录响应中读取 `Set-Cookie` 请求头，并在之后的请求中把它作为 `Cookie` 请求头发回去——`server.test.js` 中的 `sessionCookieFrom()` 就做了这一次，供每个测试复用。**这个测试套件是刻意设计得很慢的**：有几个测试会以第 1 步中 OWASP 推荐的成本参数计算一次密码哈希，还有一些测试（找回、删除）在一次请求中会不止一次地这样做。整个套件耗时几十秒是预期之内的，而不是一个 bug——正是这种缓慢，保护着一份真实的、被盗的密码文件。

## 关键代码解析

**`scrypt$N$r$p$saltHex$hashHex`。** 一个自描述的字符串，而不是四个独立的数据库列。成本参数和哈希本身一起存放，所以之后提高 `SCRYPT_PARAMS.N`（比如换了更快的服务器，或者有了新的指导意见）绝不会破坏一个在旧设置下计算出的密码哈希：`verifySecret()` 总是从存储的字符串中*读取*参数，绝不使用今天的常量。

**`memoryFor({ N, r })`。** `r * 128 * N + 1024 * 1024` 字节：这是 scrypt 自己的文档给出的内存计算公式，再加上一点安全余量。如果跳过这一步、使用默认的 `maxmem`，一旦 `N` 被提高到一个安全适用的大小，就会立刻抛出 `Invalid options: memory limit exceeded`。

**`destroyAllSessionsForUser(userId)`。** 在密码修改之后和账户删除之后都会用到：对*谁能够以这个账户身份行事*的一次改变，会让这个账户的每一个会话都失效，而不只是发起这次改变的那一个——包括一个攻击者可能已经持有的会话。

**`req.cookies` 只在 `server.js` 中设置一次。** 每个路由函数收到的 `req` 都已经带着一个解析好的 `cookies` 对象；没有任何路由文件需要知道「cookie」请求头的原始字符串格式，这和课程 5.1 对 CORS 与静态文件所使用的是同一种关注点分离。

**`publicAccount(account)`。** 在任何内容被发送给客户端之前，先剥离掉 `passwordHash` 和 `recoveryCodeHash`——它在每一个返回账户的路由的*末尾*被调用，而不是依赖之后有人记得这样做。一个泄露出去的哈希依然可以被离线攻击，且没有速率限制能阻止它，所以它依然被当作一个秘密来对待，即使它已经经过了哈希处理。

## 3D 与 XR 无障碍

这个展品本身与课程 5.1 相比没有变化：一个固定在四个预设位置之一的相机，唯一会动的东西是那块玉石。新的地方在于，控制它的设置现在属于一个已登录的账户，所以同样的检查依然适用，并且多了一项：

- **场景描述**（`#scene-description`）：由 3D 视图所读取的同一份 `EXHIBITS` 列表和同一个设置对象构建而成——一旦登录，就是已登录账户自己的设置；在那之前，则是共享的默认值。
- **2D 替代方案**：3D 视图下方的展品列表会说明每一件展品的名称，以及它当前是否被展示，无论是否已登录。
- **每一种交互都有键盘路径**：每一个控件都是普通的复选框、单选按钮、`<select>`、`<textarea>` 或 `<button>`——包括「Forgotten your password?」（忘记密码了？）这个展开按钮，它在两种状态下都能正确设置 `aria-expanded`。
- **减少动态效果**：共享的、未登录的视图会在首次加载时检查 `prefers-reduced-motion`；一旦登录，你自己保存的 `reducedMotion` 选择就会接管，这和课程 5.1 的本地存储回退机制所用的是同一种交接方式。**暂停动画**始终能正常工作，它的标签和 `aria-pressed` 状态始终与实际发生的情况一致。
- **舒适度**：相机只会移动到你选择的一个预设位置；无论是登录、保存设置，还是编辑策展人的说明，都不会自行移动相机或改变视图。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| 每个表单字段（账户表单、设置、策展人说明、删除确认）都有一个可见的 `<label>` | 1.3.1、3.3.2 | 一个没有标签的密码字段，没有屏幕阅读器能播报的名称。 |
| 来自 400 或 401 响应的字段错误以文字形式出现在表单旁边 | 3.3.1 | 「Invalid username or password」保持可读，并且保持在原地，而不是像 `alert()` 一样消失。 |
| 状态横幅是一个实时区域（`role="status"`） | 4.1.3 | 「Account created」「Signed in」以及离线消息能传达给屏幕阅读器用户，而无需他们主动去寻找它。 |
| 可见的文字开头就是每个按钮的无障碍名称 | 2.5.3 | 「Sign in」，而不是一个使用语音的人无法说出来的图标。 |
| 「Forgotten your password?」在一个真正的 `<button>` 上使用 `aria-expanded` | 4.1.2 | 屏幕阅读器会播报找回表单当前是否已展开，而不仅仅是点击后可能会发生一些事情。 |
| 3D 场景可以暂停，并且尊重减少动态效果 | 2.2.2 | 无论是否登录，动态效果都绝不会被强加给任何人。 |
| 每个用 `list-style: none` 设置样式的列表都保留 `role="list"` | 良好实践 | Safari 会在用 CSS 去掉项目符号后丢失列表语义。 |

## 性能注意事项

`store.js` 在每一次写入时都会读取并重写整个 `accounts.json` 数组——对本地测试的少数几位学习者来说完全够用，也刻意与课程 5.3 中真正的数据库形成对比，在那里一行数据的更新不需要触碰所有其他行。以本课的成本参数运行的 scrypt，是这个项目中*刻意*变慢的唯一地方：在一台普通笔记本电脑上，每次密码哈希预计需要半秒到几秒，在一台共享的教室电脑上会更久，请围绕这一点设计你的界面（在等待请求完成期间禁用提交按钮，值得在你自己的项目中加入，尽管本课的参考答案为了让重点保持在安全本身而省略了这个细节）。这个 3D 场景与课程 5.1 相比没有变化：三个简单的网格，没有贴图，动画只限于一个物体。

## 常见错误

| 错误 | 会发生什么 | 应该怎么做 |
| --- | --- | --- |
| 用 `===` 比较一个密码哈希、会话 id 或 CSRF 令牌 | 这次比较会一次泄露一个字节的时序信息 | 对每一次秘密值的比较都使用 `crypto.timingSafeEqual` |
| 对客户端说「没有这个用户名」和「密码错误」是两条不同的消息 | 攻击者能免费建立起一份真实用户名的列表 | 对两种情况都返回完全相同的状态码和消息 |
| 信任请求体中的一个用户 id 来决定要修改谁的数据行 | 任何已登录的账户都可能编辑或删除任何其他账户的数据 | 永远从会话中读取「这是谁」，绝不从请求体中读取 |
| 在一个会设置 Cookie 的 API 上设置 `Access-Control-Allow-Origin: '*'` | 浏览器会悄悄丢弃这个带凭证的响应；看起来什么都不起作用 | 指定一个确切的源，并与 `Access-Control-Allow-Credentials: true` 配对使用 |
| 在放行一个仅限策展人的操作之前只检查 `requireAuth` | 任何已登录的访客都能编辑策展人的说明 | 为任何应该由角色（而不只是账户）来把关的操作，添加一个独立的角色检查 |

## 故障排查

**即使登录成功，会话 Cookie 也从未被设置。** 检查 `.env` 中的 `ALLOWED_ORIGIN` 是否与你打开客户端所用的确切源（协议、主机*和*端口）一致，并确认你的 `fetch()` 调用带上了 `credentials: 'include'`——Firefox 和 Safari 都会在没有匹配的 CORS 凭证配置时，丢弃跨源响应中的 `Set-Cookie` 头，而且通常不会在控制台给出任何消息。

**一个标记为 `Secure` 的 Cookie 从未出现，即使在开发者工具的 Application 面板中也是如此。** 这在 `http://127.0.0.1` 上是正确的：`Secure` 的意思是「只通过 HTTPS 发送这个」，而浏览器甚至不会存储一个通过普通 HTTP 设置的 `Secure` Cookie。本课的服务器只有在请求真正是通过 HTTPS 到达时才会添加 `Secure`（见第 8 步)——像本课这样，在本地把一切都跑在普通 HTTP 上，是本地开发这类功能的正常、可接受的做法；生产环境部署无论如何都需要 HTTPS，到那时 `Secure` 就不是可选项了。

**即使你已经登录，依然出现 `403: Missing or invalid CSRF token`。** 登录会给你一个*新的* CSRF 令牌；一个在最近一次登录之前就一直开着的页面（或者在服务器重启、清空了每一个会话之后），用的是一个过时的令牌。再次调用 `GET /api/auth/me`，或者重新加载页面。

**`node --test` 看起来卡住了。** 它并没有卡住：有几个测试会以本课的 scrypt 成本参数计算一次（或两次、三次）密码哈希。在一台较慢的机器上，请给整个套件至少一分钟的时间，再去怀疑哪里出了问题。

**两个标签页、两个不同的账户，在争夺同一个 Cookie。** 每个浏览器配置文件只有一个 Cookie、一个会话：在一个标签页中登录，会让另一个标签页原以为自己拥有的那个账户登出（它下一次的请求会使用新的 Cookie）。使用一个隐私/无痕窗口，或者第二个浏览器，来并排测试两个账户。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)**：添加一个密码强度提示，且它绝不会拦住一个足够长的密码。
2. **[创意](challenges/challenge-2.zh-Hans.md)**：添加一个你自己选择的个人资料字段，默认设为私密。
3. **[探索](challenges/challenge-3.zh-Hans.md)**：添加一条账户锁定提示，以及一种无需管理员权限就能测试它的方式。

## 提交作业

1. 完成 [`tests/checklist.md`](tests/checklist.md) 中的每一项。
2. 给已登录的账户面板拍一张截图，再给显示每一项 `node --test` 检查通过的终端拍一张截图。
3. 把它们保存在你的学习日志和作品集中。等 XR Camp 社区上线后，也在那里分享它们。
4. 学习日志问题：如果你要为真实用户构建这个项目，你会最先改变本课的哪一个设计决定，为什么？

## 延伸阅读

- [Node.js docs: `crypto.scrypt`](https://nodejs.org/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback)（英文）
- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)（英文）
- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)（英文）
- [OWASP Cross-Site Request Forgery Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)（英文）
- [W3C Web Authentication (WebAuthn) Level 3](https://www.w3.org/TR/webauthn-3/)（英文），以及 [passkeys.dev](https://passkeys.dev/)，一份实现者指南（英文）

## 值得认识的女性

**王小云** 是一位中国密码学家。2004 年和 2005 年，她发表了针对 MD5 哈希函数的实用碰撞攻击，并证明了 SHA-1 远比其设计者预期的要脆弱——这项工作推动了整个行业都远离了这两种算法。她后来主导了中国 SM3 哈希标准的设计，该标准在 2018 年成为一项 ISO/IEC 标准，并于 2017 年当选中国科学院院士。

本课几乎每一步都依赖一个哈希函数（scrypt）：用来存储一个密码、一个找回码，以及安全地比较秘密值。王小云的职业生涯提醒我们，哈希函数并不是固定不变、永恒的事实——它们是由人设计出来的方案，有时只有仔细而耐心的密码分析才能发现其中的弱点。正是那种破解了 MD5 和 SHA-1 的严谨态度，才让像本课所引用的这些当前推荐意见，在不断变化时依然值得被反复核查。

> **编者注：发布前请核实。** 「值得认识的女性」中的人物信息必须以一手资料核实，并在可行时于课程上线前与本人确认。参见 [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md)。

## 标准聚焦

本课涉及的 Cookie、请求头和跨源规则，都属于 WHATWG 的活标准 **Fetch** 和 **HTML**，以及 IETF 的 **HTTP 状态管理机制**（RFC 6265，它定义了 `Set-Cookie` 及其属性）。全文引用的密码存储和 CSRF 相关指导，来自 **OWASP 速查表系列**——一份由社区维护、面向实践者的配套资料，它本身并不是一个标准组织，却是大多数一线开发者实际会去查阅的、最新最具体的指导意见。Passkey 则通过一份独立的规范来标准化，即 **W3C 的 WebAuthn** 规范，由 W3C 与 FIDO 联盟共同制定。

## 许可协议

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
