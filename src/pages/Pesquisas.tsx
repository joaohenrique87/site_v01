import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Database, ClipboardList, Download, Loader2 } from "lucide-react";
import { fetchRelatorios } from "@/service/supabase";

import pnabImg from "@/assets/pnab.png";
import lpgImg from "@/assets/lpg.jpeg";
import premiosImg from "@/assets/rouanet.png";
import rbotImg from "@/assets/logo-rbot.png";
import censoImg from "@/assets/Censo-dash.png"
import glossarioImg from "@/assets/Capa Glossario.jpg"


const PESQUISAS_CONFIG = [
  {
    id: "RBOT",
    titulo: "Pesquisa em Rede RBOT",
    img: rbotImg,
    descricao: `Este relatório apresenta os resultados da pesquisa em rede “Intersecção entre Cultura e Turismo”, realizada em parceria entre a Rede Brasileira de Observatórios de Turismo (RBOT) e o Observatório de Indicadores Culturais (ObIC). O estudo analisa a relação entre cultura e turismo em eventos regionais no Brasil, a partir de dados coletados em diferentes territórios e festivais. Com base em uma abordagem colaborativa e exploratória, a pesquisa investiga o perfil dos públicos, seus comportamentos e motivações. Os resultados evidenciam a complementaridade entre cultura e turismo e seu papel no desenvolvimento dos territórios. A iniciativa contribui para a produção de dados qualificados, apoiando a formulação de políticas públicas mais eficazes.`
  },
  {
    id: "CENSO",
    titulo: "Primeiro Censo Cultural de Pernambuco",
    img: censoImg,
    descricao: "O Censo Cultural de Pernambuco é uma iniciativa estratégica voltada ao mapeamento detalhado de agentes e equipamentos, funcionando como um instrumento fundamental para a compreensão e o planejamento do desenvolvimento cultural. Por meio da coleta de dados quantitativos, a ferramenta identifica a diversidade de linguagens artísticas, suas distribuição geográficas e especificidades das áreas artístico-culturais. O Censo Cultural oferece uma base para estudos, a fim de gerar alocação eficiente de recursos e a formulação de políticas públicas inovadoras. Além de fortalecer a identidade cultural e a transparência na gestão, o Censo viabiliza a produção de relatórios técnicos da cultura como um pilar vital do desenvolvimento socioeconômico do estado."
  },

];

const Pesquisas = () => {
  const [arquivos, setArquivos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRelatorios().then(dados => {
      setArquivos(dados || []);
      setLoading(false);
    });
  }, []);

  const obterLinkArquivo = (pastaStorage: string, tipo: "relatorio" | "base" | "formulario") => {
    const encontrado = arquivos.find(arq => {
      const caminho = arq.caminho_storage?.toLowerCase() || "";
      const nome = arq.nome_arquivo?.toLowerCase() || "";

      const caminhoDesejado = `pesquisas/${pastaStorage.toLowerCase()}/`;
      const naPastaCorreta = caminho.includes(caminhoDesejado);

      if (!naPastaCorreta) return false;

      switch (tipo) {
        case "relatorio":
          // Agora verifica se a palavra está no nome OU no caminho
          // E checa se a extensão .pdf está no CAMINHO (que nunca falha), não no nome
          return (nome.includes("relatorio") || caminho.includes("relatorio")) &&
            caminho.endsWith(".pdf");

        case "base":
          // Adicionei .zip e .rar caso vocês subam arquivos compactados
          const extensoesDados = [".xlsx", ".csv", ".xls", ".rds", ".zip", ".rar"];
          const temExtensao = extensoesDados.some(ext => caminho.endsWith(ext));
          // Procura por "base" ou "banco" (já que no seu print está "Banco de Dados")
          const temPalavraChave = nome.includes("banco") || nome.includes("base") || caminho.includes("banco");

          return temExtensao || temPalavraChave;

        case "formulario":
          return nome.includes("formulario") || caminho.includes("formulario");

        default:
          return false;
      }
    });

    return encontrado ? encontrado.linkDownload : null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container py-12">
        <section className="py-10 bg-muted/20 rounded-2xl mb-12 border border-border">
          <div className="max-w-5xl mx-auto px-6">

            <div className="flex flex-col md:flex-row items-center gap-8">

              {/* Capa */}
              <div className="w-full md:w-1/3 flex justify-center">
                <img
                  src={glossarioImg}
                  alt="Glossário da Cultura"
                  className="
            w-52
            md:w-60
            rounded-xl
            shadow-medium
            hover:scale-[1.02]
            transition-all
          "
                />
              </div>

              {/* Texto */}
              <div className="flex-1">

                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Glossário da Cultura
                </h2>

                <p className="text-muted-foreground leading-relaxed text-justify mb-5">
                  O Glossário da Cultura reúne termos técnicos e expressões utilizadas nas
                  políticas culturais, facilitando a compreensão de editais, programas e
                  instrumentos de fomento. O material foi desenvolvido para apoiar agentes
                  culturais, gestores e pesquisadores, promovendo maior transparência e
                  democratização da informação.
                </p>

                <a
                  href={glossarioImg}
                  target="_blank"
                  rel="noreferrer"
                  className="
            inline-flex
            items-center
            bg-primary
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            hover:scale-[1.03]
            transition-all
            shadow-soft
          "
                >
                  Baixar Glossário
                </a>

              </div>

            </div>

          </div>
        </section>


        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground">
            Pesquisas
          </h1>
        </div>

        <Tabs defaultValue="RBOT" className="w-full">

          {/* Cards superiores */}
          <TabsList className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto bg-transparent mb-12">
            {PESQUISAS_CONFIG.map((p) => (
              <TabsTrigger
                key={p.id}
                value={p.id}
                className="group relative flex flex-col p-0 overflow-hidden rounded-2xl border border-border data-[state=active]:border-primary data-[state=active]:shadow-lg transition-all duration-300 bg-card hover:shadow-md"
              >
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.titulo}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-4 w-full text-left">
                  <span className="font-bold text-lg block group-data-[state=active]:text-primary">
                    {p.titulo}
                  </span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Conteúdo */}
          {PESQUISAS_CONFIG.map((p) => (
            <TabsContent key={p.id} value={p.id}>
              <div className="bg-card p-8 rounded-2xl border border-border shadow-soft">

                <h2 className="text-3xl font-bold text-primary mb-4">
                  {p.titulo}
                </h2>

                <div className="bg-muted/30 p-6 rounded-xl mb-8">
                  <p className="text-lg text-muted-foreground leading-relaxed text-justify">
                    {p.descricao}
                  </p>
                </div>

                {loading ? (
                  <div className="flex justify-center p-4">
                    <Loader2 className="animate-spin text-primary" />
                  </div>
                ) : (

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <BotaoArquivo
                      icon={<FileText />}
                      label="Relatório"
                      href={obterLinkArquivo(p.id, "relatorio")}
                      color="bg-gradient-primary"
                    />

                    <BotaoArquivo
                      icon={<Database />}
                      label="Base de Dados"
                      href={obterLinkArquivo(p.id, "base")}
                      color="bg-green-600"
                    />

                    <BotaoArquivo
                      icon={<ClipboardList />}
                      label="Formulário"
                      href={obterLinkArquivo(p.id, "formulario")}
                      color="bg-gradient-accent"
                    />

                  </div>

                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};


const BotaoArquivo = ({ icon, label, href, color }: any) => (
  <a
    href={href || "#"}
    target="_blank"
    rel="noreferrer"
    className={`
      flex items-center justify-between
      p-5
      rounded-xl
      text-white
      transition-all
      shadow-soft
      ${color}
      ${!href
        ? 'opacity-30 cursor-not-allowed grayscale'
        : 'hover:scale-[1.03] hover:shadow-medium'
      }
    `}
    onClick={(e) => !href && e.preventDefault()}
  >

    <div className="flex items-center gap-3">
      {icon}
      <span className="font-semibold">
        {label} {!href && "(Breve)"}
      </span>
    </div>

    {href && <Download className="w-4 h-4" />}

  </a>
);

export default Pesquisas;