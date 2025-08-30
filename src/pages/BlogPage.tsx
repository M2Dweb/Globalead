import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

const BlogPage: React.FC = () => {
  const blogPosts = [
    {
      title: "Garantia pública sobe risco de incumprimento (e tende a elevar juros)",
      date: "Janeiro 6, 2025",
      excerpt: "A garantia pública para crédito à habitação de jovens, que permite financiamento a 100%, já está em vigor, mas só deverá estar operacional no final do ano. O Banco de Portugal alerta para a necessidade de cautela na adesão, destacando o aumento do risco de incumprimento por parte dos jovens e o possível impacto nas...",
      image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Globalead Portugal"
    },
    {
      title: "Como organizar a casa no inverno: dicas para ter tudo à mão",
      date: "Janeiro 6, 2025",
      excerpt: "Manter a casa organizada no inverno pode ser simples e rápido, proporcionando mais conforto e momentos de relaxamento. Apesar da rotina agitada, envolver toda a família nas tarefas domésticas, especialmente aproveitando o espírito natalício, torna a organização mais fácil e agradável. Uma casa limpa, arrumada e aconchegante cria o ambiente perfeito para desfrutar do inverno...",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Globalead Portugal"
    },
    {
      title: "Preço da eletricidade aumenta 2,1% no mercado regulado em 2025",
      date: "Janeiro 6, 2025",
      excerpt: "O regulador propõe um aumento de 2,1% no preço da eletricidade para os clientes do mercado regulado em 2025. Mas a ERSE prevê uma descida na fatura média mensal até 88 cêntimos com descida do IVA. A Entidade Reguladora dos Serviços Energéticos (ERSE) propôs uma subida do preço da eletricidade no mercado regulado de 2,1%...",
      image: "https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Globalead Portugal"
    },
    {
      title: "Aumentos previstos no preço das telecomunicações em 2025",
      date: "Janeiro 5, 2025",
      excerpt: "Em novembro de 2024, os preços das telecomunicações em Portugal aumentaram 7,3% em comparação com o mesmo mês de 2023, segundo dados da ANACOM. Esta foi a maior subida desde 1994, sem se sentir o efeito da entrada da Digi no mercado. A variação média dos últimos 12 meses foi de 6,9%, ficando 6,9 pontos...",
      image: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Globalead Portugal"
    },
    {
      title: "Mercado de casas de luxo em Lisboa vai aumentar 4,5%",
      date: "Janeiro 5, 2025",
      excerpt: "Lisboa reforça a sua posição como destino de destaque no mercado imobiliário de luxo, ocupando o 4º lugar no ranking das cidades europeias com maior potencial de valorização em 2025. De acordo com o relatório '2025 European Prime Price Forecast', da consultora imobiliária Knight Frank, os preços das casas de luxo na capital portuguesa deverão crescer...",
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Globalead Portugal"
    },
    {
      title: "Especialistas antecipam agravamento da crise na habitação em 2025",
      date: "Janeiro 5, 2025",
      excerpt: "Em 2025, Portugal enfrentará uma intensificação da crise habitacional, com poucos sinais de abrandamento nos preços das casas e um mercado de arrendamento instável. Especialistas preveem uma estabilização dos preços, mas a um nível elevado, resultado da pressão constante da procura, que continua a ultrapassar a oferta. Apesar da expectativa de um aumento na produção...",
      image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Globalead Portugal"
    },
    {
      title: "Regiões de maior crescimento em 2025: onde investir em Portugal?",
      date: "Janeiro 5, 2025",
      excerpt: "Portugal 2025: Destino de Excelência para Investimento Imobiliário Em 2025, Portugal continua a ser um destino atraente para investidores imobiliários, com Lisboa e Porto mantendo-se como os principais polos do mercado. No entanto, regiões como Santarém e Caminha destacam-se por oferecerem uma excelente relação qualidade/preço e grande potencial de valorização, impulsionado por investimentos em infraestruturas...",
      image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Globalead Portugal"
    },
    {
      title: "Tendências para o setor imobiliário em 2025",
      date: "Fevereiro 13, 2024",
      excerpt: "O setor imobiliário em Portugal está em plena transformação, impulsionado por avanços tecnológicos, mudanças nas preferências dos consumidores e novos desafios socioeconómicos. À medida que nos aproximamos de 2025, algumas tendências já se consolidam como pontos-chave para o sucesso de consultores e imobiliárias.Esteja preparado para um mercado mais dinâmico, exigente e competitivo. Acompanhe as principais...",
      image: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Globalead Portugal"
    },
    {
      title: "Preços das casas em 2025? Novas subidas à vista com apoios à compra",
      date: "Fevereiro 13, 2024",
      excerpt: "Em Portugal, o acesso à habitação continua a ser um problema crescente. Os preços das casas aumentaram muito mais do que os salários médios nos últimos anos, enquanto a oferta habitacional ainda não cresceu o suficiente para responder à demanda. As novas medidas do Governo, focadas em incentivar a procura, como a isenção de IMT...",
      image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Globalead Portugal"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-600 to-blue-500 text-white py-20 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          poster="/fotos/BlogPage-foto.png"
        >
          <source src="/videos/BlogPage-video(1).mp4" type="video/mp4" />
        </video>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Últimas notícias
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Subscreva a nossa Newsletter e receba todas as novidades.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Subscreva a nossa Newsletter
              </h2>
              <p className="text-gray-600">
                Receba todas as novidades, descontos e promoções disponíveis para si
              </p>
            </div>
            
            <form className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="O seu email..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold"
              >
                Subscrever
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>Por {post.author}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors inline-flex items-center">
                    Ler mais
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Load More */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold inline-flex items-center">
            Carregar mais artigos
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;