import React from 'react';
import { useSpring, animated, config, useTrail } from '@react-spring/web';
import { Award, Users, TrendingUp, MapPin, Phone, Mail, Star } from 'lucide-react';
import AnimatedSectionSpring from '../components/Parallax/AnimatedSectionSpring';
import ParallaxHeaderSpring from '../components/Parallax/ParallaxHeaderSpring';
import ParallaxPhotoSection from '../components/Parallax/ParallaxPhotoSection';
import ParallaxTestimonials from '../components/Parallax/ParallaxTestimonials';


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
      {/* Parallax Header */}
      <ParallaxHeaderSpring 
        backgroundImage="/globalead-logo-background.png"
        foregroundImageSrc="/carlos-goncalves-hero.png"
        foregroundImageAlt="Carlos Gonçalves - CEO da Globalead Portugal"
        height="90vh"
      >
        <div className="text-left text-white px-4">
          <animated.div style={heroTextSpring}>
            <p className="text-blue-200 font-medium mb-2 text-lg">
              Fundador & CEO
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Carlos Gonçalves
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-6 max-w-xl">
              Especialista em Mercado Imobiliário e Energético
            </p>
            <p className="text-base md:text-lg text-gray-200 max-w-lg leading-relaxed">
              Mais de 15 anos de experiência ajudando famílias e empresas a alcançar os seus objetivos no mercado imobiliário e energético.
            </p>
          </animated.div>
        </div>
      </ParallaxHeaderSpring>

      {/* About Section */}
      <AnimatedSectionSpring>
        <section className="py-20 bg-gray-50">
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
                    <span>Lisboa, Portugal</span>
                  </div>
                  <div className="flex items-center text-[#0d2233]">
                    <Phone className="h-5 w-5 mr-2" />
                    <span>+351 915 482 365</span>
                  </div>
                  <div className="flex items-center text-[#0d2233]">
                    <Mail className="h-5 w-5 mr-2" />
                    <span>carlos@globalead.pt</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                {/* Placeholder for main professional photo */}
                <div className="relative bg-gray-200 rounded-2xl overflow-hidden shadow-xl aspect-[3/4]">
                  <img
                    src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop"
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

      {/* Photo Gallery Section */}
      <AnimatedSectionSpring>
        <ParallaxPhotoSection 
          title="Galeria Profissional" 
          subtitle="Espaços dedicados para as diferentes fotografias profissionais do Carlos Gonçalves"
        />
      </AnimatedSectionSpring>

      {/* Testimonials Section */}
      <ParallaxTestimonials testimonials={testimonials} />

      {/* Contact CTA Section */}
      <AnimatedSectionSpring>
        <section className="py-20 bg-[#0d2233] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para Começar o Seu Projeto?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Entre em contacto direto com Carlos Gonçalves para uma consulta personalizada
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#0d2233] px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300 flex items-center justify-center">
                <Phone className="h-5 w-5 mr-2" />
                Ligar Agora
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#0d2233] transition-colors duration-300 flex items-center justify-center">
                <Mail className="h-5 w-5 mr-2" />
                Enviar Email
              </button>
            </div>
          </div>
        </section>
      </AnimatedSectionSpring>
    </div>
  );
};

export default CarlosGoncalvesPage;
