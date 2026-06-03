import { useMemo, useState } from "react";
import { useProducts, type Category } from "@/lib/store";
import { ProductCard } from "./ProductCard";
import { Loader2 } from "lucide-react";

const FILTERS: Array<"Todos" | Category> = ["Todos", "Frutas", "Verduras", "Legumes"];

export function Catalog() {
  const { products, loading, error } = useProducts();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Todos");

  const visible = useMemo(
    () =>
      products
        .filter((p) => p.stock > 0)
        .filter((p) => filter === "Todos" || p.category === filter),
    [products, filter],
  );

  return (
    <section>
      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              filter === f
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Carregando produtos...
        </div>
      )}

      {error && !loading && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-8 text-center text-destructive">
          Não foi possível carregar os produtos. Tente novamente em instantes.
        </div>
      )}

      {!loading && !error && visible.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
          Nenhum produto disponível agora. Volte em breve!
        </div>
      )}

      {!loading && !error && visible.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
