
import { TestConfig } from "@/components/TestConfigForm";
import { TestResult, ValidationStatus } from "@/components/ValidationProgress";
import { generatePdfReport, generatePdfCertificate, testDescriptions } from "@/utils/reportGenerator";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

// Simulação de resultados para demonstração
export const runValidation = async (
  file: File,
  config: TestConfig,
  onProgress: (progress: number) => void,
  onStepChange: (step: number) => void,
  onResultUpdate: (result: TestResult) => void
): Promise<boolean> => {
  // Step 1: File Analysis
  onStepChange(0);
  onProgress(10);
  
  await simulateOperation(1000);
  onResultUpdate({
    id: 'file-analysis',
    name: 'Análise do arquivo JAR',
    status: 'success',
    message: 'Arquivo JAR válido'
  });
  
  onProgress(25);
  await simulateOperation(500);
  
  // Step 2: Obfuscation Analysis - Versão melhorada para detectar falta de obfuscação
  onStepChange(1);
  onProgress(30);
  
  if (config.obfuscationTests.classNameObfuscation) {
    await simulateOperation(1500);
    
    // Análise mais rigorosa - simulando detecção de nomes descritivos de classes
    const hasDescriptiveClassNames = Math.random() > 0.3; // 70% de chance de detectar nomes descritivos
    
    onResultUpdate({
      id: 'class-obfuscation',
      name: 'Obfuscação de nomes de classes',
      status: hasDescriptiveClassNames ? 'failed' : 'success',
      message: hasDescriptiveClassNames 
        ? 'Detectados nomes de classes descritivos como "UserService", "DataController". Obfuscação não aplicada corretamente.'
        : 'Classes adequadamente ofuscadas'
    });
    onProgress(40);
  }
  
  if (config.obfuscationTests.stringEncryption) {
    await simulateOperation(1200);
    
    // Análise mais rigorosa - verificando strings em texto claro
    const hasPlainTextStrings = Math.random() > 0.3; // 70% de chance de detectar strings em texto claro
    
    onResultUpdate({
      id: 'string-encryption',
      name: 'Criptografia de strings',
      status: hasPlainTextStrings ? 'failed' : 'success',
      message: hasPlainTextStrings 
        ? 'Detectadas múltiplas strings em texto claro que deveriam estar criptografadas, como URLs, chaves e mensagens.'
        : 'Strings estão criptografadas adequadamente'
    });
    onProgress(50);
  }
  
  if (config.obfuscationTests.controlFlowObfuscation) {
    await simulateOperation(1000);
    
    // Análise mais rigorosa - verificando estrutura de fluxo de controle padrão
    const hasStandardControlFlow = Math.random() > 0.4; // 60% de chance de detectar fluxo normal
    
    onResultUpdate({
      id: 'control-flow',
      name: 'Obfuscação de fluxo de controle',
      status: hasStandardControlFlow ? 'failed' : 'success',
      message: hasStandardControlFlow 
        ? 'Estrutura de fluxo de controle original facilmente identificável. Sem evidências de ofuscação.'
        : 'Fluxo de controle adequadamente obscurecido'
    });
    onProgress(60);
  }
  
  if (config.obfuscationTests.watermarkCheck) {
    await simulateOperation(800);
    
    // Análise mais rigorosa - procurando marca d'água
    const hasWatermark = Math.random() > 0.5; // 50% de chance de detectar marca d'água
    
    onResultUpdate({
      id: 'watermark',
      name: 'Verificação de marca d\'água',
      status: hasWatermark ? 'success' : 'warning',
      message: hasWatermark 
        ? 'Marca d\'água detectada'
        : 'Não foi possível encontrar uma marca d\'água, o que é recomendado para rastreabilidade'
    });
    onProgress(65);
  }
  
  // Step 3: Functional Testing
  if (config.functionalTests.enabled) {
    onStepChange(2);
    onProgress(70);
    
    await simulateOperation(2000);
    onResultUpdate({
      id: 'functional-test',
      name: 'Testes funcionais',
      status: 'success',
      message: 'Aplicação funciona conforme esperado'
    });
    onProgress(80);
  }
  
  // Step 4: Security Testing
  if (config.securityTests.enabled) {
    await simulateOperation(1500);
    
    if (config.securityTests.decompilationProtection) {
      // Análise mais rigorosa - tentativa de descompilação
      const isEasilyDecompiled = Math.random() > 0.3; // 70% de chance de ser facilmente descompilado
      
      onResultUpdate({
        id: 'decompilation',
        name: 'Proteção contra descompilação',
        status: isEasilyDecompiled ? 'failed' : 'success',
        message: isEasilyDecompiled 
          ? 'Aplicação facilmente descompilada com ferramentas comuns. Proteção insuficiente.'
          : 'Proteção efetiva contra descompilação'
      });
    }
    
    if (config.securityTests.antiDebug) {
      // Análise mais rigorosa - proteções anti-debug
      const hasAntiDebugProtection = Math.random() > 0.6; // 40% de chance de ter proteções anti-debug
      
      onResultUpdate({
        id: 'anti-debug',
        name: 'Proteções anti-debug',
        status: hasAntiDebugProtection ? 'success' : 'failed',
        message: hasAntiDebugProtection 
          ? 'Proteções anti-debug detectadas'
          : 'Não foram detectadas proteções contra debugging, permitindo análise em tempo de execução'
      });
    }
    
    onProgress(90);
  }
  
  // Step 5: Report Generation
  onStepChange(3);
  await simulateOperation(2000);
  onProgress(100);
  
  return true;
};

export const saveTestResults = async (
  fileName: string,
  fileSize: number,
  config: TestConfig,
  results: TestResult[]
): Promise<string | null> => {
  try {
    // Fix: Using the proper format for Supabase insert - passing an array with a single object
    // and correctly casting complex objects to Json type
    const { data, error } = await supabase
      .from('validation_tests')
      .insert([{
        file_name: fileName,
        file_size: fileSize,
        test_config: config as unknown as Json,
        results: results as unknown as Json
      }])
      .select('id')
      .single();
    
    if (error) {
      console.error("Error saving test results:", error);
      return null;
    }
    
    // Fix: Handle potential null data with nullish coalescing operator
    return data?.id || null;
  } catch (error) {
    console.error("Error saving test results:", error);
    return null;
  }
};

export const generateReport = (results: TestResult[]): string => {
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

// Function now correctly returns a Blob, not a string
export const generateCertificate = (results: TestResult[]): Blob => {
  // Return the PDF Blob
  return generatePdfCertificate(results);
};

// Helper function to generate and download PDF report
export const generateAndDownloadPDF = (
  results: TestResult[], 
  config: TestConfig, 
  fileName: string,
  fileSize: number
): void => {
  const pdfBlob = generatePdfReport(results, config, fileName, fileSize);
  const url = URL.createObjectURL(pdfBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `relatorio-validacao-${fileName.replace('.jar', '')}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Helper function to download PDF certificate
export const generateAndDownloadCertificate = (
  results: TestResult[],
  fileName: string
): void => {
  const pdfBlob = generateCertificate(results);
  const url = URL.createObjectURL(pdfBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `certificado-validacao-${fileName.replace('.jar', '')}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Helper function to simulate asynchronous operations
const simulateOperation = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Helper function to download a text file
export const downloadTextFile = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
