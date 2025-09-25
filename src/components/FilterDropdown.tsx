import React, { useState } from 'react';
import { ChevronDown, ListFilter as Filter, X } from 'lucide-react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface FilterDropdownProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  bedrooms: string;
  setBedrooms: (bedrooms: string) => void;
  bathrooms: string;
  setBathrooms: (bathrooms: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
  selectedFeatures: string[];
  setSelectedFeatures: (features: string[]) => void;
  energyClass: string;
  setEnergyClass: (energyClass: string) => void;
  areaRange: [number, number];
  setAreaRange: (range: [number, number]) => void;
  onClearFilters: () => void;
}

// Componente separado para evitar re-renderizações desnecessárias
const FilterContent: React.FC<FilterDropdownProps> = ({
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
  priceRange,
  setPriceRange,
  bedrooms,
  setBedrooms,
  bathrooms,
  setBathrooms,
  selectedDistrict,
  setSelectedDistrict,
  selectedState,
  setSelectedState,
  selectedFeatures,
  setSelectedFeatures,
  energyClass,
  setEnergyClass,
  areaRange,
  setAreaRange
}) => {
  const districts = [
    'Aveiro', 'Beja', 'Braga', 'Bragança', 'Castelo Branco', 'Coimbra',
    'Évora', 'Faro', 'Guarda', 'Leiria', 'Lisboa', 'Portalegre',
    'Porto', 'Santarém', 'Setúbal', 'Viana do Castelo', 'Vila Real', 'Viseu'
  ];

  const propertyTypes = [
    { value: 'apartamento', label: 'Apartamento' },
    { value: 'moradia', label: 'Moradia' },
    { value: 'terreno', label: 'Terreno' },
    { value: 'escritorio', label: 'Escritório' },
    { value: 'loja', label: 'Loja' },
    { value: 'armazem', label: 'Armazém' },
    { value: 'quinta', label: 'Quinta' },
    { value: 'predio', label: 'Prédio' }
  ];

  const propertyStates = [
    { value: 'novo', label: 'Novo' },
    { value: 'usado', label: 'Usado' },
    { value: 'em_construcao', label: 'Em Construção' },
    { value: 'para_remodelar', label: 'Para Remodelar' }
  ];

  const features = [
    'Garagem', 'Jardim', 'Piscina', 'Varanda', 'Elevador', 
    'Ar Condicionado', 'Cozinha Equipada', 'Vista Mar', 
    'Terraço', 'Lareira', 'Aquecimento Central'
  ];

  const energyClasses = ['A+', 'A', 'B', 'B-', 'C', 'D', 'E', 'F'];

  const handleFeatureToggle = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPriceRange([value[0], value[1]]);
    }
  };

  const handleAreaChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setAreaRange([value[0], value[1]]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pesquisar
        </label>
        <input
          type="text"
          placeholder="Localização, título..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#79b2e9]"
        />
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de Imóvel
        </label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#79b2e9]"
        >
          <option value="all">Todos os tipos</option>
          {propertyTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </div>

      {/* District */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Distrito
        </label>
        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#79b2e9]"
        >
          <option value="all">Todos os distritos</option>
          {districts.map(district => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preço: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
        </label>
        <div className="px-2 py-4">
          <Slider
            range
            min={0}
            max={1000000}
            step={5000}
            value={priceRange}
            onChange={handlePriceChange}
            trackStyle={[{ backgroundColor: '#79b2e9' }]}
            handleStyle={[
              { borderColor: '#79b2e9', backgroundColor: '#79b2e9' },
              { borderColor: '#79b2e9', backgroundColor: '#79b2e9' }
            ]}
            railStyle={{ backgroundColor: '#e5e7eb' }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>€0</span>
            <span>€1M</span>
          </div>
        </div>
      </div>

      {/* Area Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Área: {areaRange[0]}m² - {areaRange[1]}m²
        </label>
        <div className="px-2 py-4">
          <Slider
            range
            min={0}
            max={500}
            step={1}
            value={areaRange}
            onChange={handleAreaChange}
            trackStyle={[{ backgroundColor: '#79b2e9' }]}
            handleStyle={[
              { borderColor: '#79b2e9', backgroundColor: '#79b2e9' },
              { borderColor: '#79b2e9', backgroundColor: '#79b2e9' }
            ]}
            railStyle={{ backgroundColor: '#e5e7eb' }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>0m²</span>
            <span>500m²</span>
          </div>
        </div>
      </div>

      {/* Bedrooms and Bathrooms */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quartos
          </label>
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#79b2e9]"
          >
            <option value="all">Qualquer</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Casas de Banho
          </label>
          <select
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#79b2e9]"
          >
            <option value="all">Qualquer</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </select>
        </div>
      </div>

      {/* Property State */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Estado do Imóvel
        </label>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#79b2e9]"
        >
          <option value="all">Qualquer estado</option>
          {propertyStates.map(state => (
            <option key={state.value} value={state.value}>{state.label}</option>
          ))}
        </select>
      </div>

      {/* Energy Class */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Classe Energética
        </label>
        <select
          value={energyClass}
          onChange={(e) => setEnergyClass(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#79b2e9]"
        >
          <option value="all">Qualquer classe</option>
          {energyClasses.map(cls => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>
      </div>

      {/* Features */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Características
        </label>
        <div className="grid grid-cols-1 gap-2">
          {features.map(feature => (
            <label key={feature} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedFeatures.includes(feature)}
                onChange={() => handleFeatureToggle(feature)}
                className="mr-2 text-[#79b2e9] focus:ring-[#79b2e9]"
              />
              <span className="text-sm text-gray-700">{feature}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

const FilterDropdown: React.FC<FilterDropdownProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const getActiveFiltersCount = () => {
    let count = 0;
    if (props.searchTerm) count++;
    if (props.selectedType !== 'all') count++;
    if (props.priceRange[0] > 0 || props.priceRange[1] < 1000000) count++;
    if (props.bedrooms !== 'all') count++;
    if (props.bathrooms !== 'all') count++;
    if (props.selectedDistrict !== 'all') count++;
    if (props.selectedState !== 'all') count++;
    if (props.selectedFeatures.length > 0) count++;
    if (props.energyClass !== 'all') count++;
    if (props.areaRange[0] > 0 || props.areaRange[1] < 500) count++;
    return count;
  };

  return (
    <div className="relative">
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-full bg-[#0d2233] text-white px-4 py-3 rounded-lg flex items-center justify-between"
      >
        <div className="flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          <span>Filtros</span>
          {getActiveFiltersCount() > 0 && (
            <span className="ml-2 bg-[#79b2e9] text-white text-xs px-2 py-1 rounded-full">
              {getActiveFiltersCount()}
            </span>
          )}
        </div>
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Desktop Filters - Always Visible */}
      <div className="hidden md:block">
        <div className="bg-white p-4 rounded-xl shadow-lg max-w-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
            {getActiveFiltersCount() > 0 && (
              <button
                onClick={props.onClearFilters}
                className="text-[#79b2e9] hover:text-[#0d2233] text-sm flex items-center"
              >
                <X className="h-4 w-4 mr-1" />
                Limpar ({getActiveFiltersCount()})
              </button>
            )}
          </div>
          <FilterContent {...props} />
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-lg shadow-xl mt-2 max-h-96 overflow-y-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
              <div className="flex items-center space-x-2">
                {getActiveFiltersCount() > 0 && (
                  <button
                    onClick={props.onClearFilters}
                    className="text-[#79b2e9] hover:text-[#0d2233] text-sm flex items-center"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Limpar ({getActiveFiltersCount()})
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <FilterContent {...props} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;