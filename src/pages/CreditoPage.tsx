import React, { useEffect, useState } from 'react';
import { Calculator, CreditCard, FileText } from 'lucide-react';

import CreditCalculator from '../components/CreditCalculator';
import ContactForm from '../components/ContactForm';
import { supabase } from '../lib/supabase';
import FAQ from '../components/FAQ';

const CreditoPage: React.FC = () => {
  const [partnerLogos, setPartnerLogos] = useState<string[]>([]);
  const [currentPartnerIndex, setCurrentPartnerIndex] = useState(0);

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
    fetchPartnerLogos();
  }, []);

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

  const fetchPartnerLogos = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('imagens')
        .list('bancos', {
          limit: 20,
          offset: 0
        });

      if (error) {
        console.error('Erro ao carregar logos dos parceiros:', error);
        // Fallback logos
        setPartnerLogos([
          "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
          "https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
          "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
          "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
          "https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
          "https://dzkxlimlbabjstaivuja.supabase.co/storage/v1/object/public/imagens/bancos/xxx.png"
        ]);
      } else if (data) {
        const logoUrls = data.map(file => {
          const { data: urlData } = supabase.storage
            .from('imagens')
            .getPublicUrl(`bancos/${file.name}`);
          return urlData.publicUrl;
        });
        setPartnerLogos(logoUrls);
      }
    } catch (error) {
      console.error('Erro ao carregar logos dos parceiros:', error);
      setPartnerLogos([]);
    }
  };

  const services = [
    {
      icon: <CreditCard className="h-12 w-12 text-[#79b2e9]" />,
      title: "Intermediação de Crédito",
      description: "Ajudamos a encontrar as melhores condições de financiamento, trabalhando com as principais instituições financeiras para garantir acesso a taxas competitivas e soluções personalizadas."
    },
    {
      icon: <Calculator className="h-12 w-12 text-[#79b2e9]" />,
      title: "Planeamento Personalizado",
      description: "Oferecemos simulações claras e rápidas do crédito habitação, permitindo-lhe perceber o impacto das prestações no seu orçamento para tomar decisões informadas."
    },
    {
      icon: <FileText className="h-12 w-12 text-[#79b2e9]" />,
      title: "Burocracia Simplificada",
      description: "A nossa equipa acompanha-o em todo o processo, desde a análise inicial até à aprovação do empréstimo, negociando diretamente com os bancos para poupar-lhe tempo e esforço."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-[#79b2e9] text-white py-16 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mt-9">
              Ajudamos na compra da sua casa
            </h1>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="leading-relaxed mb-6">
              Na Globalead Portugal, reconhecemos que a aquisição de um imóvel é um dos momentos mais significativos na vida de qualquer família e por isso oferecemos um serviço de crédito habitação totalmente personalizado.
            </p>
            <p className="leading-relaxed mb-6">
              A nossa equipa estabelece parcerias com as principais instituições financeiras para negociar condições de financiamento que reflitam o seu perfil, objetivos e necessidades reais, garantindo um acompanhamento próximo em todas as etapas.
            </p>
            <p className="leading-relaxed mb-6">
              Em vez de recorrer a simuladores genéricos, realizamos uma avaliação profunda e individualizada que projeta o valor das prestações com base no montante, no prazo e nas taxas aplicáveis. A consultoria gratuita e independente ajuda-o a escolher o banco que oferece o melhor equilíbrio entre custos e benefícios, maximizando a sua poupança mensal.
            </p>
            <p className="leading-relaxed">
              Tratamos de toda a burocracia, incluindo recolha de documentação, análise e renegociação de propostas até à assinatura da escritura, para que possa concretizar o sonho da casa própria com total transparência, tranquilidade e confiança.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="flex justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credit Calculator */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <CreditCalculator />
          <div className="text-center mt-6"> 
            
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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


      {/* Contact Form */}
      <section className="py-20 bg-gray-900 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Contratar um crédito habitação é a decisão financeira mais impactante da tua vida
            </h2>
          </div>

          <div className="bg-white p-8 rounded-xl">
            <ContactForm 
              page="credito" 
            />
          </div>
        </div>
      </section>

      {/* Doutor Finanças Form Section */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Formulário de Contacto Especializado
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Utilize o nosso formulário especializado para obter uma consulta personalizada sobre o seu crédito habitação.
            </p>
          </div>

          <div className="text-center">
            <a
              href="https://www.doutorfinancas.pt/rede-loja-monte-crasto-gondomar/?ref=68d6a89d886b7&src=icdf.ch.lacerdakiala.Modular.GlobaLead#form-fale-connosco"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-[#79b2e9] hover:bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Calculator className="w-6 h-6 mr-3" />
              Preencher Formulário Especializado
            </a>
            <p className="text-sm text-gray-500 mt-4">
              Será redirecionado para o formulário do Doutor Finanças numa nova janela
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Pedir um crédito habitação passo a passo
            </h2>
          </div>

          <div>
            <FAQ category="credito" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreditoPage;
