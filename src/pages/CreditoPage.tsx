import React, { useEffect, useState } from 'react';
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

  

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-[#79b2e9] text-white py-16 sm:py-20 px-4 overflow-hidden">
        
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: 'url("https://dzkxlimlbabjstaivuja.supabase.co/storage/v1/object/public/imagens/videos/fundo2.jpg")'
          }}
        ></div>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mt-14">
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

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ajudamos a <span className="text-[#79b2e9]">otimizar o seu orçamento familiar</span> e muito mais
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Os nossos serviços de intermediação de crédito são completamente gratuitos e oferecem vantagens exclusivas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefit 1 */}
            <div className="text-center group">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#79b2e9] to-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Consiga as melhores condições de mercado
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  Comparamos ofertas de múltiplas instituições financeiras para garantir as taxas mais competitivas e condições mais vantajosas para o seu perfil.
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="text-center group">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#79b2e9] to-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Evite a burocracia. Tratamos de tudo por si
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  Cuidamos de toda a documentação, negociações e procedimentos burocráticos, poupando-lhe tempo e eliminando o stress do processo.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="text-center group">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#79b2e9] to-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Acompanhamento durante todo o processo
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  Desde a primeira consulta até à assinatura da escritura, estamos sempre ao seu lado para esclarecer dúvidas e garantir o sucesso.
                </p>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="text-center group">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#79b2e9] to-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Os serviços de intermediação de crédito são gratuitos
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  Não paga nada pelos nossos serviços. A nossa remuneração vem diretamente das instituições financeiras, sem qualquer custo adicional para si.
                </p>
              </div>
            </div>
          </div>

          
          
        </div>
      </section>

      {/* Credit Calculator 
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <CreditCalculator />
          <div className="text-center mt-6"> 
            
          </div>
        </div>
      </section>*/}

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
      <section id="contact-form" className="py-20 bg-gray-900 text-white px-4 sm:px-6 lg:px-8">
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

          <div className="bg-gray-900 shadow-sm text-gray-500 text-xs py-12 text-justify">
             No exercício da sua atividade, a Globalead Portugal estabeleceu uma parceria estratégica com a Lacerda & Kiala Lda., com o objetivo de reforçar a qualidade, a abrangência e a proximidade dos serviços financeiros disponibilizados aos seus clientes. Esta colaboração alia a experiência da Globalead na gestão integrada de soluções personalizadas à competência técnica da Lacerda & Kiala Lda. no setor da intermediação de crédito. A Lacerda & Kiala Lda. encontra-se registada no Banco de Portugal, sob o n.º 0007977, como intermediário de crédito vinculado, sem regime de exclusividade, dispondo de contratos celebrados com as seguintes instituições: Banco Santander Totta, S.A., Banco BPI, S.A., Caixa Geral de Depósitos, S.A., Banco CTT, S.A., Union de Créditos Inmobiliários, S.A. – Establecimiento Financiero de Crédito (Sociedad Unipersonal) – Sucursal em Portugal, Bankinter, S.A. – Sucursal em Portugal, Abanca Corporación Bancaria, S.A. – Sucursal em Portugal, Banco BIC Português, S.A., Novo Banco, S.A., e Sicam – Caixa Central e Caixas de Crédito Agrícola Mútuo.No âmbito da sua autorização, a Lacerda & Kiala Lda. está habilitada a: Apresentar ou propor contratos de crédito a consumidores; Prestar assistência a consumidores através da realização de atos preparatórios ou de gestão pré-contratual relativamente a contratos de crédito não apresentados por si; Celebrar contratos de crédito com consumidores em nome das instituições mutuantes; Prestar serviços de consultoria especializada. Importa referir que a marca Lacerda & Kiala Lda. é detida pela Doutor Finanças Unipessoal Lda. O registo da Lacerda & Kiala Lda. pode ser consultado no site oficial do Banco de Portugal, nos termos do Regime Jurídico dos Intermediários de Crédito.
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreditoPage;
