import React, { useState, useEffect } from 'react';
import { Bed, Bath, Square, MapPin, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import ContentRenderer from '../components/ContentRenderer';
import FilterDropdown from '../components/FilterDropdown';

const PropertyListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [bedrooms, setBedrooms] = useState('all');
  const [bathrooms, setBathrooms] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [energyClass, setEnergyClass] = useState('all');
  const [areaRange, setAreaRange] = useState([0, 500]);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(9);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Erro ao carregar propriedades:', error);
          setProperties([
            {
              id: 1,
              title: "Empreendimento Noval Park",
              description: "Empreendimento completamente murado, em pedra...",
              price: 432600,
              bedrooms: 3,
              bathrooms: 2,
              area: 145,
              location: "Vila Nova de Gaia",
              district: "Porto",
              type: "empreendimento",
              state: "novo",
              features: ["Garagem", "Jardim"],
              energy_class: "A",
              images: ["https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800"]
            },
            {
              id: 2,
              title: "Apartamento T2 Moderno",
              description: "Apartamento moderno no centro da cidade",
              price: 280000,
              bedrooms: 2,
              bathrooms: 1,
              area: 85,
              location: "Cedofeita, Porto",
              district: "Porto",
              type: "apartamento",
              state: "usado",
              features: ["Elevador", "Varanda"],
              energy_class: "B",
              images: ["https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800"]
            }
          ]);
        } else {
          setProperties(data || []);
        }
      } catch (error) {
        console.error('Erro ao carregar propriedades:', error);
        setProperties([]);
      }
      setLoading(false);
    };

    fetchProperties();
  }, []);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedType, priceRange, bedrooms, bathrooms, selectedDistrict, selectedState, selectedFeatures, energyClass, areaRange]);

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || property.type?.toLowerCase() === selectedType.toLowerCase();
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
    const matchesBedrooms = bedrooms === 'all' || property.bedrooms?.toString() === bedrooms || (bedrooms === '4' && property.bedrooms >= 4);
    const matchesBathrooms = bathrooms === 'all' || property.bathrooms?.toString() === bathrooms || (bathrooms === '4' && property.bathrooms >= 4);
    const matchesDistrict = selectedDistrict === 'all' || property.district?.toLowerCase() === selectedDistrict.toLowerCase();
    const matchesState = selectedState === 'all' || property.state?.toLowerCase() === selectedState.toLowerCase();
    const matchesArea = property.area >= areaRange[0] && property.area <= areaRange[1];
    const matchesEnergyClass = energyClass === 'all' || property.energy_class?.toLowerCase() === energyClass.toLowerCase();
    const matchesFeatures = selectedFeatures.length === 0 || 
      selectedFeatures.every(feature => property.features?.includes(feature));
    
    return matchesSearch && matchesType && matchesPrice && matchesBedrooms && 
           matchesBathrooms && matchesDistrict && matchesState && matchesArea && 
           matchesEnergyClass && matchesFeatures;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'area-asc':
        return a.area - b.area;
      case 'area-desc':
        return b.area - a.area;
      case 'newest':
      default:
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
    }
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // Scroll to top of properties section
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
    setPriceRange([0, 1000000]);
    setBedrooms('all');
    setBathrooms('all');
    setSelectedDistrict('all');
    setSelectedState('all');
    setSelectedFeatures([]);
    setEnergyClass('all');
    setAreaRange([0, 500]);
    setCurrentPage(1);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">A carregar imóveis...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0d2233] to-[#79b2e9] text-white py-20">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: 'url(https://dzkxlimlbabjstaivuja.supabase.co/storage/v1/object/public/imagens/imagens/1757630053067_23.png)'
          }}
        ></div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-30"></div>
        
        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative text-center z-10">
            <h1 className="text-4xl md:text-5xl font-bold mt-12 ">
              Catálogo de Imóveis
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Encontre o imóvel perfeito para si
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <FilterDropdown
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                bedrooms={bedrooms}
                setBedrooms={setBedrooms}
                bathrooms={bathrooms}
                setBathrooms={setBathrooms}
                selectedDistrict={selectedDistrict}
                setSelectedDistrict={setSelectedDistrict}
                selectedState={selectedState}
                setSelectedState={setSelectedState}
                selectedFeatures={selectedFeatures}
                setSelectedFeatures={setSelectedFeatures}
                energyClass={energyClass}
                setEnergyClass={setEnergyClass}
                areaRange={areaRange}
                setAreaRange={setAreaRange}
                onClearFilters={clearAllFilters}
              />
            </div>

            {/* Properties Grid */}
            <div className="lg:col-span-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
                  {filteredProperties.length} imóveis encontrados
                </h2>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#79b2e9] w-full md:w-auto"
                >
                  <option value="newest">Mais recentes</option>
                  <option value="price-asc">Preço: menor para maior</option>
                  <option value="price-desc">Preço: maior para menor</option>
                  <option value="area-asc">Área: menor para maior</option>
                  <option value="area-desc">Área: maior para menor</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentProperties.map((property) => (
                  <Link
                    key={property.id}
                    to={`/imoveis/${property.ref || property.id}`}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
                  >
                    <div className="relative">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-[#79b2e9] text-white px-3 py-1 rounded-full text-sm font-medium">
                        {property.type === 'apartamento' ? 'Apartamento' : 
                         property.type === 'moradia' ? 'Moradia' : 
                         property.type === 'empreendimento' ? 'Empreendimento' : 
                         property.type}
                      </div>
                      <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                        {property.images?.length || 1} fotos
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-2xl font-bold text-[#79b2e9] mb-2">
                        {formatPrice(property.price)}
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900  line-clamp-2 min-h-[3.5rem]">
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
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="truncate">{property.location}</span>
                        </div>
                      </div>
                      
                      <div className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow min-h-[4.5rem]">
                        <ContentRenderer content={property.description || ''} />
                      </div>
                      
                      <div className="mt-auto">
                        <div className="w-full bg-[#79b2e9] text-white py-2 px-4 rounded-lg hover:bg-[#0d2233] transition-colors inline-flex items-center justify-center">
                          Ver Detalhes
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* No Results */}
              {currentProperties.length === 0 && filteredProperties.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-500 mb-4">
                    <p className="text-lg">Nenhum imóvel encontrado</p>
                    <p className="text-sm">Tente ajustar os filtros de pesquisa</p>
                  </div>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    
                    {/* Page Numbers */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNumber;
                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i;
                      } else {
                        pageNumber = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => paginate(pageNumber)}
                          className={`px-4 py-2 rounded-lg ${
                            currentPage === pageNumber
                              ? 'bg-[#0d2233] text-white'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                    
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <>
                        <span className="px-2 text-gray-500">...</span>
                        <button
                          onClick={() => paginate(totalPages)}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                    
                    <button 
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                  
                  {/* Page Info */}
                  <div className="mt-4 text-center text-sm text-gray-600">
                    Página {currentPage} de {totalPages} ({filteredProperties.length} imóveis no total)
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyListPage;