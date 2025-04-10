
import React from 'react';
import { Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ValidationHeader: React.FC = () => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold mb-2">Validação de Aplicações Java Obfuscadas</h1>
      <p className="text-gray-600 max-w-2xl mx-auto mb-4">
        Plataforma para validação estática de aplicações Java (.jar) obfuscadas, 
        com análise de código e geração de relatórios.
      </p>
      
      <Alert className="mb-4 bg-blue-50 border-blue-200 text-blue-800">
        <Info className="h-4 w-4 mr-2" />
        <AlertTitle>Análise estática de código</AlertTitle>
        <AlertDescription>
          Esta plataforma realiza análise estática de arquivos JAR para identificar 
          técnicas de ofuscação e proteções implementadas. Não executa o código Java.
        </AlertDescription>
      </Alert>
      
      <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md text-sm">
        <Info className="h-4 w-4 mr-2" />
        <span>Para testes de validação mais avançados, utilize as ferramentas recomendadas na seção de ajuda</span>
      </div>
    </div>
  );
};

export default ValidationHeader;
