import React, { useState } from 'react';
import { Zap, Flame, ChevronRight, Plus, Minus, MapPin, Clock, ArrowLeft, Home, Phone, Mail, User } from 'lucide-react';
import { sendEmail } from '../utils/emailService';


interface SimulacaoData {
  servico: 'electricidade-gas' | 'electricidade' | 'gas' | null;
  tipoMorada: 'actual' | 'nova' | null;
  adultos: number;
  criancas: number;
  habitacao: 'permanentemente' | 'parte-dia' | 'pontualmente' | null;
  escalao: 'escalao1' | 'escalao2' | 'escalao3' | 'escalao4' | 'nao-tenho-certeza' | null;
  comercializadora: string;
  nome: string;
  email: string;
  telemovel: string;
}

const comercializadoras = [
  'EDP', 'Endesa', 'Iberdrola', 'Galp', 'Repsol', 'Gold Energy', 'SU Eletricidade',
  'Luzboa', 'Coopernico', 'Muon', 'YLC', 'MEO Energia', 'Enat', 'Não tenho/Não sei'
];

const SimulacaoEnergia: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState<SimulacaoData>({
    servico: null,
    tipoMorada: null,
    adultos: 2,
    criancas: 0,
    habitacao: null,
    escalao: null,
    comercializadora: '',
    nome: '',
    email: '',
    telemovel: ''
  });

  const handleServicoSelect = (servico: SimulacaoData['servico']) => {
    setData({ ...data, servico });
    setCurrentStep(2);
  };

  const handleMoradaSelect = (tipoMorada: SimulacaoData['tipoMorada']) => {
    setData({ ...data, tipoMorada });
    setCurrentStep(3);
  };

  const handleHabitacaoSelect = (habitacao: SimulacaoData['habitacao']) => {
    setData({ ...data, habitacao });
    setCurrentStep(data.servico?.includes('gas') ? 5 : 6);
  };

  const handleEscalaoSelect = (escalao: SimulacaoData['escalao']) => {
    setData({ ...data, escalao });
    setCurrentStep(6);
  };

  const adjustCount = (type: 'adultos' | 'criancas', increment: boolean) => {
    setData(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + (increment ? 1 : -1))
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
      page: 'Simulação de Energia',
      mensagem: `
        Serviço: ${getServicoLabel(data.servico)}
        Tipo de Morada: ${data.tipoMorada === 'actual' ? 'Morada Actual' : 'Nova Morada'}
        Adultos: ${data.adultos}
        Crianças: ${data.criancas}
        Habitação: ${getHabitacaoLabel(data.habitacao)}
        ${data.escalao ? `Escalão de Gás: ${getEscalaoLabel(data.escalao)}` : ''}
        ${data.comercializadora ? `Comercializadora Atual: ${data.comercializadora}` : ''}
      `.trim()
    };

    const success = await sendEmail(emailData);
    
    if (success) {
      alert('Pedido enviado com sucesso! Entraremos em contacto consigo brevemente.');
      // Reset form
      setData({
        servico: null,
        tipoMorada: null,
        adultos: 2,
        criancas: 0,
        habitacao: null,
        escalao: null,
        comercializadora: '',
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

  const getServicoLabel = (servico: SimulacaoData['servico']) => {
    switch (servico) {
      case 'electricidade-gas': return 'Eletricidade + Gás Natural';
      case 'electricidade': return 'Eletricidade';
      case 'gas': return 'Gás Natural';
      default: return '';
    }
  };

  const getHabitacaoLabel = (habitacao: SimulacaoData['habitacao']) => {
    switch (habitacao) {
      case 'permanentemente': return 'Permanentemente - 24 horas por dia';
      case 'parte-dia': return 'Parte do dia - Manhãs, noites e fins-de-semana';
      case 'pontualmente': return 'Pontualmente - Casa de férias';
      default: return '';
    }
  };

  const getEscalaoLabel = (escalao: SimulacaoData['escalao']) => {
    switch (escalao) {
      case 'escalao1': return 'Escalão 1';
      case 'escalao2': return 'Escalão 2';
      case 'escalao3': return 'Escalão 3';
      case 'escalao4': return 'Escalão 4';
      case 'nao-tenho-certeza': return 'Não tenho a certeza';
      default: return '';
    }
  };

  const getProgressPercentage = () => {
    const totalSteps = data.servico?.includes('gas') ? 7 : 6;
    return (currentStep / totalSteps) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <button 
                onClick={() => window.history.back()}
                className="flex items-center text-[#79b2e9] hover:text-[#0d2233] transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Voltar
              </button>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center text-[#79b2e9] font-medium">
                  <User className="h-4 w-4 mr-2" />
                  SIMULAÇÃO
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">RESULTADOS</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">RESUMO</span>
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
                  <span className="text-sm font-medium text-[#79b2e9]">Passo {currentStep} de {data.servico?.includes('gas') ? '7' : '6'}</span>
                  <span className="text-sm text-gray-500">{Math.round(getProgressPercentage())}% concluído</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#79b2e9] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>
              </div>

              {/* Step 1: Serviço */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#0d2233] mb-2">Queres poupar em que serviço?</h2>
                  <p className="text-gray-600 mb-8">Seleciona o serviço que pretendes contratar</p>
                  
                  <div className="space-y-4">
                    <button
                      onClick={() => handleServicoSelect('electricidade-gas')}
                      className="w-full flex items-center justify-between p-6 border-2 border-gray-200 rounded-2xl hover:border-[#79b2e9] hover:bg-[#f8fbff] transition-all group"
                    >
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-[#e5f3ff] rounded-xl mr-4 group-hover:bg-[#79b2e9] transition-colors">
                          <Zap className="h-5 w-5 text-[#79b2e9] group-hover:text-white mr-1" />
                          <Flame className="h-5 w-5 text-[#79b2e9] group-hover:text-white" />
                        </div>
                        <span className="font-medium text-[#0d2233]">Eletricidade + Gás Natural</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>

                    <button
                      onClick={() => handleServicoSelect('electricidade')}
                      className="w-full flex items-center justify-between p-6 border-2 border-gray-200 rounded-2xl hover:border-[#79b2e9] hover:bg-[#f8fbff] transition-all group"
                    >
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-[#e5f3ff] rounded-xl mr-4 group-hover:bg-[#79b2e9] transition-colors">
                          <Zap className="h-6 w-6 text-[#79b2e9] group-hover:text-white" />
                        </div>
                        <span className="font-medium text-[#0d2233]">Eletricidade</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>

                    <button
                      onClick={() => handleServicoSelect('gas')}
                      className="w-full flex items-center justify-between p-6 border-2 border-gray-200 rounded-2xl hover:border-[#79b2e9] hover:bg-[#f8fbff] transition-all group"
                    >
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-[#e5f3ff] rounded-xl mr-4 group-hover:bg-[#79b2e9] transition-colors">
                          <Flame className="h-6 w-6 text-[#79b2e9] group-hover:text-white" />
                        </div>
                        <span className="font-medium text-[#0d2233]">Gás Natural</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Tipo de Morada */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#0d2233] mb-2">Precisas do serviço para que morada?</h2>
                  <p className="text-gray-600 mb-8">Indica se é para a tua morada atual ou uma nova</p>
                  
                  <div className="space-y-4">
                    <button
                      onClick={() => handleMoradaSelect('actual')}
                      className="w-full flex items-center justify-between p-6 border-2 border-gray-200 rounded-2xl hover:border-[#79b2e9] hover:bg-[#f8fbff] transition-all group"
                    >
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-[#e5f3ff] rounded-xl mr-4 group-hover:bg-[#79b2e9] transition-colors">
                          <Home className="h-6 w-6 text-[#79b2e9] group-hover:text-white" />
                        </div>
                        <span className="font-medium text-[#0d2233]">Morada atual</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>

                    <button
                      onClick={() => handleMoradaSelect('nova')}
                      className="w-full flex items-center justify-between p-6 border-2 border-gray-200 rounded-2xl hover:border-[#79b2e9] hover:bg-[#f8fbff] transition-all group"
                    >
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-[#e5f3ff] rounded-xl mr-4 group-hover:bg-[#79b2e9] transition-colors">
                          <MapPin className="h-6 w-6 text-[#79b2e9] group-hover:text-white" />
                        </div>
                        <span className="font-medium text-[#0d2233]">Nova morada</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Pessoas */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#0d2233] mb-2">Quantas pessoas consomem energia?</h2>
                  <p className="text-gray-600 mb-8">Indica o número de pessoas que vivem na habitação</p>
                  
                  <div className="space-y-6">
                    {/* Adultos */}
                    <div className="p-6 border-2 border-gray-200 rounded-2xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-[#0d2233] mb-1">Adultos</h3>
                          <p className="text-sm text-gray-600">A partir dos 18 anos</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => adjustCount('adultos', false)}
                            className="w-10 h-10 rounded-full border-2 border-[#79b2e9] flex items-center justify-center text-[#79b2e9] hover:bg-[#79b2e9] hover:text-white transition-all"
                            disabled={data.adultos <= 0}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-2xl font-bold text-[#0d2233] w-8 text-center">{data.adultos}</span>
                          <button
                            onClick={() => adjustCount('adultos', true)}
                            className="w-10 h-10 rounded-full border-2 border-[#79b2e9] flex items-center justify-center text-[#79b2e9] hover:bg-[#79b2e9] hover:text-white transition-all"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Crianças */}
                    <div className="p-6 border-2 border-gray-200 rounded-2xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-[#0d2233] mb-1">Crianças</h3>
                          <p className="text-sm text-gray-600">Até aos 18 anos</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => adjustCount('criancas', false)}
                            className="w-10 h-10 rounded-full border-2 border-[#79b2e9] flex items-center justify-center text-[#79b2e9] hover:bg-[#79b2e9] hover:text-white transition-all"
                            disabled={data.criancas <= 0}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-2xl font-bold text-[#0d2233] w-8 text-center">{data.criancas}</span>
                          <button
                            onClick={() => adjustCount('criancas', true)}
                            className="w-10 h-10 rounded-full border-2 border-[#79b2e9] flex items-center justify-center text-[#79b2e9] hover:bg-[#79b2e9] hover:text-white transition-all"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setCurrentStep(4)}
                      className="w-full bg-[#79b2e9] text-white py-4 px-6 rounded-2xl hover:bg-[#0d2233] transition-all duration-300 font-medium"
                    >
                      Continuar
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Habitação */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#0d2233] mb-2">Quanto tempo está a casa habitada?</h2>
                  <p className="text-gray-600 mb-8">Indica o padrão de ocupação da habitação</p>
                  
                  <div className="space-y-4">
                    <button
                      onClick={() => handleHabitacaoSelect('permanentemente')}
                      className="w-full flex items-center justify-between p-6 border-2 border-gray-200 rounded-2xl hover:border-[#79b2e9] hover:bg-[#f8fbff] transition-all group"
                    >
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-[#e5f3ff] rounded-xl mr-4 group-hover:bg-[#79b2e9] transition-colors">
                          <Clock className="h-6 w-6 text-[#79b2e9] group-hover:text-white" />
                        </div>
                        <div>
                          <span className="font-medium text-[#0d2233] block">Permanentemente</span>
                          <span className="text-sm text-gray-600">24 horas por dia</span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>

                    <button
                      onClick={() => handleHabitacaoSelect('parte-dia')}
                      className="w-full flex items-center justify-between p-6 border-2 border-gray-200 rounded-2xl hover:border-[#79b2e9] hover:bg-[#f8fbff] transition-all group"
                    >
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-[#e5f3ff] rounded-xl mr-4 group-hover:bg-[#79b2e9] transition-colors">
                          <Clock className="h-6 w-6 text-[#79b2e9] group-hover:text-white" />
                        </div>
                        <div>
                          <span className="font-medium text-[#0d2233] block">Parte do dia</span>
                          <span className="text-sm text-gray-600">Manhãs, noites e fins-de-semana</span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>

                    <button
                      onClick={() => handleHabitacaoSelect('pontualmente')}
                      className="w-full flex items-center justify-between p-6 border-2 border-gray-200 rounded-2xl hover:border-[#79b2e9] hover:bg-[#f8fbff] transition-all group"
                    >
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-[#e5f3ff] rounded-xl mr-4 group-hover:bg-[#79b2e9] transition-colors">
                          <Home className="h-6 w-6 text-[#79b2e9] group-hover:text-white" />
                        </div>
                        <div>
                          <span className="font-medium text-[#0d2233] block">Pontualmente</span>
                          <span className="text-sm text-gray-600">Casa de férias</span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 5: Escalão de Gás (só aparece se gás foi selecionado) */}
              {currentStep === 5 && data.servico?.includes('gas') && (
                <div>
                  <h2 className="text-2xl font-bold text-[#0d2233] mb-2">Qual o escalão de gás a contratar?</h2>
                  <p className="text-gray-600 mb-8">Seleciona o escalão de consumo de gás natural</p>
                  
                  <div className="space-y-4">
                    {['escalao1', 'escalao2', 'escalao3', 'escalao4', 'nao-tenho-certeza'].map((escalao) => (
                      <button
                        key={escalao}
                        onClick={() => handleEscalaoSelect(escalao as SimulacaoData['escalao'])}
                        className="w-full flex items-center justify-between p-6 border-2 border-gray-200 rounded-2xl hover:border-[#79b2e9] hover:bg-[#f8fbff] transition-all group"
                      >
                        <div className="flex items-center">
                          <div className="flex items-center justify-center w-12 h-12 bg-[#e5f3ff] rounded-xl mr-4 group-hover:bg-[#79b2e9] transition-colors">
                            <Flame className="h-6 w-6 text-[#79b2e9] group-hover:text-white" />
                          </div>
                          <span className="font-medium text-[#0d2233]">{getEscalaoLabel(escalao as SimulacaoData['escalao'])}</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 6: Comercializadora e Dados */}
              {currentStep === 6 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#0d2233] mb-8">Dados para apoio personalizado</h2>
                  
                  <div className="space-y-6">
                    {data.servico?.includes('gas') && (
                      <div>
                        <label className="block text-sm font-medium text-[#0d2233] mb-2">
                          Qual a comercializadora de gás natural atual?
                        </label>
                        <select
                          value={data.comercializadora}
                          onChange={(e) => setData({ ...data, comercializadora: e.target.value })}
                          className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-[#79b2e9] focus:outline-none transition-all"
                        >
                          <option value="">Seleciona a tua comercializadora</option>
                          {comercializadoras.map(com => (
                            <option key={com} value={com}>{com}</option>
                          ))}
                        </select>
                      </div>
                    )}

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
                          className="w-full pl-12 p-4 border-2 border-gray-200 rounded-2xl focus:border-[#79b2e9] focus:outline-none transition-all"
                          placeholder="O teu nome completo"
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
                          className="w-full pl-12 p-4 border-2 border-gray-200 rounded-2xl focus:border-[#79b2e9] focus:outline-none transition-all"
                          placeholder="o.teu.email@exemplo.com"
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
                          className="w-full pl-12 p-4 border-2 border-gray-200 rounded-2xl focus:border-[#79b2e9] focus:outline-none transition-all"
                          placeholder="9XX XXX XXX"
                          required
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full bg-[#79b2e9] text-white py-4 px-6 rounded-2xl hover:bg-[#0d2233] transition-all duration-300 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'A enviar...' : 'Pedir Apoio'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Resumo - Lado Direito */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 sticky top-8">
              <h3 className="text-xl font-bold text-[#0d2233] mb-6">O teu resumo</h3>
              
              <div className="space-y-4">
                {data.servico && (
                  <div className="flex justify-between items-center p-3 bg-[#f8fbff] rounded-xl">
                    <span className="text-sm text-gray-600">Serviço a contratar</span>
                    <span className="font-medium text-[#0d2233] text-sm">{getServicoLabel(data.servico)}</span>
                  </div>
                )}

                {data.tipoMorada && (
                  <div className="flex justify-between items-center p-3 bg-[#f8fbff] rounded-xl">
                    <span className="text-sm text-gray-600">Tipo de morada</span>
                    <span className="font-medium text-[#0d2233] text-sm">
                      {data.tipoMorada === 'actual' ? 'Morada Actual' : 'Nova Morada'}
                    </span>
                  </div>
                )}

                {currentStep >= 3 && (
                  <div className="p-3 bg-[#f8fbff] rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Pessoas</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Adultos:</span>
                        <span className="text-xs font-medium text-[#0d2233]">{data.adultos}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Crianças:</span>
                        <span className="text-xs font-medium text-[#0d2233]">{data.criancas}</span>
                      </div>
                    </div>
                  </div>
                )}

                {data.habitacao && (
                  <div className="p-3 bg-[#f8fbff] rounded-xl">
                    <span className="text-sm text-gray-600 block mb-1">Habitação</span>
                    <span className="font-medium text-[#0d2233] text-xs">{getHabitacaoLabel(data.habitacao)}</span>
                  </div>
                )}

                {data.escalao && (
                  <div className="flex justify-between items-center p-3 bg-[#f8fbff] rounded-xl">
                    <span className="text-sm text-gray-600">Escalão de Gás</span>
                    <span className="font-medium text-[#0d2233] text-sm">{getEscalaoLabel(data.escalao)}</span>
                  </div>
                )}

                {data.comercializadora && (
                  <div className="p-3 bg-[#f8fbff] rounded-xl">
                    <span className="text-sm text-gray-600 block mb-1">Comercializadora Atual</span>
                    <span className="font-medium text-[#0d2233] text-sm">{data.comercializadora}</span>
                  </div>
                )}
              </div>

              {/* Empresas */}
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-[#0d2233] mb-4 text-center">Comparamos todas as empresas comercializadoras</h4>
                <div className="grid grid-cols-2 gap-3 opacity-60">
                  <div className="bg-gray-50 rounded-lg p-2 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">EDP</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">Endesa</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">Galp</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">Gold Energy</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">Iberdrola</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">Repsol</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulacaoEnergia;