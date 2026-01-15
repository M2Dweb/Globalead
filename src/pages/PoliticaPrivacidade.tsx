import React from 'react';

const PoliticaPrivacidade: React.FC = () => {
  return (
    <main className="bg-white text-gray-800">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Política de Privacidade</h1>

        <section className="space-y-6 text-sm leading-relaxed">
          <p>
            A Globalead Portugal valoriza a privacidade e a proteção dos dados
            pessoais dos seus clientes, utilizadores e parceiros, comprometendo-se
            a tratar os dados pessoais de forma lícita, leal e transparente,
            em conformidade com o Regulamento Geral sobre a Proteção de Dados
            (RGPD).
          </p>

          <h2 className="text-xl font-semibold">Responsável pelo Tratamento</h2>
          <p>
            A Globalead Portugal é a entidade responsável pelo tratamento dos
            dados pessoais recolhidos através do seu website.
          </p>
          <p>
            Para qualquer questão relacionada com a proteção de dados, poderá
            contactar-nos através do email:{' '}
            <strong>geral@globalead.pt</strong>
          </p>

          <h2 className="text-xl font-semibold">
            Finalidades do Tratamento
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Resposta a pedidos de contacto e informações</li>
            <li>Envio de newsletters, quando autorizado</li>
            <li>Comunicação comercial e marketing</li>
            <li>Gestão de serviços de mediação imobiliária</li>
            <li>Melhoria e desenvolvimento do website</li>
            <li>Cumprimento de obrigações legais</li>
          </ul>

          <h2 className="text-xl font-semibold">Dados Pessoais Recolhidos</h2>
          <p>
            Poderão ser recolhidos dados como nome, endereço de correio
            eletrónico, contacto telefónico, preferências comerciais e outros
            dados fornecidos voluntariamente através dos formulários do website.
          </p>

          <h2 className="text-xl font-semibold">Consentimento</h2>
          <p>
            Ao fornecer os seus dados pessoais e submeter formulários no website,
            o utilizador declara que leu, compreendeu e aceita a presente Política
            de Privacidade.
          </p>
          <p>
            O consentimento pode ser retirado a qualquer momento, mediante pedido
            escrito para o endereço de email indicado.
          </p>

          <h2 className="text-xl font-semibold">
            Conservação dos Dados
          </h2>
          <p>
            Os dados pessoais serão conservados apenas durante o período
            necessário para as finalidades que motivaram a sua recolha ou
            enquanto existir obrigação legal para o efeito.
          </p>

          <h2 className="text-xl font-semibold">
            Direitos do Titular dos Dados
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Direito de acesso</li>
            <li>Direito de retificação</li>
            <li>Direito ao apagamento</li>
            <li>Direito à limitação do tratamento</li>
            <li>Direito de oposição</li>
            <li>Direito à portabilidade dos dados</li>
          </ul>

          <h2 className="text-xl font-semibold">
            Alterações à Política de Privacidade
          </h2>
          <p>
            A Globalead Portugal reserva-se o direito de alterar a presente
            Política de Privacidade a qualquer momento, sendo as alterações
            publicadas nesta página.
          </p>
        </section>
      </div>
    </main>
  );
};

export default PoliticaPrivacidade;
