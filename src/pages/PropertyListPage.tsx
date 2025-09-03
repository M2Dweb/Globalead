import React, { useState } from 'react';
import { Search, Filter, Bed, Bath, Square, MapPin, Euro, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface PropertyListPageProps {
  onNavigate: (page: string) => void;
  onPropertySelect: (propertyId: number) => void;
}

const PropertyListPage: React.FC<PropertyListPageProps> = ({ onNavigate, onPropertySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [bedrooms, setBedrooms] = useState('all');

  const properties = [
    {
      id: 1,
      title: "Empreendimento Vila Nova",
      description: "Empreendimento completamente murado, em pedra. O exterior das moradias terá uma grande presença de betão aparente, o que lhe configurará uma imagem de modernidade e simultaneamente...",
      price: 450000,
      bedrooms: 3,
      bathrooms: 3,
      area: 238,
      location: "Aldoar, Porto",
      type: "moradia",
      images: [
        "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800"
      ]
    },
    {
      id: 2,
      title: "Empreendimento Noval Park",
      description: "Cidade de paisagens ofegantes, miragens autênticas de recantos e encantos irrefutáveis. Revela-se nobre na simbiose perfeita entre a opulência do seu património cultural e histórico...",
      price: 320000,
      bedrooms: 2,
      bathrooms: 2,
      area: 145,
      location: "Vila Nova de Gaia",
      type: "apartamento",
      images: [
        "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
      ]
    },
    {
      id: 3,
      title: "Empreendimento Boss Gardens",
      description: "Boss Gardens está localizado na zona de Paranhos, uma das melhores zonas residenciais do Porto. Um projeto original que integra arquitetura vanguardista e designs de interiores surpreendentes...",
      price: 380000,
      bedrooms: 3,
      bathrooms: 2,
      area: 139,
      location: "Paranhos, Porto",
      type: "apartamento",
      images: [
        "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800"
      ]
    },
    {
      id: 4,
      title: "Apartamento T2 Moderno",
      description: "Apartamento completamente renovado com acabamentos de luxo, localizado numa zona premium da cidade...",
      price: 280000,
      bedrooms: 2,
      bathrooms: 1,
      area: 85,
      location: "Cedofeita, Porto",
      type: "apartamento",
      images: [
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800"
      ]
    },
    {
      id: 5,
      title: "Moradia T4 com Jardim",
      description: "Moradia espaçosa com jardim privativo, garagem para 2 carros e excelente exposição solar...",
      price: 520000,
      bedrooms: 4,
      bathrooms: 3,
      area: 200,
      location: "Matosinhos, Porto",
      type: "moradia",
      images: [
        "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800"
      ]
    },
    {
      id: 6,
      title: "Apartamento T1 Centro",
      description: "Apartamento compacto e funcional no centro da cidade, ideal para jovens profissionais...",
      price: 180000,
      bedrooms: 1,
      bathrooms: 1,
      area: 55,
      location: "Campanhã, Porto",
      type: "apartamento",
      images: [
        "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800"
      ]
    }
  ];

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || property.type === selectedType;
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
    const matchesBedrooms = bedrooms === 'all' || property.bedrooms.toString() === bedrooms;
    
    return matchesSearch && matchesType && matchesPrice && matchesBedrooms;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handlePropertyClick = (propertyId: number) => {
    onPropertySelect(propertyId);
    onNavigate('property-detail');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Catálogo de Imóveis
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Encontre o imóvel perfeito para si
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Pesquisar por localização..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos os tipos</option>
                <option value="apartamento">Apartamento</option>
                <option value="moradia">Moradia</option>
                <option value="terreno">Terreno</option>
              </select>

              {/* Bedrooms Filter */}
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Qualquer nº quartos</option>
                <option value="1">1 quarto</option>
                <option value="2">2 quartos</option>
                <option value="3">3 quartos</option>
                <option value="4">4+ quartos</option>
              </select>

              {/* Price Range */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Preço:</span>
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="10000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600">{formatPrice(priceRange[1])}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredProperties.length} imóveis encontrados
            </h2>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>Ordenar por preço</option>
              <option>Preço: menor para maior</option>
              <option>Preço: maior para menor</option>
              <option>Área: menor para maior</option>
              <option>Área: maior para menor</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => handlePropertyClick(property.id)}
              >
                <div className="relative">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {property.type === 'apartamento' ? 'Apartamento' : 'Moradia'}
                  </div>
                  <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                    {property.images.length} fotos
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {formatPrice(property.price)}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {property.title}
                  </h3>
                  
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
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {property.description}
                  </p>
                  
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center">
                    Ver Detalhes
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <Search className="h-12 w-12 mx-auto mb-4" />
                <p className="text-lg">Nenhum imóvel encontrado</p>
                <p className="text-sm">Tente ajustar os filtros de pesquisa</p>
              </div>
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex items-center space-x-2">
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyListPage;