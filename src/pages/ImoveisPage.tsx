import React, { useState, useEffect } from 'react';
import {
  Hammer, Palette, Building, Users, Compass, Scale, CreditCard,
  FileText, Shield, MapPin, Camera, Globe, Paintbrush,
  Share2, Tag, Video} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { sendEmail, FormData } from '../utils/emailService';
import FeaturedProperties from '../components/FeaturedProperties';

const ImoveisPage: React.FC = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<FormData>>({
    nome: '',
    apelido: '',
    telemovel: '',
    email: '',
    assunto: '',
    meio_contacto: '',
    horario: '',
    mensagem: '',
    page: 'imoveis'
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
      console.log('Dados do formulário Imóveis:', formData);
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
          page: 'imoveis'
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
    const fetchProperties = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .limit(12)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Erro ao carregar propriedades:', error);
          // Fallback data
          
        } 
      } catch (error) {
        console.error('Erro ao carregar propriedades:', error);
        
      }
      
    };

    const fetchSiteSettings = async () => {
      
    };

    fetchProperties();
    fetchSiteSettings();
  }, []);

  

  const services = [
    {
      icon: <Hammer className="h-12 w-12 text-[#0d2233]" />,
      title: "Obras e Remodelações",
      description: "Realizamos obras e remodelações de forma profissional, desde pequenas melhorias a renovações completas.",
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Palette className="h-12 w-12 text-[#0d2233]" />,
      title: "Design e Decoração",
      description: "Criamos ambientes funcionais e elegantes, acompanhando desde o planeamento até à escolha do mobiliário e decoração.",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Building className="h-12 w-12 text-[#0d2233]" />,
      title: "Promotora Imobiliária",
      description: "Desenvolvemos projetos imobiliários inovadores, com design, funcionalidade e elevado potencial de valorização.",
      image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Users className="h-12 w-12 text-[#0d2233]" />,
      title: "Relocation",
      description: "Apoiamos a sua mudança para Portugal com procura de imóvel, gestão documental e integração local.",
      image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Compass className="h-12 w-12 text-[#0d2233]" />,
      title: "Arquitetura",
      description: "Projetamos espaços intemporais e autênticos, que refletem identidade e resistem ao tempo.",
      image: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Scale className="h-12 w-12 text-[#0d2233]" />,
      title: "Apoio Jurídico",
      description: "Cuidamos de escrituras, documentos e representação fiscal, garantindo transparência em cada processo.",
      image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];


  const businessServices = [
    {
      icon: <CreditCard className="h-12 w-12 text-[#79b2e9]" />,
      title: "Crédito Habitação",
      description: "A Globalead é especializada em oferecer soluções de Crédito Habitação personalizadas, graças à sua relação privilegiada e poder negocial com as principais instituições bancárias em Portugal, garantindo as melhores opções para o seu agregado familiar.",
      link: "/credito"
    },
    {
      icon: <FileText className="h-12 w-12 text-[#79b2e9]" />,
      title: "Certificação Energética",
      description: "O desempenho energético de um imóvel é classificado de A+ a G e deve ser indicado através de um certificado energético, obrigatório na venda. Com a Globalead, tratamos de todo o processo, garantindo todas as condições para a venda do seu imóvel.",
      link: "/certificacao"
    },
    {
      icon: <Shield className="h-12 w-12 text-[#79b2e9]" />,
      title: "Seguros",
      description: "Um seguro é um contrato legal entre dois intervenientes e tem como objetivo fornecer proteção financeira ao segurado em caso de perdas ou danos. O segurado paga uma quantia e a seguradora fornece apoio financeiro conforme condições da apólice.",
      link: "/seguros"
    }
  ];

  const sellingSteps = [
  {
    text: "Apresentação do imóvel através de tours virtuais de alta qualidade, permitindo que potenciais compradores explorem a propriedade à distância.",
    icon: <Video className="h-12 w-12 text-[#79b2e9]" />
  },
  {
    text: "Promoção do imóvel em todas as plataformas sociais e digitais, com campanhas segmentadas e uma estratégia detalhada para maximizar a visibilidade.",
    icon: <Share2 className="h-12 w-12 text-[#79b2e9]" />
  },
  {
    text: "Reportagem de imagens e vídeos promocionais para destacar as melhores características do imóvel.",
    icon: <Camera className="h-12 w-12 text-[#79b2e9]" />
  },
  {
    text: "Publicação do imóvel nos principais portais imobiliários em Portugal e no estrangeiro, ampliando o alcance da sua oferta.",
    icon: <Globe className="h-12 w-12 text-[#79b2e9]" />
  },
  {
    text: "Divulgação em zonas estratégicas para alcançar um público local relevante.",
    icon: <MapPin className="h-12 w-12 text-[#79b2e9]" />
  },
  {
    text: "Colocação de sinalética no local do imóvel para atrair potenciais compradores na área.",
    icon: <Tag className="h-12 w-12 text-[#79b2e9]" />
  },
  {
    text: "Divulgação direcionada a uma carteira exclusiva de clientes qualificados e a grupos privados da Globalead Portugal.",
    icon: <Users className="h-12 w-12 text-[#79b2e9]" />
  },
  {
    text: "Especialistas em decoração de interiores transformam o imóvel, destacando o seu potencial e alinhando-o às tendências e expectativas dos compradores.",
    icon: <Paintbrush className="h-12 w-12 text-[#79b2e9]" />
  }
];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-900 to-[#79b2e9] text-white py-20 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          poster="/fotos/ImoveisPage-foto.png"
        >
          <source src="https://dzkxlimlbabjstaivuja.supabase.co/storage/v1/object/public/imagens/videos/video4.mp4" type="video/mp4" />
        </video>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              O lugar a que<br />chamamos casa
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto">
              Vamos criar uma relação próxima e escutar com atenção todos os seus desejos e as suas expectativas e garantir sempre que está acompanhado, e que estamos consigo sempre
            </p>
          </div>
        </div>
        
      </section>

      {/* Featured Properties */}
      <FeaturedProperties />

      {/* Business Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              O melhor negócio para o seu imóvel começa aqui
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businessServices.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 text-sm">
                  {service.description}
                </p>
                
                  <button
                    onClick={() => navigate(service.link)} 
                  >
                  <div className="w-full bg-[#79b2e9] text-white py-2 px-12 rounded-lg hover:bg-[#0d2233] transition-colors text-center">
                    Saber mais
                  </div>
                  </button>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exemplo de foto na vertical */}
      {/* Exemplo de foto na vertical */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            
            {/* Foto ou Vídeo Vertical */}
            <div className="flex justify-center">
              <video
                className="rounded-2xl shadow-lg object-cover"
                style={{ aspectRatio: "9/16", width: "100%", maxWidth: "350px" }}
                autoPlay
                loop
                muted
                playsInline
                poster="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
              >
                <source src="https://dzkxlimlbabjstaivuja.supabase.co/storage/v1/object/public/imagens/videos/video4.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Texto */}
            <div className="flex flex-col mt-20">
              <div className="mb-6 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  <a
                    href="/sobre" // alterar rota
                    className="hover:underline cursor-pointer"
                  >
                    Carlos Gonçalves
                  </a>
                </h2>
                <h3 className="text-xl text-[#79b2e9] font-medium">
                  A confiança constrói o amanhã
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                Sou um profissional apaixonado pelo setor imobiliário, com foco em
                ajudar famílias e investidores a encontrar o imóvel perfeito.
                Acredito que cada propriedade tem uma história para contar e um
                potencial único para transformar vidas. Com anos de experiência no
                mercado, valorizo a transparência, a confiança e o acompanhamento
                próximo em cada etapa do processo. Para mim, o sucesso não é apenas
                fechar negócios, mas sim construir relações duradouras. Se procura
                orientação, apoio e alguém que trate o seu projeto como único, estou
                pronto para fazer parte desta jornada ao seu lado, garantindo que o
                futuro da sua casa comece com segurança e visão.
              </p>
            </div>


          </div>
        </div>
      </section>




      {/* Selling Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simplificamos a venda do seu imóvel
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sellingSteps.map((step, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl flex items-start">
                <div className=" text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  {step.icon}
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              A burocracia é nossa, o futuro é seu
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                {/* Imagem apenas no desktop */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="hidden md:block w-full h-48 object-cover"
                />

                <div className="p-6 flex flex-col flex-grow">
                  {/* Ícone sempre visível */}
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-14 h-14 text-white rounded-xl">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 ml-3">
                      {service.title}
                    </h3>
                  </div>

                  {/* Texto curto no mobile, completo no desktop */}
                  <p className="text-gray-600 mb-6 line-clamp-3 md:line-clamp-none">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Contact Form */}
      {/* Contact Form */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Venda o seu imóvel de forma rápida, segura e sem complicações!
            </h2>
          </div>

          <div className="bg-white p-8 rounded-xl">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nome e Apelido */}
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

              {/* Telemóvel e Email */}
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

              {/* Pretendo */}
              <select
                name="assunto"
                value={formData.assunto}
                onChange={handleInputChange}
                className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Pretendo:</option>
                <option>Vender</option>
                <option>Arrendar</option>
                <option>Comprar</option>
                <option>Construir</option>
              </select>

              {/* Distrito */}
              <select
                name="distrito"
                value={formData.distrito}
                onChange={handleInputChange}
                className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Distrito:</option>
                <option>Aveiro</option>
                <option>Beja</option>
                <option>Braga</option>
                <option>Bragança</option>
                <option>Castelo Branco</option>
                <option>Coimbra</option>
                <option>Évora</option>
                <option>Faro</option>
                <option>Guarda</option>
                <option>Leiria</option>
                <option>Lisboa</option>
                <option>Portalegre</option>
                <option>Porto</option>
                <option>Santarém</option>
                <option>Setúbal</option>
                <option>Viana do Castelo</option>
                <option>Vila Real</option>
                <option>Viseu</option>
                <option>Ilhas</option>
              </select>

              {/* Código Postal */}
              <input
                type="text"
                name="cod_postal"
                value={formData.cod_postal}
                onChange={handleInputChange}
                placeholder="Código Postal:"
                className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Tipo de Imóvel */}
              <select
                name="escolha_imovel"
                value={formData.escolha_imovel}
                onChange={handleInputChange}
                className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Tipo de Imóvel:</option>
                <option>Apartamento</option>
                <option>Moradia</option>
                <option>Quinta</option>
                <option>Terreno</option>
                <option>Prédio</option>
                <option>Loja</option>
                <option>Armazém</option>
                <option>Escritório</option>
                <option>Garagem</option>
                <option>Outros</option>
              </select>

              {/* Preço Máximo */}
              <input
                type="number"
                name="preço"
                value={formData.preço}
                onChange={handleInputChange}
                placeholder="Preço Máx (€):"
                className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Área Mínima */}
              <input
                type="number"
                name="area_min"
                value={formData.area_min}
                onChange={handleInputChange}
                placeholder="Área Mínima (m²):"
                className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Quartos */}
              <select
                name="num_quartos"
                value={formData.num_quartos}
                onChange={handleInputChange}
                className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Nº de Quartos:</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4+</option>
              </select>

              {/* Casas de Banho */}
              <select
                name="num_casas_banho"
                value={formData.num_casas_banho}
                onChange={handleInputChange}
                className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Nº de Casas de Banho:</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4+</option>
              </select>

              {/* Meio de Contacto */}
              <select
                name="meio_contacto"
                value={formData.meio_contacto}
                onChange={handleInputChange}
                className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Meio de Contacto:</option>
                <option>Telefone</option>
                <option>WhatsApp</option>
                <option>Email</option>
              </select>

              {/* Horário de Contacto */}
              <select name="horário" value={formData.horario} onChange={handleInputChange} className="px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#79b2e9]">
                  <option value="">Horário</option>
                  <option>9h-12h30</option>
                  <option>12h30-16h</option>
                  <option>16h-19h30</option>
              </select>

              {/* Mensagem */}
              <textarea
                name="mensagem"
                value={formData.mensagem}
                onChange={handleInputChange}
                placeholder="Mensagem (opcional):"
                rows={3}
                className="md:col-span-2 px-4 py-3 border border-[#79b2e9] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Checkbox Termos */}
              <div className="md:col-span-2">
                <label className="flex items-start text-sm text-gray-700 mb-4">
                  <input type="checkbox" className="mt-1 mr-2" required />
                  Sim, aceito os termos e condições indicados pela Globalead Portugal.
                </label>
                <p className="text-xs text-gray-600 mb-6">
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
      </section>


    </div>
  );
};

export default ImoveisPage;