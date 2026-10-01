import React, { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface NewsletterBannerProps {
  /**
   * Onde está o banner ('homepage', 'blog', ...). Fica gravado com o
   * subscritor e aparece na coluna "Origem" do separador Newsletter do /admin.
   */
  source: string;
}

/**
 * Faixa escura de subscrição da newsletter, só com o email.
 *
 * Usa a mesma função que o formulário do rodapé, por isso os subscritores
 * entram na mesma lista (Supabase + Brevo).
 */
const NewsletterBanner: React.FC<NewsletterBannerProps> = ({ source }) => {
  const { t } = useTranslation();
  const inputId = useId();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] =
    useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Como no rodapé: em `npm run dev` a função não existe — é preciso
      // `netlify dev` para testar a subscrição localmente.
      const response = await fetch('/.netlify/functions/newsletter-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setEmail('');
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#070d19] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div className="lg:max-w-lg">
          <h2 className="text-2xl md:text-3xl font-bold uppercase">
            {t('newsletter.titulo')}
          </h2>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            {t('newsletter.texto')}
          </p>
        </div>

        <div className="w-full max-w-md lg:flex-shrink-0">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <label htmlFor={inputId} className="sr-only">
              {t('footer.email')}
            </label>
            <input
              id={inputId}
              type="email"
              name="email"
              autoComplete="email"
              placeholder={t('newsletter.placeholder')}
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="h-12 w-full sm:flex-1 sm:min-w-0 px-4 bg-transparent border border-white/20 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#79b2e9]"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-12 px-6 rounded bg-[#eff2f9] text-[#0d2233] text-xs font-semibold uppercase tracking-[0.15em] whitespace-nowrap transition-colors hover:bg-[#79b2e9] hover:text-white disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t('footer.aEnviar') : t('footer.subscrever')}
            </button>
          </form>

          {/* Subscrever é o próprio ato de consentimento (é só para a
              newsletter, nada mais), por isso não leva checkbox — mas a pessoa
              tem de saber onde está a política antes de carregar no botão. */}
          <p className="mt-3 text-xs text-gray-500 leading-relaxed">
            {t('newsletter.aviso')}{' '}
            <Link to="/politica-privacidade" className="underline whitespace-nowrap hover:text-white">
              {t('footer.politicaPrivacidade')}
            </Link>.
          </p>

          <div aria-live="polite">
            {submitStatus === 'success' && (
              <p className="mt-2 text-sm text-green-400">{t('footer.sucesso')}</p>
            )}
            {submitStatus === 'error' && (
              <p className="mt-2 text-sm text-red-400">{t('footer.erro')}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterBanner;
