import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CreditCalculator from '../components/CreditCalculator';
import ContactForm from '../components/ContactForm';
import { listR2Folder } from '../lib/r2';
import FAQ from '../components/FAQ';

const CreditoPage: React.FC = () => {
  const { t } = useTranslation();
  const [partnerLogos, setPartnerLogos] = useState<string[]>([]);
  const [currentPartnerIndex, setCurrentPartnerIndex] = useState(0);

  const [logosPerPage, setLogosPerPage] = useState(
    window.innerWidth < 640 ? 2 : 5
  );

  useEffect(() => {
    const handleResize = () => {
      setLogosPerPage(window.innerWidth < 640 ? 2 : 5);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchPartnerLogos();
  }, []);

  useEffect(() => {
    if (partnerLogos.length > 0) {
      const interval = setInterval(() => {
        setCurrentPartnerIndex(prev => {
          // Corrigido para evitar índice negativo
          const maxIndex = Math.max(0, partnerLogos.length - logosPerPage);
          return (prev + 1) % (maxIndex + 1);
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [partnerLogos.length, logosPerPage]);

  const fetchPartnerLogos = async () => {
    try {
      const logoUrls = await listR2Folder('bancos');

      if (logoUrls.length === 0) {
        console.warn('Nenhum logo encontrado no R2, usando fallback.');
        // Fallback logos
        setPartnerLogos([
          "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
          "https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
          "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
          "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
          "https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop"
        ]);
      } else {
        setPartnerLogos(logoUrls);
      }
    } catch (error) {
      console.error('Erro ao carregar logos dos parceiros:', error);
      setPartnerLogos([]);
    }
  };

  

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
          poster="/fotos/ImoveisPage-foto.png"
        >
          <source src="/videos/ImoveisPage-video(1).mp4" type="video/mp4" />
        </video>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('credito.heroTitulo')}
            </h1>
          </div>
        </div>
      </section>



      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="leading-relaxed mb-6">
              {t('credito.p1')}
            </p>
            <p className="leading-relaxed mb-6">
              {t('credito.p2')}
            </p>
            <p className="leading-relaxed mb-6">
              {t('credito.p3')}
            </p>
            <p className="leading-relaxed">
              {t('credito.p4')}
            </p>
          </div>
        </div>
      </section>

    {/* Benefits Section */}
      <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('credito.beneficiosTitulo1')}<span className="text-[#79b2e9]">{t('credito.beneficiosTitulo2')}</span>{t('credito.beneficiosTitulo3')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('credito.beneficiosTexto')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefit 1 */}
            <div className="text-center group">
              <div className="hover-card-effect">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#79b2e9] to-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {t('credito.b1Titulo')}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  {t('credito.b1Texto')}
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="text-center group">
              <div className="hover-card-effect">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#79b2e9] to-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {t('credito.b2Titulo')}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  {t('credito.b2Texto')}
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="text-center group">
              <div className="hover-card-effect">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#79b2e9] to-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {t('credito.b3Titulo')}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  {t('credito.b3Texto')}
                </p>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="text-center group">
              <div className="hover-card-effect">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#79b2e9] to-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {t('credito.b4Titulo')}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  {t('credito.b4Texto')}
                </p>
              </div>
            </div>
          </div>

          
          
        </div>
      </section>

      {/* Credit Calculator */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('credito.simuleTitulo1')}<span className="text-[#79b2e9]">{t('credito.simuleTitulo2')}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('credito.simuleTexto')}
            </p>
          </div>
          <CreditCalculator />
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.parceirosTitulo')}
            </h2>
          </div>

          {partnerLogos.length > 0 && (
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-1000 ease-in-out"
                style={{
                  transform: `translateX(-${currentPartnerIndex * (100 / logosPerPage)}%)`
                }}
              >
                {partnerLogos.map((logo, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-1/2 sm:w-1/5 px-2"
                  >
                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center h-32">
                      <img
                        src={logo}
                        alt={`Parceiro ${index + 1}`}
                        className="max-h-20 object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>


      {/* Contact Form */}
      <section id="contact-form" className="py-20 bg-gray-900 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {t('credito.formTitulo')}
            </h2>
          </div>

          <div className="bg-white p-8 rounded-xl">
            <ContactForm 
              page="credito" 
            />
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="py-20 bg-gray-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('credito.faqTitulo')}
            </h2>
          </div>

          <div>
            <FAQ category="credito" />
          </div>

          <div className="bg-gray-900 shadow-sm text-gray-500 text-xs py-12 text-justify">
             {t('credito.lacerda')}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreditoPage;
