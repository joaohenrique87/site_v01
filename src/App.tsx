// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import QuemSomos from "./pages/QuemSomos";
import Equipe from "./pages/Equipe";
import Relatorios from "./pages/Relatorios";
import Pesquisas from "./pages/Pesquisas";
import CulturaEmNumeros from "./pages/CulturaEmNumeros";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import Contato from "@/pages/Contato";
import Whatsapp from "@/components/Whatsapp";
import VLibras from "@/components/VLibrasWidget";
import VLibrasWidget from "@/components/VLibrasWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
       
        
        
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quem-somos" element={<QuemSomos />} />
          <Route path="/equipe" element={<Equipe />} />          
          <Route path="/pesquisas" element={<Pesquisas />} />
          <Route path="/cultura-em-numeros" element={<CulturaEmNumeros />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        <VLibras />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;