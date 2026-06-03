import { useState } from "react";
import { MessageCircle, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const max = product.stock;

  const handleOrder = () => {
    const msg = `Olá, gostaria de pedir ${qty} ${product.unit} de ${product.name}`;
    const url = `https://wa.me/${product.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={640}
          height={640}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-primary/95 px-3 py-1 text-xs font-semibold text-primary-foreground">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="font-serif text-xl font-semibold leading-tight text-foreground">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground">por {product.producer}</p>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">
              R$ {product.price.toFixed(2).replace(".", ",")}
            </span>
            <span className="ml-1 text-sm text-muted-foreground">/{product.unit}</span>
          </div>
          <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
            {product.stock} {product.unit} disp.
          </span>
        </div>

        <div className="mt-auto flex items-center gap-2">
          <div className="flex items-center rounded-full border border-border bg-background">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="p-2 text-muted-foreground hover:text-foreground"
              aria-label="Diminuir"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-7 text-center text-sm font-semibold">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(max, q + 1))}
              className="p-2 text-muted-foreground hover:text-foreground"
              aria-label="Aumentar"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <Button onClick={handleOrder} className="flex-1 rounded-full bg-accent text-accent-foreground shadow-[var(--shadow-warm)] hover:bg-accent/90">
            <MessageCircle className="mr-1 h-4 w-4" />
            Pedir
          </Button>
        </div>
      </div>
    </article>
  );
}
