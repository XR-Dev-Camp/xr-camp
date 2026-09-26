# 无障碍表单与用户输入

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程:** `web-developer` · **课时:** `accessible-forms-and-user-input-02` · **时长:** 约 7 小时 · 10 次学习，每次 45 分钟 · 每周 4 次，约 3 周

---

> 构建一个无障碍的报名与反馈表单。

---

## 学习目标

完成本项目后，你将能够：

1. 构建一个表单，让每个字段都有可见的、并在代码中与之关联的标签。
2. 为每一项信息选择合适的输入类型和 `autocomplete` 值。
3. 用 `<fieldset>` 和 `<legend>` 把相关的选项归为一组，并正确使用单选按钮、复选框和下拉菜单。
4. 清楚地标出必填字段：既用文字说明，也在代码中标注。
5. 使用浏览器自带的校验功能，并解释它的局限。
6. 只收集你需要的数据，并说明你将如何使用这些数据。
7. 只用键盘填写并提交一个表单。

## 先决条件

- **课程 1.1：HTML 基础。** 你已经构建了 Riverside Community Centre（河畔社区中心）网站（或你自己的网站），这个表单将加入其中。
- **课程 0.8：伦理、无障碍、隐私与负责任的 AI。** 你知道数据最小化和真正的同意是什么意思。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| 现代浏览器 | 测试你的表单 | 免费 |
| 文本编辑器 | 编写 HTML | 免费 |
| 屏幕阅读器：NVDA（Windows）、VoiceOver（macOS、iOS）或 TalkBack（Android） | 听一听你的表单 | 免费 |

## 你将构建什么

为你的社区网站制作一个 **Join a programme**（报名参加项目）页面，其中有两个表单：

1. 一个**报名表单**：姓名、电子邮箱、一个可选的电话号码、项目选择、偏好的日期、无障碍需求，以及一个未勾选的新闻简报复选框，并附上一段用浅白语言写成的说明，解释这些信息会被如何使用。
2. 一个**反馈表单**：用文字表示的评分，以及一条可选的留言。

和课程 1.1 一样，这个页面暂时还没有 CSS：课程 1.3 会为它添加样式。

参考解决方案位于 [`completed/`](completed/)。在你自己的网站中，把这个页面保存为 `join.html`，放在首页旁边，并在导航中添加指向它的链接。

## 文件夹说明

```text
02-accessible-forms-and-user-input/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html       # Begin here: a page with 9 TODOs
│   ├── thanks.html      # The page your forms send people to
│   └── 3d-moment.html   # This lesson's 3D moment
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## 环境配置

1. 把 `starter/index.html` 复制到你课程 1.1 的网站文件夹中，并把它重命名为 `join.html`。同时把 `starter/thanks.html` 也复制过去。
2. 在首页的导航中添加一个「Join a programme」（报名参加项目）链接。
3. 在浏览器和文本编辑器中打开 `join.html`。

## 分步讲解

### 规划你的学习时间

| 次数 | 学习内容 | 完成成果 |
| --- | --- | --- |
| 1 | 环境配置；第 1 步（TODO 1–2） | 一个带有一个已加标签字段的表单 |
| 2 | 第 2 步（TODO 3） | 电子邮箱和电话字段，并附有提示 |
| 3 | 第 3 步（TODO 4） | 用单选按钮选择项目 |
| 4 | 第 4 步（TODO 5） | 一个下拉菜单和一个多行文本框 |
| 5 | 第 5 步（TODO 6） | 必填字段和浏览器自带的校验 |
| 6 | 第 6 步（TODO 7） | 你的隐私说明和提交按钮 |
| 7 | 第 7 步（TODO 8） | 一个反馈表单 |
| 8 | 第 8 步（TODO 9），键盘和屏幕阅读器测试 | 一个经过测试、可以正常使用的页面 |
| 9 | **3D 时刻** | 能够改变 3D 物体的表单控件 |
| 10 | [`tests/checklist.md`](tests/checklist.md)、一项挑战，以及**提交作业** | 一个完成的页面 |

### 第 1 步：标签（TODO 1–2）

```html
<form action="thanks.html" method="get">
  <fieldset>
    <legend>About you</legend>
    <p>
      <label for="name">Full name (required)</label><br>
      <input id="name" name="name" type="text" autocomplete="name" required>
    </p>
  </fieldset>
</form>
```

标签上的 `for` 必须与输入框上的 `id` 一致。这个关联有三个作用：屏幕阅读器会朗读「Full name, required, edit text」（全名，必填，编辑文本）；点击标签会把光标放进字段中，让手部颤抖的人有一个更大的点击目标；使用语音控制的人可以说「click Full name」（点击全名）。

**占位文字（placeholder）不是标签。** 它会在你输入时消失，颜色通常太浅、难以看清，而且屏幕阅读器也不会把它当作标签。请始终使用真正的 `<label>`。

### 第 2 步：为每个字段选择合适的类型（TODO 3）

| 信息 | `type` | `autocomplete` | 它能为人们带来什么 |
| --- | --- | --- | --- |
| 姓名 | `text` | `name` | 浏览器可以自动填写 |
| 电子邮箱 | `email` | `email` | 手机上会出现带 `@` 的键盘；还会检查格式 |
| 电话 | `tel` | `tel` | 手机上会出现数字键盘 |

`autocomplete` 让浏览器填入这个人以前输入过的内容。这为每个人节省时间，对有记忆或运动障碍的人来说尤其重要。

添加一段简短的**提示**，说明你为什么要询问这项信息，并用 `aria-describedby` 把它关联起来，这样屏幕阅读器会在朗读标签之后朗读它：

```html
<span id="phone-hint">Only if you would like a text reminder before each session.</span>
<input id="phone" name="phone" type="tel" autocomplete="tel" aria-describedby="phone-hint">
```

### 第 3 步：选项（TODO 4）

一组相关的选项需要一个 `<fieldset>`，以及一个提出问题的 `<legend>`。当你进入这一组时，屏幕阅读器会朗读 legend，有些屏幕阅读器还会在每个选项前重复它：「Which programme would you like to join? Homework club, radio button, 1 of 5」（你想参加哪个项目？作业辅导班，单选按钮，第 1 项，共 5 项）。

共用同一个 `name` 的单选按钮构成一组：只能选中其中一个，并且可以用方向键在它们之间移动。

### 第 4 步：菜单和较长的回答（TODO 5）

- 当选项很多、而人们只选一个时，使用 **`<select>`**。把一个中立的选项放在最前面（「No preference」，无偏好），这样就不会有人被迫接受一个自己并没有做出的选择。
- 对于超过一行的回答，使用 **`<textarea>`**。

### 第 5 步：必填字段与校验（TODO 6）

给必须填写的字段加上 `required`，并在标签中**用文字**说明：「(required)」（必填）。只靠颜色或星号是不够的。

现在，在表单为空的情况下按下提交按钮。浏览器会阻止表单提交，把焦点移到第一个问题所在的位置，并显示一条消息。使用 `type="email"` 时，它还会检查电子邮箱看起来是否像一个电子邮箱。这就是**浏览器自带的校验**：免费、快速，而且无障碍。

它也有局限：这些消息是浏览器的消息，使用浏览器的语言，而且很快就会消失。在挑战 3 中，你将构建一个会一直留在页面上的错误摘要。

### 第 6 步：隐私与同意（TODO 7）

对每一个字段都问问自己：**活动中心真的需要这项信息吗？** 它需要姓名，以及一种联系你的方式。它不需要出生日期或证件号码。

- 电话号码是可选的，提示中说明了为什么要询问它。
- 无障碍需求是可选的，提示中写着「only share what you are comfortable sharing」（只分享你愿意分享的内容）。
- 新闻简报复选框是**未勾选**的。默认勾选不是同意。
- `<details>` 元素中是一段简短、诚实的说明：收集了什么、为什么收集、保存多久、谁可以看到，以及如何申请删除。

### 第 7 步：反馈表单（TODO 8）

构建第二个表单。评分要用**文字**表示（从「Excellent」非常好到「Very poor」非常差），而不只是数字或星星，这样每个人都能清楚地理解它的意思。在留言框上使用 `maxlength`，并在提示中写明字数上限。

### 第 8 步：提交，然后看一看（TODO 9）

填写并提交报名表单。看看感谢页面的网址：你的回答就在里面，位于 `?` 之后。这就是 `method="get"` 的作用。对于这个练习表单来说没有问题，但对于真实的个人信息来说绝不可以：真实的表单使用 `method="post"` 和服务器，你将在第 5 阶段构建它们。

然后，像专业人士一样进行测试：

1. **只用键盘：** 不用鼠标，填写并提交两个表单。Tab 键在字段之间移动；空格键勾选复选框；方向键在单选按钮之间移动。
2. **屏幕阅读器：** 打开一个屏幕阅读器，听一听每个字段。每个字段都说明了它是什么、需要填写什么吗？
3. **放大到 200%：** 所有内容是否仍然能完整显示？

## 关键代码解析

**`for` 和 `id`。** 两个属性，一个关联：这是任何表单中最重要的一行代码。

**`fieldset` 和 `legend`。** 把一个问题和它的答案放在一起，对每个人都是如此。

**`aria-describedby`。** 把额外的帮助信息关联到一个字段上，让它在标签之后被朗读。它指向一个 `id`，和 `for` 一样。

**`autocomplete`。** 使用 HTML 标准中列出的标准值（`name`、`email`、`tel`、`street-address` 等）。即使页面使用其他语言，这些值也仍然是英文。

**`<button type="submit">`。** 一个真正的按钮：可以用 Tab 键到达，用 Enter 键或空格键按下。绝不要用一个假装成按钮的 `div`，就像课程 0.8 里那个一样。

## 3D 时刻

打开 [`starter/3d-moment.html`](starter/3d-moment.html)。你刚刚构建的同一类表单控件（一个下拉菜单、一个颜色选择器和一个滑块）现在可以改变一个 3D 物体：它的形状、颜色和大小。随着它们的变化，场景描述也会更新，并被朗读出来。

看看底部的脚本：每个控件在发生变化时都会触发一个 `input` 事件。你将在课程 1.6 中亲自编写这样的代码。现在，请留意其中的理念：**表单是人们与软件对话的方式**，无论这个软件是一份报名名单，还是一个 3D 世界。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| 每个字段都有可见且已关联的标签 | 1.3.1、3.3.2、4.1.2 | 人们知道每个字段的用途。 |
| 相关的选项使用 `fieldset` 和 `legend` | 1.3.1 | 问题会和每个答案一起被朗读。 |
| 用文字标明必填字段 | 3.3.2 | 不能只靠颜色或符号。 |
| 个人信息字段使用 `autocomplete` | 1.3.5 | 浏览器和辅助工具可以自动填写。 |
| 错误会被标出，并附有消息 | 3.3.1 | 人们知道出了什么问题。 |
| 已经输入过的内容不需要再输入一遍 | 3.3.7 | 「冗余输入」是 WCAG 2.2 的一条成功标准。 |
| 一切都可以用键盘操作 | 2.1.1 | 很多人从不使用鼠标。 |

## 性能注意事项

用纯 HTML 制作的表单速度快，能在最老旧的手机上运行，并且在 JavaScript 失效时仍然可以使用。你用到的浏览器自带校验完全不需要代码。只有当 HTML 做不到时，才给表单添加 JavaScript。

## 常见错误

| 错误做法 | 会发生什么 | 正确做法 |
| --- | --- | --- |
| 用占位文字代替标签 | 人们一输入，标签就消失了 | 始终使用可见的 `<label>` |
| `for` 和 `id` 不一致 | 对屏幕阅读器来说，这个字段没有名称 | 检查两者的拼写 |
| 单选按钮使用了不同的 `name` | 可以同时选中不止一个 | 每组共用一个 `name` |
| 只用红色或 `*` 标出必填字段 | 看不到颜色的人会错过它 | 写上「(required)」（必填） |
| 「以防万一」地索取数据 | 带来风险，也会降低信任 | 只询问你需要的信息 |
| 替人们勾选新闻简报复选框 | 这不是真正的同意 | 保持未勾选 |

## 故障排查

**点击标签时，光标没有进入字段。** 标签的 `for` 与字段的 `id` 不一致。

**有字段为空，表单却还是提交了。** 检查 `required` 是否写在字段本身上，以及这个字段是否在 `<form>` 之内。

**浏览器的错误消息是另一种语言。** 自带的消息使用的是浏览器的语言，而不是你页面的语言。挑战 3 会告诉你如何编写自己的消息。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)** —— 添加一个日期字段和第二个菜单，并正确地加上标签。
2. **[创意](challenges/challenge-2.zh-Hans.md)** —— 翻译你的表单，包括其中的提示和隐私说明。
3. **[探索](challenges/challenge-3.zh-Hans.md)** —— 构建一个会一直留在页面上的错误摘要。

## 提交作业

1. 完成 [`tests/checklist.md`](tests/checklist.md) 中的每一项。
2. 给你的表单截一张图，再截一张浏览器阻止空表单提交的图。
3. 把它们保存在你的学习日志和作品集中。也可以和其他开发者分享它们（参见[在哪里分享你的作品](../../docs/en/community.md)，英文）。
4. 在学习日志中回答：你决定*不*询问哪个字段？为什么？

## 延伸阅读

- [W3C —— 表单教程](https://www.w3.org/WAI/tutorials/forms/)（英文）
- [MDN —— 网页表单](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms)（英文）
- [MDN —— `autocomplete` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete)（英文）
- [GOV.UK Design System —— 问题页面](https://design-system.service.gov.uk/patterns/question-pages/)（英文）

## 值得认识的女性

**Talita Pagani** 是一位巴西用户体验（UX）与网页无障碍专家。在攻读计算机科学硕士学位期间，她创建了 **GAIA**：一套开放的建议，共 28 条，用于设计对自闭症人士无障碍的网页界面。她曾是 W3C Brasil 网页无障碍专家组（Web Accessibility Expert Group）的成员。

表单是许多人卡住的地方：问题不清楚、错误出乎意料、一次要处理的内容太多。GAIA 关于清晰语言和可预期行为的建议，正是你在本课中所做的那些选择。

> **编辑说明 —— 发布前须核实。** 「值得认识的女性」栏目中的生平陈述必须与原始资料核对，并在可行时于本课上线前与本人确认。参见 [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md)。

## 标准聚焦

表单在 **HTML Living Standard**（WHATWG）中定义，其中包括每一种 `type` 和每一个 `autocomplete` 值。WCAG 2.2 新增了一条名为**冗余输入**（Redundant Entry，3.3.7）的成功标准：不要让人们在同一个流程中把同样的信息输入两遍。

## 许可协议

代码：[`LICENSE-CODE`](../../LICENSE-CODE) · 内容：[`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
