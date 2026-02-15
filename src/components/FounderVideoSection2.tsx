import React, { useEffect, useState } from 'react';

const FounderVideoSection: React.FC = () => {
  const [videoId, setVideoId] = useState('Zxcho62wY6Q'); // horizontal (desktop)

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
        setVideoId('watch?v=b1mNg-_i6Fo'); 
      } else {
        // 👉 usa vídeo horizontal para desktop
        setVideoId('Zxcho62wY6Q');
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
            Porquê a Globalead Portugal?
          </h2>
          <p className="text-xl text-gray-600">
            Na Globalead, acreditamos que a chave para o sucesso está na proximidade com o cliente.
          </p>
        </div>

        <div className="relative aspect-[9/16] md:aspect-[16/9] overflow-hidden rounded-lg shadow-xl">
          <iframe
            src={getYouTubeUrl()}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            title="Vídeo Globalead - Proximidade com o cliente"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default FounderVideoSection;