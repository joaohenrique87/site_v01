import { useState, useEffect, useMemo, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText, Download, Eye, Search, Filter, Calendar, Loader2 } from "lucide-react";
import glossarioImg from "@/assets/Capa Glossario.jpg";
import { fetchRelatorios } from "@/service/api";

import * as pdfjsLib from "pdfjs-dist";
import PdfWorker from "pdfjs-dist/build/pdf.worker?url";
pdfjsLib.GlobalWorkerOptions.workerSrc = PdfWorker;

// ─── Tipos ────────────────────────────────────────────────────────────────────

type Arquivo = {
  id: string;
  nome_arquivo: string;
  categoria: string;
  linkDownload: string;
};

// ─── Card no estilo do carrossel ──────────────────────────────────────────────

const PdfCard = ({ arq }: { arq: Arquivo }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [erro, setErro] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Lazy-load: só renderiza quando visível
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "80px" }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Renderiza a capa do PDF
  useEffect(() => {
    if (!isVisible) return;
    let cancelled = false;

    const renderCapa = async () => {
      try {
        if (!arq.linkDownload) throw new Error("Sem link");
        const pdf = await pdfjsLib.getDocument({
          url: arq.linkDownload,
          cMapUrl: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/cmaps/",
          cMapPacked: true,
          disableAutoFetch: true,
          disableStream: true,
        }).promise;

        const page = await pdf.getPage(1);
        const canvas = canvasRef.current;
        if (!canvas || cancelled) return;

        const viewport = page.getViewport({ scale: 1.0 });
        const ctx = canvas.getContext("2d", { alpha: false })!;
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: ctx, viewport }).promise;
        if (!cancelled) setLoaded(true);
      } catch {
        if (!cancelled) setErro(true);
      }
    };

    renderCapa();
    return () => { cancelled = true; };
  }, [arq, isVisible]);

  // Extrai nome e categoria a partir do caminho do arquivo
  const nome = arq.nome_arquivo?.split("/").pop()?.replace(".pdf", "") ?? "Documento";
  const partes = arq.nome_arquivo?.split("/");
  const categoriaDisplay = partes && partes.length > 1 ? partes[0].trim() : (arq.categoria || "Geral");

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "14px",
        overflow: "hidden",
        background: "white",
        boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        ...(hovered && { boxShadow: "0 12px 32px rgba(0,0,0,0.2)" }),
      }}
    >
      {/* Capa */}
      <div style={{
        position: "relative",
        height: "280px",
        background: "#f1f0f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}>
        {!loaded && !erro && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", width: "100%" }}>
            <Loader2 className="animate-spin text-gray-400" size={32} />
          </div>
        )}
        {erro && (
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", height: "100%", width: "100%",
            background: "#f8f8f8", color: "#999", fontSize: "12px", gap: "4px",
          }}>
            <FileText size={48} strokeWidth={1} color="#ccc" />
            <span>PDF</span>
          </div>
        )}
        <canvas
          ref={canvasRef}
          style={{ display: loaded ? "block" : "none", width: "100%", height: "auto" }}
        />

        {/* Overlay com botões */}
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(30,20,60,0.72)",
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "12px",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.25s ease",
          backdropFilter: "blur(2px)",
        }}>
          <a
            href={arq.linkDownload}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "9px 16px", borderRadius: "8px",
              fontSize: "13px", fontWeight: 700,
              color: "white", textDecoration: "none",
              background: "hsl(240 60% 45%)",
              transition: "transform 0.15s ease",
              whiteSpace: "nowrap",
            }}
          >
            <Eye size={16} /> Visualizar
          </a>
          <a
            href={arq.linkDownload}
            download={arq.nome_arquivo}
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "9px 16px", borderRadius: "8px",
              fontSize: "13px", fontWeight: 700,
              color: "white", textDecoration: "none",
              background: "#16a34a",
              transition: "transform 0.15s ease",
              whiteSpace: "nowrap",
            }}
          >
            <Download size={16} /> Download
          </a>
        </div>
      </div>

      {/* Barra de nome + categoria */}
      <div style={{
        padding: "8px 12px",
        background: "white",
        borderTop: "1px solid #e5e7eb",
        minHeight: "44px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "8px",
      }}>
        <span style={{
          fontSize: "11.5px", fontWeight: 600, color: "#374151",
          lineHeight: 1.3,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }} title={nome}>
          {nome}
        </span>
        <span style={{
          fontSize: "9px", fontWeight: 800, textTransform: "uppercase",
          background: "#f3f4f6", color: "#6b7280",
          padding: "2px 6px", borderRadius: "4px",
          whiteSpace: "nowrap", flexShrink: 0,
        }}>
          {categoriaDisplay}
        </span>
      </div>
    </div>
  );
};

// ─── Página principal ─────────────────────────────────────────────────────────

const RelatoriosPDF = () => {
  const [todos, setTodos] = useState<Arquivo[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("todos");
  const [anoAtivo, setAnoAtivo] = useState("todos");

  useEffect(() => {
    fetchRelatorios().then((data) => {
      setTodos(data || []);
      setLoading(false);
    });
  }, []);

  // Extrai anos e categorias diretamente do caminho do arquivo (nome da pasta)
  const filtrosDisponiveis = useMemo(() => {
    const anos = new Set<string>();
    const cats = new Set<string>();

    todos.forEach((arq) => {
      // Extrai o ano
      const match = arq.nome_arquivo.match(/\b(20\d{2})\b/);
      if (match) anos.add(match[1]);

      // Extrai a categoria (nome da pasta antes da barra "/")
      const partes = arq.nome_arquivo.split("/");
      if (partes.length > 1) {
        cats.add(partes[0].trim());
      } else if (arq.categoria) {
        cats.add(arq.categoria);
      }
    });

    return {
      anos: ["todos", ...Array.from(anos).sort((a, b) => b.localeCompare(a))],
      categorias: ["todos", ...Array.from(cats).sort()],
    };
  }, [todos]);

  // Filtragem cruzada
  const filtrados = useMemo(() => {
    const buscaLower = busca.toLowerCase().trim();

    return todos.filter((arq) => {
      const nomeArquivoCompleto = arq.nome_arquivo;
      const nomeLower = nomeArquivoCompleto.toLowerCase();

      // Extrai a categoria da pasta do arquivo iterado
      const partes = nomeArquivoCompleto.split("/");
      const categoriaDoArquivo = partes.length > 1 ? partes[0].trim() : (arq.categoria || "");

      // Validação da Busca de texto
      const matchBusca = buscaLower === "" || nomeLower.includes(buscaLower);

      // Validação do Tipo (Categoria)
      const matchCategoria =
        categoriaAtiva === "todos" ||
        categoriaDoArquivo.toLowerCase() === categoriaAtiva.toLowerCase();

      // Validação do Ano
      const regexAno = new RegExp(`\\b${anoAtivo}\\b`);
      const matchAno = anoAtivo === "todos" || regexAno.test(nomeArquivoCompleto);

      return matchBusca && matchCategoria && matchAno;
    });
  }, [todos, busca, categoriaAtiva, anoAtivo]);

  const limparFiltros = () => {
    setBusca("");
    setCategoriaAtiva("todos");
    setAnoAtivo("todos");
  };

  const temFiltroAtivo = busca !== "" || categoriaAtiva !== "todos" || anoAtivo !== "todos";

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Header />

      <main className="flex-1 container py-8 md:py-12 px-4 mt-24">

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
                    className="inline-flex items-center bg-white text-[#2E2EB8] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-soft"
                  >
                    <Download className="mr-2" size={18} />
                    Baixar Glossário
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Filtros */}
        <div className="flex flex-col gap-6 mb-10 max-w-4xl mx-auto">

          {/* Busca */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Pesquisar por nome do relatório..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-primary/10 focus:border-primary bg-card text-lg transition-all outline-none"
            />
          </div>

          {/* Filtro por Tipo */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Filter size={14} /> Filtrar por Tipo
            </label>
            <div className="flex flex-wrap gap-2">
              {filtrosDisponiveis.categorias.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoriaAtiva(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
                    categoriaAtiva === cat
                      ? "bg-primary text-white border-primary shadow-md"
                      : "bg-white text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {cat === "todos" ? "Todos os Tipos" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Filtro por Ano */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Calendar size={14} /> Filtrar por Ano
            </label>
            <div className="flex flex-wrap gap-2">
              {filtrosDisponiveis.anos.map((ano) => (
                <button
                  key={ano}
                  onClick={() => setAnoAtivo(ano)}
                  className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
                    anoAtivo === ano
                      ? "bg-[#16a34a] text-white border-[#16a34a] shadow-md"
                      : "bg-white text-muted-foreground border-border hover:border-[#16a34a]/50"
                  }`}
                >
                  {ano === "todos" ? "Todos os Anos" : ano}
                </button>
              ))}
            </div>
          </div>

          {/* Limpar filtros */}
          {temFiltroAtivo && (
            <div className="flex justify-end">
              <button
                onClick={limparFiltros}
                className="text-sm text-primary font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity"
              >
                Limpar todos os filtros
              </button>
            </div>
          )}
        </div>

        {/* Grid de relatórios */}
        {loading ? (
          <div className="text-center py-20 text-muted-foreground animate-pulse font-bold">
            Carregando acervo...
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-6 font-medium">
              {filtrados.length}{" "}
              {filtrados.length === 1 ? "relatório encontrado" : "relatórios encontrados"}
            </p>

            {filtrados.length === 0 ? (
              <div className="text-center py-20 bg-muted/10 rounded-3xl border-2 border-dashed border-border">
                <p className="text-muted-foreground font-medium">
                  Nenhum documento atende aos filtros selecionados.
                </p>
                <button
                  onClick={limparFiltros}
                  className="text-primary font-bold mt-2 underline"
                >
                  Limpar todos os filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtrados.map((arq) => (
                  <PdfCard key={arq.nome_arquivo} arq={arq} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default RelatoriosPDF;