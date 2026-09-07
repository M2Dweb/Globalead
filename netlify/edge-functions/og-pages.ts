import type { Context } from "https://edge.netlify.com";

// Apenas crawlers sociais (não-JS). O Googlebot renderiza a SPA e lê as
// meta tags do react-helmet, por isso NÃO entra nesta lista (evita cloaking).
const CRAWLER_USER_AGENTS = [
  "facebookexternalhit",
  "Facebot",
  "Twitterbot",
  "LinkedInBot",
  "WhatsApp",
  "Slackbot",
  "TelegramBot",
  "Discordbot",
  "Pinterest",
  "Embedly",
];

const SITE_URL = "https://globalead.pt";
const DEFAULT_IMAGE = `${SITE_URL}/globalead-logo-background.png`;
const DEFAULT_DESC =
  "Especialistas em imobiliário, crédito habitação, certificação energética e seguros. Apoiamos todo o processo para comprar ou vender a sua casa em segurança.";

// Idiomas: o português vive na raiz, o inglês em /en. Tem de estar alinhado
// com src/i18n/languages.ts.
type Lang = "pt" | "en";
const OG_LOCALE: Record<Lang, string> = { pt: "pt_PT", en: "en_GB" };
const HTML_LANG: Record<Lang, string> = { pt: "pt-PT", en: "en" };

const DEFAULT_DESC_EN =
  "Specialists in property, mortgages, energy certification and insurance. We support the whole process of buying or selling your home safely.";

const PAGE_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Globalead Portugal | Imóveis, Crédito Habitação e Seguros",
    description: DEFAULT_DESC,
  },
  "/sobre": {
    title: "Sobre Nós | Globalead Portugal",
    description:
      "Conheça a Globalead Portugal: a nossa história, valores e equipa especializada em imobiliário, crédito habitação, seguros e energia.",
  },
  "/imoveis": {
    title: "Comprar e Vender Imóveis | Globalead Portugal",
    description:
      "Compre ou venda o seu imóvel com a Globalead Portugal. Apartamentos, moradias e empreendimentos com acompanhamento completo.",
  },
  "/imoveis/lista": {
    title: "Catálogo de Imóveis | Globalead Portugal",
    description:
      "Veja o catálogo de imóveis disponíveis: apartamentos, moradias, terrenos e empreendimentos em todo o país.",
  },
  "/seguros": {
    title: "Seguros Auto, Vida e Habitação | Globalead Portugal",
    description:
      "Compare e contrate seguros automóvel, vida, habitação e saúde. A melhor proteção ao melhor preço, sem custos para si.",
  },
  "/credito": {
    title: "Crédito Habitação e Simulador | Globalead Portugal",
    description:
      "Simule o seu crédito habitação e descubra a prestação mensal. Negociamos com os principais bancos — intermediação gratuita.",
  },
  "/certificacao": {
    title: "Certificação Energética | Globalead Portugal",
    description:
      "Certificação energética de imóveis. Tratamos de todo o processo do certificado energético, obrigatório na venda ou arrendamento.",
  },
  "/carlos-goncalves": {
    title: "Carlos Gonçalves — Consultor | Globalead Portugal",
    description:
      "Carlos Gonçalves, consultor da Globalead Portugal com mais de 10 anos de experiência na compra, venda e crédito de imóveis.",
  },
  "/contactos": {
    title: "Contactos | Globalead Portugal",
    description:
      "Entre em contacto com a Globalead Portugal. Fale connosco sobre imóveis, crédito habitação, seguros e energia.",
  },
};

const PAGE_META_EN: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Globalead Portugal | Property, Mortgages and Insurance",
    description: DEFAULT_DESC_EN,
  },
  "/sobre": {
    title: "About Us | Globalead Portugal",
    description:
      "Get to know Globalead Portugal: our story, our values, and a team that specialises in property, mortgages, insurance and energy.",
  },
  "/imoveis": {
    title: "Buy and Sell Property in Portugal | Globalead Portugal",
    description:
      "Buy or sell your property with Globalead Portugal. Apartments, houses and new developments, with full support throughout.",
  },
  "/imoveis/lista": {
    title: "Property Listings | Globalead Portugal",
    description:
      "Browse the properties available: apartments, houses, land and new developments across Portugal.",
  },
  "/seguros": {
    title: "Car, Life and Home Insurance | Globalead Portugal",
    description:
      "Compare and arrange car, life, home and health insurance. The best cover at the best price, at no cost to you.",
  },
  "/credito": {
    title: "Mortgages and Calculator | Globalead Portugal",
    description:
      "Estimate your mortgage and see the monthly payment. We negotiate with the leading Portuguese banks — intermediation at no cost.",
  },
  "/certificacao": {
    title: "Energy Certification | Globalead Portugal",
    description:
      "Energy certificates for property. We handle the whole process for the certificate required by law when selling or letting.",
  },
  "/carlos-goncalves": {
    title: "Carlos Gonçalves — Consultant | Globalead Portugal",
    description:
      "Carlos Gonçalves, consultant at Globalead Portugal with over 10 years of experience in buying, selling and financing property.",
  },
  "/contactos": {
    title: "Contact | Globalead Portugal",
    description:
      "Get in touch with Globalead Portugal. Talk to us about property, mortgages, insurance and energy.",
  },
};

/** Separa o prefixo de idioma do caminho: "/en/imoveis" -> ["en", "/imoveis"]. */
function splitLang(path: string): [Lang, string] {
  if (path === "/en") return ["en", "/"];
  if (path.startsWith("/en/")) return ["en", path.slice(3)];
  return ["pt", path];
}

function isCrawler(userAgent: string | null): boolean {
  if (!userAgent) return false;
  return CRAWLER_USER_AGENTS.some((bot) =>
    userAgent.toLowerCase().includes(bot.toLowerCase())
  );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildHtml(opts: { title: string; description: string; image: string; url: string; type: string; lang: Lang }) {
  const { title, description, image, url, type, lang } = opts;
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
  <a href="${escapeHtml(url)}">Continuar para globalead.pt</a>
</body>
</html>`;
}

function htmlResponse(html: string): Response {
  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

/**
 * Campo no idioma pedido, com recurso ao português.
 * Espelha src/lib/translations.ts — a pré-visualização no WhatsApp tem de
 * mostrar o mesmo texto que a página que o link abre.
 */
function translatedField(row: any, field: string, lang: Lang): string {
  const original = typeof row?.[field] === "string" ? row[field] : "";
  if (lang === "pt") return original;
  const alternativa = row?.translations?.[lang]?.[field];
  if (typeof alternativa !== "string") return original;
  return alternativa.replace(/<[^>]*>/g, "").trim() === "" ? original : alternativa;
}

async function fetchProperty(ref: string, lang: Lang): Promise<{ title: string; description: string; image: string } | null> {
  const supabaseUrl = Netlify.env.get("VITE_SUPABASE_URL") || Netlify.env.get("SUPABASE_URL") || "";
  const supabaseAnonKey = Netlify.env.get("VITE_SUPABASE_ANON_KEY") || Netlify.env.get("SUPABASE_ANON_KEY") || "";
  if (!supabaseUrl || !supabaseAnonKey) return null;

  try {
    // is_published=eq.true: um anúncio escondido não gera preview no WhatsApp,
    // Facebook ou LinkedIn — cai no OG genérico do site.
    // Se a coluna `translations` ainda não existir (migração por correr), o
    // PostgREST responde 400. Repetimos sem ela em vez de deixar o WhatsApp
    // sem pré-visualização do imóvel.
    const base = `${supabaseUrl}/rest/v1/properties?ref=eq.${encodeURIComponent(ref)}&is_published=eq.true&limit=1&select=title,description,images,location,cover_image`;
    const headers = { apikey: supabaseAnonKey, Authorization: `Bearer ${supabaseAnonKey}` };

    let response = await fetch(`${base},translations`, { headers });
    if (!response.ok) response = await fetch(base, { headers });
    if (!response.ok) return null;

    const rows = await response.json();
    if (!rows || rows.length === 0) return null;

    const p = rows[0];
    const titulo = translatedField(p, "title", lang);
    const descricao = translatedField(p, "description", lang);
    const title = `${titulo}${p.location ? ` - ${p.location}` : ""} | Globalead Portugal`;
    const description = (descricao ? descricao.replace(/<[^>]*>/g, "") : (lang === "en" ? DEFAULT_DESC_EN : DEFAULT_DESC)).substring(0, 200);
    // A "Foto de Capa" definida no /admin tem prioridade sobre a 1ª foto da galeria.
    const image =
      p.cover_image || (Array.isArray(p.images) && p.images[0] ? p.images[0] : DEFAULT_IMAGE);
    return { title, description, image };
  } catch (error) {
    console.error("Erro ao obter imóvel para OG tags:", error);
    return null;
  }
}

export default async function handler(request: Request, context: Context) {
  const userAgent = request.headers.get("user-agent");

  // Utilizadores normais (e Googlebot) seguem para a SPA
  if (!isCrawler(userAgent)) {
    return context.next();
  }

  const url = new URL(request.url);
  const raw = url.pathname.replace(/\/+$/, "") || "/";
  const [lang, path] = splitLang(raw);
  const prefixo = lang === "pt" ? "" : `/${lang}`;

  // Detalhe de imóvel: /imoveis/:ref (exceto /imoveis/lista)
  const propMatch = path.match(/^\/imoveis\/([^/]+)$/);
  if (propMatch && propMatch[1] !== "lista") {
    const meta = await fetchProperty(decodeURIComponent(propMatch[1]), lang);
    if (meta) {
      return htmlResponse(
        buildHtml({
          ...meta,
          url: `${SITE_URL}${prefixo}/imoveis/${propMatch[1]}`,
          type: "website",
          lang,
        })
      );
    }
    return context.next();
  }

  // Páginas estáticas conhecidas. Sem tradução para a rota, cai no português —
  // é o mesmo fallback que o site usa.
  const meta = (lang === "en" ? PAGE_META_EN[path] : undefined) || PAGE_META[path];
  if (!meta) {
    return context.next();
  }

  return htmlResponse(
    buildHtml({
      title: meta.title,
      description: meta.description,
      image: DEFAULT_IMAGE,
      url: path === "/" ? `${SITE_URL}${prefixo}/` : `${SITE_URL}${prefixo}${path}`,
      type: "website",
      lang,
    })
  );
}

export const config = {
  path: [
    "/",
    "/sobre",
    "/imoveis",
    "/imoveis/lista",
    "/imoveis/*",
    "/seguros",
    "/credito",
    "/certificacao",
    "/carlos-goncalves",
    "/contactos",
    // Mesmas rotas na versão inglesa
    "/en",
    "/en/sobre",
    "/en/imoveis",
    "/en/imoveis/lista",
    "/en/imoveis/*",
    "/en/seguros",
    "/en/credito",
    "/en/certificacao",
    "/en/carlos-goncalves",
    "/en/contactos",
  ],
};
