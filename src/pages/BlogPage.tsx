import React, { useState } from 'react';
import { useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, Eye } from 'lucide-react';
import { supabase } from '../lib/supabase';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('properties');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [properties, setProperties] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [newProperty, setNewProperty] = useState<any>({
    title: '',
    description: '',
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    location: '',
    type: 'apartamento',
    images: [''],
    floor_plans: [],
    property_types: []
  });

  const [newBlogPost, setNewBlogPost] = useState<any>({
    title: '',
    content: '',
    excerpt: '',
    category: 'imoveis',
    author: 'Globalead Portugal',
    image: '',
    read_time: '5 min'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    
    // Fetch properties
    const { data: propertiesData } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });
    
    // Fetch blog posts
    const { data: blogData } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    setProperties(propertiesData || []);
    setBlogPosts(blogData || []);
    setLoading(false);
  };

  const handleAddProperty = async () => {
    if (newProperty.title && newProperty.price) {
      const { data, error } = await supabase
        .from('properties')
        .insert([{
          title: newProperty.title,
          description: newProperty.description,
          price: newProperty.price,
          bedrooms: newProperty.bedrooms,
          bathrooms: newProperty.bathrooms,
          area: newProperty.area,
          location: newProperty.location,
          type: newProperty.type,
          energy_class: 'B',
          year_built: new Date().getFullYear(),
          features: ['Garagem', 'Jardim'],
          images: newProperty.images.filter((img: string) => img.trim() !== ''),
          floor_plans: newProperty.floor_plans || [],
          property_types: newProperty.property_types || []
        }])
        .select();
      
      if (error) {
        console.error('Erro ao adicionar imóvel:', error);
        alert('Erro ao adicionar imóvel');
      } else {
        await fetchData();
        setNewProperty({
          title: '',
          description: '',
          price: 0,
          bedrooms: 0,
          bathrooms: 0,
          area: 0,
          location: '',
          type: 'apartamento',
          images: [''],
          floor_plans: [],
          property_types: []
        });
        setIsEditing(false);
      }
    }
  };

  const handleDeleteProperty = async (id: string) => {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Erro ao eliminar imóvel:', error);
      alert('Erro ao eliminar imóvel');
    } else {
      await fetchData();
    }
  };

  const handleAddBlogPost = async () => {
    if (newBlogPost.title && newBlogPost.content) {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([{
          title: newBlogPost.title,
          content: newBlogPost.content,
          excerpt: newBlogPost.excerpt,
          category: newBlogPost.category,
          date: new Date().toISOString().split('T')[0],
          author: newBlogPost.author,
          image: newBlogPost.image,
          read_time: newBlogPost.read_time
        }])
        .select();
      
      if (error) {
        console.error('Erro ao adicionar artigo:', error);
        alert('Erro ao adicionar artigo');
      } else {
        await fetchData();
        setNewBlogPost({
          title: '',
          content: '',
          excerpt: '',
          category: 'imoveis',
          author: 'Globalead Portugal',
          image: '',
          read_time: '5 min'
        });
        setIsEditing(false);
      };
    }
  };

  const handleDeleteBlogPost = async (id: string) => {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Erro ao eliminar artigo:', error);
      alert('Erro ao eliminar artigo');
    } else {
      await fetchData();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">A carregar dados...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Painel de Administração</h1>
            <p className="text-gray-600">Gerir conteúdos do website</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('properties')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'properties'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Imóveis
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'blog'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Blog & Notícias
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'content'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Editar Textos
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Properties Tab */}
        {activeTab === 'properties' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Gestão de Imóveis</h2>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Imóvel
              </button>
            </div>

            {/* Add/Edit Property Form */}
            {isEditing && (
              <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    {editingId ? 'Editar Imóvel' : 'Adicionar Novo Imóvel'}
                  </h3>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditingId(null);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Título do imóvel"
                    value={newProperty.title}
                    onChange={(e) => setNewProperty({...newProperty, title: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Preço"
                    value={newProperty.price}
                    onChange={(e) => setNewProperty({...newProperty, price: Number(e.target.value)})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Localização"
                    value={newProperty.location}
                    onChange={(e) => setNewProperty({...newProperty, location: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    value={newProperty.type}
                    onChange={(e) => setNewProperty({...newProperty, type: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="apartamento">Apartamento</option>
                    <option value="moradia">Moradia</option>
                    <option value="terreno">Terreno</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Quartos"
                    value={newProperty.bedrooms}
                    onChange={(e) => setNewProperty({...newProperty, bedrooms: Number(e.target.value)})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Casas de banho"
                    value={newProperty.bathrooms}
                    onChange={(e) => setNewProperty({...newProperty, bathrooms: Number(e.target.value)})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Área (m²)"
                    value={newProperty.area}
                    onChange={(e) => setNewProperty({...newProperty, area: Number(e.target.value)})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="url"
                    placeholder="URL da imagem"
                    value={newProperty.images[0] || ''}
                    onChange={(e) => setNewProperty({...newProperty, images: [e.target.value]})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <textarea
                  placeholder="Descrição do imóvel"
                  value={newProperty.description}
                  onChange={(e) => setNewProperty({...newProperty, description: e.target.value})}
                  rows={4}
                  className="w-full mt-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditingId(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleAddProperty}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Guardar
                  </button>
                </div>
              </div>
            )}

            {/* Properties List */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Imóvel
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Preço
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Localização
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {properties.map((property) => (
                      <tr key={property.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{property.title}</div>
                          <div className="text-sm text-gray-500">{property.bedrooms}Q • {property.bathrooms}WC • {property.area}m²</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          €{property.price?.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {property.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {property.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-indigo-600 hover:text-indigo-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProperty(property.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Blog Tab */}
        {activeTab === 'blog' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Gestão de Blog & Notícias</h2>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Artigo
              </button>
            </div>

            {/* Add/Edit Blog Post Form */}
            {isEditing && (
              <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    {editingId ? 'Editar Artigo' : 'Adicionar Novo Artigo'}
                  </h3>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditingId(null);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Título do artigo"
                    value={newBlogPost.title}
                    onChange={(e) => setNewBlogPost({...newBlogPost, title: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    value={newBlogPost.category}
                    onChange={(e) => setNewBlogPost({...newBlogPost, category: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="imoveis">Imobiliário</option>
                    <option value="credito">Crédito Habitação</option>
                    <option value="certificacao">Certificado Energético</option>
                    <option value="seguros">Seguros</option>
                  </select>
                </div>

                <input
                  type="url"
                  placeholder="URL da imagem"
                  value={newBlogPost.image}
                  onChange={(e) => setNewBlogPost({...newBlogPost, image: e.target.value})}
                  className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <textarea
                  placeholder="Resumo do artigo"
                  value={newBlogPost.excerpt}
                  onChange={(e) => setNewBlogPost({...newBlogPost, excerpt: e.target.value})}
                  rows={3}
                  className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <textarea
                  placeholder="Conteúdo completo do artigo"
                  value={newBlogPost.content}
                  onChange={(e) => setNewBlogPost({...newBlogPost, content: e.target.value})}
                  rows={8}
                  className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditingId(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleAddBlogPost}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Guardar
                  </button>
                </div>
              </div>
            )}

            {/* Blog Posts List */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Artigo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoria
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {blogPosts.map((post) => (
                      <tr key={post.id}>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{post.title}</div>
                          <div className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {post.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {post.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-indigo-600 hover:text-indigo-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteBlogPost(post.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Editar Textos do Website</h2>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título da Homepage
                  </label>
                  <input
                    type="text"
                    defaultValue="Caminhamos consigo lado a lado"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição da Homepage
                  </label>
                  <textarea
                    rows={4}
                    defaultValue="A Globalead Portugal é uma empresa inovadora que atua como intermediária, oferecendo soluções personalizadas em diversos setores..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone de Contacto
                  </label>
                  <input
                    type="text"
                    defaultValue="+351 915 482 365"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email de Contacto
                  </label>
                  <input
                    type="email"
                    defaultValue="geral@globalead.pt"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Guardar Alterações
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;