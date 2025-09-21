import React, { useEffect, useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';

interface ParallaxHeaderSpringProps {
  backgroundImage: string;
  foregroundImageSrc?: string;
  foregroundImageAlt?: string;
  children: React.ReactNode;
  height?: string;
}

const ParallaxHeaderSpring: React.FC<ParallaxHeaderSpringProps> = ({ 
  backgroundImage, 
  foregroundImageSrc,
  foregroundImageAlt = "Foreground image",
  children, 
  height = "100vh" 
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Background parallax animation
  const backgroundSpring = useSpring({
    transform: `translateY(${scrollY * -0.2}px)`,
    filter: `blur(${Math.min(scrollY * 0.03, 15)}px)`,
    config: config.slow,
  });

  // Foreground image parallax animation
  const foregroundSpring = useSpring({
    transform: `translateY(${scrollY * -0.4}px)`,
    config: config.slow,
  });

  // Content fade animation
  const contentSpring = useSpring({
    opacity: Math.max(1 - scrollY * 0.002, 0.4),
    config: config.slow,
  });

  // Initial content animation
  const initialContentSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay: 200,
    config: config.gentle,
  });

  return (
    <div className="relative overflow-hidden" style={{ height }}>
      {/* Parallax Background Logo */}
      <animated.div
        style={backgroundSpring}
        className="absolute inset-0 w-full h-[120%] z-0"
      >
        <div
          className="w-full h-full bg-contain bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-blue-800/30 to-blue-900/40" />
      </animated.div>

      {/* Parallax Foreground Image */}
      {foregroundImageSrc && (
        <animated.div
          style={foregroundSpring}
          className="absolute bottom-0 right-1/4 z-10 w-80 h-auto"
        >
          <img
            src={foregroundImageSrc}
            alt={foregroundImageAlt}
            className="w-full h-auto object-contain drop-shadow-2xl"
          />
        </animated.div>
      )}

      {/* Content */}
      <animated.div
        style={contentSpring}
        className="relative z-20 h-full flex items-center justify-start pl-8 md:pl-16"
      >
        <animated.div style={initialContentSpring} className="max-w-2xl pb-20">
          {children}
        </animated.div>
      </animated.div>
    </div>
  );
};

export default ParallaxHeaderSpring;