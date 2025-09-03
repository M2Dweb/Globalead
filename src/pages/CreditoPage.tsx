import React, { useState } from 'react';
import { Calculator, TrendingUp, Home, DollarSign, ChevronDown, ChevronUp, CreditCard, Users, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CreditCalculator from '../components/CreditCalculator';
import ContactForm from '../components/ContactForm';

const CreditoPage: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number[]>([]);
  const [currentBankIndex, setCurrentBankIndex] = useState(0);

  const bankLogos = [
    "https://www.globalead.pt/wp-content/uploads/2025/08/6.png",
    "https://www.globalead.pt/wp-content/uploads/2025/08/3.png",
    "https://www.globalead.pt/wp-content/uploads/2025/08/7.png",
    "https://www.globalead.pt/wp-content/uploads/2025/08/5.png",
    "https://www.globalead.pt/wp-content/uploads/2025/08/4.png",
    "https://www.globalead.pt/wp-content/uploads/2025/08/11.png",
    "https://www.globalead.pt/wp-content/uploads/2025/08/2.png",
    "https://www.globalead.pt/wp-content/uploads/2025/08/9.png",
    "https://www.globalead.pt/wp-content/uploads/2025/08/1.png",
    "https://www.globalead.pt/wp-content/uploads/2025/08/10.png",
    "https://www.globalead.pt/wp-content/uploads/2025/08/8.png"
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBankIndex(prev => (prev + 1) % (bankLogos.length - 4));
    }, 3000);
    return () => clearInterval(interval);
  }, [bankLogos.length]);

  const services = [
    {
      icon: <CreditCard className="h-12 w-12 text-blue-600" />,
      title: "Intermediação de Crédito",
      description: "Ajudamos a encontrar as melhores condições de financiamento, trabalhando com as principais instituições financeiras para garantir acesso a taxas competitivas e soluções personalizadas."
    },
    {
      icon: <Calculator className="h-12 w-12 text-blue-600" />,
      title: "Planeamento Personalizado",
      description: "Oferecemos simulações claras e rápidas do crédito habitação, permitindo-lhe perceber o impacto das prestações no seu orçamento para tomar decisões informadas."
    },
    {
      icon: <FileText className="h-12 w-12 text-blue-600" />,
      title: "Burocracia Simplificada",
      description: "A nossa equipa acompanha-o em todo o processo, desde a análise inicial até à aprovação do empréstimo, negociando diretamente com os bancos para poupar-lhe tempo e esforço."
    }
  ];

  const faqItems = [
    {
      question: "Quanto posso pedir de crédito habitação?",
      answer: "Antes de procurar casa, o primeiro passo é calcular quanto de crédito habitação pode solicitar com base nas poupanças disponíveis e no rendimento mensal. Deve reservar-se entre 15% e 20% do preço do imóvel como entrada, pois o banco não financia 100% do valor e existem impostos e despesas extras. As prestações mensais ideais não devem ultrapassar 35% do rendimento mensal líquido."
    },
    {
      question: "Falar com um intermediário de crédito à habitação",
      answer: "Acesso a acompanhamento personalizado sem ter de visitar cada banco. Comparação consolidada das ofertas bancárias em vigor. Processo de contratação simplificado e possibilidade de condições mais favoráveis. Serviço gratuito prestado pelo idealista/créditohabitação."
    },
    {
      question: "Enviar a documentação necessária para pedir um crédito habitação",
      answer: "A apresentação de propostas personalizadas pelos bancos depende do envio prévio de documentação que comprove a situação financeira. Sem o envio antecipado, as ofertas tornam-se genéricas e pouco representativas do perfil real. As propostas personalizadas incluem taxa de juro, spread, comissões e custos de produtos adicionais exigidos. A análise detalhada de cada componente permite identificar margens de negociação. Acompanhamento da Globalead Portugal garante decisões informadas e vantajosas."
    },
    {
      question: "Receber ofertas de crédito habitação e compará-las",
      answer: "A apresentação de propostas personalizadas pelos bancos depende do envio prévio de documentação que comprove a situação financeira. Sem o envio antecipado, as ofertas tornam-se genéricas e pouco representativas do perfil real. As propostas personalizadas incluem taxa de juro, spread, comissões e custos de produtos adicionais exigidos. A análise detalhada de cada componente permite identificar margens de negociação. Acompanhamento da Globalead Portugal garante decisões informadas e vantajosas."
    },
    {
      question: "Pede uma avaliação imobiliária para o crédito à habitação",
      answer: "A avaliação oficial do imóvel é obrigatória para os bancos no processo de crédito habitação. Serve para determinar o valor real do imóvel e aferir o risco do empréstimo. O custo da avaliação situa-se entre 200€ e 350€, conforme a instituição bancária. A Globalead Portugal acompanha todo o procedimento, assegurando transparência e cumprimento dos prazos necessários."
    },
    {
      question: "Oferta definitiva de aprovação do crédito habitação: FINE",
      answer: "A emissão da FINE ocorre após a conclusão da avaliação do imóvel e validações complementares, caso o crédito seja aprovado. A FINE detalha montante do empréstimo, forma de disponibilização, taxa de juro, plano de amortização, comissões e outras despesas. Validade de 30 dias para análise cuidadosa e decisão sobre a aceitação da oferta. Antes da escritura, é essencial rever todas as condições e esclarecer dúvidas. A Globalead Portugal disponibiliza especialistas para apoiar o cliente nesta fase decisiva."
    },
    {
      question: "Assinar crédito à habitação e fazer a escritura de compra e venda",
      answer: "Ao aceitares a proposta de crédito habitação, o banco emite a FINE (Ficha de Informação Normalizada Europeia), que detalha montante, taxa de juro, comissões, amortização e demais encargos. Após a entrega da FINE, cumpre um período mínimo de 7 dias antes da escritura, para refletires e confirmares que a decisão está alinhada com o acordado. Este intervalo é essencial para garantir a plena compreensão de todos os termos contratuais. A Globalead Portugal recomenda que solicites informação detalhada e esclareças todas as dúvidas antes de assinar qualquer documento."
    },
    {
      question: "Em que consiste o Spread?",
      answer: "O spread é um elemento da taxa de juro que é definido individualmente por cada banco num empréstimo habitação. No fundo, trata-se da margem de lucro da instituição financeira. O spread que o banco atribui a um determinado cliente tem muito que ver com o seu risco (aferido através do historial de crédito, dos seus rendimentos, do montante de empréstimo que está a ser solicitado e das garantias apresentadas pelo consumidor, etc.) e, muitas vezes, com os produtos que podem ser contratados para baixar o spread."
    },
    {
      question: "Qual é a diferença entre taxa fixa e variável?",
      answer: "A taxa fixa mantém-se constante ao longo do empréstimo, nunca se alterando, sendo acordada com a instituição financeira aquando do pedido de financiamento. Já a taxa variável oscila de acordo com um indexante, o que significa que irá sofrer alterações ao longo do período de vida do empréstimo, o que, consequentemente, vai fazer com que a prestação mensal também se modifique. Isto significa que, caso optes por este tipo de taxa no crédito habitação, se o valor do indexante aumentar, a taxa aplicável também será mais elevada, enquanto que, se baixar, a taxa também descerá. Em Portugal, o indexante que normalmente se utiliza nos empréstimos habitação é a Euribor, que pode ser a 3, 6 ou 12 meses."
    },
    {
      question: "Taxa Anual Nominal (TAN): O que é?",
      answer: "Sendo aplicada a todo o tipo de operações, sejam aplicações financeiras ou empréstimos que impliquem o pagamento de juros, a Taxa Anual Nominal (TAN) é um indicador que permite comparar produtos entre si. No caso do crédito habitação com taxa de juro variável, esta resulta simplesmente da soma do spread com a da Euribor."
    },
    {
      question: "O que é a Taxa Euribor?",
      answer: "A Euribor ou, Euro Interbank Offered Rate, é um juro que os bancos pagam a outras instituições para financiar a sua atividade. A Euribor é calculada pela média das taxas de juros praticadas pelos 52 maiores bancos da zona euro, num determinado prazo. A Taxa Euribor não é fixa e encontra-se sujeita a oscilações diárias. Apesar de a Euribor sofrer flutuações diárias, o cliente pode decidir o momento em que a taxa é recalculada. Os prazos mais comuns são 3, 6 e 12 meses."
    },
    {
      question: "Como conseguir aprovação num empréstimo imobiliário?",
      answer: "Para se obter uma aprovação rápida nos empréstimos bancários para habitação é fundamental que o consumidor apresente o máximo de garantias à instituição de crédito, de forma a reduzir a perceção de risco. Para além do nível de rendimentos, um bom histórico de pagamentos de empréstimos anteriores é uma condição essencial. Outro fator que os bancos privilegiam é a estabilidade profissional. O ideal é que o encargo com a mensalidade não ultrapasse os 40% do rendimento do agregado familiar."
    },
    {
      question: "Que bancos vão aderir ao 100% financiamento?",
      answer: "Todos os bancos que concedem crédito habitação (17 instituições no geral) já aderiram à garantia pública, que incluem todos os nossos parceiros com os quais já trabalhamos."
    },
    {
      question: "Qual é o prazo para pedir a garantia?",
      answer: "Para beneficiar da garantia pública e ter 100% financiamento na habitação, terás de celebrar o contrato de crédito até ao dia 31 de dezembro de 2026."
    },
    {
      question: "Tenho de pagar comissões se falhar o pagamento da prestação de empréstimo da casa?",
      answer: "Quando o cliente bancário não paga as prestações na data estipulada, entra em mora. Nestas situações, a instituição bancária pode exigir o pagamento de juros moratórios e de uma comissão respeitante à recuperação de valores em dívida. Juros de mora: resultam da aplicação de uma sobretaxa anual máxima de 3%, que acresce à taxa de juros remuneratórios; Comissão de recuperação de valores em dívida: não pode ultrapassar 4% do valor da prestação, com um valor mínimo de 12 euros e um valor máximo de 150 euros."
    },
    {
      question: "O que acontece se falhar o pagamento da prestação do crédito habitação?",
      answer: "Entrar em incumprimento no empréstimo para comprar casa é uma situação indesejável para qualquer devedor. Caso falhes alguma mensalidade, e da primeira vez que isso acontecer, o banco tem 15 dias para entrar em contacto contigo. Entre o 31º e o 60º dia após o incumprimento, o caso é integrado no PERSI (Procedimento Extrajudicial de Regularização de Situações de Incumprimento), que visa chegar a um acordo entre o banco e o cliente."
    },
    {
      question: "Podes ainda ter isenção de impostos?",
      answer: "Sim. Tens a possibilidade de ainda usufruir da isenção do IMT (Imposto sobre Transmissões Onerosas de Imóveis) e Imposto de Selo que geram poupanças significativas no processo de compra de casa."
    },
    {
      question: "Quanto tempo dura a garantia do estado?",
      answer: "A garantia em questão irá vigorar durante dez anos após a data da escritura do contrato de crédito habitação."
    },
    {
      question: "A comissão de processamento da prestação, ainda é cobrada?",
      answer: "Cobrada a cada prestação liquidada pelo cliente (com acréscimo do Imposto do Selo) e ao longo de toda a vigência do crédito, a comissão de processamento aplica-se mensalmente aquando do pagamento da prestação mensal. Apesar de desde janeiro de 2021 ter sido decretado o fim da comissão de processamento, esta medida é apenas aplicável aos novos créditos."
    },
    {
      question: "Amortização Antecipada de Crédito: Direitos e Custos Associados?",
      answer: "Os consumidores têm direito a reembolsar antecipadamente o seu crédito, isto é, proceder à sua amortização antes da data prevista para a respetiva liquidação. Tal poderá na forma de um reembolso total ou apenas parcial. Porém, a amortização antecipada acarreta custos: Taxa variável: a comissão não pode ser superior a 0,5% do capital reembolsado; Taxa Fixa: a comissão não pode ultrapassar os 2% do capital amortizado."
    },
    {
      question: "Alterações no spread do crédito habitação: Como evitar surpresas?",
      answer: "Embora seja uma prática pouco comum, poderão verificar-se alterações no Spread do crédito habitação ao longo da vigência do contrato. Tal pode suceder, por exemplo, caso o cliente tenha acordado com o banco o cumprimento de determinadas condições para a obtenção de um Spread mais baixo, tais como a domiciliação do ordenado ou ter débitos diretos ativos associados à conta detida na instituição, mas, por algum motivo, deixar de cumprir essas mesmas condições."
    },
    {
      question: "Taxa Anual Efetiva Global (TAEG): O que é?",
      answer: "Representando o custo total do crédito habitação, a Taxa Anual Efetiva Global (TAEG) inclui todos os encargos associados ao contrato. Isto inclui juros, comissões, impostos, seguros associados ao crédito e encargos com a manutenção da conta à ordem associada ao empréstimo. Também inclui outros custos como emolumentos cobrados no registo da hipoteca."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const creditFormFields = (
    <>
      <select className="px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300">
        <option>Em que podemos ajudar</option>
        <option>Compra de casa</option>
        <option>Refinanciamento</option>
        <option>Transferência de crédito</option>
      </select>
      <input
        type="range"
        min="50000"
        max="500000"
        step="5000"
        defaultValue="50000"
        className="md:col-span-2 w-full"
      />
      <div className="md:col-span-2 text-center text-white">
        <span>Empréstimo: 50.000 €</span>
      </div>
      <select className="px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300">
        <option>Escolha do imóvel</option>
        <option>Já encontrei</option>
        <option>Ainda procuro</option>
        <option>Preciso de ajuda</option>
      </select>
      <select className="px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300">
        <option>Pensa vender o seu imóvel atual</option>
        <option>Sim</option>
        <option>Não</option>
        <option>Talvez</option>
      </select>
      <select className="px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300">
        <option>Número de proponentes</option>
        <option>1</option>
        <option>2</option>
        <option>3 ou mais</option>
      </select>
      <input
        type="range"
        min="1000"
        max="10000"
        step="100"
        defaultValue="1000"
        className="w-full"
      />
      <div className="text-center text-white">
        <span>Rendimento total do agregado: 1000 €</span>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Ajudamos na compra da sua casa
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto">
              Na Globalead Portugal, reconhecemos que a aquisição de um imóvel é um dos momentos mais significativos na vida de qualquer família e por isso oferecemos um serviço de crédito habitação totalmente personalizado.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="leading-relaxed mb-6">
              A nossa equipa estabelece parcerias com as principais instituições financeiras para negociar condições de financiamento que reflitam o seu perfil, objetivos e necessidades reais, garantindo um acompanhamento próximo em todas as etapas.
            </p>
            <p className="leading-relaxed mb-6">
              Em vez de recorrer a simuladores genéricos, realizamos uma avaliação profunda e individualizada que projeta o valor das prestações com base no montante, no prazo e nas taxas aplicáveis. A consultoria gratuita e independente ajuda-o a escolher o banco que oferece o melhor equilíbrio entre custos e benefícios, maximizando a sua poupança mensal.
            </p>
            <p className="leading-relaxed">
              Tratamos de toda a burocracia, incluindo recolha de documentação, análise e renegociação de propostas até à assinatura da escritura, para que possa concretizar o sonho da casa própria com total transparência, tranquilidade e confiança.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="flex justify-center mb-6">
                  {service.icon}
                </div>
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

      {/* Credit Calculator */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CreditCalculator />
          <div className="text-center mt-6">
            <p className="text-lg text-gray-600 font-medium">
              Para números precisos, entre em contacto
            </p>
          </div>
        </div>
      </section>

      {/* Banks Carousel */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comparamos as várias instituições em Portugal
            </h2>
          </div>

          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${currentBankIndex * 20}%)` }}
            >
              {bankLogos.map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-1/5 px-4"
                >
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <img
                      src={logo}
                      alt={`Banco ${index + 1}`}
                      className="w-full h-16 object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 100% Financing Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 p-8 rounded-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Como funciona o Crédito Habitação com 100% financiamento para jovens?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Quando solicitas um crédito habitação existem vários fatores que influenciam o banco a financiar, sendo 90% o limite máximo do valor do imóvel emprestado pelos bancos para habitação própria e permanente. No entanto, desde setembro de 2024 é possível o crédito habitação 100% financiado através da garantia pública do Estado.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              Esta poderá chegar até aos 15% do valor do imóvel, cobrindo o valor que não é financiado pelos bancos. Válido para jovens até aos 35 anos com imóveis até 450.000 euros ou para casas do banco. No caso das instituições bancárias, vendem-nos a preços inferiores e com condições únicas, para reaverem parte do valor investido.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Requisitos:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Idade:</strong> Entre 18 e 35 anos, com domicílio fiscal em Portugal</li>
                  <li><strong>Rendimentos:</strong> Não podem ultrapassar 81.199 euros anuais</li>
                  <li><strong>Propriedade:</strong> Não pode ser proprietário de qualquer imóvel</li>
                  <li><strong>Benefícios anteriores:</strong> Não pode ter beneficiado de garantias públicas</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Condições:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Valor do imóvel:</strong> Até 350.000€ (450.000€ em certas regiões)</li>
                  <li><strong>Limite da garantia:</strong> Máximo 25% do valor da transação</li>
                  <li><strong>Duração:</strong> Garantia válida por 10 anos</li>
                  <li><strong>Prazo:</strong> Contrato até 31 de dezembro de 2026</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Contratar um crédito habitação é a decisão financeira mais impactante da tua vida
            </h2>
          </div>

          <div className="bg-white p-8 rounded-xl">
            <ContactForm 
              page="credito" 
              showExtraFields={true}
              extraFields={creditFormFields}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pedir um crédito habitação passo a passo
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

          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold mb-4">Tem alguma questão que não foi contemplada?</h3>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Contactar Suporte
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreditoPage;