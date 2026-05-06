import { useState, useEffect } from "react";
import { fetchRelatorios } from "@/service/api";
import { FileText, Download, Eye } from "lucide-react";

interface PDFListProps {
  title: string;
  category: string;
}

const PDFList = ({ title, category }: PDFListProps) => {
  const [pdfs, setPdfs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRelatorios().then((data) => {
      const filtrados = data.filter((arq: any) => {
        const caminho = arq.nome_arquivo?.toLowerCase() || "";
        const pertenceACategoria = caminho.includes(category.toLowerCase());
        const isPdf = caminho.endsWith(".pdf");
        const isNotPlaceholder = !caminho.includes(".empty");

        return pertenceACategoria && isPdf && isNotPlaceholder;
      });

      setPdfs(filtrados);
      setLoading(false);
    });
  }, [category]);

  if (loading) return <div className="text-center p-4">Carregando relatórios...</div>;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      
      {pdfs.length === 0 ? (
        <div className="border rounded-lg p-8 text-center bg-muted/20">
          <FileText className="mx-auto h-8 w-8 text-muted-foreground opacity-50 mb-2" />
          <p className="text-muted-foreground text-sm">Nenhum relatório disponível para esta categoria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pdfs.map((pdf) => (
            <div key={pdf.id} className="flex items-center justify-between p-4 border rounded-xl bg-card hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm font-medium truncate">
                  {pdf.nome_arquivo.split('/').pop()}
                </span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => window.open(pdf.linkDownload, "_blank")}
                  className="p-2 hover:bg-primary/10 rounded-full text-primary transition-colors"
                  title="Visualizar"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <a 
                  href={pdf.linkDownload} 
                  download 
                  className="p-2 hover:bg-green-100 rounded-full text-green-600 transition-colors"
                  title="Baixar"
                >
                  <Download className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PDFList;