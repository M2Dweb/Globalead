import React, { useState } from 'react';
import { MapPin, Home, Euro, Bed, Bath, Square } from 'lucide-react';

const InteractiveMap: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);

  const properties = [
    {
      id: 1,
      title: "Apartamento T2 - Cedofeita",
      price: 280000,
      bedrooms: 2,
      bathrooms: 1,
      area: 85,
      location: "Cedofeita, Porto",
      coordinates: { x: 45, y: 35 },
      image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      id: 2,
      title: "Moradia T3 - Matosinhos",
      price: 450000,
      bedrooms: 3,
      bathrooms: 2,
      area: 150,
      location: "Matosinhos, Porto",
      coordinates: { x: 25, y: 20 },
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      id: 3,
      title: "Apartamento T1 - Campanhã",
      price: 180000,
      bedrooms: 1,
      bathrooms: 1,
      area: 55,
      location: "Campanhã, Porto",
      coordinates: { x: 65, y: 45 },
      image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      id: 4,
      title: "Moradia T4 - Vila Nova de Gaia",
      price: 520000,
      bedrooms: 4,
      bathrooms: 3,
      area: 200,
      location: "Vila Nova de Gaia",
      coordinates: { x: 55, y: 70 },
      image: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=300"
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <div className="flex items-center mb-6">
        <MapPin className="h-8 w-8 text-blue-600 mr-3" />
        <h3 className="text-2xl font-bold text-gray-900">Propriedades no Mapa</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Map */}
        <div className="relative">
          <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg h-96 relative overflow-hidden">
            {/* Simplified map background */}
            <div className="absolute inset-0 opacity-20">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M10,20 Q30,10 50,20 T90,25" stroke="#3B82F6" strokeWidth="0.5" fill="none" />
                <path d="M15,40 Q35,30 55,40 T85,45" stroke="#3B82F6" strokeWidth="0.5" fill="none" />
                <path d="M20,60 Q40,50 60,60 T80,65" stroke="#3B82F6" strokeWidth="0.5" fill="none" />
              </svg>
            </div>

            {/* Property markers */}
            {properties.map((property) => (
              <button
                key={property.id}
                onClick={() => setSelectedProperty(property.id)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                  selectedProperty === property.id
                    ? 'scale-125 z-10'
                    : 'hover:scale-110'
                }`}
                style={{
                  left: `${property.coordinates.x}%`,
                  top: `${property.coordinates.y}%`
                }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                  selectedProperty === property.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-600 border-2 border-blue-600'
                }`}>
                  <Home className="h-4 w-4" />
                </div>
                
                {/* Price tooltip */}
                <div className={`absolute top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap transition-opacity ${
                  selectedProperty === property.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  {formatPrice(property.price)}
                </div>
              </button>
            ))}

            {/* Map legend */}
            <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg">
              <div className="text-xs font-medium text-gray-700 mb-2">Legenda</div>
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-1"></div>
                  <span>Disponível</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-1"></div>
                  <span>Vendido</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div>
          {selectedProperty ? (
            <div className="space-y-4">
              {properties
                .filter(p => p.id === selectedProperty)
                .map(property => (
                  <div key={property.id} className="border rounded-lg overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        {property.title}
                      </h4>
                      <div className="text-2xl font-bold text-blue-600 mb-3">
                        {formatPrice(property.price)}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 mr-1" />
                          <span>{property.bedrooms}</span>
                        </div>
                        <div className="flex items-center">
                          <Bath className="h-4 w-4 mr-1" />
                          <span>{property.bathrooms}</span>
                        </div>
                        <div className="flex items-center">
                          <Square className="h-4 w-4 mr-1" />
                          <span>{property.area}m²</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-gray-600 mb-4">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{property.location}</span>
                      </div>
                      
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-96 text-gray-500">
              <div className="text-center">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>Selecione uma propriedade no mapa para ver os detalhes</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Property List */}
      <div className="mt-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Todas as Propriedades</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {properties.map((property) => (
            <button
              key={property.id}
              onClick={() => setSelectedProperty(property.id)}
              className={`text-left p-4 rounded-lg border transition-colors ${
                selectedProperty === property.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium text-gray-900 mb-1">{property.title}</div>
              <div className="text-blue-600 font-bold">{formatPrice(property.price)}</div>
              <div className="text-sm text-gray-500">{property.location}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;