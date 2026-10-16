import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/OfficeLocation.css';

const MAP_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2243.9630794867862!2d-8.562158927422459!3d41.33518258268864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd245e9a78dfb4b1%3A0xaae8cc0ebff3e01!2sR.%20Dom%20Pedro%20V%201070%2C%204785-308%20Trofa!5e0!3m2!1spt-PT!2spt!4v1792106277704!5m2!1spt-PT!2spt';
const DIRECTIONS_URL = 'https://www.google.com/maps/dir/?api=1&destination=Rua%20Dom%20Pedro%20V%201070%2C%204785-308%20Trofa';

// Escritório da Globalead na Trofa: mapa à esquerda, morada e direções à direita
const OfficeLocation: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="globalead-office-location" aria-labelledby="globalead-office-title">
      <div className="gl-office-container">
        <header className="gl-office-heading">
          <p className="gl-office-label">{t('contactos.escritorio.etiqueta')}</p>
          <h2 id="globalead-office-title">{t('contactos.escritorio.titulo')}</h2>
          <p className="gl-office-intro">{t('contactos.escritorio.intro')}</p>
        </header>

        <div className="gl-office-grid">
          <div className="gl-office-map">
            <iframe
              src={MAP_EMBED_URL}
              width="600"
              height="450"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title={t('contactos.escritorio.mapaTitulo')}
            />
          </div>

          <div className="gl-office-details">
            <span className="gl-office-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18" />
                <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
                <path d="M9 7h1" />
                <path d="M14 7h1" />
                <path d="M9 11h1" />
                <path d="M14 11h1" />
                <path d="M9 15h1" />
                <path d="M14 15h1" />
              </svg>
            </span>

            <span className="gl-office-type">{t('contactos.escritorio.tipo')}</span>
            <h3>Globalead Portugal</h3>
            <address>
              Rua Dom Pedro V, 1070<br />
              4785-308 Trofa
            </address>

            <a
              className="gl-office-directions"
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('contactos.escritorio.direcoesAria')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              {t('contactos.escritorio.direcoes')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfficeLocation;
