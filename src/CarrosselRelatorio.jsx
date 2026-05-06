import React, { useState, useEffect, useRef } from "react";
import { fetchRelatorios } from "@/service/api";
import { Loader2, ChevronLeft, ChevronRight, Eye, Download } from "lucide-react";
import "./Carrossel.css";

import * as pdfjsLib from "pdfjs-dist";
import PdfWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = PdfWorker;

const PdfCard = ({ arq }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null); // Ref para observar visibilidade
  const [loaded, setLoaded] = useState(false);
  const [erro, setErro] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // 1. Observer: Só ativa o carregamento quando o card aparece no carrossel
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Uma vez visível, não precisa mais observar
        }
      },
      { threshold: 0.1, rootMargin: "50px" } // Carrega um pouco antes de entrar na tela
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // 2. Renderização Otimizada do PDF
  useEffect(() => {
    if (!isVisible) return; // Interrompe se não estiver visível

    let cancelled = false;

    const renderCapa = async () => {
      try {
        const urlPdf = arq.linkDownload;
        if (!urlPdf) throw new Error("Link não encontrado");

        const loadingTask = pdfjsLib.getDocument({
          url: urlPdf,
          cMapUrl: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/cmaps/",
          cMapPacked: true,
          disableAutoFetch: true, // Não baixa o PDF inteiro de uma vez
          disableStream: true,
        });

        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        const canvas = canvasRef.current;
        if (!canvas || cancelled) return;

        // Scale 1.0 é suficiente para miniaturas e economiza muita RAM
        const viewport = page.getViewport({ scale: 1.0 }); 
        const context = canvas.getContext("2d", { alpha: false }); // alpha: false acelera o render

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;

        if (!cancelled) setLoaded(true);
      } catch (error) {
        console.error("Erro PDF:", error);
        if (!cancelled) setErro(true);
      }
    };

    renderCapa();
    return () => { cancelled = true; };
  }, [arq, isVisible]);

  const nomeArquivo = arq.nome_arquivo?.split("/").pop() || "Documento";

  return (
    <div
      ref={containerRef}
      className="card-relatorio-novo"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="card-capa-nova">
        {!loaded && !erro && (
          <div className="capa-placeholder">
            <Loader2 className="animate-spin text-gray-400" size={32} />
          </div>
        )}
        {erro && (
          <div className="capa-erro-nova">
            <span style={{ fontSize: 48 }}>📄</span>
            <span style={{ fontSize: 12, color: "#666", marginTop: 8 }}>PDF</span>
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="canvas-pdf"
          style={{ 
            display: loaded ? "block" : "none",
            width: "100%", 
            height: "auto" 
          }}
        />

        <div className={`card-overlay ${hovered ? "card-overlay--visible" : ""}`}>
          <a
            href={arq.linkDownload}
            target="_blank"
            rel="noreferrer"
            className="card-btn card-btn--view"
            onClick={(e) => e.stopPropagation()}
          >
            <Eye size={18} />
            <span>Visualizar</span>
          </a>
          <a
            href={arq.linkDownload}
            download
            className="card-btn card-btn--download"
            onClick={(e) => e.stopPropagation()}
          >
            <Download size={18} />
            <span>Download</span>
          </a>
        </div>
      </div>

      <div className="card-nome-barra">
        <span className="card-nome-texto" title={nomeArquivo}>
          {nomeArquivo}
        </span>
      </div>
    </div>
  );
};

const CarrosselRelatorio = () => {
  const [arquivos, setArquivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [visiveis, setVisiveis] = useState(4);

  // Ajuste de responsividade
  useEffect(() => {
    const calcVisiveis = () => {
      const w = window.innerWidth;
      if (w < 480) setVisiveis(1);
      else if (w < 768) setVisiveis(2);
      else if (w < 1024) setVisiveis(3);
      else setVisiveis(4);
    };
    calcVisiveis();
    window.addEventListener("resize", calcVisiveis);
    return () => window.removeEventListener("resize", calcVisiveis);
  }, []);

  useEffect(() => {
    fetchRelatorios()
      .then((dados) => {
        const validos = (dados || []).filter((arq) => {
          const isPdf = arq.nome_arquivo?.toLowerCase().endsWith(".pdf");
          const isPesquisas = arq.categoria?.toLowerCase() === "pesquisas";
          return isPdf && !isPesquisas;
        });
        setArquivos(validos);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar relatórios:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
        <Loader2 className="animate-spin text-white" size={32} />
      </div>
    );

  const maxIndex = Math.max(0, arquivos.length - visiveis);
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));
  const prev = () => setIndex((i) => Math.max(0, i - 1));

  return (
    <div className="container-carrossel" style={{ maxWidth: "100%", overflow: "hidden" }}>
      <button className="seta esquerda" onClick={prev} disabled={index === 0}>
        <ChevronLeft size={26} />
      </button>

      <div className="carrossel-wrapper">
        <div
          className="carrossel-faixa"
          style={{ 
            transform: `translateX(-${index * (100 / visiveis)}%)`,
            transition: "transform 0.4s ease-out",
            willChange: "transform" // Ajuda na performance da animação
          }}
        >
          {arquivos.map((arq) => (
            <div key={arq.id} className="carrossel-item" style={{ width: `${100 / visiveis}%` }}>
              <PdfCard arq={arq} />
            </div>
          ))}
        </div>
      </div>

      <button className="seta direita" onClick={next} disabled={index >= maxIndex}>
        <ChevronRight size={26} />
      </button>
    </div>
  );
};

export default CarrosselRelatorio;