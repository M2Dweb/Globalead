import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQProps {
  category?: string;
}

const FAQ: React.FC<FAQProps> = ({ category = 'geral' }) => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqData = {
    geral: [
      {
        question: "Como posso contactar a Globalead Portugal?",
        answer: "Pode contactar-nos através do telefone 915 482 365, email geral@globalead.pt, ou através do formulário de contacto no nosso website."
      },
      {
        question: "Que serviços oferece a Globalead?",
        answer: "Oferecemos serviços de mediação imobiliária, seguros, energia, alarmes e telecomunicações (TV, Net, Voz)."
      }
    ],
    imoveis: [
      {
        question: "Como posso vender o meu imóvel com a Globalead?",
        answer: "Entre em contacto connosco para uma avaliação gratuita. Tratamos de todo o processo de marketing, visitas e negociação até à escritura."
      },
      {
        question: "Quanto tempo demora a vender um imóvel?",
        answer: "O tempo varia conforme o tipo de imóvel e localização, mas em média conseguimos vender imóveis entre 30 a 90 dias."
      },
      {
        question: "Que documentos preciso para vender o meu imóvel?",
        answer: "Precisa da caderneta predial, certidão permanente, certificado energético e licença de habitação (quando aplicável)."
      }
    ],
    seguros: [
      {
        question: "O que é um seguro?",
        answer: "Um seguro é um acordo entre segurador e segurado, em que o segurador assume coberturas específicas em caso de sinistro, pagando indemnizações conforme o capital seguro. O segurado, responsável pelo pagamento do prémio, celebra o contrato formalizado na apólice do seguro, que define as coberturas e o custo. A indemnização pode ser paga ao segurado, a um beneficiário ou a terceiros afetados por prejuízos atribuídos ao segurado."
      },
      {
        question: "O que é a apólice de um seguro?",
        answer: "A apólice de seguro é o contrato celebrado entre a seguradora e o tomador do seguro, que inclui todas as condições gerais, particulares e especiais do seguro. As condições gerais são cláusulas padrão aplicáveis a riscos semelhantes, enquanto as condições particulares ou especiais são ajustadas de acordo com o tipo de seguro e as necessidades específicas do segurado."
      },
      {
        question: "Seguro Automóvel: Como Funciona?",
        answer: "O seguro automóvel é um contrato entre o tomador de seguro e a seguradora, transferindo a responsabilidade por danos causados pela utilização de um veículo. O seguro obrigatório por lei é o de responsabilidade civil, que cobre apenas danos a terceiros. Para proteção do próprio veículo, é necessário um seguro de danos próprios (\"contra todos os riscos\"). O prémio do seguro é influenciado por fatores como idade, experiência de condução, histórico de sinistros, características e utilização do veículo, local de parqueamento, quilometragem anual, dispositivos de segurança e outros elementos relacionados com o condutor e o veículo."
      },
      {
        question: "Que tipos de seguros existem?",
        answer: "O mercado de seguros oferece uma ampla variedade de opções, incluindo cerca de 200 seguros obrigatórios por lei para atividades profissionais específicas. Estes estão organizados em categorias como: acidentes de trabalho, acidentes em serviço, acidentes pessoais, assistência a pessoas, danos, doença, incêndio, seguro caução, responsabilidade civil, roubo e vida."
      },
      {
        question: "Seguro de Responsabilidade Civil: O que é?",
        answer: "O seguro de responsabilidade civil é obrigatório por lei e protege as pessoas transportadas e terceiros em caso de acidente, cobrindo lesões corporais ou materiais. A cobertura mínima estabelecida pela ASF é de 1.220.000 euros para danos materiais e 6.070.000 euros para danos corporais, com revisão a cada cinco anos. No entanto, o seguro não cobre lesões do condutor responsável pelo acidente, danos no seu veículo, ou danos resultantes de acidentes causados deliberadamente ou por negligência nas normas de segurança rodoviária."
      },
      {
        question: "É importante ter um seguro de vida?",
        answer: "O seguro de vida cobre o risco de morte ou, alternativamente, de sobrevivência. Em caso de falecimento, a seguradora paga um capital acordado aos beneficiários, e em caso de sobrevivência, paga um montante à pessoa segura no final do contrato. Existem modalidades mistas que combinam ambos os casos, e o seguro pode ser complementado com coberturas adicionais, como invalidez ou desemprego. Este tipo de seguro oferece segurança económica à família, especialmente em situações de perda de rendimento ou aumento de custos com a longevidade."
      },
      {
        question: "Sou obrigado a fazer um seguro de vida no crédito habitação?",
        answer: "Se um banco exigir a contratação de um seguro de vida ao contratar um crédito à habitação, isso não é obrigatório por lei. Segundo o Decreto-Lei n.º 222/2009, os bancos devem informar o cliente sobre a possibilidade de fazer o seguro de vida, mas o cliente tem a liberdade de escolher a instituição onde deseja contratar o seguro."
      },
      {
        question: "Qual é a utilidade de um Seguro Multirriscos-Habitação?",
        answer: "O seguro multirriscos-habitação oferece proteção indemnizatória, cobrindo danos causados ao imóvel e ao seu recheio por incidentes como catástrofes naturais, incêndios, explosões, roubo, danos por água, problemas elétricos, entre outros. Esta solução vai além da apólice obrigatória por lei, que apenas cobre danos causados por incêndios em edifícios em propriedade horizontal, oferecendo uma proteção mais abrangente para a casa."
      }
    ],
    certificacao: [
      {
        question: "O que é um certificado energético?",
        answer: "O Certificado Energético é um documento que avalia a eficácia energética de um imóvel numa escala de A+ (muito eficiente) a F (pouco eficiente), emitido por técnicos autorizados pela Agência para a Energia (ADENE). No documento podes encontrar informação sobre o consumo energético relativo a climatização e águas quentes sanitárias, mas também medidas de melhoria para reduzir o consumo."
      },
      {
        question: "Para que serve um certificado energético?",
        answer: "O certificado energético é obrigatório desde 2013 para quem pretende vender ou arrendar um imóvel. O objetivo é que informe o proprietário sobre o desempenho energético do imóvel e quais as medidas de melhoria que pode implementar."
      },
      {
        question: "Quais as vantagens da certificação energética?",
        answer: "Para os proprietários que pretendem vender ou arrendar o imóvel, a obrigatoriedade da certificação energética apresenta vantagens. A certificação energética pode levar à valorização do imóvel e à redução do gasto de energia com soluções energéticas adequadas, resultando numa poupança energética. Além disso, através da certificação energética do imóvel podes ter acesso a benefícios fiscais. Se o imóvel possuir uma classificação energética igual ou superior a A pode existir uma redução até 25% do IMI."
      },
      {
        question: "Quais são os documentos necessários para a visita técnica?",
        answer: "Os documentos obrigatórios a apresentar na visita técnica são a Caderneta Predial Urbana e a Certidão de Registo Permanente. Porém, podes ainda apresentar documentos facultativos como a ficha técnica de habitação, a planta do imóvel e o corte construtivo, os quais contribuem para a otimização da Classificação do Certificado Energético do seu imóvel."
      },
      {
        question: "Quem pode atribuir um certificado energético?",
        answer: "O certificado energético apenas pode ser elaborado por um perito qualificado pela ADENE. Estes profissionais são arquitetos ou engenheiros, com experiência mínima de 5 anos, que atuam no âmbito do Sistema de Certificação Energética dos Edifícios (SCE), aprovado pelo Decreto-Lei nº 101-D/2020, de 7 de dezembro."
      },
      {
        question: "O certificado energético tem validade?",
        answer: "O certificado energético é válido por 10 anos para edifícios de habitação e pequenos edifícios de comércio e serviços. No caso de grandes edifícios de comércio e serviços, o prazo é de 6 anos para certificados emitidos até 30 de abril e 2015 e 8 anos para certificados emitidos após 30 de abril de 2015."
      },
      {
        question: "Posso usar o Certificado Energético para efeitos de escritura?",
        answer: "Os Certificados Energéticos emitidos apenas servem para efeitos de escritura, se acompanhados uma certidão de registo permanente válida para o efeito."
      },
      {
        question: "Em que situações é obrigatório o certificado energético?",
        answer: "O artigo 18 do Decreto-Lei n.º 101-D/2020 determina a obrigatoriedade do certificado energético nas seguintes situações: aluguer, venda, trespasse ou dação em cumprimento de imóveis; construção de novos edifícios; grandes renovações com custo superior a 25% do valor do imóvel; grandes edifícios comerciais ou de serviços (área >1000m² ou 500m² para certos usos), sujeitos a inspeções periódicas; e programas que exijam o certificado para acesso a financiamento ou benefícios fiscais."
      },
      {
        question: "Ter certificado energético nos estabelecimentos comerciais é obrigatório por lei?",
        answer: "Sim, o certificado energético é obrigatório para estabelecimentos comerciais, conforme o DL 101-D/2020, que se aplica a todos os edifícios destinados à utilização humana. Se o estabelecimento comercial for vendido, trespassado ou alugado por mais de 4 meses, a emissão do certificado energético é obrigatória. Se o seu estabelecimento tiver mais de 250m², é feito um diagnóstico inicial e, depois, um orçamento para a realização do certificado energético."
      },
      {
        question: "Coimas se vender ou arrendar sem Certificado Energético?",
        answer: "Caso um imóvel seja publicitado, vendido ou arrendado sem a emissão prévia do Certificado Energético, tal facto constitui contraordenação punível com coima até 3 750 €, no caso de pessoas singulares e de até 44 890 €, no caso de pessoas coletivas, conforme Artigo 35.º do DL 101-D/2020."
      }
    ],
    
    credito: [
      {
        question: "Quanto posso pedir de crédito habitação?",
        answer: "Antes de procurar casa, o primeiro passo é calcular quanto de crédito habitação pode solicitar com base nas poupanças disponíveis e no rendimento mensal. Deve reservar-se entre 15% e 20% do preço do imóvel como entrada, pois o banco não financia 100% do valor e existem impostos e despesas extras. As prestações mensais ideais não devem ultrapassar 35% do rendimento mensal líquido."
      },
      {
        question: "Falar com um intermediário de crédito à habitação",
        answer: "Acesso a acompanhamento personalizado sem ter de visitar cada banco. Comparação consolidada das ofertas bancárias em vigor. Processo de contratação simplificado e possibilidade de condições mais favoráveis. Serviço gratuito prestado pelo idealista/créditohabitação."
      },
      {
        question: "Enviar a documentação necessária para pedir um crédito habitação",
        answer: "A apresentação de propostas personalizadas pelos bancos depende do envio prévio de documentação que comprove a situação financeira. Sem o envio antecipado, as ofertas tornam-se genéricas e pouco representativas do perfil real. As propostas personalizadas incluem taxa de juro, spread, comissões e custos de produtos adicionais exigidos. A análise detalhada de cada componente permite identificar margens de negociação. Acompanhamento da Globalead Portugal garante decisões informadas e vantajosas."
      },
      {
        question: "Receber ofertas de crédito habitação e compará-las",
        answer: "A apresentação de propostas personalizadas pelos bancos depende do envio prévio de documentação que comprove a situação financeira. Sem o envio antecipado, as ofertas tornam-se genéricas e pouco representativas do perfil real. As propostas personalizadas incluem taxa de juro, spread, comissões e custos de produtos adicionais exigidos. A análise detalhada de cada componente permite identificar margens de negociação. Acompanhamento da Globalead Portugal garante decisões informadas e vantajosas."
      },
      {
        question: "Pede uma avaliação imobiliária para o crédito à habitação",
        answer: "A avaliação oficial do imóvel é obrigatória para os bancos no processo de crédito habitação. Serve para determinar o valor real do imóvel e aferir o risco do empréstimo. O custo da avaliação situa-se entre 200€ e 350€, conforme a instituição bancária. A Globalead Portugal acompanha todo o procedimento, assegurando transparência e cumprimento dos prazos necessários."
      },
      {
        question: "Oferta definitiva de aprovação do crédito habitação: FINE",
        answer: "A emissão da FINE ocorre após a conclusão da avaliação do imóvel e validações complementares, caso o crédito seja aprovado. A FINE detalha montante do empréstimo, forma de disponibilização, taxa de juro, plano de amortização, comissões e outras despesas. Validade de 30 dias para análise cuidadosa e decisão sobre a aceitação da oferta. Antes da escritura, é essencial rever todas as condições e esclarecer dúvidas. A Globalead Portugal disponibiliza especialistas para apoiar o cliente nesta fase decisiva."
      },
      {
        question: "Assinar crédito à habitação e fazer a escritura de compra e venda",
        answer: "Ao aceitares a proposta de crédito habitação, o banco emite a FINE (Ficha de Informação Normalizada Europeia), que detalha montante, taxa de juro, comissões, amortização e demais encargos. Após a entrega da FINE, cumpre um período mínimo de 7 dias antes da escritura, para refletires e confirmares que a decisão está alinhada com o acordado. Este intervalo é essencial para garantir a plena compreensão de todos os termos contratuais. A Globalead Portugal recomenda que solicites informação detalhada e esclareças todas as dúvidas antes de assinar qualquer documento."
      },
      {
        question: "Em que consiste o Spread?",
        answer: "O spread é um elemento da taxa de juro que é definido individualmente por cada banco num empréstimo habitação. No fundo, trata-se da margem de lucro da instituição financeira. O spread que o banco atribui a um determinado cliente tem muito que ver com o seu risco (aferido através do historial de crédito, dos seus rendimentos, do montante de empréstimo que está a ser solicitado e das garantias apresentadas pelo consumidor, etc.) e, muitas vezes, com os produtos que podem ser contratados para baixar o spread."
      },
      {
        question: "Qual é a diferença entre taxa fixa e variável?",
        answer: "A taxa fixa mantém-se constante ao longo do empréstimo, nunca se alterando, sendo acordada com a instituição financeira aquando do pedido de financiamento. Já a taxa variável oscila de acordo com um indexante, o que significa que irá sofrer alterações ao longo do período de vida do empréstimo, o que, consequentemente, vai fazer com que a prestação mensal também se modifique. Isto significa que, caso optes por este tipo de taxa no crédito habitação, se o valor do indexante aumentar, a taxa aplicável também será mais elevada, enquanto que, se baixar, a taxa também descerá. Em Portugal, o indexante que normalmente se utiliza nos empréstimos habitação é a Euribor, que pode ser a 3, 6 ou 12 meses."
      },
      {
        question: "Taxa Anual Nominal (TAN): O que é?",
        answer: "Sendo aplicada a todo o tipo de operações, sejam aplicações financeiras ou empréstimos que impliquem o pagamento de juros, a Taxa Anual Nominal (TAN) é um indicador que permite comparar produtos entre si. No caso do crédito habitação com taxa de juro variável, esta resulta simplesmente da soma do spread com a da Euribor."
      },
      {
        question: "O que é a Taxa Euribor?",
        answer: "A Euribor ou, Euro Interbank Offered Rate, é um juro que os bancos pagam a outras instituições para financiar a sua atividade. A Euribor é calculada pela média das taxas de juros praticadas pelos 52 maiores bancos da zona euro, num determinado prazo. A Taxa Euribor não é fixa e encontra-se sujeita a oscilações diárias. Apesar de a Euribor sofrer flutuações diárias, o cliente pode decidir o momento em que a taxa é recalculada. Os prazos mais comuns são 3, 6 e 12 meses."
      },
      {
        question: "Como conseguir aprovação num empréstimo imobiliário?",
        answer: "Para se obter uma aprovação rápida nos empréstimos bancários para habitação é fundamental que o consumidor apresente o máximo de garantias à instituição de crédito, de forma a reduzir a perceção de risco. Para além do nível de rendimentos, um bom histórico de pagamentos de empréstimos anteriores é uma condição essencial. Outro fator que os bancos privilegiam é a estabilidade profissional. O ideal é que o encargo com a mensalidade não ultrapasse os 40% do rendimento do agregado familiar."
      },
      {
        question: "Que bancos vão aderir ao 100% financiamento?",
        answer: "Todos os bancos que concedem crédito habitação (17 instituições no geral) já aderiram à garantia pública, que incluem todos os nossos parceiros com os quais já trabalhamos."
      },
      {
        question: "Qual é o prazo para pedir a garantia?",
        answer: "Para beneficiar da garantia pública e ter 100% financiamento na habitação, terás de celebrar o contrato de crédito até ao dia 31 de dezembro de 2026."
      },
      {
        question: "Tenho de pagar comissões se falhar o pagamento da prestação de empréstimo da casa?",
        answer: "Quando o cliente bancário não paga as prestações na data estipulada, entra em mora. Nestas situações, a instituição bancária pode exigir o pagamento de juros moratórios e de uma comissão respeitante à recuperação de valores em dívida. Juros de mora: resultam da aplicação de uma sobretaxa anual máxima de 3%, que acresce à taxa de juros remuneratórios; Comissão de recuperação de valores em dívida: não pode ultrapassar 4% do valor da prestação, com um valor mínimo de 12 euros e um valor máximo de 150 euros."
      },
      {
        question: "O que acontece se falhar o pagamento da prestação do crédito habitação?",
        answer: "Entrar em incumprimento no empréstimo para comprar casa é uma situação indesejável para qualquer devedor. Caso falhes alguma mensalidade, e da primeira vez que isso acontecer, o banco tem 15 dias para entrar em contacto contigo. Entre o 31º e o 60º dia após o incumprimento, o caso é integrado no PERSI (Procedimento Extrajudicial de Regularização de Situações de Incumprimento), que visa chegar a um acordo entre o banco e o cliente."
      },
      {
        question: "Podes ainda ter isenção de impostos?",
        answer: "Sim. Tens a possibilidade de ainda usufruir da isenção do IMT (Imposto sobre Transmissões Onerosas de Imóveis) e Imposto de Selo que geram poupanças significativas no processo de compra de casa."
      },
      {
        question: "Quanto tempo dura a garantia do estado?",
        answer: "A garantia em questão irá vigorar durante dez anos após a data da escritura do contrato de crédito habitação."
      },
      {
        question: "A comissão de processamento da prestação, ainda é cobrada?",
        answer: "Cobrada a cada prestação liquidada pelo cliente (com acréscimo do Imposto do Selo) e ao longo de toda a vigência do crédito, a comissão de processamento aplica-se mensalmente aquando do pagamento da prestação mensal. Apesar de desde janeiro de 2021 ter sido decretado o fim da comissão de processamento, esta medida é apenas aplicável aos novos créditos."
      },
      {
        question: "Amortização Antecipada de Crédito: Direitos e Custos Associados?",
        answer: "Os consumidores têm direito a reembolsar antecipadamente o seu crédito, isto é, proceder à sua amortização antes da data prevista para a respetiva liquidação. Tal poderá na forma de um reembolso total ou apenas parcial. Porém, a amortização antecipada acarreta custos: Taxa variável: a comissão não pode ser superior a 0,5% do capital reembolsado; Taxa Fixa: a comissão não pode ultrapassar os 2% do capital amortizado."
      },
      {
        question: "Alterações no spread do crédito habitação: Como evitar surpresas?",
        answer: "Embora seja uma prática pouco comum, poderão verificar-se alterações no Spread do crédito habitação ao longo da vigência do contrato. Tal pode suceder, por exemplo, caso o cliente tenha acordado com o banco o cumprimento de determinadas condições para a obtenção de um Spread mais baixo, tais como a domiciliação do ordenado ou ter débitos diretos ativos associados à conta detida na instituição, mas, por algum motivo, deixar de cumprir essas mesmas condições."
      },
      {
        question: "Taxa Anual Efetiva Global (TAEG): O que é?",
        answer: "Representando o custo total do crédito habitação, a Taxa Anual Efetiva Global (TAEG) inclui todos os encargos associados ao contrato. Isto inclui juros, comissões, impostos, seguros associados ao crédito e encargos com a manutenção da conta à ordem associada ao empréstimo. Também inclui outros custos como emolumentos cobrados no registo da hipoteca."
      }
    ],
  

  energiaFAQ: [
    {
      question: "O que é a Tarifa Social?",
      answer: "A Tarifa Social é um benefício destinado a famílias em dificuldades económicas, oferecendo descontos na fatura de energia. Os principais pontos são: Descontos: 33,8% na eletricidade e 31,2% no gás natural. Apoio a quem precisa: destinado a consumidores vulneráveis. Atribuição automática: o desconto é aplicado diretamente na fatura, se os requisitos forem atendidos."
    },
    {
      question: "Quais os procedimentos para mudar de fornecedor de energia?",
      answer: "Mudar de comercializador de energia é um processo simples e sem custos, que não envolve mudança de contadores ou interrupção no fornecimento. Pode ser feito a qualquer momento, por telefone, presencialmente ou online. Documentos necessários: NIF do titular (Cartão de Cidadão); Contrato de arrendamento ou escritura; Código CPE/CUI; Dados da morada da instalação; Dados de pagamento; Potência da energia elétrica ou escalão do gás natural a contratar."
    },
    {
      question: "Como contratar energia elétrica numa casa a estrear?",
      answer: "Para obter energia em uma casa nova, é necessário fazer a ligação à rede de distribuição elétrica, que em Portugal é exclusiva da E-REDES. O processo envolve solicitar ao operador a ligação à rede e o respetivo orçamento."
    },
    {
      question: "Como fazer a leitura de consumo no contador de eletricidade?",
      answer: "A leitura do consumo de energia elétrica depende do tipo de contador instalado: Contadores Eletromecânicos: leitura visível diretamente no ecrã, considerar apenas os algarismos à esquerda da vírgula. Contadores Estáticos: completamente eletrónicos, a leitura varia conforme a marca. Contadores Híbridos: combinam componente eletromecânica e digital. No caso do gás natural, a leitura é mais simples e uniforme."
    },
    {
      question: "O que é o CPE & CUI?",
      answer: "O Código de Ponto de Entrega (CPE) identifica a instalação de eletricidade, enquanto o Código Universal da Instalação (CUI) serve para identificar a instalação de gás natural. Ambos os códigos podem ser encontrados nas faturas de luz e gás da respetiva morada ou junto da distribuidora de energia."
    },
    {
      question: "Em que consiste a ficha informativa normalizada de energia?",
      answer: "A Ficha de Informação Normalizada (FIN) é um documento obrigatório para os comercializadores de eletricidade e gás natural, conforme regulamento da ERSE. Ela contém informações padronizadas sobre as condições contratuais, facilitando a comparação das ofertas disponíveis."
    },
    {
      question: "Quais as principais entidades no setor da energia em Portugal?",
      answer: "ERSE - Entidade Reguladora dos Serviços Energéticos: regula energia elétrica e gás natural. DGEG - Direção Geral de Energia e Geologia: políticas energéticas e recursos geológicos. ADENE - Agência para a Energia: eficiência energética e mobilidade sustentável."
    },
    {
      question: "Qual é o IVA da eletricidade em 2025?",
      answer: "Em 2025, o IVA aplicado à eletricidade varia: Componente variável (consumo) e potências superiores a 3,45 kVA: IVA de 23%. Componente fixa da tarifa com potências ≤ 3,45 kVA: IVA de 6%. Esta diferenciação visa reduzir custos para consumos menores."
    },
    {
      question: "Como poupar no consumo de eletricidade?",
      answer: "Para poupar eletricidade: optar por equipamentos classe AAA; usar iluminação LED; evitar standby; usar equipamentos na capacidade máxima; arejar a casa ao final do dia; desligar luzes desnecessárias. Estas ações reduzem o consumo e a fatura."
    },
    {
      question: "O que são painéis solares?",
      answer: "Os Painéis Solares convertem energia solar em eletricidade, utilizando células semicondutoras. A produção depende da intensidade solar, variando ao longo do dia e estações. Devem ser instalados em locais com boa exposição solar para otimizar a produção."
    },
    {
      question: "Onde podem ser instalados os painéis solares?",
      answer: "Os Painéis Solares são instalados no telhado, terrenos, quintais ou terraços, desde que sem sombreamento. É proibido instalar em locais com contadores provisórios. A instalação deve ser feita após o contador definitivo estar instalado."
    },
    {
      question: "Como funcionam os painéis solares?",
      answer: "A eletricidade gerada é corrente contínua, convertida para alternada através de inversor. Idealmente, toda energia deve ser consumida imediatamente ou armazenada em baterias. O excedente é injetado na rede através de UPAC, geralmente sem remuneração."
    }
  ]
};
  const currentFAQ = faqData[category as keyof typeof faqData] || faqData.geral;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-2">
        
      </div>

      <div className="space-y-4">
        {currentFAQ.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200">
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900">{item.question}</span>
              {openItems.includes(index) ? (
                <ChevronUp className="h-5 w-5 text-[#0d2233]" />
              ) : (
                <ChevronDown className="h-5 w-5 text-[#0d2233]" />
              )}
            </button>
            {openItems.includes(index) && (
              <div className="px-6 pb-4">
                <p className="text-gray-600">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;