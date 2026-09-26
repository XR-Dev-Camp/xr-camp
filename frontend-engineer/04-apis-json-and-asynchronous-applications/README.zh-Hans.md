# API、JSON 与异步应用

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程：** `frontend-engineer` · **课时：** `apis-json-and-asynchronous-applications-04` · **时长：** 约 12 小时 · 16 次学习，每次 45 分钟 · 每周 4 次，约 4 周

---

> 构建一个公共数据、文化、教育或社区主题的仪表盘。

---

## 学习目标

完成本项目后，你将能够：

1. 解释什么是 **API**，并在写代码之前，先在浏览器里读懂它返回的 JSON。
2. 用 `URLSearchParams` 安全地构建请求 URL。
3. 用 `async` 和 `await` 配合 `fetch`，检查 `response.ok`，并设置**超时（timeout）**。
4. 设计一个请求的全部四种状态：**加载中**、**错误**、**空**和**就绪**。
5. **缓存**返回结果，并记录保存时间，让应用既快速，又能在离线时依然可用。
6. 防止**竞态条件（race condition）**：一个较慢的旧响应覆盖了更新的响应。
7. 使用与真实 API 结构相同的**模拟数据（mock data）**，这样即使没有网络也能构建和测试。

## 先决条件

- **课程 2.1：现代 JavaScript**（`async`/`await`、模块、错误处理）。
- **课程 2.3：应用架构**（配置、纯函数、一个文件一个职责）。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| 一个现代浏览器，带开发者工具 | **Network（网络）**面板会显示每一次请求和响应 | 免费 |
| VS Code 和本地服务器 | 模块和 `fetch` 需要 `http://` | 免费 |
| [Open-Meteo](https://open-meteo.com/) | 天气预报：无需密钥，无需账号 | 非商业用途免费 |

**如果 Open-Meteo 在你所在地区很慢或被屏蔽**，勾选**使用示例数据（Use sample data）**：整节课都可以离线使用 `data/sample-forecast.json` 来完成。这也正是专业团队在某个 API 尚未就绪时的工作方式。

## 你将构建什么

**My XR Camp** 的第四部分：一个**学习周天气仪表盘**。选择你所在的城市，查看未来七天的最高温、最低温和降雨概率，其中最干燥的一天会被特别标出，这样你就能规划哪几天步行去参加学习活动（图书馆、学习小组、社区中心）时不会淋雨。

它规模很小，但表现得像一个专业应用：立即显示已保存的预报，在后台更新，用简明的文字解释失败原因，提供**重试**按钮，离线时依然能用，也绝不会显示错误的城市。

参考答案在 [`completed/`](completed/) 中。起始代码已完成页面、样式、配置和示例数据；JavaScript 文件中有十三个 TODO。

## 文件夹说明

```text
04-apis-json-and-asynchronous-applications/
├── README.md            # 本指南（英文）
├── README.es.md         # 西班牙语
├── README.zh-Hans.md    # 简体中文
├── project.json         # 课时元数据
├── starter/
│   ├── index.html, styles.css        # 已完成
│   ├── data/sample-forecast.json     # 示例数据，结构与 API 完全一致
│   ├── js/config.js     # 已完成；TODO 1 在文件开头
│   ├── js/api.js        # TODO 2 和 5
│   ├── js/forecast.js   # TODO 3–4
│   ├── js/view.js       # TODO 6–8
│   ├── js/cache.js      # TODO 9
│   ├── js/main.js       # TODO 10–13
│   └── 3d-moment.html   # 以 3D 柱状图呈现的预报
├── completed/           # 参考答案：最后再打开
├── challenges/          # 三个拓展挑战：基础挑战为必做
├── tests/checklist.md   # 提交前的自查清单
├── assets/
└── screenshots/
```

## 环境配置

1. 把起始代码复制到一个新文件夹 `weather` 中，并用 Git 提交它。
2. 启动本地服务器。打开 `index.html`，同时打开 **Network** 和**控制台（Console）**面板。
3. 在完成 TODO 10 之前，页面会一直显示「Loading…」。这是预期中的现象。

## 分步讲解

### 规划你的学习节奏

| 节次 | 你要做的事 | 完成后你将拥有 |
| --- | --- | --- |
| 1 | 环境配置；第 1 步：什么是 API（TODO 1） | 已经读过 API 返回的 JSON |
| 2 | 第 2 步：构建 URL（TODO 2） | 一个可用的请求 URL |
| 3 | 第 3 步：把 JSON 转成天数据（TODO 3–4） | 用于处理数据的纯函数 |
| 4 | 第 4 步：`fetch`、`async` 和 `await`（TODO 5） | 带超时的 `fetchJson` |
| 5 | 第 5 步：就绪状态（TODO 6） | 一张预报表格 |
| 6 | 第 6 步：加载和错误（TODO 7, 10） | 每种失败情况都有解释 |
| 7 | 第 6 步（续）：测试各种失败情况 | 离线、被屏蔽、缓慢，全部妥善处理 |
| 8 | 第 7 步：空状态（TODO 8） | 页面绝不会毫无缘由地一片空白 |
| 9 | 第 8 步：缓存（TODO 9） | 带有时间戳的已保存数据 |
| 10 | 第 8 步（续）（TODO 11） | 瞬间加载，并支持离线使用 |
| 11 | 第 9 步：竞态条件（TODO 12） | 绝不会显示错误的城市 |
| 12 | 第 10 步：模拟数据与离线场景（TODO 13） | 没有网络也能正常工作 |
| 13 | 第 11 步：用键盘和屏幕阅读器测试 | 一个经过测试的仪表盘 |
| 14 | **3D 时刻** | 以 3D 柱状图呈现的预报 |
| 15 | [`tests/checklist.md`](tests/checklist.md) | 一个完成的仪表盘 |
| 16 | 一个拓展挑战，然后是**提交作业** | My XR Camp 的第四部分 |

### 第 1 步：什么是 API（TODO 1）

**API**（应用程序编程接口）是一个程序向另一个程序请求某些东西的方式。**Web API** 是一个返回数据而不是页面的网址。这些数据通常是 **JSON** 格式：就是你在 JavaScript 中熟悉的那些对象和数组，只是被写成了文本。

在写任何代码之前，先在浏览器中打开 TODO 1 里的地址。读一读返回的内容。Firefox 会把它显示成一棵树；在 Chrome 和 Edge 中，勾选 **Pretty-print**。在 Safari 中，可以在 Web Inspector 的 Network 面板中打开它来查看格式化后的结果。你会看到：

```json
"daily": {
  "time": ["2026-09-28", "2026-09-29", …],
  "temperature_2m_max": [26.8, 25.4, …],
  "precipitation_probability_max": [94, 59, …]
}
```

三个**并行数组（parallel array）**：每个数组的位置 0 都属于第一天。永远先阅读 API 的真实响应。它的文档告诉你它*应该*发送什么；而真实响应告诉你它*实际*发送了什么。

### 第 2 步：构建 URL（TODO 2）

`?` 后面的部分是**查询字符串（query string）**：用 `&` 连接的多个 `name=value` 对。不要手动拼接它。`URLSearchParams` 会构建它，并正确地对空格、重音符号、逗号等特殊字符进行编码：

```js
const params = new URLSearchParams({ latitude: 19.43, longitude: -99.13, forecast_days: 7 });
`${API_URL}?${params}`   // …/forecast?latitude=19.43&longitude=-99.13&forecast_days=7
```

### 第 3 步：把 JSON 转成天数据（TODO 3–4）

API 的数据结构对 API 本身来说很合适，但你的页面需要别的东西：每天一个对象。用一个纯函数把它一次性转换好，其余的代码就永远不需要知道并行数组这回事：

```js
return daily.time.map((date, i) => ({ date, max: daily.temperature_2m_max[i], … }));
```

如果 API 有一天改变了数据结构，需要修改的也只有这一个函数。

### 第 4 步：`fetch`、`async` 和 `await`（TODO 5）

发送请求需要时间：在快速的 Wi-Fi 上只需几毫秒，在拥挤的移动网络上可能要几秒钟。JavaScript 不会停下来等待。`fetch` 返回一个 **Promise**，`await` 只会暂停你的 `async` 函数，直到结果到达，与此同时页面依然保持响应。

有两件事几乎每个人都会感到意外：

- **`fetch` 在遇到「404」或「500」时不会失败。** 那些都是响应，只是不太令人满意的响应而已。`fetch` 只有在完全没有得到响应时才会失败：离线、被屏蔽或被取消。所以务必要检查 `response.ok`。
- **一个请求可能会长时间挂起。** `AbortSignal.timeout(8000)` 会在八秒后取消它，这样学习者看到的是一条错误信息，而不是永远的「Loading…」。

打开 `3d-moment.html`，同时打开 **Network** 面板：它已经在调用 `fetchForecast`，所以你可以观察这次请求，包括它的状态码（200）、大小和耗时。当 TODO 10 完成后，仪表盘本身也会开始发起请求。

### 第 5 步：就绪状态（TODO 6）

预报数据本质上是一张表格：一侧是日期，另一侧是测量值。使用真正的 `<table>`，配上 `<caption>`、用于列标题的 `<th scope="col">`，以及用于每天名称的 `<th scope="row">`。这样屏幕阅读器就能在学习者浏览时说出「星期二，最高温，25 °C」这样的内容。

最干燥的那一天会用粗体、颜色，*以及*文字「(driest)」一起标记出来，这样它的含义就绝不只依赖颜色。

### 第 6 步：加载和错误（TODO 7 和 10）

每一次请求都处于四种状态之一。大多数初学者只会构建顺利的那一种。要把全部四种都构建出来：

| 状态 | 学习者会看到什么 |
| --- | --- |
| **加载中** | 「Loading the forecast for Lima…」，以及该区域上的 `aria-busy="true"` |
| **错误** | 用简明的文字说明发生了什么，并提供**重试**按钮 |
| **空** | 服务返回了结果，但没有内容可显示：要平静地说明这一点 |
| **就绪** | 预报内容 |

`explain(error)` 会把技术性的错误转换成学习者可以据此采取行动的句子。`fetch` 抛出的 `TypeError` 意味着网络出了问题；`TimeoutError` 意味着请求耗时过长。

**要故意测试每一种失败情况。** 在 Network 面板的节流菜单中选择**Offline（离线）**，或者右键点击请求并选择 **Block request URL（屏蔽请求 URL）**。选择 **Slow 4G**（Chrome）来观察加载状态。你不能信任一条你从未见过的错误信息。

### 第 7 步：空状态（TODO 8）

当返回的数据里没有任何一天的信息时，`toDays` 会返回 `[]`。这既不是错误（请求本身成功了），也不是就绪状态（没有内容可显示）。可以编辑一份示例文件的副本，移除 `daily` 字段来测试这种情况。

### 第 8 步：缓存（TODO 9 和 11）

天气预报不会每秒都变化。学习者每次切换城市都重新请求一次 API，会浪费他们的流量和时间。所以要把每次响应连同保存时间一起存下来：

```js
{ "savedAt": 1790000000000, "data": { …API 的响应… } }
```

`load()` 中使用的策略叫做**先缓存，后网络（cache first, then network）**：

1. 如果有已保存的副本，**立即显示它**。如果它的保存时间在 30 分钟以内，到这里就结束。
2. 否则，向网络发起请求。响应到达后，保存并显示它。
3. 如果网络请求失败，但你有已保存的副本，就**继续显示它**，并说明无法更新。

始终说明数据的来源和时间：「Saved in this browser at 14:05.」。老数据，只要标明自己是老数据，就是有用的。老数据假装是新数据，就没用了。

### 第 9 步：竞态条件（TODO 12）

先选波哥大，然后很快又选成都。此时有两个请求同时在路上。如果波哥大的响应更慢，它会最后到达并覆盖成都的结果，于是页面显示的是波哥大的预报，而城市列表却显示成都。这就是**竞态条件（race condition）**，也是真实应用中最常见的 bug 之一。

解决办法：给每次请求编号，并在每次 `await` 之后，检查自己是否仍然是最新的那一次：

```js
const request = ++latestRequest;
const json = await fetchForecast(city);
if (request !== latestRequest) return;   // 已经有更新的请求开始了
```

要重现这个 bug，可以在 Network 面板中把网速限制为 **Slow 4G**，然后快速切换城市，分别在修复前和修复后观察效果。

### 第 10 步：模拟数据与离线场景（TODO 13）

`data/sample-forecast.json` 的结构**与真实响应完全一致**。因此你所有的代码（`toDays`、表格、3D 柱状图）都可以原封不动地用它来工作。团队会像这样使用**模拟数据**：在 API 还不存在时先构建功能，在没有网络时进行测试，以及故意构造一些棘手的场景（比如空响应，或者 100% 的降雨概率）。

当网络恢复时，浏览器会触发一个 `online` 事件：监听它，并刷新数据。

### 第 11 步：用键盘和屏幕阅读器测试

- 用键盘切换城市。新的预报是否会被朗读出来？
- 断开网络并点击刷新。错误是否会被朗读出来？你能通过键盘到达**重试**按钮吗？
- 在手机宽度的屏幕上，你能用键盘横向滚动表格吗（它是可获得焦点的）？

## 关键代码解析

**`json?.daily`**（可选链，optional chaining）。如果 `json` 是 `null` 或 `undefined`，结果会是 `undefined`，而不是抛出错误。

**`AbortSignal.timeout(ms)`** 会给 `fetch` 一个信号，在 `ms` 毫秒后取消请求。被拒绝的错误对象的 `name` 是 `"TimeoutError"`。

**`new Option(text, value)`** 会创建一个 `<option>` 元素：这是用数据填充 `<select>` 的一种简便写法。

**`finally`** 会在 `try` 之后运行，无论成功还是失败：这正是移除 `aria-busy` 的合适位置。

**`new Date(\`${date}T12:00:00\`)`。** 像 `2026-09-28` 这样不带时间的日期，会被解析为 UTC 午夜，而在美洲，这实际上仍然是前一天。加上本地的正午时间，可以在任何地方都保持日期正确。

## 3D 时刻

打开 [`completed/3d-moment.html`](completed/3d-moment.html)：同一份预报数据，以七根 3D 柱子呈现。高度代表最高温度（25 °C 变成 2.5 米）；颜色从沙色（干燥）过渡到深蓝色（多雨）。

这个页面遵循了一条你在做每一次 3D 数据可视化时都会用到的规则：**一份数据数组，多种视图**。同一个 `days` 数组既生成柱子，也生成场景描述（「The tallest bar is Friday, at 27 °C」），还生成场景下方的表格。表格就是 2D 版的孪生体：柱状图展示的一切信息，都以每位学习者都能使用的形式呈现出来。

摄像机是固定的（`look-controls` 和 `wasd-controls` 都被关闭了），也没有任何东西在动，所以没有什么需要暂停。在起始代码中，可以试着修改高度的比例尺，或者为最低温再加一排柱子。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| 预报是一张真正的表格，带有标题和表头单元格 | 1.3.1 | 屏幕阅读器会把每个数值连同它所在的日期和列一起朗读出来。 |
| 加载、错误和更新都会被朗读 | 4.1.3 | 状态消息能传达给使用屏幕阅读器的人。 |
| 错误信息说明发生了什么以及该怎么做 | 良好实践 | 「You may be offline」和**重试**，而不是一句「Error」。 |
| 最干燥的一天用文字而不仅是颜色来标记 | 1.4.1 | 仅靠颜色是不够的。 |
| 表格在窄屏幕上可以在自己的区域内滚动 | 1.4.10 | 页面本身绝不会左右滚动。 |
| 可滚动的区域可以通过键盘访问 | 2.1.1 | 使用键盘的人也可以滚动它。 |
| 3D 柱状图有文字描述，也有对应的表格 | 1.1.1 | 信息绝不会只存在于 3D 场景中。 |

## 性能注意事项

缓存是最大的收益：回到已经查看过的城市时会立即显示，也不消耗流量。这次请求只获取三个每日数值，而不是 API 提供的全部内容：响应更小，页面更快。在 Network 面板中数一数字节数：整份预报数据不到 1 KB，比一个图标还小。

## 常见错误

| 错误 | 会发生什么 | 应该怎么做 |
| --- | --- | --- |
| 没有检查 `response.ok` | 一个 404 页面被当作 JSON 解析，报出一个令人困惑的错误 | 抛出你自己的清晰错误 |
| 没有设置超时 | 在网络不好时永远显示「Loading…」 | 使用 `AbortSignal.timeout` |
| 只构建顺利情况下的状态 | 一旦出现任何问题，页面就是一片空白 | 设计加载、错误、空和就绪四种状态 |
| 忘记写 `await` | 得到的是一个 `Promise` 对象，而不是数据 | 在 `async` 函数内使用 `await` |
| 显示旧数据却不说明 | 学习者会误信一份来自昨天的预报 | 始终显示数据的保存时间 |
| 忽略延迟到达的响应 | 页面显示了错误城市的预报 | 给请求编号；忽略过时的响应 |
| 把 API 密钥写在前端代码里 | 任何人都能读到并滥用它 | 使用无需密钥的 API，或者用服务器（第 5 阶段） |

## 故障排查

**报错 `Failed to fetch`（Chrome）、`NetworkError when attempting to fetch resource.`（Firefox），或 `Load failed`（Safari）。** 你处于离线状态，或者这个服务在你的网络中被屏蔽了。试试**使用示例数据**。

**报错 Blocked by CORS policy。** 该 API 不允许来自其他网站的请求。Open-Meteo 是允许的；如果你换用了另一个 API，请查阅它的文档中关于「CORS」的说明。如果页面一片空白，并且控制台提示 `main.js` 的请求被 CORS 策略阻止了，说明你是以文件方式打开页面的：请改用本地服务器。

**日期差了一天。** 你用不带时间的 `"2026-09-28"` 创建了一个 `Date`。参见「关键代码解析」。

**在起始代码的 3D 时刻中报错 `fetchJson is not defined`。** 完成 TODO 2 到 6。

**编辑示例文件后什么都没变。** 你看到的是缓存中的内容。在 **Application** 面板（Firefox 中是 **Storage**）下的 Local Storage 里清除它，或者按**刷新**。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)**：记住学习者选择的城市，并显示「5 分钟前更新」这样的提示。
2. **[创意](challenges/challenge-2.zh-Hans.md)**：为你自己的社区制作一个公共数据仪表盘。
3. **[探索](challenges/challenge-3.zh-Hans.md)**：用第二个 API 展示你附近的地震信息，套用同样的四种状态。

## 提交作业

1. 完成 [`tests/checklist.md`](tests/checklist.md) 中的每一项。
2. 为三种状态各截一张图：就绪、错误（断开网络）、示例数据。再截一张 3D 柱状图的图。
3. 把它们保存在你的学习日志和作品集中。等 XR Camp 社区上线后，也在那里分享它们。
4. 在你的学习日志中回答：哪一种失败情况是你没有预料到的？你的应用现在是怎么解释它的？

## 延伸阅读

- [MDN: Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)（英文）
- [MDN: async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)（英文）
- [MDN: URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)（英文）
- [MDN: AbortSignal.timeout()](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static)（英文）
- [Open-Meteo: Weather Forecast API documentation](https://open-meteo.com/en/docs)（英文）

## 值得认识的女性

**Paola Villarreal** 是一位自学成才的墨西哥程序员和数据科学家，来自墨西哥城。她曾担任墨西哥城创新实验室 Laboratorio para la Ciudad 的技术主管。后来，作为 Mozilla 和福特基金会 Open Web Fellow 项目在马萨诸塞州公民自由联盟（ACLU）的研究员，她完成了「Data for Justice」项目的数据分析工作，这项分析支持撤销了因某州毒品检测实验室丑闻而受到影响的两万一千多起毒品定罪案件。

当有人去获取公共数据、清理它、清晰地展示它时，公共数据就能改变人们的生活——这和这个仪表盘所做的事情是一样的步骤，只是规模大得多。她是靠自学做到这一切的，就像你们中的许多人现在正在做的那样。

> **编者注：发布前请核实。** 「值得认识的女性」中的人物信息必须以一手资料核实，并在可行时于课程上线前与本人确认。参见 [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md)。

## 标准聚焦

`fetch`、`Response` 和 `response.ok` 是由 WHATWG 的 **Fetch Standard** 定义的，该标准同时也定义了 **CORS**：决定一个网站的页面是否可以读取另一个网站响应的规则。JSON 的语法被标准化为 **ECMA-404**，以及 IETF 的 **RFC 8259**。`AbortSignal` 来自 WHATWG 的 **DOM Standard**。正因为这些都是开放标准，同一个仪表盘才能在每一个现代浏览器中运行。

## 许可协议

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
