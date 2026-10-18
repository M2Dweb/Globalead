/**
 * Worker do site (Cloudflare). Só corre nos caminhos de run_worker_first do
 * wrangler.jsonc — as páginas com pré-visualização própria e a /api. O resto
 * do site (assets, fotos, vídeos) é servido diretamente do dist/.
 *
 * - /api/newsletter-subscribe e /api/r2-list: as funções do site. Os
 *   endereços antigos da Netlify (/.netlify/functions/...) continuam a
 *   responder, para um separador aberto com o site antigo não falhar a
 *   subscrição da newsletter.
 * - Crawlers sociais (WhatsApp, Facebook, LinkedIn, ...) recebem a página com
 *   as meta tags certas (server/og.ts).
 * - Tudo o resto segue para os ficheiros do dist/ (a SPA).
 */
import { ogResponse, type Env } from './og';
import { newsletterSubscribe } from './newsletter';
import { r2List, type R2Bucket } from './r2-list';

type WorkerEnv = Env & {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  R2?: R2Bucket;
};

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === '/api/newsletter-subscribe' || pathname === '/.netlify/functions/newsletter-subscribe') {
      return newsletterSubscribe(request, env);
    }
    if (pathname === '/api/r2-list' || pathname === '/.netlify/functions/r2-list') {
      return r2List(request, env);
    }

    return (await ogResponse(request, env)) || env.ASSETS.fetch(request);
  },
};
