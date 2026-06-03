import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
 import Header from './components/Header';
 import Footer from './components/Footer'; 
 import Breadcrumbs from './components/Breadcrumbs';
 import StickyCtaButton from './components/StickyCtaButton';
 import SEOHead from './components/SEOHead';
 import CookieBanner from './components/CookieBanner';

//pages
 import HomePage from './pages/HomePage';
 import SobrePage from './pages/SobrePage';
 import ImoveisPage from './pages/ImoveisPage';
 import SeguroPage from './pages/SeguroPage';
 import ContactosPage from './pages/ContactosPage';
 import PropertyListPage from './pages/PropertyListPage';
 import PropertyDetailPage from './pages/PropertyDetailPage';
 import AdminPage from './pages/AdminPage';
 import CreditoPage from './pages/CreditoPage';
 import CertificacaoPage from './pages/CertificacaoPage';
 import BlogPage from './pages/BlogPage';
 import BlogPostPage from './pages/BlogPostPage';
 import CarlosGoncalvesPage from './pages/CarlosGoncalvesPage';
 import PoliticaPrivacidade from './pages/PoliticaPrivacidade';
 import TermosCondicoes from './pages/TermosCondicoes';
 import ResolucaoLitigios from './pages/ResolucaoLitigios';

 
const SITE_URL = 'https://globalead.pt';

interface PageSeo {
  title?: string;
  description?: string;
  keywords?: string;
  url: string;
  noindex?: boolean;
}

// SEO por página (título, descrição e canonical únicos por rota)
const getSeo = (path: string): PageSeo => {
  const canonical = path === '/' || path === '/home' ? `${SITE_URL}/` : `${SITE_URL}${path}`;

  switch (path) {
    case '/':
    case '/home':
      return { url: `${SITE_URL}/` };
    case '/sobre':
      return {
        url: canonical,
        title: 'Sobre Nós | Globalead Portugal',
        description:
          'Conheça a Globalead Portugal: a nossa história, valores e equipa especializada em imobiliário, crédito habitação, seguros e energia. Acompanhamento gratuito e personalizado.',
      };
    case '/imoveis':
      return {
        url: canonical,
        title: 'Comprar e Vender Imóveis | Globalead Portugal',
        description:
          'Compre ou venda o seu imóvel com a Globalead Portugal. Apartamentos, moradias e empreendimentos com acompanhamento completo, do primeiro contacto à escritura.',
        keywords: 'comprar casa, vender imóvel, apartamentos, moradias, empreendimentos, mediação imobiliária, Portugal',
      };
    case '/imoveis/lista':
      return {
        url: canonical,
        title: 'Catálogo de Imóveis | Globalead Portugal',
        description:
          'Veja o catálogo de imóveis disponíveis da Globalead Portugal: apartamentos, moradias, terrenos e empreendimentos em todo o país.',
      };
    case '/seguros':
      return {
        url: canonical,
        title: 'Seguros Auto, Vida e Habitação | Globalead Portugal',
        description:
          'Compare e contrate seguros automóvel, vida, habitação e saúde com a Globalead Portugal. Encontramos a melhor proteção ao melhor preço, sem custos para si.',
        keywords: 'seguros, seguro automóvel, seguro de vida, seguro de saúde, seguro habitação, Portugal',
      };
    case '/credito':
      return {
        url: canonical,
        title: 'Crédito Habitação e Simulador | Globalead Portugal',
        description:
          'Simule o seu crédito habitação e descubra a prestação mensal. A Globalead negoceia com os principais bancos as melhores condições — intermediação de crédito gratuita.',
        keywords: 'crédito habitação, simulador crédito habitação, prestação mensal, taxa de juro, intermediário de crédito, Portugal',
      };
    case '/certificacao':
      return {
        url: canonical,
        title: 'Certificação Energética | Globalead Portugal',
        description:
          'Certificação energética de imóveis com a Globalead Portugal. Tratamos de todo o processo do certificado energético, obrigatório na venda ou arrendamento.',
      };
    case '/carlos-goncalves':
      return {
        url: canonical,
        title: 'Carlos Gonçalves — Consultor | Globalead Portugal',
        description:
          'Carlos Gonçalves, consultor da Globalead Portugal com mais de 10 anos de experiência. Acompanhamento próximo na compra, venda e crédito do seu imóvel.',
      };
    case '/blog':
      return {
        url: canonical,
        title: 'Blog | Globalead Portugal',
        description:
          'Blog da Globalead Portugal: notícias, dicas e guias sobre imobiliário, crédito habitação, seguros e energia para o ajudar a decidir melhor.',
      };
    case '/contactos':
      return {
        url: canonical,
        title: 'Contactos | Globalead Portugal',
        description:
          'Entre em contacto com a Globalead Portugal. Fale com a nossa equipa sobre imóveis, crédito habitação, seguros e energia. Acompanhamento gratuito e personalizado.',
      };
    case '/termos-condicoes':
      return {
        url: canonical,
        title: 'Termos e Condições | Globalead Portugal',
        description: 'Termos e condições de utilização do site da Globalead Portugal.',
      };
    case '/politica-privacidade':
      return {
        url: canonical,
        title: 'Política de Privacidade | Globalead Portugal',
        description:
          'Política de privacidade e tratamento de dados pessoais da Globalead Portugal, em conformidade com o RGPD.',
      };
    case '/resolucao-litigios':
      return {
        url: canonical,
        title: 'Resolução de Litígios | Globalead Portugal',
        description: 'Informação sobre resolução alternativa de litígios de consumo da Globalead Portugal.',
      };
    case '/admin':
      return { url: canonical, title: 'Administração | Globalead Portugal', noindex: true };
    default:
      // Páginas dinâmicas (/imoveis/:ref, /blog/:ref) definem o próprio SEO;
      // aqui garantimos apenas o canonical correto.
      return { url: canonical };
  }
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
     if (path.startsWith('/imoveis/') && path !== '/imoveis/lista') {
       return [
         { label: 'Imóveis', href: '/imoveis' },
         { label: 'Catálogo', href: '/imoveis/lista' },
         { label: 'Detalhes', current: true }
       ];
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
   const seo = getSeo(location.pathname);


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
        </Routes>
      </main>
      
       {!(isCarlosGoncalvesPage || isAdminPage ) && <Footer />} 
       <StickyCtaButton /> 
       <CookieBanner />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
