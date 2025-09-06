import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, Search, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'Todos', count: 0 },
    { id: 'imoveis', name: 'Imobiliário', count: 0 },
    { id: 'credito', name: 'Crédito Habitação', count: 0 },
    { id: 'certificacao', name: 'Certificado Energético', count: 0 },
    { id: 'seguros', name: 'Seguros', count: 0 }
  ];

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('date', { ascending: false });
        
        if (error) {
          console.error('Erro ao carregar posts:', error);
          // Fallback data
          setBlogPosts([
            {
              id: 1,
              title: "Como escolher o melhor seguro habitação",
              excerpt: "Guia completo para escolher a melhor proteção para a sua casa",
              content: "Conteúdo do artigo...",
              category: "seguros",
              date: "2024-01-15",
              author: "Globalead Portugal",
              image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600",
              read_time: "5 min"
            },
            {
              id: 2,
              title: "Tendências do mercado imobiliário 2024",
              excerpt: "Análise das principais tendências do setor imobiliário",
              content: "Conteúdo do artigo...",
              category: "imoveis",
              date: "2024-01-10",
              author: "Globalead Portugal",
              image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600",
              read_time: "7 min"
            },
            {
              id: 3,
              title: "Certificação energética: tudo o que precisa saber",
              excerpt: "Guia completo sobre certificados energéticos",
              content: "Conteúdo do artigo...",
              category: "certificacao",
              date: "2024-01-05",
              author: "Globalead Portugal",
              image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600",
              read_time: "6 min"
            }
          ]);
        } else {
          setBlogPosts(data || []);
        }
      } catch (error) {
        console.error('Erro ao carregar posts:', error);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20 flex items-center overflow-hidden">
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
                Blog & Notícias
              </h1>
              <p className="text-xl text-blue-100 max-w-4xl mx-auto">
                A carregar artigos...
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20 flex items-center overflow-hidden">
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
              Blog & Notícias
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto">
              Mantenha-se atualizado com as últimas novidades do mercado imobiliário e financeiro
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filters */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Pesquisar artigos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <article key={post.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group border border-gray-100">
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {categories.find(cat => cat.id === post.category)?.name}
                  </div>
                  <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                    {post.read_time}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(post.date).toLocaleDateString('pt-PT')}</span>
                    <span className="mx-2">•</span>
                    <span>Por {post.author}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors inline-flex items-center">
                    Ler mais
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <Search className="h-12 w-12 mx-auto mb-4" />
                <p className="text-lg">Nenhum artigo encontrado</p>
                <p className="text-sm">Tente ajustar os filtros ou termo de pesquisa</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;