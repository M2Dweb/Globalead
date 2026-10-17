/**
 * Corre antes de cada pedido que o public/_routes.json manda para as
 * Functions (as páginas com pré-visualização própria e a /api). O resto do
 * site (assets, fotos, vídeos) é servido diretamente, sem passar por aqui.
 *
 * - Crawlers sociais (WhatsApp, Facebook, LinkedIn, ...) recebem a página com
 *   as meta tags certas (server/og.ts).
 * - Os endereços antigos da Netlify (/.netlify/functions/...) continuam a
 *   responder, para um separador aberto com o site antigo não falhar a
 *   subscrição da newsletter.
 * - Tudo o resto segue para a SPA.
 */
import { ogResponse, type Env } from '../server/og';
import { newsletterSubscribe } from '../server/newsletter';
import { r2List, type R2Bucket } from '../server/r2-list';

interface Context {
  request: Request;
  env: Env & { R2?: R2Bucket };
  next: () => Promise<Response>;
}

export const onRequest = async ({ request, env, next }: Context): Promise<Response> => {
  const { pathname } = new URL(request.url);

  if (pathname === '/.netlify/functions/newsletter-subscribe') return newsletterSubscribe(request, env);
  if (pathname === '/.netlify/functions/r2-list') return r2List(request, env);

  return (await ogResponse(request, env)) || next();
};
