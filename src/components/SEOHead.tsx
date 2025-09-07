import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Globalead Portugal",
  description = "Especialistas em mediação imobiliária, seguros, energia e sistemas de alarme em Portugal. Encontre a sua casa de sonho ou proteja o seu património com a Globalead.",
  keywords = "imóveis, mediação imobiliária, seguros, energia, alarmes, Portugal, Porto, Lisboa, casa, apartamento, moradia",
  image = "/logo.png",
  url = "https://globalead.pt",
  type = "website"
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Globalead Portugal",
    "url": url,
    "logo": `${url}/logo.png`,
    "description": description,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+351915482365",
      "contactType": "customer service",
      "availableLanguage": "Portuguese"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PT"
    },
    "sameAs": [
      "https://www.facebook.com/globalead",
      "https://www.instagram.com/globalead",
      "https://www.linkedin.com/company/globalead"
    ],
    "service": [
      {
        "@type": "Service",
        "name": "Mediação Imobiliária",
        "description": "Compra, venda e arrendamento de imóveis"
      },
      {
        "@type": "Service",
        "name": "Seguros",
        "description": "Seguros automóvel, habitação, vida e saúde"
      },
      {
        "@type": "Service",
        "name": "Energia",
        "description": "Fornecimento de energia elétrica e gás natural"
      },
      {
        "@type": "Service",
        "name": "Sistemas de Alarme",
        "description": "Instalação e monitorização de sistemas de segurança"
      }
    ]
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Globalead Portugal" />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Globalead Portugal" />
      <meta property="og:locale" content="pt_PT" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* PWA */}
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#2563eb" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Globalead" />
      <link rel="apple-touch-icon" href="/logo.png" />
    </Helmet>
  );
};

export default SEOHead;