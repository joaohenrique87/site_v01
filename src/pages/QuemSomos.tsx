import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Target, Eye, Heart, Lightbulb } from "lucide-react";

const QuemSomos = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-primary py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 ">
                Quem Somos
              </h1>
              <p className="text-lg text-primary-foreground/90">
                Conheça mais sobre o Observatório de Indicadores Culturais de
                Pernambuco
              </p>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-20 bg-background">
          <div className="container max-w-4xl">
            <div className="prose prose-lg max-w-none">
              {/* Introdução */}
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 text-justify">
                O{" "}
                <strong>
                  Observatório de Indicadores Culturais e Inovação em Dados
                  (ObIC)
                </strong>{" "}
                é uma gerência da Secretaria de Cultura de Pernambuco
                (SECULT-PE), sediada no Recife, dedicada à produção,
                sistematização e análise de dados sobre a cultura no estado.
              </p>

              {/* Trajetória 2021-2022 */}
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 text-justify">
                A trajetória do Observatório tem início em 2021, com a criação
                do setor de pesquisa no Núcleo de Gestão da Informação (GI),
                marcando o início da estruturação das atividades de produção e
                análise de dados culturais na Secretaria. Em 2022, esse processo
                é ampliado com a criação do Núcleo de Inovação e Análise de
                Políticas Públicas (NIAPP), fortalecendo a atuação em pesquisa e
                avaliação de políticas públicas.
              </p>

              {/* Reestruturação 2023 */}
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 text-justify">
                Em fevereiro de 2023, o NIAPP é reestruturado e passa a se
                configurar como Observatório de Indicadores Culturais (ObIC),
                consolidando a agenda de dados e evidências na gestão cultural.
                Ainda em outubro de 2023, o ObIC passa a integrar a Rede
                Brasileira de Observatórios de Turismo (RBOT), ampliando sua
                articulação institucional em nível nacional.
              </p>

              {/* Marcos 2024-2025 */}
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 text-justify">
                Já em 2024, o Observatório alcança dois marcos importantes: em
                fevereiro, realiza o lançamento do 1º Censo Cultural de
                Pernambuco, iniciativa inédita de mapeamento do setor cultural
                no estado; e, em setembro, é oficialmente instituído como
                Gerência do Observatório de Indicadores Culturais e Inovação em
                Dados, consolidando sua posição na estrutura organizacional da
                SECULT-PE. Em 2025, o ObIC dá continuidade ao processo de
                fortalecimento institucional, ampliando suas ações de
                monitoramento, inovação em dados e articulação em redes.
              </p>

              {/* Consolidação Técnica */}
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 text-justify">
                A partir dessa trajetória, o ObIC se consolida como núcleo
                técnico responsável pelo monitoramento e avaliação das políticas
                culturais desenvolvidas em Pernambuco. Por meio da construção de
                indicadores, estudos e ferramentas de visualização, o
                Observatório transforma dados em informação qualificada,
                subsidiando a tomada de decisão e fortalecendo a gestão pública
                baseada em evidências.
              </p>

              {/* Iniciativas */}
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 text-justify">
                Entre suas principais iniciativas, destacam-se o desenvolvimento
                de painéis de acompanhamento de indicadores de políticas de
                fomento, a realização de pesquisas, relatórios técnicos, estudos
                teóricos e metodológicos, formulários e levantamentos sobre o
                setor cultural, como o mapeamento de agentes e equipamentos
                culturais.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                
                {/* Missão */}
                <div className="bg-card rounded-2xl p-8 border border-border shadow-soft">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Missão
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-justify">
                    Auxiliar a cultura pernambucana através de dados e
                    informações que promovam e apoiem as ações dos agentes,
                    equipamentos e das organizações governamentais e não
                    governamentais, contribuindo para o desenvolvimento
                    cultural.
                  </p>
                </div>

                {/* Visão */}
                <div className="bg-card rounded-2xl p-8 border border-border shadow-soft">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-accent flex items-center justify-center">
                      <Eye className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Visão
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Institucionalizar o monitoramento e a coleta sistemática de
                    dados e informações da cultura, buscando criar uma gestão
                    orientada por dados para tomada de decisão até 2026.
                  </p>
                </div>

                {/* Valores */}
                <div className="bg-card rounded-2xl p-8 border border-border shadow-soft">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Valores
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-justify">
                    Transparência, ética, inovação e integridade em todas as
                    nossas ações e relacionamentos com stakeholders.
                  </p>
                </div>

                {/* Objetivos */}
                <div className="bg-card rounded-2xl p-8 border border-border shadow-soft">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-accent flex items-center justify-center">
                      <Lightbulb className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Objetivos
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-justify">
                    Criar uma cultura de dados na gestão pública e ampliar o
                    acesso às informações sobre agentes e equipamentos culturais
                    no estado de Pernambuco.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default QuemSomos;