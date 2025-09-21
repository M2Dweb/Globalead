import React, { useEffect, useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { Quote, Star } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: {
    name: string;
    role: string;
    content: string;
    rating: number;
  };
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById(`testimonial-${index}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [index]);

  // Parallax effect
  const parallaxSpring = useSpring({
    transform: `translateY(${scrollY * (0.1 + index * 0.05)}px)`,
    config: config.slow,
  });

  // Visibility animation
  const visibilitySpring = useSpring({
    from: { opacity: 0, transform: 'translateY(50px) rotateX(10deg)' },
    to: { 
      opacity: isVisible ? 1 : 0, 
      transform: isVisible ? 'translateY(0px) rotateX(0deg)' : 'translateY(50px) rotateX(10deg)' 
    },
    delay: isVisible ? index * 200 : 0,
    config: config.gentle,
  });

  return (
    <animated.div
      id={`testimonial-${index}`}
      style={{ ...parallaxSpring, ...visibilitySpring }}
      className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="mb-4">
        <Quote className="h-8 w-8 text-[#0d2233] opacity-20" />
      </div>
      
      <p className="text-gray-600 mb-6 italic">
        "{testimonial.content}"
      </p>
      
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold text-gray-900">
            {testimonial.name}
          </div>
          <div className="text-sm text-gray-500">
            {testimonial.role}
          </div>
        </div>
        
        <div className="flex text-yellow-400">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </div>
      </div>
    </animated.div>
  );
};

interface ParallaxTestimonialsProps {
  testimonials: Array<{
    name: string;
    role: string;
    content: string;
    rating: number;
  }>;
}

const ParallaxTestimonials: React.FC<ParallaxTestimonialsProps> = ({ testimonials }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            O Que Dizem os Nossos Clientes
          </h2>
          <p className="text-xl text-gray-600">
            Testemunhos reais de quem confia no nosso trabalho
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParallaxTestimonials;