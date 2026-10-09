const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Caminhos base
const baseDir = path.join(__dirname, 'public', 'pdfs');
const outputFile = path.join(__dirname, 'public', 'dados', 'index.json');

// Remove acentos e padroniza para lowercase apenas para detectar duplicatas (não altera o nome final)
function normalizeFilename(filename) {
    return filename
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
}

function getFilesRecursively(directory) {
    let files = [];
    const items = fs.readdirSync(directory, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(directory, item.name);
        if (item.isDirectory()) {
            files = [...files, ...getFilesRecursively(fullPath)];
        } else if (item.name.toLowerCase().endsWith('.pdf')) {
            const folderName = path.basename(directory);
            const categoryClean = folderName.replace(/\d+/g, '').trim();
            
            // Pega o caminho relativo seguro para o link
            const relativePath = fullPath.split(`${path.sep}public${path.sep}`)[1];
            
            files.push({
                // ID único real via hash MD5 para evitar colisões no React
                id: crypto.createHash('md5').update(relativePath || fullPath).digest('hex'),
                nome_arquivo: item.name, // Mantém o nome 100% original
                categoria: categoryClean,
                linkDownload: `/${(relativePath || item.name).replace(/\\/g, '/')}`,
                _normalized: normalizeFilename(item.name)
            });
        }
    }
    return files;
}

function run() {
    console.log("🚀 Iniciando varredura e deduplicação de PDFs...");
    if (!fs.existsSync(baseDir)) {
        console.error("❌ Pasta não encontrada em:", baseDir);
        return;
    }

    try {
        const allPdfs = getFilesRecursively(baseDir);

        // Remove duplicatas usando o nome normalizado como chave
        const uniquePdfsMap = new Map();
        for (const pdf of allPdfs) {
            if (!uniquePdfsMap.has(pdf._normalized)) {
                uniquePdfsMap.set(pdf._normalized, pdf);
            }
        }

        // Limpa o campo temporário antes de salvar
        const finalPdfs = Array.from(uniquePdfsMap.values()).map(pdf => {
            delete pdf._normalized;
            return pdf;
        });

        const outDir = path.dirname(outputFile);
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

        fs.writeFileSync(outputFile, JSON.stringify(finalPdfs, null, 2));
        console.log(`✅ Sucesso! Indexados ${finalPdfs.length} relatórios únicos.`);
    } catch (error) {
        console.error("❌ Erro:", error.message);
    }
}

run();