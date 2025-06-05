import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Calculadora do Teorema de Bayes
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-gray-400">
              Esta calculadora é apenas para fins educacionais. Sempre consulte profissionais de saúde para diagnósticos médicos.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};