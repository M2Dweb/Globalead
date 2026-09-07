import type { Context } from "https://edge.netlify.com";

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

function isCrawler(userAgent: string | null): boolean {
  if (!userAgent) return false;
  return CRAWLER_USER_AGENTS.some((bot) =>
    userAgent.toLowerCase().includes(bot.toLowerCase())
  );
}

export default async function handler(request: Request, context: Context) {
  const userAgent = request.headers.get("user-agent");

  // If not a crawler, pass through to the SPA
  if (!isCrawler(userAgent)) {
    return context.next();
  }

  // Extract the blog post ref from the URL path.
  // Aceita /blog/:ref e /en/blog/:ref — o prefixo de idioma é retirado antes
  // de ler a referência, senão em /en ficávamos com ref = "blog".
  const url = new URL(request.url);
  let pathParts = url.pathname.split("/").filter(Boolean);

  const lang = pathParts[0] === "en" ? "en" : "pt";
  if (lang !== "pt") pathParts = pathParts.slice(1);

  // Expected: /blog/:ref
  const ref = pathParts[1];

  /**
   * Campo no idioma pedido, com recurso ao português.
   * Espelha src/lib/translations.ts.
   */
  const translatedField = (row: any, field: string): string => {
    const original = typeof row?.[field] === "string" ? row[field] : "";
    if (lang === "pt") return original;
    const alternativa = row?.translations?.[lang]?.[field];
    if (typeof alternativa !== "string") return original;
    return alternativa.replace(/<[^>]*>/g, "").trim() === "" ? original : alternativa;
  };

  if (!ref) {
    return context.next();
  }

  // Fetch blog post data from Supabase REST API
  const supabaseUrl = Netlify.env.get("VITE_SUPABASE_URL") || Netlify.env.get("SUPABASE_URL") || "";
  const supabaseAnonKey = Netlify.env.get("VITE_SUPABASE_ANON_KEY") || Netlify.env.get("SUPABASE_ANON_KEY") || "";

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase credentials not found in environment variables");
    return context.next();
  }

  try {
    // Se a coluna `translations` ainda não existir (migração por correr), o
    // PostgREST responde 400. Repetimos sem ela em vez de deixar o artigo sem
    // pré-visualização.
    const base = `${supabaseUrl}/rest/v1/blog_posts?ref=eq.${encodeURIComponent(ref)}&limit=1&select=title,excerpt,image,ref`;
    const headers = {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
    };

    let response = await fetch(`${base},translations`, { headers });
    if (!response.ok) response = await fetch(base, { headers });

    if (!response.ok) {
      console.error("Supabase API error:", response.status);
      return context.next();
    }

    const posts = await response.json();

    if (!posts || posts.length === 0) {
      return context.next();
    }

    const post = posts[0];
    const siteUrl = "https://globalead.pt";
    const prefixo = lang === "pt" ? "" : `/${lang}`;
    const postUrl = `${siteUrl}${prefixo}/blog/${post.ref}`;
    const ogTitle = translatedField(post, "title") || "Globalead Portugal";
    const resumo = translatedField(post, "excerpt");
    const ogDescription = resumo
      ? resumo.replace(/<[^>]*>/g, "").substring(0, 200)
      : lang === "en"
        ? "Specialists in property, mortgages, energy certification and insurance."
        : "Especialistas em imobiliário, crédito habitação, certificação energética e seguros.";
    const ogImage = post.image || `${siteUrl}/globalead-logo-background.png`;

    // Return HTML with OG meta tags for the crawler
    const html = `<!DOCTYPE html>
<html lang="${lang === "en" ? "en" : "pt-PT"}">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(ogTitle)} | Globalead Portugal</title>
  <meta name="description" content="${escapeHtml(ogDescription)}" />

  <!-- Open Graph -->
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escapeHtml(ogTitle)}" />
  <meta property="og:description" content="${escapeHtml(ogDescription)}" />
  <meta property="og:image" content="${escapeHtml(ogImage)}" />
  <meta property="og:url" content="${escapeHtml(postUrl)}" />
  <meta property="og:site_name" content="Globalead Portugal" />
  <meta property="og:locale" content="${lang === "en" ? "en_GB" : "pt_PT"}" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(ogTitle)}" />
  <meta name="twitter:description" content="${escapeHtml(ogDescription)}" />
  <meta name="twitter:image" content="${escapeHtml(ogImage)}" />

  <!-- Redirect humans to the real page -->
  <meta http-equiv="refresh" content="0;url=${escapeHtml(postUrl)}" />
</head>
<body>
  <h1>${escapeHtml(ogTitle)}</h1>
  <p>${escapeHtml(ogDescription)}</p>
  <img src="${escapeHtml(ogImage)}" alt="${escapeHtml(ogTitle)}" />
  <a href="${escapeHtml(postUrl)}">${lang === "en" ? "Read on globalead.pt" : "Ler artigo em globalead.pt"}</a>
</body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error fetching blog post for OG tags:", error);
    return context.next();
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export const config = {
  path: ["/blog/*", "/en/blog/*"],
};
