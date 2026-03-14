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

  // Extract the blog post ref from the URL path
  const url = new URL(request.url);
  const pathParts = url.pathname.split("/").filter(Boolean);
  // Expected: /blog/:ref
  const ref = pathParts[1];

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
    const apiUrl = `${supabaseUrl}/rest/v1/blog_posts?ref=eq.${encodeURIComponent(ref)}&select=title,excerpt,image,ref&limit=1`;

    const response = await fetch(apiUrl, {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
    });

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
    const postUrl = `${siteUrl}/blog/${post.ref}`;
    const ogTitle = post.title || "Globalead Portugal";
    const ogDescription = post.excerpt
      ? post.excerpt.replace(/<[^>]*>/g, "").substring(0, 200)
      : "Especialistas em imobiliário, crédito habitação, certificação energética e seguros.";
    const ogImage = post.image || `${siteUrl}/fotos/globalead-icon.png`;

    // Return HTML with OG meta tags for the crawler
    const html = `<!DOCTYPE html>
<html lang="pt">
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
  <meta property="og:locale" content="pt_PT" />

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
  <a href="${escapeHtml(postUrl)}">Ler artigo em globalead.pt</a>
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
  path: "/blog/*",
};
