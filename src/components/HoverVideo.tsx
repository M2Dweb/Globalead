import React, { useRef, useState } from 'react';
import { Play } from 'lucide-react';

interface HoverVideoProps {
  src: string;
  poster?: string;
}

/**
 * Vídeo vertical estilo saw.gg:
 * - Mostra apenas a capa (poster) até haver interação — preload="none" para não pesar no site.
 * - Ao passar o rato, arranca uma pré-visualização sem som (loop).
 * - Ao sair com o rato, volta à capa.
 * - Ao clicar, "abre" o vídeo (com som e controlos) e deixa de reagir ao rato.
 */
const HoverVideo: React.FC<HoverVideoProps> = ({ src, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activated, setActivated] = useState(false);

  const handleEnter = () => {
    if (activated) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  };

  const handleLeave = () => {
    if (activated) return;
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  const handleClick = () => {
    if (activated) return;
    const v = videoRef.current;
    if (!v) return;
    setActivated(true);
    v.muted = false;
    v.currentTime = 0;
    v.play().catch(() => {});
  };

  return (
    <div
      className="absolute inset-0 cursor-pointer group"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        muted={!activated}
        loop={!activated}
        playsInline
        preload="none"
        controls={activated}
        title="Vídeo de Apresentação"
      />
      {!activated && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/0 pointer-events-none">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/85 shadow-lg transition-transform group-hover:scale-110">
            <Play className="h-7 w-7 translate-x-0.5 text-[#0d2233]" fill="currentColor" />
          </div>
        </div>
      )}
    </div>
  );
};

export default HoverVideo;
