import React from 'react';
import { HelpCircle } from 'lucide-react';

interface ProbabilityInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  description?: string;
  id: string;
}

export const ProbabilityInput: React.FC<ProbabilityInputProps> = ({
  label,
  value,
  onChange,
  description,
  id,
}) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(e.target.value));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 1) {
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        {description && (
          <div className="relative ml-2 group">
            <HelpCircle className="h-4 w-4 text-gray-400" />
            <div className="absolute left-0 bottom-full mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              {description}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <input
          type="range"
          id={id}
          min="0"
          max="1"
          step="0.001"
          value={value}
          onChange={handleSliderChange}
          className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <div className="relative w-24">
          <input
            type="text"
            value={value.toFixed(3)}
            onChange={handleInputChange}
            className="w-full py-1 px-3 border border-gray-300 rounded-md text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">
              {(value * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};