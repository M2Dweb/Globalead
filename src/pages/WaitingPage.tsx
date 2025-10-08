import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, Clock, Calendar, CheckCircle, ArrowRight, Star, Zap } from 'lucide-react';

const WaitingPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set your launch date here
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

    try {
      // Save email subscription to Supabase
      const { error: insertError } = await supabase
        .from('email_subscriptions')
        .insert([{ 
          email: email,
          subscribed_at: new Date().toISOString(),
          source: 'waiting_page'
        }]);

      if (insertError) {
        throw insertError;
      }

      setIsSubmitted(true);
      setEmail('');
    } catch (err: any) {
      console.error('Erro ao subscrever:', err);
      if (err.code === '23505') {
        setError('Este email já está subscrito!');
      } else {
        setError('Erro ao subscrever. Tente novamente.');
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/carlos/sentado-tele-h.jpg")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo/Brand */}
          <div className="mb-8">
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              Em Breve
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Estamos a preparar algo extraordinário. O nosso novo website está quase pronto para revolucionar a sua experiência digital.
            </p>
          </div>

          {/* Countdown */}
          <div className="mb-12">
            <div className="flex items-center justify-center mb-6">
              <Clock className="h-6 w-6 text-[#79b2e9] mr-2" />
              <span className="text-lg text-gray-300">Lançamento em:</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-300 uppercase tracking-wider">Dias</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-300 uppercase tracking-wider">Horas</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-300 uppercase tracking-wider">Minutos</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-300 uppercase tracking-wider">Segundos</div>
              </div>
            </div>
          </div>

          {/* Features Preview */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">O que esperar</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
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
          </div>

          {/* Email Subscription */}
          <div className="max-w-xl mx-auto">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
              <div className="flex items-center justify-center mb-6">
                <Calendar className="h-6 w-6 text-[#79b2e9] mr-2" />
                <h3 className="text-xl font-semibold text-white">Seja o primeiro a saber</h3>
              </div>
              
              <p className="text-gray-300 mb-6">
                Receba uma notificação no momento exato do lançamento e tenha acesso exclusivo às novidades.
              </p>

              {!isSubmitted ? (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      placeholder="O seu endereço de email"
                      className="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#79b2e9] focus:border-transparent backdrop-blur-sm"
                      required
                      disabled={isLoading}
                    />
                    {error && (
                      <p className="mt-2 text-sm text-red-300 text-left">
                        {error}
                      </p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#0d2233] to-[#79b2e9] text-white py-3 px-6 rounded-lg hover:from-[#79b2e9] hover:to-[#0d2233] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        A subscrever...
                      </>
                    ) : (
                      <>
                        <Mail className="h-5 w-5 mr-2" />
                        Subscrever notificações
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Obrigado!</h4>
                  <p className="text-gray-300 mb-4">
                    A sua subscrição foi confirmada com sucesso. Irá receber uma notificação assim que o website for lançado.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-[#79b2e9] hover:text-white transition-colors underline"
                  >
                    Subscrever outro email
                  </button>
                </div>
              )}

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-400">
                  Prometemos não enviar spam. Apenas notificações importantes sobre o lançamento.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16">
            <p className="text-gray-400 text-sm">
              © 2025 - Todos os direitos reservados. Em breve disponível.
            </p>
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-[#79b2e9] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-[#0d2233] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#79b2e9] rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse animation-delay-4000"></div>
      </div>
    </div>
  );
};

export default WaitingPage;