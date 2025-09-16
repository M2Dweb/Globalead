import React, { useState } from 'react';
import { sendEmail, FormData } from '../utils/emailService';

interface ContactFormProps {
  page: string;
  showExtraFields?: boolean;
  extraFields?: React.ReactNode;
  title?: string;
  buttonText?: string;
}

const ContactForm2: React.FC<ContactFormProps> = ({
  page,
  showExtraFields = false,
  extraFields,
}) => {
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
        setFormData({ ...formData, nome: '', apelido: '', telemovel: '', email: '', assunto: '', tipo_ajuda: '', valor_emprestimo: '', escolha_imovel: '', vender_imovel_atual: '', num_proponentes: '', rendimento_agregado: '', meio_contacto: '', horario: '', mensagem: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div >
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                placeholder="Nome:"
                required
                className="px-4 py-3 border border-[#79b2e9] text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#79b2e9]"
              />
              <input
                type="text"
                name="apelido"
                value={formData.apelido}
                onChange={handleInputChange}
                placeholder="Apelido:"
                className="px-4 py-3 border border-[#79b2e9] text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#79b2e9]"
              />
              <input
                type="tel"
                name="telemovel"
                value={formData.telemovel}
                onChange={handleInputChange}
                placeholder="Telemóvel:"
                className="px-4 py-3 border border-[#79b2e9] text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#79b2e9]"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email:"
                required
                className="px-4 py-3 border border-[#79b2e9] text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#79b2e9]"
              />

              <select 
                name="meio_contacto"
                value={formData.meio_contacto}
                onChange={handleInputChange}
                className="px-4 py-3 border border-[#79b2e9] text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#79b2e9]"
              >
                <option value="">Meio de Contacto:</option>
                <option value="Email">Email</option>
                <option value="Telefone">Telefone</option>
                <option value="WhatsApp">WhatsApp</option>
              </select>

              <select 
                name="assunto"
                value={formData.assunto}
                onChange={handleInputChange}
                className="px-4 py-3 border border-[#79b2e9] text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#79b2e9]"
              >
                <option value="">Assunto:</option>
                <option value="Esclarecimento de Dúvidas">Esclarecimento de Dúvidas</option>
                <option value="Pretendo Comprar um Imóvel">Pretendo Comprar um Imóvel</option>
                <option value="Pretendo Vender um Imóvel">Pretendo Vender um Imóvel</option>
                <option value="Pretendo Arrendar um Imóvel">Pretendo Arrendar um Imóvel</option>
                <option value="Pedido de Simulação para Créditos">Pedido de Simulação para Créditos</option>
                <option value="Pedido de Certificado Energético">Pedido de Certificado Energético</option>
                <option value="Pedido de Simulação Energia">Pedido de Simulação Energia</option>
                <option value="Pedido de Simulação TV NET VOZ">Pedido de Simulação TV NET VOZ</option>
                <option value="Pedido de Simulação Seguros">Pedido de Simulação Seguros</option>
                <option value="Pedido de Simulação Alarmes">Pedido de Simulação Alarmes</option>
              </select>

              <select 
                name="horario"
                value={formData.horario}
                onChange={handleInputChange}
                className="md:col-span-2 px-4 py-3 border border-[#79b2e9] text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#79b2e9]"
              >
                <option value="">Horário</option>
                <option>9h-12h30</option>
                <option>12h30-16h</option>
                <option>16h-19h30</option>
              </select>

              {showExtraFields && extraFields}

              <div className="md:col-span-2">
                <label className="flex items-start text-sm text-gray-700 mb-4">
                  <input type="checkbox" className="mt-1 mr-2" required />
                  Sim, aceito os termos e condições indicados pela Globalead Portugal.
                </label>
                <p className="text-xs text-gray-600 mb-4">
                  Os dados submetidos através deste formulário de contacto serão tratados em conformidade com a legislação em vigor sobre dados pessoais e o Regulamento Geral da Protecção de Dados (UE) 2016/679.
                </p>

                {submitStatus === 'success' && (
                  <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                    Mensagem enviada com sucesso! Entraremos em contacto em breve.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    Erro ao enviar mensagem. Tente novamente ou contacte-nos diretamente.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0d2233] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#79b2e9] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Entrar em contacto'}
                </button>
              </div>
            </form>
          </div>
    
  );
};

export default ContactForm2;
