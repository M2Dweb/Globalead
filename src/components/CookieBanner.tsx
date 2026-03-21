import React, { useState, useEffect } from 'react';
import { loadAnalytics } from './Analytics';

const STORAGE_KEY = 'cookieConsent';

const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      // Pequeno delay para não "saltar" ao rosto ao abrir o site
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
    if (saved === 'accepted') {
      loadAnalytics();
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    loadAnalytics();
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(STORAGE_KEY, 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentimento de cookies"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: 'rgba(15, 23, 42, 0.97)',
        backdropFilter: 'blur(8px)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '20px 24px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '16px',
        boxShadow: '0 -4px 30px rgba(0,0,0,0.3)',
        animation: 'slideUp 0.4s ease',
      }}
    >
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);   opacity: 1; }
        }
      `}</style>

      {/* Texto */}
      <div style={{ flex: 1, minWidth: '260px' }}>
        <p style={{
          margin: 0,
          color: '#e2e8f0',
          fontSize: '14px',
          lineHeight: '1.6',
        }}>
          🍪 Utilizamos <strong style={{ color: '#fff' }}>cookies</strong> para melhorar a sua experiência e analisar o tráfego do site (Google Analytics e Facebook Pixel).{' '}
          <a
            href="/politica-privacidade"
            style={{ color: '#7dd3fc', textDecoration: 'underline' }}
          >
            Política de Privacidade
          </a>
        </p>
      </div>

      {/* Botões */}
      <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
        <button
          onClick={handleReject}
          style={{
            padding: '9px 20px',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'transparent',
            color: '#94a3b8',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
        >
          Recusar
        </button>

        <button
          onClick={handleAccept}
          style={{
            padding: '9px 24px',
            borderRadius: '8px',
            border: 'none',
            background: 'linear-gradient(135deg, #0f4c8a, #1a6fc4)',
            color: '#fff',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'opacity 0.2s',
            boxShadow: '0 2px 12px rgba(15,76,138,0.4)',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Aceitar cookies
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
