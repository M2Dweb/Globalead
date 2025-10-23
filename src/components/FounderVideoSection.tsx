import React, { useEffect, useRef } from 'react';

const FounderVideoSection: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://player.vimeo.com/api/player.js';
    script.async = true;
    script.onload = () => {
      if (iframeRef.current) {
        const player = new (window as any).Vimeo.Player(iframeRef.current);

        player.on('ended', () => {
          player.setCurrentTime(0).then(() => {
            player.play();
          });
        });
      }
    };
    document.body.appendChild(script);
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

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative" style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <iframe
              ref={iframeRef}
              src="https://player.vimeo.com/video/1129541624?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              frameBorder="0"
              allow="fullscreen; picture-in-picture"
              allowFullScreen
              title="Vídeo Globalead"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderVideoSection;
