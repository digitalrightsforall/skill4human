import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function download() {
    const rawRepos = fs.readFileSync(path.join(__dirname, '../data/target_repos.txt'), 'utf8')
        .split('\n')
        .map(line => line.match(/"repo_url": "(.*?)"/)?.[1])
        .filter(Boolean);

    const tempDir = path.join(__dirname, '../temp_skills');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    for (const repo of rawRepos) {
        // 将 https://github.com/user/repo/tree/main/path/to/skill 
        // 转换为 https://raw.githubusercontent.com/user/repo/main/path/to/skill/SKILL.md
        let rawUrl = repo
            .replace('github.com', 'raw.githubusercontent.com')
            .replace('/tree/', '/')
            .replace('/blob/', '/');
        
        // 加上 SKILL.md
        if (!rawUrl.endsWith('SKILL.md')) {
            rawUrl = rawUrl.endsWith('/') ? rawUrl + 'SKILL.md' : rawUrl + '/SKILL.md';
        }

        const name = repo.split('/').pop().replace(/#/g, '-');
        console.log(`Downloading: ${name} from ${rawUrl}`);

        try {
            const res = await axios.get(rawUrl);
            fs.writeFileSync(path.join(tempDir, `${name}.md`), res.data);
            console.log(`✅ Success: ${name}`);
        } catch (e) {
            console.error(`❌ Failed: ${name} (${e.message})`);
        }
    }
}

download();
