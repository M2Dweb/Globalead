import React, { useState } from 'react';
import { Shield, Home, Heart, Car, Users, Check } from 'lucide-react';

const InsuranceComparator: React.FC = () => {
  const [selectedInsurance, setSelectedInsurance] = useState('home');
  

  // Seguros principais
  const mainInsurance = {
    home: {
      icon: <Home className="h-6 w-6 text-[#79b2e9]" />,
      name: 'Seguro Habitação',
      providers: [
        { name: 'Fidelidade', price: 25, features: ['Incêndio', 'Inundação', 'Roubo', 'Responsabilidade Civil'], rating: 4.6 },
        { name: 'Tranquilidade', price: 28, features: ['Incêndio', 'Inundação', 'Roubo', 'Responsabilidade Civil', 'Fenómenos Naturais'], rating: 4.4 },
        { name: 'Zurich', price: 30, features: ['Incêndio', 'Inundação', 'Roubo', 'Responsabilidade Civil', 'Assistência Domiciliária'], rating: 4.5 },
      ],
    },
    life: {
      icon: <Shield className="h-6 w-6 text-[#79b2e9]" />,
      name: 'Seguro Vida',
      providers: [
        { name: 'Fidelidade', price: 35, features: ['Falecimento', 'Invalidez'], rating: 4.5 },
        { name: 'Tranquilidade', price: 38, features: ['Falecimento', 'Invalidez', 'Doenças Graves'], rating: 4.4 },
        { name: 'Zurich', price: 40, features: ['Falecimento', 'Invalidez', 'Complementar'], rating: 4.3 },
      ],
    },
    multiriscos: {
      icon: <Heart className="h-6 w-6 text-[#79b2e9]" />,
      name: 'Multirriscos Habitação',
      providers: [
        { name: 'Fidelidade', price: 42, features: ['Incêndio', 'Roubo', 'Inundação', 'Danos Bens'], rating: 4.6 },
        { name: 'Tranquilidade', price: 45, features: ['Incêndio', 'Roubo', 'Inundação', 'Danos Bens', 'Fenómenos Naturais'], rating: 4.5 },
        { name: 'Zurich', price: 48, features: ['Incêndio', 'Roubo', 'Inundação', 'Danos Bens', 'Assistência Domiciliária'], rating: 4.4 },
      ],
    },
  };

  // Outros Seguros (exemplos)
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

  const currentInsurance = mainInsurance[selectedInsurance as keyof typeof mainInsurance];

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
      <div className="flex items-center mb-6">
        <Shield className="h-8 w-8 text-[#79b2e9] mr-3" />
        <h3 className="text-2xl font-bold text-gray-900">Comparador de Seguros</h3>
      </div>

      {/* Main Insurance Selector */}
      <div className="flex space-x-4 mb-8">
        {Object.entries(mainInsurance).map(([key, type]) => (
          <button
            key={key}
            onClick={() => setSelectedInsurance(key)}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              selectedInsurance === key
                ? 'bg-[#79b2e9] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-[#0d2233] hover:text-white'
            }`}
          >
            {type.icon}
            <span className="ml-2">{type.name}</span>
          </button>
        ))}
      </div>

      {/* Main Insurance Table */}
      <div className="overflow-x-auto mb-12">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-4 px-2 text-center">Seguradora</th>
              <th className="py-4 px-2 text-center">Preço/mês</th>
              <th className="py-4 px-2 text-center">Avaliação</th>
              <th className="py-4 px-2 text-center">Coberturas</th>
            </tr>
          </thead>
          <tbody>
            {currentInsurance.providers.map((provider, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 text-center align-middle">
                <td className="py-4 px-2 font-semibold text-gray-900">{provider.name}</td>
                <td className="py-4 px-2 text-2xl font-bold text-[#79b2e9]">{provider.price}€</td>
                <td className="py-4 px-2">
                  <div className="flex justify-center items-center">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(provider.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{provider.rating}</span>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <ul className="mx-auto text-sm h-28 overflow-y-auto">
                    {provider.features?.map((f, i) => (
                      <li key={i} className="flex items-center justify-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



      {/* Other Insurance */}
      <div className="mb-6">
        <h4 className="text-xl font-semibold text-gray-900 mb-4">Outros Seguros</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherInsurance.map((insurance, idx) => (
            <div key={idx} className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-3">
                {insurance.icon}
                <span className="ml-2 font-semibold">{insurance.name}</span>
              </div>
              <ul className="space-y-1 text-sm">
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

      {/* Call to Action */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 mb-4">Preços indicativos. Valores finais dependem do perfil do cliente.</p>
        <button className="bg-[#79b2e9] text-white px-6 py-3 rounded-lg hover:bg-[#0d2233] transition-colors font-semibold">
          Solicitar Cotação Personalizada
        </button>
      </div>
    </div>
  );
};

export default InsuranceComparator;
