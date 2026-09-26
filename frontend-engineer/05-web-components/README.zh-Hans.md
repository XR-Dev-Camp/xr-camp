# Web Components

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程：** `frontend-engineer` · **课时：** `web-components-05` · **时长：** 约 10 小时 · 14 次学习，每次 45 分钟 · 每周 4 次，约 4 周

---

> 构建一个可复用的 XR Camp 课时卡片或项目查看器组件。

---

## 学习目标

完成本项目后，你将能够：

1. 解释什么是 **Web Components**：用浏览器的标准功能构建、不依赖任何框架的自定义 HTML 元素。
2. 用一个类和 `customElements.define()` 定义一个**自定义元素（custom element）**，并使用它的**生命周期回调**：`constructor`、`connectedCallback` 和 `attributeChangedCallback`。
3. 用 **shadow DOM** 和 `<template>` 给一个元素赋予私有的结构和样式，并用**插槽（slot）**让页面把自己的内容放进去。
4. 从元素内部（`:host`、`::slotted()`、自定义属性）和外部（`::part()`）为组件设置样式。
5. 用**自定义事件（custom event）**把信息发送到组件外部，并解释 `bubbles` 和 `composed`。
6. 让组件在跨越 **shadow 边界** 时依然保持无障碍：真正的按钮、紧挨着控件的标签，以及一个页面可以自行选择的标题级别。
7. 用 `:not(:defined)` 实现**渐进增强**，让内容在元素就绪之前就能显示出来。
8. 编写**文档**，让别人能够使用你的组件：属性、插槽、事件和 part。

## 先决条件

- **课程 2.2：DOM 与动态界面**（构建元素、事件与冒泡、实时区域）。本课使用相同的 `data/catalog.json`。
- **课程 2.3：应用架构**（单一职责的模块、渐进增强）。
- **课程 2.4：API、JSON 与异步应用**会有帮助：页面用 `fetch` 和 `await` 加载课程目录。加载相关的代码已经为你写好。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| 一个现代浏览器，带开发者工具 | Elements 面板（Firefox 中叫 Inspector）能显示 shadow root，并允许你实时修改属性 | 免费 |
| VS Code 和本地服务器 | 模块和 `fetch` 需要 `http://` | 免费 |
| 一个屏幕阅读器 | 测试名称、状态和朗读内容 | 免费 |

本课的一切都能离线运行，除了 3D 时刻中的 A-Frame，它是从 `aframe.io` 加载的。如果这个地址在你所在的地区较慢或被屏蔽（比如在中国大陆），可以试试仓库 `versions.json` 中列出的 jsDelivr 地址，或者下载一次 `aframe.min.js`，把它保存在页面旁边，再修改 `src`。

## 你将构建什么

**My XR Camp** 的第五部分：一个**课时卡片**，你可以在任何地方使用它，就像使用 `<button>` 一样简单：

```html
<lesson-card lesson-title="Web Components" minutes="600" status="ready" heading-level="3">
  <p slot="description">Build your own HTML elements.</p>
</lesson-card>
```

这张卡片显示标题、以小时和课时数表示的时长、用文字表示的状态，以及你的描述。它的**完成（Done）**按钮会在被按下时通过一个叫 `lesson-toggle` 的事件通知页面。之后，你会用这张卡片来展示课程 2.2 的课程目录中的每一节课，并把完成情况保存在与课程 2.2 仪表盘相同的地方。

在 3D 时刻中，你会构建第二个元素 `<model-stage>`：一个小型 3D 查看器，带有暂停和旋转按钮，以及一个用于描述的插槽。

参考答案在 [`completed/`](completed/) 中。起始代码包含页面、数据，以及十四个 TODO。

## 文件夹说明

```text
05-web-components/
├── README.md            # 本指南（英文）
├── README.es.md         # 西班牙语
├── README.zh-Hans.md    # 简体中文
├── project.json         # 课时元数据
├── starter/
│   ├── index.html       # 课时卡片页面：TODO 1
│   ├── js/lesson-card.js  # 你的自定义元素：TODO 2–8
│   ├── styles.css       # 已完成，除了 TODO 9
│   ├── js/main.js       # 加载课程目录（已完成）：TODO 10–11
│   ├── js/data.js, js/format.js, js/progress.js   # 已完成
│   ├── data/catalog.json  # 与课程 2.2 相同的数据
│   ├── components.md    # 文档：TODO 12
│   ├── 3d-moment.html   # 3D 查看器页面（已完成）
│   └── js/model-stage.js  # 3D 查看器元素：TODO 13–14
├── completed/           # 参考答案：最后再打开
├── challenges/          # 三个拓展挑战：基础挑战为必做
├── tests/checklist.md   # 提交前的自查清单
├── assets/
└── screenshots/
```

## 环境配置

1. 在你的 `my-xr-camp` 文件夹旁新建一个 `lesson-cards` 文件夹，把起始代码复制进去。把它变成一个 Git 仓库，并提交未经改动的起始代码。
2. 启动本地服务器，打开 `index.html`，同时打开 **Elements** 面板和**控制台（Console）**。
3. 如果你为课程 2.2 的仪表盘使用同一个服务器和地址，这两个页面就会共享你的进度：在一个页面上标记为完成的课时，在另一个页面上也会显示为完成。

## 分步讲解

### 规划你的学习节奏

| 节次 | 你要做的事 | 完成后你将拥有 |
| --- | --- | --- |
| 1 | 环境配置；第 1 步：一个浏览器不认识的元素（TODO 1） | 你的卡片出现在 HTML 中，以纯文本形式显示 |
| 2 | 第 2 步：定义它（TODO 2） | 浏览器认识 `<lesson-card>` 了 |
| 3 | 第 3 步：模板、shadow root 和插槽（TODO 3–4） | 你的段落出现在卡片的结构内部 |
| 4 | 第 4 步：shadow 内部的样式（TODO 5） | 一张带有 XR Camp 配色的卡片 |
| 5 | 第 5 步：属性（TODO 6） | 从属性中读取标题、时长和状态 |
| 6 | 第 5 步（续）：标题级别（TODO 7） | 在 Elements 面板中修改属性即可更新卡片 |
| 7 | 第 6 步：真正的按钮与自定义事件（TODO 8） | 控制台中出现 `lesson-toggle` |
| 8 | 第 7 步：从外部设置样式，以及未定义时的样式（TODO 9） | 一个可主题化的徽章，以及一张即使没有 JavaScript 也能正常阅读的卡片 |
| 9 | 第 8 步：从课程目录生成卡片（TODO 10–11） | 第 2 阶段的每节课都变成一张卡片；完成状态会被保存并朗读 |
| 10 | 第 9 步：测试跨 shadow 边界的无障碍性 | 一张支持键盘和屏幕阅读器的卡片 |
| 11 | 第 10 步：为它编写文档（TODO 12） | 经过实际操作验证过的 `components.md` |
| 12 | **3D 时刻**（TODO 13–14） | 一个包裹在你自己元素中的 3D 查看器 |
| 13 | [`tests/checklist.md`](tests/checklist.md) | 一张完成的课时卡片 |
| 14 | 一个拓展挑战，然后是**提交作业** | My XR Camp 的第五部分 |

### 第 1 步：一个浏览器不认识的元素（TODO 1）

在 `index.html` 中，直接在 HTML 里写下你的第一张卡片（TODO 1 中展示了怎么写）。然后重新加载页面。

浏览器目前还不认识 `<lesson-card>`，但它并不会报错：一个名字里带连字符的未知元素会被当作普通元素处理，有点像 `<span>`，里面的段落会以普通文本的形式显示。看看 Elements 面板：这个标签就在那里，带着它的属性。

这正是 Web Components 的第一个优点。你的内容从一开始就存在于 HTML 中。JavaScript 会改进它，但不会创造它。

### 第 2 步：定义它（TODO 2）

**自定义元素**是一个继承自 `HTMLElement` 的类，并注册在某个名字之下：

```js
export class LessonCard extends HTMLElement { }
customElements.define('lesson-card', LessonCard);
```

这个名字**必须包含一个连字符**。内置元素永远不会有连字符，因此你的元素永远不会和未来可能出现的 HTML 内置元素 `<card>` 冲突。在控制台中输入 `customElements.get('lesson-card')`：它会返回你的类。页面上的每个 `<lesson-card>` 现在都被「升级」成了这个类的实例。

**Web Components** 不是单一的功能：它是多个协同工作的标准功能的统称。本课会用到其中三个：自定义元素、shadow DOM，以及 `<template>` 元素。

### 第 3 步：模板、shadow root 和插槽（TODO 3–4）

`<template>` 保存的是不会显示、也不会运行的 HTML。你会为每张卡片复制一份它的内容。TODO 3 要编写卡片的结构：一个 `<article>`、一个标题、一行显示时长的文字、一个徽章、两个插槽和一个按钮。

然后，在构造函数中（TODO 4），你要给元素一个 **shadow root**，并把复制出来的内容放进去：

```js
const root = this.attachShadow({ mode: 'open' });
root.append(template.content.cloneNode(true));
```

**shadow DOM** 是附加在你的元素上的一棵小型、私有的 DOM 树。页面的 CSS 无法进入其中，`document.querySelector` 也找不到它里面的东西。页面中的内容——也就是你在第 1 步中写的那些段落——被称为**light DOM**。它们仍然留在原来的位置。

**插槽（slot）**是 shadow DOM 中的一个「洞」，用来显示 light DOM 的内容：

- `<slot name="description">` 会显示带有 `slot="description"` 的子元素。
- 没有名字的 `<slot>`（**默认插槽**）会显示其他所有子元素。
- 写在 `<slot>` 内部的内容是它的**后备内容（fallback）**：只有当没有任何内容被分配到这个插槽时，「No description yet.」才会显示。

重新加载页面。你的段落现在出现在卡片的结构内部了。在 Elements 面板中，展开 `#shadow-root (open)`，找到这些插槽。

### 第 4 步：shadow 内部的样式（TODO 5）

shadow root 内部的 `<style>` 只会作用于这个 shadow root。没有任何东西会渗入进来，也没有任何东西会渗出去：你的 `.badge` 类不会和页面上的 `.badge` 冲突。

有三点比较特殊：

- **`:host`** 指的是从内部看到的元素本身。`:host([done])` 会在卡片带有 `done` 属性时匹配。
- **自定义属性可以跨越边界。** 它们会被继承，就像 `color` 和 `font-family` 一样。因此，卡片内部的 `var(--color-primary, #5b2a86)` 会使用页面的紫色，而在一个没有 XR Camp 令牌的页面上，则会回退到同样的颜色。
- **普通的页面规则则不会。** 页面上的 `button { … }` 和 `:focus-visible { … }` 规则会在边界处停下，所以卡片必须为自己的按钮和焦点轮廓设置样式。

`::slotted(p)` 可以给插槽中来自页面的段落设置一点样式，但仅限于一点点：页面自身的样式仍然适用于它们，因为它们本质上仍然在页面里。

### 第 5 步：属性（TODO 6–7）

属性是 HTML 配置一个元素的方式。列出你关心的属性，浏览器会在其中任何一个发生变化时通知你：

```js
static observedAttributes = ['lesson-title', 'minutes', 'status', 'done', 'heading-level'];

attributeChangedCallback() {
  this.#render();
}
```

`#render()` 读取属性，并把文本放进 shadow DOM 中，始终使用 `textContent`。它会在卡片被添加到页面时运行（`connectedCallback`），也会在每次变化后运行。试试看：在 Elements 面板中，双击 `status="coming-soon"`，把它改成 `ready`。徽章会立即变化。或者在控制台中：

```js
document.querySelector('lesson-card').setAttribute('minutes', '90');
```

为什么用 `lesson-title` 而不是 `title`？`title` 是一个**全局属性**：在任何元素上，它都会显示一个提示气泡，屏幕阅读器也能读取它。不要把内置属性的名字挪来表示你自己的含义。

**标题级别（TODO 7）。** 标题必须符合页面的结构层级（WCAG 1.3.1），但卡片无法知道它会被用在哪里：如果在 `<h2>` 下面，它的标题应该是 `<h3>`；如果在侧边栏的 `<h3>` 下面，则应该是 `<h4>`。所以由页面通过 `heading-level="3"` 来做决定，`#render()` 会在这个值变化时替换成正确的元素。

### 第 6 步：真正的按钮与自定义事件（TODO 8）

卡片的按钮是一个真正的 `<button>`：可以用 Tab 键到达，用回车键或空格键按下，而且因为有 `aria-pressed`，屏幕阅读器能说出它是否处于按下状态。永远不要用一个可点击的 `<div>` 来充当按钮。

按下按钮后，卡片会切换自己的 `done` 属性，然后用一个**自定义事件**通知页面：

```js
this.#button.dispatchEvent(new CustomEvent('lesson-toggle', {
  bubbles: true,
  composed: true,
  detail: { lessonId, title, done },
}));
```

- `bubbles: true` 让它能沿着父元素一路向上传播，这样一个监听器就能听到每一张卡片的事件（事件委托，来自课程 2.2）。
- `composed: true` 让它能够穿出 shadow root。试试把它改成 `composed: false`：页面会什么都听不到。
- `detail` 携带了具体的数据。

在卡片外部，`event.target` 是 `<lesson-card>`，而不是那个按钮。浏览器会**重新指向（retarget）**离开 shadow root 的事件，这样页面就永远看不到卡片内部的私有构造。

`done` 也是一个反映属性状态的**属性（property）**：`card.done = true` 会添加 `done` 属性，而 `card.done` 则会读取它。从代码中设置它并不会触发事件；只有学习者的操作才会触发。这样一来，页面就不会意外地「听到」自己造成的变化。

### 第 7 步：从外部设置样式，以及未定义时的样式（TODO 9）

**Part。** 卡片通过给某些部分添加 `part` 属性，来决定页面可以给哪些部分设置样式。页面用 `::part()` 来给它们设置样式：

```css
lesson-card::part(badge) { text-transform: uppercase; }
```

试试 `lesson-card article { … }`：什么都不会发生。只有 part 是公开的。这是对使用你的卡片的人的一种承诺：你以后可以改动其他任何部分，而不会破坏他们的页面。

**渐进增强。** 在 `customElements.define()` 运行之前，这个元素处于**未定义**状态，`:not(:defined)` 会匹配到它。在网速快的情况下，这个状态持续的时间很短；网速慢时会持续很久；如果脚本出错，甚至会永远处于这个状态。把它当作一张普通卡片来设置样式，并从属性中显示它的标题：

```css
lesson-card:not(:defined)::before { content: attr(lesson-title); font-weight: 700; }
```

把 `<script>` 标签注释掉，重新加载页面：卡片依然有它的标题和描述。没有完成按钮，这是没问题的：它是一种增强，而不是内容本身。

### 第 8 步：从课程目录生成卡片（TODO 10–11）

`main.js` 已经加载了 `data/catalog.json`，并填充了**阶段**列表。TODO 10 要为每节课生成一张卡片，写法和你在 HTML 中手写的完全一样：

```js
const card = document.createElement('lesson-card');
card.setAttribute('lesson-title', lesson.title);
card.setAttribute('minutes', lesson.minutes);
```

注意 `main.js` **没有**做的事：它从不接触 `card.shadowRoot`。它设置属性、添加子元素、监听事件——和你使用任何内置元素时做的事完全一样。这正是让这张卡片可以被复用的原因。

TODO 11 在 `<main>` 上添加了**一个**针对 `lesson-toggle` 的监听器。它能听到你在 HTML 中写的那张卡片的事件，也能听到之后添加的每一张卡片的事件。它用 `setDone()` 保存变化，并在实时区域中朗读它：「Marked as done: Modern JavaScript.」。

`progress.js` 使用了和课程 2.2 仪表盘相同的键名 `my-xr-camp-progress`，也是相同的数据结构，并且保留了仪表盘的目标数据。比单个页面活得更久的数据，也是一种承诺。

### 第 9 步：测试跨 shadow 边界的无障碍性

shadow DOM 改变了一件重要的事：**id 无法跨越这个边界**。卡片内部的 `aria-labelledby`、`aria-describedby` 和 `<label for>` 无法指向页面上的元素，页面也无法指向卡片内部。因此：

- **把标签和控件放在一起。** 按钮的名称是在卡片内部设置的：`aria-label="Done: Modern JavaScript"`。十张卡片不会让十个按钮都只叫「Done」，而且可见的文字放在最前面，这样使用语音输入的人就可以说「click Done」（WCAG 2.5.3）。
- **在 shadow root 内部使用真正的元素**：`<article>`、一个真正的标题、一个真正的 `<button>`。屏幕阅读器会把 shadow DOM 和插槽内容当作同一个页面一起朗读。
- **朗读的职责属于页面。** 卡片负责触发事件；页面里唯一的实时区域负责朗读。

测试一下：用 Tab 键依次访问每张卡片；按回车键和空格键；重新加载页面，检查「完成」状态是否被记住了。在浏览器开发者工具的无障碍树中，检查每张卡片的标题级别，以及每个按钮的名称和按下状态。然后用屏幕阅读器试一试，听听标题列表。

### 第 10 步：为它编写文档（TODO 12）

一个别人搞不懂怎么用的组件是无法复用的。为一个从未见过你代码的人编写 `components.md`：先给一个简短的示例，然后分别为**属性**、**属性（property）**、**插槽**、**事件**和 **part** 各列一张表，接着说明它使用的自定义属性，以及页面在无障碍方面需要做些什么。`<model-stage>` 那一节已经写好了，可以作为范例。

用唯一有意义的方式来测试它：在一个全新的空白页面上，一字不差地照着它做一遍。凡是你不得不去看代码才能搞明白的地方，就说明文档里缺了点什么。

## 关键代码解析

**`#heading`、`#render()`。** `#` 让一个字段或方法成为**私有的**：类外部的代码无法读取或调用它。页面只能使用你选择公开的部分：属性、`done`、`lessonTitle`、事件，以及各个 part。

**`static observedAttributes`。** 浏览器只会在你定义元素时读取这个值一次。不在这个列表中的属性永远不会触发 `attributeChangedCallback`。

**`template.content.cloneNode(true)`。** 模板的内容是一个文档片段（document fragment）。`cloneNode(true)` 会做一次深拷贝，这样每张卡片都能得到属于自己的一份。

**`attachShadow({ mode: 'open' })`。** open 意味着页面代码可以通过 `card.shadowRoot` 进入其中，这对测试很有用。这是一种针对样式和结构的封装，而不是一种安全机制。

**`if (!customElements.get('lesson-card'))`。** 用同一个名字定义两次会抛出错误。这个检查让这个模块可以安全地被多个文件导入。

**`main.js` 顶部的 `import './lesson-card.js'`**，不带任何名字：它会执行这个模块，从而在下面的任何代码设置 `card.done` 之前，先定义好这个元素。如果你在一个元素被定义之前就给它设置了一个属性（property），那个值之后会遮盖住这个类的 `done` setter。

## 3D 时刻

打开 [`completed/3d-moment.html`](completed/3d-moment.html)。整个查看器只有一个标签：

```html
<model-stage shape="torus" color="#5b2a86" label="3D view: a purple ring">
  <p slot="description" id="scene-description">A purple ring, like a thick bracelet, …</p>
</model-stage>
```

`<model-stage>` 根据它的 `shape` 和 `color` 属性构建出一个 A-Frame 场景（不需要模型文件：使用的是 A-Frame 的基础几何体），添加了**暂停动画（Pause animation）**、**向左转（Turn left）**和**向右转（Turn right）**按钮，并把你的描述段落保留下来作为场景的文字替代内容。在 Elements 面板中修改 `shape`，模型就会通过 `attributeChangedCallback` 发生变化，和卡片的原理完全一样。

但这个元素**没有 shadow root**，这是刻意的设计。A-Frame 希望它的场景是主文档的一部分：它会把自己的样式添加到页面的 `<head>` 中，而且它的部分功能是用 `document.querySelector()` 来查找元素的，这种方式看不到 shadow root 内部。放在 shadow root 内部的场景，可能无法正确渲染或调整大小。所以 `<model-stage>` 把它的按钮和场景构建为普通的子元素，放在 light DOM 中，并在 `model-stage.js` 顶部的注释里说明了原因。

没有了 shadow root，`<slot>` 也就不起作用了，所以这个元素用另一种方式实现同样的思路：它会找到带有 `slot="description"` 的子元素，并把它留在你写的位置上。而且因为一切都在同一个文档中，场景**可以**指向它：`role="img"`、来自 `label` 的名称，以及 `aria-describedby="scene-description"`（TODO 13）。选择不使用 shadow root 是一个真实的决定，你以后还会遇到：当某个库需要主文档时，就顺应它工作。

TODO 14 负责连接这些按钮。如果设备要求减少动态效果，查看器会以暂停状态启动；如果这个设置在页面打开期间被打开，查看器也会暂停。向左转和向右转会把模型旋转 15 度，并朗读新的角度：这为原本需要用鼠标拖拽才能完成的操作提供了一条键盘操作路径。摄像机永远不会移动。

这段描述是你自己写的，不是自动生成的，所以要保持它的真实性：如果你改变了形状，也要相应地改变文字。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| 卡片的标题是一个真正的标题元素，级别由页面选择 | 1.3.1, 2.4.6 | 标题构成了页面的结构层级，使用屏幕阅读器的人依靠它们来移动。 |
| 「完成」是一个真正的 `<button>`，带有 `aria-pressed` | 2.1.1, 4.1.2 | 它支持键盘操作，其状态也会被朗读出来。 |
| 每个按钮的名称都包含对应的课时：「Done: Web Components」 | 2.4.6, 4.1.2 | 十张卡片不会让十个按钮都用同一个名字。 |
| 每个按钮的名称以可见的文字开头 | 2.5.3 | 使用语音输入的人可以说「click Done」。 |
| 状态用文字和边框表示，而不仅是颜色 | 1.4.1 | 颜色不是区分「已就绪」和「即将推出」的唯一方式。 |
| 焦点在卡片内部可见 | 2.4.7 | 页面的焦点样式无法跨越 shadow 边界，所以卡片有自己的一套。 |
| 变化由页面的实时区域朗读 | 4.1.3 | 「Marked as done: Web Components.」 |
| 3D 场景有文字描述，并且可以暂停 | 1.1.1, 2.2.2 | 文字承载了画面所展示的一切信息；动效绝不会被强加给任何人。 |
| 3D 模型可以用按钮旋转 | 2.1.1 | 每一种 3D 交互都有一条键盘操作路径。 |

## 性能注意事项

每张卡片都克隆同一个模板，这比从字符串构建每一张卡片要快，而且浏览器通常能够在每一份克隆中复用同一份已解析的 `<style>` 样式。（如果要确保共享同一份样式表，可以使用 `adoptedStyleSheets` 构建一个可构造样式表。）`#render()` 只会修改少数几个 `textContent` 值，所以在每次属性变化后重新渲染的成本很低。

自定义元素不需要任何框架：`lesson-card.js` 只有几千字节，而浏览器本身就已经知道如何运行它。

A-Frame 的 `tick` 每一帧只运行一次，并且只在场景运行时才运行。当查看器暂停时，`stage-turn` 会立即返回，模型也会停止旋转。

## 常见错误

| 错误 | 会发生什么 | 应该怎么做 |
| --- | --- | --- |
| 名字里没有连字符：`customElements.define('lessoncard', …)` | 报错：「not a valid custom element name」 | 始终包含一个连字符 |
| 在 `constructor` 中添加属性或子元素 | 用 `createElement` 创建元素时会报错 | 在构造函数中构建 shadow root；在 `connectedCallback` 和 `attributeChangedCallback` 中读取属性 |
| 忘记写 `observedAttributes` | 修改属性没有任何反应 | 列出你要响应的每一个属性 |
| 把 `title` 用作自己的属性 | 整张卡片上方会出现一个提示气泡 | 使用自己的名字：`lesson-title` |
| 从 shadow root 内部触发事件却没有 `composed: true` | 页面永远听不到这个事件 | 用 `bubbles: true, composed: true`（或者直接在元素本身上触发） |
| `aria-labelledby` 跨越 shadow 边界指向别处 | 标签被忽略：按钮得到一个不同的名称（只有它自己的文字），或者根本没有名称 | 把标签和控件放在一起，都留在内部 |
| 指望页面的 CSS 能给内部设置样式 | 什么都不会改变 | 用自定义属性传进去，用 `::part()` 从外部设置样式 |
| 用带点击监听器的 `<div>` 充当按钮 | 没有键盘支持，没有角色，没有状态 | 使用真正的 `<button>` |
| 把 A-Frame 场景放进 shadow root 里 | 场景可能无法正确渲染或调整大小 | 把它构建在 light DOM 中 |

## 故障排查

**卡片只显示我的段落，以纯文本形式。** 这个元素还没有被定义。去控制台里找第一个错误，检查 `main.js` 是否导入了 `./lesson-card.js`。

**报错说名字「lesson-card」已经被使用过（Chrome）或已经被定义过（Firefox）。** 这个元素被定义了两次。使用 `customElements.get()` 做检查。

**报错中包含 `The result must not have attributes`（Chrome 和 Edge；Safari 会说 `must not have attributes`）。** 你的构造函数给元素本身添加了一个属性或一个子元素。把这部分工作移到 `connectedCallback` 中。

**标题始终不显示。** 属性名必须完全一致：是 `lesson-title`，不是 `lessonTitle`。

**修改属性后卡片没有更新。** `observedAttributes` 必须是 `static` 的，并且必须包含该属性。

**我的描述显示了两次，或者根本不显示。** 检查拼写：段落上是 `slot="description"`，模板中是 `<slot name="description">`。

**页面听不到 `lesson-toggle`。** 检查是否有 `bubbles: true` 和 `composed: true`，以及你监听的名字是否正好是 `lesson-toggle`。

**「完成」状态没有被记住。** 检查每张卡片是否都有 `lesson-id`，以及你使用的是本地服务器（`http://`），而不是直接打开的文件。

**3D 场景是空的。** A-Frame 必须在 `model-stage.js` 之前加载。把 A-Frame 的 `<script>` 标签放在这个模块之上。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)**：给卡片添加一个新属性和一个新 part，并更新文档。
2. **[创意](challenges/challenge-2.zh-Hans.md)**：为你的社区中的某样事物制作一张卡片，用你自己的语言来撰写卡片上的文字。
3. **[探索](challenges/challenge-3.zh-Hans.md)**：使用声明式 shadow DOM，在完全不用 JavaScript 的情况下渲染一张卡片。

## 提交作业

1. 完成 [`tests/checklist.md`](tests/checklist.md) 中的每一项。
2. 为你的课时卡片截图，再截一张 3D 查看器的截图。
3. 把它们和你的 `components.md` 保存在你的学习日志和作品集中。也可以和其他开发者分享：参见[在哪里分享你的作品和寻求帮助](../../docs/en/community.md)（英文）。
4. 在你的学习日志中回答：卡片的哪一部分是公开的，哪一部分是私有的？这种区别对使用它的人来说为什么重要？

## 延伸阅读

- [MDN: Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)（英文）
- [MDN: Using custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)（英文）
- [MDN: Using shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)（英文）
- [MDN: Using templates and slots](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots)（英文）
- [MDN: ::part()](https://developer.mozilla.org/en-US/docs/Web/CSS/::part)（英文）
- [WHATWG HTML Standard: Custom elements](https://html.spec.whatwg.org/multipage/custom-elements.html)（英文）
- [A-Frame 1.8.0 documentation](https://aframe.io/docs/1.8.0/introduction/)（英文）

## 值得认识的女性

**Monica Dinculescu** 曾在 Google 担任高级工程师约八年，直到 2021 年，期间从事 Polymer、Web Components 和 Chrome 方面的工作。她在 Polymer Summit、Chrome Dev Summit 和 Google I/O 上做过许多关于构建和为 Web Components 设置样式的演讲，并在 2018 年的 Google I/O 上公布了用 Web Components 构建的 PWA Starter Kit。后来，在 Google Brain，她参与了 Magenta 项目，用机器学习创作生成式音乐和艺术。

用 `:host`、自定义属性和 part 来为组件设置样式，是本课中最难做对的事情之一，也是她演讲的主题之一。她从浏览器工程一路走到用代码创作音乐与艺术的经历，说明前端技能可以把你带到意想不到的地方。

_资料来自公开来源，于 2026 年核实。发现错误？[告诉我们](https://github.com/XR-Dev-Camp/xr-camp/issues)。_

## 标准聚焦

**Web Components** 是一个统称，而不是单一规范。自定义元素、`<template>` 和 `<slot>` 定义在 WHATWG 的 **HTML Standard** 中，shadow 树、插槽分配和组合事件（composed event）则定义在 WHATWG 的 **DOM Standard** 中。`::part()` 来自 W3C 的 CSS 工作组。正因为它们是内置在每一个现代浏览器中的标准，今天你写的 `<lesson-card>` 可以在任何框架中运行，或者完全不需要框架，并且在框架发生变化时依然能继续运行。

## 许可协议

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
