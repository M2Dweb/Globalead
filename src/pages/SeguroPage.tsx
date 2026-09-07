import React, { useEffect, useState } from 'react';
import { Car, Heart, Home, Shield, Users, Briefcase, Scale, Building } from 'lucide-react';
import InsuranceComparator from '../components/InsuranceComparator';
import FAQ from '../components/FAQ';
import AnimatedSection from '../components/AnimatedSection';
import { listR2Folder } from '../lib/r2';
import { useTranslation } from 'react-i18next';
import { sendEmail, FormData } from '../utils/emailService';

const SeguroPage: React.FC = () => {
  const [partnerLogos, setPartnerLogos] = useState<string[]>([]);
  const [currentPartnerIndex] = useState(0);
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
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  

  const insuranceTypes = [
    { icon: <Car className="h-12 w-12 text-[#79b2e9]" />, title: t('seguros.autoTitulo'), description: t('seguros.autoTexto') },
    { icon: <Heart className="h-12 w-12 text-[#79b2e9]" />, title: t('seguros.saudeTitulo'), description: t('seguros.saudeTexto') },
    { icon: <Shield className="h-12 w-12 text-[#79b2e9]" />, title: t('seguros.vidaTitulo'), description: t('seguros.vidaTexto') },
    { icon: <Home className="h-12 w-12 text-[#79b2e9]" />, title: t('seguros.habitacaoTitulo'), description: t('seguros.habitacaoTexto') },
    { icon: <Users className="h-12 w-12 text-[#79b2e9]" />, title: t('seguros.acidentesTitulo'), description: t('seguros.acidentesTexto') },
    { icon: <Briefcase className="h-12 w-12 text-[#79b2e9]" />, title: t('seguros.trabalhoTitulo'), description: t('seguros.trabalhoTexto') },
    { icon: <Scale className="h-12 w-12 text-[#79b2e9]" />, title: t('seguros.juridicaTitulo'), description: t('seguros.juridicaTexto') },
    { icon: <Building className="h-12 w-12 text-[#79b2e9]" />, title: t('seguros.comercialTitulo'), description: t('seguros.comercialTexto') }
  ];

  const benefits = [
  { 
    icon: <Shield className="h-8 w-8 text-white" />, 
    title: t('seguros.poupancaTitulo'), 
    description: t('seguros.poupancaTexto') 
  },
  { 
    icon: <Users className="h-8 w-8 text-white" />, 
    title: t('seguros.aconselhamentoTitulo'), 
    description: t('seguros.aconselhamentoTexto') 
  },
  { 
    icon: <Shield className="h-8 w-8 text-white" />, 
    title: t('seguros.rapidezTitulo'), 
    description: t('seguros.rapidezTexto') 
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
      const logoUrls = await listR2Folder('seguros');
      setPartnerLogos(logoUrls);
    } catch { setPartnerLogos([]); }
  };

  
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section — banner com vídeo */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-900 to-[#79b2e9] text-white py-20 flex items-center overflow-hidden">
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('seguros.heroTitulo')}
            </h1>
          </div>
        </div>
      </section>

      {/* Insurance Types */}
      <AnimatedSection>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('seguros.tiposTitulo')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {insuranceTypes.map((i, idx) => (
                <div key={idx} className="hover-card-effect">
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
               <span className="text-[#79b2e9]"> {t('seguros.comparamos1')}</span>{t('seguros.comparamos2')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((b, idx) => (
                <div key={idx} className="text-center group">
                  <div className="hover-card-effect">
                    
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
              {t('home.parceirosTitulo')}
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
              <h2 className="text-4xl font-bold mb-6">{t('seguros.formTitulo')}</h2>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 w-full max-w-2xl">
              {/* Título "Tem dúvidas" removido */}
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} placeholder={t('formulario.nomeObr')} required className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#79b2e9]" />
                <input type="text" name="apelido" value={formData.apelido} onChange={handleInputChange} placeholder={t('formulario.apelidoObr')} required className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#79b2e9]" />
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder={t('formulario.emailObr')} required className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#79b2e9]" />
                <input type="tel" name="telemovel" value={formData.telemovel} onChange={handleInputChange} placeholder={t('formulario.contactoObr')} className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#79b2e9]" />
                <select name="meio_contacto" value={formData.meio_contacto} onChange={handleInputChange} className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#79b2e9]">
                  <option value="">{t('formulario.preferenciaObr')}</option>
                  <option value="Email">Email</option>
                  <option value="Whatsapp">Whatsapp</option>
                  <option value="Telefone">{t('formulario.telefone')}</option>
                </select>
                <select name="assunto" value={formData.assunto} onChange={handleInputChange} className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#79b2e9]">
                  <option value="">{t('formulario.assuntoSimples')}</option>
                  <option value="Pedido de Simulação">{t('formulario.pedidoSimulacao')}</option>
                  <option value="Esclarecimento de Dúvidas">{t('formulario.duvidas')}</option>
                  <option value="Outro">{t('formulario.outro')}</option>
                </select>
                <select name="horário" value={formData.horario} onChange={handleInputChange} className="md:col-span-2 px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#79b2e9]">
                  <option value="">{t('formulario.horario')}</option>
                  <option>9h-12h30</option>
                  <option>12h30-16h</option>
                  <option>16h-19h30</option>
                </select>
                <textarea name="mensagem" value={formData.mensagem} onChange={handleInputChange} placeholder={t('formulario.mensagem')} rows={4} className="md:col-span-2 px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#79b2e9]"></textarea>
                <div className="md:col-span-2">
                  <label className="flex items-start text-sm text-gray-700 mb-4">
                    <input type="checkbox" className="mt-1 mr-2" required />
                    {t('formulario.aceitoTermos')}
                  </label>
                  <p className="text-xs text-gray-600 mb-4">
                    {t('formulario.rgpd')}
                  </p>
                  {submitStatus === 'success' && <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">{t('formulario.sucesso')}</div>}
                  {submitStatus === 'error' && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{t('formulario.erro')}</div>}
                  <button type="submit" disabled={isSubmitting} className="w-full bg-[#79b2e9] text-white font-semibold py-3 px-8 rounded-lg hover:[#0d2233] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? t('formulario.aEnviar') : t('formulario.enviarContacto')}
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
                {t('seguros.faqTitulo')}
              </h2>
            </div>
            <div className="bg-gray-900"><FAQ category="seguros" /></div>
            
            {/* Texto ajustado com padding equilibrado */}
            <div className="bg-gray-900 shadow-sm text-gray-500 text-xs py-12 text-justify">
              {t('seguros.segup')}
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default SeguroPage;
