import React, { useEffect, useState } from 'react';
import { MapPin, Bed, Bath, Square, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import ContentRenderer from './ContentRenderer';
import StatusBadge from './StatusBadge'; // Import do badge

const FeaturedProperties: React.FC = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Primeiro tenta buscar propriedades em destaque
        const { data: featuredData, error: featuredError } = await supabase
          .from('featured_properties')
          .select(`
            property_id,
            properties (*)
          `)
          .order('position', { ascending: true })
          .limit(6);

        let allProperties = [];

        if (featuredError || !featuredData || featuredData.length === 0) {
          console.log('Nenhuma propriedade em destaque encontrada, buscando propriedades regulares...');
          // Se não houver propriedades em destaque, busca as últimas 6 propriedades
          const { data: regularData, error: regularError } = await supabase
            .from('properties')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(6);
          
          if (regularError) {
            throw new Error('Erro ao buscar propriedades regulares');
          }
          
          allProperties = regularData || [];
        } else {
          // Extrair as propriedades do resultado das destacadas
          allProperties = featuredData
            .map(item => item.properties)
            .filter(Boolean);
          
          // Se tivermos menos de 6 propriedades destacadas, completar com propriedades regulares
          if (allProperties.length < 6) {
            console.log(`Apenas ${allProperties.length} propriedades em destaque, completando com regulares...`);
            
            // Buscar mais propriedades para completar até 6
            const { data: additionalData, error: additionalError } = await supabase
              .from('properties')
              .select('*')
              .not('id', 'in', `(${allProperties.map(p => p.id).join(',')})`)
              .order('created_at', { ascending: false })
              .limit(6 - allProperties.length);
            
            if (!additionalError && additionalData) {
              allProperties = [...allProperties, ...additionalData];
            }
          }
        }

        // Se ainda tivermos menos de 6 propriedades, usar dados estáticos
        if (allProperties.length < 6) {
          console.log(`Apenas ${allProperties.length} propriedades encontradas, usando dados estáticos para completar...`);
          
          const staticProperties = [
            {
              id: 1,
              title: "Empreendimento Noval Park",
              price: 432600,
              bedrooms: 3,
              bathrooms: 2,
              area: 145,
              location: "Vila Nova de Gaia",
              images: ["https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800"]
            },
            {
              id: 2,
              title: "Apartamento T2 Moderno",
              price: 280000,
              bedrooms: 2,
              bathrooms: 1,
              area: 85,
              location: "Cedofeita, Porto",
              images: ["https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800"]
            },
            {
              id: 3,
              title: "Moradia T4 com Jardim",
              price: 520000,
              bedrooms: 4,
              bathrooms: 3,
              area: 200,
              location: "Matosinhos, Porto",
              images: ["https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800"]
            },
            {
              id: 4,
              title: "Apartamento T1 Centro",
              price: 185000,
              bedrooms: 1,
              bathrooms: 1,
              area: 65,
              location: "Baixa do Porto",
              images: ["https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800"]
            },
            {
              id: 5,
              title: "Moradia T3 com Piscina",
              price: 650000,
              bedrooms: 3,
              bathrooms: 2,
              area: 180,
              location: "Foz do Douro",
              images: ["https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800"]
            },
            {
              id: 6,
              title: "Loft T1 Industrial",
              price: 320000,
              bedrooms: 1,
              bathrooms: 1,
              area: 95,
              location: "Bonfim, Porto",
              images: ["https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800"]
            }
          ];

          // Combinar propriedades reais com estáticas para ter sempre 6
          const needed = 6 - allProperties.length;
          allProperties = [
            ...allProperties,
            ...staticProperties.slice(0, needed).map((prop, index) => ({
              ...prop,
              id: prop.id + 1000 + index // IDs diferentes para evitar conflitos
            }))
          ];
        }

        // Limitar a 6 propriedades
        allProperties = allProperties.slice(0, 6);
        
        console.log(`Total de propriedades carregadas: ${allProperties.length}`);
        setProperties(allProperties);

      } catch (error) {
        console.error('Erro ao carregar propriedades:', error);
        // Usar dados estáticos em caso de erro
        setProperties([
          {
            id: 1,
            title: "Empreendimento Noval Park",
            price: 432600,
            bedrooms: 3,
            bathrooms: 2,
            area: 145,
            location: "Vila Nova de Gaia",
            images: ["https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800"]
          },
          {
            id: 2,
            title: "Apartamento T2 Moderno",
            price: 280000,
            bedrooms: 2,
            bathrooms: 1,
            area: 85,
            location: "Cedofeita, Porto",
            images: ["https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800"]
          },
          {
            id: 3,
            title: "Moradia T4 com Jardim",
            price: 520000,
            bedrooms: 4,
            bathrooms: 3,
            area: 200,
            location: "Matosinhos, Porto",
            images: ["https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800"]
          },
          {
            id: 4,
            title: "Apartamento T1 Centro",
            price: 185000,
            bedrooms: 1,
            bathrooms: 1,
            area: 65,
            location: "Baixa do Porto",
            images: ["https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800"]
          },
          {
            id: 5,
            title: "Moradia T3 com Piscina",
            price: 650000,
            bedrooms: 3,
            bathrooms: 2,
            area: 180,
            location: "Foz do Douro",
            images: ["https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800"]
          },
          {
            id: 6,
            title: "Loft T1 Industrial",
            price: 320000,
            bedrooms: 1,
            bathrooms: 1,
            area: 95,
            location: "Bonfim, Porto",
            images: ["https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800"]
          }
        ]);
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer flex flex-col h-full"
                onClick={() => navigate(`/imoveis/${property.ref || property.id}`)}
              >
                <img 
                  src={property.images?.[0] || '/placeholder.jpg'} 
                  alt={property.title} 
                  className="w-full h-48 object-cover"
                />
                
                <div className="p-6 flex flex-col flex-grow">
                  {/* Linha com tipo e status - lado a lado */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {getPropertyTypeLabel(property.type)}
                    </span>
                    <StatusBadge status={property.availability_status || 'disponivel'} />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                    {property.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-gray-600 mb-4 text-sm">
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

                  <div className="text-2xl font-bold text-[#79b2e9] mb-4">
                    {new Intl.NumberFormat('pt-PT', {
                      style: 'currency',
                      currency: 'EUR',
                      maximumFractionDigits: 0
                    }).format(property.price)}
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

export default FeaturedProperties;