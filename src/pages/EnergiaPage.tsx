import React from 'react';
import { Zap, Leaf, TrendingDown, ArrowRight, Calendar } from 'lucide-react';
import FAQ from '../components/FAQ';
import AnimatedSection from '../components/AnimatedSection';
import { sendEmail, FormData } from '../utils/emailService';

const EnergiaPage: React.FC = () => {
  const [formData, setFormData] = React.useState<Partial<FormData>>({
    nome: '',
    apelido: '',
    telemovel: '',
    email: '',
    assunto: '',
    meio_contacto: '',
    horario: '',
    mensagem: '',
    page: 'energia'
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
      console.log('Dados do formulário Energia:', formData);
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
          page: 'energia'
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

  const energyProviders = [
    {
      name: "EDP",
      description: "Integer quis dapibus mauris, non tristique tortor. Nam porta lobortis urna at lacinia. Praesent at est iaculis, pulvinar sapien in, rhoncus arcu. Mauris fermentum, diam ut rhoncus ultricies, sapien arcu bibendum nisi,",
      logo: "https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop"
    },
    {
      name: "ENDESA",
      description: "Integer quis dapibus mauris, non tristique tortor. Nam porta lobortis urna at lacinia. Praesent at est iaculis, pulvinar sapien in, rhoncus arcu. Mauris fermentum, diam ut rhoncus ultricies, sapien arcu bibendum nisi,",
      logo: "https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop"
    },
    {
      name: "GALP",
      description: "Integer quis dapibus mauris, non tristique tortor. Nam porta lobortis urna at lacinia. Praesent at est iaculis, pulvinar sapien in, rhoncus arcu. Mauris fermentum, diam ut rhoncus ultricies, sapien arcu bibendum nisi,",
      logo: "https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop"
    },
    {
      name: "PLENITUDE",
      description: "Integer quis dapibus mauris, non tristique tortor. Nam porta lobortis urna at lacinia. Praesent at est iaculis, pulvinar sapien in, rhoncus arcu. Mauris fermentum, diam ut rhoncus ultricies, sapien arcu bibendum nisi,",
      logo: "https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop"
    }
  ];

  const services = [
    {
      icon: <Zap className="h-12 w-12 text-[#0d2233]" />,
      title: "Mediação Imobiliária",
      description: "Com uma preparação e experiência única, a Globalead põem toda a sua dedicação em dar-lhe o melhor acompanhamento orientando-o na direção certa das suas necessidades e ambições.",
      link: "imoveis"
    },
    {
      icon: <Leaf className="h-12 w-12 text-green-600" />,
      title: "Mercado Energético",
      description: "Com energia 100% renovável pretendemos atender a todos os clientes residentes em Portugal com a melhor eficiência energética e assim ajudá-lo a escolher, bem informado, a melhor para si",
      link: "energia"
    },
    {
      icon: <TrendingDown className="h-12 w-12 text-purple-600" />,
      title: "Certificação Energética",
      description: "Classifica o desempenho energético de um imóvel, medido numa escala de A+ a G e propõe medidas de aprimoramento, sendo este documento obrigatório na venda do seu imóvel",
      link: "certificacao"
    }
  ];

  const newsArticles = [
    {
      title: "Garantia pública sobe risco de incumprimento (e tende a elevar juros)",
      date: "Janeiro 6, 2025",
      excerpt: "A garantia pública para crédito à habitação de jovens, que permite financiamento a 100%, já está em vigor, mas só deverá estar operacional no final do ano. O Banco de...",
      image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      title: "Como organizar a casa no inverno: dicas para ter tudo à mão",
      date: "Janeiro 6, 2025",
      excerpt: "Manter a casa organizada no inverno pode ser simples e rápido, proporcionando mais conforto e momentos de relaxamento. Apesar da rotina agitada, envolver toda a família nas tarefas domésticas, especialmente...",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      title: "Preço da eletricidade aumenta 2,1% no mercado regulado em 2025",
      date: "Janeiro 6, 2025",
      excerpt: "O regulador propõe um aumento de 2,1% no preço da eletricidade para os clientes do mercado regulado em 2025. Mas a ERSE prevê uma descida na fatura média mensal até...",
      image: "https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0d2233] to-blue-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Soluções Energéticas
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Compare e adira à melhor oferta de energia 100% renovável
            </p>
          </div>
        </div>
      </section>
    
      {/* Simulation Form */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Queres poupar em que serviço?
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-[#0d2233] text-white px-6 py-3 rounded-lg hover:bg-[#79b2e9] transition-colors">
                  Electricidade + Gás natural
                </button>
                <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">
                  Electricidade
                </button>
                <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">
                  Gás natural
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                placeholder="Nome:"
                required
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="apelido"
                value={formData.apelido}
                onChange={handleInputChange}
                placeholder="Apelido:"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                name="telemovel"
                value={formData.telemovel}
                onChange={handleInputChange}
                placeholder="Telemóvel:"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email:"
                required
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select 
                name="meio_contacto"
                value={formData.meio_contacto}
                onChange={handleInputChange}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="horario"
                value={formData.horario}
                onChange={handleInputChange}
                placeholder="Horário:"
                className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600 mb-4">
                  Ao clicar em "Pedir Simulação", concorda com a Política de Privacidade da Globalead Portugal.
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
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0d2233] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#79b2e9] transition-colors duration-300"
                >
                  {isSubmitting ? 'Enviando...' : 'Pedir Simulação'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Energy Providers */}
      <AnimatedSection>
        <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Principais Fornecedores de Energia
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {energyProviders.map((provider, index) => (
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
                <button className="text-[#0d2233] font-medium hover:text-[#79b2e9] transition-colors">
                  Saber mais →
                </button>
              </div>
            ))}
          </div>
        </div>
        </section>
      </AnimatedSection>

      {/* FAQ Section */}

      {/* Services Section */}
      <AnimatedSection>
        <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              3 razões para escolher a Globalead
            </h2>
            <p className="text-xl text-gray-600">
              Porque é importante que sinta que está acompanhado, e que estamos consigo sempre.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-center">
                  <div className="mb-6">
                    {React.cloneElement(service.icon, { className: "h-12 w-12 text-[#0d2233] mx-auto" })}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <button className="text-[#0d2233] font-medium hover:text-[#79b2e9] transition-colors">
                    Saber mais →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        </section>
      </AnimatedSection>

      {/* News Section */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Novidades em tempo real
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Subscreva a Newsletter e fique a par de todas as novidades, descontos e promoções disponíveis para si
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {newsArticles.map((article, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    {article.date}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {article.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-[#0d2233] text-white px-8 py-3 rounded-lg hover:bg-[#79b2e9] transition-colors duration-300 inline-flex items-center">
              Ver mais
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
        </section>
      </AnimatedSection>

      {/* Contact Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Centraliza todo o conteúdo */}
          <div className="flex flex-col items-center">
            {/* Texto do título e descrição */}
            <div className="text-center mb-8 max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Acompanhamento Personalizado
              </h2>
              <p className="text-xl text-blue-100 mb-4">
                Já tem uma ideia de aquilo que deseja mas não tem a certeza de como concretizar?
              </p>
              <p className="text-lg text-blue-100">
                A nossa equipa de profissionais vai ajudar-lhe no processo de escolha do imóvel e todos os serviços associados a um imóvel.
              </p>
            </div>

            {/* Formulário centralizado */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                placeholder="Nome*"
                required
                className="px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email*"
                required
                className="px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <input
                type="tel"
                name="telemovel"
                value={formData.telemovel}
                onChange={handleInputChange}
                placeholder="Contacto*"
                className="px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <input
                type="text"
                name="horario"
                value={formData.horario}
                onChange={handleInputChange}
                placeholder="Localidade*"
                className="px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <input
                type="text"
                name="assunto"
                value={formData.assunto}
                onChange={handleInputChange}
                placeholder="Código Postal*"
                className="md:col-span-2 px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />

              <div className="md:col-span-2">
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
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-[#0d2233] font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-300"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Pedido'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQ category="energia" />
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default EnergiaPage;