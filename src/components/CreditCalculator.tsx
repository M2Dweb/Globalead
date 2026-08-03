import React, { useState } from 'react';
import { Calculator, Home, Wallet, Percent, CalendarClock, Info, Minus, Plus, MapPin } from 'lucide-react';
import { sendEmail, FormData } from '../utils/emailService';

/* ------------------------------------------------------------------ *
 * Tabelas de IMT — Continente (valores indicativos)
 * ------------------------------------------------------------------ */
type Bracket = { limit: number; rate: number; deduct: number; flat?: boolean };

const IMT_HPP: Bracket[] = [
  { limit: 101917, rate: 0, deduct: 0 },
  { limit: 139412, rate: 0.02, deduct: 2038.34 },
  { limit: 190086, rate: 0.05, deduct: 6220.70 },
  { limit: 316772, rate: 0.07, deduct: 10022.42 },
  { limit: 607528, rate: 0.08, deduct: 13190.14 },
  { limit: 1102920, rate: 0.06, deduct: 0, flat: true },
  { limit: Infinity, rate: 0.075, deduct: 0, flat: true },
];

const IMT_SEC: Bracket[] = [
  { limit: 101917, rate: 0.01, deduct: 0 },
  { limit: 139412, rate: 0.02, deduct: 1019.17 },
  { limit: 190086, rate: 0.05, deduct: 5201.53 },
  { limit: 316772, rate: 0.07, deduct: 9003.25 },
  { limit: 607528, rate: 0.08, deduct: 12170.97 },
  { limit: 1102920, rate: 0.06, deduct: 0, flat: true },
  { limit: Infinity, rate: 0.075, deduct: 0, flat: true },
];

const calcIMT = (value: number, houseType: 'principal' | 'secundaria', young: boolean): number => {
  // Isenção de IMT para jovens até 35 anos (HPP até 316.772 €)
  if (young && houseType === 'principal' && value <= 316772) return 0;
  const table = houseType === 'principal' ? IMT_HPP : IMT_SEC;
  for (const b of table) {
    if (value <= b.limit) {
      return b.flat ? value * b.rate : Math.max(0, value * b.rate - b.deduct);
    }
  }
  return 0;
};

/* ------------------------------------------------------------------ *
 * Tabela de amortização anual
 * ------------------------------------------------------------------ */
interface ScheduleRow { year: number; interest: number; principal: number; balance: number; }

const buildSchedule = (principal: number, annualRate: number, years: number): ScheduleRow[] => {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (principal <= 0 || n <= 0) return [];
  const pay = r > 0
    ? principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    : principal / n;
  let balance = principal;
  const rows: ScheduleRow[] = [];
  for (let y = 1; y <= years; y++) {
    let interestY = 0;
    let principalY = 0;
    for (let m = 0; m < 12; m++) {
      const interest = balance * r;
      const principalPaid = pay - interest;
      interestY += interest;
      principalY += principalPaid;
      balance -= principalPaid;
    }
    rows.push({ year: y, interest: interestY, principal: principalY, balance: Math.max(0, balance) });
  }
  return rows;
};

const DISTRICTS = [
  'Aveiro', 'Beja', 'Braga', 'Bragança', 'Castelo Branco', 'Coimbra', 'Évora',
  'Faro', 'Guarda', 'Leiria', 'Lisboa', 'Portalegre', 'Porto', 'Santarém',
  'Setúbal', 'Viana do Castelo', 'Vila Real', 'Viseu', 'Madeira', 'Açores',
];

interface CreditCalculatorProps {
  /** Pré-preenche o preço do imóvel (ex.: vindo de uma página de imóvel). */
  initialPropertyValue?: number;
  /** Pré-preenche as poupanças. Por defeito 20% do valor do imóvel. */
  initialSavings?: number;
  /** Pré-seleciona a localização (distrito). */
  initialLocation?: string;
}

const CreditCalculator: React.FC<CreditCalculatorProps> = ({
  initialPropertyValue,
  initialSavings,
  initialLocation,
}) => {
  const startProperty = Math.min(Math.max(initialPropertyValue ?? 200000, 25000), 2000000);
  const startSavings = Math.min(
    Math.max(
      initialSavings ?? (initialPropertyValue ? Math.round((startProperty * 0.2) / 1000) * 1000 : 70000),
      0,
    ),
    startProperty,
  );

  const [propertyValue, setPropertyValue] = useState(startProperty);
  const [savings, setSavings] = useState(startSavings);
  const [interestRate, setInterestRate] = useState(2.75);
  const [loanTerm, setLoanTerm] = useState(30);
  const [rateType, setRateType] = useState<'fixa' | 'variavel'>('variavel');
  const [location, setLocation] = useState(initialLocation ?? 'Lisboa');
  const [houseType, setHouseType] = useState<'principal' | 'secundaria'>('principal');
  const [young, setYoung] = useState(false);
  const [showAmortization, setShowAmortization] = useState(false);

  // Inclui a localização do imóvel no seletor mesmo que não seja um distrito (ex.: "Guimarães")
  const locationOptions = initialLocation && !DISTRICTS.includes(initialLocation)
    ? [initialLocation, ...DISTRICTS]
    : DISTRICTS;

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<FormData>>({
    nome: '', email: '', telemovel: '', page: 'credit-calculator',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  /* ----------------------------- helpers ---------------------------- */
  const formatCurrency = (a: number) =>
    new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
      .format(isFinite(a) ? a : 0);
  const formatNumber = (n: number) =>
    new Intl.NumberFormat('pt-PT').format(Math.round(isFinite(n) ? n : 0));
  const parseNumber = (s: string) => Number(s.replace(/[^\d]/g, '')) || 0;
  const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

  const setProperty = (v: number) => {
    const nv = clamp(v, 25000, 2000000);
    setPropertyValue(nv);
    if (savings > nv) setSavings(nv);
  };
  const setSavingsClamped = (v: number) => setSavings(clamp(v, 0, propertyValue));
  const setRate = (v: number) => setInterestRate(clamp(Number(v.toFixed(2)), 0.1, 8));
  const setTerm = (v: number) => setLoanTerm(clamp(Math.round(v), 5, 40));
  const selectRateType = (t: 'fixa' | 'variavel') => {
    setRateType(t);
    setInterestRate(t === 'fixa' ? 3.30 : 2.75);
  };

  /* ----------------------------- cálculos --------------------------- */
  const imt = calcIMT(propertyValue, houseType, young);
  const isExempt = young && houseType === 'principal' && propertyValue <= 316772;
  const isCompra = isExempt ? 0 : propertyValue * 0.008;          // Imposto de Selo (compra) 0,8%
  const registos = 250;                                          // registo + notário (estimativa)
  const provCredit = Math.max(0, propertyValue + imt + isCompra + registos - savings);
  const isCredito = (loanTerm >= 5 ? 0.006 : 0.005) * provCredit; // Imposto de Selo (crédito)
  const impostos = imt + isCompra + registos + isCredito;
  const custoTotal = propertyValue + impostos;
  const credito = Math.max(0, custoTotal - savings);
  const financingPct = propertyValue > 0 ? (credito / propertyValue) * 100 : 0;
  const savingsPct = propertyValue > 0 ? (savings / propertyValue) * 100 : 0;

  const r = interestRate / 100 / 12;
  const n = loanTerm * 12;
  const monthlyPayment = credito > 0
    ? (r > 0 ? credito * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : credito / n)
    : 0;
  const totalInterest = Math.max(0, monthlyPayment * n - credito);
  const totalWithCredit = savings + credito + totalInterest;
  const schedule = buildSchedule(credito, interestRate, loanTerm);

  const barTotal = totalWithCredit || 1;
  const wSavings = (savings / barTotal) * 100;
  const wCredit = (credito / barTotal) * 100;
  const wInterest = (totalInterest / barTotal) * 100;

  /* ------------------------------ form ------------------------------ */
  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSimulationRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const emailData = {
        ...formData,
        assunto: 'Pedido de Simulação Detalhada de Crédito',
        mensagem: `Simulação de crédito habitação:
        - Preço do imóvel: ${formatCurrency(propertyValue)}
        - Poupanças: ${formatCurrency(savings)} (${Math.round(savingsPct)}%)
        - Impostos e despesas da compra: ${formatCurrency(impostos)}
        - Custo total do imóvel: ${formatCurrency(custoTotal)}
        - Valor do crédito: ${formatCurrency(credito)}
        - Percentagem de financiamento: ${Math.round(financingPct)}%
        - Tipo de taxa: ${rateType === 'fixa' ? 'Fixa' : 'Variável'}
        - Taxa de juro: ${interestRate}%
        - Prazo: ${loanTerm} anos
        - Tipo de casa: ${houseType === 'principal' ? 'Principal' : 'Secundária'}
        - Localização: ${location}
        - Tem 35 anos ou menos: ${young ? 'Sim' : 'Não'}
        - Prestação mensal estimada: ${formatCurrency(monthlyPayment)}`,
      };
      const ok = await sendEmail(emailData as FormData);
      if (ok) {
        setSubmitStatus('success');
        setFormData({ nome: '', email: '', telemovel: '', page: 'credit-calculator' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Erro ao enviar pedido de simulação:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ----------------------------- styles ----------------------------- */
  const boxCls = 'flex items-center rounded-lg border border-gray-200 px-3 py-1.5 focus-within:ring-2 focus-within:ring-[#79b2e9]';
  const labelCls = 'flex items-center text-sm font-medium text-gray-700';
  const toggle = (active: boolean) =>
    `flex-1 px-3 py-2 rounded-lg border text-sm font-medium transition ${
      active
        ? 'border-[#79b2e9] bg-[#79b2e9]/10 text-[#0d2233]'
        : 'border-gray-200 text-gray-600 hover:border-gray-300'
    }`;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* ============================ INPUTS ============================ */}
        <div className="p-6 sm:p-8 lg:border-r border-gray-100">
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 rounded-full bg-[#79b2e9]/10 flex items-center justify-center mr-3">
              <Calculator className="h-5 w-5 text-[#79b2e9]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              Simulador de Crédito Habitação
            </h3>
          </div>

          <div className="space-y-6">
            {/* Preço do imóvel */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={labelCls}>
                  <Home className="h-4 w-4 text-[#79b2e9]" />
                  <span className="ml-2">Preço do imóvel</span>
                </label>
                <div className={boxCls}>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formatNumber(propertyValue)}
                    onChange={(e) => setProperty(parseNumber(e.target.value))}
                    className="w-28 text-right font-semibold text-[#0d2233] bg-transparent outline-none"
                  />
                  <span className="ml-1 text-gray-500">€</span>
                </div>
              </div>
              <input
                type="range" min={25000} max={2000000} step={5000}
                value={propertyValue}
                onChange={(e) => setProperty(Number(e.target.value))}
                className="w-full accent-[#79b2e9] cursor-pointer"
              />
            </div>

            {/* Poupanças */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={labelCls}>
                  <Wallet className="h-4 w-4 text-[#79b2e9]" />
                  <span className="ml-2">Poupanças</span>
                </label>
                <div className={boxCls}>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formatNumber(savings)}
                    onChange={(e) => setSavingsClamped(parseNumber(e.target.value))}
                    className="w-24 text-right font-semibold text-[#0d2233] bg-transparent outline-none"
                  />
                  <span className="ml-1 text-gray-500">€</span>
                  <span className="ml-2 pl-2 border-l border-gray-200 text-xs font-semibold text-[#79b2e9] w-10 text-right">
                    {Math.round(savingsPct)}%
                  </span>
                </div>
              </div>
              <input
                type="range" min={0} max={propertyValue} step={1000}
                value={savings}
                onChange={(e) => setSavingsClamped(Number(e.target.value))}
                className="w-full accent-[#79b2e9] cursor-pointer"
              />
            </div>

            {/* Aviso 10% */}
            <div className="flex items-start gap-2 rounded-lg bg-blue-50 border border-blue-100 px-3 py-2.5">
              <Info className="h-4 w-4 text-[#79b2e9] mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-600">
                Lembre-se que os bancos normalmente pedem uma contribuição mínima de 10% mais despesas.
              </p>
            </div>

            {/* Prazo em anos */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={labelCls}>
                  <CalendarClock className="h-4 w-4 text-[#79b2e9]" />
                  <span className="ml-2">Prazo em anos</span>
                </label>
                <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden">
                  <button type="button" onClick={() => setTerm(loanTerm - 1)} className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-50">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-16 text-center font-semibold text-[#0d2233]">{loanTerm}</span>
                  <button type="button" onClick={() => setTerm(loanTerm + 1)} className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-50">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <input
                type="range" min={5} max={40} step={1}
                value={loanTerm}
                onChange={(e) => setTerm(Number(e.target.value))}
                className="w-full accent-[#79b2e9] cursor-pointer"
              />
            </div>

            {/* Tipo de taxa de juros */}
            <div>
              <label className={`${labelCls} mb-2`}>
                <Percent className="h-4 w-4 text-[#79b2e9]" />
                <span className="ml-2">Tipo de taxa de juros</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex gap-2 flex-1">
                  <button type="button" onClick={() => selectRateType('fixa')} className={toggle(rateType === 'fixa')}>Fixa</button>
                  <button type="button" onClick={() => selectRateType('variavel')} className={toggle(rateType === 'variavel')}>Variável</button>
                </div>
                <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden">
                  <button type="button" onClick={() => setRate(interestRate - 0.05)} className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-50">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-16 text-center font-semibold text-[#0d2233]">
                    {interestRate.toFixed(2).replace('.', ',')}%
                  </span>
                  <button type="button" onClick={() => setRate(interestRate + 0.05)} className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-50">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Localização do imóvel */}
            <div>
              <label className={`${labelCls} mb-2`}>
                <MapPin className="h-4 w-4 text-[#79b2e9]" />
                <span className="ml-2">Localização do imóvel</span>
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#79b2e9] bg-white"
              >
                {locationOptions.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            {/* Tipo de casa */}
            <div>
              <label className={`${labelCls} mb-2`}>Tipo de casa</label>
              <div className="flex gap-2">
                <button type="button" onClick={() => setHouseType('principal')} className={toggle(houseType === 'principal')}>Habitação principal</button>
                <button type="button" onClick={() => setHouseType('secundaria')} className={toggle(houseType === 'secundaria')}>Secundária</button>
              </div>
            </div>

            {/* Tens 35 anos ou menos */}
            <div>
              <label className={`${labelCls} mb-2`}>
                Tem 35 anos ou menos?
                <span title="Isenção de IMT e Imposto de Selo na compra de habitação própria permanente até 316.772 €.">
                  <Info className="h-3.5 w-3.5 text-gray-400 ml-1.5" />
                </span>
              </label>
              <div className="flex gap-2">
                <button type="button" onClick={() => setYoung(true)} className={toggle(young)}>Sim</button>
                <button type="button" onClick={() => setYoung(false)} className={toggle(!young)}>Não</button>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-7 leading-relaxed">
            Valores meramente indicativos (impostos calculados para o Continente). O valor final varia
            conforme o perfil de cada cliente e depende de uma simulação baseada em necessidades reais.
          </p>
        </div>

        {/* =========================== RESULTADO ========================== */}
        <div className="bg-gradient-to-br from-[#0d2233] to-[#1a3a5c] text-white p-6 sm:p-8 flex flex-col">
          <div className="text-center pb-5 border-b border-white/10">
            <p className="text-blue-100 text-sm">A sua prestação mensal seria de</p>
            <div className="mt-1 text-4xl sm:text-5xl font-bold">{formatCurrency(monthlyPayment)}</div>
            <p className="text-blue-200/80 text-xs mt-1">
              {rateType === 'fixa' ? 'Taxa fixa' : 'Taxa variável'} · {loanTerm} anos · {interestRate.toFixed(2).replace('.', ',')}%
            </p>
          </div>

          <div className="py-4 space-y-2 text-sm border-b border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-blue-100 flex items-center">
                Valor crédito habitação
                <span title="Montante a financiar pelo banco (custo total do imóvel menos as suas poupanças).">
                  <Info className="h-3.5 w-3.5 text-blue-200/60 ml-1" />
                </span>
              </span>
              <span className="font-semibold">{formatCurrency(credito)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-100 flex items-center">
                Percentagem de financiamento
                <span title="Valor do crédito em relação ao preço do imóvel (LTV).">
                  <Info className="h-3.5 w-3.5 text-blue-200/60 ml-1" />
                </span>
              </span>
              <span className="font-semibold">{Math.round(financingPct)}%</span>
            </div>
          </div>

          {/* Custo total do imóvel */}
          <div className="py-4 space-y-2 text-sm border-b border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-blue-100">Preço do imóvel</span>
              <span>{formatCurrency(propertyValue)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-100 flex items-center">
                Impostos e despesas da compra
                <span title="IMT + Imposto de Selo + registo e notário (estimativa).">
                  <Info className="h-3.5 w-3.5 text-blue-200/60 ml-1" />
                </span>
              </span>
              <span>{formatCurrency(impostos)}</span>
            </div>
            <div className="flex items-center justify-between font-bold pt-1">
              <span>Custo total do imóvel</span>
              <span>{formatCurrency(custoTotal)}</span>
            </div>
          </div>

          {/* Barra poupança / crédito / juros */}
          <div className="py-4 border-b border-white/10">
            <div className="flex h-3 w-full overflow-hidden rounded-full bg-white/10">
              <div className="bg-[#cdb892]" style={{ width: `${wSavings}%` }} />
              <div className="bg-[#79b2e9]" style={{ width: `${wCredit}%` }} />
              <div className="bg-orange-400" style={{ width: `${wInterest}%` }} />
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-blue-100">
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#cdb892] mr-1.5" />Poupança</span>
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#79b2e9] mr-1.5" />Crédito</span>
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-orange-400 mr-1.5" />Juros</span>
            </div>
          </div>

          {/* Total com crédito */}
          <div className="py-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-blue-100">Poupanças</span>
              <span>{formatCurrency(savings)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-100">Valor crédito habitação</span>
              <span>{formatCurrency(credito)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-100">Juros crédito habitação</span>
              <span>{formatCurrency(totalInterest)}</span>
            </div>
            <div className="flex items-center justify-between font-bold pt-1">
              <span>Valor total com crédito habitação</span>
              <span>{formatCurrency(totalWithCredit)}</span>
            </div>
          </div>

          <button
            onClick={() => setShowAmortization((v) => !v)}
            className="text-sm text-blue-200 hover:text-white underline underline-offset-2 self-start mb-6"
          >
            {showAmortization ? 'Ocultar tabela de amortização' : 'Ver tabela de amortização'}
          </button>

          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="mt-auto w-full bg-white text-[#0d2233] font-semibold py-3 rounded-lg hover:bg-blue-50 transition-colors duration-300"
            >
              Encontrar crédito habitação
            </button>
          )}
        </div>
      </div>

      {/* ===================== TABELA DE AMORTIZAÇÃO ===================== */}
      {showAmortization && (
        <div className="border-t border-gray-100 p-6 sm:p-8">
          <h4 className="font-bold text-gray-900 mb-4">Tabela de amortização (anual)</h4>
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-white">
                <tr className="text-left text-gray-500 border-b border-gray-200">
                  <th className="py-2 pr-4">Ano</th>
                  <th className="py-2 pr-4 text-right">Capital amortizado</th>
                  <th className="py-2 pr-4 text-right">Juros pagos</th>
                  <th className="py-2 text-right">Capital em dívida</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row) => (
                  <tr key={row.year} className="border-b border-gray-50">
                    <td className="py-2 pr-4 font-medium text-gray-700">{row.year}</td>
                    <td className="py-2 pr-4 text-right text-gray-600">{formatCurrency(row.principal)}</td>
                    <td className="py-2 pr-4 text-right text-orange-600">{formatCurrency(row.interest)}</td>
                    <td className="py-2 text-right text-gray-900 font-medium">{formatCurrency(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ====================== FORMULÁRIO DE PEDIDO ===================== */}
      {showForm && (
        <div className="border-t border-gray-100 p-6 sm:p-8 bg-gray-50">
          <h4 className="text-lg font-bold text-gray-900 mb-1">Pedir simulação detalhada e gratuita</h4>
          <p className="text-sm text-gray-600 mb-5">
            Deixe os seus contactos e um especialista da Globalead apresenta-lhe a melhor proposta do mercado.
          </p>
          <form onSubmit={handleSimulationRequest} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text" name="nome" value={formData.nome} onChange={handleFormInputChange}
              placeholder="Nome completo" required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#79b2e9]"
            />
            <input
              type="email" name="email" value={formData.email} onChange={handleFormInputChange}
              placeholder="Email" required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#79b2e9]"
            />
            <input
              type="tel" name="telemovel" value={formData.telemovel} onChange={handleFormInputChange}
              placeholder="Telemóvel"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#79b2e9]"
            />
            <div className="md:col-span-3">
              <label className="flex items-start text-sm text-gray-700 mb-4">
                <input type="checkbox" className="mt-1 mr-2" required />
                Sim, aceito os termos e condições indicados pela Globalead Portugal.
              </label>
              <p className="text-xs text-gray-500 mb-4">
                Os dados submetidos através deste formulário de contacto serão tratados em conformidade com a
                legislação em vigor sobre dados pessoais e o Regulamento Geral da Protecção de Dados (UE) 2016/679.
              </p>
              {submitStatus === 'success' && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                  Mensagem enviada com sucesso! Entraremos em contacto em breve.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  Erro ao enviar mensagem. Tente novamente ou contacte-nos diretamente.
                </div>
              )}
              <button
                type="submit" disabled={isSubmitting}
                className="w-full md:w-auto bg-white text-[#0d2233] border border-[#0d2233] font-semibold py-3 px-8 rounded-lg hover:bg-[#79b2e9] hover:text-white hover:border-[#79b2e9] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Entrar em contacto'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreditCalculator;
