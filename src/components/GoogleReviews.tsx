import React from 'react';
import { useTranslation } from 'react-i18next';
import { dateLocaleFor } from '../i18n/languages';
import '../styles/GoogleReviews.css';

// Valores do perfil da Globalead no Google, atualizados à mão.
const NOTA = 5;
const AVALIACOES = 9;
// Abre a pesquisa da Globalead no Google Maps. Trocar pelo link direto do
// perfil (Perfil da Empresa no Google > Partilhar perfil) quando o houver.
const GOOGLE_REVIEWS_URL = 'https://www.google.com/maps/search/?api=1&query=Globalead%20Portugal';

const GoogleReviews: React.FC = () => {
  const { t, i18n } = useTranslation();
  const nota = NOTA.toLocaleString(dateLocaleFor(i18n.language), {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });

  return (
    <section className="gl-google-reviews" aria-labelledby="gl-google-reviews-title">
      <div className="gl-google-reviews__container">
        <div className="gl-google-reviews__content">
          <div>
            <p className="gl-google-reviews__eyebrow">{t('sobre.avaliacoes.etiqueta')}</p>
            <h2 className="gl-google-reviews__title" id="gl-google-reviews-title">
              {t('sobre.avaliacoes.titulo')}
            </h2>
            <p className="gl-google-reviews__description">{t('sobre.avaliacoes.texto')}</p>
          </div>

          <span className="gl-google-reviews__separator" aria-hidden="true" />

          <div
            className="gl-google-reviews__rating"
            role="group"
            aria-label={t('sobre.avaliacoes.classificacao', { nota, count: AVALIACOES })}
          >
            <strong className="gl-google-reviews__score">{nota}</strong>
            <span className="gl-google-reviews__stars" aria-hidden="true">★★★★★</span>
            <span className="gl-google-reviews__count">
              {t('sobre.avaliacoes.contagem', { count: AVALIACOES })}
            </span>

            <div className="gl-google-reviews__source">
              <div className="gl-google-reviews__google">
                <span className="gl-google-reviews__google-mark" aria-hidden="true">G</span>
                <span>
                  Google
                  <small>{t('sobre.avaliacoes.perfilOficial')}</small>
                </span>
              </div>

              <a
                className="gl-google-reviews__link"
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('sobre.avaliacoes.ver')} ↗
              </a>
            </div>
          </div>
        </div>

        <div className="gl-google-reviews__assurance">{t('sobre.avaliacoes.garantia')}</div>
      </div>
    </section>
  );
};

export default GoogleReviews;
