import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StickyCtaButtonProps {
  onNavigate: (page: string) => void;
}

const StickyCtaButton: React.FC<StickyCtaButtonProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="relative">
            {/* Main CTA Button */}
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isExpanded ? <X className="h-6 w-6" /> : <Phone className="h-6 w-6" />}
            </motion.button>

            {/* Expanded Options */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 min-w-48"
                >
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        window.open('tel:+351915482365', '_self');
                        setIsExpanded(false);
                      }}
                      className="flex items-center w-full text-left p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Phone className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">Ligar Agora</div>
                        <div className="text-sm text-gray-500">915 482 365</div>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => {
                        window.open('https://wa.me/351915482365', '_blank');
                        setIsExpanded(false);
                      }}
                      className="flex items-center w-full text-left p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <MessageCircle className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">WhatsApp</div>
                        <div className="text-sm text-gray-500">Mensagem direta</div>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => {
                        onNavigate('contactos');
                        setIsExpanded(false);
                      }}
                      className="flex items-center w-full text-left p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="h-5 w-5 bg-blue-600 rounded mr-3"></div>
                      <div>
                        <div className="font-medium text-gray-900">Contactos</div>
                        <div className="text-sm text-gray-500">Formulário</div>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCtaButton;