import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sendEmail, FormData } from '../utils/emailService';

interface ContactFormProps {
  page: string;
  showExtraFields?: boolean;
  extraFields?: React.ReactNode;
  title?: string;
  buttonText?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ 
  page, 
  showExtraFields = false, 
  extraFields,
  buttonText
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Partial<FormData>>({
    nome: '',
    apelido: '',
    telemovel: '',
    email: '',
    assunto: '',
    tipo_ajuda: '',
    valor_emprestimo: '',
    escolha_imovel: '',
    vender_imovel_atual: '',
    num_proponentes: '',
    rendimento_agregado: '',
    meio_contacto: '',
    horario: '',
    mensagem: '',
    page: page
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      console.log(`Dados do formulário ${page}:`, formData);
      const success = await sendEmail(formData as FormData);
      if (success) {
        setSubmitStatus('success');
        setFormData({
          nome: '',
          apelido: '',
          telemovel: '',
          email: '',
          assunto: '',
          tipo_ajuda: '',
          valor_emprestimo: '',
          escolha_imovel: '',
          vender_imovel_atual: '',
          num_proponentes: '',
          rendimento_agregado: '',
          meio_contacto: '',
          horario: '',
          mensagem: '',
          page: page
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
    <div>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleInputChange}
          placeholder={t('formulario.nome')}
          required
          className="px-4 py-3 border border-[#79b2e9] text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="apelido"
          value={formData.apelido}
          onChange={handleInputChange}
          placeholder={t('formulario.apelido')}
          className="px-4 py-3 border border-[#79b2e9] text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="telemovel"
          value={formData.telemovel}
          onChange={handleInputChange}
          placeholder={t('formulario.contacto')}
          className="px-4 py-3 border border-[#79b2e9] text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder={t('formulario.email')}
          required
          className="px-4 py-3 border border-[#79b2e9] text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select 
          name="assunto"
          value={formData.assunto}
          onChange={handleInputChange}
          required
          className="md:col-span-2 px-4 py-3 border border-[#79b2e9] text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">{t('formulario.selecioneAssunto')}</option>
          <option value="Quero adquirir um novo imóvel com crédito habitação">{t('formulario.creditoNovo')}</option>
          <option value="Quero melhorar as condições do meu crédito habitação atual">{t('formulario.creditoMelhorar')}</option>
          <option value="Quero construir o meu imóvel">{t('formulario.creditoConstruir')}</option>
        </select>

        <select 
          name="tipo_ajuda"
          value={formData.tipo_ajuda}
          onChange={handleInputChange}
          className="md:col-span-2 px-4 py-3 border border-[#79b2e9] text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">{t('formulario.comoAjudar')}</option>
          <option value="Simular que imóvel consigo comprar">{t('formulario.ajudaSimularImovel')}</option>
          <option value="Obter simulação">{t('formulario.ajudaSimulacao')}</option>
          <option value="Conseguir aprovação de crédito">{t('formulario.ajudaAprovacao')}</option>
          <option value="Aprovar crédito e ajuda até à escritura">{t('formulario.ajudaEscritura')}</option>
        </select>

        <select 
          name="valor_emprestimo"
          value={formData.valor_emprestimo}
          onChange={handleInputChange}
          className="md:col-span-2 px-4 py-3 border border-[#79b2e9] text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">{t('formulario.escolhaImovel')}</option>
          <option value="Já tenho imóvel escolhido">{t('formulario.jaTenhoImovel')}</option>
          <option value="Não tenho imóvel escolhido">{t('formulario.naoTenhoImovel')}</option>
        </select>

        <select 
          name="vender_imovel_atual"
          value={formData.vender_imovel_atual}
          onChange={handleInputChange}
          className="px-4 py-3 border border-[#79b2e9] text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">{t('formulario.vendeAtual')}</option>
          <option value="Sim">{t('formulario.sim')}</option>
          <option value="Não">{t('formulario.nao')}</option>
        </select>

        <select 
          name="num_proponentes"
          value={formData.num_proponentes}
          onChange={handleInputChange}
          className="px-4 py-3 border border-[#79b2e9] text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">{t('formulario.numProponentes')}</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="Mais de 2">{t('formulario.maisDe2')}</option>
        </select>

        <input
          type="text"
          name="rendimento_agregado"
          value={formData.rendimento_agregado}
          onChange={handleInputChange}
          placeholder={t('formulario.rendimentoAgregado')}
          className="md:col-span-2 px-4 py-3 border text-gray-900  border-[#79b2e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select 
          name="meio_contacto"
          value={formData.meio_contacto}
          onChange={handleInputChange}
          className="px-4 py-3 border border-[#79b2e9] text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">{t('formulario.meioContacto')}</option>
          <option value="Email">Email</option>
          <option value="Telefone">{t('formulario.telefone')}</option>
          <option value="WhatsApp">WhatsApp</option>
        </select>

        <select 
          name="horario"
          value={formData.horario}
          onChange={handleInputChange}
          className="px-4 py-3 border border-[#79b2e9] text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">{t('formulario.horarioPlaceholder')}</option>
          <option>9h–12h30</option>
          <option>12h30–16h</option>
          <option>16h–19h30</option>
        </select>

        {showExtraFields && extraFields}
        
        <div className="md:col-span-2">
          <label className="flex items-start text-sm text-gray-700 mb-4">
            <input type="checkbox" className="mt-1 mr-2" required />
            {t('formulario.aceitoTermos')}
          </label>
          <p className="text-xs text-gray-600 mb-6">
            {t('formulario.rgpdSimples')}
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
            {isSubmitting ? t('formulario.aEnviar') : (buttonText || t('formulario.enviarMensagem'))}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
