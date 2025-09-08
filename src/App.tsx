import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
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
    
    switch (path) {
      case '/sobre':
        return [{ label: 'Sobre Nós', current: true }];
      case '/imoveis':
        return [{ label: 'Imóveis', current: true }];
      case '/imoveis/lista':
        return [
          { label: 'Imóveis', href: '/imoveis' },
          { label: 'Catálogo', current: true }
        ];
      case '/seguros':
        return [{ label: 'Seguros', current: true }];
      case '/credito':
        return [
          { label: 'Imóveis', href: '/imoveis' },
          { label: 'Crédito Habitação', current: true }
        ];
      case '/certificacao':
        return [
          { label: 'Imóveis', href: '/imoveis' },
          { label: 'Certificação Energética', current: true }
        ];
      case '/alarmes':
        return [{ label: 'Alarmes', current: true }];
      case '/energia':
        return [{ label: 'Energia', current: true }];
      case '/tv-net-voz':
        return [{ label: 'TV, Net & Voz', current: true }];
      case '/blog':
        return [{ label: 'Blog', current: true }];
      case '/contactos':
        return [{ label: 'Contactos', current: true }];
      case '/admin':
        return [{ label: 'Administração', current: true }];
      default:
        if (path.startsWith('/imoveis/')) {
          return [
            { label: 'Imóveis', href: '/imoveis' },
            { label: 'Catálogo', href: '/imoveis/lista' },
            { label: 'Detalhes', current: true }
          ];
        }
        return [];
    }
  };

  const breadcrumbs = getBreadcrumbs();

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
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/imoveis" element={<ImoveisPage />} />
          <Route path="/imoveis/lista" element={<PropertyListPage />} />
          <Route path="/imoveis/:id" element={<PropertyDetailPage />} />
          <Route path="/seguros" element={<SeguroPage />} />
          <Route path="/credito" element={<CreditoPage />} />
          <Route path="/certificacao" element={<CertificacaoPage />} />
          <Route path="/alarmes" element={<AlarmesPage />} />
          <Route path="/energia" element={<EnergiaPage />} />
          <Route path="/tv-net-voz" element={<TvNetVozPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/contactos" element={<ContactosPage />} />
        </Routes>
      </main>
      
      <Footer />
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