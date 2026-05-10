import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILLS_DIR = path.join(__dirname, '../data/skills');
const COLS_DIR = path.join(__dirname, '../data/collections');

function sync() {
    console.log('🔄 Syncing Atomic Data to Frontend Index (JSON Only)...');

    // 1. 编译 Skills 索引
    const skillFiles = fs.readdirSync(SKILLS_DIR).filter(f => f.endsWith('.json'));
    const allSkills = skillFiles.map(f => JSON.parse(fs.readFileSync(path.join(SKILLS_DIR, f), 'utf8')));
    
    fs.writeFileSync(path.join(__dirname, '../data/wisdom_db.json'), JSON.stringify(allSkills, null, 2));
    console.log(`✅ Indexed ${allSkills.length} skills -> data/wisdom_db.json`);

    // 2. 编译 Collections 索引
    const colFiles = fs.readdirSync(COLS_DIR).filter(f => f.endsWith('.json'));
    const allCols = colFiles.map(f => JSON.parse(fs.readFileSync(path.join(COLS_DIR, f), 'utf8')));
    
    fs.writeFileSync(path.join(__dirname, '../data/collections.json'), JSON.stringify(allCols, null, 2));
    console.log(`✅ Indexed ${allCols.length} collections -> data/collections.json`);
}

sync();
