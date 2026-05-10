# Skill4Human 脚本工作流 (Scripts Workflow)

本项目使用一系列脚本将 AI Skills 转化为人类可用的 Wisdom Collections。

## 核心工作流 (The Core Pipeline)

1.  **Search (搜索/打捞)**
    *   **脚本**: `scripts/collect.js` 或 `scripts/mass_collect.js`
    *   **别名**: `skill4human-search`
    *   **功能**: 从 SkillHub API 打捞种子技能，生成 `data/discovery_headers.json`。
    *   **用法**: `node scripts/collect.js "关键词"`

2.  **Curate (筛选/打捞)**
    *   **脚本**: `scripts/fast_filter.js`
    *   **别名**: `skill4human-curate`
    *   **功能**: 调用 LLM 对打捞到的技能进行初步筛选，生成 `data/potential_candidates.json`。

3.  **Analyze (分析/研磨)**
    *   **脚本**: `scripts/mass_process.js`
    *   **别名**: `skill4human-analyze`
    *   **功能**: 对筛选出的技能进行深度研磨，提取 4 层智慧结构，生成 `data/skills/*.json` 原子文件。

4.  **Collection (合成/集锦)**
    *   **脚本**: `scripts/generate_collection.js`
    *   **别名**: `skill4human-collection`
    *   *功能*: 将多个 Skill 原子文件合成一个主题集锦，生成 `data/collections/*.json`。

## 辅助工具 (Utility Tools)

*   **`scripts/sync_data.js`**: **[最常用]** 将所有原子文件（Skills & Collections）同步到前端索引（`wisdom_db.js` & `collections.js`）。
*   **`scripts/download_skills.js`**: 下载远程 Skill 源码。
*   **`scripts/rebuild_full_library.js`**: 全量重建整个智慧库。

## 目录清理
过期的、实验性的或一次性的脚本已移动至 `scripts/archive/` 目录。
