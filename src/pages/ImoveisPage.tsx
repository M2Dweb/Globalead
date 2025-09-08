import React, { useState, useEffect } from 'react';
import { ArrowRight, Hammer, Palette, Building, Users, Compass, Scale, Play, Home, CreditCard, FileText, Shield, Bath, Bed, MapPin, Square } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';



const ImoveisPage: React.FC = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [founderVideoUrl, setFounderVideoUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .limit(3)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Erro ao carregar propriedades:', error);
          // Fallback data
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
      setLoading(false);
    };

    const fetchSiteSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('founder_video_url')
          .single();
        
        if (data && data.founder_video_url) {
          setFounderVideoUrl(data.founder_video_url);
        }
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
      }
    };

    fetchProperties();
    fetchSiteSettings();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const services = [
    {
      icon: <Hammer className="h-12 w-12 text-blue-600" />,
      title: "Obras e Remodelações",
      description: "Executamos obras e remodelações com profissionalismo, desde o planeamento até à entrega final. De pequenas melhorias a renovações completas, contamos com mão de obra especializada e experiente, adaptada às necessidades da sua casa ou espaço comercial.",
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Palette className="h-12 w-12 text-blue-600" />,
      title: "Design e Decoração",
      description: "Transformamos espaços com soluções personalizadas que aliam funcionalidade, elegância e design de excelência. Acompanhamos todas as etapas do planeamento à escolha do mobiliário e da decoração para garantir ambientes que refletem o seu estilo e respondem às suas necessidades.",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Building className="h-12 w-12 text-blue-600" />,
      title: "Promotora Imobiliária",
      description: "Desenvolvemos empreendimentos inovadores que aliam design, funcionalidade e elevado potencial de valorização. Cada projeto é cuidadosamente planeado para oferecer uma experiência imobiliária distinta e rentável.",
      image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Users className="h-12 w-12 text-blue-600" />,
      title: "Relocation",
      description: "Oferecemos um acompanhamento completo para garantir uma transição tranquila para Portugal. As nossas parcerias incluem a procura de imóvel, gestão documental e apoio na integração à comunidade local.",
      image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Compass className="h-12 w-12 text-blue-600" />,
      title: "Arquitetura",
      description: "Criamos espaços intemporais onde luz, matéria e proporção se unem com simplicidade e autenticidade. Acreditamos que o verdadeiro luxo está na clareza das ideias e na honestidade dos materiais. Cada projeto reflete a identidade de quem o habita lugares serenos que resistem ao tempo e transcendem modas.",
      image: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Scale className="h-12 w-12 text-blue-600" />,
      title: "Apoio Jurídico",
      description: "Tratamos de todo o processo desde a autenticação de documentos e escrituras até à representação fiscal e pedidos de residência. Garantimos transparência e acompanhamento completo na compra, venda, arrendamento ou investimento imobiliário.",
      image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  const businessServices = [
    {
      icon: <Shield className="h-12 w-12 text-red-600" />,
      title: "Alarmes",
      description: "Os alarmes são dispositivos de segurança projetados para alertar sobre eventos específicos, relacionados à segurança pessoal, propriedade. Desempenham um papel crucial na prevenção de incidentes indesejados e na proteção do seu lar.",
      link: "/alarmes"
    },
    {
      icon: <CreditCard className="h-12 w-12 text-green-600" />,
      title: "Crédito Habitação",
      description: "A Globalead é especializada em oferecer soluções de Crédito Habitação personalizadas, graças à sua relação privilegiada e poder negocial com as principais instituições bancárias em Portugal, garantindo as melhores opções para o seu agregado familiar.",
      link: "/credito"
    },
    {
      icon: <FileText className="h-12 w-12 text-yellow-600" />,
      title: "Certificação Energética",
      description: "O desempenho energético de um imóvel é classificado de A+ a G e deve ser indicado através de um certificado energético, obrigatório na venda. Com a Globalead, tratamos de todo o processo, garantindo todas as condições para a venda do seu imóvel.",
      link: "/certificacao"
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Seguros",
      description: "Um seguro é um contrato legal entre dois intervenientes e tem como objetivo fornecer proteção financeira ao segurado em caso de perdas ou danos. O segurado paga uma quantia e a seguradora fornece apoio financeiro conforme condições da apólice.",
      link: "/seguros"
    }
  ];

  const sellingSteps = [
    "Apresentação do imóvel através de tours virtuais de alta qualidade, permitindo que potenciais compradores explorem a propriedade à distância.",
    "Promoção do imóvel em todas as plataformas sociais e digitais, com campanhas segmentadas e uma estratégia detalhada para maximizar a visibilidade.",
    "Reportagem de imagens e vídeos promocionais para destacar as melhores características do imóvel.",
    "Publicação do imóvel nos principais portais imobiliários em Portugal e no estrangeiro, ampliando o alcance da sua oferta.",
    "Divulgação em zonas estratégicas para alcançar um público local relevante.",
    "Colocação de sinalética no local do imóvel para atrair potenciais compradores na área.",
    "Divulgação direcionada a uma carteira exclusiva de clientes qualificados e a grupos privados da Globalead Portugal.",
    "Especialistas em decoração de interiores transformam o imóvel, destacando o seu potencial e alinhando-o às tendências e expectativas dos compradores."
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20 flex items-center overflow-hidden">
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
              O lugar a que<br />chamamos casa
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto">
              Vamos criar uma relação próxima e escutar com atenção todos os seus desejos e as suas expectativas e garantir sempre que está acompanhado, e que estamos consigo sempre
            </p>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Visite o seu próximo lar de sonho
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="text-xl text-gray-600">A carregar imóveis...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => navigate(`/imoveis/${property.id}`)} 
                >
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
                    <div className="flex items-center space-x-4 text-gray-600 mb-4">
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
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {property.description}
                    </p>
                    <button
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                      onClick={() => navigate(`/imoveis/${property.id}`)}// ✅ Ajustado para rota correta
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
              onClick={() => navigate('/imoveis/lista')}   
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold inline-flex items-center"
            >
              Ver Todos os Imóveis
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Business Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              O melhor negócio para o seu imóvel começa aqui
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {businessServices.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
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
                    onClick={() => navigate(service.link)} 
                    className="text-blue-600 font-medium hover:text-blue-700 transition-colors inline-flex items-center"
                  >
                    Saber mais
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </button>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Video Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Conheça o Fundador
            </h2>
            <p className="text-xl text-gray-600">
              Uma mensagem pessoal sobre a nossa missão
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative">
              {founderVideoUrl ? (
                <video
                  controls
                  className="w-full h-64 object-cover"
                  poster="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800"
                >
                  <source src={founderVideoUrl} type="video/mp4" />
                </video>
              ) : (
                <>
                  <img
                    src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Fundador da Globalead"
                    className="w-full h-64 object-cover"
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-60 transition-all duration-300 group">
                    <div className="bg-white rounded-full p-6 group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-12 w-12 text-blue-600 ml-1" />
                    </div>
                  </button>
                </>
              )}
            </div>
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Carlos Gonçalves - Fundador & CEO
              </h3>
              <p className="text-gray-600">
                "Na Globalead, acreditamos que cada cliente merece um acompanhamento personalizado e de excelência. A nossa missão é simplificar processos complexos e garantir que encontra sempre a melhor solução."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Selling Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simplificamos a venda do seu imóvel
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sellingSteps.map((step, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              A burocracia é nossa, o futuro é seu
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {service.icon}
                    <h3 className="text-xl font-semibold text-gray-900 ml-3">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors inline-flex items-center">
                    Saber mais
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
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
              Venda o seu imóvel de forma rápida, segura e sem complicações!
            </h2>
          </div>

          <div className="bg-white p-8 rounded-xl">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Nome:"
                className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Apelido:"
                className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                placeholder="Telemóvel:"
                className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email:"
                className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Pretendo:</option>
                <option>Vender</option>
                <option>Arrendar</option>
                <option>Comprar</option>
                <option>Construir</option>
              </select>
              <select className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Selecione o distrito</option>
                <option>Aveiro</option>
                <option>Beja</option>
                <option>Braga</option>
                <option>Bragança</option>
                <option>Castelo Branco</option>
                <option>Coimbra</option>
                <option>Évora</option>
                <option>Faro</option>
                <option>Guarda</option>
                <option>Leiria</option>
                <option>Lisboa</option>
                <option>Portalegre</option>
                <option>Porto</option>
                <option>Santarém</option>
                <option>Setúbal</option>
                <option>Viana do Castelo</option>
                <option>Vila Real</option>
                <option>Viseu</option>
                <option>Ilhas</option>
              </select>
              <input
                type="text"
                placeholder="Código Postal:"
                className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Tipo de Imóvel:</option>
                <option>Apartamento</option>
                <option>Moradia</option>
                <option>Quinta</option>
                <option>Terreno</option>
                <option>Prédio</option>
                <option>Loja</option>
                <option>Armazém</option>
                <option>Escritório</option>
                <option>Garagem</option>
                <option>Outros</option>
              </select>
              <input
                type="number"
                placeholder="Preço Máx (€):"
                className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Área Min. (m²):"
                className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Nº de Quartos:</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4+</option>
              </select>
              <select className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Nº de Casas de Banho:</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4+</option>
              </select>
              
              <div className="md:col-span-2">
                <label className="flex items-start text-sm text-gray-700 mb-4">
                  <input type="checkbox" className="mt-1 mr-2" />
                  Sim, aceito os termos e condições indicados pela Globalead Portugal.
                </label>
                <p className="text-xs text-gray-600 mb-6">
                  Os dados submetidos através deste formulário de contacto serão tratados em conformidade com a legislação em vigor sobre dados pessoais e o Regulamento Geral da Protecção de Dados (UE) 2016/679.
                </p>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Enviar Pedido
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImoveisPage;