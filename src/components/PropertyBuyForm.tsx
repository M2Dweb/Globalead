import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { Search, Home, Euro, Users, Clock, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { sendEmail } from '../utils/emailService';

interface PropertyBuyData {
  nome: string;
  apelido: string;
  email: string;
  telemovel: string;
  tipo_imovel: string;
  localizacao: string;
  area_min: string;
  area_max: string;
  quartos: string;
  casas_banho: string;
  preco_max: string;
  finalidade: string;
  urgencia: string;
  observacoes: string;
  meio_contacto: string;
  horario: string;
}

const PropertyBuyForm: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<PropertyBuyData>({
    nome: '',
    apelido: '',
    email: '',
    telemovel: '',
    tipo_imovel: '',
    localizacao: '',
    area_min: '',
    area_max: '',
    quartos: '',
    casas_banho: '',
    preco_max: '',
    finalidade: '',
    urgencia: '',
    observacoes: '',
    meio_contacto: '',
    horario: ''
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
      // Save to database
      const { error } = await supabase
        .from('property_leads')
        .insert([{
          ...formData,
          type: 'compra',
          created_at: new Date().toISOString()
        }]);

      if (error) {
        console.error('Erro ao guardar dados:', error);
        setSubmitStatus('error');
        return;
      }

      // Send notification email
      const emailData = {
        nome: 'Globalead Admin',
        email: 'globaleadgroup@gmail.com',
        page: 'Notificação - Nova Proposta de Compra',
        mensagem: `Nova proposta de compra recebida de ${formData.nome} ${formData.apelido}. Verifique o painel de administração para mais detalhes.`
      };

      await sendEmail(emailData);

      setSubmitStatus('success');
      setFormData({
        nome: '',
        apelido: '',
        email: '',
        telemovel: '',
        tipo_imovel: '',
        localizacao: '',
        area_min: '',
        area_max: '',
        quartos: '',
        casas_banho: '',
        preco_max: '',
        finalidade: '',
        urgencia: '',
        observacoes: '',
        meio_contacto: '',
        horario: ''
      });
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Dados Pessoais */}
          <div>
            <div className="flex items-center mb-4">
              <Users className="h-5 w-5 text-[#79b2e9] mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">{t('comprar.dadosPessoais')}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                placeholder={t('formulario.nomeObr')}
                required
                className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
              
              <input
                type="text"
                name="apelido"
                value={formData.apelido}
                onChange={handleInputChange}
                placeholder={t('formulario.apelidoObr')}
                required
                className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t('formulario.emailObr')}
                required
                className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />

              <input
                type="tel"
                name="telemovel"
                value={formData.telemovel}
                onChange={handleInputChange}
                placeholder={t('formulario.contactoObr')}
                required
                className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Características do Imóvel */}
          <div>
            <div className="flex items-center mb-4">
              <Home className="h-5 w-5 text-[#79b2e9] mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">{t('comprar.caracteristicas')}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <select
                name="tipo_imovel"
                value={formData.tipo_imovel}
                onChange={handleInputChange}
                required
                className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="">{t('comprar.tipoImovelObr')}</option>
                <option value="Apartamento">{t('formulario.apartamento')}</option>
                <option value="Moradia">{t('formulario.moradia')}</option>
                <option value="Quinta">{t('formulario.quinta')}</option>
                <option value="Terreno">{t('formulario.terreno')}</option>
                <option value="Prédio">{t('formulario.predio')}</option>
                <option value="Loja">{t('formulario.loja')}</option>
                <option value="Armazém">{t('formulario.armazem')}</option>
                <option value="Escritório">{t('formulario.escritorio')}</option>
                <option value="Garagem">{t('formulario.garagem')}</option>
                <option value="Outros">{t('formulario.outros')}</option>
              </select>

              <input
                type="text"
                name="localizacao"
                value={formData.localizacao}
                onChange={handleInputChange}
                placeholder={t('comprar.localizacaoObr')}
                required
                className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />

              <input
                type="number"
                name="area_min"
                value={formData.area_min}
                onChange={handleInputChange}
                placeholder={t('comprar.areaMin')}
                className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />

              <input
                type="number"
                name="area_max"
                value={formData.area_max}
                onChange={handleInputChange}
                placeholder={t('comprar.areaMax')}
                className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />

              <select
                name="quartos"
                value={formData.quartos}
                onChange={handleInputChange}
                className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="">{t('comprar.numQuartos')}</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5+">5+</option>
              </select>

              <select
                name="casas_banho"
                value={formData.casas_banho}
                onChange={handleInputChange}
                className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="">{t('comprar.numCasasBanho')}</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4+">4+</option>
              </select>
            </div>
          </div>

          {/* Orçamento e Finalidade */}
          <div>
            <div className="flex items-center mb-4">
              <Euro className="h-5 w-5 text-[#79b2e9] mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">{t('comprar.orcamentoFinalidade')}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <input
                type="number"
                name="preco_max"
                value={formData.preco_max}
                onChange={handleInputChange}
                placeholder={t('comprar.orcamentoObr')}
                required
                className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />

              <select
                name="finalidade"
                value={formData.finalidade}
                onChange={handleInputChange}
                className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="">{t('comprar.finalidade')}</option>
                <option value="Habitação Própria">{t('comprar.habitacaoPropria')}</option>
                <option value="Investimento">{t('comprar.investimento')}</option>
                <option value="Habitação Secundária">{t('comprar.habitacaoSecundaria')}</option>
                <option value="Arrendamento">{t('comprar.arrendamento')}</option>
              </select>

              <select
                name="urgencia"
                value={formData.urgencia}
                onChange={handleInputChange}
                className="sm:col-span-2 px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="">{t('comprar.urgencia')}</option>
                <option value="Muito Urgente (1-2 meses)">{t('comprar.muitoUrgente')}</option>
                <option value="Urgente (3-6 meses)">{t('comprar.urgente')}</option>
                <option value="Normal (6-12 meses)">{t('comprar.normal')}</option>
                <option value="Sem Pressa">{t('comprar.semPressa')}</option>
              </select>
            </div>
          </div>

          {/* Preferências de Contacto */}
          <div>
            <div className="flex items-center mb-4">
              <Clock className="h-5 w-5 text-[#79b2e9] mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">{t('comprar.preferenciasContacto')}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <select
                name="meio_contacto"
                value={formData.meio_contacto}
                onChange={handleInputChange}
                className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="">{t('comprar.meioPreferido')}</option>
                <option value="Telefone">{t('formulario.telefone')}</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Email">Email</option>
              </select>

              <select
                name="horario"
                value={formData.horario}
                onChange={handleInputChange}
                className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="">{t('comprar.horarioPreferido')}</option>
                <option value="9h-12h30">9h-12h30</option>
                <option value="12h30-16h">12h30-16h</option>
                <option value="16h-19h30">16h-19h30</option>
              </select>
            </div>
          </div>

          {/* Observações */}
          <div>
            <div className="flex items-center mb-4">
              <MessageSquare className="h-5 w-5 text-[#79b2e9] mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">{t('comprar.observacoesTitulo')}</h3>
            </div>
            <textarea
              name="observacoes"
              value={formData.observacoes}
              onChange={handleInputChange}
              placeholder="Observações adicionais, características específicas que procura, etc. (opcional)"
              rows={4}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>

          {/* Termos e Submissão */}
          <div className="border-t pt-6">
            <label className="flex items-start text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">
              <input type="checkbox" className="mt-1 mr-2" required />
              {t('formulario.aceitoTermos')}
            </label>
            <p className="text-xs text-gray-600 mb-3 sm:mb-4">
              Os dados submetidos através deste formulário serão tratados em conformidade com a legislação em vigor sobre dados pessoais e o Regulamento Geral da Proteção de Dados (UE) 2016/679.
            </p>
            
            {submitStatus === 'success' && (
              <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-green-100 border border-green-400 text-green-700 rounded text-xs sm:text-sm">
                Pedido de compra enviado com sucesso! Entraremos em contacto em breve.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-red-100 border border-red-400 text-red-700 rounded text-xs sm:text-sm">
                {t('comprar.erro')}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-[#0d2233] border border-[#0d2233] font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-lg hover:bg-[#79b2e9] hover:text-white hover:border-[#79b2e9] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base inline-flex items-center justify-center"
            >
              <Search className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              {isSubmitting ? t('comprar.aEnviar') : t('comprar.submeter')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyBuyForm;