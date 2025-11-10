import React from 'react';
import { Shield, Eye, Clock, Users, Lock, Camera, Smartphone, Key, Phone } from 'lucide-react';
import FAQ from '../components/FAQ';
import AnimatedSection from '../components/AnimatedSection';
import { sendEmail, FormData } from '../utils/emailService';

const AlarmesPage: React.FC = () => {
  const [formData, setFormData] = React.useState<Partial<FormData>>({
    nome: '',
    apelido: '',
    telemovel: '',
    email: '',
    assunto: '',
    meio_contacto: '',
    horario: '',
    mensagem: '',
    page: 'alarmes'
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
      console.log('Dados do formulário Alarmes:', formData);
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
          page: 'alarmes'
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

  const securityCompanies = [
    {
      name: "Securitas Direct",
      description: "A Securitas Direct é uma empresa líder no setor de alarmes e segurança eletrônica, oferecendo soluções inovadoras para proteger residências e empresas em todo o país. Com o compromisso de garantir tranquilidade e segurança aos seus clientes, a empresa integra tecnologias de ponta.",
      logo: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop"
    },
    {
      name: "Prosegur",
      description: "Empresa especializada em soluções de segurança para residências e empresas, oferecendo sistemas de alarmes de última geração. Com tecnologia avançada e monitorização 24/7, a Prosegur garante uma proteção eficaz contra intrusões, incêndios, inundações e outros riscos.",
      logo: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Deteção",
      description: "Detetamos a intenção de intrusão e o alarme é ativado.",
      icon: <Eye className="h-8 w-8 text-[#0d2233]" />
    },
    {
      step: "2",
      title: "Comprovação",
      description: "A Central Recetora de Alarmes verifica o evento de alarme.",
      icon: <Shield className="h-8 w-8 text-[#0d2233]" />
    },
    {
      step: "3",
      title: "Aviso",
      description: "Se se confirma, é feito o aviso imediato à Polícia.",
      icon: <Phone className="h-8 w-8 text-[#0d2233]" />
    },
    {
      step: "4",
      title: "Atuação",
      description: "Um Vigilante de Segurança é enviado até ao local.",
      icon: <Users className="h-8 w-8 text-[#0d2233]" />
    }
  ];

  const features = [
    {
      number: "20",
      title: "Resposta em menos de 20 segundos",
      description: "Somos líderes na resposta a eventos de alarme. Temos uma equipa de profissionais atentos e garantimos uma resposta em menos de 20 segundos.",
      icon: <Clock className="h-12 w-12 text-[#0d2233]" />
    },
    {
      number: "21",
      title: "Aviso imediato à Polícia",
      description: "O nosso sistema está equipado com câmaras de videovigilância de última geração. Em caso de evento real de alarme a nossa Central 24H avisa de imediato a polícia, bombeiros ou emergência médica.",
      icon: <Phone className="h-12 w-12 text-[#0d2233]" />
    },
    {
      number: "22",
      title: "A proteção anti-intrusão mais eficaz",
      description: "Em caso de intrusão confirmada, notificamos a polícia e ativamos o ZeroVision, que impede a visão do intruso para o expulsarem segundos.",
      icon: <Shield className="h-12 w-12 text-[#0d2233]" />
    },
    {
      number: "23",
      title: "Equipa de vigilantes própria",
      description: "Em caso de evento real, ativamos uma dupla resposta. Enviamos um vigilante próprio e avisamos a polícia. Temos uma equipa de profissionais sempre pronta a atuar em caso de evento de alarme.",
      icon: <Users className="h-12 w-12 text-[#0d2233]" />
    },
    {
      number: "24",
      title: "A proteção da sua casa começa na Porta",
      description: "Com a nossa fechadura inteligente com cilindro antirroubo de máxima segurança, protegemos a sua casa de forma eficiente. Sincronizada com o seu alarme, permite abrir e fechar a porta sem chaves.",
      icon: <Lock className="h-12 w-12 text-[#0d2233]" />
    },
    {
      number: "25",
      title: "A inovação premiada pelos consumidores",
      description: "Reforce a proteção em áreas exteriores e interiores e vigie o que ocorre a partir de qualquer lugar graças às câmaras de segurança Arlo.",
      icon: <Camera className="h-12 w-12 text-[#0d2233]" />
    },
    {
      number: "26",
      title: "Controlo remoto do alarme",
      description: "Os alarmes podem ser controlados de forma remota e a partir do smartphone. Com a App, uma aplicação de fácil navegação, que lhe permite ter o controlo absoluto do seu sistema de alarme, esteja onde estiver.",
      icon: <Smartphone className="h-12 w-12 text-[#0d2233]" />
    },
    {
      number: "28",
      title: "Fechadura Inteligente",
      description: "A nossa fechadura inteligente alerta em caso de manipulação para atuarmos de imediato. Além disso, criamos um escudo protetor à volta da sua casa com detetores de acesso Shock Sensor nas portas e janelas e, ainda, câmaras de segurança.",
      icon: <Key className="h-12 w-12 text-[#0d2233]" />
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-[#0d2233] to-blue-500 text-white py-20 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          poster="/fotos/AlarmesPage-foto.png"
        >
          <source src="/videos/AlarmesPage-video(1).mp4" type="video/mp4" />
        </video>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sinta-se seguro e protegido!
            </h1>
            <p className="text-xl text-gray-100 max-w-4xl mx-auto">
              Na Globalead Portugal, oferecemos soluções de segurança personalizadas para moradias, apartamentos e negócios. O nosso compromisso é ajudá-lo a encontrar a solução ideal para as suas necessidades. Analisamos cuidadosamente as características do seu imóvel, recolhendo toda a informação necessária para lhe apresentar as opções mais adequadas.
            </p>
          </div>
        </div>
      </section>

      {/* Security Companies */}
      <AnimatedSection>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Quais são as melhores opções de alarmes?
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {securityCompanies.map((company, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-16 h-16 object-cover rounded-lg mr-4"
                    />
                    <h3 className="text-2xl font-bold text-gray-900">
                      {company.name}
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    {company.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* FAQ Section */}

      {/* How It Works */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Como funciona um alarme completo?
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                O alarme combina sensores, câmaras e monitorização 24/7. Em caso de disparo, a central verifica o evento e pode alertar autoridades. Pode ser controlado via app, funciona mesmo sem eletricidade ou internet, e oferece proteção contínua.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="bg-[#0d2233] text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Features */}
      <AnimatedSection>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Quais são as principais características?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start">
                    <div className="mr-6 flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            {/* Texto acima do formulário */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Faça uma simulação sem compromisso!
              </h2>
              <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
                <div className="flex items-center">
                  <Phone className="h-6 w-6 mr-2" />
                  <span className="text-lg">915 482 365 (chamada rede fixa nacional)</span>
                </div>
                <button className="bg-white text-[#0d2233] px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-300 font-semibold">
                  Ver ofertas
                </button>
              </div>
            </div>

            {/* Formulário Centralizado */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 w-full max-w-2xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Tem dúvidas?
                </h2>
                <p className="text-xl text-blue-100">
                  Entre em contacto!
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Nome:"
                  required
                  className="px-4 py-3 border  border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="apelido"
                  value={formData.apelido}
                  onChange={handleInputChange}
                  placeholder="Apelido:"
                  className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="tel"
                  name="telemovel"
                  value={formData.telemovel}
                  onChange={handleInputChange}
                  placeholder="Telemóvel:"
                  className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email:"
                  required
                  className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select 
                  name="meio_contacto"
                  value={formData.meio_contacto}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="horario"
                  value={formData.horario}
                  onChange={handleInputChange}
                  placeholder="Horário:"
                  className="md:col-span-2 px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                <div className="md:col-span-2">
                  <label className="flex items-start text-sm text-gray-700 mb-4">
                    <input type="checkbox" className="mt-1 mr-2" required />
                    Sim, aceito os termos e condições indicados pela Globalead Portugal.
                  </label>
                  <p className="text-xs text-gray-600 mb-4">
                    Os dados submetidos através deste formulário de contacto serão tratados em conformidade com a legislação em vigor sobre dados pessoais e o Regulamento Geral da Protecção de Dados (UE) 2016/679.
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
                    {isSubmitting ? 'Enviando...' : 'Enviar Pedido'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQ category="alarmes" />
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default AlarmesPage;