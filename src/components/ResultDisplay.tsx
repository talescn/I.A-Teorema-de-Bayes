import React from 'react';

interface ResultDisplayProps {
  result: number;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const percentage = (result * 100).toFixed(2);
  const gaugeValue = Math.min(100, Math.max(0, parseFloat(percentage)));
  
  // Determine color based on probability value
  const getColor = () => {
    if (gaugeValue < 20) return 'bg-green-500';
    if (gaugeValue < 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Text for interpretation
  const getInterpretation = () => {
    if (gaugeValue < 5) return 'Probabilidade muito baixa';
    if (gaugeValue < 20) return 'Probabilidade baixa';
    if (gaugeValue < 50) return 'Probabilidade moderada';
    if (gaugeValue < 80) return 'Probabilidade alta';
    return 'Probabilidade muito alta';
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Resultado Final</h2>
        
        <div className="flex flex-col items-center">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 mb-1">P(Dengue | Febre)</p>
            <div className="flex items-baseline justify-center">
              <span className="text-4xl font-bold text-blue-600">{percentage}%</span>
              <span className="text-lg text-gray-500 ml-2">({result.toFixed(4)})</span>
            </div>
            <p className="text-sm font-medium text-gray-700 mt-2">
              {getInterpretation()}
            </p>
          </div>
          
          <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden mb-4">
            <div 
              className={`h-full ${getColor()} transition-all duration-500 ease-out`}
              style={{ width: `${gaugeValue}%` }}
            ></div>
          </div>
          
          <p className="text-center text-gray-600 mt-4">
            A probabilidade de uma pessoa estar com dengue, dado que ela apresenta febre, 
            é de aproximadamente <strong>{percentage}%</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};