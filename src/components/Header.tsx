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

              <NavigationMenuItem>
                <Link to="/equipe" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-black/5 font-bold" >
                  <div className="text-sm font-medium leading-none text-gray-900">Equipe</div>
                  
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/cultura-em-numeros" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-black/5 text-gray-900">
                  Cultura em Números
                </Link>
              </NavigationMenuItem>

              {/* Itens comentados para uso futuro:
              <NavigationMenuItem>
                <Link to="/Relatorios" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-black/5 text-gray-900">
                  Relatórios
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/Pesquisas" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-black/5 text-gray-900">
                  Pesquisas e Estudos
                </Link>
              </NavigationMenuItem>
              */}

            </NavigationMenuList>
          </NavigationMenu>

          <Button variant="default" className="ml-4 bg-[#2E2EB8] hover:bg-[#1e1e8a] text-white rounded-lg transition-colors" asChild>
            <Link to="/Contato">Contato</Link>
          </Button>
        </nav>

        {/* Botão hambúrguer (Mobile) */}
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
            {[
              { to: "/quem-somos", label: "Quem Somos" },
              { to: "/equipe", label: "Equipe" },
              { to: "/cultura-em-numeros", label: "Cultura em Números" },
              { to: "/relatorios", label: "Relatórios" },
              { to: "/pesquisas", label: "Pesquisas e Estudos" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-3 py-3 text-sm font-medium text-gray-900 hover:bg-black/5 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button asChild className="w-full bg-[#2E2EB8] hover:bg-[#1e1e8a] text-white">
                <Link to="/contato" onClick={() => setIsOpen(false)}>Contato</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;