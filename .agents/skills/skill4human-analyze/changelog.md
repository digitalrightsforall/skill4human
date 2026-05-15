# Changelog: Skill4Human-Analyze Engine

所有关于“智慧逆向工程”引擎的迭代记录。

## [v4.7.0] - 2026-05-15
### Added
- **Markdown-as-Truth (MaT)**: 迁移 Source of Truth 从 JSON 到 Markdown，支持长文本叙事与复杂排版。
- **Cognitive Patching Engine**: 引入 `[启发式准则]`、`[反面模式]`、`[认知增益]` 等认知补丁标签。
- **Physical Filtering Logic**: 前端实现自动剥离技术标签并渲染为“翡翠绿卡片”的逻辑。
- **Batch Wisdom Injection**: 实现了针对 138 个技能的全量 v4.7 智慧注入。

### Changed
- **Hierarchy Refactor**: 强制执行 5 层逆向架构：Timing -> Philosophy -> System -> Workflow -> Tactic。
- **Rendering Optimization**: 解决了 React 在嵌套 Markdown 列表时的 Hydration 错误。
- **Sync Pipeline**: 升级 `sync_data.js`，支持从 Markdown 自动提取结构化数据并注入 JSON 数据库。

---

## [v4.5.0] - 2026-05-10
### Added
- **Wisdom Patch System v1**: 初步尝试在 JSON 中加入 `wisdom_patch` 字段。
- **Expert Profile Integration**: 开始将作者背景与技能逻辑进行深度绑定。

### Changed
- **JSON Schema Upgrade**: 增加了对 `category` 和 `author` 字段的严格校验。

---

## [v4.0.0] - 2026-05-01
### Added
- **Atomic Skill Foundation**: 确立了单体技能的原子化结构。
- **Basic reverse engineering**: 提出了基础的“逆向工程”分析框架，取代了单纯的提示词展示。

---

**Produced by Skill4Human Engineering Team**
