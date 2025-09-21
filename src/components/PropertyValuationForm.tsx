import React, { useState } from 'react';
import { Home, MapPin, ChevronRight, Plus, Minus, ArrowLeft, User, Phone, Mail, Building, Car, Euro } from 'lucide-react';
import { sendEmail } from '../utils/emailService';

interface PropertyData {
  tipoImovel: 'apartamento' | 'moradia' | 'terreno' | 'comercial' | null;
  tipologia: string;
  area: number;
  anoConstucao: number;
  quartos: number;
  casasBanho: number;
  garagem: boolean;
  elevador: boolean;
  terracoVaranda: boolean;
  piscina: boolean;
  jardim: boolean;
  estadoConservacao: 'novo' | 'bom' | 'razoavel' | 'recuperar' | null;
  localizacao: string;
  rua: string;
  codigoPostal: string;
  motivoVenda: 'vender-rapidamente' | 'melhor-preco' | 'avaliar-opcoes' | null;
  nome: string;
  email: string;
  telemovel: string;
}

const PropertyValuationForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState<PropertyData>({
    tipoImovel: null,
    tipologia: '',
    area: 0,
    anoConstucao: new Date().getFullYear(),
    quartos: 1,
    casasBanho: 1,
    garagem: false,
    elevador: false,
    terracoVaranda: false,
    piscina: false,
    jardim: false,
    estadoConservacao: null,
    localizacao: '',
    rua: '',
    codigoPostal: '',
    motivoVenda: null,
    nome: '',
    email: '',
    telemovel: ''
  });

  const handleTipoImovelSelect = (tipo: PropertyData['tipoImovel']) => {
    setData({ ...data, tipoImovel: tipo });
    setCurrentStep(2);
  };

  const handleEstadoSelect = (estado: PropertyData['estadoConservacao']) => {
    setData({ ...data, estadoConservacao: estado });
    setCurrentStep(5);
  };

  const handleMotivoSelect = (motivo: PropertyData['motivoVenda']) => {
    setData({ ...data, motivoVenda: motivo });
    setCurrentStep(6);
  };

  const adjustCount = (field: 'quartos' | 'casasBanho' | 'area' | 'anoConstucao', increment: boolean, step: number = 1) => {
    setData(prev => ({
      ...prev,
      [field]: Math.max(field === 'anoConstucao' ? 1900 : (field === 'area' ? 10 : 0), 
                       prev[field] + (increment ? step : -step))
    }));
  };

  const toggleFeature = (feature: keyof PropertyData) => {
    setData(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  const handleSubmit = async () => {
    if (!data.nome || !data.email || !data.telemovel) {
      alert('Por favor, preencha todos os dados de contacto.');
      return;
    }

    setIsSubmitting(true);
    
    const emailData = {
      nome: data.nome,
      email: data.email,
      telemovel: data.telemovel,
      page: 'Avaliação de Imóvel - Carlos Gonçalves',
      mensagem: `
        Tipo de Imóvel: ${getTipoImovelLabel(data.tipoImovel)}
        ${data.tipologia ? `Tipologia: ${data.tipologia}` : ''}
        Área: ${data.area}m²
        Ano de Construção: ${data.anoConstucao}
        Quartos: ${data.quartos}
        Casas de Banho: ${data.casasBanho}
        Características:
        ${data.garagem ? '✓ Garagem' : '✗ Sem Garagem'}
        ${data.elevador ? '✓ Elevador' : '✗ Sem Elevador'}
        ${data.terracoVaranda ? '✓ Terraço/Varanda' : '✗ Sem Terraço/Varanda'}
        ${data.piscina ? '✓ Piscina' : '✗ Sem Piscina'}
        ${data.jardim ? '✓ Jardim' : '✗ Sem Jardim'}
        Estado de Conservação: ${getEstadoLabel(data.estadoConservacao)}
        Localização: ${data.localizacao}
        Rua: ${data.rua}
        Código Postal: ${data.codigoPostal}
        Motivo da Venda: ${getMotivoLabel(data.motivoVenda)}
      `.trim()
    };

    const success = await sendEmail(emailData);
    
    if (success) {
      alert('Pedido de avaliação enviado com sucesso! O Carlos Gonçalves entrará em contacto consigo brevemente.');
      // Reset form
      setData({
        tipoImovel: null,
        tipologia: '',
        area: 0,
        anoConstucao: new Date().getFullYear(),
        quartos: 1,
        casasBanho: 1,
        garagem: false,
        elevador: false,
        terracoVaranda: false,
        piscina: false,
        jardim: false,
        estadoConservacao: null,
        localizacao: '',
        rua: '',
        codigoPostal: '',
        motivoVenda: null,
        nome: '',
        email: '',
        telemovel: ''
      });
      setCurrentStep(1);
    } else {
      alert('Erro ao enviar pedido. Tente novamente ou contacte-nos diretamente.');
    }
    
    setIsSubmitting(false);
  };

  const getTipoImovelLabel = (tipo: PropertyData['tipoImovel']) => {
    switch (tipo) {
      case 'apartamento': return 'Apartamento';
      case 'moradia': return 'Moradia';
      case 'terreno': return 'Terreno';
      case 'comercial': return 'Imóvel Comercial';
      default: return '';
    }
  };

  const getEstadoLabel = (estado: PropertyData['estadoConservacao']) => {
    switch (estado) {
      case 'novo': return 'Novo/Excelente';
      case 'bom': return 'Bom Estado';
      case 'razoavel': return 'Estado Razoável';
      case 'recuperar': return 'Para Recuperar';
      default: return '';
    }
  };

  const getMotivoLabel = (motivo: PropertyData['motivoVenda']) => {
    switch (motivo) {
      case 'vender-rapidamente': return 'Vender Rapidamente';
      case 'melhor-preco': return 'Obter o Melhor Preço';
      case 'avaliar-opcoes': return 'Avaliar Opções';
      default: return '';
    }
  };

  const getProgressPercentage = () => {
    return (currentStep / 6) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <button 
                onClick={() => setCurrentStep(Math.max(currentStep -1, 1))}
                className="flex items-center text-[#0d2233] hover:text-[#79b2e9] transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Voltar
              </button>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center text-[#0d2233] font-medium">
                  <Euro className="h-4 w-4 mr-2" />
                  AVALIAÇÃO
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">CARACTERÍSTICAS</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">LOCALIZAÇÃO</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">CONTACTO</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário - Lado Esquerdo */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-[#0d2233]">Passo {currentStep} de 6</span>
                  <span className="text-sm text-gray-500">{Math.round(getProgressPercentage())}% concluído</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#0d2233] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>
              </div>

              {/* Step 1: Tipo de Imóvel */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#0d2233] mb-2">Que tipo de imóvel pretende avaliar?</h2>
                  <p className="text-gray-600 mb-8">Selecione o tipo de propriedade que possui</p>
                  
                  <div className="space-y-4">
                    <button
                      onClick={() => handleTipoImovelSelect('apartamento')}
                      className="w-full flex items-center justify-between p-6 border-2 border-gray-200 rounded-2xl hover:border-[#0d2233] hover:bg-[#f8fbff] transition-all group"
                    >
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-[#e5f3ff] rounded-xl mr-4 group-hover:bg-[#0d2233] transition-colors">
                          <Building className="h-6 w-6 text-[#0d2233] group-hover:text-white" />
                        </div>
                        <span className="font-medium text-[#0d2233]">Apartamento</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>

                    <button
                      onClick={() => handleTipoImovelSelect('moradia')}
                      className="w-full flex items-center justify-between p-6 border-2 border-gray-200 rounded-2xl hover:border-[#0d2233] hover:bg-[#f8fbff] transition-all group"
                    >
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-[#e5f3ff] rounded-xl mr-4 group-hover:bg-[#0d2233] transition-colors">
                          <Home className="h-6 w-6 text-[#0d2233] group-hover:text-white" />
                        </div>
                        <span className="font-medium text-[#0d2233]">Moradia</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>

                    <button
                      onClick={() => handleTipoImovelSelect('terreno')}
                      className="w-full flex items-center justify-between p-6 border-2 border-gray-200 rounded-2xl hover:border-[#0d2233] hover:bg-[#f8fbff] transition-all group"
                    >
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-[#e5f3ff] rounded-xl mr-4 group-hover:bg-[#0d2233] transition-colors">
                          <MapPin className="h-6 w-6 text-[#0d2233] group-hover:text-white" />
                        </div>
                        <span className="font-medium text-[#0d2233]">Terreno</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>

                    <button
                      onClick={() => handleTipoImovelSelect('comercial')}
                      className="w-full flex items-center justify-between p-6 border-2 border-gray-200 rounded-2xl hover:border-[#0d2233] hover:bg-[#f8fbff] transition-all group"
                    >
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-[#e5f3ff] rounded-xl mr-4 group-hover:bg-[#0d2233] transition-colors">
                          <Building className="h-6 w-6 text-[#0d2233] group-hover:text-white" />
                        </div>
                        <span className="font-medium text-[#0d2233]">Imóvel Comercial</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Características Básicas */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#0d2233] mb-2">Características do imóvel</h2>
                  <p className="text-gray-600 mb-8">Indique as características principais</p>
                  
                  <div className="space-y-6">
                    {/* Tipologia */}
                    {(data.tipoImovel === 'apartamento' || data.tipoImovel === 'moradia') && (
                      <div>
                        <label className="block text-sm font-medium text-[#0d2233] mb-2">
                          Tipologia
                        </label>
                        <select
                          value={data.tipologia}
                          onChange={(e) => setData({ ...data, tipologia: e.target.value })}
                          className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-[#0d2233] focus:outline-none transition-all"
                        >
                          <option value="">Selecione a tipologia</option>
                          <option value="T0">T0</option>
                          <option value="T1">T1</option>
                          <option value="T2">T2</option>
                          <option value="T3">T3</option>
                          <option value="T4">T4</option>
                          <option value="T5">T5</option>
                          <option value="T6+">T6+</option>
                        </select>
                      </div>
                    )}

                    {/* Área */}
                    <div className="p-6 border-2 border-gray-200 rounded-2xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-[#0d2233] mb-1">Área (m²)</h3>
                          <p className="text-sm text-gray-600">Área útil do imóvel</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => adjustCount('area', false, 10)}
                            className="w-10 h-10 rounded-full border-2 border-[#0d2233] flex items-center justify-center text-[#0d2233] hover:bg-[#0d2233] hover:text-white transition-all"
                            disabled={data.area <= 10}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-2xl font-bold text-[#0d2233] w-16 text-center">{data.area}</span>
                          <button
                            onClick={() => adjustCount('area', true, 10)}
                            className="w-10 h-10 rounded-full border-2 border-[#0d2233] flex items-center justify-center text-[#0d2233] hover:bg-[#0d2233] hover:text-white transition-all"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Ano de Construção */}
                    <div className="p-6 border-2 border-gray-200 rounded-2xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-[#0d2233] mb-1">Ano de Construção</h3>
                          <p className="text-sm text-gray-600">Quando foi construído</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => adjustCount('anoConstucao', false, 1)}
                            className="w-10 h-10 rounded-full border-2 border-[#0d2233] flex items-center justify-center text-[#0d2233] hover:bg-[#0d2233] hover:text-white transition-all"
                            disabled={data.anoConstucao <= 1900}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-2xl font-bold text-[#0d2233] w-20 text-center">{data.anoConstucao}</span>
                          <button
                            onClick={() => adjustCount('anoConstucao', true, 1)}
                            className="w-10 h-10 rounded-full border-2 border-[#0d2233] flex items-center justify-center text-[#0d2233] hover:bg-[#0d2233] hover:text-white transition-all"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setCurrentStep(3)}
                      className="w-full bg-[#0d2233] text-white py-4 px-6 rounded-2xl hover:bg-[#79b2e9] transition-all duration-300 font-medium"
                    >
                      Continuar
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Quartos e Casas de Banho */}
              {currentStep === 3 && (data.tipoImovel === 'apartamento' || data.tipoImovel === 'moradia') && (
                <div>
                  <h2 className="text-2xl font-bold text-[#0d2233] mb-2">Quartos e casas de banho</h2>
                  <p className="text-gray-600 mb-8">Quantos quartos e casas de banho tem o imóvel?</p>
                  
                  <div className="space-y-6">
                    {/* Quartos */}
                    <div className="p-6 border-2 border-gray-200 rounded-2xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-[#0d2233] mb-1">Quartos</h3>
                          <p className="text-sm text-gray-600">Número de quartos</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => adjustCount('quartos', false)}
                            className="w-10 h-10 rounded-full border-2 border-[#0d2233] flex items-center justify-center text-[#0d2233] hover:bg-[#0d2233] hover:text-white transition-all"
                            disabled={data.quartos <= 0}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-2xl font-bold text-[#0d2233] w-8 text-center">{data.quartos}</span>
                          <button
                            onClick={() => adjustCount('quartos', true)}
                            className="w-10 h-10 rounded-full border-2 border-[#0d2233] flex items-center justify-center text-[#0d2233] hover:bg-[#0d2233] hover:text-white transition-all"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Casas de Banho */}
                    <div className="p-6 border-2 border-gray-200 rounded-2xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-[#0d2233] mb-1">Casas de Banho</h3>
                          <p className="text-sm text-gray-600">Número de casas de banho</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => adjustCount('casasBanho', false)}
                            className="w-10 h-10 rounded-full border-2 border-[#0d2233] flex items-center justify-center text-[#0d2233] hover:bg-[#0d2233] hover:text-white transition-all"
                            disabled={data.casasBanho <= 0}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-2xl font-bold text-[#0d2233] w-8 text-center">{data.casasBanho}</span>
                          <button
                            onClick={() => adjustCount('casasBanho', true)}
                            className="w-10 h-10 rounded-full border-2 border-[#0d2233] flex items-center justify-center text-[#0d2233] hover:bg-[#0d2233] hover:text-white transition-all"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Características Extras */}
                    <div className="p-6 border-2 border-gray-200 rounded-2xl">
                      <h3 className="font-semibold text-[#0d2233] mb-4">Características Extras</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { key: 'garagem', label: 'Garagem', icon: Car },
                          { key: 'elevador', label: 'Elevador', icon: Building },
                          { key: 'terracoVaranda', label: 'Terraço/Varanda', icon: Home },
                          { key: 'piscina', label: 'Piscina', icon: Home },
                          { key: 'jardim', label: 'Jardim', icon: Home }
                        ].map(({ key, label, icon: Icon }) => (
                          <button
                            key={key}
                            onClick={() => toggleFeature(key as keyof PropertyData)}
                            className={`p-3 rounded-xl border-2 transition-all flex items-center space-x-2 ${
                              data[key as keyof PropertyData] 
                                ? 'border-[#0d2233] bg-[#0d2233] text-white' 
                                : 'border-gray-200 hover:border-[#0d2233]'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            <span className="text-sm font-medium">{label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setCurrentStep(4)}
                      className="w-full bg-[#0d2233] text-white py-4 px-6 rounded-2xl hover:bg-[#79b2e9] transition-all duration-300 font-medium"
                    >
                      Continuar
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 alternativo para terreno/comercial */}
              {currentStep === 3 && (data.tipoImovel === 'terreno' || data.tipoImovel === 'comercial') && (
                <div>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="w-full bg-[#0d2233] text-white py-4 px-6 rounded-2xl hover:bg-[#79b2e9] transition-all duration-300 font-medium"
                  >
                    Continuar
                  </button>
                </div>
              )}

              {/* Step 4: Estado de Conservação */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#0d2233] mb-2">Estado de conservação</h2>
                  <p className="text-gray-600 mb-8">Como classifica o estado atual do imóvel?</p>
                  
                  <div className="space-y-4">
                    {[
                      { key: 'novo', label: 'Novo/Excelente', desc: 'Imóvel em perfeito estado' },
                      { key: 'bom', label: 'Bom Estado', desc: 'Pequenas reparações necessárias' },
                      { key: 'razoavel', label: 'Estado Razoável', desc: 'Necessita algumas obras' },
                      { key: 'recuperar', label: 'Para Recuperar', desc: 'Necessita obras significativas' }
                    ].map(({ key, label, desc }) => (
                      <button
                        key={key}
                        onClick={() => handleEstadoSelect(key as PropertyData['estadoConservacao'])}
                        className="w-full flex items-center justify-between p-6 border-2 border-gray-200 rounded-2xl hover:border-[#0d2233] hover:bg-[#f8fbff] transition-all group"
                      >
                        <div className="flex items-center">
                          <div className="flex items-center justify-center w-12 h-12 bg-[#e5f3ff] rounded-xl mr-4 group-hover:bg-[#0d2233] transition-colors">
                            <Home className="h-6 w-6 text-[#0d2233] group-hover:text-white" />
                          </div>
                          <div className="text-left">
                            <span className="font-medium text-[#0d2233] block">{label}</span>
                            <span className="text-sm text-gray-600">{desc}</span>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Localização */}
              {currentStep === 5 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#0d2233] mb-2">Localização do imóvel</h2>
                  <p className="text-gray-600 mb-8">Indique a localização para uma avaliação mais precisa</p>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-[#0d2233] mb-2">
                        Cidade/Localidade *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type="text"
                          value={data.localizacao}
                          onChange={(e) => setData({ ...data, localizacao: e.target.value })}
                          className="w-full pl-12 p-4 border-2 border-gray-200 rounded-2xl focus:border-[#0d2233] focus:outline-none transition-all"
                          placeholder="Ex: Lisboa, Porto, Braga..."
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0d2233] mb-2">
                        Rua/Avenida
                      </label>
                      <input
                        type="text"
                        value={data.rua}
                        onChange={(e) => setData({ ...data, rua: e.target.value })}
                        className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-[#0d2233] focus:outline-none transition-all"
                        placeholder="Nome da rua (opcional)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0d2233] mb-2">
                        Código Postal
                      </label>
                      <input
                        type="text"
                        value={data.codigoPostal}
                        onChange={(e) => setData({ ...data, codigoPostal: e.target.value })}
                        className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-[#0d2233] focus:outline-none transition-all"
                        placeholder="XXXX-XXX"
                      />
                    </div>

                    <h3 className="text-lg font-semibold text-[#0d2233] mt-8 mb-4">Qual o seu objetivo?</h3>
                    
                    <div className="space-y-4">
                      {[
                        { key: 'vender-rapidamente', label: 'Vender Rapidamente', desc: 'Preciso vender o mais rápido possível' },
                        { key: 'melhor-preco', label: 'Obter o Melhor Preço', desc: 'Quero maximizar o valor de venda' },
                        { key: 'avaliar-opcoes', label: 'Avaliar Opções', desc: 'Estou a considerar vender' }
                      ].map(({ key, label, desc }) => (
                        <button
                          key={key}
                          onClick={() => handleMotivoSelect(key as PropertyData['motivoVenda'])}
                          className="w-full flex items-center justify-between p-6 border-2 border-gray-200 rounded-2xl hover:border-[#0d2233] hover:bg-[#f8fbff] transition-all group"
                        >
                          <div className="flex items-center">
                            <div className="flex items-center justify-center w-12 h-12 bg-[#e5f3ff] rounded-xl mr-4 group-hover:bg-[#0d2233] transition-colors">
                              <Euro className="h-6 w-6 text-[#0d2233] group-hover:text-white" />
                            </div>
                            <div className="text-left">
                              <span className="font-medium text-[#0d2233] block">{label}</span>
                              <span className="text-sm text-gray-600">{desc}</span>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Dados de Contacto */}
              {currentStep === 6 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#0d2233] mb-2">Os seus dados de contacto</h2>
                  <p className="text-gray-600 mb-8">Para que o Carlos Gonçalves possa contactá-lo com a avaliação</p>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-[#0d2233] mb-2">
                        Nome completo *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type="text"
                          value={data.nome}
                          onChange={(e) => setData({ ...data, nome: e.target.value })}
                          className="w-full pl-12 p-4 border-2 border-gray-200 rounded-2xl focus:border-[#0d2233] focus:outline-none transition-all"
                          placeholder="O seu nome completo"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0d2233] mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type="email"
                          value={data.email}
                          onChange={(e) => setData({ ...data, email: e.target.value })}
                          className="w-full pl-12 p-4 border-2 border-gray-200 rounded-2xl focus:border-[#0d2233] focus:outline-none transition-all"
                          placeholder="o.seu.email@exemplo.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0d2233] mb-2">
                        Telemóvel *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type="tel"
                          value={data.telemovel}
                          onChange={(e) => setData({ ...data, telemovel: e.target.value })}
                          className="w-full pl-12 p-4 border-2 border-gray-200 rounded-2xl focus:border-[#0d2233] focus:outline-none transition-all"
                          placeholder="9XX XXX XXX"
                          required
                        />
                      </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-2xl">
                      <h4 className="font-semibold text-[#0d2233] mb-2">O que acontece a seguir?</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Análise detalhada do seu imóvel</li>
                        <li>• Comparação com propriedades similares na zona</li>
                        <li>• Contacto telefónico em 24h</li>
                        <li>• Relatório de avaliação gratuito</li>
                      </ul>
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full bg-[#0d2233] text-white py-4 px-6 rounded-2xl hover:bg-[#79b2e9] transition-all duration-300 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'A enviar...' : 'Solicitar Avaliação Gratuita'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Resumo - Lado Direito */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 sticky top-8">
              <h3 className="text-xl font-bold text-[#0d2233] mb-6">Resumo da Avaliação</h3>
              
              <div className="space-y-4">
                {data.tipoImovel && (
                  <div className="flex justify-between items-center p-3 bg-[#f8fbff] rounded-xl">
                    <span className="text-sm text-gray-600">Tipo de Imóvel</span>
                    <span className="font-medium text-[#0d2233] text-sm">{getTipoImovelLabel(data.tipoImovel)}</span>
                  </div>
                )}

                {data.tipologia && (
                  <div className="flex justify-between items-center p-3 bg-[#f8fbff] rounded-xl">
                    <span className="text-sm text-gray-600">Tipologia</span>
                    <span className="font-medium text-[#0d2233] text-sm">{data.tipologia}</span>
                  </div>
                )}

                {data.area > 0 && (
                  <div className="flex justify-between items-center p-3 bg-[#f8fbff] rounded-xl">
                    <span className="text-sm text-gray-600">Área</span>
                    <span className="font-medium text-[#0d2233] text-sm">{data.area}m²</span>
                  </div>
                )}

                {data.anoConstucao && (
                  <div className="flex justify-between items-center p-3 bg-[#f8fbff] rounded-xl">
                    <span className="text-sm text-gray-600">Ano</span>
                    <span className="font-medium text-[#0d2233] text-sm">{data.anoConstucao}</span>
                  </div>
                )}

                {(data.tipoImovel === 'apartamento' || data.tipoImovel === 'moradia') && currentStep >= 3 && (
                  <div className="p-3 bg-[#f8fbff] rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Divisões</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Quartos:</span>
                        <span className="text-xs font-medium text-[#0d2233]">{data.quartos}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">WC:</span>
                        <span className="text-xs font-medium text-[#0d2233]">{data.casasBanho}</span>
                      </div>
                    </div>
                  </div>
                )}

                {data.estadoConservacao && (
                  <div className="p-3 bg-[#f8fbff] rounded-xl">
                    <span className="text-sm text-gray-600 block mb-1">Estado</span>
                    <span className="font-medium text-[#0d2233] text-xs">{getEstadoLabel(data.estadoConservacao)}</span>
                  </div>
                )}

                {data.localizacao && (
                  <div className="p-3 bg-[#f8fbff] rounded-xl">
                    <span className="text-sm text-gray-600 block mb-1">Localização</span>
                    <span className="font-medium text-[#0d2233] text-sm">{data.localizacao}</span>
                  </div>
                )}

                {data.motivoVenda && (
                  <div className="p-3 bg-[#f8fbff] rounded-xl">
                    <span className="text-sm text-gray-600 block mb-1">Objetivo</span>
                    <span className="font-medium text-[#0d2233] text-xs">{getMotivoLabel(data.motivoVenda)}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 p-4 bg-[#0d2233] rounded-xl text-white text-center">
                <h4 className="font-semibold mb-2">Avaliação Gratuita</h4>
                <p className="text-sm opacity-90">
                  Receba uma avaliação profissional do seu imóvel sem qualquer custo
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyValuationForm;