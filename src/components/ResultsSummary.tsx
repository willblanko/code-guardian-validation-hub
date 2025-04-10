
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TestResult } from './ValidationProgress';
import { CheckCircle, XCircle, AlertCircle, Download, FileText } from 'lucide-react';

interface ResultsSummaryProps {
  results: TestResult[];
  onDownloadReport: () => void;
  onDownloadCertificate: () => void;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  results,
  onDownloadReport,
  onDownloadCertificate
}) => {
  const totalTests = results.length;
  const passedTests = results.filter(r => r.status === 'success').length;
  const failedTests = results.filter(r => r.status === 'failed').length;
  const warningTests = results.filter(r => r.status === 'warning').length;
  
  const passRate = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;
  
  const getOverallStatus = () => {
    if (failedTests > 0) return 'failed';
    if (warningTests > 0) return 'warning';
    return 'success';
  };
  
  const overallStatus = getOverallStatus();
  
  return (
    <Card className="w-full">
      <CardHeader className={`${
        overallStatus === 'success' ? 'bg-green-50' :
        overallStatus === 'warning' ? 'bg-yellow-50' : 'bg-red-50'
      }`}>
        <CardTitle className="flex items-center">
          {overallStatus === 'success' ? (
            <CheckCircle className="mr-2 h-6 w-6 text-green-600" />
          ) : overallStatus === 'warning' ? (
            <AlertCircle className="mr-2 h-6 w-6 text-yellow-600" />
          ) : (
            <XCircle className="mr-2 h-6 w-6 text-red-600" />
          )}
          Resultado da Validação
        </CardTitle>
        <CardDescription>
          {overallStatus === 'success' 
            ? "Todos os testes foram concluídos com sucesso!" 
            : overallStatus === 'warning'
            ? "Validação concluída com alguns avisos"
            : "Alguns testes falharam durante a validação"
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold">{totalTests}</div>
            <div className="text-sm text-gray-500">Total de Testes</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-green-600">{passedTests}</div>
            <div className="text-sm text-gray-500">Testes Aprovados</div>
          </div>
          <div className={`p-4 rounded-lg text-center ${failedTests > 0 ? 'bg-red-50' : 'bg-gray-50'}`}>
            <div className={`text-3xl font-bold ${failedTests > 0 ? 'text-red-600' : ''}`}>
              {failedTests}
            </div>
            <div className="text-sm text-gray-500">Testes Falhados</div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Taxa de aprovação</span>
            <span className="font-medium">{passRate}%</span>
          </div>
          <div className="progress-track">
            <div 
              className={`h-full rounded-full ${
                passRate > 80 ? 'bg-green-500' : 
                passRate > 50 ? 'bg-yellow-500' : 'bg-red-500'
              }`} 
              style={{ width: `${passRate}%` }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Detalhes da validação</h3>
          <div className="space-y-2">
            {results.filter(r => r.status === 'failed').map(result => (
              <div key={result.id} className="p-3 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-center text-red-700">
                  <XCircle className="h-4 w-4 mr-2" />
                  <span className="font-medium">{result.name}</span>
                </div>
                <p className="text-sm text-red-600 ml-6">{result.message}</p>
              </div>
            ))}
            
            {results.filter(r => r.status === 'warning').map(result => (
              <div key={result.id} className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <div className="flex items-center text-yellow-700">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <span className="font-medium">{result.name}</span>
                </div>
                <p className="text-sm text-yellow-600 ml-6">{result.message}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
        <Button className="w-full sm:w-auto" onClick={onDownloadReport}>
          <FileText className="mr-2 h-4 w-4" />
          Baixar Relatório Completo
        </Button>
        <Button variant="outline" className="w-full sm:w-auto" onClick={onDownloadCertificate}>
          <Download className="mr-2 h-4 w-4" />
          Baixar Certificado de Validação
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResultsSummary;
