import React from 'react';
import { Users, Home, Award, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CompanyStats: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      number: 2500,
      label: "Clientes Satisfeitos",
      suffix: "+"
    },
    {
      icon: <Home className="h-8 w-8 text-blue-600" />,
      number: 850,
      label: "Imóveis Vendidos",
      suffix: "+"
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      number: 15,
      label: "Anos de Experiência",
      suffix: ""
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      number: 98,
      label: "Taxa de Satisfação",
      suffix: "%"
    }
  ];

  const AnimatedNumber: React.FC<{ value: number; suffix: string }> = ({ value, suffix }) => {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
      if (inView) {
        const timer = setInterval(() => {
          setCount(prev => {
            if (prev < value) {
              return Math.min(prev + Math.ceil(value / 50), value);
            }
            return value;
          });
        }, 50);

        return () => clearInterval(timer);
      }
    }, [inView, value]);

    return <span>{count}{suffix}</span>;
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Números que Falam por Si
          </h2>
          <p className="text-xl text-blue-100">
            A confiança dos nossos clientes é o nosso maior orgulho
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold mb-2">
                <AnimatedNumber value={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-blue-100">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyStats;