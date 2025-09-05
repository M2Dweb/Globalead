import React, { useState } from 'react';
import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, Bed, Bath, Square, MapPin, Calendar, Eye, Heart, Share2, Phone, Mail, Facebook, MessageCircle, Send, Linkedin, Twitter } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import { supabase } from '../lib/supabase';

interface PropertyDetailPageProps {
  propertyId: string | null;
  onNavigate: (page: string) => void;
}

const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({ propertyId, onNavigate }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [property, setProperty] = useState<any | null>(null);
  const [similarProperties, setSimilarProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPropertyType, setSelectedPropertyType] = useState<any>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!propertyId) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from('properties')
        .select('*')
        .eq('id', propertyId)
        .single();
      
      if (data) {
        setProperty(data);
        if (data.property_types && data.property_types.length > 0) {
          setSelectedPropertyType(data.property_types[0]);
        }
      } else {
        // Fallback data
        setProperty({
          id: propertyId,
          title: "Empreendimento Noval Park",
          description: "O empreendimento Novel Park nasce em Vila Nova de Gaia, junto ao Monte da Virgem, numa das zonas mais elevadas e tranquilas da cidade. Implantado nos terrenos da Quinta do Cravel, o projeto usufrui de uma envolvente natural privilegiada, ao mesmo tempo que garante proximidade ao centro urbano e à ampla rede de serviços e acessos, tornando-se uma opção ideal para quem procura viver com equilíbrio entre natureza e comodidade.",
          price: 432600,
          bedrooms: 3,
          bathrooms: 2,
          area: 145,
          location: "Vila Nova de Gaia",
          type: "empreendimento",
          energy_class: "NA",
          year_built: 2025,
          parking: 3,
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
      }
      setLoading(false);
    };

    const fetchSimilarProperties = async () => {
      const { data } = await supabase
        .from('properties')
        .select('*')
        .neq('id', propertyId)
        .limit(3);
      
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
    };

    fetchProperty();
    fetchSimilarProperties();
  }, [propertyId]);

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
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Detalhes do Imóvel
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
              {property.title}
            </h2>
            
            {/* Property Info */}
            <div className="flex justify-center items-center space-x-8 text-lg">
              <div className="flex items-center">
                <Bed className="h-6 w-6 mr-2" />
                <span>{property.bedrooms} quartos</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-6 w-6 mr-2" />
                <span>{property.bathrooms} casas de banho</span>
              </div>
              <div className="flex items-center">
                <Square className="h-6 w-6 mr-2" />
                <span>{property.area}m²</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-96 md:h-[500px] overflow-hidden rounded-xl mb-6">
            <img
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation Arrows */}
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

            {/* Image Counter */}
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
              {currentImageIndex + 1} / {property.images.length}
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex space-x-2 overflow-x-auto pb-4">
            {property.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${
                  index === currentImageIndex ? 'border-blue-600' : 'border-transparent'
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

      {/* Property Types (for developments) */}
      {property.property_types && property.property_types.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Tipologias Disponíveis
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {property.property_types.map((type, index) => (
                <div
                  key={index}
                  className={`bg-white p-6 rounded-xl shadow-lg cursor-pointer transition-all ${
                    selectedPropertyType?.name === type.name ? 'ring-2 ring-blue-600' : ''
                  }`}
                  onClick={() => setSelectedPropertyType(type)}
                >
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{type.name}</h4>
                  <p className="text-gray-600 mb-2">Área de {type.area} m², {type.garage}</p>
                  <p className="text-2xl font-bold text-blue-600 mb-4">desde {formatPrice(type.price)}</p>
                  <img
                    src={type.floor_plan}
                    alt={`Planta ${type.name}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Details and Form */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Details and Description */}
            <div className="lg:col-span-2">
              {/* Details */}
              <div className="bg-gray-50 p-6 rounded-xl mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Detalhes</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-gray-600">Preço:</span>
                    <div className="font-semibold">{formatPrice(selectedPropertyType?.price || property.price)}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Estado:</span>
                    <div className="font-semibold">{property.state || 'Novo'}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Área útil:</span>
                    <div className="font-semibold">{selectedPropertyType?.area || property.area}m²</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Área bruta:</span>
                    <div className="font-semibold">{selectedPropertyType?.area || property.area}m²</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Quartos:</span>
                    <div className="font-semibold">{property.bedrooms}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Casas de banho:</span>
                    <div className="font-semibold">{property.bathrooms}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Ano de Construção:</span>
                    <div className="font-semibold">{property.year_built}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Estacionamento:</span>
                    <div className="font-semibold">{property.parking || 'N/A'}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Certificado energético:</span>
                    <div className="font-semibold">{property.energy_class}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Referência:</span>
                    <div className="font-semibold">{property.reference || 'N/A'}</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-gray-50 p-6 rounded-xl mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Descrição do Imóvel</h3>
                <p className="text-gray-700 leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Share Content */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Partilha este conteúdo</h3>
                <div className="flex space-x-4">
                  <button
                    onClick={() => shareContent('facebook')}
                    className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => shareContent('whatsapp')}
                    className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => shareContent('telegram')}
                    className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => shareContent('linkedin')}
                    className="bg-blue-700 text-white p-3 rounded-full hover:bg-blue-800 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => shareContent('twitter')}
                    className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => shareContent('email')}
                    className="bg-gray-600 text-white p-3 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Visit Form */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-lg sticky top-32">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Agende a sua visita
                </h3>
                
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nome:"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Apelido:"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="tel"
                    placeholder="Telemóvel:"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Email:"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="date"
                    placeholder="Data da Visita:"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Meio de Contacto:</option>
                    <option>Email</option>
                    <option>Telefone</option>
                    <option>WhatsApp</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Horário:"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  
                  <label className="flex items-start text-sm text-gray-700">
                    <input type="checkbox" className="mt-1 mr-2" />
                    Sim, aceito os termos e condições indicados pela Globalead Portugal.
                  </label>
                  
                  <p className="text-xs text-gray-600">
                    Os dados submetidos através deste formulário de contacto serão tratados em conformidade com a legislação em vigor sobre dados pessoais e o Regulamento Geral da Proteção de Dados (UE) 2016/679.
                  </p>
                  
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    Agendar Visita
                  </button>
                </form>
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
              <div
                key={similarProperty.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => onNavigate('property-detail')}
              >
                <img
                  src={similarProperty.images[0]}
                  alt={similarProperty.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {formatPrice(similarProperty.price)}
                  </div>
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
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{similarProperty.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sell Property Form */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Deseja vender o seu imóvel?
            </h2>
            <p className="text-xl text-blue-100">
              Utilize este formulário para dar a conhecer o seu imóvel e aproveite a certificação energética sem custos!
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Nome"
                className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Apelido"
                className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                placeholder="Telemóvel"
                className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Pretendo</option>
                <option>Vender</option>
                <option>Arrendar</option>
                <option>Comprar</option>
              </select>
              <input
                type="text"
                placeholder="Localização"
                className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Código Postal"
                className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Tipo de Imóvel</option>
                <option>Apartamento</option>
                <option>Moradia</option>
                <option>Terreno</option>
                <option>Comercial</option>
              </select>
              <input
                type="number"
                placeholder="Preço Máx (€)"
                className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Área Min (m²)"
                className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Nº de Quartos</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4+</option>
              </select>
              <select className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Nº de Casas de Banho</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4+</option>
              </select>
              
              <div className="md:col-span-2">
                <label className="flex items-start text-sm text-gray-700 mb-4">
                  <input type="checkbox" className="mt-1 mr-2" />
                  Sim, aceito os termos e condições indicados pela Globalead Portugal e confirmo ter compreendido as políticas de proteção de dados que regulam este formulário.
                </label>
                <p className="text-xs text-gray-600 mb-6">
                  Os dados submetidos através deste formulário serão tratados em conformidade com a legislação vigente sobre proteção de dados pessoais e o Regulamento Geral da Proteção de Dados (UE) 2016/679, sendo plenamente respeitados pela Globalead Portugal.
                </p>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Enviar Pedido
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyDetailPage;