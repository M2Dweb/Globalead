import React from 'react';
import { Home, Shield, Zap, Phone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedSection from '../components/AnimatedSection';
import CompanyStats from '../components/CompanyStats';
import VideoTestimonials from '../components/VideoTestimonials';
import PartnersCarousel from '../components/PartnersCarousel';
import BlogWithFilters from '../components/BlogWithFilters';
import CaseStudies from '../components/CaseStudies';
import GoogleReviews from '../components/GoogleReviews';
import ContactForm from '../components/ContactForm';
import { trackEvent } from '../components/Analytics';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onHeroVisibilityChange?: (isVisible: boolean) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onHeroVisibilityChange }) => {
  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.1,
  });

  React.useEffect(() => {
    if (onHeroVisibilityChange) {
      onHeroVisibilityChange(heroInView);
    }
  }, [heroInView, onHeroVisibilityChange]);

  const services = [
    {
      icon: <Home className="h-12 w-12 text-blue-600" />,
      title: "Imóveis",
      description: "Compra, venda e arrendamento de propriedades com acompanhamento personalizado e estratégias de marketing inovadoras.",
      link: "imoveis",
      color: "blue"
    },
    {
      icon: <Shield className="h-12 w-12 text-green-600" />,
      title: "Seguros",
      description: "Soluções completas em seguros automóvel, habitação, vida e saúde com as melhores condições do mercado.",
      link: "seguros",
      color: "green"
    },
    {
      icon: <Zap className="h-12 w-12 text-yellow-600" />,
      title: "Energia",
      description: "Fornecimento de energia 100% renovável com tarifas competitivas e apoio na mudança de fornecedor.",
      link: "energia",
      color: "yellow"
    },
    {
      icon: <Phone className="h-12 w-12 text-purple-600" />,
      title: "TV NET VOZ",
      description: "Pacotes de telecomunicações personalizados com internet de alta velocidade, televisão e telefone.",
      link: "tv-net-voz",
      color: "purple"
    }
  ];

  const handleServiceClick = (link: string) => {
    trackEvent('service_click', { service: link });
    onNavigate(link);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 text-white overflow-hidden flex items-center">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          autoPlay
          loop
          muted
          playsInline
          poster="/fotos/HomePage-foto.png"
        >
          <source src="https://res.cloudinary.com/donlcr1lg/video/upload/v1756563860/Cidade_do_Porto_-_www.globalead.pt_1_kzfzqg.mp4" type="video/mp4" />
         
        </video>

        <div className="absolute inset-0 bg-black opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Inovação.<br />
              Confiança.<br />
              Eficiência.
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-4xl ">
              A Globalead Portugal é uma empresa inovadora que atua como intermediária, oferecendo soluções personalizadas em diversos setores...
            </p>
          </motion.div>
        </div>
      </section>


      {/* Properties Section - Visite o seu próximo lar de sonho */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Visite o seu próximo lar de sonho
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col h-full">
                <img
                  src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Empreendimento Vila Nova"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Empreendimento Vila Nova
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm flex-grow">
                    Empreendimento completamente murado, em pedra. O exterior das moradias terá uma grande presença de betão aparente...
                  </p>
                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600 min-h-[20px]">
                    <div className="flex items-center">
                      <span className="mr-1">🛏️</span>
                      <span>3</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-1">🚿</span>
                      <span>3</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-1">📐</span>
                      <span>238 m²</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-4 min-h-[20px]">
                    <span className="mr-1">📍</span>
                    <span>Aldoar, Porto</span>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors mt-auto">
                    VER IMÓVEL
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col h-full">
                <img
                  src="https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Empreendimento Noval Park"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Empreendimento Noval Park
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm flex-grow">
                    Cidade de paisagens ofegantes, miragens autênticas de recantos e encantos irrefutáveis...
                  </p>
                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600 min-h-[20px]">
                    <div className="flex items-center">
                      <span className="mr-1">🛏️</span>
                      <span>2</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-1">🚿</span>
                      <span>2</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-1">📐</span>
                      <span>145 m²</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-4 min-h-[20px]">
                    <span className="mr-1">📍</span>
                    <span>Vila Nova de Gaia</span>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors mt-auto">
                    VER IMÓVEL
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col h-full">
                <img
                  src="https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Empreendimento Boss Gardens"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Empreendimento Boss Gardens
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm flex-grow">
                    Boss Gardens está localizado na zona de Paranhos, uma das melhores zonas residenciais do Porto...
                  </p>
                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600 min-h-[20px]">
                    <div className="flex items-center">
                      <span className="mr-1">🛏️</span>
                      <span>3</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-1">🚿</span>
                      <span>2</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-1">📐</span>
                      <span>139 m²</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-4 min-h-[20px]">
                    <span className="mr-1">📍</span>
                    <span>Paranhos, Porto</span>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors mt-auto">
                    VER IMÓVEL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Services Section - Compare e adira à melhor oferta */}
      <AnimatedSection>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Compare e adira à melhor oferta
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="mb-6 flex flex-col h-full">
                  <div className="bg-blue-600 w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Home className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-600 mb-3">
                    Alarmes
                  </h3>
                  <p className="text-gray-600 text-sm mb-6 flex-grow">
                    Os alarmes são dispositivos de segurança projetados para alertar sobre eventos específicos, relacionados à segurança pessoal, propriedade. Desempenham um papel crucial na prevenção de incidentes indesejados e na proteção do seu lar.
                  </p>
                  <button
                    onClick={() => handleServiceClick('alarmes')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-auto"
                  >
                    SABER MAIS
                  </button>
                </div>
              </div>

              <div className="text-center">
                <div className="mb-6 flex flex-col h-full">
                  <div className="bg-blue-600 w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-600 mb-3">
                    Energia
                  </h3>
                  <p className="text-gray-600 text-sm mb-6 flex-grow">
                    A eletricidade e o gás natural desempenham papéis essenciais na vida moderna, indispensáveis para diversas atividades realizadas diariamente. É crucial atender a todos os clientes com a melhor oferta energética de forma a facilitar a sua decisão
                  </p>
                  <button
                    onClick={() => handleServiceClick('energia')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-auto"
                  >
                    SABER MAIS
                  </button>
                </div>
              </div>

              <div className="text-center">
                <div className="mb-6 flex flex-col h-full">
                  <div className="bg-blue-600 w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-600 mb-3">
                    Seguros
                  </h3>
                  <p className="text-gray-600 text-sm mb-6 flex-grow">
                    Um seguro é um contrato legal entre dois intervenientes e tem como objetivo fornecer proteção financeira ao segurado em caso de perdas ou danos. O segurado paga uma quantia e a seguradora fornece apoio financeiro conforme definido nas condições da apólice.
                  </p>
                  <button
                    onClick={() => handleServiceClick('seguros')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-auto"
                  >
                    SABER MAIS
                  </button>
                </div>
              </div>

              <div className="text-center">
                <div className="mb-6 flex flex-col h-full">
                  <div className="bg-blue-600 w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-600 mb-3">
                    TV, Net, Voz
                  </h3>
                  <p className="text-gray-600 text-sm mb-6 flex-grow">
                    As telecomunicações são essenciais para a conectividade e desempenham um papel crucial na propagação de informações em muitas áreas da sociedade. A Globaleal apresenta várias soluções e pretende atender às reais necessidades de cada cliente
                  </p>
                  <button
                    onClick={() => handleServiceClick('tv-net-voz')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-auto"
                  >
                    SABER MAIS
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>


      {/* Company Stats */}
      <CompanyStats />

      {/* Case Studies */}
      <AnimatedSection>
        <CaseStudies />
      </AnimatedSection>

      {/* Video Testimonials */}
      <AnimatedSection>
        <VideoTestimonials />
      </AnimatedSection>

      {/* Google Reviews */}
      <AnimatedSection>
        <GoogleReviews />
      </AnimatedSection>


      {/* Partners Carousel */}
      <AnimatedSection>
        <PartnersCarousel />
      </AnimatedSection>

      {/* Blog with Filters */}
      <AnimatedSection>
        <BlogWithFilters />
      </AnimatedSection>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Instagram Template - Lado Esquerdo */}
            <div className="lg:w-1/3 flex justify-center">
              <img 
                src="/template-dos-inta-2.png" 
                alt="Instagram Template" 
                className="w-128 h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Formulário - Lado Direito */}
            <div className="lg:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-left">
                Tem dúvidas?<br />
                Entre em contacto
              </h2>
              <ContactForm page="homepage" />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para começar?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Entre em contacto connosco hoje mesmo e descubra como podemos ajudá-lo a alcançar os seus objetivos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  trackEvent('cta_click', { location: 'homepage_bottom' });
                  onNavigate('contactos');
                }}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300 inline-flex items-center justify-center"
              >
                Contactar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={() => {
                  trackEvent('phone_click', { location: 'homepage_bottom' });
                  window.open('tel:+351915482365', '_self');
                }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300 inline-flex items-center justify-center"
              >
                <Phone className="mr-2 h-5 w-5" />
                915 482 365
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;