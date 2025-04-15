
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
import { useValidation, ValidationFiles } from '@/hooks/useValidation';
import { 
  generateAndDownloadPDF, 
  downloadTextFile, 
  generateAndDownloadCertificate
} from '@/lib/validationService';

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedFiles, setSelectedFiles] = useState<ValidationFiles>({});
  const [testConfig, setTestConfig] = useState<TestConfig | null>(null);
  
  const {
    isValidating,
    validationComplete,
    currentStep,
    progress,
    results,
    comparisonResults,
    startValidation,
    resetValidation
  } = useValidation();
  
  const handleFilesSelected = (files: ValidationFiles) => {
    setSelectedFiles(files);
    
    // Verificar se temos pelo menos o JAR ofuscado
    if (files.obfuscatedJar) {
      toast({
        title: "Arquivo ofuscado carregado",
        description: `${files.obfuscatedJar.name} foi carregado com sucesso.`,
      });
    }
  };
  
  const handleConfigChange = (config: TestConfig) => {
    setTestConfig(config);
  };
  
  const handleNextTab = () => {
    if (activeTab === 'upload' && selectedFiles.obfuscatedJar) {
      setActiveTab('configure');
    } else if (activeTab === 'configure' && testConfig) {
      setActiveTab('validate');
      startValidation(selectedFiles, testConfig);
    }
  };
  
  const handleDownloadReport = () => {
    if (!selectedFiles.obfuscatedJar) return;
    
    generateAndDownloadPDF(
      results, 
      testConfig!, 
      selectedFiles.obfuscatedJar.name, 
      selectedFiles.obfuscatedJar.size
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
    if (!selectedFiles.obfuscatedJar) return;
    generateAndDownloadCertificate(results, selectedFiles.obfuscatedJar.name);
    
    toast({
      title: "Certificado baixado",
      description: "O certificado de validação foi baixado com sucesso.",
    });
  };

  const handleStartNewValidation = () => {
    setSelectedFiles({});
    setTestConfig(null);
    resetValidation();
    setActiveTab('upload');
  };

  const canProceedFromUpload = !!selectedFiles.obfuscatedJar;
  const canProceedFromConfig = !!testConfig;
  
  // Helper function to generate a text report
  const generateReport = (results: any[]): string => {
    const passedTests = results.filter(r => r.status === 'success').length;
    const totalTests = results.length;
    
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR');
    const timeStr = now.toLocaleTimeString('pt-BR');
    
    let report = `# Relatório de Análise de Obfuscação
Data: ${dateStr} - ${timeStr}

## Resumo
- Total de verificações: ${totalTests}
- Recomendações: ${results.filter(r => r.status === 'warning').length}

## Resultados detalhados\n`;

    results.forEach(result => {
      const statusText = 
        result.status === 'success' ? '✅ INFO' : 
        result.status === 'warning' ? '⚠️ ATENÇÃO' : 
        result.status === 'failed' ? '❌ FALHA' : '';
        
      report += `\n### ${result.name}\n`;
      report += `Status: ${statusText}\n`;
      report += `Detalhes: ${result.message}\n`;
    });
    
    if (comparisonResults) {
      report += `\n## Resultados da comparação\n`;
      report += `- Diferenças encontradas: ${comparisonResults.differences}\n`;
      report += `- Correspondências: ${comparisonResults.matches}\n`;
      report += `- Classes não mapeadas: ${comparisonResults.unmappedClasses.length}\n`;
      
      if (comparisonResults.unmappedClasses.length > 0) {
        report += "\nClasses não mapeadas:\n";
        comparisonResults.unmappedClasses.forEach(className => {
          report += `- ${className}\n`;
        });
      }
    }
    
    report += `\n## Ferramentas recomendadas para ofuscação\n`;
    report += `
Para realizar ofuscação eficiente de código Java, recomendamos:
- ProGuard: Ferramenta gratuita e de código aberto para ofuscação, otimização e redução de código Java
- YGuard: Ferramenta gratuita com suporte para ofuscação de nomes e criptografia de strings`;
    
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
              Análise e comparação de aplicações Java ofuscadas usando decompilação e mapeamento.
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
                  <h3 className="text-lg font-medium">Carregue seus arquivos JAR</h3>
                  <p className="text-gray-600">
                    Para análise completa, carregue o JAR original, o JAR ofuscado e o arquivo mapping.txt
                    gerado pelo ProGuard. A análise será mais precisa com todos os arquivos.
                  </p>
                  <FileUploader onFilesSelected={handleFilesSelected} />
                </div>
              </TabsContent>
              
              <TabsContent value="configure" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Configure a análise</h3>
                  <p className="text-gray-600">
                    Selecione quais aspectos da obfuscação você deseja analisar.
                    A análise fornecerá informações detalhadas sobre as técnicas de ofuscação detectadas.
                  </p>
                  <TestConfigForm onConfigChange={handleConfigChange} />
                </div>
              </TabsContent>
              
              <TabsContent value="validate" className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Análise de Obfuscação</h3>
                    <ValidationProgress
                      currentStep={currentStep}
                      progress={progress}
                      results={results}
                      isComplete={validationComplete}
                      comparisonResults={comparisonResults}
                    />
                  </div>
                  
                  {validationComplete && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Resultados e Recomendações</h3>
                      <ResultsSummary 
                        results={results}
                        config={testConfig!}
                        fileName={selectedFiles.obfuscatedJar?.name || "arquivo.jar"}
                        fileSize={selectedFiles.obfuscatedJar?.size || 0}
                        onDownloadReport={handleDownloadReport}
                        onDownloadCertificate={handleDownloadCertificate}
                      />
                    </div>
                  )}
                </div>
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
                  {activeTab === 'upload' ? 'Configurar Análise' : 'Iniciar Análise'}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
              
              {validationComplete && (
                <Button onClick={handleStartNewValidation}>
                  Nova Análise
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
