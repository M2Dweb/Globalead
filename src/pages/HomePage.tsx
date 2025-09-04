import React, { useState, useEffect } from 'react';
import { ArrowRight, Home, Shield, Zap, Star, ChevronLeft, ChevronRight, Bed, Bath, Square, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentReview, setCurrentReview] = useState(0);
  const [currentProperty, setCurrentProperty] = useState(0);
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const { data } = await supabase
        .from('properties')
        .select('*')
        .limit(6);
      
      if (data) {
        setProperties(data);
      } else {
        // Fallback data if Supabase not configured
        setProperties([
          {
            id: 1,
            title: "Empreendimento Vila Nova",
            price: 450000,
            bedrooms: 3,
            bathrooms: 3,
            area: 238,
            location: "Aldoar, Porto",
            images: ["https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800"]
          },
          {
            id: 2,
            title: "Apartamento T2 Moderno",
            price: 280000,
            bedrooms: 2,
            bathrooms: 1,
            area: 85,
            location: "Cedofeita, Porto",
            images: ["https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800"]
          },
          {
            id: 3,
            title: "Moradia T4 com Jardim",
            price: 520000,
            bedrooms: 4,
            bathrooms: 3,
            area: 200,
            location: "Matosinhos, Porto",
            images: ["https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800"]
          }
        ]);
      }
    };

    fetchProperties();
  }, []);

  const services = [
    {
      icon: <Home className="h-12 w-12 text-blue-600" />,
      title: "Mediação Imobiliária",
      description: "Encontre a casa dos seus sonhos com o nosso acompanhamento especializado",
      link: "imoveis"
    },
    {
      icon: <Shield className="h-12 w-12 text-green-600" />,
      title: "Seguros",
      description: "Proteja o que mais importa com as melhores soluções de seguros",
      link: "seguros"
    },
    {
      icon: <Zap className="h-12 w-12 text-yellow-600" />,
      title: "Certificação Energética",
      description: "Certificados energéticos rápidos e profissionais",
      link: "certificacao"
    }
  ];

  const reviews = [
    {
      name: "Daniel Gomes",
      platform: "Facebook",
      review: "Estou extremamente satisfeito com a experiência que tive. Foram bastante profissionais e prestaram um serviço de excelência.",
      rating: 5
    },
    {
      name: "Pedro Tavares",
      platform: "Google",
      review: "Consegui vender o meu imóvel em menos de 1 mês e adquirir a minha moradia de sonho com a ajuda da Globalead.",
      rating: 5
    },
    {
      name: "Ana Torres",
      platform: "Livro de Elogios",
      review: "Valorizo a clareza na forma como a Globalead me apresentou todas as soluções de seguros para a minha viatura.",
      rating: 5
    },
    {
      name: "Maria Silva",
      platform: "Google",
      review: "Atendimento personalizado e profissional. Recomendo vivamente os serviços da Globalead.",
      rating: 5
    },
    {
      name: "João Santos",
      platform: "Facebook",
      review: "Excelente acompanhamento durante todo o processo de compra. Equipa muito competente.",
      rating: 5
    },
    {
      name: "Carla Mendes",
      platform: "Google",
      review: "Conseguiram-me um seguro com condições muito melhores que o anterior. Muito satisfeita!",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview(prev => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProperty(prev => (prev + 1) % Math.max(1, properties.length));
    }, 5000);
    return () => clearInterval(interval);
  }, [properties.length]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          poster="/fotos/HomePage-foto.png"
        >
          <source src="/videos/HomePage-video(1).mp4" type="video/mp4" />
        </video>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Caminhamos consigo<br />lado a lado
            </h1>
            <p className="text-xl text-gray-100 max-w-4xl mx-auto">
              A Globalead Portugal é uma empresa inovadora que atua como intermediária, oferecendo soluções personalizadas em diversos setores. Com foco na comodidade, segurança e eficiência, simplificamos processos e proporcionamos um apoio gratuito, garantindo um serviço adaptado às reais necessidades e exigências de cada cliente.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Os Nossos Serviços
            </h2>
            <p className="text-xl text-gray-600">
              Soluções completas para todas as suas necessidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div className="flex justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <button
                  onClick={() => onNavigate(service.link)}
                  className="text-blue-600 font-medium hover:text-blue-700 transition-colors inline-flex items-center"
                >
                  Saber mais
                  <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties Slideshow */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Imóveis em Destaque
            </h2>
            <p className="text-xl text-gray-600">
              Descubra as nossas melhores oportunidades
            </p>
          </div>

          {properties.length > 0 && (
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentProperty * 100}%)` }}
                >
                  {properties.map((property, index) => (
                    <div key={property.id} className="w-full flex-shrink-0">
                      <div className="bg-white rounded-xl shadow-lg overflow-hidden mx-2">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-64 md:h-80 object-cover"
                          />
                          <div className="p-8 flex flex-col justify-center">
                            <div className="text-3xl font-bold text-blue-600 mb-4">
                              {formatPrice(property.price)}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                              {property.title}
                            </h3>
                            <div className="flex items-center space-x-4 text-gray-600 mb-4">
                              <div className="flex items-center">
                                <Bed className="h-5 w-5 mr-1" />
                                <span>{property.bedrooms}</span>
                              </div>
                              <div className="flex items-center">
                                <Bath className="h-5 w-5 mr-1" />
                                <span>{property.bathrooms}</span>
                              </div>
                              <div className="flex items-center">
                                <Square className="h-5 w-5 mr-1" />
                                <span>{property.area}m²</span>
                              </div>
                            </div>
                            <div className="flex items-center text-gray-600 mb-6">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{property.location}</span>
                            </div>
                            <button
                              onClick={() => onNavigate('property-list')}
                              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
                            >
                              Ver Detalhes
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center mt-8 space-x-2">
                {properties.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentProperty(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      index === currentProperty ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('property-list')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold inline-flex items-center"
            >
              Ver Todos os Imóveis
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              O que dizem os nossos clientes
            </h2>
            <p className="text-xl text-gray-600">
              6 avaliações de clientes satisfeitos
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentReview * 100}%)` }}
              >
                {reviews.map((review, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-gray-50 p-8 rounded-xl text-center">
                      <div className="flex justify-center mb-4">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-700 text-lg mb-6 italic">
                        "{review.review}"
                      </p>
                      <div className="border-t pt-4">
                        <p className="font-semibold text-gray-900">{review.name}</p>
                        <p className="text-sm text-gray-500">Review: {review.platform}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentReview ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Entre em contacto connosco hoje mesmo
          </p>
          <button
            onClick={() => onNavigate('contactos')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-300 font-semibold inline-flex items-center"
          >
            Contactar Agora
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;