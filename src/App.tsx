import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import StickyCtaButton from './components/StickyCtaButton';
import Breadcrumbs from './components/Breadcrumbs';
import SEOHead from './components/SEOHead';
import HomePage from './pages/HomePage';
import SobrePage from './pages/SobrePage';
import ImoveisPage from './pages/ImoveisPage';
import TvNetVozPage from './pages/TvNetVozPage';
import EnergiaPage from './pages/EnergiaPage';
import SeguroPage from './pages/SeguroPage';
import CreditoPage from './pages/CreditoPage';
import CertificacaoPage from './pages/CertificacaoPage';
import BlogPage from './pages/BlogPage';
import ContactosPage from './pages/ContactosPage';
import PropertyListPage from './pages/PropertyListPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import AdminPage from './pages/AdminPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);

  const getBreadcrumbs = () => {
    const breadcrumbMap: { [key: string]: Array<{ label: string; href?: string; current?: boolean }> } = {
      sobre: [{ label: 'Sobre', current: true }],
      imoveis: [{ label: 'Imóveis', current: true }],
      'property-list': [{ label: 'Imóveis', href: 'imoveis' }, { label: 'Catálogo', current: true }],
      'property-detail': [{ label: 'Imóveis', href: 'imoveis' }, { label: 'Catálogo', href: 'property-list' }, { label: 'Detalhes', current: true }],
      credito: [{ label: 'Imóveis', href: 'imoveis' }, { label: 'Crédito Habitação', current: true }],
      certificacao: [{ label: 'Imóveis', href: 'imoveis' }, { label: 'Certificação Energética', current: true }],
      'tv-net-voz': [{ label: 'TV NET VOZ', current: true }],
      energia: [{ label: 'Energia', current: true }],
      seguros: [{ label: 'Seguros', current: true }],
      blog: [{ label: 'Blog', current: true }],
      contactos: [{ label: 'Contactos', current: true }],
      admin: [{ label: 'Administração', current: true }]
    };
    
    return breadcrumbMap[currentPage] || [];
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} onPropertySelect={setSelectedProperty} />;
      case 'sobre':
        return <SobrePage />;
      case 'imoveis':
        return <ImoveisPage onNavigate={setCurrentPage} />;
      case 'property-list':
        return <PropertyListPage onNavigate={setCurrentPage} onPropertySelect={setSelectedProperty} />;
      case 'property-detail':
        return <PropertyDetailPage propertyId={selectedProperty} onNavigate={setCurrentPage} />;
      case 'credito':
        return <CreditoPage />;
      case 'certificacao':
        return <CertificacaoPage />;
      case 'tv-net-voz':
        return <TvNetVozPage />;
      case 'energia':
        return <EnergiaPage />;
      case 'seguros':
        return <SeguroPage />;
      case 'blog':
        return <BlogPage />;
      case 'contactos':
        return <ContactosPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} onPropertySelect={setSelectedProperty} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead />
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      {currentPage !== 'home' && (
        <Breadcrumbs items={getBreadcrumbs()} onNavigate={setCurrentPage} />
      )}
      <main>
        {renderPage()}
      </main>
      <Footer />
      <StickyCtaButton onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;