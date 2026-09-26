# 挑战 1：基础

**必做。** 约 45 分钟。

给展览添加第三个真实的 glTF 模型，放在它自己的展台上。

## 任务

1. 浏览 [Khronos glTF-Sample-Assets](https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models)（英文）仓库，选择一个小于 1 MB 的模型（下载前先在 GitHub 上查看它 `glTF-Binary` 文件夹的文件大小）。
2. 打开它的 `LICENSE.md` 文件，完整阅读一遍。记下确切的许可证类型（CC0、CC BY，或其他），以及美术师的名字。
3. 把它的 `.glb` 文件下载到 `assets/` 中，并检查 `assets/` 是否依然远低于本项目的预算（参见 [`docs/en/3d-assets-and-versions.md`](../../../docs/en/3d-assets-and-versions.md)（英文））。
4. 在 `exhibit.js` 的 `ITEMS` 中添加第六条记录：一个 `id`、一个 `name`、`kind: 'model'`、它的 `file` 路径、一个位于牛奶卡车之后的 `x` 位置（试试 `5.2`）、一段 `note`，以及根据它 `LICENSE.md` 实际内容撰写的 `credit`、`licenseUrl`、`licenseLabel` 和 `sourceUrl`——不要照搬本项目狐狸或牛奶卡车的署名文字，只改一下名字。
5. 把它的署名信息添加到 `ATTRIBUTION.md` 中。
6. 重新加载页面。你的第三个模型应该出现在它自己的展台上，正确加载，能通过点击和自己的「选择」按钮选中，并出现在署名面板中——所有这一切都不需要在代码中的任何地方为它专门写一段特殊处理。

## 为什么这很重要

本项目中其他每一件物品都是数据驱动的：`describeExhibit()`、`renderItemList()`、`renderAttribution()` 和「选择」按钮，读取的都是 `ITEMS`，而不是一份手写的「狐狸和卡车」列表。正确地添加第六件物品，且不需要手写任何其他代码，正是证明本项目把数据和代码分离的做法确实有效的方式，而不仅仅对它自带的那两件物品有效。

## 完成标准

- [ ] 第三个模型立在它自己的展台上，正确加载，并且可以被选中。
- [ ] 它的许可证和署名信息，读取自它真实的 `LICENSE.md`，出现在页面和 `ATTRIBUTION.md` 中。
- [ ] 没有任何一个函数为了这个模型的名字而被专门修改过。
