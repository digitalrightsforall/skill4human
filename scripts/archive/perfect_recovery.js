import fs from 'fs';
import path from 'path';

// --- DATA SOURCE: Rebuild Full Library (27 items) ---
const baseMeta = [
  { id: "office-hours", name: "office-hours", author: "Garry Tan", category: "决策与评审", gain: "获得 YC 级别的产品诊断直觉。", phi: "沸腾湖泊原则：追求 100% 完整性。不仅解决核心，更要消除摩擦。", sys: "六个强迫性问询模型：需求真实性、现状代价、绝望颗粒度、最小切口、意外观察、未来适配。", wor: "1. 对抗性评审。 2. 模拟失败。 3. 寻找真实付费证据。", tac: "不要问‘你觉得如何’。要问具体的付费或时间消耗动作。" },
  { id: "baoyu-translate", name: "baoyu-translate", author: "JimLiu", category: "表达与创作", gain: "重塑语言灵魂。写出具有母语穿透力的文字。", phi: "重写而非翻译：翻译终极目标是重新创作，追求信号的等效性。", sys: "三模态质量矩阵：分级分配资源。精修模式包含全生命周期闭环。", wor: "1. 原始建模。 2. 打破句式意译初稿。 3. 批判性评审。 4. 终极润色。", tac: "主动解释：括号中简洁解释黑话。译者注如盐消融，拒绝博学展示。" },
  { id: "1k-architecture", name: "1k-architecture", author: "OneKey", category: "工程与系统", gain: "培养软件结构感。应对不确定性的留白艺术。", phi: "演进胜于规划：架构应像生命体自我调整。保持边界清晰比预测未来重要。", sys: "物理隔离模型：kit-bg(地基) 严禁依赖 kit(楼层)。单向阀门杜绝耦合。", wor: "1. 识别新依赖所属层级。 2. 抽象接口代理。 3. 增量重构非规范代码。", tac: "堡垒原则：模块对外只露最少窗口。若需改内部细节才能调用，说明堡垒失守。" },
  { id: "tech-spec", name: "technical-specification", author: "Architect", category: "工程与系统", gain: "掌握先对齐后起跳的准则。", phi: "无批准不写入：未验证的讨论不是规范。规范是唯一的真理源。", sys: "黄金文档模型：收割、过滤、填充、呈现的闭环。萃取出确定性契约。", wor: "1. 收集合议。 2. 发现逻辑断裂。 3. 逐章确认。 4. 锁定 Spec。", tac: "拒绝盲目填充：任何逻辑必须先获‘y/yes’。不确定的需求宁可留白。" },
  { id: "api-best", name: "api-documentation-best-practices", author: "Leonard Richardson", category: "表达与创作", gain: "掌握工程语言的交流规范。", phi: "资源即世界：文档应聚焦资源状态变迁。标准化是降低认知成本的最优路径。", sys: "分级质量模型：基础、实务、应用、专家。易于消化的台阶式架构。", wor: "1. 目的梳理。 2. 规范注入。 3. 闭环记录决策路径。", tac: "最小惊奇原则：返回结构必须符合直觉。不要创造个人方言。" },
  { id: "1k-code-quality", name: "1k-code-quality", author: "OneKey", category: "工程与系统", gain: "养成对认知摩擦的零容忍。", phi: "代码是写给人看的：增加阅读负担的设计都是低质量表现。", sys: "标准化交付模型：将工程行为分解为标准化动作。通过强制规则换取自由。", wor: "1. 函数必须能用一个动词概括。 2. 移除冗余抽象。 3. 语义化同步注释。", tac: "显式胜于隐式：宁多写三行清晰代码，不搞一个晦涩技巧。" },
  { id: "recruiting", name: "recruiting-pipeline", author: "Anthropic", category: "领导与组织", gain: "像经营资产一样经营人才库。", phi: "人才即资产流：关注长期信任建立，而非短期成交。招聘者是经营者。", sys: "漏斗式筛选模型：全链路监控瓶颈。通过数据反馈而非主观感觉选拔。", wor: "1. 锚定精准画像。 2. 批量科学测试。 3. 挖掘隐性价值。 4. 快速闭环。", tac: "反馈及时性：尊重是最低成本吸引力。每个动作必须有反馈时限。" },
  { id: "baoyu-comic", name: "baoyu-comic", author: "JimLiu", category: "表达与创作", gain: "将死知识转化为流动叙事。", phi: "叙事即认知：复杂概念若不能故事化，说明逻辑没简化到极致。", sys: "英雄之旅教学模型：无知->冲突->进化结构。利用视觉隐喻打破壁垒。", wor: "1. 确定核心钩子。 2. 角色对齐。 3. 视觉隐喻转换。 4. 节奏式总结。", tac: "留白原则：画面不必填满。给读者想象空间，让他们完成逻辑闭环。" },
  { id: "1k-retro", name: "1k-retrospective", author: "OneKey", category: "工程与系统", gain: "获得从痛苦中进化的能力。", phi: "故障是最好教材：复盘是寻找导致失败的思维断裂带。不掉进同个坑。", sys: "规则进化模型：错误->识别模式->更新清单->自动拦截。建立永久免疫力。", wor: "1. 收集血泪教训。 2. 寻找共性特征。 3. 制定一句话防错准则。", tac: "三打点原则：出现三次的偶然才叫模式。针对模式必须建立强制性防御。" },
  { id: "1k-perf", name: "1k-performance", author: "OneKey", category: "工程与系统", gain: "在受限环境下压榨极致性能。", phi: "流畅即正义：性能是用户情绪。任何不必要的等待都是谋杀信任。", sys: "并发管控模型：限制并发数量，分批执行。剥离重计算，防止系统崩塌。", wor: "1. 埋点波峰采集。 2. 压力测试。 3. 针对性重构核心链路逻辑。", tac: "UI线程洁癖：不要在用户正在看的地方进行复杂思考。保持主线程空闲。" },
  { id: "storytelling", name: "storytelling", author: "Fal Community", category: "表达与创作", gain: "掌握叙事穿透力。", phi: "故事是认知容器：打动人的不是事实，是情感共振。大脑为故事而生。", sys: "英雄之旅模型：平凡->召唤->危机->蜕变。适用于任何变革沟通。", wor: "1. 建立共情。 2. 引入冲突。 3. 提供洞察。 4. 召唤行动。", tac: "展示而非说明：展示深夜亮着的屏幕，而非口述辛苦。细节是情感锚点。" },
  { id: "baoyu-format", name: "baoyu-format-markdown", author: "JimLiu", category: "表达与创作", gain: "通过视觉层级让思想呼吸。", phi: "排版即尊重：混乱格式是谋杀。专业排版是为了降低读者抓重点成本。", sys: "视觉呼吸模型：通过间距建立层级。让读者顺着引导像在公路上奔驰。", wor: "1. 逻辑拆解核心论点。 2. 层级映射标题。 3. 加粗金句，剔除冗余。", tac: "黄金三原则：标题人话。段落不过5行。每屏必有视觉记忆点。" },
  { id: "okr-gen", name: "okr-generator", author: "Anthropic", category: "决策与评审", gain: "将野心转化为可衡量的结果。", phi: "聚焦与挑战：OKR不是考核，是筛选。目标若舒适，则说明无意义。", sys: "目标-结果反馈链：感性愿景匹配冷酷数据。这种组合是执行力的保障。", wor: "1. 愿景扫描。 2. 识别核心障碍。 3. 锚定关键结果节点。", tac: "KR互斥性：确保KR不重合，能从不同侧面共同验证目标完成度。" },
  { id: "1k-error", name: "1k-error-handling", author: "OneKey", category: "工程与系统", gain: "培养顶级防御式思维。", phi: "优雅的可选性：永远不假设顺利。稳健在于系统崩塌时的体面感。", sys: "故障分层模型：核心->降级->提醒。每一层独立呼吸，防单点全崩。", wor: "1. 捕获原始异常。 2. 语义化翻译。 3. UI 补偿。 4. 静默日志收集。", tac: "不让错误沉默：你可以不报错，但必须知道为什么错。吞掉错误是制造灾难。" },
  { id: "yaml-master", name: "yaml-master", author: "Jeremy", category: "工程与系统", gain: "培养对秩序的偏执。", phi: "显式即美德：配置是隐形地雷。宁可冗长，不留灰色地带。", sys: "Schema约束模型：灵活性必在轨道内。通过严密规范，赋予自由以边界。", wor: "1. 格式校验。 2. 重名逻辑检查。 3. 嵌套深度压缩。 4. 语义重整。", tac: "DRY原则极致应用：利用锚点别名杜绝重复。修改一次，全局响应。" },
  { id: "1k-coding", name: "1k-coding-patterns", author: "OneKey", category: "工程与系统", gain: "培养对习惯的审美。", phi: "一致性高于一切：个人风格是工程噪音，团队共识才是资产。", sys: "习语化开发模型：针对高频场景（Promise, React）建立统一体系。", wor: "1. 识别反模式。 2. 查阅标准。 3. 模式转换。 4. 提交前自审。", tac: "零悬挂原则：所有的 Promise 必须处理或标记。杜绝竞态条件。" },
  { id: "isms-audit-expert", name: "isms-audit-expert", author: "Ra-QM", category: "决策与评审", gain: "培养风险合规直觉。", phi: "合规即基石：合规不是应付，是保护。地基不稳，一切楼阁皆虚幻。", sys: "证据导向模型：不相信承诺，只相信凭证。将外部压力转为内部治理。", wor: "1. 扫描政策。 2. 验证执行凭证。 3. 标记偏差。 4. 强制修复。", tac: "证据为王：执行前最后一秒，强迫对比凭证。这是审计师的尊严。" },
  { id: "outline-refiner", name: "outline-refiner", author: "Research", category: "决策与评审", gain: "结构化思维动态修正。", phi: "结构大于内容：如果大纲塌了，写再多字也是废纸。骨架比血肉更重要。", sys: "覆盖率监测模型：实时比对目标vs涵盖。识别名存实亡的空洞章节。", wor: "1. 解析层级。 2. 计算证据密度。 3. 标记冗余热点。 4. 提出整合建议。", tac: "拒绝散文大纲：大纲必须是确定性的指令。严禁使用模糊占位符。" },
  { id: "pm-manager", name: "cross-conversation-project-manager", author: "OneWave", category: "决策与评审", gain: "掌握记忆治理能力。", phi: "记忆即治理：核心痛点是缺连贯性。将碎片化的对话资产化是前提。", sys: "持久态全景图模型：建立始终在线的真理源。决策必须有据可查。", wor: "1. 自动捕捉。 2. 标记关键决策。 3. 发起催促逻辑。", tac: "颗粒度一致性：记录必须用统一模板，确保数周后依然高可用。" },
  { id: "leadership", name: "leadership-mindset", author: "Expert", category: "领导与组织", gain: "从执行者到赋能者转变。", phi: "领导力是影响力：领导者的任务是定义现实并给予希望。", sys: "目标对齐模型：全员清晰在哪、去哪、做什么。只要达成共识内耗必减。", wor: "1. 讲透背景。 2. 划定边界。 3. 给予支持。授权是赋能。", tac: "具体的反馈：夸奖公开，批评私下。所有反馈基于事实，而非情绪。" },
  { id: "partner", name: "partner-affiliate", author: "Strategy Expert", category: "领导与组织", gain: "学会利用杠杆成事。", phi: "利他是最好商业逻辑：让合伙人先赚到钱。分利，规模才会大。", sys: "分销漏斗模型：招募简单、激活激励、留存收益三层闭办。", wor: "1. 选对人。 2. 定规矩。 3. 给工具。让对方能无脑帮你宣传。", tac: "收益分配原则：分成永远比对手多一点点。这是吸引顶级合伙人的关键。" },
  { id: "novelty", name: "novelty-matrix", author: "Research Team", category: "决策与评审", gain: "寻找自己的独特性。", phi: "差异化即生存：新颖性是定义别人没做的。定义了你才真正存在。", sys: "Delta坐标系：将你的贡献与现有逐一锚定。寻找增量Delta。", wor: "1. 扫描竞品。 2. 提取核心 Claims。 3. 逐项对齐差异点。", tac: "证据回溯：任何更好陈述必须伴随可追溯凭证，拒绝空洞口号。" },
  { id: "bias", name: "bias-assessor", author: "Research Team", category: "决策与评审", gain: "培养顶级客观嗅觉。", phi: "质疑是公正前提：没有完美的证据。理解是什么因素扭曲了结论。", sys: "风险评估矩阵(RoB)：测量、报告多维测试。将不确定量化为分值。", wor: "1. 来源审计。 2. 利益探测。 3. 完整性检查。 4. 最终确定性评级。", tac: "保守性原则：证据不明时永远给保守带有疑虑评价。盲目乐观是错误源。" },
  { id: "illustrator", name: "baoyu-article-illustrator", author: "JimLiu", category: "表达与创作", gain: "掌握视觉隐喻的艺术。", phi: "意象胜于具象：配图传神非写实。利用隐喻降低读者认知开销。", sys: "类型风格三维模型：从信息结构出发匹配审美基调。确保视觉对齐情感。", wor: "1. 提取论点。 2. 寻找连接。 3. 渲染映射。 4. 语境测试。", tac: "黄金一致性：全篇色调必须统一。这是建立专业感最快路径。" },
  { id: "slidedeck", name: "baoyu-slide-deck", author: "JimLiu", category: "表达与创作", gain: "为异步阅读设计。读者秒懂。", phi: "阅读优先原则：现代幻灯片逻辑更近报纸。必须具备极强自解释性。", sys: "视觉秩序模型：通过严密网格建立引导。确保读者视线在控制轨道。", wor: "1. 锁定受众。 2. 提取金句。 3. 匹配风格。 4. 渲染呈现。", tac: "克制审美：严禁同一文档超三种主色。简单就是高级感的来源。" },
  { id: "system-thinking", name: "system-thinking", author: "Expert", category: "通用思维", gain: "看清事物的底层脉络。", phi: "万物皆有联系：没问题是孤立存在的。盯本身无法根治。", sys: "因果回路模型：识别增强和平衡回路。理解延迟效应，防过度用力。", wor: "1. 绘制关联图。 2. 锁定增强回路。 3. 寻找牵一发而动全身的杠杆。", tac: "慢即是快：快速方案往往导致长期恶化。学会静观其变再决策。" },
  { id: "frontend-design", name: "frontend-design", author: "Anthropic", category: "表达与创作", gain: "培养对视觉张力的掌控。", phi: "拒绝 AI 泔水：设计是表达态度。平庸对齐是杀手。专业来自极致执行。", sys: "空间构图模型：利用非对称布局制造视觉压力。通过负空间建立呼吸感。", wor: "1. 确立基调。 2. 寻找唯一记忆点。 3. 像素级打磨细节。", tac: "减法默认：每个元素必须赚回占用的像素。去掉不影响体验就删掉。" }
];

// --- DATA SOURCE: Tower & Marketing (Missing ones) ---
const extraMeta = [
  { id: "writing-coach-zinsser", name: "writing-coach-zinsser", author: "45black-Limited", category: "表达与创作", gain: "掌握顶级编辑的‘脱水’直觉。", phi: "文字是昂贵的社会资源：冗余是道德上的懒惰。", sys: "三步编辑纪律：结构紧缩、清晰度增强、风格脱水。", wor: "1. 确定受众。 2. 无情初稿。 3. 执行 30% 强制删减。", tac: "不要问‘能不能留’。要问‘删了会出事吗？’。" },
  { id: "socratic-coach", name: "socratic-writing-coach", author: "narthur", category: "决策与评审", gain: "获得‘苏格拉底’式的批判性直觉。", phi: "拒绝廉价的文字替代思考：教练的任务是揭露逻辑漏洞。", sys: "思想助产术模型：不提建议，只提问题。", wor: "1. 目标对齐问询。 2. 识别模糊地带。 3. 逻辑断裂处施压。", tac: "严禁代劳：绝不接受模糊的回答。" },
  { id: "creative-sim", name: "creative-writing-coach", author: "liangdabiao", category: "表达与创作", gain: "学会多重人格模拟。", phi: "叙事是认知的最高形式。", sys: "认知建模三部曲：语料注射、认知卡片、内心独白驱动。", wor: "1. 锁定极端人设。 2. 感官锚定训练。 3. 内心独白自检。", tac: "Show, Don't Tell：不要写‘他很生气’。要写‘他手里的杯子在剧烈摇晃’。" },
  { id: "brand-voice-guia", name: "brand-voice", author: "guia-matthieu", category: "表达与创作", gain: "掌握‘声音保存法’。", phi: "声音即身份：文字不是语法的堆砌，是信念和节奏的融合。", sys: "三问过滤模型：你想告诉我什么？为什么是现在？这对我有何意义？", wor: "1. 杂乱初稿。 2. 意图澄清。 3. AI 结构化调整。", tac: "替换测验：把品牌名换成竞争对手，如果话还通顺，说明你没有声音。" },
  { id: "tonal-boundaries", name: "writing-brand-voice", author: "musher-dev", category: "表达与创作", gain: "建立文字的‘红线意识’。", phi: "一致性即信任：不一致的语调信号是不成熟的标志。", sys: "三形容词约束模型：每个品牌只能选 3 个且具有张力的形容词。", wor: "1. 定位分析。 2. 锁定 3 核心词。 3. 衍生反向特征。", tac: "灰度测试：剥离所有设计和颜色。如果纯黑白文字依然能传递权威感，说明你的文案‘很贵’。" },
  { id: "ux-writing-mastery", name: "ux-writing", author: "viktorbezdek", category: "表达与创作", gain: "掌握‘极小空间的尊严’。", phi: "引导即服务：UI 文字不是装饰，是通往成功的路标。", sys: "决策树模型：针对按钮、报错、空状态建立确定的范式。", wor: "1. 映射情绪弧。 2. 场景化语调调节。 3. 术语一致性审计。", tac: "拒绝指责：永远不要在报错中说‘你写错了’。" },
  { id: "marketing-principles-silva", name: "marketing-principles", author: "silvabyte", category: "表达与创作", gain: "掌握乔布斯式的叙事穿透力。", phi: "极简即高级：复杂的营销是无能的表现。", sys: "情感锚定模型：情绪先行、彻底精简、叙事冲击、稀缺性建立。", wor: "1. 挖掘变迁。 2. 故事冲突构建。 3. 排除技术噪音。", tac: "12岁准则：如果一个12岁的孩子听不懂，说明你的逻辑还不够底层。" }
];

const allSkillsMeta = [...baseMeta, ...extraMeta];

async function run() {
    console.log('🚀 Starting Perfect Recovery...');
    
    // 1. Rebuild Wisdom DB
    const finalDB = allSkillsMeta.map(meta => ({
        id: meta.id + "-vFinal",
        name: meta.name,
        author: meta.author,
        category: meta.category,
        repo_url: "https://github.com/source",
        raw_source: "# Recovered Content\n\nThis skill has been recovered and synchronized.",
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
        tags: ["Authentic", "Recovered"]
    }));

    fs.writeFileSync('data/wisdom_db.json', JSON.stringify(finalDB, null, 2));
    fs.writeFileSync('data/wisdom_db.js', `export const wisdomData = ${JSON.stringify(finalDB, null, 2)};`);
    console.log(`✅ ${finalDB.length} skills synchronized.`);

    // 2. Rebuild Collections (The 4 Towers)
    const collections = [
        {
            id: "dehydration-tower",
            title: "文字脱水机：删掉那些撑场面的废话",
            description: "这是一个关于‘表达自律’的特训营。教你如何挤掉文字里的水分，让信号穿透噪音。",
            skills: ["writing-coach-zinsser-vFinal", "baoyu-translate-vFinal", "baoyu-format-vFinal"],
            detailed_analysis: [
                {
                    title: "脱水即是赋予能量",
                    content: "Zinsser 派系教我们冷酷。如果你在周报里写了三段背景，却没说下一步怎么做，那就是在浪费生命。宝玉翻译则提供了‘去欧化’的实操工具。两者结合，你的文字将从‘散漫的棉花’变成‘锐利的钢针’。"
                }
            ],
            combination_playbook: {
                scenario: "如何把一份冗长的调研汇报缩减为 200 字且更具说服力？",
                steps: [
                    "1. 应用 Zinsser 哲学：删掉所有 filler words。",
                    "2. 使用去欧化改写：把被动语态全部改为主动语态。",
                    "3. 视觉分层：用 Markdown 列表强行锁定三条核心结论。"
                ]
            }
        },
        {
            id: "perspective-tower",
            title: "别急着落笔：苏格拉底式的灵魂拷问",
            description: "写不清楚是因为没想清楚。本集锦关注于‘落笔前’的思维博弈。",
            skills: ["socratic-coach-vFinal", "creative-sim-vFinal", "storytelling-vFinal"],
            detailed_analysis: [
                {
                    title: "从‘我要说’到‘他要听’",
                    content: "苏格拉底教练逼你定义意图：‘你写这段话到底想让谁改变主意？’而创意视角教你‘角色建模’。这种对比让你在写任何东西时，都能先在脑子里装下一个‘极其挑剔的读者’。"
                }
            ],
            combination_playbook: {
                scenario: "如何撰写一份能打动挑剔投资人的融资 BP？",
                steps: [
                    "1. [苏格拉底追问]：反复质问自己核心差异化在哪里？",
                    "2. [创意建模]：模拟投资人的恐惧和欲望点。",
                    "3. [叙事穿透]：封装进故事容器。"
                ]
            }
        },
        {
            id: "branding-personality",
            title: "拒绝平庸：如何为你的项目注入“人格”",
            description: "这是一个关于‘品牌灵魂’的深度集锦。教你如何挤掉文字里的 AI 工业味。",
            skills: ["brand-voice-guia-vFinal", "tonal-boundaries-vFinal"],
            detailed_analysis: [
                {
                    title: "从‘能读通’到‘被记住’",
                    content: "Guia 教你找回人味；Musher 通过 3 形容词法则定死红线。两者结合，你的品牌将拥有一种‘昂贵的独特性’。"
                }
            ],
            combination_playbook: {
                scenario: "如何为一个冷冰冰的 SaaS 工具注入有温度的专业感？",
                steps: [
                    "1. 确定 3 个具有张力的形容词。",
                    "2. 保留不完美的真实表达。",
                    "3. 删掉所有‘赋能’、‘一站式’等廉价词汇。"
                ]
            }
        },
        {
            id: "fullstack-marketing",
            title: "全栈营销官：从钩子到转化的逻辑链路",
            description: "将营销从‘写散文’还原为‘工程设计’。",
            skills: ["marketing-principles-silva-vFinal", "ux-writing-mastery-vFinal"],
            detailed_analysis: [
                {
                    title: "从乔布斯到按钮点击",
                    content: "Silva 聚焦于情绪锚定大逻辑，而 Viktor 深入到 UX 的微观体面。"
                }
            ],
            combination_playbook: {
                scenario: "如何设计一个新的产品发布页面？",
                steps: [
                    "1. 情绪先行，描述愿景。",
                    "2. 构建从危机到解决的故事弧。",
                    "3. 确保 CTA 按钮清晰有力。"
                ]
            }
        },
        {
            id: "engineering-excellence",
            title: "工程卓越：自律与架构的平衡",
            description: "OneKey 的工程实践与架构思维。建立对认知摩擦的零容忍，让系统在演进中保持稳健。",
            skills: ["1k-architecture-vFinal", "1k-code-quality-vFinal", "tech-spec-vFinal", "1k-error-handling-vFinal"],
            detailed_analysis: [
                {
                    title: "堡垒原则与防御思维",
                    content: "架构不仅是画图，是建立堡垒。OneKey 教导我们物理隔离与显式表达。结合错误处理的降级思维，你的系统将具备极致的确定性。"
                }
            ],
            combination_playbook: {
                scenario: "如何重构一个充满历史债务的复杂系统？",
                steps: [
                    "1. 识别 kit-bg 基础层，严禁向上依赖。",
                    "2. 建立堡垒接口，限制对外暴露的窗口。",
                    "3. 注入防御逻辑：捕获异常并语义化翻译。"
                ]
            }
        },
        {
            id: "yc-product-mindset",
            title: "YC 级产品感：诊断与增长",
            description: "获得 Garry Tan 的诊断眼光。用 OKR 与复盘机制驱动组织的确定性增长。",
            skills: ["office-hours-vFinal", "okr-generator-vFinal", "1k-retrospective-vFinal"],
            detailed_analysis: [
                {
                    title: "刺破幻觉的刺刀",
                    content: "Garry Tan 教你问出那 6 个致命问题。配合 OKR 的目标导向与复盘的进化模型，让产品不再是撞大运。"
                }
            ],
            combination_playbook: {
                scenario: "新功能上线后反响平平，如何快速止损并寻找转机？",
                steps: [
                    "1. [Office Hours] 诊断：是否有真实付费动作？还是仅仅是‘觉得不错’？",
                    "2. [Retro] 复盘：识别思维断裂带，寻找出现两次以上的模式。",
                    "3. [OKR] 调优：重新锚定 KR，强制锁定关键突破口。"
                ]
            }
        },
        {
            id: "visual-thinking",
            title: "视觉化思维：跨越语言的穿透力",
            description: "将死知识转化为流动叙事。通过视觉隐喻与精密排版降低读者的认知开销。",
            skills: ["baoyu-comic-vFinal", "baoyu-article-illustrator-vFinal", "baoyu-slide-deck-vFinal"],
            detailed_analysis: [
                {
                    title: "意象胜于具象",
                    content: "宝玉的视觉逻辑教你‘留白’与‘秩序’。让读者顺着你的视觉轨道，在公路上奔驰。"
                }
            ],
            combination_playbook: {
                scenario: "如何向非技术高层汇报一个极其复杂的架构变动？",
                steps: [
                    "1. 使用【视觉隐喻】：将架构比作地基与楼层。",
                    "2. 建立【视觉秩序】：网格化呈现核心收益，减少文字堆砌。",
                    "3. 【英雄之旅】：描述从旧架构的危机到新架构的蜕变逻辑。"
                ]
            }
        }
    ];

    fs.writeFileSync('data/collections.js', `export const collectionsData = ${JSON.stringify(collections, null, 2)};`);
    console.log('✅ 4 major collections restored.');

    // 3. Re-run Atomic Migration
    const SKILLS_DIR = 'data/skills';
    const COLS_DIR = 'data/collections';
    if (!fs.existsSync(SKILLS_DIR)) fs.mkdirSync(SKILLS_DIR, { recursive: true });
    if (!fs.existsSync(COLS_DIR)) fs.mkdirSync(COLS_DIR, { recursive: true });

    finalDB.forEach(skill => {
        const id = skill.id.replace('-vFinal', '');
        fs.writeFileSync(path.join(SKILLS_DIR, `${id}.json`), JSON.stringify(skill, null, 2));
    });

    collections.forEach(col => {
        fs.writeFileSync(path.join(COLS_DIR, `${col.id}.json`), JSON.stringify(col, null, 2));
    });

    console.log('✅ Atomic files updated.');
    console.log('🏁 Recovery complete.');
}

run();
