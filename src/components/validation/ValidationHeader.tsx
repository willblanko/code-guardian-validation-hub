
import React from 'react';
import { AlertCircle, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ValidationHeader: React.FC = () => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold mb-2">Validação de Aplicações Java Obfuscadas</h1>
      <p className="text-gray-600 max-w-2xl mx-auto mb-4">
        Plataforma para demonstração de validação automática de aplicações Java (.jar) obfuscadas, 
        com testes de funcionalidade e relatórios detalhados.
      </p>
      
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4 mr-2" />
        <AlertTitle>Importante: Esta é apenas uma demonstração</AlertTitle>
        <AlertDescription>
          Esta aplicação não executa testes reais em arquivos JAR. É uma simulação para demonstrar o conceito.
          Para realizar testes reais, consulte as instruções detalhadas no README.
        </AlertDescription>
      </Alert>
      
      <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md text-sm">
        <Info className="h-4 w-4 mr-2" />
        <span>Consulte o README para instruções sobre como configurar testes reais</span>
      </div>
    </div>
  );
};

export default ValidationHeader;
