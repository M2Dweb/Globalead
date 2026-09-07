import React from 'react';
import { Phone, Mail, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { sendEmail, FormData } from '../utils/emailService';

const ContactosPage: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState<Partial<FormData>>({
    nome: '',
    apelido: '',
    telemovel: '',
    email: '',
    assunto: '',
    meio_contacto: '',
    horario: '',
    mensagem: '',
    page: 'contactos'
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

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
      console.log('Dados do formulário Contactos:', formData);
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
          mensagem: '',
          page: 'contactos'
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
      <section className="relative min-h-screen bg-gradient-to-br from-[#0d2233] to-blue-500 text-white py-20 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          poster="/fotos/ContactosPage-foto.png"
        >
          <source src="/videos/ContactosPage-video(1).mp4" type="video/mp4" />
        </video>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('contactos.heroTitulo')}
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto">
              {t('contactos.heroTexto')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              {t('contactos.p1')}
            </p>
            <br />
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              {t('contactos.p2')}
            </p>
          </div>



          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-[#0d2233]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('contactos.telefone')}</h3>
              <p className="text-gray-600">910 647 620</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-[#0d2233]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">geral@globalead.pt</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-[#0d2233]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('contactos.horario')}</h3>
              <p className="text-gray-600">10h00 - 21h00</p>
            </div>
          </div>
        </div>

      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('comum.temDuvidas')}
            </h2>
            <p className="text-xl text-blue-100">
              {t('comum.entreContacto')}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 w-full max-w-2xl">


              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder={t('formulario.nome')}
                  required
                  className="px-4 py-3 border border-[#79b2e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
                <input
                  type="text"
                  name="apelido"
                  value={formData.apelido}
                  onChange={handleInputChange}
                  placeholder={t('formulario.apelido')}
                  className="px-4 py-3 border border-[#79b2e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
                <input
                  type="tel"
                  name="telemovel"
                  value={formData.telemovel}
                  onChange={handleInputChange}
                  placeholder={t('formulario.telemovel')}
                  className="px-4 py-3 border border-[#79b2e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t('formulario.email')}
                  required
                  className="px-4 py-3 border border-[#79b2e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
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

                <select
                  name="meio_contacto"
                  value={formData.meio_contacto}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-[#79b2e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                >
                  <option value="">{t('formulario.meioContacto')}</option>
                  <option value="Email">Email</option>
                  <option value="Telefone">{t('formulario.telefone')}</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Telegram">Telegram</option>
                  <option value="Messenger">Messenger</option>
                </select>
                <input
                  type="text"
                  name="horario"
                  value={formData.horario}
                  onChange={handleInputChange}
                  placeholder={t('formulario.horarioPlaceholder')}
                  className="md:col-span-2 px-4 py-3 border border-[#79b2e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />

                <div className="md:col-span-2">
                  <label className="flex items-start text-sm text-gray-700 mb-4">
                    <input type="checkbox" className="mt-1 mr-2" required />
                    {t('formulario.aceitoTermos')}
                  </label>
                  <p className="text-xs text-gray-600 mb-6">
                    {t('formulario.rgpdProtecao')}
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
                    className="w-full bg-white text-[#0d2233] border border-[#0d2233] font-semibold py-3 px-8 rounded-lg hover:bg-[#79b2e9] hover:text-white hover:border-[#79b2e9] transition-colors duration-300"
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

export default ContactosPage;