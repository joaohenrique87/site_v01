import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileList from "@/components/FileList";
import glossarioImg from "@/assets/Capa Glossario.jpg";
import meuLogo from "@/assets/LETERING_OBIG_GRADIENTE.png"
import solImg from "@/assets/sol.png"
import { Download } from "lucide-react";

// ─── Ícones inline ────────────────────────────────────────────────────────────

const ExpandIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─── Componente DashboardFrame ────────────────────────────────────────────────

const DashboardFrame = ({ src, title }: { src: string; title: string }) => {
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Fecha com a tecla Esc
  useEffect(() => {
    if (!isFullscreen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullscreen(false);
        setLoading(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  // Impede scroll da página quando fullscreen está aberto
  useEffect(() => {
    document.body.style.overflow = isFullscreen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isFullscreen]);

 
  

  return (
    <>
      {/* ── Botão "Tela cheia" ── */}
      <div style={{ display: "flex", justifyContent: "flex-center", marginBottom: "8px" }}>
        <button
          onClick={() => { setIsFullscreen(true); setLoading(true); }}
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "#2E2EB8", color: "#fff",
            border: "none", borderRadius: "8px",
            padding: "8px 16px", fontSize: "0.85rem",
            fontFamily: "Sora", fontWeight: 600,
            cursor: "pointer", boxShadow: "0 2px 8px rgba(46,46,184,0.25)",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          title="Abrir em tela cheia"
        >
          <ExpandIcon />
          Tela cheia
        </button>
      </div>

      {/* ── Painel normal ── */}
      <div className="relative w-full rounded-lg overflow-hidden">
        
        <iframe
          src={src}
          title={title}
          className="w-full"
          style={{ minHeight: "600px", border: "none", display: "block" }}
          allowFullScreen
          onLoad={() => setTimeout(() => setLoading(false), 1500)}
        />
      </div>

      {/* ── Overlay fullscreen ── */}
      {isFullscreen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "#fff", display: "flex", flexDirection: "column",
        }}>
          {/* Barra superior */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "10px 20px", background: "#2E2EB8", flexShrink: 0,
          }}>
            <span style={{
              color: "#fff", fontFamily: "Sora", fontWeight: 600, fontSize: "0.95rem",
            }}>
              {title}
            </span>
            <button
              onClick={() => { setIsFullscreen(false); setLoading(true); }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "rgba(255,255,255,0.15)", color: "#fff",
                border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: "8px",
                padding: "6px 14px", fontSize: "0.85rem",
                fontFamily: "Sora", fontWeight: 600,
                cursor: "pointer", transition: "background 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.28)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
              title="Fechar tela cheia (Esc)"
            >
              <CloseIcon />
              Fechar
            </button>
          </div>

          {/* iframe ocupando o restante */}
          <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            
            <iframe
              src={src}
              title={title}
              style={{ width: "100%", height: "100%", border: "none", display: "block" }}
              allowFullScreen
              onLoad={() => setTimeout(() => setLoading(false), 1500)}
            />
          </div>
        </div>
      )}
    </>
  );
};

// ─── Tabs válidas ─────────────────────────────────────────────────────────────

const VALID_TABS = ["lpg", "PNAB", "rouanet", "censo", "censo_snc", "lab"];

// ─── Página principal ─────────────────────────────────────────────────────────

const CulturaEmNumeros = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const defaultTab = VALID_TABS.includes(tabParam ?? "") ? tabParam! : "censo";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container pt-[141.81px] pb-[43.78px]">

        {/* Glossário */}
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

        <div className="w-full max-w-6xl mx-auto h-[2px] bg-gray-200 mb-[43.78px] shadow-[0_4px_10px_rgba(0,0,0,0.15)] rounded-full" />

        <div className="text-center mb-[43.78px]">
          <h1 className="text-4xl font-bold text-foreground mb-4">Dados</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Acesse dados e análises sobre políticas culturais através de nossos dashboards interativos e relatórios em PDF
          </p>
        </div>

        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full mb-8 h-auto gap-3 bg-transparent">
            <TabsTrigger value="censo"     className="border py-3 data-[state=active]:bg-primary data-[state=active]:text-white shadow-sm">Censo Cultural de Pernambuco</TabsTrigger>
            <TabsTrigger value="censo_snc" className="border py-3 data-[state=active]:bg-primary data-[state=active]:text-white shadow-sm">Institucionalização da Cultura</TabsTrigger>
            <TabsTrigger value="PNAB"      className="border py-3 data-[state=active]:bg-primary data-[state=active]:text-white shadow-sm">PNAB</TabsTrigger>
            <TabsTrigger value="rouanet"   className="border py-3 data-[state=active]:bg-primary data-[state=active]:text-white shadow-sm">Rouanet em Pernambuco</TabsTrigger>
            <TabsTrigger value="lpg"       className="border py-3 data-[state=active]:bg-primary data-[state=active]:text-white shadow-sm lg:col-start-1">Lei Paulo Gustavo</TabsTrigger>
            <TabsTrigger value="lab"       className="border py-3 data-[state=active]:bg-primary data-[state=active]:text-white shadow-sm">Lei Aldir Blanc de Emergência Cultural</TabsTrigger>
          </TabsList>

          <TabsContent value="censo_snc" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard - Institucionalização da Cultura em Pernambuco</CardTitle>
                <CardDescription>Acesse os dados da Institucionalização da Cultura em Pernambuco</CardDescription>
              </CardHeader>
              <CardContent>
                <DashboardFrame src="https://obic.shinyapps.io/censo_snc/" title="Dashboard Institucionalização" />
              </CardContent>
            </Card>
            <FileList title="Relatórios em PDF" category="censo_snc" />
          </TabsContent>

          <TabsContent value="censo" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard - Censo Cultural de Pernambuco</CardTitle>
                <CardDescription>Acesse os dados do Censo Cultural de Pernambuco</CardDescription>
              </CardHeader>
              <CardContent>
                <DashboardFrame src="https://obic.shinyapps.io/censo2025/" title="Dashboard Censo Cultural" />
              </CardContent>
            </Card>
            <FileList title="Relatórios em PDF - Censo Cultural" category="censo" />
          </TabsContent>

          <TabsContent value="PNAB" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard - PNAB Ciclo 1</CardTitle>
                <CardDescription>Acompanhe a implementação e resultados da PNAB Ciclo 1</CardDescription>
              </CardHeader>
              <CardContent>
                <DashboardFrame src="https://secultpe-obic.shinyapps.io/pnab/" title="Dashboard PNAB Ciclo 1" />
              </CardContent>
            </Card>
            <FileList title="Relatórios em PDF - PNAB" category="pnab" />
          </TabsContent>

          <TabsContent value="rouanet" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard - Lei Rouanet em Pernambuco</CardTitle>
                <CardDescription>Dados e indicadores da Lei Rouanet no Estado de Pernambuco</CardDescription>
              </CardHeader>
              <CardContent>
                <DashboardFrame src="https://secultpe-obic.shinyapps.io/rouanet-pe/" title="Dashboard Lei Rouanet PE" />
              </CardContent>
            </Card>
            <FileList title="Relatórios em PDF - Rouanet" category="rouanet" />
          </TabsContent>

          <TabsContent value="lpg" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard - Lei Paulo Gustavo</CardTitle>
                <CardDescription>Visualização interativa dos dados da execução da Lei Paulo Gustavo</CardDescription>
              </CardHeader>
              <CardContent>
                <DashboardFrame src="https://obic.shinyapps.io/LPG_V2/" title="Dashboard Lei Paulo Gustavo" />
              </CardContent>
            </Card>
            <FileList title="Relatórios em PDF - Lei Paulo Gustavo" category="lpg" />
          </TabsContent>

          <TabsContent value="lab" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard - Lei Aldir Blanc de Emergência Cultural</CardTitle>
                <CardDescription>Visualização interativa dos dados da execução da Lei Aldir Blanc</CardDescription>
              </CardHeader>
              <CardContent>
                <DashboardFrame src="https://secultpe-obic.shinyapps.io/LABOBIC/" title="Dashboard Lei Aldir Blanc de Emergência Cultural" />
              </CardContent>
            </Card>
            <FileList title="Relatórios em PDF - Lei Paulo Gustavo" category="lpg" />
          </TabsContent>

        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default CulturaEmNumeros;