import React from 'react';
import { FileText, Clock, CheckCircle, Home, Building, Store } from 'lucide-react';

import ContactForm2 from '../components/ContactForm2';
import FAQ from '../components/FAQ';

const CertificacaoPage: React.FC = () => {
  const steps = [
    {
      number: "1",
      title: "Agendamento",
      description: "Após o seu contacto, ligamos em menos de 24h para agendar a visita do técnico.",
      icon: <Clock className="h-8 w-8 text-[#79b2e9]" />
    },
    {
      number: "2",
      title: "Documentação",
      description: "Antes da visita deverão ser reunidos os documentos necessários.",
      icon: <FileText className="h-8 w-8 text-[#79b2e9]" />
    },
    {
      number: "3",
      title: "Visita Técnica",
      description: "Um técnico especializado, irá recolher toda a informação necessária.",
      icon: <CheckCircle className="h-8 w-8 text-[#79b2e9]" />
    },
    {
      number: "4",
      title: "Emissão do Certificado",
      description: "Entregamos o teu certificado entre 48h a 72h após a visita.",
      icon: <FileText className="h-8 w-8 text-[#79b2e9] " />
    }
  ];

  const certificateTypes = [
    {
      icon: <Home className="h-12 w-12 text-[#79b2e9]" />,
      title: "Apartamentos",
      description: "Avaliamos o consumo de energia de apartamentos residenciais, prestamos informações sobre a eficiência energética e identificamos áreas para melhorias."
    },
    {
      icon: <Building className="h-12 w-12 text-[#79b2e9]" />,
      title: "Moradias",
      description: "Realizamos avaliações detalhadas do consumo de energia em moradias unifamiliares, ajudamos os proprietários a compreender e melhorar a eficiência energética das suas casas."
    },
    {
      icon: <Store className="h-12 w-12 text-[#79b2e9]" />,
      title: "Comércio e Serviços",
      description: "Para estabelecimentos comerciais e de serviços, destacamos o desempenho energético do edifício e sugerimos medidas para reduzir os custos de energia e melhorar a sustentabilidade."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-[#79b2e9] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              O que é o certificado energético?
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto">
              Na Globalead Portugal, compreendemos que a venda ou arrendamento de um imóvel pode ser um processo complexo, repleto de detalhes que exigem atenção. Um dos passos indispensáveis para garantir a conformidade legal e valorizar o seu imóvel é a obtenção do Certificado Energético.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="leading-relaxed mb-6">
              O certificado energético é um documento oficial que avalia a eficiência energética de um imóvel, indicando a classe energética (A+ a F) e recomendações para melhorias, com poupanças estimadas. Este certificado, emitido por peritos qualificados da ADENE no âmbito do Sistema de Certificação dos Edifícios (SCE), regulado pelo Decreto-Lei n.º 101-D/2020.
            </p>
            <p className="leading-relaxed">
              Oferecemos suporte completo, desde o início do processo até à emissão do certificado, assegurando rapidez, simplicidade e tranquilidade para si. Confie na nossa experiência e concentre-se no que realmente importa: concretizar o negócio com sucesso.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Como funciona a emissão do certificado energético?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quais os tipos de certificados?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certificateTypes.map((type, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="flex justify-center mb-6">
                  {type.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {type.title}
                </h3>
                <p className="text-gray-600">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-[#0d2233] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tem dúvidas?
            </h2>
            <p className="text-xl text-blue-100">
              Entre em contacto!
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl">
            <ContactForm2 page="certificacao" />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tem alguma questão que não foi contemplada?
            </h2>
          </div>
          
          <div className="bg-gray-900">
            <FAQ category="certificacao" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CertificacaoPage;