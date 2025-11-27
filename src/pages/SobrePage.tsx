import React, { useState, useEffect } from 'react';
import { Star, Cpu, Search, ShieldCheck } from 'lucide-react';
import { sendEmail , FormData } from '../utils/emailService';
import FounderVideoSection from '../components/FounderVideoSection';

const SobrePage: React.FC = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const [formData, setFormData] = useState<Partial<FormData>>({
      nome: '',
      apelido: '',
      telemovel: '',
      email: '',
      assunto: '',
      meio_contacto: '',
      horario: '',
      page: 'home'
    });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
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
        console.log('Dados do formulário HomePage:', formData);
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
            page: 'home'
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


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Gonçalo Vinhas",
      image: "/testimonials/goncalo-vinhas.jpg",
      platform: "WhatsApp",
      review: "Contactei a Globalead para encontrar soluções de seguro automóvel e fui atendido pelo Carlos Gonçalves. Desde o primeiro contacto, o Carlos mostrou-se extremamente profissional e prestável! Apresentou-me as melhores opções conforme as minhas necessidades, explicou-me detalhadamente cada proposta e tratou de todo o processo com grande eficiência. Em menos de 24 horas, o meu seguro já estava ativo. Fiquei muito satisfeito com o serviço e recomendo vivamente a Globalead pela rapidez, clareza e qualidade no atendimento."
    },
    {
      name: "Francisco Gonçalves",
      image: "/testimonials/francisco-gonçalves.jpg",
      platform: "Facebook",
      review: "Quando o Carlos, em representação da Globalead Portugal, entrou em contacto comigo, percebi de imediato a confiança e a dedicação com que se apresentou. Prometeu um trabalho rigoroso e empenhado na venda do meu imóvel e cumpriu cada palavra.Ao longo de todo o processo, o Carlos foi incansável, sempre disponível, prestável e atento a cada detalhe. Ajudou-me a reunir toda a documentação necessária e acompanhou-me passo a passo, transformando aquilo que poderia ser um desafio num percurso tranquilo e seguro.O resultado foi muito mais do que a concretização da venda: foi a certeza de que posso contar com alguém que coloca profissionalismo e humanidade lado a lado. Estou profundamente grato pelo trabalho desenvolvido e confiante de que, no futuro, o Carlos será sempre a minha primeira escolha."
    },
    {
      name: "Família Gomes",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      platform: "Google",
      review: "Entrámos em contacto com a Globalead depois de vermos um anúncio nas redes sociais, numa altura em que procurávamos apoio para tratar de um processo de crédito. Graças ao acompanhamento da Globalead, conseguimos alcançar uma prestação justa, confortável e totalmente adequada ao nosso orçamento familiar. Para além disso, ainda nos ajudaram a renegociar o seguro da casa e o seguro de vida. Um agradecimento muito especial ao Carlos, que esteve sempre ao nosso lado com profissionalismo, dedicação e uma enorme disponibilidade. Tornou todo o processo simples e sereno, e deixou-nos com a certeza de que podemos contar com ele no futuro."
    }
  ];

  const reasons = [
  {
    number: "1",
    title: "Soluções avançadas",
    description:
      "Garantimos acesso a soluções avançadas, fiáveis e eficazes, personalizadas para as suas reais necessidades.",
    icon: <Cpu className="w-7 h-7"/>
  },
  {
    number: "2",
    title: "Estudamos o mercado",
    description:
      "Analisamos as suas exigências e recomendamos a solução ideal, sempre com a qualidade e garantia das marcas que representamos.",
    icon: <Search className="w-7 h-7" />
  },
  {
    number: "3",
    title: "Soluções de excelência",
    description:
      "Escolher a Globalead significa optar por uma experiência personalizada com acesso às melhores soluções do mercado.",
    icon: <Star className="w-7 h-7" />
  },
  {
    number: "4",
    title: "Selo de confiança",
    description:
      "Representamos a qualidade, a inovação e a confiança que as empresas oferecem para garantir que recebe o melhor suporte.",
    icon: <ShieldCheck className="w-7 h-7" />
  },
];

  const objectives = [
    {
      number: "1",
      description: "Oferecer soluções personalizadas e integradas, adaptadas às necessidades específicas de cada cliente, com ênfase no setor imobiliário."
    },
    {
      number: "2",
      description: "Atuar como intermediária, comparando créditos, telecomunicações, energia e seguros para apresentar as melhores opções aos clientes."
    },
    {
      number: "3",
      description: "Simplificar e otimizar processos, oferecendo um acompanhamento personalizado, ágil, simples e gratuito."
    },
    {
      number: "4",
      description: "Garantir conforto, segurança e eficiência através de uma gestão rigorosa, apoiada por uma equipa especializada e empenhada em obter os melhores resultados para cada cliente."
    },
    {
      number: "5",
      description: "Estabelecer relações de confiança duradouras, fidelizando clientes através da qualidade do serviço, proximidade e transparência em todas as etapas do processo."
    },
    {
      number: "6",
      description: "Acompanhar o cliente em todas as etapas da sua jornada, desde o primeiro contacto até à conclusão do processo, proporcionando uma experiência simples e centralizada num único ponto de contacto."
    }
  ];

return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-900 to-[#79b2e9] text-white py-20 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          poster="/fotos/SobrePage-foto.png"
        >
          <source src="/videos/SobrePage-video(1).mp4" type="video/mp4" />
        </video>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Um pouco sobre nós
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Conheça a nossa história, valores e compromisso com a excelência
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              A Globalead destaca-se pela sua abordagem integrada e inovadora, atuando como
intermediária para oferecer soluções personalizadas que garantem conforto, segurança e
eficiência em todos os processos. Fundada para preencher uma lacuna no mercado, a empresa
é pioneira na gestão e acompanhamento de clientes em múltiplas áreas, colocando as
necessidades de cada um no centro das suas operações.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Com um portfólio abrangente, a Globalead especializa-se no mercado imobiliário,
complementado por serviços em seguros, créditos, alarmes, telecomunicações e energia. A
empresa combina uma abordagem moderna com experiência consolidada, posicionando-se
como referência no setor.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              A equipa é composta por profissionais altamente qualificados e comprometidos, que oferecem
um atendimento personalizado, baseado na inovação, criatividade e antecipação de
necessidades. A Globalead simplifica a experiência do cliente, proporcionando um
acompanhamento gratuito e centralizado desde o primeiro contacto até à conclusão dos
processos.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              Presente em todas as etapas da jornada do cliente, a Globalead eleva a experiência a um novo
patamar de conveniência e satisfação, inspirando recomendações e fortalecendo a sua
reputação como uma rede de intermediação e gestão de excelência.
            </p>
          </div>
        </div>
      </section>

      {/* Ajudamos a tomar decisões inteligentes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ajudamos a tomar decisões inteligentes
            </h2>
          </div>

          {/* 4 pontos lado a lado */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg text-center"
              >
                <div className="flex justify-center items-center mb-4">
                  <div className="bg-[#79b2e9] text-white w-14 h-14 rounded-full flex items-center justify-center">
                    {reason.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {reason.title}
                </h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FounderVideoSection />

      {/* Objetivos da Globalead */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quais os objetivos da Globalead Portugal?
            </h2>
          </div>

          {/* 2 colunas x 3 linhas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {objectives.map((objective, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl flex items-start"
              >
                <div className="bg-[#79b2e9] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  {objective.number}
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {objective.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                O que dizem os clientes sobre nós
              </h2>
            </div>

            {/* Centraliza a grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-whiterounded-xl shadow-lg w-full max-w-sm text-center flex flex-col justify-between"
                >
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <img src={testimonial.image} alt="testimonial" className=" rounded-xl w-full h-auto" />
                  </div>
                    <div className="p-6">
                    {/* estrelas */}
                    <div className="flex justify-center mb-3 sm:mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                        ))}
                      </div>
                    </div>

                    {/* review no centro */}
                    <div className="flex-grow flex items-center justify-center">
                      <p className="text-sm sm:text-base text-gray-600 italic">
                        "{testimonial.review}"
                      </p>
                    </div>

                    {/* nome + plataforma sempre no fundo */}
                    <div className="border-t pt-3 sm:pt-4 mt-4 sm:mt-6">
                      <p className="text-sm sm:text-base font-semibold text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Review: {testimonial.platform}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>





      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Tem dúvidas?
              </h2>
              <h2 className="text-3xl md:text-2xl mb-2">
                Entre em contacto
              </h2>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 w-full max-w-2xl">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Nome:"
                  required
                  className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <option value="Email">Email</option>
                  <option value="Telefone">Telefone</option>
                  <option value="WhatsApp">WhatsApp</option>
                </select>
                
                <select 
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Assunto:</option>
                  <option value="Esclarecimento de Dúvidas">Esclarecimento de Dúvidas</option>
                  <option value="Pretendo Comprar um Imóvel">Pretendo Comprar um Imóvel</option>
                  <option value="Pretendo Vender um Imóvel">Pretendo Vender um Imóvel</option>
                  <option value="Pretendo Arrendar um Imóvel">Pretendo Arrendar um Imóvel</option>
                  <option value="Pedido de Simulação para Créditos">Pedido de Simulação para Créditos</option>
                  <option value="Pedido de Certificado Energético">Pedido de Certificado Energético</option>
                  <option value="Pedido de Simulação Energia">Pedido de Simulação Energia</option>
                  <option value="Pedido de Simulação TV NET VOZ">Pedido de Simulação TV NET VOZ</option>
                  <option value="Pedido de Simulação Seguros">Pedido de Simulação Seguros</option>
                  <option value="Pedido de Simulação Alarmes">Pedido de Simulação Alarmes</option>
                </select>
                
                <select name="horário" value={formData.horario} onChange={handleInputChange} className="md:col-span-2 px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#79b2e9]">
                  <option value="">Horário</option>
                  <option>9h-12h30</option>
                  <option>12h30-16h</option>
                  <option>16h-19h30</option>
                </select>

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
                    className="w-full bg-[#0d2233] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#79b2e9] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Enviando...' : 'Entrar em contacto'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default SobrePage;
