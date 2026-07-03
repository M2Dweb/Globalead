/**
 * Otimização de imagens via Netlify Image CDN.
 *
 * Recebe um URL de imagem (ex.: uma foto do R2) e devolve um URL servido pela
 * CDN da Netlify através do caminho amigável /img (rewrite para /.netlify/images
 * em netlify.toml). A CDN converte para WebP/AVIF conforme o browser e faz cache,
 * o que acelera as fotos e alivia o r2.dev — SEM redimensionar nem recortar,
 * por isso a qualidade e o enquadramento originais são mantidos.
 *
 * Regras:
 * - Só reescreve URLs remotas (http/https). Assets locais (/carlos/...) passam intactos.
 * - Em desenvolvimento (vite) devolve o original, porque /.netlify/images só
 *   existe no ambiente da Netlify.
 */

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
  if (!isRemote(src) || src.includes('/img?') || src.includes('/.netlify/images')) return src;

  // Em dev o endpoint do Image CDN não existe — usa o original
  if (!import.meta.env.PROD) return src;

  // /img é um rewrite para /.netlify/images (ver netlify.toml)
  return `/img?url=${encodeURIComponent(src)}`;
};
