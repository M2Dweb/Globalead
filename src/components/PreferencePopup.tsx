import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { sendEmail, FormData } from '../utils/emailService';

const STORAGE_KEY = 'preferencePopupShown';
const DELAY_MS = 15000; // 15 segundos de utilização

const PreferencePopup: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Mostra apenas uma vez por sessão
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(STORAGE_KEY, '1');
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  // Fechar com ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);
    setStatus('idle');

    const formData: FormData = {
      nome: 'Preferência de imóvel',
      email: email.trim(),
      mensagem: descricao.trim() || 'Sem descrição indicada.',
      assunto: 'Preferência de imóvel (popup)',
      page: 'popup-preferencia',
    };

    try {
      const ok = await sendEmail(formData);
      if (ok) {
        setStatus('success');
        setDescricao('');
        setEmail('');
        // Fecha após breve confirmação
        setTimeout(() => setOpen(false), 2200);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    // Canto inferior direito, não-modal (não bloqueia a utilização do site)
    <div
      className="fixed z-[90] bottom-4 right-4 left-4 sm:left-auto sm:w-[27rem] max-w-[calc(100vw-2rem)]"
      role="dialog"
      aria-label="Não encontra o que procura?"
    >
      <div
        className="relative bg-white shadow-2xl border border-gray-200 p-6 sm:p-7"
        style={{ animation: 'popup-in 0.35s ease-out' }}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Fechar"
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="font-serif text-xl sm:text-2xl text-[#0d2233] font-semibold mb-1 pr-6">
          Não encontra o que procura?
        </h2>
        <p className="text-sm text-gray-500 mb-5">Indique-nos a sua preferência de imóvel.</p>

        {status === 'success' ? (
          <div className="py-6 text-center">
            <p className="text-[#0d2233] font-medium">
              Obrigado! Recebemos a sua preferência e entraremos em contacto em breve.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label className="block text-sm text-gray-600 mb-2">Descreva o seu imóvel</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Indique o tipo, localização e preço para o seu imóvel"
              rows={2}
              className="w-full border border-gray-300 px-4 py-3 text-gray-800 focus:outline-none focus:border-[#0d2233] mb-5 resize-none"
            />

            <label className="block text-sm text-gray-600 mb-2">O seu email</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Insira o seu email"
                className="flex-grow min-w-0 border border-gray-300 px-4 py-3 text-gray-800 focus:outline-none focus:border-[#0d2233]"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-shrink-0 bg-[#0d2233] text-white px-6 py-3 font-medium tracking-wide hover:bg-[#79b2e9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isSubmitting ? 'A enviar...' : 'Enviar'}
              </button>
            </div>

            {status === 'error' && (
              <p className="text-sm text-red-600 mt-3">
                Ocorreu um erro ao enviar. Tente novamente.
              </p>
            )}

            <p className="text-xs text-gray-400 mt-6 leading-relaxed">
              Ao pedir informações está a autorizar a Globalead Portugal a guardar os seus dados para o
              informar sobre oportunidades de negócio, de acordo com a{' '}
              <a href="/politica-privacidade" className="underline hover:text-gray-600">
                Política de Privacidade
              </a>
              .
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default PreferencePopup;
