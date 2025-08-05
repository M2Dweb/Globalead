import React from 'react';
import { Phone, Mail, Clock, MapPin, MessageCircle } from 'lucide-react';

const ContactosPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contactos
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto">
              Na Globalead Portugal, colocamos sempre o cliente no centro de tudo o que fazemos. Estamos inteiramente disponíveis para lhe prestar o apoio que necessita.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Caso tenha dúvidas sobre os nossos serviços, precise de assistência técnica, pretenda informações adicionais ou procure uma solução totalmente personalizada, a nossa equipa está preparada para encontrar a resposta certa para si.
            </p>
            <br />
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Entre em contacto connosco através do formulário abaixo, envie-nos um e-mail ou ligue para os contactos indicados. Em alternativa, poderá também visitar-nos no nosso escritório, onde teremos todo o gosto em recebê-lo. A nossa prioridade é prestar-lhe um atendimento célere e eficaz, garantindo a sua máxima satisfação.
            </p>
          </div>

          {/* Quick Contact */}
          <div className="bg-blue-50 p-8 rounded-xl mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Como posso obter uma resposta mais rápida?
              </h2>
              <h3 className="text-2xl font-semibold text-blue-600 mb-6">
                Entre em contacto:
              </h3>
              <div className="flex items-center justify-center mb-6">
                <Phone className="h-8 w-8 text-blue-600 mr-3" />
                <span className="text-2xl font-bold text-gray-900">915 482 365</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg">
              <p className="text-gray-700 text-center leading-relaxed">
                Estamos disponíveis 24 horas por dia, através de e-mail, WhatsApp, Telegram ou Messenger. 
                Caso pretenda uma resposta mais imediata, poderá contactar-nos entre as <strong>10h00 e as 21h00</strong>, em dias úteis.
              </p>
            </div>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Telefone</h3>
              <p className="text-gray-600">915 482 365</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">geral@globalead.pt</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">WhatsApp</h3>
              <p className="text-gray-600">Mensagem direta</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Horário</h3>
              <p className="text-gray-600">10h00 - 21h00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Instagram Template - Lado Esquerdo */}
            <div className="lg:w-1/3 flex justify-center">
              <img 
                src="/template-dos-inta-2.png" 
                alt="Instagram Template" 
                className="w-64 h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Formulário - Lado Direito */}
            <div className="lg:w-2/3">
              <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                    Formulário de Contacto
                  </h2>
                  <p className="text-gray-600 text-center">
                    Preencha o formulário abaixo e entraremos em contacto consigo
                  </p>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Nome:"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Apelido:"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="tel"
                    placeholder="Telemóvel:"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Email:"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Assunto:"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Meio de Contacto:</option>
                    <option>Email</option>
                    <option>Telefone</option>
                    <option>WhatsApp</option>
                    <option>Telegram</option>
                    <option>Messenger</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Horário:"
                    className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  
                  <div className="md:col-span-2">
                    <label className="flex items-start text-sm text-gray-700 mb-4">
                      <input type="checkbox" className="mt-1 mr-2" />
                      Sim, aceito os termos e condições indicados pela Globalead Portugal.
                    </label>
                    <p className="text-xs text-gray-600 mb-6">
                      Os dados submetidos através deste formulário de contacto serão tratados em conformidade com a legislação em vigor sobre dados pessoais e o Regulamento Geral da Proteção de Dados (UE) 2016/679.
                    </p>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                      Enviar Mensagem
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
                

      {/* Additional Info */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Phone className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Atendimento Telefónico</h3>
              <p className="text-blue-100">
                Disponível 24/7 para emergências e suporte técnico
              </p>
            </div>

            <div className="text-center">
              <Mail className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Suporte por Email</h3>
              <p className="text-blue-100">
                Resposta garantida em menos de 24 horas
              </p>
            </div>

            <div className="text-center">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Chat Online</h3>
              <p className="text-blue-100">
                WhatsApp, Telegram e Messenger disponíveis
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactosPage;