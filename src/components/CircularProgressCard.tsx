import React from 'react';

interface CircularProgressCardProps {
  title: string;
  used: string;
  total: string;
  percentage: number;
  color?: string;
}

const CircularProgressCard: React.FC<CircularProgressCardProps> = ({
  title,
  used,
  total,
  percentage,
  color = "text-blue-600"
}) => {
  const size = 120;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-6">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Background Circle */}
        <svg className="absolute transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-gray-100"
          />
          {/* Progress Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            style={{
              strokeDashoffset: offset,
              transition: 'stroke-dashoffset 1s ease-in-out',
            }}
            strokeLinecap="round"
            className={color}
          />
        </svg>
        
        {/* Center Content */}
        <div className="text-center z-10">
          <span className="text-2xl font-bold text-gray-900">
            {percentage}%
          </span>
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 mt-1">{used}</p>
        <p className="text-sm text-gray-400 mt-1">de {total} disponíveis</p>
        
        <div className="mt-4 flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${color.replace('text-', 'bg-')}`}></div>
          <span className="text-xs font-medium text-gray-600">Espaço em uso no R2</span>
        </div>
      </div>
    </div>
  );
};

export default CircularProgressCard;
