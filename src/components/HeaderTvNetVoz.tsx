import React from 'react';
import { Tv, Wifi, Phone, Check, FileText, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const HeaderTvNetVoz: React.FC<HeaderProps> = ({ formData, handleInputChange }) => {
  const navigate = useNavigate();

  const handleNavigateToSimulacao = () => {
    navigate('/simulacao-tv-net-voz');
  };

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: 'url(/logo.png)',
          opacity: 0.02
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start">
          {/* Coluna da esquerda - Texto */}
          <div className="flex flex-col justify-center h-full lg:pr-20">
            <h1 className="text-3xl lg:text-4xl font-bold text-[#0d2233] mb-8 leading-tight">
              Encontra o melhor pacote de{' '}
              <span className="text-[#79b2e9]">TV, Internet e Telefone</span>{' '}
              para a tua casa
            </h1>

            {/* Lista de benefícios */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-6 h-6 bg-[#79b2e9] rounded-full flex items-center justify-center mr-3">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <span className="text-[#0d2233] font-medium">Comparamos todos os operadores do mercado</span>
              </div>
              
              <div className="flex items-center">
                <div className="flex-shrink-0 w-6 h-6 bg-[#79b2e9] rounded-full flex items-center justify-center mr-3">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <span className="text-[#0d2233] font-medium">Poupança até 40€/mês no teu pacote</span>
              </div>
              
              <div className="flex items-center">
                <div className="flex-shrink-0 w-6 h-6 bg-[#79b2e9] rounded-full flex items-center justify-center mr-3">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <span className="text-[#0d2233] font-medium">Instalação e mudança sem custos</span>
              </div>
            </div>
          </div>

          {/* Coluna da direita - Formulário */}
          <div className="flex justify-center lg:justify-end lg:pl-20">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md lg:max-w-lg">
              <h3 className="text-xl font-semibold text-[#0d2233] mb-6 text-center">Serviços a contratar</h3>
              
              <div className="space-y-4 mb-8">
                <button 
                  onClick={handleNavigateToSimulacao}
                  className="w-full flex items-center justify-between bg-white text-[#0d2233] py-4 px-6 rounded-2xl border-2 border-[#e5f3ff] hover:border-[#4f89c6] hover:bg-[#f8fbff] transition-all duration-300 shadow-sm"
                >
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 bg-[#e5f3ff] rounded-xl mr-4">
                      <div className="flex">
                        <Tv className="h-4 w-4 text-[#4f89c6] mr-1" />
                        <Wifi className="h-4 w-4 text-[#4f89c6] mr-1" />
                        <Phone className="h-4 w-4 text-[#4f89c6]" />
                      </div>
                    </div>
                    <span className="text-sm font-medium">TV + Internet + Telefone</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </button>
                
                <button 
                  onClick={handleNavigateToSimulacao}
                  className="w-full flex items-center justify-between bg-white text-[#0d2233] py-4 px-6 rounded-2xl border-2 border-[#e5f3ff] hover:border-[#4f89c6] hover:bg-[#f8fbff] transition-all duration-300 shadow-sm"
                >
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 bg-[#e5f3ff] rounded-xl mr-4">
                      <div className="flex">
                        <Tv className="h-4 w-4 text-[#4f89c6] mr-1" />
                        <Wifi className="h-4 w-4 text-[#4f89c6]" />
                      </div>
                    </div>
                    <span className="text-sm font-medium">TV + Internet</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </button>
                
                <button 
                  onClick={handleNavigateToSimulacao}
                  className="w-full flex items-center justify-between bg-white text-[#0d2233] py-4 px-6 rounded-2xl border-2 border-[#e5f3ff] hover:border-[#4f89c6] hover:bg-[#f8fbff] transition-all duration-300 shadow-sm"
                >
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 bg-[#e5f3ff] rounded-xl mr-4">
                      <Wifi className="h-5 w-5 text-[#4f89c6]" />
                    </div>
                    <span className="text-sm font-medium">Apenas Internet</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={handleNavigateToSimulacao}
                  className="w-full bg-[#79b2e9] text-white py-4 px-6 rounded-2xl hover:bg-[#0d2233] transition-all duration-300 font-medium shadow-lg flex items-center justify-center"
                >
                  <FileText className="h-5 w-5 mr-3" />
                  Tenho fatura atual
                  <ChevronRight className="h-5 w-5 ml-auto" />
                </button>
                <button 
                  onClick={handleNavigateToSimulacao}
                  className="w-full bg-white text-[#0d2233] py-4 px-6 rounded-2xl border-2 border-[#0d2233] hover:bg-[#0d2233] hover:text-white transition-all duration-300 font-medium shadow-sm flex items-center justify-center"
                >
                  Não tenho fatura
                  <ChevronRight className="h-5 w-5 ml-auto" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderTvNetVoz;