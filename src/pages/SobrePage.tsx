import React from 'react';
import { Star, Users, Award, CheckCircle, DollarSign, Clock } from 'lucide-react';

const SobrePage: React.FC = () => {
  const testimonials = [
    {
      name: "Daniel Gomes",
      platform: "Facebook",
      review: "Estou extremamente satisfeito com a experiência que tive. Foram bastante profissionais e prestaram um serviço de excelência. Todo o processo de compra e venda da minha casa foi tranquilo e cumpriram com todos os prazos que me apresentaram na reunião inicial. Recomendo a Globalead."
    },
    {
      name: "Pedro Tavares",
      platform: "Google",
      review: "Consegui vender o meu imóvel em menos de 1 mês e adquirir a minha moradia de sonho com a ajuda da Globalead. Um atendimento de excelência, com atenção aos detalhes e as minhas necessidades, os imóveis apresentados, enquadravam-se naquilo que procurava. Já recomendei!"
    },
    {
      name: "Ana Torres",
      platform: "Livro de Elogios",
      review: "Valorizo a clareza na forma como a Globalead me apresentou todas as soluções de seguros para a minha viatura. As informações sobre a cobertura e os detalhes da apólice foram apresentadas de maneira compreensível, o que facilitou a tomar uma decisão informada. Fui acompanhada desde o primeiro minuto."
    }
  ];

  const reasons = [
    {
      number: "1",
      title: "Acesso Exclusivo",
      description: "Garanta acesso exclusivo aos sistemas de alarmes mais avançados, confiáveis e eficazes disponíveis no mercado."
    },
    {
      number: "2",
      title: "Análise Personalizada",
      description: "Analisamos as suas necessidades e recomendamos a solução ideal, sempre com a qualidade e garantia das marcas que representamos."
    },
    {
      number: "3",
      title: "Experiência Personalizada",
      description: "Escolher a Globalead significa optar por uma experiência personalizada com acesso às melhores soluções de segurança do mercado."
    },
    {
      number: "4",
      title: "Qualidade e Confiança",
      description: "Representamos a qualidade, a inovação e a confiança que ambas empresas oferecem para garantir que recebe o melhor suporte."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Um pouco sobre nós
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Conheça a nossa história, valores e compromisso com a excelência
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              A Globalead destaca-se pela sua abordagem integrada e inovadora, atuando como intermediária para oferecer soluções personalizadas que garantem conforto, segurança e eficiência em todos os processos. Fundada para preencher uma lacuna no mercado, a empresa é pioneira na gestão e acompanhamento de clientes em múltiplas áreas, colocando as necessidades de cada um no centro das suas operações.
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Com um portfólio abrangente, a Globalead especializa-se no mercado imobiliário, complementado por serviços em seguros, créditos, alarmes, telecomunicações e energia. A empresa combina uma abordagem moderna com experiência consolidada, posicionando-se como referência no setor.
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              A equipa é composta por profissionais altamente qualificados e comprometidos, que oferecem um atendimento personalizado, baseado em inovação, criatividade e antecipação de necessidades. A Globalead simplifica a experiência do cliente, proporcionando um acompanhamento gratuito e centralizado desde o primeiro contacto até à conclusão dos processos.
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-8">
              O compromisso da empresa é criar relações de confiança duradouras, fidelizando clientes através de um serviço próximo e individualizado que excede expectativas. Presente em todas as etapas da jornada do cliente, a Globalead eleva a experiência a um novo patamar de conveniência e satisfação, inspirando recomendações e fortalecendo a sua reputação como uma rede de intermediação e gestão de excelência.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Globalead */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Porque escolher a Globalead Portugal
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reasons.map((reason, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                    {reason.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {reason.title}
                    </h3>
                    <p className="text-gray-600">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              O que dizem os clientes sobre nós
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.review}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">Review: {testimonial.platform}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tem dúvidas?
            </h2>
            <p className="text-xl text-blue-100">
              Entre em contacto
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Instagram Template - Lado Esquerdo */}
            <div className="lg:w-1/3 flex justify-center">
              <img 
                src="/template-dos-inta-2.png" 
                alt="Instagram Template" 
                className="w-64 h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Formulário - Lado Direito */}
            <div className="lg:w-2/3">
              <ContactForm page="sobre" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SobrePage;