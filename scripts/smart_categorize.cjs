const fs = require('fs');
const path = require('path');

const collectionsPath = path.join(__dirname, '../data/collections.json');
const collections = JSON.parse(fs.readFileSync(collectionsPath, 'utf8'));
const outputDir = path.join(__dirname, '../data/collections');

console.log(`🚀 Categorizing ${collections.length} collections...`);

const getCategory = (col) => {
  const id = col.id.toLowerCase();
  const title = col.title.toLowerCase();
  const desc = col.description.toLowerCase();

  if (id.includes('brand') || id.includes('marketing') || id.includes('virality')) return '商业直觉与品牌';
  if (id.includes('writing') || id.includes('comm') || id.includes('narrative') || id.includes('persuasive') || id.includes('presentation') || id.includes('docs')) return '高影响力产出';
  if (id.includes('productivity') || id.includes('brain') || id.includes('action-engine') || id.includes('priority') || id.includes('resilience') || id.includes('pkm')) return '个人效能系统';
  if (id.includes('problem') || id.includes('thinking') || id.includes('mental-models') || id.includes('systems-thinking') || id.includes('decision') || id.includes('complexity')) return '认知增强';
  if (id.includes('engineering') || id.includes('architecture') || id.includes('quality') || id.includes('tech-spec')) return '工程架构与自律';
  if (id.includes('leadership') || id.includes('career') || id.includes('management') || id.includes('org')) return '职场与领导力';
  if (id.includes('academic') || id.includes('learning') || id.includes('synthesis') || id.includes('research')) return '学术与研习';
  
  return col.category || '综合智慧场景';
};

collections.forEach((col) => {
  const filePath = path.join(outputDir, `${col.id}.md`);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  const newCategory = getCategory(col);

  // Replace category: undefined or old category
  content = content.replace(/category: .*/, `category: ${newCategory}`);
  
  // Also fix "undefined" in the text body if any
  content = content.replace(/“undefined”/g, `“${newCategory}”`);
  content = content.replace(/'undefined'/g, `'${newCategory}'`);
  
  fs.writeFileSync(filePath, content);
  console.log(`   [UPDATED] ${col.id} -> ${newCategory}`);
});

console.log('✅ Categorization Complete. Run `node scripts/sync_data.js` to update the DB.');
