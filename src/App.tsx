import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
 import Header from './components/Header';
 import Footer from './components/Footer'; 
 import Breadcrumbs from './components/Breadcrumbs';
 import StickyCtaButton from './components/StickyCtaButton';
 import SEOHead from './components/SEOHead';

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

import WaitingPage from './pages/WaitingPage';
import { Home } from 'lucide-react';

 
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
  

  return (
    <div className="min-h-screen bg-white">
       <SEOHead /> 
      <ScrollToTop />
      
        {!(isCarlosGoncalvesPage || isAdminPage ) && <Header />}
      
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
