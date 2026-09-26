# 文档对象模型与动态界面

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程：** `frontend-engineer` · **课时：** `the-document-object-model-and-dynamic-interfaces-02` · **时长：** 约 10 小时 · 14 次学习，每次 45 分钟 · 每周 4 次，约 4 周

---

> 创建一个无障碍的交互式学习仪表盘。

---

## 学习目标

完成本项目后，你将能够：

1. 把 DOM 描述为一棵对象树，并用 `closest`、`querySelector` 和 `children` 在其中移动。
2. 创建、修改和删除元素、属性和类。
3. 解释事件如何冒泡，并用一个监听器处理多个元素（事件委托）。
4. 把应用的状态集中保存在一处，并在状态变化时更新页面。
5. 只更新发生变化的部分，这样键盘焦点和屏幕阅读器就不会受到干扰。
6. 在添加或移除内容时，有意识地移动焦点。
7. 用实时区域（live region）朗读变化。

## 先决条件

- **课程 2.1：现代 JavaScript。** 你用模块构建了课程地图。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| 一个现代浏览器，带开发者工具 | Elements 面板（Firefox 中叫 Inspector）实时显示 DOM | 免费 |
| VS Code 和本地服务器 | 模块需要 `http://` | 免费 |
| 一个屏幕阅读器 | 测试焦点和朗读内容 | 免费 |

## 你将构建什么

**My XR Camp** 的第二部分：一个**学习仪表盘**。完成一节课就勾选它，并查看你在每个阶段以及整体上的进度。**Next up（下一步）**卡片会显示下一节已就绪的课程。**My goals（我的目标）**列表可以让你添加和删除自己的学习目标。所有内容都保存在这个浏览器里，并且全部支持键盘和屏幕阅读器操作。

参考答案在 [`completed/`](completed/) 中。起始代码已完成页面、样式、数据和 `state.js`；`dashboard.js` 和 `main.js` 中有十个 TODO。`dashboard.js` 中的每个函数一开始都只是一个占位符，所以在你完成之前页面依然能运行：当你做到对应的 TODO 时，把占位符替换成你真正的函数。

## 文件夹说明

```text
02-the-document-object-model-and-dynamic-interfaces/
├── README.md            # 本指南（英文）
├── README.es.md         # 西班牙语
├── README.zh-Hans.md    # 简体中文
├── project.json         # 课时元数据
├── starter/
│   ├── index.html, styles.css, data/catalog.json   # 已完成
│   ├── js/format.js, js/data.js    # 来自课程 2.1
│   ├── js/state.js      # 进度和目标，保存在浏览器中（已完成）
│   ├── js/dashboard.js  # 构建和更新元素：TODO 3–6 和 8
│   ├── js/main.js       # 事件和焦点：TODO 1–2, 7, 9–10
│   └── 3d-moment.html   # 本课的 3D 时刻
├── completed/           # 参考答案：最后再打开
├── challenges/          # 三个拓展挑战：基础挑战为必做
├── tests/checklist.md   # 提交前的自查清单
├── assets/
└── screenshots/
```

## 环境配置

1. 把起始代码中的文件复制到你在课程 2.1 中创建的 `my-xr-camp` 文件夹中。新增的文件是 `js/state.js`、`js/dashboard.js`，以及新的 `index.html` 和 `styles.css`。
2. 启动你的本地服务器，打开页面，同时打开 **Elements** 面板（Firefox 中叫 **Inspector**）和**控制台（Console）**。

## 分步讲解

### 规划你的学习节奏

| 节次 | 你要做的事 | 完成后你将拥有 |
| --- | --- | --- |
| 1 | 环境配置；第 1 步：DOM 树（TODO 1–2） | 能在树中找到任意元素 |
| 2 | 第 2 步：状态（阅读 `state.js`） | 能解释进度保存在哪里 |
| 3 | 第 3 步：构建元素（TODO 3） | 页面上的每个阶段 |
| 4 | 第 3 步（续）（TODO 4–5） | 整体进度和 Next up |
| 5 | 第 4 步：事件与冒泡 | 能解释事件委托 |
| 6 | 第 4 步（续）（TODO 7） | 勾选被保存；整体进度和 Next up 会更新 |
| 7 | 第 5 步：只更新变化的部分（TODO 6） | 每个阶段的进度条也会更新，焦点仍留在复选框上 |
| 8 | 第 6 步：实时区域 | 每次变化都会被朗读 |
| 9 | 第 7 步：动态表单（TODO 8–9） | 添加目标 |
| 10 | 第 8 步：焦点管理（TODO 10） | 删除目标，焦点落在正确的位置 |
| 11 | 第 9 步：用键盘和屏幕阅读器测试 | 一个经过测试的仪表盘 |
| 12 | **3D 时刻** | 一个 3D 场景的控制面板 |
| 13 | [`tests/checklist.md`](tests/checklist.md) | 一个完成的仪表盘 |
| 14 | 一个拓展挑战，然后是**提交作业** | My XR Camp 的第二部分 |

### 第 1 步：DOM 树（TODO 1–2）

当浏览器读取你的 HTML 时，会构建**文档对象模型（Document Object Model）**：一棵对象树，每个元素、每个属性、每段文字都对应一个对象。JavaScript 从不直接修改你的 HTML 文件；它修改的是这棵树，浏览器再重新绘制页面。

在 Elements 面板中，点击箭头展开和折叠分支。每个元素都有一个**父节点**，大多数还有**子节点**。以下是在树中移动的常用方式：

| 代码 | 作用 |
| --- | --- |
| `document.querySelector('#map')` | 找到匹配某个选择器的第一个元素 |
| `element.querySelectorAll('.lesson')` | 找到某元素内所有匹配项 |
| `element.closest('.phase')` | 找到最近的匹配某选择器的祖先元素（或元素本身） |
| `element.children`、`element.parentElement` | 直接子节点、直接父节点 |

### 第 2 步：状态

仪表盘的**状态（state）**是它需要记住的一切：哪些课时已完成，以及你的目标。它保存在一个对象中，位于 `state.js` 里——这也是唯一与 `localStorage` 通信的模块。在 `state.js` 中，`read()` 会根据已保存的数据构建出这样结构的对象：

```js
{ done: new Set(), goals: [] }
```

`Set` 是一种没有重复项、并能快速 `has` 判断的集合：非常适合回答「这节课完成了吗？」这样的问题。当状态变化时，页面必须随之改变，本课接下来的内容就是关于如何把这件事做好。

### 第 3 步：构建元素（TODO 3–5）

你已经从课程 1.6 中了解了 `createElement`、`textContent` 和 `append`。这里还需要三件事：

- **属性：** `element.setAttribute('aria-labelledby', id)`，或者像 `box.checked = true` 这样的属性赋值。
- **类：** `element.className = 'phase'`，或者 `element.classList.add('selected')`、`.remove`、`.toggle`。
- **数据属性：** `row.dataset.lessonId = lesson.id` 会变成 `data-lesson-id="…"`：用来记录某个元素属于状态中的哪一部分。

每个复选框的标签都包含对应课时的标题，因此每一个都有独一无二的名称：「Done: HTML Foundations」，而不是五十八个都叫「Done」的复选框。`<progress>` 元素用来显示每一条进度条，旁边始终附有文字形式的数值。

### 第 4 步：事件与冒泡（TODO 7）

当你勾选一个复选框时，`change` 事件从这个复选框开始，然后一路向上**冒泡**：到它所在的列表项、列表、区块、`#map`，一直到整个文档。因此，只需在 `#map` 上放一个监听器，就能听到其中每一个复选框的事件，包括之后新添加的：

```js
map.addEventListener('change', (event) => {
  const box = event.target;                    // 发生变化的元素
  if (box.type !== 'checkbox') return;
  const row = box.closest('[data-lesson-id]');
  setDone(row.dataset.lessonId, box.checked);
});
```

这就是**事件委托（event delegation）**：用一个监听器代替五十八个，并且在元素被添加或移除时依然有效。

### 第 5 步：只更新变化的部分（TODO 6）

更新页面最简单的方式是把一切都重新绘制一遍。但这样会摧毁你刚刚勾选的那个复选框，并新建一个。键盘焦点会因此丢失，使用屏幕阅读器的人也会被猛地送回页面顶部。

所以要**只更新变化的部分**：这个阶段的进度条、整体进度，以及 Next up。复选框不会被重建，焦点会精确地保留在学习者离开时的位置。

```js
section.querySelector('.progress').replaceWith(progress(done, lessons.length, label));
```

### 第 6 步：实时区域

视力正常的用户能看到进度条移动。使用屏幕阅读器的用户需要听到它。一个礼貌型的实时区域会朗读每一次变化：

```html
<p id="status" role="status" class="visually-hidden"></p>
```

`visually-hidden` 会在视觉上隐藏它，但不会对屏幕阅读器隐藏。朗读内容要简短：「HTML Foundations marked as done.」

### 第 7 步：动态表单（TODO 8–9）

添加目标的流程：阻止表单重新加载页面，检查文本不为空，把它加入状态，向列表追加**一个**新的列表项，清空输入框，并让焦点留在输入框中，以便学习者可以立即添加下一个目标。

每个目标的删除按钮都显示「Remove」字样，并带有 `aria-label="Remove goal: Finish Phase 1"`，这样使用屏幕阅读器的人就能听到将要删除的是哪个目标。

### 第 8 步：焦点管理（TODO 10）

当你删除一个目标时，原本拥有焦点的按钮消失了。这时浏览器会把焦点丢回页面顶部，使用键盘的人也会因此迷失方向。所以要有意识地移动焦点：

```js
const buttons = goalList.querySelectorAll('.remove');
const target = buttons[index] ?? buttons[index - 1] ?? goalInput;
target.focus();
```

移到下一个目标的按钮；如果被删除的是最后一个，就移到前一个；如果列表已经清空，就回到输入框。`??` 会选择第一个存在的值。

### 第 9 步：用键盘和屏幕阅读器测试

- 用 **空格键** 勾选和取消勾选课时。焦点是否留在原地？每次变化是否都被朗读？
- 用 **回车键** 添加三个目标。依次删除中间那个、最后一个、第一个。每一次焦点去了哪里？
- 重新加载页面：一切是否还在？

## 关键代码解析

**`event.target` 和 `closest`。** `target` 是事件发生的起始元素；`closest` 从它开始向上查找，直到你关心的那个元素。

**`element.replaceWith(newElement)`。** 在树中原地把一个元素替换成另一个。

**`crypto.randomUUID()`**（在 `state.js` 中）。为每个目标生成唯一 id，这样删除一个目标时绝不会误删另一个文字相同的目标。

**`??`（空值合并运算符）。** `a ?? b` 的结果是 `a`，除非 `a` 是 `null` 或 `undefined`，这时结果是 `b`。

## 3D 时刻

打开 [`starter/3d-moment.html`](starter/3d-moment.html)：一个用于 3D 场景的 2D 控制面板。添加方块、球体和圆锥；选中其中一个（它会变成金色）；删除它们。这个面板就是唯一的数据来源：一个形状数组，被绘制了两次——一次作为按钮，一次作为 3D 物体。

留意一下焦点是如何被处理的：选中之后，焦点会回到重新绘制的按钮上；删除之后，焦点会移到下一个形状，或者回到 **Add shape（添加形状）**。而场景描述会从左到右列出每一个形状，这样有关场景的信息就不会只存在于 3D 场景本身。像这样的面板，正是你在第 3、4 阶段让 3D 和 XR 场景支持键盘操作的方式。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| 每次变化后焦点都留在合理的位置 | 2.4.3 | 使用键盘和屏幕阅读器的人不会迷失方向。 |
| 每个复选框和按钮都有独一无二、含义清晰的名称 | 2.4.6, 4.1.2 | 「Done: HTML Foundations」「Remove goal: …」。 |
| 变化会被朗读 | 4.1.3 | 状态消息能传达给使用屏幕阅读器的人。 |
| 进度既用文字也用进度条来表示 | 1.1.1 | 「3 of 9 done (33%)」。文字超出了最低要求，也帮助了每一个人。 |
| 一切都支持键盘操作 | 2.1.1 | 空格键、回车键、Tab 键。 |

## 性能注意事项

只更新变化的部分，不仅对焦点更友好，速度也更快。每次勾选都重新绘制 58 节课，在笔记本电脑上很快，但在旧手机上会明显变慢；替换一条进度条则在任何设备上都是瞬间完成的。事件委托同样意味着用一个监听器代替几十个。

## 常见错误

| 错误 | 会发生什么 | 应该怎么做 |
| --- | --- | --- |
| 每次变化都重新绘制一切 | 焦点跳回页面顶部 | 只更新变化的部分 |
| 每个复选框各设一个监听器 | 元素被重新绘制时监听器丢失 | 委托给一个父元素 |
| 移除拥有焦点的元素后什么也不做 | 焦点跌落到页面本身 | 有意识地移动焦点 |
| 所有按钮都叫「Remove」 | 使用屏幕阅读器的人无法区分它们 | 用 `aria-label` 带上项目的名称 |
| 状态保存在 DOM 里（从页面反读勾选状态） | 页面和数据不一致 | 用一个状态对象；页面只负责展示它 |

## 故障排查

**报错 `does not provide an export named`**（Chrome 和 Edge 的说法；Firefox 会说 `doesn't provide an export named`，Safari 会说 `Importing binding name '…' is not found`）。`dashboard.js` 中缺少某个函数，或者没有导出它：也许你在写对应 TODO 之前就删掉了占位符。浏览器一次只会报告一个缺失的导出，而在这个错误存在期间，页面上的任何东西都不会运行。

**勾选复选框没有反应。** 检查你的监听器是否挂在 `#map` 上，以及是否检查的是 `event.target.type`，而不是 `event.type`。

**删除目标后焦点跳到了顶部。** 你删除了元素，但之后没有在别的元素上调用 `focus()`。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)**：一个「仅显示未完成课时」的筛选器，并保持焦点合理。
2. **[创意](challenges/challenge-2.zh-Hans.md)**：一个个人化的功能：给每节课添加笔记。
3. **[探索](challenges/challenge-3.zh-Hans.md)**：用「上移」和「下移」按钮重新排列目标。

## 提交作业

1. 完成 [`tests/checklist.md`](tests/checklist.md) 中的每一项。
2. 为你有一定进度的仪表盘截图，再截一张 3D 控制面板的截图。
3. 把它们保存在你的学习日志和作品集中。等 XR Camp 社区上线后，也在那里分享它们。
4. 在你的学习日志中回答：在你自己处理焦点之前，第一次删除目标时，焦点去了哪里？

## 延伸阅读

- [MDN: Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)（英文）
- [MDN: Event bubbling](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling)（英文）
- [MDN: ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions)（英文）
- [W3C: Developing a keyboard interface (ARIA Authoring Practices)](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)（英文）

## 值得认识的女性

**Ire Aderinokun** 是一位尼日利亚前端开发者，出生于拉各斯，主要靠自学成才，也是 Web 技术领域的 Google Developer Expert。在她的博客 bitsofco.de 上，她清晰地讲解 HTML、CSS 和 JavaScript 的基础知识，其中包括一篇广为人知的文章《What, exactly, is the DOM?》（DOM 到底是什么？）。她还组织了 Frontstack，一场在尼日利亚举办的前端工程大会。

DOM 让很多初学者感到困惑，因为它看起来很像你的 HTML，但其实并不是同一回事。能把这种差异讲清楚，还是免费讲清楚，正是能帮助世界各地自学开发者的那种教学。

> **编者注：发布前请核实。** 「值得认识的女性」中的人物信息必须以一手资料核实，并在可行时于课程上线前与本人确认。参见 [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md)。

## 标准聚焦

DOM 由 WHATWG 的 **DOM Standard** 定义：树结构、事件、冒泡、`querySelector` 和 `closest`。每个浏览器都实现了同一份标准，这也是为什么同一个仪表盘能在所有浏览器中运行。你用到的 ARIA 角色和属性，比如 `role="status"` 和 `aria-label`，来自 W3C 的 **WAI-ARIA** 规范。

## 许可协议

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
