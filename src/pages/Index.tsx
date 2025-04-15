
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Shield } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import FileUploader from '@/components/FileUploader';
import ValidationProgress from '@/components/ValidationProgress';
import ResultsSummary from '@/components/ResultsSummary';
import ValidationHeader from '@/components/validation/ValidationHeader';
import ValidationTutorial from '@/components/validation/ValidationTutorial';
import ValidationTabs from '@/components/validation/ValidationTabs';
import { useValidation, ValidationFiles } from '@/hooks/useValidation';
import { 
  generateAndDownloadPDF, 
  downloadTextFile, 
  generateAndDownloadCertificate
} from '@/lib/validationService';

const Index = () => {
  const { toast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<ValidationFiles>({});
  
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
    // Manter os arquivos existentes que não foram substituídos
    setSelectedFiles(prevFiles => ({
      ...prevFiles,
      ...files
    }));
    
    // Verificar se temos pelo menos o JAR ofuscado
    if (files.obfuscatedJar) {
      toast({
        title: "Arquivo ofuscado carregado",
        description: `${files.obfuscatedJar.name} foi carregado com sucesso.`,
      });
    }
  };
  
  const handleStartValidation = () => {
    // Verificação completa dos arquivos necessários
    if (selectedFiles.originalJar && selectedFiles.obfuscatedJar) {
      startValidation(selectedFiles, {
        obfuscationTests: {
          classNameObfuscation: true,
          stringEncryption: true,
          controlFlowObfuscation: true,
          watermarkCheck: true
        },
        functionalTests: {
          enabled: true,
          customTestCommand: "",
          timeoutSeconds: 30
        },
        securityTests: {
          enabled: true,
          decompilationProtection: true,
          antiDebug: true
        }
      });
    } else {
      toast({
        title: "Arquivos incompletos",
        description: "Por favor, carregue o JAR original e o JAR ofuscado para prosseguir. O arquivo mapping.txt é recomendado, mas opcional.",
        variant: "destructive"
      });
    }
  };
  
  const handleDownloadReport = () => {
    if (!selectedFiles.obfuscatedJar) return;
    
    generateAndDownloadPDF(
      results, 
      {
        obfuscationTests: {
          classNameObfuscation: true,
          stringEncryption: true,
          controlFlowObfuscation: true,
          watermarkCheck: true
        },
        functionalTests: {
          enabled: true,
          customTestCommand: "",
          timeoutSeconds: 30
        },
        securityTests: {
          enabled: true,
          decompilationProtection: true,
          antiDebug: true
        }
      }, 
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
    resetValidation();
  };
  
  // Verificamos se todos os arquivos necessários foram carregados
  const allFilesUploaded = !!selectedFiles.originalJar && !!selectedFiles.obfuscatedJar;
  
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
      
      if (comparisonResults.diffDetails && comparisonResults.diffDetails.length > 0) {
        report += "\n## Detalhamento das diferenças\n";
        comparisonResults.diffDetails.forEach((diff, index) => {
          report += `${index + 1}. ${diff.className} - ${diff.type}\n`;
          if (diff.original && diff.obfuscated) {
            report += `   Original: ${diff.original}\n`;
            report += `   Ofuscado: ${diff.obfuscated}\n`;
          }
          report += "\n";
        });
      }
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
              Análise, descompilação e comparação de aplicações Java ofuscadas usando o arquivo mapping.txt.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!validationComplete && !isValidating && (
              <div className="space-y-6">
                <FileUploader onFilesSelected={handleFilesSelected} />
                <ValidationTabs 
                  allFilesUploaded={allFilesUploaded}
                  isValidating={isValidating}
                  onStartValidation={handleStartValidation}
                />
              </div>
            )}
            
            {(isValidating || validationComplete) && (
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
                      config={{
                        obfuscationTests: {
                          classNameObfuscation: true,
                          stringEncryption: true,
                          controlFlowObfuscation: true,
                          watermarkCheck: true
                        },
                        functionalTests: {
                          enabled: true,
                          customTestCommand: "",
                          timeoutSeconds: 30
                        },
                        securityTests: {
                          enabled: true,
                          decompilationProtection: true,
                          antiDebug: true
                        }
                      }}
                      fileName={selectedFiles.obfuscatedJar?.name || "arquivo.jar"}
                      fileSize={selectedFiles.obfuscatedJar?.size || 0}
                      comparisonResults={comparisonResults}
                      onDownloadReport={handleDownloadReport}
                      onDownloadCertificate={handleDownloadCertificate}
                    />
                  </div>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <div className="w-full flex justify-end">
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
