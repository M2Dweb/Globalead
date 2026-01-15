import React from 'react';

const TermosCondicoes: React.FC = () => {
  return (
    <main className="bg-white text-gray-800">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Termos e Condições</h1>

        <section className="space-y-6 text-sm leading-relaxed">
          <h2 className="text-xl font-semibold">Objeto</h2>
          <p>
            Os presentes Termos e Condições regulam o acesso e a utilização do
            website da Globalead Portugal.
          </p>

          <h2 className="text-xl font-semibold">Aceitação</h2>
          <p>
            A utilização do website implica a aceitação plena e sem reservas dos
            presentes Termos e Condições. Caso o utilizador não concorde, deverá
            cessar de imediato a utilização do website.
          </p>

          <h2 className="text-xl font-semibold">
            Informação Disponibilizada
          </h2>
          <p>
            A informação disponibilizada no website tem caráter meramente
            informativo e não constitui proposta contratual, não dispensando o
            contacto direto com a Globalead Portugal.
          </p>

          <h2 className="text-xl font-semibold">
            Responsabilidade
          </h2>
          <p>
            A Globalead Portugal não se responsabiliza por quaisquer danos
            resultantes da utilização ou impossibilidade de utilização do
            website, nem por conteúdos de websites de terceiros para os quais
            existam ligações.
          </p>

          <h2 className="text-xl font-semibold">
            Utilização do Website
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Utilizar o website de forma lícita e adequada</li>
            <li>Não praticar atos ilícitos ou ofensivos</li>
            <li>Não interferir com o normal funcionamento do website</li>
            <li>Não utilizar conteúdos protegidos sem autorização</li>
          </ul>

          <h2 className="text-xl font-semibold">
            Alterações
          </h2>
          <p>
            A Globalead Portugal reserva-se o direito de alterar os presentes
            Termos e Condições a qualquer momento, sendo recomendada a sua
            consulta regular.
          </p>

          <h2 className="text-xl font-semibold">
            Contactos
          </h2>
          <p>
            Para qualquer esclarecimento relacionado com os presentes Termos e
            Condições, poderá contactar-nos através do email{' '}
            <strong>geral@globalead.pt</strong>.
          </p>
        </section>
      </div>
    </main>
  );
};

export default TermosCondicoes;
