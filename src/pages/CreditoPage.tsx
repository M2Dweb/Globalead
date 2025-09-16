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
        setCurrentPartnerIndex(prev => (prev + 1) % (partnerLogos.length - logosPerPage));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [partnerLogos.length, logosPerPage]);

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
        // Fallback logos
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
      <section className="bg-gradient-to-br from-blue-900 to-[#79b2e9] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Ajudamos na compra da sua casa
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto">
              Na Globalead Portugal, reconhecemos que a aquisição de um imóvel é um dos momentos mais significativos na vida de qualquer família e por isso oferecemos um serviço de crédito habitação totalmente personalizado.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-gray-700">
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      <section className="py-20">
        <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
          <CreditCalculator />
          <div className="text-center mt-6">
            <p className="text-lg text-gray-600 font-medium">
              Para números precisos, entre em contacto
            </p>
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
                    className={`flex-shrink-0 w-1/3 sm:w-1/5 px-4`} // 2 por vez no mobile, 5 no desktop
                  >
                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                      <img
                        src={logo}
                        alt={`Parceiro ${index + 1}`}
                        className="w-full h-30 object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 100% Financing Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 p-8 rounded-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Como funciona o Crédito Habitação com 100% financiamento para jovens?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Quando solicitas um crédito habitação existem vários fatores que influenciam o banco a financiar, sendo 90% o limite máximo do valor do imóvel emprestado pelos bancos para habitação própria e permanente. No entanto, desde setembro de 2024 é possível o crédito habitação 100% financiado através da garantia pública do Estado.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              Esta poderá chegar até aos 15% do valor do imóvel, cobrindo o valor que não é financiado pelos bancos. Válido para jovens até aos 35 anos com imóveis até 450.000 euros ou para casas do banco. No caso das instituições bancárias, vendem-nos a preços inferiores e com condições únicas, para reaverem parte do valor investido.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Requisitos:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Idade:</strong> Entre 18 e 35 anos, com domicílio fiscal em Portugal</li>
                  <li><strong>Rendimentos:</strong> Não podem ultrapassar 81.199 euros anuais</li>
                  <li><strong>Propriedade:</strong> Não pode ser proprietário de qualquer imóvel</li>
                  <li><strong>Benefícios anteriores:</strong> Não pode ter beneficiado de garantias públicas</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Condições:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Valor do imóvel:</strong> Até 350.000€ (450.000€ em certas regiões)</li>
                  <li><strong>Limite da garantia:</strong> Máximo 25% do valor da transação</li>
                  <li><strong>Duração:</strong> Garantia válida por 10 anos</li>
                  <li><strong>Prazo:</strong> Contrato até 31 de dezembro de 2026</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-[#0d2233] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
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

      {/* FAQ Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pedir um crédito habitação passo a passo
            </h2>
          </div>

          <div className="bg-gray-900">
            <FAQ category="credito" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreditoPage;