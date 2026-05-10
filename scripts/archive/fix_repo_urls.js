import fs from 'fs';
import path from 'path';

const dbPath = 'data/wisdom_db.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const realUrls = {
    "ux-writing-mastery-vFinal": "https://github.com/viktorbezdek/skillstack/tree/main/ux-writing/skills/ux-writing",
    "brand-voice-guia-vFinal": "https://github.com/guia-matthieu/clawfu-skills/tree/main/skills/branding/brand-voice",
    "tonal-boundaries-vFinal": "https://github.com/musher-dev/bundles/tree/main/marketing-site-authoring/skills/writing-brand-voice",
    "marketing-principles-silva-vFinal": "https://github.com/silvabyte/skills/tree/main/skills/marketing-principles",
    "writing-coach-45black-vFinal": "https://github.com/45black-Limited/uk-legal-plugins/tree/main/skills/writing-coach",
    "writing-clearly-davila7-vFinal": "https://github.com/davila7/claude-code-templates/tree/main/cli-tool/components/skills/development/writing-skills",
    "writing-coach-sunnypatneedi-vFinal": "https://github.com/sunnypatneedi/claude-starter-kit/tree/main/skills/personal/writing-coach",
    "humanizer-12357851-vFinal": "https://github.com/claude-skill-registry/tree/main/skills/data/humanizer",
    "writing-coach-narthur-vFinal": "https://github.com/narthur/dotfiles/tree/main/.claude/skills/writing-coach",
    "writing-coach-justmytwospence-vFinal": "https://github.com/justmytwospence/dotfiles/tree/main/shell/.claude/skills/writing-coach",
    "writing-coach-danielliraserhan-vFinal": "https://github.com/danielliraserhan-rgb/MiLibreriaMaestra/tree/main/skills-sistema-v3/writing-coach",
    "tech-spec-vFinal": "https://github.com/openclaw/skills/tree/main/skills/other/other/technical-specification",
    "api-docs-best-final": "https://github.com/openclaw/skills/tree/main/skills/other/api-documentation-best-practices"
};

const fixedDB = db.map(item => {
    if (realUrls[item.id]) {
        return { ...item, repo_url: realUrls[item.id] };
    }
    return item;
});

fs.writeFileSync(dbPath, JSON.stringify(fixedDB, null, 2));
fs.writeFileSync('data/wisdom_db.js', `export const wisdomData = ${JSON.stringify(fixedDB, null, 2)};`);
console.log('✅ Successfully fixed repository URLs for core skills.');
