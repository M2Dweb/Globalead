import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Property {
  id: string;
  ref: string;
  created_at: string;
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: string;
  type: string;
  energy_class: string;
  year_built: number;
  features: string[];
  images: string[];
  state?: string;
  /** Estado de venda. Vendidos e reservados continuam no site, com etiqueta. */
  availability_status?: 'disponivel' | 'reservado' | 'vendido' | 'indisponivel';
  /** false = escondido do site público, mas continua no /admin. */
  is_published?: boolean;
}

export interface BlogPost {
  id: string;
  ref: string;
  created_at: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  image: string;
  read_time: string;
}

// Função para gerar referência única
export const generateRef = (prefix: string = ''): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = prefix;
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Função para buscar por referência
// Nota: filtra por is_published para que um anúncio escondido também não
// possa ser aberto por URL direto — a página de detalhe mostra então
// "Imóvel não encontrado", como para uma referência inexistente.
export const getPropertyByRef = async (ref: string) => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('ref', ref)
    .eq('is_published', true)
    .single();

  return { data, error };
};

export const getBlogPostByRef = async (ref: string) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('ref', ref)
    .single();
  
  return { data, error };
};