import React, { useState, useEffect } from 'react';
import { Mail, Clock, ArrowRight, CheckCircle, Zap, Star } from 'lucide-react';
import { sendEmail, FormData } from '../utils/emailService';

const WaitingPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const launchDate = new Date('2025-10-17T00:00:00Z');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validar email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor, insira um email válido.');
      setIsLoading(false);
      return;
    }

    const formData: FormData = {
      nome: 'Subscritor', // podes adicionar nome se quiseres depois
      email,
      page: 'waiting_page',
      mensagem: 'Pedido de subscrição do Waiting Page'
    };

    const success = await sendEmail(formData);

    if (success) {
      setIsSubmitted(true);
      setEmail('');
    } else {
      setError('Erro ao enviar email. Tente novamente.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/carlos/sentado-tele-h.jpg")' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Em Breve</h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl text-center">
          Estamos a preparar algo extraordinário. O nosso novo website está quase pronto para revolucionar a sua experiência digital.
        </p>

        {/* Countdown */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center mb-6">
            <Clock className="h-6 w-6 text-[#79b2e9] mr-2" />
            <span className="text-lg text-gray-300">Lançamento em:</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {['Dias','Horas','Minutos','Segundos'].map((label,i)=>(
              <div key={label} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {i===0?String(timeLeft.days).padStart(2,'0'):
                   i===1?String(timeLeft.hours).padStart(2,'0'):
                   i===2?String(timeLeft.minutes).padStart(2,'0'):
                          String(timeLeft.seconds).padStart(2,'0')}
                </div>
                <div className="text-sm text-gray-300 uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
            <div className="w-12 h-12 bg-[#79b2e9] rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Performance Superior</h3>
            <p className="text-gray-300 text-sm">Velocidade e eficiência sem precedentes</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
            <div className="w-12 h-12 bg-[#79b2e9] rounded-lg flex items-center justify-center mx-auto mb-4">
              <Star className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Experiência Premium</h3>
            <p className="text-gray-300 text-sm">Design moderno e intuitivo</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
            <div className="w-12 h-12 bg-[#79b2e9] rounded-lg flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Funcionalidades Avançadas</h3>
            <p className="text-gray-300 text-sm">Tudo o que precisa num só lugar</p>
          </div>
        </div>

        {/* Subscription */}
        <div className="w-full max-w-xl mx-auto mb-12">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20 text-center">
            <h3 className="text-xl font-semibold text-white mb-4">Seja o primeiro a saber</h3>
            {!isSubmitted ? (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value); setError('');}}
                  placeholder="O seu endereço de email"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#79b2e9] backdrop-blur-sm"
                />
                {error && <p className="text-red-300 text-sm text-left">{error}</p>}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#0d2233] to-[#79b2e9] text-white py-3 px-6 rounded-lg hover:from-[#79b2e9] hover:to-[#0d2233] transition-all duration-300 flex items-center justify-center font-medium"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  ) : (
                    <>
                      <Mail className="h-5 w-5 mr-2" /> Subscrever <ArrowRight className="h-5 w-5 ml-2" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div>
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Obrigado!</h4>
                <p className="text-gray-300 mb-4">
                  Iremos contactar-te assim que o website for lançado.
                </p>
                <button
                  onClick={()=>setIsSubmitted(false)}
                  className="text-[#79b2e9] hover:text-white transition-colors underline"
                >
                  Subscrever outro email
                </button>
              </div>
            )}
          </div>
        </div>

        <footer className="text-gray-400 text-sm text-center">
          © 2025 - Todos os direitos reservados.
        </footer>
      </div>
    </div>
  );
};

export default WaitingPage;
