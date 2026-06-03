import { useState } from "react";
import { Loader2, LogIn, LogOut, Pencil, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { productStore, useAllProducts, type Category, type Product } from "@/lib/store";

const CATEGORIES: Category[] = ["Frutas", "Verduras", "Legumes"];

type FormState = Omit<Product, "id" | "created_at"> & { id?: string };

const empty: FormState = {
  name: "",
  price: 0,
  unit: "kg",
  stock: 0,
  category: "Frutas",
  image: "",
  producer: "",
  whatsapp: "",
};

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError("E-mail ou senha incorretos.");
    setLoading(false);
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm space-y-4 rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]"
      >
        <div className="mb-2">
          <h2 className="font-serif text-2xl font-semibold">Acesso do Produtor</h2>
          <p className="text-sm text-muted-foreground">Entre com suas credenciais para gerenciar o estoque.</p>
        </div>

        <div>
          <Label>E-mail</Label>
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="produtor@exemplo.com"
          />
        </div>
        <div>
          <Label>Senha</Label>
          <Input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
        )}

        <Button type="submit" disabled={loading} className="w-full rounded-full bg-primary hover:bg-primary/90">
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogIn className="mr-2 h-4 w-4" />}
          Entrar
        </Button>
      </form>
    </div>
  );
}

export function ProducerPanel() {
  const { products, loading } = useAllProducts();
  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [session, setSession] = useState<boolean | null>(null);

  useState(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(!!data.session);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(!!session);
    });
    return () => listener.subscription.unsubscribe();
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (session === null) {
    return (
      <div className="flex items-center justify-center py-16 text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Verificando acesso...
      </div>
    );
  }

  if (!session) return <LoginScreen />;

  const startNew = () => setForm({ ...empty });
  const startEdit = (p: Product) => setForm({ ...p });
  const close = () => setForm(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    try {
      const payload = {
        ...form,
        image:
          form.image ||
          "https://images.unsplash.com/photo-1542838132-92c53300491e?w=640&h=640&fit=crop",
      };
      if (form.id) {
        const { id, ...patch } = payload;
        await productStore.update(id as string, patch);
      } else {
        const { id: _i, ...rest } = payload;
        await productStore.add(rest);
      }
      close();
    } catch (err) {
      alert("Erro ao salvar produto. Tente novamente.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remover este produto?")) return;
    try {
      await productStore.remove(id);
    } catch {
      alert("Erro ao remover produto.");
    }
  };

  const handleStockChange = async (id: string, value: number) => {
    try {
      await productStore.update(id, { stock: Math.max(0, value) });
    } catch {
      alert("Erro ao atualizar estoque.");
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl font-semibold">Meus produtos</h2>
          <p className="text-sm text-muted-foreground">
            Atualize estoque, preços e novidades em segundos.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleLogout} className="rounded-full">
            <LogOut className="mr-1 h-4 w-4" /> Sair
          </Button>
          <Button onClick={startNew} className="rounded-full bg-primary hover:bg-primary/90">
            <Plus className="mr-1 h-4 w-4" /> Novo produto
          </Button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-10 text-muted-foreground">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Carregando...
        </div>
      )}

      {!loading && (
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-secondary-foreground">
              <tr>
                <th className="px-4 py-3">Produto</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3">Preço</th>
                <th className="px-4 py-3">Estoque</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                      <div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.producer}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                  <td className="px-4 py-3">
                    R$ {p.price.toFixed(2).replace(".", ",")} / {p.unit}
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min={0}
                      defaultValue={p.stock}
                      onBlur={(e) => handleStockChange(p.id, Number(e.target.value))}
                      className="w-20 rounded-md border border-input bg-background px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button size="icon" variant="ghost" onClick={() => startEdit(p)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(p.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                    Nenhum produto cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {form && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4"
          onClick={close}
        >
          <form
            onSubmit={submit}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg space-y-4 rounded-2xl bg-card p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-semibold">
                {form.id ? "Editar produto" : "Novo produto"}
              </h3>
              <button
                type="button"
                onClick={close}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <Label>Nome</Label>
                <Input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <Label>Preço (R$)</Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label>Unidade</Label>
                <Input
                  required
                  value={form.unit}
                  onChange={(e) => setForm({ ...form, unit: e.target.value })}
                  placeholder="kg, unid, pé..."
                />
              </div>
              <div>
                <Label>Estoque</Label>
                <Input
                  type="number"
                  min="0"
                  required
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label>Categoria</Label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <Label>Produtor</Label>
                <Input
                  required
                  value={form.producer}
                  onChange={(e) => setForm({ ...form, producer: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <Label>WhatsApp (com DDI, só números)</Label>
                <Input
                  required
                  pattern="[0-9]+"
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  placeholder="5511999999999"
                />
              </div>
              <div className="col-span-2">
                <Label>URL da imagem (opcional)</Label>
                <Input
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={close}>
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={saving}
                className="bg-primary hover:bg-primary/90"
              >
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvar
              </Button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
