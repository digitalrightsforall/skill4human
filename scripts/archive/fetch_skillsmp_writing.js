import axios from 'axios';
import fs from 'fs';

const API_KEY = 'sk_live_skillsmp_bM5t4UC9UnC8DNkkIoa-ml0wtYu6CBIh11T99i7UfCI';
const BASE_URL = 'https://skillsmp.com';

const QUERIES = ['writing', 'academic paper', 'social media xhs', 'technical documentation'];

async function fetchSkills(query) {
    console.log(`Searching for: ${query}...`);
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/skills/search`, {
            params: { q: query, limit: 30, sortBy: 'stars' },
            headers: { 'Authorization': `Bearer ${API_KEY}` }
        });
        // Correct path based on debug output
        return response.data.data.skills || [];
    } catch (error) {
        console.error(`Error searching for ${query}:`, error.response ? error.response.data : error.message);
        return [];
    }
}

async function run() {
    const allResults = {};
    for (const query of QUERIES) {
        const skills = await fetchSkills(query);
        allResults[query] = skills.map(s => ({
            name: s.name,
            repo: s.githubUrl || s.skillUrl || 'Unknown',
            desc: s.description || 'No description',
            author: s.author
        }));
    }

    const output = Object.entries(allResults).map(([query, skills]) => {
        let section = `## Category: ${query}\n\n`;
        if (skills.length === 0) section += "No skills found.\n\n";
        else {
            skills.forEach((s, i) => {
                section += `${i+1}. **${s.name}** (Author: ${s.author})\n   - Repo: ${s.repo}\n   - Desc: ${s.desc}\n\n`;
            });
        }
        return section;
    }).join('\n');

    const dataDir = 'data';
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
    
    fs.writeFileSync('data/skillsmp_writing_list.md', "# SkillsMP Writing Related Skills\n\n" + output);
    console.log('✅ List saved to data/skillsmp_writing_list.md');
}

run();
