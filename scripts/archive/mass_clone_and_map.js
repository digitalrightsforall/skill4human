import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLONE_DIR = path.join(__dirname, '../cloned_repos');

async function run() {
    const repoMap = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/repo_cloning_list.json'), 'utf8'));
    const mappingResults = [];

    if (!fs.existsSync(CLONE_DIR)) fs.mkdirSync(CLONE_DIR);

    for (const [repoUrl, skills] of Object.entries(repoMap)) {
        const repoName = repoUrl.split('/').pop().replace('.git', '');
        const targetPath = path.join(CLONE_DIR, repoName);

        console.log(`\n📦 Processing Repo: ${repoName} (${repoUrl})`);
        
        try {
            if (!fs.existsSync(targetPath)) {
                console.log(`Cloning...`);
                execSync(`git clone --depth 1 ${repoUrl} ${targetPath}`, { stdio: 'inherit' });
            }

            // 在仓库中寻找每个 skill 的 SKILL.md
            skills.forEach(skill => {
                // 常见的目录命名：skill-slug 或 skill-name
                const possiblePaths = [
                    path.join(targetPath, 'SKILL.md'), // 根目录
                    path.join(targetPath, 'skills', skill.name, 'SKILL.md'),
                    path.join(targetPath, 'skills', skill.slug.split('-').pop(), 'SKILL.md'),
                ];
                
                // 暴力递归搜索 (如果上述路径都没中)
                let foundPath = possiblePaths.find(p => fs.existsSync(p));
                
                if (!foundPath) {
                    console.log(`Searching recursively for ${skill.name}...`);
                    try {
                        const searchResult = execSync(`find ${targetPath} -name "SKILL.md" | grep "${skill.name}" || true`).toString().trim().split('\n')[0];
                        if (searchResult && fs.existsSync(searchResult)) foundPath = searchResult;
                    } catch(e) {}
                }

                if (foundPath) {
                    console.log(`✅ Found: ${skill.name} -> ${foundPath}`);
                    mappingResults.push({
                        ...skill,
                        localPath: foundPath
                    });
                } else {
                    console.log(`❌ Not found: ${skill.name}`);
                }
            });

        } catch (e) {
            console.error(`Failed to process repo ${repoName}: ${e.message}`);
        }
    }

    fs.writeFileSync(path.join(__dirname, '../data/final_mapping.json'), JSON.stringify(mappingResults, null, 2));
    console.log(`\n✅ Mapping complete. ${mappingResults.length} skills ready for authentic humanizing.`);
}

run();
