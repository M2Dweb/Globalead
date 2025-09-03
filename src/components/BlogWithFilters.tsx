import React, { useState } from 'react';
import { Calendar, ArrowRight, Search, Filter } from 'lucide-react';

const BlogWithFilters: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'Todos', count: 12 },
    { id: 'imoveis', name: 'Imobiliário', count: 5 },
    { id: 'credito', name: 'Crédito Habitação', count: 2 },
    { id: 'certificacao', name: 'Certificado Energético', count: 1 },
    { id: 'seguros', name: 'Seguros', count: 2 },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Garantia pública sobe risco de incumprimento (e tende a elevar juros)",
      excerpt: "A garantia pública para crédito à habitação de jovens, que permite financiamento a 100%, já está em vigor...",
      category: "imoveis",
      date: "Janeiro 6, 2025",
      author: "globalead",
      image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400",
      readTime: "5 min"
    },
    {
      id: 2,
      title: "Como organizar a casa no inverno: dicas para ter tudo à mão",
      excerpt: "Manter a casa organizada no inverno pode ser simples e rápido, proporcionando mais conforto...",
      category: "imoveis",
      date: "Janeiro 6, 2025",
      author: "globalead",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400",
      readTime: "3 min"
    },
    {
      id: 3,
      title: "Preço da eletricidade aumenta 2,1% no mercado regulado em 2025",
      excerpt: "O regulador propõe um aumento de 2,1% no preço da eletricidade para os clientes do mercado regulado...",
      category: "energia",
      date: "Janeiro 6, 2025",
      author: "globalead",
      image: "https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=400",
      readTime: "4 min"
    },
    {
      id: 4,
      title: "Aumentos previstos no preço das telecomunicações em 2025",
      excerpt: "Em novembro de 2024, os preços das telecomunicações em Portugal aumentaram 7,3%...",
      category: "energia",
      date: "Janeiro 5, 2025",
      author: "globalead",
      image: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=400",
      readTime: "6 min"
    },
    {
      id: 5,
      title: "Mercado de casas de luxo em Lisboa vai aumentar 4,5%",
      excerpt: "Lisboa reforça a sua posição como destino de destaque no mercado imobiliário de luxo...",
      category: "imoveis",
      date: "Janeiro 5, 2025",
      author: "globalead",
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400",
      readTime: "7 min"
    },
    {
      id: 6,
      title: "Novos sistemas de alarme inteligentes chegam ao mercado",
      excerpt: "A tecnologia de segurança residencial evolui com sistemas cada vez mais inteligentes...",
      category: "alarmes",
      date: "Janeiro 4, 2025",
      author: "globalead",
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400",
      readTime: "5 min"
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                        ? 'bg-blue-600 text-white'
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
            <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {categories.find(cat => cat.id === post.category)?.name}
                </div>
                <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                  {post.readTime}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{post.date}</span>
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

        {/* Load More */}
        {filteredPosts.length > 6 && (
          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold inline-flex items-center">
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