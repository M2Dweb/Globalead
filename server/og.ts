/**
 * Pré-visualizações das partilhas (WhatsApp, Facebook, LinkedIn, ...).
 *
 * Os crawlers sociais não correm JavaScript, por isso não veem as meta tags
 * que o react-helmet põe na SPA. Para eles, e só para eles, devolvemos uma
 * página mínima com o título, a descrição e a imagem certos. O Googlebot
 * renderiza a SPA e NÃO entra na lista (evita cloaking).
 *
 * Veio das edge functions da Netlify (og-pages e og-blog) e não depende da
 * plataforma: recebe o pedido e as variáveis de ambiente e devolve a página,
 * ou null quando o pedido deve seguir para a SPA.
 */

export type Env = Record<string, string | undefined>;

const CRAWLER_USER_AGENTS = [
  'facebookexternalhit',
  'Facebot',
  'Twitterbot',
  'LinkedInBot',
  'WhatsApp',
  'Slackbot',
  'TelegramBot',
  'Discordbot',
  'Pinterest',
  'Embedly',
];

const SITE_URL = 'https://globalead.pt';
const DEFAULT_IMAGE = `${SITE_URL}/globalead-logo-background.png`;
const DEFAULT_DESC =
  'Especialistas em imobiliário, crédito habitação, certificação energética e seguros. Apoiamos todo o processo para comprar ou vender a sua casa em segurança.';
const DEFAULT_DESC_EN =
  'Specialists in property, mortgages, energy certification and insurance. We support the whole process of buying or selling your home safely.';

// Idiomas: o português vive na raiz, o inglês em /en. Tem de estar alinhado
// com src/i18n/languages.ts.
type Lang = 'pt' | 'en';
const OG_LOCALE: Record<Lang, string> = { pt: 'pt_PT', en: 'en_GB' };
const HTML_LANG: Record<Lang, string> = { pt: 'pt-PT', en: 'en' };

interface Meta {
  title: string;
  description: string;
}

const PAGE_META: Record<string, Meta> = {
  '/': {
    title: 'Globalead Portugal | Imóveis, Crédito Habitação e Seguros',
    description: DEFAULT_DESC,
  },
  '/sobre': {
    title: 'Sobre Nós | Globalead Portugal',
    description:
      'Conheça a Globalead Portugal: a nossa história, valores e equipa especializada em imobiliário, crédito habitação, seguros e energia.',
  },
  '/imoveis': {
    title: 'Comprar e Vender Imóveis | Globalead Portugal',
    description:
      'Compre ou venda o seu imóvel com a Globalead Portugal. Apartamentos, moradias e empreendimentos com acompanhamento completo.',
  },
  '/imoveis/lista': {
    title: 'Catálogo de Imóveis | Globalead Portugal',
    description:
      'Veja o catálogo de imóveis disponíveis: apartamentos, moradias, terrenos e empreendimentos em todo o país.',
  },
  '/seguros': {
    title: 'Seguros Auto, Vida e Habitação | Globalead Portugal',
    description:
      'Compare e contrate seguros automóvel, vida, habitação e saúde. A melhor proteção ao melhor preço, sem custos para si.',
  },
  '/credito': {
    title: 'Crédito Habitação e Simulador | Globalead Portugal',
    description:
      'Simule o seu crédito habitação e descubra a prestação mensal. Negociamos com os principais bancos — intermediação gratuita.',
  },
  '/certificacao': {
    title: 'Certificação Energética | Globalead Portugal',
    description:
      'Certificação energética de imóveis. Tratamos de todo o processo do certificado energético, obrigatório na venda ou arrendamento.',
  },
  '/carlos-goncalves': {
    title: 'Carlos Gonçalves — Consultor | Globalead Portugal',
    description:
      'Carlos Gonçalves, consultor da Globalead Portugal com mais de 10 anos de experiência na compra, venda e crédito de imóveis.',
  },
  '/contactos': {
    title: 'Contactos | Globalead Portugal',
    description:
      'Entre em contacto com a Globalead Portugal. Fale connosco sobre imóveis, crédito habitação, seguros e energia.',
  },
};

const PAGE_META_EN: Record<string, Meta> = {
  '/': {
    title: 'Globalead Portugal | Property, Mortgages and Insurance',
    description: DEFAULT_DESC_EN,
  },
  '/sobre': {
    title: 'About Us | Globalead Portugal',
    description:
      'Get to know Globalead Portugal: our story, our values, and a team that specialises in property, mortgages, insurance and energy.',
  },
  '/imoveis': {
    title: 'Buy and Sell Property in Portugal | Globalead Portugal',
    description:
      'Buy or sell your property with Globalead Portugal. Apartments, houses and new developments, with full support throughout.',
  },
  '/imoveis/lista': {
    title: 'Property Listings | Globalead Portugal',
    description:
      'Browse the properties available: apartments, houses, land and new developments across Portugal.',
  },
  '/seguros': {
    title: 'Car, Life and Home Insurance | Globalead Portugal',
    description:
      'Compare and arrange car, life, home and health insurance. The best cover at the best price, at no cost to you.',
  },
  '/credito': {
    title: 'Mortgages and Calculator | Globalead Portugal',
    description:
      'Estimate your mortgage and see the monthly payment. We negotiate with the leading Portuguese banks — intermediation at no cost.',
  },
  '/certificacao': {
    title: 'Energy Certification | Globalead Portugal',
    description:
      'Energy certificates for property. We handle the whole process for the certificate required by law when selling or letting.',
  },
  '/carlos-goncalves': {
    title: 'Carlos Gonçalves — Consultant | Globalead Portugal',
    description:
      'Carlos Gonçalves, consultant at Globalead Portugal with over 10 years of experience in buying, selling and financing property.',
  },
  '/contactos': {
    title: 'Contact | Globalead Portugal',
    description:
      'Get in touch with Globalead Portugal. Talk to us about property, mortgages, insurance and energy.',
  },
};

export function isCrawler(userAgent: string | null): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return CRAWLER_USER_AGENTS.some((bot) => ua.includes(bot.toLowerCase()));
}

/** Separa o prefixo de idioma do caminho: "/en/imoveis" -> ["en", "/imoveis"]. */
function splitLang(path: string): [Lang, string] {
  if (path === '/en') return ['en', '/'];
  if (path.startsWith('/en/')) return ['en', path.slice(3)];
  return ['pt', path];
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const stripTags = (html: string) => html.replace(/<[^>]*>/g, '');

type Row = Record<string, unknown> & { translations?: Record<string, Record<string, unknown>> | null };

/**
 * Campo no idioma pedido, com recurso ao português.
 * Espelha src/lib/translations.ts — a pré-visualização no WhatsApp tem de
 * mostrar o mesmo texto que a página que o link abre.
 */
function translatedField(row: Row, field: string, lang: Lang): string {
  const original = typeof row[field] === 'string' ? (row[field] as string) : '';
  if (lang === 'pt') return original;
  const alternativa = row.translations?.[lang]?.[field];
  if (typeof alternativa !== 'string') return original;
  return stripTags(alternativa).trim() === '' ? original : alternativa;
}

function buildHtml(opts: { title: string; description: string; image: string; url: string; type: string; lang: Lang; link: string }) {
  const { title, description, image, url, type, lang, link } = opts;
  return `<!DOCTYPE html>
<html lang="${HTML_LANG[lang]}">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${escapeHtml(url)}" />

  <!-- Open Graph -->
  <meta property="og:type" content="${escapeHtml(type)}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:image" content="${escapeHtml(image)}" />
  <meta property="og:url" content="${escapeHtml(url)}" />
  <meta property="og:site_name" content="Globalead Portugal" />
  <meta property="og:locale" content="${OG_LOCALE[lang]}" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeHtml(image)}" />

  <!-- Redireciona humanos para a página real -->
  <meta http-equiv="refresh" content="0;url=${escapeHtml(url)}" />
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  <p>${escapeHtml(description)}</p>
  <a href="${escapeHtml(url)}">${escapeHtml(link)}</a>
</body>
</html>`;
}

function htmlResponse(html: string): Response {
  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

/**
 * Uma linha do Supabase (leitura pública, chave anon).
 * Se a coluna `translations` ainda não existir (migração por correr), o
 * PostgREST responde 400: repetimos sem ela em vez de deixar a partilha sem
 * pré-visualização.
 */
async function fetchRow(env: Env, table: string, query: string, select: string): Promise<Row | null> {
  const supabaseUrl = env.VITE_SUPABASE_URL || env.SUPABASE_URL || '';
  const anonKey = env.VITE_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY || '';
  if (!supabaseUrl || !anonKey) {
    console.error('[og] Faltam as variáveis do Supabase');
    return null;
  }

  const base = `${supabaseUrl}/rest/v1/${table}?${query}&limit=1&select=${select}`;
  const headers = { apikey: anonKey, Authorization: `Bearer ${anonKey}` };

  let response = await fetch(`${base},translations`, { headers });
  if (!response.ok) response = await fetch(base, { headers });
  if (!response.ok) {
    console.error(`[og] Supabase respondeu ${response.status} (${table})`);
    return null;
  }

  const rows = (await response.json()) as Row[];
  return rows && rows.length > 0 ? rows[0] : null;
}

async function propertyPage(env: Env, ref: string, lang: Lang, prefixo: string): Promise<Response | null> {
  // is_published=eq.true: um anúncio escondido não gera preview no WhatsApp,
  // Facebook ou LinkedIn — cai no OG genérico do site.
  const p = await fetchRow(
    env,
    'properties',
    `ref=eq.${encodeURIComponent(ref)}&is_published=eq.true`,
    'title,description,images,location,cover_image'
  );
  if (!p) return null;

  const titulo = translatedField(p, 'title', lang);
  const descricao = translatedField(p, 'description', lang);
  const location = typeof p.location === 'string' ? p.location : '';
  const images = Array.isArray(p.images) ? (p.images as string[]) : [];
  // A "Foto de Capa" do anúncio tem prioridade sobre a 1ª foto da galeria.
  const image = (typeof p.cover_image === 'string' && p.cover_image) || images[0] || DEFAULT_IMAGE;

  return htmlResponse(
    buildHtml({
      title: `${titulo}${location ? ` - ${location}` : ''} | Globalead Portugal`,
      description: (descricao ? stripTags(descricao) : lang === 'en' ? DEFAULT_DESC_EN : DEFAULT_DESC).substring(0, 200),
      image,
      url: `${SITE_URL}${prefixo}/imoveis/${encodeURIComponent(ref)}`,
      type: 'website',
      lang,
      link: 'Continuar para globalead.pt',
    })
  );
}

async function blogPage(env: Env, ref: string, lang: Lang, prefixo: string): Promise<Response | null> {
  const post = await fetchRow(env, 'blog_posts', `ref=eq.${encodeURIComponent(ref)}`, 'title,excerpt,image,ref');
  if (!post) return null;

  const title = translatedField(post, 'title', lang) || 'Globalead Portugal';
  const resumo = translatedField(post, 'excerpt', lang);
  const description = resumo
    ? stripTags(resumo).substring(0, 200)
    : lang === 'en'
      ? 'Specialists in property, mortgages, energy certification and insurance.'
      : 'Especialistas em imobiliário, crédito habitação, certificação energética e seguros.';

  return htmlResponse(
    buildHtml({
      title: `${title} | Globalead Portugal`,
      description,
      image: (typeof post.image === 'string' && post.image) || DEFAULT_IMAGE,
      url: `${SITE_URL}${prefixo}/blog/${encodeURIComponent(String(post.ref || ref))}`,
      type: 'article',
      lang,
      link: lang === 'en' ? 'Read on globalead.pt' : 'Ler artigo em globalead.pt',
    })
  );
}

/**
 * Página para o crawler, ou null para o pedido seguir para a SPA (pessoas,
 * Googlebot, páginas sem pré-visualização própria ou erro a ler o Supabase).
 */
export async function ogResponse(request: Request, env: Env): Promise<Response | null> {
  if (request.method !== 'GET' && request.method !== 'HEAD') return null;
  if (!isCrawler(request.headers.get('user-agent'))) return null;

  const url = new URL(request.url);
  const raw = url.pathname.replace(/\/+$/, '') || '/';
  const [lang, path] = splitLang(raw);
  const prefixo = lang === 'pt' ? '' : `/${lang}`;

  try {
    // Artigo do blog: /blog/:ref
    const blogMatch = path.match(/^\/blog\/([^/]+)$/);
    if (blogMatch) return await blogPage(env, decodeURIComponent(blogMatch[1]), lang, prefixo);

    // Detalhe de imóvel: /imoveis/:ref (exceto /imoveis/lista)
    const propMatch = path.match(/^\/imoveis\/([^/]+)$/);
    if (propMatch && propMatch[1] !== 'lista') {
      return await propertyPage(env, decodeURIComponent(propMatch[1]), lang, prefixo);
    }
  } catch (error) {
    console.error('[og] Erro a montar a pré-visualização:', error);
    return null;
  }

  // Páginas conhecidas. Sem tradução para a rota, cai no português — é o
  // mesmo fallback que o site usa.
  const meta = (lang === 'en' ? PAGE_META_EN[path] : undefined) || PAGE_META[path];
  if (!meta) return null;

  return htmlResponse(
    buildHtml({
      ...meta,
      image: DEFAULT_IMAGE,
      url: path === '/' ? `${SITE_URL}${prefixo}/` : `${SITE_URL}${prefixo}${path}`,
      type: 'website',
      lang,
      link: 'Continuar para globalead.pt',
    })
  );
}
