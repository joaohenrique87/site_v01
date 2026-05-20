import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Database, ClipboardList, Download, Loader2 } from "lucide-react";
import { fetchRelatorios } from "@/service/api";

import rbotImg from "@/assets/logo-rbot.png";
import censoImg from "@/assets/Censo-dash.png";
import glossarioImg from "@/assets/Capa Glossario.jpg";

const PESQUISAS_CONFIG = [
  {
    id: "RBOT",
    titulo: "Pesquisa em Rede RBOT",
    img: rbotImg,
    descricao: `Este relatório apresenta os resultados da pesquisa em rede “Intersecção entre Cultura e Turismo”, realizada em parceria entre a Rede Brasileira de Observatórios de Turismo (RBOT) e o Observatório de Indicadores Culturais (ObIC). O estudo analisa a relação entre cultura e turismo em eventos regionais no Brasil.`
  },
  {
    id: "CENSO",
    titulo: "Primeiro Censo Cultural de Pernambuco",
    img: censoImg,
    descricao: "O Censo Cultural de Pernambuco é uma iniciativa estratégica voltada ao mapeamento detalhado de agentes e equipamentos, funcionando como um instrumento fundamental para a compreensão e o planejamento do desenvolvimento cultural."
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
      const caminho = arq.linkDownload?.toLowerCase() || "";
      const nome = arq.nome_arquivo?.toLowerCase() || "";
      const categoria = arq.categoria?.toLowerCase() || "";

      // Verifica se o arquivo pertence à pasta da pesquisa (Ex: RBOT ou CENSO)
      const pertencePesquisa = categoria.includes(pastaStorage.toLowerCase()) || caminho.includes(pastaStorage.toLowerCase());

      if (!pertencePesquisa) return false;

      switch (tipo) {
        case "relatorio":
          return nome.endsWith(".pdf");
        case "base":
          return [".xlsx", ".csv", ".xls", ".zip"].some(ext => nome.endsWith(ext));
        case "formulario":
          return nome.includes("formulario");
        default:
          return false;
      }
    });

    return encontrado ? encontrado.linkDownload : null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Header />
      <main className="flex-1 container py-12 mt-24">
        
        {/* Seção Glossário */}
        <div className="rounded-2xl mb-[43.78px] border border-border shadow-sm overflow-hidden">
          <section className="py-10 bg-[#2E2EB8] relative min-h-[411.76px] flex items-center">
            <div className="relative z-20 max-w-5xl mx-auto px-6 w-full">
              <div className="flex flex-col md:flex-row items-center gap-8 h-full py-4">
                <div className="w-full md:w-1/3 flex justify-center">
                  <img
                    src={glossarioImg}
                    alt="Glossário da Cultura"
                    className="w-52 md:w-60 rounded-xl shadow-medium hover:scale-[1.02] transition-all"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Glossário da Cultura
                  </h2>
                  <p className="text-white/80 leading-relaxed text-justify mb-5">
                    O Glossário da Cultura reúne termos técnicos e expressões utilizadas nas
                    políticas culturais, facilitando a compreensão de editais, programas e
                    instrumentos de fomento.
                  </p>
                  <a
                    href="/glossario.pdf"
                    download="Glossario-da-Cultura.pdf"
                    className="inline-flex items-center gap-2 bg-white text-[#2E2EB8] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-soft"
                  >
                    <Download size={18} /> Baixar Glossário
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground">Pesquisas e Estudos</h1>
        </div>

        <Tabs defaultValue="RBOT" className="w-full">
          <TabsList className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto bg-transparent mb-12">
            {PESQUISAS_CONFIG.map((p) => (
              <TabsTrigger
                key={p.id}
                value={p.id}
                className="group relative flex flex-col p-0 overflow-hidden rounded-2xl border border-border data-[state=active]:border-primary data-[state=active]:shadow-lg transition-all duration-300 bg-card hover:shadow-md"
              >
                <div className="w-full h-48 overflow-hidden">
                  <img src={p.img} alt={p.titulo} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4 w-full text-left">
                  <span className="font-bold text-lg block group-data-[state=active]:text-primary">{p.titulo}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {PESQUISAS_CONFIG.map((p) => (
            <TabsContent key={p.id} value={p.id}>
              <div className="bg-card p-8 rounded-2xl border border-border shadow-soft">
                <h2 className="text-3xl font-bold text-primary mb-4">{p.titulo}</h2>
                <div className="bg-muted/30 p-6 rounded-xl mb-8">
                  <p className="text-lg text-muted-foreground leading-relaxed text-justify">{p.descricao}</p>
                </div>

                {loading ? (
                  <div className="flex justify-center p-4">
                    <Loader2 className="animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <BotaoArquivo
                      icon={<FileText />}
                      label="Relatório Técnico"
                      href={obterLinkArquivo(p.id, "relatorio")}
                      color="bg-primary"
                    />
                    <BotaoArquivo
                      icon={<Database />}
                      label="Base de Dados"
                      href={obterLinkArquivo(p.id, "base")}
                      color="bg-green-600"
                    />
                    <BotaoArquivo
                      icon={<ClipboardList />}
                      label="Questionário"
                      href={obterLinkArquivo(p.id, "formulario")}
                      color="bg-orange-500"
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
    download={href ? true : undefined}
    className={`
      flex items-center justify-between p-5 rounded-xl text-white transition-all shadow-md
      ${color}
      ${!href ? 'opacity-30 cursor-not-allowed grayscale' : 'hover:opacity-90 hover:scale-[1.02]'}
    `}
    onClick={(e) => !href && e.preventDefault()}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span className="font-semibold">{label} {!href && "(Em Breve)"}</span>
    </div>
    {href && <Download className="w-4 h-4" />}
  </a>
);

export default Pesquisas;