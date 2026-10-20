import React, { useEffect } from 'react';
import {
  Hammer, Palette, Building, Users, Compass, Scale,
  MapPin, Camera, Globe, Paintbrush,
  Share2, Tag, Video} from 'lucide-react';
import { supabase } from '../lib/supabase';

import FeaturedProperties from '../components/FeaturedProperties';
import FeaturedEmpreendimentos from '../components/FeaturedEmpreendimentos';
import VideoPortfolioCarousel from '../components/VideoPortfolioCarousel';
import BusinessServices from '../components/BusinessServices';
import ImoveisContactForm from '../components/ImoveisContactForm';
import { useTranslation } from 'react-i18next';

const ImoveisPage: React.FC = () => {

  const { t } = useTranslation();
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { error } = await supabase
          .from('properties')
          .select('*')
          .eq('is_published', true)
          .limit(12)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Erro ao carregar propriedades:', error);
          // Fallback data
          
        } 
      } catch (error) {
        console.error('Erro ao carregar propriedades:', error);
        
      }
      
    };

    const fetchSiteSettings = async () => {
      
    };

    fetchProperties();
    fetchSiteSettings();
  }, []);

  

  const services = [
    {
      icon: <Hammer className="h-12 w-12 text-[#0d2233]" />,
      title: t('imoveis.obrasTitulo'),
      description: t('imoveis.obrasTexto')
    },
    {
      icon: <Palette className="h-12 w-12 text-[#0d2233]" />,
      title: t('imoveis.designTitulo'),
      description: t('imoveis.designTexto')
    },
    {
      icon: <Building className="h-12 w-12 text-[#0d2233]" />,
      title: t('imoveis.promotoraTitulo'),
      description: t('imoveis.promotoraTexto')
    },
    {
      icon: <Users className="h-12 w-12 text-[#0d2233]" />,
      title: t('imoveis.relocationTitulo'),
      description: t('imoveis.relocationTexto')
    },
    {
      icon: <Compass className="h-12 w-12 text-[#0d2233]" />,
      title: t('imoveis.arquiteturaTitulo'),
      description: t('imoveis.arquiteturaTexto')
    },
    {
      icon: <Scale className="h-12 w-12 text-[#0d2233]" />,
      title: t('imoveis.juridicoTitulo'),
      description: t('imoveis.juridicoTexto')
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
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
              {t('imoveis.heroLinha1')}<br />{t('imoveis.heroLinha2')}
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto">
             {t('imoveis.heroTexto')}
            </p>
          </div>
        </div>
        
      </section>

      {/* Featured Properties */}
      <FeaturedProperties />

      {/* Empreendimentos em destaque */}
      <FeaturedEmpreendimentos />

      {/* Selling Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('vender.titulo')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sellingSteps.map((step, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl flex items-start">
                <div className=" text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  {step.icon}
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portefólio em vídeo */}
      <VideoPortfolioCarousel />

      {/* Crédito, certificação e seguros (a mesma secção da homepage) */}
      <BusinessServices />

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('imoveis.servicosTitulo')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="hover-card-effect"
              >
                <div className="flex flex-col flex-grow">
                  {/* Ícone sempre visível */}
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-14 h-14 text-[#0d2233] rounded-xl">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 ml-3">
                      {service.title}
                    </h3>
                  </div>

                  {/* Texto curto no mobile, completo no desktop */}
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fale connosco */}
      <ImoveisContactForm />
    </div>
  );
};

export default ImoveisPage;