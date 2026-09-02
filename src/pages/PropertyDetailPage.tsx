import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Bed, Bath, Square, MapPin, Mail, Facebook, MessageCircle, Send, Twitter, Clock, Bell, Search, Heart, AlertCircle, PlayCircle, Car } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase, getPropertyByRef } from '../lib/supabase';
import { sendEmail, FormData } from '../utils/emailService';
import ContentRenderer from '../components/ContentRenderer';
import PropertyCardSothebys from '../components/PropertyCardSothebys';
import PropertyBuyForm from '../components/PropertyBuyForm';
import CreditCalculator from '../components/CreditCalculator';
import HoverVideo from '../components/HoverVideo';
import { imageUrl } from '../lib/imageUrl';
import { getPropertyImages } from '../lib/propertyImages';

const propertyTypeLabels: Record<string, string> = {
  apartamento: 'Apartamento',
  moradia: 'Moradia',
  terreno: 'Terreno',
  empreendimento: 'Empreendimento',
  trespasse: 'Trespasse',
};

// Métrica da barra fixa superior do imóvel
const BarMetric: React.FC<{ icon: React.ReactNode; value: React.ReactNode; label: string }> = ({ icon, value, label }) => (
  <div className="flex flex-col items-center text-center leading-tight">
    <div className="flex items-center gap-1">
      {icon}
      <span className="text-sm font-medium">{value}</span>
    </div>
    <span className="text-[10px] text-blue-200/80 mt-0.5">{label}</span>
  </div>
);

const PropertyDetailPage: React.FC = () => {
  const { ref } = useParams<{ ref: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [property, setProperty] = useState<any | null>(null);
  const [similarProperties, setSimilarProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedPropertyType, setSelectedPropertyType] = useState<any>(null);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState<Partial<FormData>>({
    nome: '',
    apelido: '',
    telemovel: '',
    email: '',
    assunto: 'Agendar Visita',
    meio_contacto: '',
    horario: '',
    mensagem: '',
    page: 'property-detail'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Galeria com a Foto de Capa (definida no /admin) em primeiro lugar.
  const propertyImages = useMemo(() => getPropertyImages(property), [property]);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!ref) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await getPropertyByRef(ref);

        if (error) {
          console.error('Erro ao carregar propriedade:', error);
          setProperty(null);
        } else {
          setProperty(data);
          if (data.property_types && data.property_types.length > 0) {
            setSelectedPropertyType(data.property_types[0]);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar propriedade:', error);
        setProperty(null);
      }
      setLoading(false);
    };

    const fetchSimilarProperties = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .neq('ref', ref)
          .eq('is_published', true)
          // Nas sugestões só entram imóveis ainda disponíveis
          .or('availability_status.is.null,availability_status.neq.vendido')
          .limit(3);

        if (error) {
          console.error('Erro ao carregar propriedades similares:', error);
        }
        setSimilarProperties(data || []);
      } catch (error) {
        console.error('Erro ao carregar propriedades similares:', error);
        setSimilarProperties([]);
      }
    };

    fetchProperty();
    fetchSimilarProperties();
  }, [ref]);

  useEffect(() => {
    if (propertyImages.length === 0) return;

    // Carousel interval
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % propertyImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [propertyImages]);

  const nextImage = () => {
    if (propertyImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % propertyImages.length);
    }
  };

  const prevImage = () => {
    if (propertyImages.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + propertyImages.length) % propertyImages.length);
    }
  };

  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return null;
    let videoId = '';
    if (url.includes('v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('youtube.com/embed/')[1].split('?')[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  const getInstagramEmbedUrl = (url: string) => {
    if (!url) return null;
    // Aceita links de reels, posts ou tv do Instagram
    const match = url.match(/instagram\.com\/(?:reel|reels|p|tv)\/([A-Za-z0-9_-]+)/);
    if (!match) return null;
    return `https://www.instagram.com/reel/${match[1]}/embed`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const shareContent = (platform: string) => {
    const url = window.location.href;
    const text = `Encontrei este imóvel que talvez te possa interessar: ${property?.title}`;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`, '_self');
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const emailData = {
        ...formData,
        mensagem: `Interesse no imóvel: ${property?.title} (Ref: ${ref})`
      };
      const success = await sendEmail(emailData as FormData);
      if (success) {
        setSubmitStatus('success');
        setFormData({
          nome: '',
          apelido: '',
          telemovel: '',
          email: '',
          assunto: 'Agendar Visita',
          meio_contacto: '',
          horario: '',
          mensagem: '',
          page: 'property-detail'
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">A carregar detalhes do imóvel...</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Imóvel não encontrado</div>
      </div>
    );
  }

  // Dados estruturados (Schema.org) do imóvel para resultados ricos no Google
  const priceValue = Number(selectedPropertyType?.price || property.price) || 0;
  // Tipologias com preço (empreendimentos) — permite escolher qual simular no crédito
  const priceableTypes: any[] = property.type === 'empreendimento' && Array.isArray(property.property_types)
    ? property.property_types.filter((t: any) => Number(t.price) > 0)
    : [];
  const plainDescription = typeof property.description === 'string'
    ? property.description.replace(/<[^>]*>?/gm, '').substring(0, 300)
    : '';
  const canonicalUrl = `https://globalead.pt/imoveis/${ref || property.ref || property.id}`;
  const isAvailable = !property.availability_status || property.availability_status === 'disponivel';

  const propertyStructuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: property.title,
        description: plainDescription,
        image: propertyImages,
        url: canonicalUrl,
        category: 'Imóvel',
        brand: { '@type': 'Organization', name: 'Globalead Portugal' },
        ...(priceValue > 0 && {
          offers: {
            '@type': 'Offer',
            price: priceValue,
            priceCurrency: 'EUR',
            availability: isAvailable ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
            url: canonicalUrl,
            seller: { '@type': 'Organization', name: 'Globalead Portugal' },
          },
        }),
        additionalProperty: [
          ...(property.bedrooms ? [{ '@type': 'PropertyValue', name: 'Quartos', value: property.bedrooms }] : []),
          ...(property.bathrooms ? [{ '@type': 'PropertyValue', name: 'Casas de banho', value: property.bathrooms }] : []),
          ...(property.area ? [{ '@type': 'PropertyValue', name: 'Área', value: property.area, unitCode: 'MTK' }] : []),
          ...(property.energy_class ? [{ '@type': 'PropertyValue', name: 'Classe energética', value: property.energy_class }] : []),
          ...(property.location ? [{ '@type': 'PropertyValue', name: 'Localização', value: property.location }] : []),
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Imóveis', item: 'https://globalead.pt/imoveis' },
          { '@type': 'ListItem', position: 2, name: 'Catálogo', item: 'https://globalead.pt/imoveis/lista' },
          { '@type': 'ListItem', position: 3, name: property.title },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{`${property.title} | Globalead Portugal`}</title>
        <meta name="description" content={typeof property.description === 'string' ? property.description.replace(/<[^>]*>?/gm, '').substring(0, 160) : ''} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={`${property.title} - ${formatPrice(selectedPropertyType?.price || property.price)}`} />
        <meta property="og:description" content={typeof property.description === 'string' ? property.description.replace(/<[^>]*>?/gm, '').substring(0, 160) : ''} />
        <meta property="og:image" content={propertyImages[0]} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={window.location.href} />
        <meta property="twitter:title" content={property.title} />
        <meta property="twitter:description" content={typeof property.description === 'string' ? property.description.replace(/<[^>]*>?/gm, '').substring(0, 160) : ''} />
        <meta property="twitter:image" content={propertyImages[0]} />

        {/* Dados estruturados do imóvel */}
        <script type="application/ld+json">
          {JSON.stringify(propertyStructuredData)}
        </script>
      </Helmet>

      {/* Barra fixa superior com os dados do imóvel.
          Encostada diretamente ao header (fixed, 72px de altura: logo h-14 + py-2).
          Nas páginas de imóvel os breadcrumbs estão desligados (ver App.tsx), por
          isso não há faixa branca vazia entre o header e esta barra. */}
      <div className="sticky top-[72px] z-30 mt-[72px] bg-[#0d2233] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => navigate(-1)}
            aria-label="Voltar"
            className="flex-shrink-0 h-9 w-9 flex items-center justify-center border border-white/30 hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="min-w-0 flex-1">
            {/* Empreendimento → mostra o NOME; imóvel normal → mostra a localização */}
            <p className="text-sm font-medium truncate">
              {property.type === 'empreendimento' ? property.title : property.location || property.title}
            </p>
            <p className="text-xs text-blue-200 truncate">
              <span className="font-semibold text-white">
                {property.type === 'empreendimento'
                  ? priceValue > 0
                    ? `Desde ${formatPrice(priceValue)}`
                    : 'Sob Consulta'
                  : formatPrice(selectedPropertyType?.price || property.price)}
              </span>
              {property.type === 'empreendimento'
                ? property.location && <> · {property.location}</>
                : property.bedrooms != null && (
                    <> · {propertyTypeLabels[property.type] || property.type} {property.bedrooms} Quartos</>
                  )}
              {property.ref && <> (ref: {property.ref})</>}
            </p>
          </div>

          {/* Métricas (desktop) */}
          {property.type !== 'empreendimento' && (
            <div className="hidden lg:flex items-center gap-5">
              {property.bedrooms != null && (
                <BarMetric icon={<Bed className="h-4 w-4" />} value={property.bedrooms} label="Quartos" />
              )}
              {property.bathrooms != null && (
                <BarMetric icon={<Bath className="h-4 w-4" />} value={property.bathrooms} label="C. Banho" />
              )}
              {property.garage && property.garage !== 'N/A' && (
                <BarMetric icon={<Car className="h-4 w-4" />} value={property.garage} label="Garagem" />
              )}
              {property.area && (
                <BarMetric icon={<Square className="h-4 w-4" />} value={`${property.area}m²`} label="Área privativa" />
              )}
            </div>
          )}

          {/* Ações */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <button
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-[#0d2233] text-sm font-medium px-4 py-2 hover:bg-[#79b2e9] hover:text-white transition-colors"
            >
              Contactar
            </button>
            <button
              onClick={() => setIsFavorite((v) => !v)}
              aria-label="Adicionar aos favoritos"
              className="h-9 w-9 flex items-center justify-center border border-white/30 hover:bg-white/10 transition-colors"
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-96 md:h-[500px] overflow-hidden rounded-xl mb-6">
            {propertyImages.map((image: string, index: number) => {
              // Só carregamos a imagem atual e as vizinhas (com wraparound).
              // Evita descarregar dezenas de imagens em tamanho real de uma vez.
              const total = propertyImages.length;
              const dist = Math.abs(index - currentImageIndex);
              const modDist = Math.min(dist, total - dist);
              if (modDist > 1) {
                return (
                  <div
                    key={index}
                    className="w-full h-full absolute top-0 left-0 opacity-0"
                    aria-hidden="true"
                  />
                );
              }
              return (
                <img
                  key={index}
                  src={imageUrl(image, { width: 1280 })}
                  alt={`${property.title} ${index + 1}`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchPriority={index === currentImageIndex ? 'high' : 'auto'}
                  className={`
                    w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000
                    ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}
                  `}
                />
              );
            })}

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
              {currentImageIndex + 1} / {propertyImages.length}
            </div>
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-4">
            {propertyImages.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${index === currentImageIndex ? 'border-[#0d2233]' : 'border-transparent'
                  }`}
              >
                <img
                  src={imageUrl(image, { width: 160 })}
                  alt={`${property.title} ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bar - Agende Visita - only for empreendimentos */}
      {property.type === 'empreendimento' && (
        <div className="bg-[#0d2233] py-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-white text-center sm:text-left">
              <p className="text-lg font-semibold">Interessado neste empreendimento?</p>
              <p className="text-sm text-blue-200">Agende uma reunião connosco e fique a conhecer todos os detalhes deste empreendimento</p>
            </div>
            <button
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex-shrink-0 bg-white text-[#0d2233] border border-[#0d2233] hover:bg-[#79b2e9] hover:text-white hover:border-[#79b2e9] font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
            >
              Agendar Visita
            </button>
          </div>
        </div>
      )}

      {/* Tipologias - Apenas para Empreendimentos */}
      {property.type === 'empreendimento' && property.property_types && property.property_types.length > 0 && (() => {
        // Group by piso
        const groups: Record<string, any[]> = {};
        property.property_types.forEach((t: any) => {
          const key = t.piso ? `Piso ${t.piso}` : 'Sem Piso';
          if (!groups[key]) groups[key] = [];
          groups[key].push(t);
        });
        const groupKeys = Object.keys(groups);
        // Init all open by default
        const isOpen = (key: string) => openGroups[key] !== false;

        return (
          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="text-2xl font-bold text-[#0d2233] mb-8 text-center">Tipologias Disponíveis</h3>

              <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
                {groupKeys.map((groupKey, gIdx) => (
                  <div key={groupKey} className={gIdx > 0 ? 'border-t-2 border-gray-300' : ''}>

                    {/* Accordion Header */}
                    <button
                      type="button"
                      onClick={() => setOpenGroups(prev => ({ ...prev, [groupKey]: !isOpen(groupKey) }))}
                      className="w-full flex items-center justify-center gap-3 px-6 py-4 hover:bg-gray-50 transition-colors duration-150 text-center"
                    >
                      <span className="font-semibold text-[#0d2233] text-lg">
                        {groupKey} <span className="text-gray-400 font-normal text-base">({groups[groupKey].length})</span>
                      </span>
                      <ChevronRight className={`h-5 w-5 text-[#79b2e9] transition-transform duration-200 ${isOpen(groupKey) ? 'rotate-90' : ''}`} />
                    </button>

                    {/* Accordion Body */}
                    {isOpen(groupKey) && (
                      <div className="overflow-x-auto">
                        {/* Desktop Table */}
                        <table className="w-full border-collapse hidden md:table">
                          <thead>
                            <tr className="bg-[#0d2233] text-white text-xs uppercase tracking-wider">
                              <th className="px-3 py-3 text-center">Fração</th>
                              <th className="px-3 py-3 text-center">Tipologia</th>
                              <th className="px-3 py-3 text-center">Piso</th>
                              <th className="px-3 py-3 text-center">WC</th>
                              <th className="px-3 py-3 text-center">Área</th>
                              <th className="px-3 py-3 text-center">Garagem</th>
                              <th className="px-3 py-3 text-center">Preço desde</th>
                              <th className="px-3 py-3 text-center"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {groups[groupKey].map((type: any, idx: number) => (
                              <tr key={idx} className="border-t border-gray-100 hover:bg-blue-50/40 transition-colors duration-150">
                                <td className="px-3 py-2 text-center text-gray-600 text-sm">{type.fracao || '-'}</td>
                                <td className="px-3 py-2 text-center">
                                  <span className="font-semibold text-[#0d2233] text-sm">{type.name}</span>
                                </td>
                                <td className="px-3 py-2 text-center text-gray-600 text-sm">{type.piso || '-'}</td>
                                <td className="px-3 py-2 text-center text-gray-600 text-sm">{type.bathrooms || '-'}</td>
                                <td className="px-3 py-2 text-center text-gray-600 text-sm">{type.area ? `${type.area} m²` : '-'}</td>
                                <td className="px-3 py-2 text-center">
                                  {type.garage === 'sim'
                                    ? <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Sim</span>
                                    : <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">Não</span>}
                                </td>
                                <td className="px-3 py-2 text-center">
                                  <span className="font-bold text-[#0d2233] text-sm">{type.price ? formatPrice(type.price) : '-'}</span>
                                </td>
                                <td className="px-3 py-2 text-center">
                                  {type.status === 'reservado' ? (
                                    <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0d2233] text-white whitespace-nowrap">
                                      Reservado
                                    </span>
                                  ) : type.status === 'vendido' ? (
                                    <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0d2233] text-white whitespace-nowrap">
                                      Vendido
                                    </span>
                                  ) : (
                                    <button
                                      onClick={() => {
                                        setSelectedPropertyType(type);
                                        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                                      }}
                                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-[#0d2233] border border-[#0d2233] hover:bg-[#79b2e9] hover:text-white hover:border-[#79b2e9] transition-colors duration-200 whitespace-nowrap"
                                    >
                                      Saber mais
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {/* Mobile — compact two-line rows */}
                        <div className="md:hidden divide-y divide-gray-100">
                          {groups[groupKey].map((type: any, idx: number) => (
                            <div
                              key={idx}
                              className="px-4 py-3 hover:bg-blue-50/30 transition-colors"
                              onClick={() => {
                                if (type.status !== 'reservado' && type.status !== 'vendido') {
                                  setSelectedPropertyType(type);
                                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                                }
                              }}
                            >
                              {/* Line 1: Name  Fr.  Piso  Price */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="font-bold text-[#0d2233] text-sm">{type.name}</span>
                                  {type.fracao && <span className="text-xs text-gray-500">Fr.{type.fracao}</span>}
                                  {type.piso && <span className="text-xs text-gray-500">Piso {type.piso}</span>}
                                </div>
                                <span className="font-bold text-[#0d2233] text-sm ml-2 whitespace-nowrap">{type.price ? formatPrice(type.price) : '-'}</span>
                              </div>
                              {/* Line 2: WC  Area  Garagem  Status */}
                              <div className="flex items-center justify-between mt-1">
                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                  {type.bathrooms && <span>{type.bathrooms} WC</span>}
                                  {type.area && <span>{type.area} m²</span>}
                                  <span>Garagem: {type.garage === 'sim' ? 'Sim' : 'Não'}</span>
                                </div>
                                {type.status === 'reservado' ? (
                                  <span className="text-xs font-semibold bg-[#0d2233] text-white px-2 py-0.5 rounded">Reservado</span>
                                ) : type.status === 'vendido' ? (
                                  <span className="text-xs font-semibold bg-[#0d2233] text-white px-2 py-0.5 rounded">Vendido</span>
                                ) : (
                                  <span className="text-xs font-semibold text-[#79b2e9]">Saber mais →</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}


      {/* Details and Form */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Description (os detalhes passaram para a barra fixa no topo) */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 p-6 rounded-xl mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Descrição do Imóvel</h3>
                <div className="text-gray-700 leading-relaxed">
                  <ContentRenderer content={property.description || ''} />
                </div>
              </div>

              {/* Map - for any property with a map URL */}
              {property.map_url && property.map_url.trim() !== '' && (
                <div className="bg-gray-50 p-6 rounded-xl mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-[#79b2e9]" /> Localização
                  </h3>
                  <div className="rounded-xl overflow-hidden h-72">
                    <iframe
                      src={(() => {
                        const url = property.map_url;
                        if (url.includes('<iframe')) {
                          const match = url.match(/src="([^"]+)"/);
                          return match ? match[1] : url;
                        }
                        return url;
                      })()}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              )}

              <div className="bg-gray-50 p-6 rounded-xl text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Partilha este conteúdo</h3>
                <div className="flex justify-center gap-4 flex-wrap">
                  <button
                    onClick={() => shareContent('facebook')}
                    className="bg-white text-[#0d2233] border border-[#0d2233] p-3 rounded-full hover:bg-[#79b2e9] hover:text-white hover:border-[#79b2e9] transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => shareContent('whatsapp')}
                    className="bg-white text-[#0d2233] border border-[#0d2233] p-3 rounded-full hover:bg-[#79b2e9] hover:text-white hover:border-[#79b2e9] transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => shareContent('telegram')}
                    className="bg-white text-[#0d2233] border border-[#0d2233] p-3 rounded-full hover:bg-[#79b2e9] hover:text-white hover:border-[#79b2e9] transition-colors"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => shareContent('twitter')}
                    className="bg-white text-[#0d2233] border border-[#0d2233] p-3 rounded-full hover:bg-[#79b2e9] hover:text-white hover:border-[#79b2e9] transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => shareContent('email')}
                    className="bg-white text-[#0d2233] border border-[#0d2233] p-3 rounded-full hover:bg-[#79b2e9] hover:text-white hover:border-[#79b2e9] transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>




            {/* Visit Form */}
            <div className="lg:col-span-1" id="contact-form">
              <div className="sticky top-32 space-y-6">
                
                {/* Vertical Video Section - Independent Box (YouTube ou ficheiro carregado no site) */}
                {property.video_url && (
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
                      <PlayCircle className="h-5 w-5 text-[#79b2e9]" />
                      <span className="font-semibold text-[#0d2233]">Virtual Tour</span>
                    </div>
                    <div className="relative aspect-[9/16] w-full overflow-hidden">
                      {getInstagramEmbedUrl(property.video_url) ? (
                        <iframe
                          src={getInstagramEmbedUrl(property.video_url) as string}
                          className="absolute left-0 w-full"
                          style={{ top: '-54px', height: 'calc(100% + 240px)' }}
                          frameBorder="0"
                          scrolling="no"
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                          allowFullScreen
                          title="Vídeo de Apresentação"
                        ></iframe>
                      ) : getYoutubeEmbedUrl(property.video_url) ? (
                        <iframe
                          src={`${getYoutubeEmbedUrl(property.video_url)}?autoplay=0&rel=0`}
                          className="absolute top-0 left-0 w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title="Vídeo de Apresentação"
                        ></iframe>
                      ) : (
                        <HoverVideo
                          src={property.video_url}
                          poster={property.video_poster || propertyImages[0]}
                        />
                      )}
                    </div>
                  </div>
                )}

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src="/carlos/facebook.jpg"
                      alt="Carlos Gonçalves"
                      className="w-20 h-20 rounded-full border-2 border-[#79b2e9] object-top object-cover"
                    />
                    <div>
                      <a
                        href="/carlos-goncalves"
                        className="hover:underline cursor-pointer"
                      >
                        <h3 className="text-xl font-bold text-[#333]">Carlos Gonçalves</h3>
                      </a>
                      <div className="mt-1 flex flex-col">
                        <span className="text-sm text-gray-500">Ou contacte-nos diretamente:</span>
                        <a href="tel:+351910647620" className="font-bold text-gray-900 text-base hover:text-[#79b2e9]">
                          +351 910 647 620
                        </a>
                      </div>
                    </div>
                  </div>
                {/* Conteúdo condicional baseado no status */}
                {property.availability_status === 'disponivel' && (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                      Agende a sua visita
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        placeholder="Nome:"
                        required
                        className="w-full px-4 py-3 border border-[#79b2e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        name="apelido"
                        value={formData.apelido}
                        onChange={handleInputChange}
                        placeholder="Apelido:"
                        className="w-full px-4 py-3 border border-[#79b2e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="tel"
                        name="telemovel"
                        value={formData.telemovel}
                        onChange={handleInputChange}
                        placeholder="Telemóvel:"
                        className="w-full px-4 py-3 border border-[#79b2e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email:"
                        required
                        className="w-full px-4 py-3 border border-[#79b2e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <select
                        name="horario"
                        value={formData.horario}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#79b2e9]">
                        <option value="">Horário</option>
                        <option value="9h">9h-12h30</option>
                        <option value="12h30">12h30-16h</option>
                        <option value="16h">16h-19h30</option>
                      </select>
                      <select
                        name="meio_contacto"
                        value={formData.meio_contacto}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#79b2e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Meio de Contacto:</option>
                        <option value="Email">Email</option>
                        <option value="Telefone">Telefone</option>
                        <option value="WhatsApp">WhatsApp</option>
                      </select>

                      <label className="flex items-start text-sm text-gray-700">
                        <input type="checkbox" className="mt-1 mr-2" required />
                        Sim, aceito os termos e condições indicados pela Globalead Portugal.
                      </label>

                      <p className="text-xs text-gray-600">
                        Os dados submetidos através deste formulário de contacto serão tratados em conformidade com a legislação em vigor sobre dados pessoais e o Regulamento Geral da Proteção de Dados (UE) 2016/679.
                      </p>

                      {submitStatus === 'success' && (
                        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                          Pedido de visita enviado com sucesso! Entraremos em contacto em breve.
                        </div>
                      )}

                      {submitStatus === 'error' && (
                        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                          Erro ao enviar pedido. Tente novamente ou contacte-nos diretamente.
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-white text-[#0d2233] border border-[#0d2233] font-semibold py-3 px-8 rounded-lg hover:bg-[#79b2e9] hover:text-white hover:border-[#79b2e9] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Enviando...' : 'Agendar Visita'}
                      </button>
                    </form>
                  </>
                )}

                {property.availability_status === 'reservado' && (
                  <>
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg mb-6">
                      <div className="flex">
                        <Clock className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                        <div className="ml-3">
                          <p className="text-yellow-700">
                            Este imóvel está atualmente reservado. Se tiver interesse, podemos incluí-lo numa lista de espera.
                          </p>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                      Quer ser notificado?
                    </h3>

                    <div className="space-y-4">
                      <button className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition flex items-center justify-center gap-2">
                        <Bell className="h-5 w-5" />
                        Avise-me se ficar disponível
                      </button>

                      <button
                        onClick={() => navigate('/imoveis/lista')}
                        className="w-full border-2 border-[#79b2e9] text-[#0d2233] py-3 rounded-lg hover:bg-blue-50 transition flex items-center justify-center gap-2"
                      >
                        <Search className="h-5 w-5" />
                        Ver imóveis disponíveis
                      </button>
                    </div>
                  </>
                )}

                {property.availability_status === 'vendido' && (
                  <>
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6">
                      <div className="flex">
                        <Heart className="h-6 w-6 text-red-500 flex-shrink-0" />
                        <div className="ml-3">
                          <p className="text-red-700">
                            Este imóvel já foi vendido. Mas temos outras opções que podem interessar-lhe!
                          </p>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                      Descubra alternativas
                    </h3>

                    <div className="space-y-4">
                      <button
                        onClick={() => navigate('/imoveis/lista')}
                        className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2"
                      >
                        <Search className="h-5 w-5" />
                        Ver imóveis disponíveis
                      </button>

                      <button
                        onClick={() => {
                          // Filtrar por características similares
                          navigate('/imoveis/lista?similares=true');
                        }}
                        className="w-full border-2 border-red-500 text-red-700 py-3 rounded-lg hover:bg-red-50 transition flex items-center justify-center gap-2"
                      >
                        <Heart className="h-5 w-5" />
                        Imóveis similares
                      </button>
                    </div>
                  </>
                )}

                {property.availability_status === 'indisponivel' && (
                  <>
                    <div className="bg-gray-50 border-l-4 border-gray-500 p-4 rounded-lg mb-6">
                      <div className="flex">
                        <AlertCircle className="h-6 w-6 text-gray-500 flex-shrink-0" />
                        <div className="ml-3">
                          <p className="text-gray-700">
                            Este imóvel está temporariamente indisponível. Contacte-nos para mais informações.
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate('/imoveis/lista')}
                      className="w-full bg-white text-[#0d2233] border border-[#0d2233] py-3 rounded-lg hover:bg-[#79b2e9] hover:text-white hover:border-[#79b2e9] transition"
                    >
                      Ver outros imóveis
                    </button>
                  </>
                )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simulador de Crédito — pré-preenchido com o valor deste imóvel */}
      {priceValue > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">
                Simule o seu crédito habitação
              </h3>
            </div>

            {/* Seletor de tipologia — só para empreendimentos com várias tipologias com preço */}
            {priceableTypes.length > 1 && (
              <div className="max-w-md mx-auto mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                  Tipologia a simular
                </label>
                <select
                  value={Math.max(0, priceableTypes.findIndex((t) => t === selectedPropertyType))}
                  onChange={(e) => setSelectedPropertyType(priceableTypes[Number(e.target.value)])}
                  className="w-full px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 bg-white text-center focus:outline-none focus:ring-2 focus:ring-[#79b2e9]"
                >
                  {priceableTypes.map((t, i) => (
                    <option key={i} value={i} className="text-center">
                      {t.name}{t.fracao ? ` · Fr. ${t.fracao}` : ''}{t.piso ? ` · Piso ${t.piso}` : ''} — {formatPrice(Number(t.price))}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <CreditCalculator
              key={priceValue}
              initialPropertyValue={priceValue}
              initialLocation={property.location || undefined}
            />
          </div>
        </section>
      )}

      {/* Similar Properties */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Imóveis Semelhantes
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProperties.map((similarProperty) => (
              <PropertyCardSothebys
                key={similarProperty.id}
                property={similarProperty}
                variant={similarProperty.type === 'empreendimento' ? 'empreendimento' : 'imovel'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Property Buy Form Section */}
      <section className="py-16 sm:py-20 bg-gray-900">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Encontre o seu imóvel ideal
          </h2>
          <p className="text-base sm:text-lg text-white max-w-2xl mx-auto">
            Diga-nos o que procura e encontraremos as melhores opções para si
          </p>
        </div>
        <PropertyBuyForm />
      </section>

    </div>
  );
};

export default PropertyDetailPage;
