import React, { useState, useEffect } from 'react';
import { AlertCircle, Info } from 'lucide-react';
import { ProbabilityInput } from './ProbabilityInput';
import { CalculationSteps } from './CalculationSteps';
import { ResultDisplay } from './ResultDisplay';
import { calculateBayesTheorem } from '../utils/bayesCalculations';
import { InfoCard } from './InfoCard';

export const BayesCalculator: React.FC = () => {
  const [priorProbability, setPriorProbability] = useState<number>(0.011);
  const [sensitivity, setSensitivity] = useState<number>(0.9);
  const [falsePositiveRate, setFalsePositiveRate] = useState<number>(0.25);
  const [result, setResult] = useState<{
    notA: number;
    numerator: number;
    denominator: number;
    posteriorProbability: number;
  }>({ notA: 0, numerator: 0, denominator: 0, posteriorProbability: 0 });

  useEffect(() => {
    const calculationResult = calculateBayesTheorem(
      priorProbability,
      sensitivity,
      falsePositiveRate
    );
    setResult(calculationResult);
  }, [priorProbability, sensitivity, falsePositiveRate]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Parâmetros da Calculadora</h2>
            
            <div className="space-y-6">
              <ProbabilityInput
                label="P(A): Probabilidade de ter dengue"
                value={priorProbability}
                onChange={setPriorProbability}
                description="A probabilidade prévia de uma pessoa ter dengue em São Paulo"
                id="prior-probability"
              />
              
              <ProbabilityInput
                label="P(B|A): Probabilidade de ter febre dado que tem dengue"
                value={sensitivity}
                onChange={setSensitivity}
                description="A porcentagem de pacientes com dengue que apresentam febre"
                id="sensitivity"
              />
              
              <ProbabilityInput
                label="P(B|¬A): Probabilidade de ter febre sem ter dengue"
                value={falsePositiveRate}
                onChange={setFalsePositiveRate}
                description="A porcentagem de pessoas sem dengue que apresentam febre por outros motivos"
                id="false-positive"
              />
            </div>
          </div>
        </div>

        <CalculationSteps result={result} parameters={{
          priorProbability,
          sensitivity,
          falsePositiveRate
        }} />

        <ResultDisplay result={result.posteriorProbability} />
      </div>

      <div className="lg:col-span-1 space-y-6">
        <InfoCard 
          title="Sobre o Teorema de Bayes"
          icon={<Info className="h-5 w-5 text-blue-500" />}
        >
          <p className="text-gray-600 mb-4">
            O Teorema de Bayes é uma fórmula matemática usada para calcular probabilidades condicionais. 
            É especialmente útil em diagnósticos médicos, onde ajuda a determinar a probabilidade de 
            uma doença dado um sintoma específico.
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Fórmula:</strong> P(A|B) = [P(B|A) × P(A)] / [P(B|A) × P(A) + P(B|¬A) × P(¬A)]
          </p>
          <p className="text-gray-600">
            No contexto da dengue:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>P(A) é a probabilidade prévia de ter dengue</li>
              <li>P(B|A) é a probabilidade de ter febre se tiver dengue</li>
              <li>P(B|¬A) é a probabilidade de ter febre sem ter dengue</li>
              <li>P(A|B) é a probabilidade de ter dengue dado que tem febre</li>
            </ul>
          </p>
        </InfoCard>

        <InfoCard 
          title="Interpretação dos Resultados"
          icon={<AlertCircle className="h-5 w-5 text-orange-500" />}
        >
          <p className="text-gray-600 mb-4">
            Os resultados mostram a probabilidade de uma pessoa realmente ter dengue, 
            considerando que ela apresenta febre.
          </p>
          <p className="text-gray-600 mb-4">
            Mesmo que a febre seja um sintoma comum da dengue, a presença de febre 
            sozinha não é um indicador forte da doença, especialmente quando a prevalência 
            da dengue na população é baixa.
          </p>
          <p className="text-gray-600">
            Para diagnósticos precisos, os médicos consideram múltiplos sintomas e 
            realizam testes laboratoriais específicos.
          </p>
        </InfoCard>
      </div>
    </div>
  );
};