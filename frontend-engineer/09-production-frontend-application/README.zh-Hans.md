# 第 2 阶段毕业项目——生产级前端应用

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程：** `frontend-engineer` · **课时：** `production-frontend-application-09` · **时长：** 约 18 小时 · 24 次学习，每次 45 分钟 · 每周 4 次，约 6 周

---

> 发布一个可维护、可安装、为多语言做好准备的前端应用。

---

## 学习目标

完成本项目后，你将能够：

1. 把几个小应用合并成一个，同时不丢失让每一个应用都易于修改的那种结构（config、utils、store、service、component）。
2. 为一个小型多视图应用选择并解释一种**页面内的简单导航**模式，而不是直接引入一个路由库。
3. 把某种语言的所有文字拆分到它自己的模块中，并在运行时通过 `<html lang>`、`Intl`，以及一个能实时更新的页面来切换语言。
4. 撰写一份简短、诚实的初稿翻译，并清楚地标注它需要母语者审查，而不是假装它已经完成了。
5. 交付一个**只在需要时才加载的 3D 功能**，配有文字描述和作为其 2D 孪生体的表格，并证明它从不会提前加载。
6. 让一个应用变得**可安装、可离线**，配有一个带版本号的 Service Worker，以及一个无障碍的更新提示。
7. 在没有测试框架的情况下，用 `check.html` 阅读并检查纯函数。
8. 在 Network 面板中测量一个**性能预算**，并解释每一个数字都花在了哪里。
9. 发布 **1.0.0** 版本：一份非程序员也能读懂的 `CHANGELOG.md`、一个显示在应用本身中的版本号，以及一份诚实的 AI 使用记录。
10. 用一份书面**评分标准（rubric）**来检验一个项目，并用自己的话解释它在每一行上是如何达标的。

## 先决条件

- **课程 2.1：文档对象模型与动态界面**（课程地图，基于 `data/catalog.json` 构建）。
- **课程 2.2：文档对象模型与动态界面**（仪表盘，以及它在 `localStorage` 中的进度键名）。
- **课程 2.3：应用架构与可维护代码**（学习计划器，以及这整个应用所遵循的 config/utils/store/component 结构）。
- **课程 2.4：API、JSON 与异步应用**（学习周天气：`fetch`、缓存、示例数据回退）。
- **课程 2.5：Web Components**（`<lesson-card>`）。
- **课程 2.6：渐进式 Web 应用**（清单文件、Service Worker、低流量模式）。
- **课程 2.7：Git 协作与开源**（语义化版本号、`CHANGELOG.md`）。
- **课程 2.8：AI 作为开发助手**（AI 使用记录）。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| 一个基于 Chromium 的浏览器：Chrome 或 Microsoft Edge（两者在中国大陆均可使用） | **Application** 面板（清单文件、Service Worker、缓存）和 **Network** 面板（性能预算） | 免费 |
| VS Code 和本地服务器 | 整个应用需要 `http://localhost` 或 `http://127.0.0.1`：一个安全上下文，供 Service Worker 使用 | 免费 |
| 一部手机（可选） | 在真实设备上测试安装、离线状态和窄屏布局 | 免费 |
| [Open-Meteo](https://open-meteo.com/) | 天气预报：无需密钥，无需账号 | 非商业用途免费 |
| 来自 `aframe.io` 的 A-Frame 1.8.0 | 3D 时刻，只在被按下时才加载 | 免费 |

**如果 Open-Meteo 在你所在地区较慢或被屏蔽**，天气视图会像课程 2.4 中一样，自动回退到 `data/sample-forecast.json`。

## 你将构建什么

**My XR Camp 1.0**：一个小型应用，整合了你目前为止在第 2 阶段构建的每一个部分。

- **仪表盘**：以表格形式呈现你按阶段划分的进度，并带有一个可选的 3D 视图（课程 2.1、2.2）。
- **课程地图**：以 `<lesson-card>` 元素呈现每一节课，基于 `data/catalog.json` 构建（课程 2.1、2.5）。
- **学习计划器**：添加、完成、删除 45 分钟的学习时段（课程 2.3）。
- **学习周天气**：为 XR Camp 学习者所在城市提供 7 天预报（课程 2.4、2.6）。
- **应用（App）**：语言、数据保存、安装和更新，都集中在一处。

它可以安装，能离线运行，并支持三种语言：完整的英语，以及简短的西班牙语和简体中文初稿，两者都标注为需要母语者审查（见下文「为多语言做好准备」）。它的**3D 时刻**是一个「以 3D 形式查看我的进度」的按钮，只在被按下时才加载一个小库，绝不会提前加载。

参考答案在 [`completed/`](completed/) 中：可读性强，规模不大，十七个小文件里一共只有一千多行 JavaScript 代码。起始代码已经写好了每一个模块——config、utils、`i18n.js`、语言文件、store、service，以及 component——只剩下一个文件需要完成：`js/main.js`，其中有八个编号的 TODO，负责把已有的模块连接起来。具体每个已完成模块来自哪节课，参见 [`starter/README.md`](starter/README.md) 中的「What to copy from which lesson」。

## 为多语言做好准备

应用界面中每一个面向用户的字符串（不包括课程目录自身的标题）都存放在一个语言模块中：[`js/locales/en.js`](completed/js/locales/en.js)、[`es.js`](completed/js/locales/es.js)，以及 [`zh-Hans.js`](completed/js/locales/zh-Hans.js)。英语已经完整。**西班牙语和简体中文是为本课制作的简短初稿翻译，没有经过对应语言母语者的审查。** 它们在各自的文件中被标记为 `draft: true`，当其中任何一种语言处于激活状态时，应用都会显示一条明显的提示（「This translation is a short first draft…」）。在把这两种翻译用于真实学习者之前，请找一位母语者审查它，审查完成后再去掉 `draft` 标记。完整的国际化——涵盖每个语系的复数规则、从右到左的排版，以及一套完整的翻译工作流——是课程 6.2 的内容；本课只是为它打下基础。

## 文件夹说明

```text
09-production-frontend-application/
├── README.md, README.es.md, README.zh-Hans.md
├── project.json
├── starter/
│   ├── brief.md, rubric.md          # 任务说明，以及评分方式
│   ├── ai-log.md, CHANGELOG.md      # 模板：边做边填写
│   ├── index.html                   # 每个视图都已经在这里了
│   ├── manifest.webmanifest, sw.js, offline.html, check.html   # 已完成
│   ├── styles.css, icons/, data/    # 已完成
│   └── js/
│       ├── main.js                  # 唯一带有 TODO 的文件（共八个）
│       ├── config.js, utils.js, i18n.js   # 已完成
│       ├── locales/en.js, es.js, zh-Hans.js   # 已完成
│       ├── stores/                  # progress、planner、low-data ——已完成
│       ├── services/                # api、cache、catalog、pwa ——已完成
│       └── components/              # lesson-card、views、three-progress ——已完成
├── completed/                       # 参考答案：最后再打开
│   ├── rubric.md, ai-log.md, CHANGELOG.md   # 由 Ana 填写完成
│   └── (与 starter/ 结构相同，main.js 已完成)
├── challenges/                      # 三个拓展挑战：基础挑战为必做
├── tests/checklist.md               # 提交前的自查清单
├── assets/
└── screenshots/
```

## 环境配置

1. 把 `starter/` 复制到一个新文件夹 `my-xr-camp` 中，并用 Git 提交它。
2. 启动本地服务器，通过 `http://localhost` 或 `http://127.0.0.1` 打开 `index.html`。Service Worker 需要一个安全上下文，和课程 2.6 中一样。
3. 打开开发者工具。在本课中，你会用到**控制台（Console）**、**Application** 面板，以及 **Network** 面板。
4. 在写任何代码之前，先完整地读一遍 [`starter/brief.md`](starter/brief.md) 和 [`starter/rubric.md`](starter/rubric.md)。
5. 打开 `js/main.js`。它的八个 TODO，按顺序排列，就是本课的分步讲解。

## 分步讲解

### 规划你的学习节奏

| 节次 | 你要做的事 | 完成后你将拥有 |
| --- | --- | --- |
| 1 | 环境配置；把 `brief.md`、`rubric.md`、`starter/README.md` 和 `js/main.js` 对照着读一遍 | 你能看清每一个要填写的 TODO，以及原因 |
| 2 | 第 1 步：My XR Camp 的结构——浏览 `config.js`、`utils.js` 和各个 store（重用课程 2.3 的架构） | 一张说明每一部分状态存放在哪里的地图 |
| 3 | 第 2 步：页面内的简单导航（TODO 1） | 五个视图，一个 URL 哈希值，每次切换焦点都会移动 |
| 4 | 第 3 步：阅读仪表盘和课程地图（课程 2.1、2.2、2.5） | 理解进度行和 `<lesson-card>` 的渲染方式 |
| 5 | 第 4 步：阅读学习计划器（课程 2.3） | 同一种 store 模式，第二次应用，且没有复制它原本的 bug |
| 6 | 第 5 步：阅读学习周天气（课程 2.4、2.6） | 理解先缓存后网络的策略，以及示例数据的回退机制 |
| 7 | 第 6 步：以学习者选择的语言启动（TODO 2） | 页面在第一次绘制之前就已经以正确的语言打开了 |
| 8 | 第 7 步：语言切换器（TODO 3） | 切换语言会一次性更新所有可见视图 |
| 9 | 第 8 步：语言文件、复数形式与 `Intl` | 数字、日期和百分比在三种语言下都读起来自然 |
| 10 | 第 9 步：低流量模式（TODO 4） | 一个能改变应用愿意加载哪些内容的开关 |
| 11 | 第 10 步：阅读 3D 时刻的代码 `three-progress.js` | 一个基于仪表盘表格所用同一批行数据构建的柱状图 |
| 12 | 第 11 步：延迟加载它（TODO 5） | 按钮被按下之前，不会向 `aframe.io` 发送任何请求 |
| 13 | 第 12 步：阅读 Service Worker 及其缓存（`sw.js`） | 每个被缓存文件的作用，都在一个带版本号的缓存中 |
| 14 | 第 13 步：注册它，并提供更新（TODO 6） | 版本变化后出现「A new version is ready」 |
| 15 | 第 14 步：提供安装（TODO 7） | 一个安装按钮，或者在无法安装时提供书面步骤 |
| 16 | 第 15 步：按顺序完成启动流程（TODO 8） | 整个应用：可离线、可安装、支持三种语言 |
| 17 | 第 16 步：`check.html` 与纯函数 | 每个纯函数都经过检查，不依赖任何框架，不涉及网络 |
| 18 | 第 17 步：一次无障碍检查，用键盘和耳朵 | 手动检查焦点顺序、标签和朗读内容 |
| 19 | 第 18 步：在 Network 面板中测量性能预算 | 测量了你外壳的体积，并证明 A-Frame 确实是延迟加载的 |
| 20 | 第 19 步：在 390 px 和 1280 px 下测试，以及离线测试 | 两种宽度下都没有横向滚动，也没有布局错乱 |
| 21 | 第 20 步：3D 时刻的无障碍性（场景描述、减少动态效果、舒适度） | `tests/checklist.md` 中「3D 和 XR」部分已勾选完成 |
| 22 | 第 21 步：发布——撰写 `CHANGELOG.md` 的 `1.0.0` 条目（课程 2.7） | 一份非程序员也能读懂的更新日志 |
| 23 | 第 22 步：你的 AI 使用记录，经过审阅并完成（课程 2.8） | 一份诚实的记录，是在你工作过程中保留下来的，而不是事后编造的 |
| 24 | 一个拓展挑战，然后是 [`tests/checklist.md`](tests/checklist.md) 和**提交作业** | My XR Camp 1.0 |

### 第 1 步：My XR Camp 的结构

先打开 `js/config.js`。它包含整个应用的每一项设置，按使用它的部分分组：发布版本号、三个语言代码、五个视图 id，以及五个 `localStorage` 键名，其中三个的名字和课程 2.2 到 2.6 中完全一致，这样学习者已保存的进度就能延续到这个应用中。然后大致浏览一下 `js/utils.js`：其中没有任何东西涉及 DOM、存储或语言，所以 `check.html`（第 16 步）可以直接测试它的每一行。这正是课程 2.3 的架构，被应用到了五个视图上，而不是一个：config、utils、store、service、component，以及唯一一个被允许接触页面的文件 `main.js`。

### 第 2 步：页面内的简单导航（TODO 1）

My XR Camp 有五个视图（`config.js` 中的 `VIEWS`）：仪表盘、课程地图、计划器、天气，以及应用（app）。每一个都是 `index.html` 中的一个 `<section id="…">`，除了仪表盘之外都已经标记为 `hidden`。编写 `currentView()`（读取 `location.hash`，找不到就回退到 `DEFAULT_VIEW`）和 `showView(view)`（切换每个区块的 `hidden`，在对应的导航链接上设置 `aria-current="page"`，并把焦点移到该视图的 `<h1>` 上——它已经带有 `tabindex="-1"`）。监听 `hashchange`，重新调用 `showView(currentView())`。

这是一个微缩版的**路由（router）**，值得说明一下为什么这里不需要一个完整的路由库：五个区块还不需要一个专门的路由；本课程也避免使用大多数路由库都要求的构建步骤；而且这个哈希值本身已经是一个可以收藏、支持离线的 URL，不需要在服务器上配置任何路由。如果 My XR Camp 增长到二十个视图，这个取舍就会反过来；课程 6 会重新讨论这个问题。

### 第 3 步：阅读仪表盘和课程地图

`renderDashboard()` 和 `renderCourse()` 都已经写好了，值得仔细阅读：`phaseProgress()`（来自 `utils.js`）把课程目录和已完成课时的集合，转换成每个阶段一行的数据；表格（`phaseTable()`）和 3D 视图（第 10 步）都是从这些完全相同的行数据构建出来的，所以它们永远不会互相矛盾。`renderCourse()` 为每节课构建一个 `<lesson-card>`，还是课程 2.5 中的同一个自定义元素，现在它能说应用支持的每一种语言了（它自己的 `localechange` 监听器会重新渲染它）。

### 第 4 步：阅读学习计划器

`plannerStore` 就是课程 2.3 中的 `store.js`，只做了一处改动：存储键名在 `config.js` 中被命名为 `PLANNER_KEY`（它的值 `'xrc_s'` 没有变化，所以旧的已保存时段依然能通过同一个 `upgrade()` 迁移函数加载出来）。注意计划器从不直接从 `main.js` 中操作 `localStorage`：只有 store 会这么做，其他每一个模块都是通过 `getSessions()` 读取它，通过 `subscribe()` 得知变化。

### 第 5 步：阅读学习周天气

`loadWeather()` 会先显示已缓存的预报（如果有的话），然后再请求网络。如果失败，它会回退到 `data/sample-forecast.json`，所以这个视图永远不会是空的。`toDaysSafe()` 和 `driestDay()`（来自 `utils.js`）就是课程 2.4 中同样的纯函数，`forecast-view.js` 渲染的是同一张表格，只是现在每一个字都来自 `i18n.js`，每一个数字都来自 `Intl`。

### 第 6 步：以学习者选择的语言启动（TODO 2）

在 `start()` 的开头，先 `await startI18n()`，再执行 `translatePage()`。`startI18n()`（在 `i18n.js` 中，已经写好）会先检查 `localStorage` 中是否有已保存的选择，然后检查 `navigator.languages`，最后回退到英语，并在其他任何代码运行之前设置好 `document.documentElement.lang`——这和之前每一节课的文档语言要求（WCAG 3.1.1）一样，只是现在由学习者自己决定，而不是硬编码在代码里。

### 第 7 步：语言切换器（TODO 3）

在 `#language-select` 上监听 `change` 事件，并调用 `setLocale(event.target.value)`。然后编写 `onLocaleChange()`：调用 `translatePage()`、`renderLanguageControls()`，并对每个视图进行一次完整的重新渲染，确保没有任何地方还显示着旧的语言。把它作为一个 `"localechange"` 监听器，注册在 `start()` 的最末尾（第 15 步 / TODO 8），要在第一次渲染之后，而不是之前：`setLocale()` 在启动时也会触发同一个事件，如果监听器注册得太早，就会导致整个应用毫无必要地被渲染两次。

### 第 8 步：语言文件、复数形式与 `Intl`

打开 `js/locales/en.js`。一条消息要么是一个普通字符串，要么是一个带有复数形式的对象（`{ one: '…', other: '…' }`）：`i18n.js` 中的 `format()` 会用 `Intl.PluralRules` 来选择正确的形式，因为哪个数量对应「one」这种形式，取决于具体的语言——中文完全没有单独的复数形式，这正是为什么 `zh-Hans.js` 中只会写 `other`。这个应用中的每一个日期、时间、温度和百分比，都会经过 `Intl.DateTimeFormat`、`Intl.NumberFormat`，或者 `i18n.js` 中对它们的一层薄封装：任何地方都没有手写的月份名称列表，也没有手写的四舍五入函数。

### 第 9 步：低流量模式（TODO 4）

`lowData.lowDataPreferred()` 和 `lowData.setLowData()` 相对于课程 2.6 没有任何变化。把 `#low-data-toggle` 的 `change` 事件连接到 `setLowData()`，并订阅这个 store，这样每当这个偏好设置发生变化时（包括从另一个已打开的标签页中改变），`renderLowDataControls()` 和 `renderThreeDGate()`（第 11 步）就都会重新运行。

### 第 10 步：阅读 3D 时刻的代码

打开 `js/components/three-progress.js`。`mountThreeProgress()` 构建了一个 `<a-scene>`，每个阶段对应一个 `<a-box>`，高度和完成的课时数成正比，这些数据来自和仪表盘表格完全相同的行。摄像机是固定的——没有拖拽环绕，也没有 WASD 方案——所以不存在任何需要专属键盘操作路径的、只在 3D 中才有的交互：场景中展示的一切内容，下方的 2D 表格也用文字展示了一遍。场景中没有任何东西会自行移动，所以不需要暂停按钮；一个从不产生动效的图表，也不需要为 `prefers-reduced-motion` 禁用任何东西——不过让它保持静止的这个选择，本身就是这个功能遵循这一偏好设置的方式。

### 第 11 步：延迟加载它（TODO 5）

在 `renderThreeDGate()` 中：如果 `lowData.lowDataPreferred()` 为真，就隐藏按钮，显示跳过提示，清空容器，然后就此打住——在这种情况下，这个库绝不能被加载。否则，就显示按钮，并把它的点击处理函数设为调用 `mountThreeProgress(container, rows)`。`three-progress.js` 内部的 `loadAframe()` 会在第一次被调用时，把 `<script src="https://aframe.io/releases/1.8.0/aframe.min.js">` 注入到 `<head>` 中，此后再也不会重复。**证明这一点**：打开 Network 面板，重新加载应用，确认列表中完全没有任何对 `aframe.io` 的请求——然后按下按钮，看着一条请求出现。

### 第 12 步：阅读 Service Worker 及其缓存

`sw.js` 是课程 2.6 的 Service Worker，每个应用一个缓存。`SHELL` 列出了应用在没有网络的情况下打开所需的每一个文件；`THREE_D` 列出了 A-Frame 的地址，它被单独缓存，并在设备要求节省流量时，在安装阶段被跳过。天气相关的请求使用**带超时的网络优先**策略；`SHELL` 中的其他一切都使用**缓存优先**策略；导航请求会回退到 `offline.html`。

### 第 13 步：注册它，并提供更新（TODO 6）

调用 `registerServiceWorker()`，传入一个 `onUpdateReady(worker)` 回调函数，它会给 `#update-message` 添加 `visible` 类，然后用 `#update-text` 和 `#update-button` 调用 `showUpdateBanner(worker, { message, button })`。这两个函数都已经写在 `js/services/pwa.js` 中；在连接它们之前先读一读。要测试它，修改 `sw.js` 的 `VERSION`，重新加载一次（新的 worker 会安装并等待），再重新加载一次——横幅应该会出现，按下它的按钮应该能完成更新，而不会丢失已保存的进度或学习时段。

### 第 14 步：提供安装（TODO 7）

调用 `offerInstall()`，传入 `#install-button` 和 `#install-status`。如果 `isInstalled()` 已经为真，就自己设置 `#install-status` 的文字内容。和课程 2.6 一样，只有基于 Chromium 的浏览器会触发 `beforeinstallprompt`；在其他任何地方，App 视图中书面的操作说明就是安装的方式，所以按钮在那里保持隐藏是正确的行为，而不是出了问题。

### 第 15 步：按顺序完成启动流程（TODO 8）

在 `start()` 的最末尾，添加第 7 步中的 `"localechange"` 监听器。`start()` 内部的顺序很重要：先是语言，这样后面每一段文字从第一帧开始就是正确的；然后是课程目录和每个视图的首次渲染；接着是导航，让页面打开在正确的视图上；然后是 Service Worker、安装选项，最后才是语言变化监听器。把这个顺序处理正确，正是本课标题中「生产级」一词的大部分含义：不是新增功能，而是让同样的这些功能，以一个真实学习者第一次访问时可以依赖的顺序到达。

### 第 16 步：`check.html` 与纯函数

打开 `check.html`。它会用已知的输入去测试 `utils.js` 和 `i18n.js` 中的纯函数，使用简单的类似 `assert` 的检查方式，不依赖任何框架：每次修改这两个文件中的任何一个之后，都打开它检查一遍。它还会检查 `sw.js` 的 `VERSION` 和 `config.js` 的 `APP_VERSION` 是否一致——这两者不匹配，正是那种在学习者的浏览器卡在旧版本之前完全看不出来的错误。

### 第 17 步：一次无障碍检查

拔掉你的鼠标十分钟。用 Tab 键浏览每一个视图：焦点是否始终可见？每个控件是否都有一个屏幕阅读器能朗读出来、并且以可见标签开头的名称（WCAG 2.5.3）？打开一个屏幕阅读器（VoiceOver、NVDA，或者 Chrome 自带的那个），添加一个学习时段，切换语言，按下**以 3D 形式查看我的进度**：每一次是否都有内容被朗读出来，同时焦点没有从你正在做的事情上跳开？

### 第 18 步：在 Network 面板中测量性能预算

打开 Network 面板，清空它，在禁用缓存的情况下重新加载。记下外壳的总传输体积：这个应用的预算是**不含 A-Frame 时不超过 150 KB**。然后按下**以 3D 形式查看我的进度**，确认那条约 1.3 MB 的 A-Frame 请求只在此时才出现，而不是之前。性能预算是一个你事先决定、然后要为之辩护的数字，而不是一个事后才发现、再找借口的数字。

### 第 19 步：在 390 px 和 1280 px 下测试，以及离线测试

把 DevTools 的宽度调整为 390 px，再调整为 1280 px：不应该出现任何横向滚动，每个标签也应该始终紧挨着它对应的控件。然后在 Network 面板中勾选 **Offline**，重新加载每一个视图，再打开一个 Service Worker 没有保存过的页面：它应该显示 `offline.html`，而绝不是浏览器自带的错误页面。

### 第 20 步：3D 时刻的无障碍性

手动确认以下几点：`#scene-description` 存在，并且是基于它下方表格所用的同一批行数据构建的；整个功能都可以用键盘访问和退出（按照设计，这里没有任何只属于 3D 的操作需要专门到达——参见第 10 步）；并且在你的操作系统或 DevTools 的 Rendering 面板中设置了 **prefers-reduced-motion: reduce** 之后，应用的行为完全不会有任何变化，因为其中从来就没有任何动效。在 `tests/checklist.md` 的「3D 和 XR（手动）」部分把每一项都勾选完成。

### 第 21 步：发布——撰写 `CHANGELOG.md` 的 `1.0.0` 条目

在 `starter/CHANGELOG.md` 中填写 `1.0.0` 这个标题，写上今天的日期，并在 `### Added` 下面列出 My XR Camp 能做什么，用非程序员也能读懂的语言来写。只有在写完自己的版本之后，才去对照 [`completed/CHANGELOG.md`](completed/CHANGELOG.md)。

### 第 22 步：你的 AI 使用记录，经过审阅并完成

如果你在本课的任何地方使用过 AI 助手——包括为西班牙语或中文的初稿字符串（如果这些是你自己写的），完成 `ai-log.md`：记录每一次对话、你分享了什么、你保留了什么、花了多长时间，包括那些你没有采纳答案的次数。[`completed/ai-log.md`](completed/ai-log.md) 是一份已经填好的示例，而不是一份需要逐字照抄的模板。

## 关键代码解析

**`Intl.PluralRules(locale).select(count)`** 返回的是一个类别——`'one'`、`'other'`，以及一些语言会用到的其他类别——而不是一个数字。`i18n.js` 中的 `format()` 用它来在一条消息的各种复数形式之间做选择，这样同一个键在一个有两种形式的语言和一个完全没有复数形式的语言中，都能正确工作。

**`import(`./locales/${code}.js`)`。** 一个带变量的动态导入，先对照已知代码的固定列表（`CODES.includes(code)`）进行检查，这样就只有这个应用自己的语言文件才能通过这种方式被加载，并且每一个都只会在需要时才加载。

**`window.matchMedia('(display-mode: standalone)').matches`** 是 `isInstalled()` 用来区分「已安装的应用」和「浏览器标签页」的方式，不需要任何特殊权限。

**`AbortSignal.timeout(TIMEOUT_MS)`** 会在固定时间后取消一次 `fetch`，这样在网络较慢时，请求会很快失败，而不是让天气视图永远停留在「Loading…」。

**`document.dispatchEvent(new CustomEvent('localechange', …))`。** 每一个显示文字的模块都监听着这同一个事件，而不是彼此直接导入：语言切换器和仪表盘、计划器、天气视图，甚至 `<lesson-card>`（跨越一个 shadow 边界）都会对它做出反应，同时彼此并不知道对方的存在。

## 3D 时刻

交付一个只在需要时才加载、绝不会阻塞 2D 体验的 3D 功能。

在仪表盘上按下**以 3D 形式查看我的进度**。一个柱状图出现了：每个阶段一列，高度是你在该阶段中已标记完成的课时比例——和它正上方表格中的数字完全相同，因为两者都来自 `phaseProgress()`。在你按下按钮之前，其中的任何东西都不会被加载：检查一下 Network 面板，首次加载时完全没有对 `aframe.io` 的请求，只有在之后才会有。

摄像机从不移动，场景中的任何东西也不会移动：没有拖拽环绕，没有点击旋转，也没有持续的动画。这一个决定一次性消除了两整类无障碍相关的工作：不存在任何只属于 3D 的、需要专门键盘操作路径的交互；也不需要暂停按钮或 `prefers-reduced-motion` 检查，因为根本没有任何东西在动，也就没有什么需要被 `prefers-reduced-motion` 打断的。`#scene-description` 是用文字构建的，基于 3D 柱状图和 2D 表格所使用的完全相同的行数据，所以使用屏幕阅读器的人得到的信息，和看着柱状图的人得到的信息完全一样。

如果加载 A-Frame 失败了——比如 CDN 被屏蔽、没有网络连接——这个视图依然会显示一条简短的错误信息，并照常显示孪生表格：这些信息从来就不曾只存在于 3D 场景之中。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| `<html lang>` 由 `startI18n()` 正确设置，并在每次切换语言时更新 | 3.1.1 | 屏幕阅读器能在每一种语言下正确地朗读页面 |
| 每个视图都有一个可见的 `<h1>`，切换视图会把焦点移动到它上面 | 2.4.3, 1.3.1 | 使用键盘和屏幕阅读器的人知道自己到了哪里 |
| 每个按钮和字段都有一个可见的标签，其无障碍名称以这个标签开头 | 2.5.3 | 「Done: CSS grid」，而不是「CSS grid: Done」 |
| 「A new version is ready」以及天气/计划器的状态变化，都放在 `role="status"` 元素中 | 4.1.3 | 会被朗读出来，而不移动焦点 |
| 只有当学习者按下**刷新**时，页面才会重新加载来更新 | 3.2.5（AAA） | 不会出现意外的上下文变化 |
| `#scene-description` 用和表格相同的数据来描述这些 3D 柱状图 | 1.1.1 | 信息绝不会只存在于 3D 场景内部 |
| 状态（已就绪、即将推出、已完成）用文字和边框来表示，而不仅是颜色 | 1.4.1 | 色盲和低视力的学习者也能看到它 |

## 性能注意事项

应用外壳（除 A-Frame 之外的一切）体积不到 150 KB，其中大部分是浏览器可以单独缓存的 JavaScript 模块。A-Frame 大约有 1.3 MB，只在 3D 按钮被按下后才被请求一次，之后就会被 Service Worker 缓存起来，因此一位只试过一次 3D 视图的学习者，从那以后就可以离线使用它。

语言文件同样是用 `import()` 逐个延迟加载的：一位从未离开过英语的学习者，永远不会下载西班牙语或中文的字符串。

## 常见错误

| 错误 | 会发生什么 | 应该怎么做 |
| --- | --- | --- |
| 在某个组件中硬编码一个英文字符串 | 它永远不会被翻译，在其他每一种语言中都是错的 | 每一个字符串都要来自 `t()` 或某个语言文件 |
| 在 `<head>` 中加载 A-Frame | 3D 时刻不再是「延迟」的了；它会阻塞首次绘制 | 只在 `loadAframe()` 中、在点击时才注入 `<script>` 标签 |
| 在首次渲染之前就注册 `"localechange"` 监听器 | 应用每次加载都会毫无意义地渲染两次 | 在 `start()` 的最末尾注册它 |
| 直接从 `main.js` 写入某个 store 的 `localStorage` 键 | 两个地方可能对已保存的状态产生分歧 | 只由 store 自身调用 `localStorage.setItem` |
| 跳过示例预报数据的回退机制 | 天气 API 被屏蔽或很慢时，视图会一片空白 | 始终回退到 `data/sample-forecast.json` |
| 把一份初稿翻译当作已经完成的翻译对待 | 学习者会自信地相信错误的西班牙语或中文内容 | 保留 `draft` 标记，并在应用和 README 中说明这一点 |

## 故障排查

**我的语言选择在重新加载后没有保留下来。** 检查 `setLocale()` 是否是带着 `save: true`（默认值）被调用的，以及 `config.js` 中的 `LANGUAGE_KEY` 是否与 `startI18n()` 读取的键名一致。

**切换语言只改变了部分文字，而不是全部。** 某个字符串被硬编码了，而不是通过 `t()` 或 `data-i18n` 来处理，或者某个组件在 `"localechange"` 时没有被重新渲染。

**3D 按钮没有任何反应。** 检查 TODO 5 的点击处理函数是否真的被绑定了——一个常见的错误是正确地写出了 `renderThreeDGate()`，却只调用了它一次，而且是在课程目录加载出任何数据行之前。

**A-Frame 在我按下按钮之前就立刻加载了。** 在 `main.js` 和 `index.html` 中搜索一个字面写死的 `<script src="…aframe…">`：它只应该在 `loadAframe()` 内部被创建。

**更新横幅从不出现。** 你很可能在测试课程 2.6 时，在 Application 面板中留下了勾选状态的 **Update on reload**；取消勾选它，修改 `sw.js` 的 `VERSION`，重新加载两次。

**报错 `Failed to register a ServiceWorker`。** 这个页面不是一个安全上下文：使用 `localhost` 或 `127.0.0.1`，而不是一个原始 IP 地址，也不是双击打开的文件。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)**：给三个语言文件都添加一个应用目前还没有显示出来的第四个字符串，并证明它能够实时更新。
2. **[创意](challenges/challenge-2.zh-Hans.md)**：让 My XR Camp 成为你自己的：你自己的图标、第四个视图，或者一种目前三份初稿都还没有覆盖的语言。
3. **[探索](challenges/challenge-3.zh-Hans.md)**：为同一份进度数据添加第二种 3D 编码方式（颜色，或者第二个坐标轴），同时不向 `#scene-description` 添加任何一条新的事实信息。

## 提交作业

1. 完成 [`tests/checklist.md`](tests/checklist.md) 中的每一项，包括其中「3D 和 XR（手动）」部分。
2. 对照 [`starter/rubric.md`](starter/rubric.md) 的每一行检查你的项目。
3. 截图内容包括：仪表盘在你三种语言下的样子、3D 视图、Service Worker 已激活的 Application 面板，以及已安装的应用（如果你的浏览器完全无法安装，就截取书面的安装步骤）。
4. 把它们保存在你的学习日志和作品集中。也可以和其他开发者分享：参见[在哪里分享你的作品和寻求帮助](../../docs/en/community.md)（英文）。
5. 在你的学习日志中回答：如果只能发布五个视图中的一个，你会保留哪一个，为什么？

## 延伸阅读

- [MDN: Internationalization](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)（英文）
- [MDN: Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules)（英文）
- [MDN: Progressive web apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)（英文）
- [W3C: Web App Manifest](https://www.w3.org/TR/appmanifest/)（英文）
- [Semantic Versioning](https://semver.org/)（英文）
- [A-Frame documentation](https://aframe.io/docs/1.8.0/introduction/)（英文）

## 值得认识的女性

**张文利（Wenli Zhang）**，网名 **Ovilia**，是一位来自中国上海的数据可视化开发者。她撰写了《Three.js 入门指南》，一份面向初学者的免费中文 three.js 指南，最初发表在图灵社区，并于 2014 年 12 月起免费开放阅读，其全部示例代码都发布在了 GitHub 上。后来，她成为了 Apache ECharts（百度开源的图表库）的全职维护者，并位列该项目的项目管理委员会（Project Management Committee）成员名单之中。

你刚刚构建的这个 3D 柱状图，正是她多年从事的图表可视化工作的一个小小近亲：把数字变成人们在浏览器中一眼就能读懂的形状，而且完全免费。她的这份指南，也曾为一代学习 three.js（XR Camp 的 Web3D 课程正是建立在这个库之上）的中文开发者做了同样的事。

> **编者注：发布前请核实。** 「值得认识的女性」中的人物信息必须以一手资料核实，并在可行时于课程上线前与本人确认。参见 [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md)。

## 标准聚焦

这个应用中的数字、日期和百分比格式化都使用了 `Intl`，它被标准化为 **ECMA-402**，与核心 JavaScript 语言本身（**ECMA-262**）一样，都来自 Ecma International 的 TC39 委员会。这份清单文件遵循的是 W3C 的 **Web Application Manifest** 规范，一份仅仅在名字上和它相似的社区规范：语义化版本号——本项目 `1.0.0` 所遵循的 `MAJOR.MINOR.PATCH` 体系——记录在 [semver.org](https://semver.org/) 上，由一个开放的社区规范维护，而不是像 W3C 或 Ecma 那样的标准组织。三份规范，三种治理方式——一个标准组织、一个工作组，以及一个社区项目——而这一个小小的应用，同时依赖着这三者。

## 许可协议

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
