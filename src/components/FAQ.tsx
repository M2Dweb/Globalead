import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQProps {
  category?: string;
}

const FAQ: React.FC<FAQProps> = ({ category = 'geral' }) => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqData = {
    geral: [
      {
        question: "Como posso contactar a Globalead Portugal?",
        answer: "Pode contactar-nos através do telefone 915 482 365, email geral@globalead.pt, ou através do formulário de contacto no nosso website."
      },
      {
        question: "Que serviços oferece a Globalead?",
        answer: "Oferecemos serviços de mediação imobiliária, seguros, energia, alarmes e telecomunicações (TV, Net, Voz)."
      }
    ],
    imoveis: [
      {
        question: "Como posso vender o meu imóvel com a Globalead?",
        answer: "Entre em contacto connosco para uma avaliação gratuita. Tratamos de todo o processo de marketing, visitas e negociação até à escritura."
      },
      {
        question: "Quanto tempo demora a vender um imóvel?",
        answer: "O tempo varia conforme o tipo de imóvel e localização, mas em média conseguimos vender imóveis entre 30 a 90 dias."
      },
      {
        question: "Que documentos preciso para vender o meu imóvel?",
        answer: "Precisa da caderneta predial, certidão permanente, certificado energético e licença de habitação (quando aplicável)."
      }
    ],
    seguros: [
      {
        question: "Que tipos de seguros comercializam?",
        answer: "Comercializamos seguros automóvel, habitação, vida, saúde, acidentes pessoais e seguros empresariais."
      },
      {
        question: "Posso transferir o meu seguro atual?",
        answer: "Sim, ajudamos na transferência do seu seguro atual e comparamos com outras opções para garantir as melhores condições."
      }
    ],
    energia: [
      {
        question: "Como posso mudar de fornecedor de energia?",
        answer: "Tratamos de todo o processo de mudança. Apenas precisa de autorizar a transferência e nós cuidamos do resto."
      },
      {
        question: "Vou ficar sem energia durante a mudança?",
        answer: "Não, a mudança é feita sem interrupção do fornecimento. O processo é totalmente transparente."
      }
    ],
    alarmes: [
      {
        question: "Que sistemas de alarme instalam?",
        answer: "Instalamos sistemas de alarme residenciais e comerciais com monitorização 24h, câmaras de videovigilância e sensores de movimento."
      },
      {
        question: "O alarme funciona sem internet?",
        answer: "Sim, os nossos sistemas têm comunicação GSM de backup que funciona mesmo sem internet ou energia elétrica."
      }
    ]
  };

  const currentFAQ = faqData[category as keyof typeof faqData] || faqData.geral;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Perguntas Frequentes
        </h2>
        <p className="text-xl text-gray-600">
          Encontre respostas às perguntas mais comuns
        </p>
      </div>

      <div className="space-y-4">
        {currentFAQ.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200">
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900">{item.question}</span>
              {openItems.includes(index) ? (
                <ChevronUp className="h-5 w-5 text-[#0d2233]" />
              ) : (
                <ChevronDown className="h-5 w-5 text-[#0d2233]" />
              )}
            </button>
            {openItems.includes(index) && (
              <div className="px-6 pb-4">
                <p className="text-gray-600">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
