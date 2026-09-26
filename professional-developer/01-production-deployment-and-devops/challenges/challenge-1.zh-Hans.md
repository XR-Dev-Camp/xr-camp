# 挑战 1：基础

**必做。** 约 45 分钟。

添加一种安全的方式，用来测试流水线的前几个任务，而完全不会触及部署。

## 任务

1. 在你自己那份 `deploy.yml` 里，给 `workflow_dispatch` 添加第二个触发输入项：一个布尔值 `dry_run`，默认值为 `false`。
2. 给 `build`、`approve` 和 `deploy` 这三个任务加上 `if: github.event.inputs.dry_run != 'true'`，让演练（dry run）在 `accessibility` 之后就停下来。
3. 手动运行一次该工作流，把 `dry_run` 设为 `true`，并在 Actions 标签页中确认只运行了 `validate` 和 `accessibility`。
4. 再运行一次，把 `dry_run` 设为 `false`（或保留其默认值），确认完整的流水线像之前一样正常运行。

## 为什么这很重要

一个真实的团队会经常修改流水线：新增一项检查、换一个 Node 版本、给某个任务改名。能够安全地测试这样的改动，而不需要一次真正的部署，也不用等别人来批准，正是团队能够放心而不是害怕地改进流水线的原因。

## 完成标准

- [ ] `dry_run` 作为 `workflow_dispatch` 的输入项存在，并有一个合理的默认值。
- [ ] 一次演练明显会在 `build` 之前停止。
- [ ] 一次正常运行仍然会完成整条流水线。
