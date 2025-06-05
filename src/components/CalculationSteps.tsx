import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface CalculationStepsProps {
  result: {
    notA: number;
    numerator: number;
    denominator: number;
    posteriorProbability: number;
  };
  parameters: {
    priorProbability: number;
    sensitivity: number;
    falsePositiveRate: number;
  };
}

export const CalculationSteps: React.FC<CalculationStepsProps> = ({ result, parameters }) => {
  const { priorProbability, sensitivity, falsePositiveRate } = parameters;
  const { notA, numerator, denominator, posteriorProbability } = result;

  const steps = [
    {
      title: "Passo 1: Calcular P(¬A)",
      formula: "P(¬A) = 1 - P(A)",
      calculation: `P(¬A) = 1 - ${priorProbability.toFixed(4)} = ${notA.toFixed(4)}`,
      explanation: "Cálculo da probabilidade de não ter dengue (complemento da probabilidade prévia).",
    },
    {
      title: "Passo 2: Calcular o Numerador",
      formula: "Numerador = P(B|A) × P(A)",
      calculation: `Numerador = ${sensitivity.toFixed(4)} × ${priorProbability.toFixed(4)} = ${numerator.toFixed(4)}`,
      explanation: "Probabilidade conjunta de ter dengue e apresentar febre.",
    },
    {
      title: "Passo 3: Calcular o Denominador",
      formula: "Denominador = P(B|A) × P(A) + P(B|¬A) × P(¬A)",
      calculation: `Denominador = (${sensitivity.toFixed(4)} × ${priorProbability.toFixed(4)}) + (${falsePositiveRate.toFixed(4)} × ${notA.toFixed(4)}) = ${denominator.toFixed(4)}`,
      explanation: "Probabilidade total de apresentar febre (lei da probabilidade total).",
    },
    {
      title: "Passo 4: Calcular P(A|B)",
      formula: "P(A|B) = Numerador / Denominador",
      calculation: `P(A|B) = ${numerator.toFixed(4)} / ${denominator.toFixed(4)} = ${posteriorProbability.toFixed(4)} (${(posteriorProbability * 100).toFixed(2)}%)`,
      explanation: "Probabilidade de ter dengue dado que apresenta febre (probabilidade posterior).",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Passos do Cálculo</h2>
        
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4 py-1 animate-fadeIn">
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">{step.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{step.formula}</p>
                  <p className="font-mono text-sm bg-gray-50 p-2 rounded mt-2">{step.calculation}</p>
                  <p className="text-sm text-gray-600 mt-1">{step.explanation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};