import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { DEFAULT_LANG, LANG_META, type Lang } from '../i18n/languages';

const SITE_URL = 'https://globalead.pt';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noindex?: boolean;
  /** Idioma da página. Define o <html lang>, o og:locale e o inLanguage. */
  lang?: Lang;
  /** Endereços da mesma página nos outros idiomas, para as etiquetas hreflang. */
  alternates?: { lang: Lang; url: string }[];
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title: titleProp,
  description: descriptionProp,
  keywords: keywordsProp,
  image = '/globalead-logo-background.png',
  url = SITE_URL,
  type = 'website',
  noindex = false,
  lang = DEFAULT_LANG,
  alternates = [],
}) => {
  const { t } = useTranslation();
  const meta = LANG_META[lang];

  const title = titleProp || t('seo.default.title');
  const description = descriptionProp || t('seo.default.description');
  const keywords = keywordsProp || t('seo.default.keywords');
  const absoluteImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'RealEstateAgent',
        '@id': `${SITE_URL}/#organization`,
        name: 'Globalead Portugal',
        url: SITE_URL,
        logo: `${SITE_URL}/globalead-logo-background.png`,
        image: `${SITE_URL}/globalead-logo-background.png`,
        description,
        telephone: '+351910647620',
        priceRange: '€€',
        areaServed: { '@type': 'Country', name: 'Portugal' },
        address: { '@type': 'PostalAddress', addressCountry: 'PT' },
        sameAs: [
          'https://www.facebook.com/globalead',
          'https://www.instagram.com/globalead',
          'https://www.linkedin.com/company/globalead',
        ],
        knowsLanguage: ['pt-PT', 'en'],
        makesOffer: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: t('seo.servMediacao'), description: t('seo.servMediacaoDesc') } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: t('seo.servCredito'), description: t('seo.servCreditoDesc') } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: t('seo.servSeguros'), description: t('seo.servSegurosDesc') } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: t('seo.servCertificacao'), description: t('seo.servCertificacaoDesc') } },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Globalead Portugal',
        description,
        inLanguage: meta.htmlLang,
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <Helmet>
      <html lang={meta.htmlLang} />
      <title>{title}</title>
      <link rel="canonical" href={url} />

      {/* hreflang: diz ao Google que estas páginas são a mesma coisa noutro
          idioma, em vez de conteúdo duplicado. O x-default aponta para o
          português, que é a versão da raiz. */}
      {alternates.map((alt) => (
        <link key={alt.lang} rel="alternate" hrefLang={LANG_META[alt.lang].htmlLang} href={alt.url} />
      ))}
      {alternates
        .filter((alt) => alt.lang === DEFAULT_LANG)
        .map((alt) => (
          <link key="x-default" rel="alternate" hrefLang="x-default" href={alt.url} />
        ))}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="googlebot" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="author" content="Globalead Portugal" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Globalead Portugal" />
      <meta property="og:locale" content={meta.ogLocale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
};

export default SEOHead;
