import React, { useState } from 'react';
import { Star, Cpu, Search, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TeamSection from '../components/TeamSection';
import GoogleReviews from '../components/GoogleReviews';
import goncalo from "../../public/testemonials/goncalo-vinhas.jpg"
import fml from "../../public/testemonials/familia-gomes.jpg"
import franc from "../../public/testemonials/francisco-gonçalves.jpg"

const SobrePage: React.FC = () => {
  const { t } = useTranslation();

  const [expandedTestimonials, setExpandedTestimonials] = useState<boolean[]>([false, false, false, false, false, false]); // controlar "ler mais" por testimonial

  const testimonials = [
    {
      name: "Gonçalo Vinhas",
      image: goncalo ,
      platform: "WhatsApp",
      review: t('testemunhos.goncalo')
    },
    {
      name: "Francisco Gonçalves",
      image: franc ,
      platform: "Facebook",
      review: t('testemunhos.francisco')
    },
    {
      name: "Família Gomes",
      image: fml ,
      platform: "Google",
      review: t('testemunhos.familiaGomes')
    },
    {
      name: "Liliana da Silva",
      image: "/testemonials/liliana.jpg",
      platform: "Instagram",
      review: t('testemunhos.liliana')
    },
    {
      name: "Wneres & Daiane",
      image: "/testemonials/Wneres.jpg",
      platform: "WhatsApp",
      review: t('testemunhos.wneres')
    },
    {
      name: "Ana Fernandes",
      image: "/testemonials/Ana.jpg",
      platform: "Facebook",
      review: t('testemunhos.ana')
    }
  ];

  const toggleExpand = (index: number) => {
    setExpandedTestimonials(prev => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  const aboutParagraphs = [1, 2, 3, 4, 5, 6].map((n) => t(`sobre.p${n}`));

  const reasons = [
    { number: "1", title: t('sobre.razao1Titulo'), description: t('sobre.razao1Texto'), icon: <Cpu className="w-7 h-7"/> },
    { number: "2", title: t('sobre.razao2Titulo'), description: t('sobre.razao2Texto'), icon: <Search className="w-7 h-7" /> },
    { number: "3", title: t('sobre.razao3Titulo'), description: t('sobre.razao3Texto'), icon: <Star className="w-7 h-7" /> },
    { number: "4", title: t('sobre.razao4Titulo'), description: t('sobre.razao4Texto'), icon: <ShieldCheck className="w-7 h-7" /> },
  ];

  const objectives = [
    { number: "1", description: t('sobre.objetivo1') },
    { number: "2", description: t('sobre.objetivo2') },
    { number: "3", description: t('sobre.objetivo3') },
    { number: "4", description: t('sobre.objetivo4') },
    { number: "5", description: t('sobre.objetivo5') },
    { number: "6", description: t('sobre.objetivo6') }
  ];

return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner baixo — começa por baixo do cabeçalho, que é fixo */}
      <section className="pt-[72px]">
        <div className="relative h-[260px] md:h-[300px] bg-gradient-to-br from-blue-900 to-[#79b2e9] text-white flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          {/* As caras estão na metade de cima do vídeo: o enquadramento sobe para as manter à vista */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            style={{ objectPosition: 'center 15%' }}
            poster="/fotos/SobrePage-foto.png"
          >
            <source src="/videos/SobrePage-video(1).mp4" type="video/mp4" />
          </video>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-3">
              {t('sobre.heroTitulo')}
            </h1>
            <p className="text-base md:text-xl text-blue-100 max-w-3xl mx-auto">
              {t('sobre.heroTexto')}
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {aboutParagraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Ajudamos a tomar decisões inteligentes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('sobre.razoesTitulo')}
            </h2>
          </div>

          {/* 4 pontos lado a lado */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="hover-card-effect text-center"
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

      {/* Quem é o Carlos Gonçalves? */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <img
                className="rounded-2xl shadow-lg object-cover"
                style={{ aspectRatio: "9/16", width: "100%", maxWidth: "350px" }}
                src="/carlos/sentado-sorrir2.jpg"
                alt="Carlos Gonçalves"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="flex flex-col">
              <div className="mb-6 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {t('sobre.carlos.titulo')}
                </h2>
                <h3 className="text-xl text-[#79b2e9] font-medium">
                  {t('sobre.carlos.lema')}
                </h3>
              </div>

              {(['p1', 'p2', 'p3'] as const).map((key) => (
                <p key={key} className="text-gray-700 leading-relaxed text-lg mb-6">
                  {t(`sobre.carlos.${key}`)}
                </p>
              ))}

              <div className="flex justify-center md:justify-start mt-2">
                <Link
                  to="/carlos-goncalves"
                  className="bg-white text-[#0d2233] border border-[#0d2233] py-3 px-12 rounded-lg hover:bg-[#79b2e9] hover:text-white hover:border-[#79b2e9] transition-colors font-medium"
                >
                  {t('sobre.carlos.botao')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A nossa equipa */}
      <TeamSection />

      {/* Objetivos da Globalead */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('sobre.objetivosTitulo')}
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
              {t('testemunhos.titulo')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => {
              const words = testimonial.review.split(' ');
              const isExpanded = expandedTestimonials[index];
              const maxWords = 35;
              const displayText = isExpanded || words.length <= maxWords
                ? testimonial.review
                : words.slice(0, maxWords).join(' ') + '...';

              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg w-full text-center flex flex-col justify-between overflow-hidden border border-gray-100"
                >
                  <div className="flex justify-center">
                    <img src={testimonial.image} alt="testimonial" className="w-full h-64 object-cover" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-center mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-current" />
                        ))}
                      </div>
                    </div>

                    <div className="flex-grow flex items-center justify-center mb-4">
                      <p className="text-gray-600 italic">
                        "{displayText}"
                        {words.length > maxWords && !isExpanded && (
                          <span
                            className="ml-1 font-bold text-[#79b2e9] cursor-pointer"
                            onClick={() => toggleExpand(index)}
                          >
                            {t('testemunhos.lerMais')}
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="border-t pt-4 mt-6">
                      <p className="font-semibold text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t('testemunhos.review', { plataforma: testimonial.platform })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Avaliações Google */}
      <div className="pb-16">
        <GoogleReviews />
      </div>
    </div>
  );
};

export default SobrePage;
