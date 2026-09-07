import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQProps {
  category?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC<FAQProps> = ({ category = 'geral' }) => {
  const { t } = useTranslation();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  // As perguntas e respostas vivem nos ficheiros de tradução
  // (src/i18n/locales/*.json, secção "faq"). Uma categoria que ainda não
  // esteja traduzida cai para o português, pelo fallback do i18next.
  const currentFAQ =
    (t(`faq.${category}`, { returnObjects: true }) as FAQItem[] | string) ;

  const items: FAQItem[] = Array.isArray(currentFAQ)
    ? currentFAQ
    : (t('faq.geral', { returnObjects: true }) as FAQItem[]);


  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-2">

      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
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