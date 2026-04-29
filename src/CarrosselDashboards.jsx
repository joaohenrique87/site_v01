import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Carrossel.css";

import pnab from "@/assets/pnab.png";
import lpg from "@/assets/lpg.jpeg";
import rouanet from "@/assets/rouanet.png";
import censo from "@/assets/Censo-dash.png";

const dashboards = [
  { href: "/cultura-em-numeros?tab=censo", img: censo, alt: "Dashboard Censo Cultural de Pernambuco" },
  { href: "/cultura-em-numeros?tab=PNAB", img: pnab, alt: "Dashboard PNAB" },
  { href: "/cultura-em-numeros?tab=rouanet", img: rouanet, alt: "Dashboard Lei Rouanet em Pernambuco" },
  { href: "/cultura-em-numeros?tab=lpg", img: lpg, alt: "Dashboard Lei Paulo Gustavo" },
];

const CarrosselDashboards = () => {
  const [index, setIndex] = useState(0);
  const [visiveis, setVisiveis] = useState(3);

  useEffect(() => {
    const calcVisiveis = () => {
      const w = window.innerWidth;
      if (w < 640) setVisiveis(1);
      else if (w < 1024) setVisiveis(2);
      else setVisiveis(3);
    };
    calcVisiveis();
    window.addEventListener("resize", calcVisiveis);
    return () => window.removeEventListener("resize", calcVisiveis);
  }, []);

  const maxIndex = Math.max(0, dashboards.length - visiveis);
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));
  const prev = () => setIndex((i) => Math.max(0, i - 1));

  return (
    // Removido overflow:hidden e maxWidth inline — o pai (Index.tsx) controla o espaço
    <div className="container-carrossel">
      <button
        className="seta esquerda"
        onClick={prev}
        disabled={index === 0}
        aria-label="Anterior"
      >
        <ChevronLeft size={26} />
      </button>

      <div className="carrossel-wrapper">
        <div
          className="carrossel-faixa"
          style={{ transform: `translateX(-${index * (100 / visiveis)}%)` }}
        >
          {dashboards.map((d) => (
            <div key={d.href} className="carrossel-item" style={{ width: `${100 / visiveis}%` }}>
              <Link
                to={d.href}
                className="group relative block overflow-hidden rounded-2xl border-2 border-transparent hover:border-[#2E2EB8] transition-all duration-500 shadow-lg"
              >
                <img
                  src={d.img}
                  alt={d.alt}
                  className="w-full h-auto md:h-[320px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <button
        className="seta direita"
        onClick={next}
        disabled={index >= maxIndex}
        aria-label="Próximo"
      >
        <ChevronRight size={26} />
      </button>
    </div>
  );
};

export default CarrosselDashboards;