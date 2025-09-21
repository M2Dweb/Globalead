import React, { useEffect, useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { Camera, User } from 'lucide-react';

interface PhotoPlaceholderProps {
  title: string;
  description: string;
  aspectRatio: string;
  placeholderImage: string;
  index: number;
}

const PhotoPlaceholder: React.FC<PhotoPlaceholderProps> = ({ 
  title, 
  description, 
  aspectRatio, 
  placeholderImage,
  index 
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax effect for each photo
  const parallaxSpring = useSpring({
    transform: `translateY(${scrollY * (0.05 + index * 0.02)}px)`,
    config: config.slow,
  });

  // Hover animation
  const hoverSpring = useSpring({
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    config: config.wobbly,
  });

  // Overlay animation
  const overlaySpring = useSpring({
    opacity: isHovered ? 1 : 0,
    config: config.gentle,
  });

  return (
    <animated.div 
      style={parallaxSpring}
      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative ${aspectRatio} bg-gray-200`}>
        <animated.img
          style={hoverSpring}
          src={placeholderImage}
          alt={`Placeholder for ${title}`}
          className="w-full h-full object-cover"
        />
        
        <animated.div 
          style={overlaySpring}
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
        />
        
        {/* Overlay content */}
        <animated.div 
          style={overlaySpring}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center text-white p-4">
            <Camera className="h-8 w-8 mx-auto mb-2" />
            <h3 className="text-lg font-semibold mb-1">{title}</h3>
            <p className="text-sm text-gray-200">{description}</p>
          </div>
        </animated.div>
      </div>
    </animated.div>
  );
};

interface ParallaxPhotoSectionProps {
  title: string;
  subtitle?: string;
}

const ParallaxPhotoSection: React.FC<ParallaxPhotoSectionProps> = ({ title, subtitle }) => {
  const photoTypes = [
    {
      title: "Foto Corpo Inteiro",
      description: "Foto profissional de corpo inteiro em pé",
      aspectRatio: "aspect-[3/4]",
      placeholderImage: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop"
    },
    {
      title: "Foto Sentado",
      description: "Foto profissional sentado em ambiente corporativo",
      aspectRatio: "aspect-[4/5]",
      placeholderImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop"
    },
    {
      title: "Foto Meio Corpo",
      description: "Foto profissional da cintura para cima",
      aspectRatio: "aspect-[3/4]",
      placeholderImage: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop"
    },
    {
      title: "Foto em Pé",
      description: "Foto profissional em pé, ambiente executivo",
      aspectRatio: "aspect-[3/4]",
      placeholderImage: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {photoTypes.map((photo, index) => (
            <PhotoPlaceholder
              key={index}
              title={photo.title}
              description={photo.description}
              aspectRatio={photo.aspectRatio}
              placeholderImage={photo.placeholderImage}
              index={index}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-blue-50 rounded-lg">
            <User className="h-5 w-5 text-[#0d2233] mr-2" />
            <span className="text-[#0d2233] font-medium">
              Espaços reservados para as fotos profissionais do Carlos Gonçalves
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxPhotoSection;