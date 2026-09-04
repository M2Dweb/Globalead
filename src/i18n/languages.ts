/**
 * Idiomas do site.
 *
 * O português vive na raiz (globalead.pt/imoveis) e cada idioma adicional num
 * prefixo próprio (globalead.pt/en/imoveis). São endereços reais e distintos,
 * não um botão que troca o texto na mesma página: é isso que permite ao Google
 * indexar a versão inglesa e ao Carlos partilhar um link que abre em inglês.
 */

export const LANGUAGES = ['pt', 'en'] as const;
export type Lang = (typeof LANGUAGES)[number];

export const DEFAULT_LANG: Lang = 'pt';

/** Etiquetas do seletor e valores para as metatags. */
export const LANG_META: Record<Lang, { label: string; htmlLang: string; ogLocale: string }> = {
  pt: { label: 'PT', htmlLang: 'pt-PT', ogLocale: 'pt_PT' },
  en: { label: 'EN', htmlLang: 'en', ogLocale: 'en_GB' },
};

const isLang = (value: string): value is Lang => (LANGUAGES as readonly string[]).includes(value);

/**
 * O idioma é decidido pelo URL e só pelo URL.
 *
 * De propósito não olhamos para o idioma do browser: se alguém receber o link
 * de um imóvel e for automaticamente atirado para outra versão da página,
 * perde-se o contexto do que foi partilhado.
 */
export const getLangFromPathname = (pathname: string): Lang => {
  const segment = pathname.split('/')[1] || '';
  return isLang(segment) && segment !== DEFAULT_LANG ? segment : DEFAULT_LANG;
};

/**
 * Prefixo para o `basename` do react-router.
 *
 * Com isto, todos os `<Link to="/imoveis">` que já existem passam a apontar
 * para /en/imoveis quando se está em inglês, sem alterar uma única chamada.
 */
export const basenameFor = (lang: Lang): string => (lang === DEFAULT_LANG ? '/' : `/${lang}`);

/** Caminho sem o prefixo de idioma: '/en/imoveis' → '/imoveis'. */
export const stripLangPrefix = (pathname: string): string => {
  const segment = pathname.split('/')[1] || '';
  if (!isLang(segment) || segment === DEFAULT_LANG) return pathname || '/';
  const rest = pathname.slice(segment.length + 1);
  return rest || '/';
};

/** Caminho já com o prefixo do idioma: ('en', '/imoveis') → '/en/imoveis'. */
export const pathForLang = (lang: Lang, pathWithoutPrefix: string): string => {
  const clean = pathWithoutPrefix.startsWith('/') ? pathWithoutPrefix : `/${pathWithoutPrefix}`;
  if (lang === DEFAULT_LANG) return clean;
  return clean === '/' ? `/${lang}` : `/${lang}${clean}`;
};
