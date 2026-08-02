import React, { useState, useEffect } from 'react';
import { Shield, Calendar, FileText, CreditCard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; 
import { supabase } from '../lib/supabase';
import ContentRenderer from '../components/ContentRenderer';
import FeaturedProperties2 from '../components/FeaturedProperties2';
import FeaturedEmpreendimentos from '../components/FeaturedEmpreendimentos';
import { listR2Folder } from '../lib/r2';

const HomePage: React.FC = () => {
  const [partnerLogos, setPartnerLogos] = useState<string[]>([]);
  const [currentPartnerIndex, setCurrentPartnerIndex] = useState(0);
  const [latestPosts, setLatestPosts] = useState<any[]>([]);
  const navigate = useNavigate(); // Adicionei o hook navigate

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
        const { error } = await supabase
          .from('properties')
          .select('*')
          .limit(6) // Alterado de 3 para 6
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
        const logoUrls = await listR2Folder('patrocinios');

        if (logoUrls.length === 0) {
          console.warn('Nenhum logo encontrado no R2 (homepage), usando fallback.');
          setPartnerLogos([
            "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
            "https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
            "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
            "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
            "https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
            "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop"
          ]);
        } else {
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

  const businessServices = [
    {
      icon: <CreditCard className="h-12 w-12 text-[#79b2e9]" />,
      title: "Crédito Habitação",
      description: "A Globalead é especializada em oferecer soluções de Crédito Habitação personalizadas, graças à sua relação privilegiada e poder negocial com as principais instituições bancárias em Portugal, garantindo as melhores opções para o seu agregado familiar.",
      link: "/credito"
    },
    {
      icon: <FileText className="h-12 w-12 text-[#79b2e9]" />,
      title: "Certificação Energética",
      description: "O desempenho energético de um imóvel é classificado de A+ a F e deve ser indicado através de um certificado energético, obrigatório na venda. Com a Globalead, tratamos de todo o processo, garantindo todas as condições para a venda do seu imóvel.",
      link: "/certificacao"
    },
    {
      icon: <Shield className="h-12 w-12 text-[#79b2e9]" />,
      title: "Seguros",
      description: "Um seguro é um contrato legal entre dois intervenientes e tem como objetivo fornecer proteção financeira ao segurado em caso de perdas ou danos. O segurado paga uma quantia e a seguradora fornece apoio financeiro conforme condições da apólice.",
      link: "/seguros"
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
          <source src={`${import.meta.env.VITE_R2_PUBLIC_BASE_URL}/videos/Cidade_do_Porto_-_www.globalead.pt_1_kzfzqg.mp4`} type="video/mp4" />
        </video>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Caminhamos consigo<br />lado a lado
            </h1>
            <p className="text-xl text-gray-100 max-w-4xl mx-auto">
A Globalead Portugal é uma empresa inovadora que atua como intermediária, oferecendo soluções personalizadas. Simplificamos processos e proporcionamos um apoio gratuito, garantindo um serviço adaptado às reais necessidades de cada cliente.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <FeaturedProperties2 />

      {/* Empreendimentos em destaque */}
      <FeaturedEmpreendimentos />


      {/* Services Section */}
      {/* Business Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              O melhor negócio para o seu imóvel começa aqui
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businessServices.map((service, index) => (
              <div key={index} className="hover-card-effect text-center">
                <div className="flex justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="flex justify-center text-gray-600 mb-3 text-sm flex-grow">
                  {service.description}
                </p>
                
                <button
                  onClick={() => navigate(service.link)} 
                  className="w-full bg-[#79b2e9] text-white py-2 px-12 rounded-lg hover:bg-[#0d2233] transition-colors"
                >
                  Saber mais
                </button>
              </div>
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
                style={{
                  transform: `translateX(-${currentPartnerIndex * (100 / logosPerPage)}%)`
                }}
              >
                {partnerLogos.map((logo, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-1/2 sm:w-1/5 px-2"
                  >
                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center h-32">
                      <img
                        src={logo}
                        alt={`Parceiro ${index + 1}`}
                        className="max-h-20 object-contain"
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



    </div>
  );
};

export default HomePage;