import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white px-4 py-24">
      <SEOHead title="Página não encontrada | Globalead Portugal" noindex />
      <div className="text-center max-w-md">
        <p className="text-7xl sm:text-8xl font-bold text-[#79b2e9]">404</p>
        <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900">
          Página não encontrada
        </h1>
        <p className="mt-3 text-gray-600">
          A página que procura não existe ou foi movida. Verifique o endereço ou volte ao início.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-white text-[#0d2233] border border-[#0d2233] font-semibold py-3 px-6 rounded-lg hover:bg-[#79b2e9] hover:text-white hover:border-[#79b2e9] transition-colors"
          >
            <Home className="h-5 w-5 mr-2" />
            Voltar ao início
          </Link>
          <Link
            to="/imoveis"
            className="inline-flex items-center justify-center border border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Ver imóveis
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
