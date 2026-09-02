import React, { useState } from 'react';
import { Bed, Bath, Maximize, Heart, ArrowRight, Share2, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { imageUrl } from '../lib/imageUrl';
import { getPropertyImages } from '../lib/propertyImages';
import StatusBadge from './StatusBadge';

interface PropertyCardSothebysProps {
  property: any;
  variant?: 'imovel' | 'empreendimento';
}

const typeLabels: Record<string, string> = {
  apartamento: 'Apartamento',
  moradia: 'Moradia',
  terreno: 'Terreno',
  empreendimento: 'Empreendimento',
  trespasse: 'Trespasse',
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);

// Para empreendimentos: intervalo de quartos a partir das tipologias (ex.: "0 a 2 Quartos")
const getBedroomsRange = (property: any): string | null => {
  const types: any[] = Array.isArray(property.property_types) ? property.property_types : [];
  const nums = types
    .map((t) => {
      const m = String(t?.name || '').match(/T\s*(\d+)/i);
      return m ? parseInt(m[1], 10) : NaN;
    })
    .filter((n) => !Number.isNaN(n));

  if (nums.length > 0) {
    const min = Math.min(...nums);
    const max = Math.max(...nums);
    return min === max ? `${min} Quartos` : `${min} a ${max} Quartos`;
  }
  if (property.bedrooms != null && property.bedrooms !== '') {
    return `${property.bedrooms} Quartos`;
  }
  return null;
};

// Preço "desde" para empreendimentos
const getFromPrice = (property: any): number => {
  const types: any[] = Array.isArray(property.property_types) ? property.property_types : [];
  const prices = types.map((t) => Number(t?.price)).filter((p) => p > 0);
  if (prices.length > 0) return Math.min(...prices);
  return Number(property.price) || 0;
};

const PropertyCardSothebys: React.FC<PropertyCardSothebysProps> = ({ property, variant = 'imovel' }) => {
  const navigate = useNavigate();
  const [imgIdx, setImgIdx] = useState(0);
  const [fav, setFav] = useState(false);
  const [copied, setCopied] = useState(false);

  // Foto de Capa (definida no /admin) primeiro; depois as restantes fotos.
  const allImages: string[] = getPropertyImages(property);
  // No cartão navegamos só pelas primeiras fotos — as restantes veem-se na
  // página do imóvel. Setas e pontos usam exatamente o mesmo conjunto.
  const images = allImages.slice(0, 6);
  const cover = images[imgIdx] || images[0];
  const href = `/imoveis/${property.ref || property.id}`;
  const go = () => navigate(href);

  // Partilhar o imóvel (Web Share API nativo; fallback: copiar o link)
  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}${href}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: property.title, text: property.title, url: shareUrl });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      /* utilizador cancelou a partilha — ignorar */
    }
  };

  const dots = images;

  const step = (e: React.MouseEvent, delta: number) => {
    e.stopPropagation();
    setImgIdx((i) => (i + delta + images.length) % images.length);
  };

  const ImageArea = (
    <div className="relative overflow-hidden bg-gray-100">
      <img
        src={cover ? imageUrl(cover, { width: 700 }) : '/placeholder.jpg'}
        alt={property.title}
        loading="lazy"
        decoding="async"
        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Etiqueta de estado (Reservado / Vendido) — canto superior esquerdo */}
      {(property.availability_status === 'reservado' || property.availability_status === 'vendido') && (
        <div className="absolute top-3 left-3">
          <StatusBadge status={property.availability_status} size="md" />
        </div>
      )}

      {/* Favorito */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setFav((v) => !v);
        }}
        aria-label="Adicionar aos favoritos"
        className="absolute top-3 right-3 text-white/90 hover:text-white drop-shadow"
      >
        <Heart className={`h-5 w-5 ${fav ? 'fill-current text-white' : ''}`} />
      </button>

      {/* Setas para percorrer as fotos — aparecem ao passar o rato.
          No telemóvel ficam sempre visíveis, porque não há "hover". */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => step(e, -1)}
            aria-label="Foto anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/45 hover:bg-black/70 text-white p-1.5 transition-all duration-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => step(e, 1)}
            aria-label="Foto seguinte"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/45 hover:bg-black/70 text-white p-1.5 transition-all duration-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Indicadores (dots) */}
      {dots.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {dots.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setImgIdx(i);
              }}
              aria-label={`Ver imagem ${i + 1}`}
              className={`h-1.5 w-1.5 rounded-full transition-all ${
                i === imgIdx ? 'bg-white w-4' : 'bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );

  if (variant === 'empreendimento') {
    const bedrooms = getBedroomsRange(property);
    const fromPrice = getFromPrice(property);

    return (
      <div
        onClick={go}
        className="group bg-white border border-gray-200 hover:shadow-md transition-shadow duration-300 cursor-pointer overflow-hidden"
      >
        {ImageArea}
        <div className="flex items-end justify-between gap-4 p-4">
          <div className="min-w-0">
            <h3 className="font-sans text-sm font-semibold text-[#0d2233] truncate">{property.title}</h3>
            {property.location && (
              <p className="text-xs text-gray-500 truncate mt-0.5">{property.location}</p>
            )}
          </div>
          <div className="flex items-end gap-3 flex-shrink-0">
            <div className="text-right">
              {bedrooms && <p className="text-[11px] text-gray-500 leading-tight">{bedrooms} desde</p>}
              <p className="text-sm font-semibold text-[#0d2233] whitespace-nowrap">
                {fromPrice > 0 ? formatPrice(fromPrice) : 'Sob Consulta'}
              </p>
            </div>
            <span className="flex items-center justify-center h-8 w-8 border border-gray-300 text-[#0d2233] group-hover:bg-[#0d2233] group-hover:text-white transition-colors">
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    );
  }

  // variant === 'imovel'
  const price = Number(selectedPrice(property));
  const title = `${typeLabels[property.type] || property.type || 'Imóvel'}${
    property.location ? `, ${property.location}` : ''
  }`;

  return (
    <div
      onClick={go}
      className="group bg-white border border-gray-200 hover:shadow-md transition-shadow duration-300 cursor-pointer overflow-hidden flex flex-col"
    >
      {ImageArea}

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-sans text-sm text-gray-600 truncate">{title}</h3>
        <p className="text-lg font-semibold text-[#0d2233] mt-0.5 mb-3">
          {price > 0 ? formatPrice(price) : 'Sob Consulta'}
        </p>

        <div className="border-t border-gray-100 pt-3 mt-auto flex items-end justify-between">
          {/* Métricas */}
          <div className="flex items-center gap-4">
            <Metric icon={<Bed className="h-4 w-4" />} value={property.bedrooms} label="Quartos" />
            <Metric icon={<Bath className="h-4 w-4" />} value={property.bathrooms} label="C. Banho" />
            <Metric
              icon={<Maximize className="h-4 w-4" />}
              value={property.area ? `${property.area}m²` : null}
              label="Área privativa"
            />
          </div>

          {/* Ações */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={handleShare}
              aria-label="Partilhar"
              title={copied ? 'Link copiado' : 'Partilhar'}
              className="flex items-center justify-center h-8 w-8 border border-gray-300 text-gray-500 hover:border-[#0d2233] hover:text-[#0d2233] transition-colors"
            >
              {copied ? <Check className="h-4 w-4 text-green-600" /> : <Share2 className="h-4 w-4" />}
            </button>
            <span className="flex items-center justify-center h-8 w-8 border border-gray-300 text-[#0d2233] group-hover:bg-[#0d2233] group-hover:text-white transition-colors">
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Preço a mostrar num imóvel (usa o menor preço das tipologias se existir)
function selectedPrice(property: any): number {
  const types: any[] = Array.isArray(property.property_types) ? property.property_types : [];
  const prices = types.map((t) => Number(t?.price)).filter((p) => p > 0);
  if (prices.length > 0) return Math.min(...prices);
  return Number(property.price) || 0;
}

const Metric: React.FC<{ icon: React.ReactNode; value: any; label: string }> = ({ icon, value, label }) => {
  if (value == null || value === '') return null;
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex items-center gap-1 text-[#0d2233]">
        {icon}
        <span className="text-sm font-medium">{value}</span>
      </div>
      <span className="text-[10px] text-gray-400 mt-0.5">{label}</span>
    </div>
  );
};

export default PropertyCardSothebys;
