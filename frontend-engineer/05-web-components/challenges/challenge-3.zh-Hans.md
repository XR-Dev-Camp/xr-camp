# 挑战 3：探索

**进阶选做。** 约 60–90 分钟。

**完全不使用 JavaScript**，用声明式 shadow DOM 渲染一张卡片的 shadow root。

## 任务

1. 声明式 shadow DOM 让你可以直接在 HTML 中写出一个 shadow root：把一个 `<template shadowrootmode="open">` 作为该元素的第一个子元素。浏览器会在解析页面的过程中把它附加上去。这是 HTML Standard 的一部分，目前各主流浏览器的最新版本都支持它。用这种方式写一张卡片，并带上一个稍后会用到的 `prerendered` 类：

   ```html
   <lesson-card class="prerendered" lesson-title="Web Components" minutes="600" status="ready">
     <template shadowrootmode="open">
       <style>/* the card's styles */</style>
       <article part="card">
         <h3 part="heading">Web Components</h3>
         …
         <slot name="description"></slot>
       </article>
     </template>
     <p slot="description">Build your own HTML elements.</p>
   </lesson-card>
   ```

2. 关闭 JavaScript（或者把脚本注释掉），重新加载页面。它的插槽依然能正常工作，但卡片的样式并不完整：你在 TODO 9 中写的 `lesson-card:not(:defined)` 规则也依然会匹配到它（在没有 JavaScript 的情况下，这个元素永远不会被定义），所以它会多出一个方框，标题也会显示两次——一次来自你写的声明式 `<h3>`，一次来自 `attr(lesson-title)`。缺了什么？
3. 通过把预渲染的卡片排除在那条规则之外来修复它：把 `lesson-card:not(:defined)` 和 `lesson-card:not(:defined)::before` 改成 `lesson-card:not(:defined):not(.prerendered)`，在仍然关闭 JavaScript 的情况下重新加载。多余的方框和第二个标题都消失了。
4. 现在让这个类和它配合起来工作。在构造函数中，如果已经存在一个 root 就直接使用它，只有在不存在时才复制模板：

   ```js
   const root = this.shadowRoot ?? this.attachShadow({ mode: 'open' });
   if (!root.hasChildNodes()) root.append(template.content.cloneNode(true));
   ```

   重新打开 JavaScript：按钮现在能正常工作了，而且内容也不会闪烁切换。
5. 在你的学习日志中回答：什么时候你会选择把 shadow root 写在 HTML 里，什么时候你会让 JavaScript 来构建它？考虑一下慢速网络的情况，以及你要为每张卡片重复多少 HTML 代码。

## 为什么这很重要

声明式 shadow DOM 让服务器可以把完成的组件以纯 HTML 的形式发送出去，这样它们在任何 JavaScript 运行之前就已经出现了。这是渐进增强又向前迈进的一步，也是一些框架在服务器端渲染 Web Components 的方式。

## 完成标准

- [ ] 在关闭 JavaScript 的情况下，有一张卡片能正确渲染并带有样式。
- [ ] 打开 JavaScript 后，同一张卡片的「完成」按钮能正常工作，并触发 `lesson-toggle`。
- [ ] `main.js` 创建的卡片依然和之前一样正常工作。
- [ ] 你的学习日志中有第 5 步的回答。
