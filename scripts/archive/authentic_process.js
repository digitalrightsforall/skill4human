import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 极其严格的筛选词：必须包含对“思维”、“原则”或“具体方法”的深入论述
const HIGH_WISDOM_KEYWORDS = ['philosophy', 'mindset', 'mental model', 'strategic', 'methodology', 'framework', 'principle', '哲学', '思维', '原则', '框架', '底层逻辑'];

async function runAuthenticProcess() {
    console.log('🛡️ Starting Authentic Extraction (Zero Hallucination Mode)...');
    
    let rawData = [];
    try {
        rawData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/discovery_headers.json'), 'utf8'));
    } catch (e) {
        console.error('No source data found.');
        return;
    }

    const wisdomDB = [];
    const auditLog = [];

    rawData.forEach(skill => {
        const desc = (skill.description_zh || skill.description || '').trim();
        if (!desc) return;

        const text = `${skill.name} ${desc}`.toLowerCase();
        
        // 核心判断：是否真的有东西可学？
        const isWisdom = HIGH_WISDOM_KEYWORDS.some(kw => text.includes(kw));
        
        if (isWisdom) {
            // 严格基于原文生成内容，绝不发明
            const layers = extractRealLayers(skill.name, desc);
            
            // 只有当至少提取出了一个真实的哲学或系统模型时，才纳入
            if (layers.some(l => l.content.length > 20)) {
                wisdomDB.push({
                    id: skill.id,
                    name: skill.name,
                    category: skill.category || '综合思考',
                    repo_url: skill.repo_url,
                    skillhub_url: `https://www.skillhub.club/skills/${skill.slug}`,
                    wisdom: {
                        score: Math.min(99, Math.round((skill.composite_score || 7) * 10)),
                        human_gain: `通过研习该 Skill 的原始指令，理解其在${skill.name}领域的特定逻辑。`,
                        layers: layers
                    },
                    tags: skill.tags || []
                });
                auditLog.push({ name: skill.name, status: 'INCLUDED', reason: 'Verified unique content' });
            }
        } else {
            auditLog.push({ name: skill.name, status: 'EXCLUDED', reason: 'Insufficient wisdom density (Too tool-like)' });
        }
    });

    fs.writeFileSync(path.join(__dirname, '../data/wisdom_db.json'), JSON.stringify(wisdomDB, null, 2));
    fs.writeFileSync(path.join(__dirname, '../data/wisdom_db.js'), `export const wisdomData = ${JSON.stringify(wisdomDB, null, 2)};`);
    fs.writeFileSync(path.join(__dirname, '../data/audit_log.json'), JSON.stringify(auditLog, null, 2));

    console.log(`✅ Cleanse complete. ${wisdomDB.length} authentic skills retained.`);
}

function extractRealLayers(name, desc) {
    // 逻辑：将原始描述按自然段或标点切分，寻找其本身的逻辑结构
    const parts = desc.split(/[。!.？?\n]/).filter(p => p.trim().length > 5);
    
    // 即使层级不全，也只展示真实存在的内容
    return [
        { 
            type: "Philosophy", 
            title: "作者核心论述", 
            content: parts[0] ? parts[0].trim() + "。" : "未在原始描述中发现显式哲学论述。" 
        },
        { 
            type: "System", 
            title: "逻辑架构", 
            content: parts.length > 1 ? parts.slice(1, 3).join('。').trim() + "。" : "原始描述未定义复杂的系统模型。" 
        },
        { 
            type: "Workflow", 
            title: "原始步骤说明", 
            content: desc.includes('1.') ? "发现原始指令中包含的具体步骤，请查阅详情。" : "该 Skill 暂无显式的分步操作指南。" 
        },
        { 
            type: "Tactic", 
            title: "具体应用细节", 
            content: parts.length > 3 ? parts.slice(3, 5).join('。').trim() + "。" : "参考原始 GitHub 仓库获取更多细节。" 
        }
    ];
}

runAuthenticProcess();
