
import React from 'react';
import { AlertCircle } from 'lucide-react';

const ValidationHeader: React.FC = () => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold mb-2">Validação de Aplicações Java Obfuscadas</h1>
      <p className="text-gray-600 max-w-2xl mx-auto mb-2">
        Plataforma para validação automática de aplicações Java (.jar) obfuscadas, 
        com testes de funcionalidade e relatórios detalhados.
      </p>
      <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md text-sm">
        <AlertCircle className="h-4 w-4 mr-2" />
        <span>Ambiente de demonstração - Simulação de testes</span>
      </div>
    </div>
  );
};

export default ValidationHeader;
