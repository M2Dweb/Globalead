import React from 'react';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = {
    reservado: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      label: 'Reservado'
    },
    vendido: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      label: 'Vendido'
    }
  };

  
  if (status !== 'reservado' && status !== 'vendido') {
    return null;
  }

  const current = config[status as keyof typeof config];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${current.bg} ${current.text}`}>
      {current.label}
    </span>
  );
};

export default StatusBadge;