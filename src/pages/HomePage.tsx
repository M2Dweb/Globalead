import React, { useState, useEffect } from 'react';
import { Shield, Zap, Tv, Calendar, Siren, Cctv } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { sendEmail, FormData } from '../utils/emailService';
import ContentRenderer from '../components/ContentRenderer';
import FeaturedProperties from '../components/FeaturedProperties';

const HomePage: React.FC = () => {
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
  const [latestPosts, setLatestPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('date', { ascending: false })
          .limit(6);

        if (error) {
          console.error('Erro ao carregar posts:', error);
          setLatestPosts([]);
        } else {
          setLatestPosts(data || []);
        }
      } catch (error) {
        console.error('Erro ao carregar posts:', error);
        setLatestPosts([]);
      }
    };

    fetchLatestPosts();
  }, []);

  
  const [logosPerPage, setLogosPerPage] = useState(
    window.innerWidth < 640 ? 2 : 5
  );

  useEffect(() => {
    const handleResize = () => {
      setLogosPerPage(window.innerWidth < 640 ? 2 : 5);
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
          
        
        }
      } catch (error) {
        console.error('Erro ao carregar propriedades:', error);
        
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
      icon: <Cctv className="h-12 w-12 text-[#79b2e9]" />,
      title: "Alarmes",
      description: "Os alarmes são dispositivos de segurança projetados para alertar sobre eventos específicos, relacionados à segurança pessoal, propriedade etc. Desempenham um papel crucial na prevenção de incidentes indesejados e na proteção do seu lar",
      link: "/alarmes"
    },
    {
      icon: <Zap className="h-12 w-12 text-[#79b2e9]" />,
      title: "Energia",
      description: "A eletricidade e o gás natural desempenham papéis essenciais na vida moderna, indispensáveis para diversas atividades realizadas diariamente. É crucial atender a todos os clientes com a melhor oferta energética de forma a facilitar a sua decisão",
      link: "/energia"
    },
    {
      icon: <Shield className="h-12 w-12 text-[#79b2e9]" />,
      title: "Seguros",
      description: "Um seguro é um contrato legal entre dois intervenientes e tem como objetivo fornecer proteção financeira ao segurado em caso de perdas ou danos. O segurado paga uma quantia e a seguradora fornece apoio financeiro conforme definido nas condições da apólice",
      link: "/seguros"
    },
    {
      icon: <Tv className="h-12 w-12 text-[#79b2e9]" />,
      title: "TV, Net, Voz",
      description: "As telecomunicações são essenciais para a conectividade e desempenham um papel crucial na propagação de informações em muitas áreas da sociedade. A Globalead apresenta várias soluções e pretende atender às reais necessidades de cada cliente",
      link: "/tv-net-voz"
    }
  ];

  

  

  useEffect(() => {
    if (partnerLogos.length > 0) {
      const interval = setInterval(() => {
        setCurrentPartnerIndex(prev => {
          // Corrigido para evitar índice negativo
          const maxIndex = Math.max(0, partnerLogos.length - logosPerPage);
          return (prev + 1) % (maxIndex + 1);
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [partnerLogos.length, logosPerPage]);

  //{ const formatPrice = (price: number) => {
  //  return new Intl.NumberFormat('pt-PT', {
  //    style: 'currency',
  //    currency: 'EUR',
  //    maximumFractionDigits: 0
  // }).format(price);


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
      <section className="relative min-h-screen bg-gradient-to-br from-blue-900 to-[#79b2e9] text-white py-20 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          poster="/fotos/HomePage-foto.png"
        >
          <source src="https://dzkxlimlbabjstaivuja.supabase.co/storage/v1/object/public/imagens/videos/Cidade_do_Porto_-_www.globalead.pt_1_kzfzqg.mp4" type="video/mp4" />
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

      {/* Featured Properties */}
      <FeaturedProperties />

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
                >
                 
                  <div className="w-full bg-[#79b2e9] text-white py-2 px-4 rounded-lg hover:bg-[#0d2233] transition-colors text-center">
                    Saber mais
                  </div>
                  
                </Link>
              </motion.div>
            ))}
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
                    className={`flex-shrink-0 w-1/2 sm:w-1/5 px-4`}
                  >
                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                      <img
                        src={logo}
                        alt={`Parceiro ${index + 1}`}
                        className="w-full h-25 object-contain p-4"
                        style={{
                          filter: `
                            grayscale(100%) 
                            brightness(20%) 
                            sepia(100%) 
                            
                            hue-rotate(200deg)
                          `,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Últimas Notícias
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map(post => (
              <Link
                key={post.id}
               to={`/blog/${post.ref || post.id}`}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group border border-gray-100"
              >
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-[#0d2233] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                  </div>
                  <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                    {post.read_time}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(post.date).toLocaleDateString('pt-PT')}</span>
                    <span className="mx-2">•</span>
                    <span>Por {post.author}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#0d2233] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    <ContentRenderer content={post.excerpt} className="line-clamp-3" />
                  </p>

                  <div className="w-full bg-[#79b2e9] text-white py-2 px-4 rounded-lg hover:bg-[#0d2233] transition-colors text-center">
                    Ler Mais
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Tem dúvidas?
              </h2>
              <h2 className="text-3xl md:text-2xl mb-2">
                Entre em contacto
              </h2>
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
                  className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="apelido"
                  value={formData.apelido}
                  onChange={handleInputChange}
                  placeholder="Apelido:"
                  className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="tel"
                  name="telemovel"
                  value={formData.telemovel}
                  onChange={handleInputChange}
                  placeholder="Telemóvel:"
                  className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email:"
                  required
                  className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select 
                  name="meio_contacto"
                  value={formData.meio_contacto}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                
                <select name="horário" value={formData.horario} onChange={handleInputChange} className="md:col-span-2 px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#79b2e9]">
                  <option value="">Horário</option>
                  <option>9h-12h30</option>
                  <option>12h30-16h</option>
                  <option>16h-19h30</option>
                </select>

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
                    className="w-full bg-[#0d2233] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#79b2e9] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Enviando...' : 'Entrar em contacto'}
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