import React from 'react';
import { ArrowRight, Shield, Home, Zap, Phone, Car, Building, DollarSign, CheckCircle, Clock } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const services = [
    {
      icon: <Home className="h-12 w-12 text-blue-600" />,
      title: "Imóveis",
      description: "Encontre a casa dos seus sonhos com o nosso acompanhamento personalizado",
      page: "imoveis"
    },
    {
      icon: <Zap className="h-12 w-12 text-blue-600" />,
      title: "Energia",
      description: "Soluções energéticas sustentáveis e económicas para o seu lar",
      page: "energia"
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Seguros",
      description: "Proteja o que mais importa com as nossas soluções de seguros",
      page: "seguros"
    },
    {
      icon: <Phone className="h-12 w-12 text-blue-600" />,
      title: "TV NET VOZ",
      description: "Pacotes de telecomunicações adaptados às suas necessidades",
      page: "tv-net-voz"
    },
    {
      icon: <Car className="h-12 w-12 text-blue-600" />,
      title: "Alarmes",
      description: "Sistemas de segurança avançados para sua tranquilidade",
      page: "alarmes"
    },
    {
      icon: <Building className="h-12 w-12 text-blue-600" />,
      title: "Certificação Energética",
      description: "Certificados energéticos obrigatórios para venda de imóveis",
      page: "energia"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bem-vindo à <span className="text-blue-300">Globalead</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Soluções integradas e personalizadas para todas as suas necessidades. 
              Imóveis, energia, seguros, telecomunicações e muito mais.
            </p>
            <button
              onClick={() => onNavigate('sobre')}
              className="bg-white text-blue-900 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-300 inline-flex items-center"
            >
              Conheça-nos melhor
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Os Nossos Serviços
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos soluções completas e integradas para simplificar a sua vida
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
                onClick={() => onNavigate(service.page)}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <div className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                    Saber mais →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Porque Escolher a Globalead?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">POUPA DINHEIRO</h3>
              <p className="text-gray-600">
                Seleção da opção mais económica para ser possível poupar no seu orçamento e tomar melhores decisões financeiras.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">POUPA A CABEÇA</h3>
              <p className="text-gray-600">
                Recolha e comparação de proposta de todo o mercado e posterior indicação da melhor solução.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">POUPA TEMPO</h3>
              <p className="text-gray-600">
                Não precisa de perder tempo a analisar propostas: a Globalead analisa-as desde a primeira simulação até à adesão.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Entre em contacto connosco e descubra como podemos ajudá-lo
          </p>
          <button
            onClick={() => onNavigate('contactos')}
            className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-300 inline-flex items-center"
          >
            Contactar-nos
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;