import React from 'react';
import { useTranslation } from 'react-i18next';
import { DEFAULT_LANG } from '../i18n/languages';

type Bloco =
  | { tipo: 'h1' | 'h2' | 'p'; texto: string }
  | { tipo: 'ul'; itens: string[] };

interface LegalDocumentProps {
  /** Chave dentro de "legal" nos ficheiros de tradução. */
  documento: 'politicaPrivacidade' | 'termosCondicoes' | 'resolucaoLitigios';
}

/**
 * Páginas legais (privacidade, termos, litígios).
 *
 * O texto vive nos ficheiros de tradução em vez de estar no JSX, para que as
 * versões noutros idiomas não obriguem a duplicar a marcação — e para que uma
 * alteração ao texto legal se faça num sítio só.
 *
 * Fora do português mostramos a nota de prevalência: a tradução existe para
 * ser compreendida, mas o texto que vincula é o português.
 */
const LegalDocument: React.FC<LegalDocumentProps> = ({ documento }) => {
  const { t, i18n } = useTranslation();
  const blocos = t(`legal.${documento}`, { returnObjects: true }) as Bloco[];
  const traduzido = i18n.language !== DEFAULT_LANG;

  if (!Array.isArray(blocos)) return null;

  return (
    <main className="bg-white text-gray-800">
      <div className="max-w-5xl mx-auto px-4 pt-28 pb-12">
        {blocos.map((bloco, i) => {
          if (bloco.tipo === 'h1') {
            return (
              <React.Fragment key={i}>
                <h1 className="text-3xl font-bold mb-8">{bloco.texto}</h1>
                {traduzido && (
                  <p className="mb-8 border-l-4 border-gray-300 bg-gray-50 px-4 py-3 text-xs text-gray-600">
                    {t('legal.prevalencia')}
                  </p>
                )}
              </React.Fragment>
            );
          }

          if (bloco.tipo === 'h2') {
            return (
              <h2 key={i} className="text-xl font-semibold mt-8 mb-3">
                {bloco.texto}
              </h2>
            );
          }

          if (bloco.tipo === 'ul') {
            return (
              <ul key={i} className="list-disc pl-6 space-y-2 text-sm leading-relaxed mb-4">
                {bloco.itens.map((item, j) => (
                  <li key={j} className="whitespace-pre-line">
                    {item}
                  </li>
                ))}
              </ul>
            );
          }

          return (
            <p key={i} className="text-sm leading-relaxed mb-4 whitespace-pre-line">
              {bloco.texto}
            </p>
          );
        })}
      </div>
    </main>
  );
};

export default LegalDocument;
