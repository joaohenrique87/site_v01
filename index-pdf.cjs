const fs = require('fs');
const path = require('path');

// Localização baseada na estrutura do seu Repomix
const baseDir = path.join(__dirname, 'public', 'pdfs');
const outputFile = path.join(__dirname, 'public', 'dados', 'index.json');

// Função para buscar arquivos em todas as subpastas (Recursiva)
function getFilesRecursively(directory) {
    let files = [];
    const items = fs.readdirSync(directory, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(directory, item.name);
        if (item.isDirectory()) {
            // Se for pasta, entra nela
            files = [...files, ...getFilesRecursively(fullPath)];
        } else if (item.name.toLowerCase().endsWith('.pdf')) {
            // Se for PDF, extrai a categoria (nome da pasta pai direta)
            const category = path.basename(directory);
            // Cria o link relativo para o navegador
            const relativePath = fullPath.split(`${path.sep}public${path.sep}`)[1];
            
            files.push({
                id: Buffer.from(item.name).toString('base64').substring(0, 10),
                nome_arquivo: item.name,
                categoria: category,
                linkDownload: `/${relativePath.replace(/\\/g, '/')}`
            });
        }
    }
    return files;
}

function run() {
    console.log("🚀 Iniciando varredura de PDFs...");
    console.log(`📍 Pasta alvo: ${baseDir}`);

    if (!fs.existsSync(baseDir)) {
        console.error("❌ ERRO: A pasta 'public/pdfs' não existe na raiz do projeto!");
        return;
    }

    try {
        const allPdfs = getFilesRecursively(baseDir);
        
        // Garante que a pasta 'dados' existe
        const outDir = path.dirname(outputFile);
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

        fs.writeFileSync(outputFile, JSON.stringify(allPdfs, null, 2));
        
        console.log(`\n✅ SUCESSO!`);
        console.log(`📄 ${allPdfs.length} PDFs encontrados.`);
        console.log(`📂 Arquivo gerado em: ${outputFile}`);
    } catch (error) {
        console.error("❌ Erro durante a execução:", error.message);
    }
}

run();