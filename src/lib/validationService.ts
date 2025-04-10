
import { TestConfig } from "@/components/TestConfigForm";
import { TestResult, ValidationStatus } from "@/components/ValidationProgress";
import { generatePdfReport, testDescriptions } from "@/utils/reportGenerator";
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
  
  // Step 2: Obfuscation Analysis
  onStepChange(1);
  onProgress(30);
  
  if (config.obfuscationTests.classNameObfuscation) {
    await simulateOperation(1500);
    onResultUpdate({
      id: 'class-obfuscation',
      name: 'Obfuscação de nomes de classes',
      status: 'success',
      message: 'Classes adequadamente ofuscadas'
    });
    onProgress(40);
  }
  
  if (config.obfuscationTests.stringEncryption) {
    await simulateOperation(1200);
    onResultUpdate({
      id: 'string-encryption',
      name: 'Criptografia de strings',
      status: 'success',
      message: 'Strings estão criptografadas'
    });
    onProgress(50);
  }
  
  if (config.obfuscationTests.controlFlowObfuscation) {
    await simulateOperation(1000);
    onResultUpdate({
      id: 'control-flow',
      name: 'Obfuscação de fluxo de controle',
      status: 'warning',
      message: 'Obfuscação parcial detectada'
    });
    onProgress(60);
  }
  
  if (config.obfuscationTests.watermarkCheck) {
    await simulateOperation(800);
    onResultUpdate({
      id: 'watermark',
      name: 'Verificação de marca d\'água',
      status: 'success',
      message: 'Marca d\'água detectada'
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
      onResultUpdate({
        id: 'decompilation',
        name: 'Proteção contra descompilação',
        status: 'success',
        message: 'Proteção efetiva contra descompilação'
      });
    }
    
    if (config.securityTests.antiDebug) {
      onResultUpdate({
        id: 'anti-debug',
        name: 'Proteções anti-debug',
        status: Math.random() > 0.5 ? 'success' : 'warning',
        message: Math.random() > 0.5 ? 'Proteções anti-debug detectadas' : 'Proteções anti-debug parciais'
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

export const generateCertificate = (results: TestResult[]): string => {
  const passedTests = results.filter(r => r.status === 'success').length;
  const totalTests = results.length;
  const passRate = Math.round((passedTests / totalTests) * 100);
  
  const now = new Date();
  const dateStr = now.toLocaleDateString('pt-BR');
  
  let certificate = `
CERTIFICADO DE VALIDAÇÃO DE OBFUSCAÇÃO
======================================

Este certificado atesta que a aplicação Java submetida à análise
foi validada pelo sistema Code Guardian e obteve os seguintes resultados:

Data da validação: ${dateStr}
Taxa de aprovação: ${passRate}%
Total de testes realizados: ${totalTests}
Total de testes aprovados: ${passedTests}

`;

  if (passRate === 100) {
    certificate += `RESULTADO: APROVADO INTEGRALMENTE
A aplicação implementa técnicas de obfuscação eficazes e mantém sua funcionalidade
conforme esperado. Este certificado é válido como comprovação de que a aplicação
está protegida contra engenharia reversa e cumpre as boas práticas de mercado.`;
  } else if (passRate >= 80) {
    certificate += `RESULTADO: APROVADO COM RESSALVAS
A aplicação implementa a maioria das técnicas de obfuscação esperadas e mantém
sua funcionalidade. Recomenda-se atenção aos pontos de atenção destacados no
relatório detalhado antes da implantação em ambiente de produção.`;
  } else {
    certificate += `RESULTADO: NECESSITA REVISÃO
A aplicação apresenta deficiências significativas na implementação das técnicas
de obfuscação. Recomenda-se a revisão dos pontos indicados no relatório detalhado
antes de prosseguir com a implantação.`;
  }
  
  certificate += `

Certificado gerado automaticamente pelo sistema Code Guardian.
Este documento serve como evidência formal da validação realizada.

ID do Certificado: CG-${Math.random().toString(36).substring(2, 10).toUpperCase()}
`;

  return certificate;
};

// Helper function to generate and download PDF
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
