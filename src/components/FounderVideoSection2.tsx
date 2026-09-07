import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';

const FounderVideoSection: React.FC = () => {
  const { t } = useTranslation();
  const [videoId, setVideoId] = useState('uVtR70dhKCI'); // horizontal (desktop)

  const youtubeParams = {
    autoplay: 0,
    modestbranding: 1,      // Menos branding do YouTube
    rel: 0,                 // Não mostra vídeos relacionados
    controls: 1,
    showinfo: 0,            // Esconde título e uploader
    iv_load_policy: 3,      // Remove anotações
    disablekb: 0,
    fs: 1,                  // Permite tela cheia
    playsinline: 1,
    origin: window.location.origin,
    widget_referrer: window.location.origin
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // 👉 usa vídeo vertical para mobile
        setVideoId('uVtR70dhKCI'); 
      } else {
        // 👉 usa vídeo horizontal para desktop
        setVideoId('uVtR70dhKCI');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Constrói URL do YouTube
  const getYouTubeUrl = () => {
    const params = new URLSearchParams(youtubeParams as any).toString();
    return `https://www.youtube.com/embed/${videoId}?${params}`;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('comum.porqueGlobalead')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('comum.proximidade')}
          </p>
        </div>

        <div className="relative aspect-[9/16] md:aspect-[16/9] overflow-hidden rounded-lg shadow-xl">
          <iframe
            src={getYouTubeUrl()}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            title={t('comum.videoProximidade')}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default FounderVideoSection;