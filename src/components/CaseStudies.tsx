import React, { useState } from 'react';
import { ArrowRight, Calendar, MapPin, TrendingUp, Users, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LazyImage from './LazyImage';

const CaseStudies: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);

  const caseStudies = [
    {
      id: 1,
      title: "Venda Recorde em 15 Dias - Moradia T4 no Porto",
      client: "Família Santos",
      location: "Cedofeita, Porto",
      duration: "15 dias",
      value: "€520,000",
      challenge: "Venda urgente devido a mudança profissional para o estrangeiro",
      solution: "Estratégia de marketing intensiva com tours virtuais, campanha digital segmentada e rede de contactos exclusiva",
      results: [
        "Vendido 8% acima do preço inicial",
        "15 visitas em 3 dias",
        "3 propostas competitivas",
        "Cliente poupou €15,000 em comissões"
      ],
      image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600",
      testimonial: "A Globalead superou todas as expectativas. Conseguiram vender a nossa casa em tempo recorde e ainda por um valor superior ao esperado!",
      category: "Imóveis"
    },
    {
      id: 2,
      title: "Poupança de 45% em Seguros Empresariais",
      client: "TechStart Lda",
      location: "Lisboa",
      duration: "7 dias",
      value: "€12,000/ano poupados",
      challenge: "Empresa em crescimento com seguros desajustados e custos elevados",
      solution: "Análise completa de riscos, negociação com 8 seguradoras e pacote personalizado",
      results: [
        "45% de poupança anual",
        "Cobertura 30% mais abrangente",
        "Gestão centralizada de apólices",
        "Suporte 24/7 incluído"
      ],
      image: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=600",
      testimonial: "Incrível como conseguiram reduzir os nossos custos mantendo uma cobertura ainda melhor. Profissionalismo exemplar!",
      category: "Seguros"
    },
    {
      id: 3,
      title: "Sistema de Alarme Completo - Condomínio Privado",
      client: "Condomínio Green Valley",
      location: "Cascais",
      duration: "30 dias",
      value: "€85,000",
      challenge: "Segurança insuficiente em condomínio de luxo com 24 moradias",
      solution: "Sistema integrado com câmaras 4K, sensores perimetrais e central de monitorização 24h",
      results: [
        "0 incidentes desde instalação",
        "Valorização de 8% dos imóveis",
        "Satisfação 100% dos condóminos",
        "Tempo resposta < 3 minutos"
      ],
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600",
      testimonial: "Sentimo-nos completamente seguros. O sistema é discreto, eficaz e o suporte técnico é excecional.",
      category: "Alarmes"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Casos de Sucesso
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra como ajudámos os nossos clientes a alcançar resultados extraordinários
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {caseStudies.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100"
              onClick={() => setSelectedCase(caseStudy.id)}
            >
              <LazyImage
                src={caseStudy.image}
                alt={caseStudy.title}
                className="w-full h-48"
              />
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {caseStudy.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {caseStudy.duration}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {caseStudy.title}
                </h3>
                
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  {caseStudy.location}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-green-600">
                    {caseStudy.value}
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 transition-colors">
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Case Study Modal */}
        <AnimatePresence>
          {selectedCase && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedCase(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {caseStudies
                  .filter(cs => cs.id === selectedCase)
                  .map(caseStudy => (
                    <div key={caseStudy.id}>
                      <div className="relative">
                        <LazyImage
                          src={caseStudy.image}
                          alt={caseStudy.title}
                          className="w-full h-64"
                        />
                        <button
                          onClick={() => setSelectedCase(null)}
                          className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                      
                      <div className="p-8">
                        <div className="flex items-center justify-between mb-6">
                          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
                            {caseStudy.category}
                          </span>
                          <div className="text-3xl font-bold text-green-600">
                            {caseStudy.value}
                          </div>
                        </div>
                        
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                          {caseStudy.title}
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                          <div className="flex items-center">
                            <Users className="h-5 w-5 text-blue-600 mr-2" />
                            <div>
                              <div className="font-medium">Cliente</div>
                              <div className="text-gray-600">{caseStudy.client}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                            <div>
                              <div className="font-medium">Localização</div>
                              <div className="text-gray-600">{caseStudy.location}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 text-blue-600 mr-2" />
                            <div>
                              <div className="font-medium">Duração</div>
                              <div className="text-gray-600">{caseStudy.duration}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Desafio</h3>
                            <p className="text-gray-600">{caseStudy.challenge}</p>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Solução</h3>
                            <p className="text-gray-600">{caseStudy.solution}</p>
                          </div>
                        </div>
                        
                        <div className="mb-8">
                          <h3 className="text-xl font-bold text-gray-900 mb-4">Resultados</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {caseStudy.results.map((result, index) => (
                              <div key={index} className="flex items-center">
                                <TrendingUp className="h-5 w-5 text-green-600 mr-3" />
                                <span className="text-gray-700">{result}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-6 rounded-lg">
                          <h3 className="text-lg font-bold text-gray-900 mb-3">Testemunho do Cliente</h3>
                          <p className="text-gray-700 italic">"{caseStudy.testimonial}"</p>
                          <p className="text-blue-600 font-medium mt-2">- {caseStudy.client}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CaseStudies;