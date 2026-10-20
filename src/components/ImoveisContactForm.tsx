import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sendEmail, FormData } from '../utils/emailService';

// Formulário curto da página Imóveis: painel azul-escuro com o texto à esquerda
// e um cartão branco com os campos essenciais à direita.

// valor guardado (igual ao do formulário antigo) -> chave de tradução
const TIPOS_IMOVEL: [string, string][] = [
  ['Apartamento', 'apartamento'],
  ['Moradia', 'moradia'],
  ['Terreno', 'terreno'],
  ['Quinta', 'quinta'],
  ['Prédio', 'predio'],
  ['Loja', 'loja'],
  ['Armazém', 'armazem'],
  ['Escritório', 'escritorio'],
  ['Garagem', 'garagem'],
  ['Outros', 'outros']
];

// Sem email neste formulário: o contacto é feito pelo telefone. A localização
// (concelho ou freguesia) vai no campo `distrito`, que chega ao email e ao CRM.
const VAZIO: FormData = {
  nome: '',
  telemovel: '',
  email: '',
  distrito: '',
  escolha_imovel: '',
  assunto: 'Posicionamento do imóvel',
  mensagem: '',
  page: 'imoveis'
};

const labelClass = 'block text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500 mb-2';
const fieldBase =
  'w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 placeholder-gray-400 ' +
  'transition-colors focus:outline-none focus:border-[#67c5ee] focus:ring-2 focus:ring-[#67c5ee]/30';
const fieldClass = `${fieldBase} text-gray-900`;

const ImoveisContactForm: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>(VAZIO);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const success = await sendEmail(formData);
      if (success) {
        setSubmitStatus('success');
        setFormData(VAZIO);
        form.reset(); // limpa a caixa de consentimento
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
    <section className="py-16 md:py-24 bg-[#0b2944] text-white" aria-labelledby="imoveis-contacto-titulo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-10 lg:gap-16 items-center">
        <div>
          <p className="text-[#67c5ee] text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase mb-5">
            {t('imoveis.contacto.etiqueta')}
          </p>
          <h2
            id="imoveis-contacto-titulo"
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-semibold leading-[1.08] tracking-tight"
          >
            {t('imoveis.contacto.titulo')}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70">
            {t('imoveis.contacto.texto')}
          </p>
          <div className="mt-8 h-px max-w-md bg-white/15" aria-hidden="true" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-6 sm:p-8 text-gray-900 shadow-2xl shadow-black/20 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5"
        >
          <h3 className="sm:col-span-2 text-lg font-semibold text-[#0b2944]">
            {t('imoveis.contacto.cartaoTitulo')}
          </h3>

          <div>
            <label htmlFor="ic-nome" className={labelClass}>{t('imoveis.contacto.nome')}</label>
            <input
              id="ic-nome"
              type="text"
              name="nome"
              autoComplete="name"
              value={formData.nome}
              onChange={handleChange}
              placeholder={t('imoveis.contacto.nomePlaceholder')}
              required
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="ic-telefone" className={labelClass}>{t('imoveis.contacto.telefone')}</label>
            <input
              id="ic-telefone"
              type="tel"
              name="telemovel"
              autoComplete="tel"
              minLength={9}
              value={formData.telemovel}
              onChange={handleChange}
              placeholder="910 000 000"
              required
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="ic-localizacao" className={labelClass}>{t('imoveis.contacto.localizacao')}</label>
            <input
              id="ic-localizacao"
              type="text"
              name="distrito"
              autoComplete="address-level2"
              value={formData.distrito}
              onChange={handleChange}
              placeholder={t('imoveis.contacto.localizacaoPlaceholder')}
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="ic-tipo" className={labelClass}>{t('imoveis.contacto.tipoImovel')}</label>
            {/* Sem escolha, o select mostra "Selecione" esbatido, como um placeholder */}
            <select
              id="ic-tipo"
              name="escolha_imovel"
              value={formData.escolha_imovel}
              onChange={handleChange}
              className={`${fieldBase} ${formData.escolha_imovel ? 'text-gray-900' : 'text-gray-400'}`}
            >
              <option value="">{t('imoveis.contacto.selecione')}</option>
              {TIPOS_IMOVEL.map(([valor, chave]) => (
                <option key={valor} value={valor} className="text-gray-900">{t(`formulario.${chave}`)}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="ic-mensagem" className={labelClass}>{t('imoveis.contacto.mensagem')}</label>
            <textarea
              id="ic-mensagem"
              name="mensagem"
              rows={3}
              value={formData.mensagem}
              onChange={handleChange}
              placeholder={t('imoveis.contacto.mensagemPlaceholder')}
              className={`${fieldClass} resize-y`}
            />
          </div>

          <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
            <div className="flex-1">
              <label className="flex items-start gap-2.5 text-xs text-gray-700 cursor-pointer">
                <input type="checkbox" required className="mt-px h-4 w-4 flex-shrink-0 accent-[#0b2944]" />
                {t('formulario.aceitoTermos')}
              </label>
              <p className="mt-2 text-[11px] leading-relaxed text-gray-500">{t('formulario.rgpdProtecao')}</p>

              <div aria-live="polite">
                {submitStatus === 'success' && (
                  <p className="mt-3 rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-800">
                    {t('formulario.sucesso')}
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="mt-3 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800">
                    {t('formulario.erro')}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-outline w-full sm:w-auto flex-shrink-0 font-semibold disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? t('imoveis.contacto.aEnviar') : t('imoveis.contacto.enviar')}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ImoveisContactForm;
