import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  LANGUAGES,
  LANG_META,
  getLangFromPathname,
  pathForLang,
  type Lang,
} from '../i18n/languages';

interface LanguageSwitcherProps {
  /** O header é transparente por cima dos heroes; aí o texto tem de ser branco. */
  onDark?: boolean;
  className?: string;
}

/**
 * Seletor de idioma.
 *
 * São âncoras verdadeiras, não botões: cada idioma tem o seu endereço, o
 * Google segue-os, e um link partilhado abre no idioma em que foi partilhado.
 * A troca recarrega a página, que é o correto quando o conteúdo todo muda.
 */
const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ onDark = false, className = '' }) => {
  const location = useLocation();
  const { t } = useTranslation();

  // O react-router corre com basename, por isso o pathname já vem sem o
  // prefixo de idioma — é exatamente o que precisamos para o reconstruir.
  const current = getLangFromPathname(window.location.pathname);
  const path = `${location.pathname}${location.search}${location.hash}`;

  const activeClass = onDark ? 'text-white' : 'text-[#0d2233]';
  const inactiveClass = onDark
    ? 'text-white/60 hover:text-white'
    : 'text-gray-400 hover:text-[#0d2233]';

  return (
    <div
      className={`flex items-center text-sm font-medium ${className}`}
      role="group"
      aria-label={t('idioma.escolher')}
    >
      {LANGUAGES.map((lang: Lang, index) => {
        const isActive = lang === current;
        return (
          <React.Fragment key={lang}>
            {index > 0 && (
              <span aria-hidden="true" className={onDark ? 'text-white/30 mx-1.5' : 'text-gray-300 mx-1.5'}>
                |
              </span>
            )}
            <a
              href={pathForLang(lang, path)}
              hrefLang={LANG_META[lang].htmlLang}
              aria-current={isActive ? 'true' : undefined}
              title={t('idioma.verEm', { idioma: LANG_META[lang].label })}
              className={`transition-colors duration-200 ${isActive ? activeClass : inactiveClass}`}
            >
              {LANG_META[lang].label}
            </a>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
