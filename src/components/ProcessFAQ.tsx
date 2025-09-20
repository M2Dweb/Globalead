import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ProcessFAQProps {
  onActiveChange: (index: number) => void;
}

const ProcessFAQ: React.FC<ProcessFAQProps> = ({ onActiveChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const faqItems = [
    {
      number: 1,
      title: "Compara todo o mercado sem sair do lugar",
      content: "Em vez de ires a vários fornecedores de energia, preenche um simples e rápido questionário e tem acesso à comparação das ofertas de mais de 20 comercializadores."
    },
    {
      number: 2,
      title: "Recebe uma análise gratuita de um especialista",
      content: "Tem acesso a uma análise transparente, por um especialista do setor energético, com as vantagens e desvantagens das diferentes opções que existem no mercado"
    },
    {
      number: 3,
      title: "Adere de forma gratuita, rápida e sem riscos!",
      content: "Tratamos de toda a comunicação e burocracia envolvida na contratualização de um novo fornecedor"
    }
  ];

  // Auto-cycle through FAQ items
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => {
          const nextIndex = (prev + 1) % faqItems.length;
          onActiveChange(nextIndex);
          return nextIndex;
        });
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [onActiveChange]);

  const toggleItem = (index: number) => {
    if (isMobile) {
      setActiveIndex(index);
      onActiveChange(index);
    }
  };

  return (
    <div className="space-y-4">
      {faqItems.map((item, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200">
          <button
            onClick={() => toggleItem(index)}
            className={`w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors ${!isMobile ? 'cursor-default' : ''}`}
          >
            <div className="flex items-center">
              <div className={`flex-shrink-0 w-8 h-8 ${
                (!isMobile || activeIndex === index) ? 'bg-[#4f89c6]' : 'bg-[#0d2233]'
              } text-white rounded-full flex items-center justify-center font-bold text-sm mr-4`}>
                {item.number}
              </div>
              <span className={`font-semibold ${
                (!isMobile || activeIndex === index) ? 'text-[#4f89c6]' : 'text-gray-900'
              }`}>
                {item.title}
              </span>
            </div>
            {isMobile && (
              activeIndex === index ? (
                <ChevronUp className="h-5 w-5 text-[#0d2233]" />
              ) : (
                <ChevronDown className="h-5 w-5 text-[#0d2233]" />
              )
            )}
          </button>
          {(!isMobile || activeIndex === index) && (
            <div className="px-6 pb-4">
              <p className="text-gray-600 ml-12">
                {item.content}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProcessFAQ;