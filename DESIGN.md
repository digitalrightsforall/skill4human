# Skill4Human Design Specification (v1.1)

> 基于「普通人的数字权利」母系统设计规范，针对智慧逆向工程场景进行适配。

## 1. 核心视觉语言 (Core Visuals)

### 🎨 色彩系统 (Colors)
- **Primary (#5e40e0)**: 品牌主色。用于 UI 核心元素、智慧塔顶层、关键按钮。
- **Primary-container (#c3b8ff)**: 浅紫色背景，用于徽章、次要标签。
- **Tertiary-container (#fdd400)**: 亮黄色高亮，用于“手绘下划线”强调和关键启发式金句（Heuristic）。
- **Surface Layering**: 
  - `lowest (#ffffff)`: 主要内容卡片。
  - `low (#f1f4f7)`: 页面背景。
  - `container (#eaeef3)`: 区块分割背景。

### 🖋️ 字体与排版 (Typography)
- **字体**: 统一使用 **Plus Jakarta Sans**。
- **大标题 (Headline)**: 3rem (48px), weight 800, line-height 1.1。用于 About 页面 Hero 区域。
- **章节标题 (H2)**: 2rem (32px), weight 700。
- **正文 (Body Medium)**: 1rem (16px), line-height 1.75。

## 2. 专属组件规范 (Skill-specific Components)

### 🏛️ 智慧塔 (The Wisdom Tower)
- **层级配色**:
  - **Philosophy**: `--wisdom-phi` (Primary / #5e40e0)
  - **System**: `--wisdom-sys` (Secondary / #455e93)
  - **Process**: `--wisdom-flow` (Green / #10b981)
  - **Tactic**: `--wisdom-tac` (Gold / #f59e0b)
- **视觉要求**: 层级之间通过 `gap: 2px` 保持微小的物理分割感，象征模块化构建。

### 🚀 实战剧本 (Playbook)
- **排版**: 采用列表式排版，步骤序号加粗（weight 900）。
- **启发式金句 (Heuristic)**: 必须使用 `Tertiary-container` (#fdd400) 作为背景高亮，并赋予 `border-radius: 100% 10% 80% 20%` 的手绘感。

## 3. 设计原则 (Do's & Don'ts)

### ✅ Do
- 保持足够的留白（Section Padding 至少 80px）。
- 使用 `surface-container` 变体色来区分内容块，而非生硬的边框。
- 文字层级清晰，利用字重（700 vs 400）建立阅读节奏。

### ❌ Don't
- **禁止**使用阴影（Shadows），除非是悬浮（Hover）状态下的微弱反馈。
- **禁止**在 About 页面使用生硬的卡片外框。
- **禁止**使用除 Plus Jakarta Sans 以外的任何字体。

---
Produced by **普通人的数字权利**
