import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const WISDOM_KEYWORDS = ['strategy', 'model', 'philosophy', 'principle', 'logic', 'thinking', 'mindset', 'planning', 'manage', 'review', 'expert', 'quality', 'audit', 'best practice'];

function getRepos() {
    const headers = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/discovery_headers.json'), 'utf8'));
    
    // 筛选智慧类 Skill 并提取 Repo
    const targets = headers.filter(s => {
        const text = `${s.name} ${s.description || ''}`.toLowerCase();
        return WISDOM_KEYWORDS.some(kw => text.includes(kw)) && s.repo_url;
    }).slice(0, 100); // 先取前 100 个做样本

    const repoMap = {}; // repoUrl -> [skillSlugs]
    
    targets.forEach(s => {
        // 清理 repo_url，去掉 # 后面和 tree/blob 后的路径，得到根地址
        let rootRepo = s.repo_url.split('#')[0].split('/tree/')[0].split('/blob/')[0];
        if (!rootRepo.endsWith('.git')) rootRepo += '.git';
        
        if (!repoMap[rootRepo]) repoMap[rootRepo] = [];
        repoMap[rootRepo].push({ slug: s.slug, name: s.name, originalUrl: s.repo_url });
    });

    fs.writeFileSync(path.join(__dirname, '../data/repo_cloning_list.json'), JSON.stringify(repoMap, null, 2));
    console.log(`✅ Found ${Object.keys(repoMap).length} unique repositories for ${targets.length} skills.`);
}

getRepos();
