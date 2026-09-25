# 挑战 1：基础

**必做。** 约 60 分钟。

一个在小屏幕上会收起为「Menu」（菜单）按钮的导航。

## 任务

当一个网站有很多页面时，它的导航会占满手机屏幕的整个顶部。一种常见的模式是用一个 **Menu** 按钮来显示和隐藏导航。

1. 在导航列表之前，添加一个按钮：

   ```html
   <button type="button" id="menu-button" aria-expanded="false" aria-controls="main-menu" hidden>Menu</button>
   ```

   并给 `<ul>` 加上 id `main-menu`。同时在你的样式表中添加 `nav ul[hidden] { display: none; }`：否则你的 `nav ul { display: flex; }` 规则会覆盖 `hidden` 属性，菜单就永远无法关闭。

2. 在 `</body>` 之前，添加：

   ```html
   <script>
     const button = document.getElementById('menu-button');
     const menu = document.getElementById('main-menu');
     const small = matchMedia('(max-width: 40rem)');

     function setUp() {
       button.hidden = !small.matches;       // the button only exists on small screens
       menu.hidden = small.matches;          // start closed on small screens
       button.setAttribute('aria-expanded', 'false');
     }

     button.addEventListener('click', () => {
       const open = button.getAttribute('aria-expanded') === 'true';
       button.setAttribute('aria-expanded', String(!open));
       menu.hidden = open;
     });

     small.addEventListener('change', setUp);
     setUp();
   </script>
   ```

   （注释大意：这个按钮只在小屏幕上出现；在小屏幕上，菜单一开始是关闭的。）

3. 在 390 像素宽度下，用键盘和屏幕阅读器测试它，并检查在没有 JavaScript 的情况下，菜单是否就一直保持打开。

## 为什么这很重要

`aria-expanded` 告诉屏幕阅读器用户菜单是否已打开。而且因为按钮一开始是 `hidden`（隐藏）的，菜单一开始是可见的，所以即使脚本失败，导航也仍然可以使用。这又是渐进增强，这一次用在了导航上。

## 完成标准

- [ ] 在小屏幕上，菜单一开始是关闭的，按钮可以打开和关闭它。
- [ ] 在屏幕阅读器中，按钮会朗读「collapsed」（已收起）和「expanded」（已展开）。
- [ ] 在宽屏上，没有按钮，菜单始终可见。
