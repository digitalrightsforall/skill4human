import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILLS_DIR = path.join(__dirname, '../data/skills');
const COLS_DIR = path.join(__dirname, '../data/collections');

function parseMarkdownWisdom(mdPath) {
    if (!fs.existsSync(mdPath)) return null;
    const content = fs.readFileSync(mdPath, 'utf8');
    
    const sections = {};
    // Split by any level of header (# or ## or ###)
    const parts = content.split(/\n#+\s+/);
    
    parts.forEach(part => {
        const lines = part.split('\n');
        const header = lines[0].toLowerCase().trim();
        let body = lines.slice(1).join('\n').trim();
        
        // Cleanup signature and markers
        body = body.replace(/\n*---\n*(\*\*?)?Produced by[\s\S]*$/i, '').trim();
        body = body.replace(/\n*---\s*$/i, '').trim();

        if (header.includes('timing')) sections.timing = body;
        else if (header.includes('philosophy')) sections.philosophy = body;
        else if (header.includes('system')) sections.system = body;
        else if (header.includes('workflow')) sections.workflow = body;
        else if (header.includes('tactic')) sections.tactic = body;
    });

    const extractField = (text, marker) => {
        if (!text) return null;
        const match = text.match(new RegExp(`${marker}[:：]\\s*([^\\n]+)`));
        return match ? match[1].trim() : null;
    };

    return {
        timing: {
            context: extractField(sections.timing || '', '典型情景') || sections.timing,
            trigger: extractField(sections.timing || '', '启动信号')
        },
        layers: [
            { type: 'Philosophy', title: '核心心法', content: sections.philosophy },
            { type: 'System', title: '落地模型', content: sections.system },
            { type: 'Workflow', title: '执行动线', content: sections.workflow },
            { type: 'Tactic', title: '实战技巧', content: sections.tactic }
        ]
    };
}

function parseCollectionMarkdown(mdPath) {
    if (!fs.existsSync(mdPath)) return null;
    const content = fs.readFileSync(mdPath, 'utf8');
    
    const sections = {};
    // Match both # Heading and ## Heading styles
    const parts = content.split(/\n#+\s+/);
    
    parts.forEach(part => {
        const lines = part.split('\n');
        const header = lines[0].toLowerCase().trim();
        let body = lines.slice(1).join('\n').trim();
        
        // Cleanup
        body = body.replace(/\n*---\n*(\*\*?)?Produced by[\s\S]*$/i, '').trim();
        body = body.replace(/\n*---\s*$/i, '').trim();

        if (header.includes('timing')) sections.timing = body;
        else if (header.includes('philosophy')) sections.philosophy = body;
        else if (header.includes('system')) sections.system = body;
        else if (header.includes('workflow')) sections.workflow = body;
        else if (header.includes('tactic')) sections.tactic = body;
    });

    return {
        timing: sections.timing || '',
        philosophy: sections.philosophy || '',
        system: sections.system || '',
        workflow: sections.workflow || '',
        tactic: sections.tactic || ''
    };
}

function sync() {
    console.log('🔄 Syncing Atomic Data & Collections with Markdown Injection...');

    // 1. Sync Skills
    const skillFiles = fs.readdirSync(SKILLS_DIR).filter(f => f.endsWith('.json'));
    const allSkills = skillFiles.map(f => {
        const skillPath = path.join(SKILLS_DIR, f);
        const mdPath = skillPath.replace('.json', '.md');
        const skillData = JSON.parse(fs.readFileSync(skillPath, 'utf8'));
        
        const aiWisdom = parseMarkdownWisdom(mdPath);
        if (aiWisdom) {
            skillData.ai_wisdom = {
                ...skillData.ai_wisdom,
                ...aiWisdom,
                score: skillData.ai_wisdom?.score || 98
            };
        }

        const rawSourcePath = skillPath.replace('.json', '.skill.md');
        if (fs.existsSync(rawSourcePath)) {
            skillData.raw_source = fs.readFileSync(rawSourcePath, 'utf8');
        }
        
        return skillData;
    });
    
    fs.writeFileSync(path.join(__dirname, '../data/wisdom_db.json'), JSON.stringify(allSkills, null, 2));
    console.log(`✅ Indexed ${allSkills.length} skills -> data/wisdom_db.json`);

    // 2. Sync Collections
    const collectionsPath = path.join(__dirname, '../data/collections.json');
    if (fs.existsSync(collectionsPath)) {
        let collections = JSON.parse(fs.readFileSync(collectionsPath, 'utf8'));
        
        const updatedCollections = collections.map(colData => {
            const mdPath = path.join(COLS_DIR, `${colData.id}.md`);
            
            // Inject v4.7 Wisdom from Markdown
            const v47Wisdom = parseCollectionMarkdown(mdPath);
            if (v47Wisdom && (v47Wisdom.timing || v47Wisdom.philosophy || v47Wisdom.system)) {
                console.log(`   📝 Injected MD Wisdom -> Collection: ${colData.id}`);
                // Preserve old data as legacy if not already preserved
                if (!colData.legacy_data) {
                    colData.legacy_data = {
                        playbook: colData.playbook,
                        detailed_analysis: colData.detailed_analysis
                    };
                }
                // Inject new v47 data
                colData.v47_data = v47Wisdom;
                colData.has_v47 = true;
            } else {
                colData.has_v47 = false;
            }

            return colData;
        });
        
        fs.writeFileSync(collectionsPath, JSON.stringify(updatedCollections, null, 2));
        console.log(`✅ Indexed ${updatedCollections.length} collections -> data/collections.json`);
    }
}

sync();
