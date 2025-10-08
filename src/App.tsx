import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer'; // Importa o Footer
import Breadcrumbs from './components/Breadcrumbs';
import StickyCtaButton from './components/StickyCtaButton';
import SEOHead from './components/SEOHead';

// Pages
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
import AlarmesPage from './pages/AlarmesPage';
import EnergiaPage from './pages/EnergiaPage';
import TvNetVozPage from './pages/TvNetVozPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import SimulacaoEnergia from './components/SimulacaoEnergia';
import CarlosGoncalvesPage from './pages/CarlosGoncalvesPage';
import SimulacaoTvNetVoz from './components/SimulacaoTvNetVoz';
import WaitingPage from './pages/WaitingPage';

// Scroll to top component
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Main App Layout
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
    if (path === '/certificacao') return [
      { label: 'Imóveis', href: '/imoveis' },
      { label: 'Certificação Energética', current: true }
    ];
    if (path === '/alarmes') return [{ label: 'Alarmes', current: true }];
    if (path === '/energia') return [{ label: 'Energia', current: true }];
    if (path === '/carlos-goncalves') return [{ label: 'Carlos Gonçalves', current: true }];

    if (path === '/simulacao') return [{ label: 'Simulação', current: true }];
    if (path === '/tv-net-voz') return [{ label: 'TV, Net & Voz', current: true }];
    if (path === '/simulacao-tv-net-voz') return [{ label: 'Simulação TV, Net & Voz', current: true }];
    
    if (path === '/blog') return [{ label: 'Blog', current: true }];
    if (path === '/contactos') return [{ label: 'Contactos', current: true }];
    if (path === '/admin') return [{ label: 'Administração', current: true }];

    // Detalhes de imóveis
    if (path.startsWith('/imoveis/') && path !== '/imoveis/lista') {
      return [
        { label: 'Imóveis', href: '/imoveis' },
        { label: 'Catálogo', href: '/imoveis/lista' },
        { label: 'Detalhes', current: true }
      ];
    }

    // Detalhes do blog
    if (path.startsWith('/blog/')) {
      return [
        { label: 'Blog', href: '/blog' },
        { label: 'Artigo', current: true }
      ];
    }

    return [];
  };

  const breadcrumbs = getBreadcrumbs();

  // Verifica se a página atual é a "Carlos Goncalves", para não renderizar o footer
  const isCarlosGoncalvesPage = location.pathname === '/carlos-goncalves';
  const isAdminPage = location.pathname === '/admin';

  return (
    <div className="min-h-screen bg-white">
      <SEOHead />
      <ScrollToTop />
      
      <Header />
      
      <Breadcrumbs 
        items={breadcrumbs} 
        isVisible={isScrolled && breadcrumbs.length > 0} 
      />
      
      <main className={isScrolled && breadcrumbs.length > 0 ? 'pt-16' : ''}>
        <Routes>
          <Route path="/" element={<WaitingPage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/imoveis" element={<ImoveisPage />} />
          <Route path="/imoveis/lista" element={<PropertyListPage />} />
          <Route path="/imoveis/:ref" element={<PropertyDetailPage />} />
          <Route path="/seguros" element={<SeguroPage />} />
          <Route path="/credito" element={<CreditoPage />} />
          <Route path="/certificacao" element={<CertificacaoPage />} />
          <Route path="/carlos-goncalves" element={<CarlosGoncalvesPage />} />
          <Route path="/alarmes" element={<AlarmesPage />} />
          <Route path="/energia" element={<EnergiaPage />} />
          <Route path="/simulacao" element={<SimulacaoEnergia />} />
          <Route path="/tv-net-voz" element={<TvNetVozPage />} />
          <Route path="/simulacao-tv-net-voz" element={<SimulacaoTvNetVoz />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:ref" element={<BlogPostPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/contactos" element={<ContactosPage />} />
        </Routes>
      </main>
      
      
      {!(isCarlosGoncalvesPage || isAdminPage) && <Footer />}


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
