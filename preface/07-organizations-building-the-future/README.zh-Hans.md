# 构建未来的组织

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程:** `preface` · **课时:** `organizations-building-the-future-07` · **时长:** 约 6 小时 · 8 次学习，每次 45 分钟 · 每周 4 次，约 2 周

---

> 创建一张交互式生态地图，把标准组织与它们负责的技术联系起来。

---

## 学习目标

完成本项目后，你将能够：

1. 解释什么是网络标准，以及万维网为什么需要标准。
2. 说出你在 XR Camp 中将要用到的技术背后的组织，以及每个组织做什么。
3. 描述一个想法是如何变成标准的。
4. 找到一种真实、免费的方式，亲自参与其中。

## 先决条件

- **课程 0.4 — 万维网发展史**和**课程 0.5 — Web3D 发展史。** 你已经认识了 W3C、WHATWG、Khronos 和 Web3D Consortium。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| 现代浏览器 | 查看你的地图，以及各个组织的网站 | 免费 |
| 纯文本编辑器 | 编写你的地图 | 免费 |

## 你将构建什么

一张包含十个组织的交互式地图：每个组织做什么、负责哪些技术，以及人们可以如何参与。访问者可以按技术筛选（「让我看看 XR 背后是谁」）。在地图下方，你将解释一项标准是如何制定出来的，并选择一种你自己将要参与的方式。

[`completed/`](completed/) 中的参考解决方案是 Ana 的地图。

## 文件夹说明

```text
07-organizations-building-the-future/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/             # Begin here: the map, with 5 TODOs
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## 环境配置

1. 把本课的 `starter` 文件夹复制到你的 `xr-camp` 文件夹中，并把它重命名为 `who-builds-the-web`。
2. 在浏览器和文本编辑器中打开 `who-builds-the-web/index.html`。
3. 试一试筛选按钮。W3C 的卡片已经完成，其他卡片正等着你来填写。

## 历史故事

### 万维网为什么需要标准

你今天写的一个页面，可以在 Chrome、Firefox、Safari 和 Edge 中运行，可以在 Windows、Android 和 iPhone 上运行，无论是在利马还是在成都。这并不是偶然。它之所以能运行，是因为制造浏览器的公司们就一套共同的规则达成了一致，这些规则被称为**标准**，并且被写在任何人都能阅读的地方。

没有标准，每个浏览器的表现都会不一样，你就不得不把每个页面构建好几遍。有了标准，你只需构建一次，就能面向所有人。

### 这些组织

| 组织 | 它做什么 | 你将用到的技术 |
| --- | --- | --- |
| **W3C**，万维网联盟（World Wide Web Consortium） | 由蒂姆·伯纳斯-李于 1994年创立。编写大部分网络标准。 | CSS、WCAG、SVG、WebXR、WebGPU |
| **WHATWG** | 由各浏览器厂商于 2004年组建。维护 HTML 现行标准（HTML Living Standard），W3C 也认可这一标准。 | HTML、DOM、Fetch、URL |
| **Ecma International** | 它的 TC39 委员会维护 ECMAScript，即 JavaScript 背后的标准。 | JavaScript |
| **IETF**，互联网工程任务组（Internet Engineering Task Force） | 以名为 RFC 的文档形式编写互联网协议。 | HTTP、TLS、DNS |
| **Khronos Group** | 一个由多家公司组成、编写图形和 3D 标准的联盟。 | WebGL、glTF、OpenXR、KTX |
| **Web3D Consortium** | 负责维护由 VRML 发展而来的 X3D。 | X3D |
| **开放地理空间信息联盟（Open Geospatial Consortium，OGC）** | 编写地图和位置数据的标准。 | 网络地图服务、CityGML、3D Tiles |
| **Metaverse Standards Forum**（元宇宙标准论坛） | 成立于 2022年。把各个标准组织和公司聚集在一起；它本身并不编写标准。 | 各项标准之间的协调 |
| **开放源代码促进会（Open Source Initiative，OSI）** | 维护《开源定义》（Open Source Definition），并审批开源许可证。 | 开源许可证 |
| **XR Guild** | 一个面向 XR 从业者、注重伦理的专业协会。 | XR 伦理原则 |

请注意，有些你可能以为属于同一家的技术，其实并不在一起：**WebGL** 来自 Khronos，而它的继任者 **WebGPU** 却来自 W3C。了解谁在负责什么，你就知道该去哪里寻找答案，又该去哪里报告问题。

### 标准是如何制定的

各个组织的细节有所不同，但路径大致相似：

1. **一个想法。** 有人遇到了一个万维网目前还无法解决的问题。
2. **孵化。** 人们公开描述这个问题和可能的解决方案，通常是在 W3C 的**社区组**（Community Group）中，或者写成一份名为**说明文档**（explainer）的简短文件。
3. **工作组**同意编写一份**规范**（specification）：对这项技术必须如何运作的精确描述。
4. **草案与广泛审查。** 专家们从无障碍、隐私、安全和国际化等方面审查草案。
5. **实现与测试。** 浏览器实现这项技术，一套共享的测试套件会检查它们的表现是否完全一致。
6. **成为标准。** 当它能够互操作，也就是在不止一个浏览器中都能运行时，它就成为 W3C 推荐标准（W3C Recommendation）。

这个过程需要好几年，而且是有意为之：一旦数以百万计的网站依赖于某项标准，它就几乎再也无法改变了。

### 你可以参与其中

标准并不只是由大公司编写的。许多组织都提供了免费、开放的参与途径：

- **W3C 社区组**任何人都可以免费加入，其中包括沉浸式网络社区组（Immersive Web Community Group），WebXR 的许多想法正是从那里开始的。
- **WHATWG 和 TC39** 在 GitHub 上公开讨论它们的工作，任何人都可以阅读和评论。
- **IETF** 没有会员制度：任何人都可以加入它的邮件列表。
- 在浏览器中**报告一个 bug**，或者指出 MDN 等文档中的一处错误，都是真正的贡献。

另一些组织，例如 Khronos 和 Web3D Consortium，是会员制组织，但它们会公开发布自己的规范，供所有人使用。

## 分步讲解

### 规划你的学习时间

| 次数 | 学习内容 | 完成成果 |
| --- | --- | --- |
| 1 | 环境配置；阅读**万维网为什么需要标准**；TODO 1 | 打开你的地图，并写上你的名字 |
| 2 | 阅读**这些组织**；为前四张卡片完成 TODO 2 | 完成一半的地图 |
| 3 | 为其余卡片完成 TODO 2，并访问每个组织的网站 | 每张卡片都有了说明 |
| 4 | TODO 3：添加 OSI 和 XR Guild | 一张包含十个组织的地图 |
| 5 | 阅读**标准是如何制定的**；TODO 4 | 从想法到标准的路径 |
| 6 | 阅读**你可以参与其中**；TODO 5 | 你自己的参与计划 |
| 7 | 逐项完成 [`tests/checklist.md`](tests/checklist.md) | 一张完成的地图 |
| 8 | 完成一项拓展挑战，然后**提交作业** | 作品集中你的地图 |

### 添加一张卡片（TODO 3）

复制一整张卡片，从 `<li class="org"` 到它对应的 `</li>`，粘贴到列表的末尾。修改其中的名称、那句说明、技术，以及参与方式。

然后设置它的 `data-tags`，让筛选功能能够找到它：开源和伦理用 `open`，XR Guild 还要再加上 `xr`。筛选按钮读取的正是这些标签。

## 关键代码解析

**`data-tags`。** 以 `data-` 开头的属性可以由你自己创造。在这里，它们记录了每张卡片属于哪些筛选类别。脚本会读取它们，除此之外浏览器会忽略它们。

**筛选按钮上的 `aria-pressed`。** 筛选按钮是一种会保持开启状态的按钮。`aria-pressed="true"` 告诉屏幕阅读器它已被选中，而 CSS 也使用同一个属性来给它上色：两者共用同一个信息来源。

**实时区域中的计数。** 「显示 10 个组织中的 3 个」这句话在变化时会被朗读出来，让屏幕阅读器用户知道筛选已经生效。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| 没有 JavaScript 也能正常使用 | 良好实践（并非 WCAG 规则） | 每位访问者都能看到所有组织。 |
| 用 `aria-pressed` 表明筛选状态 | 4.1.2 | 屏幕阅读器会说出哪个筛选已开启。 |
| 筛选结果会被朗读出来 | 4.1.3 | 状态信息能传达给每一个人。 |
| 选中的筛选按钮不只靠颜色区分 | 1.4.1 | 选中的按钮会被填充，而不只是换了颜色。 |

## 性能注意事项

十张卡片、一个小脚本、没有图片：页面瞬间就能加载完成。筛选只是隐藏卡片，而不会重新加载任何内容，所以同样是瞬间完成的。

## 常见错误

| 错误做法 | 会发生什么 | 正确做法 |
| --- | --- | --- |
| 以为有某一个组织拥有「整个万维网」 | 到错误的地方寻找答案 | 查一查每项技术由谁维护 |
| 新卡片忘记写 `data-tags` | 筛选时这张卡片永远不会出现 | 每张卡片至少给一个标签 |
| 从各个网站照抄介绍 | 你记不住它们 | 用你自己的话写一句 |

## 故障排查

**我的新卡片在任何筛选下都不出现。** 检查它的 `data-tags`：其中的词必须与按钮的 `data-filter` 值完全一致，并且全部小写。

**筛选按钮没有出现。** 检查你是否删掉了页面底部的 `<script>`。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)** —— 找出你今天在不知不觉中用到的三项标准。
2. **[创意](challenges/challenge-2.zh-Hans.md)** —— 添加一个来自你所在地区的组织。
3. **[探索](challenges/challenge-3.zh-Hans.md)** —— 加入一个 W3C 社区组。

## 提交作业

1. 完成 [`tests/checklist.md`](tests/checklist.md) 中的每一项。
2. 开启 **XR** 筛选，给你的地图截一张图。
3. 把截图保存在你的学习日志中。XR Camp 社区开放后，也在那里分享。
4. 在学习日志中回答：将来有一天，你最想与哪个组织合作？为什么？

## 延伸阅读

- [W3C —— 标准与制定流程](https://www.w3.org/standards/)（英文）
- [WHATWG —— 常见问题](https://whatwg.org/faq)（英文）
- [TC39 —— JavaScript 是如何演进的](https://tc39.es/)（英文）
- [W3C 社区组](https://www.w3.org/community/)（英文）

## 值得认识的女性

**吴小倩**于 2013年加入 W3C，自 2018年起担任 W3C 中国的站点经理（site manager），同时担任 W3C 中国会员关系总监。她是 Web 应用工作组（Web Applications Working Group）、Web 编辑工作组（Web Editing Working Group）以及中文 Web 兴趣组（Chinese Web Interest Group）的 W3C 团队联络人，并曾担任小程序工作组（MiniApps Working Group）的团队联络人，直到该工作组于 2026年关闭。

最后提到的那个小组对学习者来说意义重大：网络标准必须适用于每一种语言和书写系统，而正是像吴小倩这样的人，确保中文的需求从一开始就成为讨论的一部分。

> **编辑说明 —— 发布前须核实。** 「值得认识的女性」栏目中的生平陈述必须与原始资料核对，并在可行时于本课上线前与本人确认。参见 [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md)。

## 标准聚焦

整节课本身就是一次标准聚焦。还有一个值得了解的细节：W3C 的流程要求每一份规范在成为标准之前，都必须经过**广泛审查**（wide review），其中包括专注于无障碍和国际化的小组的审查。万维网在设计之初就是为了包容每一个人，而不是事后才想起来补救。

## 许可协议

代码：[`LICENSE-CODE`](../../LICENSE-CODE) · 内容：[`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
