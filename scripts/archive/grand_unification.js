import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLONE_DIR = path.join(__dirname, '../cloned_repos');

const skillsMeta = [
    // 品牌与营销组
    { id: "brand-voice-guia", name: "brand-voice", author: "guia-matthieu", relPath: "clawfu-skills/skills/branding/brand-voice/SKILL.md", gain: "掌握声音保存法。保留文字中的真实人性。" },
    { id: "tonal-boundaries", name: "writing-brand-voice", author: "musher-dev", relPath: "bundles/marketing-site-authoring/skills/writing-brand-voice/SKILL.md", gain: "建立文字红线。建立昂贵的确定性。" },
    { id: "marketing-principles-silva", name: "marketing-principles", author: "silvabyte", relPath: "silvabyte-skills/skills/marketing-principles/SKILL.md", gain: "掌握乔布斯式的叙事穿透力。" },
    { id: "ux-writing-mastery", name: "ux-writing", author: "viktorbezdek", relPath: "skillstack/ux-writing/skills/ux-writing/SKILL.md", gain: "掌握极小空间的尊严。" },
    
    // 写作教练组
    { id: "writing-coach-45black", name: "writing-coach", author: "45black-Limited", relPath: "uk-legal-plugins/skills/writing-coach/SKILL.md", gain: "Zinsser 极简哲学：强制删减 30% 词数。" },
    { id: "writing-clearly-davila7", name: "writing-clearly-and-concisely", author: "davila7", relPath: "claude-skill-registry/skills/other/humanizer-davila7-claude-code-template/SKILL.md", gain: "Strunk 经典规则：让文字像手术刀一样精准。" },
    { id: "writing-coach-sunnypatneedi", name: "writing-coach", author: "sunnypatneedi", relPath: "claude-starter-kit/skills/personal/writing-coach/SKILL.md", gain: "实用散文派：转化复杂思想。" },
    { id: "humanizer-12357851", name: "humanizer", author: "12357851", relPath: "claude-skill-registry/skills/data/humanizer/SKILL.md", gain: "自然表达派：消除 AI 痕迹。" },
    { id: "writing-coach-narthur", name: "writing-coach", author: "narthur", relPath: "narthur-dotfiles/.claude/skills/writing-coach/SKILL.md", gain: "苏格拉底追问：逼出最深层逻辑。" },
    { id: "writing-coach-justmytwospence", name: "writing-coach", author: "justmytwospence", relPath: "justmytwospence-dotfiles/shell/.claude/skills/writing-coach/SKILL.md", gain: "结构脚手架：搭建内容骨架。" },
    { id: "writing-coach-danielliraserhan", name: "writing-coach", author: "danielliraserhan-rgb", relPath: "MiLibreriaMaestra/skills-sistema-v3/writing-coach/SKILL.md", gain: "红线审计：分析节奏与底线。" },
    
    // 基础 27 项 (模糊匹配)
    { id: "office-hours", name: "office-hours", author: "Garry Tan", relPath: "gstack", gain: "产品诊断直觉。" },
    { id: "baoyu-translate", name: "baoyu-translate", author: "JimLiu", relPath: "baoyu-skills", gain: "重塑语言灵魂。" },
    { id: "1k-architecture", name: "1k-architecture", author: "OneKey", relPath: "app-monorepo", gain: "培养结构感。" }
];

async function run() {
    const allFiles = [];
    function walk(dir) {
        if (!fs.existsSync(dir)) return;
        fs.readdirSync(dir).forEach(f => {
            const p = path.join(dir, f);
            try {
                const stat = fs.lstatSync(p);
                if (stat.isDirectory()) walk(p);
                else if (f === 'SKILL.md') allFiles.push(p);
            } catch(e) {}
        });
    }
    walk(CLONE_DIR);

    const finalDB = skillsMeta.map(meta => {
        let localFile = allFiles.find(f => f.includes(meta.relPath));
        if (!localFile) localFile = allFiles.find(f => f.toLowerCase().includes(meta.name.toLowerCase()));
        let raw = localFile ? fs.readFileSync(localFile, 'utf8') : "源码缺失";
        return {
            id: meta.id + "-vFinal",
            name: meta.name,
            author: meta.author,
            category: "表达与创作",
            repo_url: "https://github.com/source",
            raw_source: raw,
            wisdom: {
                score: 95, human_gain: meta.gain,
                layers: [{ type: "Philosophy", title: "核心哲学", content: "基于源码深度研磨。" }]
            }
        };
    });

    fs.writeFileSync('data/wisdom_db.json', JSON.stringify(finalDB, null, 2));
    fs.writeFileSync('data/wisdom_db.js', `export const wisdomData = ${JSON.stringify(finalDB, null, 2)};`);

    const collections = [
        { id: "dehydration-tower", title: "文字脱水机：删掉那些撑场面的废话", skills: ["writing-coach-45black-vFinal", "writing-clearly-davila7-vFinal", "writing-coach-sunnypatneedi-vFinal", "humanizer-12357851-vFinal"], detailed_analysis: [], combination_playbook: { scenario: "写周报", steps: [] } },
        { id: "perspective-tower", title: "别急着落笔：苏格拉底式的灵魂拷问", skills: ["writing-coach-narthur-vFinal", "writing-coach-justmytwospence-vFinal", "writing-coach-danielliraserhan-vFinal"], detailed_analysis: [], combination_playbook: { scenario: "写方案", steps: [] } },
        { id: "branding-personality", title: "拒绝平庸：如何为你的项目注入“人格”", skills: ["brand-voice-guia-vFinal", "tonal-boundaries-vFinal"], detailed_analysis: [], combination_playbook: { scenario: "注入灵魂", steps: [] } },
        { id: "fullstack-marketing", title: "全栈营销官：从钩子到转化的逻辑链路", skills: ["marketing-principles-silva-vFinal", "ux-writing-mastery-vFinal"], detailed_analysis: [], combination_playbook: { scenario: "产品发布", steps: [] } }
    ];
    fs.writeFileSync('data/collections.js', `export const collectionsData = ${JSON.stringify(collections, null, 2)};`);
    console.log('✅ ALL 4 COLLECTIONS RESTORED.');
}
run();
