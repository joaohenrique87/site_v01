import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full bg-[#FFFFFF]/50 backdrop-blur-md h-[98.03px] rounded-b-[30px] shadow-sm flex items-center transition-all duration-300">
      <div className="flex h-full items-center justify-between px-8 w-full">

        {/* Logo */}
        <Link to="/" className="flex items-center h-full">
          <img
            src={logo}
            alt="ObIC - Observatório de Indicadores Culturais"
            className="h-12 md:h-16 w-auto bg-transparent transition-transform hover:scale-105 object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          <NavigationMenu>
            <NavigationMenuList>

              {/* SOBRE (dropdown) */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-black/5 text-gray-900">
                  Sobre
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-2 p-3 bg-white/80 backdrop-blur-md rounded-xl shadow-md">
                    
                    <li>
                      <Link
                        to="/quem-somos"
                        className="block rounded-md p-3 transition-colors hover:bg-black/5"
                      >
                        <div className="text-sm font-medium text-gray-900">
                          Quem Somos
                        </div>
                        <p className="text-xs text-gray-500">
                          Conheça nossa história e missão
                        </p>
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/equipe"
                        className="block rounded-md p-3 transition-colors hover:bg-black/5"
                      >
                        <div className="text-sm font-medium text-gray-900">
                          Equipe
                        </div>
                        <p className="text-xs text-gray-500">
                          Conheça nossos profissionais
                        </p>
                      </Link>
                    </li>

                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* LINKS DIRETOS */}
              <NavigationMenuItem>
                <Link
                  to="/cultura-em-numeros"
                  className="inline-flex h-10 items-center rounded-md px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-black/5"
                >
                  Cultura em Números
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  to="/relatorios"
                  className="inline-flex h-10 items-center rounded-md px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-black/5"
                >
                  Relatórios
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  to="/pesquisas"
                  className="inline-flex h-10 items-center rounded-md px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-black/5"
                >
                  Pesquisas e Estudos
                </Link>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>

          {/* BOTÃO CONTATO */}
          <Button
            variant="default"
            className="ml-4 bg-[#2E2EB8] hover:bg-[#1e1e8a] text-white rounded-lg transition-colors"
            asChild
          >
            <Link to="/contato">Contato</Link>
          </Button>
        </nav>

        {/* Mobile Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden hover:bg-black/5 text-gray-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-[98.03px] left-0 w-full lg:hidden border-t border-white/20 bg-[#FFFFFF]/70 backdrop-blur-xl px-4 py-4 rounded-b-[30px] shadow-lg">
          <nav className="flex flex-col space-y-1">

            <Link to="/quem-somos" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-gray-900 hover:bg-black/5">
              Quem Somos
            </Link>

            <Link to="/equipe" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-gray-900 hover:bg-black/5">
              Equipe
            </Link>

            <Link to="/cultura-em-numeros" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-gray-900 hover:bg-black/5">
              Cultura em Números
            </Link>

            <Link to="/relatorios" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-gray-900 hover:bg-black/5">
              Relatórios
            </Link>

            <Link to="/pesquisas" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-gray-900 hover:bg-black/5">
              Pesquisas e Estudos
            </Link>

            <div className="pt-2">
              <Button asChild className="w-full bg-[#2E2EB8] hover:bg-[#1e1e8a] text-white">
                <Link to="/contato" onClick={() => setIsOpen(false)}>
                  Contato
                </Link>
              </Button>
            </div>

          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;