import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LeiaMais from "@/components/LeiaMais";
import manuella from "@/../public/imagens/manu.png";
import danillo from "@/../public/imagens/Danillo Rafael ObIC.jpg";
import mariana from "@/../public/imagens/Mariana Barros ObIC.jpg";
import joao from "@/../public/imagens/João Henrique - ObIC.jpg";
import pedro from "@/../public/imagens/Pedro Augusto - ObiC.jpg";
import danilo from "@/../public/imagens/Danilo Goncalves ObIC.jpg";
import yasmim from "@/../public/imagens/yasmim.png";
import cacau from "@/../public/imagens/cacau.png";
import ana from "@/../public/imagens/ana.png";
import meuLogo from "@/assets/LETERING_OBIG_GRADIENTE.png";
import lili from "@/../public/imagens/Lili.jpg"

const institucional = [
  {
    name: "Cacau de Paula",
    role: "Secretária de Cultura de Pernambuco",
    bio: "Jornalista, formada pela UNICAP, com MBA em Gestão de Marketing e Vendas pelo Cedepe Business School. Foi Secretária de Turismo e Lazer da Prefeitura do Recife e atuou no Marketing da Empresa Pernambucana de Turismo, onde ocupou os cargos de executiva sênior e gestora nacional, além de diretora comercial da Empetur. Também foi gerente de captação de Eventos Internacionais do Recife Convention & Visitors Bureau. Sempre divulgando a cultura de Pernambuco como nosso maior diferencial turístico e DNA do nosso estado, assumiu a gestão da Secretaria de Cultura do Governo do Estado de Pernambuco em agosto de 2023. O foco da sua gestão, alinhado ao plano de governo da governadora Raquel Lyra, é alavancar a cadeia produtiva da Cultura com a geração de emprego e renda, além de salvaguardar e valorizar as tradições do Estado.",
    initials: "CP",
    photo: cacau,
    highlight: true,
  },
  {
    name: "Ana Paula Jardim",
    role: "Secretária Executiva de Gestão",
    bio: "Ana Paula Nebl Jardim, advogada, pedagoga e especialista em Gestão Pública pela UPE, servidora pública do Estado de Pernambuco e atual Secretária Executiva de Gestão da Secretaria de Cultura de Pernambuco.",
    initials: "AP",
    photo: ana,
    highlight: true,
  },
  {
    name: "Yasmim Neves",
    role: "Secretária Executiva de Cultura",
    bio: "Yasmim Neves, brincante, Administradora de formação, foi Superintendente de Administração e Finanças, Gerente de Controle Interno, Gerente Administrativa, assumiu a Gerencia de Políticas Culturais e hoje exerce a função de Secretaria Executiva de Cultura da Secretaria Estadual de Cultura.",
    initials: "YN",
    photo: yasmim,
    highlight: true,
  },
];

const teamMembers = [
  {
    name: "Manuella Oliveira",
    role: "Gerente",
    bio: "Doutora em Sociologia pela Universidade Federal de Pernambuco (UFPE) e pela Universidad de La República (UDELAR - Uruguai), Bacharel em Ciências Sociais e Mestre em Desenvolvimento Local, pela Universidade Federal Rural de Pernambuco (UFRPE). Integra o Observatório desde setembro de 2023.",
    initials: "MO",
    photo: manuella,
  },
  {
    name: "Danillo Rafael",
    role: "Analista de dados e Pesquisador",
    bio: "Doutorando e Mestre em Ciência Política pela Universidade Federal de Pernambuco, Bacharel em Relações Internacionais. Tem interesse em políticas públicas, análise de dados e métodos de pesquisa. Integra o Observatório desde julho de 2022.",
    initials: "DR",
    photo: danillo,
  },
  {
    name: "Mariana Barros",
    role: "Analista de dados e Pesquisador",
    bio: "Mestranda em Políticas Públicas pela Universidade Federal de Pernambuco, Bacharel em Ciência Política com Ênfase em Relações Internacionais pela Universidade Federal de Pernambuco (UFPE). Tem interesse pela área de políticas públicas, políticas culturais, análise de dados. Integra o Observatório desde julho de 2022.",
    initials: "MB",
    photo: mariana,
  },
  {
    name: "João Henrique",
    role: "Analista de dados e Pesquisador",
    bio: "Graduação em Análise de Desenvolvimento de Sistema - SENAC. Integra o Observatório desde Julho de 2024.",
    initials: "JH",
    photo: joao,
  },
  {
    name: "Pedro Augusto",
    role: "Analista de Dados e Pesquisador",
    bio: "Mestrando em Informática Aplicada pela Universidade Federal Rural de Pernambuco, Bacharel em Ciências Atuariais pela Universidade Federal de Pernambuco. Tem interesse na área de analise de dados e políticas públicas. Integra o Observatório desde março de 2026.",
    initials: "PA",
    photo: pedro,
  },
  {
    name: "Danilo Gonçalves",
    role: "Analista de Dados e Pesquisador",
    bio: "Doutor em Administração Pública e Governo pela Fundação Getulio Vargas (FGV), bacharel e mestre em Ciência Política pela Universidade Federal de Pernambuco (UFPE).",
    initials: "DG",
    photo: danilo,
  },
  {
    name: "Liliane Gobetti Fagundes",
    role: "Analista de dados e Pesquisadora",
    bio: "Bacharela em Ciências Sociais pela Universidade Federal do Rio Grande do Sul (UFRGS). Mestre em Ciência Política pela Universidade Federal de Pernambuco (UFPE) e atualmente doutoranda em Ciência Política pela mesma universidade. Integra o ObIC desde setembro de 2023.",
    initials: "LGF",
    photo: lili,
  },

];

const Equipe = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-0 bg-[#2E2EB8] relative overflow-hidden min-h-[520px] flex flex-col justify-end items-center pb-[60px]">
          <div className="absolute inset-0 z-10 opacity-40 pointer-events-none flex items-center justify-center">
            <img
              src={meuLogo}
              alt="ObIC Background"
              className="w-full max-w-none scale-150"
            />
          </div>

          <div className="container relative z-30 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-10">
              Nossa Equipe
            </h2>
            <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto font-medium">
              Conheça os profissionais e pesquisadores que compõem a estrutura
              institucional e técnica do nosso Observatório.
            </p>
          </div>
        </section>

        {/* Estrutura Institucional */}
        <section className="py-24 bg-muted/20 relative">
          <div className="container">
            <div className="max-w-md mx-auto mb-16">
              {institucional.slice(0, 1).map((member, index) => (
                <Card key={index} className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-2xl bg-white overflow-hidden">
                  <CardHeader className="text-center pt-10 pb-4">
                    <Avatar className="h-40 w-40 md:h-48 md:w-48 mx-auto mb-6 shadow-sm">
                      <AvatarImage src={member.photo} className="object-cover" />
                      <AvatarFallback className="text-4xl bg-[#2E2EB8] text-white font-bold">{member.initials}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-[#2E2EB8] text-2xl font-bold">{member.name}</CardTitle>
                    <CardDescription className="text-gray-600 font-medium mt-2 text-base">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-8 pb-10 text-gray-700 text-sm leading-relaxed text-justify">
                    <LeiaMais text={member.bio} />
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="w-px h-16 bg-gray-200 mx-auto mb-16" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-10">
              {institucional.slice(1).map((member, index) => (
                <Card
                  key={index}
                  className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-2xl bg-white overflow-hidden hover:shadow-[0_8px_30px_rgba(46,46,184,0.12)] transition-shadow duration-300"
                >
                  <CardHeader className="text-center pt-10 pb-4">
                    <Avatar className="h-40 w-40 md:h-48 md:w-48 mx-auto mb-6 shadow-sm">
                      <AvatarImage src={member.photo} className="object-cover" />
                      <AvatarFallback className="text-4xl bg-[#2E2EB8] text-white font-bold">{member.initials}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-[#2E2EB8] text-2xl font-bold">{member.name}</CardTitle>
                    <CardDescription className="text-gray-600 font-medium mt-2 text-base">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-8 pb-10 text-gray-700 text-sm leading-relaxed text-justify">
                    <LeiaMais text={member.bio} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div
            className="absolute bottom-0 left-0 w-full h-[8px] bg-gray-100"
            style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
          />
        </section>

        {/* Equipe ObIC */}
        <section className="py-24 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center mb-20">
              <h2 className="text-4xl font-bold text-[#2E2EB8] mb-4">
                Equipe do Observatório
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-2xl bg-white overflow-hidden hover:shadow-[0_8px_30px_rgba(46,46,184,0.15)] transition-shadow duration-300"
                >
                  <CardHeader className="text-center pt-10 pb-4">
                    <Avatar className="h-40 w-40 md:h-48 md:w-48 mx-auto mb-6 shadow-sm">
                      <AvatarImage src={member.photo} alt={member.name} className="object-cover" />
                      <AvatarFallback className="text-4xl font-bold bg-[#2E2EB8] text-white">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl text-[#2E2EB8] font-bold">
                      {member.name}
                    </CardTitle>
                    <CardDescription className="text-sm font-medium text-gray-500 mt-2">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-8 pb-10 text-gray-700 text-sm leading-relaxed text-justify">
                    <LeiaMais text={member.bio} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Equipe;