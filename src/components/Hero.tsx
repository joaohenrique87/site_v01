import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

// 1. IMPORTANTE: Atualizado de volta para a extensão .png
import meuLogo from '@/assets/LETERING_OBIG_GRADIENTE.png';

import img1 from '../assets/Fotos/cultura1.jpg';
import img2 from '../assets/Fotos/cultura2.jpg';
import img3 from '../assets/Fotos/cultura3.jpg';
import img4 from '../assets/Fotos/cultura4.jpg';
import img5 from '../assets/Fotos/cultura5.jpg';
import img6 from '../assets/Fotos/cultura6.jpg';
import img7 from '../assets/Fotos/cultura7.jpg';
import img8 from '../assets/Fotos/cultura8.jpg';
import img9 from '../assets/Fotos/cultura9.jpg';
import img10 from '../assets/Fotos/cultura10.jpg';
import img11 from '../assets/Fotos/cultura11.jpg';
import img12 from '../assets/Fotos/cultura12.jpg';
import img13 from '../assets/Fotos/cultura13.jpg';

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section
      className="relative overflow-hidden bg-slate-900 flex items-center justify-center"
      style={{ height: '690px' }}
    >
      {/* 1. CAMADA DE FUNDO: Imagens rotativas */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${index === currentImage ? 'opacity-40' : 'opacity-0'}`}
          style={{
            backgroundImage: `url('${img}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}

      {/* 2. CAMADA DA MARCA D'ÁGUA PARA PNG: Logo deslocado */}
      <div className="absolute inset-0 z- overflow-hidden pointer-events-none items-center-bottom">
        {/* O drop-shadow cria um contorno suave que faz a 'borda' parecer mais grossa */}
        <img
          src={meuLogo}
          alt="ObIC"
          className="w-full max-w-none scale-150"
        />
      </div>

      {/* 3. CAMADA DE TEXTURA: Grid pattern suave */}
      <div className="absolute inset-0 z-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-10 pointer-events-none" />

      {/* 4. CAMADA DE CONTEÚDO: Textos principais */}
      <div className="container relative z-30 px-6 flex flex-col items-center text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl md:text-4xl">
            Observatório de Indicadores Culturais e Inovação em Dados de Pernambuco
          </h1>
          <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto">
            Atuando na produção, sistematização e análise de dados sobre a cultura em Pernambuco a partir de bases estruturadas, o ObIC desenvolve indicadores e estudos que qualificam o conhecimento sobre o setor cultural do estado de Pernambuco. Suas atividades apoiam a formulação, o monitoramento e a avaliação de políticas públicas. Dessa forma, contribui para o fortalecimento da gestão cultural orientada por evidências no estado.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;