import React, { useState } from 'react';
import { useSpring, animated, config, useTrail } from '@react-spring/web';
import { Award, Users, TrendingUp, MapPin, Star, Building, Compass, Hammer, Palette, Scale, Camera, Globe, Paintbrush, Share2, Tag, Video, Search } from 'lucide-react';
import AnimatedSectionSpring from '../components/Parallax/AnimatedSectionSpring';
import PropertyValuationForm from '../components/PropertyValuationForm';
import PropertyBuyForm from '../components/PropertyBuyForm';
import Footer from '../components/Footer';
import goncalo from "../../public/testemonials/goncalo-vinhas.jpg"
import fml from "../../public/testemonials/familia-gomes.jpg"
import franc from "../../public/testemonials/francisco-gonçalves.jpg"
import { useTranslation } from 'react-i18next';
import FounderVideoSection2 from '../components/FounderVideoSection2';
import AgentContactBar from '../components/AgentContactBar';
import AgentProperties from '../components/AgentProperties';

const CarlosGoncalvesPage: React.FC = () => {
  const { t } = useTranslation();

  const achievements = [
    {
      icon: <Award className="h-8 w-8 text-[#0d2233]" />,
      number: "10+",
      label: t('carlos.expLabel'),
      description: t('carlos.expTexto')
    },
    {
      icon: <Users className="h-8 w-8 text-[#0d2233]" />,
      number: "500+",
      label: t('carlos.clientesLabel'),
      description: t('carlos.clientesTexto')
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-[#0d2233]" />,
      number: "€2M+",
      label: t('carlos.volumeLabel'),
      description: t('carlos.volumeTexto')
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      number: "4.9",
      label: t('carlos.avaliacaoLabel'),
      description: t('carlos.avaliacaoTexto')
    }
  ];

  const sellingSteps = [
    {
      text: t('vender.passo1'),
      icon: <Video className="h-12 w-12 text-[#79b2e9]" />
    },
    {
      text: t('vender.passo2'),
      icon: <Share2 className="h-12 w-12 text-[#79b2e9]" />
    },
    {
      text: t('vender.passo3'),
      icon: <Camera className="h-12 w-12 text-[#79b2e9]" />
    },
    {
      text: t('vender.passo4'),
      icon: <Globe className="h-12 w-12 text-[#79b2e9]" />
    },
    {
      text: t('vender.passo5'),
      icon: <MapPin className="h-12 w-12 text-[#79b2e9]" />
    },
    {
      text: t('vender.passo6'),
      icon: <Tag className="h-12 w-12 text-[#79b2e9]" />
    },
    {
      text: t('vender.passo7'),
      icon: <Users className="h-12 w-12 text-[#79b2e9]" />
    },
    {
      text: t('vender.passo8'),
      icon: <Paintbrush className="h-12 w-12 text-[#79b2e9]" />
    }
  ];
    
 const testimonials = [
    {
      name: "Gonçalo Vinhas",
      image: goncalo ,
      platform: "WhatsApp",
      review: t('testemunhos.goncalo')
    },
    {
      name: "Francisco Gonçalves",
      image: franc ,
      platform: "Facebook",
      review: t('testemunhos.francisco')
    },
    {
      name: "Família Gomes",
      image: fml ,
      platform: "Google",
      review: t('testemunhos.familiaGomes')
    },
    {
      name: "Liliana da Silva",
      image: "/testemonials/liliana.jpg",
      platform: "Instagram",
      review: t('testemunhos.liliana')
    },
    {
      name: "Wneres & Daiane",
      image: "/testemonials/Wneres.jpg",
      platform: "WhatsApp",
      review: t('testemunhos.wneres')
    },
    {
      name: "Ana Fernandes",
      image: "/testemonials/Ana.jpg",
      platform: "Facebook",
      review: t('testemunhos.ana')
    }
  ];
  
  const [expandedTestimonials, setExpandedTestimonials] = useState<boolean[]>([false, false, false, false, false, false]);

  const toggleExpand = (index: number) => {
    setExpandedTestimonials(prev => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };
  
  const services = [
    {
      icon: <Hammer className="h-12 w-12 text-[#0d2233]" />,
      title: t('imoveis.obrasTitulo'),
      description: t('imoveis.obrasTexto'),
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Palette className="h-12 w-12 text-[#0d2233]" />,
      title: t('imoveis.designTitulo'),
      description: t('imoveis.designTexto'),
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Building className="h-12 w-12 text-[#0d2233]" />,
      title: t('imoveis.promotoraTitulo'),
      description: t('imoveis.promotoraTexto'),
      image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Users className="h-12 w-12 text-[#0d2233]" />,
      title: t('imoveis.relocationTitulo'),
      description: t('imoveis.relocationTexto'),
      image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Compass className="h-12 w-12 text-[#0d2233]" />,
      title: t('imoveis.arquiteturaTitulo'),
      description: t('imoveis.arquiteturaTexto'),
      image: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Scale className="h-12 w-12 text-[#0d2233]" />,
      title: t('imoveis.juridicoTitulo'),
      description: t('imoveis.juridicoTexto'),
      image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  // Trail animation for achievements
  const achievementTrail = useTrail(achievements.length, {
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: config.gentle,
  });

  // Hero text animation
  const heroTextSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay: 200,
    config: config.gentle,
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Full Screen Parallax Header */}
      <section className="relative h-screen overflow-hidden">
        {/* Fixed Background Image */}
        <div 
          className="fixed inset-0 w-full h-full bg-stretch bg-center  bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(13, 34, 51, 0.4), rgba(13, 34, 51, 0.6)), url('/carlos/sentado-tele-h.jpg')`,
            backgroundAttachment: 'fixed'
          }}
        />
        
        {/* Overlay Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl mx-auto">
            <animated.div style={heroTextSpring}>
              <div className="mb-8">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight tracking-tight">
                  {t('carlos.heroTitulo')}
                </h1>
                <div className="w-16 sm:w-20 md:w-24 h-1 bg-white mx-auto mb-4 sm:mb-6"></div>
                <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                  {t('carlos.heroSubtitulo')}
                </p>
              </div>
            </animated.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Contactos diretos + redes, antes de qualquer conteúdo */}
      <AgentContactBar />

      {/* About Section */}
      <AnimatedSectionSpring>
        <section className="relative py-16 sm:py-20 bg-white z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                  {t('carlos.visaoTitulo')}
                </h2>
                <div className="space-y-4 sm:space-y-6 text-base mt-12 sm:text-lg text-gray-600">
                  <p>
                    {t('carlos.bio1')}
                  </p>
                  <p>{t('carlos.bio2')}</p>
                  <p>{t('carlos.bio3')}</p>
                  <p>{t('carlos.bio4')}</p>
                  <p>{t('carlos.bio5')}</p>
                </div>
                
                
              </div>

              <div className="relative">
                {/* Placeholder for main professional photo */}
                <div className="relative bg-gray-200 rounded-2xl overflow-hidden shadow-xl aspect-[3/4]">
                  <img
                    src="/carlos/pe-fato-serio.jpg"
                    alt="Carlos Gonçalves"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

              </div>
            </div>
          </div>
        </section>
      </AnimatedSectionSpring>
      
      {/* Achievements Section */}
      <AnimatedSectionSpring>
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                {t('carlos.resultadosTitulo')}
              </h2>
              <p className="text-lg sm:text-xl text-gray-600">
                {t('carlos.resultadosTexto')}
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {achievementTrail.map((style, index) => (
                <animated.div
                  key={index}
                  style={style}
                  className="text-center p-4 sm:p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="mb-3 sm:mb-4 flex justify-center">
                    {achievements[index].icon}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#0d2233] mb-1 sm:mb-2">
                    {achievements[index].number}
                  </div>
                  <div className="text-sm sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                    {achievements[index].label}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {achievements[index].description}
                  </div>
                </animated.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSectionSpring>
      
      <AnimatedSectionSpring>
        <FounderVideoSection2 />
      </AnimatedSectionSpring>

      {/* Carteira de imóveis do consultor */}
      <AnimatedSectionSpring>
        <AgentProperties
          mode="ativos"
          title={t('carlos.meusImoveis')}
          subtitle={t('carlos.meusImoveisSub')}
          background="bg-gray-50"
        />
      </AnimatedSectionSpring>

      <AnimatedSectionSpring>
        <AgentProperties
          mode="vendidos"
          title={t('carlos.vendidos')}
          subtitle={t('carlos.vendidosSub')}
          limit={3}
          background="bg-white"
        />
      </AnimatedSectionSpring>

      {/* Property Buy Form Section */}
      <AnimatedSectionSpring>
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="text-center mb-8 sm:mb-12">
                  <div className="flex justify-center mb-4 sm:mb-6">
                    <div className="bg-[#79b2e9] p-3 sm:p-4 rounded-full">
                      <Search className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                    {t('carlos.encontreTitulo')}
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                    {t('carlos.encontreTexto')}
                  </p>
                </div>
          <PropertyBuyForm />
        </section>
      </AnimatedSectionSpring>

      {/* Selling Process Section */}
      <AnimatedSectionSpring>
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                {t('vender.titulo')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {sellingSteps.map((step, index) => (
                <div key={index} className="bg-gray-50 p-4 sm:p-6 rounded-xl flex items-start">
                  <div className="text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold mr-3 sm:mr-4 flex-shrink-0">
                    {step.icon}
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSectionSpring>

      <AnimatedSectionSpring>
        {/* Services Grid */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                {t('imoveis.servicosTitulo')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="hover-card-effect"
                >
                  <div className="p-0 flex flex-col flex-grow">
                    {/* Ícone sempre visível */}
                    <div className="flex items-center mb-3 sm:mb-4">
                      <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 text-[#0d2233] rounded-xl">
                        {service.icon}
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 ml-3">
                        {service.title}
                      </h3>
                    </div>

                    {/* Texto curto no mobile, completo no desktop */}
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSectionSpring>

      {/* Testimonials */}
      <AnimatedSectionSpring>
        {/* Testimonials */}
              <section className="py-16 sm:py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                      {t('testemunhos.titulo')}
                    </h2>
                  </div>
        
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => {
                      const words = testimonial.review.split(' ');
                      const isExpanded = expandedTestimonials[index];
                      const maxWords = 35;
                      const displayText = isExpanded || words.length <= maxWords
                        ? testimonial.review
                        : words.slice(0, maxWords).join(' ') + '...';

                      return (
                        <div
                          key={index}
                          className="bg-white rounded-xl shadow-lg w-full text-center flex flex-col justify-between overflow-hidden border border-gray-100"
                        >
                          <div className="flex justify-center">
                            <img src={testimonial.image} alt="testimonial" className="w-full h-64 object-cover" />
                          </div>
                          <div className="p-6 flex flex-col flex-grow">
                            <div className="flex justify-center mb-4">
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="h-5 w-5 fill-current" />
                                ))}
                              </div>
                            </div>

                            <div className="flex-grow flex items-center justify-center mb-4">
                              <p className="text-gray-600 italic">
                                "{displayText}"
                                {words.length > maxWords && !isExpanded && (
                                  <span
                                    className="ml-1 font-bold text-[#79b2e9] cursor-pointer"
                                    onClick={() => toggleExpand(index)}
                                  >
                                    ler mais
                                  </span>
                                )}
                              </p>
                            </div>

                            <div className="border-t pt-4 mt-6">
                              <p className="font-semibold text-gray-900">
                                {testimonial.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                Review: {testimonial.platform}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
      </AnimatedSectionSpring>

    

      

      {/* Property Valuation Section */}
      <AnimatedSectionSpring>
        <section id="avaliacao-imovel" className="py-16 sm:py-20 bg-white">
          <PropertyValuationForm />
        </section>
      </AnimatedSectionSpring>

      <AnimatedSectionSpring>
        <Footer />
      </AnimatedSectionSpring>
    </div>
  );
};

export default CarlosGoncalvesPage;