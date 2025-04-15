
import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Clock, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export type ValidationStatus = 'waiting' | 'running' | 'success' | 'failed' | 'warning';

export interface TestResult {
  id: string;
  name: string;
  status: ValidationStatus;
  message: string;
}

interface ValidationProgressProps {
  currentStep: number;
  progress: number;
  results: TestResult[];
  isComplete: boolean;
  comparisonResults?: {
    differences: number;
    matches: number;
    unmappedClasses: string[];
    decompileUrl?: string;
  } | null;
}

const ValidationProgress: React.FC<ValidationProgressProps> = ({
  currentStep,
  progress,
  results,
  isComplete,
  comparisonResults
}) => {
  const getStatusIcon = (status: ValidationStatus) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'waiting':
      case 'running':
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusClass = (status: ValidationStatus) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'running':
        return 'bg-blue-100 text-blue-800 border-blue-200 animate-pulse-fade';
      case 'waiting':
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const steps = [
    { label: 'Análise do arquivo', description: 'Verificando o arquivo JAR' },
    { label: 'Análise estática', description: 'Verificando obfuscação' },
    { label: 'Recomendações', description: 'Ferramentas para análise' },
    { label: 'Finalização', description: 'Gerando relatório' },
    { label: 'Comparação', description: 'Comparando JARs' }
  ];

  return (
    <div className="space-y-8">
      <Card className="border-dashed border-blue-400 bg-blue-50">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
            <div>
              <p className="text-sm text-blue-800">
                <strong>Análise de JARs:</strong> Esta aplicação realiza uma análise dos arquivos JAR 
                e oferece serviços de descompilação para comparação de código original e ofuscado.
                Utilize o arquivo mapping.txt gerado pelo ProGuard para melhorar os resultados da análise.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progresso da análise</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Steps */}
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={index} className="step-item">
            <div 
              className={`step-circle ${
                index < currentStep 
                  ? 'bg-guardian-blue' 
                  : index === currentStep 
                    ? 'bg-guardian-blue animate-pulse-fade' 
                    : 'bg-gray-300'
              }`}
            >
              {index + 1}
            </div>
            <div className="text-center">
              <p className="font-medium">{step.label}</p>
              <p className="text-xs text-gray-500">{step.description}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="step-connector mt-5 mx-2" />
            )}
          </div>
        ))}
      </div>

      {/* Results */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Resultados da análise</h3>
        {results.length > 0 ? (
          <div className="space-y-2">
            {results.map((result) => (
              <div 
                key={result.id} 
                className={`flex items-start justify-between p-3 border rounded ${getStatusClass(result.status)}`}
              >
                <div className="flex items-start">
                  <div className="mt-0.5 mr-2">
                    {getStatusIcon(result.status)}
                  </div>
                  <div>
                    <span className="font-medium">{result.name}</span>
                    <p className="text-sm mt-1">{result.message}</p>
                  </div>
                </div>
                <Badge variant={
                  result.status === 'success' ? 'success' : 
                  result.status === 'warning' ? 'warning' : 'destructive'
                }>
                  {result.status === 'success' ? 'Info' : 
                   result.status === 'warning' ? 'Atenção' : 'Falha'}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-gray-50 rounded-lg border text-center text-gray-500">
            {currentStep > 0 ? "Processando análise..." : "A análise será iniciada em breve"}
          </div>
        )}
      </div>

      {/* Comparison Results */}
      {comparisonResults && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Resultados da comparação de JARs</h3>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-blue-600">Diferenças encontradas</p>
                  <p className="text-2xl font-bold text-blue-800">{comparisonResults.differences}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-green-600">Correspondências</p>
                  <p className="text-2xl font-bold text-green-800">{comparisonResults.matches}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-yellow-600">Classes não mapeadas</p>
                  <p className="text-2xl font-bold text-yellow-800">{comparisonResults.unmappedClasses.length}</p>
                </div>
              </div>

              {comparisonResults.unmappedClasses.length > 0 && (
                <div className="mb-6">
                  <p className="font-medium mb-2">Classes não mapeadas:</p>
                  <div className="bg-gray-50 p-3 rounded border text-sm font-mono overflow-auto max-h-32">
                    {comparisonResults.unmappedClasses.map((className, idx) => (
                      <div key={idx} className="py-1">{className}</div>
                    ))}
                  </div>
                </div>
              )}

              {comparisonResults.decompileUrl && (
                <div className="mt-4">
                  <p className="mb-2 font-medium">Descompilação online:</p>
                  <Button 
                    variant="outline" 
                    className="flex items-center"
                    onClick={() => window.open(comparisonResults.decompileUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Abrir serviço de descompilação
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    Utilize o serviço online para carregar os arquivos JAR e comparar o código descompilado.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {isComplete && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <div>
                <p className="text-sm text-green-800">
                  <strong>Análise concluída!</strong> Para uma análise mais completa, utilize
                  o serviço de descompilação para comparar visualmente o código original e ofuscado.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ValidationProgress;
