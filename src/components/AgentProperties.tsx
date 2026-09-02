import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import PropertyCardSothebys from './PropertyCardSothebys';

type Mode = 'ativos' | 'vendidos';

interface AgentPropertiesProps {
  /** 'ativos' → ainda no mercado (inclui reservados); 'vendidos' → já vendidos. */
  mode: Mode;
  title: string;
  subtitle?: string;
  limit?: number;
  /** Classe de fundo, para alternar as secções da página. */
  background?: string;
}

/**
 * Carteira de imóveis mostrada na página do consultor (/carlos-goncalves).
 *
 * É o que a página de agente da RE/MAX tem e faltava aqui: quem chega à
 * landing page vê logo o que ele tem à venda e o que já vendeu, sem ter de
 * saltar para o catálogo.
 */
const AgentProperties: React.FC<AgentPropertiesProps> = ({
  mode,
  title,
  subtitle,
  limit = 6,
  background = 'bg-white',
}) => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // is_published: anúncios escondidos no /admin não aparecem aqui,
        // tal como já acontece no catálogo e nos destaques.
        let query = supabase
          .from('properties')
          .select('*')
          .eq('is_published', true)
          .order('created_at', { ascending: false })
          .limit(limit);

        query =
          mode === 'vendidos'
            ? query.eq('availability_status', 'vendido')
            : query.or('availability_status.is.null,availability_status.neq.vendido');

        const { data, error } = await query;
        if (error) throw error;
        setProperties(data || []);
      } catch (error) {
        console.error('Erro ao carregar imóveis do consultor:', error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [mode, limit]);

  // Enquanto não houver vendas registadas, a secção não aparece de todo —
  // vale mais não a mostrar do que mostrá-la vazia.
  if (!loading && properties.length === 0) return null;

  return (
    <section className={`py-16 sm:py-20 ${background}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-heading">
          <h2 className="section-heading__title">{title}</h2>
          <span className="section-heading__divider" />
          {subtitle && <span className="section-heading__subtitle">{subtitle}</span>}
        </div>

        {loading ? (
          <div className="text-center py-12 text-lg text-gray-500">A carregar imóveis...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCardSothebys
                key={property.id}
                property={property}
                variant={property.type === 'empreendimento' ? 'empreendimento' : 'imovel'}
              />
            ))}
          </div>
        )}

        {mode === 'ativos' && !loading && (
          <div className="flex justify-center mt-12">
            <button onClick={() => navigate('/imoveis/lista')} className="btn-outline">
              Ver todos os imóveis
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AgentProperties;
