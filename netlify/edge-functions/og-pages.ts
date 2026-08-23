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

function buildHtml(opts: { title: string; description: string; image: string; url: string; type: string }) {
  const { title, description, image, url, type } = opts;
  return `<!DOCTYPE html>
<html lang="pt-PT">
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
  <meta property="og:locale" content="pt_PT" />

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

async function fetchProperty(ref: string): Promise<{ title: string; description: string; image: string } | null> {
  const supabaseUrl = Netlify.env.get("VITE_SUPABASE_URL") || Netlify.env.get("SUPABASE_URL") || "";
  const supabaseAnonKey = Netlify.env.get("VITE_SUPABASE_ANON_KEY") || Netlify.env.get("SUPABASE_ANON_KEY") || "";
  if (!supabaseUrl || !supabaseAnonKey) return null;

  try {
    // is_published=eq.true: um anúncio escondido não gera preview no WhatsApp,
    // Facebook ou LinkedIn — cai no OG genérico do site.
    const apiUrl = `${supabaseUrl}/rest/v1/properties?ref=eq.${encodeURIComponent(ref)}&is_published=eq.true&select=title,description,images,location&limit=1`;
    const response = await fetch(apiUrl, {
      headers: { apikey: supabaseAnonKey, Authorization: `Bearer ${supabaseAnonKey}` },
    });
    if (!response.ok) return null;

    const rows = await response.json();
    if (!rows || rows.length === 0) return null;

    const p = rows[0];
    const title = `${p.title}${p.location ? ` - ${p.location}` : ""} | Globalead Portugal`;
    const description = (p.description ? String(p.description).replace(/<[^>]*>/g, "") : DEFAULT_DESC).substring(0, 200);
    const image = Array.isArray(p.images) && p.images[0] ? p.images[0] : DEFAULT_IMAGE;
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
  const path = url.pathname.replace(/\/+$/, "") || "/";

  // Detalhe de imóvel: /imoveis/:ref (exceto /imoveis/lista)
  const propMatch = path.match(/^\/imoveis\/([^/]+)$/);
  if (propMatch && propMatch[1] !== "lista") {
    const meta = await fetchProperty(decodeURIComponent(propMatch[1]));
    if (meta) {
      return htmlResponse(
        buildHtml({ ...meta, url: `${SITE_URL}/imoveis/${propMatch[1]}`, type: "website" })
      );
    }
    return context.next();
  }

  // Páginas estáticas conhecidas
  const meta = PAGE_META[path];
  if (!meta) {
    return context.next();
  }

  return htmlResponse(
    buildHtml({
      title: meta.title,
      description: meta.description,
      image: DEFAULT_IMAGE,
      url: path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`,
      type: "website",
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
  ],
};
