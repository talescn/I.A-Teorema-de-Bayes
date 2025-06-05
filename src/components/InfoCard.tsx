import React, { ReactNode } from 'react';

interface InfoCardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, children, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-6">
        <div className="flex items-center mb-4">
          {icon}
          <h2 className="text-xl font-bold text-gray-800 ml-2">{title}</h2>
        </div>
        <div className="prose max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
};