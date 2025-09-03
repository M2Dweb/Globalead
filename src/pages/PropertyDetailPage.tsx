import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Bed, Bath, Square, MapPin, Calendar, Eye, Heart, Share2, Phone, Mail } from 'lucide-react';
import ContactForm from '../components/ContactForm';

interface PropertyDetailPageProps {
  propertyId: number | null;
  onNavigate: (page: string) => void;
}

const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({ propertyId, onNavigate }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock property data - in real app this would come from database
  const property = {
    id: propertyId || 1,
    title: "Empreendimento Vila Nova",
    description: "Empreendimento completamente murado, em pedra. O exterior das moradias terá uma grande presença de betão aparente, o que lhe configurará uma imagem de modernidade e simultaneamente de robustez. As moradias dispõem de 3 quartos, sendo um deles suite, 3 casas de banho, sala e cozinha em open space, garagem e logradouro.",
    price: 450000,
    bedrooms: 3,
    bathrooms: 3,
    area: 238,
    location: "Aldoar, Porto",
    type: "moradia",
    energyClass: "B",
    yearBuilt: 2024,
    features: [
      "Garagem para 2 carros",
      "Jardim privativo",
      "Cozinha equipada",
      "Ar condicionado",
      "Aquecimento central",
      "Painéis solares",
      "Alarme",
      "Portão automático"
    ],
    images: [
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ]
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Image Gallery */}
      <section className="relative">
        <div className="relative h-96 md:h-[500px] overflow-hidden">
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

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <button className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all">
              <Heart className="h-5 w-5" />
            </button>
            <button className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="bg-gray-100 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex space-x-2 overflow-x-auto">
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
        </div>
      </section>

      {/* Property Details */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {property.title}
                  </h1>
                  <div className="text-3xl font-bold text-blue-600">
                    {formatPrice(property.price)}
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 mb-6">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="text-lg">{property.location}</span>
                </div>

                <div className="flex items-center space-x-6 text-gray-600 mb-8">
                  <div className="flex items-center">
                    <Bed className="h-5 w-5 mr-2" />
                    <span>{property.bedrooms} quartos</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 mr-2" />
                    <span>{property.bathrooms} casas de banho</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-5 w-5 mr-2" />
                    <span>{property.area}m²</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{property.yearBuilt}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Descrição</h2>
                <p className="text-gray-700 leading-relaxed">
                  {property.description}
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Características</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-lg sticky top-32">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {formatPrice(property.price)}
                  </div>
                  <div className="text-gray-600">
                    {formatPrice(Math.round(property.price / property.area))} por m²
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tipo:</span>
                    <span className="font-medium">{property.type === 'apartamento' ? 'Apartamento' : 'Moradia'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Área:</span>
                    <span className="font-medium">{property.area}m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quartos:</span>
                    <span className="font-medium">{property.bedrooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Casas de banho:</span>
                    <span className="font-medium">{property.bathrooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Classe energética:</span>
                    <span className="font-medium bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      {property.energyClass}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ano de construção:</span>
                    <span className="font-medium">{property.yearBuilt}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => window.open('tel:+351915482365', '_self')}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Ligar Agora
                  </button>
                  <button
                    onClick={() => window.open('mailto:geral@globalead.pt', '_self')}
                    className="w-full border border-blue-600 text-blue-600 py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Enviar Email
                  </button>
                  <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    Agendar Visita
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-500">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>Visto 47 vezes esta semana</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Interessado neste imóvel?
            </h2>
            <p className="text-xl text-blue-100">
              Entre em contacto connosco para mais informações
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl">
            <ContactForm page="property-detail" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyDetailPage;