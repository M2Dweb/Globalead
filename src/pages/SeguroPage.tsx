import React, { useEffect, useState } from 'react';
import { Car, Heart, Home, Shield, Users, Briefcase, Scale, Building } from 'lucide-react';
import InsuranceComparator from '../components/InsuranceComparator';
import FAQ from '../components/FAQ';
import AnimatedSection from '../components/AnimatedSection';
import { supabase } from '../lib/supabase';
import { sendEmail, FormData } from '../utils/emailService';

const SeguroPage: React.FC = () => {
  const [partnerLogos, setPartnerLogos] = useState<string[]>([]);
  const [currentPartnerIndex, setCurrentPartnerIndex] = useState(0);
  const [logosPerPage, setLogosPerPage] = useState(window.innerWidth < 640 ? 2 : 5);
  const [formData, setFormData] = useState<Partial<FormData>>({
    nome: '',
    apelido: '',
    telemovel: '',
    email: '',
    assunto: '',
    meio_contacto: '',
    horario: '',
    mensagem: '',
    page: 'seguros'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  

  const insuranceTypes = [
    { icon: <Car className="h-12 w-12 text-[#79b2e9]" />, title: "Seguro Automóvel", description: "A Globalead oferece proteção abrangente para o seu automóvel." },
    { icon: <Heart className="h-12 w-12 text-[#79b2e9]" />, title: "Seguro de Saúde", description: "Cobertura para despesas médicas e tratamentos especializados." },
    { icon: <Shield className="h-12 w-12 text-[#79b2e9]" />, title: "Seguro de Vida", description: "Proteção financeira para os beneficiários em caso de falecimento ou invalidez." },
    { icon: <Home className="h-12 w-12 text-[#79b2e9]" />, title: "Multirriscos Habitação", description: "Proteção contra danos no imóvel e bens pessoais." },
    { icon: <Users className="h-12 w-12 text-[#79b2e9]" />, title: "Acidentes Pessoais", description: "Cobertura em caso de acidentes que resultem em despesas médicas." },
    { icon: <Briefcase className="h-12 w-12 text-[#79b2e9]" />, title: "Acidentes de Trabalho", description: "Obrigatório por lei, cobre custos associados a acidentes laborais." },
    { icon: <Scale className="h-12 w-12 text-[#79b2e9]" />, title: "Proteção Jurídica", description: "Cobre custos com ações judiciais e consultas legais." },
    { icon: <Building className="h-12 w-12 text-[#79b2e9]" />, title: "Multirriscos Comercial", description: "Protege estabelecimentos comerciais contra danos e interrupções." }
  ];

  const benefits = [
  { 
    icon: <Shield className="h-8 w-8 text-white" />, 
    title: "Poupança imediata", 
    description: "Beneficie das vantagens que temos ao seu dispor!" 
  },
  { 
    icon: <Users className="h-8 w-8 text-white" />, 
    title: "Aconselhamento total", 
    description: "Acompanhamento constante do cliente com experiência e confiança." 
  },
  { 
    icon: <Shield className="h-8 w-8 text-white" />, 
    title: "Rapidez na simulação", 
    description: "Ampla oferta de soluções à medida das empresas e dos particulares." 
  }
];


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const success = await sendEmail(formData as FormData);
      if (success) {
        setSubmitStatus('success');
        setFormData({ nome: '', apelido: '', telemovel: '', email: '', assunto: '', meio_contacto: '', horario: '', mensagem: '', page: 'seguros' });
      } else setSubmitStatus('error');
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleResize = () => setLogosPerPage(window.innerWidth < 640 ? 2 : 5);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => { fetchPartnerLogos(); }, []);

  useEffect(() => {
    
  }, [partnerLogos.length, logosPerPage]);

  const fetchPartnerLogos = async () => {
    try {
      const { data, error } = await supabase.storage.from('imagens').list('seguros', { limit: 25, offset: 0 });
      if (error) setPartnerLogos([]);
      else if (data) {
        const logoUrls = data.map(file => supabase.storage.from('imagens').getPublicUrl(`seguros/${file.name}`).data.publicUrl);
        setPartnerLogos(logoUrls);
      }
    } catch { setPartnerLogos([]); }
  };

  
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-[#79b2e9] text-white py-16 sm:py-20 px-4 overflow-hidden">

        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: 'url("/fotos/SeguroPage-foto.png")'
          }}
        ></div>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mt-14">
              Seguramos o seu futuro!
            </h1>
          </div>
        </div>
      </section>

      {/* Insurance Types */}
      <AnimatedSection>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Qual o seguro que realmente necessita?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {insuranceTypes.map((i, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-md hover:[#0d2233] border border-gray-100 transition-shadow duration-300">
                  <div className="flex items-start">
                    <div className="mr-6 flex-shrink-0">{i.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{i.title}</h3>
                      <p className="text-gray-600">{i.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Benefits */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
               <span className="text-[#79b2e9]"> Comparamos as várias instituições</span> em Portugal
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((b, idx) => (
                <div key={idx} className="text-center group">
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                    
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#79b2e9] to-blue-600 rounded-full flex items-center justify-center">
                        {b.icon}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {b.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                      {b.description}
                    </p>
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

      {/* CTA Section */}
      <section  id="form-section" className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-6">Faça uma simulação sem compromisso!</h2>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 w-full max-w-2xl">
              {/* Título "Tem dúvidas" removido */}
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} placeholder="Nome*" required className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#79b2e9]" />
                <input type="text" name="apelido" value={formData.apelido} onChange={handleInputChange} placeholder="Apelido*" required className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#79b2e9]" />
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email*" required className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#79b2e9]" />
                <input type="tel" name="telemovel" value={formData.telemovel} onChange={handleInputChange} placeholder="Contacto*" className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#79b2e9]" />
                <select name="meio_contacto" value={formData.meio_contacto} onChange={handleInputChange} className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#79b2e9]">
                  <option value="">Preferência*</option>
                  <option>Email</option>
                  <option>Whatsapp</option>
                  <option>Telefone</option>
                </select>
                <select name="assunto" value={formData.assunto} onChange={handleInputChange} className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#79b2e9]">
                  <option value="">Assunto</option>
                  <option>Pedido de Simulação</option>
                  <option>Esclarecimento de Dúvidas</option>
                  <option>Outro</option>
                </select>
                <select name="horário" value={formData.horario} onChange={handleInputChange} className="md:col-span-2 px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#79b2e9]">
                  <option value="">Horário</option>
                  <option>9h-12h30</option>
                  <option>12h30-16h</option>
                  <option>16h-19h30</option>
                </select>
                <textarea name="mensagem" value={formData.mensagem} onChange={handleInputChange} placeholder="Mensagem" rows={4} className="md:col-span-2 px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#79b2e9]"></textarea>
                <div className="md:col-span-2">
                  <label className="flex items-start text-sm text-gray-700 mb-4">
                    <input type="checkbox" className="mt-1 mr-2" required />
                    Sim, aceito os termos e condições indicados pela Globalead Portugal.
                  </label>
                  <p className="text-xs text-gray-600 mb-4">
                    Os dados submetidos através deste formulário de contacto serão tratados em conformidade com a legislação em vigor sobre dados pessoais e o Regulamento Geral da Protecção de Dados (UE) 2016/679.
                  </p>
                  {submitStatus === 'success' && <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">Mensagem enviada com sucesso! Entraremos em contacto em breve.</div>}
                  {submitStatus === 'error' && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">Erro ao enviar mensagem. Tente novamente ou contacte-nos diretamente.</div>}
                  <button type="submit" disabled={isSubmitting} className="w-full bg-[#79b2e9] text-white font-semibold py-3 px-8 rounded-lg hover:[#0d2233] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Enviando...' : 'Entrar em Contacto'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <AnimatedSection>
        <section className="mt- bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Tem alguma questão que não foi contemplada?
              </h2>
            </div>
            <div className="bg-gray-900"><FAQ category="seguros" /></div>
            
            {/* Texto ajustado com padding equilibrado */}
            <div className="bg-gray-900 shadow-sm text-gray-500 text-xs py-12 text-justify">
              No exercício da sua atividade, a Globalead Portugal estabeleceu uma parceria estratégica com a SEGUP – Corretores de Seguros, S.A., com o objetivo de reforçar a qualidade, a abrangência e a proximidade dos serviços prestados aos seus clientes. Esta colaboração alia a experiência da Globalead na gestão integrada de soluções personalizadas à competência técnica e ao sólido percurso da SEGUP no setor da mediação de seguros. Em conjunto, disponibilizamos um portefólio completo de soluções nos ramos Vida e Não Vida, com acesso às principais seguradoras do mercado. Através desta parceria, garantimos condições competitivas, acompanhamento especializado e um serviço de excelência, focado nas reais necessidades dos nossos clientes. Importa referir que a SEGUP – Corretores de Seguros, S.A., sociedade anónima com o número de pessoa coletiva 510670300, matriculada na Conservatória do Registo Comercial de Braga, encontra-se inscrita, desde 05/03/2024, na ASF – Autoridade de Supervisão de Seguros e Fundos de Pensões, como corretor de seguros, sob o n.º 624584421, com autorização para o exercício da atividade de mediação de seguros nos ramos Vida e Não Vida. O seu registo pode ser consultado em www.asf.com.pt, nos termos do artigo 32.º do Decreto-Lei n.º 144/2006, de 31 de julho.
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default SeguroPage;
