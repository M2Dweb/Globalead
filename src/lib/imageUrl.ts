/**
 * Otimização de imagens por uma CDN de imagens.
 *
 * Recebe um URL de imagem (ex.: uma foto do R2) e devolve o URL da mesma foto
 * servida pela CDN, que converte para WebP/AVIF conforme o browser e faz
 * cache — SEM redimensionar nem recortar, por isso a qualidade e o
 * enquadramento originais são mantidos.
 *
 * A CDN escolhe-se no build com VITE_IMAGE_CDN:
 * - "cloudflare": Image Transformations (/cdn-cgi/image/...). Só funciona
 *   com o domínio na Cloudflare e as Transformations ligadas na zona, com o
 *   r2.dev autorizado como origem;
 * - "netlify": Netlify Image CDN (/.netlify/images?url=...), só na Netlify;
 * - vazia (por omissão): a foto original, diretamente do R2.
 *
 * Regras:
 * - Só reescreve URLs remotas (http/https). Assets locais (/carlos/...) passam intactos.
 * - Em desenvolvimento (vite) devolve o original, porque nenhuma das CDNs
 *   existe no servidor do vite.
 */

import type { SyntheticEvent } from 'react';

// Mantido por compatibilidade com quem chama imageUrl(src, { width }).
// Neste momento não aplicamos redimensionamento/corte — a foto sai original.
interface ImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  fit?: 'cover' | 'contain' | 'fill';
}

const isRemote = (src: string) => /^https?:\/\//i.test(src);

const IMAGE_CDN: string = import.meta.env.VITE_IMAGE_CDN || '';
const CLOUDFLARE_PREFIX = '/cdn-cgi/image/format=auto/';

export const imageUrl = (src?: string | null, _opts: ImageOptions = {}): string => {
  if (!src) return src || '';

  // Assets locais e URLs já processados passam intactos
  if (!isRemote(src) || src.includes('/.netlify/images') || src.includes('/cdn-cgi/image/')) return src;

  // Em dev o endpoint do Image CDN não existe — usa o original
  if (!import.meta.env.PROD) return src;

  if (IMAGE_CDN === 'cloudflare') return `${CLOUDFLARE_PREFIX}${src}`;
  if (IMAGE_CDN === 'netlify') return `/.netlify/images?url=${encodeURIComponent(src)}`;
  return src;
};

/** URL original a partir de um URL de uma das CDNs, ou null. */
export const originalImageUrl = (cdnUrl: string): string | null => {
  try {
    const u = new URL(cdnUrl, window.location.origin);
    if (u.pathname === '/.netlify/images') return u.searchParams.get('url');
    // /cdn-cgi/image/<opções>/<URL original>
    const cloudflare = /^\/cdn-cgi\/image\/[^/]+\/(https?:\/.+)$/.exec(u.pathname);
    if (cloudflare) return cloudflare[1].replace(/^(https?:)\/(?!\/)/, '$1//') + u.search;
    return null;
  } catch {
    return null;
  }
};

/**
 * Plano B para quando a CDN de imagens falha.
 *
 * Já aconteceu (incidentes "Elevated Image CDN Errors" a 24/04, 26/04 e
 * 16/09/2026) e o efeito foi o site inteiro sem fotos, porque cada <img>
 * apontava apenas para /.netlify/images. Ligado ao onError, se a versão
 * otimizada não carregar o browser vai buscar o original ao R2 — a foto
 * aparece na mesma, só sem a conversão para WebP/AVIF.
 *
 * Se o original também falhar, o onError dispara outra vez mas já não há para
 * onde recuar (originalImageUrl devolve null), por isso não entra em ciclo.
 */
export const onImageCdnError = (e: SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget;
  const original = originalImageUrl(img.src);
  if (original && original !== img.src) img.src = original;
};
