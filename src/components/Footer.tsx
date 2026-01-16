import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import {
  FaTiktok,
  FaYoutube,
  FaTelegramPlane,
  FaWhatsapp
} from 'react-icons/fa';
import { supabase } from '../lib/supabase';
import { sendEmail, FormData } from '../utils/emailService';

type BlogPost = {
  id: number;
  title: string;
  ref?: string;
};

const Footer: React.FC = () => {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [newsletterData, setNewsletterData] = useState({
    nome: '',
    apelido: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] =
    useState<'idle' | 'success' | 'error'>('idle');

  // Últimos posts
  useEffect(() => {
    const fetchLatestPosts = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, ref')
        .order('date', { ascending: false })
        .limit(4);

      if (!error && data) setLatestPosts(data);
    };

    fetchLatestPosts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewsletterData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const emailData: FormData = {
      nome: newsletterData.nome,
      apelido: newsletterData.apelido,
      email: newsletterData.email,
      assunto: 'Subscrição Newsletter',
      mensagem: 'Pedido de subscrição da newsletter',
      page: 'newsletter'
    };

    try {
      const success = await sendEmail(emailData);
      setSubmitStatus(success ? 'success' : 'error');
      if (success) {
        setNewsletterData({ nome: '', apelido: '', email: '' });
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Redes sociais */}
          <div className="flex flex-col items-center mt-4">
            <div className="w-full max-w-xs">       
                <img
                  src="/G.png"
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={() => window.open('https://www.instagram.com/globalead.pt/', '_blank')}
                />
            </div>

            <div className="flex space-x-4 mt-6">
              <a href="https://www.facebook.com/globalead.pt" target="_blank" rel="noreferrer">
                <Facebook className="h-6 w-6 hover:text-[#79b2e9]" />
              </a>
              <a href="https://www.instagram.com/globalead.pt/" target="_blank" rel="noreferrer">
                <Instagram className="h-6 w-6 hover:text-[#79b2e9]" />
              </a>
              <a href="https://www.linkedin.com/company/globalead/" target="_blank" rel="noreferrer">
                <Linkedin className="h-6 w-6 hover:text-[#79b2e9]" />
              </a>
              <a href="https://www.tiktok.com/@globalead.pt" target="_blank" rel="noreferrer">
                <FaTiktok className="h-6 w-6 hover:text-[#79b2e9]" />
              </a>
              <a href="https://www.youtube.com/channel/UCL2Dk6vnNF6HngFlc4enKDQ" target="_blank" rel="noreferrer">
                <FaYoutube className="h-6 w-6 hover:text-[#79b2e9]" />
              </a>
              <a href="https://t.me/globaleadportugal" target="_blank" rel="noreferrer">
                <FaTelegramPlane className="h-6 w-6 hover:text-[#79b2e9]" />
              </a>
              <a href="https://api.whatsapp.com/send?phone=351915482365" target="_blank" rel="noreferrer">
                <FaWhatsapp className="h-6 w-6 hover:text-[#79b2e9]" />
              </a>
            </div>
          </div>

          {/* Últimas notícias */}
          <div className="text-center">
            <h3 className="text-xl font-bold mb-5">Últimas Notícias</h3>
            <div className="space-y-3">
              {latestPosts.length ? (
                latestPosts.map(post => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.ref || post.id}`}
                    className="block hover:text-[#79b2e9]"
                  >
                    • {post.title}
                  </Link>
                ))
              ) : (
                <p className="text-gray-400 text-sm">A carregar...</p>
              )}
            </div>
          </div>

          {/* Newsletter */}
          <div className="text-center">
            <h3 className="text-xl font-bold mb-6">
              Receba as últimas novidades
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="nome"
                placeholder="Nome"
                required
                value={newsletterData.nome}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded text-black"
              />

              <input
                name="apelido"
                placeholder="Apelido"
                value={newsletterData.apelido}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded text-black"
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                value={newsletterData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded text-black"
              />

              <div className="flex items-start text-left">
                <input type="checkbox" required className="mt-1 mr-2" />
                <span className="text-xs text-gray-400">
                  Autorizo o tratamento dos meus dados nos termos da{' '}
                  <Link to="/politica-privacidade" className="underline hover:text-white">
                    Política de Privacidade
                  </Link>.
                </span>
              </div>

              {submitStatus === 'success' && (
                <p className="text-green-500 text-xs">
                  Subscrição realizada com sucesso.
                </p>
              )}

              {submitStatus === 'error' && (
                <p className="text-red-500 text-xs">
                  Erro ao subscrever. Tente novamente.
                </p>
              )}

              <button
                disabled={isSubmitting}
                className="w-full bg-[#79b2e9] hover:bg-[#0d2233] py-2 rounded"
              >
                {isSubmitting ? 'A enviar...' : 'Subscrever'}
              </button>
            </form>
          </div>
        </div>

        {/* Legal */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-400 space-y-2">
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/politica-privacidade" className="hover:text-white">
              Política de Privacidade
            </Link>
            <Link to="/termos-condicoes" className="hover:text-white">
              Termos e Condições
            </Link>
            <Link to="/resolucao-litigios" className="hover:text-white">
              Resolução de Litígios
            </Link>
            <a
              href="https://www.livroreclamacoes.pt/Inicio/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              Livro de Reclamações
            </a>
          </div>
              
          <div>© 2026 Globalead Portugal · Todos os direitos reservados.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
