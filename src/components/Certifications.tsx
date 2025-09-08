import React from 'react';
import { Award, Shield, CheckCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Certifications: React.FC = () => {
  const certifications = [
    {
      title: "AMI - Associação de Mediadores Imobiliários",
      number: "AMI 12345",
      description: "Licença oficial para mediação imobiliária em Portugal",
      icon: <Award className="h-8 w-8 text-[#0d2233]" />,
      verified: true
    },
    {
      title: "ASF - Autoridade de Supervisão de Seguros",
      number: "ASF 67890",
      description: "Autorização para mediação de seguros nos ramos Vida e Não Vida",
      icon: <Shield className="h-8 w-8 text-green-600" />,
      verified: true
    },
    {
      title: "ERSE - Entidade Reguladora dos Serviços Energéticos",
      number: "ERSE 54321",
      description: "Licença para comercialização de energia elétrica e gás natural",
      icon: <CheckCircle className="h-8 w-8 text-yellow-600" />,
      verified: true
    },
    {
      title: "ISO 9001:2015",
      number: "Certificação de Qualidade",
      description: "Sistema de gestão da qualidade certificado internacionalmente",
      icon: <Star className="h-8 w-8 text-purple-600" />,
      verified: true
    }
  ];

  const awards = [
    {
      year: "2024",
      title: "Melhor Mediadora Imobiliária do Norte",
      organization: "Prémios Imobiliário Português",
      description: "Reconhecimento pela excelência no atendimento ao cliente"
    },
    {
      year: "2023",
      title: "Empresa de Confiança",
      organization: "Escolha do Consumidor",
      description: "Prémio baseado na satisfação e confiança dos clientes"
    },
    {
      year: "2023",
      title: "Inovação Digital",
      organization: "PropTech Awards",
      description: "Reconhecimento pela implementação de tecnologias inovadoras"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Certificações e Prémios
          </h2>
          <p className="text-xl text-gray-600">
            Reconhecimento oficial da nossa competência e qualidade de serviço
          </p>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Licenças e Certificações
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start">
                  <div className="mr-4 flex-shrink-0">
                    {cert.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h4 className="text-lg font-semibold text-gray-900 mr-2">
                        {cert.title}
                      </h4>
                      {cert.verified && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                    <div className="text-[#0d2233] font-medium mb-2">
                      {cert.number}
                    </div>
                    <p className="text-gray-600 text-sm">
                      {cert.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Prémios e Reconhecimentos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-[#0d2233] to-[#79b2e9] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8" />
                </div>
                <div className="text-2xl font-bold text-[#0d2233] mb-2">
                  {award.year}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {award.title}
                </h4>
                <div className="text-[#0d2233] font-medium mb-3">
                  {award.organization}
                </div>
                <p className="text-gray-600 text-sm">
                  {award.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 bg-blue-50 p-8 rounded-xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Porquê Confiar na Globalead?
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#0d2233] mb-2">100%</div>
              <div className="text-gray-700">Legal e Licenciada</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#0d2233] mb-2">15+</div>
              <div className="text-gray-700">Anos de Experiência</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#0d2233] mb-2">2500+</div>
              <div className="text-gray-700">Clientes Satisfeitos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#0d2233] mb-2">5★</div>
              <div className="text-gray-700">Avaliação Média</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;