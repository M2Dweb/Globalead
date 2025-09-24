import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Edit, Trash2, Eye, EyeOff, Save, X, Upload, Calendar, User, Mail, Phone, MapPin, Home, Euro, Users, Clock, MessageSquare, FileText } from 'lucide-react';
import RichTextEditor from '../components/RichTextEditor';
import ImageUploader from '../components/ImageUploader';
import { MultiFileUploader } from '../components/MultiFileUploader';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('properties');
  const [properties, setProperties] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [propertyLeads, setPropertyLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProperty, setEditingProperty] = useState<any>(null);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [showLeadDetails, setShowLeadDetails] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);

  // Form states
  const [propertyForm, setPropertyForm] = useState({
    title: '',
    description: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    location: '',
    type: '',
    energy_class: '',
    year_built: '',
    features: [] as string[],
    images: [] as string[],
    property_types: [] as any[]
  });

  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    author: 'Globalead Portugal',
    image: '',
    read_time: '5 min'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
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

      // Fetch property leads
      const { data: leadsData } = await supabase
        .from('property_leads')
        .select('*')
        .order('created_at', { ascending: false });

      setProperties(propertiesData || []);
      setBlogPosts(blogData || []);
      setPropertyLeads(leadsData || []);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
    setLoading(false);
  };

  const generateRef = (prefix: string = ''): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = prefix;
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handlePropertySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const propertyData = {
        ...propertyForm,
        ref: editingProperty?.ref || generateRef('PROP'),
        price: parseFloat(propertyForm.price),
        bedrooms: parseInt(propertyForm.bedrooms),
        bathrooms: parseInt(propertyForm.bathrooms),
        area: parseFloat(propertyForm.area),
        year_built: parseInt(propertyForm.year_built),
        features: propertyForm.features.filter(f => f.trim() !== ''),
        property_types: propertyForm.property_types.length > 0 ? propertyForm.property_types : null
      };

      if (editingProperty) {
        const { error } = await supabase
          .from('properties')
          .update(propertyData)
          .eq('id', editingProperty.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('properties')
          .insert([propertyData]);
        
        if (error) throw error;
      }

      resetPropertyForm();
      fetchData();
      alert(editingProperty ? 'Propriedade atualizada!' : 'Propriedade criada!');
    } catch (error) {
      console.error('Erro ao salvar propriedade:', error);
      alert('Erro ao salvar propriedade');
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const blogData = {
        ...blogForm,
        ref: editingPost?.ref || generateRef('BLOG'),
        date: editingPost?.date || new Date().toISOString().split('T')[0]
      };

      if (editingPost) {
        const { error } = await supabase
          .from('blog_posts')
          .update(blogData)
          .eq('id', editingPost.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([blogData]);
        
        if (error) throw error;
      }

      resetBlogForm();
      fetchData();
      alert(editingPost ? 'Post atualizado!' : 'Post criado!');
    } catch (error) {
      console.error('Erro ao salvar post:', error);
      alert('Erro ao salvar post');
    }
  };

  const deleteProperty = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta propriedade?')) {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);
      
      if (!error) {
        fetchData();
        alert('Propriedade excluída!');
      }
    }
  };

  const deleteBlogPost = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este post?')) {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
      
      if (!error) {
        fetchData();
        alert('Post excluído!');
      }
    }
  };

  const deletePropertyLead = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este lead?')) {
      const { error } = await supabase
        .from('property_leads')
        .delete()
        .eq('id', id);
      
      if (!error) {
        fetchData();
        alert('Lead excluído!');
      }
    }
  };

  const resetPropertyForm = () => {
    setPropertyForm({
      title: '',
      description: '',
      price: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      location: '',
      type: '',
      energy_class: '',
      year_built: '',
      features: [],
      images: [],
      property_types: []
    });
    setEditingProperty(null);
    setShowForm(false);
  };

  const resetBlogForm = () => {
    setBlogForm({
      title: '',
      content: '',
      excerpt: '',
      category: '',
      author: 'Globalead Portugal',
      image: '',
      read_time: '5 min'
    });
    setEditingPost(null);
    setShowForm(false);
  };

  const viewLeadDetails = (lead: any) => {
    setSelectedLead(lead);
    setShowLeadDetails(true);
  };

  const closeLeadDetails = () => {
    setShowLeadDetails(false);
    setSelectedLead(null);
  };

  const editProperty = (property: any) => {
    setPropertyForm({
      title: property.title || '',
      description: property.description || '',
      price: property.price?.toString() || '',
      bedrooms: property.bedrooms?.toString() || '',
      bathrooms: property.bathrooms?.toString() || '',
      area: property.area?.toString() || '',
      location: property.location || '',
      type: property.type || '',
      energy_class: property.energy_class || '',
      year_built: property.year_built?.toString() || '',
      features: property.features || [],
      images: property.images || [],
      property_types: property.property_types || []
    });
    setEditingProperty(property);
    setShowForm(true);
  };

  const editBlogPost = (post: any) => {
    setBlogForm({
      title: post.title || '',
      content: post.content || '',
      excerpt: post.excerpt || '',
      category: post.category || '',
      author: post.author || 'Globalead Portugal',
      image: post.image || '',
      read_time: post.read_time || '5 min'
    });
    setEditingPost(post);
    setShowForm(true);
  };

  const addFeature = () => {
    setPropertyForm(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setPropertyForm(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f)
    }));
  };

  const removeFeature = (index: number) => {
    setPropertyForm(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const addPropertyType = () => {
    setPropertyForm(prev => ({
      ...prev,
      property_types: [...prev.property_types, { name: '', area: '', price: '', garage: '', floor_plan: '' }]
    }));
  };

  const updatePropertyType = (index: number, field: string, value: string) => {
    setPropertyForm(prev => ({
      ...prev,
      property_types: prev.property_types.map((pt, i) => 
        i === index ? { ...pt, [field]: value } : pt
      )
    }));
  };

  const removePropertyType = (index: number) => {
    setPropertyForm(prev => ({
      ...prev,
      property_types: prev.property_types.filter((_, i) => i !== index)
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-PT');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">A carregar...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Painel de Administração</h1>
          <p className="text-gray-600">Gerir propriedades, blog e dados de contacto</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'properties', name: 'Propriedades', icon: Home },
              { id: 'blog', name: 'Blog', icon: Edit },
              { id: 'dados', name: 'Dados', icon: Users }
            ].map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setShowForm(false);
                    resetPropertyForm();
                    resetBlogForm();
                  }}
                  className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-[#0d2233] text-[#0d2233]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="h-5 w-5 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Properties Tab */}
        {activeTab === 'properties' && (
          <div>
            {!showForm ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Propriedades</h2>
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-[#0d2233] text-white px-4 py-2 rounded-lg hover:bg-[#79b2e9] transition-colors inline-flex items-center"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Nova Propriedade
                  </button>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Propriedade</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Localização</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {properties.map((property) => (
                        <tr key={property.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img className="h-10 w-10 rounded-lg object-cover" src={property.images?.[0] || '/placeholder.jpg'} alt="" />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{property.title}</div>
                                <div className="text-sm text-gray-500">{property.bedrooms}Q • {property.bathrooms}WC • {property.area}m²</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(property.price)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {property.location}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => editProperty(property)}
                              className="text-[#0d2233] hover:text-[#79b2e9] mr-4"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteProperty(property.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingProperty ? 'Editar Propriedade' : 'Nova Propriedade'}
                  </h2>
                  <button
                    onClick={resetPropertyForm}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handlePropertySubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="Título"
                      value={propertyForm.title}
                      onChange={(e) => setPropertyForm({...propertyForm, title: e.target.value})}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Preço"
                      value={propertyForm.price}
                      onChange={(e) => setPropertyForm({...propertyForm, price: e.target.value})}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Quartos"
                      value={propertyForm.bedrooms}
                      onChange={(e) => setPropertyForm({...propertyForm, bedrooms: e.target.value})}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Casas de banho"
                      value={propertyForm.bathrooms}
                      onChange={(e) => setPropertyForm({...propertyForm, bathrooms: e.target.value})}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Área (m²)"
                      value={propertyForm.area}
                      onChange={(e) => setPropertyForm({...propertyForm, area: e.target.value})}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Localização"
                      value={propertyForm.location}
                      onChange={(e) => setPropertyForm({...propertyForm, location: e.target.value})}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <select
                      value={propertyForm.type}
                      onChange={(e) => setPropertyForm({...propertyForm, type: e.target.value})}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Tipo de Imóvel</option>
                      <option value="apartamento">Apartamento</option>
                      <option value="moradia">Moradia</option>
                      <option value="terreno">Terreno</option>
                      <option value="empreendimento">Empreendimento</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Classe Energética"
                      value={propertyForm.energy_class}
                      onChange={(e) => setPropertyForm({...propertyForm, energy_class: e.target.value})}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Ano de Construção"
                      value={propertyForm.year_built}
                      onChange={(e) => setPropertyForm({...propertyForm, year_built: e.target.value})}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                    <RichTextEditor
                      value={propertyForm.description}
                      onChange={(value) => setPropertyForm({...propertyForm, description: value})}
                      placeholder="Descrição detalhada da propriedade..."
                      height="200px"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Características</label>
                    {propertyForm.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 mb-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeature(index, e.target.value)}
                          placeholder="Característica"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addFeature}
                      className="text-[#0d2233] hover:text-[#79b2e9] inline-flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Adicionar Característica
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Imagens</label>
                    <MultiFileUploader
                      folder="properties"
                      files={propertyForm.images}
                      onUpload={(urls) => setPropertyForm({...propertyForm, images: urls})}
                      accept="image/*"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipologias (Opcional)</label>
                    {propertyForm.property_types.map((type, index) => (
                      <div key={index} className="border border-gray-300 rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <input
                            type="text"
                            placeholder="Nome (ex: T1, T2)"
                            value={type.name}
                            onChange={(e) => updatePropertyType(index, 'name', e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="number"
                            placeholder="Área (m²)"
                            value={type.area}
                            onChange={(e) => updatePropertyType(index, 'area', e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="number"
                            placeholder="Preço"
                            value={type.price}
                            onChange={(e) => updatePropertyType(index, 'price', e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            placeholder="Garagem"
                            value={type.garage}
                            onChange={(e) => updatePropertyType(index, 'garage', e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Planta</label>
                          <ImageUploader
                            folder="floor-plans"
                            onUpload={(url) => updatePropertyType(index, 'floor_plan', url)}
                            value={type.floor_plan}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removePropertyType(index)}
                          className="text-red-600 hover:text-red-800 inline-flex items-center"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remover Tipologia
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addPropertyType}
                      className="text-[#0d2233] hover:text-[#79b2e9] inline-flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Adicionar Tipologia
                    </button>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="bg-[#0d2233] text-white px-6 py-2 rounded-lg hover:bg-[#79b2e9] transition-colors inline-flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {editingProperty ? 'Atualizar' : 'Criar'} Propriedade
                    </button>
                    <button
                      type="button"
                      onClick={resetPropertyForm}
                      className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Blog Tab */}
        {activeTab === 'blog' && (
          <div>
            {!showForm ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Posts do Blog</h2>
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-[#0d2233] text-white px-4 py-2 rounded-lg hover:bg-[#79b2e9] transition-colors inline-flex items-center"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Novo Post
                  </button>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {blogPosts.map((post) => (
                        <tr key={post.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img className="h-10 w-10 rounded-lg object-cover" src={post.image || '/placeholder.jpg'} alt="" />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{post.title}</div>
                                <div className="text-sm text-gray-500">{post.read_time}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {post.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(post.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => editBlogPost(post)}
                              className="text-[#0d2233] hover:text-[#79b2e9] mr-4"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteBlogPost(post.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingPost ? 'Editar Post' : 'Novo Post'}
                  </h2>
                  <button
                    onClick={resetBlogForm}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleBlogSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="Título"
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <select
                      value={blogForm.category}
                      onChange={(e) => setBlogForm({...blogForm, category: e.target.value})}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Categoria</option>
                      <option value="imobiliario">Imobiliário</option>
                      <option value="financas">Finanças</option>
                      <option value="seguros">Seguros</option>
                      <option value="energia">Energia</option>
                      <option value="telecom">Telecomunicações</option>
                      <option value="alarmes">Alarmes</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Autor"
                      value={blogForm.author}
                      onChange={(e) => setBlogForm({...blogForm, author: e.target.value})}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Tempo de leitura"
                      value={blogForm.read_time}
                      onChange={(e) => setBlogForm({...blogForm, read_time: e.target.value})}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Resumo</label>
                    <RichTextEditor
                      value={blogForm.excerpt}
                      onChange={(value) => setBlogForm({...blogForm, excerpt: value})}
                      placeholder="Resumo do artigo..."
                      height="150px"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Conteúdo</label>
                    <RichTextEditor
                      value={blogForm.content}
                      onChange={(value) => setBlogForm({...blogForm, content: value})}
                      placeholder="Conteúdo completo do artigo..."
                      height="400px"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Imagem de Destaque</label>
                    <ImageUploader
                      folder="blog"
                      onUpload={(url) => setBlogForm({...blogForm, image: url})}
                      value={blogForm.image}
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="bg-[#0d2233] text-white px-6 py-2 rounded-lg hover:bg-[#79b2e9] transition-colors inline-flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {editingPost ? 'Atualizar' : 'Criar'} Post
                    </button>
                    <button
                      type="button"
                      onClick={resetBlogForm}
                      className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Dados Tab */}
        {activeTab === 'dados' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Dados de Contacto</h2>
              <div className="text-sm text-gray-500">
                Total: {propertyLeads.length} registos
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          Cliente
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          Contacto
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          <Home className="h-4 w-4 mr-1" />
                          Tipo/Localização
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          <Euro className="h-4 w-4 mr-1" />
                          Preço/Área
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Data
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {propertyLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {lead.nome} {lead.apelido}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {lead.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{lead.telemovel}</div>
                          <div className="text-sm text-gray-500">{lead.meio_contacto}</div>
                          {lead.horario && (
                            <div className="text-xs text-gray-400 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {lead.horario}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {lead.tipo_imovel}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {lead.localizacao}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            {lead.type === 'venda' ? (
                              <>
                                <div className="text-sm font-medium text-green-600">
                                  {lead.preco_pretendido && `${lead.preco_pretendido}€`}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {lead.area && `${lead.area}m²`}
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="text-sm font-medium text-blue-600">
                                  {lead.preco_max && `Máx: ${lead.preco_max}€`}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {lead.area_min && lead.area_max ? 
                                    `${lead.area_min}-${lead.area_max}m²` : 
                                    (lead.area_min && `Min: ${lead.area_min}m²`)
                                  }
                                </div>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm text-gray-900">
                              {formatDate(lead.created_at)}
                            </div>
                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              lead.type === 'venda' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {lead.type === 'venda' ? 'Venda' : 'Compra'}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => viewLeadDetails(lead)}
                            className="text-[#0d2233] hover:text-[#79b2e9] mr-4"
                            title="Ver detalhes"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deletePropertyLead(lead.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Eliminar"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {propertyLeads.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhum dado de contacto encontrado</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Lead Details Modal */}
        {showLeadDetails && selectedLead && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <FileText className="h-6 w-6 mr-2 text-[#0d2233]" />
                  Detalhes do Contacto
                </h2>
                <button
                  onClick={closeLeadDetails}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Dados Pessoais */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <User className="h-5 w-5 mr-2 text-[#79b2e9]" />
                      Dados Pessoais
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Nome:</span>
                        <p className="text-gray-900">{selectedLead.nome} {selectedLead.apelido}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Email:</span>
                        <p className="text-gray-900">{selectedLead.email}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Telemóvel:</span>
                        <p className="text-gray-900">{selectedLead.telemovel || 'Não fornecido'}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Meio de Contacto:</span>
                        <p className="text-gray-900">{selectedLead.meio_contacto || 'Não especificado'}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Horário:</span>
                        <p className="text-gray-900">{selectedLead.horario || 'Não especificado'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Dados do Imóvel */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Home className="h-5 w-5 mr-2 text-[#79b2e9]" />
                      Dados do Imóvel
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Tipo:</span>
                        <p className="text-gray-900">{selectedLead.tipo_imovel || 'Não especificado'}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Localização:</span>
                        <p className="text-gray-900">{selectedLead.localizacao || 'Não especificada'}</p>
                      </div>
                      {selectedLead.type === 'venda' ? (
                        <>
                          <div>
                            <span className="text-sm font-medium text-gray-600">Área:</span>
                            <p className="text-gray-900">{selectedLead.area ? `${selectedLead.area}m²` : 'Não especificada'}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-600">Preço Pretendido:</span>
                            <p className="text-gray-900">{selectedLead.preco_pretendido ? `${selectedLead.preco_pretendido}€` : 'Não especificado'}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-600">Estado do Imóvel:</span>
                            <p className="text-gray-900">{selectedLead.estado_imovel || 'Não especificado'}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <span className="text-sm font-medium text-gray-600">Área Mínima:</span>
                            <p className="text-gray-900">{selectedLead.area_min ? `${selectedLead.area_min}m²` : 'Não especificada'}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-600">Área Máxima:</span>
                            <p className="text-gray-900">{selectedLead.area_max ? `${selectedLead.area_max}m²` : 'Não especificada'}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-600">Orçamento Máximo:</span>
                            <p className="text-gray-900">{selectedLead.preco_max ? `${selectedLead.preco_max}€` : 'Não especificado'}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-600">Finalidade:</span>
                            <p className="text-gray-900">{selectedLead.finalidade || 'Não especificada'}</p>
                          </div>
                        </>
                      )}
                      <div>
                        <span className="text-sm font-medium text-gray-600">Quartos:</span>
                        <p className="text-gray-900">{selectedLead.quartos || 'Não especificado'}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Casas de Banho:</span>
                        <p className="text-gray-900">{selectedLead.casas_banho || 'Não especificado'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Informações Adicionais */}
                  <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-[#79b2e9]" />
                      Informações Adicionais
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Tipo de Operação:</span>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-2 ${
                          selectedLead.type === 'venda' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {selectedLead.type === 'venda' ? 'Venda' : 'Compra'}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Urgência:</span>
                        <p className="text-gray-900">{selectedLead.urgencia || 'Não especificada'}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Data de Contacto:</span>
                        <p className="text-gray-900">{formatDate(selectedLead.created_at)}</p>
                      </div>
                      {selectedLead.type === 'venda' && selectedLead.descricao && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">Descrição:</span>
                          <p className="text-gray-900 mt-1">{selectedLead.descricao}</p>
                        </div>
                      )}
                      {selectedLead.type === 'compra' && selectedLead.observacoes && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">Observações:</span>
                          <p className="text-gray-900 mt-1">{selectedLead.observacoes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-4 mt-6 pt-6 border-t">
                  <button
                    onClick={() => {
                      const mailtoLink = `mailto:${selectedLead.email}?subject=Resposta ao seu pedido de ${selectedLead.type}&body=Caro(a) ${selectedLead.nome},`;
                      window.open(mailtoLink, '_self');
                    }}
                    className="bg-[#79b2e9] text-white px-4 py-2 rounded-lg hover:bg-[#0d2233] transition-colors inline-flex items-center"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Responder por Email
                  </button>
                  <button
                    onClick={() => {
                      window.open(`tel:${selectedLead.telemovel}`, '_self');
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center"
                    disabled={!selectedLead.telemovel}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Ligar
                  </button>
                  <button
                    onClick={closeLeadDetails}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Fechar
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