import { supabase } from '@/lib/supabaseClient';

const BUCKET = import.meta.env.VITE_SUPABASE_BUCKET;

// encodeURIComponent encode TUDO (espaços, acentos, º, ã, etc.)
// mas precisamos preservar a "/" entre pasta/arquivo — por isso
// quebramos o caminho em segmentos e encodamos cada parte separada.
const encodarCaminho = (caminho) =>
  caminho
    .split("/")
    .map((segmento) => encodeURIComponent(segmento))
    .join("/");

const getPublicUrl = (caminho) => {
  // getPublicUrl recebe o caminho SEM encode — o SDK monta a URL internamente.
  // Porém quando o SDK falha com caracteres especiais, forçamos a URL manualmente.
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(caminho);

  // Garante que a URL final tenha todos os caracteres encodados corretamente
  const url = new URL(data.publicUrl);
  const partes = url.pathname.split("/");
  // Os últimos segmentos são o caminho do arquivo — re-encodamos só eles
  const indexStorage = partes.findIndex((p) => p === "object");
  if (indexStorage !== -1) {
    for (let i = indexStorage + 3; i < partes.length; i++) {
      partes[i] = encodeURIComponent(decodeURIComponent(partes[i]));
    }
    url.pathname = partes.join("/");
  }

  return url.toString();
};

const montarCaminho = (row) => {
 //Criar categoria 
  const categoriaBase = row.categoria ? `${row.categoria}/` : "";
  if (row.categoria && row.caminho_storage.startsWith(categoriaBase)){
    return row.caminho_storage;
  }

  if (row.caminho_storage.includes("/")){

    if (row.categoria === "pesquisas" || row.categoria === "Pesquisas"){
      return `${categoriaBase}${row.caminho_storage}`;
    }

    return row.caminho_storage;
  }
    return row.categoria ? `${categoriaBase}${row.caminho_storage}` : row.caminho_storage;
  };


export const fetchRelatorios = async () => {
  try {
    const { data, error } = await supabase
      .from("pdfs")
      .select("id, nome_arquivo, caminho_storage, created_at, categoria")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data.map((row) => {
      const caminhoCompleto = montarCaminho(row);

      return {
        categoria: row.categoria ?? null,
        id: row.id,
        nome_arquivo: row.nome_arquivo,
        caminho_storage: caminhoCompleto,
        linkDownload: getPublicUrl(caminhoCompleto),
        created_at: row.created_at,
      };
    });
  } catch (error) {
    console.error("Erro ao buscar relatórios:", error);
    return [];
  }
};