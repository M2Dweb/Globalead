import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
} from 'lucide-react';
import {
  FaTiktok,
  FaYoutube,
  FaTelegramPlane,
  FaWhatsapp,
} from 'react-icons/fa';
import { supabase } from '../lib/supabase';

const Footer: React.FC = () => {
  const [latestPosts, setLatestPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, title')
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

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-center">

          {/* Facebook Page + Contact Info */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-xs">
              <div
                className="bg-gray-900 rounded-lg overflow-hidden"
                style={{ height: '130px' }}
              >
                <iframe
                  className="focus:outline-none"
                  title="Globalead Facebook Page"
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fglobalead.pt&tabs=timeline&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                  width="100%"
                  height="150"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
                </iframe>
              </div>

              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold mb-4">Entre em Contacto!</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-center">
                    <Phone className="h-5 w-5 mr-2 text-[#79b2e9]" />
                    <span>+351 915482365</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Mail className="h-5 w-5 mr-2 text-[#79b2e9]" />
                    <span>geral@globalead.pt</span>
                  </div>
                </div>



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
                      key={post.id}
                      to="/blog"
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
              <h3 className="text-xl font-bold mb-4 text-center">Receba as últimas novidades!</h3>
              <form className="space-y-3">
                <input
                  type="text"
                  placeholder="Nome:"
                  className="w-full px-3 py-2 bg-white border border-[#79b2e9] rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Apelido:"
                  className="w-full px-3 py-2 bg-white border border-[#79b2e9] rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email:"
                  className="w-full px-3 py-2 bg-white border border-[#79b2e9] rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex items-start">
                  <input type="checkbox" id="newsletter-consent" className="mt-1 mr-2" />
                  <label htmlFor="newsletter-consent" className="text-xs text-gray-400">
                    Sim, autorizo receber informações e novidades da Globalead Portugal.
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#79b2e9] hover:bg-[#0d2233] text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Subscrever
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Globalead Portugal. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
