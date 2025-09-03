import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isScrolled: boolean;
  isHeroVisible?: boolean;
}

export function Header({ currentPage, onNavigate, isScrolled }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Sobre', page: 'sobre' },
    { name: 'Imóveis', page: 'imoveis' },
    { name: 'Seguros', page: 'seguros' },
    { name: 'Alarmes', page: 'alarmes' },
    { name: 'Blog', page: 'blog' },
    { name: 'Contactos', page: 'contactos' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isHeroVisible ? 'bg-transparent shadow-none' : 'bg-white shadow-lg'
    }`}>
      <div className={`text-white py-2 px-4 transition-all duration-300 ${
        isScrolled ? 'bg-blue-900' : 'bg-blue-900/80'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <img 
                src="/logo.png" 
                alt="Globalead Portugal" 
                className="h-14 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    currentPage === item.page
                      ? `${isHeroVisible ? 'text-white border-b-2 border-white' : 'text-blue-600 border-b-2 border-blue-600'}`
                      : `${isHeroVisible ? 'text-white hover:text-blue-200' : 'text-gray-700 hover:text-blue-600'}`
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={isHeroVisible ? 'text-white hover:text-blue-200' : 'text-gray-700 hover:text-blue-600'}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden">
              <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 transition-all duration-300 ${isHeroVisible ? 'bg-black bg-opacity-90' : 'bg-gray-50'}`}>
                {menuItems.map((item) => (
                  <button
                    key={item.page}
                    onClick={() => {
                      onNavigate(item.page);
                      setIsMenuOpen(false);
                    }}
                    className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-300 ${
                      currentPage === item.page
                        ? `${isHeroVisible ? 'text-white bg-white bg-opacity-20' : 'text-blue-600 bg-blue-50'}`
                        : `${isHeroVisible ? 'text-white hover:text-blue-200 hover:bg-white hover:bg-opacity-10' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'}`
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;