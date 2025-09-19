import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { FaTiktok, FaYoutube, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import { supabase } from '../lib/supabase';
import { sendEmail, FormData } from '../utils/emailService';

const Footer: React.FC = () => {
  const [latestPosts, setLatestPosts] = useState<any[]>([]);
  const [newsletterData, setNewsletterData] = useState({
    nome: '',
    apelido: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, title, ref')  // Incluindo o "ref" aqui
          .order('date', { ascending: false })
          .limit(4);
        
        if (error) {
          console.error('Erro ao carregar posts:', error);
          setLatestPosts([]);
        } else {
          setLatestPosts(data || []);
        }
      } catch (error) {
        console.error('Erro ao carregar posts:', error);
        setLatestPosts([]);
      }
    };

    fetchLatestPosts();
  }, []);

  const handleNewsletterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewsletterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const emailData: FormData = {
        nome: newsletterData.nome,
        apelido: newsletterData.apelido,
        email: newsletterData.email,
        assunto: 'Subscrição Newsletter',
        mensagem: 'Pedido de subscrição da newsletter',
        page: 'newsletter'
      };
      console.log('Dados da newsletter:', emailData);
      const success = await sendEmail(emailData);
      if (success) {
        setSubmitStatus('success');
        setNewsletterData({ nome: '', apelido: '', email: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Erro ao subscrever newsletter:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gray-900 items-center text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-center">
          {/* Facebook Page + Contact Info */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-xs">
              <div className="bg-gray-900 rounded-lg overflow-hidden" style={{ height: '130px' }}>
                <iframe
                  className="focus:outline-none"
                  title="Globalead Facebook Page"
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fglobalead.pt&tabs=timeline&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                  width="100%"
                  height="150"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              </div>
              <div className="mt-6 text-center">
                <div className="flex space-x-4 mt-4 flex items-center justify-center">
                  <a href="https://www.facebook.com/globalead.pt" target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-6 w-6 text-white hover:text-[#79b2e9] transition-colors" />
                  </a>
                  <a href="https://www.instagram.com/globalead.pt/" target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-6 w-6 text-white hover:text-[#79b2e9] transition-colors" />
                  </a>
                  <a href="https://www.linkedin.com/company/globalead/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-6 w-6 text-white hover:text-[#79b2e9] transition-colors" />
                  </a>
                  <a href="https://www.tiktok.com/@globalead.pt" target="_blank" rel="noopener noreferrer">
                    <FaTiktok className="h-6 w-6 text-white hover:text-[#79b2e9] transition-colors" />
                  </a>
                  <a href="https://www.youtube.com/channel/UCL2Dk6vnNF6HngFlc4enKDQ" target="_blank" rel="noopener noreferrer">
                    <FaYoutube className="h-6 w-6 text-white hover:text-[#79b2e9] transition-colors" />
                  </a>
                  <a href="https://t.me/globaleadportugal" target="_blank" rel="noopener noreferrer">
                    <FaTelegramPlane className="h-6 w-6 text-white hover:text-[#79b2e9] transition-colors" />
                  </a>
                  <a href="https://api.whatsapp.com/send?phone=351915482365" target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp className="h-6 w-6 text-white hover:text-[#79b2e9] transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Latest Blog Titles Section */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md text-left">
              <h3 className="text-xl font-bold mb-5 text-center">Últimas Notícias</h3>
              <div className="space-y-5">
                {latestPosts.length > 0 ? (
                  latestPosts.map((post) => (
                    <Link
                      key={post.ref || post.id}
                      to={`/blog/${post.ref || post.id}`} // Link atualizado para apontar para o post individual
                      className="block text-white hover:text-[#79b2e9] transition-colors"
                    >
                      • {post.title}
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-400">Carregando...</p>
                )}
              </div>
            </div>
          </div>
          {/* Newsletter */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md text-left">
              <h3 className="text-xl font-bold mb-6 text-center">Receba as últimas novidades!</h3>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="text"
                  name="nome"
                  value={newsletterData.nome}
                  onChange={handleNewsletterInputChange}
                  placeholder="Nome:"
                  required
                  className="w-full px-3 py-2 bg-white border border-[#79b2e9] rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="apelido"
                  value={newsletterData.apelido}
                  onChange={handleNewsletterInputChange}
                  placeholder="Apelido:"
                  className="w-full px-3 py-2 bg-white border border-[#79b2e9] rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  name="email"
                  value={newsletterData.email}
                  onChange={handleNewsletterInputChange}
                  placeholder="Email:"
                  required
                  className="w-full px-3 py-2 bg-white border border-[#79b2e9] rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex items-start">
                  <input type="checkbox" id="newsletter-consent" className="mt-1 mr-2" required />
                  <label htmlFor="newsletter-consent" className="text-xs text-gray-400">
                    Sim, autorizo receber informações e novidades da Globalead Portugal.
                  </label>
                </div>
                {submitStatus === 'success' && (
                  <div className="p-2 bg-green-100 border border-green-400 text-green-700 rounded text-xs">
                    Subscrição realizada com sucesso!
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-2 bg-red-100 border border-red-400 text-red-700 rounded text-xs">
                    Erro ao subscrever. Tente novamente.
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#79b2e9] hover:bg-[#0d2233] text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  {isSubmitting ? 'Enviando...' : 'Subscrever'}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2025 Globalead Portugal. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
