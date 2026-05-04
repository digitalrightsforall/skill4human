# Design Spec: SkillAugment (智慧增强中心)

**Date:** 2026-05-04  
**Status:** Draft  
**Goal:** 通过扫描和分析 AI Skill，提取其中凝结的人类专家经验（思维模型、工作哲学、最佳实践），将其反向映射给人类，实现 AI 时代的人类能力增强 (Human Augmentation)。

---

## 1. 核心理念 (Philosophy)

Skill 不仅仅是自动化的工具，它们是人类专家经验的“代码化”表现。SkillAugment 的核心任务是**打破黑盒**：将机器可执行的 `if-then` 逻辑重新翻译为人类可理解、可学习的智慧模型，让工具的使用者在自动化任务的同时，也获得自我的进化。

---

## 2. 系统架构 (Architecture)

采用 **Batch-to-Static (一次性生成，静态分发)** 架构，确保部署简单且访问极速。

### 2.1 生产流水线 (Generation Pipeline)
1. **Data Acquisition (数据获取)**: 
   - 扫描本地 `~/.agents/skills/` 目录。
   - 爬取指定的 SkillHub 或 GitHub 仓库。
2. **AI Analysis (AI 深度分析引擎)**:
   - **模型**: 指定使用 Gemini 2.0 Flash/Pro 或更高版本（或 Claude 3.5 Sonnet）。
   - **第一阶段 (粗筛)**: 过滤掉纯协议适配、原子工具、低复杂度脚本。
   - **第二阶段 (打分与提取)**: 评估“人类可学习度”，提取 [工作哲学]、[思维模型]、[最佳实践]。
3. **Static DB Generation (静态库生成)**:
   - 将分析结果汇总为 `data.json`。
   - 按能力维度（Writing, Logic, Strategy, Engineering, etc.）进行预分类。

### 2.2 交付层 (Delivery Layer)
- **Frontend**: Next.js 14+ (Static Site Generation)。
- **Deployment**: GitHub Pages / Vercel (0 成本维护)。
- **Interactivity**: 纯前端搜索与过滤（基于静态 JSON）。

---

## 3. AI 评估模型 (The Scoring Logic)

利用顶级 AI 模型对 Skill 文档进行以下维度的扫描：

| 维度 | 权重 | 评估依据 |
| :--- | :--- | :--- |
| **主观经验密度** | 40% | 是否包含对“质量”、“价值”、“偏好”的非标准判断逻辑？ |
| **思维模型深度** | 30% | 是否引用或构建了处理复杂问题的框架（如 5-Whys, 科学方法论）？ |
| **逻辑可迁移性** | 20% | 剥离代码后，这套逻辑是否能帮助人类在现实生活中解决同类问题？ |
| **反直觉启发性** | 10% | 是否提供了非显而易见的专家直觉（Heuristics）？ |

---

## 4. 产品功能 (Core Features)

### 4.1 Wisdom Navigation (能力图谱)
- 提供 4-6 个顶层能力维度：
  - **✍️ 表达与创作**: 对应翻译、润色、格式化类 Skill。
  - **🧠 决策与评审**: 对应 Review、Investigate、Plan 类 Skill。
  - **🛠️ 架构与系统**: 对应 CSO、Security、Infrastructure 类 Skill。
  - **🤝 协作与组织**: 对应 Lark-workflow、Team 类 Skill。

### 4.2 Intelligence Search (自然语言搜索)
- 用户输入：“我如何提高决策的严密性？”
- 系统匹配并展示：`plan-eng-review` 后的对抗性评审哲学。

### 4.3 Community Wisdom Feed (社区推荐)
- 静态展示一系列“最值得反向学习的 Skill”列表。

### 4.4 Humanized Detail Page (人类视角的详情页)
- **不再是 API 说明**，而是由 `humanize-skill` 驱动的知识树。
- 展示该 Skill 如何改变你的思维方式。

---

## 5. 技术实现步骤 (Technical Implementation)

### 5.1 第一阶段：整体列表获取 (Discovery & Registry)
*   **任务**: 建立一个全量 Skill 的注册表。
*   **逻辑**: 
    - 脚本遍历本地目录及 GitHub 特定 Organization 的仓库列表。
    - 提取基本 Meta 数据：`name`, `version`, `author`, `repository_url`, `description`。
    - 产出：`registry.json`（初始索引）。

### 5.2 第二阶段：单体深度解析 (Deep Extraction & AI Insight)
*   **任务**: 将原始 Markdown 指令转化为结构化智慧数据。
*   **逻辑**:
    - **读取**: 对注册表中的每个 Skill，获取其 `SKILL.md` 指令内容。
    - **评估**: 调用 Gemini 2.0+ 模型。
        - **Input**: `SKILL.md` + 示例输出。
        - **Prompt**: 要求模型识别其中的“非显性知识（Tacit Knowledge）”。
        - **Output**: 按照 [工作哲学/思维模型/工作思路/最佳实践] 四层结构输出 JSON。
    - **打分**: 自动生成 0-100 的“人类可学习度”分值。
    - 产出：每个 Skill 对应一个 `insight.json`。

### 5.3 第三阶段：智慧库重组与索引 (Synthesis & Indexing)
*   **任务**: 构建前端可直接调用的静态数据库。
*   **逻辑**:
    - **聚合**: 将数以百计的 `insight.json` 合并为一个压缩后的 `master_wisdom.json`。
    - **索引化**: 
        - 建立能力维度索引（例如：`AbilityMap["Writing"] = ["skill-a", "skill-b"]`）。
        - 建立打分排行榜索引。
    - **静态生成**: 触发 Next.js 的导出任务，将上述数据注入静态页面。
    - 产出：完全静态化的 GitHub Pages 站点。

---

## 6. 核心数据结构 (Data Schema)
```json
{
  "skill_id": "gstack-investigate",
  "meta": { "author": "gstack", "category": "Decision" },
  "wisdom": {
    "score": 95,
    "philosophy": "不求速修复，必求本因 (Root Cause First)",
    "mental_model": ["五问法", "排除法"],
    "human_gain": "建立严谨的科学实验思维"
  },
  "tags": ["Debug", "Strategy", "Logic"]
}
```

---

## 6. 安全与隐私

- **本地优先**: 扫描过程可在本地完成。
- **只读分析**: 仅提取文档说明信息，不涉及用户私有数据。

---

## 7. 下一步行动 (Roadmap)

1. [ ] 编写 AI 评估 Prompt 模板 (针对 Gemini 2.0 优化)。
2. [ ] 编写数据扫描与静态文件生成脚本。
3. [ ] 搭建 Next.js 静态站点模板。
4. [ ] 部署至 GitHub Pages。
