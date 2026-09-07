import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { DEFAULT_LANG, LANGUAGES } from '../i18n/languages';

/**
 * Conteúdo da base de dados noutros idiomas.
 *
 * O português vive nas colunas originais (`title`, `description`, ...) e é a
 * versão de referência. As traduções vivem numa coluna `translations` em JSONB:
 *
 *   { "en": { "title": "Sea view flat", "description": "<p>...</p>" } }
 *
 * A regra é sempre a mesma: se a tradução do campo não existir ou estiver
 * vazia, mostra-se o português. Nunca aparece um espaço em branco no site
 * porque o Carlos ainda não traduziu um anúncio.
 */

/**
 * Campos guardados por idioma, por tabela. Partilhado com o /admin e com a
 * tradução automática.
 *
 * `features` fica de fora de propósito: hoje não aparece em lado nenhum do site
 * público (só existe no /admin e num filtro que nenhum ecrã chega a ativar).
 * Dar ao Carlos um campo para traduzir que ninguém lê seria trabalho perdido.
 */
export const TRANSLATABLE_FIELDS = {
  properties: ['title', 'description'],
  blog_posts: ['title', 'excerpt', 'content'],
} as const;

/** Etiqueta de cada campo no /admin. */
export const FIELD_LABELS: Record<string, string> = {
  title: 'Título',
  description: 'Descrição',
  excerpt: 'Resumo',
  content: 'Conteúdo',
};

/**
 * Vazio para este efeito é também um editor de texto sem texto: o
 * RichTextEditor guarda "<p><br></p>" quando o Carlos abre o campo e não
 * escreve nada, e isso não é uma tradução.
 */
const isEmpty = (value: unknown): boolean => {
  if (value == null) return true;
  if (Array.isArray(value)) return value.every(isEmpty);
  if (typeof value === 'string') {
    return value.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim() === '';
  }
  return false;
};

/** Uma linha de `properties` ou `blog_posts`, com a coluna das traduções. */
export interface TranslatableRow {
  translations?: Record<string, Record<string, string>> | null;
  [field: string]: unknown;
}

/** Valor do campo no idioma pedido, com recurso ao português. */
export const getTranslated = <T = string>(
  row: TranslatableRow | null | undefined,
  field: string,
  lang: string,
): T => {
  const original = row?.[field];
  if (!row || lang === DEFAULT_LANG) return original as T;

  const alternative = row?.translations?.[lang]?.[field];
  return (isEmpty(alternative) ? original : alternative) as T;
};

/** Há tradução utilizável neste idioma? Usado para decidir o que entra no sitemap. */
export const hasTranslation = (
  row: TranslatableRow | null | undefined,
  lang: string,
  fields: readonly string[],
): boolean =>
  lang !== DEFAULT_LANG && fields.some((field) => !isEmpty(row?.translations?.[lang]?.[field]));

/**
 * Campos de tradução a pedir numa listagem, um por idioma.
 *
 * Numa listagem só se mostra o título e o resumo. Pedir a coluna `translations`
 * inteira arrastaria também o corpo dos artigos — que neste site chega aos
 * megabytes por causa das imagens coladas no editor — para uma página que nem
 * sequer o mostra.
 */
export const translationSelect = (fields: readonly string[]): string =>
  LANGUAGES.filter((lang) => lang !== DEFAULT_LANG)
    .flatMap((lang) => fields.map((campo) => `tr_${lang}_${campo}:translations->${lang}->>${campo}`))
    .join(',');

/** Volta a montar `translations` a partir dos campos achatados do select acima. */
export const withTranslations = <T extends Record<string, unknown>>(rows: T[] | null): T[] =>
  (rows || []).map((row) => {
    const translations: Record<string, Record<string, string>> = {};
    for (const [chave, valor] of Object.entries(row)) {
      const parte = /^tr_([a-z]{2})_(.+)$/.exec(chave);
      if (parte && typeof valor === 'string' && valor !== '') {
        const idioma = parte[1];
        if (!translations[idioma]) translations[idioma] = {};
        translations[idioma][parte[2]] = valor;
      }
    }
    return { ...row, translations };
  });

/**
 * Versão em hook, já ligada ao idioma da página:
 *
 *   const tr = useTranslatedRow();
 *   <h1>{tr(property, 'title')}</h1>
 */
export const useTranslatedRow = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  return useCallback(
    <T = string>(row: TranslatableRow | null | undefined, field: string): T =>
      getTranslated<T>(row, field, lang),
    [lang],
  );
};
