import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Importe o arquivo da imagem do sol
import sol from "@/assets/sol.png"; 

const QuemSomosSection = () => {
  return (
    // "relative" permite o posicionamento absoluto do sol e da linha de divisão
    // "z-20" garante que a sombra da divisória sobreponha a seção seguinte
    <section className="relative bg-white flex flex-col justify-center items-center z-20" style={{ minHeight: "571.29px", overflow: "hidden" }}>
      
      {/* Grafismo do Sol posicionado à esquerda */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] md:w-[500px] pointer-events-none z-0">
        <img 
          src={sol} 
          alt="Grafismo Sol" 
          // O "-ml-20" faz o sol "vazar" para fora da tela como no layout original
          className="w-full h-auto object-contain -translate-x-1/2 opacity-100 filter drop-shadow-[0_0_2px_rgba(234,179,8,1)] drop-shadow-[0_0_1px_rgba(234,179,8,1)]" 
        />
      </div>

      {/* Conteúdo Principal centralizado */}
      <div className="relative z-10 px-6 py-20" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        
        {/* Título com distanciamento superior de 96.44px conforme a régua */}
        <h2 className="text-[#2E2EB8]" style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "2rem", paddingTop: "60px" }}>
          Quem Somos
        </h2>
        
        <p style={{ fontSize: "1.125rem", marginBottom: "1.5rem", lineHeight: 1.8, color: "#333", textAlign: "justify" }}>
          O Observatório de Indicadores Culturais e Inovação em Dados (ObIC) é uma gerência dedicada da
          Secretaria de Cultura de Pernambuco (SECULT-PE) à pesquisa, monitoramento e coleta sistemática
          de dados da cultura do estado.
        </p>
        
        <p style={{ fontSize: "1.125rem", marginBottom: "3rem", lineHeight: 1.8, color: "#333", textAlign: "justify" }}>
          Com um enfoque particular no acompanhamento dos estudos relacionados às políticas culturais
          desenvolvidas pela SECULT-PE, o Observatório desenvolve e analisa indicadores culturais,
          transformando números em informações para a tomada de decisão estratégica.
        </p>
        
        {/* Botão com distanciamento inferior de 96.44px conforme a régua */}
        <div style={{ paddingBottom: "96.44px" }}>
          <Button size="lg" className="bg-[#2E2EB8] hover:bg-[#23238E]" asChild>
            <Link to="/quem-somos">
              Saiba Mais
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Divisória com desfoque (sombra) para a seção "Painéis de Dados" */}
      <div className="w-full max-w-6xl mx-auto h-[2px] bg-gray-200 mb-[43.78px] shadow-[0_4px_10px_rgba(0,0,0,0.15)] rounded-full" />
    </section>
  );
};

export default QuemSomosSection;