import React, { useState } from 'react';
import { useEffect } from 'react';
import { Calendar, ArrowRight, Search, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';

const BlogWithFilters: React.FC = () => {
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
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .order('date', { ascending: false });
      
      setBlogPosts(data || []);
      setLoading(false);
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">A carregar artigos...</div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Blog & Notícias
          </h2>
          <p className="text-xl text-gray-600">
            Mantenha-se atualizado com as últimas novidades do mercado
          </p>
        </div>

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
                        ? 'bg-[#0d2233] text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.name} ({category.count})
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
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#0d2233] transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <button className="text-[#0d2233] font-medium hover:text-[#79b2e9] transition-colors inline-flex items-center">
                  Ler mais
                  <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        {filteredPosts.length > 6 && (
          <div className="text-center mt-12">
            <button className="bg-[#0d2233] text-white px-8 py-3 rounded-lg hover:bg-[#79b2e9] transition-colors duration-300 font-semibold inline-flex items-center">
              Carregar mais artigos
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        )}

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
  );
};

export default BlogWithFilters;