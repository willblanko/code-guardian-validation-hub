
import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';

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
    { label: 'Testes', description: 'Executando testes funcionais' },
    { label: 'Finalização', description: 'Gerando relatório' },
  ];

  return (
    <div className="space-y-8">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progresso da validação</span>
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
                className={`flex items-center justify-between p-3 border rounded ${getStatusClass(result.status)}`}
              >
                <div className="flex items-center">
                  {getStatusIcon(result.status)}
                  <span className="ml-2 font-medium">{result.name}</span>
                </div>
                <span className="text-sm">{result.message}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-gray-50 rounded-lg border text-center text-gray-500">
            {currentStep > 0 ? "Aguardando resultados..." : "A validação será iniciada em breve"}
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidationProgress;
