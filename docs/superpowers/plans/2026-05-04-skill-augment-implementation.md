# SkillAugment Implementation Plan (Focused Test)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个自动化的数据管道，从 SkillHub 抓取 Writing 和 Project Management 领域的 Skill，并利用本地 humanize-skill 逻辑提取智慧模型。

**Architecture:** 
1. **Collector**: Node.js 脚本通过 API 获取指定类别的 Skill 详情。
2. **Analyzer**: 调用本地 humanize-skill 逻辑（Philosophy/System/Workflow/Tactic）处理原始指令。
3. **Frontend**: Next.js 14 静态展示，支持按类别筛选和智慧评分排序。

**Tech Stack:** Next.js 14, Node.js, Gemini 2.0+ (via Humanize Skill)

---

### Task 1: 初始化项目结构与 Collector

**Files:**
- Create: `scripts/collect.js`
- Create: `data/.gitkeep`

- [ ] **Step 1: 创建采集脚本 `scripts/collect.js`**

```javascript
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const CATEGORIES = ['Writing', 'Project Management'];
const API_BASE = 'https://www.skillhub.club/api/v1';

async function fetchSkills() {
    let allSkills = [];
    for (const cat of CATEGORIES) {
        console.log(`Fetching category: ${cat}...`);
        try {
            const res = await axios.get(`${API_BASE}/skills/catalog`, {
                params: { category: cat, limit: 20, sort: 'score' }
            });
            allSkills = allSkills.concat(res.data.data || []);
        } catch (err) {
            console.error(`Error fetching ${cat}:`, err.message);
        }
    }
    
    const dataDir = path.join(__dirname, '../data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
    
    fs.writeFileSync(
        path.join(dataDir, 'raw_skills.json'),
        JSON.stringify(allSkills, null, 2)
    );
    console.log(`Saved ${allSkills.length} skills to data/raw_skills.json`);
}

fetchSkills();
```

- [ ] **Step 2: 运行采集脚本并验证输出**

Run: `node scripts/collect.js`
Expected: `data/raw_skills.json` 包含约 40 个来自两个类别的 Skill 数据。

- [ ] **Step 3: Commit**

```bash
git add scripts/collect.js data/raw_skills.json
git commit -m "feat: add skill collector and initial raw data"
```

---

### Task 2: 智慧解析器 (Analyzer) - 集成 Humanize 逻辑

**Files:**
- Create: `scripts/analyze.js`
- Modify: `docs/superpowers/specs/2026-05-04-skill-augment-design.md` (Update schema if needed)

- [ ] **Step 1: 编写 `scripts/analyze.js`**
该脚本将遍历 `raw_skills.json`，并将内容喂给 AI，要求其严格按照 `humanize-skill` 的四层架构进行输出。

```javascript
const fs = require('fs');
const path = require('path');
// 假设这里通过 SDK 调用 Gemini 2.0
const { analyzeWithAI } = require('./ai-helper'); 

async function runAnalysis() {
    const rawData = JSON.parse(fs.readFileSync('data/raw_skills.json', 'utf8'));
    const wisdomDB = [];

    for (const skill of rawData) {
        console.log(`Analyzing wisdom for: ${skill.name}`);
        const insight = await analyzeWithAI(skill.skill_description, {
            mode: 'humanize',
            prompt: '提取该 Skill 中的 [工作哲学], [思维模型], [工作思路], [最佳实践]。'
        });
        
        wisdomDB.push({
            id: skill.id,
            name: skill.name,
            category: skill.category,
            wisdom: insight,
            score: calculateWisdomScore(insight) // 自定义打分逻辑
        });
    }

    fs.writeFileSync('data/wisdom_db.json', JSON.stringify(wisdomDB, null, 2));
}
```

- [ ] **Step 2: 运行分析并检查数据质量**

Run: `node scripts/analyze.js`
Expected: `data/wisdom_db.json` 中的每个条目都有清晰的 Philosophy/System 分层。

---

### Task 3: 静态 Web 展现层 (Frontend)

**Files:**
- Create: `app/page.tsx`
- Create: `components/WisdomCard.tsx`

- [ ] **Step 1: 编写首页，集成筛选功能**

```typescript
// app/page.tsx
import wisdomData from '../data/wisdom_db.json';

export default function Home() {
  return (
    <main>
      <h1>SkillAugment: 智慧增强中心</h1>
      <div className="filter-bar">
        {/* 分类筛选按钮: Writing | Planning */}
      </div>
      <div className="grid">
        {wisdomData.map(item => <WisdomCard key={item.id} data={item} />)}
      </div>
    </main>
  );
}
```

- [ ] **Step 2: 构建智慧详情组件**
展示 `humanize-skill` 的四层架构图。

---

### Task 4: 部署自动化 (GitHub Actions)

- [ ] **Step 1: 创建 `.github/workflows/deploy.yml`**
- [ ] **Step 2: 配置 GitHub Pages 静态导出**
