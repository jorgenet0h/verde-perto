import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Leaf, ShoppingBasket, Store } from "lucide-react";
import { Catalog } from "@/components/Catalog";
import { ProducerPanel } from "@/components/ProducerPanel";
import logo from "@/assets/logo.png";
import heroFarmers from "@/assets/hero-farmers.png";
import bgPattern from "@/assets/bg-pattern.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Verde Perto — Hortifruti de produtores locais" },
      { name: "description", content: "Feira livre digital: frutas, verduras e legumes direto do produtor para você." },
      { property: "og:title", content: "Verde Perto" },
      { property: "og:description", content: "Hortifruti fresco, do produtor local até a sua casa." },
    ],
  }),
  component: Home,
});

function Home() {
  const [tab, setTab] = useState<"cliente" | "produtor">("cliente");

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(252,251,247,0.86), rgba(252,251,247,0.86)), url(${bgPattern})`,
        backgroundRepeat: "no-repeat, repeat",
        backgroundSize: "cover, 480px 480px",
        backgroundAttachment: "fixed, fixed",
      }}
    >
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <img src={logo} alt="" className="h-10 w-10" width={40} height={40} />
            <div className="leading-tight">
              <h1 className="font-serif text-xl font-bold text-primary">Verde Perto</h1>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                feira livre digital
              </p>
            </div>
          </div>

          <nav className="flex rounded-full border border-border bg-card p-1 text-sm">
            <button
              onClick={() => setTab("cliente")}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium transition sm:px-4 ${
                tab === "cliente" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              <ShoppingBasket className="h-4 w-4" /> <span className="hidden sm:inline">Cliente</span>
            </button>
            <button
              onClick={() => setTab("produtor")}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium transition sm:px-4 ${
                tab === "produtor" ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              }`}
            >
              <Store className="h-4 w-4" /> <span className="hidden sm:inline">Produtor</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        {tab === "cliente" ? (
          <>
            <section className="relative mb-10 overflow-hidden rounded-3xl shadow-[var(--shadow-soft)]" style={{ minHeight: "340px" }}>
              <img
                src={heroFarmers}
                alt="Produtores rurais com cesta de hortifruti fresco"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to right, rgba(22,42,14,0.85) 0%, rgba(22,42,14,0.60) 50%, rgba(0,0,0,0.08) 100%)",
                }}
              />
              <div className="relative z-10 flex h-full flex-col justify-center px-8 py-12 sm:px-12 sm:py-16">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-300">
                  <Leaf className="h-4 w-4" /> colhido hoje, na sua mesa amanhã
                </div>
                <h2
                  className="mt-1 font-serif text-3xl font-bold leading-tight text-white sm:text-5xl"
                  style={{ maxWidth: "560px", textShadow: "0 2px 12px rgba(0,0,0,0.35)" }}
                >
                  A feira do bairro, agora a um botão de distância.
                </h2>
                <p className="mt-3 max-w-md text-sm text-green-100 opacity-90 sm:text-base">
                  Escolha o que precisa e fale direto com quem plantou. Sem app, sem cadastro — só whatsapp e produto fresco.
                </p>
                <button
                  onClick={() => {
                    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-6 w-fit rounded-full border-2 border-white/70 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-green-900"
                >
                  Explorar Produtos da Estação
                </button>
              </div>
            </section>

            <div id="catalogo">
              <Catalog />
            </div>
          </>
        ) : (
          <ProducerPanel />
        )}
      </main>

      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        Feito com 🌱 para conectar você ao produtor local.
      </footer>
    </div>
  );
}
