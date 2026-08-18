/**
 * Gera dist/sitemap.xml com as páginas estáticas + imóveis + artigos do blog,
 * obtidos do Supabase no momento do build.
 *
 * Corre no fim do build: `tsc && vite build && node scripts/generate-sitemap.mjs`.
 * Se as credenciais do Supabase não estiverem disponíveis (ou houver erro de rede),
 * gera na mesma um sitemap só com as páginas estáticas — nunca falha o build.
 */
import 'dotenv/config';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SITE_URL = 'https://globalead.pt';
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

const STATIC_ROUTES = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/imoveis', changefreq: 'weekly', priority: '0.9' },
  { loc: '/imoveis/lista', changefreq: 'daily', priority: '0.8' },
  { loc: '/credito', changefreq: 'monthly', priority: '0.9' },
  { loc: '/seguros', changefreq: 'monthly', priority: '0.9' },
  { loc: '/certificacao', changefreq: 'monthly', priority: '0.7' },
  { loc: '/sobre', changefreq: 'monthly', priority: '0.7' },
  { loc: '/carlos-goncalves', changefreq: 'monthly', priority: '0.6' },
  { loc: '/blog', changefreq: 'weekly', priority: '0.7' },
  { loc: '/contactos', changefreq: 'yearly', priority: '0.6' },
  { loc: '/termos-condicoes', changefreq: 'yearly', priority: '0.3' },
  { loc: '/politica-privacidade', changefreq: 'yearly', priority: '0.3' },
  { loc: '/resolucao-litigios', changefreq: 'yearly', priority: '0.3' },
];

async function fetchRows(table, select) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return [];
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=${select}`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    });
    if (!res.ok) {
      console.warn(`[sitemap] ${table}: HTTP ${res.status}`);
      return [];
    }
    return await res.json();
  } catch (err) {
    console.warn(`[sitemap] ${table}: ${err?.message || err}`);
    return [];
  }
}

function toDate(value) {
  if (!value) return '';
  const d = new Date(value);
  return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0];
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
  return [
    '  <url>',
    `    <loc>${SITE_URL}${loc}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : '',
    changefreq ? `    <changefreq>${changefreq}</changefreq>` : '',
    priority ? `    <priority>${priority}</priority>` : '',
    '  </url>',
  ].filter(Boolean).join('\n');
}

async function run() {
  const entries = STATIC_ROUTES.map(urlEntry);

  const properties = await fetchRows('properties', 'ref,id,created_at,availability_status');
  for (const p of properties) {
    const slug = p.ref || p.id;
    if (!slug) continue;
    // Vendidos reencaminham para o catálogo — fora do sitemap para não gerarem soft-404.
    if (p.availability_status === 'vendido') continue;
    entries.push(urlEntry({
      loc: `/imoveis/${encodeURIComponent(slug)}`,
      lastmod: toDate(p.created_at),
      changefreq: 'weekly',
      priority: '0.8',
    }));
  }

  const posts = await fetchRows('blog_posts', 'ref,id,created_at');
  for (const b of posts) {
    const slug = b.ref || b.id;
    if (!slug) continue;
    entries.push(urlEntry({
      loc: `/blog/${encodeURIComponent(slug)}`,
      lastmod: toDate(b.created_at),
      changefreq: 'monthly',
      priority: '0.6',
    }));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`;

  const out = resolve('dist', 'sitemap.xml');
  writeFileSync(out, xml, 'utf8');
  console.log(`[sitemap] ${entries.length} URLs escritas em ${out}`);
}

run().catch((err) => {
  // Nunca falhar o build por causa do sitemap.
  console.warn('[sitemap] Aviso: não foi possível gerar o sitemap dinâmico:', err?.message || err);
});
