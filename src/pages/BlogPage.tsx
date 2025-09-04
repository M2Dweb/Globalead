import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

const BlogPage: React.FC = () => {
  useEffect(() => {
    const fetchBlogPosts = async () => {
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .order('date', { ascending: false });
      
      setBlogPosts(data || []);
      setLoading(false);
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">A carregar artigos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-600 to-blue-500 text-white py-20 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          poster="/fotos/BlogPage-foto.png"
        >
          <source src="/videos/BlogPage-video(1).mp4" type="video/mp4" />
        </video>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Últimas notícias
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Subscreva a nossa Newsletter e receba todas as novidades.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Subscreva a nossa Newsletter
              </h2>
              <p className="text-gray-600">
                Receba todas as novidades, descontos e promoções disponíveis para si
              </p>
            </div>
            
            <form className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="O seu email..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold"
              >
                Subscrever
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>Por {post.author}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors inline-flex items-center">
                  <span>{new Date(post.date).toLocaleDateString('pt-PT')}</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  {post.read_time}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Load More */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold inline-flex items-center">
            Carregar mais artigos
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;