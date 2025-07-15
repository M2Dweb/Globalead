import React from 'react';
import { Bed, Bath, Square, MapPin, ArrowRight, Shield, CreditCard, Zap, FileText } from 'lucide-react';

const ImoveisPage: React.FC = () => {
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
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              O lugar a que chamamos casa
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Vamos criar uma relação próxima e escutar com atenção todos os seus desejos e as suas expectativas e garantir sempre que está acompanhado, e que estamos consigo sempre.
            </p>
            <p className="text-2xl font-semibold text-blue-200">
              Visite o seu próximo lar de sonho
            </p>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
            {properties.map((property) => (
              <div key={property.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                  {/* Image Slideshow */}
                  <div className="md:w-1/2">
                    <div className="relative h-64 md:h-full">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                        1 / {property.images.length}
                      </div>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="md:w-1/2 p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {property.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {property.description}
                    </p>

                    {/* Property Features */}
                    <div className="flex items-center space-x-6 mb-6">
                      <div className="flex items-center text-gray-700">
                        <Bed className="h-5 w-5 mr-2" />
                        <span>{property.bedrooms} quartos</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Bath className="h-5 w-5 mr-2" />
                        <span>{property.bathrooms} casas de banho</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Square className="h-5 w-5 mr-2" />
                        <span>{property.area} m²</span>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-700 mb-6">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{property.location}</span>
                    </div>

                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 inline-flex items-center">
                      Ver Imóvel
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simplificamos a venda do seu imóvel
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start">
                  <div className="mr-6 flex-shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                    <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                      Saber mais →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              O melhor negócio para o seu imóvel começa aqui!
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {marketingFeatures.map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0 mt-1">
                  ✓
                </div>
                <p className="text-gray-700">{feature}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 p-8 rounded-xl">
            <p className="text-gray-700 text-center">
              <strong>Especialistas em decoração de interiores</strong> transformam o imóvel, destacando o seu potencial e alinhando-o às tendências e expectativas dos compradores.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Venda o seu imóvel de forma rápida, segura e sem complicações!
            </h2>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Nome:"
              className="px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="Apelido:"
              className="px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="tel"
              placeholder="Telemóvel:"
              className="px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="email"
              placeholder="Email:"
              className="px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <select className="px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300">
              <option>Pretendo:</option>
              <option>Comprar</option>
              <option>Vender</option>
              <option>Arrendar</option>
            </select>
            <input
              type="text"
              placeholder="Localização:"
              className="px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="Código Postal:"
              className="px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <select className="px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300">
              <option>Tipo de Imóvel:</option>
              <option>Apartamento</option>
              <option>Moradia</option>
              <option>Terreno</option>
            </select>
            <input
              type="text"
              placeholder="Preço Máx (€):"
              className="px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="Área Min. (m²):"
              className="px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="number"
              placeholder="Nº de Quartos:"
              className="px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="number"
              placeholder="Nº de Casas de Banho:"
              className="px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            
            <div className="md:col-span-2">
              <label className="flex items-start text-sm text-blue-100">
                <input type="checkbox" className="mt-1 mr-2" />
                Sim, aceito os termos e condições indicados pela Globalead Portugal.
              </label>
              <p className="text-xs text-blue-200 mt-2">
                Os dados submetidos através deste formulário de contacto serão tratados em conformidade com a legislação em vigor sobre dados pessoais e o Regulamento Geral da Protecção de Dados (UE) 2016/679.
              </p>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-300"
              >
                Enviar Pedido
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ImoveisPage;