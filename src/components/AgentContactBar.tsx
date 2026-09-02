import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { FaWhatsapp, FaTiktok, FaYoutube } from 'react-icons/fa';

// Contactos da Globalead. Se o Carlos quiser um número/email direto só para
// esta página, é aqui que se troca.
const PHONE_DISPLAY = '910 647 620';
const PHONE_TEL = '+351910647620';
const WHATSAPP = 'https://wa.me/351910647620';
const EMAIL = 'geral@globalead.pt';

const socials = [
  { href: 'https://www.facebook.com/globalead.pt', label: 'Facebook', Icon: Facebook },
  { href: 'https://www.instagram.com/globalead.pt/', label: 'Instagram', Icon: Instagram },
  { href: 'https://www.linkedin.com/company/globalead/', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://www.tiktok.com/@globalead.pt', label: 'TikTok', Icon: FaTiktok },
  {
    href: 'https://www.youtube.com/channel/UCL2Dk6vnNF6HngFlc4enKDQ',
    label: 'YouTube',
    Icon: FaYoutube,
  },
];

/**
 * Barra de contacto direto, logo a seguir ao hero da página do consultor.
 *
 * Na página de agente da RE/MAX os contactos e as redes aparecem no topo, antes
 * de qualquer conteúdo — quem chega decidido a ligar não tem de percorrer a
 * página inteira até ao formulário.
 */
const AgentContactBar: React.FC = () => (
  <section className="relative z-20 bg-[#0d2233] text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-5">
        {/* Contactos diretos */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors rounded-full px-5 py-2 text-sm font-medium"
          >
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>

          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1fb855] transition-colors rounded-full px-5 py-2 text-sm font-medium"
          >
            <FaWhatsapp className="h-4 w-4" />
            WhatsApp
          </a>

          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors rounded-full px-5 py-2 text-sm font-medium"
          >
            <Mail className="h-4 w-4" />
            {EMAIL}
          </a>
        </div>

        {/* Redes sociais */}
        <div className="flex items-center gap-5">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="text-white/80 hover:text-[#79b2e9] transition-colors"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AgentContactBar;
