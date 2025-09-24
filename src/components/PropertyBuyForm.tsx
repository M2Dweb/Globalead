import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { sendEmail } from '../utils/emailService';

interface PropertyBuyData {
  nome: string;
  apelido: string;
  email: string;
  telemovel: string;
  distrito: string;
  cod_postal: string;
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
  const [formData, setFormData] = useState<PropertyBuyData>({
    nome: '',
    apelido: '',
    email: '',
    telemovel: '',
    distrito: '',
    cod_postal: '',
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

      // Send email with form data
      const emailData = {
        nome: formData.nome,
        apelido: formData.apelido,
        email: formData.email,
        telemovel: formData.telemovel,
        distrito: formData.distrito,
        cod_postal: formData.cod_postal,
        escolha_imovel: formData.tipo_imovel,
        area_min: formData.area_min,
        area_max: formData.area_max,
        num_quartos: formData.quartos,
        num_casas_banho: formData.casas_banho,
        preço: formData.preco_max,
        meio_contacto: formData.meio_contacto,
        horario: formData.horario,
        mensagem: `Procura de imóvel: ${formData.tipo_imovel} em ${formData.localizacao}. Finalidade: ${formData.finalidade}. Urgência: ${formData.urgencia}. Observações: ${formData.observacoes}`,
        assunto: 'Procura de Imóvel para Compra',
        page: 'property-buy-form'
      };

      const success = await sendEmail(emailData);
      if (!success) {
        console.error('Erro ao enviar email');
      }

      setSubmitStatus('success');
      setFormData({
        nome: '',
        apelido: '',
        email: '',
        telemovel: '',
        distrito: '',
        cod_postal: '',
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
      <div className="text-center mb-8 sm:mb-12">
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="bg-[#79b2e9] p-3 sm:p-4 rounded-full">
            <Search className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          Encontre o seu imóvel ideal
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Diga-nos o que procura e encontraremos as melhores opções para si
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            placeholder="Nome*"
            required
            className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          
          <input
            type="text"
            name="apelido"
            value={formData.apelido}
            onChange={handleInputChange}
            placeholder="Apelido*"
            required
            className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email*"
            required
            className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />

          <input
            type="tel"
            name="telemovel"
            value={formData.telemovel}
            onChange={handleInputChange}
            placeholder="Telemóvel*"
            required
            className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />

          <select
            name="distrito"
            value={formData.distrito}
            onChange={handleInputChange}
            className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          >
            <option value="">Distrito:</option>
            <option>Aveiro</option>
            <option>Beja</option>
            <option>Braga</option>
            <option>Bragança</option>
            <option>Castelo Branco</option>
            <option>Coimbra</option>
            <option>Évora</option>
            <option>Faro</option>
            <option>Guarda</option>
            <option>Leiria</option>
            <option>Lisboa</option>
            <option>Portalegre</option>
            <option>Porto</option>
            <option>Santarém</option>
            <option>Setúbal</option>
            <option>Viana do Castelo</option>
            <option>Vila Real</option>
            <option>Viseu</option>
            <option>Ilhas</option>
          </select>

          <input
            type="text"
            name="cod_postal"
            value={formData.cod_postal}
            onChange={handleInputChange}
            placeholder="Código Postal"
            className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <select
            name="tipo_imovel"
            value={formData.tipo_imovel}
            onChange={handleInputChange}
            required
            className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          >
            <option value="">Tipo de Imóvel*</option>
            <option>Apartamento</option>
            <option>Moradia</option>
            <option>Quinta</option>
            <option>Terreno</option>
            <option>Prédio</option>
            <option>Loja</option>
            <option>Armazém</option>
            <option>Escritório</option>
            <option>Garagem</option>
            <option>Outros</option>
          </select>

          <input
            type="text"
            name="localizacao"
            value={formData.localizacao}
            onChange={handleInputChange}
            placeholder="Localização Pretendida*"
            required
            className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />

          <input
            type="number"
            name="area_min"
            value={formData.area_min}
            onChange={handleInputChange}
            placeholder="Área Mínima (m²)"
            className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />

          <input
            type="number"
            name="area_max"
            value={formData.area_max}
            onChange={handleInputChange}
            placeholder="Área Máxima (m²)"
            className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />

          <select
            name="quartos"
            value={formData.quartos}
            onChange={handleInputChange}
            className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          >
            <option value="">Nº de Quartos</option>
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5+</option>
          </select>

          <select
            name="casas_banho"
            value={formData.casas_banho}
            onChange={handleInputChange}
            className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          >
            <option value="">Nº de Casas de Banho</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4+</option>
          </select>

          <input
            type="number"
            name="preco_max"
            value={formData.preco_max}
            onChange={handleInputChange}
            placeholder="Orçamento Máximo (€)*"
            required
            className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />

          <select
            name="finalidade"
            value={formData.finalidade}
            onChange={handleInputChange}
            className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          >
            <option value="">Finalidade</option>
            <option>Habitação Própria</option>
            <option>Investimento</option>
            <option>Habitação Secundária</option>
            <option>Arrendamento</option>
          </select>

          <select
            name="urgencia"
            value={formData.urgencia}
            onChange={handleInputChange}
            className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          >
            <option value="">Urgência da Compra</option>
            <option>Muito Urgente (1-2 meses)</option>
            <option>Urgente (3-6 meses)</option>
            <option>Normal (6-12 meses)</option>
            <option>Sem Pressa</option>
          </select>

          <select
            name="meio_contacto"
            value={formData.meio_contacto}
            onChange={handleInputChange}
            className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          >
            <option value="">Meio de Contacto Preferido</option>
            <option>Telefone</option>
            <option>WhatsApp</option>
            <option>Email</option>
          </select>

          <select
            name="horario"
            value={formData.horario}
            onChange={handleInputChange}
            className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          >
            <option value="">Horário Preferido</option>
            <option>9h-12h30</option>
            <option>12h30-16h</option>
            <option>16h-19h30</option>
          </select>

          <textarea
            name="observacoes"
            value={formData.observacoes}
            onChange={handleInputChange}
            placeholder="Observações adicionais (opcional)"
            rows={4}
            className="sm:col-span-2 px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />

          <div className="sm:col-span-2">
            <label className="flex items-start text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">
              <input type="checkbox" className="mt-1 mr-2" required />
              Sim, aceito os termos e condições indicados pela Globalead Portugal.
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
                Erro ao enviar pedido. Tente novamente ou contacte-nos diretamente.
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#79b2e9] text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-lg hover:bg-[#0d2233] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base inline-flex items-center justify-center"
            >
              <Search className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              {isSubmitting ? 'Enviando...' : 'Enviar Pedido de Compra'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyBuyForm;