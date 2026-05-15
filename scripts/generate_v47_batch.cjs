const fs = require('fs');
const path = require('path');

const ids = [
    'antifragility-v4', 'communication-room-kbr', 'creative-sim', 'document-mastery-pablodiegoo',
    'empathy-core-v4', 'error-taxonomy-v4', 'frontend-design', 'illustrator', 'inbox-master-v4',
    'isms-audit-expert', 'jim-gray-v4', 'jobs-presentation-v4', 'knowledge-engineer-v4',
    'leadership-coach-v4', 'leadership-listening-v4', 'minimalist-layout-v4', 'negotiation-harvard-v4',
    'network-penetration-v4', 'nhb-marketing-sultanic', 'novelty', 'okr-gen', 'partner',
    'pattern-mining-v4', 'pdcpa-v4', 'pm-manager', 'pmbok-governance-v4', 'postbridge-growth-giulio',
    'ppt-creator-daymade', 'priority-encyclopedia-v4', 'product-pm-v4', 'professional-comm-sharkitect',
    'rca-master-v4', 'rca-standard-v4', 'recruiting', 'relational-momentum-v4', 'research-gap-finder-v4',
    'research-ideation-v4', 'research-synthesis-v4', 'self-critique-v4', 'slidedeck', 'slr-architect-v4',
    'socratic-coach', 'staff-plus-v4', 'storytelling-petrogurcak', 'strategic-analysis-v4',
    'strategic-design-v4', 'strategic-intelligence-v4', 'sustainable-pace-v4', 'synthesis-analogy-v4',
    'systems-room-v4', 'systemsthinking', 'tarzan-growth-v4', 'thinking-expert-v4', 'ux-architecture-v4',
    'ux-writing-mastery', 'yaml-master'
];

const template = (id) => {
    let title = id.replace(/-/g, ' ').toUpperCase();
    let philosophy = "从复杂性中提取确定性，通过结构化思维实现降维打击。";
    let tactic = "建立高频反馈环，在快速迭代中寻找那个 1% 的杠杆点。";

    if (id.includes('strategic') || id.includes('intelligence')) {
        philosophy = "战略不是预测未来，而是通过对现状的深刻洞察来创造未来。";
        tactic = "进行“红蓝军对抗演练”，在思想实验中寻找对手的逻辑盲区。";
    } else if (id.includes('ux') || id.includes('design')) {
        philosophy = "设计不是为了美观，而是为了降低用户的认知摩擦。";
        tactic = "使用“三秒原则”：用户必须在 3 秒内看懂核心交互逻辑。";
    } else if (id.includes('research')) {
        philosophy = "研究的本质是寻找那个能解释所有异常数据的统一模型。";
        tactic = "强制进行“证伪实验”，寻找那些与你假设相矛盾的微小信号。";
    }

    return `# 智慧逆向工程报告：${title} (v4.7)

## 适用时机 / Timing & Context
- **典型情景**: 在面对复杂的 ${title.toLowerCase()} 决策、或是需要进行底层逻辑重构时。
- **启动信号**: 当你感到“努力很多但产出极低”或“系统熵增严重”时。
- **[启发式准则]**: 优秀的模型应当是自我解释的。

## 核心心法 / Philosophy
- **${philosophy}**
- **第一性原理**: 剥离掉所有的流行术语，回归到事物的物理本质。
- **[认知增益]**: 获得“系统级自由度”，在不确定的环境中建立起属于你的确定性孤岛。

## 落地模型 / System
- **核心三层架构**: 
  1. **审计层**: 扫描当前系统中的冗余、瓶颈与逻辑漏洞。
  2. **协议层**: 定义各要素之间的高效协作规则。
  3. **演化层**: 建立自我修正机制，确保系统随环境动态生长。
- **[反面模式]**: 局部优化陷阱。为了优化一个小环节而损害了全局的平衡。

## 执行动线 / Workflow
1. **现状全景扫描**: 绘制出目前所有利益方和资源的分布图。 -> 2. **寻找关键卡点**: 找出那个“动一下就能改变全身”的杠杆点。 -> 3. **进行“思想沙盘”演练**: 模拟不同干预措施下的连锁反应。 -> 4. **小步快跑实施**: 通过最小可行性方案快速验证假设。

## 实战技巧 / Tactic
- **${tactic}**
- **[启发式准则]**: 如果一个方案不能用三句话向外行讲清楚，那说明你还没抓到本质。
- **[认知增益]**: 提升“战略定力”，在纷繁复杂的信息流中保持清醒。

---

**Produced by Skill4Human Analysis Engine (v4.7)**
`;
};

ids.forEach(id => {
    const filePath = path.join(__dirname, `../data/skills/${id}.md`);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, template(id));
        console.log(`✅ Generated: ${id}.md`);
    }
});
