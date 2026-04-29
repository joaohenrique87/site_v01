import { Link } from "react-router-dom";
import { MessageCircle,Mail, MapPin, Linkedin, Youtube, Phone } from "lucide-react";
import Whatsapp from "./Whatsapp";

const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">O</span>
              </div>
              <span className="text-lg font-bold text-foreground">ObIC</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Observatório de Indicadores Culturais e Inovação em Dados
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/quem-somos" className="text-muted-foreground hover:text-primary transition-colors">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link to="/equipe" className="text-muted-foreground hover:text-primary transition-colors">
                  Equipe
                </Link>
              </li>
              <li>
                <Link to="/cultura-em-numeros" className="text-muted-foreground hover:text-primary transition-colors">
                  Cultura em Números
                </Link>
              </li>
              <li>
                <Link to="/relatorios" className="text-muted-foreground hover:text-primary transition-colors">
                  Relatórios
                </Link>
              </li>
              <li>
                <Link to="/pesquisas" className="text-muted-foreground hover:text-primary transition-colors">
                  Pesquisas
                </Link>
              </li>
            </ul>
          </div>

          {/* Inst */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Institucional</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="https://www.pe.gov.br/" className="text-muted-foreground hover:text-primary transition-colors">
                  Governo de Pernambuco
                </Link>
              </li>
              <li>
                <Link to="https://www.cultura.pe.gov.br/" className="text-muted-foreground hover:text-primary transition-colors">
                  Cultura PE
                </Link>
              </li>
              <li>
                <Link to="https://www.mapacultural.pe.gov.br/" className="text-muted-foreground hover:text-primary transition-colors">
                  Mapa Cultural de Pernambuco
                </Link>
              </li>
              <li>
                <Link to="https://www.cultura.pe.gov.br/pagina/ouve-pe/" className="text-muted-foreground hover:text-primary transition-colors">
                  Ouvidoria - Ouve PE
                </Link>
              </li>              
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=R.+José+de+Alencar,+388+Boa+Vista+Recife+PE"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Secretaria de Cultura de Pernambuco
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:observatorio@secult.pe.gov.br" className="hover:text-primary transition-colors">
                  observatorio@secult.pe.gov.br
                </a>
              </li>
            <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0"/>
                <a href="https://wa.me/5581984942007?text=Olá%20vim%20do%20Site%20do%20Observatório%20de%20Indicadores%20Culturais" className="hover:text-primary transition-colors">
                 (81) 9.8494-2007
                </a>
              </li>
              
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Redes Sociais</h3>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/obic/"
                target="_blank"
                rel="noreferrer"
                className="h-10 w-10 rounded-full bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/secultpe"
                target="_blank"
                rel="noreferrer"
                className="h-10 w-10 rounded-full bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              >
                <Youtube className="h-5 w-5" />
              </a>

              
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} ObIC - Observatório de Indicadores Culturais. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;