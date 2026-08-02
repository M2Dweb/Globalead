import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import PropertyCardSothebys from './PropertyCardSothebys';

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
          // Fallback para últimas propriedades (exclui empreendimentos — têm secção própria)
          const { data: regularData } = await supabase
            .from('properties')
            .select('*')
            .neq('type', 'empreendimento')
            .limit(6)
            .order('created_at', { ascending: false });

          setProperties((regularData || []).filter((p: any) => p.availability_status !== 'vendido'));
        } else {
          const featuredProperties = featuredData
            .map((item) => item.properties)
            .filter(Boolean)
            .filter((p: any) => p.availability_status !== 'vendido' && p.type !== 'empreendimento');
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
