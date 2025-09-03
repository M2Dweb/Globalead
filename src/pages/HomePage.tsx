import React from 'react';
import { ArrowRight, Home, Shield, Zap, Phone, Star, Users, Award, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import CompanyStats from '../components/CompanyStats';
import VideoTestimonials from '../components/VideoTestimonials';
import PartnersCarousel from '../components/PartnersCarousel';
import BlogWithFilters from '../components/BlogWithFilters';
import CaseStudies from '../components/CaseStudies';
import GoogleReviews from '../components/GoogleReviews';
import Certifications from '../components/Certifications';
import LazyImage from '../components/LazyImage';
import { trackEvent } from '../components/Analytics';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onPropertySelect: (propertyId: number) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onPropertySelect }) => {
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
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden min-h-screen flex items-center">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          >
            <source src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Caminhamos consigo<br />
                <span className="text-blue-300">lado a lado</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-4xl mx-auto text-center">
                A Globalead Portugal é uma empresa inovadora que atua como intermediária, oferecendo soluções personalizadas em diversos setores. Com foco na comodidade, segurança e eficiência, simplificamos processos e proporcionamos um apoio gratuito, garantindo um serviço adaptado às reais necessidades e exigências de cada cliente.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => handleServiceClick('imoveis')}
                  className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300 inline-flex items-center justify-center"
                >
                  Encontrar Imóvel
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button
                  onClick={() => onNavigate('contactos')}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors duration-300"
                >
                  Contactar-nos
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Os Nossos Serviços
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Soluções completas e personalizadas para todas as suas necessidades
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  onClick={() => handleServiceClick(service.link)}
                >
                  <div className="text-center">
                    <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {service.description}
                    </p>
                    <button className={`text-${service.color}-600 font-medium hover:text-${service.color}-700 transition-colors inline-flex items-center`}>
                      Saber mais
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
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

      {/* Certifications */}
      <AnimatedSection>
        <Certifications />
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
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
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