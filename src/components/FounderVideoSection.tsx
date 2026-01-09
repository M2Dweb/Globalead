import React, { useEffect, useRef, useState } from 'react';

const FounderVideoSection: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [videoId, setVideoId] = useState('1129541624'); // horizontal (desktop)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // 👉 usa vídeo vertical
        setVideoId('1135324442'); 
      } else {
        // 👉 usa vídeo horizontal
        setVideoId('1129541624');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

          <div className="relative aspect-[9/16] md:aspect-[16/9] overflow-hidden">
            <iframe
              ref={iframeRef}
              src={`https://player.vimeo.com/video/${videoId}?autoplay=0&loop=0&muted=0&title=0&byline=0&portrait=0&badge=0&controls=1`}
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              allow="fullscreen; picture-in-picture"
              allowFullScreen
              title="Vídeo Globalead"
            ></iframe>
          </div> 
      </div>
    </section>
  );
};

export default FounderVideoSection;
