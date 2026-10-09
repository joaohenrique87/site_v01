const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const baseDir = path.join(__dirname, 'public', 'infograficos');
const outputFile = path.join(__dirname, 'public', 'dados', 'index-infograficos.json');

function getFilesRecursively(directory) {
    let files = [];
    if (!fs.existsSync(directory)) return files;

    const items = fs.readdirSync(directory, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(directory, item.name);
        if (item.isDirectory()) {
            files = [...files, ...getFilesRecursively(fullPath)];
        } else if (item.name.toLowerCase().endsWith('.pdf')) {
            // Pega apenas o caminho relativo a partir de "public/"
            const relativePath = path.relative(path.join(__dirname, 'public'), fullPath);
            // Padroniza as barras para a web (/)
            const webPath = '/' + relativePath.split(path.sep).join('/');
            
            files.push({
                id: crypto.createHash('md5').update(webPath).digest('hex'),
                nome_arquivo: item.name,
                // encodeURI garante que espaços e acentos funcionem no servidor Linux em produção
                linkDownload: encodeURI(webPath)
            });
        }
    }
    return files;
}

function run() {
    console.log("🚀 Indexando infográficos...");
    if (!fs.existsSync(baseDir)) {
        console.log("⚠️ Pasta 'public/infograficos' não encontrada. Criando pasta vazia...");
        fs.mkdirSync(baseDir, { recursive: true });
        return;
    }

    try {
        const infograficos = getFilesRecursively(baseDir);
        const outDir = path.dirname(outputFile);
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

        fs.writeFileSync(outputFile, JSON.stringify(infograficos, null, 2));
        console.log(`✅ Sucesso! Indexados ${infograficos.length} infográficos.`);
    } catch (error) {
        console.error("❌ Erro:", error.message);
    }
}

run();