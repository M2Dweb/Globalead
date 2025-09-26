import React, { useEffect, useState } from 'react';
import { Zap, ArrowRight, Calendar, Sun, BarChart3, Flame, Euro, Clock, CreditCard, Plus, Percent } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import FAQ from '../components/FAQ';
import Header from '../components/HeaderEnergia';
import ProcessFAQ from '../components/ProcessFAQ';
import { sendEmail, FormData } from '../utils/emailService';
import { Link } from 'react-router-dom';
import ContentRenderer from '../components/ContentRenderer';
import { supabase } from '../lib/supabase';




const EnergiaPage: React.FC = () => {
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [latestPosts, setLatestPosts] = useState<any[]>([]);
  
    useEffect(() => {
      const fetchLatestPosts = async () => {
        try {
          const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .order('date', { ascending: false })
            .limit(6);
  
          if (error) {
            console.error('Erro ao carregar posts:', error);
            setLatestPosts([]);
          } else {
            setLatestPosts(data || []);
          }
        } catch (error) {
          console.error('Erro ao carregar posts:', error);
          setLatestPosts([]);
        }
      };
  
      fetchLatestPosts();
    }, []);

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

  

  const energyServices = [
    {
      icon: <Zap className="h-12 w-12 text-[#79b2e9]" />,
      title: "Eletricidade",
      description: "Encontramos as melhores tarifas de eletricidade para a sua casa ou empresa, garantindo poupança na sua fatura mensal.",
      link: "#eletricidade"
    },
    {
      icon: <Flame className="h-12 w-12 text-[#79b2e9]" />,
      title: "Gás Natural",
      description: "Comparamos os preços do gás natural de todos os fornecedores para encontrar a opção mais económica para si.",
      link: "#gas"
    },
    {
      icon: <Sun className="h-12 w-12 text-[#79b2e9]" />,
      title: "Painéis Solares",
      description: "Instalação de sistemas solares fotovoltaicos para produzir a sua própria energia limpa e sustentável.",
      link: "#paineis-solares"
    }
  ];

  const contractAnalysis = [
    {
      icon: <Euro className="h-12 w-12 text-[#79b2e9]" />,
      title: "Preço por KWh e custos fixos",
      description: "Compara o custo da energia e os encargos fixos mensais para saber quanto vais realmente pagar no final do mês.",
      image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      icon: <BarChart3 className="h-12 w-12 text-[#79b2e9]" />,
      title: "Tipo de tarifa",
      description: "Analisa qual é o teu tipo de tarifa (indexada ou fixa). Ambas têm benefícios e inconvenientes, é importante que percebas qual é melhor para ti.",
      image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      icon: <Clock className="h-12 w-12 text-[#79b2e9]" />,
      title: "Fidelização e duração",
      description: "A maioria dos contratos não inclui qualquer tipo de fidelização. No entanto, se tiveres beneficiado de ofertas é possível que existam penalizações.",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      icon: <Percent className="h-12 w-12 text-[#79b2e9]" />,
      title: "Descontos e ofertas",
      description: "Os fornecedores de energia regularmente lançam campanhas limitadas. É importante que analises o custo real a longo prazo.",
      image: "https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      icon: <CreditCard className="h-12 w-12 text-[#79b2e9]" />,
      title: "Faturação e pagamento",
      description: "Faturas mensais podem ser reais ou estimadas. Escolhe o método certo e a forma como pretendes receber as tuas faturas para evitares surpresas.",
      image: "https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      icon: <Plus className="h-12 w-12 text-[#79b2e9]" />,
      title: "Serviços adicionais",
      description: "Muitos fornecedores oferecem serviços adicionais, como seguros ou assistência. Analisa a tua situação e decide se os queres incluir.",
      image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];


  return (
    <div className="min-h-screen bg-white">
      {/* 1. Header Section */}
      <Header formData={formData} handleInputChange={handleInputChange} />

      {/* 2. Energy Services Section */}
      <AnimatedSection>
        <section className="py-12 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
                Os Nossos Serviços de Energia
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 px-4">
                Descubra as soluções energéticas que temos para si
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {energyServices.map((service, index) => (
                <div key={index} className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                  <div className="text-center">
                    <div className="mb-4 sm:mb-6 flex justify-center">
                      {service.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                      {service.description}
                    </p>
                    <button className="bg-[#79b2e9] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[#0d2233] transition-colors duration-300 font-medium text-sm sm:text-base">
                      Saber Mais
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* 3. How to Contract Energy */}
      <AnimatedSection>
        <section className="py-12 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4 px-4">
                Como contratar energia com a Globalead?
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 lg:gap-16 items-start max-w-4xl mx-auto">
              <div>
                <ProcessFAQ onActiveChange={setActiveProcessStep} />
              </div>
            </div>
            <div className="mt-6 sm:mt-8 text-center">
              <Link to={'/simulacao'}>
                <button className="bg-[#79b2e9] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-[#0d2233] transition-colors duration-300 font-medium inline-flex items-center text-sm sm:text-base">
                  Simular
                  <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* 4. Solar Panel Installation Section */}
      <AnimatedSection>
        <section className="py-12 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start lg:items-center">
              
              {/* Left side - Content */}
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Instalação de Painéis Solares
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
                  Produza a sua própria energia limpa e sustentável com os nossos sistemas solares fotovoltaicos.
                </p>

                {/* Image (Only on mobile, placed between the title and the topics) */}
                <div className="lg:hidden relative mb-8">
                  <img
                    src="https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Instalação de painéis solares"
                    className="w-full h-auto rounded-2xl shadow-lg"
                  />
                  <div className="absolute -bottom-3 -left-3 sm:-bottom-6 sm:-left-6 bg-white p-3 sm:p-6 rounded-xl shadow-lg">
                    <div className="text-center">
                      <div className="text-lg sm:text-2xl font-bold text-[#79b2e9]">300€+</div>
                      <div className="text-xs sm:text-sm text-gray-600">Poupança anual</div>
                    </div>
                  </div>
                </div>

                {/* Benefits List */}
                <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-[#79b2e9] rounded-full flex items-center justify-center mr-3 sm:mr-4 mt-1">
                      <span className="text-white font-bold text-xs sm:text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Protegem o meio ambiente</h4>
                      <p className="text-gray-600 text-sm sm:text-base">Os painéis solares produzem eletricidade de forma sustentável. Contribuem para a proteção do meio ambiente através da produção sustentável de eletricidade.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-[#79b2e9] rounded-full flex items-center justify-center mr-3 sm:mr-4 mt-1">
                      <span className="text-white font-bold text-xs sm:text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Aumentam o valor da tua casa</h4>
                      <p className="text-gray-600 text-sm sm:text-base">A instalação de um sistema fotovoltaico pode aumentar a classe de eficiência energética da tua casa e o respetivo valor de mercado. Torna o imóvel mais atraente para compradores com uma maior consciência ambiental.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-[#79b2e9] rounded-full flex items-center justify-center mr-3 sm:mr-4 mt-1">
                      <span className="text-white font-bold text-xs sm:text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Reduzem a fatura de eletricidade</h4>
                      <p className="text-gray-600 text-sm sm:text-base">A produção de energia gerada por painéis solares permite-te diminuir o consumo de eletricidade da rede e, assim, reduzir significativamente a fatura da luz.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-[#79b2e9] rounded-full flex items-center justify-center mr-3 sm:mr-4 mt-1">
                      <span className="text-white font-bold text-xs sm:text-sm">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Incentivos e subsídios governamentais</h4>
                      <p className="text-gray-600 text-sm sm:text-base">Existem programas de apoio e subsídios governamentais para a instalação de painéis solares. Esses benefícios podem reduzir o custo inicial e tornar a energia solar mais acessível.</p>
                    </div>
                  </div>
                </div>

                {/* Button */}
                <div className="flex justify-center">
                  <button className="bg-[#0d2233] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-[#79b2e9] transition-colors duration-300 font-medium inline-flex items-center text-sm sm:text-base">
                    <Sun className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                    Pedir Orçamento Gratuito
                  </button>
                </div>
              </div>

              {/* Right side - Image (Desktop only) */}
              <div className="hidden lg:block mt-8 lg:mt-0 lg:ml-8">
                <div className="space-y-4">
                  <img
                    src="/PAINEIS-PREMIUM_002.png"
                    alt="Solução 2 Painéis - Gama Quality - 23,90€/mês"
                    className="w-full max-w-md rounded-lg "
                  />
                  <img
                    src="/PAINEIS-QUALITY_002.png"
                    alt="Solução 4 Painéis - Gama Premium - 38,71€/mês"
                    className="w-full max-w-md rounded-lg "
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>


      {/* 6. Contract Analysis Section */}
      <AnimatedSection>
        <section className="py-12 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4 px-4">
                Análise de contratos de energia: o que deves considerar
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-2 sm:mb-4 px-4">
                Antes de mudar de fornecedor, é importante compreender todos os elementos que influenciam a fatura.
              </p>
              
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {contractAnalysis.map((item, index) => (
                <div key={index} className="bg-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 w-full">
                  
                  <div className="mb-3 sm:mb-4 flex justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-center text-gray-900 mb-2 sm:mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 text-center">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>
      </AnimatedSection>

      {/* 7. Blog Section */}
      <AnimatedSection>
        {/* Latest Blog Posts Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Últimas Notícias
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {latestPosts.map(post => (
              <Link
                key={post.id}
               to={`/blog/${post.ref || post.id}`}
                className="bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group border border-gray-100"
              >
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-[#0d2233] text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                  </div>
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs sm:text-sm">
                    {post.read_time}
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    <span>{new Date(post.date).toLocaleDateString('pt-PT')}</span>
                    <span className="mx-2">•</span>
                    <span>Por {post.author}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 group-hover:text-[#0d2233] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                    <ContentRenderer content={post.excerpt} className="line-clamp-3" />
                  </p>

                  <div className="w-full bg-[#79b2e9] text-white py-2 px-4 rounded-lg hover:bg-[#0d2233] transition-colors text-center text-sm sm:text-base">
                    Ler Mais
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>
      </AnimatedSection>

      {/* 8. Contact Form Section */}
      <section className="py-12 sm:py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <div className="text-center mb-6 sm:mb-8 max-w-3xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 px-4">
                Tem dúvidas? Entre em contacto.
              </h2>
            </div>

            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-md border border-gray-100 w-full max-w-2xl">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Nome */}
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Nome*"
                  required
                  className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
                {/* Apelido */}
                <input
                  type="text"
                  name="apelido"
                  value={formData.apelido}
                  onChange={handleInputChange}
                  placeholder="Apelido*"
                  required
                  className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
                {/* Contacto */}
                <input
                  type="tel"
                  name="contacto"
                  value={formData.telemovel}
                  onChange={handleInputChange}
                  placeholder="Contacto*"
                  required
                  className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
                {/* Email */}
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email*"
                  required
                  className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
                {/* Meio de Contacto */}
                <select
                  name="meioContacto"
                  value={formData.meio_contacto}
                  onChange={handleInputChange}
                  className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                >
                  <option value="" disabled>Meio de Contacto*</option>
                  <option value="Telefone">Telefone</option>
                  <option value="Email">Email</option>
                  <option value="SMS">SMS</option>
                </select>
                {/* Horário */}
                <select name="horário" value={formData.horario} onChange={handleInputChange} className="px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#79b2e9] text-sm sm:text-base">
                  <option value="">Horário</option>
                  <option>9h-12h30</option>
                  <option>12h30-16h</option>
                  <option>16h-19h30</option>
                </select>
                
                {/* Assunto */}
                <select
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleInputChange}
                  className="sm:col-span-2 px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                >
                  <option value="" disabled>Assunto*</option>
                  <option value="Eletricidade">Eletricidade</option>
                  <option value="Gas Natural">Gás Natural</option>
                  <option value="Eletricidade + Gas Natural">Eletricidade + Gás Natural</option>
                  <option value="Paineis Solares">Paineis Solares</option>
                </select>

                {/* Motivo de Contacto */}
                <select
                  name="motivoContato"
                  value={formData.mensagem}
                  onChange={handleInputChange}
                  className="sm:col-span-2 px-3 sm:px-4 py-2 sm:py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                >
                  <option value="" disabled>Motivo de Contacto*</option>
                  <option value="Explicacao de Fatura">Explicação de Fatura</option>
                  <option value="Analise de Consumos">Análise de Consumos</option>
                  <option value="Simulacao de Fatura">Simulação de Fatura</option>
                  <option value="Simulacao para Paineis Solares">Simulação para Painéis Solares</option>
                </select>

                <div className="sm:col-span-2">
                  <label className="flex items-start text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">
                    <input type="checkbox" className="mt-1 mr-2" required />
                    Sim, aceito os termos e condições indicados pela Globalead Portugal.
                  </label>
                  <p className="text-xs text-gray-600 mb-3 sm:mb-4">
                    Os dados submetidos através deste formulário de contacto serão tratados em conformidade com a legislação em vigor sobre dados pessoais e o Regulamento Geral da Protecção de Dados (UE) 2016/679.
                  </p>
                  
                  {submitStatus === 'success' && (
                    <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-green-100 border border-green-400 text-green-700 rounded text-xs sm:text-sm">
                      Mensagem enviada com sucesso! Entraremos em contacto em breve.
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-red-100 border border-red-400 text-red-700 rounded text-xs sm:text-sm">
                      Erro ao enviar mensagem. Tente novamente ou contacte-nos diretamente.
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0d2233] text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-lg hover:bg-[#79b2e9] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {isSubmitting ? 'Enviando...' : 'Entrar em contacto'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <AnimatedSection>
        <section className="py-12 sm:py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4 px-4">
                Tem alguma questão que não foi contemplada?
              </h2>
            </div>
            <FAQ category="energiaFAQ" />
          </div>
        </section>
      </AnimatedSection>

    </div>
  );
};

export default EnergiaPage;