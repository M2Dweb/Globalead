import React, { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

const FounderVideoSection: React.FC = () => {
  const [founderVideoUrl, setFounderVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('founder_video_url')
          .single();

        if (error) {
          console.error('Erro ao carregar configurações:', error);
        }

        if (data && data.founder_video_url) {
          setFounderVideoUrl(data.founder_video_url);
        }
      } catch (error) {
        console.error('Erro inesperado ao carregar configurações:', error);
      }
    };

    fetchSiteSettings();
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Porquê a Globalead Portugal ?
          </h2>
          <p className="text-xl text-gray-600">
            Na Globalead, acreditamos que a chave para o sucesso está na proximidade com o cliente.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative">
            {founderVideoUrl ? (
              <video
                controls
                playsInline
                muted
                className="w-full h-full object-fill"
                poster="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800"
              >
                <source src={founderVideoUrl} type="video/mp4" />
              </video>
            ) : (
              <>
                <img
                  src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Fundador da Globalead"
                  className="w-full h-64 object-cover"
                />
                <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-60 transition-all duration-300 group">
                  <div className="bg-white rounded-full p-6 group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-12 w-12 text-[#0d2233] ml-1" />
                  </div>
                </button>
              </>
            )}
          </div>
          <div className="p-8 text-center">
            <Link to="/carlos-goncalves" className="text-2xl font-bold text-gray-900 mb-12 hover:underline">
              Carlos Gonçalves - Fundador & CEO
            </Link>
            <p className="text-gray-600 mt-2">
              "Na Globalead, acreditamos que cada cliente merece um atendimento personalizado e de excelência. A nossa missão é tornar simples processos complexos, assegurando que encontra sempre a melhor solução, de forma eficaz e eficiente."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderVideoSection;
