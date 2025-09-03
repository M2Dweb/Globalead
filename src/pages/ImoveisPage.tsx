import React, { useState } from 'react';
import { Bed, Bath, Square, MapPin, ArrowRight, Shield, CreditCard, Zap, FileText, ChevronLeft, ChevronRight, Hammer, Palette, Building, Users, Compass, Scale } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import AnimatedSection from '../components/AnimatedSection';

interface ImoveisPageProps {
  onNavigate: (page: string) => void;
}

const ImoveisPage: React.FC<ImoveisPageProps> = ({ onNavigate }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: number]: number}>({});

  const nextImage = (propertyId: number, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [propertyId]: ((prev[propertyId] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (propertyId: number, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [propertyId]: ((prev[propertyId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  const properties = [
    {
      id: 1,
      title: "Empreendimento Vila Nova",
      description: "Empreendimento completamente murado, em pedra. O exterior das moradias terá uma grande presença de betão aparente, o que lhe configurará uma imagem de modernidade e simultaneamen...",
      bedrooms: 3,
      bathrooms: 3,
      area: 238,
      location: "Aldoar, Porto",
      images: [
        "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800"
      ]
    },
    {
      id: 2,
      title: "Empreendimento Noval Park",
      description: "Cidade de paisagens ofegantes, miragens autênticas de recantos e encantos irrefutáveis.Revela-se nobre na simbiose perfeita entre a opulência do seu património cultural e his...",
      bedrooms: 2,
      bathrooms: 2,
      area: 145,
      location: "Vila Nova de Gaia",
      images: [
        "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
      ]
    },
    {
      id: 3,
      title: "Empreendimento Boss Gardens",
      description: "Boss Gardens está localizado na zona de Paranhos, uma das melhores zonas residenciais do Porto. Um projeto original que integra arquitetura vanguardista e designs de interiores surpreendent...",
      bedrooms: 3,
      bathrooms: 2,
      area: 139,
      location: "Paranhos, Porto",
      images: [
        "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800"
      ]
    }
  ];

  const services = [
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Alarmes",
      description: "Os alarmes são dispositivos de segurança projetados para alertar sobre eventos específicos, relacionados à segurança pessoal, propriedade. Desempenham um papel crucial na prevenção de incidentes indesejados e na proteção do seu lar.",
      link: "alarmes"
    },
    {
      icon: <CreditCard className="h-12 w-12 text-blue-600" />,
      title: "Crédito Habitação",
      description: "A Globalead é especializada em oferecer soluções de Crédito Habitação personalizadas, graças à sua relação privilegiada e poder negocial com as principais instituições bancárias em Portugal, garantindo as melhores opções para o seu agregado familiar.",
      link: "credito"
    },
    {
      icon: <Zap className="h-12 w-12 text-blue-600" />,
      title: "Certificação Energética",
      description: "O desempenho energético de um imóvel é classificado de A+ a G e deve ser indicado através de um certificado energético, obrigatório na venda. Com a Globalead, tratamos de todo o processo, garantindo todas as condições para a venda do seu imóvel.",
      link: "energia"
    },
    {
      icon: <FileText className="h-12 w-12 text-blue-600" />,
      title: "Seguros",
      description: "Um seguro é um contrato legal entre dois intervenientes e tem como objetivo fornecer proteção financeira ao segurado em caso de perdas ou danos. O segurado paga uma quantia e a seguradora fornece apoio financeiro conforme definido nas condições da apólice.",
      link: "seguros"
    }
  ];

  const newServices = [
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Obras e Remodelações",
      description: "Executamos obras e remodelações com profissionalismo, desde o planeamento até à entrega final. De pequenas melhorias a renovações completas, contamos com mão de obra especializada e experiente, adaptada às necessidades da sua casa ou espaço comercial.",
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Design e Decoração",
      description: "Transformamos espaços com soluções personalizadas que aliam funcionalidade, elegância e design de excelência. Acompanhamos todas as etapas do planeamento à escolha do mobiliário e da decoração para garantir ambientes que refletem o seu estilo e respondem às suas necessidades.",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Promotora Imobiliária",
      description: "Desenvolvemos empreendimentos inovadores que aliam design, funcionalidade e elevado potencial de valorização. Cada projeto é cuidadosamente planeado para oferecer uma experiência imobiliária distinta e rentável.",
      image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Relocation",
      description: "Oferecemos um acompanhamento completo para garantir uma transição tranquila para Portugal. As nossas parcerias incluem a procura de imóvel, gestão documental e apoio na integração à comunidade local.",
      image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Arquitetura",
      description: "Criamos espaços intemporais onde luz, matéria e proporção se unem com simplicidade e autenticidade. Acreditamos que o verdadeiro luxo está na clareza das ideias e na honestidade dos materiais. Cada projeto reflete a identidade de quem o habita lugares serenos que resistem ao tempo e transcendem modas.",
      image: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Apoio Jurídico",
      description: "Tratamos de todo o processo desde a autenticação de documentos e escrituras até à representação fiscal e pedidos de residência. Garantimos transparência e acompanhamento completo na compra, venda, arrendamento ou investimento imobiliário.",
      image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  const marketingFeatures = [
    "Apresentação do imóvel através de tours virtuais de alta qualidade, permitindo que potenciais compradores explorem a propriedade à distância.",
    "Reportagem de imagens e vídeos promocionais para destacar as melhores características do imóvel.",
    "Divulgação em zonas estratégicas para alcançar um público local relevante.",
    "Divulgação direcionada a uma carteira exclusiva de clientes qualificados e a grupos privados da Globalead Portugal.",
    "Promoção do imóvel em todas as plataformas sociais e digitais, com campanhas segmentadas e uma estratégia detalhada para maximizar a visibilidade.",
    "Publicação do imóvel nos principais portais imobiliários em Portugal e no estrangeiro, ampliando o alcance da sua oferta.",
    "Colocação de sinalética no local do imóvel para atrair potenciais compradores na área."
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          >
            <source src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3cc6ed40b0d26d&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-blue-900 bg-opacity-70"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              A burocracia é nossa, o futuro é seu
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Especialistas em mediação imobiliária com acompanhamento personalizado
            </p>
          </div>
        </div>
      </section>

      {/* New Services Section */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newServices.map((service, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Video Presentation */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Conheça a Nossa Equipa
            </h2>
            <p className="text-xl text-gray-600">
              Uma mensagem pessoal do nosso fundador
            </p>
          </div>
          
          <div className="bg-gray-100 rounded-xl overflow-hidden">
            <div className="aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-600">Vídeo de apresentação em breve</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <AnimatedSection>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Imóveis em Destaque
              </h2>
              <p className="text-xl text-gray-600">
                Descubra as nossas melhores oportunidades
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {properties.map((property) => (
                <div key={property.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={property.images[currentImageIndex[property.id] || 0]}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Image Navigation */}
                    {property.images.length > 1 && (
                      <>
                        <button
                          onClick={() => prevImage(property.id, property.images.length)}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75 transition-all"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => nextImage(property.id, property.images.length)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75 transition-all"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                          {property.images.map((_, index) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full ${
                                index === (currentImageIndex[property.id] || 0) ? 'bg-white' : 'bg-white bg-opacity-50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {property.title}
                    </h3>
                    
                    <div className="flex items-center space-x-4 text-gray-600 mb-3">
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
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{property.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {property.description}
                    </p>
                    
                    <button 
                      onClick={() => onNavigate('property-list')}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Ver Imóvel
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button 
                onClick={() => onNavigate('property-list')}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold inline-flex items-center"
              >
                Ver Mais Imóveis
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Os Nossos Serviços
              </h2>
              <p className="text-xl text-gray-600">
                Soluções completas para todas as suas necessidades imobiliárias
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-center">
                    <div className="mb-6">
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
                      className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                    >
                      Saber mais →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Como promovemos o seu imóvel?
              </h2>
              <p className="text-xl text-gray-600">
                Estratégia de marketing completa para maximizar a visibilidade
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {marketingFeatures.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-start">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0 text-sm">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{feature}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Contact Form */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Encontre o Imóvel Perfeito
            </h2>
            <p className="text-xl text-blue-100">
              Entre em contacto connosco e deixe-nos ajudá-lo a encontrar a casa dos seus sonhos
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl">
            <ContactForm page="imoveis" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImoveisPage;