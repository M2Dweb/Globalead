import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { imageUrl, onImageCdnError } from '../lib/imageUrl';
import '../styles/VideoPortfolioCarousel.css';

// Vídeos dos anúncios (R2). videoUrl também aceita links do YouTube
// (watch, shorts, youtu.be ou só o ID): sem poster, usa a miniatura do YouTube.
const R2 = 'https://pub-5f573f26090442adbdeb6739a1e97fa9.r2.dev';
const VIDEOS = [
  {
    // GL-014
    videoUrl: `${R2}/properties/videos/1791591487007.mp4`,
    poster: `${R2}/properties/video-posters/1791591520891.jpg`,
    titleKey: 'moradiaT3',
    subtitle: 'Custóias, Matosinhos'
  },
  {
    // GL-008
    videoUrl: `${R2}/videos/VIDEO%20CARLOS%202%20(3).mp4`,
    poster: `${R2}/properties/video-posters/1788636776322.jpg`,
    titleKey: 'restauranteGengibre',
    subtitle: 'Santo Tirso'
  },
  {
    // GL-012
    videoUrl: `${R2}/properties/videos/1784034793903_0.mp4`,
    poster: `${R2}/properties/video-posters/1784035125848.jpg`,
    titleKey: 'moradiaPiscina',
    subtitle: 'Azurém, Guimarães'
  },
  {
    // GL-010
    videoUrl: `${R2}/properties/videos/1783089907223_0.mp4`,
    poster: `${R2}/properties/video-posters/1784036292846.jpg`,
    titleKey: 'moradiaT4',
    subtitle: 'Gião, Vila do Conde'
  },
  {
    // GL-011
    videoUrl: `${R2}/properties/videos/1783089178804_0.mp4`,
    poster: `${R2}/properties/video-posters/1784035564555.jpg`,
    titleKey: 'apartamentoT2',
    subtitle: 'Vila das Aves, Santo Tirso'
  },
  {
    // GL-013
    videoUrl: `${R2}/properties/videos/1787596889910_0.mp4`,
    poster: `${R2}/properties/video-posters/1787597203919.jpg`,
    titleKey: 'apartamentoT2',
    subtitle: 'Moreira, Maia'
  }
];

const getYouTubeId = (value: string): string | null => {
  const input = value.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;

  try {
    const url = new URL(input);
    const host = url.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      return url.pathname.split('/').filter(Boolean)[0] || null;
    }

    if (host.endsWith('youtube.com')) {
      const segments = url.pathname.split('/').filter(Boolean);
      for (const marker of ['shorts', 'embed']) {
        const at = segments.indexOf(marker);
        if (at >= 0 && segments[at + 1]) return segments[at + 1];
      }
      return url.searchParams.get('v');
    }
  } catch {
    return null;
  }

  return null;
};

const pad = (n: number) => String(n).padStart(2, '0');

const VideoPortfolioCarousel: React.FC = () => {
  const { t } = useTranslation();
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const touchStartX = useRef(0);

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(3);
  const [step, setStep] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const videos = VIDEOS.map((video) => ({
    ...video,
    title: t(`imoveis.videos.${video.titleKey}`)
  }));

  const maxIndex = Math.max(0, videos.length - visible);
  const current = Math.min(index, maxIndex);

  // Quantos cartões cabem vem do CSS (--glvc-visible); o passo é a largura
  // de um cartão mais o espaço entre cartões.
  useEffect(() => {
    const measure = () => {
      const root = rootRef.current;
      const track = trackRef.current;
      if (!root || !track) return;

      setVisible(Number.parseInt(getComputedStyle(root).getPropertyValue('--glvc-visible'), 10) || 1);
      const first = track.firstElementChild as HTMLElement | null;
      const gap = Number.parseFloat(getComputedStyle(track).gap) || 0;
      setStep(first ? first.getBoundingClientRect().width + gap : 0);
    };

    measure();
    let frame = 0;
    const onResize = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(measure);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const goTo = (next: number) => setIndex(Math.min(Math.max(next, 0), maxIndex));

  const openVideo = (videoIndex: number, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    setOpenIndex(videoIndex);
  };

  const closeVideo = () => setOpenIndex(null);

  // Com o vídeo aberto: bloqueia o scroll da página e fecha com Escape.
  // Ao fechar, o foco volta ao cartão que abriu o vídeo.
  useEffect(() => {
    if (openIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenIndex(null);
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      lastTriggerRef.current?.focus();
    };
  }, [openIndex]);

  const openedVideo = openIndex !== null ? videos[openIndex] : null;
  const openedYouTubeId = openedVideo ? getYouTubeId(openedVideo.videoUrl) : null;

  return (
    <section id="globalead-video-carousel" ref={rootRef} aria-labelledby="glvc-heading-title">
      <div className="glvc-section">
        <div className="glvc-inner">
          <div className="glvc-heading">
            <div>
              <p className="glvc-eyebrow">{t('imoveis.videos.etiqueta')}</p>
              <h2 className="glvc-title" id="glvc-heading-title">{t('imoveis.videos.titulo')}</h2>
              <p className="glvc-intro">{t('imoveis.videos.intro')}</p>
            </div>

            <div className="glvc-navigation" aria-label={t('imoveis.videos.navegacao')}>
              <button
                className="glvc-arrow"
                type="button"
                onClick={() => goTo(current - 1)}
                disabled={current === 0}
                aria-label={t('imoveis.videos.anteriores')}
              >
                ←
              </button>
              <button
                className="glvc-arrow"
                type="button"
                onClick={() => goTo(current + 1)}
                disabled={current === maxIndex}
                aria-label={t('imoveis.videos.seguintes')}
              >
                →
              </button>
            </div>
          </div>

          <div
            className="glvc-viewport"
            onTouchStart={(e) => { touchStartX.current = e.changedTouches[0].clientX; }}
            onTouchEnd={(e) => {
              const distance = e.changedTouches[0].clientX - touchStartX.current;
              if (Math.abs(distance) < 45) return;
              goTo(current + (distance < 0 ? 1 : -1));
            }}
          >
            <div
              className="glvc-track"
              ref={trackRef}
              style={{ transform: `translate3d(-${current * step}px, 0, 0)` }}
            >
              {videos.map((video, videoIndex) => {
                const youtubeId = getYouTubeId(video.videoUrl);
                const poster = video.poster
                  ? imageUrl(video.poster)
                  : youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg` : '';

                return (
                  <button
                    key={videoIndex}
                    className="glvc-video"
                    type="button"
                    onClick={(e) => openVideo(videoIndex, e.currentTarget)}
                    aria-label={t('imoveis.videos.verVideo', { titulo: video.title, local: video.subtitle })}
                  >
                    {poster && (
                      <img
                        className="glvc-video-image"
                        src={poster}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        onError={onImageCdnError}
                      />
                    )}
                    <span className="glvc-video-overlay" aria-hidden="true" />
                    <span className="glvc-video-copy">
                      <strong className="glvc-video-title">{video.title}</strong>
                      <span className="glvc-video-subtitle">{video.subtitle}</span>
                    </span>
                    <span className="glvc-play" aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="glvc-footer">
            <div className="glvc-dots" aria-hidden="true">
              {Array.from({ length: maxIndex + 1 }, (_, dotIndex) => (
                <span key={dotIndex} className={`glvc-dot${dotIndex === current ? ' is-active' : ''}`} />
              ))}
            </div>
            <div className="glvc-counter" aria-live="polite">
              <strong>{pad(current + 1)}</strong> / <span>{pad(videos.length)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Portal no <body>: o position: fixed não fica preso a nenhum contentor da página */}
      {openedVideo && createPortal(
        <div
          className="glvc-modal"
          onClick={(e) => { if (e.target === e.currentTarget) closeVideo(); }}
        >
          <div className="glvc-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="glvc-modal-title">
            <div className="glvc-player">
              {openedYouTubeId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${openedYouTubeId}?autoplay=1&rel=0&playsinline=1`}
                  title={`${openedVideo.title}, ${openedVideo.subtitle}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <video
                  src={openedVideo.videoUrl}
                  poster={openedVideo.poster}
                  controls
                  autoPlay
                  playsInline
                />
              )}
            </div>

            <div className="glvc-modal-copy">
              <span className="glvc-modal-label">{t('imoveis.videos.videoCompleto')}</span>
              <h3 className="glvc-modal-title" id="glvc-modal-title">{openedVideo.title}</h3>
              <p className="glvc-modal-location">{openedVideo.subtitle}</p>
              <button className="glvc-modal-close" type="button" ref={closeRef} onClick={closeVideo}>
                {t('imoveis.videos.fechar')}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default VideoPortfolioCarousel;
