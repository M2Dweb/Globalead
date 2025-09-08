import React, { useState, useEffect } from 'react';
import { ArrowRight, Home, Shield, Zap, Star, ChevronLeft, ChevronRight, Bed, Bath, Square, MapPin, Tv, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [currentReview, setCurrentReview] = useState(0);
  const [currentProperty, setCurrentProperty] = useState(0);
  const [properties, setProperties] = useState<any[]>([]);
  const [partnerLogos, setPartnerLogos] = useState<string[]>([]);
  const [currentPartnerIndex, setCurrentPartnerIndex] = useState(0);
  

  const [reviewsPerPage, setReviewsPerPage] = useState(
    window.innerWidth < 640 ? 1 : 2
  );

// Atualiza se a tela mudar de tamanho
  useEffect(() => {
    const handleResize = () => {
      setReviewsPerPage(window.innerWidth < 640 ? 1 : 2);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .limit(3);
        
        if (error) {
          console.error('Erro ao carregar propriedades:', error);
          // Fallback data if Supabase not configured
          setProperties([
            {
              id: 1,
              title: "Empreendimento Noval Park",
              price: 432600,
              bedrooms: 3,
              bathrooms: 2,
              area: 145,
              location: "Vila Nova de Gaia",
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
        } else {
          setProperties(data || []);
        }
      } catch (error) {
        console.error('Erro ao carregar propriedades:', error);
        setProperties([]);
      }
    };

    const fetchPartnerLogos = async () => {
      try {
        const { data, error } = await supabase.storage
          .from('imagens')
          .list('patrocinios', {
            limit: 20,
            offset: 0
          });

        if (error) {
          console.error('Erro ao carregar logos dos parceiros:', error);
          // Fallback logos
          setPartnerLogos([
            "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
            "https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
            "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
            "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
            "https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
            "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop"
          ]);
        } else if (data) {
          const logoUrls = data.map(file => {
            const { data: urlData } = supabase.storage
              .from('imagens')
              .getPublicUrl(`patrocinios/${file.name}`);
            return urlData.publicUrl;
          });
          setPartnerLogos(logoUrls);
        }
      } catch (error) {
        console.error('Erro ao carregar logos dos parceiros:', error);
        setPartnerLogos([]);
      }
    };

    fetchProperties();
    fetchPartnerLogos();
  }, []);

  const services = [
    {
      icon: <Shield className="h-12 w-12 text-red-600" />,
      title: "Alarmes",
      description: "Os alarmes são dispositivos de segurança projetados para alertar sobre eventos específicos, relacionados à segurança pessoal, propriedade etc. Desempenham um papel crucial na prevenção de incidentes indesejados e na proteção do seu lar",
      link: "alarmes"
    },
    {
      icon: <Zap className="h-12 w-12 text-yellow-600" />,
      title: "Energia",
      description: "A eletricidade e o gás natural desempenham papéis essenciais na vida moderna, indispensáveis para diversas atividades realizadas diariamente. É crucial atender a todos os clientes com a melhor oferta energética de forma a facilitar a sua decisão",
      link: "energia"
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Seguros",
      description: "Um seguro é um contrato legal entre dois intervenientes e tem como objetivo fornecer proteção financeira ao segurado em caso de perdas ou danos. O segurado paga uma quantia e a seguradora fornece apoio financeiro conforme definido nas condições da apólice",
      link: "seguros"
    },
    {
      icon: <Tv className="h-12 w-12 text-purple-600" />,
      title: "TV, Net, Voz",
      description: "As telecomunicações são essenciais para a conectividade e desempenham um papel crucial na propagação de informações em muitas áreas da sociedade. A Globaleal apresenta várias soluções e pretende atender às reais necessidades de cada cliente",
      link: "tv-net-voz"
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
      setCurrentReview(prev => (prev + 2) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProperty(prev => (prev + 1) % Math.max(1, properties.length));
    }, 5000);
    return () => clearInterval(interval);
  }, [properties.length]);

  useEffect(() => {
    if (partnerLogos.length > 0) {
      const interval = setInterval(() => {
        setCurrentPartnerIndex(prev => (prev + 1) % (partnerLogos.length - 5));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [partnerLogos.length]);

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

      {/* Properties Slideshow */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Visite o seu próximo lar de sonho
            </h2>
          </div>

          {properties.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {properties.map((property, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {formatPrice(property.price)}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {property.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-gray-600 mb-2">
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        <span>{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        <span>{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center">
                        <Square className="h-4 w-4 mr-1" />
                        <span>{property.area}m²</span>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{property.location}</span>
                    </div>
                    <button
                      onClick={() => onNavigate('property-list')}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              ))}
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

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Compare e adira à melhor oferta
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <p className="text-gray-600 mb-6 text-sm">
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

      {/* Reviews Section - 2 at a time */}
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

          <div className="relative max-w-6xl mx-auto overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentReview * (100 / reviewsPerPage)}%)` }}
            >
              {reviews.map((review, index) => (
                <div key={index} className="flex-shrink-0 w-full sm:w-1/2 px-4">
                  <div className="bg-gray-50 p-8 rounded-xl text-center h-full">
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

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(reviews.length / reviewsPerPage) }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReview(index * reviewsPerPage)}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      Math.floor(currentReview / reviewsPerPage) === index
                        ? "bg-blue-600"
                        : "bg-gray-300"
                    }`}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Compare as várias instituições em Portugal
            </h2>
          </div>

          {partnerLogos.length > 0 && (
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${currentPartnerIndex * 20}%)` }}
              >
                {partnerLogos.map((logo, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-1/5 px-4"
                  >
                    <div className="bg-white  rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                      <img
                        src={logo}
                        alt={`Parceiro ${index + 1}`}
                        className="w-full h-40 object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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