import fs from 'fs';
import path from 'path';

const headers = JSON.parse(fs.readFileSync('data/discovery_headers.json', 'utf8'));

const keywords = ['writing', 'write', 'author', 'document', 'documentation', 'copywriter', 'copywriting', 'content', 'storytelling', 'paper', 'spec', 'proposal', 'academic', 'scientific'];

const results = headers.filter(s => {
    const text = `${s.name} ${s.description || ''} ${s.description_zh || ''}`.toLowerCase();
    return keywords.some(kw => text.includes(kw)) && s.repo_url && s.repo_url.includes('github.com');
}).map(s => ({
    name: s.name,
    repo: s.repo_url,
    desc: s.description || s.description_zh || 'No description'
}));

console.log(`Found ${results.length} writing-related skills with GitHub URLs:\n`);
results.forEach((s, i) => {
    console.log(`${i+1}. ${s.name}\n   Repo: ${s.repo}\n   Desc: ${s.desc.substring(0, 100)}...\n`);
});
