import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
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
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;