import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PartnersCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const partners = [
    {
      name: "Fidelidade",
      logo: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
      category: "Seguros"
    },
    {
      name: "EDP",
      logo: "https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
      category: "Energia"
    },
    {
      name: "MEO",
      logo: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
      category: "Telecomunicações"
    },
    {
      name: "Securitas Direct",
      logo: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
      category: "Segurança"
    },
    {
      name: "Tranquilidade",
      logo: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
      category: "Seguros"
    },
    {
      name: "Galp",
      logo: "https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
      category: "Energia"
    },
    {
      name: "NOS",
      logo: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
      category: "Telecomunicações"
    },
    {
      name: "Prosegur",
      logo: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
      category: "Segurança"
    }
  ];

  const itemsPerView = 4;
  const maxIndex = Math.max(0, partners.length - itemsPerView);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [maxIndex]);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Os Nossos Parceiros
          </h2>
          <p className="text-xl text-gray-600">
            Trabalhamos com as melhores empresas do mercado
          </p>
        </div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-4"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 group">
                    <div className="aspect-video flex items-center justify-center mb-4">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-900 mb-1">{partner.name}</h3>
                      <p className="text-sm text-gray-600">{partner.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Partnership Benefits */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">50+</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Parceiros Ativos</h3>
            <p className="text-gray-600">Rede alargada de parceiros em todos os setores</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">100%</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cobertura Nacional</h3>
            <p className="text-gray-600">Serviços disponíveis em todo o território nacional</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">24/7</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Suporte Contínuo</h3>
            <p className="text-gray-600">Apoio disponível 24 horas por dia, 7 dias por semana</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersCarousel;