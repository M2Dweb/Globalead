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

// Idiomas do site. O português vive na raiz, cada idioma extra num prefixo.
// Mantém-se alinhado com src/i18n/languages.ts.
const LANGUAGES = ['pt', 'en'];
const DEFAULT_LANG = 'pt';
const HREFLANG = { pt: 'pt-PT', en: 'en' };

const pathForLang = (lang, path) =>
  lang === DEFAULT_LANG ? path : path === '/' ? `/${lang}` : `/${lang}${path}`;

/**
 * Há tradução utilizável neste idioma? Espelha src/lib/translations.ts.
 *
 * Um imóvel sem tradução continua a abrir em /en (com o texto português, como
 * o site faz em qualquer campo por traduzir), mas não é declarado ao Google:
 * pedir a indexação de uma página inglesa cheia de português é pedir para ser
 * tratado como conteúdo duplicado.
 */
const temTraducao = (row, lang, campos) =>
  lang !== DEFAULT_LANG &&
  campos.some((campo) => {
    const valor = row?.translations?.[lang]?.[campo];
    return typeof valor === 'string' && valor.replace(/<[^>]*>/g, '').trim() !== '';
  });

const CAMPOS_IMOVEL = ['title', 'description'];
const CAMPOS_ARTIGO = ['title', 'excerpt', 'content'];

/** Idiomas em que esta linha merece entrar no sitemap. */
const idiomasDe = (row, campos) =>
  LANGUAGES.filter((lang) => lang === DEFAULT_LANG || temTraducao(row, lang, campos));
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

async function fetchRows(table, select, filter = '') {
  if (!SUPABASE_URL || !SUPABASE_KEY) return [];
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=${select}${filter}`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    });
    if (!res.ok) {
      console.warn(`[sitemap] ${table}: HTTP ${res.status}`);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.warn(`[sitemap] ${table}: ${err?.message || err}`);
    return null;
  }
}

/**
 * Igual, mas a pedir também a coluna `translations`.
 *
 * Se a migração ainda não tiver corrido, o PostgREST responde 400 por causa da
 * coluna que não existe. Repetimos então sem ela: o sitemap sai só em
 * português, em vez de sair sem um único imóvel — que é o que aconteceria se
 * um deploy chegasse antes da migração.
 */
async function fetchTraduziveis(table, select, filter = '') {
  const comTraducoes = await fetchRows(table, `${select},translations`, filter);
  if (comTraducoes) return comTraducoes;

  console.warn(`[sitemap] ${table}: sem coluna "translations" — a gerar só a versão portuguesa.`);
  return (await fetchRows(table, select, filter)) || [];
}

function toDate(value) {
  if (!value) return '';
  const d = new Date(value);
  return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0];
}

/**
 * Uma entrada por idioma, cada uma a declarar as alternativas via hreflang.
 * É assim que o Google percebe que /imoveis e /en/imoveis são a mesma página
 * noutra língua, em vez de conteúdo duplicado.
 */
function urlEntries({ loc, lastmod, changefreq, priority, langs = LANGUAGES }) {
  const alternates = langs
    .map((lang) =>
      `    <xhtml:link rel="alternate" hreflang="${HREFLANG[lang]}" href="${SITE_URL}${pathForLang(lang, loc)}" />`)
    .concat(
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${pathForLang(DEFAULT_LANG, loc)}" />`);

  return langs.map((lang) => [
    '  <url>',
    `    <loc>${SITE_URL}${pathForLang(lang, loc)}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : '',
    changefreq ? `    <changefreq>${changefreq}</changefreq>` : '',
    priority ? `    <priority>${priority}</priority>` : '',
    ...alternates,
    '  </url>',
  ].filter(Boolean).join('\n')).join('\n');
}

async function run() {
  const entries = STATIC_ROUTES.map(urlEntries);

  // Anúncios escondidos ficam fora do sitemap — senão o Google continuava a
  // indexar um URL que agora responde "Imóvel não encontrado".
  const properties = await fetchTraduziveis('properties', 'ref,id,created_at', '&is_published=eq.true');
  for (const p of properties) {
    const slug = p.ref || p.id;
    if (!slug) continue;
    entries.push(urlEntries({
      loc: `/imoveis/${encodeURIComponent(slug)}`,
      lastmod: toDate(p.created_at),
      changefreq: 'weekly',
      priority: '0.8',
      langs: idiomasDe(p, CAMPOS_IMOVEL),
    }));
  }

  const posts = await fetchTraduziveis('blog_posts', 'ref,id,created_at');
  for (const b of posts) {
    const slug = b.ref || b.id;
    if (!slug) continue;
    entries.push(urlEntries({
      loc: `/blog/${encodeURIComponent(slug)}`,
      lastmod: toDate(b.created_at),
      changefreq: 'monthly',
      priority: '0.6',
      langs: idiomasDe(b, CAMPOS_ARTIGO),
    }));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;

  const out = resolve('dist', 'sitemap.xml');
  writeFileSync(out, xml, 'utf8');
  const total = (xml.match(/<loc>/g) || []).length;
  console.log(`[sitemap] ${total} URLs (${LANGUAGES.length} idiomas) escritas em ${out}`);
}

run().catch((err) => {
  // Nunca falhar o build por causa do sitemap.
  console.warn('[sitemap] Aviso: não foi possível gerar o sitemap dinâmico:', err?.message || err);
});
