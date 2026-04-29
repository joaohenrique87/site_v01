import { useState, useEffect, useMemo, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchRelatorios } from "@/service/supabase";
import { FileText, Download, Eye, Search, ChevronDown } from "lucide-react";
import glossarioIMG from "@/assets/Capa Glossario.jpg";

const CATEGORIAS = [
  { value: "todos", label: "Todos" },
  { value: "lpg", label: "LPG" },
  { value: "pnab", label: "PNAB" },
  { value: "premios", label: "Prêmios" },
  { value: "escutas", label: "Escutas" },
  {value: "estudos", label: "Estudos"}
];

// Função para extrair o ano do nome do arquivo
const extrairAno = (nome: string) => {
  const match = nome.match(/\b(20\d{2})\b/);
  return match ? match[1] : null;
};

const handleDownload = async (url: string, nome: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `${nome.split('/').pop()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (e) {
    console.error("Erro ao baixar PDF:", e);
  }
};

const RelatoriosPDF = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("todos");
  
  // Controle do filtro de anos
  const [anosAtivos, setAnosAtivos] = useState<string[]>([]);
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    fetchRelatorios().then((data) => {
      setTodos(data || []);
      setLoading(false);
    });
  }, []);

  // Fecha o dropdown se clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownAberto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Anos disponíveis extraídos dos arquivos
  const anosDisponiveis = useMemo(() => {
    const anos = new Set<string>();
    todos.forEach(arq => {
      const ano = extrairAno(arq.nome_arquivo || "");
      if (ano) anos.add(ano);
    });
    return Array.from(anos).sort((a, b) => b.localeCompare(a));
  }, [todos]);

  // Função para marcar/desmarcar um ano
  const toggleAno = (ano: string) => {
    setAnosAtivos((prev) => 
      prev.includes(ano) ? prev.filter((a) => a !== ano) : [...prev, ano]
    );
  };

  const filtrados = todos.filter((arq) => {
    const caminhoCompleto = arq?.nome_arquivo || "";
    const pastaRaiz = caminhoCompleto.split('/')[0].toLowerCase();
    const nomeExibicao = caminhoCompleto.split('/').pop() || "";

    const mapCategorias: Record<string, string> = {
      "premios": "premios",
      "pnab": "pnab",
      "lpg": "lpg",
      "lab": "lab",
      "escutas": "escutas",
      "estudos": "estudos"
    };
    const categoriaIdentificada = mapCategorias[pastaRaiz] || pastaRaiz;

    const matchBusca = nomeExibicao.toLowerCase().includes(busca.toLowerCase());
    
    const matchCategoria =
      categoriaAtiva === "todos" ||
      categoriaIdentificada === categoriaAtiva ||
      (categoriaAtiva === "escutas" && nomeExibicao.toLowerCase().includes("escuta"));

    const anoArquivo = extrairAno(nomeExibicao);
    const matchAno = anosAtivos.length === 0 || (anoArquivo && anosAtivos.includes(anoArquivo));

    const isSystemFile = nomeExibicao.includes('.empty');

    return matchBusca && matchCategoria && matchAno && !isSystemFile;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container py-8 md:py-12 px-4">
        <section className="py-10 bg-muted/20 rounded-2xl mb-12 border border-border">
          <div className="max-w-5xl mx-auto px-6">

            <div className="flex flex-col md:flex-row items-center gap-8">

              {/* Capa */}
              <div className="w-full md:w-1/3 flex justify-center">
                <img
                  src={glossarioIMG}
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
                  href="src\assets\Glossario da Cultura.pdf"
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

        {/* Cabeçalho */}
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">Relatórios em PDF</h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Pesquise e filtre nossos relatórios por categoria e ano
          </p>
        </div>

        {/* Busca Principal (Sozinha na linha) */}
        <div className="relative max-w-2xl mx-auto mb-6 md:mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>

        {/* Pills de categoria */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategoriaAtiva(cat.value)}
              className="px-4 md:px-5 py-2 rounded-full border-2 font-semibold text-sm transition-all duration-200"
              style={{
                borderColor: categoriaAtiva === cat.value ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                background: categoriaAtiva === cat.value ? 'hsl(var(--primary))' : 'transparent',
                color: categoriaAtiva === cat.value ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dropdown Customizado de Ano (Abaixo das categorias) */}
        <div className="flex justify-center mb-8 md:mb-10">
          <div className="relative min-w-[220px]" ref={dropdownRef}>
            <button
              onClick={() => setDropdownAberto(!dropdownAberto)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-border bg-background text-foreground hover:bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary text-sm transition-colors"
            >
              <span className="truncate pr-2 font-medium">
                {anosAtivos.length === 0
                  ? "Filtrar por ano"
                  : anosAtivos.length === 1
                  ? `Ano: ${anosAtivos[0]}`
                  : `${anosAtivos.length} anos selecionados`}
              </span>
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${dropdownAberto ? 'rotate-180' : ''}`} />
            </button>

            {dropdownAberto && (
              <div className="absolute z-50 w-full min-w-[220px] left-1/2 -translate-x-1/2 mt-2 bg-white dark:bg-slate-950 border border-border rounded-xl shadow-xl max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                <div 
                  className="px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer border-b border-border text-sm flex items-center gap-3 transition-colors"
                  onClick={() => { setAnosAtivos([]); setDropdownAberto(false); }}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${anosAtivos.length === 0 ? 'bg-primary border-primary text-white dark:text-primary-foreground' : 'border-slate-300 dark:border-slate-700 bg-transparent'}`}>
                    {anosAtivos.length === 0 && <span className="text-[10px] font-bold">✓</span>}
                  </div>
                  <span className={anosAtivos.length === 0 ? "font-semibold text-foreground" : "text-muted-foreground"}>Todos os anos</span>
                </div>

                {anosDisponiveis.map((ano) => {
                  const isActive = anosAtivos.includes(ano);
                  return (
                    <label 
                      key={ano} 
                      className="px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-sm flex items-center gap-3 transition-colors m-0"
                    >
                      <input
                        type="checkbox"
                        checked={isActive}
                        onChange={() => toggleAno(ano)}
                        className="hidden" 
                      />
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isActive ? 'bg-primary border-primary text-white dark:text-primary-foreground' : 'border-slate-300 dark:border-slate-700 bg-transparent'}`}>
                        {isActive && <span className="text-[10px] font-bold">✓</span>}
                      </div>
                      <span className={isActive ? "font-semibold text-foreground" : "text-muted-foreground"}>{ano}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Lista de relatórios */}
        {loading ? (
          <div className="text-center py-20 text-muted-foreground animate-pulse">Carregando relatórios...</div>
        ) : filtrados.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <FileText className="mx-auto h-12 w-12 mb-4 opacity-40" />
            <p>Nenhum relatório encontrado para seus filtros.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtrados.map((arq) => {
              const anoArquivoExibicao = extrairAno(arq.nome_arquivo || "");
              
              return (
                <div
                  key={arq.id}
                  className="relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg"
                  onMouseEnter={() => setHoveredId(arq.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="p-4 md:p-5 flex items-start gap-3 md:gap-4">
                    <div className="p-2.5 md:p-3 bg-primary/10 rounded-lg flex-shrink-0">
                      <FileText className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1 line-clamp-2 capitalize text-xs md:text-sm">
                        {arq.nome_arquivo?.split('/').pop()}
                      </h3>
                      <div className="flex items-center gap-2 flex-wrap mt-1.5">
                        <p className="text-xs text-muted-foreground">
                          {new Date(arq.created_at).toLocaleDateString("pt-BR")}
                        </p>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase">
                          {arq.nome_arquivo?.split('/')[0]}
                        </span>
                        {anoArquivoExibicao && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-border text-muted-foreground">
                            {anoArquivoExibicao}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Botões */}
                  <div className={`
                    flex items-center justify-end gap-2 px-4 pb-3
                    md:absolute md:inset-0 md:bg-background/95 md:justify-center md:px-0 md:pb-0
                    md:transition-opacity md:duration-300
                    ${hoveredId === arq.id ? 'md:opacity-100' : 'md:opacity-0 md:pointer-events-none'}
                  `}>
                    <button
                      onClick={() => window.open(arq.linkDownload, "_blank")}
                      className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 rounded-lg font-semibold text-xs transition-all"
                      style={{ background: 'hsl(var(--primary))', color: 'white' }}
                      title="Visualizar"
                    >
                      <Eye className="h-3.5 w-3.5 md:h-4 md:w-4" />
                      <span className="hidden sm:inline">Visualizar</span>
                    </button>
                    <button
                      onClick={() => handleDownload(arq.linkDownload, arq.nome_arquivo)}
                      className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 rounded-lg bg-green-600 text-white font-semibold text-xs hover:bg-green-700 transition-all"
                      title="Download"
                    >
                      <Download className="h-3.5 w-3.5 md:h-4 md:w-4" />
                      <span className="hidden sm:inline">Download</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default RelatoriosPDF;