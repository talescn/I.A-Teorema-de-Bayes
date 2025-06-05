import React from 'react';
import { BayesCalculator } from './components/BayesCalculator';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <BayesCalculator />
      </main>
      <Footer />
    </div>
  );
}

export default App;