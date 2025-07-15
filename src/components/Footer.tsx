import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div>
            <div className="mb-4">
              <img 
                src="/logo.png" 
                alt="Globalead Portugal" 
                className="h-18 w-auto"
              />
            </div>
            <h3 className="text-xl font-bold mb-4">Entre em Contacto!</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-blue-400" />
                <span>+351 915482365</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-400" />
                <span>geral@globalead.pt</span>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              <Facebook className="h-6 w-6 text-blue-400 hover:text-blue-300 cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 text-blue-400 hover:text-blue-300 cursor-pointer transition-colors" />
              <Linkedin className="h-6 w-6 text-blue-400 hover:text-blue-300 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Latest News */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4">Últimas Notícias</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-300 hover:text-white cursor-pointer transition-colors">
                  Garantia pública sobe risco de incumprimento (e tende a elevar juros)
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-300 hover:text-white cursor-pointer transition-colors">
                  Como organizar a casa no inverno: dicas para ter tudo à mão
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-300 hover:text-white cursor-pointer transition-colors">
                  Preço da eletricidade aumenta 2,1% no mercado regulado em 2025
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Receba as últimas novidades!</h3>
            <form className="space-y-3">
              <input
                type="text"
                placeholder="Nome:"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Apelido:"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email:"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="newsletter-consent"
                  className="mt-1 mr-2"
                />
                <label htmlFor="newsletter-consent" className="text-xs text-gray-400">
                  Sim, autorizo receber informações e novidades da Globalead Portugal.
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Subscrever
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Globalead Portugal. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;