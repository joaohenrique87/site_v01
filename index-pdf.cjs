const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'public', 'pdfs');
const outputFile = path.join(__dirname, 'public', 'dados', 'index.json');

function getFilesRecursively(directory) {
    let files = [];
    const items = fs.readdirSync(directory, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(directory, item.name);
        if (item.isDirectory()) {
            files = [...files, ...getFilesRecursively(fullPath)];
        } else if (item.name.toLowerCase().endsWith('.pdf')) {
            // 1. Pega o nome da pasta pai
            const folderName = path.basename(directory);

            // 2. LÓGICA DE SEPARAÇÃO:
            // Remove números (anos) para criar a categoria limpa
            // Ex: "PNAB 2024" vira "PNAB"
            const categoryClean = folderName.replace(/\d+/g, '').trim();

            const relativePath = fullPath.split(`${path.sep}public${path.sep}`)[1];
            
            files.push({
                // Gerando ID único baseado no caminho para evitar duplicatas
                id: Buffer.from(relativePath).toString('base64').substring(0, 12),
                nome_arquivo: item.name,
                categoria: categoryClean, // Agora apenas o texto
                linkDownload: `/${relativePath.replace(/\\/g, '/')}`
            });
        }
    }
    return files;
}

function run() {
    console.log("🚀 Iniciando varredura filtrada...");
    if (!fs.existsSync(baseDir)) {
        console.error("❌ Pasta não encontrada!");
        return;
    }

    try {
        const allPdfs = getFilesRecursively(baseDir);
        const outDir = path.dirname(outputFile);
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

        fs.writeFileSync(outputFile, JSON.stringify(allPdfs, null, 2));
        console.log(`✅ Sucesso! Categoria texto separada dos anos.`);
    } catch (error) {
        console.error("❌ Erro:", error.message);
    }
}

run();