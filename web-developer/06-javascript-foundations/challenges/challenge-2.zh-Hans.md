# 挑战 2：创意

**选做。** 约 45 分钟。

用你自己的语言写标签和消息。

## 任务

1. 用你的语言复制一份项目浏览器：翻译 HTML 中的标签、选项和标题，并设置 `lang`。
2. 在 `explorer.js` 的顶部，把用户能看到的每一条消息都放进一个对象里：

   ```js
   const text = {
     showing: (found, total) => `Mostrando ${found} de ${total} programas.`,
     none: 'Ningún programa coincide. Prueba con menos palabras.',
     save: (name) => `Guardar ${name}`,
   };
   ```

   然后在所有地方都使用它，而不是把消息写在各个函数里面。（上面的例子是西班牙语，你可以换成中文。）
3. 把你的项目数据也翻译过来。

## 为什么这很重要

当所有消息都集中在一个地方时，翻译整个项目浏览器就只需要修改一个对象。这就是你将在课程 6.2 中构建的国际化背后的思路。

## 完成标准

- [ ] 每一个可见的词，包括会被朗读的消息，都使用你的语言。
- [ ] 每一条消息都来自 `text` 对象。
