import React, { useState } from 'react';
import { Home, MapPin, ChevronRight, Plus, Minus, ArrowLeft, User, Phone, Mail, Building, Car, Euro, TreePine, Store, Warehouse, FileText, Shield, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useTranslation } from 'react-i18next';
import { sendEmail } from '../utils/emailService';

interface PropertyData {
  finalidade: 'vender' | 'arrendar' | 'trespasse' | null;
  tipoImovel: 'apartamento' | 'moradia' | 'terreno' | 'quinta-herdade' | 'garagem' | 'predio' | 'quarto' | 'escritorio' | 'loja' | 'armazem' | 'imovel-negocio' | null;
  tipologia: string;
  areaUtil: number;
  areaBruta: number;
  areaTerreno: number;
  anoConstucao: number;
  quartos: number;
  casasBanho: number;
  garagem: boolean;
  elevador: boolean;
  terracoVaranda: boolean;
  piscina: boolean;
  jardim: boolean;
  estadoConservacao: 'novo' | 'usado' | 'renovado' | 'construcao' | 'planta' | null;
  certificadoEnergetico: string;
  estacionamento: string;
  outrasCaracteristicas: string;
  localizacao: string;
  rua: string;
  codigoPostal: string;
  motivoVenda: 'vender-rapidamente' | 'melhor-preco' | 'avaliar-opcoes' | null;
  nome: string;
  apelido: string;
  email: string;
  telemovel: string;
  meio_contacto: string;
  horario: string;
}

const PropertyValuationForm: React.FC = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [data, setData] = useState<PropertyData>({
    finalidade: null,
    tipoImovel: null,
    tipologia: '',
    areaUtil: 0,
    areaBruta: 0,
    areaTerreno: 0,
    anoConstucao: new Date().getFullYear(),
    quartos: 1,
    casasBanho: 1,
    garagem: false,
    elevador: false,
    terracoVaranda: false,
    piscina: false,
    jardim: false,
    estadoConservacao: null,
    certificadoEnergetico: '',
    estacionamento: '',
    outrasCaracteristicas: '',
    localizacao: '',
    rua: '',
    codigoPostal: '',
    motivoVenda: null,
    nome: '',
    apelido: '',
    email: '',
    telemovel: '',
    meio_contacto: '',
    horario: ''
  });

  const handleFinalidadeSelect = (finalidade: PropertyData['finalidade']) => {
    setData({ ...data, finalidade });
    setCurrentStep(2);
  };

  const handleTipoImovelSelect = (tipo: PropertyData['tipoImovel']) => {
    setData({ ...data, tipoImovel: tipo });
    setCurrentStep(3);
  };

  const handleEstadoSelect = (estado: PropertyData['estadoConservacao']) => {
    setData({ ...data, estadoConservacao: estado });
    setCurrentStep(6);
  };

  const handleMotivoSelect = (motivo: PropertyData['motivoVenda']) => {
    setData({ ...data, motivoVenda: motivo });
    setCurrentStep(7);
  };

  const adjustCount = (field: 'quartos' | 'casasBanho' | 'areaUtil' | 'areaBruta' | 'areaTerreno' | 'anoConstucao', increment: boolean, step: number = 1) => {
    setData(prev => ({
      ...prev,
      [field]: Math.max(field === 'anoConstucao' ? 1900 : (field.includes('area') ? 0 : 0), 
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
      alert(t('avaliacao.camposObrigatorios'));
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Prepare detailed description for database
      const detailedDescription = `
        Finalidade: ${getFinalidadeLabel(data.finalidade)}
        Tipo de Imóvel: ${getTipoImovelLabel(data.tipoImovel)}
        ${data.tipologia ? `Tipologia: ${data.tipologia}` : ''}
        ${data.areaUtil > 0 ? `Área Útil: ${data.areaUtil}m²` : ''}
        ${data.areaBruta > 0 ? `Área Bruta: ${data.areaBruta}m²` : ''}
        ${data.areaTerreno > 0 ? `Área do Terreno: ${data.areaTerreno}m²` : ''}
        ${data.tipoImovel !== 'terreno' ? `Ano de Construção: ${data.anoConstucao}` : ''}
        ${needsRoomsAndBathrooms() ? `Quartos: ${data.quartos}` : ''}
        ${needsRoomsAndBathrooms() ? `Casas de Banho: ${data.casasBanho}` : ''}
        Características:
        ${data.garagem ? '✓ Garagem' : '✗ Sem Garagem'}
        ${data.elevador ? '✓ Elevador' : '✗ Sem Elevador'}
        ${data.terracoVaranda ? '✓ Terraço/Varanda' : '✗ Sem Terraço/Varanda'}
        ${data.piscina ? '✓ Piscina' : '✗ Sem Piscina'}
        ${data.jardim ? '✓ Jardim' : '✗ Sem Jardim'}
        Estado de Conservação: ${getEstadoLabel(data.estadoConservacao)}
        ${data.certificadoEnergetico ? `Certificado Energético: ${data.certificadoEnergetico}` : ''}
        ${data.estacionamento ? `Estacionamento: ${data.estacionamento}` : ''}
        ${data.rua ? `Rua: ${data.rua}` : ''}
        ${data.codigoPostal ? `Código Postal: ${data.codigoPostal}` : ''}
        ${data.outrasCaracteristicas ? `Outras Características: ${data.outrasCaracteristicas}` : ''}
        Motivo: ${getMotivoLabel(data.motivoVenda)}
      `.trim();

      // Save to database
      const propertyLeadData = {
        type: 'venda',
        nome: data.nome,
        apelido: data.apelido,
        email: data.email,
        telemovel: data.telemovel,
        tipo_imovel: getTipoImovelLabel(data.tipoImovel),
        localizacao: data.localizacao,
        area: data.areaUtil > 0 ? data.areaUtil.toString() : '',
        quartos: needsRoomsAndBathrooms() ? data.quartos.toString() : '',
        casas_banho: needsRoomsAndBathrooms() ? data.casasBanho.toString() : '',
        preco_pretendido: '', // Will be determined by evaluation
        estado_imovel: getEstadoLabel(data.estadoConservacao),
        descricao: detailedDescription,
        urgencia: getMotivoLabel(data.motivoVenda),
        meio_contacto: data.meio_contacto,
        horario: data.horario,
        created_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('property_leads')
        .insert([propertyLeadData]);

      if (error) {
        console.error('Erro ao guardar dados:', error);
        setSubmitStatus('error');
        return;
      }

      // Send notification email
      const emailData = {
        nome: 'Globalead Admin',
        email: 'globaleadgroup@gmail.com',
        page: 'Notificação - Nova Avaliação de Imóvel',
        mensagem: `Nova solicitação de avaliação de imóvel recebida de ${data.nome} ${data.apelido}. Verifique o painel de administração para mais detalhes.`
      };

      await sendEmail(emailData);

      setSubmitStatus('success');
      // Reset form
      setData({
        finalidade: null,
        tipoImovel: null,
        tipologia: '',
        areaUtil: 0,
        areaBruta: 0,
        areaTerreno: 0,
        anoConstucao: new Date().getFullYear(),
        quartos: 1,
        casasBanho: 1,
        garagem: false,
        elevador: false,
        terracoVaranda: false,
        piscina: false,
        jardim: false,
        estadoConservacao: null,
        certificadoEnergetico: '',
        estacionamento: '',
        outrasCaracteristicas: '',
        localizacao: '',
        rua: '',
        codigoPostal: '',
        motivoVenda: null,
        nome: '',
        apelido: '',
        email: '',
        telemovel: '',
        meio_contacto: '',
        horario: ''
      });
      setCurrentStep(1);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFinalidadeLabel = (finalidade: PropertyData['finalidade']) => {
    switch (finalidade) {
      case 'vender': return 'Vender';
      case 'arrendar': return 'Arrendar';
      case 'trespasse': return 'Trespasse';
      default: return '';
    }
  };

  const getTipoImovelLabel = (tipo: PropertyData['tipoImovel']) => {
    switch (tipo) {
      case 'apartamento': return 'Apartamento';
      case 'moradia': return 'Moradia';
      case 'terreno': return 'Terreno';
      case 'quinta-herdade': return 'Quinta ou Herdade';
      case 'garagem': return 'Garagem';
      case 'predio': return 'Prédio';
      case 'quarto': return 'Quarto';
      case 'escritorio': return 'Escritório';
      case 'loja': return 'Loja';
      case 'armazem': return 'Armazém';
      case 'imovel-negocio': return 'Imóvel com Negócio';
      default: return '';
    }
  };

  const getEstadoLabel = (estado: PropertyData['estadoConservacao']) => {
    switch (estado) {
      case 'novo': return 'Novo';
      case 'usado': return 'Usado';
      case 'renovado': return 'Renovado';
      case 'construcao': return 'Construção';
      case 'planta': return 'Planta';
      default: return '';
    }
  };

  const getMotivoLabel = (motivo: PropertyData['motivoVenda']) => {
    switch (motivo) {
      case 'vender-rapidamente': return 'Vender/Arrendar Rapidamente';
      case 'melhor-preco': return 'Obter o Melhor Preço';
      case 'avaliar-opcoes': return 'Avaliar Opções';
      default: return '';
    }
  };

  const needsRoomsAndBathrooms = () => {
    return ['apartamento', 'moradia', 'quinta-herdade', 'predio', 'quarto', 'escritorio', 'imovel-negocio'].includes(data.tipoImovel || '');
  };

  const needsDetailed = () => {
    return ['apartamento', 'moradia', 'quinta-herdade', 'predio', 'escritorio', 'loja', 'imovel-negocio'].includes(data.tipoImovel || '');
  };

  const getProgressPercentage = () => {
    return (currentStep / 7) * 100;
  };

  const getPropertyIcon = (tipo: string) => {
    switch (tipo) {
      case 'apartamento': return Building;
      case 'moradia': return Home;
      case 'terreno': return TreePine;
      case 'quinta-herdade': return TreePine;
      case 'garagem': return Car;
      case 'predio': return Building;
      case 'quarto': return Home;
      case 'escritorio': return Building;
      case 'loja': return Store;
      case 'armazem': return Warehouse;
      case 'imovel-negocio': return Store;
      default: return Building;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
          {t('imoveis.formTitulo')}
        </h2>
      </div>
      {/* Header Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
            <div className="flex items-center justify-center space-x-8 w-full overflow-x-auto whitespace-nowrap">
              <button 
                onClick={() => setCurrentStep(Math.max(currentStep - 1, 1))}
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
                <span className="text-gray-500">FINALIDADE</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">IMÓVEL</span>
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
                  <span className="text-sm font-medium text-[#0d2233]">{t('avaliacao.passo', { n: currentStep })}</span>
                  <span className="text-sm text-gray-500">{Math.round(getProgressPercentage())}% concluído</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 ">
                  <div 
                    className="bg-[#0d2233] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>
              </div>

              {/* Step 1: Finalidade */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#0d2233] mb-2">{t('avaliacao.finalidadeTitulo')}</h2>
                  <p className="text-gray-600 mb-8">{t('avaliacao.sub1')}</p>
                  
                  <div className="space-y-4">
                    {[
                      { key: 'vender', label: t('avaliacao.vender'), desc: t('avaliacao.venderDesc'), icon: Euro },
                      { key: 'arrendar', label: t('avaliacao.arrendar'), desc: t('avaliacao.arrendarDesc'), icon: Home },
                      { key: 'trespasse', label: t('avaliacao.trespasse'), desc: t('avaliacao.trespasseDesc'), icon: FileText }
                    ].map(({ key, label, desc, icon: Icon }) => (
                      <button
                        key={key}
                        onClick={() => handleFinalidadeSelect(key as PropertyData['finalidade'])}
                        className="w-full flex items-center justify-between p-6 border-2 border-gray-200 rounded-2xl hover:border-[#0d2233] hover:bg-[#f8fbff] transition-all group"
                      >
                        <div className="flex items-center">
                          <div className="flex items-center justify-center w-12 h-12 bg-[#e5f3ff] rounded-xl mr-4 group-hover:bg-[#0d2233] transition-colors">
                            <Icon className="h-6 w-6 text-[#0d2233] group-hover:text-white" />
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

              {/* Step 2: Tipo de Imóvel */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#0d2233] mb-2">{t('avaliacao.tipoTitulo')}</h2>
                  <p className="text-gray-600 mb-8">{t('avaliacao.sub2')}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { key: 'apartamento', label: t('formulario.apartamento') },
                      { key: 'moradia', label: t('formulario.moradia') },
                      { key: 'terreno', label: t('formulario.terreno') },
                      { key: 'quinta-herdade', label: t('avaliacao.quintaHerdade') },
                      { key: 'garagem', label: t('formulario.garagem') },
                      { key: 'predio', label: t('formulario.predio') },
                      { key: 'quarto', label: t('avaliacao.quarto') },
                      { key: 'escritorio', label: t('formulario.escritorio') },
                      { key: 'loja', label: t('formulario.loja') },
                      { key: 'armazem', label: t('formulario.armazem') },
                      { key: 'imovel-negocio', label: t('avaliacao.imovelNegocio') }
                    ].map(({ key, label }) => {
                      const Icon = getPropertyIcon(key);
                      return (
                        <button
                          key={key}
                          onClick={() => handleTipoImovelSelect(key as PropertyData['tipoImovel'])}
                          className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-2xl hover:border-[#0d2233] hover:bg-[#f8fbff] transition-all group"
                        >
                          <div className="flex items-center">
                            <div className="flex items-center justify-center w-10 h-10 bg-[#e5f3ff] rounded-xl mr-3 group-hover:bg-[#0d2233] transition-colors">
                              <Icon className="h-5 w-5 text-[#0d2233] group-hover:text-white" />
                            </div>
                            <span className="font-medium text-[#0d2233] text-sm">{label}</span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Características Básicas */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#0d2233] mb-2">{t('avaliacao.caracteristicasTitulo')}</h2>
                  <p className="text-gray-600 mb-8">{t('avaliacao.sub3')}</p>
                  
                  <div className="space-y-6">
                    {/* Tipologia */}
                    {needsDetailed() && (
                      <div>
                        <label className="block text-sm font-medium text-[#0d2233] mb-2">
                          {t('avaliacao.tipologia')}
                        </label>
                        <select
                          value={data.tipologia}
                          onChange={(e) => setData({ ...data, tipologia: e.target.value })}
                          className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-[#0d2233] focus:outline-none transition-all"
                        >
                          <option value="">{t('avaliacao.selecioneTipologia')}</option>
                          {data.tipoImovel === 'apartamento' || data.tipoImovel === 'moradia' ? (
                            <>
                              <option value="T0">T0</option>
                              <option value="T1">T1</option>
                              <option value="T2">T2</option>
                              <option value="T3">T3</option>
                              <option value="T4">T4</option>
                              <option value="T5">T5</option>
                              <option value="T6+">T6+</option>
                            </>
                          ) : (
                            <>
                              <option value="Pequeno">{t('avaliacao.pequeno')}</option>
                              <option value="Médio">{t('avaliacao.medio')}</option>
                              <option value="Grande">{t('avaliacao.grande')}</option>
                              <option value="Muito Grande">{t('avaliacao.muitoGrande')}</option>
                            </>
                          )}
                        </select>
                      </div>
                    )}

                    {/* Área Útil */}
                    <div className="p-6 border-2 border-gray-200 rounded-2xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-[#0d2233] mb-1">{t('avaliacao.areaUtil')}</h3>
                          <p className="text-sm text-gray-600">{t('avaliacao.descAreaUtil')}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => adjustCount('areaUtil', false, 10)}
                            className="w-6 h-6 rounded-full border-2 border-[#0d2233] flex items-center justify-center text-[#0d2233] hover:bg-[#0d2233] hover:text-white transition-all"
                            disabled={data.areaUtil <= 0}
                          >
                            <Minus className="h-2 w-2" />
                          </button>
                          <button
                            onClick={() => adjustCount('areaUtil', false, 100)}
                            className="w-10 h-10 rounded-full border-2 border-[#0d2233] flex items-center justify-center text-[#0d2233] hover:bg-[#0d2233] hover:text-white transition-all"
                            disabled={data.areaUtil <= 0}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-2xl font-bold text-[#0d2233] w-16 text-center">{data.areaUtil}</span>
                          <button
                            onClick={() => adjustCount('areaUtil', true, 100)}
                            className="w-10 h-10 rounded-full border-2 border-[#0d2233] flex items-center justify-center text-[#0d2233] hover:bg-[#0d2233] hover:text-white transition-all"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => adjustCount('areaUtil', true, 10)}
                            className="w-6 h-6 rounded-full border-2 border-[#0d2233] flex items-center justify-center text-[#0d2233] hover:bg-[#0d2233] hover:text-white transition-all"
                          >
                            <Plus className="h-2 w-2" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Área Bruta */}
                    {needsDetailed() && (
                      <div className="p-6 border-2 border-gray-200 rounded-2xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-[#0d2233] mb-1">{t('avaliacao.areaBruta')}</h3>
                            <p className="text-sm text-gray-600">{t('avaliacao.descAreaBruta')}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => adjustCount('areaBruta', false, 10)}
                              className="w-6 h-6 rounded-full border-2 border-[#0d2233] flex items-center justify-center text-[#0d2233] hover:bg-[#0d2233] hover:text-white transition-all"
                              disabled={data.areaBruta <= 0}
                            >
                              <Minus className="h-2 w-2" />
                            </button>
                            <button
                              onClick={() => adjustCount('areaBruta', false, 100)}
                              className="w-10 h-10 rounded-full border-2 border-[#0d2233] flex items-center justify-center text-[#0d2233] hover:bg-[#0d2233] hover:text-white transition-all"
                              disabled={data.areaBruta <= 0}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="text-2xl font-bold text-[#0d2233] w-16 text-center">{data.areaBruta}</span>
                            <button
                              onClick={() => adjustCount('areaBruta', true, 100)}
                              className="w-10 h-10 rounded-full border-2 border-[#0d2233] flex items-center justify-center text-[#0d2233] hover:bg-[#0d2233] hover:text-white transition-all"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => adjustCount('areaBruta', true, 10)}
                              className="w-6 h-6 rounded-full border-2 border-[#0d2233] flex items-center justify-center text-[#0d2233] hover:bg-[#0d2233] hover:text-white transition-all"
                            >
                              <Plus className="h-2 w-2" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Área do Terreno */}
                    {(data.tipoImovel === 'moradia' || data.tipoImovel === 'terreno' || data.tipoImovel === 'quinta-herdade') && (
                      <div className="p-6 border-2 border-gray-200 rounded-2xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-[#0d2233] mb-1">{t('avaliacao.areaTerreno')}</h3>
                            <p className="text-sm text-gray-600">{t('avaliacao.descAreaTerreno')}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => adjustCount('areaTerreno', false, 10)}
                              className="w-6 h-6 rounded-full border-2 border-[#0d2233] flex items-center justify-center text-[#0d2233] hover:bg-[#0d2233] hover:text-white transition-all"
                              disabled={data.areaTerreno <= 0}
                            >
                              <Minus className="h-2 w-2" />
                            </button>
                             <button
                              onClick={() => adjustCount('areaTerreno', false, 100)}
                              className="w-10 h-10 rounded-full border-2 border-[#0d2233] flex items-center justify-center text-[#0d2233] hover:bg-[#0d2233] hover:text-white transition-all"
                              disabled={data.areaTerreno <= 0}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="text-2xl font-bold text-[#0d2233] w-16 text-center">{data.areaTerreno}</span>
                            <button
                              onClick={() => adjustCount('areaTerreno', true, 100)}
                              className="w-10 h-10 rounded-full border-2 border-[#0d2233] flex items-center justify-center text-[#0d2233] hover:bg-[#0d2233] hover:text-white transition-all"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => adjustCount('areaTerreno', true, 10)}
                              className="w-6 h-6 rounded-full border-2 border-[#0d2233] flex items-center justify-center text-[#0d2233] hover:bg-[#0d2233] hover:text-white transition-all"
                            >
                              <Plus className="h-2 w-2" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Ano de Construção */}
                    {data.tipoImovel !== 'terreno' && (
                      <div className="p-6 border-2 border-gray-200 rounded-2xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-[#0d2233] mb-1">{t('avaliacao.anoConstrucao')}</h3>
                            <p className="text-sm text-gray-600">{t('avaliacao.descAno')}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => adjustCount('anoConstucao', false, 1)}
                              className="w-6 h-6 rounded-full border-2 border-[#0d2233] flex items-center justify-center text-[#0d2233] hover:bg-[#0d2233] hover:text-white transition-all"
                              disabled={data.anoConstucao <= 1900}
                            >
                              <Minus className="h-2 w-2" />
                            </button>
                            <button
                              onClick={() => adjustCount('anoConstucao', false, 10)}
                              className="w-10 h-10 rounded-full border-2 border-[#0d2233] flex items-center justify-center text-[#0d2233] hover:bg-[#0d2233] hover:text-white transition-all"
                              disabled={data.anoConstucao <= 1900}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="text-2xl font-bold text-[#0d2233] w-20 text-center">{data.anoConstucao}</span>
                            <button
                              onClick={() => adjustCount('anoConstucao', true, 10)}
                              className="w-10 h-10 rounded-full border-2 border-[#0d2233] flex items-center justify-center text-[#0d2233] hover:bg-[#0d2233] hover:text-white transition-all"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => adjustCount('anoConstucao', true, 1)}
                              className="w-6 h-6 rounded-full border-2 border-[#0d2233] flex items-center justify-center text-[#0d2233] hover:bg-[#0d2233] hover:text-white transition-all"
                            >
                              <Plus className="h-2 w-2" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => setCurrentStep(4)}
                      className="w-full bg-white text-[#0d2233] border border-[#0d2233] py-4 px-6 rounded-2xl hover:bg-[#79b2e9] hover:text-white hover:border-[#79b2e9] transition-all duration-300 font-medium"
                    >
                      {t('avaliacao.continuar')}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Quartos e Casas de Banho */}
              {currentStep === 4 && needsRoomsAndBathrooms() && (
                <div>
                  <h2 className="text-2xl font-bold text-[#0d2233] mb-2">{t('avaliacao.quartosTitulo')}</h2>
                  <p className="text-gray-600 mb-8">{t('avaliacao.sub4')}</p>
                  
                  <div className="space-y-6">
                    {/* Quartos */}
                    <div className="p-6 border-2 border-gray-200 rounded-2xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-[#0d2233] mb-1">{t('avaliacao.quartos')}</h3>
                          <p className="text-sm text-gray-600">{t('avaliacao.descQuartos')}</p>
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
                          <h3 className="font-semibold text-[#0d2233] mb-1">{t('avaliacao.casasBanho')}</h3>
                          <p className="text-sm text-gray-600">{t('avaliacao.descCasasBanho')}</p>
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
                      <h3 className="font-semibold text-[#0d2233] mb-4">{t('avaliacao.extrasTitulo')}</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { key: 'garagem', label: t('avaliacao.garagem'), icon: Car },
                          { key: 'elevador', label: t('avaliacao.elevador'), icon: Building },
                          { key: 'terracoVaranda', label: t('avaliacao.terracoVaranda'), icon: Home },
                          { key: 'piscina', label: t('avaliacao.piscina'), icon: Home },
                          { key: 'jardim', label: t('avaliacao.jardim'), icon: TreePine }
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

                    {/* Certificado Energético */}
                    <div>
                      <label className="block text-sm font-medium text-[#0d2233] mb-2">
                        {t('avaliacao.certificado')}
                      </label>
                      <select
                        value={data.certificadoEnergetico}
                        onChange={(e) => setData({ ...data, certificadoEnergetico: e.target.value })}
                        className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-[#0d2233] focus:outline-none transition-all"
                      >
                        <option value="">{t('avaliacao.selecioneClassificacao')}</option>
                        <option value="A+">A+</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="B-">B-</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                        <option value="Isento">{t('avaliacao.isento')}</option>
                        <option value="Em curso">{t('avaliacao.emCurso')}</option>
                      </select>
                    </div>

                    {/* Estacionamento */}
                    <div>
                      <label className="block text-sm font-medium text-[#0d2233] mb-2">
                        {t('avaliacao.estacionamento')}
                      </label>
                      <select
                        value={data.estacionamento}
                        onChange={(e) => setData({ ...data, estacionamento: e.target.value })}
                        className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-[#0d2233] focus:outline-none transition-all"
                      >
                        <option value="">{t('avaliacao.selecioneTipo')}</option>
                        <option value="Sem estacionamento">{t('avaliacao.semEstacionamento')}</option>
                        <option value="1 lugar">1 lugar</option>
                        <option value="2 lugares">2 lugares</option>
                        <option value="3 lugares">3 lugares</option>
                        <option value="4+ lugares">4+ lugares</option>
                        <option value="Box fechada">{t('avaliacao.boxFechada')}</option>
                        <option value="Garagem coletiva">{t('avaliacao.garagemColetiva')}</option>
                        <option value="Lugar exterior">{t('avaliacao.lugarExterior')}</option>
                      </select>
                    </div>

                    {/* Outras Características */}
                    <div>
                      <label className="block text-sm font-medium text-[#0d2233] mb-2">
                        {t('avaliacao.outrasCaracteristicas')}
                      </label>
                      <textarea
                        value={data.outrasCaracteristicas}
                        onChange={(e) => setData({ ...data, outrasCaracteristicas: e.target.value })}
                        className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-[#0d2233] focus:outline-none transition-all"
                        rows={3}
                        placeholder={t('avaliacao.outrasPlaceholder')}
                      />
                    </div>

                    <button
                      onClick={() => setCurrentStep(5)}
                      className="w-full bg-white text-[#0d2233] border border-[#0d2233] py-4 px-6 rounded-2xl hover:bg-[#79b2e9] hover:text-white hover:border-[#79b2e9] transition-all duration-300 font-medium"
                    >
                      {t('avaliacao.continuar')}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4 alternativo para tipos sem quartos */}
              {currentStep === 4 && !needsRoomsAndBathrooms() && (
                <div>
                  <h2 className="text-2xl font-bold text-[#0d2233] mb-2">{t('avaliacao.adicionaisTitulo')}</h2>
                  <p className="text-gray-600 mb-8">{t('avaliacao.sub5')}</p>
                  
                  <div className="space-y-6">
                    {/* Certificado Energético - se aplicável */}
                    {data.tipoImovel !== 'terreno' && (
                      <div>
                        <label className="block text-sm font-medium text-[#0d2233] mb-2">
                          {t('avaliacao.certificado')}
                        </label>
                        <select
                          value={data.certificadoEnergetico}
                          onChange={(e) => setData({ ...data, certificadoEnergetico: e.target.value })}
                          className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-[#0d2233] focus:outline-none transition-all"
                        >
                          <option value="">{t('avaliacao.selecioneClassificacao')}</option>
                          <option value="A+">A+</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="B-">B-</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                          <option value="E">E</option>
                          <option value="F">F</option>
                          <option value="Isento">{t('avaliacao.isento')}</option>
                          <option value="Em curso">{t('avaliacao.emCurso')}</option>
                        </select>
                      </div>
                    )}

                    {/* Outras Características */}
                    <div>
                      <label className="block text-sm font-medium text-[#0d2233] mb-2">
                        {t('avaliacao.outrasCaracteristicas')}
                      </label>
                      <textarea
                        value={data.outrasCaracteristicas}
                        onChange={(e) => setData({ ...data, outrasCaracteristicas: e.target.value })}
                        className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-[#0d2233] focus:outline-none transition-all"
                        rows={4}
                        placeholder={t('avaliacao.outrasPlaceholder2')}
                      />
                    </div>

                    <button
                      onClick={() => setCurrentStep(5)}
                      className="w-full bg-white text-[#0d2233] border border-[#0d2233] py-4 px-6 rounded-2xl hover:bg-[#79b2e9] hover:text-white hover:border-[#79b2e9] transition-all duration-300 font-medium"
                    >
                      {t('avaliacao.continuar')}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 5: Estado de Conservação */}
              {currentStep === 5 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#0d2233] mb-2">{t('avaliacao.estadoTitulo')}</h2>
                  <p className="text-gray-600 mb-8">{t('avaliacao.sub6')}</p>
                  
                  <div className="space-y-4">
                    {[
                      { key: 'novo', label: t('avaliacao.novo'), desc: t('avaliacao.novoDesc'), icon: Shield },
                      { key: 'usado', label: t('avaliacao.usado'), desc: t('avaliacao.usadoDesc'), icon: Home },
                      { key: 'renovado', label: t('avaliacao.renovado'), desc: t('avaliacao.renovadoDesc'), icon: Zap },
                      { key: 'construcao', label: t('avaliacao.construcao'), desc: t('avaliacao.construcaoDesc'), icon: Building },
                      { key: 'planta', label: t('avaliacao.planta'), desc: t('avaliacao.plantaDesc'), icon: FileText }
                    ].map(({ key, label, desc, icon: Icon }) => (
                      <button
                        key={key}
                        onClick={() => handleEstadoSelect(key as PropertyData['estadoConservacao'])}
                        className="w-full flex items-center justify-between p-6 border-2 border-gray-200 rounded-2xl hover:border-[#0d2233] hover:bg-[#f8fbff] transition-all group"
                      >
                        <div className="flex items-center">
                          <div className="flex items-center justify-center w-12 h-12 bg-[#e5f3ff] rounded-xl mr-4 group-hover:bg-[#0d2233] transition-colors">
                            <Icon className="h-6 w-6 text-[#0d2233] group-hover:text-white" />
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

              {/* Step 6: Localização */}
              {currentStep === 6 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#0d2233] mb-2">{t('avaliacao.localizacaoTitulo')}</h2>
                  <p className="text-gray-600 mb-8">{t('avaliacao.sub7')}</p>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-[#0d2233] mb-2">
                        {t('avaliacao.cidade')}
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type="text"
                          value={data.localizacao}
                          onChange={(e) => setData({ ...data, localizacao: e.target.value })}
                          className="w-full pl-12 p-4 border-2 border-gray-200 rounded-2xl focus:border-[#0d2233] focus:outline-none transition-all"
                          placeholder={t('avaliacao.cidadePlaceholder')}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0d2233] mb-2">
                        {t('avaliacao.rua')}
                      </label>
                      <input
                        type="text"
                        value={data.rua}
                        onChange={(e) => setData({ ...data, rua: e.target.value })}
                        className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-[#0d2233] focus:outline-none transition-all"
                        placeholder={t('avaliacao.ruaPlaceholder')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0d2233] mb-2">
                        {t('avaliacao.codigoPostal')}
                      </label>
                      <input
                        type="text"
                        value={data.codigoPostal}
                        onChange={(e) => setData({ ...data, codigoPostal: e.target.value })}
                        className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-[#0d2233] focus:outline-none transition-all"
                        placeholder="XXXX-XXX"
                      />
                    </div>

                    <h3 className="text-lg font-semibold text-[#0d2233] mt-8 mb-4">
                      {t('avaliacao.objetivoTitulo', { acao: data.finalidade === 'vender' ? t('avaliacao.aVenda') : data.finalidade === 'arrendar' ? t('avaliacao.oArrendamento') : t('avaliacao.oTrespasse') })}
                    </h3>
                    
                    <div className="space-y-4">
                      {[
                        { 
                          key: 'vender-rapidamente', 
                          label: data.finalidade === 'vender' ? t('avaliacao.rapidoVender') : data.finalidade === 'arrendar' ? t('avaliacao.rapidoArrendar') : t('avaliacao.rapidoTrespasse'),
                          desc: t('avaliacao.rapidoDesc', { acao: data.finalidade === 'vender' ? t('avaliacao.aVenda') : data.finalidade === 'arrendar' ? t('avaliacao.oArrendamento') : t('avaliacao.oTrespasse') }) 
                        },
                        { 
                          key: 'melhor-preco', 
                          label: t('avaliacao.melhorPreco'), 
                          desc: t('avaliacao.melhorPrecoDesc') 
                        },
                        { 
                          key: 'avaliar-opcoes', 
                          label: t('avaliacao.avaliarOpcoes'), 
                          desc: t('avaliacao.avaliarOpcoesDesc', { acao: data.finalidade === 'vender' ? t('avaliacao.aVenda') : data.finalidade === 'arrendar' ? t('avaliacao.oArrendamento') : t('avaliacao.oTrespasse') }) 
                        }
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

              {/* Step 7: Dados de Contacto */}
              {currentStep === 7 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#0d2233] mb-2">{t('avaliacao.dadosTitulo')}</h2>
                  <p className="text-gray-600 mb-8">{t('avaliacao.sub8')}</p>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-[#0d2233] mb-2">
                        {t('avaliacao.nome')}
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type="text"
                          value={data.nome}
                          onChange={(e) => setData({ ...data, nome: e.target.value })}
                          className="w-full pl-12 p-4 border-2 border-gray-200 rounded-2xl focus:border-[#0d2233] focus:outline-none transition-all"
                          placeholder={t('avaliacao.nomePlaceholder')}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0d2233] mb-2">
                        {t('avaliacao.apelido')}
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type="text"
                          value={data.apelido}
                          onChange={(e) => setData({ ...data, apelido: e.target.value })}
                          className="w-full pl-12 p-4 border-2 border-gray-200 rounded-2xl focus:border-[#0d2233] focus:outline-none transition-all"
                          placeholder={t('avaliacao.apelidoPlaceholder')}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0d2233] mb-2">
                        {t('avaliacao.email')}
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type="email"
                          value={data.email}
                          onChange={(e) => setData({ ...data, email: e.target.value })}
                          className="w-full pl-12 p-4 border-2 border-gray-200 rounded-2xl focus:border-[#0d2233] focus:outline-none transition-all"
                          placeholder={t('avaliacao.emailPlaceholder')}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0d2233] mb-2">
                        {t('avaliacao.telemovel')}
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

                    <div>
                      <label className="block text-sm font-medium text-[#0d2233] mb-2">
                        {t('avaliacao.meioPreferido')}
                      </label>
                      <select
                        value={data.meio_contacto}
                        onChange={(e) => setData({ ...data, meio_contacto: e.target.value })}
                        className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-[#0d2233] focus:outline-none transition-all"
                      >
                        <option value="">{t('avaliacao.selecioneMeio')}</option>
                        <option value="Telefone">Telefone</option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="Email">Email</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0d2233] mb-2">
                        {t('avaliacao.selecioneHorario')}
                      </label>
                      <select
                        value={data.horario}
                        onChange={(e) => setData({ ...data, horario: e.target.value })}
                        className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-[#0d2233] focus:outline-none transition-all"
                      >
                        <option value="">{t('avaliacao.selecioneHorario')}</option>
                        <option value="9h-12h30">9h-12h30</option>
                        <option value="12h30-16h">12h30-16h</option>
                        <option value="16h-19h30">16h-19h30</option>
                      </select>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-2xl">
                      <h4 className="font-semibold text-[#0d2233] mb-2">{t('avaliacao.seguirTitulo')}</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• {t('avaliacao.seguir1')}</li>
                        <li>• {t('avaliacao.seguir2')}</li>
                        <li>• {t('avaliacao.seguir3')}</li>
                        <li>• {t('avaliacao.seguir4')}</li>
                      </ul>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="border-t pt-6">
                      <label className="flex items-start text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">
                        <input type="checkbox" className="mt-1 mr-2" required />
                        {t('formulario.aceitoTermos')}
                      </label>
                      <p className="text-xs text-gray-600 mb-3 sm:mb-4">
                        {t('formulario.rgpdSimples')}
                      </p>
                      
                      {submitStatus === 'success' && (
                        <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-green-100 border border-green-400 text-green-700 rounded text-xs sm:text-sm">
                          {t('avaliacao.sucesso')}
                        </div>
                      )}
                      
                      {submitStatus === 'error' && (
                        <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-red-100 border border-red-400 text-red-700 rounded text-xs sm:text-sm">
                          {t('avaliacao.erro')}
                        </div>
                      )}

                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full bg-white text-[#0d2233] border border-[#0d2233] py-4 px-6 rounded-2xl hover:bg-[#79b2e9] hover:text-white hover:border-[#79b2e9] transition-all duration-300 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? t('popup.aEnviar') : t('avaliacao.submeter')}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Resumo - Lado Direito */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 sticky top-8">
              <h3 className="text-xl font-bold text-[#0d2233] mb-6">{t('avaliacao.resumoTitulo')}</h3>
              
              <div className="space-y-4">
                {data.finalidade && (
                  <div className="flex justify-between items-center p-3 bg-[#f8fbff] rounded-xl">
                    <span className="text-sm text-gray-600">{t('avaliacao.finalidade')}</span>
                    <span className="font-medium text-[#0d2233] text-sm">{getFinalidadeLabel(data.finalidade)}</span>
                  </div>
                )}

                {data.tipoImovel && (
                  <div className="flex justify-between items-center p-3 bg-[#f8fbff] rounded-xl">
                    <span className="text-sm text-gray-600">{t('avaliacao.tipoImovel')}</span>
                    <span className="font-medium text-[#0d2233] text-sm">{getTipoImovelLabel(data.tipoImovel)}</span>
                  </div>
                )}

                {data.tipologia && (
                  <div className="flex justify-between items-center p-3 bg-[#f8fbff] rounded-xl">
                    <span className="text-sm text-gray-600">Tipologia</span>
                    <span className="font-medium text-[#0d2233] text-sm">{data.tipologia}</span>
                  </div>
                )}

                {data.areaUtil > 0 && (
                  <div className="flex justify-between items-center p-3 bg-[#f8fbff] rounded-xl">
                    <span className="text-sm text-gray-600">{t('avaliacao.areaUtilCurta')}</span>
                    <span className="font-medium text-[#0d2233] text-sm">{data.areaUtil}m²</span>
                  </div>
                )}

                {data.areaBruta > 0 && (
                  <div className="flex justify-between items-center p-3 bg-[#f8fbff] rounded-xl">
                    <span className="text-sm text-gray-600">{t('avaliacao.areaBrutaCurta')}</span>
                    <span className="font-medium text-[#0d2233] text-sm">{data.areaBruta}m²</span>
                  </div>
                )}

                {data.areaTerreno > 0 && (
                  <div className="flex justify-between items-center p-3 bg-[#f8fbff] rounded-xl">
                    <span className="text-sm text-gray-600">{t('avaliacao.terreno')}</span>
                    <span className="font-medium text-[#0d2233] text-sm">{data.areaTerreno}m²</span>
                  </div>
                )}

                {data.anoConstucao && data.tipoImovel !== 'terreno' && (
                  <div className="flex justify-between items-center p-3 bg-[#f8fbff] rounded-xl">
                    <span className="text-sm text-gray-600">{t('avaliacao.ano')}</span>
                    <span className="font-medium text-[#0d2233] text-sm">{data.anoConstucao}</span>
                  </div>
                )}

                {needsRoomsAndBathrooms() && currentStep >= 4 && (
                  <div className="p-3 bg-[#f8fbff] rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">{t('avaliacao.divisoes')}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">{t('avaliacao.quartosCurto')}</span>
                        <span className="text-xs font-medium text-[#0d2233]">{data.quartos}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">{t('avaliacao.wcCurto')}</span>
                        <span className="text-xs font-medium text-[#0d2233]">{data.casasBanho}</span>
                      </div>
                    </div>
                  </div>
                )}

                {data.certificadoEnergetico && (
                  <div className="flex justify-between items-center p-3 bg-[#f8fbff] rounded-xl">
                    <span className="text-sm text-gray-600 block mb-1">{t('avaliacao.certCurto')}</span>
                    <span className="font-medium text-[#0d2233] text-sm">{data.certificadoEnergetico}</span>
                  </div>
                )}

                {data.estacionamento && (
                  <div className="flex justify-between items-center p-3 bg-[#f8fbff] rounded-xl">
                    <span className="text-sm text-gray-600 block mb-1">{t('avaliacao.estacionamento')}</span>
                    <span className="font-medium text-[#0d2233] text-xs">{data.estacionamento}</span>
                  </div>
                )}

                {data.estadoConservacao && (
                  <div className="flex justify-between items-center p-3 bg-[#f8fbff] rounded-xl">
                    <span className="text-sm text-gray-600 block mb-1">{t('avaliacao.estado')}</span>
                    <span className="font-medium text-[#0d2233] text-xs">{getEstadoLabel(data.estadoConservacao)}</span>
                  </div>
                )}

                {data.localizacao && (
                  <div className="flex justify-between items-center p-3 bg-[#f8fbff] rounded-xl">
                    <span className="text-sm text-gray-600 block mb-1">{t('avaliacao.localizacao')}</span>
                    <span className="font-medium text-[#0d2233] text-sm">{data.localizacao}</span>
                  </div>
                )}

                {data.motivoVenda && (
                  <div className="flex justify-between items-center p-3 bg-[#f8fbff] rounded-xl">
                    <span className="text-sm text-gray-600 block mb-1">Objetivo</span>
                    <span className="font-medium text-[#0d2233] text-xs">{getMotivoLabel(data.motivoVenda)}</span>
                  </div>
                )}

                {data.meio_contacto && (
                  <div className="flex justify-between items-center p-3 bg-[#f8fbff] rounded-xl">
                    <span className="text-sm text-gray-600 block mb-1">Contacto</span>
                    <span className="font-medium text-[#0d2233] text-xs">{data.meio_contacto}</span>
                  </div>
                )}

                {data.horario && (
                  <div className="flex justify-between items-center p-3 bg-[#f8fbff] rounded-xl">
                    <span className="text-sm text-gray-600 block mb-1">Horário</span>
                    <span className="font-medium text-[#0d2233] text-xs">{data.horario}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 p-4 bg-[#0d2233] rounded-xl text-white text-center">
                <h4 className="font-semibold mb-2">{t('avaliacao.gratuitaTitulo')}</h4>
                <p className="text-sm opacity-90">
                  {t('avaliacao.gratuitaTexto')}
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