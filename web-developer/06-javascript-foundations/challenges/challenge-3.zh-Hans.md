# 挑战 3：探索

**选做。** 约 45 分钟。

按日期或名称对结果排序。

## 任务

1. 在筛选条件中添加一个带标签的 `<select id="sort">`，选项为「Name (A to Z)」（名称，A 到 Z）和「Day」（日期）。
2. 给每个项目加一个 `dayOrder` 数字（星期一是 1，星期日是 7；「Weekdays」（工作日）是 1）。
3. 在画卡片之前，对筛选后的数组排序：

   ```js
   found.sort((a, b) => a.name.localeCompare(b.name));   // by name
   found.sort((a, b) => a.dayOrder - b.dayOrder);         // by day
   ```

4. `localeCompare` 会按照语言规则对文字排序，所以带重音符号的字母也能排在合理的位置。排序结果取决于语言，所以要传入一种语言：`a.name.localeCompare(b.name, 'es')`，中文则用 `'zh'`。

## 为什么这很重要

排序是人们最常希望对列表做的事情之一，而带比较函数的 `sort` 是 JavaScript 中最有用的工具之一。

## 完成标准

- [ ] 排序控件有标签，并且可以用键盘操作。
- [ ] 两种排序都正确，筛选也仍然有效。
