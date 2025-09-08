import React, { useState, useEffect } from 'react';
import { ArrowRight, Home, Shield, Zap, Star, ChevronLeft, ChevronRight, Bed, Bath, Square, MapPin, Tv, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { sendEmail, FormData } from '../utils/emailService';

const HomePage: React.FC = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const [properties, setProperties] = useState<any[]>([]);
  const [partnerLogos, setPartnerLogos] = useState<string[]>([]);
  const [currentPartnerIndex, setCurrentPartnerIndex] = useState(0);
  const [formData, setFormData] = useState<Partial<FormData>>({
    nome: '',
    apelido: '',
    telemovel: '',
    email: '',
    assunto: '',
    meio_contacto: '',
    horario: '',
    page: 'home'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [reviewsPerPage, setReviewsPerPage] = useState(
    window.innerWidth < 640 ? 1 : 2
  );

  const [logosPerPage, setLogosPerPage] = useState(
    window.innerWidth < 640 ? 3 : 5
  );

  useEffect(() => {
    const handleResize = () => {
      setReviewsPerPage(window.innerWidth < 640 ? 1 : 2);
      setLogosPerPage(window.innerWidth < 640 ? 3 : 5);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .limit(3)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Erro ao carregar propriedades:', error);
          setProperties([
            {
              id: 1,
              title: "Empreendimento Noval Park",
              price: 432600,
              bedrooms: 3,
              bathrooms: 2,
              area: 145,
              location: "Vila Nova de Gaia",
              images: ["https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800"]
            },
            {
              id: 2,
              title: "Apartamento T2 Moderno",
              price: 280000,
              bedrooms: 2,
              bathrooms: 1,
              area: 85,
              location: "Cedofeita, Porto",
              images: ["https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800"]
            },
            {
              id: 3,
              title: "Moradia T4 com Jardim",
              price: 520000,
              bedrooms: 4,
              bathrooms: 3,
              area: 200,
              location: "Matosinhos, Porto",
              images: ["https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800"]
            }
          ]);
        } else {
          setProperties(data || []);
        }
      } catch (error) {
        console.error('Erro ao carregar propriedades:', error);
        setProperties([]);
      }
    };

    const fetchPartnerLogos = async () => {
      try {
        const { data, error } = await supabase.storage
          .from('imagens')
          .list('patrocinios', {
            limit: 20,
            offset: 0
          });

        if (error) {
          console.error('Erro ao carregar logos dos parceiros:', error);
          setPartnerLogos([
            "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
            "https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
            "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
            "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
            "https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
            "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop"
          ]);
        } else if (data) {
          const logoUrls = data.map(file => {
            const { data: urlData } = supabase.storage
              .from('imagens')
              .getPublicUrl(`patrocinios/${file.name}`);
            return urlData.publicUrl;
          });
          setPartnerLogos(logoUrls);
        }
      } catch (error) {
        console.error('Erro ao carregar logos dos parceiros:', error);
        setPartnerLogos([]);
      }
    };

    fetchProperties();
    fetchPartnerLogos();
  }, []);

  const services = [
    {
      icon: <Shield className="h-12 w-12 text-red-600" />,
      title: "Alarmes",
      description: "Os alarmes são dispositivos de segurança projetados para alertar sobre eventos específicos, relacionados à segurança pessoal, propriedade etc. Desempenham um papel crucial na prevenção de incidentes indesejados e na proteção do seu lar",
      link: "/alarmes"
    },
    {
      icon: <Zap className="h-12 w-12 text-yellow-600" />,
      title: "Energia",
      description: "A eletricidade e o gás natural desempenham papéis essenciais na vida moderna, indispensáveis para diversas atividades realizadas diariamente. É crucial atender a todos os clientes com a melhor oferta energética de forma a facilitar a sua decisão",
      link: "/energia"
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Seguros",
      description: "Um seguro é um contrato legal entre dois intervenientes e tem como objetivo fornecer proteção financeira ao segurado em caso de perdas ou danos. O segurado paga uma quantia e a seguradora fornece apoio financeiro conforme definido nas condições da apólice",
      link: "/seguros"
    },
    {
      icon: <Tv className="h-12 w-12 text-purple-600" />,
      title: "TV, Net, Voz",
      description: "As telecomunicações são essenciais para a conectividade e desempenham um papel crucial na propagação de informações em muitas áreas da sociedade. A Globalead apresenta várias soluções e pretende atender às reais necessidades de cada cliente",
      link: "/tv-net-voz"
    }
  ];

  const reviews = [
    {
      name: "Daniel Gomes",
      platform: "Facebook",
      review: "Estou extremamente satisfeito com a experiência que tive. Foram bastante profissionais e prestaram um serviço de excelência.",
      rating: 5
    },
    {
      name: "Pedro Tavares",
      platform: "Google",
      review: "Consegui vender o meu imóvel em menos de 1 mês e adquirir a minha moradia de sonho com a ajuda da Globalead.",
      rating: 5
    },
    {
      name: "Ana Torres",
      platform: "Livro de Elogios",
      review: "Valorizo a clareza na forma como a Globalead me apresentou todas as soluções de seguros para a minha viatura.",
      rating: 5
    },
    {
      name: "Maria Silva",
      platform: "Google",
      review: "Atendimento personalizado e profissional. Recomendo vivamente os serviços da Globalead.",
      rating: 5
    },
    {
      name: "João Santos",
      platform: "Facebook",
      review: "Excelente acompanhamento durante todo o processo de compra. Equipa muito competente.",
      rating: 5
    },
    {
      name: "Carla Mendes",
      platform: "Google",
      review: "Conseguiram-me um seguro com condições muito melhores que o anterior. Muito satisfeita!",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview(prev => (prev + reviewsPerPage) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [reviews.length, reviewsPerPage]);

  useEffect(() => {
    if (partnerLogos.length > 0) {
      const interval = setInterval(() => {
        setCurrentPartnerIndex(prev => (prev + 1) % Math.max(1, partnerLogos.length - logosPerPage + 1));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [partnerLogos.length, logosPerPage]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price);
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
      console.log('Dados do formulário HomePage:', formData);
      const success = await sendEmail(formData as FormData);
      if (success) {
        setSubmitStatus('success');
        setFormData({
          nome: '',
          apelido: '',
          telemovel: '',
          email: '',
          assunto: '',
          meio_contacto: '',
          horario: '',
          page: 'home'
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          poster="/fotos/HomePage-foto.png"
        >
          <source src="/videos/HomePage-video(1).mp4" type="video/mp4" />
        </video>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Caminhamos consigo<br />lado a lado
            </h1>
            <p className="text-xl text-gray-100 max-w-4xl mx-auto">
              A Globalead Portugal é uma empresa inovadora que atua como intermediária, oferecendo soluções personalizadas em diversos setores. Com foco na comodidade, segurança e eficiência, simplificamos processos e proporcionamos um apoio gratuito, garantindo um serviço adaptado às reais necessidades e exigências de cada cliente.
            </p>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Visite o seu próximo lar de sonho
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Link
                key={property.id}
                to={`/imoveis/${property.id}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {formatPrice(property.price)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {property.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      <span>{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      <span>{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1" />
                      <span>{property.area}m²</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{property.location}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {property.description}
                  </p>
                  <div className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center">
                    Ver Detalhes
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/imoveis/lista"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold inline-flex items-center"
            >
              Ver Todos os Imóveis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Compare e adira à melhor oferta
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div className="flex justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 text-sm">
                  {service.description}
                </p>
                <Link
                  to={service.link}
                  className="text-blue-600 font-medium hover:text-blue-700 transition-colors inline-flex items-center"
                >
                  Saber mais
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section - 2 at a time */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              O que dizem os nossos clientes
            </h2>
            <p className="text-xl text-gray-600">
              6 avaliações de clientes satisfeitos
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentReview * (100 / reviewsPerPage)}%)` }}
            >
              {reviews.map((review, index) => (
                <div key={index} className="flex-shrink-0 w-full sm:w-1/2 px-4">
                  <div className="bg-gray-50 p-8 rounded-xl text-center h-full">
                    <div className="flex justify-center mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 text-lg mb-6 italic">
                      "{review.review}"
                    </p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-gray-900">{review.name}</p>
                      <p className="text-sm text-gray-500">Review: {review.platform}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(reviews.length / reviewsPerPage) }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReview(index * reviewsPerPage)}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      Math.floor(currentReview / reviewsPerPage) === index
                        ? "bg-blue-600"
                        : "bg-gray-300"
                    }`}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Compare as várias instituições em Portugal
            </h2>
          </div>

          {partnerLogos.length > 0 && (
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${currentPartnerIndex * (100 / logosPerPage)}%)` }}
              >
                {partnerLogos.map((logo, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 w-1/3 sm:w-1/5 px-4`}
                  >
                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                      <img
                        src={logo}
                        alt={`Parceiro ${index + 1}`}
                        className="w-full h-25 object-contain p-4"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Pronto para começar?
              </h2>
              <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-4">
                <div className="flex items-center">
                  <Phone className="h-6 w-6 mr-2" />
                  <span className="text-lg">915 482 365 (chamada rede fixa nacional)</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 w-full max-w-2xl">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Nome:"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="apelido"
                  value={formData.apelido}
                  onChange={handleInputChange}
                  placeholder="Apelido:"
                  className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="tel"
                  name="telemovel"
                  value={formData.telemovel}
                  onChange={handleInputChange}
                  placeholder="Telemóvel:"
                  className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email:"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select 
                  name="meio_contacto"
                  value={formData.meio_contacto}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Meio de Contacto:</option>
                  <option value="Email">Email</option>
                  <option value="Telefone">Telefone</option>
                  <option value="WhatsApp">WhatsApp</option>
                </select>
                
                <select 
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Assunto:</option>
                  <option value="Esclarecimento de Dúvidas">Esclarecimento de Dúvidas</option>
                  <option value="Pretendo Comprar um Imóvel">Pretendo Comprar um Imóvel</option>
                  <option value="Pretendo Vender um Imóvel">Pretendo Vender um Imóvel</option>
                  <option value="Pretendo Arrendar um Imóvel">Pretendo Arrendar um Imóvel</option>
                  <option value="Pedido de Simulação para Créditos">Pedido de Simulação para Créditos</option>
                  <option value="Pedido de Certificado Energético">Pedido de Certificado Energético</option>
                  <option value="Pedido de Simulação Energia">Pedido de Simulação Energia</option>
                  <option value="Pedido de Simulação TV NET VOZ">Pedido de Simulação TV NET VOZ</option>
                  <option value="Pedido de Simulação Seguros">Pedido de Simulação Seguros</option>
                  <option value="Pedido de Simulação Alarmes">Pedido de Simulação Alarmes</option>
                </select>
                
                <input
                  type="text"
                  name="horario"
                  value={formData.horario}
                  onChange={handleInputChange}
                  placeholder="Horário:"
                  className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="md:col-span-2">
                  <label className="flex items-start text-sm text-gray-700 mb-4">
                    <input type="checkbox" className="mt-1 mr-2" required />
                    Sim, aceito os termos e condições indicados pela Globalead Portugal.
                  </label>
                  <p className="text-xs text-gray-600 mb-4">
                    Os dados submetidos através deste formulário de contacto serão tratados em conformidade com a legislação em vigor sobre dados pessoais e o Regulamento Geral da Protecção de Dados (UE) 2016/679.
                  </p>
                  
                  {submitStatus === 'success' && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                      Mensagem enviada com sucesso! Entraremos em contacto em breve.
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                      Erro ao enviar mensagem. Tente novamente ou contacte-nos diretamente.
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Pedido'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;