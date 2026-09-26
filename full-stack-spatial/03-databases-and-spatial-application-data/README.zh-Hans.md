# Databases and Spatial Application Data

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程：** `full-stack-spatial` · **课时：** `databases-and-spatial-application-data-03` · **时长：** 约 12 小时 · 16 次学习，每次 45 分钟 · 每周 4 次，约 4 周

---

> 保存并加载用户创建的场景或注释。

## 学习目标

完成本项目后，你将能够：

1. 为空间数据设计一个小型关系型模式（表、列，以及它们之间的关系）：位置、旋转，以及学习者附加到一个物体上的说明。
2. 解释为什么一个外键需要 `ON DELETE CASCADE`，并用 `PRAGMA foreign_keys = ON` 打开级联删除。
3. 用内置的 `node:sqlite` 模块从 Node.js 读写一个 SQLite 数据库，使用预处理语句，而不是用字符串拼接来构造 SQL。
4. 把一次多步骤的写入（替换一个场景中的每一个物体）包裹在一个事务中，让它要么完全成功，要么什么都不留下。
5. 在服务器代码中强制执行行级权限：所有者可以读取和修改自己的行；任何其他人只能读取被标记为公开的行。
6. 编写并运行一组小型的、编号的数据库迁移，并解释如果一个服务器在一个还没有运行过这些迁移的数据库上启动，会发生什么。
7. 描述一个数据库的数据生命周期（当一个账户被删除时，相关的行应该发生什么），并用 `VACUUM INTO` 安全地备份一个 SQLite 文件。
8. 在不削弱课程 5.2 的身份验证服务器的前提下扩展它：账户、会话和 CSRF 防护继续和之前完全一样地工作。

## 先决条件

- **课程 5.2：身份验证与用户账户**——本课从它已完成的服务器开始，并保持它的账户、会话和 CSRF 防护继续工作。
- **课程 5.1：后端与 API 基础**——路由、JSON 请求体、验证和状态码。
- 来自**课程 4（前端工程师）**的、对 `async`/`await` 和阅读调用栈的熟悉程度。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| Node.js 22.5 或更高（推荐 LTS「24 Krypton」） | 运行服务器，包括本课使用的内置 `node:sqlite` 模块 | 免费 |
| 一个文本编辑器（例如 VS Code） | 编写服务器和客户端代码 | 免费 |
| 一个现代浏览器（Chrome、Firefox、Safari 或 Edge） | 运行展品并测试你的成果 | 免费 |
| DB Browser for SQLite（可选） | 一种免费、离线、图形化查看本课创建的 `.sqlite` 文件内部的方式——本课程从不要求使用它，因为 `node server/inspect-db.js` 已经能从终端完成同样的工作 | 免费 |

Node.js 可以从 [nodejs.org](https://nodejs.org/) 下载；如果官方站点访问缓慢，中国大陆的学习者也可以使用 [npmmirror 的 Node.js 镜像](https://registry.npmmirror.com/binary.html?path=node/)。一旦安装了 Node.js，本课的任何部分都不需要 npm 包或互联网连接：`node:sqlite`、`node:http` 和 `node:test` 都随 Node 本身一起提供。

## 你将构建什么

课程 5.2 给了每一位学习者一个已登录的账户。本课给每一个账户一个真正用来保存自己作品的地方：一个小型 SQLite 数据库，保存**场景**（陶罐、篮环和玉石——同样来自 Web3D Developer 课程的那三件展品——的一次已保存布局）和**注释**（学习者附加到一个场景中某件展品上的一段简短说明）。你将设计这个模式，编写创建它的迁移文件，并构建 API 和权限检查，让所有者能够布置并保存一个场景、把它标记为公开或保持私密，并让它重新加载时和离开时一模一样——而另一位已登录的学习者只能查看一个公开场景，永远无法修改它。

这是贯穿第 5 阶段的持续性**虚拟文化展览**的第三步：5.1 给了它一个 API，5.2 给了它账户，而本课给了它真实的、结构化的、多行的数据，以及一个正在成长的应用所需要的关系和权限。课程 5.4 会重新拿起这个数据库，为它添加实时的多用户房间。

参考答案在 [`completed/`](completed/) 中；起始代码有 **13 个编号的 TODO**，大多数在 `server/` 中，另外有三个已完成的文件（`js/scene.js`、`server/auth.js`、`server/sessions.js` 和 `server/rateLimit.js`）被延续了下来，好让本课能专注于数据库本身。

## 文件夹说明

```text
03-databases-and-spatial-application-data/
├── README.md
├── starter/                # begin here
│   ├── index.html, styles.css, js/
│   └── server/
│       ├── migrations/     # numbered .sql files, run in order
│       ├── db.js           # the only file that touches SQLite
│       ├── validation.js, routes.js, server.js
│       ├── auth.js, sessions.js, rateLimit.js   # carried over from 5.2
│       ├── inspect-db.js, backup.js             # small command-line tools
│       └── server.test.js
├── completed/               # reference solution
├── challenges/               # Three challenges: Foundation is required
├── tests/                    # self-review checklist
├── assets/
└── screenshots/
```

## 环境配置

1. 打开一个终端，运行 `node --version`。你需要 22.5 或更高版本；本课程是针对 Node 24（当前的 LTS 版本）编写和测试的。
2. `cd` 进入 `starter/server`，把 `.env.example` 复制为 `.env`（只有当 8879 端口已经被你机器上的其他东西占用时，才需要调整 `PORT`）。
3. 用任意静态文件服务器从仓库根目录提供整个仓库（例如 `python3 -m http.server 8766`，或者本课程自己的工具已经在运行的那一个），这样 `starter/index.html` 就会通过 `http://` 打开，而不是 `file://`。
4. 在第二个终端中，从 `starter/server` 运行 `node server.js`。你应该会看到 `Scenes and annotations server listening on http://127.0.0.1:8879`——以及一次性的一行 `ExperimentalWarning: SQLite is an experimental feature`。两者都是预期之内的；见故障排查。
5. 在浏览器中打开已提供的 `starter/index.html`。你会看到展品及其默认布局；在第 12 步之前，「Your account」是唯一能正常工作的面板。

## 分步讲解

### 规划你的学习节奏

| 节次 | 你要做的事 | 完成后你将拥有 |
| --- | --- | --- |
| 1 | 阅读这份分步讲解和起始文件；运行 `node server/server.js`，确认它回应 `{ "ok": true }`。 | 起始代码正在运行，以及前方 13 个 TODO 的一份计划。 |
| 2 | 先在纸上设计 `scenes`、`scene_objects` 和 `annotations` 这几张表（列、类型，哪个外键指向哪里）；编写 TODO 1 的三个 `CREATE TABLE` 迁移。 | 三个已完成、但尚未运行的迁移文件。 |
| 3 | TODO 2：完成并打开 `runMigrations()`。 | `node server/inspect-db.js` 打印出全部五张表、它们的外键，以及四个已应用的迁移。 |
| 4 | TODO 3：`db.js` 中的用户函数（从 `insertUser` 到 `deleteUser`），使用预处理语句。 | `node --test` 能顺利通过注册和登录，不抛出错误（断言在第 13 步加入）。 |
| 5 | TODO 4：场景函数（从 `insertScene` 到 `deleteScene`）。 | 你手动插入的一个场景（在一个草稿脚本或调试器中），能从 `getSceneById` 中带着正确的所有者返回。 |
| 6 | TODO 5：`scene_objects` 函数，包括 `replaceSceneObjects` 中的一个事务。 | 为一个场景保存的三个物体，能以你给它们的相同位置返回。 |
| 7 | TODO 6：注释函数。 | 你插入的一条注释，能从 `listAnnotationsForScene` 中返回。 |
| 8 | TODO 7：场景元数据、场景物体和注释的验证。 | 一个带有非数字位置的场景，在到达 `db.js` 之前就被拒绝。 |
| 9 | TODO 8：`routes.js` 中的 `createScene`、`listMyScenes`、`listPublicSceneGallery`、`getScene`。 | 直接调用这些函数时，它们返回正确的形状；把它们接入 HTTP 是第 11 步的事。 |
| 10 | TODO 9：`updateScene` 和 `removeScene`，在每一次写入之前都有所有权检查。 | 重命名或删除一个不属于你的场景，在第 11 步存在之前、能通过 HTTP 测试之前，就已经被拒绝。 |
| 11 | TODO 10（注释路由）和 TODO 11（`server.js` 的路由，包括两种路径参数模式）。 | 每一个路由都能通过 `curl` 或浏览器的网络面板访问：创建、列出、查看、编辑、删除一个场景；添加和删除一条注释。 |
| 12 | TODO 12：接通 `js/main.js`——加载「My scenes」和「Public scenes」，保存你搭建好的布局，把一个已保存的场景重新加载回 3D 视图。 | 保存一个场景，重新加载页面，再把它加载回来：展品会准确地出现在你离开时的位置。 |
| 13 | TODO 13：完成 `server.test.js` 的断言；运行 `node --test` 直至全部通过；运行一次 `node server/backup.js`，确认 `server/data/backups/` 下出现一个新文件。 | 一个全绿的测试套件，以及一个你可以用 `node server/inspect-db.js` 打开的真实备份文件（把 `DB_FILE` 指向它）。 |
| 14 | 从头到尾完成 [`tests/checklist.md`](tests/checklist.md)，如果你有真实键盘和屏幕阅读器，两者都用上。 | 每一项都已勾选，或者对未能测试的部分及原因做了说明。 |
| 15 | 完成必做的[基础挑战](challenges/challenge-1.zh-Hans.md)。 | 你自己对这个模式或权限规则做出的一次小而刻意的拓展。 |
| 16 | 一个拓展挑战（创意或探索），然后**提交作业**。 | 截图、你的学习日志，以及一个可以展示的项目。 |

### 第 1 步：阅读你即将构建的模式（暂时没有 TODO）

在写 SQL 之前，先在纸上勾勒出数据的形状。本课有四张表：

```text
users ──< scenes ──< scene_objects
              └────< annotations >── users
```

一行 `scenes` 恰好属于一行 `users`（它的所有者）。一行 `scene_objects` 恰好属于一行 `scenes`（一件被放置的展品）。一行 `annotations` 恰好属于一行 `scenes`，*并且*指明写下它的那行 `users`。在写下第一行 `CREATE TABLE` 之前先画出这些箭头——一旦真实的数据行开始依赖它，一个错误的外键修复起来的代价会大得多。

### 第 2 步：设计这些表（TODO 1）

打开 `server/migrations/002_create_scenes.sql`、`003_create_scene_objects.sql` 和 `004_create_annotations.sql`。每一个文件都有一条注释，准确描述要添加哪些列，以及哪些外键需要 `ON DELETE CASCADE`。`001_create_users.sql`（已经完成，延续自课程 5.2 的账户行）展示了这种风格：每个文件一条语句，普通的列类型，不耍任何花招。

```sql
-- from 001_create_users.sql, already finished:
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  recovery_code_hash TEXT NOT NULL,
  created_at TEXT NOT NULL
);
```

位置和旋转被存储为独立的数字列（`position_x`、`position_y`、`position_z`、`rotation_y`），而不是一个 JSON 大字段。这是一个刻意的权衡：它让每一个值都能被 SQLite 自身做类型检查，也正是它让 `validation.js`（第 8 步）能够逐字段地拒绝一个非数字的位置字段；但这也意味着之后要为每个物体添加一个新属性，需要一次新的迁移，而不只是在一个大字段里加一个新的键。

### 第 3 步：编写一个迁移执行器（TODO 2）

`db.js` 已经打开了数据库，并打开了 `PRAGMA foreign_keys = ON`——除非每一次连接、每一次都先运行这一行，否则 SQLite 会忽略你迁移文件中的每一个 `ON DELETE CASCADE`。完成 `runMigrations()`：它应该按文件名顺序读取 `migrations/*.sql`，跳过任何已经记录在 `_migrations` 表中的文件，并在各自独立的事务中运行每一个新文件，这样一次运行到一半的失败，就绝不会留下一张创建到一半、却没有任何尝试记录的表。

```js
db.exec('BEGIN');
try {
  db.exec(sql);
  db.prepare('INSERT INTO _migrations (name, applied_at) VALUES (?, ?)').run(file, new Date().toISOString());
  db.exec('COMMIT');
} catch (error) {
  db.exec('ROLLBACK');
  throw new Error(`Migration ${file} failed and was rolled back: ${error.message}`);
}
```

完成之后，取消注释下方那个受保护的调用。运行 `node server/inspect-db.js`——不需要安装任何依赖，只是 `node:sqlite` 读取 `sqlite_master` 和 `_migrations`——你应该能看到全部四张表、它们的外键，以及四个已应用的迁移名称。

### 第 4 步：带预处理语句的用户函数（TODO 3）

`db.js` 中的每一个函数都遵循同一种形式：`db.prepare('... ? ...').run(value)`，或者 `.get(value)`，或者 `.all(value)`。`?` 会与 SQL 文本分开单独填入——一个值绝不会成为 SQL 字符串本身的一部分：

```js
export function findUserByUsername(username) {
  return rowToUser(db.prepare('SELECT * FROM users WHERE username = ?').get(username));
}
```

用这种方式完成 `insertUser`、`findUserByUsername`、`findUserById`、`updateUserPassword` 和 `deleteUser`。`deleteUser` 是整个文件中最短的函数——只有一行 `DELETE FROM users WHERE id = ?`——因为你在第 2 步设计的级联会完成剩下的工作。

### 第 5 步：场景函数（TODO 4）

`insertScene` 和 `getSceneById` 已经作为示例完成——`getSceneById` 把 `scenes` 和 `users` 连接（join）起来，这样一个场景返回时会带着它所有者的用户名，而不只是一个不透明的 id：

```js
export function getSceneById(id) {
  return rowToScene(db.prepare(`
    SELECT scenes.*, users.username AS owner_username
    FROM scenes JOIN users ON users.id = scenes.owner_id
    WHERE scenes.id = ?
  `).get(id));
}
```

完成 `listScenesByOwner`、`listPublicScenes`（同样的连接，按 `is_public = 1` 过滤）、`updateSceneMeta` 和 `deleteScene`。

### 第 6 步：场景物体，以及一个事务（TODO 5）

`replaceSceneObjects(sceneId, objects)` 是这个项目中唯一一次会写入不止一行的函数：它先删除一个场景现有的每一个物体，再插入新的列表。这两个步骤都发生在 `db.exec('BEGIN')` / `db.exec('COMMIT')` 之内，失败时用 `db.exec('ROLLBACK')`——这和第 3 步的迁移执行器使用的是同一种形式。如果没有这个事务，一个在删除和最后一次插入之间抛出的验证错误，就会让一个场景只保存了部分物体，而数据库中不会有任何东西说明这一点。

### 第 7 步：注释（TODO 6）

`db.js` 的最后一组函数：`insertAnnotation`、`listAnnotationsForScene`、`getAnnotationById`、`deleteAnnotation`。和之前每一个函数相同的预处理语句模式。

### 第 8 步：验证场景、物体和注释（TODO 7）

`server/validation.js` 中的 `validateCredentials` 已经完成（延续自 5.2）。完成 `validateSceneMeta`、`validateSceneObjects` 和 `validateAnnotation`。最重要的检查是针对客户端发来的每一个数字：

```js
function isFiniteNumberWithin(value, max) {
  return typeof value === 'number' && Number.isFinite(value) && Math.abs(value) <= max;
}
```

这不是防范 SQL 注入的手段——参数绑定（第 4-7 步）已经关上了那扇门。它阻止的是一个场景悄悄地保存了 `NaN`，或者一个忘记设置 `type="number"` 的表单字段传来的值，让它在到达一个本来会毫无怨言接受它的 `REAL` 列之前，就被挡了下来。

### 第 9 步：读取路由：创建、列出、获取（TODO 8）

`routes.js` 把 `register`、`login`、`logout`、`me`、`recover` 和 `removeAccount` 从课程 5.2 原样延续了过来，唯一的区别是它们调用的是 `db.js`，而不是课程 5.2 的 JSON 文件。完成 `createScene`、`listMyScenes`、`listPublicSceneGallery` 和 `getScene`。`getScene` 的权限检查是需要仔细阅读的一处：

```js
if (scene.ownerId !== auth.user.id && !scene.isPublic) {
  return sendJson(res, 404, { error: 'Scene not found.' });
}
```

一个不属于你的私密场景会得到 `404`——和「未找到」相同的响应，而不是 `403`「禁止访问」——这样一个客户端就永远无法仅凭状态码得知某个 id 对应的场景到底存不存在。

### 第 10 步：写入路由：更新和删除（TODO 9）

`updateScene` 和 `removeScene` 在课程 5.2 引入的同一个 CSRF 检查之前，又添加了一项检查：所有权。

```js
if (scene.ownerId !== auth.user.id) {
  return sendJson(res, 403, { error: 'Only the owner can edit this scene.' });
}
```

这里，和 `getScene` 不同，`403` 才是正确的回答：走到这一行已经要求了一个有效的会话，所以确认场景存在不需要额外的代价。

### 第 11 步：注释路由与 server.js 的路由（TODO 10、TODO 11）

完成 `addAnnotation` 和 `removeAnnotation`——仅限所有者，与第 10 步相同的形式。然后完成 `server.js` 的请求监听函数。有两个路由会在路径中携带一个 id（`/api/scenes/<id>` 和 `/api/scenes/<id>/annotations/<id>`）；由于没有任何路由包，用两个小小的正则表达式来匹配它们：

```js
const SCENE_PATH = /^\/api\/scenes\/([^/]+)$/;
const ANNOTATION_PATH = /^\/api\/scenes\/([^/]+)\/annotations\/([^/]+)$/;
```

完成之后，这个项目中的每一个路由都第一次可以通过 HTTP 访问了。在转向浏览器之前先用 `curl` 测试——一个错误的状态码在终端里比在界面上要容易发现得多。

### 第 12 步：接通客户端（TODO 12）

`js/scene.js` 已经暴露了 `applyObjects(objects)`、`setAnnotationMarkers(annotations)` 和 `getObjects()`——这一步完全不需要直接接触 three.js。完成 `js/main.js` 中调用 `fetch()` 的那些函数：`loadSceneIntoView`、`loadDefaultView`、`refreshSceneLists`、`renderSceneList`、`openScene`、`saveScene`、`deleteCurrentScene`、`addAnnotation` 和 `removeAnnotation`。它们每一个都遵循课程 5.2 的模式：每一次请求都带上 `credentials: 'include'`，每一次会改变内容的请求都带上一个 `X-CSRF-Token` 请求头。

### 第 13 步：完成测试（TODO 13）

`server.test.js` 已经为每一个测试发出了它需要的请求；请添加每条注释所描述的 `assert.equal` / `assert.deepEqual` / `assert.ok` 调用。在 `server/` 中运行 `node --test`，直到每个测试都通过，然后手动运行一次 `node server/backup.js`，确认 `server/data/backups/` 下出现了一个新的 `.sqlite` 文件。

## 关键代码解析

- **预处理语句（`db.prepare(sql).run(...)`）。** SQL 文本和填入它的值分开传给 SQLite——一个 `?` 占位符绝不会被字符串拼接所替代。这正是阻止 SQL 注入的手段：一个像 `'; DROP TABLE users; --` 这样的用户名，会被作为一个无害的字面字符串存储（和比较），绝不会被当作 SQL 执行。
- **`PRAGMA foreign_keys = ON`。** SQLite 出厂时默认关闭外键约束的强制执行，是为了向后兼容那些在这项功能出现之前就写好的数据库。`db.js` 在每一次连接、每一次打开这个文件时都打开它——如果没有它，迁移文件中的 `ON DELETE CASCADE` 会被悄悄忽略，一个被删除用户的场景就会永远留在数据库里。
- **事务（`db.exec('BEGIN')` … `db.exec('COMMIT')`，失败时用 `db.exec('ROLLBACK')`）。** 这个项目中每一次触及不止一行的写入——运行一次迁移，替换一个场景的物体——都以这种方式被包裹起来，这样它要么完全发生，要么不留任何痕迹，绝不会停留在中间状态。
- **对「不是你的、也不是公开的」返回 404，对「你能看但不能改」返回 403。** `getScene` 对一个不属于你的私密场景，给出的是和一个从未存在过的场景 id 相同的 `404`，因此仅凭状态码，永远无法确认一个私密场景是否存在。`updateScene` 和 `removeScene` 则改为返回 `403`，因为能走到这一步就已经证明了场景确实存在（你能读到它的公开副本，或者你就是它的所有者）。
- **用 `VACUUM INTO`，而不是普通的文件复制。** `server/backup.js` 请求 SQLite 自身把数据库写出一份完整且一致的副本到一个新文件中。对 `.sqlite` 文件的一次普通 `cp` 操作，没有办法知道复制开始时 SQLite 是否正处于写入中途；在错误的瞬间捕捉到它，可能会产生一份打不开、或者悄悄丢失了一些行的副本。

## 3D 与 XR 无障碍

- **场景描述。** `#scene-description` 每次在一个场景加载或改变时，都由 3D 视图所渲染的同一个 `objects` 数组构建而成，因此两者永远不可能不一致（WCAG 1.1.1、1.3.1）。
- **仅用键盘编辑。** 每一个位置和旋转值都是一个 `<input type="number">`，用键盘或一个增减按钮来修改——这个项目从不要求学习者在 3D 中拖拽任何东西来布置一个场景。
- **3D 视图的一个 2D 孪生体。** 画布下方的位置/旋转表格，始终保存着与 3D 视图所显示的相同数字，无论 WebGL 是否可用。
- **注释以真正的文字存在，而不仅仅是标记。** `scene.js` 在画布上绘制的浮动「📝」标记只是装饰性的；画布下方的 `#annotation-list` 才是同一信息的、始终存在的无障碍副本。
- **减少动态效果与一个暂停控件。** 当设置了 `prefers-reduced-motion: reduce` 时，玉石缓慢的旋转会以暂停状态开始；而**暂停动画**按钮（带有 `aria-pressed`）无论这个偏好设置如何都能正常工作。
- **舒适度。** 相机除了一开始移动到它固定的起始位置之外，绝不会再移动——本课中没有任何东西会移动学习者没有要求的视角。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| 每个表单字段都有一个可见且关联的 `<label>` | 2.5.3 | 无障碍名称必须以可见的标签文字开头。 |
| 来自 400 响应的字段错误以文字列表的形式出现在表单旁边 | 1.4.1、3.3.1 | 一个被拒绝的场景或注释绝不能只靠颜色来标示。 |
| 每个用 `list-style: none` 设置样式的 `<ul>` 都保留 `role="list"` | 良好实践 | 否则 Safari 会从一个被去掉列表样式的 `<ul>` 中丢失列表语义。 |
| 位置/旋转表格带有一个 `<caption>` 以及 `<th scope="col">`/`<th scope="row">` | 1.3.1 | 屏幕阅读器会播报每一个数字属于哪一件展品、哪一个轴。 |
| 动画尊重 `prefers-reduced-motion`，并提供一个暂停按钮 | 2.2.2 | 学习者没有要求的自行启动的动态效果，必须能够被停止。 |
| 每一种 3D 交互都有一条键盘路径 | 2.1.1 | 布置一个场景完全可以只用 `Tab` 和数字输入的步进控件完成。 |

## 性能注意事项

- **为每一个被查询过滤的列建立索引。** `scenes.owner_id` 和 `scenes.is_public` 都有一个索引（见 `002_create_scenes.sql`）；如果没有索引，随着表的增长，「我的场景」或「公开场景」就会扫描表中的每一行。
- **一次连接胜过每行一次查询。** `listPublicScenes` 在一次查询中把 `scenes` 和 `users` 连接起来，而不是每个场景都调用一次 `findUserById`——这是经典的「N+1 查询」错误，三个场景时不明显，三千个场景时就会很痛苦。
- **一个事务把写入批处理起来。** 把 `replaceSceneObjects` 的先删除再插入包裹进一个事务，不只是为了正确性（第 6 步）：对 SQLite 来说，一个已提交的事务比若干个独立的事务，需要做的记录工作也更少。
- **`VACUUM`（以及 `VACUUM INTO`）会回收空间。** SQLite 在删除大量行之后不会自动缩小文件；用 `VACUUM INTO` 制作的一份备份，同时也是一份被压缩过的副本，这是一个有用的附带效果。

## 常见错误

| 错误 | 会发生什么 | 应该怎么做 |
| --- | --- | --- |
| 用模板字面量拼接 SQL（`` `SELECT * FROM users WHERE username = '${username}'` ``） | 在每一次手动测试中都能正常工作，但一旦某个用户名包含一个引号——或者被刻意构造成这样——就会崩溃或泄露数据 | 始终使用带 `?` 占位符的预处理语句 |
| 忘记 `PRAGMA foreign_keys = ON` | `ON DELETE CASCADE` 会被悄悄忽略；被删除的用户会永远留下孤立的场景 | 在 `db.js` 中、在任何查询运行之前，把这个 pragma 设置一次 |
| 在没有事务的情况下删除一个场景的物体 | 一次崩溃或者在删除和插入之间抛出的错误，可能会让一个场景完全没有任何物体 | 把删除和每一次插入都包裹进同一个 `BEGIN`/`COMMIT` |
| 检查 `if (req.body.ownerId === auth.user.id)` | 客户端可以在请求体里放入它想要的任何 `ownerId`；这一行是在信任攻击者会说真话 | 始终把**会话**中的账户 id 和数据库中已经存储的那一行进行比较 |
| 在服务器运行时用 `cp` 复制 `.sqlite` 文件 | 一份打不开、或者悄悄丢失了一些行的备份 | 像 `server/backup.js` 那样使用 `VACUUM INTO` |

## 故障排查

**`ExperimentalWarning: SQLite is an experimental feature and might change at any time`。** 这是预期之内的，每次导入 `node:sqlite` 都会出现，在每一个 Node 22-24 版本上都是如此。这是一条警告，不是一个错误——服务器会继续运行。等 Node 在未来的版本中把这个模块标记为稳定之后，它就会消失。

**`Error: Cannot open database because the directory does not exist`，或者类似的 `ENOENT`。** `db.js` 会用 `mkdirSync(..., { recursive: true })` 为你创建 `server/data/`；如果你移动或重命名了那个文件夹，请完全删除 `server/data`，然后重启服务器，让它能重新创建这个文件夹。

**`SqliteError: FOREIGN KEY constraint failed`。** 你试图插入一行 `scene_objects` 或 `annotations`，而它的 `scene_id`（或某个用户的 `owner_id`）还不存在。检查一下，在你尝试为它附加物体或注释之前，这个场景是不是确实已经被创建——并且提交——了。

**一个被删除的账户，它的场景依然在数据库里。** 几乎总是意味着 `PRAGMA foreign_keys = ON` 在那次删除之前没有运行——检查一下 `db.js` 是否在打开连接之后立即设置了它，以及是否有别的什么东西先打开了同一个文件，绕过了这一步。

**`node server/inspect-db.js`（或服务器）抛出 `TODO 2: runMigrations is not implemented yet`，即使你已经写好了它。** 检查你是否取消注释了 `runMigrations()` 下方那个受保护的调用——一个函数即使已经写完，只要没有任何东西调用它，就永远不会运行。

**Safari 或 Firefox：找回码无法一次点击就选中。** 三击（或者点击其内部后使用 `Cmd/Ctrl+A`）——`user-select: all` 在 Chrome 和 Edge 中第一次点击就能选中整个元素的文字，但一些版本的 Safari 和 Firefox 仍然需要这个额外的步骤。

**8879 端口已经被占用。** 在 `server/.env` 中设置一个不同的 `PORT`，并相应地更新 `ALLOWED_ORIGIN`，或者停止占用这个端口的其他程序。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)**：给 `scenes` 添加第四个只读列，并把它用起来。
2. **[创意](challenges/challenge-2.zh-Hans.md)**：让展品反映出你自己的语言、文化或社区。
3. **[探索](challenges/challenge-3.zh-Hans.md)**：一个更难、更开放的拓展，涉及迁移和权限。

## 提交作业

1. 完成 [`tests/checklist.md`](tests/checklist.md)。
2. 拍摄截图：加载了一个已保存场景的展品、位置/旋转表格，以及 `node server/inspect-db.js` 的终端输出。
3. 把它们保存在你的学习日志和作品集中。也可以和其他开发者分享：参见[在哪里分享你的作品和寻求帮助](../../docs/en/community.md)（英文）。
4. 学习日志问题：你的数据库现在在服务器代码中强制执行了一条规则（「只有所有者可以编辑一个场景」），而不仅仅是在界面上。在这个项目中找出一个界面*也*隐藏了一个控件、而一个被拒绝的请求依然会拦住它的地方，以及一个界面没有这样做的地方。如果去掉服务器端的检查、只保留界面上的检查，会出什么问题？

## 延伸阅读

- [Node.js docs: `node:sqlite`](https://nodejs.org/api/sqlite.html)（英文）
- [SQLite documentation: Foreign Key Support](https://www.sqlite.org/foreignkeys.html)（英文）
- [SQLite documentation: The `VACUUM` command (including `VACUUM INTO`)](https://www.sqlite.org/lang_vacuum.html)（英文）
- [Node.js docs: `node:test`](https://nodejs.org/api/test.html)（英文）
- [OWASP Cheat Sheet Series: SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)（英文）

## 值得认识的女性

**Claudia Bauzer Medeiros** 是巴西坎皮纳斯大学（Unicamp）的数据库学正教授，她的研究涵盖地理信息系统和大型科学数据集的管理，包括农业环境和生物多样性数据项目。2003 年，她成为巴西计算机学会（SBC）历史上第一位当选主席的女性，任职至 2007 年。

她的职业生涯与本课的主题直接相连：设计能保存真实的、结构化的、空间性数据的数据库，并强制执行谁可以读取或修改它的规则，正是她的研究几十年来一直在推动的那类数据库工程，在这里被应用到了展览已保存的场景和注释上。

> **编者注：发布前请核实。** 「值得认识的女性」中的人物信息必须以一手资料核实，并在可行时于课程上线前与本人确认。参见 [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md)。

## 标准聚焦

SQL 本身就是一项标准：由 ISO/IEC JTC 1/SC 32 维护的 ISO/IEC 9075，定义了大多数关系型数据库（包括 PostgreSQL 和 MySQL）所实现的语言，每一种数据库都有自己的扩展。SQLite——本课所使用的数据库——实现了这项标准的大部分内容，再加上它自己的扩展（包括本课备份脚本中用到的 `VACUUM INTO`），并在它自己的参考文档中记录了与标准的每一处差异，本课直接链接到的是那份文档，而不是需要付费墙的 ISO 标准本身。

## 许可协议

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
