import React from 'react';

const ResolucaoLitigios: React.FC = () => {
  return (
    <main className="bg-white text-gray-800">
      <div className="max-w-5xl mx-auto px-4 pt-28 pb-12">
        <h1 className="text-3xl font-bold mb-8">Resolução de Litígios</h1>

        <section className="space-y-6 text-sm leading-relaxed">
          <p>
            Em caso de litígio o consumidor pode recorrer a uma Entidade de
            Resolução Alternativa de Litígios de consumo:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              Centro de Arbitragem de Conflitos de Consumo de Lisboa<br />
              <span className="text-blue-600">www.centroarbitragemlisboa.pt</span>
            </li>

            <li>
              Centro de Arbitragem de Conflitos de Consumo do Vale do Ave /
              Tribunal Arbitral<br />
              <span className="text-blue-600">www.triave.pt</span>
            </li>

            <li>
              CIAB - Centro de Informação, Mediação e Arbitragem de Consumo
              (Tribunal Arbitral de Consumo)<br />
              <span className="text-blue-600">www.ciab.pt</span>
            </li>

            <li>
              CNIACC - Centro Nacional de Informação e Arbitragem de Conflitos de
              Consumo<br />
              <span className="text-blue-600">www.cniacc.pt</span>
            </li>

            <li>
              Centro de Arbitragem de Conflitos de Consumo do Distrito de Coimbra<br />
              <span className="text-blue-600">
                www.centrodearbitragemdecoimbra.com
              </span>
            </li>

            <li>
              Centro de Informação, Mediação e Arbitragem de Conflitos de Consumo
              do Algarve<br />
              <span className="text-blue-600">www.consumoalgarve.pt</span>
            </li>

            <li>
              Centro de Informação de Consumo e Arbitragem do Porto<br />
              <span className="text-blue-600">www.cicap.pt</span>
            </li>

            <li>
              Centro de Arbitragem de Conflitos de Consumo da Madeira<br />
              <span className="text-blue-600">www.madeira.gov.pt/cacc</span>
            </li>
          </ul>

          <p className="pt-4">
            Mais informações em Portal do Consumidor<br />
            <span className="text-blue-600">www.consumidor.pt</span>
          </p>
        </section>
      </div>
    </main>
  );
};

export default ResolucaoLitigios;
