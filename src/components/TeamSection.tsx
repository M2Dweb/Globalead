import React, { useEffect, useState } from 'react';
import { Phone, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import { imageUrl, onImageCdnError } from '../lib/imageUrl';
import { getTranslated, type TranslatableRow } from '../lib/translations';

interface MembroEquipa extends TranslatableRow {
  id: string;
  name: string;
  role: string;
  photo_url: string | null;
  whatsapp: string | null;
  phone: string | null;
  email: string | null;
}

// Número só com algarismos e com indicativo; um número português de 9
// algarismos sem indicativo leva o 351 à frente.
const internacional = (numero: string) => {
  const digitos = numero.replace(/\D/g, '');
  return digitos.length === 9 ? `351${digitos}` : digitos;
};

// As fotos do R2 passam pela CDN de imagens, como as dos imóveis. As que estão
// no próprio site (globalead.pt/equipa/...) ficam com o caminho relativo.
const fotoSrc = (url: string) => imageUrl(url.replace(/^https:\/\/(www\.)?globalead\.pt(?=\/)/, ''));

const contactoClasse =
  'w-9 h-9 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm transition-colors hover:border-[#79b2e9] hover:text-[#79b2e9]';

// "A nossa equipa": retrato, nome, cargo e contactos diretos de cada pessoa.
// As pessoas vêm da tabela team_members, gerida no painel do CRM (Equipa).
const TeamSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [equipa, setEquipa] = useState<MembroEquipa[] | null>(null);

  useEffect(() => {
    const carregar = async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('id, name, role, photo_url, whatsapp, phone, email, translations')
        .eq('is_published', true)
        .order('position', { ascending: true });
      if (error) console.error('Erro ao carregar a equipa:', error);
      setEquipa((data as MembroEquipa[]) || []);
    };
    carregar();
  }, []);

  // Sem ninguém visível, a secção não aparece
  if (equipa && equipa.length === 0) return null;

  return (
    <section className="py-20 bg-[#eff2f9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-gray-500">
          {t('sobre.equipa.etiqueta')}
        </p>
        <h2 className="mt-3 text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-gray-900">
          {t('sobre.equipa.titulo')}
        </h2>
        <p className="mt-4 max-w-lg text-lg text-gray-600 leading-relaxed">
          {t('sobre.equipa.texto')}
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(equipa || []).map((membro) => (
            <article key={membro.id}>
              {membro.photo_url ? (
                <img
                  src={fotoSrc(membro.photo_url)}
                  onError={onImageCdnError}
                  alt={membro.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[4/5] object-cover object-top rounded-md grayscale bg-gray-200"
                />
              ) : (
                <div aria-hidden="true" className="w-full aspect-[4/5] rounded-md bg-gray-200" />
              )}

              <div className="mt-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900">{membro.name}</h3>
                  <p className="mt-0.5 text-sm text-gray-500">{getTranslated(membro, 'role', i18n.language)}</p>
                </div>

                <div className="flex flex-shrink-0 gap-2">
                  {membro.whatsapp && (
                    <a
                      href={`https://wa.me/${internacional(membro.whatsapp)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t('sobre.equipa.whatsapp', { nome: membro.name })}
                      className={contactoClasse}
                    >
                      <FaWhatsapp className="h-4 w-4" />
                    </a>
                  )}
                  {membro.phone && (
                    <a
                      href={`tel:+${internacional(membro.phone)}`}
                      aria-label={t('sobre.equipa.ligar', { nome: membro.name })}
                      className={contactoClasse}
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                  )}
                  {membro.email && (
                    <a
                      href={`mailto:${membro.email}`}
                      aria-label={t('sobre.equipa.email', { nome: membro.name })}
                      className={contactoClasse}
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
