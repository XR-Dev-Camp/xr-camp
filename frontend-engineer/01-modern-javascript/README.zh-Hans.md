# 现代 JavaScript

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程：** `frontend-engineer` · **课时：** `modern-javascript-01` · **时长：** 约 14 小时 · 19 次学习，每次 45 分钟 · 每周 4 次，约 5 周

---

> 构建一个模块化的数据驱动 Web 应用。

---

## 学习目标

完成本项目后，你将能够：

1. 将应用拆分为使用 `import` 和 `export` 的 ES 模块。
2. 解释作用域（scope）：变量在哪里可见，以及为什么 `const` 和 `let` 比 `var` 更安全。
3. 编写箭头函数、默认参数和回调函数。
4. 解构对象和数组，读取你需要的值。
5. 使用 `fetch`、`async` 和 `await` 加载数据，并解释什么是 Promise。
6. 处理错误，使失败时显示有用的提示信息，而不是一片空白。
7. 使用 `map`、`filter` 和 `reduce` 转换数据，并编写纯函数。
8. 编写他人也能看懂的代码。

## 先决条件

- **第 1 阶段**，尤其是 **课程 1.6：JavaScript 基础** 和 **课程 1.7：开发者工具**。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| 一个现代浏览器，带开发者工具 | 运行与调试 | 免费 |
| VS Code（推荐） | 编写模块 | 免费 |
| 本地服务器：VS Code 的 **Live Server** 扩展，或 `python3 -m http.server` | **必需**：模块和 `fetch` 在 `file://` 下无法运行 | 免费 |

## 你将构建什么

**My XR Camp** 的第一部分：一个学习仪表盘，你会在第 2 阶段持续为它添砖加瓦。这是一个**课程地图**，展示 XR Camp 每个阶段和课时，包括所需时长和是否已就绪，数据来自 XR Camp 自身的课程数据。它带有「仅显示已就绪」筛选器、一段摘要，以及数据加载失败时的友好提示信息和一个**重试**按钮。

代码被拆分为四个**模块**，每个模块只负责一件事：

| 模块 | 职责 |
| --- | --- |
| `js/format.js` | 把数字转成文字（如「12 hours · 16 sessions」） |
| `js/data.js` | 加载数据，并基于数据计算 |
| `js/render.js` | 把数据转成页面元素 |
| `js/main.js` | 启动整个应用，并把各部分连接起来 |

参考答案在 [`completed/`](completed/) 中。起始代码已包含完成的 HTML、CSS 和数据，以及带有十四个 TODO 的四个模块。

## 文件夹说明

```text
01-modern-javascript/
├── README.md            # 本指南（英文）
├── README.es.md         # 西班牙语
├── README.zh-Hans.md    # 简体中文
├── project.json         # 课时元数据
├── starter/
│   ├── index.html       # 课程地图页面（已完成）
│   ├── styles.css
│   ├── data/catalog.json   # XR Camp 课程数据的快照
│   ├── js/format.js, data.js, render.js, main.js   # 从这里开始：14 个 TODO
│   └── 3d-moment.html   # 本课的 3D 时刻
├── completed/           # 参考答案：最后再打开
├── challenges/          # 三个拓展挑战：基础挑战为必做
├── tests/checklist.md   # 提交前的自查清单
├── assets/
└── screenshots/
```

## 环境配置

1. 把本课的 `starter` 文件夹复制到你的 `xr-camp` 文件夹中，重命名为 `my-xr-camp`。你会在课程 2.2、2.5、2.6 和 2.9 中持续为它添加内容。
2. 在该文件夹中启动本地服务器：在 VS Code 中打开该文件夹并选择 **Go Live**；或者在该文件夹的终端中运行 `python3 -m http.server 8000`，然后打开 `http://localhost:8000`。
3. 打开页面及其**控制台（Console）**。从现在起，始终通过服务器打开你的项目。

**为什么要用服务器？** 出于安全原因，浏览器不允许从 `file://` 打开的页面导入模块或 fetch 文件。本地服务器让你的电脑表现得像一个真实的网站，这也正是你的页面发布后将会运行的方式。

## 分步讲解

### 规划你的学习节奏

| 节次 | 你要做的事 | 完成后你将拥有 |
| --- | --- | --- |
| 1 | 环境配置和本地服务器；TODO 1 | 一个可运行的模块 |
| 2 | 第 1 步：模块、`import` 和 `export` | 能解释什么是模块 |
| 3 | 第 2 步：作用域、`const` 和 `let` | 能预测变量在哪里可见 |
| 4 | 第 3 步：箭头函数和默认参数（TODO 2–3） | 两个格式化函数 |
| 5 | 第 4 步：解构（TODO 4） | `describeTime` |
| 6 | 第 5 步：Promise、`async` 和 `await` | 能解释什么是 Promise |
| 7 | 第 5 步（续）（TODO 5） | 用 `fetch` 加载的数据 |
| 8 | 第 6 步：`reduce`（TODO 6 和 8） | 分组并计数的课时 |
| 9 | 第 6 步（续）：纯函数 | 第 7 步之后，可以用 `console.log` 测试的函数 |
| 10 | 第 7 步：导入（TODO 7） | 连接起来的模块 |
| 11 | 第 8 步：用 `map` 渲染（TODO 9–10） | 页面上的一节课 |
| 12 | 第 8 步（续）（TODO 11） | 页面上的每个阶段 |
| 13 | 第 9 步：启动应用（TODO 12） | 一个可用的课程地图 |
| 14 | 第 10 步：错误处理（TODO 13） | 一条有用的错误信息，以及重试按钮 |
| 15 | 第 10 步（续）：故意测试失败情况 | 一个能优雅失败的地图 |
| 16 | 第 11 步：`filter`（TODO 14） | 「仅显示已就绪」筛选器 |
| 17 | 第 12 步：可读的代码，以及关于类的说明 | 陌生人也能看懂的代码 |
| 18 | **3D 时刻**，然后是 [`tests/checklist.md`](tests/checklist.md) | 以 3D 景观呈现的课程 |
| 19 | 一个拓展挑战，然后是**提交作业** | My XR Camp 的第一部分 |

### 第 1 步：模块

在课程 1.6 中，你所有的代码都写在一个文件里。这在 150 行代码时没问题；到了 1500 行就很痛苦了。**模块**把代码拆分到多个文件中，每个文件只做一件事。模块用 `export` 选择要分享的内容，其他模块用 `import` 来获取：

```js
// format.js
export const hours = (minutes) => Math.round(minutes / 60);

// main.js
import { hours } from './format.js';
```

页面只加载起始模块，写法是 `<script type="module" src="js/main.js">`。浏览器会沿着 `import` 加载其余部分。模块会自动**延迟（defer）**加载，并且各自拥有独立的作用域：除非导出，否则内部内容不会外泄。

### 第 2 步：作用域

变量只在创建它的代码块（`{ ... }`）内可见：

```js
const phase = 1;
if (phase > 0) {
  const message = 'Not the first phase';
  console.log(message);   // 没问题
}
console.log(message);     // ReferenceError: message is not defined
```

默认使用 `const`，需要改变值时才用 `let`。你会在旧代码中看到 `var`：它会忽略代码块边界，从而导致令人意外的错误。不要使用它。

### 第 3 步：箭头函数和默认参数（TODO 2–3）

```js
export const hours = (minutes) => Math.round(minutes / 60);

export const plural = (count, one, many = `${one}s`) => (count === 1 ? one : many);
```

**箭头函数**是编写函数的一种更简短的写法。如果函数体只是一个表达式，该值会被自动返回。**默认参数**（`many = ...`）在调用者省略该参数时使用。`condition ? a : b` 用于在两个值之间做选择。

传给另一个函数、稍后被调用的函数叫做**回调（callback）**。你从课程 1.6 起就一直在用它们：`addEventListener('click', changeColour)`。

### 第 4 步：解构（TODO 4）

解构可以一行代码就把值从对象或数组中取出，赋给变量：

```js
const { minutes, sessions } = lesson;          // 等同于 lesson.minutes, lesson.sessions
const [first, second] = lessons;               // 前两个元素

export const describeTime = ({ minutes, sessions }) =>
  `${hours(minutes)} hours · ${sessions} sessions`;
```

在参数列表中解构，能让人一眼看出函数究竟需要什么。（完成版还对两个词都用了 `plural`，所以会显示「1 hour」「1 session」。）

### 第 5 步：Promise、async 和 await（TODO 5）

加载文件需要时间。JavaScript 不会停下来等待：`fetch` 会立即返回一个 **Promise**，这是一个「稍后会给出结果」的对象。`await` 会暂停**当前函数**（而不是整个页面），直到结果到达：

```js
export async function loadCatalog(url = 'data/catalog.json') {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not load the course data (${response.status}).`);
  }
  return response.json();
}
```

`await` 只能在 `async` 函数内部（或模块的顶层）使用。注意这里的检查：`fetch` 只在网络错误时才会失败。文件缺失时它仍然算「成功」，只是状态码是 404，所以你必须自己检查 `response.ok`。

### 第 6 步：reduce，以及纯函数（TODO 6 和 8）

`reduce` 遍历一个数组，并从中构建出**单一**结果：一个总数，或一个对象：

```js
export function totals(lessons) {
  return lessons.reduce(
    (sum, { minutes, status }) => ({
      minutes: sum.minutes + minutes,
      ready: sum.ready + (status === 'ready' ? 1 : 0),
    }),
    { minutes: 0, ready: 0 },        // 初始值
  );
}
```

`format.js` 中的函数和 `totals` 都是**纯函数**：相同的输入始终得到相同的输出，并且不改变其他任何东西。纯函数最容易测试，也最值得信赖。要测试一个纯函数，可以在第 7 步导入它之后，从 `main.js` 中打印它：`console.log(totals([{ minutes: 90, status: 'ready' }]))`。（直接在控制台里输入 `totals(...)` 是不行的：模块导出的内容不是全局的。）

### 第 7 步：导入（TODO 7）

只导入每个模块真正需要的内容，路径以 `./` 开头，并包含 `.js`。在 `main.js` 中用 `console.log` 立即测试你的函数。

### 第 8 步：用 map 渲染（TODO 9–11）

`map` 把数组中的每一项转换成别的东西，并返回一个新数组：

```js
list.append(...lessons.map(renderLesson));
```

`...`（展开运算符）把数组中的元素逐个传给 `append`。`render.js` 从不 fetch 或存储任何东西：它只负责把数据转成元素。把这些职责分开，正是让每个模块都易于修改的原因。

### 第 9 步：启动应用（TODO 12）

`main.js` 把一切连接起来：加载数据、计算、渲染。先在 `#summary` 这个实时区域（live region）中显示「Loading the course map…」，让人们知道有事情正在发生。

### 第 10 步：错误处理（TODO 13）

任何网络请求都可能失败：没有信号、文件名打错了、服务器宕机。用 `try...catch` 包裹加载过程，并显示一条说明发生了什么、该怎么做的信息，附带一个**重试**按钮：

```js
try {
  catalog = await loadCatalog();
  draw();
} catch (error) {
  map.replaceChildren(renderError(error.message, start));
}
```

错误框上的 `role="alert"` 会让屏幕阅读器立即朗读它。测试一下：临时重命名 `catalog.json`，重新加载页面，然后把名字改回来，再点击重试。

### 第 11 步：filter（TODO 14）

当「仅显示已就绪」发生变化时，用 `catalog.lessons.filter(...)` 重新绘制，并隐藏没有内容可显示的阶段。数据只加载一次；重新绘制是瞬间完成的。

### 第 12 步：可读的代码，以及类

像从未见过一样阅读你的模块：

- **命名**要说明事物是什么（`loadCatalog`，而不是 `getData2`）。
- **函数**只做一件事，并且简短。
- **注释**解释*为什么*，而不是*做了什么*：代码本身已经说明了做了什么。

你还会在别人的代码中遇到**类（class）**：`class Lesson { constructor(title) { this.title = title; } }`。它们把数据和处理数据的函数打包在一起。第 3 阶段中的 A-Frame 组件和 three.js 对象就是这样构建的。对于我们这样的数据，普通对象和函数更简单，也已经够用。

## 关键代码解析

**`<script type="module">`。** 启用 `import` 和 `export`，赋予文件自己的作用域，并使其延迟加载。

**`groups[lesson.phase] ??= []`。** `??=` 仅在左侧为 `null` 或 `undefined` 时赋值：「第一次需要时才创建这个列表」。

**`response.ok`。** 状态码在 200–299 之间时为真。`fetch` 之后务必检查它。

**`role="alert"` 和 `role="status"`。** 两者都是实时区域（live region）：`alert` 会打断当前朗读，用于错误；`status` 会礼貌地等待，用于一般更新。

## 3D 时刻

等你的模块能正常运行后，打开 [`starter/3d-moment.html`](starter/3d-moment.html)。它会导入**你自己的** `data.js`，并用同样的课程数据构建一个 3D 景观：每个阶段一列，每节课一个方块，已就绪的课时呈紫色。场景描述也是从同一份数据生成的，因此它始终与场景保持一致。

这正是本课的核心理念，用一幅画面来概括：一旦你的数据和逻辑存在于模块中，同一套代码就可以同时驱动一个列表、一张图表，或者一个 3D 世界。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| 加载、结果和错误都会被朗读出来 | 4.1.3 | `role="status"` 和 `role="alert"`。 |
| 状态用文字而不仅是颜色来表示 | 1.4.1 | 「Ready」和「Coming soon」标签。 |
| 每个阶段都是一个由其标题命名的区块 | 1.3.1 | 使用屏幕阅读器的人可以在各阶段之间跳转。 |
| 复选框有对应的标签 | 1.3.1, 3.3.2 | 点击文字也能勾选它。 |
| 3D 景观有一段由数据生成的描述 | 1.1.1 | 文字描述始终与场景一致。 |

## 性能注意事项

课程数据大约 16 KB，且只加载一次；筛选时会从内存中重新绘制。模块是并行加载的，浏览器会缓存它们。在课程 2.9 中，你会看到工具如何把许多模块合并成一个文件用于生产环境。

## 常见错误

| 错误 | 会发生什么 | 应该怎么做 |
| --- | --- | --- |
| 从 `file://` 打开页面 | 出现「CORS」错误，什么都加载不出来 | 使用本地服务器 |
| `import { hours } from './format'` | 浏览器找不到该文件 | 要包含 `.js` |
| 忘记 `export` | 报错 `does not provide an export named` | 导出其他模块需要的内容 |
| 在非 `async` 函数中使用 `await` | `SyntaxError` | 把该函数标记为 `async` |
| 没有检查 `response.ok` | 404 页面被当作数据读取，`json()` 失败 | 先检查，再抛出清晰的错误 |
| 又写出一个巨大的 `main.js` | 模块只是名义上的模块 | 一个模块只负责一件事 |

## 故障排查

**控制台提示「CORS」或「blocked」。** 你是从 `file://` 打开的页面。请使用本地服务器的地址。

**`Failed to resolve module specifier`**（Chrome 的说法；Firefox 会说该说明符「was a bare specifier」）。模块路径必须以 `./`、`../` 或 `/` 开头（或者是一个完整的 URL）。

**读取 JSON 时出现 `Unexpected token '<'`。** 服务器返回了一个 HTML 页面（通常是 404 页面），而不是你的数据。检查一下路径。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)**：一个按标题筛选课时的搜索框。
2. **[创意](challenges/challenge-2.zh-Hans.md)**：使用你自己的数据：你的学习计划或社区活动的地图。
3. **[探索](challenges/challenge-3.zh-Hans.md)**：用 `Promise.all` 同时加载两个文件。

## 提交作业

1. 完成 [`tests/checklist.md`](tests/checklist.md) 中的每一项。
2. 为你的课程地图截图，再截一张它的错误信息，以及一张 3D 景观的截图。
3. 把它们保存在你的学习日志和作品集中。也可以和其他开发者分享它们（参见[在哪里分享你的作品](../../docs/en/community.md)，英文）。
4. 在你的学习日志中回答：如果数据换到了另一个地址，你会修改哪个模块，为什么只需要修改那一个？

## 延伸阅读

- [MDN: JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)（英文）
- [MDN: Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)（英文）
- [MDN: async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)（英文）
- [MDN: Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring)（英文）
- [MDN: Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)（英文）

## 值得认识的女性

**Joyee Cheung** 在广州长大，是 Node.js 技术指导委员会（Technical Steering Committee）成员，也是 Chrome 和 Node.js 内部 JavaScript 引擎 V8 的提交者（committer）。她主导了 `require(esm)` 的开发工作，使得旧版 Node.js 代码也能加载 ES 模块——正是你在本课中使用的 `import` 和 `export`。

模块只有在新旧代码能够协同工作时才真正有用。让这一点在世界上使用最广泛的 JavaScript 平台之一上成为可能，是一项细致而耐心的工作，其中很大一部分正是出自她手。

_资料来自公开来源，于 2026 年核实。发现错误？[告诉我们](https://github.com/XR-Dev-Camp/xr-camp/issues)。_

## 标准聚焦

ES 模块、`async`/`await`、解构和箭头函数都是从 2015 年起的历次 **ECMAScript** 版本中引入的，由 TC39 商定。每一项提案都要在 GitHub 上经历公开的多个阶段，从一个想法（阶段 0）到最终完成（阶段 4），任何人都可以阅读相关讨论。`fetch` 本身并不属于 ECMAScript：它是 WHATWG 的 **Fetch Standard**。

## 许可协议

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
