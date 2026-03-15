import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm' }) => {
  const config = {
    reservado: {
      bg: 'bg-[#79b2e9]',
      text: 'text-white',
      label: 'Reservado'
    },
    vendido: {
      bg: 'bg-[#79b2e9]',
      text: 'text-white',
      label: 'Vendido'
    }
  };

  if (status !== 'reservado' && status !== 'vendido') {
    return null;
  }

  const current = config[status as keyof typeof config];
  
  let baseClasses = "inline-flex items-center rounded-full font-medium whitespace-nowrap";
  
  if (size === 'lg') {
    baseClasses += " px-4 py-2 text-base";
  } else {
    // defaults to exactly matching the property type tag
    baseClasses += " px-3 py-1 text-sm";
  }

  return (
    <span className={`${baseClasses} ${current.bg} ${current.text}`}>
      {current.label}
    </span>
  );
};

export default StatusBadge;