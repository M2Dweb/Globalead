import React, { useState } from 'react';
import { Play, Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const VideoTestimonials: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const testimonials = [
    {
      id: 1,
      name: "Gonçalo Vinhas",
      role: "Proprietária",
      location: "Porto",
      rating: 5,
      thumbnail: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
      quote: "Contactei a Globalead para encontrar soluções de seguro automóvel e fui atendido pelo Carlos Gonçalves. Desde o primeiro contacto, o Carlos mostrou-se extremamente profissional e prestável! Apresentou-me as melhores opções conforme as minhas necessidades, explicou-me detalhadamente cada proposta e tratou de todo o processo com grande eficiência. Em menos de 24 horas, o meu seguro já estava ativo. Fiquei muito satisfeito com o serviço e recomendo vivamente a Globalead pela rapidez, clareza e qualidade no atendimento.",
      service: "Venda de Imóvel"
    },
    {
      id: 2,
      name: "João Santos",
      role: "Empresário",
      location: "Lisboa",
      rating: 5,
      thumbnail: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
      quote: "Consegui poupar 40% no seguro da empresa. Recomendo vivamente!",
      service: "Seguros Empresariais"
    },
    {
      id: 3,
      name: "Ana Costa",
      role: "Professora",
      location: "Braga",
      rating: 5,
      thumbnail: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
      quote: "O sistema de alarme dá-me total tranquilidade. Atendimento 5 estrelas!",
      service: "Sistema de Alarmes"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Histórias Reais dos Nossos Clientes
          </h2>
          <p className="text-xl text-gray-600">
            Veja o que os nossos clientes têm a dizer sobre os nossos serviços
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Video Thumbnail */}
              <div className="relative">
                <img
                  src={testimonial.thumbnail}
                  alt={testimonial.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => setSelectedVideo(testimonial.id)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-60 transition-all duration-300 group"
                >
                  <div className="bg-white rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-8 w-8 text-[#0d2233] ml-1" />
                  </div>
                </button>
                
                {/* Service Badge */}
                <div className="absolute top-4 left-4 bg-[#0d2233] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {testimonial.service}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({testimonial.rating}/5)</span>
                </div>

                <div className="relative mb-4">
                  <Quote className="h-6 w-6 text-[#0d2233] opacity-50 absolute -top-2 -left-1" />
                  <p className="text-gray-700 italic pl-6">
                    {testimonial.quote}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-[#0d2233]">{testimonial.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-full overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold">
                  Testemunho - {testimonials.find(t => t.id === selectedVideo)?.name}
                </h3>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="aspect-video">
                <iframe
                  src={testimonials.find(t => t.id === selectedVideo)?.videoUrl}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  title="Video Testimonial"
                />
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Quer partilhar a sua experiência connosco?
          </p>
          <button className="bg-[#0d2233] text-white px-8 py-3 rounded-lg hover:bg-[#79b2e9] transition-colors font-semibold">
            Deixar Testemunho
          </button>
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonials;