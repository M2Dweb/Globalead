import React from 'react';
import { FileText, Clock, CheckCircle, Home, Building, Store } from 'lucide-react';

import { useTranslation } from 'react-i18next';
import ContactForm2 from '../components/ContactForm2';
import FAQ from '../components/FAQ';

const CertificacaoPage: React.FC = () => {
  const { t } = useTranslation();

  const steps = [
    {
      
      title: t('certificacao.agendamentoTitulo'),
      description: t('certificacao.agendamentoTexto'),
      icon: <Clock className="h-8 w-8 text-white" />
    },
    {
      
      title: t('certificacao.documentacaoTitulo'),
      description: t('certificacao.documentacaoTexto'),
      icon: <FileText className="h-8 w-8 text-white" />
    },
    {
      
      title: t('certificacao.visitaTitulo'),
      description: t('certificacao.visitaTexto'),
      icon: <CheckCircle className="h-8 w-8 text-white" />
    },
    {
      
      title: t('certificacao.emissaoTitulo'),
      description: t('certificacao.emissaoTexto'),
      icon: <FileText className="h-8 w-8 text-white" />
    }
  ];


  const certificateTypes = [
    {
      icon: <Home className="h-12 w-12 text-[#79b2e9]" />,
      title: t('certificacao.apartamentosTitulo'),
      description: t('certificacao.apartamentosTexto')
    },
    {
      icon: <Building className="h-12 w-12 text-[#79b2e9]" />,
      title: t('certificacao.moradiasTitulo'),
      description: t('certificacao.moradiasTexto')
    },
    {
      icon: <Store className="h-12 w-12 text-[#79b2e9]" />,
      title: t('certificacao.comercioTitulo'),
      description: t('certificacao.comercioTexto')
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section — banner com vídeo */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-900 to-[#79b2e9] text-white py-20 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          poster="/fotos/SobrePage-foto.png"
        >
          <source src="/videos/SobrePage-video(1).mp4" type="video/mp4" />
        </video>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('certificacao.heroTitulo')}
            </h1>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="leading-relaxed mb-6">
             {t('certificacao.p1')}
            </p>
            <p className="leading-relaxed mb-6">
              {t('certificacao.p2')}
            </p>
            <p className="leading-relaxed ">
              {t('certificacao.p3')}
            </p>
          </div>
        </div>
      </section>

      
      {/* Process Section */}
      <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('certificacao.processoTitulo1')}<span className="text-[#79b2e9]">{t('certificacao.processoTitulo2')}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="hover-card-effect">
                  
                  <div className="flex justify-center mb-6 relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#79b2e9] to-blue-600 rounded-full flex items-center justify-center mx-auto">
                      {step.icon}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Certificate Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('certificacao.tiposTitulo')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certificateTypes.map((type, index) => (
              <div key={index} className="hover-card-effect text-center">
                <div className="flex justify-center mb-6">
                  {type.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {type.title}
                </h3>
                <p className="text-gray-600">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('comum.temDuvidas')}
            </h2>
            <p className="text-xl text-blue-100">
              {t('comum.entreContacto')}
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl">
            <ContactForm2 page="certificacao" />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('comum.faqTitulo')}
            </h2>
          </div>
          
          <div className="bg-gray-900">
            <FAQ category="certificacao" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CertificacaoPage;