import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Bed, Bath, Square, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import ContentRenderer from './ContentRenderer';

const FeaturedProperties: React.FC = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const propertiesPerPage = 3;
  const indexOfLast = currentPage * propertiesPerPage;
  const indexOfFirst = indexOfLast - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  const handlePrevPage = () => currentPage > 1 && setCurrentPage((prev) => prev - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage((prev) => prev + 1);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .limit(12)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Erro ao carregar propriedades:', error);
          // fallback data
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
            {currentProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
                onClick={() => navigate(`/imoveis/${property.id}`)}
              >
                <img src={property.images[0]} alt={property.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                  <div className="flex items-center space-x-4 text-gray-600 mb-4">
                    <div className="flex items-center"><Bed className="h-4 w-4 mr-1" />{property.bedrooms}</div>
                    <div className="flex items-center"><Bath className="h-4 w-4 mr-1" />{property.bathrooms}</div>
                    <div className="flex items-center"><Square className="h-4 w-4 mr-1" />{property.area}m²</div>
                    <div className="flex items-center"><MapPin className="h-4 w-4 mr-1" />{property.location}</div>
                  </div>
                  <div className="text-gray-600 mb-6 text-sm line-clamp-3">
                    <ContentRenderer content={property.description || ''} />
                  </div>
                  <button
                    className="w-full bg-[#79b2e9] text-white py-2 px-4 rounded-lg hover:bg-[#0d2233] transition"
                    onClick={() => navigate(`/imoveis/${property.id}`)}
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Paginação + Ver todos */}
        <div className="flex justify-center items-center mt-12 flex-col md:flex-row gap-6">
          <div className="flex items-center space-x-2">
            <button className="p-2 border rounded-lg disabled:opacity-50" onClick={handlePrevPage} disabled={currentPage === 1}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === i + 1 ? "bg-[#79b2e9] text-white" : "border"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button className="p-2 border rounded-lg disabled:opacity-50" onClick={handleNextPage} disabled={currentPage === totalPages}>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
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
