# Skill4Human 技术架构文档 (Architecture)

## 1. 概述
Skill4Human 是一个基于 Next.js 的智慧逆向工程展示平台。其核心逻辑是将 AI 指令（Skill）解构为人类可理解的哲学、系统、流程和战术（四层智慧塔），并合成实战剧本。

## 2. 技术栈
- **框架**: Next.js 16+ (App Router)
- **样式**: Vanilla CSS (遵循「普通人的数字权利」设计系统规范)
- **图标**: Lucide React
- **内容解析**: gray-matter (用于 Markdown 驱动的动态页面)
- **数据流**: 纯 JSON 静态编译流

## 3. 数据管线 (Data Pipeline)
项目采用“编译时同步”方案，确保前端性能与数据一致性：

1.  **原子单元 (`data/skills/*.json`)**: 存放单个技能的解析结果。
2.  **智慧集锦 (`data/collections/*.json`)**: 定义技能的组合逻辑与合成剧本。
3.  **编译同步 (`scripts/sync_data.js`)**: 
    - 遍历原子单元与集锦。
    - 聚合成 `data/wisdom_db.json` 与 `data/collections.json`。
4.  **前端消费**: `app/page.tsx` 直接导入编译后的 JSON 文件。

## 4. 内容管理 (CMS)
About 页面采用了 **Markdown-driven** 架构：
- **文件**: `content/about.md`
- **机制**: `app/about/page.tsx` 作为 Server Component，在渲染时读取并解析 MD 文件，实现内容与样式的彻底解耦。

## 5. 开发维护命令
- **启动开发环境**: `npm run dev`
- **同步数据索引**: `node scripts/sync_data.js` (当手动修改了 data 下的 json 时运行)
- **执行构建**: `npm run build`

---
© 2026 Skill4Human Engineering Team
