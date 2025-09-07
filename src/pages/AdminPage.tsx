import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, Eye, Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ImageUploader from '../components/ImageUploader';
import { MultiFileUploader } from '../components/MultiFileUploader';

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('properties');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [properties, setProperties] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState<any>({});
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
    energy_class: 'B',       // Novo
    year_built: new Date().getFullYear(), // Novo
    features: [],             // Novo (_text array)
    images: [],
    floor_plans: [],
    property_types: [],       // jsonb
    state: '',                // Novo
    parking: 0,               // Novo
    reference: '',            // Novo
    videos: ''
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

  const [settingsForm, setSettingsForm] = useState({
    admin_password: '',
    founder_video_url: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('admin_password')
        .single();

      if (error) {
        console.error('Erro ao verificar senha:', error);
        setLoginError('Erro ao verificar credenciais');
        return;
      }

      if (data && data.admin_password === password) {
        setIsAuthenticated(true);
        setPassword('');
      } else {
        setLoginError('Senha incorreta');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setLoginError('Erro ao fazer login');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    
    try {
      // Fetch properties
      const { data: propertiesData, error: propertiesError } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });
      
      // Fetch blog posts
      const { data: blogData, error: blogError } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch site settings
      const { data: settingsData, error: settingsError } = await supabase
        .from('site_settings')
        .select('*')
        .single();
      
      if (propertiesError) {
        console.error('Erro ao carregar propriedades:', propertiesError);
      }
      if (blogError) {
        console.error('Erro ao carregar posts:', blogError);
      }
      if (settingsError) {
        console.error('Erro ao carregar configurações:', settingsError);
      }
      
      setProperties(propertiesData || []);
      setBlogPosts(blogData || []);
      setSiteSettings(settingsData || {});
      
      if (settingsData) {
        setSettingsForm({
          admin_password: settingsData.admin_password || '',
          founder_video_url: settingsData.founder_video_url || ''
        });
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setProperties([]);
      setBlogPosts([]);
      setSiteSettings({});
    }
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
          images: (newProperty.images || []).filter((img: string) => typeof img === 'string' && img.trim() !== ''),
          videos: newProperty.videos || '',
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
          images: [],
          videos: '',
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

  const handleEditProperty = (property: any) => {
    setEditingId(property.id);
    setNewProperty({
      title: property.title,
      description: property.description,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      location: property.location,
      type: property.type,
      images: property.images || [],
      videos: property.videos || '',
      floor_plans: property.floor_plans || [],
      property_types: property.property_types || []
    });
    setIsEditing(true);
  };

  const handleViewProperty = (property: any) => {
    alert(`
Título: ${property.title}
Preço: €${property.price?.toLocaleString()}
Localização: ${property.location}
Quartos: ${property.bedrooms}
Casas de banho: ${property.bathrooms}
Área: ${property.area}m²
Tipo: ${property.type}
Descrição: ${property.description}
    `);
  };

  const handleSaveProperty = async () => {
    if (!newProperty.title || !newProperty.price) return;

    if (editingId) {
      // Update
      const { error } = await supabase
        .from('properties')
        .update({
          title: newProperty.title,
          description: newProperty.description,
          price: newProperty.price,
          bedrooms: newProperty.bedrooms,
          bathrooms: newProperty.bathrooms,
          area: newProperty.area,
          state: newProperty.state,
          parking: newProperty.parking,
          location: newProperty.location,
          year_built: newProperty.year_built,
          energy_class: newProperty.energy_class,
          type: newProperty.type,
          features: newProperty.features || [],
          images: (newProperty.images || []).filter((img: string) => typeof img === 'string' && img.trim() !== ''),
          videos: newProperty.videos || '',
          floor_plans: newProperty.floor_plans || [],
          property_types: newProperty.property_types || []
        })
        .eq('id', editingId);

      if (error) {
        console.error('Erro ao atualizar imóvel:', error);
        alert('Erro ao atualizar imóvel');
        return;
      }
    } else {
      await handleAddProperty();
      return;
    }

    setIsEditing(false);
    setEditingId(null);
    setNewProperty({
      title: '',
      description: '',
      price: 0,
      bedrooms: 0,
      bathrooms: 0,
      area: 0,
      location: '',
      type: 'apartamento',
      images: [],
      videos: '',
      floor_plans: [],
      property_types: []
    });

    fetchData();
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
          date: newBlogPost.date,
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
      }
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

  const handleEditBlogPost = (post: any) => {
    setEditingId(post.id);
    setNewBlogPost({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      category: post.category,
      author: post.author,
      image: post.image,
      read_time: post.read_time
    });
    setIsEditing(true);
  };

  const handleViewBlogPost = (post: any) => {
    alert(`
Título: ${post.title}
Categoria: ${post.category}
Autor: ${post.author}
Data: ${post.date}
Resumo: ${post.excerpt}
Conteúdo: ${post.content}
    `);
  };

  const handleUpdateBlogPost = async () => {
    if (!editingId) return;

    const { data, error } = await supabase
      .from('blog_posts')
      .update({
        title: newBlogPost.title,
        content: newBlogPost.content,
        excerpt: newBlogPost.excerpt,
        category: newBlogPost.category,
        author: newBlogPost.author,
        image: newBlogPost.image,
        read_time: newBlogPost.read_time
      })
      .eq('id', editingId)
      .select();

    if (error) {
      console.error('Erro ao atualizar artigo:', error);
      alert('Erro ao atualizar artigo');
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
      setEditingId(null);
    }
  };

  const handleUpdateSettings = async () => {
    const { error } = await supabase
      .from('site_settings')
      .upsert({
        id: siteSettings.id || 1,
        admin_password: settingsForm.admin_password,
        founder_video_url: settingsForm.founder_video_url
      });

    if (error) {
      console.error('Erro ao atualizar configurações:', error);
      alert('Erro ao atualizar configurações');
    } else {
      alert('Configurações atualizadas com sucesso!');
      await fetchData();
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="text-center mb-8">
            <Lock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Painel de Administração</h1>
            <p className="text-gray-600">Introduza a senha para aceder</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Introduza a senha"
                required
              />
            </div>

            {loginError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

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
          <div className="py-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Painel de Administração</h1>
              <p className="text-gray-600">Gerir conteúdos do website</p>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Sair
            </button>
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
              onClick={() => setActiveTab('settings')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Configurações
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
                  <label className="block mb-2">Título do imóvel :</label>
                  <input
                    type="text"
                    placeholder="Título do imóvel"
                    value={newProperty.title}
                    onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="block mb-2">Preço :</label>
                  <input
                    type="number"
                    placeholder="Preço"
                    value={newProperty.price}
                    onChange={(e) => setNewProperty({ ...newProperty, price: Number(e.target.value) })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="block mb-2">Localização :</label>
                  <input
                    type="text"
                    placeholder="Localização"
                    value={newProperty.location}
                    onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="block mb-2">Tipo :</label>
                  <select
                    value={newProperty.type}
                    onChange={(e) => setNewProperty({ ...newProperty, type: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="apartamento">Apartamento</option>
                    <option value="moradia">Moradia</option>
                    <option value="terreno">Terreno</option>
                  </select>
                  <label className="block mb-2">Quartos :</label>
                  <input
                    type="number"
                    placeholder="Quartos"
                    value={newProperty.bedrooms}
                    onChange={(e) => setNewProperty({ ...newProperty, bedrooms: Number(e.target.value) })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="block mb-2">Casas de banho :</label>
                  <input
                    type="number"
                    placeholder="Casas de banho"
                    value={newProperty.bathrooms}
                    onChange={(e) => setNewProperty({ ...newProperty, bathrooms: Number(e.target.value) })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="block mb-2">Área (m²) :</label>
                  <input
                    type="number"
                    placeholder="Área (m²)"
                    value={newProperty.area}
                    onChange={(e) => setNewProperty({ ...newProperty, area: Number(e.target.value) })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="block mb-2">Estado :</label>
                  <input
                    type="text"
                    placeholder="Estado"
                    value={newProperty.state}
                    onChange={(e) => setNewProperty({ ...newProperty, state: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="block mb-2">Certificado energético :</label>
                  <select
                    value={newProperty.energy_class}
                    onChange={(e) => setNewProperty({ ...newProperty, energy_class: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="B-">B-</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    
                  </select>
                  <label className="block mb-2">Ano de Construção :</label>
                  <input
                    type="number"
                    placeholder="Ano de Construção"
                    value={newProperty.year_built}
                    onChange={(e) => setNewProperty({ ...newProperty, year_built: Number(e.target.value) })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="block mb-2">Estacionamento :</label>
                  <select
                    value={newProperty.parking}
                    onChange={(e) => setNewProperty({ ...newProperty, parking: Number(e.target.value) })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={1}>Sim</option>
                    <option value={0}>Não</option>
                  </select>
                  <label className="block mb-2">Referência :</label>
                  <input
                    type="text"
                    placeholder="Referência"
                    value={newProperty.reference}
                    onChange={(e) => setNewProperty({ ...newProperty, reference: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {/* Features */}
                  <label className="block mb-2">Features :</label>
                  <textarea
                    placeholder="Features (separadas por vírgula)"
                    value={newProperty.features.join(', ')}
                    onChange={(e) =>
                      setNewProperty({ ...newProperty, features: e.target.value.split(',').map(f => f.trim()) })
                    }
                    className="col-span-1 md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {/* Property Types (JSON) */}
                  <label className="block mb-2">Tipos de propriedade</label>
                  <textarea
                    placeholder='Tipos de propriedade (JSON array, ex: ["Venda", "Arrendamento"])'
                    value={JSON.stringify(newProperty.property_types)}
                    onChange={(e) => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        if (Array.isArray(parsed)) setNewProperty({ ...newProperty, property_types: parsed });
                      } catch { /* Ignore invalid JSON */ }
                    }}
                    className="col-span-1 md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <input
                    type="url"
                    placeholder="URL do vídeo"
                    value={newProperty.videos}
                    onChange={(e) => setNewProperty({ ...newProperty, videos: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {/* Imagens */}
                  <div className="col-span-1 md:col-span-2">
                    <label className="block mb-2">Imagens:</label>
                    <MultiFileUploader
                      folder="imagens"
                      files={newProperty.images}
                      accept="image/*"
                      onUpload={(urls) => setNewProperty({ ...newProperty, images: [...newProperty.images, ...urls] })}
                    />
                  </div>
                </div>

                <textarea
                  placeholder="Descrição do imóvel"
                  value={newProperty.description}
                  onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
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
                    onClick={handleSaveProperty}
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
                            <button
                              className="text-blue-600 hover:text-blue-900"
                              onClick={() => handleViewProperty(property)}
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              className="text-indigo-600 hover:text-indigo-900"
                              onClick={() => handleEditProperty(property)}
                            >
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
                  <label className="block mb-2">Título do artigo :</label>
                  <input
                    type="text"
                    placeholder="Título do artigo"
                    value={newBlogPost.title}
                    onChange={(e) => setNewBlogPost({...newBlogPost, title: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="block mb-2">Data do artigo:</label>
                  <input
                    placeholder="Data do artigo:"
                    type="date"
                    value={newBlogPost.date}
                    onChange={(e) => setNewBlogPost({...newBlogPost, date: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg"
                  />
                  <label className="block mb-2">Categoria :</label>
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

                <div className="mb-4">
                  <label className="block mb-2">Imagem do artigo:</label>
                  <ImageUploader
                    folder="blog"
                    value={newBlogPost.image}
                    onUpload={(url) => setNewBlogPost({...newBlogPost, image: url})}
                  />
                </div>
                <label className="block mb-2">Resumo do artigo :</label>
                <textarea
                  placeholder="Resumo do artigo"
                  value={newBlogPost.excerpt}
                  onChange={(e) => setNewBlogPost({...newBlogPost, excerpt: e.target.value})}
                  rows={3}
                  className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label className="block mb-2">Conteúdo completo do artigo :</label>
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
                    onClick={editingId ? handleUpdateBlogPost : handleAddBlogPost}
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
                            <button
                              className="text-blue-600 hover:text-blue-900"
                              onClick={() => handleViewBlogPost(post)}
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              className="text-indigo-600 hover:text-indigo-900"
                              onClick={() => handleEditBlogPost(post)}
                            >
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

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Configurações do Site</h2>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Senha do Admin
                  </label>
                  <input
                    type="password"
                    value={settingsForm.admin_password}
                    onChange={(e) => setSettingsForm({...settingsForm, admin_password: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nova senha do admin"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL do Vídeo do Fundador
                  </label>
                  <input
                    type="url"
                    value={settingsForm.founder_video_url}
                    onChange={(e) => setSettingsForm({...settingsForm, founder_video_url: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://exemplo.com/video.mp4"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleUpdateSettings}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Guardar Configurações
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;