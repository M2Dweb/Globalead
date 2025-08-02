import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQProps {
  category: string;
}

const FAQ: React.FC<FAQProps> = ({ category }) => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqData: { [key: string]: Array<{ question: string; answer: string }> } = {
    imoveis: [
      {
        question: "Quanto tempo demora a vender um imóvel?",
        answer: "O tempo médio de venda varia entre 3 a 6 meses, dependendo do tipo de imóvel, localização, preço e condições do mercado. A nossa estratégia de marketing personalizada ajuda a acelerar este processo."
      },
      {
        question: "Quais são os custos associados à venda de um imóvel?",
        answer: "Os principais custos incluem: comissão da mediação (3-6%), IMT, imposto de selo, certidões, certificado energético e eventuais obras de melhoramento. Fornecemos um orçamento detalhado sem compromisso."
      },
      {
        question: "É obrigatório ter certificado energético?",
        answer: "Sim, o certificado energético é obrigatório para venda e arrendamento de imóveis. Tratamos de todo o processo por si, garantindo conformidade legal."
      },
      {
        question: "Como é feita a avaliação do meu imóvel?",
        answer: "Realizamos uma avaliação gratuita considerando localização, estado de conservação, área, características únicas e comparação com imóveis similares no mercado."
      }
    ],
    seguros: [
      {
        question: "Que tipos de seguros oferecem?",
        answer: "Oferecemos seguros automóvel, habitação, vida, saúde, acidentes pessoais, proteção jurídica e seguros comerciais. Trabalhamos com as principais seguradoras do mercado."
      },
      {
        question: "Como posso reduzir o prémio do meu seguro?",
        answer: "Pode reduzir através de: franquias mais altas, descontos por bom condutor, sistemas de segurança, agrupamento de seguros e comparação regular de ofertas."
      },
      {
        question: "O que fazer em caso de sinistro?",
        answer: "Contacte-nos imediatamente. Ajudamos em todo o processo: comunicação à seguradora, acompanhamento do processo, peritagem e resolução do sinistro."
      }
    ],
    energia: [
      {
        question: "Posso mudar de fornecedor de energia?",
        answer: "Sim, pode mudar de fornecedor a qualquer momento. Tratamos de todo o processo de mudança sem interrupção do fornecimento."
      },
      {
        question: "Quanto posso poupar ao mudar de fornecedor?",
        answer: "A poupança varia entre 10% a 30% na fatura anual, dependendo do seu perfil de consumo e da oferta escolhida."
      },
      {
        question: "A mudança tem custos?",
        answer: "Não, a mudança de fornecedor é gratuita. Não há custos de adesão nem de cancelamento do contrato anterior."
      }
    ],
    alarmes: [
      {
        question: "Como funciona a monitorização 24h?",
        answer: "O sistema está conectado à nossa central de monitorização que funciona 24h/7 dias. Em caso de alarme, verificamos e contactamos as autoridades se necessário."
      },
      {
        question: "O alarme funciona sem internet?",
        answer: "Sim, os nossos sistemas têm comunicação GSM de backup que funciona mesmo sem internet ou energia elétrica."
      },
      {
        question: "Posso controlar o alarme pelo telemóvel?",
        answer: "Sim, através da nossa app pode armar/desarmar, receber notificações e ver imagens das câmaras em tempo real."
      }
    ]
  };

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const currentFAQ = faqData[category] || faqData.imoveis;

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
    <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
      <div className="flex items-center mb-6">
        <HelpCircle className="h-8 w-8 text-blue-600 mr-3" />
        <h3 className="text-2xl font-bold text-gray-900">Perguntas Frequentes</h3>
      </div>

      <div className="space-y-4">
        {currentFAQ.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-xl bg-gray-50">
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-blue-50 transition-colors rounded-xl"
            >
              <span className="font-medium text-gray-900">{item.question}</span>
              {openItems.includes(index) ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            
            <AnimatePresence>
              {openItems.includes(index) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 text-gray-600">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-600 mb-4">Não encontrou a resposta que procurava?</p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Contactar Suporte
        </button>
      </div>
    </div>
  );
};

export default FAQ;