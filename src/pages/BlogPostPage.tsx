import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { supabase, getBlogPostByRef } from '../lib/supabase';
import ContentRenderer from '../components/ContentRenderer';


const categories = [
  { id: 'imobiliario', name: 'Imobiliário' },
  { id: 'financas', name: 'Finanças' },
  { id: 'seguros', name: 'Seguros' },
  { id: 'energia', name: 'Energia' },
  { id: 'telecom', name: 'Telecomunicações' },
  { id: 'alarmes', name: 'Alarmes' },
];

const BlogPostPage: React.FC = () => {
  const { ref } = useParams<{ ref: string }>();
  const [post, setPost] = useState<any>(null);
  const [otherPosts, setOtherPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data: postData } = await getBlogPostByRef(ref || '');

        const { data: otherData } = await supabase
          .from('blog_posts')
          .select('*')
          .neq('ref', ref)
          .order('date', { ascending: false })
          .limit(5);

        setPost(postData);
        setOtherPosts(otherData || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [ref]);

  if (loading) return <p className="text-center py-20">A carregar...</p>;
  if (!post) return <p className="text-center py-20">Artigo não encontrado.</p>;

  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <section
        className="relative h-72 flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${post.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="text-3xl mt-10 font-bold relative z-10 text-center px-4">{post.title}</h1>
      </section>

      {/* Conteúdo + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Artigo */}
        <article className="lg:col-span-2 space-y-6">
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <span><Calendar className="inline mr-1" /> {new Date(post.date).toLocaleDateString('pt-PT')}</span>
            <span>•</span>
            <span>Por {post.author}</span>
          </div>

          <ContentRenderer content={post.content} className="prose-headings:text-gray-900 prose-p:text-gray-700" />
        </article>

        {/* Sidebar com outras notícias */}
        <aside className="space-y-6">
          <h3 className="text-lg font-semibold mb-4">Outras notícias</h3>
          <div className="grid grid-cols-1 gap-6">
            {otherPosts.map(op => (
              <Link
                to={`/blog/${op.ref || op.id}`}
                key={op.id}
                className="group block bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-32">
                  <img
                    src={op.image}
                    alt={op.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-[#79b2e9] text-white px-2 py-0.5 rounded text-xs font-medium">
                    {categories.find(cat => cat.id === op.category)?.name}
                  </div>
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-0.5 rounded text-xs">
                    {op.read_time}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-700 transition-colors">
                    {op.title}
                  </h4>
                  <div className="text-gray-600 text-sm line-clamp-2 mt-1">
                    <ContentRenderer content={op.excerpt} />
                  </div>
                  <div className="w-full bg-[#79b2e9] text-white py-2 px-4 rounded-lg hover:bg-[#0d2233] transition-colors text-center inline-block font-medium mt-2">
                    Saber mais
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Link
              to="/blog"
              className="bg-[#0d2233] text-white py-2 px-6 rounded-lg hover:bg-[#79b2e9] transition-colors text-center font-medium inline-block"
            >
              Ver mais →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogPostPage;