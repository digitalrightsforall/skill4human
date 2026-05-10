import fs from 'fs';
import path from 'path';

const currentDB = JSON.parse(fs.readFileSync('data/wisdom_db.json', 'utf8'));

const newItems = [
  {
    "id": "api-doc-writer-vFinal",
    "name": "api-documentation-writer",
    "author": "Tech Doc Expert",
    "category": "表达与创作",
    "repo_url": "https://github.com/source",
    "raw_source": "# API Documentation Writer\n\nCreate comprehensive, developer-friendly API documentation.\n\n## Instructions\n1. Gather API Info (REST/GraphQL)\n2. Generate Structure (Overview, Auth, Endpoints, Errors)\n3. Format Output",
    "wisdom": {
      "score": 92,
      "human_gain": "学会“开发者同理心”。写出的每一份文档都能让用户在 60 秒内跑通第一个请求。",
      "layers": [
        { "type": "Philosophy", "title": "文档即服务", "content": "文档不是代码的复读机，而是通往功能的地图。优秀文档的唯一标准是：用户是否需要寻求人工支持？" },
        { "type": "System", "title": "60秒快速上手机制", "content": "1. 原始建模：明确第一个请求。 2. 障碍清除：详细解释鉴权。 3. 示例优先：提供可直接复制的 cURL。" },
        { "type": "Workflow", "title": "研习路径", "content": "1. 信息收割。 2. 结构映射。 3. 案例注入。 4. 压力测试（找个新手读一遍）。" },
        { "type": "Tactic", "title": "拒绝零碎描述", "content": "每一个参数都必须有明确的取值范围和失败示例。不要让用户去猜你的逻辑。" }
      ]
    },
    "tags": ["API", "文档", "工程"]
  },
  {
    "id": "tech-spec-writer-vFinal",
    "name": "technical-spec-writing",
    "author": "Specification Architect",
    "category": "工程与系统",
    "repo_url": "https://github.com/source",
    "raw_source": "# Technical Spec Writing\n\nBridges requirements to implementation. Use when designing system architecture, API contracts, or solutions.",
    "wisdom": {
      "score": 95,
      "human_gain": "掌握从“混沌需求”到“精确设计”的转换艺术。极大地减少沟通内耗和返工成本。",
      "layers": [
        { "type": "Philosophy", "title": "想清楚再动手", "content": "写规范不是浪费时间，是给未来的自己省命。改错行动的代价远比改错文档大得多。" },
        { "type": "System", "title": "文档-代码同步模型", "content": "每一行执行都必须对应一条规则。强制要求所有重大决策都在白纸黑字上先达成共识。" },
        { "type": "Workflow", "title": "规范驱动流", "content": "1. 背景对齐。 2. 架构锁定。 3. 数据建模。 4. 安全评审。" },
        { "type": "Tactic", "title": "无文档不行动", "content": "养成工程纪律：任何重要的系统变更，先写 Spec，得到确认后再开写第一行代码。" }
      ]
    },
    "tags": ["规范", "架构", "自律"]
  }
];

const finalDB = [...currentDB, ...newItems];
fs.writeFileSync('data/wisdom_db.json', JSON.stringify(finalDB, null, 2));
fs.writeFileSync('data/wisdom_db.js', `export const wisdomData = ${JSON.stringify(finalDB, null, 2)};`);
console.log('✅ Added 2 items. Total items: ' + finalDB.length);
