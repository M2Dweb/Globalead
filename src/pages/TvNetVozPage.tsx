import React from 'react';
import { Tv, Wifi, Phone, ArrowRight } from 'lucide-react';
import { sendEmail, FormData } from '../utils/emailService';

const TvNetVozPage: React.FC = () => {
  const [formData, setFormData] = React.useState<Partial<FormData>>({
    nome: '',
    apelido: '',
    telemovel: '',
    email: '',
    assunto: '',
    meio_contacto: '',
    horario: '',
    mensagem: '',
    page: 'tv-net-voz'
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      console.log('Dados do formulário TV Net Voz:', formData);
      const success = await sendEmail(formData as FormData);
      if (success) {
        setSubmitStatus('success');
        setFormData({
          nome: '',
          apelido: '',
          telemovel: '',
          email: '',
          assunto: '',
          meio_contacto: '',
          horario: '',
          mensagem: '',
          page: 'tv-net-voz'
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const providers = [
    {
      name: "MEO",
      description: "Integer quis dapibus mauris, non tristique tortor. Nam porta lobortis urna at lacinia. Praesent at est iaculis, pulvinar sapien in, rhoncus arcu. Mauris fermentum, diam ut rhoncus ultricies, sapien arcu bibendum nisi,",
      logo: "https://dzkxlimlbabjstaivuja.supabase.co/storage/v1/object/public/imagens/patrocinios/LOGOS_AZUL_ESCURO-09.png"
    },
    {
      name: "NOS",
      description: "Integer quis dapibus mauris, non tristique tortor. Nam porta lobortis urna at lacinia. Praesent at est iaculis, pulvinar sapien in, rhoncus arcu. Mauris fermentum, diam ut rhoncus ultricies, sapien arcu bibendum nisi,",
      logo: "https://dzkxlimlbabjstaivuja.supabase.co/storage/v1/object/public/imagens/patrocinios/LOGOS_AZUL_ESCURO-19.png"
    },
    {
      name: "Vodafone",
      description: "Integer quis dapibus mauris, non tristique tortor. Nam porta lobortis urna at lacinia. Praesent at est iaculis, pulvinar sapien in, rhoncus arcu. Mauris fermentum, diam ut rhoncus ultricies, sapien arcu bibendum nisi,",
      logo: "https://dzkxlimlbabjstaivuja.supabase.co/storage/v1/object/public/imagens/patrocinios/LOGOS_AZUL_ESCURO-24.png"
    },
    {
      name: "NOWO",
      description: "Integer quis dapibus mauris, non tristique tortor. Nam porta lobortis urna at lacinia. Praesent at est iaculis, pulvinar sapien in, rhoncus arcu. Mauris fermentum, diam ut rhoncus ultricies, sapien arcu bibendum nisi,",
      logo: "https://dzkxlimlbabjstaivuja.supabase.co/storage/v1/object/public/imagens/patrocinios/LOGOS_AZUL_ESCURO-14.png"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0d2233] to-blue-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              TV, Net & Voz
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              A Globalead apresenta várias soluções, a nível empresarial e residencial de forma a atender às reais necessidades de cada cliente e adapta-las com pacotes económicos e adaptados a cada um
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tv className="h-8 w-8 text-[#0d2233]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Televisão</h3>
              <p className="text-gray-600">
                Canais premium, desporto e entretenimento para toda a família
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wifi className="h-8 w-8 text-[#0d2233]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Internet</h3>
              <p className="text-gray-600">
                Velocidades ultra-rápidas para trabalho e lazer
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-[#0d2233]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Voz</h3>
              <p className="text-gray-600">
                Chamadas ilimitadas nacionais e internacionais
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Providers Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Principais Operadores
            </h2>
            <p className="text-xl text-gray-600">
              Comparamos as melhores ofertas do mercado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {providers.map((provider, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <div className="flex items-center mb-6">
                  <img
                    src={provider.logo}
                    alt={provider.name}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <h3 className="text-2xl font-bold text-gray-900">
                    {provider.name}
                  </h3>
                </div>
                <p className="text-gray-600 mb-6">
                  {provider.description}
                </p>
                <button className="bg-[#0d2233] text-white px-6 py-3 rounded-lg hover:bg-[#79b2e9] transition-colors duration-300 inline-flex items-center">
                  Saber mais
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Vantagens de Escolher a Globalead
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#0d2233]">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Poupança Garantida</h3>
              <p className="text-gray-600">
                Encontramos sempre a melhor oferta do mercado para o seu perfil
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#0d2233]">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Acompanhamento Total</h3>
              <p className="text-gray-600">
                Desde a simulação até à instalação, estamos sempre consigo
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#0d2233]">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sem Complicações</h3>
              <p className="text-gray-600">
                Tratamos de toda a burocracia e mudança de operador
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Form */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Conteúdo centralizado */}
          <div className="flex flex-col items-center">
            {/* Título e descrição */}
            <div className="text-center mb-8 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Encontre o Pacote Ideal
              </h2>
              <p className="text-xl text-blue-100">
                Preencha o formulário e receba uma proposta personalizada
              </p>
            </div>

            {/* Formulário centralizado */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                placeholder="Nome:"
                required
                className="px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <input
                type="text"
                name="apelido"
                value={formData.apelido}
                onChange={handleInputChange}
                placeholder="Apelido:"
                className="px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <input
                type="tel"
                name="telemovel"
                value={formData.telemovel}
                onChange={handleInputChange}
                placeholder="Telemóvel:"
                className="px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email:"
                required
                className="px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <select 
                name="meio_contacto"
                value={formData.meio_contacto}
                onChange={handleInputChange}
                className="px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="">Meio de Contacto:</option>
                <option>Email</option>
                <option>Telefone</option>
                <option>WhatsApp</option>
              </select>
              <input
                type="text"
                name="assunto"
                value={formData.assunto}
                onChange={handleInputChange}
                placeholder="Assunto:"
                className="px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <input
                type="text"
                name="horario"
                value={formData.horario}
                onChange={handleInputChange}
                placeholder="Horário:"
                className="md:col-span-2 px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              
              <div className="md:col-span-2">
                <label className="flex items-start text-sm text-blue-100">
                  <input type="checkbox" className="mt-1 mr-2" required />
                  Sim, aceito os termos e condições indicados pela Globalead Portugal.
                </label>
                <p className="text-xs text-blue-200 mt-2">
                  Os dados submetidos através deste formulário de contacto serão tratados em conformidade com a legislação em vigor sobre dados pessoais e o Regulamento Geral da Proteção de Dados (UE) 2016/679.
                </p>
                
                {submitStatus === 'success' && (
                  <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                    Mensagem enviada com sucesso! Entraremos em contacto em breve.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    Erro ao enviar mensagem. Tente novamente ou contacte-nos diretamente.
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-[#0d2233] font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-300"
                >
                  {isSubmitting ? 'Enviando...' : 'Pedir Simulação'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TvNetVozPage;