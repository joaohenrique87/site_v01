import { useState, useEffect, useMemo, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText, Download, Eye, Search, Calendar, Loader2 } from "lucide-react";
import meuLogo from "@/assets/LETERING_OBIG_GRADIENTE.png";
import solImg from "@/assets/sol.png";
import glossarioImg from "@/assets/Capa Glossario.jpg";
import { fetchInfograficos } from "@/service/api";

import * as pdfjsLib from "pdfjs-dist";
import PdfWorker from "pdfjs-dist/build/pdf.worker?url";
pdfjsLib.GlobalWorkerOptions.workerSrc = PdfWorker;

// ─── Tipos ────────────────────────────────────────────────────────────────────

type Infografico = {
  id: string;
  nome_arquivo: string;
  linkDownload: string;
};

// ─── Item no formato de Lista (Capa à esquerda) ───────────────────────────────

const InfograficoListItem = ({ arq }: { arq: Infografico }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [erro, setErro] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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

        const viewport = page.getViewport({ scale: 0.8 });
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

  const nome = arq.nome_arquivo?.split("/").pop() ?? "Infográfico";
  const matchAno = arq.nome_arquivo.match(/\b(20\d{2})\b/);
  const anoDisplay = matchAno ? matchAno[1] : null;

  return (
    <div
      ref={containerRef}
      className="flex flex-col sm:flex-row items-center justify-between bg-white border border-border rounded-2xl p-4 gap-6 shadow-sm hover:shadow-md transition-all"
    >
      {/* Capa do PDF à esquerda */}
      <div className="relative w-full sm:w-36 h-48 sm:h-44 bg-[#f1f0f5] rounded-xl overflow-hidden flex items-center justify-center shrink-0 border border-border/60">
        {!loaded && !erro && (
          <Loader2 className="animate-spin text-gray-400" size={28} />
        )}
        {erro && (
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <FileText size={36} strokeWidth={1} color="#ccc" />
            <span className="text-xs font-semibold">PDF</span>
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
          style={{ display: loaded ? "block" : "none" }}
        />
      </div>

      {/* Título e Ano */}
      <div className="flex-1 min-w-0 text-center sm:text-left space-y-2">
        {anoDisplay && (
          <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2.5 py-1 rounded-md">
            Ano {anoDisplay}
          </span>
        )}
        <h3 className="text-base font-semibold text-foreground leading-snug break-words">
          {nome}
        </h3>
      </div>

      {/* Botões à direita */}
      <div className="flex sm:flex-col gap-2.5 w-full sm:w-auto shrink-0 justify-center">
        <a
          href={arq.linkDownload}
          target="_blank"
          rel="noreferrer"
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[hsl(240_60%_45%)] hover:opacity-90 transition-opacity"
        >
          <Eye size={15} /> Visualizar
        </a>
        <a
          href={arq.linkDownload}
          download={arq.nome_arquivo}
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#16a34a] hover:bg-[#12823b] transition-colors"
        >
          <Download size={15} /> Download
        </a>
      </div>
    </div>
  );
};

// ─── Página Principal de Infográficos ─────────────────────────────────────────

const Infograficos = () => {
  const [todos, setTodos] = useState<Infografico[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [anoAtivo, setAnoAtivo] = useState("todos");

  useEffect(() => {
    fetchInfograficos().then((data) => {
      setTodos(data || []);
      setLoading(false);
    });
  }, []);

  // Extrai anos disponíveis
  const anosDisponiveis = useMemo(() => {
    const anos = new Set<string>();
    todos.forEach((arq) => {
      const match = arq.nome_arquivo.match(/\b(20\d{2})\b/);
      if (match) anos.add(match[1]);
    });
    return ["todos", ...Array.from(anos).sort((a, b) => b.localeCompare(a))];
  }, [todos]);

  const normalizeText = (text: string) => {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  };

  // Filtro por busca + ano com ordenação decrescente por ano
  const filtrados = useMemo(() => {
    const buscaNormalizada = normalizeText(busca);

    const resultado = todos.filter((arq) => {
      const nomeCompleto = arq.nome_arquivo || "";
      const nomeNormalizado = normalizeText(nomeCompleto);

      const matchBusca = buscaNormalizada === "" || nomeNormalizado.includes(buscaNormalizada);
      const regexAno = new RegExp(`\\b${anoAtivo}\\b`);
      const matchAno = anoAtivo === "todos" || regexAno.test(nomeCompleto);

      return matchBusca && matchAno;
    });

    // Ordena do ano mais recente ao mais antigo
    return resultado.sort((a, b) => {
      const anoA = Number(a.nome_arquivo.match(/\b(20\d{2})\b/)?.[1] ?? 0);
      const anoB = Number(b.nome_arquivo.match(/\b(20\d{2})\b/)?.[1] ?? 0);

      if (anoA !== anoB) {
        return anoB - anoA;
      }
      return a.nome_arquivo.localeCompare(b.nome_arquivo);
    });
  }, [todos, busca, anoAtivo]);

  const limparFiltros = () => {
    setBusca("");
    setAnoAtivo("todos");
  };

  const temFiltroAtivo = busca !== "" || anoAtivo !== "todos";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container pt-[141.81px] pb-[43.78px]">

        {/* Banner do Glossário (Idêntico ao de Relatórios) */}
        <div className="rounded-2xl mb-[43.78px] border border-border shadow-sm" style={{ minHeight: "411.76px" }}>
          <section className="py-10 bg-[#2E2EB8] rounded-2xl relative" style={{ minHeight: "411.76px" }}>
            <div className="relative z-20 max-w-5xl mx-auto px-6" style={{ minHeight: "411.76px" }}>
              <div className="flex flex-col md:flex-row items-center gap-8 h-full py-4">
                <div className="w-full md:w-1/3 flex justify-center">
                  <img
                    src={glossarioImg}
                    alt="Glossário da Cultura"
                    className="w-52 md:w-60 rounded-xl shadow-medium hover:scale-[1.02] transition-all"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Glossário da Cultura</h2>
                  <p className="text-white/80 leading-relaxed text-justify mb-5">
                    O Glossário da Cultura reúne termos técnicos e expressões utilizadas nas políticas culturais,
                    facilitando a compreensão de editais, programas e instrumentos de fomento. O material foi
                    desenvolvido para apoiar agentes culturais, gestores e pesquisadores, promovendo maior
                    transparência e democratização da informação.
                  </p>
                  <a
                    href="/glossario.pdf"
                    download="Glossario-da-Cultura.pdf"
                    className="inline-flex items-center bg-white text-[#2E2EB8] px-6 py-3 rounded-xl font-semibold hover:scale-[1.03] transition-all shadow-soft"
                  >
                    <Download className="mr-2" size={18} /> Baixar Glossário
                  </a>
                </div>
              </div>
            </div>
            <div
              className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center overflow-hidden rounded-2xl"
              style={{ opacity: 0.50 }}
            >
              <img src={meuLogo} alt="" aria-hidden="true" style={{ width: "150%", maxWidth: "none", mixBlendMode: "screen" }} />
            </div>
            <img src={solImg} alt="" aria-hidden="true" className="pointer-events-none" style={{ position: "absolute", bottom: "-60px", right: "-60px", width: "280px", height: "280px", objectFit: "contain", mixBlendMode: "screen", opacity: 0.5, zIndex: 11 }} />
            <img src={solImg} alt="" aria-hidden="true" className="pointer-events-none" style={{ position: "absolute", top: "-40px", left: "-40px", width: "180px", height: "180px", objectFit: "contain", mixBlendMode: "screen", opacity: 0.3, transform: "rotate(20deg)", zIndex: 11 }} />
          </section>
        </div>

        {/* Filtros: Busca + Filtro apenas por Ano */}
        <div className="flex flex-col gap-6 mb-10 max-w-4xl mx-auto">

          {/* Busca por texto */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Pesquisar por título do infográfico..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-primary/10 focus:border-primary bg-card text-lg transition-all outline-none"
            />
          </div>

          {/* Filtro por Ano */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Calendar size={14} /> Filtrar por Ano
            </label>
            <div className="flex flex-wrap gap-2">
              {anosDisponiveis.map((ano) => (
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

        {/* Lista de infográficos */}
        {loading ? (
          <div className="text-center py-20 text-muted-foreground animate-pulse font-bold">
            Carregando infográficos...
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-6 font-medium">
              {filtrados.length}{" "}
              {filtrados.length === 1 ? "infográfico encontrado" : "infográficos encontrados"}
            </p>

            {filtrados.length === 0 ? (
              <div className="text-center py-20 bg-muted/10 rounded-3xl border-2 border-dashed border-border">
                <p className="text-muted-foreground font-medium">
                  Nenhum infográfico atende aos filtros selecionados.
                </p>
                <button
                  onClick={limparFiltros}
                  className="text-primary font-bold mt-2 underline"
                >
                  Limpar todos os filtros
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4 max-w-4xl mx-auto">
                {filtrados.map((arq) => (
                  <InfograficoListItem key={arq.id} arq={arq} />
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

export default Infograficos;