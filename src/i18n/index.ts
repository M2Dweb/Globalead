import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import pt from './locales/pt.json';
import en from './locales/en.json';
import { DEFAULT_LANG, getLangFromPathname } from './languages';

/**
 * O idioma é lido do endereço no arranque e não volta a mudar durante a
 * sessão: trocar de idioma navega para o outro endereço e a página recarrega.
 * É de propósito — assim o seletor é um link verdadeiro, que o Google segue e
 * que se pode partilhar.
 */
const lang =
  typeof window !== 'undefined' ? getLangFromPathname(window.location.pathname) : DEFAULT_LANG;

i18n.use(initReactI18next).init({
  resources: {
    pt: { translation: pt },
    en: { translation: en },
  },
  lng: lang,
  // Se uma chave ainda não estiver traduzida, mostra o português em vez de
  // mostrar o nome da chave. Permite ir traduzindo por partes sem partir nada.
  fallbackLng: DEFAULT_LANG,
  interpolation: { escapeValue: false },
});

export default i18n;
