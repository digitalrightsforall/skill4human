import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLONE_DIR = path.join(__dirname, '../cloned_repos');

const skillsData = [
  {
    id: "brand-voice-guia",
    name: "brand-voice",
    author: "guia-matthieu",
    relPath: "clawfu-skills/skills/branding/brand-voice/SKILL.md",
    category: "表达与创作",
    gain: "掌握‘声音保存法’。让 AI 成为你的‘大脑外挂’而非代笔鬼，保留文字中的真实人性。",
    phi: "声音即身份：文字不是语法的堆砌，是信念和节奏的融合。平庸的效率是在谋杀品牌竞争力。",
    sys: "三问过滤模型：1. 你到底想告诉我什么？ 2. 为什么是现在？ 3. 这对我意味着什么？刺破黑话浓雾。",
    wor: "1. 杂乱初稿。 2. 意图澄清。 3. AI 结构化调整（禁绝发明）。 4. 情感节拍找回。",
    tac: "替换测验：把品牌名换成竞争对手，如果话还通顺，说明你没有声音。声音应具有‘不可替代性’。"
  },
  {
    id: "tonal-boundaries",
    name: "writing-brand-voice",
    author: "musher-dev",
    relPath: "bundles/marketing-site-authoring/skills/writing-brand-voice/SKILL.md",
    category: "表达与创作",
    gain: "建立文字的‘红线意识’。通过严密的负面清单，让品牌呈现出一种‘昂贵的确定性’。",
    phi: "一致性即信任：不一致的语调信号是不成熟的标志。限制（如 3 形容词法则）是创造力的跳板。",
    sys: "三形容词约束模型：每个品牌只能选 3 个且具有张力的形容词。推导出它们的‘反向失败模式’。",
    wor: "1. 定位分析。 2. 锁定 3 核心词。 3. 衍生反向特征。 4. 制定禁忌词库。",
    tac: "灰度测试：剥离所有设计和颜色。如果纯黑白文字依然能传递权威感和独特性，说明你的文案‘很贵’。"
  },
  {
    id: "marketing-principles-silva",
    name: "marketing-principles",
    author: "silvabyte",
    relPath: "silvabyte-skills/skills/marketing-principles/SKILL.md",
    category: "表达与创作",
    gain: "掌握乔布斯式的叙事穿透力。学会如何将‘功能点’转化为‘情感锚点’。",
    phi: "极简即高级：复杂的营销是无能的表现。乔布斯哲学——通过极致的删减，让产品的灵魂浮现。",
    sys: "情感锚定模型：1. 情绪先行。 2. 彻底精简。 3. 叙事冲击。 4. 稀缺性建立。",
    wor: "1. 挖掘变迁：用户使用了产品后会变成谁？ 2. 故事冲突构建。 3. 排除技术噪音。 4. 视觉对齐。",
    tac: "12岁准则：如果一个12岁的孩子听不懂你的价值主张，说明你的逻辑还不够底层。"
  },
  {
    id: "ux-writing-mastery",
    name: "ux-writing",
    author: "viktorbezdek",
    relPath: "skillstack/ux-writing/skills/ux-writing/SKILL.md",
    category: "表达与创作",
    gain: "掌握‘极小空间的尊严’。学会如何在每一个按钮、每一句报错中保持品牌的一致性与体面。",
    phi: "引导即服务：UI 文字不是装饰，是通往成功的路标。优秀的 UX Writing 应像空气一样透明且不可或缺。",
    sys: "决策树模型：针对按钮（动词+对象）、报错（原因+方案）、空状态（鼓励+引导）建立确定的范式。",
    wor: "1. 映射情绪弧：从焦虑到自信。 2. 场景化语调调节。 3. 术语一致性审计。 4. 避坑自检。",
    tac: "拒绝指责：永远不要在报错中说‘你写错了’。要说‘我们需要一个正确的格式来继续’。"
  }
];

async function run() {
    console.log('🏗️  Building Marketing Tower Skills...');
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
                score: 96,
                human_gain: meta.gain,
                layers: [
                    { type: "Philosophy", title: "核心哲学", content: meta.phi },
                    { type: "System", title: "思维模型", content: meta.sys },
                    { type: "Workflow", title: "研习路径", content: meta.wor },
                    { type: "Tactic", title: "实战指南", content: meta.tac }
                ]
            },
            tags: ["Authentic", "Marketing", "Branding"]
        };
    });

    const finalDB = [...currentDB, ...newItems];
    fs.writeFileSync('data/wisdom_db.json', JSON.stringify(finalDB, null, 2));
    fs.writeFileSync('data/wisdom_db.js', `export const wisdomData = ${JSON.stringify(finalDB, null, 2)};`);

    console.log('🧬 Synthesizing New Collections...');
    const currentCols = JSON.parse(fs.readFileSync('data/collections.js').toString().replace('export const collectionsData = ', '').replace(';', ''));

    const newCols = [
        {
            id: "branding-personality",
            title: "拒绝平庸：如何为你的项目注入“人格”",
            description: "这是一个关于‘品牌灵魂’的深度集锦。教你如何挤掉文字里的 AI 工业味，建立起不可替代的辨识度。",
            skills: ["brand-voice-guia-vFinal", "tonal-boundaries-vFinal"],
            detailed_analysis: [
                {
                    title: "从‘能读通’到‘被记住’",
                    content: "Guia 的逻辑是感性的修复，教你找回初稿中的人味；而 Musher 的逻辑是理性的边界，通过 3 形容词法则定死红线。两者结合，你的品牌将拥有一种‘昂贵的独特性’。"
                }
            ],
            combination_playbook: {
                scenario: "如何为一个冷冰冰的 SaaS 工具注入有温度的专业感？",
                steps: [
                    "1. 确定 3 个具有张力的形容词：如‘极致精准 + 极具同理心 + 意想不到’。",
                    "2. 按照 Guia 流程写出杂乱但真诚的初稿，保留那些‘不完美’的表达。",
                    "3. 应用禁忌词清单，删掉所有‘赋能’、‘一站式’等廉价词汇。"
                ]
            }
        },
        {
            id: "fullstack-marketing",
            title: "全栈营销官：从钩子到转化的逻辑链路",
            description: "将营销从‘写散文’还原为‘工程设计’。掌握从宏观定位到微观按钮的完整表达进化。",
            skills: ["marketing-principles-silva-vFinal", "ux-writing-mastery-vFinal"],
            detailed_analysis: [
                {
                    title: "从乔布斯到按钮点击",
                    content: "Silva 聚焦于乔布斯式的‘情绪锚定’大逻辑，而 Viktor 则深入到 UX 的‘微观体面’。这组集锦能让你在保证宏观叙事吸引人的同时，不让用户在‘确定删除’这样的细节处感到被指责。"
                }
            ],
            combination_playbook: {
                scenario: "如何设计一个新的产品发布页面？",
                steps: [
                    "1. 应用情感锚定原则：先说‘世界会因为你使用了它而有何不同’，而非功能列表。",
                    "2. 叙事穿透：构建从‘危机’到‘解决’的故事弧。",
                    "3. UX 注入：确保所有的 CTA 按钮遵循‘动词+对象’公式，且报错提示温和有力。"
                ]
            }
        }
    ];

    const finalCols = [...currentCols, ...newCols];
    fs.writeFileSync('data/collections.js', `export const collectionsData = ${JSON.stringify(finalCols, null, 2)};`);
    console.log('🏁 Success! Marketing tower is complete.');
}
run();
