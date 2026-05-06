export async function fetchRelatorios() {
  try {
    const response = await fetch('/dados/index.json');
    
    if (!response.ok) {
      throw new Error(`Erro HTTP ao carregar dados locais: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.map((item: any, index: number) => ({
      id: item.id || index.toString(),
      nome_arquivo: item.nome_arquivo || '',
      categoria: item.categoria || '',
      caminho_storage: item.caminho_storage || item.nome_arquivo || '',
      linkDownload: item.linkDownload || `/${item.nome_arquivo}`
    }));
    
  } catch (error) {
    console.error("Erro ao buscar relatórios locais:", error);
    return []; 
  }
}