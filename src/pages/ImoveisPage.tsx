import React from 'react';
import { ArrowRight, Hammer, Palette, Building, Users, Compass, Scale, Play } from 'lucide-react';

interface ImoveisPageProps {
  onNavigate: (page: string) => void;
}

const ImoveisPage: React.FC<ImoveisPageProps> = ({ onNavigate }) => {
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
          poster="/fotos/ImoveisPage-foto.png"
        >
          <source src="/videos/ImoveisPage-video(1).mp4" type="video/mp4" />
        </video>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              A burocracia é nossa, o futuro é seu
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto">
              Encontre a casa dos seus sonhos com o nosso acompanhamento especializado
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* Owner Video Section */}
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
            </div>
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                João Silva - Fundador & CEO
              </h3>
              <p className="text-gray-600">
                "Na Globalead, acreditamos que cada cliente merece um acompanhamento personalizado e de excelência. A nossa missão é simplificar processos complexos e garantir que encontra sempre a melhor solução."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-8 rounded-xl text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Ver Imóveis Disponíveis
              </h3>
              <p className="text-gray-600 mb-6">
                Explore o nosso catálogo completo de imóveis
              </p>
              <button
                onClick={() => onNavigate('property-list')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                Ver Catálogo
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>

            <div className="bg-green-50 p-8 rounded-xl text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Crédito Habitação
              </h3>
              <p className="text-gray-600 mb-6">
                Simule o seu crédito e encontre as melhores condições
              </p>
              <button
                onClick={() => onNavigate('credito')}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center"
              >
                Saber mais
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>

            <div className="bg-yellow-50 p-8 rounded-xl text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Certificação Energética
              </h3>
              <p className="text-gray-600 mb-6">
                Obtenha o seu certificado energético rapidamente
              </p>
              <button
                onClick={() => onNavigate('certificacao')}
                className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors inline-flex items-center"
              >
                Saber mais
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tem dúvidas?
            </h2>
            <p className="text-xl text-blue-100">
              Entre em contacto
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
              <input
                type="text"
                placeholder="Assunto:"
                className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Meio de Contacto:</option>
                <option>Email</option>
                <option>Telefone</option>
                <option>WhatsApp</option>
                <option>Telegram</option>
                <option>Messenger</option>
              </select>
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
                  Os dados submetidos através deste formulário de contacto serão tratados em conformidade com a legislação em vigor sobre dados pessoais e o Regulamento Geral da Proteção de Dados (UE) 2016/679.
                </p>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Enviar Mensagem
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