import React, { useState, useEffect } from 'react';
import { Star, Cpu, Search, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { sendEmail , FormData } from '../utils/emailService';
import FounderVideoSection from '../components/FounderVideoSection';
import goncalo from "../../public/testemonials/goncalo-vinhas.jpg"
import fml from "../../public/testemonials/familia-gomes.jpg"
import franc from "../../public/testemonials/francisco-gonçalves.jpg"

const SobrePage: React.FC = () => {
  const { t } = useTranslation();
  const [, setCurrentReview] = useState(0);
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

  const [expandedTestimonials, setExpandedTestimonials] = useState<boolean[]>([false, false, false, false, false, false]); // controlar "ler mais" por testimonial

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Gonçalo Vinhas",
      image: goncalo ,
      platform: "WhatsApp",
      review: t('testemunhos.goncalo')
    },
    {
      name: "Francisco Gonçalves",
      image: franc ,
      platform: "Facebook",
      review: t('testemunhos.francisco')
    },
    {
      name: "Família Gomes",
      image: fml ,
      platform: "Google",
      review: t('testemunhos.familiaGomes')
    },
    {
      name: "Liliana da Silva",
      image: "/testemonials/liliana.jpg",
      platform: "Instagram",
      review: t('testemunhos.liliana')
    },
    {
      name: "Wneres & Daiane",
      image: "/testemonials/Wneres.jpg",
      platform: "WhatsApp",
      review: t('testemunhos.wneres')
    },
    {
      name: "Ana Fernandes",
      image: "/testemonials/Ana.jpg",
      platform: "Facebook",
      review: t('testemunhos.ana')
    }
  ];

  const toggleExpand = (index: number) => {
    setExpandedTestimonials(prev => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  const reasons = [
    { number: "1", title: t('sobre.razao1Titulo'), description: t('sobre.razao1Texto'), icon: <Cpu className="w-7 h-7"/> },
    { number: "2", title: t('sobre.razao2Titulo'), description: t('sobre.razao2Texto'), icon: <Search className="w-7 h-7" /> },
    { number: "3", title: t('sobre.razao3Titulo'), description: t('sobre.razao3Texto'), icon: <Star className="w-7 h-7" /> },
    { number: "4", title: t('sobre.razao4Titulo'), description: t('sobre.razao4Texto'), icon: <ShieldCheck className="w-7 h-7" /> },
  ];

  const objectives = [
    { number: "1", description: t('sobre.objetivo1') },
    { number: "2", description: t('sobre.objetivo2') },
    { number: "3", description: t('sobre.objetivo3') },
    { number: "4", description: t('sobre.objetivo4') },
    { number: "5", description: t('sobre.objetivo5') },
    { number: "6", description: t('sobre.objetivo6') }
  ];

return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-900 to-[#79b2e9] text-white py-20 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          poster="/fotos/SobrePage-foto.png"
        >
          <source src="/videos/SobrePage-video(1).mp4" type="video/mp4" />
        </video>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('sobre.heroTitulo')}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {t('sobre.heroTexto')}
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              {t('sobre.p1')}
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              {t('sobre.p2')}
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              {t('sobre.p3')}
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              {t('sobre.p4')}
            </p>
          </div>
        </div>
      </section>

      {/* Ajudamos a tomar decisões inteligentes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('sobre.razoesTitulo')}
            </h2>
          </div>

          {/* 4 pontos lado a lado */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="hover-card-effect text-center"
              >
                <div className="flex justify-center items-center mb-4">
                  <div className="bg-[#79b2e9] text-white w-14 h-14 rounded-full flex items-center justify-center">
                    {reason.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {reason.title}
                </h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FounderVideoSection />

      {/* Objetivos da Globalead */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('sobre.objetivosTitulo')}
            </h2>
          </div>

          {/* 2 colunas x 3 linhas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {objectives.map((objective, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl flex items-start"
              >
                <div className="bg-[#79b2e9] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  {objective.number}
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {objective.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              {t('testemunhos.titulo')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => {
              const words = testimonial.review.split(' ');
              const isExpanded = expandedTestimonials[index];
              const maxWords = 35;
              const displayText = isExpanded || words.length <= maxWords
                ? testimonial.review
                : words.slice(0, maxWords).join(' ') + '...';

              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg w-full text-center flex flex-col justify-between overflow-hidden border border-gray-100"
                >
                  <div className="flex justify-center">
                    <img src={testimonial.image} alt="testimonial" className="w-full h-64 object-cover" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-center mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-current" />
                        ))}
                      </div>
                    </div>

                    <div className="flex-grow flex items-center justify-center mb-4">
                      <p className="text-gray-600 italic">
                        "{displayText}"
                        {words.length > maxWords && !isExpanded && (
                          <span
                            className="ml-1 font-bold text-[#79b2e9] cursor-pointer"
                            onClick={() => toggleExpand(index)}
                          >
                            {t('testemunhos.lerMais')}
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="border-t pt-4 mt-6">
                      <p className="font-semibold text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t('testemunhos.review', { plataforma: testimonial.platform })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>





      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('sobre.ctaTitulo')}
              </h2>
              <h2 className="text-3xl md:text-2xl mb-2">
                {t('sobre.ctaSubtitulo')}
              </h2>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 w-full max-w-2xl">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder={t('formulario.nome')}
                  required
                  className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="apelido"
                  value={formData.apelido}
                  onChange={handleInputChange}
                  placeholder={t('formulario.apelido')}
                  className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="tel"
                  name="telemovel"
                  value={formData.telemovel}
                  onChange={handleInputChange}
                  placeholder={t('formulario.telemovel')}
                  className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t('formulario.email')}
                  required
                  className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select 
                  name="meio_contacto"
                  value={formData.meio_contacto}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{t('formulario.meioContacto')}</option>
                  <option value="Email">Email</option>
                  <option value="Telefone">{t('formulario.telefone')}</option>
                  <option value="WhatsApp">WhatsApp</option>
                </select>
                
                <select 
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{t('formulario.assunto')}</option>
                  <option value="Esclarecimento de Dúvidas">{t('formulario.duvidas')}</option>
                  <option value="Pretendo Comprar um Imóvel">{t('formulario.comprar')}</option>
                  <option value="Pretendo Vender um Imóvel">{t('formulario.vender')}</option>
                  <option value="Pretendo Arrendar um Imóvel">{t('formulario.arrendar')}</option>
                  <option value="Pedido de Simulação para Créditos">{t('formulario.simCredito')}</option>
                  <option value="Pedido de Certificado Energético">{t('formulario.certificado')}</option>
                  <option value="Pedido de Simulação Energia">{t('formulario.simEnergia')}</option>
                  <option value="Pedido de Simulação TV NET VOZ">{t('formulario.simTvNetVoz')}</option>
                  <option value="Pedido de Simulação Seguros">{t('formulario.simSeguros')}</option>
                  <option value="Pedido de Simulação Alarmes">{t('formulario.simAlarmes')}</option>
                </select>
                
                <select name="horário" value={formData.horario} onChange={handleInputChange} className="md:col-span-2 px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#79b2e9]">
                  <option value="">{t('formulario.horario')}</option>
                  <option>9h-12h30</option>
                  <option>12h30-16h</option>
                  <option>16h-19h30</option>
                </select>

                <div className="md:col-span-2">
                  <label className="flex items-start text-sm text-gray-700 mb-4">
                    <input type="checkbox" className="mt-1 mr-2" required />
                    {t('formulario.aceitoTermos')}
                  </label>
                  <p className="text-xs text-gray-600 mb-4">
                    {t('formulario.rgpd')}
                  </p>
                  
                  {submitStatus === 'success' && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                      {t('formulario.sucesso')}
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                      {t('formulario.erro')}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-[#0d2233] border border-[#0d2233] font-semibold py-3 px-8 rounded-lg hover:bg-[#79b2e9] hover:text-white hover:border-[#79b2e9] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? t('formulario.aEnviar') : t('formulario.enviar')}
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

export default SobrePage;
