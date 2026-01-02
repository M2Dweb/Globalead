import React from 'react';
import { useSpring, animated, config, useTrail } from '@react-spring/web';
import { Award, Users, TrendingUp, MapPin, Star, Building, Compass, Hammer, Palette, Scale, Camera, Globe, Paintbrush, Share2, Tag, Video, Search } from 'lucide-react';
import AnimatedSectionSpring from '../components/Parallax/AnimatedSectionSpring';
import FounderVideoSection from '../components/FounderVideoSection';
import PropertyValuationForm from '../components/PropertyValuationForm';
import PropertyBuyForm from '../components/PropertyBuyForm';
import Footer from '../components/Footer';

const CarlosGoncalvesPage: React.FC = () => {
  const achievements = [
    {
      icon: <Award className="h-8 w-8 text-[#0d2233]" />,
      number: "10+",
      label: "Anos de Experiência",
      description: "No mercado imobiliário e energético"
    },
    {
      icon: <Users className="h-8 w-8 text-[#0d2233]" />,
      number: "500+",
      label: "Clientes Satisfeitos",
      description: "Famílias e empresas servidas"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-[#0d2233]" />,
      number: "€2M+",
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
    
  const testimonials = [
    {
      name: "Daniel Gomes",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      platform: "Facebook",
      review: "Estou extremamente satisfeito com a experiência que tive. Foram bastante profissionais e prestaram um serviço de excelência. Todo o processo de compra e venda da minha casa foi tranquilo e cumpriram com todos os prazos que me apresentaram na reunião inicial. Recomendo a Globalead."
    },
    {
      name: "Pedro Tavares",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      platform: "Google",
      review: "Consegui vender o meu imóvel em menos de 1 mês e adquirir a minha moradia de sonho com a ajuda da Globalead. Um atendimento de excelência, com atenção aos detalhes e as minhas necessidades, os imóveis apresentados, enquadravam-se naquilo que procurava. Já recomendei!"
    },
    {
      name: "Ana Torres",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      platform: "Livro de Elogios",
      review: "Valorizo a clareza na forma como a Globalead me apresentou todas as soluções de seguros para a minha viatura. As informações sobre a cobertura e os detalhes da apólice foram apresentadas de maneira compreensível, o que facilitou a tomar uma decisão informada. Fui acompanhada desde o primeiro minuto."
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
          className="fixed inset-0 w-full h-full bg-stretch bg-center  bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(13, 34, 51, 0.4), rgba(13, 34, 51, 0.6)), url('/carlos/sentado-tele-h.jpg')`,
            backgroundAttachment: 'fixed'
          }}
        />
        
        {/* Overlay Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl mx-auto">
            <animated.div style={heroTextSpring}>
              <div className="mb-8">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight tracking-tight">
                  Quem é o Carlos Gonçalves?
                </h1>
                <div className="w-16 sm:w-20 md:w-24 h-1 bg-white mx-auto mb-4 sm:mb-6"></div>
                <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                  +10 anos de experiencia na area comercial
                </p>
              </div>
            </animated.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AnimatedSectionSpring>
        <section className="relative py-16 sm:py-20 bg-white z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                  A Visão por Trás da Globalead
                </h2>
                <div className="space-y-4 sm:space-y-6 text-base mt-12 sm:text-lg text-gray-600">
                  <p>
                    Olá, o meu nome é Carlos Gonçalves e sou o CEO da Globalead Portugal. Aos 19
anos iniciei o meu percurso no setor comercial, onde tive a oportunidade de aprender, crescer e
consolidar competências necessárias para atuar em diversas areas e perceber o que realmente
move as pessoas. 
 <p></p>Durante quase uma década estive ligado a diferentes setores que hoje servem
de alicerce à Globalead Portugal.<p></p> A minha missão sempre foi ajudar os clientes a encontrarem
soluções reais para as suas necessidades. <p></p>Acredito que, ao tomar decisões sobre serviços
importantes é essencial contar com o apoio de um profissional especializado permitindo
encontrar as melhores soluções, poupando tempo e dinheiro. <p></p>Serei a ponte principal entre as
marcas e o consumidor e estarei disponivel para o ajudar em qualquer ocasião.
                  </p>
                </div>
                
                
              </div>

              <div className="relative">
                {/* Placeholder for main professional photo */}
                <div className="relative bg-gray-200 rounded-2xl overflow-hidden shadow-xl aspect-[3/4]">
                  <img
                    src="/carlos/pe-fato-serio.jpg"
                    alt="Carlos Gonçalves"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-[#0d2233] rounded-full opacity-10"></div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 sm:w-32 sm:h-32 bg-blue-200 rounded-full opacity-20"></div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSectionSpring>
      
      {/* Achievements Section */}
      <AnimatedSectionSpring>
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Resultados que Falam por Si
              </h2>
              <p className="text-lg sm:text-xl text-gray-600">
                Números que refletem o compromisso com a excelência
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {achievementTrail.map((style, index) => (
                <animated.div
                  key={index}
                  style={style}
                  className="text-center p-4 sm:p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="mb-3 sm:mb-4 flex justify-center">
                    {achievements[index].icon}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#0d2233] mb-1 sm:mb-2">
                    {achievements[index].number}
                  </div>
                  <div className="text-sm sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                    {achievements[index].label}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
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

      {/* Property Buy Form Section */}
      <AnimatedSectionSpring>
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="text-center mb-8 sm:mb-12">
                  <div className="flex justify-center mb-4 sm:mb-6">
                    <div className="bg-[#79b2e9] p-3 sm:p-4 rounded-full">
                      <Search className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                    Encontre o seu imóvel ideal
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                    Diga-nos o que procura e encontraremos as melhores opções para si
                  </p>
                </div>
          <PropertyBuyForm />
        </section>
      </AnimatedSectionSpring>

      {/* Selling Process Section */}
      <AnimatedSectionSpring>
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Simplificamos a venda do seu imóvel
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {sellingSteps.map((step, index) => (
                <div key={index} className="bg-gray-50 p-4 sm:p-6 rounded-xl flex items-start">
                  <div className="text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold mr-3 sm:mr-4 flex-shrink-0">
                    {step.icon}
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
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
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                A burocracia é nossa, o futuro é seu
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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

                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    {/* Ícone sempre visível */}
                    <div className="flex items-center mb-3 sm:mb-4">
                      <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 text-white rounded-xl">
                        {service.icon}
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 ml-3">
                        {service.title}
                      </h3>
                    </div>

                    {/* Texto curto no mobile, completo no desktop */}
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 line-clamp-3 md:line-clamp-none">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSectionSpring>

      {/* Testimonials */}
      <AnimatedSectionSpring>
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
      </AnimatedSectionSpring>

    

      

      {/* Property Valuation Section */}
      <AnimatedSectionSpring>
        <section id="avaliacao-imovel" className="py-16 sm:py-20 bg-white">
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