# AI for Spatial Computing

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程：** `full-stack-spatial` · **课时：** `ai-for-spatial-computing-06` · **时长：** 约 14 小时 · 19 次学习，每次 45 分钟 · 每周 4 次，约 5 周

---

> 构建一个 AI 辅助的空间工具，同时记录人工审核和安全防护措施。

---

## 学习目标

完成本项目后，你将能够：

1. 把一个 AI 功能构建成一个不依赖具体服务商的独立模块，并只通过修改环境变量，就能在一个确定性的离线模拟（mock）、任意一个兼容 OpenAI 的托管接口，以及一个本地模型（Ollama 或 LM Studio）之间切换。
2. 从一个场景自己的结构化数据（而绝不是它的一张图片）构建一个提示词（prompt），并解释为什么这样能让一个功能保持小巧、廉价，并且能被完全看不到这个场景的人使用。
3. 要求一个模型以严格的 JSON 格式回复，防御性地解析这个回复，并在回复格式错误时直接拒绝它，而不是去猜测它可能想表达什么。
4. 把一个模型的回复与它被给予的真实数据进行交叉核对，以捕捉那种一个模型编造出一个实际不存在的东西这种具体而常见的失败情形。
5. 解释一份 AI 生成的草稿和一份已保存的应用数据之间的区别，并要求一个人在任何内容到达数据库之前先阅读并批准这份草稿。
6. 对一个提示词应用数据最小化：只发送一项功能所需要的字段，并解释为什么这个项目一开始就没有任何个人数据可以泄露。
7. 在任何可能调用一个付费 API 的功能前面，添加一项成本与速率限制控制，它和一个登录速率限制的职责是分开的。
8. 写一份 AI 使用披露说明，让一个人在决定使用某项功能之前就能读到它。

## 先决条件

- **课程 5.3：数据库与空间应用数据**——本课复用它的场景、场景物体和注释模式，以及它的 `node:sqlite` 方案，用于本课每一个 AI 功能所读取的数据。
- **课程 5.1：后端与 API 基础**——路由、JSON 请求体、验证和状态码。
- 来自**课程 4（前端工程师）**的、对 `async`/`await` 和阅读调用栈的熟悉程度。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| Node.js 22.5 或更高（推荐 LTS「24 Krypton」） | 运行服务器，包括内置的 `node:sqlite` 模块 | 免费 |
| 一个文本编辑器（例如 VS Code） | 编写服务器和客户端代码 | 免费 |
| 一个现代浏览器（Chrome、Firefox、Safari 或 Edge） | 运行这个工具并测试你的成果 | 免费 |
| Ollama 或 LM Studio（可选） | 在你自己的机器上运行一个本地模型，用于探索挑战 | 免费 |

Node.js 可以从 [nodejs.org](https://nodejs.org/) 下载；如果官方站点访问缓慢，中国大陆的学习者也可以使用 [npmmirror 的 Node.js 镜像](https://registry.npmmirror.com/binary.html?path=node/)。本课的任何部分都不需要 npm 包：`node:sqlite`、`node:http`、`node:crypto` 和 `node:test` 都随 Node 本身一起提供，AI 服务商——无论是真实的还是模拟的——都通过浏览器和 Node 自身内置的 `fetch()` 来调用。如果你要用一个托管的、兼容 OpenAI 的服务商而不是一个本地模型来尝试可选的探索挑战，请自行查看该服务商自己的定价和当前条款；本课程不指定任何具体的服务商。

## 你将构建什么

课程 5.3 给了这个展览一个真正的数据库，用来保存场景，场景由带有位置和旋转的展品，以及简短的注释组成。本课在同一份数据之上添加了两个小型的 AI 辅助工具：一个按钮，能从一个场景自己已保存的数据出发，**起草一段简单语言的描述**（用于无障碍访问，以及任何看不到 3D 视图的人）；以及一个输入框，让你可以**用简单的语言搜索场景**，而不用滚动一份列表。这两个功能都建立在一个新文件 `server/ai.js` 之上，它对 HTTP 或 SQLite 一无所知——只知道如何把一个场景（或一份场景列表）转变成一个提示词、调用被配置的那个服务商，并把它的回复转变回服务器其余部分能够信任、或者能够安全拒绝的东西。

本课没有账户：课程 5.2 已经教过账户，课程 5.5 加固了它们，因此这里的每一个场景都是共享的、本地的、单租户数据——这是能让两个 AI 功能都真正发挥作用的最小范围。参考答案在 [`completed/`](completed/) 中；起始代码有 **18 个编号的 TODO**，几乎全部在 `server/ai.js`、`server/db.js`、`server/routes.js`、`server/server.js` 和 `js/main.js` 中，而 `js/scene.js`（3D 视图本身）、`server/exhibits.js`，以及 `server/routes.js` 中场景和注释 CRUD 的其余部分都被延续下来并已完成，好让本课能专注于这个 AI 模块。

## 文件夹说明

```text
06-ai-for-spatial-computing/
├── README.md
├── starter/                 # begin here
│   ├── index.html, styles.css, js/
│   │   ├── scene.js          # the 3D view — finished, carried over from 5.3
│   │   └── main.js           # TODO 17, TODO 18
│   └── server/
│       ├── exhibits.js       # the shared exhibit list — finished
│       ├── db.js              # TODO 1, TODO 2
│       ├── validation.js      # TODO 3
│       ├── ai.js               # TODO 4-13 — this lesson's real subject
│       ├── routes.js           # TODO 14, TODO 15
│       ├── server.js           # TODO 16
│       ├── server.test.js      # node:test, using the mock provider
│       └── .env.example
├── completed/                # reference solution
├── challenges/                # Three challenges: Foundation is required
├── tests/                     # self-review checklist
├── assets/
└── screenshots/
```

## 环境配置

1. 打开一个终端，运行 `node --version`。你需要 22.5 或更高版本；本课程是针对 Node 24（当前的 LTS 版本）编写和测试的。
2. `cd` 进入 `starter/server`，把 `.env.example` 复制为 `.env`。现在先把 `AI_PROVIDER` 保持为 `mock`——直到探索挑战之前的每一个 TODO 都是针对这个来测试的。
3. 从 `starter/server` 运行 `node server.js`。你应该会看到 `AI-assisted scene tool listening on http://127.0.0.1:8886`，以及一行关于种子数据尚未创建的提示——在 TODO 1 之前，两者都是预期之内的；见故障排查。
4. 在浏览器中打开 `http://127.0.0.1:8886/`。展览会显示它的默认布局；其他任何东西现在都还不能用。
5. 在第二个终端中，从 `starter/server` 运行 `node --test`。每一个测试都应该以一条清晰的 `TODO n: ... is not implemented yet` 消息失败——那就是你这节课的地图，按顺序排列。

## 分步讲解

### 规划你的学习节奏

| 节次 | 你要做的事 | 完成后你将拥有 |
| --- | --- | --- |
| 1 | 阅读这份分步讲解；运行上面的环境配置步骤。 | 一个能够启动的服务器，以及一份完整的、说明了前方每一个 TODO 的失败测试套件。 |
| 2 | TODO 1：`db.js` 的 `insertScene` 和 `insertObjects`，放在同一个事务中。 | `curl -X POST http://127.0.0.1:8886/api/scenes -d '...'` 返回 `201`，带有一个真实的 `id`。 |
| 3 | TODO 2：`db.js` 的 `updateScene` 和 `saveDescription`。 | 重启服务器现在会播种三个示例场景（`seedIfEmpty` 终于能够插入了）；`GET /api/scenes` 会列出它们。 |
| 4 | TODO 3：`validation.js` 的 `validateSearchQuery` 和 `validateDescriptionSave`。 | 用 `curl` 手动发送一个 500 字符的查询，会在 `ai.js` 完全没有介入之前就被 `400` 拒绝。 |
| 5 | TODO 4：`ai.js` 的 `buildDescriptionPrompt`。 | 打印它的返回值，能看到一个两条消息的提示词，只包含一个场景自己的名称、展品和注释——没有别的。 |
| 6 | TODO 5：`ai.js` 的 `parseDescriptionReply`。 | 在一个草稿脚本里手动给它输入 `'{"description": "ok"}'` 和 `'not json'`，能分别返回正确的结果和抛出正确的错误。 |
| 7 | TODO 6：`ai.js` 的 `checkDescriptionForHallucinations`。 | 一段手写的、提到了一个不在场景中的展品的虚假描述，会带着一条指名道姓的警告返回。 |
| 8 | TODO 7：`ai.js` 的 `describeScene`，把 TODO 4-6 串联起来。 | `node --test` 的两个描述测试都变绿。 |
| 9 | TODO 8：`ai.js` 的 `buildSearchPrompt`，以及 TODO 9：`parseSearchReply`。 | 搜索提示词的「已发送数据」只包含场景 id、名称、展品列表和注释文字。 |
| 10 | TODO 10：`ai.js` 的 `filterMatchesAgainstRealScenes`。 | 幻觉防护测试（一个被编造出来的场景 id 会被丢弃）通过。 |
| 11 | TODO 11：`ai.js` 的 `searchScenes`，把 TODO 8-10 串联起来。 | `node --test` 的搜索测试都变绿。 |
| 12 | TODO 12：`ai.js` 的 `callOpenAiShapedEndpoint`。 | 这个文件现在拥有了以后接通一个真实服务商所需的一切——用 `AI_PROVIDER=mock` 现在还没有东西可以测试，但请重新阅读 TODO 4-11，确认它们都没有假设任何模拟专属的东西。 |
| 13 | TODO 13：`ai.js` 的 `checkAiRateLimit`。 | 在一个草稿脚本中调用它超过 `AI_MAX_CALLS_PER_WINDOW` 次，多出的那些调用会返回 `false`。 |
| 14 | TODO 14：`routes.js` 的 `generateDescription` 和 `saveDescriptionRoute`。 | `curl -X POST .../describe` 返回一份草稿；`curl -X PUT .../description` 保存它；对这个场景的 `GET` 现在会显示它。 |
| 15 | TODO 15：`routes.js` 的 `searchScenesRoute`。 | `curl -X POST /api/search -d '{"query":"jade"}'` 返回一个真实的、匹配的场景。 |
| 16 | TODO 16：`server.js` 的两个新路由。 | 这个项目中的每一个路由第一次都可以通过 HTTP 访问了——重新运行全部 `node --test`。 |
| 17 | TODO 17：`js/main.js` 的 `generateDescription` 和 `saveDescription`。 | 在浏览器中：保存一个场景，生成一份草稿，编辑它，保存它，重新加载页面，看到它被持久保存在「Saved description」下面。 |
| 18 | TODO 18：`js/main.js` 的 `searchScenes`。 | 在搜索框中输入「jade」并按下它（或回车），会打开一个匹配的场景。 |
| 19 | 从头到尾完成 [`tests/checklist.md`](tests/checklist.md)；完成必做的[基础挑战](challenges/challenge-1.zh-Hans.md)；再完成一个拓展挑战，然后**提交作业**。 | 检查清单中的每一项都已勾选，你自己的一个小拓展，以及一个可以展示的项目。 |

### 第 1 步：阅读模式和「草稿」的形状（暂时没有 TODO）

在写任何东西之前，先注意到本课中每一个 TODO 都必须遵守的那一条规则：**一份草稿不是已保存的数据。** `server/ai.js` 从不调用 `db.js`。`server/routes.js` 的 `generateDescription` 路由只会返回 `ai.js` 给它的内容；`saveDescriptionRoute` 是一个*独立*的路由，只有当一个人在浏览器中点击「Save this description」时才会被调用——那是在他阅读过（并且，如果他愿意，编辑过）这份草稿之后。如果你发现自己在 `ai.js` 中写了导入 `db.js` 的代码，请停下来——那正是本课要求你不要跨越的那条唯一的边界。

### 第 2 步：场景存储（TODO 1、TODO 2）

`db.js` 的模式有两张表：`scenes`（带有一个 `description` 列和一个 `description_reviewed_at` 列，都是本课新增的）和 `scene_objects`，加上 `annotations`——和课程 5.3 使用的形状相同，只是少了本课这个无账户范围不需要的 `owner_id`。按照每个函数注释中的指示，完成 `insertScene` 及它的辅助函数 `insertObjects`（TODO 1），然后完成 `updateScene` 和 `saveDescription`（TODO 2）。`saveDescription` 很短——一条 `UPDATE`，一个新的时间戳——它是整个项目中*唯一*被允许写入一份描述的函数。

### 第 3 步：保护 AI 请求体（TODO 3）

`validation.js` 的 `validateSearchQuery` 和 `validateDescriptionSave` 遵循本课程中每一个其他验证器都使用的同一种 `{ valid, errors, value }` 形式。它们存在的原因是成本，而不只是正确性：学习者发送的每一个字符，都可能是 `ai.js` 需要付费给一个真实服务商去读取的字符，因此在这里拒绝一个过大的请求，比在一次网络往返之后再拒绝它要便宜得多。

### 第 4 步：构建描述提示词（TODO 4）

`ai.js` 的 `sceneDataForPrompt`（已经为你完成）把一个场景转变成 `{ name, exhibits: [...], annotations: [...] }`——只包含描述功能需要的内容，从数据库中已有的展品 id 和数字构建而成，绝不来自一张图片。完成 `buildDescriptionPrompt`，把这些数据包装进一个两条消息的提示词：

```js
{
  messages: [
    { role: 'system', content: JSON_ONLY_SYSTEM_MESSAGE },
    { role: 'user', content: '...instructions... Scene data: {"name":"...","exhibits":[...]}' },
  ],
  dataSent: { name: '...', exhibits: [...], annotations: [...] },
}
```

`dataSent` 会一路返回到浏览器（见 TODO 14 和 TODO 17），因此学习者可以在界面中打开「Data sent to the AI provider」，在自己的项目中准确看到到底发出去了什么——这是一种直接、动手的方式，让你自己去核实「只发送必要内容」这条规则，而不是仅仅相信这份 README 的说法。

### 第 5 步：解析并验证回复（TODO 5）

一个模型被要求以 JSON 格式回复；这个项目中没有任何地方相信它真的会这样做。完成 `parseDescriptionReply`：对原始文本做 `JSON.parse`（如果失败就抛出一个 `AiResponseError`），检查解析出来的值是否有一个非空字符串的 `description`，如果没有就抛出同样类型的错误。这个函数会在*每一次*回复上运行，包括模拟服务商的回复——`mockDescriptionReply`（已经为你完成）已经返回了这个函数所期望的确切形状，这正是让模拟服务商能够在本课的每一处（包括 `server.test.js`）替代一个真实服务商的原因。

### 第 6 步：对照真实数据检查回复（TODO 6）

`checkDescriptionForHallucinations` 是本课程中最小的一个事实核查器：对共享的 `EXHIBITS` 列表中的每一件展品，如果它的名字在描述中被提到了，但它的 id 实际上不在 `scene.objects` 中，那就是一条值得在保存文本之前提醒一个人注意的警告。这是一种启发式方法，不是一个保证——一段描述依然可能以其他方式误导人——但它捕捉到了一个模型编造出一件展品这种具体而常见的失败情形，而且计算成本很低，因为它所对照的「真实数据」已经在内存中了。

### 第 7 步：把它们串联起来（TODO 7）

`describeScene` 是 `routes.js` 唯一会调用的函数。完成它，让它：构建提示词（TODO 4），获取一份原始回复（对于 `AI_PROVIDER=mock` 直接使用模拟服务商，对于真实服务商则使用 `callProvider`），解析它（TODO 5），如果一个真实服务商的回复解析失败，就用**一次重试**（一次更精确的、指名了第一次哪里出错的第二次请求），然后运行幻觉检查（TODO 6），并返回全部内容——描述、警告、服务商名称，以及被发送的数据——而不保存其中任何一项。

### 第 8 步：搜索提示词和它的回复（TODO 8、TODO 9）

同样的三步形状在搜索中重复出现：`buildSearchPrompt`（TODO 8）只发送每个场景的 id、名称、展品列表和注释文字——上限为 `MAX_SCENES_IN_PROMPT` 个场景，因为场景的*数量*和消息长度一样，会推高提示词的大小和成本。`parseSearchReply`（TODO 9）检查回复是否有一个 `matches` 数组（每一项都带有一个字符串 `sceneId` 和 `reason`）和一个字符串 `explanation`。

### 第 9 步：搜索的幻觉防护（TODO 10）

一个模型只可能被展示过 `scenesDataForPrompt` 所包含的那些场景 id——因此它返回的任何一个不在被传入的真实 id 之中的 `sceneId`，都不可能来自这份数据。完成 `filterMatchesAgainstRealScenes`，把一份回复的匹配项分成 `kept`（一个真实 id）和 `dropped`（其他一切），并参见 README 的「关键代码解析」，了解为什么 `routes.js` 真正依赖的是这个，而不是模型的良好表现。

### 第 10 步：把搜索串联起来（TODO 11）

`searchScenes` 与第 7 步的 `describeScene` 相映成趣：构建提示词，获取一份原始回复，解析它（对真实服务商采用同样的一次重试模式），把它对照真实场景列表进行过滤，并返回幸存下来的结果加上解释。

### 第 11 步：接通一个真实服务商（TODO 12）

`callOpenAiShapedEndpoint` 是这个项目中唯一一个会对这个进程之外的东西调用 `fetch()` 的函数。完成它，让它按照注释中描述的形状向 `{AI_BASE_URL}/chat/completions` 发起 `POST`，并把一个缺失的配置、一次失败的请求，以及一个格式错误的响应，分别转变成 `routes.js` 已经知道如何转变为正确 HTTP 状态码的三种不同错误类型（`AiConfigError`、`AiRequestError`、`AiResponseError`）。`AI_PROVIDER=openai-compatible` 和 `AI_PROVIDER=local` 都调用这同一个函数——它们之间只有 `AI_BASE_URL`、`AI_MODEL`，以及是否设置了一个密钥有所不同。

### 第 12 步：为真实调用设一份预算（TODO 13）

`checkAiRateLimit` 限制这个项目在一个 15 分钟的窗口内会发起多少次 AI 调用，无论其中任何一次是否真的有用——一个真实的服务商是按调用次数收费的（或者，对于一个本地模型，会消耗时间和电量），无论 `routes.js` 最终是否用到了那个答案。把它完成为一个小型的、共享的计数器；它上方的注释解释了为什么这是一个和登录速率限制不同的职责。

### 第 13 步：接通路由（TODO 14、TODO 15）

`routes.js` 的 `generateDescription`、`saveDescriptionRoute` 和 `searchScenesRoute`，都是本课程惯常的形状：加载场景（或场景列表），在适用的地方检查速率限制，验证请求体，调用 `ai.js`，并通过已经完成的 `sendAiError`，把它的结果——或者它三种错误类型中的一种——转变成一个响应。它们都不长；真正的工作已经在 `db.js`、`validation.js` 和 `ai.js` 中完成了。

### 第 14 步：接通这两条新路径（TODO 16）

`server.js` 用一个小小的正则表达式匹配每一条路径——这和本课程每一节课「不使用路由包」的选择相同。添加 `DESCRIBE_PATH` 和 `DESCRIPTION_PATH`，分别匹配 `/api/scenes/<id>/describe` 和 `/api/scenes/<id>/description`，并把它们接入到下方更通用的场景 id 匹配*之上*，就像现有的注释路由被排序的方式一样。

### 第 15 步：接通客户端（TODO 17、TODO 18）

`js/main.js` 的 `generateDescription`、`saveDescription` 和 `searchScenes` 各自发起一次 `fetch()` 调用，并更新 `index.html` 中已经存在的一小组元素——草稿框、它的警告和「data sent」详情、已保存描述那一行，以及搜索结果列表。每一个显示出来的值都恰好是服务器返回的内容；没有任何一项会在浏览器中被重新措辞或进一步概括。

## 关键代码解析

- **一个模块拥有这个模型。** `ai.js` 是唯一一个构建提示词或读取原始回复的文件。`routes.js` 调用 `describeScene(scene)` 或 `searchScenes(query, scenes)`，得到的是纯数据——它完全不知道 `AI_PROVIDER` 是 `mock`、`openai-compatible` 还是 `local`。这正是让切换服务商变成一次 `.env` 中的一行改动，而不是一次重写的原因。
- **「以 JSON 格式回复，然后依然要检查它。」** 这个项目中的每一个提示词，都以一条要求回复为单个 JSON 对象的指令结尾。每一份回复依然会被防御性地解析（`parseDescriptionReply`、`parseSearchReply`），如果它不符合预期的形状，就会被拒绝——而绝不会被猜测。这条指令降低了收到格式错误回复的概率；而解析器才是真正保护服务器其余部分免受其害的东西。
- **幻觉防护是对照真实数据的一次交叉核对，而不是相信模型的话。** `checkDescriptionForHallucinations` 把一份草稿与 `scene.objects` 进行比较；`filterMatchesAgainstRealScenes` 把一份搜索回复的场景 id 与被发送的真实列表进行比较。两者都不相信模型自己保持了准确——两者都在这个项目所控制的代码中独立地验证了这一点。
- **一份草稿和一次保存是两条不同的路由。** `POST /api/scenes/:id/describe` 返回文本；只有 `PUT /api/scenes/:id/description`——一个独立的请求，只有当一个人点击「Save this description」时才会被发送——才会调用 `db.js` 的 `saveDescription`。这正是「一个人先审核它」这整套机制的全部：没有任何一条代码路径能让一份生成的草稿自行到达数据库。
- **数据最小化是一个函数，而不是一份政策文档。** `sceneDataForPrompt` 和 `scenesDataForPrompt` 是唯一两个决定一个提示词包含什么内容的地方，两者都逐字段地从场景自己可见的数据构建它——绝不是对一条数据库记录的整体倾倒，而且（因为本课没有账户）一开始就不包含任何能识别出一个人身份的内容。
- **一项为了成本、而不仅仅是为了安全的速率限制。** `checkAiRateLimit` 会把每一次 AI 调用——无论成功与否——都计入同一份共享预算，这和一个登录速率限制不同，后者只计算*失败*的尝试。一个生产环境版本会按 API 密钥或按账户来追踪这一点（课程 5.8）；这个项目单一的共享额度，是针对一个没有账户的工具所做的一次刻意简化。

## 3D 与 XR 无障碍

- **场景描述。** `#scene-description` 每次在一个场景加载或改变时，都由 3D 视图所渲染的同一份 `objects` 数组构建而成（WCAG 1.1.1、1.3.1）——这独立于本课添加的这个 AI 起草的描述，也无论后者是否存在都始终在场；后者只会在一个人批准之后，才会填入「Saved description」那一行。
- **仅用键盘编辑。** 每一个位置和旋转值都是一个 `<input type="number">`；这个项目从不要求学习者在 3D 中拖拽任何东西。
- **3D 视图的一个 2D 孪生体。** 画布下方的位置/旋转表格，始终保存着与 3D 视图所显示的相同数字，无论 WebGL 是否可用。
- **注释以真正的文字存在。** `scene.js` 在画布上绘制的浮动标记只是装饰性的；`#annotation-list` 才是那份无障碍的、始终存在的副本。
- **减少动态效果与一个暂停控件。** 当设置了 `prefers-reduced-motion: reduce` 时，玉石的旋转会以暂停状态开始，而**暂停动画**按钮（带有 `aria-pressed`）无论这个偏好设置如何都能正常工作。
- **舒适度。** 相机除了一开始移动到它固定的起始位置之外，绝不会再移动。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| 一份 AI 生成的草稿，在视觉上和文字上都能与已保存的内容区分开 | 1.4.1 | 「Saved description」那一行和带虚线边框的草稿框，绝不仅仅依靠颜色来说明哪个是哪个——周围的文字也在说明这一点。 |
| 每一次 AI 响应的警告和错误都以文字形式出现在一份列表中 | 1.4.1、3.3.1 | 一次被拒绝或被标记的回复绝不能只靠颜色来示意。 |
| 每个用 `list-style: none` 设置样式的 `<ul>` 都保留 `role="list"` | 良好实践 | 否则 Safari 会从一个被去掉列表样式的 `<ul>` 中丢失列表语义。 |
| 位置/旋转表格带有一个 `<caption>` 和 `<th scope>` | 1.3.1 | 屏幕阅读器会播报每一个数字属于哪一件展品、哪一个轴。 |
| 动画尊重 `prefers-reduced-motion`，并提供一个暂停按钮 | 2.2.2 | 学习者没有要求的自行启动的动态效果，必须能够被停止。 |
| 每一种交互（布置一个场景、生成一份草稿、搜索）都有一条键盘路径 | 2.1.1 | 这两个 AI 功能都不依赖鼠标。 |

## 性能注意事项

- **不只是限制回复，也要限制提示词。** `MAX_SCENES_IN_PROMPT` 限定了 `buildSearchPrompt` 最多会发送多少个场景，这独立于 `validateSearchQuery` 对查询文本本身的限制——两者共同推动着成本和延迟。
- **`max_tokens` 也限制了回复的长度。** `MAX_RESPONSE_TOKENS` 限制了一个真实服务商的回答被允许有多长，因此即使在考虑这个项目自己的速率限制之前，单次请求也有一个可预测的成本上限。
- **模拟服务商不花任何钱，也能即时回答。** 每一个自动化测试，以及本课默认的 `.env`，都在使用它——一个真实服务商是可选的，供探索挑战或更进一步的探索使用。
- **一个共享的速率限制，而不是每次请求各一个。** `checkAiRateLimit` 的内存计数器，在一个提示词甚至还没有被构建之前就会被检查，因此一个超出预算的请求根本不会到达 `ai.js`。

## 常见错误

| 错误 | 会发生什么 | 应该怎么做 |
| --- | --- | --- |
| 把一整条数据库记录（或整张场景表）发送给模型 | 花费更多，速度更慢，并且有可能发送出一个谁都不打算共享的字段 | 像 `sceneDataForPrompt` 那样，逐字段构建一个小而明确的「提示词数据」对象 |
| 不检查 `JSON.parse(reply).description` 是否存在、是否是一个字符串就直接信任它 | 一个用散文、一条错误消息，或一个形状不同的对象来回复的模型，会让这个路由崩溃，或者悄悄保存下 `"undefined"` | 在使用任何字段之前先解析并验证这个形状，对其他任何情况都抛出一个带类型的错误 |
| 不经过一个审核步骤就直接保存一份生成的描述 | 一份产生幻觉或不准确的描述，会在没有任何人读过它的情况下，就到达真实用户面前 | 从一条路由返回一份草稿；只从一条由一个人自己触发的独立路由中保存 |
| 假设一个说出了一个看起来真实的 id 的模型用的就是一个真实的 id | 一份搜索回复可能会说出一个从未出现在它被给予的数据中的场景 id | 在把模型提供的每一个 id 用于任何用途之前，先对照真实列表过滤它 |
| 把一个真实的 API 密钥提交在 `.env`（或者其他任何地方） | 这个密钥会暴露给任何有仓库访问权限的人，以及一个付费服务商的滥用风险 | 只把真实密钥保存在一个不会被提交的 `.env` 中；只提交带有占位符的 `.env.example` |

## 故障排查

**`ExperimentalWarning: SQLite is an experimental feature and might change at any time`。** 这是预期之内的，每次导入 `node:sqlite` 都会出现。这是一条警告，不是一个错误。

**`Seed data was not created (expected until TODO 1 is done)`。** 正如它所说的那样——`seedIfEmpty()` 需要 `insertScene`（TODO 1）能正常工作。一旦 TODO 1 完成，下一次服务器启动时就会播种数据。

**`AI provider not configured: AI_PROVIDER=openai-compatible needs AI_BASE_URL and AI_MODEL set`。** 在 `.env` 中把两者都设置好（见 `.env.example`），或者改回 `AI_PROVIDER=mock`。

**`AI provider request failed: Could not reach the AI provider at http://127.0.0.1:11434/v1`。** 对于 `AI_PROVIDER=local`：Ollama 或 LM Studio 没有在运行，或者运行在一个和 `AI_LOCAL_KIND` 默认假设不同的端口上。到那个工具自己的文档中确认端口，如果不一致就自己设置 `AI_BASE_URL`。

**`429 Too many AI requests`。** 你（或你的测试）在 `ai.js` 追踪的那个 15 分钟窗口内，达到了 `AI_MAX_CALLS_PER_WINDOW` 次调用。请等待，或者降低你自己测试的频率——这是刻意为之的，不是一个 bug。

**`AI reply was invalid and was rejected`。** 一个真实服务商回复的内容，即使在一次重试之后，也不是这个项目所要求的那种确切 JSON 形状。这正是格式错误回复的处理路径按设计在正常工作：没有任何东西被保存，而这个错误说明了到底哪里出了问题。

**8886 端口已经被占用。** 在 `server/.env` 中设置一个不同的 `PORT`，并相应地更新 `ALLOWED_ORIGIN`。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)**：扩展这个幻觉检查，让它同时也能标记出一份遗漏了一件*确实*在场景中的展品的描述。
2. **[创意](challenges/challenge-2.zh-Hans.md)**：用你自己的语言、文化或社区，添加一件属于你自己的第四件展品，并确认两个 AI 功能都能正确处理它。
3. **[探索](challenges/challenge-3.zh-Hans.md)**：通过 Ollama 或 LM Studio 接通一个真实的本地模型，并把它的输出和模拟服务商的输出做比较。

## 提交作业

1. 完成 [`tests/checklist.md`](tests/checklist.md)。
2. 拍摄截图：一份保存之前生成的草稿描述、保存了描述之后的同一个场景，以及一个带有解释的搜索结果。
3. 把它们保存在你的学习日志和作品集中。等 XR Camp 社区上线后，也在那里分享它们。
4. 学习日志问题：这个项目会在保存每一份 AI 草稿之前先展示它，并准确显示发送了什么数据。在这个界面中找出一个人依然可能在没有真正先读过草稿的情况下就点击「Save」的地方。有什么一个小小的、低摩擦的改动，能让这件事变得稍微困难一点，同时又不会把一次真正快速、有把握的审核变成一件苦差事？

## 延伸阅读

- [MDN: Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)（英文）
- [Ollama documentation: OpenAI compatibility](https://docs.ollama.com/api/openai-compatibility)（英文）
- [LM Studio documentation: Local Server](https://lmstudio.ai/docs/app/api)（英文）
- [OWASP Top 10 for Large Language Model Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)（英文）
- [Node.js docs: `node:sqlite`](https://nodejs.org/api/sqlite.html)（英文）

## 值得认识的女性

**董欣（Xin Luna Dong）** 出生并在中国接受教育（南开大学，之后在北京大学攻读硕士，随后在美国获得博士学位），现在在美国 Meta Reality Labs 担任首席科学家（Principal Scientist），领导着为 Ray-Ban Meta 智能眼镜研发 AI 智能体的机器学习工作。在加入 Meta 之前，她曾在谷歌（Knowledge Vault 和 Knowledge Graph）和亚马逊（Product Graph）花了将近十年的时间构建知识图谱。她同时是 ACM 会士（Fellow）和 IEEE 会士，因其在知识图谱构建和数据集成方面的工作而获得认可。

她的职业生涯与本课的两个功能直接相关：一个知识图谱恰好是一种为了回答「我们实际上知道什么，以及我们对此有多大把握」而构建出来的结构——这正是 `checkDescriptionForHallucinations` 和 `filterMatchesAgainstRealScenes` 对一个规模小得多的模型回复所提出的同一个问题，也正是让一个 AI 功能扎根于真实的、经过验证的数据、而不是一个模型仅仅听起来很自信的说法之中的同一种严谨态度。

> **编者注：发布前请核实。** 「值得认识的女性」中的人物信息必须以一手资料核实，并在可行时于课程上线前与本人确认。参见 [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md)。

## 标准聚焦

这个项目读取的每一份回复都是 JSON，这是一种被标准化了两次的数据格式：一次是 Ecma International 的 [ECMA-404](https://ecma-international.org/publications-and-standards/standards/ecma-404/)，另一次是以等价的文本形式呈现的 IETF 的 [RFC 8259](https://www.rfc-editor.org/rfc/rfc8259)——这也正是为什么 `JSON.parse` 在每一个浏览器和 Node 中表现都一样。而本课的 `messages` 数组和 `choices[0].message.content` 回复所遵循的那种*形状*——「聊天补全（chat completions）」的请求与响应格式——则不同：它不是由 ISO、W3C 或 IETF 管理的。它最初只是一家公司自己的 API，后来因为足够多的生态系统采用了它（包括 Ollama 和 LM Studio，这正是本课中「兼容 OpenAI」的确切含义）而被广泛效仿，而不是因为某个标准组织正式批准了它——这是一个法定标准（de jure）和事实标准（de facto）之间一个有用、常见、值得了解的区别。

## 许可协议

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
