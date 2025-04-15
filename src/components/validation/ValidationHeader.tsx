
import React from 'react';
import { Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ValidationHeader: React.FC = () => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold mb-2">Validação de Aplicações Java Obfuscadas</h1>
      <p className="text-gray-600 max-w-2xl mx-auto mb-4">
        Plataforma para validação e comparação real de arquivos JAR (.jar) ofuscados 
        com descompilação e análise detalhada do código via backend dedicado.
      </p>
      
      <Alert className="mb-4 bg-blue-50 border-blue-200 text-blue-800">
        <Info className="h-4 w-4 mr-2" />
        <AlertTitle>Análise Real de Código Java</AlertTitle>
        <AlertDescription>
          Faça upload do JAR original, do JAR ofuscado e do arquivo mapping.txt para obter 
          uma análise detalhada baseada na descompilação real dos arquivos usando nosso servidor de processamento dedicado.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ValidationHeader;
