# 响应式网页设计

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程:** `web-developer` · **课时:** `responsive-web-design-04` · **时长:** 约 14 小时 · 19 次学习，每次 45 分钟 · 每周 4 次，约 5 周

---

> 构建一个响应式的旅行、文化、社区或服务网站。

---

## 学习目标

完成本项目后，你将能够：

1. 以移动优先的方式进行设计，并解释原因。
2. 使用相对单位（`rem`、`%`、`vw`、`ch`），而不是固定尺寸。
3. 用 flexbox 把一组项目排成一行，用 CSS grid 把卡片排成网格。
4. 用媒体查询为更大的屏幕添加布局，同时不破坏较小屏幕上的布局。
5. 用 `clamp()` 让标题平滑地变大。
6. 用 `srcset` 和 `sizes` 为每种屏幕提供合适尺寸的图片。
7. 让触摸目标足够大，方便手指点按。
8. 解释容器查询带来了什么，并使用一个容器查询。
9. 在多种宽度下以及真实设备上测试网站。

## 先决条件

- **课程 1.3：CSS 基础。** 你已经有了一个网站，并使用一个基于设计变量（tokens）的样式表。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| 现代浏览器及其开发者工具 | 用设备模式测试不同宽度 | 免费 |
| 文本编辑器 | 编写 CSS | 免费 |
| 一部手机，如果可能的话再加一台平板电脑 | 在真实设备上测试 | 使用你自己的设备 |

## 你将构建什么

你的社区网站的响应式版本：同一套页面，在 320 像素宽的手机、平板电脑和宽大的桌面屏幕上都能良好运行。导航会自动换行，并且容易点按；项目列表变成卡片网格；「About」（关于我们）板块在宽屏上分成两栏显示；图片以合适的尺寸下载；开放时间表格在自己的方框内滚动，而不会撑破页面。

参考解决方案位于 [`completed/`](completed/)。起始文件是课程 1.3 完成后的网站；如果你有自己的网站，就用你自己的。

## 文件夹说明

```text
04-responsive-web-design/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── styles.css       # The Course 1.3 stylesheet, with a new section and TODOs
│   ├── index.html       # The home page, with 3 TODOs
│   ├── join.html, thanks.html
│   ├── centre-480.jpg, centre-960.jpg, centre-1440.jpg   # One picture, three sizes
│   └── 3d-moment.html   # This lesson's 3D moment
├── completed/           # Reference solution: open this last
├── challenges/          # Three optional extensions
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## 环境配置

1. 在你自己的网站文件夹中进行，或者复制本课的 `starter` 文件夹。
2. 把三张 `centre-*.jpg` 图片复制到你的网站文件夹中。如果你改用自己的照片，就用任意图片编辑器把它保存为三种宽度（480、960 和 1440 像素），例如免费的 GIMP，或者电脑自带的照片应用。
3. 打开开发者工具，然后开启**设备模式**：在开发者工具打开的状态下按 **Ctrl + Shift + M**（在 Mac 上是 **⌘ + Shift + M**）。在 Firefox 中它叫作 **Responsive Design Mode**（响应式设计模式），在 Mac 上的快捷键是 **⌘ + Option + M**。现在你可以选择任意屏幕宽度了。

## 分步讲解

### 规划你的学习时间

| 次数 | 学习内容 | 完成成果 |
| --- | --- | --- |
| 1 | 环境配置；第 1 步（TODO 1） | 一份在四种宽度下出问题的地方的清单 |
| 2 | 第 2 步：移动优先与相对单位 | 你能解释这两者 |
| 3 | 第 3 步：流式标题（TODO 2） | 平滑变大的标题 |
| 4 | 第 4 步：flexbox（TODO 3） | 可以自动换行的导航 |
| 5 | 第 4 步（续）（TODO 4） | 44 像素的触摸目标 |
| 6 | 第 5 步：卡片的 HTML（TODO 5） | 以卡片列表呈现的项目 |
| 7 | 第 6 步：grid（TODO 6） | 卡片网格 |
| 8 | 第 6 步（续）：auto-fill 是如何工作的 | 你能预测会有几列 |
| 9 | 第 7 步：容器查询（TODO 7） | 能根据自身宽度做出响应的卡片 |
| 10 | 第 8 步：响应式图片（TODO 8） | 每种屏幕都有合适的图片 |
| 11 | 第 8 步（续）：检查加载了哪张图片 | 在 Network（网络）标签页中得到证明 |
| 12 | 第 9 步：表格（TODO 9–10） | 永远不会撑破页面的表格 |
| 13 | 第 10 步：媒体查询（TODO 11） | 宽屏上的两栏布局 |
| 14 | 第 10 步（续）：报名页 | 在任何宽度下都能使用的表单 |
| 15 | 第 11 步：在真实设备上测试 | 一份测试记录 |
| 16 | 修复测试记录中发现的问题 | 在任何地方都能使用的网站 |
| 17 | **3D 时刻** | 能适应屏幕的 3D 场景 |
| 18 | [`tests/checklist.md`](tests/checklist.md) | 经过测试的网站 |
| 19 | 一项拓展挑战，然后**提交作业** | 完成的响应式网站 |

### 第 1 步：看看哪里出了问题（TODO 1）

在修改任何东西之前，先在设备模式下以 **320**、**390**、**768** 和 **1280** 像素的宽度查看每一个页面。把所有看起来不对的地方都记下来：文字太大、一行放不下、表格比屏幕还宽。这份清单就是你本课的待办事项。

### 第 2 步：移动优先与相对单位

**移动优先**的意思是，先为最小的屏幕编写样式，然后用媒体查询为更大的屏幕**添加**布局。小屏幕得到的是最简单的页面，也是最快的页面；不需要撤销任何东西。

你的网站已经差不多是移动优先的了：课程 1.3 使用了 `rem`、`max-width`，并在图片上使用了 `max-width: 100%`。原因就在于相对单位：

| 单位 | 相对于 | 适用于 |
| --- | --- | --- |
| `rem` | 读者浏览器的字号 | 文字和间距 |
| `%` | 包含它的盒子 | 宽度 |
| `vw` | 窗口宽度的 1% | 流式尺寸 |
| `ch` | 字符「0」的宽度 | 行长 |

### 第 3 步：流式标题（TODO 2）

```css
h1 { font-size: clamp(var(--step-3), 1.5rem + 3vw, var(--step-4)); }
```

`clamp(最小值, 首选值, 最大值)`：首选值会随窗口变大，但永远不会低于最小值，也不会超过最大值。其中的 `rem` 部分意味着，当读者调大文字时，它仍然会变大。

### 第 4 步：flexbox（TODO 3–4）

Flexbox 把项目排成一**行**（或一列），并且可以让它们换到新的一行：

```css
nav ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0 var(--space-4);
}
```

`gap` 在项目之间留出间隔，不需要外边距。删除第 5 部分中旧的 `nav li` 规则：flexbox 取代了它。

然后让每个链接至少有 **44 × 44 CSS 像素**，方便手指点中（TODO 4）。WCAG 2.2 要求至少 24 像素；44 像素是被广泛推荐的尺寸，对每个人来说都容易点按得多。

### 第 5 步：卡片的 HTML（TODO 5）

把两个项目列表变成一个卡片列表：

```html
<ul class="cards" role="list">
  <li class="card">
    <h3>Homework club</h3>
    <p>Weekdays after school.</p>
    <p class="tag">Children and young people</p>
  </li>
  <!-- one card for each programme -->
</ul>
```

它仍然是一个列表，所以大多数屏幕阅读器会朗读「list, 6 items」（列表，共 6 项）。卡片会使用 `list-style: none`，这时 Safari 就不再把这个 `<ul>` 当作列表。`role="list"` 让它对每个人来说都仍然是一个列表。Grid 只会改变它的外观。

### 第 6 步：grid（TODO 6）

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 15rem), 1fr));
  gap: var(--space-3);
}
```

从里往外读：每一列**至少 15rem，并平分剩余的空间**（`1fr`）；**尽可能放下更多的列**（`auto-fill`）。手机上每行一张卡片，平板电脑上两张，宽屏上三张，完全不需要媒体查询。`min(100%, 15rem)` 能防止卡片在非常窄的手机上溢出。

### 第 7 步：容器查询（TODO 7）

**媒体查询**询问的是窗口。**容器查询**询问的是某个东西所在的盒子，所以一张卡片可以根据**卡片**本身的宽度来改变布局，无论它被放在哪里。

```css
.card { container-type: inline-size; }

@container (min-width: 22rem) {
  .tag { position: absolute; top: var(--space-3); right: var(--space-3); }
}
```

当一张卡片内部足够宽时（例如，在横过来的大屏手机上每行只有一张卡片），标签就会移到角落。把窗口调窄、调宽，看看它是怎么移动的。容器查询在当前所有主流浏览器中都能使用；在较旧的浏览器中，卡片只是保持手机上的布局，这也没有问题。

### 第 8 步：响应式图片（TODO 8）

手机不需要 1440 像素的图片。给浏览器几个选择，让它自己挑：

```html
<img src="centre-960.jpg"
     srcset="centre-480.jpg 480w, centre-960.jpg 960w, centre-1440.jpg 1440w"
     sizes="(min-width: 48rem) 28rem, 100vw"
     alt="The centre's front entrance, with a step-free ramp beside the main doors."
     width="800" height="450">
```

- `srcset` 列出各个文件及其实际宽度。
- `sizes` 说明图片将以多宽显示：宽屏上为 28rem，其他情况下为整个窗口的宽度。
- 浏览器会把这些信息与屏幕的像素密度结合起来，并且**只下载一个**文件。

检查一下：在 **Network**（网络）标签页中，以不同的宽度刷新页面，看看加载的是哪一张图片。

### 第 9 步：表格（TODO 9–10）

表格没法压缩太多。把它放进一个可以自己横向滚动的盒子里，这样页面就不用横向滚动：

```html
<div class="table-wrap" role="region" aria-labelledby="hours-caption" tabindex="0">
  <table>
    <caption id="hours-caption">Opening hours during term time</caption>
```

`tabindex="0"` 让键盘用户可以到达这个盒子，并用方向键滚动它；`role="region"` 和标签告诉屏幕阅读器它是什么。

### 第 10 步：媒体查询（TODO 11）

对于只在宽屏上才有意义的布局，添加一个媒体查询：

```css
@media (min-width: 48rem) {
  #about {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

使用 `min-width`，这样这些规则就是在移动端布局的基础上**添加**的。在你的内容出问题的地方设置断点，而不是在某一款手机的屏幕宽度处设置。

### 第 11 步：在真实设备上测试

设备模式是一个很好的开始，但真实的手机不一样：真实的手指、真实的阳光、缓慢的网络。在你能借到的每一台设备上打开你的网站，并记录测试情况：设备、浏览器、哪些可以用、哪些不行。还要试一试：

- 在电脑上**放大到 200%**。
- 在手机上使用**横屏**。
- 在手机设置中使用最大的**文字大小**。

## 关键代码解析

**`repeat(auto-fill, minmax(min(100%, 15rem), 1fr))`。** CSS grid 中最有用的一行代码：不需要媒体查询就能实现响应式的列。

**`container-type: inline-size`。** 让一个元素成为容器，它的子元素可以按宽度对它进行查询。

**`aspect-ratio`**（用在 3D 时刻中）：在宽度变化时保持盒子的形状：`4 / 3`、`1 / 1`、`16 / 9`。

**`min()`、`max()` 和 `clamp()`。** CSS 可以比较数值：取较小的、较大的，或者介于两个界限之间的值。

## 3D 时刻

打开 [`starter/3d-moment.html`](starter/3d-moment.html)：这是活动中心的一个小型 3D 模型。在手机上，场景以 4:3 的形状占满整个宽度；在宽屏上，它以正方形的形状位于文字旁边。这个布局使用的正是你为卡片所用的同一种 CSS grid，而 `aspect-ratio` 让场景在任何宽度下都保持形状。3D 场景只不过是你布局中的另一个盒子。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| 在 320 像素宽时不出现横向滚动，表格内部除外 | 1.4.10 | 放大到 400% 的人看到的是一个 320 像素宽的页面。 |
| 文字可以放大到 200% | 1.4.4 | 使用 `rem`，以及带有 `rem` 部分的 `clamp()`。 |
| 目标至少 24 像素；我们使用 44 像素 | 2.5.8 | 对每个人来说都更容易点按。 |
| 竖屏和横屏都能使用 | 1.3.4 | 有些人无法旋转他们的设备。 |
| 可以用键盘到达可滚动的表格盒子 | 2.1.1 | 使用 `tabindex="0"` 和一个标签。 |
| 脱离布局后，内容顺序仍然合理 | 1.3.2 | Grid 只改变外观，不改变 HTML 的顺序。 |

## 性能注意事项

响应式图片是本课在性能上最大的收获：手机下载 480 像素的图片而不是 1440 像素的图片，可以节省图片的大部分数据量。Grid 和 flexbox 不需要下载任何东西。3D 时刻所用的 A-Frame 库大约有 1.3 MB 的代码（压缩后约 350 KB），这就是 3D 内容单独放在一个页面上的原因。

## 常见错误

| 错误做法 | 会发生什么 | 正确做法 |
| --- | --- | --- |
| 先为桌面设计，再往小屏幕里挤 | 到处都是覆盖规则，手机页面也很慢 | 移动优先，然后再添加 |
| 以像素为单位的固定宽度 | 手机上出现横向滚动 | 使用 `max-width`、`%` 和 grid |
| 针对特定手机设置断点 | 换一款手机就出问题 | 在你的内容出问题的地方设置断点 |
| 通过改变 HTML 的顺序来改变布局 | 对屏幕阅读器来说顺序混乱 | 保持 HTML 的顺序；用 CSS 移动位置 |
| 又小又挤在一起的链接 | 人们会点错 | 使用 44 像素的目标，并留出间隔 |
| 在 `<table>` 上使用 `display: block` | 屏幕阅读器可能无法识别表格 | 把它包在一个可滚动的盒子里 |

## 故障排查

**在手机上，页面仍然会横向滚动。** 在设备模式下，找出比屏幕还宽的元素：打开 Elements（元素）面板，把鼠标依次悬停在各个元素上，直到找到超出屏幕的那一个。通常是一张没有设置 `max-width: 100%` 的图片，或者一个固定宽度。

**浏览器总是加载最大的图片。** 你的屏幕可能像素密度很高，这是正确的行为。检查 `sizes`：如果没有写，浏览器会认为图片占满整个窗口。

**我的容器查询没有任何效果。** 容器需要设置 `container-type: inline-size`，而且查询必须针对容器，而不是窗口。

## 拓展挑战

三个可选拓展，位于 [`challenges/`](challenges/)：

1. **[基础](challenges/challenge-1.zh-Hans.md)** —— 一个在小屏幕上会收起为「Menu」（菜单）按钮的导航。
2. **[创意](challenges/challenge-2.zh-Hans.md)** —— 一份来自三台真实设备的测试记录。
3. **[探索](challenges/challenge-3.zh-Hans.md)** —— 在宽屏上把报名表单变成两栏，同时不改变它的阅读顺序。

## 提交作业

1. 完成 [`tests/checklist.md`](tests/checklist.md) 中的每一项。
2. 在 320、768 和 1280 像素宽度下，分别给你的首页截图。
3. 把它们保存在你的学习日志和作品集中。XR Camp 社区开放后，在那里分享它们。
4. 在学习日志中回答：在 320 像素宽度下，有什么出乎你意料地出了问题？

## 延伸阅读

- [MDN —— 响应式网页设计](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design)（英文）
- [MDN —— Flexbox](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox)（英文）
- [MDN —— CSS 网格布局](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids)（英文）
- [MDN —— 响应式图片](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images)（英文）
- [MDN —— 容器查询](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries)（英文）

## 值得认识的女性

**Rachel Andrew** 是一位英国网页开发者、作者和演讲者，曾是 W3C CSS 工作组的成员。她的网站 Grid by Example 收集了许多简短、清晰的 CSS 网格布局示例，在这项技术刚刚出现时，帮助了一代开发者学会它。

你为项目卡片所用的网格是一项标准：必须有人为它据理力争、解释它、教授它。其中大量的解释工作，是由 Rachel Andrew 完成的。

> **编辑说明 —— 发布前须核实。** 「值得认识的女性」栏目中的生平陈述必须与原始资料核对，并在可行时于本课上线前与本人确认。参见 [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md)。

## 标准聚焦

Flexbox、grid、媒体查询和容器查询都是由 W3C CSS 工作组编写的独立模块。`srcset` 和 `sizes` 属于 HTML Living Standard。每一个主流浏览器都以同样的方式实现它们，因为它们是标准：正是这一点让「一个网站适用于所有屏幕」成为可能。

## 许可协议

代码：[`LICENSE-CODE`](../../LICENSE-CODE) · 内容：[`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
