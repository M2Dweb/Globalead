import React from 'react';
import { Tv, Wifi, Phone, ArrowRight } from 'lucide-react';

const TvNetVozPage: React.FC = () => {
  const providers = [
    {
      name: "MEO",
      description: "Integer quis dapibus mauris, non tristique tortor. Nam porta lobortis urna at lacinia. Praesent at est iaculis, pulvinar sapien in, rhoncus arcu. Mauris fermentum, diam ut rhoncus ultricies, sapien arcu bibendum nisi,",
      logo: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop"
    },
    {
      name: "NOS",
      description: "Integer quis dapibus mauris, non tristique tortor. Nam porta lobortis urna at lacinia. Praesent at est iaculis, pulvinar sapien in, rhoncus arcu. Mauris fermentum, diam ut rhoncus ultricies, sapien arcu bibendum nisi,",
      logo: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop"
    },
    {
      name: "Vodafone",
      description: "Integer quis dapibus mauris, non tristique tortor. Nam porta lobortis urna at lacinia. Praesent at est iaculis, pulvinar sapien in, rhoncus arcu. Mauris fermentum, diam ut rhoncus ultricies, sapien arcu bibendum nisi,",
      logo: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop"
    },
    {
      name: "NOWO",
      description: "Integer quis dapibus mauris, non tristique tortor. Nam porta lobortis urna at lacinia. Praesent at est iaculis, pulvinar sapien in, rhoncus arcu. Mauris fermentum, diam ut rhoncus ultricies, sapien arcu bibendum nisi,",
      logo: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              TV, Net & Voz
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              A Globalead apresenta várias soluções, a nível empresarial e residencial de forma a atender às reais necessidades de cada cliente e adapta-las com pacotes económicos e adaptados a cada um
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tv className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Televisão</h3>
              <p className="text-gray-600">
                Canais premium, desporto e entretenimento para toda a família
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wifi className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Internet</h3>
              <p className="text-gray-600">
                Velocidades ultra-rápidas para trabalho e lazer
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Voz</h3>
              <p className="text-gray-600">
                Chamadas ilimitadas nacionais e internacionais
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Providers Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Principais Operadores
            </h2>
            <p className="text-xl text-gray-600">
              Comparamos as melhores ofertas do mercado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {providers.map((provider, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <img
                    src={provider.logo}
                    alt={provider.name}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <h3 className="text-2xl font-bold text-gray-900">
                    {provider.name}
                  </h3>
                </div>
                <p className="text-gray-600 mb-6">
                  {provider.description}
                </p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 inline-flex items-center">
                  Saber mais
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Vantagens de Escolher a Globalead
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Poupança Garantida</h3>
              <p className="text-gray-600">
                Encontramos sempre a melhor oferta do mercado para o seu perfil
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Acompanhamento Total</h3>
              <p className="text-gray-600">
                Desde a simulação até à instalação, estamos sempre consigo
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sem Complicações</h3>
              <p className="text-gray-600">
                Tratamos de toda a burocracia e mudança de operador
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Encontre o Pacote Ideal
            </h2>
            <p className="text-xl text-blue-100">
              Preencha o formulário e receba uma proposta personalizada
            </p>
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
              <option>Meio de Contacto:</option>
              <option>Email</option>
              <option>Telefone</option>
              <option>WhatsApp</option>
            </select>
            <input
              type="text"
              placeholder="Assunto:"
              className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Horário:"
              className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
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
                Pedir Simulação
              </button>
            </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TvNetVozPage;