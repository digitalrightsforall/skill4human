import fs from 'fs';
import path from 'path';

const dbPath = 'data/wisdom_db.json';
const collectionsFile = 'data/collections.js';

// 拆解 Skills
if (fs.existsSync(dbPath)) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    db.forEach(skill => {
        const id = skill.id.replace('-vFinal', '');
        fs.writeFileSync(`data/skills/${id}.json`, JSON.stringify(skill, null, 2));
    });
    console.log(`✅ Split ${db.length} skills into data/skills/`);
}

// 拆解 Collections
if (fs.existsSync(collectionsFile)) {
    const content = fs.readFileSync(collectionsFile, 'utf8');
    const cols = JSON.parse(content.replace('export const collectionsData = ', '').replace(';', ''));
    cols.forEach(col => {
        fs.writeFileSync(`data/collections/${col.id}.json`, JSON.stringify(col, null, 2));
    });
    console.log(`✅ Split ${cols.length} collections into data/collections/`);
}
