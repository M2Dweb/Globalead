import React, { useEffect, useState } from 'react';
import { MapPin, Bed, Bath, Square, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import ContentRenderer from './ContentRenderer';
import StatusBadge from './StatusBadge';

const FeaturedProperties2: React.FC = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Buscar propriedades em destaque
        const { data: featuredData, error: featuredError } = await supabase
          .from('featured_properties')
          .select(`
            property_id,
            properties (*)
          `)
          .order('position', { ascending: true })
          .limit(6);

        if (featuredError || !featuredData || featuredData.length === 0) {
          // Fallback para últimas propriedades
          const { data: regularData } = await supabase
            .from('properties')
            .select('*')
            .limit(6)
            .order('created_at', { ascending: false });
          
          setProperties(regularData || []);
        } else {
          const featuredProperties = featuredData
            .map(item => item.properties)
            .filter(Boolean);
          setProperties(featuredProperties);
        }
      } catch (error) {
        console.error('Erro:', error);
        setProperties([]);
      }
      setLoading(false);
    };

    fetchProperties();
  }, []);

  const getPropertyTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      apartamento: 'Apartamento',
      moradia: 'Moradia',
      terreno: 'Terreno',
      empreendimento: 'Empreendimento'
    };
    return types[type] || type;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Visite o seu próximo lar de sonho
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-12 text-xl text-gray-600">A carregar imóveis...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer flex flex-col h-full"
                onClick={() => navigate(`/imoveis/${property.ref || property.id}`)}
              >
                <div className="relative">
                  <img 
                    src={property.images?.[0] || '/placeholder.jpg'} 
                    alt={property.title} 
                    className="w-full h-48 object-cover"
                  />
                  
                  {/* Badge de estado - esquerda (sempre visível se tiver status) */}
                  {property.availability_status && (
                    <div className="absolute top-4 left-4">
                      <StatusBadge status={property.availability_status} />
                    </div>
                  )}

                  {/* Tipo do imóvel - direita (sempre visível) */}
                  <div className="absolute top-4 right-4 bg-[#79b2e9] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {getPropertyTypeLabel(property.type)}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  {/* SEM PREÇO - estilo original */}

                  <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2 min-h-[3.5rem]">
                    {property.title}
                  </h3>

                  <div className="flex flex-wrap items-center justify-center gap-3 text-gray-600 mb-4 text-sm">
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

                  {/* Descrição */}
                  <div className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow min-h-[4.5rem]">
                    <ContentRenderer content={property.description || ''} />
                  </div>

                  <button
                    className="w-full bg-[#79b2e9] text-white py-2 px-4 rounded-lg hover:bg-[#0d2233] transition mt-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/imoveis/${property.ref || property.id}`);
                    }}
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center items-center mt-12">
          <button
            onClick={() => navigate("/imoveis/lista")}
            className="bg-[#79b2e9] text-white px-8 py-3 rounded-lg hover:bg-[#0d2233] transition font-semibold inline-flex items-center"
          >
            Ver Todos
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties2;