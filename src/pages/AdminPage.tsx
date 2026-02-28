import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, CreditCard as Edit, Trash2, Eye, EyeOff, Save, X, Calendar, User, Mail, Phone, MapPin, Home, Euro, Users, Clock, MessageSquare, FileText, Lock, Star, CheckCircle, StarOff } from 'lucide-react';
import RichTextEditor from '../components/RichTextEditor';
import ImageUploader from '../components/ImageUploader';
import { MultiFileUploader } from '../components/MultiFileUploader';

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(true);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  // Novos estados para gerenciar destaques
  const [featuredProperties, setFeaturedProperties] = useState<any[]>([]);
  const [featuredLoading, setFeaturedLoading] = useState(false);


  // Form states
  const [propertyForm, setPropertyForm] = useState({
    title: '',
    description: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    ref: '',
    area: '',
    location: '',
    garage: '',
    type: '',
    cover_image: '',
    energy_class: '',
    year_built: '',
    features: [] as string[],
    images: [] as string[],
    property_types: [] as any[],
    state: '',
    map_url: '',
    apartments: '',
    stores: ''
  });




  const toggleFeaturedProperty = async (property: any) => {
    try {
      const isFeatured = featuredProperties.some(fp => fp.property_id === property.id);

      if (isFeatured) {
        // Remover dos destaques
        const { error } = await supabase
          .from('featured_properties')
          .delete()
          .eq('property_id', property.id);

        if (error) throw error;
      } else {

        if (featuredProperties.length >= 6) {
          alert('Já existem 6 propriedades em destaque. Remova uma antes de adicionar outra.');
          return;
        }

        // Encontrar a próxima posição disponível
        const positions = featuredProperties.map(fp => fp.position);
        const maxPosition = positions.length > 0 ? Math.max(...positions) : 0;
        const nextPosition = maxPosition + 1;

        const { error } = await supabase
          .from('featured_properties')
          .insert([{
            property_id: property.id,
            property_ref: property.ref || property.id,
            position: nextPosition,
            created_at: new Date().toISOString()
          }]);

        if (error) throw error;
      }

      // Atualizar lista de destaques
      fetchData();

    } catch (error) {
      console.error('Erro ao atualizar destaques:', error);
      alert('Erro ao atualizar propriedade em destaque');
    }
  };

  const updatePropertyStatus = async (propertyId: string, newStatus: string, clientInfo?: any) => {
    try {
      setUpdatingStatus(propertyId);

      // Atualizar a propriedade
      const { error: updateError } = await supabase
        .from('properties')
        .update({ availability_status: newStatus })
        .eq('id', propertyId);

      if (updateError) throw updateError;

      // Registrar no histórico
      const { error: historyError } = await supabase
        .from('property_status_history')
        .insert([{
          property_id: propertyId,
          status: newStatus,
          client_name: clientInfo?.name,
          client_email: clientInfo?.email,
          client_phone: clientInfo?.phone,
          reservation_date: newStatus === 'reservado' ? new Date().toISOString() : null,
          sold_date: newStatus === 'vendido' ? new Date().toISOString() : null,
          notes: clientInfo?.notes,
          created_by: 'admin'
        }]);

      if (historyError) throw historyError;

      fetchData(); // Recarregar dados
      alert(`Status atualizado para ${newStatus}`);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status');
    } finally {
      setUpdatingStatus(null);
    }
  };




  // Função para reordenar destaques
  const reorderFeaturedProperty = async (propertyId: string, newPosition: number) => {
    try {
      const oldPosition = featuredProperties.find(fp => fp.property_id === propertyId)?.position;

      if (oldPosition === undefined) return;

      // Reordenar todas as posições
      const updatedFeatured = featuredProperties.map(fp => {
        if (fp.property_id === propertyId) {
          return { ...fp, position: newPosition };
        }

        // Ajustar outras posições
        if (oldPosition < newPosition) {
          // Movendo para baixo
          if (fp.position > oldPosition && fp.position <= newPosition) {
            return { ...fp, position: fp.position - 1 };
          }
        } else {
          // Movendo para cima
          if (fp.position >= newPosition && fp.position < oldPosition) {
            return { ...fp, position: fp.position + 1 };
          }
        }

        return fp;
      }).sort((a, b) => a.position - b.position);

      // Atualizar no banco de dados
      const updates = updatedFeatured.map((fp, index) => ({
        ...fp,
        position: index + 1
      }));

      // Atualizar todas as posições
      for (const fp of updates) {
        const { error } = await supabase
          .from('featured_properties')
          .update({ position: fp.position })
          .eq('property_id', fp.property_id);

        if (error) throw error;
      }

      fetchData();

    } catch (error) {
      console.error('Erro ao reordenar destaques:', error);
      alert('Erro ao reordenar propriedades');
    }
  };

  // Função para remover dos destaques
  const removeFromFeatured = async (propertyId: string) => {
    if (confirm('Tem certeza que deseja remover esta propriedade dos destaques?')) {
      try {
        const { error } = await supabase
          .from('featured_properties')
          .delete()
          .eq('property_id', propertyId);

        if (error) throw error;

        // Reordenar as posições restantes
        const remaining = featuredProperties.filter(fp => fp.property_id !== propertyId);
        const updates = remaining.map((fp, index) => ({
          ...fp,
          position: index + 1
        }));

        for (const fp of updates) {
          await supabase
            .from('featured_properties')
            .update({ position: fp.position })
            .eq('property_id', fp.property_id);
        }

        fetchData();
        alert('Propriedade removida dos destaques!');
      } catch (error) {
        console.error('Erro ao remover dos destaques:', error);
        alert('Erro ao remover propriedade dos destaques');
      }
    }
  };

  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    author: 'Globalead Portugal',
    image: '',
    read_time: '5 min'
  });

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setPasswordError('');

    try {
      // Check password in database - replace 'x' with your table name and 'y' with your column name
      const { data, error } = await supabase
        .from('site_settings') // Replace with your table name
        .select('admin_password') // Replace with your password column name
        .single();

      if (error) {
        throw error;
      }

      if (data && data.admin_password === password) { // Replace 'y' with your column name
        setIsAuthenticated(true);
        setShowPasswordPopup(false);
        fetchData();
      } else {
        setPasswordError('Password incorreta. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao verificar password:', error);
      setPasswordError('Erro ao verificar password. Tente novamente.');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    // Only fetch data if authenticated
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

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

      // Fetch featured properties
      const { data: featuredData } = await supabase
        .from('featured_properties')
        .select('*')
        .order('position', { ascending: true });

      setProperties(propertiesData || []);
      setBlogPosts(blogData || []);
      setPropertyLeads(leadsData || []);
      setFeaturedProperties(featuredData || []);
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
        ref: propertyForm.ref || editingProperty?.ref || generateRef('PROP'),
        price: parseFloat(propertyForm.price),
        bedrooms: parseInt(propertyForm.bedrooms),
        bathrooms: parseInt(propertyForm.bathrooms),
        area: parseFloat(propertyForm.area),
        year_built: propertyForm.year_built
          ? parseInt(propertyForm.year_built)
          : null,
        state: propertyForm.state || null,
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
      ref: '',
      area: '',
      location: '',
      garage: '',
      type: '',
      cover_image: '',
      energy_class: '',
      year_built: '',
      features: [],
      images: [],
      property_types: [],
      state: '',
      map_url: '',
      apartments: '',
      stores: ''
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
      ref: property.ref || '',
      area: property.area?.toString() || '',
      location: property.location || '',
      garage: property.garage || '',
      type: property.type || '',
      cover_image: property.cover_image || '',
      energy_class: property.energy_class || '',
      year_built: property.year_built?.toString() || '',
      features: property.features || [],
      images: property.images || [],
      property_types: property.property_types || [],
      state: property.state || '',
      map_url: property.map_url || '',
      apartments: property.apartments?.toString() || '',
      stores: property.stores?.toString() || ''
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
      property_types: [...prev.property_types, { fracao: '', name: '', bedrooms: '', bathrooms: '', area: '', garage: 'nao', price: '', floor_plan: '', piso: '', status: 'disponivel' }]
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

  // Password popup
  if (showPasswordPopup && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-[#0d2233] rounded-full flex items-center justify-center mb-4">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Acesso Restrito</h2>
              <p className="text-gray-600">Introduza a palavra-passe para aceder ao painel de administração</p>
            </div>

            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-6">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError('');
                    }}
                    placeholder="Palavra-passe"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#79b2e9] focus:border-transparent"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {passwordError && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <X className="h-4 w-4 mr-1" />
                    {passwordError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0d2233] text-white py-3 px-4 rounded-lg hover:bg-[#79b2e9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    A verificar...
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5 mr-2" />
                    Entrar
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Este painel é de acesso restrito. Se não tem permissão, contacte o administrador.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading && isAuthenticated) {
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
              { id: 'featured', name: 'Destaques', icon: Star },
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
                  className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
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
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {properties.map((property) => (
                          <tr key={property.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <img src={property.cover_image || property.images?.[0] || '/placeholder.jpg'} className="h-10 w-10 rounded-lg object-cover" />
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
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                value={property.availability_status || 'disponivel'}
                                onChange={(e) => {
                                  if (confirm(`Tem certeza que deseja alterar o status para ${e.target.value === 'reservado' ? 'Reservado' : 'Vendido'}?`)) {
                                    updatePropertyStatus(property.id, e.target.value);
                                  }
                                }}
                                disabled={updatingStatus === property.id}
                                className={`px-2 py-1 rounded-lg text-sm font-medium border ${property.availability_status === 'reservado' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                                  property.availability_status === 'vendido' ? 'bg-red-100 text-red-800 border-red-300' :
                                    'bg-gray-100 text-gray-800 border-gray-300'
                                  }`}
                              >
                                <option value="disponivel">Disponível</option>
                                <option value="reservado">Reservado</option>
                                <option value="vendido">Vendido</option>
                              </select>
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
                      onChange={(e) => setPropertyForm({ ...propertyForm, title: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Preço"
                      value={propertyForm.price}
                      onChange={(e) => setPropertyForm({ ...propertyForm, price: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Quartos"
                      value={propertyForm.bedrooms}
                      onChange={(e) => setPropertyForm({ ...propertyForm, bedrooms: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Casas de banho"
                      value={propertyForm.bathrooms}
                      onChange={(e) => setPropertyForm({ ...propertyForm, bathrooms: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Área (m²)"
                      value={propertyForm.area}
                      onChange={(e) => setPropertyForm({ ...propertyForm, area: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Localização"
                      value={propertyForm.location}
                      onChange={(e) => setPropertyForm({ ...propertyForm, location: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      value={propertyForm.type}
                      onChange={(e) => setPropertyForm({ ...propertyForm, type: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      onChange={(e) => setPropertyForm({ ...propertyForm, energy_class: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Ano de Construção"
                      value={propertyForm.year_built}
                      onChange={(e) => setPropertyForm({ ...propertyForm, year_built: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      value={propertyForm.state || ''}
                      onChange={(e) => setPropertyForm({ ...propertyForm, state: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Estado do Imóvel</option>
                      <option value="novo">Novo</option>
                      <option value="usado">Usado</option>
                      <option value="em_construcao">Em Construção</option>
                      <option value="renovado">Renovado</option>
                      <option value="requer_obras">Requer Obras</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Referência do Imóvel (ex: GL-1023)"
                      value={propertyForm.ref}
                      onChange={(e) => setPropertyForm({ ...propertyForm, ref: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Estacionamento (ex: 1 lugar, Box, Não tem)"
                      value={propertyForm.garage}
                      onChange={(e) => setPropertyForm({ ...propertyForm, garage: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="URL do Mapa (colar o link 'embed' do Google Maps)"
                      value={propertyForm.map_url || ''}
                      onChange={(e) => setPropertyForm({ ...propertyForm, map_url: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg col-span-2"
                    />
                    {propertyForm.type === 'empreendimento' && (
                      <>
                        <input
                          type="number"
                          placeholder="Nº de Apartamentos"
                          value={propertyForm.apartments || ''}
                          onChange={(e) => setPropertyForm({ ...propertyForm, apartments: e.target.value })}
                          className="px-4 py-2 border border-gray-300 rounded-lg"
                        />
                        <input
                          type="number"
                          placeholder="Nº de Lojas"
                          value={propertyForm.stores || ''}
                          onChange={(e) => setPropertyForm({ ...propertyForm, stores: e.target.value })}
                          className="px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                    <RichTextEditor
                      value={propertyForm.description}
                      onChange={(value) => setPropertyForm({ ...propertyForm, description: value })}
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Foto de Capa (Imagem Principal)
                    </label>

                    <ImageUploader
                      folder="properties/covers"
                      value={propertyForm.cover_image}
                      onUpload={(url) =>
                        setPropertyForm({ ...propertyForm, cover_image: url })
                      }
                    />
                    <label className="block text-sm font-medium text-gray-700 mb-2">Imagens</label>
                    <MultiFileUploader
                      folder="properties"
                      files={propertyForm.images}
                      onUpload={(urls) => setPropertyForm({ ...propertyForm, images: urls })}
                      accept="image/*"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipologias (Opcional)</label>
                    {propertyForm.property_types.map((type, index) => (
                      <div key={index} className="border border-gray-300 rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <input
                            type="text"
                            placeholder="Fração (ex: A, B, C)"
                            value={type.fracao || ''}
                            onChange={(e) => updatePropertyType(index, 'fracao', e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            placeholder="Piso (ex: 1, 2, R/C)"
                            value={type.piso || ''}
                            onChange={(e) => updatePropertyType(index, 'piso', e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            placeholder="Tipologia (ex: T1, T2)"
                            value={type.name}
                            onChange={(e) => updatePropertyType(index, 'name', e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="number"
                            placeholder="Quartos"
                            value={type.bedrooms || ''}
                            onChange={(e) => updatePropertyType(index, 'bedrooms', e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="number"
                            placeholder="Casas de Banho"
                            value={type.bathrooms || ''}
                            onChange={(e) => updatePropertyType(index, 'bathrooms', e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="number"
                            placeholder="Área (m²)"
                            value={type.area}
                            onChange={(e) => updatePropertyType(index, 'area', e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <select
                            value={type.garage || 'nao'}
                            onChange={(e) => updatePropertyType(index, 'garage', e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="nao">Garagem: Não</option>
                            <option value="sim">Garagem: Sim</option>
                          </select>
                          <select
                            value={type.status || 'disponivel'}
                            onChange={(e) => updatePropertyType(index, 'status', e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="disponivel">Estado: Saber mais</option>
                            <option value="reservado">Estado: Reservado</option>
                            <option value="vendido">Estado: Vendido</option>
                          </select>
                          <input
                            type="number"
                            placeholder="Preço"
                            value={type.price}
                            onChange={(e) => updatePropertyType(index, 'price', e.target.value)}
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
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <select
                      value={blogForm.category}
                      onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Categoria</option>
                      <option value="imobiliario">Imobiliário</option>
                      <option value="financas">Finanças</option>
                      <option value="seguros">Seguros</option>
                      <option value="ce">Certificação energetica</option>
                      {/*<option value="energia">Energia</option>
                      <option value="telecom">Telecomunicações</option>
                      <option value="alarmes">Alarmes</option> */}
                    </select>
                    <input
                      type="text"
                      placeholder="Autor"
                      value={blogForm.author}
                      onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Tempo de leitura"
                      value={blogForm.read_time}
                      onChange={(e) => setBlogForm({ ...blogForm, read_time: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Resumo</label>
                    <RichTextEditor
                      value={blogForm.excerpt}
                      onChange={(value) => setBlogForm({ ...blogForm, excerpt: value })}
                      placeholder="Resumo do artigo..."
                      height="150px"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Conteúdo</label>
                    <RichTextEditor
                      value={blogForm.content}
                      onChange={(value) => setBlogForm({ ...blogForm, content: value })}
                      placeholder="Conteúdo completo do artigo..."
                      height="400px"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Imagem de Destaque</label>
                    <ImageUploader
                      folder="blog"
                      onUpload={(url) => setBlogForm({ ...blogForm, image: url })}
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

        {activeTab === 'featured' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Propriedades em Destaque</h2>
              <p className="text-gray-600 mt-2">
                Selecione até 6 propriedades para aparecerem na página inicial.
                Arraste para reordenar (a primeira aparece na esquerda).
              </p>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-blue-500 mr-2" />
                  <p className="text-sm text-blue-700">
                    <span className="font-semibold">{featuredProperties.length}/6</span> propriedades selecionadas
                  </p>
                </div>
              </div>
            </div>

            {/* Lista de propriedades em destaque */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Propriedades Selecionadas</h3>

              {featuredProperties.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <StarOff className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhuma propriedade em destaque</p>
                  <p className="text-sm text-gray-400 mt-2">Selecione propriedades abaixo para adicionar aos destaques</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {featuredProperties
                    .sort((a, b) => a.position - b.position)
                    .map((featured, index) => {
                      const property = properties.find(p => p.id === featured.property_id);
                      if (!property) return null;

                      return (
                        <div key={featured.id} className="bg-white rounded-lg shadow border p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="mr-4 flex items-center justify-center w-8 h-8 bg-[#0d2233] text-white rounded-full">
                                {index + 1}
                              </div>
                              <img
                                src={property.cover_image || property.images?.[0] || '/placeholder.jpg'}
                                className="h-16 w-16 rounded-lg object-cover mr-4"
                                alt={property.title}
                              />
                              <div>
                                <h4 className="font-medium text-gray-900">{property.title}</h4>
                                <div className="flex items-center text-sm text-gray-500">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {property.location}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {property.bedrooms}Q • {property.bathrooms}WC • {property.area}m²
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="flex space-x-1">
                                <button
                                  onClick={() => reorderFeaturedProperty(property.id, Math.max(1, index))}
                                  disabled={index === 0}
                                  className={`p-2 rounded ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-[#0d2233] hover:bg-gray-100'}`}
                                  title="Mover para cima"
                                >
                                  ↑
                                </button>
                                <button
                                  onClick={() => reorderFeaturedProperty(property.id, Math.min(3, index + 2))}
                                  disabled={index === featuredProperties.length - 1}
                                  className={`p-2 rounded ${index === featuredProperties.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-[#0d2233] hover:bg-gray-100'}`}
                                  title="Mover para baixo"
                                >
                                  ↓
                                </button>
                              </div>
                              <button
                                onClick={() => removeFromFeatured(property.id)}
                                className="text-red-600 hover:text-red-800 p-2"
                                title="Remover dos destaques"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            {/* Lista de todas as propriedades para seleção */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Todas as Propriedades</h3>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Propriedade
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Preço
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Localização
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Destaque
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {properties.map((property) => {
                        const isFeatured = featuredProperties.some(fp => fp.property_id === property.id);
                        return (
                          <tr key={property.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <img
                                  src={property.cover_image || property.images?.[0] || '/placeholder.jpg'}
                                  className="h-10 w-10 rounded-lg object-cover"
                                  alt={property.title}
                                />
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{property.title}</div>
                                  <div className="text-sm text-gray-500">
                                    {property.bedrooms}Q • {property.bathrooms}WC • {property.area}m²
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatCurrency(property.price)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {property.location}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => toggleFeaturedProperty(property)}
                                className={`inline-flex items-center px-4 py-2 rounded-lg ${isFeatured
                                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                  : featuredProperties.length >= 6
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                                  }`}
                                disabled={!isFeatured && featuredProperties.length >= 6}
                              >
                                {isFeatured ? (
                                  <>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Em Destaque
                                  </>
                                ) : (
                                  <>
                                    <Star className="h-4 w-4 mr-2" />
                                    Adicionar
                                  </>
                                )}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
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
                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${lead.type === 'venda'
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
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-2 ${selectedLead.type === 'venda'
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
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
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