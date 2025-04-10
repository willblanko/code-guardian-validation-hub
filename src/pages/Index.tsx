
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
  generateReport, 
  downloadTextFile, 
  generateAndDownloadCertificate, 
  generateAndDownloadPDF
} from '@/lib/validationService';

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [testConfig, setTestConfig] = useState<TestConfig | null>(null);
  
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
    const reportContent = generateReport(results);
    downloadTextFile(reportContent, "relatorio-validacao.txt");
    
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
  };

  const canProceedFromUpload = !!selectedFile;
  const canProceedFromConfig = !!testConfig;
  
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
              Realize testes de validação em sua aplicação Java obfuscada e obtenha evidências de conformidade.
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
                    Selecione o arquivo JAR (.jar) obfuscado que deseja validar. 
                    O arquivo será analisado para verificar a eficácia da obfuscação e realizar testes de funcionalidade.
                  </p>
                  <FileUploader onFileSelected={handleFileSelected} />
                </div>
              </TabsContent>
              
              <TabsContent value="configure" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Configure os testes de validação</h3>
                  <p className="text-gray-600">
                    Personalize os testes que serão executados na sua aplicação. 
                    Você pode selecionar diferentes tipos de verificações de obfuscação e testes funcionais.
                  </p>
                  <TestConfigForm onConfigChange={handleConfigChange} />
                </div>
              </TabsContent>
              
              <TabsContent value="validate" className="space-y-6">
                {validationComplete ? (
                  <ResultsSummary 
                    results={results}
                    config={testConfig!}
                    fileName={selectedFile?.name || "arquivo.jar"}
                    fileSize={selectedFile?.size || 0}
                    onDownloadReport={handleDownloadReport}
                    onDownloadCertificate={handleDownloadCertificate}
                  />
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
                disabled={activeTab === 'upload' || isValidating || (activeTab === 'validate' && validationComplete)}
              >
                Voltar
              </Button>
              
              <Button
                onClick={handleNextTab}
                disabled={(activeTab === 'upload' && !canProceedFromUpload) || 
                          (activeTab === 'configure' && !canProceedFromConfig) ||
                          activeTab === 'validate' || 
                          isValidating}
                className="flex items-center"
              >
                {activeTab === 'upload' ? 'Configurar Testes' : 'Iniciar Validação'}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              
              {activeTab === 'validate' && validationComplete && (
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
