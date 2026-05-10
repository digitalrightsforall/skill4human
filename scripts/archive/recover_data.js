import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const WISDOM_KEYWORDS = ['strategy', 'model', 'philosophy', 'principle', 'logic', 'thinking', 'mindset', 'planning', 'manage', 'review', 'expert', 'quality', 'audit', 'best practice'];
const EXCLUDE_KEYWORDS = ['convert', 'extract', 'api', 'wrapper', 'downloader', 'cli', 'format', 'scrape', 'mineru', 'map'];

function generateHumanizedContent(name, desc) {
    const philosophy = desc.split(/[。!.？?]/)[0] || "追求在该领域的专业直觉与逻辑深度。";
    const system = desc.includes('use') || desc.includes('使用') ? `建立一套针对${name}的结构化处理模型。` : `通过对${name}的深度解析，构建一套动态的反应机制。`;
    const workflow = `1. 场景研判：识别问题的核心矛盾。 2. 逻辑介入：应用${name}核心规则。 3. 复盘优化：验证方案的可行性。`;
    const tactic = `注重细节约束，杜绝任何偏离核心目标的动作。`;

    return [
        { type: "Philosophy", title: "核心哲学", content: philosophy + "。其本质是追求在特定场景下的最优解。" },
        { type: "System", title: "思维模型", content: system + " 核心在于理解各要素之间的关联性。" },
        { type: "Workflow", title: "研习路径", content: workflow },
        { type: "Tactic", title: "实战指南", content: tactic }
    ];
}

async function recoverData() {
    console.log('🔄 Recovering and DEDUPLICATING data...');
    const headers = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/discovery_headers.json'), 'utf8'));
    
    // 使用 Map 进行 ID 去重
    const uniqueMap = new Map();
    
    headers.forEach(s => {
        if (!s.id) return;
        const text = `${s.name} ${s.description || ''}`.toLowerCase();
        const hasWisdom = WISDOM_KEYWORDS.some(kw => text.includes(kw));
        const isTool = EXCLUDE_KEYWORDS.some(kw => text.includes(kw));
        
        if (hasWisdom && !isTool && s.description) {
            // 如果 ID 已存在，后来的会覆盖前者，确保唯一
            uniqueMap.set(s.id, s);
        }
    });

    const validSkills = Array.from(uniqueMap.values());
    console.log(`Found ${validSkills.length} unique wisdom skills.`);

    const finalDB = validSkills.map(skill => {
        const desc = skill.description_zh || skill.description;
        return {
            id: skill.id,
            name: skill.name,
            category: skill.category || '综合思维',
            repo_url: skill.repo_url,
            skillhub_url: `https://www.skillhub.club/skills/${skill.slug}`,
            wisdom: {
                score: Math.min(99, Math.round((skill.composite_score || 7.5) * 10)),
                human_gain: `通过研习${skill.name}，你将获得在该领域极具穿透力的决策逻辑。`,
                layers: generateHumanizedContent(skill.name, desc)
            },
            tags: skill.tags || ["智慧"]
        };
    });

    fs.writeFileSync(path.join(__dirname, '../data/wisdom_db.json'), JSON.stringify(finalDB, null, 2));
    fs.writeFileSync(path.join(__dirname, '../data/wisdom_db.js'), `export const wisdomData = ${JSON.stringify(finalDB, null, 2)};`);
    
    console.log(`✅ Success! ${finalDB.length} unique skills restored. No duplicate IDs.`);
}

recoverData();
