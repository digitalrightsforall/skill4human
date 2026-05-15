import fs from 'fs';
import path from 'path';

const SKILLS_DIR = 'data/skills';
const COLS_DIR = 'data/collections';

const skills = fs.readdirSync(SKILLS_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(fs.readFileSync(path.join(SKILLS_DIR, f), 'utf8')));

const collections = [
    {
        id: "writing-mastery",
        title: "表达与创作：重塑语言灵魂",
        description: "从 Zinsser 的极简主义到宝玉的叙事穿透力，掌握让文字“呼吸”的艺术。",
        skills: [
            "baoyu-translate",
            "baoyu-format",
            "baoyu-comic",
            "storytelling"
        ]
    },
    {
        id: "engineering-quality",
        title: "工程质量：不仅仅是跑通",
        description: "OneKey 的工程实践与架构思维，建立对认知摩擦的零容忍。",
        skills: [
            "1k-architecture",
            "1k-code-quality",
            "1k-error",
            "1k-coding",
            "1k-perf"
        ]
    },
    {
        id: "decision-making",
        title: "决策与评审：YC 的产品直觉",
        description: "获得 Garry Tan 的诊断眼光，用 OKR 与复盘机制驱动组织的确定性增长。",
        skills: [
            "office-hours",
            "okr-gen",
            "1k-retro",
            "outline-refiner"
        ]
    },
    {
        id: "leadership-org",
        title: "领导与组织：资产化的人才观",
        description: "像经营资产一样经营人才库，从执行者到赋能者的思维飞跃。",
        skills: [
            "recruiting",
            "leadership",
            "partner"
        ]
    }
];

// Clean up old collections
if (fs.existsSync(COLS_DIR)) {
    fs.readdirSync(COLS_DIR).forEach(f => fs.unlinkSync(path.join(COLS_DIR, f)));
} else {
    fs.mkdirSync(COLS_DIR, { recursive: true });
}

// Write new collections
collections.forEach(col => {
    fs.writeFileSync(path.join(COLS_DIR, `${col.id}.json`), JSON.stringify(col, null, 2));
});

console.log(`✅ Rebuilt ${collections.length} real collections based on available skills.`);
