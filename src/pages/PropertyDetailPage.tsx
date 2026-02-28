import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Bed, Bath, Square, MapPin, Mail, Facebook, MessageCircle, Send, Twitter, Phone, Clock, Bell, Search, Heart, AlertCircle } from 'lucide-react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase, getPropertyByRef } from '../lib/supabase';
import { sendEmail, FormData } from '../utils/emailService';
import ContentRenderer from '../components/ContentRenderer';
import PropertyBuyForm from '../components/PropertyBuyForm';
import StatusBadge from '../components/StatusBadge';

const PropertyDetailPage: React.FC = () => {
  const { ref } = useParams<{ ref: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
          setProperty({
            id: ref,
            ref: ref,
            title: "Empreendimento Noval Park",
            description: "O empreendimento Novel Park nasce em Vila Nova de Gaia, junto ao Monte da Virgem, numa das zonas mais elevadas e tranquilas da cidade. Implantado nos terrenos da Quinta do Cravel, o projeto usufrui de uma envolvente natural privilegiada, ao mesmo tempo que garante proximidade ao centro urbano e à ampla rede de serviços e acessos, tornando-se uma opção ideal para quem procura viver com equilíbrio entre natureza e comodidade.",
            price: 432600,
            bedrooms: 3,
            bathrooms: 2,
            area: 145,
            location: "Vila Nova de Gaia",
            type: "empreendimento",
            energy_class: "NA",
            year_built: 2026,
            garage: 3,
            reference: "T3NPVNG",
            state: "Novo",
            features: ["Garagem para 3 carros", "Jardim privativo", "Cozinha equipada"],
            images: [
              "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200",
              "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200",
              "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200"
            ],
            property_types: [
              {
                name: "T1",
                area: 70,
                price: 218000,
                garage: "C/Garagem",
                floor_plan: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400"
              },
              {
                name: "T2A",
                area: 100,
                price: 298700,
                garage: "C/Garagem p/ 2 lugares",
                floor_plan: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400"
              },
              {
                name: "T2B",
                area: 118,
                price: 350200,
                garage: "C/Garagem p/ 2 lugares",
                floor_plan: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400"
              },
              {
                name: "T3",
                area: 145,
                price: 432600,
                garage: "C/Garagem p/ 3 lugares",
                floor_plan: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=400"
              }
            ]
          });
          setSelectedPropertyType({
            name: "T3",
            area: 145,
            price: 432600,
            garage: "C/Garagem p/ 3 lugares",
            floor_plan: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=400"
          });
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
          .limit(3);

        if (error) {
          console.error('Erro ao carregar propriedades similares:', error);
        }

        setSimilarProperties(data || [
          {
            id: 2,
            title: "Apartamento T2 Moderno",
            price: 280000,
            bedrooms: 2,
            bathrooms: 1,
            area: 85,
            location: "Cedofeita, Porto",
            images: ["https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400"]
          },
          {
            id: 3,
            title: "Moradia T4 com Jardim",
            price: 520000,
            bedrooms: 4,
            bathrooms: 3,
            area: 200,
            location: "Matosinhos, Porto",
            images: ["https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=400"]
          },
          {
            id: 4,
            title: "Apartamento T1 Centro",
            price: 180000,
            bedrooms: 1,
            bathrooms: 1,
            area: 55,
            location: "Campanhã, Porto",
            images: ["https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400"]
          }
        ]);
      } catch (error) {
        console.error('Erro ao carregar propriedades similares:', error);
        setSimilarProperties([]);
      }
    };

    fetchProperty();
    fetchSimilarProperties();
  }, [ref]);

  useEffect(() => {
    if (!property || !property.images) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [property]);

  const nextImage = () => {
    if (property) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    }
  };

  const prevImage = () => {
    if (property) {
      setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
    }
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
    const text = `Confira este imóvel: ${property?.title}`;

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
      console.log('Dados do formulário PropertyDetail:', emailData);
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section
        className="relative text-white py-12 mt-16"
        style={{
          backgroundImage: `url(${property.images[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <StatusBadge status={property.availability_status || 'disponivel'} size="lg" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{property.title}</h1>

          {property.type !== 'empreendimento' && (
            <div className="flex justify-center items-center space-x-8 text-lg relative z-10">
              <div className="flex items-center">
                <Bed className="h-6 w-6 mr-2" />
                <span>{property.bedrooms}</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-6 w-6 mr-2" />
                <span>{property.bathrooms}</span>
              </div>
              <div className="flex items-center">
                <Square className="h-6 w-6 mr-2" />
                <span>{property.area}m²</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-96 md:h-[500px] overflow-hidden rounded-xl mb-6">
            {property.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${property.title} ${index + 1}`}
                className={`
                  w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000
                  ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}
                `}
              />
            ))}

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
              {currentImageIndex + 1} / {property.images.length}
            </div>
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-4">
            {property.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${index === currentImageIndex ? 'border-[#0d2233]' : 'border-transparent'
                  }`}
              >
                <img
                  src={image}
                  alt={`${property.title} ${index + 1}`}
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
              className="flex-shrink-0 bg-[#79b2e9] hover:bg-white hover:text-[#0d2233] text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
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
                      className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors duration-150 text-left"
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
                                    <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-yellow-100 text-yellow-800 whitespace-nowrap">
                                      Reservado
                                    </span>
                                  ) : type.status === 'vendido' ? (
                                    <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-100 text-red-800 whitespace-nowrap">
                                      Vendido
                                    </span>
                                  ) : (
                                    <button
                                      onClick={() => {
                                        setSelectedPropertyType(type);
                                        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                                      }}
                                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#79b2e9] text-white hover:bg-[#0d2233] transition-colors duration-200 whitespace-nowrap"
                                    >
                                      Saber mais
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {/* Mobile */}
                        <div className="md:hidden divide-y divide-gray-200">
                          {groups[groupKey].map((type: any, idx: number) => (
                            <div key={idx} className="px-4 py-3">
                              <div className="flex justify-between mb-1">
                                <div className="flex items-center gap-2">
                                  {type.fracao && <span className="text-xs text-gray-400">Fr. {type.fracao}</span>}
                                  <span className="font-semibold text-[#0d2233]">{type.name}</span>
                                  {type.piso && <span className="text-xs text-gray-400">Piso {type.piso}</span>}
                                </div>
                                <span className="font-bold text-[#0d2233] text-sm">{type.price ? formatPrice(type.price) : '-'}</span>
                              </div>
                              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-500 mb-2">
                                {type.bathrooms && <span>{type.bathrooms} WC</span>}
                                {type.area && <span>{type.area} m²</span>}
                                <span>Garagem: {type.garage === 'sim' ? 'Sim' : 'Não'}</span>
                              </div>
                              {type.status === 'reservado' ? (
                                <div className="w-full py-2 rounded-lg text-sm font-semibold bg-yellow-100 text-yellow-800 text-center">
                                  Reservado
                                </div>
                              ) : type.status === 'vendido' ? (
                                <div className="w-full py-2 rounded-lg text-sm font-semibold bg-red-100 text-red-800 text-center">
                                  Vendido
                                </div>
                              ) : (
                                <button
                                  onClick={() => {
                                    setSelectedPropertyType(type);
                                    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                                  }}
                                  className="w-full py-2 rounded-lg text-sm font-semibold bg-[#79b2e9] text-white hover:bg-[#0d2233] transition-colors duration-200"
                                >
                                  Saber mais
                                </button>
                              )}
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
            {/* Details and Description - hidden for empreendimentos */}
            <div className="lg:col-span-2">
              {property.type !== 'empreendimento' && (
                <div className="bg-gray-50 p-6 rounded-xl mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Detalhes</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Preço:</span>
                      <span className="font-semibold">
                        {formatPrice(selectedPropertyType?.price || property.price)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Estado:</span>
                      <span className="font-semibold">{property.state || 'Novo'}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Área útil:</span>
                      <span className="font-semibold">
                        {selectedPropertyType?.area || property.area}m²
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Quartos:</span>
                      <span className="font-semibold">{property.bedrooms}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Casas de banho:</span>
                      <span className="font-semibold">{property.bathrooms}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Ano de Construção:</span>
                      <span className="font-semibold">{property.year_built}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Estacionamento:</span>
                      <span className="font-semibold">{property.garage || 'N/A'}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Certificado energético:</span>
                      <span className="font-semibold">{property.energy_class}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Referência:</span>
                      <span className="font-semibold">{property.ref || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 p-6 rounded-xl mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Descrição do Imóvel</h3>
                <div className="text-gray-700 leading-relaxed">
                  <ContentRenderer content={property.description || ''} />
                </div>
              </div>

              {/* Map - only for empreendimentos */}
              {property.type === 'empreendimento' && property.map_url && (
                <div className="bg-gray-50 p-6 rounded-xl mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-[#79b2e9]" /> Localização
                  </h3>
                  <div className="rounded-xl overflow-hidden h-72">
                    <iframe
                      src={property.map_url}
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

              {property.type !== 'empreendimento' && (
                <div className="bg-gray-50 p-6 rounded-xl text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Partilha este conteúdo</h3>
                  <div className="flex justify-center gap-4 flex-wrap">
                    <button
                      onClick={() => shareContent('facebook')}
                      className="bg-[#79b2e9] text-white p-3 rounded-full hover:bg-[#0d2233] transition-colors"
                    >
                      <Facebook className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => shareContent('whatsapp')}
                      className="bg-[#79b2e9] text-white p-3 rounded-full hover:bg-[#0d2233] transition-colors"
                    >
                      <MessageCircle className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => shareContent('telegram')}
                      className="bg-[#79b2e9] text-white p-3 rounded-full hover:bg-[#0d2233] transition-colors"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => shareContent('twitter')}
                      className="bg-[#79b2e9] text-white p-3 rounded-full hover:bg-[#0d2233] transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => shareContent('email')}
                      className="bg-[#79b2e9] text-white p-3 rounded-full hover:bg-[#0d2233] transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>




            {/* Visit Form */}
            <div className="lg:col-span-1" id="contact-form">
              <div className="bg-white p-6 rounded-xl shadow-lg sticky top-32">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src="/carlos/pe-fato-meio3-fundo.jpg"
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
                      <a href="tel:+351915482365" className="font-bold text-gray-900 text-base hover:text-[#79b2e9]">
                        +351 915 482 365
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
                        name="horário"
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
                        className="w-full bg-[#0d2233] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#79b2e9] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                      className="w-full bg-[#0d2233] text-white py-3 rounded-lg hover:bg-[#79b2e9] transition"
                    >
                      Ver outros imóveis
                    </button>
                  </>
                )}



              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Properties */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Imóveis Semelhantes
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarProperties.map((similarProperty) => (
              <Link
                key={similarProperty.id}
                to={`/imoveis/${similarProperty.ref || similarProperty.id}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={similarProperty.images[0]}
                  alt={similarProperty.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">

                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {similarProperty.title}
                  </h4>
                  <div className="flex items-center space-x-4 text-gray-600 mb-3">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      <span>{similarProperty.bedrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      <span>{similarProperty.bathrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1" />
                      <span>{similarProperty.area}m²</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{similarProperty.location}</span>

                    </div>
                  </div>
                  <div className="text-gray-600 text-sm line-clamp-3">
                    <ContentRenderer content={similarProperty.description || ''} />
                  </div>

                </div>
                <div className="p-3">
                  <button
                    className="w-full bg-[#79b2e9] text-white py-2 px-4 rounded-lg hover:bg-[#0d2233] transition"
                    onClick={() => navigate(`/imoveis/${property.ref || property.id}`)}
                  >
                    Ver Detalhes
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Property Buy Form Section */}

      <section className="py-16 sm:py-20 bg-gray-900">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4 sm:mb-6">
          </div>
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