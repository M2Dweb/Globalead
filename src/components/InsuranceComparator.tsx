import React, { useState, useEffect } from 'react';
import { Shield, Heart, Car, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';

const InsuranceComparator: React.FC = () => {
  const [selectedInsurance, setSelectedInsurance] = useState('multiriscos');

  // LOGOS
  const [partnerLogos, setPartnerLogos] = useState<string[]>([]);
  const [currentPartnerIndex, setCurrentPartnerIndex] = useState(0);
  const [logosPerPage, setLogosPerPage] = useState(window.innerWidth < 640 ? 2 : 4);

  // Seguros principais
  const mainInsurance = {
    life: {
      name: 'Seguro Vida',
      providers: [
        { name: 'Fidelidade', price: 35 },
        { name: 'Tranquilidade', price: 38 },
        { name: 'Zurich', price: 40 },
      ],
    },
    multiriscos: {
      name: 'Multirriscos Habitação',
      providers: [
        { name: 'Fidelidade', price: 42 },
        { name: 'Tranquilidade', price: 45 },
        { name: 'Zurich', price: 48 },
      ],
    },
  };

  // Outros Seguros
  const otherInsurance = [
    {
      icon: <Car className="h-6 w-6 text-[#79b2e9]" />,
      name: 'Seguro Automóvel',
      providers: [
        { name: 'Fidelidade', price: 45 },
        { name: 'Tranquilidade', price: 52 },
        { name: 'Zurich', price: 48 },
      ],
    },
    {
      icon: <Heart className="h-6 w-6 text-[#79b2e9]" />,
      name: 'Seguro Saúde',
      providers: [
        { name: 'Médis', price: 85 },
        { name: 'Multicare', price: 78 },
        { name: 'Allianz Care', price: 92 },
      ],
    },
    {
      icon: <Users className="h-6 w-6 text-[#79b2e9]" />,
      name: 'Acidentes Pessoais',
      providers: [
        { name: 'Fidelidade', price: 20 },
        { name: 'Tranquilidade', price: 22 },
        { name: 'Zurich', price: 25 },
      ],
    },
  ];

const scrollToForm = () => {
  const el = document.getElementById("form-section");
  el?.scrollIntoView({ behavior: "smooth" });
};




  const currentInsurance = mainInsurance[selectedInsurance as keyof typeof mainInsurance] || { providers: [] };

  // Fetch logos
  useEffect(() => {
    const handleResize = () => setLogosPerPage(window.innerWidth < 640 ? 2 : 5);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => { fetchPartnerLogos(); }, []);

  useEffect(() => {
    if (partnerLogos.length > 0) {
      const interval = setInterval(() => {
        setCurrentPartnerIndex(prev => {
          // Corrigido para evitar índice negativo
          const maxIndex = Math.max(0, partnerLogos.length - logosPerPage);
          return (prev + 1) % (maxIndex + 1);
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [partnerLogos.length, logosPerPage]);

  const fetchPartnerLogos = async () => {
    try {
      const { data, error } = await supabase.storage.from('imagens').list('seguros', { limit: 25, offset: 0 });
      if (!error && data) {
        const logoUrls = data.map(file => supabase.storage.from('imagens').getPublicUrl(`seguros/${file.name}`).data.publicUrl);
        setPartnerLogos(logoUrls);
      }
    } catch { setPartnerLogos([]); }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
      <div className="flex items-center mb-6">
        <Shield className="h-8 w-8 text-[#79b2e9] mr-3" />
        <h3 className="text-2xl font-bold text-gray-900">Simulador de Seguros</h3>
      </div>

      {/* Main Insurance Selector */}
      <div className="flex space-x-4 mb-8">
        {Object.entries(mainInsurance).map(([key, type]) => {
          const isSelected = selectedInsurance === key;
          const IconComponent = key === 'life' ? Shield : Heart;

          return (
            <button
              key={key}
              onClick={() => setSelectedInsurance(key)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                isSelected
                  ? 'bg-[#79b2e9] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-[#0d2233] hover:text-white'
              }`}
            >
              <IconComponent className={`h-6 w-6 ${isSelected ? 'text-white' : 'text-[#79b2e9]'}`} />
              <span className="ml-2">{type.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Insurance Table + Outros Seguros */}
      <div className="mb-6 flex flex-col md:flex-row gap-6 md:items-stretch">
        <div className="flex-1">
          <div className="h-full flex flex-col">
            <table className="w-full table-fixed border-collapse flex-1">
              <thead>
                <tr className="border-b">
                  <th className="py-4 px-2 text-center">Seguradora</th>
                  <th className="py-4 px-2 text-center">Preço/mês</th>
                </tr>
              </thead>
              <tbody className="flex-1">
                {currentInsurance.providers.map((provider, index) => (
                  <tr key={index} className="border-b hover:[#0d2233] text-center">
                    <td className="py-4 px-2 font-semibold text-gray-900">{provider.name}</td>
                    <td className="py-4 px-2 text-2xl font-bold text-[#79b2e9]">{provider.price}€</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Outros Seguros */}
        <div className="flex-1 grid grid-cols-1 gap-6">
          {otherInsurance.map((insurance, idx) => (
            <div key={idx} className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col justify-between">
              <div className="flex items-center mb-3">
                {insurance.icon}
                <span className="ml-2 font-semibold">{insurance.name}</span>
              </div>
              <ul className="space-y-1 text-sm mt-auto">
                {insurance.providers.map((p, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{p.name}</span>
                    <span className="font-bold text-[#79b2e9]">{p.price}€</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* LOGOS dos Parceiros */}
      {partnerLogos.length > 0 && (
        <div className="overflow-hidden mt-16 mb-16">
          <div
            className="flex transition-transform duration-1000 ease-in-out gap-6"
            style={{ transform: `translateX(-${currentPartnerIndex * (100 / logosPerPage)}%)` }}
          >
            {partnerLogos.map((logo, index) => (
              <div key={index} className="flex-shrink-0 w-1/2 sm:w-1/5 px-4">
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center h-32">
                  <img
                    src={logo}
                    alt={`Parceiro ${index + 1}`}
                    className="max-h-20 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-6 text-center">
        <button 
          onClick={scrollToForm}
          className="bg-[#79b2e9] text-white font-semibold py-3 px-8 rounded-lg hover:[#0d2233]"
        >
          Pedir Simulação
        </button>
      </div>
    </div>
  );
};

export default InsuranceComparator;
