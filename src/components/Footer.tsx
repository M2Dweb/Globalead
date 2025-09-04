import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <img 
              src="/logo.png" 
              alt="Globalead Portugal" 
              className="h-12 w-auto mb-4"
            />
            <p className="text-gray-300 mb-6">
              Especialistas em mediação imobiliária, seguros e certificação energética em Portugal.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onNavigate('sobre')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sobre Nós
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('imoveis')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Imóveis
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('seguros')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Seguros
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('blog')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onNavigate('credito')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Crédito Habitação
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('certificacao')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Certificação Energética
                </button>
              </li>
              <li>
                <span className="text-gray-300">Mediação Imobiliária</span>
              </li>
              <li>
                <span className="text-gray-300">Consultoria</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Entre em contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-blue-400" />
                <span className="text-gray-300">915 482 365</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-blue-400" />
                <span className="text-gray-300">geral@globalead.pt</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-blue-400 mt-1" />
                <span className="text-gray-300">Portugal</span>
              </div>
            </div>

            {/* Facebook Page Plugin Placeholder */}
            <div className="mt-6 bg-gray-800 p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Siga-nos no Facebook</h4>
              <div className="bg-blue-600 text-white p-3 rounded text-center text-sm">
                Facebook Page Plugin
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Globalead Portugal. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;