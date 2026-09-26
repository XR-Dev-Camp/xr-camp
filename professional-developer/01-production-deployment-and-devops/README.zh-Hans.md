# 生产部署与 DevOps

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程：** `professional-developer` · **课时：** `production-deployment-and-devops-01` · **时长：** 约 12 小时 · 16 次学习，每次 45 分钟 · 每周 4 次，约 4 周

---

> 创建并记录一条生产环境的发布流水线。

---

## 学习目标

完成本项目后，你将能够：

1. 解释什么是 **CI/CD 流水线（pipeline）**，并把它描述为一串任务：每一项都必须通过，下一项才会运行。
2. 编写一个 **GitHub Actions** 工作流，其中包含验证、无障碍审计、构建和部署这几个任务。
3. 自动校验一个项目的 HTML 和链接，并用 `pa11y` 运行一次无头（headless）的**无障碍审计**。
4. 用 GitHub 自己官方的 action，把一个静态站点部署到 **GitHub Pages**。
5. 配置一个需要指定审核人的**环境（environment）**，让一次发布必须经过人工批准。
6. 执行一次**回滚（rollback）**：重新部署上一个已经过测试的发布版本，而不是「撤销」某次改动。
7. 从一个版本标签（tag）自动发布**发布说明（release notes）**。
8. 像本项目的案例分析那样，阅读并解释别人真实的 CI/CD 工作流。

## 先决条件

- **课程 1.8：Git、GitHub 与发布**（提交、分支、标签，以及推送到 GitHub）。
- **课程 3.7：交互式 Web3D 体验**（你将在这里部署的展览）。
- 一个免费的 [GitHub](https://github.com/)（英文）账号。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| 一个你能控制的 GitHub 账号和仓库 | Actions 和 Pages 都需要 | 免费 |
| 一个现代浏览器 | 用于查看 Actions 标签页和部署后的站点 | 免费 |
| 一个文本编辑器 | 用于编写仪表盘和工作流文件 | 免费 |

## 你将构建什么

展览本身已经完成（它是课程 3.7 中第三阶段的成果）。这个项目关注的是代码写完之**后**发生的一切：一条流水线，负责检查它、部署它，并在出问题时让团队能够回滚。

你会编写两个示例 GitHub Actions 工作流，以及一个小巧、无障碍的**发布仪表盘（release dashboard）**页面，用来记录这些工作流做了什么。`starter/app/` 中是你要部署的展览（不要修改它）；这条流水线把它当作要发布的成品，而不是要改动的对象。

参考答案在 [`completed/`](completed/) 中。起始代码在 `index.html` 和两个工作流文件中一共有 12 个 TODO。

## 文件夹说明

```text
01-production-deployment-and-devops/
├── README.md
├── starter/
│   ├── index.html        # The release dashboard: TODOs 1-3
│   ├── styles.css        # Finished (shared tokens, plus this lesson's own section)
│   ├── app/               # The virtual exhibit you will deploy (do not edit)
│   └── workflows/
│       ├── deploy.yml     # TODOs 4-9
│       └── rollback.yml   # TODOs 10-12
├── completed/            # Reference solution: open this last
├── challenges/           # Three challenges: Foundation is required
├── tests/checklist.md    # Self-review before you submit
├── assets/
└── screenshots/
```

`workflows/` 并不是 `.github/workflows/`：一个工作流文件只有放在仓库根目录下那个确切的文件夹里才会运行，所以这里的文件只是示例，等你完成后要复制到你自己的仓库里（README 的「环境配置」部分说明了具体做法）。

## 环境配置

1. 在 GitHub 上新建一个空仓库（设为公开，这样 GitHub Pages 才能免费提供服务），并把它克隆到本地。
2. 把 `starter/app/`、`starter/index.html` 和 `starter/styles.css` 复制到你新仓库的根目录。
3. 把 `starter/workflows/deploy.yml` 和 `starter/workflows/rollback.yml` 复制到同一根目录下新建的 `.github/workflows/` 文件夹里。此时还不会运行任何东西：两个文件都还没写完，而 GitHub Actions 会直接跳过没有步骤的任务。
4. 提交并推送。打开你仓库的 **Settings → Pages**，把 **Source** 设为「GitHub Actions」。
5. 打开 **Settings → Environments**，创建一个名为 `production` 的环境，勾选 **Required reviewers**，并把自己加进去。正是这个设置，让第 6 步中的 `approve` 任务变成一道真正的审批关卡：任何工作流文件本身都无法凭空发起这项审批。

## 分步讲解

### 规划你的学习节奏

| 节次 | 你要做的事 | 完成后你将拥有 |
| --- | --- | --- |
| 1 | 环境配置；在浏览器中浏览 `app/`，并通读一遍本仓库真实的 [`.github/workflows/validate.yml`](../../.github/workflows/validate.yml)（英文），先不要改动它 | 本地运行起来的展览 |
| 2 | 第 1 步：仪表盘的标题（TODO 1） | 一个说明它记录了什么的页面 |
| 3 | 第 1 步，续：流水线阶段列表（TODO 2） | 按顺序列出的六个阶段 |
| 4 | 第 1 步，续：回滚和「GitHub 之外」部分（TODO 3） | 一份完成的仪表盘 |
| 5 | 第 2 步：案例分析——逐个任务阅读 `validate.yml` | 关于它四个任务的笔记，可以直接写进 README |
| 6 | 第 3 步：validate 任务（TODO 4） | 在 Actions 标签页中通过 HTML 和链接检查 |
| 7 | 第 4 步：无障碍任务（TODO 5） | 通过一次 `pa11y` 审计 |
| 8 | 第 5 步：build 任务（TODO 6） | 上传了一个 Pages 构件（artifact） |
| 9 | 第 6 步：审批和部署任务（TODO 7-8） | 一次暂停等待审批的运行，随后得到一个可访问的 Pages 网址 |
| 10 | 第 7 步：发布说明（TODO 9） | 推送一个标签会自动发布一个 GitHub Release |
| 11 | 第 8 步：回滚触发器（TODO 10） | 一个带 `tag` 输入框的 `workflow_dispatch` 表单 |
| 12 | 第 8 步，续：重新构建并重新部署某个标签（TODO 11-12） | 让某个旧标签重新上线，并在其发布记录中留下说明 |
| 13 | 第 9 步：谨慎地了解 GitHub 之外的选项 | 一段用你自己的话写的简短对比 |
| 14 | 第 10 步：完整流水线的端到端演练 | 从推送到发布，每个任务都是绿色 |
| 15 | [`tests/checklist.md`](tests/checklist.md) | 一条完成的流水线 |
| 16 | 一个拓展挑战，然后是**提交作业** | 一条有文档记录的发布流水线 |

### 第 1 步：发布仪表盘（TODO 1-3）

从 `index.html` 开始：一个小巧的静态页面，用简单的语言向人解释这条流水线，不调用任何实时 API。这让它保持免费、离线可用、诚实——它从不假装能显示自己其实无法真正检查的状态。

TODO 1 是标题和开篇段落。TODO 2 是「Pipeline stages（流水线阶段）」列表：一个 `<ol class="stage-list" role="list">`，每个任务一个 `<li>`，各自带有自己的 `<h3>` 和一小段 `<p>`。请在读完案例分析（第 2 步）之后、动手写工作流（第 3 步及以后）之前写这两处，这样文字才能对应 YAML 实际做的事。TODO 3 是回滚说明，留到最后写，等 `rollback.yml` 已经存在之后再写。

### 第 2 步：案例分析——本仓库自己的流水线

打开本仓库根目录下的 [`.github/workflows/validate.yml`](../../.github/workflows/validate.yml)（英文）。这是真实检查每一节课（包括这一节）的工作流，只有通过它才能被合并。它包含四个任务：

- **`structure`** 运行 `node scripts/validate-projects.mjs` 和 `node scripts/build-readmes.mjs --check`：和你即将为展览添加的这种机械式结构检查是同一类东西，只不过用在了课程内容及其自动生成的 README 上。
- **`secrets`** 下载一个固定版本的 `gitleaks` 命令行工具，扫描整个 Git 历史记录中的凭据信息。它用 `fetch-depth: 0`（完整历史，而不只是最新一次提交）来检出代码，因为一个曾经被提交、后来又被删除的密钥，依然留在这段历史里。
- **`links`** 用 `lycheeverse/lychee-action` 检查每一个 Markdown 文件里的链接，并接受一个简短的 HTTP 状态码列表（`403`、`429`），这些状态码的含义是「一个真实网站拒绝了一次自动化请求」，而不是「链接已失效」。
- **`accessibility`** 安装一个固定版本的 `pa11y`，在无头 Chrome 中审计仓库里每一个 `completed/index.html`，并加上 `--no-sandbox` 和 SwiftShader 相关参数，因为运行器没有 GPU，通常会阻止 Chrome 的沙箱机制。它自己的注释准确说出了你将在第 4 步重新发现的事实：`pa11y` 看不到 3D 画布内部，这正是「3D 与 XR」人工检查清单要与它并存的原因。

从这里开始你写的每一个任务，都是在重用这四种思路之一：机械式检查、安全扫描、链接检查，或无头无障碍审计。

### 第 3 步：validate 任务（TODO 4）

在 `workflows/deploy.yml` 中，`validate` 任务最先运行。它检出代码，然后：

```yaml
- name: Validate HTML
  run: |
    npm install --no-save html-validate@11
    npx html-validate --rule "no-redundant-role:off" --rule "prefer-native-element:off" --rule "long-title:off" 'app/**/*.html'
- name: Check links
  uses: lycheeverse/lychee-action@v2
  with:
    args: >-
      --no-progress --exclude-loopback --max-retries 3 --timeout 30
      --accept 200,202,206,403,429
      'app/**/*.html'
    fail: true
```

`html-validate` 检查标记本身（未闭合的标签、无效的属性）；`lychee` 检查其中每一个链接是否真的能解析。两者都不需要账号或 API 密钥。被关闭的这三条规则，原本会误报展览里几处有意为之的选择：在经过样式化的 `<ul>`/`<ol>` 上加 `role="list"`（为较旧版本的 Safari VoiceOver 恢复列表语义）、用 `role="region"` 在 `<div>` 上构建的地标，以及那些描述性而非简短的标题。

### 第 4 步：无障碍任务（TODO 5）

`accessibility` 在 `validate` 之后运行（`needs: validate`）。它安装 `pa11y`，方式与案例分析里那个任务完全一样，并审计 `app/index.html`：

```yaml
- name: Audit the exhibit
  run: |
    echo '{ "chromeLaunchConfig": { "args": ["--no-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] }, "timeout": 120000 }' > /tmp/pa11y.json
    npx pa11y --config /tmp/pa11y.json --standard WCAG2AA "file://$PWD/app/index.html"
```

这检查的是渲染后的 DOM：3D 视图周围的每一个标签、标题和实时区域（live region）。它无法看进 WebGL 画布内部，所以 `tests/checklist.md` 里仍然保留着「3D 与 XR（人工检查）」这一节，供人亲自检查场景本身。

### 第 5 步：build 任务（TODO 6）

`build` 在 `accessibility` 之后运行。GitHub 自己的官方 action 会把一个静态站点打包成一个「Pages 构件」：

```yaml
- uses: actions/configure-pages@v6
- uses: actions/upload-pages-artifact@v5
  with:
    path: app
```

`configure-pages` 读取你仓库的 Pages 设置；`upload-pages-artifact` 把你指定的文件夹打包并存储起来，供 deploy 任务发布。这里之所以没有构建工具，是因为这个展览只是纯粹的 HTML、CSS 和 JavaScript；一个使用打包工具的项目会先运行自己的构建命令，然后上传该命令产出的文件夹。

### 第 6 步：人工审批，然后部署（TODO 7-8）

`approve` 在 `build` 之后运行，它自己几乎什么都不做：只有一步，输出一条消息。真正起作用的是 `environment: name: production`，与你在环境配置中创建的环境同名。GitHub 会在这个任务处暂停这次运行，直到一位必需的审核人从 Actions 标签页批准它——和拉取请求（pull request）获得的审核一样，只不过这次审核的是一次发布。

`deploy` 在 `approve` 之后运行，拥有自己单独的 `permissions: pages: write` 和 `id-token: write`（Pages 使用一个短期有效的 OpenID Connect 令牌进行身份验证，因此应该只允许这一个任务去申请它）：

```yaml
environment:
  name: github-pages
  url: ${{ steps.deployment.outputs.page_url }}
steps:
  - id: deployment
    uses: actions/deploy-pages@v5
```

`github-pages` 这个环境会在首次运行时自动创建；此后它的网址会出现在你仓库「Environments」标签页里每一次部署的旁边。

### 第 7 步：发布说明（TODO 9）

`release` 任务只有在这次推送是一个版本标签时才会运行（`if: startsWith(github.ref, 'refs/tags/v')`）。它使用每台运行器上都已预装的 GitHub CLI（`gh`）——不需要额外的 action 或账号：

```yaml
- name: Create the release
  env:
    GH_TOKEN: ${{ github.token }}
  run: gh release create "${{ github.ref_name }}" --title "${{ github.ref_name }}" --generate-notes
```

`--generate-notes` 会根据上一个标签之后的提交和已合并的拉取请求自动生成说明，所以写好提交信息和拉取请求标题，本身就是写好发布说明的一部分。

### 第 8 步：回滚工作流（TODO 10-12）

`rollback.yml` 是另一个独立文件，只能手动启动（`workflow_dispatch`），从不在推送时触发。TODO 10 添加一个 `tag` 输入项，让 Actions 标签页显示对应的文本框。TODO 11 重复了 build 任务，但给 `actions/checkout` 传入 `ref: ${{ inputs.tag }}`，让它检出的是那个确切的标签，而不是当前分支。TODO 12 原样重复审批和部署任务，再加上一个 `note` 任务，用 `gh release view` 和 `gh release edit` 在该标签已有的发布记录后追加一行，记录它重新上线的事实、时间，以及是谁批准的。

这里的回滚从不改写历史或删除有问题的发布：它诚实地重新发布一个更旧、已经过测试的版本，并留下事情经过的记录。

### 第 9 步：谨慎地了解对中国大陆友好的选项

GitHub Actions 和 GitHub Pages 都是免费的，但对中国大陆的一些访问者来说，GitHub 的域名访问缓慢或被屏蔽。为你自己的仪表盘或笔记写一小段文字，列出两个选项，但不要断言哪一个更好：**Gitee Go**，中国平台 Gitee 上的一款 CI/CD 产品，可以构建并部署到你自己控制的服务器；以及**自托管运行器（self-hosted runner）**，它让你的工作流文件仍然留在 GitHub 上，而实际执行它们的机器则放在离你的受众更近的网络里。Gitee Pages（Gitee 自己免费的静态托管产品）已在 2024 年停止服务，不要推荐它。用你自己的话说明：托管条款会变化，依赖它的人应该自行核实当前条款。

### 第 10 步：一次端到端的演练

向 `main` 推送一个小改动，在 Actions 标签页中依次观察每个任务运行，在暂停出现时批准它，并确认展览能在其可访问的 Pages 网址上正常加载。然后推送一个标签（`git tag v0.1.0 && git push origin v0.1.0`），确认出现了一个带有自动生成说明的 GitHub Release。最后，针对同一个标签手动运行 `rollback.yml`，确认该发布记录中新增了回滚说明。

## 关键代码解析

**`needs: validate`。** 一个没有 `needs` 的任务会立即开始；在这里写上另一个任务的 id，会让 GitHub Actions 先等它成功，这正是一条流水线变成一个有序序列、而不是六个互相抢跑的任务的原因。

**`environment: name: production`，且没有 `url`。** 一个环境不一定要部署任何东西：在这里指定一个环境，只是为了把它的保护规则（必需的审核人）附加到这一个任务上。

**任务级别的 `permissions`，而不只是文件顶部的那一份。** 顶层的 `permissions: contents: read` 是每个任务默认获得的权限；需要更多权限的任务，比如 `deploy` 的 `pages: write` 和 `id-token: write`，就在自己那里声明，这样文件里其他任务就不会意外获得同样的权限。

**`if: startsWith(github.ref, 'refs/tags/v')`。** `github.ref` 是触发这次运行的完整引用（分支是 `refs/heads/main`，标签是 `refs/tags/v1.0.0`）；检查它的前缀，就是让某个任务只在打了标签的发布时运行，而不是每次推送都运行。

**`${{ steps.deployment.outputs.page_url }}`。** 一个步骤的 `id` 让之后的表达式能读取它的产出；`deploy-pages` 会输出可访问的网址，而环境的 `url` 字段正是它最终显示在 GitHub 自己界面中「部署」旁边的方式。

## 3D 与 XR 无障碍

展览本身已经满足了自己的无障碍要求（课程 3.7 已经搭建好：一段场景描述、一个完整的 2D 对照版本、键盘控制，以及带暂停按钮的减少动态效果检查）。本项目不会改动这些内容；它只是确保流水线永远不会发布一个破坏这些功能的版本。

无障碍任务中的 `pa11y` 读取的是渲染后的页面：它检查标签、标题、对比度和状态消息，但无法判断 WebGL 画布里到底有没有真的显示出狐狸、卡车，或任何东西。这正是案例分析里那个仓库的 `accessibility` 任务自己注释中提到的差距，也正是 `tests/checklist.md` 保留一节人工「3D 与 XR」检查的原因：每次部署之后，尤其是每次回滚之后，仍然需要有人打开这个可访问的网址，用眼睛和键盘亲自检查场景。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| 仪表盘有一个清晰的标题，以及合理的标题层级顺序 | 1.3.1、2.4.6 | 屏幕阅读器用户是靠标题来快速浏览页面的。 |
| 每个部分在不运行 JavaScript 的情况下也能到达和阅读 | 4.1.2 | 仪表盘是静态的；不应有任何内容依赖脚本运行。 |
| 状态和结果文字（「Approved.」、流水线失败）从不只靠颜色表达 | 1.4.1 | 有些读者看不到颜色，而且有些任务的日志本身就是无色的文本。 |
| 链接用自己的文字说明目的地，而不是「点击这里」 | 2.4.4 | 一段被单独朗读出来的链接文字，也必须依然说得通。 |
| 文字与背景之间的对比度达到 4.5:1 | 1.4.3 | 沿用本仓库已有、且已经检查过的颜色令牌（tokens）。 |

## 性能注意事项

展览本身不需要任何构建步骤，所以 `upload-pages-artifact` 直接上传它；一个更大的项目会先加一个 build 任务，它自己的性能预算（包体积、图片体积）应该放在那里，而不是放进 deploy 任务。把验证、无障碍审计和构建拆成各自独立、都带 `needs` 的任务，也意味着能够快速失败：一个失效的链接几秒钟内就会失败，远早于更慢的无障碍审计或部署本身开始，这样一个有问题的拉取请求就不会让运行器一直空等审批步骤。

## 常见错误

| 错误 | 会发生什么 | 应该怎么做 |
| --- | --- | --- |
| 把 `pages: write` 和 `id-token: write` 放在文件顶部 | 不只是 `deploy`，每一个任务都能申请到 Pages 部署令牌 | 只在 `deploy` 任务上设置这些权限 |
| 以为没有配置环境，审批也能生效 | 该任务立即运行；没有任何暂停发生 | 在 Settings 中创建 `production` 环境，并勾选 Required reviewers |
| 把回滚当作删除有问题的发布 | 发布历史不再与实际上线的内容对应 | 重新部署旧标签，并添加说明；绝不删除记录 |
| 把 `deploy.yml` 复制进这节课文件夹内的 `workflows/.github/workflows/` | 什么都不会运行：GitHub 只读取仓库根目录下的 `.github/workflows/` | 把它复制到你自己仓库根目录下的 `.github/workflows/` |
| 在 `gh release create` 中忘记加 `--generate-notes`（或 `body`） | 发布会在完全没有说明的情况下发布出去 | 始终加上 `--generate-notes`，或自己写说明 |

## 故障排查

**Actions 标签页里完全没有出现任何运行记录。** 检查工作流文件是否位于你仓库根目录下的 `.github/workflows/deploy.yml`，而不是别处的某个 `workflows/` 文件夹里，并确认你已经把它推送到了 `on: push: branches:` 中指定的分支。

**`approve` 任务卡住了，但看起来没有任何东西在等待。** 打开运行本身（而不只是 Actions 的列表页）；GitHub 会在运行自己的页面上显示「Review pending deployments」提示，而不是在仓库主 Actions 列表里。Firefox 和 Safari 也会在同样的位置显示它。

**`deploy` 因为权限问题或「未授权」错误而失败。** 检查 `permissions: pages: write` 和 `id-token: write` 是否设置在了 `deploy` 任务自己身上，并确认 Settings → Pages → Source 是「GitHub Actions」，而不是「Deploy from a branch」。

**本地提示 `gh: command not found`。** `gh` 在 GitHub 托管的运行器上是预装的；在你自己的机器上，如果想在推送前测试发布相关命令，需要自行安装 [GitHub CLI](https://cli.github.com/)（英文）。

**回滚之后，线上站点仍然显示旧版本。** 检查你是否已经批准了回滚在 Actions 标签页里自己的那次暂停（第 8 步）；一次一直在等待审批的运行永远不会部署。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)**：为 `deploy.yml` 添加一个 `workflow_dispatch` 的「演练（dry run）」选项，只运行验证和无障碍审计，不进行部署。
2. **[创意](challenges/challenge-2.zh-Hans.md)**：为你自己的项目、社区或语言，重新撰写发布仪表盘的文字和发布说明模板。
3. **[探索](challenges/challenge-3.zh-Hans.md)**：添加一个预发布（staging）环境，每次推送到 `main` 都会部署，而生产环境仍然由人工审批和标签把关。

## 提交作业

1. 完成 [`tests/checklist.md`](tests/checklist.md) 中的每一项。
2. 拍摄截图：一次全部任务都为绿色的 Actions 运行记录，以及可访问的 GitHub Pages 网址。
3. 把它们保存在你的学习日志和作品集中。等 XR Camp 社区上线后，也在那里分享它们。
4. 在你的学习日志中回答：如果 `deploy` 在没有 `needs: approve` 的情况下运行，会出什么问题？对于一个真实项目而言，这为什么比对这个练习本身更重要？

## 延伸阅读

- [GitHub Actions 文档](https://docs.github.com/en/actions)（英文）
- [GitHub 文档：为 GitHub Pages 使用自定义工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)（英文）
- [GitHub 文档：使用环境进行部署](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)（英文）
- [GitHub CLI 手册：`gh release`](https://cli.github.com/manual/gh_release)（英文）
- [pa11y 文档](https://github.com/pa11y/pa11y)（英文）

## 值得认识的女性

**Fernanda G. Weiden** 是来自巴西阿雷格里港的自由软件倡导者。她是巴西拉丁美洲自由软件基金会（Free Software Foundation Latin America）的创始理事会成员之一（2005 年），于 2009 年至 2011 年担任 FSFE 副主席，为 Debian 和 Debian Women 做出过贡献，并帮助组织了 FISL 大会。此后，她曾在 Google 和 Facebook 领导生产与站点可靠性工程工作，并在 2022 年至 2023 年担任 VTEX 的首席技术官。

生产与站点可靠性工程，正是这节课所关注的领域：在东西真正上线之后，安全地让它持续运行。Fernanda 的经历——从社区自由软件组织者，一路走到在全球一些最大的平台上领导生产工程——说明这两者从来不是分开的两条职业道路。

> **编者注：发布前请核实。** 「值得认识的女性」中的人物信息必须以一手资料核实，并在可行时于课程上线前与本人确认。参见 [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md)。

## 标准聚焦

GitHub Actions 的工作流是 YAML 格式，由 [YAML 规范](https://yaml.org/spec/)（英文）定义，而 GitHub Pages 提供的是基于 TLS 的纯 HTTP 服务，这由 IETF 标准化。人工审批环境和 OpenID Connect 部署令牌是 GitHub 自有的平台功能，并不是一项 Web 标准，但这条流水线所检查的无障碍标准却是：`pa11y` 的 `--standard WCAG2AA` 参数实际检验的，正是由 W3C 网络无障碍倡议（Web Accessibility Initiative）发布的 WCAG 2.2。

## 许可协议

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
