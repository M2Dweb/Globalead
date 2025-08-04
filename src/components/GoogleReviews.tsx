import React from 'react';
import { Star, Quote, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const GoogleReviews: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: "Maria João Silva",
      rating: 5,
      date: "há 2 semanas",
      text: "Excelente serviço! A equipa da Globalead ajudou-me a encontrar a casa perfeita em tempo recorde. Profissionais, atenciosos e sempre disponíveis. Recomendo vivamente!",
      avatar: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "João Santos",
      rating: 5,
      date: "há 1 mês",
      text: "Consegui poupar mais de 300€ por ano no seguro automóvel graças à Globalead. Processo simples, rápido e sem complicações. Muito satisfeito com o resultado!",
      avatar: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Ana Costa",
      rating: 5,
      date: "há 3 semanas",
      text: "O sistema de alarme instalado pela Globalead dá-me total tranquilidade. Instalação profissional, equipamento de qualidade e suporte técnico exemplar.",
      avatar: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Pedro Oliveira",
      rating: 5,
      date: "há 1 semana",
      text: "Mudei de fornecedor de energia com a ajuda da Globalead e estou a poupar significativamente na fatura mensal. Processo transparente e sem surpresas.",
      avatar: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Carla Ferreira",
      rating: 5,
      date: "há 2 meses",
      text: "Venderam a minha casa em apenas 3 semanas! Marketing excelente, acompanhamento constante e negociação eficaz. Superaram todas as expectativas.",
      avatar: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 6,
      name: "Rui Mendes",
      rating: 5,
      date: "há 3 dias",
      text: "Atendimento personalizado e soluções à medida das minhas necessidades. A Globalead é sinónimo de confiança e profissionalismo. Recomendo a todos!",
      avatar: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face"
    }
  ];

  const averageRating = 5.0;
  const totalReviews = 247;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" 
              alt="Google" 
              className="h-8 mr-3"
            />
            <span className="text-2xl font-bold text-gray-900">Reviews</span>
          </div>
          
          <div className="flex items-center justify-center mb-4">
            <div className="flex text-yellow-400 mr-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-current" />
              ))}
            </div>
            <span className="text-3xl font-bold text-gray-900 mr-2">{averageRating}</span>
            <span className="text-gray-600">({totalReviews} avaliações)</span>
          </div>
          
          <p className="text-xl text-gray-600">
            Veja o que os nossos clientes dizem sobre nós no Google
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {reviews.slice(0, 3).map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{review.name}</div>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <Quote className="h-6 w-6 text-blue-600 opacity-50 absolute -top-2 -left-1" />
                <p className="text-gray-700 pl-6 leading-relaxed">
                  {review.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={() => window.open('https://g.page/r/globalead/review', '_blank')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold inline-flex items-center"
          >
            Ver Todas as Avaliações
            <ExternalLink className="ml-2 h-5 w-5" />
          </button>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-4">Teve uma boa experiência connosco?</p>
            <button 
              onClick={() => window.open('https://g.page/r/globalead/review', '_blank')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Deixe a sua avaliação no Google →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;