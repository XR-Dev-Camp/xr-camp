# CSS 基础

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程:** `web-developer` · **课时:** `css-foundations-03` · **时长:** 约 14 小时 · 19 次学习，每次 45 分钟 · 每周 4 次，约 5 周

---

> 为 HTML 项目创建一套可复用的视觉系统。

---

## 学习目标

完成本项目后，你将能够：

1. 把一个样式表链接到网站的每一个页面，并解释为什么一个样式表比多个样式表更好。
2. 按类型、类（class）、ID、属性和状态来选择元素。
3. 解释层叠、继承和优先级（specificity），并预测哪条规则会胜出。
4. 选择符合 WCAG 对比度要求的颜色，并进行检查。
5. 用自定义属性和 `rem` 单位建立字号比例和间距比例。
6. 解释盒模型，并使用 `box-sizing: border-box`。
7. 为链接、表格和表单添加样式，同时不破坏它们的无障碍性。
8. 让键盘焦点在任何地方都清晰可见。
9. 组织好样式表，让别人也能看懂。

## 先决条件

- **课程 1.1：HTML 基础**和**课程 1.2：无障碍表单。** 你已经有了 Riverside 网站（或你自己的网站），包括一个首页和一个表单页。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| 现代浏览器及其开发者工具 | 查看和检查你的样式 | 免费 |
| 文本编辑器 | 编写 CSS | 免费 |
| [WebAIM 对比度检查器](https://webaim.org/resources/contrastchecker/) | 检查你的颜色 | 免费 |

## 你将构建什么

一个样式表 `styles.css`，为你网站的每一个页面添加样式：这就是你的**视觉系统**。它把颜色、字号和间距作为有名称的值只定义一次，然后在各处使用，这样整个网站看起来风格一致，而且只需在一个地方修改就能改变全部。

[`completed/`](completed/) 中的参考解决方案为 Riverside 网站的首页、报名页和感谢页添加了样式。

## 文件夹说明

```text
03-css-foundations/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── styles.css       # Begin here: a stylesheet with 12 TODOs
│   ├── index.html       # The Riverside home page (from Course 1.1)
│   ├── join.html        # The join page (from Course 1.2)
│   ├── thanks.html
│   ├── centre.svg       # A drawing of the centre
│   └── 3d-moment.html   # This lesson's 3D moment
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## 环境配置

1. 在你课程 1.1 和 1.2 的网站文件夹中进行。如果你愿意，也可以复制本课的 `starter` 文件夹，在那里进行。
2. 把 `starter/styles.css` 复制到你的网站文件夹中。
3. 在浏览器中打开你的首页。它仍然没有任何样式：第一步就会改变这一点。

## 分步讲解

### 规划你的学习时间

| 次数 | 学习内容 | 完成成果 |
| --- | --- | --- |
| 1 | 环境配置；第 1 步（TODO 1） | 每个页面都链接到同一个样式表 |
| 2 | 第 2 步：选择器 | 你可以选中任何元素 |
| 3 | 第 3 步：层叠与继承（TODO 2） | 添加了样式的页面主体 |
| 4 | 第 4 步：优先级 | 你可以预测哪条规则会胜出 |
| 5 | 第 5 步：颜色（TODO 4） | 用自定义属性定义的调色板 |
| 6 | 第 5 步：检查对比度 | 每一对颜色都已检查 |
| 7 | 第 6 步：排版（TODO 3 和 5） | 字号比例和字体栈 |
| 8 | 第 6 步：标题、链接、行长 | 易于阅读的文字 |
| 9 | 第 7 步：间距（TODO 6） | 间距比例 |
| 10 | 第 8 步：盒模型（TODO 7） | 居中的布局 |
| 11 | 第 9 步：边框与背景（TODO 8） | 页眉色带和导航 |
| 12 | 第 10 步：链接与焦点（TODO 9 和 12） | 处处可见的焦点 |
| 13 | 第 11 步：表格（TODO 10） | 添加了样式的开放时间表 |
| 14 | 第 12 步：表单（TODO 11） | 添加了样式的报名页 |
| 15 | 第 12 步（续） | 用键盘测试过的表单 |
| 16 | 第 13 步：组织你的样式表 | 别人也能读懂的样式表 |
| 17 | **3D 时刻** | 2D 与 3D 共用一套颜色系统 |
| 18 | [`tests/checklist.md`](tests/checklist.md)，放大到 200% | 经过测试的网站 |
| 19 | 一项拓展挑战，然后**提交作业** | 完成的视觉系统 |

### 第 1 步：所有页面共用一个样式表（TODO 1）

在每个页面的 `<head>` 中添加：

```html
<link rel="stylesheet" href="styles.css">
```

刷新页面。现在还什么都没有变，因为样式表里还没有规则。但每个页面都已经和它连接起来了：修改一个文件，整个网站都会改变。这就是 CSS 要放在单独文件中的原因。

### 第 2 步：选择器

一条 CSS 规则由**选择器**（选中哪些元素）和**声明**（要改变什么）组成：

```css
h1 {
  color: #3f1d5e;
}
```

| 选择器 | 选中的元素 | 示例 |
| --- | --- | --- |
| 类型 | 该类型的每一个元素 | `h1`、`p`、`table` |
| 类 | 带有 `class="card"` 的元素 | `.card` |
| ID | 唯一带有 `id="main"` 的那个元素 | `#main` |
| 属性 | 带有某个属性的元素 | `input[type="email"]` |
| 后代 | 位于其他元素内部的元素 | `nav a` |
| 伪类 | 处于某种状态的元素 | `a:hover`、`:focus-visible` |

打开浏览器的开发者工具（**F12**），选择 **Elements**（元素；在 Firefox 中是 **Inspector**，查看器），然后点击任意一个元素：**Styles**（样式）面板（在 Firefox 中是 **Rules**，规则）会显示作用于它的每一条规则。

### 第 3 步：层叠与继承（TODO 2）

**层叠**样式表（Cascading Style Sheets）的名字来自规则组合的方式：许多规则可以同时作用于一个元素，由浏览器决定哪一条胜出。

**继承：**有些属性，例如 `color`、`font-family` 和 `line-height`，会从一个元素传递给它内部的所有内容。在 `body` 上设置一次，整个页面都会跟着改变。

完成 TODO 2。先在每个元素上设置 `box-sizing: border-box`：你会在第 8 步中明白原因。

### 第 4 步：优先级

当两条规则为同一个元素设置同一个属性时，**优先级**更高（更具体）的选择器胜出：

- ID（`#main`）胜过类（`.card`），类又胜过类型（`p`）。
- 如果两个选择器的优先级相同，**写在后面**的那一个胜出。

```css
p { color: black; }
.note { color: purple; }   /* wins on <p class="note">: a class beats a type */
```

（注释的意思是：在 `<p class="note">` 上它会胜出，因为类胜过类型。）

尽量使用类和类型，避免在 CSS 中使用 ID：优先级非常高的规则以后很难覆盖。在开发者工具中，落败的规则会被划上删除线。

### 第 5 步：颜色与对比度（TODO 4）

在代表整个文档的 `:root` 上，把你的颜色作为**自定义属性**（也叫 CSS 变量）只定义一次：

```css
:root {
  --color-text: #1b1b1f;
  --color-bg: #fdfcf8;
  --color-primary: #5b2a86;
}

body {
  color: var(--color-text);
  background: var(--color-bg);
}
```

现在，用 [WebAIM 对比度检查器](https://webaim.org/resources/contrastchecker/) 检查每一对文字颜色和背景颜色。WCAG 2.2 要求：

- 普通文字为 **4.5:1**；
- 大号文字，以及输入框边框、焦点轮廓等人们需要看到的东西，为 **3:1**。

把每个比值写在对应颜色旁边的注释里。不达标的颜色仍然可以用于装饰，但绝不能成为看清某样东西的唯一方式。

### 第 6 步：排版（TODO 3 和 5）

- **字体栈：**一个字体列表，第一个可用的字体胜出。要包含中文系统字体（`"PingFang SC"`、`"Microsoft YaHei"`），这样中文在每台设备上都能正确显示。
- **`rem` 单位：**`1rem` 就是读者自己浏览器的字号。当人们调大文字时，以 `rem` 为单位的尺寸会随之变大；以 `px` 为单位的尺寸则不会。
- **字号比例：**每一级字号都比上一级大一个固定的倍数，这里是 1.25。标题遵循这个比例，页面看起来就是经过设计的，而不是随意的。
- **行长：**过长的行读起来很累。用 `max-width: 65ch` 把文字宽度限制在大约 65 个字符。
- **行高：**正文大约为 1.5 到 1.6。

记住课程 1.1 的内容：标题是按照**结构**来选择的，由 CSS 决定它们的大小。绝不要因为 `<h4>` 看起来小一些就选择它。

### 第 7 步：间距（TODO 6）

添加一个间距比例，从 `--space-1` 到 `--space-6`，并且在 `margin` 和 `padding` 中只使用这些值。少数几个统一的尺寸会让页面显得平静；大量随意的尺寸则会让它显得凌乱。

### 第 8 步：盒模型（TODO 7）

每个元素都是一个由四层组成的盒子：**内容**、**内边距**（padding，内部空间）、**边框**（border）和**外边距**（margin，外部空间）。对于你选中的任何元素，浏览器的开发者工具都会把它画出来。

默认情况下，`width` 只设置内容的宽度，所以加上内边距后，盒子就会比你设定的更宽。你在第 3 步中添加的 `box-sizing: border-box` 会让 `width` 把内边距和边框也包括在内。这就是几乎所有样式表都以它开头的原因。

现在把你的内容居中：在 `header`、`main` 和 `footer` 上设置 `max-width` 和 `margin: 0 auto`。

### 第 9 步：边框与背景（TODO 8）

给页眉加上背景色带和边框，并在导航列表的各项上使用 `display: inline-block`，让它排成一行。（在课程 1.4 中，你将用 flexbox 让它变成响应式的。）

让图片和视频永远不超过它们容器的宽度：`max-width: 100%; height: auto`。

### 第 10 步：链接与焦点（TODO 9 和 12）

- 保留链接的**下划线**：它们不依赖颜色，就能告诉人们什么是可以点击的。
- 让 `:visited`（已访问）链接看起来不一样。
- 让键盘**焦点**在所有元素上都清晰可见：一条粗的轮廓线，颜色对比度至少为 3:1。`:focus-visible` 会为键盘用户显示焦点，而不会在每次鼠标点击时都画出一个圈。
- 把跳转链接隐藏在屏幕之外，并在它获得焦点时让它重新出现。

**绝不要**在没有更好替代方案的情况下写 `outline: none`。它会让你的网站无法用键盘使用。

### 第 11 步：表格（TODO 10）

`border-collapse: collapse`、每个单元格都加上内边距、为 `<caption>` 添加样式，并给表头行加上背景。课程 1.1 中的 HTML 结构保持原样：CSS 只改变外观。

### 第 12 步：表单（TODO 11）

为报名页添加样式：fieldset、legend、标签、字段和按钮。让字段边框与背景的对比度至少为 3:1，把单选按钮和复选框稍微放大一些，并使用 `font: inherit`，让字段使用你的字体。然后再用键盘填写一遍表单：每个字段都必须仍然显示焦点。

### 第 13 步：组织你的样式表

按照从通用到具体的顺序组织样式表：设计变量（tokens）、基础、排版、布局、组件、状态。在每个部分上方写一段简短的注释。六个月后，你（或其他人）需要能快速找到东西。

## 关键代码解析

**`:root` 和 `var()`。** `:root` 代表整个文档；在这里定义的自定义属性在任何地方都可以使用。`var(--color-primary)` 用来使用其中一个。只要修改一次，所有用到它的地方都会改变。

**`*, *::before, *::after { box-sizing: border-box; }`。** 作用于每一个元素，包括由 CSS 添加的装饰性元素。

**`nav a[aria-current="page"]`。** 用屏幕阅读器所使用的同一个属性，选中指向当前页面的链接。两者共用同一个信息来源。

**`body > a[href="#main"]:first-child`。** 不需要添加类就能选中跳转链接：它用到了子元素组合器、属性选择器和结构伪类。如果没有 `body >`，它还会把任何作为父元素中第一个元素的「Back to top」（返回顶部）链接也隐藏起来。

## 3D 时刻

打开 [`starter/3d-moment.html`](starter/3d-moment.html)。它把一个 3D 场景嵌在你已添加样式的页面中，场景中各个形状的颜色通过几行 JavaScript（`getComputedStyle`）从你的自定义属性中读取。在 `styles.css` 中修改 `--color-primary`，刷新页面，页面**和** 3D 场景就会一起改变。

这些形状使用的设计变量是 `--color-primary`、`--color-accent` 和 `--color-primary-dark`，写在每个形状的 `data-token` 属性中。如果你的设计变量使用了不同的名称，就修改这些属性，让它们一致。

这就是视觉系统的用途：一套决策，由你构建的所有东西共用，无论是 2D 还是 3D。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| 文字对比度至少为 4.5:1 | 1.4.3 | 让低视力人群，以及在阳光下的人都能阅读。 |
| 焦点轮廓和字段边框至少为 3:1 | 1.4.11 | 人们必须看到自己在哪里、可以使用什么。 |
| 焦点始终可见 | 2.4.7 | 键盘用户需要知道自己在哪里。 |
| 链接不只靠颜色来识别 | 1.4.1 | 保留下划线。 |
| 文字放大到 200% 时不丢失内容 | 1.4.4 | 使用 `rem`，而不是固定的像素高度。 |
| 内容在窄屏上能重新排布 | 1.4.10 | 图片使用 `max-width: 100%`；不要使用固定宽度。 |

## 性能注意事项

一个样式表在第一个页面加载后就会被浏览器缓存，并为整个网站添加样式。系统字体可以立即加载，离线也能使用，而且包含中文字符：一个包含中文的可下载网页字体可能有好几兆字节。

## 常见错误

| 错误做法 | 会发生什么 | 正确做法 |
| --- | --- | --- |
| `outline: none` | 键盘用户看不到自己在哪里 | 使用更清晰的焦点样式，绝不设为 none |
| 选择颜色时不检查对比度 | 有些人无法阅读文字 | 检查每一对颜色 |
| 处处都用 ID 添加样式 | 规则无法被覆盖 | 使用类和类型 |
| 文字大小使用 `px` | 文字不会随读者的设置变大 | 使用 `rem` |
| 按字号大小选择标题层级 | 页面提纲被破坏 | 按结构选择，用 CSS 调整大小 |
| 每次都使用新的颜色或间距值 | 网站凌乱、不统一 | 使用你的设计变量 |

## 故障排查

**我的样式没有任何效果。** 检查 `<link>` 是否在 `<head>` 中、文件名是否正好是 `styles.css`，以及它是否和页面在同一个文件夹中。在开发者工具中，**Network**（网络）标签页会显示它是否已加载。

**开发者工具中有一条规则被划上了删除线。** 另一条规则的优先级更高，或者写在更后面。面板会显示是哪一条胜出了。

**`var(--my-colour)` 没有任何效果。** 检查拼写，包括开头的两个连字符，并检查它是否定义在 `:root` 上。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)** —— 只修改自定义属性，做出一套深色主题。
2. **[创意](challenges/challenge-2.zh-Hans.md)** —— 一套来自你自己的文化或家乡的调色板，每一对颜色都经过检查。
3. **[探索](challenges/challenge-3.zh-Hans.md)** —— 遵循读者的系统设置：深色模式和减少动态效果。

## 提交作业

1. 完成 [`tests/checklist.md`](tests/checklist.md) 中的每一项。
2. 给你的首页和报名页截图，分别截取正常大小和放大到 200% 的样子。
3. 把它们保存在你的学习日志和作品集中。也可以和其他开发者分享它们（参见[在哪里分享你的作品](../../docs/en/community.md)，英文）。
4. 在学习日志中回答：在检查对比度之后，你不得不修改了哪种颜色？

## 延伸阅读

- [MDN —— CSS 样式基础](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics)（英文）
- [MDN —— 使用 CSS 自定义属性](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties)（英文）
- [MDN —— 优先级](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Specificity)（英文）
- [W3C —— 理解对比度（最低要求）](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)（英文）

## 值得认识的女性

**Chen Hui Jing（陈慧晶）** 是一位自学成才的设计师和开发者，出生于马来西亚，在新加坡工作。她撰写文章并发表演讲，介绍如何用 CSS 处理英语以外的书写系统，尤其是用 `writing-mode` 和逻辑属性实现中文竖排以及东亚排版。她是 Talk.CSS 聚会的联合创始人之一。

网页最初是围绕从左到右书写的英语构建的。Chen Hui Jing 的工作展示了当 CSS 认真对待每一种语言（包括许多 XR Camp 学员所说的语言）时，它能做到什么。

> **编辑说明 —— 发布前须核实。** 「值得认识的女性」栏目中的生平陈述必须与原始资料核对，并在可行时于本课上线前与本人确认。参见 [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md)。

## 标准聚焦

CSS 由 W3C 的 **CSS 工作组**（CSS Working Group）编写，分成许多独立的模块（Selectors 选择器、Cascade 层叠、Color 颜色、Fonts 字体等），每个模块可以按不同的速度向前推进。这就是为什么没有「CSS4」：每个模块都有自己的级别（level）。

## 许可协议

代码：[`LICENSE-CODE`](../../LICENSE-CODE) · 内容：[`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
