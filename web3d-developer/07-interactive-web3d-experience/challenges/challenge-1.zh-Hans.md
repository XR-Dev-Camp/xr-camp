# 挑战 1：基础

**必做。** 约 45 分钟。

完成六个编号的 TODO，让信息面板和性能预算检查都能正常工作。

## 任务

1. 在 `starter/index.html` 中，完成 TODO 1：在「3. Info panel」内部添加 `#info-panel` 容器。
2. 在 `starter/index.html` 中，完成 TODO 2：在「5. Performance budget」内部添加 `#budget-calls`、`#budget-triangles` 和 `#budget-result` 元素。
3. 在 `starter/js/main.js` 中，完成 TODO 3：编写 `renderInfoPanel(item)`。
4. 完成 TODO 4：在 `selectItem()` 中调用它。
5. 完成 TODO 5：添加 `BUDGET` 常量，并在 `updateStats()` 内部进行实时比较。
6. 完成 TODO 6：在展览重新加载时清空信息面板。
7. 完成 [`../tests/checklist.md`](../tests/checklist.md)，包括「3D 与 XR（手动）」这一节。

## 为什么这很重要

一个只有鼠标和指针用户才能探索的展览，或者一个从不说明自己是否快到可以发布的展览，都还没有准备好发布。信息面板和预算检查是这个毕业项目在第 3.1-3.6 课的引擎之上，自己所做出的贡献：虽然不大，但正是它们把一个能运行的演示，变成了一个别人能够阅读、信任并复用的项目。

## 完成标准

- [ ] 选中任意一件展品，都会打开它的信息面板，显示正确的详情。
- [ ] 性能预算数字实时更新，并说明展览是否在预算范围之内。
- [ ] [`../tests/checklist.md`](../tests/checklist.md) 中的每一项都已勾选。
- [ ] 浏览器控制台没有显示任何错误。
