import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Property {
  id: string;
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
}

export interface BlogPost {
  id: string;
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