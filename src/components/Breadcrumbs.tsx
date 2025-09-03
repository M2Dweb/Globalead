import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  items: Array<{
    label: string;
    href?: string;
    current?: boolean;
  }>;
  onNavigate: (page: string) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav className="bg-gray-50 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <button
              onClick={() => onNavigate('home')}
              className="text-gray-500 hover:text-blue-600 transition-colors flex items-center"
            >
              <Home className="h-4 w-4" />
            </button>
          </li>
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
              {item.current ? (
                <span className="text-gray-900 font-medium">{item.label}</span>
              ) : (
                <button
                  onClick={() => item.href && onNavigate(item.href)}
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;