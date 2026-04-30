import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PDFList from "@/components/PDFList";
import glossarioImg from "@/assets/Capa Glossario.jpg";
import meuLogo from "@/assets/LETERING_OBIG_GRADIENTE.png"
import solImg from "@/assets/sol.png"

const DashboardFrame = ({ src, title }: { src: string; title: string }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full rounded-lg overflow-hidden">
      {loading && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', background: 'hsl(var(--muted))',
          zIndex: 10, gap: '1rem',
        }}>
          <div style={{
            width: '48px', height: '48px', border: '4px solid hsl(var(--border))',
            borderTop: '4px solid hsl(var(--primary))', borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
          <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.9rem', fontFamily: 'Sora' }}>
            Carregando dashboard...
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}
      <iframe
        src={src}
        title={title}
        className="w-full"
        style={{ minHeight: '600px', border: 'none', display: 'block' }}
        allowFullScreen
        onLoad={() => setTimeout(() => setLoading(false), 1500)}
      />
    </div>
  );
};

const VALID_TABS = ["lpg", "PNAB", "rouanet", "censo"];

const CulturaEmNumeros = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const defaultTab = VALID_TABS.includes(tabParam ?? "") ? tabParam! : "censo";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container pt-[141.81px] pb-[43.78px]">

        {/* Glossário — wrapper externo só para bordas arredondadas, sem overflow-hidden */}
        <div
          className="rounded-2xl mb-[43.78px] border border-border shadow-sm"
          style={{ minHeight: '411.76px' }}
        >
          <section
            className="py-10 bg-[#2E2EB8] rounded-2xl relative"
            style={{ minHeight: '411.76px' }}
          >
            {/* Conteúdo principal — z mais alto */}
            <div className="relative z-20 max-w-5xl mx-auto px-6" style={{ minHeight: '411.76px' }}>
              <div className="flex flex-col md:flex-row items-center gap-8 h-full py-4">
                {/* Capa */}
                <div className="w-full md:w-1/3 flex justify-center">
                  <img
                    src={glossarioImg}
                    alt="Glossário da Cultura"
                    className="w-52 md:w-60 rounded-xl shadow-medium hover:scale-[1.02] transition-all"
                  />
                </div>

                {/* Texto */}
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Glossário da Cultura
                  </h2>
                  <p className="text-white/80 leading-relaxed text-justify mb-5">
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
                    className="inline-flex items-center bg-white text-[#2E2EB8] px-6 py-3 rounded-xl font-semibold hover:scale-[1.03] transition-all shadow-soft"
                  >
                    Baixar Glossário
                  </a>
                </div>
              </div>
            </div>

            {/* Logo de fundo — blend screen remove o preto no fundo azul */}
            <div
              className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center overflow-hidden rounded-2xl"
              style={{ opacity: 0.50 }}
            >
              <img
                src={meuLogo}
                alt=""
                aria-hidden="true"
                style={{
                  width: '150%',
                  maxWidth: 'none',
                  mixBlendMode: "screen",
                }}
              />
            </div>

            {/* Sol — canto inferior direito, levemente saindo da borda */}
            <img
              src={solImg}
              alt=""
              aria-hidden="true"
              className="pointer-events-none"
              style={{
                position: 'absolute',
                bottom: '-60px',
                right: '-60px',
                width: '280px',
                height: '280px',
                objectFit: 'contain',
                mixBlendMode: 'screen',
                opacity: 0.5,
                zIndex: 11,
              }}
            />

            {/* Sol — canto superior esquerdo, menor */}
            <img
              src={solImg}
              alt=""
              aria-hidden="true"
              className="pointer-events-none"
              style={{
                position: 'absolute',
                top: '-40px',
                left: '-40px',
                width: '180px',
                height: '180px',
                objectFit: 'contain',
                mixBlendMode: 'screen',
                opacity: 0.3,
                transform: 'rotate(20deg)',
                zIndex: 11,
              }}
            />
          </section>
        </div>

        {/* Linha divisória */}
        <div className="w-full max-w-6xl mx-auto h-[2px] bg-gray-200 mb-[43.78px] shadow-[0_4px_10px_rgba(0,0,0,0.15)] rounded-full" />

        {/* Título Dados */}
        <div className="text-center mb-[43.78px]">
          <h1 className="text-4xl font-bold text-foreground mb-4">Dados</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto padding-b-[52px]">
            Acesse dados e análises sobre políticas culturais através de nossos dashboards interativos e relatórios em PDF
          </p>
        </div>


        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="flex flex-wrap w-full mb-8 h-auto gap-1">
            <TabsTrigger value="censo" className="flex-1 min-w-[120px]">Censo Cultural de Pernambuco</TabsTrigger>
            <TabsTrigger value="PNAB" className="flex-1 min-w-[120px]">PNAB</TabsTrigger>
            <TabsTrigger value="rouanet" className="flex-1 min-w-[120px]">Rouanet em Pernambuco</TabsTrigger>
            <TabsTrigger value="lpg" className="flex-1 min-w-[120px]">Lei Paulo Gustavo</TabsTrigger>
          </TabsList>

          <TabsContent value="censo" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard - Censo Cultural de Pernambuco</CardTitle>
                <CardDescription>Acesse os dados do Censo Cultural de Pernambuco</CardDescription>
              </CardHeader>
              <CardContent>
                <DashboardFrame src="https://obicrestrito.shinyapps.io/censo2025/" title="Dashboard Censo Cultural de Pernambuco" />
              </CardContent>
            </Card>
            <PDFList title="Relatórios em PDF - Censo Cultural" category="censo" />
          </TabsContent>
          
          {/* PNAB */}
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
            <PDFList title="Relatórios em PDF - PNAB" category="pnab" />
          </TabsContent>

          {/* ROUANET */}
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
            <PDFList title="Relatórios em PDF - Rouanet" category="rouanet" />
          </TabsContent>

          {/* LEI PAULO GUSTAVO */}
          <TabsContent value="lpg" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard - Lei Paulo Gustavo</CardTitle>
                <CardDescription>Visualização interativa dos dados da execução da Lei Paulo Gustavo</CardDescription>
              </CardHeader>
              <CardContent>
                <DashboardFrame src="https://obicrestrito.shinyapps.io/LPG_V2/" title="Dashboard Lei Paulo Gustavo" />
              </CardContent>
            </Card>
            <PDFList title="Relatórios em PDF - Lei Paulo Gustavo" category="lpg" />
          </TabsContent>


        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default CulturaEmNumeros;