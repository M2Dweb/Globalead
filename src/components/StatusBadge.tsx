import React from 'react';
import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  showIcon = true, 
  size = 'md' 
}) => {
  const config = {
    disponivel: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-200',
      icon: <CheckCircle className="text-green-600" />,
      label: 'Disponível',
      tooltip: 'Imóvel disponível para venda'
    },
    reservado: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-200',
      icon: <Clock className="text-yellow-600" />,
      label: 'Reservado',
      tooltip: 'Imóvel reservado - a aguardar confirmação'
    },
    vendido: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-200',
      icon: <XCircle className="text-red-600" />,
      label: 'Vendido',
      tooltip: 'Imóvel já comercializado'
    },
    indisponivel: {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      border: 'border-gray-200',
      icon: <AlertCircle className="text-gray-600" />,
      label: 'Indisponível',
      tooltip: 'Imóvel temporariamente fora do mercado'
    }
  };

  const current = config[status as keyof typeof config] || config.disponivel;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${current.bg} ${current.text} ${current.border} border ${sizeClasses[size]}`}
      title={current.tooltip}
    >
      {showIcon && <span className="w-4 h-4">{current.icon}</span>}
      {current.label}
    </div>
  );
};

export default StatusBadge;