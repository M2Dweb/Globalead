import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sendEmail, FormData } from '../utils/emailService';

// Formulário curto da página Imóveis: painel azul-escuro com o texto à esquerda
// e um cartão claro com os campos essenciais à direita.

// valor guardado (igual ao do formulário antigo) -> chave de tradução
const TIPOS_IMOVEL: [string, string][] = [
  ['Apartamento', 'formulario.apartamento'],
  ['Moradia', 'formulario.moradia'],
  ['Terreno', 'formulario.terreno'],
  ['Prédio', 'formulario.predio'],
  ['Outros', 'imoveis.contacto.outro']
];

// valor guardado (em português, vai no assunto) -> chave de tradução
const OBJETIVOS: [string, string][] = [
  ['Vender', 'imoveis.contacto.vender'],
  ['Arrendar', 'imoveis.contacto.arrendar'],
  ['Conhecer o valor do imóvel', 'imoveis.contacto.avaliar']
];

const ASSUNTO = 'Posicionamento do imóvel';

// O email é opcional: o contacto é feito pelo telefone. A localização
// (concelho ou freguesia) vai no campo `distrito`, que chega ao email e ao CRM.
// O que a pessoa pretende vai no assunto ("Posicionamento do imóvel · Vender").
const VAZIO: FormData = {
  nome: '',
  telemovel: '',
  email: '',
  distrito: '',
  escolha_imovel: '',
  assunto: ASSUNTO,
  mensagem: '',
  page: 'imoveis'
};

const labelClass = 'block text-[9px] font-bold uppercase tracking-[0.07em] text-[#50626f]';
const fieldBase =
  'w-full min-h-[50px] rounded-[10px] border border-[#d8e0e5] bg-white px-3.5 py-3 placeholder-[#8b979e] ' +
  'transition-[border-color,box-shadow] duration-200 focus:outline-none focus:border-[#479fd0] focus:ring-[3px] focus:ring-[#479fd0]/[0.12]';
const fieldClass = `${fieldBase} text-[#102535]`;
const selectClass = (vazio: boolean) => `${fieldBase} ${vazio ? 'text-[#8b979e]' : 'text-[#102535]'}`;

const ImoveisContactForm: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>(VAZIO);
  const [objetivo, setObjetivo] = useState('');
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
      const assunto = objetivo ? `${ASSUNTO} · ${objetivo}` : ASSUNTO;
      const success = await sendEmail({ ...formData, assunto });
      if (success) {
        setSubmitStatus('success');
        setFormData(VAZIO);
        setObjetivo('');
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
    <section
      className="w-full bg-[#0a2d49] text-white px-3.5 py-[50px] min-[651px]:px-8 min-[651px]:py-[70px] antialiased"
      aria-labelledby="imoveis-contacto-titulo"
    >
      <div className="mx-auto w-full max-w-[760px] grid grid-cols-1 gap-[46px] items-center min-[1001px]:max-w-[1240px] min-[1001px]:grid-cols-[minmax(0,0.86fr)_minmax(580px,1.14fr)] min-[1001px]:gap-[78px]">
        <div className="max-w-[680px] min-[1001px]:max-w-[520px]">
          <p className="mb-[21px] text-[11px] font-bold uppercase tracking-[0.16em] text-[#83c9ed]">
            {t('imoveis.contacto.etiqueta')}
          </p>
          <h2
            id="imoveis-contacto-titulo"
            className="mb-[25px] text-[39px] min-[651px]:text-[50px] min-[1001px]:text-[clamp(43px,4.25vw,58px)] font-semibold leading-[1.08] tracking-[-0.04em] [text-wrap:balance]"
          >
            {t('imoveis.contacto.titulo')}
          </h2>
          <p className="max-w-[680px] min-[1001px]:max-w-[470px] text-sm leading-[1.75] text-white/70">
            {t('imoveis.contacto.texto')}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[18px] min-[651px]:rounded-[22px] border border-white/45 bg-[#fbfbfa] px-[19px] pt-[26px] pb-6 min-[651px]:px-[38px] min-[651px]:pt-[35px] min-[651px]:pb-[34px] text-[#102535]"
        >
          <div className="mb-[25px] border-b border-[#e3e8eb] pb-[19px]">
            <h3 className="mb-1 text-xl font-bold tracking-[-0.02em] text-[#0a2d49]">
              {t('imoveis.contacto.cartaoTitulo')}
            </h3>
            <p className="text-[10px] text-[#697a86]">{t('imoveis.contacto.obrigatorios')}</p>
          </div>

          <div className="grid grid-cols-1 min-[651px]:grid-cols-2 gap-x-[18px] gap-y-[17px]">
            <div className="flex flex-col gap-[7px]">
              <label htmlFor="ic-nome" className={labelClass}>{t('imoveis.contacto.nome')} *</label>
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

            <div className="flex flex-col gap-[7px]">
              <label htmlFor="ic-telefone" className={labelClass}>{t('imoveis.contacto.telefone')} *</label>
              <input
                id="ic-telefone"
                type="tel"
                name="telemovel"
                autoComplete="tel"
                inputMode="tel"
                minLength={9}
                value={formData.telemovel}
                onChange={handleChange}
                placeholder="910 000 000"
                required
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-[7px]">
              <label htmlFor="ic-email" className={labelClass}>{t('imoveis.contacto.email')}</label>
              <input
                id="ic-email"
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('imoveis.contacto.emailPlaceholder')}
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-[7px]">
              <label htmlFor="ic-localizacao" className={labelClass}>{t('imoveis.contacto.localizacao')} *</label>
              <input
                id="ic-localizacao"
                type="text"
                name="distrito"
                autoComplete="address-level2"
                value={formData.distrito}
                onChange={handleChange}
                placeholder={t('imoveis.contacto.localizacaoPlaceholder')}
                required
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-[7px]">
              <label htmlFor="ic-tipo" className={labelClass}>{t('imoveis.contacto.tipoImovel')}</label>
              {/* Sem escolha, o select mostra "Selecione" esbatido, como um placeholder */}
              <select
                id="ic-tipo"
                name="escolha_imovel"
                value={formData.escolha_imovel}
                onChange={handleChange}
                className={selectClass(!formData.escolha_imovel)}
              >
                <option value="">{t('imoveis.contacto.selecione')}</option>
                {TIPOS_IMOVEL.map(([valor, chave]) => (
                  <option key={valor} value={valor} className="text-[#102535]">{t(chave)}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-[7px]">
              <label htmlFor="ic-objetivo" className={labelClass}>{t('imoveis.contacto.pretende')}</label>
              <select
                id="ic-objetivo"
                name="objetivo"
                value={objetivo}
                onChange={e => setObjetivo(e.target.value)}
                className={selectClass(!objetivo)}
              >
                <option value="">{t('imoveis.contacto.selecione')}</option>
                {OBJETIVOS.map(([valor, chave]) => (
                  <option key={valor} value={valor} className="text-[#102535]">{t(chave)}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-[7px] min-[651px]:col-span-2">
              <label htmlFor="ic-mensagem" className={labelClass}>{t('imoveis.contacto.mensagem')}</label>
              <textarea
                id="ic-mensagem"
                name="mensagem"
                rows={3}
                value={formData.mensagem}
                onChange={handleChange}
                placeholder={t('imoveis.contacto.mensagemPlaceholder')}
                className={`${fieldClass} min-h-[84px] resize-y`}
              />
            </div>
          </div>

          <div className="mt-[18px] flex flex-col items-stretch gap-6 min-[651px]:flex-row min-[651px]:items-center min-[651px]:justify-between">
            <div className="min-w-0 flex-1">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="privacy_consent"
                  required
                  className="mt-0.5 h-[15px] w-[15px] min-w-[15px] accent-[#0a2d49]"
                />
                <span className="text-[8px] font-medium leading-[1.5] text-[#788891]">
                  {t('formulario.aceitoTermos')}
                </span>
              </label>
              <span className="mt-2 block text-[8px] leading-[1.5] text-[#87949c]">{t('formulario.rgpdProtecao')}</span>

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
              className="w-full min-[651px]:w-auto flex-none min-w-[166px] min-h-[52px] rounded-full bg-[#0a2d49] px-6 text-xs font-bold text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[#123c5c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#83c9ed]/55 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
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
