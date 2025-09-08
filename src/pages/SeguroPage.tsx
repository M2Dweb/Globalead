import React, { useEffect, useState } from 'react';
import { Car, Heart, Home, Shield, Users, Briefcase, Scale, Building, Phone, Mail } from 'lucide-react';
import InsuranceComparator from '../components/InsuranceComparator';
import FAQ from '../components/FAQ';
import AnimatedSection from '../components/AnimatedSection';
import { supabase } from '../lib/supabase';

const SeguroPage: React.FC = () => {
  const [partnerLogos, setPartnerLogos] = useState<string[]>([]);
  const [currentPartnerIndex, setCurrentPartnerIndex] = useState(0);
  const [logosPerPage, setLogosPerPage] = useState(window.innerWidth < 640 ? 3 : 5);

  const insuranceTypes = [
    {
      icon: <Car className="h-12 w-12 text-[#0d2233]" />,
      title: "Seguro Automóvel",
      description: "A Globalead oferece um seguro automóvel que proporciona proteção abrangente, incluindo responsabilidade civil obrigatória, danos próprios, assistência em viagem e proteção contra roubo ou acidentes."
    },
    {
      icon: <Heart className="h-12 w-12 text-[#0d2233]" />,
      title: "Seguro de Saúde",
      description: "Cobertura para despesas médicas, incluindo consultas, exames, tratamentos, hospitalizações e acesso a redes de saúde privadas. A Globalead pode oferecer pacotes flexíveis, adaptados às necessidades familiares ou empresariais."
    },
    {
      icon: <Shield className="h-12 w-12 text-[#0d2233]" />,
      title: "Seguro de Vida",
      description: "Proteção financeira para os beneficiários em caso de falecimento ou invalidez do segurado, garantindo segurança para famílias e herdeiros. A Globalead pode incluir coberturas complementares, como doenças graves."
    },
    {
      icon: <Home className="h-12 w-12 text-[#0d2233]" />,
      title: "Seguro Multirriscos Habitação",
      description: "Cobre danos no imóvel e bens pessoais devido a eventos como incêndios, inundações, roubos e fenómenos naturais. A Globalead pode destacar soluções adaptadas a habitações primárias e secundárias."
    },
    {
      icon: <Users className="h-12 w-12 text-[#0d2233]" />,
      title: "Seguro de Acidentes Pessoais",
      description: "Proteção em caso de acidentes que resultem em despesas médicas, invalidez ou morte. A Globalead pode adaptar as coberturas para indivíduos, famílias e grupos profissionais."
    },
    {
      icon: <Briefcase className="h-12 w-12 text-[#0d2233]" />,
      title: "Seguro de Acidentes de Trabalho",
      description: "Obrigatório por lei, cobre custos associados a acidentes laborais de colaboradores. A Globalead pode oferecer soluções personalizadas para pequenas, médias e grandes empresas."
    },
    {
      icon: <Scale className="h-12 w-12 text-[#0d2233]" />,
      title: "Seguro de Proteção Jurídica",
      description: "Cobre custos com ações judiciais, consultas legais e processos relacionados ao segurado. A Globalead pode oferecer serviços jurídicos acessíveis para clientes particulares e empresariais."
    },
    {
      icon: <Building className="h-12 w-12 text-[#0d2233]" />,
      title: "Seguro Multirriscos Comercial",
      description: "Protege estabelecimentos comerciais contra danos no imóvel, equipamentos e interrupções das operações. A Globalead pode criar planos específicos para negócios de diferentes setores."
    }
  ];



  const benefits = [
    {
      icon: <Shield className="h-12 w-12 text-[#0d2233]" />,
      title: "Poupança imediata",
      description: "Beneficie das vantagens que temos ao seu dispor!"
    },
    {
      icon: <Users className="h-12 w-12 text-[#0d2233]" />,
      title: "Aconselhamento total",
      description: "Acompanhamento constante do cliente com experiência e confiança."
    },
    {
      icon: <Shield className="h-12 w-12 text-[#0d2233]" />,
      title: "Rapidez na simulação",
      description: "Ampla oferta de soluções à medida das empresas, e dos particulares."
    }
  ];




  useEffect(() => {
    const handleResize = () => setLogosPerPage(window.innerWidth < 640 ? 3 : 5);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchPartnerLogos();
  }, []);

  useEffect(() => {
    if (partnerLogos.length > 0) {
      const interval = setInterval(() => {
        setCurrentPartnerIndex(prev => (prev + 1) % (partnerLogos.length - logosPerPage + 1));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [partnerLogos.length, logosPerPage]);

  const fetchPartnerLogos = async () => {
    try {
      const { data, error } = await supabase.storage.from('imagens').list('seguros', { limit: 25, offset: 0 });
      if (error) {
        console.error('Erro ao carregar logos dos parceiros:', error);
        setPartnerLogos([
          "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
          "https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
          "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop"
        ]);
      } else if (data) {
        const logoUrls = data.map(file => {
          const { data: urlData } = supabase.storage.from('imagens').getPublicUrl(`seguros/${file.name}`);
          return urlData.publicUrl;
        });
        setPartnerLogos(logoUrls);
      }
    } catch (error) {
      console.error('Erro ao carregar logos dos parceiros:', error);
      setPartnerLogos([]);
    }
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-[#0d2233] to-blue-500 text-white py-20 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          poster="/fotos/SeguroPage-foto.png"
        >
          <source src="/videos/SeguroPage-video(1).mp4" type="video/mp4" />
        </video>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Seguramos o seu futuro!</h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto">
              Na Globalead, oferecemos soluções de seguros completas e personalizadas, pensadas para responder às necessidades reais de cada cliente, pessoal ou empresarial. Trabalhamos com as principais seguradoras do mercado, garantindo propostas competitivas, acompanhamento próximo e um serviço de excelência.
            </p>
          </div>
        </div>
      </section>

      {/* Insurance Types */}
      <AnimatedSection>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Qual o seguro que realmente necessita?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {insuranceTypes.map((insurance, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                  <div className="flex items-start">
                    <div className="mr-6 flex-shrink-0">{insurance.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{insurance.title}</h3>
                      <p className="text-gray-600">{insurance.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Insurance Comparator */}
      <AnimatedSection>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <InsuranceComparator />
          </div>
        </section>
      </AnimatedSection>

      {/* Partner Logos Slider */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Comparamos as várias instituições em Portugal
              </h2>
            </div>

            {partnerLogos.length > 0 && (
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-1000 ease-in-out"
                  style={{ transform: `translateX(-${currentPartnerIndex * (100 / logosPerPage)}%)` }}
                >
                  {partnerLogos.map((logo, index) => (
                    <div key={index} className={`flex-shrink-0 w-1/3 sm:w-1/5 px-4`}>
                      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <img src={logo} alt={`Parceiro ${index + 1}`} className="w-full h-30 object-contain" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </AnimatedSection>

      {/* Benefits */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-6">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Faça uma simulação sem compromisso!</h2>
              <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
                <div className="flex items-center"><Phone className="h-6 w-6 mr-2" /><span className="text-lg">915 482 365 (chamada rede fixa nacional)</span></div>
                <div className="flex items-center"><Mail className="h-6 w-6 mr-2" /><span className="text-lg">POR EMAIL</span></div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 w-full max-w-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Tem dúvidas? Entre em contacto</h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Nome*" className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="email" placeholder="Email*" className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="tel" placeholder="Contacto*" className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <select className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Preferência*</option>
                  <option>Email</option>
                  <option>Telefone</option>
                </select>
                <input type="text" placeholder="Assunto" className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <textarea placeholder="Mensagem" rows={4} className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                <div className="md:col-span-2">
                  <button type="submit" className="w-full bg-[#0d2233] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#79b2e9] transition-colors duration-300">Enviar Mensagem</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <p className="text-gray-700 leading-relaxed text-sm">
              No exercício da sua atividade, a Globalead Portugal estabeleceu uma parceria estratégica com a SEGUP – Corretores de Seguros, S.A., com o objetivo de reforçar a qualidade, a abrangência e a proximidade dos serviços prestados aos seus clientes. Esta colaboração alia a experiência da Globalead na gestão integrada de soluções personalizadas à competência técnica e ao sólido percurso da SEGUP no setor da mediação de seguros. Em conjunto, disponibilizamos um portefólio completo de soluções nos ramos Vida e Não Vida, com acesso às principais seguradoras do mercado. Através desta parceria, garantimos condições competitivas, acompanhamento especializado e um serviço de excelência, focado nas reais necessidades dos nossos clientes. Importa referir que a SEGUP – Corretores de Seguros, S.A., sociedade anónima com o número de pessoa coletiva 510670300, matriculada na Conservatória do Registo Comercial de Braga, encontra-se inscrita, desde 05/03/2024, na ASF – Autoridade de Supervisão de Seguros e Fundos de Pensões, como corretor de seguros, sob o n.º 624584421, com autorização para o exercício da atividade de mediação de seguros nos ramos Vida e Não Vida. O seu registo pode ser consultado em www.asf.com.pt, nos termos do artigo 32.º do Decreto-Lei n.º 144/2006, de 31 de julho.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <AnimatedSection>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQ category="seguros" />
          </div>
        </section>
      </AnimatedSection>

    </div>
  );
};

export default SeguroPage;
