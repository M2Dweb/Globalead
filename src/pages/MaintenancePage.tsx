import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Phone, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

/**
 * Tela de manutenção.
 *
 * Só é mostrada quando MAINTENANCE_MODE está a true em App.tsx.
 * O /admin continua acessível, para se poder gerir o site enquanto isto está no ar.
 */
const MaintenancePage: React.FC = () => (
  <div className="min-h-screen bg-[#0d2233] text-white flex flex-col items-center justify-center px-6 text-center">
    <Helmet>
      <title>Em manutenção | Globalead Portugal</title>
      {/* Enquanto durar a manutenção, o Google não deve indexar esta página */}
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>

    <img src="/G.png" alt="Globalead Portugal" className="w-56 sm:w-64 mb-10" />

    <h1 className="text-2xl sm:text-3xl font-medium tracking-wide">
      Estamos em manutenção
    </h1>

    <p className="mt-4 max-w-md text-sm sm:text-base text-blue-200 leading-relaxed">
      O site está a ser melhorado e volta muito em breve.
      Até lá, continuamos disponíveis para si.
    </p>

    <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm">
      <a
        href="tel:+351910647620"
        className="inline-flex items-center gap-2 hover:text-[#79b2e9] transition-colors"
      >
        <Phone className="h-4 w-4" />
        910 647 620
      </a>
      <a
        href="https://wa.me/351910647620"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 hover:text-[#79b2e9] transition-colors"
      >
        <FaWhatsapp className="h-4 w-4" />
        WhatsApp
      </a>
      <a
        href="mailto:geral@globalead.pt"
        className="inline-flex items-center gap-2 hover:text-[#79b2e9] transition-colors"
      >
        <Mail className="h-4 w-4" />
        geral@globalead.pt
      </a>
    </div>

    <p className="mt-14 text-xs text-blue-200/60">
      Globalead Portugal
    </p>
  </div>
);

export default MaintenancePage;
