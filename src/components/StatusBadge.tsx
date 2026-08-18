import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Etiqueta de estado do imóvel (Reservado / Vendido).
 *
 * Formato quadrado (cantos direitos) nas cores da Globalead, para poder ficar
 * sobreposta à foto nos cartões de imóvel — assim os imóveis reservados e
 * vendidos podem continuar no site, devidamente identificados, em vez de
 * terem de ser removidos.
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm' }) => {
  const config = {
    reservado: {
      bg: 'bg-[#79b2e9]',
      text: 'text-white',
      label: 'Reservado',
    },
    vendido: {
      bg: 'bg-[#0d2233]',
      text: 'text-white',
      label: 'Vendido',
    },
  };

  if (status !== 'reservado' && status !== 'vendido') {
    return null;
  }

  const current = config[status as keyof typeof config];

  let baseClasses = 'inline-flex items-center font-medium tracking-wide whitespace-nowrap';

  if (size === 'lg') {
    baseClasses += ' px-5 py-2 text-base';
  } else if (size === 'md') {
    baseClasses += ' px-4 py-1.5 text-sm';
  } else {
    baseClasses += ' px-3 py-1 text-xs';
  }

  return (
    <span className={`${baseClasses} ${current.bg} ${current.text}`}>
      {current.label}
    </span>
  );
};

export default StatusBadge;
