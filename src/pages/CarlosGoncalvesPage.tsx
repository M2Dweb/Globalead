import React from 'react';
import { useSpring, animated, config, useTrail } from '@react-spring/web';
import { Award, Users, TrendingUp, MapPin, Phone, Mail, Star, Building, Compass, Hammer, Palette, Scale, Camera, Globe, Paintbrush, Share2, Tag, Video, Euro } from 'lucide-react';
import AnimatedSectionSpring from '../components/Parallax/AnimatedSectionSpring';
import ParallaxPhotoSection from '../components/Parallax/ParallaxPhotoSection';
import ParallaxTestimonials from '../components/Parallax/ParallaxTestimonials';
import FounderVideoSection from '../components/FounderVideoSection';
import PropertyValuationForm from '../components/PropertyValuationForm';
import Footer from '../components/Footer';



const CarlosGoncalvesPage: React.FC = () => {
  const achievements = [
    {
      icon: <Award className="h-8 w-8 text-[#0d2233]" />,
      number: "15+",
      label: "Anos de Experiência",
      description: "No mercado imobiliário e energético"
    },
    {
      icon: <Users className="h-8 w-8 text-[#0d2233]" />,
      number: "5000+",
      label: "Clientes Satisfeitos",
      description: "Famílias e empresas servidas"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-[#0d2233]" />,
      number: "€50M+",
      label: "Volume de Negócios",
      description: "Em transações realizadas"
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      number: "4.9",
      label: "Avaliação Média",
      description: "Baseada em reviews de clientes"
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
    
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Cliente Residencial",
      content: "O Carlos ajudou-nos a encontrar a casa dos nossos sonhos e ainda conseguiu negociar um excelente preço. Profissionalismo exemplar!",
      rating: 5
    },
    {
      name: "João Santos",
      role: "Empresário",
      content: "Graças ao Carlos, conseguimos reduzir significativamente os custos energéticos da nossa empresa. Recomendo vivamente!",
      rating: 5
    },
    {
      name: "Ana Costa",
      role: "Proprietária",
      content: "Vendeu o meu apartamento em tempo recorde e pelo melhor preço do mercado. Excelente acompanhamento durante todo o processo.",
      rating: 5
    }
  ];

  // Trail animation for achievements
  const achievementTrail = useTrail(achievements.length, {
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: config.gentle,
  });

  // Hero text animation
  const heroTextSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay: 200,
    config: config.gentle,
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Full Screen Parallax Header */}
      <section className="relative h-screen overflow-hidden">
        {/* Fixed Background Image */}
        <div 
          className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(13, 34, 51, 0.4), rgba(13, 34, 51, 0.6)), url('/carlos-goncalves-hero.png')`,
            backgroundAttachment: 'fixed'
          }}
        />
        
        {/* Overlay Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl mx-auto">
            <animated.div style={heroTextSpring}>
              <div className="mb-8">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight tracking-tight">
                  Carlos Gonçalves
                </h1>
                <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
                <p className="text-xl md:text-2xl font-light mb-6 text-blue-100">
                  Especialista em Mercado Imobiliário e Energético
                </p>
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                  15+ anos de experiência ajudando famílias e empresas
                </p>
              </div>
              
              
        
            </animated.div>
          </div>
        </div>
        {/* Scroll Indicator */}
        <div className="relative z-10 h-full flex items-right j"></div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        
      </section>

      {/* About Section */}
      <AnimatedSectionSpring>
        <section className="relative py-20 bg-white z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  A Visão por Trás da Globalead
                </h2>
                <div className="space-y-6 text-lg text-gray-600">
                  <p>
                    Com mais de 15 anos de experiência no mercado imobiliário e energético, 
                    Carlos Gonçalves fundou a Globalead Portugal com uma missão clara: 
                    democratizar o acesso a soluções energéticas eficientes e facilitar 
                    o processo de compra e venda de imóveis.
                  </p>
                  <p>
                    A sua paixão pela inovação e pelo atendimento personalizado transformou 
                    a Globalead numa referência no setor, ajudando milhares de famílias e 
                    empresas a alcançar os seus objetivos.
                  </p>
                  <p>
                    "Acredito que cada cliente merece uma solução única, adaptada às suas 
                    necessidades específicas. É essa filosofia que nos diferencia no mercado."
                  </p>
                </div>
                
                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="flex items-center text-[#0d2233]">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>Porto, Portugal</span>
                  </div>
                  <div className="flex items-center text-[#0d2233]">
                    <Phone className="h-5 w-5 mr-2" />
                    <span>+351 915 482 365</span>
                  </div>
                  <div className="flex items-center text-[#0d2233]">
                    <Mail className="h-5 w-5 mr-2" />
                    <span>geral@globalead.pt</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                {/* Placeholder for main professional photo */}
                <div className="relative bg-gray-200 rounded-2xl overflow-hidden shadow-xl aspect-[3/4]">
                  <img
                    src="/carlos-goncalves-hero.png"
                    alt="Placeholder para foto principal do Carlos Gonçalves"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* Photo indicator */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center text-[#0d2233]">
                        <Award className="h-5 w-5 mr-2" />
                        <span className="font-medium">Foto Principal - Carlos Gonçalves</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#0d2233] rounded-full opacity-10"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-200 rounded-full opacity-20"></div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSectionSpring>
      
      {/* Achievements Section */}
      <AnimatedSectionSpring>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Resultados que Falam por Si
              </h2>
              <p className="text-xl text-gray-600">
                Números que refletem o compromisso com a excelência
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievementTrail.map((style, index) => (
                <animated.div
                  key={index}
                  style={style}
                  className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="mb-4 flex justify-center">
                    {achievements[index].icon}
                  </div>
                  <div className="text-3xl font-bold text-[#0d2233] mb-2">
                    {achievements[index].number}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">
                    {achievements[index].label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {achievements[index].description}
                  </div>
                </animated.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSectionSpring>
      
      <AnimatedSectionSpring>
        <FounderVideoSection />
      </AnimatedSectionSpring>
      {/* Selling Process Section */}
      <AnimatedSectionSpring>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
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
      </AnimatedSectionSpring>

      <AnimatedSectionSpring>
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
      </AnimatedSectionSpring>

      {/* Photo Gallery Section */}
      <AnimatedSectionSpring>
        <ParallaxPhotoSection 
          title="Galeria Profissional" 
          subtitle="Espaços dedicados para as diferentes fotografias profissionais do Carlos Gonçalves"
        />
      </AnimatedSectionSpring>

      {/* Testimonials Section */}
      <ParallaxTestimonials testimonials={testimonials} />



      {/* Property Valuation Section */}
      <AnimatedSectionSpring>
        <section className="bg-white">
          <PropertyValuationForm />
        </section>
      </AnimatedSectionSpring>

      <AnimatedSectionSpring>
        <Footer />
      </AnimatedSectionSpring>
    </div>

  );
};

export default CarlosGoncalvesPage;


