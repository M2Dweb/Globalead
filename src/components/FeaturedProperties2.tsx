import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import PropertyCardSothebys from './PropertyCardSothebys';

const FeaturedProperties2: React.FC = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const TARGET = 6; // mostrar sempre 6 imóveis em destaque

    const isElegible = (p: any) => p && p.availability_status !== 'vendido' && p.type !== 'empreendimento';

    const fetchProperties = async () => {
      try {
        // 1) Propriedades marcadas como destaque (curadas no admin)
        const { data: featuredData } = await supabase
          .from('featured_properties')
          .select(`property_id, properties (*)`)
          .order('position', { ascending: true })
          .limit(TARGET);

        let result: any[] = (featuredData || [])
          .map((item: any) => item.properties)
          .filter(isElegible);

        // 2) Se houver menos de 6, completar com os imóveis mais recentes
        if (result.length < TARGET) {
          const { data: regularData } = await supabase
            .from('properties')
            .select('*')
            .neq('type', 'empreendimento')
            .order('created_at', { ascending: false })
            .limit(TARGET * 3);

          const existingIds = new Set(result.map((p) => p.id));
          for (const p of regularData || []) {
            if (result.length >= TARGET) break;
            if (isElegible(p) && !existingIds.has(p.id)) {
              existingIds.add(p.id);
              result.push(p);
            }
          }
        }

        setProperties(result.slice(0, TARGET));
      } catch (error) {
        console.error('Erro:', error);
        setProperties([]);
      }
      setLoading(false);
    };

    fetchProperties();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho estilo Sotheby's */}
        <div className="section-heading">
          <h2 className="section-heading__title">Imóveis em destaque</h2>
          <span className="section-heading__divider" />
          <span className="section-heading__subtitle">A sua vida começa com uma casa que o inspira</span>
        </div>

        {loading ? (
          <div className="text-center py-12 text-lg text-gray-500">A carregar imóveis...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCardSothebys key={property.id} property={property} variant="imovel" />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <button onClick={() => navigate('/imoveis/lista')} className="btn-outline">
            Todos os Imóveis
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties2;
