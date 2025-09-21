import React, { useEffect, useState, useRef } from 'react';
import { useSpring, animated, config } from '@react-spring/web';

interface AnimatedSectionSpringProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedSectionSpring: React.FC<AnimatedSectionSpringProps> = ({ 
  children, 
  className = '', 
  delay = 0 
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const spring = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { 
      opacity: inView ? 1 : 0, 
      transform: inView ? 'translateY(0px)' : 'translateY(50px)' 
    },
    delay: inView ? delay : 0,
    config: config.gentle,
  });

  return (
    <animated.div
      ref={ref}
      style={spring}
      className={className}
    >
      {children}
    </animated.div>
  );
};

export default AnimatedSectionSpring;