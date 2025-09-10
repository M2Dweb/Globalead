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
        question: "O que é um seguro?",
        answer: "Um seguro é um acordo entre segurador e segurado, em que o segurador assume coberturas específicas em caso de sinistro, pagando indemnizações conforme o capital seguro. O segurado, responsável pelo pagamento do prémio, celebra o contrato formalizado na apólice do seguro, que define as coberturas e o custo. A indemnização pode ser paga ao segurado, a um beneficiário ou a terceiros afetados por prejuízos atribuídos ao segurado."
      },
      {
        question: "O que é a apólice de um seguro?",
        answer: "A apólice de seguro é o contrato celebrado entre a seguradora e o tomador do seguro, que inclui todas as condições gerais, particulares e especiais do seguro. As condições gerais são cláusulas padrão aplicáveis a riscos semelhantes, enquanto as condições particulares ou especiais são ajustadas de acordo com o tipo de seguro e as necessidades específicas do segurado."
      },
      {
        question: "Seguro Automóvel: Como Funciona?",
        answer: "O seguro automóvel é um contrato entre o tomador de seguro e a seguradora, transferindo a responsabilidade por danos causados pela utilização de um veículo. O seguro obrigatório por lei é o de responsabilidade civil, que cobre apenas danos a terceiros. Para proteção do próprio veículo, é necessário um seguro de danos próprios (\"contra todos os riscos\"). O prémio do seguro é influenciado por fatores como idade, experiência de condução, histórico de sinistros, características e utilização do veículo, local de parqueamento, quilometragem anual, dispositivos de segurança e outros elementos relacionados com o condutor e o veículo."
      },
      {
        question: "Que tipos de seguros existem?",
        answer: "O mercado de seguros oferece uma ampla variedade de opções, incluindo cerca de 200 seguros obrigatórios por lei para atividades profissionais específicas. Estes estão organizados em categorias como: acidentes de trabalho, acidentes em serviço, acidentes pessoais, assistência a pessoas, danos, doença, incêndio, seguro caução, responsabilidade civil, roubo e vida."
      },
      {
        question: "Seguro de Responsabilidade Civil: O que é?",
        answer: "O seguro de responsabilidade civil é obrigatório por lei e protege as pessoas transportadas e terceiros em caso de acidente, cobrindo lesões corporais ou materiais. A cobertura mínima estabelecida pela ASF é de 1.220.000 euros para danos materiais e 6.070.000 euros para danos corporais, com revisão a cada cinco anos. No entanto, o seguro não cobre lesões do condutor responsável pelo acidente, danos no seu veículo, ou danos resultantes de acidentes causados deliberadamente ou por negligência nas normas de segurança rodoviária."
      },
      {
        question: "É importante ter um seguro de vida?",
        answer: "O seguro de vida cobre o risco de morte ou, alternativamente, de sobrevivência. Em caso de falecimento, a seguradora paga um capital acordado aos beneficiários, e em caso de sobrevivência, paga um montante à pessoa segura no final do contrato. Existem modalidades mistas que combinam ambos os casos, e o seguro pode ser complementado com coberturas adicionais, como invalidez ou desemprego. Este tipo de seguro oferece segurança económica à família, especialmente em situações de perda de rendimento ou aumento de custos com a longevidade."
      },
      {
        question: "Sou obrigado a fazer um seguro de vida no crédito habitação?",
        answer: "Se um banco exigir a contratação de um seguro de vida ao contratar um crédito à habitação, isso não é obrigatório por lei. Segundo o Decreto-Lei n.º 222/2009, os bancos devem informar o cliente sobre a possibilidade de fazer o seguro de vida, mas o cliente tem a liberdade de escolher a instituição onde deseja contratar o seguro."
      },
      {
        question: "Qual é a utilidade de um Seguro Multirriscos-Habitação?",
        answer: "O seguro multirriscos-habitação oferece proteção indemnizatória, cobrindo danos causados ao imóvel e ao seu recheio por incidentes como catástrofes naturais, incêndios, explosões, roubo, danos por água, problemas elétricos, entre outros. Esta solução vai além da apólice obrigatória por lei, que apenas cobre danos causados por incêndios em edifícios em propriedade horizontal, oferecendo uma proteção mais abrangente para a casa."
      }
    ]
  };

  const currentFAQ = faqData[category as keyof typeof faqData] || faqData.geral;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        
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
