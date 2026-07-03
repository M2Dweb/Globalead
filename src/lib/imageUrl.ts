/**
 * Otimização de imagens via Netlify Image CDN.
 *
 * Recebe um URL de imagem (ex.: uma foto do R2) e devolve um URL servido pela
 * CDN da Netlify, que redimensiona, comprime e converte para WebP/AVIF conforme
 * o browser — e faz cache. Isto acelera MUITO as fotos, incluindo as antigas
 * que já estão no R2 em tamanho real (sem re-upload, sem mexer na base de dados).
 *
 * Regras:
 * - Só reescreve URLs remotas (http/https). Assets locais (/carlos/...) passam intactos.
 * - Em desenvolvimento (vite) devolve o original, porque /.netlify/images só
 *   existe no ambiente da Netlify.
 */

interface ImageOptions {
  /** Largura alvo em pixéis. */
  width?: number;
  /** Altura alvo em pixéis (opcional). */
  height?: number;
  /** Qualidade 1–100 (default 75). */
  quality?: number;
  /** Modo de ajuste (default 'cover'). */
  fit?: 'cover' | 'contain' | 'fill';
}

const isRemote = (src: string) => /^https?:\/\//i.test(src);

export const imageUrl = (src?: string | null, opts: ImageOptions = {}): string => {
  if (!src) return src || '';

  // Assets locais e URLs já processados passam intactos
  if (!isRemote(src) || src.includes('/.netlify/images')) return src;

  // Em dev o endpoint do Image CDN não existe — usa o original
  if (!import.meta.env.PROD) return src;

  const { width = 1200, height, quality = 75, fit = 'cover' } = opts;

  const params = new URLSearchParams();
  params.set('url', src);
  if (width) params.set('w', String(width));
  if (height) params.set('h', String(height));
  params.set('fit', fit);
  params.set('q', String(quality));

  return `/.netlify/images?${params.toString()}`;
};
