const fs = require('fs');
const path = require('path');

const wisdomPath = path.join(__dirname, '../data/wisdom_db.json');
const collectionsPath = path.join(__dirname, '../data/collections.json');
const skills = JSON.parse(fs.readFileSync(wisdomPath, 'utf8'));
const collections = JSON.parse(fs.readFileSync(collectionsPath, 'utf8'));
const outputDir = path.join(__dirname, '../data/collections');

console.log(`🚀 Starting Intelligent Reconstruction of ${collections.length} collections...`);

const getSkillWisdom = (id) => {
  const s = skills.find(s => s.id === id);
  if (!s || !s.ai_wisdom) return null;
  return s.ai_wisdom;
};

collections.forEach(col => {
  const colSkillsWisdom = (col.skills || []).map(id => getSkillWisdom(id)).filter(Boolean);
  
  if (colSkillsWisdom.length === 0) {
    console.log(`   ⚠️ No skill wisdom found for ${col.id}, skipping deep update.`);
    return;
  }

  // 1. Synthesize Timing
  const timingContexts = colSkillsWisdom.map(w => w.timing?.context).filter(Boolean).join(' ');
  const finalTiming = `> ${col.description}\n\n- **典型情景**: ${timingContexts.slice(0, 300)}...\n- **[启发式准则]**: 组合这些技能的目的是实现从“散点操作”到“系统解决”的跨越。`;

  // 2. Synthesize Philosophy (Merge layers)
  const phiContent = colSkillsWisdom
    .map(w => w.layers?.find(l => l.type === 'Philosophy')?.content)
    .filter(Boolean)
    .map(c => c.replace(/\[启发式准则\].*$/m, '').trim()) // Remove inner labels
    .join('\n\n');
  
  const finalPhilosophy = `${phiContent}\n\n- **[启发式准则]**: 智慧不是技能的累加，而是逻辑的涌现。`;

  // 3. Synthesize System
  const sysContent = colSkillsWisdom
    .map(w => w.layers?.find(l => l.type === 'System')?.content)
    .filter(Boolean)
    .join('\n\n');
  const finalSystem = `该集锦构建了一个多维协同模型：\n\n${sysContent}`;

  // 4. Synthesize Workflow (Chain steps)
  const workflowContent = colSkillsWisdom
    .map(w => w.layers?.find(l => l.type === 'Workflow')?.content)
    .filter(Boolean)
    .join('\n\n');
  const finalWorkflow = workflowContent;

  // 5. Synthesize Tactic (Merge layers and clean labels)
  const tacticContent = colSkillsWisdom
    .map(w => w.layers?.find(l => l.type === 'Tactic')?.content)
    .filter(Boolean)
    .map(c => c.replace(/\[认知增益\].*$/m, '').replace(/\[反面模式\].*$/m, '').trim())
    .join('\n\n');
  
  const finalTactic = `${tacticContent}\n\n- **[认知增益]**: 实现跨领域的深度解构能力。\n- **[反面模式]**: 机械执行。只看步骤而不顾逻辑，只会得到平庸的结果。`;

  const mdContent = `---
id: ${col.id}
title: ${col.title}
category: ${col.category || '综合智慧场景'}
---

# 适用时机与语境 / Timing
${finalTiming}

# 核心心法 / Philosophy
${finalPhilosophy}

# 落地模型 / System
${finalSystem}

# 执行动线 / Workflow
${finalWorkflow}

# 实战技巧 / Tactic
${finalTactic}
`;

  fs.writeFileSync(path.join(outputDir, `${col.id}.md`), mdContent);
  console.log(`   [RECONSTRUCTED] ${col.id}`);
});

console.log('✅ Deep Reconstruction Complete. Run `node scripts/sync_data.js` to update the DB.');
