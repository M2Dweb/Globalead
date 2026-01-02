import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Sobre', path: '/sobre' },
    { name: 'Imóveis', path: '/imoveis' },
    { name: 'Seguros', path: '/seguros' },
    { name: 'Credito', path: '/credito' },
    { name: 'C. Energética', path: '/certificacao' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contactos', path: '/contactos' },
  ];

  const isHeroPage = ['/', '/sobre', '/imoveis', '/seguros', '/blog', '/contactos'].includes(
    location.pathname
  );
  const shouldBeTransparent = isHeroPage && !isScrolled;

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
          <div className="hidden lg:flex items-center flex-1 justify-center">
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
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* BOTÃO CTA (DESKTOP) */}
          <div className="hidden lg:flex items-center">
            <Link
              to="/carlos-goncalves#avaliacao-imovel"
              className={`ml-6 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border
                ${
                  shouldBeTransparent
                    ? 'text-white border-white hover:bg-white hover:text-[#0d2233]'
                    : 'bg-[#0d2233] text-white border-[#0d2233] hover:bg-[#163a55]'
                }`}
            >
              Quando vale a minha casa?
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
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
          <div className="lg:hidden">
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
                  {item.name}
                </Link>
              ))}

              {/* MOBILE CTA */}
              <Link
                to="/carlos-goncalves#avaliacao-imovel"
                onClick={() => setIsMenuOpen(false)}
                className={`block w-full mt-4 px-4 py-3 text-center text-base font-semibold rounded-lg transition-all duration-200 ${
                  shouldBeTransparent
                    ? 'bg-white text-[#0d2233] hover:bg-blue-100'
                    : 'bg-[#0d2233] text-white hover:bg-[#163a55]'
                }`}
              >
                Quando vale a minha casa?
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
