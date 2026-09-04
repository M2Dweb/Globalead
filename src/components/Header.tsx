import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { key: 'nav.sobre', path: '/sobre' },
    { key: 'nav.imoveis', path: '/imoveis' },
    { key: 'nav.credito', path: '/credito' },
    //{ key: 'nav.certificacao', path: '/certificacao' },
    { key: 'nav.seguros', path: '/seguros' },
    { key: 'nav.blog', path: '/blog' },
    { key: 'nav.contactos', path: '/contactos' },
  ];

  const isHeroPage = ['/', '/sobre', '/imoveis', '/blog', '/contactos'].includes(location.pathname);
  const shouldBeTransparent = isHeroPage && !isScrolled;

  // Função para scroll direto para o formulário
  const scrollToForm = () => {
    const element = document.getElementById('avaliacao-imovel');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Função para o botão CTA
  const handleCTA = () => {
    setIsMenuOpen(false); // fecha dropdown mobile se estiver aberto
    if (location.pathname === '/carlos-goncalves') {
      // já estamos na página → scroll direto
      scrollToForm();
    } else {
      // navega para a página, e depois faz scroll
      navigate('/carlos-goncalves', { state: { scrollToForm: true } });
    }
  };

  // Efeito para scroll quando chegamos na página via state
  useEffect(() => {
    if (location.state?.scrollToForm) {
      scrollToForm();
      // opcional: limpar state para não repetir scroll
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shouldBeTransparent ? 'bg-transparent shadow-none' : 'bg-white shadow-lg'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">

          {/* LOGO */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/logo.png"
              alt="Globalead Portugal"
              className="h-14 w-auto"
            />
          </Link>

          {/* NAV + BOTÃO (DESKTOP) */}
          <div className="hidden xl:flex items-center flex-1 justify-center">
            <nav className="flex space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? shouldBeTransparent
                        ? 'text-white border-b-2 border-white'
                        : 'text-[#0d2233] border-b-2 border-[#0d2233]'
                      : shouldBeTransparent
                      ? 'text-white hover:text-blue-200'
                      : 'text-gray-700 hover:text-[#0d2233]'
                  }`}
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>
          </div>

          {/* IDIOMA + BOTÃO CTA (DESKTOP) */}
          <div className="hidden xl:flex items-center gap-5 ml-6">
            <LanguageSwitcher onDark={shouldBeTransparent} />
            <button
              onClick={handleCTA}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border
                ${
                  shouldBeTransparent
                    ? 'text-white border-white hover:bg-white hover:text-[#0d2233]'
                    : 'bg-[#0d2233] text-white border-[#0d2233] hover:bg-[#163a55]'
                }`}
            >
              {t('nav.cta')}
            </button>
          </div>

          {/* IDIOMA + MENU (MOBILE) — o seletor fica FORA do hamburguer.
              Escondido lá dentro, quase ninguém o encontraria. */}
          <div className="flex items-center gap-4 xl:hidden">
            <LanguageSwitcher onDark={shouldBeTransparent} />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? t('nav.fecharMenu') : t('nav.abrirMenu')}
              aria-expanded={isMenuOpen}
              className={
                shouldBeTransparent
                  ? 'text-white hover:text-blue-200'
                  : 'text-gray-700 hover:text-[#0d2233]'
              }
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION */}
        {isMenuOpen && (
          <div className="xl:hidden">
            <div
              className={`px-2 pt-2 pb-4 space-y-1 sm:px-3 ${
                shouldBeTransparent ? 'bg-black bg-opacity-90' : 'bg-gray-50'
              }`}
            >
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? shouldBeTransparent
                        ? 'text-white bg-white bg-opacity-20'
                        : 'text-[#0d2233] bg-blue-50'
                      : shouldBeTransparent
                      ? 'text-white hover:text-blue-200 hover:bg-white hover:bg-opacity-10'
                      : 'text-gray-700 hover:text-[#0d2233] hover:bg-gray-100'
                  }`}
                >
                  {t(item.key)}
                </Link>
              ))}

              {/* MOBILE CTA */}
              <button
                onClick={handleCTA}
                className={`block w-full mt-4 px-4 py-3 text-center text-base font-semibold rounded-lg transition-all duration-200 ${
                  shouldBeTransparent
                    ? 'bg-white text-[#0d2233] hover:bg-blue-100'
                    : 'bg-[#0d2233] text-white hover:bg-[#163a55]'
                }`}
              >
                {t('nav.cta')}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
