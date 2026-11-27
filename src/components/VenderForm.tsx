import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { sendEmail, FormData } from '../utils/emailService';

// Formulário curto dos proprietários (página /vender): pedido de estudo de mercado.
// Entra no CRM como pedido de venda (Vendedores). A origem vai escondida no próprio link:
//   ?o=escritorio|montra|cartoes|folhetos|placas  (QR codes)   ?r=<código>  (link de recomendação)
// Duas autorizações separadas: o contacto sobre este pedido (obrigatória) e a newsletter (opcional, desligada).
// Com a newsletter marcada, segue também o texto apresentado e a versão do formulário (a prova do consentimento no CRM).
const NEWSLETTER_VERSAO = 'vender-2026-11-27';

// valor guardado (em português, igual nos dois idiomas) -> chave de tradução
const TIPOS_IMOVEL: [string, string][] = [
  ['Apartamento', 'formulario.apartamento'],
  ['Moradia', 'formulario.moradia'],
  ['Terreno', 'formulario.terreno'],
  ['Prédio', 'formulario.predio'],
  ['Outros', 'imoveis.contacto.outro']
];
const A_VENDA: [string, string][] = [
  ['Não', 'pedidoVenda.aVendaNao'],
  ['Sim, vendo eu', 'pedidoVenda.aVendaSim'],
  ['Sim, com uma agência', 'pedidoVenda.aVendaAgencia']
];
const QUANDO: [string, string][] = [
  ['Já', 'pedidoVenda.quandoJa'],
  ['Nos próximos 3 meses', 'pedidoVenda.quando3'],
  ['Nos próximos 6 meses', 'pedidoVenda.quando6'],
  ['Mais tarde', 'pedidoVenda.quandoTarde']
];
const CHAVE_LINK = 'globalead_vender_link';
const limpo = (v: string | null) => (v ?? '').trim().toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 40);

// o «o» e o «r» do link (guardados nesta visita, para não se perderem se a pessoa navegar no site antes de preencher)
function lerLink(): { o: string; r: string } {
  try {
    const q = new URLSearchParams(window.location.search);
    const o = limpo(q.get('o')), r = limpo(q.get('r'));
    if (o || r) {
      sessionStorage.setItem(CHAVE_LINK, JSON.stringify({ o, r }));
      return { o, r };
    }
    const g = sessionStorage.getItem(CHAVE_LINK);
    return g ? JSON.parse(g) : { o: '', r: '' };
  } catch {
    return { o: '', r: '' };
  }
}

const VAZIO: FormData = {
  nome: '',
  telemovel: '',
  email: '',
  concelho: '',
  freguesia: '',
  escolha_imovel: '',
  ja_a_venda: '',
  quando_vender: '',
  mensagem: '',
  page: 'vender'
};

const labelClass = 'block text-[9px] font-bold uppercase tracking-[0.07em] text-[#50626f]';
const fieldBase =
  'w-full min-h-[50px] rounded-[10px] border border-[#d8e0e5] bg-white px-3.5 py-3 placeholder-[#8b979e] ' +
  'transition-[border-color,box-shadow] duration-200 focus:outline-none focus:border-[#479fd0] focus:ring-[3px] focus:ring-[#479fd0]/[0.12]';
const fieldClass = `${fieldBase} text-[#102535]`;
const selectClass = (vazio: boolean) => `${fieldBase} ${vazio ? 'text-[#8b979e]' : 'text-[#102535]'}`;

const VenderForm: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState<FormData>(VAZIO);
  const [comprar, setComprar] = useState(false);
  const [autoriza, setAutoriza] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [link, setLink] = useState({ o: '', r: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'contacto'>('idle');

  useEffect(() => { setLink(lerLink()); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!String(formData.telemovel || '').trim() && !String(formData.email || '').trim()) {
      setSubmitStatus('contacto');
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const success = await sendEmail({
        ...formData,
        assunto: 'Pedido de estudo de mercado',
        distrito: formData.concelho,
        tambem_comprar: comprar,
        autoriza_contacto: autoriza,
        newsletter,
        ...(newsletter ? { newsletter_texto: t('pedidoVenda.newsletter'), newsletter_versao: `${NEWSLETTER_VERSAO} (${i18n.language || 'pt'})` } : {}),
        link_o: link.o,
        link_r: link.r
      });
      if (success) {
        setSubmitStatus('success');
        setFormData(VAZIO);
        setComprar(false);
        setAutoriza(false);
        setNewsletter(false);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Erro ao enviar o pedido de estudo de mercado:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const campo = (id: string, nome: keyof FormData, rotulo: string, extra: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div className="flex flex-col gap-[7px]">
      <label htmlFor={id} className={labelClass}>{rotulo}</label>
      <input id={id} name={nome} value={String(formData[nome] ?? '')} onChange={handleChange} className={fieldClass} {...extra} />
    </div>
  );
  const escolha = (id: string, nome: keyof FormData, rotulo: string, opcoes: [string, string][]) => (
    <div className="flex flex-col gap-[7px]">
      <label htmlFor={id} className={labelClass}>{rotulo}</label>
      <select id={id} name={nome} value={String(formData[nome] ?? '')} onChange={handleChange} className={selectClass(!formData[nome])}>
        <option value="">{t('pedidoVenda.selecione')}</option>
        {opcoes.map(([valor, chave]) => (
          <option key={valor} value={valor} className="text-[#102535]">{t(chave)}</option>
        ))}
      </select>
    </div>
  );

  return (
    <section
      className="w-full bg-[#0a2d49] text-white px-3.5 py-[50px] min-[651px]:px-8 min-[651px]:py-[70px] antialiased"
      aria-labelledby="vender-titulo"
    >
      <div className="mx-auto w-full max-w-[760px] grid grid-cols-1 gap-[46px] items-center min-[1001px]:max-w-[1240px] min-[1001px]:grid-cols-[minmax(0,0.86fr)_minmax(580px,1.14fr)] min-[1001px]:gap-[78px]">
        <div className="max-w-[680px] min-[1001px]:max-w-[520px]">
          <p className="mb-[21px] text-[11px] font-bold uppercase tracking-[0.16em] text-[#83c9ed]">{t('pedidoVenda.etiqueta')}</p>
          <h1
            id="vender-titulo"
            className="mb-[25px] text-[39px] min-[651px]:text-[50px] min-[1001px]:text-[clamp(43px,4.25vw,58px)] font-semibold leading-[1.08] tracking-[-0.04em] [text-wrap:balance]"
          >
            {t('pedidoVenda.titulo')}
          </h1>
          <p className="max-w-[680px] min-[1001px]:max-w-[470px] text-sm leading-[1.75] text-white/70">{t('pedidoVenda.texto')}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate={false}
          className="rounded-[18px] min-[651px]:rounded-[22px] border border-white/45 bg-[#fbfbfa] px-[19px] pt-[26px] pb-6 min-[651px]:px-[38px] min-[651px]:pt-[35px] min-[651px]:pb-[34px] text-[#102535]"
        >
          <div className="mb-[25px] border-b border-[#e3e8eb] pb-[19px]">
            <h2 className="mb-1 text-xl font-bold tracking-[-0.02em] text-[#0a2d49]">{t('pedidoVenda.cartaoTitulo')}</h2>
            <p className="text-[10px] text-[#697a86]">{t('pedidoVenda.obrigatorios')}</p>
          </div>

          <div className="grid grid-cols-1 min-[651px]:grid-cols-2 gap-x-[18px] gap-y-[17px]">
            <div className="min-[651px]:col-span-2">
              {campo('vd-nome', 'nome', `${t('pedidoVenda.nome')} *`, { type: 'text', autoComplete: 'name', placeholder: t('pedidoVenda.nomePlaceholder'), required: true, maxLength: 120 })}
            </div>
            {campo('vd-telefone', 'telemovel', t('pedidoVenda.telefone'), { type: 'tel', autoComplete: 'tel', inputMode: 'tel', placeholder: '910 000 000', maxLength: 40 })}
            {campo('vd-email', 'email', t('pedidoVenda.email'), { type: 'email', autoComplete: 'email', placeholder: t('pedidoVenda.emailPlaceholder'), maxLength: 200 })}
            {campo('vd-concelho', 'concelho', `${t('pedidoVenda.concelho')} *`, { type: 'text', autoComplete: 'address-level2', placeholder: t('pedidoVenda.concelhoPlaceholder'), required: true, maxLength: 80 })}
            {campo('vd-freguesia', 'freguesia', t('pedidoVenda.freguesia'), { type: 'text', placeholder: t('pedidoVenda.freguesiaPlaceholder'), maxLength: 80 })}
            {escolha('vd-tipo', 'escolha_imovel', t('pedidoVenda.tipoImovel'), TIPOS_IMOVEL)}
            {escolha('vd-a-venda', 'ja_a_venda', t('pedidoVenda.aVenda'), A_VENDA)}
            <div className="min-[651px]:col-span-2">{escolha('vd-quando', 'quando_vender', t('pedidoVenda.quando'), QUANDO)}</div>
            <div className="flex flex-col gap-[7px] min-[651px]:col-span-2">
              <label htmlFor="vd-mensagem" className={labelClass}>{t('pedidoVenda.mensagem')}</label>
              <textarea id="vd-mensagem" name="mensagem" rows={3} value={formData.mensagem} onChange={handleChange} maxLength={1500}
                placeholder={t('pedidoVenda.mensagemPlaceholder')} className={`${fieldClass} min-h-[84px] resize-y`} />
            </div>
          </div>

          <div className="mt-[18px] flex flex-col gap-3">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input type="checkbox" checked={comprar} onChange={e => setComprar(e.target.checked)} className="mt-0.5 h-[15px] w-[15px] min-w-[15px] accent-[#0a2d49]" />
              <span className="text-[12px] font-medium leading-[1.5] text-[#102535]">{t('pedidoVenda.comprar')}</span>
            </label>
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input type="checkbox" required checked={autoriza} onChange={e => setAutoriza(e.target.checked)} className="mt-0.5 h-[15px] w-[15px] min-w-[15px] accent-[#0a2d49]" />
              <span className="text-[11px] font-medium leading-[1.5] text-[#50626f]">{t('pedidoVenda.autorizaContacto')} *</span>
            </label>
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input type="checkbox" checked={newsletter} onChange={e => setNewsletter(e.target.checked)} className="mt-0.5 h-[15px] w-[15px] min-w-[15px] accent-[#0a2d49]" />
              <span className="text-[11px] font-medium leading-[1.5] text-[#50626f]">{t('pedidoVenda.newsletter')}</span>
            </label>
            <span className="block pt-1 text-[10.5px] leading-[1.7] min-[651px]:text-[9.5px] min-[651px]:leading-[1.65] text-[#87949c]">
              {t('formulario.rgpdProtecao')} <Link to="/politica-privacidade" className="underline">{t('pedidoVenda.privacidade')}</Link>
            </span>
          </div>

          <div className="mt-[18px] flex flex-col items-stretch gap-4 min-[651px]:flex-row min-[651px]:items-center min-[651px]:justify-between">
            <div className="min-w-0 flex-1" aria-live="polite">
              {submitStatus === 'success' && (
                <p className="rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-800">{t('pedidoVenda.sucesso')}</p>
              )}
              {submitStatus === 'error' && (
                <p className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800">{t('formulario.erro')}</p>
              )}
              {submitStatus === 'contacto' && (
                <p className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800">{t('pedidoVenda.contactoObrigatorio')}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-[651px]:w-auto flex-none min-w-[166px] min-h-[52px] rounded-full bg-[#0a2d49] px-6 text-xs font-bold text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[#123c5c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#83c9ed]/55 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {isSubmitting ? t('pedidoVenda.aEnviar') : t('pedidoVenda.enviar')}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default VenderForm;
