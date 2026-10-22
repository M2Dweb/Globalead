/**
 * Endereço público das fotos e vídeos do R2.
 *
 * Até 2026-10-22 o site servia tudo pelo endereço de testes do bucket
 * (pub-….r2.dev). A Cloudflare limita-o e desaconselha-o em produção, e há
 * redes e filtros que o bloqueiam: no iPhone as fotos apareciam com um "?".
 * O bucket tem agora o domínio próprio media.globalead.pt.
 *
 * As URLs gravadas na base de dados (e as que o CRM continua a gravar) ainda
 * apontam para o r2.dev, por isso trocam-se à chegada: nas respostas do
 * Supabase (lib/supabase.ts) e em imageUrl(). Se o domínio próprio falhar,
 * onImageCdnError volta ao r2.dev.
 */

export const R2_DEV_ORIGIN = 'https://pub-5f573f26090442adbdeb6739a1e97fa9.r2.dev';
export const MEDIA_ORIGIN = 'https://media.globalead.pt';

/** Troca o r2.dev pelo domínio próprio em todo o texto (ex.: uma resposta JSON). */
export const withMediaOrigin = (text: string): string =>
  text.includes(R2_DEV_ORIGIN) ? text.split(R2_DEV_ORIGIN).join(MEDIA_ORIGIN) : text;

/** O mesmo ficheiro no r2.dev, para quando o domínio próprio falha; ou null. */
export const r2DevFallback = (url: string): string | null =>
  url.startsWith(`${MEDIA_ORIGIN}/`) ? R2_DEV_ORIGIN + url.slice(MEDIA_ORIGIN.length) : null;
