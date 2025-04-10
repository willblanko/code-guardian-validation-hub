
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Shield, Upload, Cog, CheckCircle, ChevronRight } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import FileUploader from '@/components/FileUploader';
import TestConfigForm, { TestConfig } from '@/components/TestConfigForm';
import ValidationProgress, { TestResult } from '@/components/ValidationProgress';
import ResultsSummary from '@/components/ResultsSummary';
import { runValidation, generateReport, generateCertificate, downloadTextFile } from '@/lib/validationService';

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [testConfig, setTestConfig] = useState<TestConfig | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [validationComplete, setValidationComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<TestResult[]>([]);
  
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
      startValidation();
    }
  };
  
  const startValidation = async () => {
    if (!selectedFile || !testConfig) return;
    
    setIsValidating(true);
    setProgress(0);
    setCurrentStep(0);
    setResults([]);
    
    try {
      await runValidation(
        selectedFile,
        testConfig,
        (p) => setProgress(p),
        (step) => setCurrentStep(step),
        (result) => {
          setResults(prev => {
            const exists = prev.some(r => r.id === result.id);
            if (exists) {
              return prev.map(r => r.id === result.id ? result : r);
            }
            return [...prev, result];
          });
        }
      );
      
      setValidationComplete(true);
      toast({
        title: "Validação concluída",
        description: "O processo de validação foi finalizado com sucesso.",
      });
    } catch (error) {
      console.error("Validation error:", error);
      toast({
        title: "Erro de validação",
        description: "Ocorreu um erro durante o processo de validação.",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };
  
  const handleDownloadReport = () => {
    const reportContent = generateReport(results);
    downloadTextFile(reportContent, "relatorio-validacao.txt");
    
    toast({
      title: "Relatório baixado",
      description: "O relatório detalhado foi baixado com sucesso.",
    });
  };
  
  const handleDownloadCertificate = () => {
    const certificateContent = generateCertificate(results);
    downloadTextFile(certificateContent, "certificado-validacao.txt");
    
    toast({
      title: "Certificado baixado",
      description: "O certificado de validação foi baixado com sucesso.",
    });
  };

  const canProceedFromUpload = !!selectedFile;
  const canProceedFromConfig = !!testConfig;
  
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Validação de Aplicações Java Obfuscadas</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Plataforma para validação automática de aplicações Java (.jar) obfuscadas, 
            com testes de funcionalidade e relatórios detalhados.
          </p>
        </div>
        
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
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger 
                  value="upload" 
                  className="flex items-center justify-center"
                  disabled={isValidating}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </TabsTrigger>
                <TabsTrigger 
                  value="configure" 
                  className="flex items-center justify-center"
                  disabled={!canProceedFromUpload || isValidating}
                >
                  <Cog className="h-4 w-4 mr-2" />
                  Configuração
                </TabsTrigger>
                <TabsTrigger 
                  value="validate" 
                  className="flex items-center justify-center"
                  disabled={!canProceedFromConfig || isValidating}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Validação
                </TabsTrigger>
              </TabsList>
              
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
                <Button
                  onClick={() => {
                    setSelectedFile(null);
                    setTestConfig(null);
                    setValidationComplete(false);
                    setResults([]);
                    setActiveTab('upload');
                  }}
                >
                  Nova Validação
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
        
        <div className="mt-10 border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">Tutorial de Validação</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">1. Preparação do Arquivo</h3>
              <p className="text-gray-600">
                Antes de iniciar a validação, certifique-se de que sua aplicação Java está corretamente obfuscada
                utilizando ferramentas como ProGuard, DexGuard ou similares. O arquivo deve estar no formato JAR (.jar).
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">2. Upload do Arquivo</h3>
              <p className="text-gray-600">
                Faça o upload do arquivo JAR obfuscado na plataforma. O sistema aceitará apenas arquivos com a extensão .jar.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">3. Configuração dos Testes</h3>
              <p className="text-gray-600">
                Configure quais aspectos da obfuscação deseja validar, como:
              </p>
              <ul className="list-disc list-inside ml-4 text-gray-600">
                <li>Verificação de obfuscação de nomes de classes</li>
                <li>Validação de criptografia de strings</li>
                <li>Verificação de obfuscação de fluxo de controle</li>
                <li>Testes funcionais para garantir que a aplicação mantém seu comportamento esperado</li>
                <li>Testes de segurança para verificar proteções contra descompilação e debugging</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">4. Execução da Validação</h3>
              <p className="text-gray-600">
                Inicie o processo de validação. O sistema executará automaticamente todos os testes configurados
                e exibirá o progresso em tempo real.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">5. Análise dos Resultados</h3>
              <p className="text-gray-600">
                Após a conclusão da validação, analise os resultados detalhados para verificar se a obfuscação
                foi implementada corretamente e se a aplicação mantém sua funcionalidade.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">6. Exportação de Evidências</h3>
              <p className="text-gray-600">
                Exporte o relatório detalhado e o certificado de validação. Estes documentos servem como evidências
                formais de que sua aplicação passou pelos testes de validação e está adequadamente protegida
                contra engenharia reversa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
