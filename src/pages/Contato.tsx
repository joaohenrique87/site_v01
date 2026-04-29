import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, MapPin, Send, CheckCircle, MessageCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID  = "service_jozgifm";
const EMAILJS_TEMPLATE_ID = "template_opcnmyi";
const EMAILJS_PUBLIC_KEY  = "cv3IgmGvPiR2RduBV";

const Contato = () => {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", assunto: "", mensagem: "" });
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, EMAILJS_PUBLIC_KEY);
      setSucesso(true);
      setForm({ nome: "", email: "", telefone: "", assunto: "", mensagem: "" });
    } catch (error) {
      alert("Erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-primary py-16 text-center text-white">
          <div className="container px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Fale Conosco</h1>
            <p className="opacity-90">Dúvidas ou sugestões? Nossa equipe está pronta para ajudar.</p>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container px-4 max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
              
              {/* Coluna Informações */}
              <div className="lg:w-1/3 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Contato Direto</h2>
                  <p className="text-muted-foreground mb-6">Utilize o formulário ou nossos canais oficiais.</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                      <MapPin className="text-primary w-6 h-6" />
                      <span className="text-sm">R. José de Alencar, 388 - Recife/PE</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                      <Mail className="text-primary w-6 h-6" />
                      <span className="text-sm">observatorio@secult.pe.gov.br</span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://wa.me/5581984942007"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-3 w-full p-4 bg-[#25D366] text-white rounded-xl font-bold shadow-lg hover:scale-[1.02] transition-transform"
                >
                  <MessageCircle className="w-6 h-6" />
                  Conversar via WhatsApp
                </a>
              </div>

              {/* Coluna Formulário */}
              <div className="lg:w-2/3 bg-card border rounded-2xl p-6 md:p-10 shadow-sm">
                {sucesso ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Enviado com sucesso!</h3>
                    <button onClick={() => setSucesso(false)} className="text-primary font-semibold underline">Enviar nova mensagem</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-bold">Nome Completo *</label>
                        <input name="nome" value={form.nome} onChange={handleChange} required className="w-full p-3 rounded-lg border bg-background" placeholder="Nome Completo" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold">E-mail *</label>
                        <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full p-3 rounded-lg border bg-background" placeholder="E-Mail" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-bold">Telefone</label>
                        <input name="telefone" value={form.telefone} onChange={handleChange} className="w-full p-3 rounded-lg border bg-background" placeholder="Telefone" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold">Assunto *</label>
                        <input name="assunto" value={form.assunto} onChange={handleChange} required className="w-full p-3 rounded-lg border bg-background" placeholder="Assunto" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold">Mensagem *</label>
                      <textarea name="mensagem" value={form.mensagem} onChange={handleChange} required rows={5} className="w-full p-3 rounded-lg border bg-background resize-none" placeholder="Escreva sua mensagem." />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full md:w-max px-10 py-4 bg-primary text-white rounded-lg font-bold hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? "Enviando..." : <><Send className="w-4 h-4" /> Enviar Mensagem</>}
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contato;