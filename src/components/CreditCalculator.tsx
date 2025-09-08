import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Home, DollarSign } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const CreditCalculator: React.FC = () => {
  const [values, setValues] = useState({
    propertyValue: 250000,
    downPayment: 50000,
    interestRate: 2.9,
    loanTerm: 30
  });

  const [results, setResults] = useState({
    loanAmount: 0,
    monthlyPayment: 0,
    totalInterest: 0,
    totalPayment: 0
  });

  useEffect(() => {
    calculateLoan();
  }, [values]);

  const calculateLoan = () => {
    const loanAmount = values.propertyValue - values.downPayment;
    const monthlyRate = values.interestRate / 100 / 12;
    const numberOfPayments = values.loanTerm * 12;

    const monthlyPayment =
      loanAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    setResults({
      loanAmount,
      monthlyPayment,
      totalInterest,
      totalPayment
    });
  };

  const handleInputChange = (field: string, value: number) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const chartData = [
    { name: 'Capital', value: Number(results.loanAmount.toFixed(2)) },
    { name: 'Juros', value: Number(results.totalInterest.toFixed(2)) }
  ];

  const COLORS = ['#2563eb', '#f97316'];

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
      <div className="flex items-center mb-6">
        <Calculator className="h-8 w-8 text-blue-600 mr-3" />
        <h3 className="text-2xl font-bold text-gray-900">
          Calculadora de Crédito Habitação
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          {/* Valor do imóvel */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor do Imóvel
            </label>
            <input
              type="range"
              min="50000"
              max="1000000"
              step="5000"
              value={values.propertyValue}
              onChange={(e) => handleInputChange('propertyValue', Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>50.000€</span>
              <span className="font-medium text-blue-600">{formatCurrency(values.propertyValue)}</span>
              <span>1.000.000€</span>
            </div>
          </div>

          {/* Entrada */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Entrada
            </label>
            <input
              type="range"
              min="0"
              max={values.propertyValue * 0.5}
              step="1000"
              value={values.downPayment}
              onChange={(e) => handleInputChange('downPayment', Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>0€</span>
              <span className="font-medium text-blue-600">{formatCurrency(values.downPayment)}</span>
              <span>{formatCurrency(values.propertyValue * 0.5)}</span>
            </div>
          </div>

          {/* Taxa de Juro */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Taxa de Juro (%)
            </label>
            <input
              type="range"
              min="2"
              max="5"
              step="0.1"
              value={values.interestRate}
              onChange={(e) => handleInputChange('interestRate', Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>2%</span>
              <span className="font-medium text-blue-600">{values.interestRate}%</span>
              <span>5%</span>
            </div>
          </div>

          {/* Prazo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prazo (anos)
            </label>
            <input
              type="range"
              min="5"
              max="40"
              step="1"
              value={values.loanTerm}
              onChange={(e) => handleInputChange('loanTerm', Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>5 anos</span>
              <span className="font-medium text-blue-600">{values.loanTerm} anos</span>
              <span>40 anos</span>
            </div>
          </div>

          {/* Botão Solicitar Simulação Detalhada */}
          <div className="mt-4">
            <button className="w-full mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              Solicitar Simulação Detalhada
            </button>
          </div>
        </div>

        {/* Resultados + Gráfico */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <div className="flex items-center mb-2">
                <Home className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Montante do Empréstimo</span>
              </div>
              <div className="text-xl font-bold text-blue-600">
                {formatCurrency(results.loanAmount)}
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
              <div className="flex items-center mb-2">
                <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Prestação Mensal</span>
              </div>
              <div className="text-xl font-bold text-green-600">
                {formatCurrency(results.monthlyPayment)}
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
              <div className="flex items-center mb-2">
                <TrendingUp className="h-5 w-5 text-orange-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Total de Juros</span>
              </div>
              <div className="text-xl font-bold text-orange-600">
                {formatCurrency(results.totalInterest)}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="flex items-center mb-2">
                <Calculator className="h-5 w-5 text-gray-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Total a Pagar</span>
              </div>
              <div className="text-xl font-bold text-gray-600">
                {formatCurrency(results.totalPayment)}
              </div>
            </div>
          </div>

          {/* Gráfico Doughnut */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  label={({ name, value }) => `${name}: €${value.toFixed(2)}`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `€${value.toFixed(2)}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCalculator;
