import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLONE_DIR = path.join(__dirname, '../cloned_repos');

const skillsData = [
  {
    id: "brand-voice-preservation",
    name: "brand-voice (Guia)",
    author: "guia-matthieu",
    relPath: "clawfu-skills/skills/branding/brand-voice/SKILL.md",
    category: "表达与创作",
    gain: "掌握‘声音保存法’。学会如何让 AI 成为你的‘大脑外挂’而非‘代笔鬼’，保留文字中的真实人性。",
    phi: "声音即身份：文字不是语法的堆砌，是信念和节奏的融合。平庸的效率是在谋杀品牌竞争力。",
    sys: "三问过滤模型：1. 你到底想告诉我什么？ 2. 为什么是现在？ 3. 这对我意味着什么？刺破企业黑话的浓雾。",
    wor: "1. 杂乱初稿（保留人味）。 2. 意图澄清。 3. AI 结构化调整（禁绝发明）。 4. 情感节拍找回。 5. 朗读测试。",
    tac: "替换测验：把品牌名换成竞争对手，如果话还通顺，说明你没有声音。真正的声音应具有‘不可替代性’。"
  },
  {
    id: "writing-tonal-boundaries",
    name: "writing-brand-voice",
    author: "musher-dev",
    relPath: "bundles/marketing-site-authoring/skills/writing-brand-voice/SKILL.md",
    category: "表达与创作",
    gain: "建立文字的‘红线意识’。通过严密的负面清单，让品牌呈现出一种‘昂贵的确定性’。",
    phi: "一致性即信任：不一致的语调信号是不成熟的标志。限制（如 3 形容词法则）不是阻碍，是创造力的跳板。",
    sys: "三形容词约束模型：每个品牌只能选 3 个且具有张力的形容词（如：技术+温暖+简洁）。推导出它们的‘反向失败模式’。",
    wor: "1. 定位分析。 2. 锁定 3 个核心词。 3. 衍生‘反向特征’。 4. 制定禁忌词库（如禁止使用‘赋能’）。",
    tac: "灰度测试：剥离所有设计和颜色。如果纯黑白文字依然能传递权威感和独特性，说明你的文案‘很贵’。"
  },
  {
    id: "brand-voice-reverse",
    name: "marketing-brand-voice",
    author: "broobe",
    relPath: "tukigrowth-skills/skills/marketing-brand-voice/SKILL.md",
    category: "决策与评审",
    gain: "获得‘品牌黑客’般的反向工程能力。能从任何碎片化内容中精准锁定其品牌基因。",
    phi: "受众决定语调：品牌声音不是为了自我表达，是为了与受众的‘认知水平’和‘情绪痛点’精准对齐。",
    sys: "四维评分矩阵：正式-随意、严肃-调皮、技术-简单、含蓄-大胆。通过证据链（证据锚点）对每一维进行量化。",
    wor: "1. ICP 锚定。 2. 跨渠道样本打捞。 3. 维度评分与证据提取。 4. 词汇指纹分析（Vocabulary Fingerprint）。",
    tac: "寻找‘缺席的词’：不仅看用了什么，更要看品牌‘坚决不用的词’。这些空位才是品牌性格最强烈的体现。"
  }
];

async function run() {
    console.log('🏗️  Adding Personality tower skills to DB...');
    const currentDB = JSON.parse(fs.readFileSync('data/wisdom_db.json', 'utf8'));
    
    const newItems = skillsData.map(meta => {
        const fullPath = path.join(CLONE_DIR, meta.relPath);
        let raw = "源码读取失败";
        if (fs.existsSync(fullPath)) {
            raw = fs.readFileSync(fullPath, 'utf8');
        }
        return {
            id: meta.id + "-vFinal",
            name: meta.name,
            author: meta.author,
            category: meta.category,
            repo_url: "https://github.com/source",
            raw_source: raw,
            wisdom: {
                score: 95,
                human_gain: meta.gain,
                layers: [
                    { type: "Philosophy", title: "核心哲学", content: meta.phi },
                    { type: "System", title: "思维模型", content: meta.sys },
                    { type: "Workflow", title: "研习路径", content: meta.wor },
                    { type: "Tactic", title: "实战指南", content: meta.tac }
                ]
            },
            tags: ["Personality", "Branding", "Authentic"]
        };
    });

    const finalDB = [...currentDB, ...newItems];
    fs.writeFileSync('data/wisdom_db.json', JSON.stringify(finalDB, null, 2));
    fs.writeFileSync('data/wisdom_db.js', `export const wisdomData = ${JSON.stringify(finalDB, null, 2)};`);
    console.log('✅ 3 Personality skills added.');
}
run();
