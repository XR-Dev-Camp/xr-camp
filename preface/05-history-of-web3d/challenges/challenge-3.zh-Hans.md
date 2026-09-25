# 挑战 3：探索

**选做。** 约 30 分钟。

在 A-Frame 中加载一个真实的 glTF 模型。

## 任务

1. 复制 `examples/aframe.html`，并把副本命名为 `examples/gltf.html`。
2. 把 `<a-box ...></a-box>` 这一行替换为：

   ```html
   <a-gltf-model src="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Duck/glTF-Binary/Duck.glb"
                 position="0 1 -3" scale="1 1 1"></a-gltf-model>
   ```

   这只鸭子是 Khronos Group 为测试 glTF 而发布的示例模型。其版权归 © Sony Computer Entertainment Inc. 所有，依据 SCEA Shared Source License 1.0 共享。如果你发布自己的页面，请在页面中注明出处。
3. 在浏览器中打开 `examples/gltf.html`。如果鸭子太大或太小，请修改 `scale`。
4. 重写它的 `scene-description`。
5. 把它作为第四个 `<figure>` 添加到你的实验室中。

## 为什么这很重要

几乎每个真实的 3D 项目都会加载别人用其他程序（例如 Blender）制作的模型。glTF 就是这些模型进入网页的途径，在你将会使用的每一个引擎中都是如此。

## 完成标准

- [ ] 鸭子出现了，而且大小合适。
- [ ] 描述与你看到的内容相符。
- [ ] 你在学习日志中记下了模型的文件大小：约 120 KB。把它和你手机里的一张照片比较一下。
