import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Caixa OPCIONAL (desligada por defeito) para a pessoa aceitar receber a newsletter por email.
 * O pedido grava a escolha e o texto que a pessoa viu (extra_data.newsletter / newsletter_texto),
 * como prova da autorização. Não é obrigatória para enviar o formulário.
 */
export const useTextoNewsletter = (): string => useTranslation().t('formulario.newsletter');

const NewsletterCheckbox: React.FC<{ checked: boolean; onChange: (valor: boolean) => void; className?: string }> = ({ checked, onChange, className }) => {
  const { t } = useTranslation();
  return (
    <label className={className ?? 'flex items-start text-sm text-gray-700'}>
      <input type="checkbox" className="mt-1 mr-2" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {t('formulario.newsletter')}
    </label>
  );
};

export default NewsletterCheckbox;
