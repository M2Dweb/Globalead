import React, { useState } from 'react';
import { Shield, Car, Home, Heart, Check, X } from 'lucide-react';

const InsuranceComparator: React.FC = () => {
  const [selectedInsurance, setSelectedInsurance] = useState('auto');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const insuranceTypes = {
    auto: {
      icon: <Car className="h-6 w-6" />,
      name: 'Seguro Automóvel',
      providers: [
        {
          name: 'Fidelidade',
          price: 45,
          features: ['Responsabilidade Civil', 'Danos Próprios', 'Roubo/Incêndio', 'Assistência 24h'],
          rating: 4.5
        },
        {
          name: 'Tranquilidade',
          price: 52,
          features: ['Responsabilidade Civil', 'Danos Próprios', 'Roubo/Incêndio', 'Assistência 24h', 'Condutor Ocasional'],
          rating: 4.3
        },
        {
          name: 'Zurich',
          price: 48,
          features: ['Responsabilidade Civil', 'Danos Próprios', 'Roubo/Incêndio', 'Assistência 24h', 'Proteção Jurídica'],
          rating: 4.4
        }
      ]
    },
    home: {
      icon: <Home className="h-6 w-6" />,
      name: 'Seguro Habitação',
      providers: [
        {
          name: 'Fidelidade',
          price: 25,
          features: ['Incêndio', 'Inundação', 'Roubo', 'Responsabilidade Civil'],
          rating: 4.6
        },
        {
          name: 'Tranquilidade',
          price: 28,
          features: ['Incêndio', 'Inundação', 'Roubo', 'Responsabilidade Civil', 'Fenómenos Naturais'],
          rating: 4.4
        },
        {
          name: 'Zurich',
          price: 30,
          features: ['Incêndio', 'Inundação', 'Roubo', 'Responsabilidade Civil', 'Assistência Domiciliária'],
          rating: 4.5
        }
      ]
    },
    health: {
      icon: <Heart className="h-6 w-6" />,
      name: 'Seguro Saúde',
      providers: [
        {
          name: 'Médis',
          price: 85,
          features: ['Consultas', 'Exames', 'Internamento', 'Urgências'],
          rating: 4.7
        },
        {
          name: 'Multicare',
          price: 78,
          features: ['Consultas', 'Exames', 'Internamento', 'Urgências', 'Medicina Dentária'],
          rating: 4.5
        },
        {
          name: 'Allianz Care',
          price: 92,
          features: ['Consultas', 'Exames', 'Internamento', 'Urgências', 'Cobertura Internacional'],
          rating: 4.6
        }
      ]
    }
  };

  const currentInsurance = insuranceTypes[selectedInsurance as keyof typeof insuranceTypes];

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
      <div className="flex items-center mb-6">
        <Shield className="h-8 w-8 text-blue-600 mr-3" />
        <h3 className="text-2xl font-bold text-gray-900">Comparador de Seguros</h3>
      </div>

      {/* Insurance Type Selector */}
      <div className="flex space-x-4 mb-8">
        {Object.entries(insuranceTypes).map(([key, type]) => (
          <button
            key={key}
            onClick={() => setSelectedInsurance(key)}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              selectedInsurance === key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type.icon}
            <span className="ml-2">{type.name}</span>
          </button>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-2">Seguradora</th>
              <th className="text-left py-4 px-2">Preço/mês</th>
              <th className="text-left py-4 px-2">Avaliação</th>
              <th className="text-left py-4 px-2">Coberturas</th>
              <th className="text-left py-4 px-2">Ação</th>
            </tr>
          </thead>
          <tbody>
            {currentInsurance.providers.map((provider, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-4 px-2">
                  <div className="font-semibold text-gray-900">{provider.name}</div>
                </td>
                <td className="py-4 px-2">
                  <div className="text-2xl font-bold text-blue-600">
                    {provider.price}€
                  </div>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center">
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
                  <div className="space-y-1">
                    {provider.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="py-4 px-2">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Escolher
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 mb-4">
          Preços indicativos. Valores finais dependem do perfil do cliente.
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
          Solicitar Cotação Personalizada
        </button>
      </div>
    </div>
  );
};

export default InsuranceComparator;