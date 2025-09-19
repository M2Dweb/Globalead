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
    { name: 'Energia', path: '/energia' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contactos', path: '/contactos' },
    { name: 'Admin', path: '/admin' }
  ];

  const isHeroPage = ['/', '/sobre', '/imoveis', '/seguros', '/blog', '/contactos'].includes(location.pathname);
  const shouldBeTransparent = isHeroPage && !isScrolled;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      shouldBeTransparent ? 'bg-transparent shadow-none' : 'bg-white shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Globalead Portugal" 
              className="h-14 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? `${shouldBeTransparent ? 'text-white border-b-2 border-white' : 'text-[#0d2233] border-b-2 border-[#0d2233]'}`
                    : `${shouldBeTransparent ? 'text-white hover:text-blue-200' : 'text-gray-700 hover:text-[#0d2233]'}`
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={shouldBeTransparent ? 'text-white hover:text-blue-200' : 'text-gray-700 hover:text-[#0d2233]'}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${shouldBeTransparent ? 'bg-black bg-opacity-90' : 'bg-gray-50'}`}>
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200 ${
                    location.pathname === item.path
                      ? `${shouldBeTransparent ? 'text-white bg-white bg-opacity-20' : 'text-[#0d2233] bg-blue-50'}`
                      : `${shouldBeTransparent ? 'text-white hover:text-blue-200 hover:bg-white hover:bg-opacity-10' : 'text-gray-700 hover:text-[#0d2233] hover:bg-gray-100'}`
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;