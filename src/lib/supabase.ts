import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Faltam as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export type Category = "Frutas" | "Verduras" | "Legumes";

export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  stock: number;
  category: Category;
  image: string;
  producer: string;
  whatsapp: string;
  created_at?: string;
}
