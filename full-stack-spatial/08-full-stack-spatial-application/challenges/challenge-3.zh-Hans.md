# 挑战 3：探索

**进阶选做。** 约 90 分钟。

在 `server/ai.js` 中实现课程 5.6 的 `openai-compatible` 或 `local` 服务商路径，接通一个真实的接口，而不是模拟服务商。

## 任务

1. 重新阅读课程 5.6 的 `server/ai.js`（`full-stack-spatial/06-ai-for-spatial-computing/completed/server/ai.js`），了解它的 `callOpenAiShapedEndpoint` 函数，以及它的 `AI_PROVIDER`、`AI_BASE_URL`、`AI_MODEL` 和 `AI_API_KEY` 环境变量。
2. 把同样的环境变量和同样的 `callOpenAiShapedEndpoint` 函数添加到这个结业项目的 `server/ai.js` 中，并做适配，让它调用这个项目自己的 `describeScene(scene, annotations)` 形状，而不是 5.6 的 `describeScene(scene)`。
3. 从场景的名称和注释文字构建一个提示词（参见 5.6 `ai.js` 中的 `sceneDataForPrompt` 来了解这个模式），要求一份形如 `{ "description": "..." }` 的严格 JSON 回复，并用和 5.6 相同的防御性方式解析它——拒绝任何不是这个确切形状的内容。
4. 挑选一个真实的目标来测试：一个你已经有密钥的托管、兼容 OpenAI 的接口，或者一个通过 [Ollama](https://ollama.com/) 或 [LM Studio](https://lmstudio.ai/) 运行的本地模型（两者都是免费的，也都能让你的数据留在你自己的机器上）。
5. 确认模拟服务商在完全没有配置的情况下依然能正常工作——在 `AI_PROVIDER` 未设置的情况下，这个结业项目自己的测试必须继续通过。
6. 更新 `.env.example`，记录这些新的环境变量，并在这个文件夹的 README 中添加一小段文字，描述你是如何测试这个真实服务商的（指名它，并谨慎地说明它的表现如何——如果你尝试了一个面向中国大陆市场的服务商选项，参见本仓库关于这方面的风格指南）。

## 为什么重要

课程 5.6 特意把这个功能设计成不依赖特定服务商，好让一位学习者之后能够接通一个真实的模型，而不需要重写应用中的其他任何东西。这个挑战证明了这个设计确实有效：`server/ai.js` 之外的一切——验证、清理、所有权检查、客户端——应该完全不需要任何改动。

## 完成标准

- [ ] `server/ai.js` 至少支持 `openai-compatible` 或 `local` 中的一个，同时依然保留能正常工作的默认 `mock`。
- [ ] 来自真实服务商的一份格式错误的回复，会被一个清晰的错误拒绝，而绝不会被猜测处理。
- [ ] `.env.example` 记录了每一个新的变量。
- [ ] 在没有设置任何环境变量的情况下，`npm test` 依然通过（模拟路径不受你改动的影响）。
- [ ] 这个文件夹的 README 中有一小段文字，说明你尝试了哪一个真实服务商，以及效果如何。
