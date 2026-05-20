import { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText, Download, Eye, Search, Filter, Calendar } from "lucide-react";
import glossarioImg from "@/assets/Capa Glossario.jpg";
import { fetchRelatorios } from "@/service/api";

type Arquivo = {
  id: string;
  nome_arquivo: string;
  categoria: string;
  linkDownload: string;
};

const RelatoriosPDF = () => {
  const [todos, setTodos] = useState<Arquivo[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");

  // Estados de Filtro
  const [categoriaAtiva, setCategoriaAtiva] = useState("todos");
  const [anoAtivo, setAnoAtivo] = useState("todos");

  useEffect(() => {
    fetchRelatorios().then((data) => {
      setTodos(data || []);
      setLoading(false);
    });
  }, []);

  // Extração de anos e categorias únicas para os botões
  const filtrosDisponiveis = useMemo(() => {
    const anos = new Set<string>();
    const cats = new Set<string>();

    todos.forEach(arq => {
      const match = arq.nome_arquivo.match(/\b(20\d{2})\b/);
      if (match) anos.add(match[1]);
      if (arq.categoria) cats.add(arq.categoria);
    });

    return {
      anos: ["todos", ...Array.from(anos).sort((a, b) => b.localeCompare(a))],
      categorias: ["todos", ...Array.from(cats).sort()]
    };
  }, [todos]);

  // Lógica de Filtragem Cruzada (Busca + Tipo + Ano)
  const filtrados = useMemo(() => {
    return todos.filter((arq) => {
      const nomeLower = arq.nome_arquivo.toLowerCase();
      const buscaLower = busca.toLowerCase();

      const matchBusca = nomeLower.includes(buscaLower);
      const matchCategoria = categoriaAtiva === "todos" || arq.categoria === categoriaAtiva;
      const matchAno = anoAtivo === "todos" || nomeLower.includes(anoAtivo);

      return matchBusca && matchCategoria && matchAno;
    });
  }, [todos, busca, categoriaAtiva, anoAtivo]);

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

        {/* ÁREA DE FILTROS EMPILHADOS */}
        <div className="flex flex-col gap-6 mb-12 max-w-4xl mx-auto">
          {/* 1. Barra de Pesquisa */}
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

          {/* 2. Filtro por Tipo */}
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

          {/* 3. Filtro por Ano */}
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
        </div>

        {/* Grid de Relatórios */}
        {loading ? (
          <div className="text-center py-20 text-muted-foreground animate-pulse font-bold">Carregando acervo local...</div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-4 font-medium">
              {filtrados.length} {filtrados.length === 1 ? "relatório encontrado" : "relatórios encontrados"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtrados.map((arq) => (
                <div key={arq.id} className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-primary/5 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <FileText size={24} />
                      </div>
                      <span className="text-[10px] font-black uppercase bg-muted px-2 py-1 rounded text-muted-foreground">
                        {arq.categoria}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-foreground mb-6 line-clamp-2 leading-tight h-10">
                      {arq.nome_arquivo.replace(".pdf", "")}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => window.open(arq.linkDownload, "_blank")}
                      className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-700 py-3 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors"
                    >
                      <Eye size={16} /> Visualizar Relatório
                    </button>
                    <a
                      href={arq.linkDownload}
                      download={arq.nome_arquivo}
                      className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl text-xs font-bold hover:opacity-90 transition-all shadow-sm"
                    >
                      <Download size={16} /> Baixar PDF
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {filtrados.length === 0 && (
              <div className="text-center py-20 bg-muted/10 rounded-3xl border-2 border-dashed border-border">
                <p className="text-muted-foreground font-medium">Nenhum documento atende aos filtros selecionados.</p>
                <button onClick={() => { setAnoAtivo("todos"); setCategoriaAtiva("todos"); setBusca(""); }} className="text-primary font-bold mt-2 underline">Limpar todos os filtros</button>
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