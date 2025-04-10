
import { TestResult } from "@/components/ValidationProgress";
import { TestConfig } from "@/components/TestConfigForm";
import { generatePdfReport, generatePdfCertificate } from "@/utils/reportGenerator";

// Generate text report from test results
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

// Generate certificate as PDF blob
export const generateCertificate = (results: TestResult[]): Blob => {
  return generatePdfCertificate(results);
};

// Helper function to download PDF report
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
