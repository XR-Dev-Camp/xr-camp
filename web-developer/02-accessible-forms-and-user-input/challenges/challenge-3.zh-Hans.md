# 挑战 3：探索

**选做。** 约 60 分钟。

构建一个会一直留在页面上的错误摘要。

## 任务

浏览器自己的错误消息很快就会消失，而且使用的是浏览器的语言。一种常见且经过充分检验的模式是**错误摘要**：位于表单顶部的一个方框，列出每一个问题，并附有指向每个字段的链接。

1. 给你的报名 `<form>` 加上 `novalidate`，这样浏览器就不再显示它自己的消息。
2. 在表单上方，添加一个空的方框：

   ```html
   <div id="error-summary" tabindex="-1" hidden>
     <h2>There is a problem</h2>
     <ul id="error-list"></ul>
   </div>
   ```

3. 在 `</body>` 之前，添加下面这段脚本。你将在课程 1.6 中学习编写这样的代码；现在，先读一读其中的注释。

   ```html
   <script>
     const form = document.querySelector('form');
     const summary = document.getElementById('error-summary');
     const list = document.getElementById('error-list');

     form.addEventListener('submit', (event) => {
       list.innerHTML = '';
       // Every required field that is empty or invalid gets a link in the summary.
       const problems = [...form.querySelectorAll('[required]')].filter((field) => !field.checkValidity());
       if (problems.length === 0) return; // All good: let the form send.

       event.preventDefault();
       for (const field of problems) {
         const label = form.querySelector(`label[for="${field.id}"]`) || field.closest('fieldset').querySelector('legend');
         const item = document.createElement('li');
         item.innerHTML = `<a href="#${field.id}">${label.textContent}</a>`;
         list.append(item);
       }
       summary.hidden = false;
       summary.focus(); // Move focus to the summary so screen readers read it.
     });
   </script>
   ```

   （注释大意：每一个为空或无效的必填字段，都会在摘要中得到一个链接；如果没有问题，就让表单提交；把焦点移到摘要上，让屏幕阅读器朗读它。）

4. 提交空表单。摘要会出现，焦点会移到它上面，每个链接都会把你带到对应的字段。

## 为什么这很重要

世界各地的政府服务都在使用这种模式，因为它对每个人都有效，包括屏幕阅读器用户和需要更多时间的人。你刚刚第一次使用 JavaScript，是为了改进 HTML 本来就能做到的事，而不是取代它。

## 完成标准

- [ ] 提交空表单时会显示摘要，并且焦点会移到它上面。
- [ ] 摘要中的每个链接都会把你带到正确的字段。
- [ ] 正确填写的表单仍然可以提交。
