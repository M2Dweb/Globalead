import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Breadcrumbs from './components/Breadcrumbs';
import StickyCtaButton from './components/StickyCtaButton';
import SEOHead from './components/SEOHead';
import CookieBanner from './components/CookieBanner';
import LoadingSpinner from './components/LoadingSpinner';
import PreferencePopup from './components/PreferencePopup';
import MediaProtection from './components/MediaProtection';
import MaintenancePage from './pages/MaintenancePage';
import i18n from './i18n';
import {
  LANGUAGES,
  basenameFor,
  getLangFromPathname,
  pathForLang,
} from './i18n/languages';

// pages (lazy-loaded para reduzir o bundle inicial e acelerar o carregamento)
const HomePage = lazy(() => import('./pages/HomePage'));
const SobrePage = lazy(() => import('./pages/SobrePage'));
const ImoveisPage = lazy(() => import('./pages/ImoveisPage'));
const SeguroPage = lazy(() => import('./pages/SeguroPage'));
const ContactosPage = lazy(() => import('./pages/ContactosPage'));
const PropertyListPage = lazy(() => import('./pages/PropertyListPage'));
const PropertyDetailPage = lazy(() => import('./pages/PropertyDetailPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const CreditoPage = lazy(() => import('./pages/CreditoPage'));
const CertificacaoPage = lazy(() => import('./pages/CertificacaoPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const CarlosGoncalvesPage = lazy(() => import('./pages/CarlosGoncalvesPage'));
const PoliticaPrivacidade = lazy(() => import('./pages/PoliticaPrivacidade'));
const TermosCondicoes = lazy(() => import('./pages/TermosCondicoes'));
const ResolucaoLitigios = lazy(() => import('./pages/ResolucaoLitigios'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

 
// ############################################################
// #  MODO MANUTENÇÃO                                         #
// #                                                          #
// #  true  → o site inteiro mostra a tela de manutenção.     #
// #  false → o site volta ao normal.                         #
// #                                                          #
// #  O /admin fica sempre acessível, mesmo com isto a true.  #
// ############################################################
const MAINTENANCE_MODE = false;

const SITE_URL = 'https://globalead.pt';

// O idioma sai do endereço uma única vez, no arranque. Trocar de idioma navega
// para o outro endereço e a página recarrega — ver LanguageSwitcher.
const LANG = getLangFromPathname(window.location.pathname);

interface PageSeo {
  title?: string;
  description?: string;
  keywords?: string;
  url: string;
  noindex?: boolean;
}

// SEO por página. Os textos vivem nos ficheiros de tradução (secção "seo"),
// por isso o /en tem títulos e descrições próprios em vez dos portugueses.
const ROTA_SEO: Record<string, string> = {
  '/sobre': 'sobre',
  '/imoveis': 'imoveis',
  '/imoveis/lista': 'imoveisLista',
  '/seguros': 'seguros',
  '/credito': 'credito',
  '/certificacao': 'certificacao',
  '/carlos-goncalves': 'carlos',
  '/blog': 'blog',
  '/contactos': 'contactos',
  '/termos-condicoes': 'termos',
  '/politica-privacidade': 'privacidade',
  '/resolucao-litigios': 'litigios',
  '/admin': 'admin',
};

const getSeo = (path: string): PageSeo => {
  const canonical = path === '/' || path === '/home' ? `${SITE_URL}/` : `${SITE_URL}${path}`;

  if (path === '/' || path === '/home') {
    // A home usa os valores por omissão do SEOHead.
    return { url: `${SITE_URL}/` };
  }

  const chave = ROTA_SEO[path];
  if (!chave) {
    // Páginas dinâmicas (/imoveis/:ref, /blog/:ref) definem o próprio SEO;
    // aqui garantimos apenas o canonical correto.
    return { url: canonical };
  }

  const title = i18n.t(`seo.${chave}.title`);
  const description = i18n.exists(`seo.${chave}.description`)
    ? i18n.t(`seo.${chave}.description`)
    : undefined;
  const keywords = i18n.exists(`seo.${chave}.keywords`)
    ? i18n.t(`seo.${chave}.keywords`)
    : undefined;

  return {
    url: canonical,
    title,
    description,
    keywords,
    noindex: path === '/admin',
  };
};

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


const AppLayout: React.FC = () => {
  const location = useLocation();
   const [isScrolled, setIsScrolled] = React.useState(false);

   useEffect(() => {
     const handleScroll = () => {
       setIsScrolled(window.scrollY > 500);
     };
     window.addEventListener('scroll', handleScroll);
     return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   const getBreadcrumbs = () => {
     const path = location.pathname;
     if (path === '/sobre') return [{ label: 'Sobre Nós', current: true }];
     if (path === '/imoveis') return [{ label: 'Imóveis', current: true }];
     if (path === '/imoveis/lista') return [
       { label: 'Imóveis', href: '/imoveis' },
       { label: 'Catálogo', current: true }
     ];
     if (path === '/seguros') return [{ label: 'Seguros', current: true }];
     if (path === '/credito') return [
       { label: 'Imóveis', href: '/imoveis' },
       { label: 'Crédito Habitação', current: true }
     ];
     {/*if (path === '/certificacao') return [
       { label: 'Imóveis', href: '/imoveis' },
       { label: 'Certificação Energética', current: true }
     ];
     if (path === '/alarmes') return [{ label: 'Alarmes', current: true }];
     if (path === '/energia') return [{ label: 'Energia', current: true }];
     if (path === '/simulacao') return [{ label: 'Simulação', current: true }];
     if (path === '/tv-net-voz') return [{ label: 'TV, Net & Voz', current: true }];
     if (path === '/simulacao-tv-net-voz') return [{ label: 'Simulação TV, Net & Voz', current: true }];*/}

     if (path === '/carlos-goncalves') return [{ label: 'Carlos Gonçalves', current: true }];
     if (path === '/blog') return [{ label: 'Blog', current: true }];
     if (path === '/contactos') return [{ label: 'Contactos', current: true }];
     if (path === '/termos-condicoes') return [{ label: 'Termos e Condições', current: true }];
     if (path === '/politica-privacidade') return [{ label: 'Política de Privacidade', current: true }];
     if (path === '/resolucao-litigios') return [{ label: 'Resolução de Litígios', current: true }];
     if (path === '/admin') return [{ label: 'Administração', current: true }];
     // Detalhe de imóvel: sem breadcrumbs — a barra azul do imóvel já fica
     // encostada ao header e faz o papel de navegação (botão "voltar").
     if (path.startsWith('/imoveis/') && path !== '/imoveis/lista') {
       return [];
     }
     if (path.startsWith('/blog/')) {
       return [
         { label: 'Blog', href: '/blog' },
         { label: 'Artigo', current: true }
       ];
     }
     return [];
   };

   const breadcrumbs = getBreadcrumbs();
   const isCarlosGoncalvesPage = location.pathname === '/carlos-goncalves';
   const isAdminPage = location.pathname === '/admin';
   const baseSeo = getSeo(location.pathname);

   // O react-router corre com basename, por isso `location.pathname` vem sempre
   // sem o prefixo de idioma. O canonical e os hreflang têm de o repor.
   const bareUrl = baseSeo.url.replace(SITE_URL, '') || '/';
   const seo = {
     ...baseSeo,
     url: `${SITE_URL}${pathForLang(LANG, bareUrl)}`,
     lang: LANG,
     alternates: LANGUAGES.map((code) => ({
       lang: code,
       url: `${SITE_URL}${pathForLang(code, bareUrl)}`,
     })),
   };

   // Manutenção: substitui o site todo, menos o /admin.
   if (MAINTENANCE_MODE && !isAdminPage) {
     return <MaintenancePage />;
   }


  return (
    <div className="min-h-screen bg-white">
       <SEOHead {...seo} />
      <ScrollToTop />
      
      <Header />
       <Breadcrumbs 
        items={breadcrumbs} 
        isVisible={isScrolled && breadcrumbs.length > 0} 
      /> 
      
      <main>
        <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><LoadingSpinner size="lg" /></div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/imoveis" element={<ImoveisPage />} />
          <Route path="/imoveis/lista" element={<PropertyListPage />} />
          <Route path="/imoveis/:ref" element={<PropertyDetailPage />} />
          <Route path="/seguros" element={<SeguroPage />} />
          <Route path="/credito" element={<CreditoPage />} />
          <Route path="/certificacao" element={<CertificacaoPage />} />
          <Route path="/carlos-goncalves" element={<CarlosGoncalvesPage />} />
          {/*<Route path="/energia" element={<EnergiaPage />} />*/}
          {/*<Route path="/simulacao" element={<SimulacaoEnergia />} />*/}
          {/*<Route path="/tv-net-voz" element={<TvNetVozPage />} />*/}
          {/*<Route path="/simulacao-tv-net-voz" element={<SimulacaoTvNetVoz />} />  */}
          <Route path="/termos-condicoes" element={<TermosCondicoes />} />
          <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
          <Route path="/resolucao-litigios" element={<ResolucaoLitigios />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:ref" element={<BlogPostPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/contactos" element={<ContactosPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </Suspense>
      </main>
      
       {!(isCarlosGoncalvesPage || isAdminPage ) && <Footer />}
       <StickyCtaButton />
       <CookieBanner />
       {!isAdminPage && <PreferencePopup />}
       {/* Bloqueia botão direito / arrastar / toque longo nas fotos.
           No /admin fica desligado para não atrapalhar a gestão de conteúdos. */}
       {!isAdminPage && <MediaProtection />}
    </div>
  );
};

function App() {
  return (
    <Router basename={basenameFor(LANG)}>
      <AppLayout />
    </Router>
  );
}

export default App;
