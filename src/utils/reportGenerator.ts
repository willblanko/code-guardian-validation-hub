
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { TestResult } from '@/components/ValidationProgress';

// Test descriptions to explain each test type
export const testDescriptions = {
  obfuscation: {
    classNameObfuscation: "Verifica se os nomes das classes foram devidamente ofuscados para evitar sua identificação fácil por técnicas de engenharia reversa.",
    stringEncryption: "Avalia se as strings no código foram criptografadas para proteger mensagens, URLs, chaves e outros dados sensíveis.",
    controlFlowObfuscation: "Analisa se a estrutura do fluxo de controle (condicionais, loops) foi alterada para dificultar a análise estática e dinâmica do código.",
    watermarkCheck: "Verifica a presença de marca d'água digital inserida durante o processo de obfuscação, útil para rastreabilidade."
  },
  functional: {
    general: "Executa a aplicação para garantir que, apesar da obfuscação, ela mantém todas as funcionalidades originais e não apresenta erros de execução.",
    licenseCheck: "Verifica se o sistema de validação de licenças está funcionando corretamente, incluindo a validação do arquivo license.key."
  },
  security: {
    decompilationProtection: "Avalia a resistência do código contra tentativas de descompilação, verificando se ferramentas comuns não conseguem reverter o bytecode.",
    antiDebug: "Testa a presença de proteções contra debugging, que dificultam a análise dinâmica do código em tempo de execução."
  }
};

export const generatePdfReport = (results: TestResult[], config: any, fileName: string, fileSize: number): Blob => {
  const doc = new jsPDF();
  const now = new Date();
  const dateStr = now.toLocaleDateString('pt-BR');
  const timeStr = now.toLocaleTimeString('pt-BR');
  
  // Aviso de simulação 
  doc.setFillColor(255, 248, 225);  // Cor de fundo amarelo claro
  doc.rect(10, 10, 190, 20, 'F');
  doc.setTextColor(150, 100, 0);  // Texto amarelo escuro
  doc.setFontSize(10);
  doc.text('AVISO: Este relatório é uma simulação para demonstração. Em um ambiente real, os testes seriam executados na aplicação Java.', 15, 20);
  
  // Logo and Title
  doc.setFontSize(20);
  doc.setTextColor(31, 78, 121); // Guardian blue color
  doc.text('Code Guardian', 105, 40, { align: 'center' });
  doc.setFontSize(16);
  doc.text('Relatório de Validação de Obfuscação', 105, 50, { align: 'center' });
  
  // Metadata
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Data: ${dateStr} - ${timeStr}`, 20, 60);
  doc.text(`Arquivo: ${fileName}`, 20, 65);
  doc.text(`Tamanho: ${formatFileSize(fileSize)}`, 20, 70);
  doc.text(`ID do Relatório: CG-${Math.random().toString(36).substring(2, 10).toUpperCase()}`, 20, 75);
  
  // Summary
  const passedTests = results.filter(r => r.status === 'success').length;
  const totalTests = results.length;
  const passRate = Math.round((passedTests / totalTests) * 100);
  
  doc.setFontSize(14);
  doc.setTextColor(31, 78, 121);
  doc.text('Resumo da Validação', 20, 90);
  
  doc.setFontSize(10);
  doc.setTextColor(0);
  doc.text(`Total de testes: ${totalTests}`, 30, 100);
  doc.text(`Testes aprovados: ${passedTests}`, 30, 105);
  doc.text(`Taxa de aprovação: ${passRate}%`, 30, 110);
  
  // Results Table
  doc.setFontSize(14);
  doc.setTextColor(31, 78, 121);
  doc.text('Resultados Detalhados', 20, 125);
  
  const tableData = results.map(result => {
    // Formatação melhorada do status
    let statusText = '';
    switch(result.status) {
      case 'success':
        statusText = 'APROVADO';
        break;
      case 'warning':
        statusText = 'ALERTA';
        break;
      case 'failed':
        statusText = 'FALHA';
        break;
      default:
        statusText = result.status;
    }
    
    // Descrição do teste
    let description = getTestDescription(result.id);
    
    // Formatação melhorada da mensagem
    return [
      result.name,
      statusText,
      result.message
    ];
  });
  
  autoTable(doc, {
    startY: 130,
    head: [['Teste', 'Status', 'Resultado']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [31, 78, 121], textColor: [255, 255, 255] },
    styles: { fontSize: 9 },
    columnStyles: { 
      0: { cellWidth: 60 },
      1: { cellWidth: 30 },
      2: { cellWidth: 100 }
    },
    didDrawCell: (data) => {
      // Aplicar cor específica para células de status
      if (data.section === 'body' && data.column.index === 1) {
        const status = tableData[data.row.index][1];
        if (status === 'APROVADO') {
          doc.setFillColor(200, 250, 200);
          doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
          doc.setTextColor(0, 100, 0);
          doc.text('APROVADO', data.cell.x + 5, data.cell.y + 10);
        } else if (status === 'ALERTA') {
          doc.setFillColor(255, 250, 200);
          doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
          doc.setTextColor(150, 100, 0);
          doc.text('ALERTA', data.cell.x + 5, data.cell.y + 10);
        } else if (status === 'FALHA') {
          doc.setFillColor(255, 200, 200);
          doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
          doc.setTextColor(150, 0, 0);
          doc.text('FALHA', data.cell.x + 7, data.cell.y + 10);
        }
        return true; // Impede a renderização padrão da célula
      }
      return false; // Permite a renderização padrão para outras células
    }
  });
  
  // Conclusion
  const finalY = (doc as any).lastAutoTable.finalY || 150;
  doc.setFontSize(14);
  doc.setTextColor(31, 78, 121);
  doc.text('Conclusão', 20, finalY + 20);
  
  doc.setFontSize(10);
  doc.setTextColor(0);
  let conclusionText = '';
  
  if (passRate === 100) {
    conclusionText = 'A aplicação passou em todos os testes de validação. A obfuscação foi implementada corretamente e a funcionalidade está preservada. Este relatório serve como evidência de que a aplicação está adequadamente protegida contra técnicas comuns de engenharia reversa.';
  } else if (passRate >= 80) {
    conclusionText = 'A aplicação passou na maioria dos testes de validação. Embora existam alguns pontos de atenção, a obfuscação geral é satisfatória. Recomenda-se revisar os avisos antes da implantação em produção.';
  } else {
    conclusionText = 'A aplicação apresentou problemas em vários testes. Recomenda-se revisar a implementação da obfuscação, com foco nos pontos destacados como falha neste relatório.';
  }
  
  const splitText = doc.splitTextToSize(conclusionText, 170);
  doc.text(splitText, 20, finalY + 30);
  
  // Certification
  doc.setFontSize(14);
  doc.setTextColor(31, 78, 121);
  doc.text('Certificação', 20, finalY + 60);
  
  doc.setFontSize(10);
  doc.setTextColor(0);
  let certificationText = `Este documento certifica que o aplicativo Java analisado foi submetido a uma bateria de testes padronizados para validação de obfuscação de código. Os testes foram conduzidos em ${dateStr} utilizando a plataforma Code Guardian e resultaram em uma taxa de aprovação de ${passRate}%.`;
  
  if (passRate >= 85) {
    certificationText += '\n\nCom base nos resultados, este aplicativo ATENDE aos requisitos padrão de mercado para proteção de código via obfuscação.';
  } else if (passRate >= 70) {
    certificationText += '\n\nCom base nos resultados, este aplicativo ATENDE PARCIALMENTE aos requisitos padrão de mercado para proteção de código via obfuscação.';
  } else {
    certificationText += '\n\nCom base nos resultados, este aplicativo NÃO ATENDE aos requisitos padrão de mercado para proteção de código via obfuscação.';
  }
  
  const splitCertText = doc.splitTextToSize(certificationText, 170);
  doc.text(splitCertText, 20, finalY + 70);
  
  // Footer with validity
  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text(`Code Guardian - Relatório gerado automaticamente - Válido por 90 dias a partir de ${dateStr}`, 105, 280, { align: 'center' });
  
  // Return as blob
  return doc.output('blob');
};

export const generatePdfCertificate = (results: TestResult[]): Blob => {
  const doc = new jsPDF();
  const now = new Date();
  const dateStr = now.toLocaleDateString('pt-BR');
  const certId = `CG-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  
  const passedTests = results.filter(r => r.status === 'success').length;
  const totalTests = results.length;
  const passRate = Math.round((passedTests / totalTests) * 100);
  
  // Aviso de simulação
  doc.setFillColor(255, 248, 225);  // Cor de fundo amarelo claro
  doc.rect(10, 10, 190, 15, 'F');
  doc.setTextColor(150, 100, 0);  // Texto amarelo escuro
  doc.setFontSize(8);
  doc.text('CERTIFICADO SIMULADO - Este é um documento de demonstração e não representa uma validação real', 105, 17, { align: 'center' });
  
  // Cabeçalho
  doc.setFillColor(31, 78, 121);
  doc.rect(0, 30, 210, 40, 'F');
  
  doc.setTextColor(255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('CERTIFICADO DE VALIDAÇÃO', 105, 55, { align: 'center' });
  
  // Logo ou Emblema
  doc.setFillColor(230, 230, 230);
  doc.circle(105, 100, 25, 'F');
  doc.setTextColor(31, 78, 121);
  doc.setFontSize(42);
  doc.setFont('helvetica', 'bold');
  doc.text('CG', 105, 100 + 15, { align: 'center' });
  
  // Título
  doc.setTextColor(31, 78, 121);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('CODE GUARDIAN', 105, 140, { align: 'center' });
  
  // Texto do certificado
  doc.setTextColor(0);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  const certText = `Este documento certifica que a aplicação Java submetida
à análise foi validada pelo sistema Code Guardian e obteve
os seguintes resultados:`;
  
  doc.text(certText, 105, 160, { align: 'center' });
  
  // Detalhes
  doc.setFontSize(12);
  const detailsY = 185;
  
  doc.setFont('helvetica', 'bold');
  doc.text('Data da validação:', 55, detailsY);
  doc.text('Taxa de aprovação:', 55, detailsY + 10);
  doc.text('Total de testes realizados:', 55, detailsY + 20);
  doc.text('Total de testes aprovados:', 55, detailsY + 30);
  
  doc.setFont('helvetica', 'normal');
  doc.text(dateStr, 155, detailsY, { align: 'right' });
  doc.text(`${passRate}%`, 155, detailsY + 10, { align: 'right' });
  doc.text(`${totalTests}`, 155, detailsY + 20, { align: 'right' });
  doc.text(`${passedTests}`, 155, detailsY + 30, { align: 'right' });
  
  // Resultado
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('RESULTADO:', 105, detailsY + 50, { align: 'center' });
  
  doc.setFontSize(16);
  if (passRate === 100) {
    doc.setTextColor(0, 128, 0); // Verde escuro
    doc.text('APROVADO INTEGRALMENTE', 105, detailsY + 60, { align: 'center' });
  } else if (passRate >= 80) {
    doc.setTextColor(180, 130, 0); // Amarelo escuro
    doc.text('APROVADO COM RESSALVAS', 105, detailsY + 60, { align: 'center' });
  } else {
    doc.setTextColor(180, 0, 0); // Vermelho escuro
    doc.text('NECESSITA REVISÃO', 105, detailsY + 60, { align: 'center' });
  }
  
  // Descrição do resultado
  doc.setFontSize(11);
  doc.setTextColor(0);
  doc.setFont('helvetica', 'normal');
  
  let resultText = '';
  if (passRate === 100) {
    resultText = `A aplicação implementa técnicas de obfuscação eficazes e mantém sua funcionalidade
conforme esperado. Este certificado é válido como comprovação de que a aplicação
está protegida contra engenharia reversa e cumpre as boas práticas de mercado.`;
  } else if (passRate >= 80) {
    resultText = `A aplicação implementa a maioria das técnicas de obfuscação esperadas e mantém
sua funcionalidade. Recomenda-se atenção aos pontos de atenção destacados no
relatório detalhado antes da implantação em ambiente de produção.`;
  } else {
    resultText = `A aplicação apresenta deficiências significativas na implementação das técnicas
de obfuscação. Recomenda-se a revisão dos pontos indicados no relatório detalhado
antes de prosseguir com a implantação.`;
  }
  
  doc.text(resultText, 105, detailsY + 75, { align: 'center' });
  
  // Rodapé
  // Linha de assinatura
  doc.setDrawColor(100);
  doc.line(65, 240, 145, 240);
  doc.setFontSize(10);
  doc.text('Sistema de Validação Code Guardian', 105, 250, { align: 'center' });
  
  // ID do certificado
  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text(`ID do Certificado: ${certId}`, 105, 260, { align: 'center' });
  doc.text(`Válido por 90 dias a partir de ${dateStr}`, 105, 265, { align: 'center' });
  
  // Marca d'água
  doc.setTextColor(240, 240, 240);
  doc.setFontSize(60);
  doc.setFont('helvetica', 'bold');
  doc.text('CODE GUARDIAN', 105, 160, { align: 'center', angle: 45 });
  
  return doc.output('blob');
};

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getTestDescription(testId: string): string {
  if (testId === 'file-analysis') {
    return 'Análise estrutural do arquivo JAR para verificar sua integridade e validade.';
  } else if (testId === 'class-obfuscation') {
    return testDescriptions.obfuscation.classNameObfuscation;
  } else if (testId === 'string-encryption') {
    return testDescriptions.obfuscation.stringEncryption;
  } else if (testId === 'control-flow') {
    return testDescriptions.obfuscation.controlFlowObfuscation;
  } else if (testId === 'watermark') {
    return testDescriptions.obfuscation.watermarkCheck;
  } else if (testId === 'functional-test') {
    return testDescriptions.functional.general;
  } else if (testId === 'license-verification') {
    return testDescriptions.functional.licenseCheck;
  } else if (testId === 'app-startup') {
    return 'Verifica se a aplicação inicia corretamente após a obfuscação.';
  } else if (testId === 'decompilation') {
    return testDescriptions.security.decompilationProtection;
  } else if (testId === 'anti-debug') {
    return testDescriptions.security.antiDebug;
  }
  return 'Verificação da implementação de técnicas de proteção de código.';
}
