
import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
}

const ValidationProgress: React.FC<ValidationProgressProps> = ({
  currentStep,
  progress,
  results,
  isComplete
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
    { label: 'Carregamento', description: 'Validando o arquivo JAR' },
    { label: 'Análise', description: 'Verificando obfuscação' },
    { label: 'Testes', description: 'Simulando testes funcionais' },
    { label: 'Finalização', description: 'Gerando relatório' },
  ];

  return (
    <div className="space-y-8">
      <Card className="border-dashed border-yellow-400 bg-yellow-50">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
            <div>
              <p className="text-sm text-yellow-800">
                <strong>Ambiente de simulação:</strong> Esta é uma demonstração que simula a validação de aplicações Java. 
                Em um ambiente real, os testes seriam executados diretamente na aplicação, incluindo 
                verificação de licenças e proteções anti-debugging.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progresso da simulação</span>
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
        <h3 className="font-semibold text-lg">Resultados dos testes</h3>
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
                  {result.status === 'success' ? 'Aprovado' : 
                   result.status === 'warning' ? 'Alerta' : 'Falha'}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-gray-50 rounded-lg border text-center text-gray-500">
            {currentStep > 0 ? "Aguardando resultados..." : "A simulação será iniciada em breve"}
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidationProgress;
