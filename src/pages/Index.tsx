import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Link } from "react-router-dom";
import CarrosselRelatorio from "@/CarrosselRelatorio.jsx";
import QuemSomosSection from "@/components/QuemSomosSection.jsx";
import CarrosselDashboards from "@/CarrosselDashboards.jsx";

import regua from "@/assets/regua.png";
import pnab from "@/assets/pnab.png";
import lpg from "@/assets/lpg.jpeg";
import censo from "@/assets/Censo-dash.png"
import rouanet from "@/assets/rouanet.png";
import meuLogo from "@/assets/LETERING_OBIG_GRADIENTE.png"
import solImg from "@/assets/sol.png"



const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />

        <QuemSomosSection />

        {/* Painéis de Dados */}
        <section className="py-20 bg-tran max-h-[800px]">
          <div className="max-w-[1600px] mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-[#2E2EB8]" style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "2rem", paddingTop: "60px" }}>
                Painéis de Dados
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Consulte abaixo nossos painéis, onde você vai encontrar os resultados das leis analisadas por nós.
              </p>
            </div>

            {/* px-8 dá espaço para as setas que ficam -22px fora do wrapper */}
            <div className="w-full px-8">
              <CarrosselDashboards />
            </div>

          </div>
        </section>

        {/* Seção de Relatórios */}
        <section className="py-20 bg-[#2E2EB8] relative overflow-hidden min-h-[600px]">
          <div className="container relative z-30 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
              Explore Nossos Relatórios
            </h2>
            <CarrosselRelatorio />
          </div>

          {/* Logo de Fundo — PNG com transparência real */}
          <div
            className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center"
            style={{ opacity: 0.18 }}
          >
            <img
              src={meuLogo}
              alt=""
              aria-hidden="true"
              className="w-full max-w-none scale-150"
            />
          </div>

          {/* Sol — canto inferior direito */}
          <div
            className="absolute bottom-0 right-0 pointer-events-none z-10"
            style={{ width: "320px", height: "320px", transform: "translate(30%, 30%)", opacity: 0.45 }}
          >
            <img
              src={solImg}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Sol — canto superior esquerdo */}
          <div
            className="absolute top-0 left-0 pointer-events-none z-10"
            style={{ width: "220px", height: "220px", transform: "translate(-30%, -30%) rotate(180deg)", opacity: 0.28 }}
          >
            <img
              src={solImg}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-contain"
            />
          </div>
        </section>

        {/* Seção Parceiros */}
        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-[#2E2EB8] text-3xl font-bold mb-12">
              Parceiros
            </h2>
            <img
              src={regua}
              alt="Parceiros"
              className="w-full max-w-[1200px] mx-auto opacity-70"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;