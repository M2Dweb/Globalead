import React, { useState, useEffect } from 'react';
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

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handlePropertySelect = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
  };

  const getBreadcrumbs = () => {
    switch (currentPage) {
      case 'sobre':
        return [
          { label: 'Sobre Nós', current: true }
        ];
      case 'imoveis':
        return [
          { label: 'Imóveis', current: true }
        ];
      case 'seguros':
        return [
          { label: 'Seguros', current: true }
        ];
      case 'contactos':
        return [
          { label: 'Contactos', current: true }
        ];
      case 'property-list':
        return [
          { label: 'Imóveis', href: 'imoveis' },
          { label: 'Catálogo', current: true }
        ];
      case 'property-detail':
        return [
          { label: 'Imóveis', href: 'imoveis' },
          { label: 'Catálogo', href: 'property-list' },
          { label: 'Detalhes', current: true }
        ];
      case 'admin':
        return [
          { label: 'Administração', current: true }
        ];
      case 'credito':
        return [
          { label: 'Imóveis', href: 'imoveis' },
          { label: 'Crédito Habitação', current: true }
        ];
      case 'certificacao':
        return [
          { label: 'Imóveis', href: 'imoveis' },
          { label: 'Certificação Energética', current: true }
        ];
      case 'alarmes':
        return [
          { label: 'Alarmes', current: true }
        ];
      case 'energia':
        return [
          { label: 'Energia', current: true }
        ];
      case 'tv-net-voz':
        return [
          { label: 'TV, Net & Voz', current: true }
        ];
      default:
        return [];
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'sobre':
        return <SobrePage />;
      case 'imoveis':
        return <ImoveisPage onNavigate={handleNavigate} />;
      case 'seguros':
        return <SeguroPage />;
      case 'contactos':
        return <ContactosPage />;
      case 'property-list':
        return <PropertyListPage onNavigate={handleNavigate} onPropertySelect={handlePropertySelect} />;
      case 'property-detail':
        return <PropertyDetailPage propertyId={selectedPropertyId} onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminPage />;
      case 'credito':
        return <CreditoPage />;
      case 'certificacao':
        return <CertificacaoPage />;
      case 'alarmes':
        return <AlarmesPage />;
      case 'energia':
        return <EnergiaPage />;
      case 'tv-net-voz':
        return <TvNetVozPage />;
      case 'blog':
        return <BlogPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="min-h-screen bg-white">
      <SEOHead />
      
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      
      <Breadcrumbs 
        items={breadcrumbs} 
        onNavigate={handleNavigate} 
        isVisible={isScrolled && breadcrumbs.length > 0} 
      />
      
      <main className={isScrolled && breadcrumbs.length > 0 ? 'pt-16' : ''}>
        {renderPage()}
      </main>
      
      <Footer onNavigate={handleNavigate} />
      
      <StickyCtaButton onNavigate={handleNavigate} />
    </div>
  );
}

export default App;