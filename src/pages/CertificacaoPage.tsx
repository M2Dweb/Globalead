import React, { useState } from 'react';
import { FileText, Clock, CheckCircle, Home, Building, Store, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactForm from '../components/ContactForm';

const CertificacaoPage: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number[]>([]);

  const steps = [
    {
      number: "1",
      title: "Agendamento",
      description: "Após o seu contacto, ligamos em menos de 24h para agendar a visita do técnico.",
      icon: <Clock className="h-8 w-8 text-[#0d2233]" />
    },
    {
      number: "2",
      title: "Documentação",
      description: "Antes da visita deverão ser reunidos os documentos necessários.",
      icon: <FileText className="h-8 w-8 text-[#0d2233]" />
    },
    {
      number: "3",
      title: "Visita Técnica",
      description: "Um técnico especializado, irá recolher toda a informação necessária.",
      icon: <CheckCircle className="h-8 w-8 text-[#0d2233]" />
    },
    {
      number: "4",
      title: "Emissão do Certificado",
      description: "Entregamos o teu certificado entre 48h a 72h após a visita.",
      icon: <FileText className="h-8 w-8 text-[#0d2233]" />
    }
  ];

  const certificateTypes = [
    {
      icon: <Home className="h-12 w-12 text-[#0d2233]" />,
      title: "Apartamentos",
      description: "Avaliamos o consumo de energia de apartamentos residenciais, prestamos informações sobre a eficiência energética e identificamos áreas para melhorias."
    },
    {
      icon: <Building className="h-12 w-12 text-[#0d2233]" />,
      title: "Moradias",
      description: "Realizamos avaliações detalhadas do consumo de energia em moradias unifamiliares, ajudamos os proprietários a compreender e melhorar a eficiência energética das suas casas."
    },
    {
      icon: <Store className="h-12 w-12 text-[#0d2233]" />,
      title: "Comércio e Serviços",
      description: "Para estabelecimentos comerciais e de serviços, destacamos o desempenho energético do edifício e sugerimos medidas para reduzir os custos de energia e melhorar a sustentabilidade."
    }
  ];

  const faqItems = [
    {
      question: "O que é um certificado energético?",
      answer: "O Certificado Energético é um documento que avalia a eficácia energética de um imóvel numa escala de A+ (muito eficiente) a F (pouco eficiente), emitido por técnicos autorizados pela Agência para a Energia (ADENE). No documento podes encontrar informação sobre o consumo energético relativo a climatização e águas quentes sanitárias, mas também medidas de melhoria para reduzir o consumo."
    },
    {
      question: "Para que serve um certificado energético?",
      answer: "O certificado energético é obrigatório desde 2013 para quem pretende vender ou arrendar um imóvel. O objetivo é que informe o proprietário sobre o desempenho energético do imóvel e quais as medidas de melhoria que pode implementar."
    },
    {
      question: "Quais as vantagens da certificação energética?",
      answer: "Para os proprietários que pretendem vender ou arrendar o imóvel, a obrigatoriedade da certificação energética apresenta vantagens. A certificação energética pode levar à valorização do imóvel e à redução do gasto de energia com soluções energéticas adequadas, resultando numa poupança energética. Além disso, através da certificação energética do imóvel podes ter acesso a benefícios fiscais. Se o imóvel possuir uma classificação energética igual ou superior a A pode existir uma redução até 25% do IMI."
    },
    {
      question: "Quais são os documentos necessários para a visita técnica?",
      answer: "Os documentos obrigatórios a apresentar na visita técnica são a Caderneta Predial Urbana e a Certidão de Registo Permanente. Porém, podes ainda apresentar documentos facultativos como a ficha técnica de habitação, a planta do imóvel e o corte construtivo, os quais contribuem para a otimização da Classificação do Certificado Energético do seu imóvel."
    },
    {
      question: "Quem pode atribuir um certificado energético?",
      answer: "O certificado energético apenas pode ser elaborado por um perito qualificado pela ADENE. Estes profissionais são arquitetos ou engenheiros, com experiência mínima de 5 anos, que atuam no âmbito do Sistema de Certificação Energética dos Edifícios (SCE), aprovado pelo Decreto-Lei nº 101-D/2020, de 7 de dezembro."
    },
    {
      question: "O certificado energético tem validade?",
      answer: "O certificado energético é válido por 10 anos para edifícios de habitação e pequenos edifícios de comércio e serviços. No caso de grandes edifícios de comércio e serviços, o prazo é de 6 anos para certificados emitidos até 30 de abril e 2015 e 8 anos para certificados emitidos após 30 de abril de 2015."
    },
    {
      question: "Posso usar o Certificado Energético para efeitos de escritura?",
      answer: "Os Certificados Energéticos emitidos apenas servem para efeitos de escritura, se acompanhados uma certidão de registo permanente válida para o efeito."
    },
    {
      question: "Em que situações é obrigatório o certificado energético?",
      answer: "O artigo 18 do Decreto-Lei n.º 101-D/2020 determina a obrigatoriedade do certificado energético nas seguintes situações: aluguer, venda, trespasse ou dação em cumprimento de imóveis; construção de novos edifícios; grandes renovações com custo superior a 25% do valor do imóvel; grandes edifícios comerciais ou de serviços (área >1000m² ou 500m² para certos usos), sujeitos a inspeções periódicas; e programas que exijam o certificado para acesso a financiamento ou benefícios fiscais."
    },
    {
      question: "Ter certificado energético nos estabelecimentos comerciais é obrigatório por lei?",
      answer: "Sim, o certificado energético é obrigatório para estabelecimentos comerciais, conforme o DL 101-D/2020, que se aplica a todos os edifícios destinados à utilização humana. Se o estabelecimento comercial for vendido, trespassado ou alugado por mais de 4 meses, a emissão do certificado energético é obrigatória. Se o seu estabelecimento tiver mais de 250m², é feito um diagnóstico inicial e, depois, um orçamento para a realização do certificado energético."
    },
    {
      question: "Coimas se vender ou arrendar sem Certificado Energético?",
      answer: "Caso um imóvel seja publicitado, vendido ou arrendado sem a emissão prévia do Certificado Energético, tal facto constitui contraordenação punível com coima até 3 750 €, no caso de pessoas singulares e de até 44 890 €, no caso de pessoas coletivas, conforme Artigo 35.º do DL 101-D/2020."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

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
                <div className="bg-[#0d2233] text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  {step.number}
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
            <ContactForm page="certificacao" />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tem alguma questão que não foi contemplada?
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border border-gray-700 rounded-lg">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800 transition-colors"
                >
                  <span className="font-medium text-white">{item.question}</span>
                  {openFAQ.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                
                <AnimatePresence>
                  {openFAQ.includes(index) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-gray-300">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CertificacaoPage;