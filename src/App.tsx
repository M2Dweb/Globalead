import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import StickyCtaButton from './components/StickyCtaButton';
import Breadcrumbs from './components/Breadcrumbs';
import HomePage from './pages/HomePage';
import SobrePage from './pages/SobrePage';
import ImoveisPage from './pages/ImoveisPage';
import TvNetVozPage from './pages/TvNetVozPage';
import EnergiaPage from './pages/EnergiaPage';
import SeguroPage from './pages/SeguroPage';
import AlarmesPage from './pages/AlarmesPage';
import BlogPage from './pages/BlogPage';
import ContactosPage from './pages/ContactosPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const getBreadcrumbs = () => {
    const breadcrumbMap: { [key: string]: Array<{ label: string; href?: string; current?: boolean }> } = {
      sobre: [{ label: 'Sobre', current: true }],
      imoveis: [{ label: 'Imóveis', current: true }],
      'tv-net-voz': [{ label: 'TV NET VOZ', current: true }],
      energia: [{ label: 'Energia', current: true }],
      seguros: [{ label: 'Seguros', current: true }],
      alarmes: [{ label: 'Alarmes', current: true }],
      blog: [{ label: 'Blog', current: true }],
      contactos: [{ label: 'Contactos', current: true }]
    };
    
    return breadcrumbMap[currentPage] || [];
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'sobre':
        return <SobrePage />;
      case 'imoveis':
        return <ImoveisPage />;
      case 'tv-net-voz':
        return <TvNetVozPage />;
      case 'energia':
        return <EnergiaPage />;
      case 'seguros':
        return <SeguroPage />;
      case 'alarmes':
        return <AlarmesPage />;
      case 'blog':
        return <BlogPage />;
      case 'contactos':
        return <ContactosPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
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