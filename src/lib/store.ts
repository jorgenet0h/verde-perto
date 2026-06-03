import { useEffect, useState } from "react";
import { supabase, type Product, type Category } from "./supabase";

export type { Category, Product };
export const productStore = {
  async getAll(): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("name");
    if (error) throw error;
    return data as Product[];
  },

  async add(p: Omit<Product, "id" | "created_at">): Promise<Product> {
    const { data, error } = await supabase
      .from("products")
      .insert(p)
      .select()
      .single();
    if (error) throw error;
    return data as Product;
  },

  async update(id: string, patch: Partial<Omit<Product, "id" | "created_at">>): Promise<void> {
    const { error } = await supabase
      .from("products")
      .update(patch)
      .eq("id", id);
    if (error) throw error;
  },

  async remove(id: string): Promise<void> {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
  },
};

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    productStore
      .getAll()
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));

    const channel = supabase
      .channel("products-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        () => {
          productStore.getAll().then(setProducts).catch(console.error);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { products, loading, error };
}

export function useAllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = () => {
    productStore
      .getAll()
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refetch();

    const channel = supabase
      .channel("all-products-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        refetch
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { products, loading, error, refetch };
}
