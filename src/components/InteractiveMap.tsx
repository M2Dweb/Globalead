import React, { useState } from 'react';
import { MapPin, Home, Euro, Bed, Bath, Square } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom icon for properties
const propertyIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

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
      coordinates: { lat: 41.1579, lng: -8.6291 }, // Cedofeita, Porto
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
      coordinates: { lat: 41.1820, lng: -8.6868 }, // Matosinhos
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
      coordinates: { lat: 41.1496, lng: -8.5830 }, // Campanhã, Porto
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
      coordinates: { lat: 41.1239, lng: -8.6118 }, // Vila Nova de Gaia
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

  // Center map on Porto, Portugal
  const mapCenter: [number, number] = [41.1579, -8.6291];

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
      <div className="flex items-center mb-6">
        <MapPin className="h-8 w-8 text-blue-600 mr-3" />
        <h3 className="text-2xl font-bold text-gray-900">Propriedades no Mapa</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Map */}
        <div className="relative">
          <div className="h-96 rounded-lg overflow-hidden">
            <MapContainer
              center={mapCenter}
              zoom={12}
              style={{ height: '100%', width: '100%' }}
              className="rounded-lg"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {properties.map((property) => (
                <Marker
                  key={property.id}
                  position={[property.coordinates.lat, property.coordinates.lng]}
                  icon={propertyIcon}
                  eventHandlers={{
                    click: () => setSelectedProperty(property.id)
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {property.title}
                      </h4>
                      <div className="text-lg font-bold text-blue-600 mb-2">
                        {formatPrice(property.price)}
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-gray-600 mb-2">
                        <div className="flex items-center">
                          <Bed className="h-3 w-3 mr-1" />
                          <span>{property.bedrooms}</span>
                        </div>
                        <div className="flex items-center">
                          <Bath className="h-3 w-3 mr-1" />
                          <span>{property.bathrooms}</span>
                        </div>
                        <div className="flex items-center">
                          <Square className="h-3 w-3 mr-1" />
                          <span>{property.area}m²</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{property.location}</span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Map legend */}
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-xl shadow-md border border-gray-100">
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

        {/* Property Details */}
        <div>
          {selectedProperty ? (
            <div className="space-y-4">
              {properties
                .filter(p => p.id === selectedProperty)
                .map(property => (
                  <div key={property.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
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
                <p>Clique numa propriedade no mapa para ver os detalhes</p>
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