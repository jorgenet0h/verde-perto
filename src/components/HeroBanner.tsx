import heroFarmers from "@/assets/hero-farmers.png";

interface HeroBannerProps {
  onExploreClick?: () => void;
}

export function HeroBanner({ onExploreClick }: HeroBannerProps) {
  return (
    <div
      className="relative mb-8 overflow-hidden rounded-2xl"
      style={{ minHeight: "340px" }}
    >
      <img
        src={heroFarmers}
        alt="Produtores rurais com cesta de hortifruti fresco"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(30,50,20,0.82) 0%, rgba(30,50,20,0.55) 55%, rgba(0,0,0,0.05) 100%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col justify-center px-8 py-12 sm:px-12 sm:py-16">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-green-300">
          Feira livre digital
        </p>

        <h1
          className="mb-3 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
          style={{ maxWidth: "560px", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
        >
          Conectando você ao frescor da feira local.
        </h1>

        <p
          className="mb-6 text-base text-green-100"
          style={{ maxWidth: "400px" }}
        >
          Apoie agricultores familiares e coma melhor, direto da fonte.
        </p>

        <button
          onClick={onExploreClick}
          className="w-fit rounded-full border-2 border-white/80 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-green-800"
        >
          Explorar Produtos da Estação
        </button>
      </div>
    </div>
  );
}
