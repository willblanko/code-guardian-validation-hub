
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Shield, ChevronRight } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import FileUploader from '@/components/FileUploader';
import TestConfigForm, { TestConfig } from '@/components/TestConfigForm';
import ValidationProgress from '@/components/ValidationProgress';
import ResultsSummary from '@/components/ResultsSummary';
import ValidationTabs from '@/components/validation/ValidationTabs';
import ValidationHeader from '@/components/validation/ValidationHeader';
import ValidationTutorial from '@/components/validation/ValidationTutorial';
import { useValidation } from '@/hooks/useValidation';
import { 
  generateAndDownloadPDF, 
  downloadTextFile, 
  generateAndDownloadCertificate
} from '@/lib/validationService';

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [testConfig, setTestConfig] = useState<TestConfig | null>(null);
  const [showResults, setShowResults] = useState(false);
  
  const {
    isValidating,
    validationComplete,
    currentStep,
    progress,
    results,
    startValidation,
    resetValidation
  } = useValidation();
  
  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    toast({
      title: "Arquivo selecionado",
      description: `${file.name} foi carregado com sucesso.`,
    });
  };
  
  const handleConfigChange = (config: TestConfig) => {
    setTestConfig(config);
  };
  
  const handleNextTab = () => {
    if (activeTab === 'upload' && selectedFile) {
      setActiveTab('configure');
    } else if (activeTab === 'configure' && testConfig) {
      setActiveTab('validate');
      setShowResults(false); // Redefine para mostrar a visualização de progresso
      startValidation(selectedFile, testConfig);
    }
  };
  
  const handleDownloadReport = () => {
    if (!selectedFile) return;
    generateAndDownloadPDF(
      results, 
      testConfig!, 
      selectedFile.name, 
      selectedFile.size
    );
    
    toast({
      title: "Relatório baixado",
      description: "O relatório detalhado foi baixado com sucesso.",
    });
  };
  
  const handleDownloadTextReport = () => {
    if (!results.length) return;
    const reportText = generateReport(results);
    downloadTextFile(reportText, "relatorio-validacao.txt");
    
    toast({
      title: "Relatório texto baixado",
      description: "O relatório detalhado em texto foi baixado com sucesso.",
    });
  };
  
  const handleDownloadCertificate = () => {
    if (!selectedFile) return;
    generateAndDownloadCertificate(results, selectedFile.name);
    
    toast({
      title: "Certificado baixado",
      description: "O certificado de validação foi baixado com sucesso.",
    });
  };

  const handleStartNewValidation = () => {
    setSelectedFile(null);
    setTestConfig(null);
    resetValidation();
    setActiveTab('upload');
    setShowResults(false);
  };
  
  const handleShowResults = () => {
    setShowResults(true);
  };

  const handleToggleView = () => {
    setShowResults(!showResults);
  };

  const canProceedFromUpload = !!selectedFile;
  const canProceedFromConfig = !!testConfig;
  
  // Helper function to generate a text report
  const generateReport = (results: any[]): string => {
    const passedTests = results.filter(r => r.status === 'success').length;
    const totalTests = results.length;
    const passRate = Math.round((passedTests / totalTests) * 100);
    
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR');
    const timeStr = now.toLocaleTimeString('pt-BR');
    
    let report = `# Relatório de Validação de Obfuscação
Data: ${dateStr} - ${timeStr}

## Resumo
- Total de testes: ${totalTests}
- Testes aprovados: ${passedTests}
- Taxa de aprovação: ${passRate}%

## Resultados detalhados\n`;

    results.forEach(result => {
      const statusText = 
        result.status === 'success' ? '✅ APROVADO' : 
        result.status === 'warning' ? '⚠️ ALERTA' : 
        result.status === 'failed' ? '❌ FALHA' : '';
        
      report += `\n### ${result.name}\n`;
      report += `Status: ${statusText}\n`;
      report += `Detalhes: ${result.message}\n`;
    });
    
    report += `\n## Conclusão\n`;
    
    if (passRate === 100) {
      report += `A aplicação passou em todos os testes de validação. A obfuscação foi implementada corretamente e a funcionalidade está preservada.`;
    } else if (passRate >= 80) {
      report += `A aplicação passou na maioria dos testes de validação. Recomenda-se revisar os avisos antes da implantação em produção.`;
    } else {
      report += `A aplicação apresentou problemas em vários testes. Recomenda-se revisar a implementação da obfuscação.`;
    }
    
    return report;
  };
  
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <ValidationHeader />
        
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-guardian-blue" />
              <CardTitle>Code Guardian - Validação Hub</CardTitle>
            </div>
            <CardDescription>
              Demonstração de testes de validação em aplicações Java obfuscadas.
              Para realizar testes reais, consulte as instruções no README.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <ValidationTabs 
                activeTab={activeTab}
                canProceedFromUpload={canProceedFromUpload}
                canProceedFromConfig={canProceedFromConfig}
                isValidating={isValidating}
              />
              
              <TabsContent value="upload" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Carregue seu arquivo JAR</h3>
                  <p className="text-gray-600">
                    Selecione o arquivo JAR (.jar) obfuscado para a demonstração de validação. 
                    Nenhum teste real será executado neste ambiente web.
                  </p>
                  <FileUploader onFileSelected={handleFileSelected} />
                </div>
              </TabsContent>
              
              <TabsContent value="configure" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Configure os testes de validação</h3>
                  <p className="text-gray-600">
                    Personalize os testes que serão simulados. Esta é uma demonstração para visualizar
                    como seria o processo de validação em um ambiente real.
                  </p>
                  <TestConfigForm onConfigChange={handleConfigChange} />
                </div>
              </TabsContent>
              
              <TabsContent value="validate" className="space-y-6">
                {validationComplete ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Progresso da Validação</h3>
                        <ValidationProgress
                          currentStep={currentStep}
                          progress={progress}
                          results={results}
                          isComplete={validationComplete}
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Resultados</h3>
                        <ResultsSummary 
                          results={results}
                          config={testConfig!}
                          fileName={selectedFile?.name || "arquivo.jar"}
                          fileSize={selectedFile?.size || 0}
                          onDownloadReport={handleDownloadReport}
                          onDownloadCertificate={handleDownloadCertificate}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <ValidationProgress
                    currentStep={currentStep}
                    progress={progress}
                    results={results}
                    isComplete={validationComplete}
                  />
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <div className="w-full flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  if (activeTab === 'configure') setActiveTab('upload');
                  if (activeTab === 'validate' && !validationComplete) setActiveTab('configure');
                }}
                disabled={activeTab === 'upload' || isValidating}
              >
                Voltar
              </Button>
              
              {activeTab !== 'validate' && (
                <Button
                  onClick={handleNextTab}
                  disabled={(activeTab === 'upload' && !canProceedFromUpload) || 
                            (activeTab === 'configure' && !canProceedFromConfig) ||
                            isValidating}
                  className="flex items-center"
                >
                  {activeTab === 'upload' ? 'Configurar Testes' : 'Iniciar Demonstração'}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
              
              {validationComplete && (
                <Button onClick={handleStartNewValidation}>
                  Nova Validação
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
        
        <ValidationTutorial />
      </div>
    </AppLayout>
  );
};

export default Index;
