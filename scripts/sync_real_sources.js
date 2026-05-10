import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCRATCH_FILE = path.join(__dirname, '../scratch/skill_files.txt');
const DATA_DIR = path.join(__dirname, '../data');

async function syncSources() {
    console.log('🔍 Syncing real sources from scratch file...');
    
    if (!fs.existsSync(SCRATCH_FILE)) {
        console.error('Scratch file not found! Run the find command first.');
        return;
    }

    const allSkillFiles = fs.readFileSync(SCRATCH_FILE, 'utf8').split('\n').filter(p => p.trim().length > 0);
    console.log(`Processing ${allSkillFiles.length} SKILL.md files.`);

    // 2. Map name to content
    const sourceMap = {};
    for (const p of allSkillFiles) {
        try {
            const content = fs.readFileSync(p, 'utf8');
            let name = "";
            try {
                const parsed = matter(content);
                name = parsed.data.name;
            } catch (e) {
                const match = content.match(/^name:\s*(.+)$/m);
                if (match) name = match[1].trim();
            }
            
            if (!name) {
                name = path.basename(path.dirname(p));
            }
            
            if (name) {
                const key = name.toLowerCase().trim();
                if (!sourceMap[key] || p.includes('official')) {
                    sourceMap[key] = content;
                }
            }
        } catch (e) {
            // Silently ignore
        }
    }
    
    console.log(`Mapped ${Object.keys(sourceMap).length} unique skill names.`);

    // 3. Update wisdom_db.json
    const dbPath = path.join(DATA_DIR, 'wisdom_db.json');
    if (!fs.existsSync(dbPath)) return;

    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    let updatedCount = 0;

    db.forEach(skill => {
        const nameKey = skill.name.toLowerCase().trim();
        if (sourceMap[nameKey]) {
            skill.raw_source = sourceMap[nameKey];
            updatedCount++;
        }
    });

    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    
    const jsPath = path.join(DATA_DIR, 'wisdom_db.js');
    fs.writeFileSync(jsPath, `export const wisdomData = ${JSON.stringify(db, null, 2)};`);

    console.log(`✅ Success! Updated ${updatedCount}/${db.length} skills.`);
}

syncSources();
