import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import PropertyCardSothebys from './PropertyCardSothebys';

const FeaturedEmpreendimentos: React.FC = () => {
  const [empreendimentos, setEmpreendimentos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmpreendimentos = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('type', 'empreendimento')
          .order('created_at', { ascending: false })
          .limit(4);

        if (error) {
          console.error('Erro ao carregar empreendimentos:', error);
          setEmpreendimentos([]);
        } else {
          setEmpreendimentos((data || []).filter((p: any) => p.availability_status !== 'vendido'));
        }
      } catch (error) {
        console.error('Erro ao carregar empreendimentos:', error);
        setEmpreendimentos([]);
      }
      setLoading(false);
    };

    fetchEmpreendimentos();
  }, []);

  // Não mostra a secção se não houver empreendimentos
  if (!loading && empreendimentos.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho estilo Sotheby's */}
        <div className="section-heading">
          <h2 className="section-heading__title">Empreendimentos em destaque</h2>
          <span className="section-heading__divider" />
          <span className="section-heading__subtitle">Descubra empreendimentos únicos</span>
        </div>

        {loading ? (
          <div className="text-center py-12 text-lg text-gray-500">A carregar empreendimentos...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {empreendimentos.map((property) => (
              <PropertyCardSothebys key={property.id} property={property} variant="empreendimento" />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate('/imoveis/lista?tipo=empreendimento')}
            className="btn-outline"
          >
            Todos os empreendimentos
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEmpreendimentos;
