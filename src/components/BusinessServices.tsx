import React from 'react';
import { CreditCard, FileText, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * "O melhor negócio para o seu imóvel começa aqui": crédito habitação,
 * certificação energética e seguros, cada um com o botão para a sua página.
 * Aparece na homepage e na página Imóveis, por baixo dos vídeos.
 */
const BusinessServices: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const services = [
    {
      icon: <CreditCard className="h-12 w-12 text-[#79b2e9]" />,
      title: t('home.creditoTitulo'),
      description: t('home.creditoTexto'),
      link: '/credito'
    },
    {
      icon: <FileText className="h-12 w-12 text-[#79b2e9]" />,
      title: t('home.certificacaoTitulo'),
      description: t('home.certificacaoTexto'),
      link: '/certificacao'
    },
    {
      icon: <Shield className="h-12 w-12 text-[#79b2e9]" />,
      title: t('home.segurosTitulo'),
      description: t('home.segurosTexto'),
      link: '/seguros'
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('home.servicosTitulo')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.link} className="hover-card-effect text-center">
              <div className="flex justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="flex justify-center text-gray-600 mb-3 text-sm flex-grow">
                {service.description}
              </p>

              <button
                onClick={() => navigate(service.link)}
                className="w-full bg-white text-[#0d2233] border border-[#0d2233] py-2 px-12 rounded-lg hover:bg-[#79b2e9] hover:text-white hover:border-[#79b2e9] transition-colors"
              >
                {t('home.saberMais')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessServices;
