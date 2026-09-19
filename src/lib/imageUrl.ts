/**
 * Otimização de imagens via Netlify Image CDN.
 *
 * Recebe um URL de imagem (ex.: uma foto do R2) e devolve um URL servido pela
 * CDN da Netlify (/.netlify/images?url=...). A CDN converte para WebP/AVIF
 * conforme o browser e faz cache, o que acelera as fotos e alivia o r2.dev —
 * SEM redimensionar nem recortar, por isso a qualidade e o enquadramento
 * originais são mantidos.
 *
 * Regras:
 * - Só reescreve URLs remotas (http/https). Assets locais (/carlos/...) passam intactos.
 * - Em desenvolvimento (vite) devolve o original, porque /.netlify/images só
 *   existe no ambiente da Netlify.
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

export const imageUrl = (src?: string | null, _opts: ImageOptions = {}): string => {
  if (!src) return src || '';

  // Assets locais e URLs já processados passam intactos
  if (!isRemote(src) || src.includes('/.netlify/images')) return src;

  // Em dev o endpoint do Image CDN não existe — usa o original
  if (!import.meta.env.PROD) return src;

  return `/.netlify/images?url=${encodeURIComponent(src)}`;
};

/** URL original a partir de um URL da CDN (/.netlify/images?url=...), ou null. */
export const originalImageUrl = (cdnUrl: string): string | null => {
  try {
    const u = new URL(cdnUrl, window.location.origin);
    return u.pathname === '/.netlify/images' ? u.searchParams.get('url') : null;
  } catch {
    return null;
  }
};

/**
 * Plano B para quando a CDN de imagens da Netlify falha.
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
