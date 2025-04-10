
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TestResult } from './ValidationProgress';
import { TestConfig } from './TestConfigForm';
import { CheckCircle, XCircle, AlertCircle, Download, FileText, Save } from 'lucide-react';
import { generateAndDownloadPDF, generateAndDownloadCertificate, saveTestResults } from '@/lib/validationService';
import { useToast } from '@/components/ui/use-toast';

interface ResultsSummaryProps {
  results: TestResult[];
  config: TestConfig;
  fileName: string;
  fileSize: number;
  onDownloadReport: () => void;
  onDownloadCertificate: () => void;
}

const ResultsSummaryCard: React.FC<ResultsSummaryProps> = ({
  results,
  config,
  fileName,
  fileSize,
  onDownloadReport,
  onDownloadCertificate
}) => {
  const { toast } = useToast();
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

  const handleDownloadPdfReport = () => {
    generateAndDownloadPDF(results, config, fileName, fileSize);
    toast({
      title: "Relatório PDF baixado",
      description: "O relatório detalhado em PDF foi baixado com sucesso.",
    });
  };

  const handleDownloadPdfCertificate = () => {
    generateAndDownloadCertificate(results, fileName);
    toast({
      title: "Certificado PDF baixado",
      description: "O certificado de análise em PDF foi baixado com sucesso.",
    });
  };

  const handleSaveResults = async () => {
    const testId = await saveTestResults(fileName, fileSize, config, results);
    if (testId) {
      toast({
        title: "Resultados salvos",
        description: "Os resultados da análise foram salvos com sucesso no banco de dados.",
      });
    } else {
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar os resultados. Tente novamente.",
        variant: "destructive",
      });
    }
  };
  
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
          Resultado da Análise
        </CardTitle>
        <CardDescription>
          {overallStatus === 'success' 
            ? "Análise estática concluída com sucesso" 
            : overallStatus === 'warning'
            ? "Análise concluída com algumas recomendações"
            : "Análise identificou problemas com o arquivo"
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold">{totalTests}</div>
            <div className="text-sm text-gray-500">Total de Verificações</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-green-600">{passedTests}</div>
            <div className="text-sm text-gray-500">Informações</div>
          </div>
          <div className={`p-4 rounded-lg text-center ${warningTests > 0 ? 'bg-yellow-50' : 'bg-gray-50'}`}>
            <div className={`text-3xl font-bold ${warningTests > 0 ? 'text-yellow-600' : ''}`}>
              {warningTests}
            </div>
            <div className="text-sm text-gray-500">Recomendações</div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Progresso da análise</span>
            <span className="font-medium">100%</span>
          </div>
          <div className="progress-track">
            <div 
              className="h-full rounded-full bg-green-500" 
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Ferramentas recomendadas para obfuscação</h3>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md text-blue-800">
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>ProGuard</strong> - Ferramenta gratuita e de código aberto para obfuscação, otimização e redução de código Java.</li>
              <li><strong>YGuard</strong> - Ferramenta de obfuscação gratuita para projetos Java com suporte a obfuscação de nomes e criptografia de strings.</li>
              <li><strong>Allatori</strong> - Versão gratuita disponível com recursos básicos de obfuscação para projetos pequenos.</li>
            </ul>
          </div>
        </div>

        <div className="space-y-2 mt-6">
          <h3 className="font-medium">Detalhes da análise</h3>
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

            {results.filter(r => r.status === 'success').map(result => (
              <div key={result.id} className="p-3 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span className="font-medium">{result.name}</span>
                </div>
                <p className="text-sm text-green-600 ml-6">{result.message}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
        <Button className="w-full sm:w-auto" onClick={handleDownloadPdfReport}>
          <FileText className="mr-2 h-4 w-4" />
          Baixar Relatório PDF
        </Button>
        <Button variant="outline" className="w-full sm:w-auto" onClick={handleDownloadPdfCertificate}>
          <Download className="mr-2 h-4 w-4" />
          Baixar Certificado PDF
        </Button>
        <Button variant="secondary" className="w-full sm:w-auto" onClick={handleSaveResults}>
          <Save className="mr-2 h-4 w-4" />
          Salvar Resultados
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResultsSummaryCard;
