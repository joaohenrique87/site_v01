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
            // Garante normalização NFC para o Linux entender os acentos
            const safeName = item.name.normalize('NFC');
            const relativePath = path.relative(path.join(__dirname, 'public'), fullPath);
            const webPath = '/' + relativePath.split(path.sep).join('/');

            files.push({
                id: crypto.createHash('md5').update(webPath).digest('hex'),
                nome_arquivo: safeName,
                // Mantém o link web nativo (ex: /infograficos/Infográfico - ... .pdf)
                linkDownload: webPath.normalize('NFC')
            });
        }
    }
    return files;
}

function run() {
    console.log("🚀 Indexando infográficos (Normalização NFC)...");
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
        console.log(`✅ Sucesso! Indexados ${infograficos.length} infográficos em index-infograficos.json.`);
    } catch (error) {
        console.error("❌ Erro:", error.message);
    }
}

run();