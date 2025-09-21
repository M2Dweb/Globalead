import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxHeaderProps {
  backgroundImage: string;
  foregroundImageSrc?: string;
  foregroundImageAlt?: string;
  children: React.ReactNode;
  height?: string;
}

const ParallaxHeader: React.FC<ParallaxHeaderProps> = ({ 
  backgroundImage, 
  foregroundImageSrc,
  foregroundImageAlt = "Foreground image",
  children, 
  height = "100vh" 
}) => {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -200]);
  const foregroundY = useTransform(scrollY, [0, 1000], [0, -300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.4]);
  const blur = useTransform(scrollY, [0, 500], ['0px', '15px']);

  return (
    <div className="relative overflow-hidden" style={{ height }}>
      {/* Parallax Background Logo */}
      <motion.div
        style={{ y: backgroundY, filter: `blur(${blur})` }}
        className="absolute inset-0 w-full h-[120%] z-0"
      >
        <div
          className="w-full h-full bg-contain bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-blue-800/30 to-blue-900/40" />
      </motion.div>

      {/* Parallax Foreground Image */}
      {foregroundImageSrc && (
        <motion.div
          style={{ y: foregroundY }}
          className="absolute bottom-0 right-1/4 z-10 w-80 h-auto"
        >
          <img
            src={foregroundImageSrc}
            alt={foregroundImageAlt}
            className="w-full h-auto object-contain drop-shadow-2xl"
          />
        </motion.div>
      )}

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 h-full flex items-center justify-start pl-8 md:pl-16"
      >
        <div className="max-w-2xl pb-20">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default ParallaxHeader;
