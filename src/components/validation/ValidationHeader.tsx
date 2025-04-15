
import React from 'react';
import { Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ValidationHeader: React.FC = () => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold mb-2">Validação de Aplicações Java Obfuscadas</h1>
      <p className="text-gray-600 max-w-2xl mx-auto mb-4">
        Plataforma para validação e comparação de arquivos JAR (.jar) ofuscados 
        com suporte a análise de código e arquivos mapping.txt.
      </p>
      
      <Alert className="mb-4 bg-blue-50 border-blue-200 text-blue-800">
        <Info className="h-4 w-4 mr-2" />
        <AlertTitle>Análise de código Java</AlertTitle>
        <AlertDescription>
          Esta plataforma analisa arquivos JAR para validar técnicas de ofuscação e
          oferece integração com serviços de descompilação para comparação detalhada.
        </AlertDescription>
      </Alert>
      
      <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md text-sm">
        <Info className="h-4 w-4 mr-2" />
        <span>Carregue o arquivo JAR original, a versão ofuscada e o mapping.txt para análise comparativa</span>
      </div>
    </div>
  );
};

export default ValidationHeader;
