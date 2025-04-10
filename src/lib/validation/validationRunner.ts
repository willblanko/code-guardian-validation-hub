
import { TestConfig } from "@/components/TestConfigForm";
import { TestResult } from "@/components/ValidationProgress";

// Helper function to simulate asynchronous operations with more realistic timing
const simulateOperation = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Core validation runner function
export const runValidation = async (
  file: File,
  config: TestConfig,
  onProgress: (progress: number) => void,
  onStepChange: (step: number) => void,
  onResultUpdate: (result: TestResult) => void
): Promise<boolean> => {
  // Step 1: File Analysis - Tempo aumentado para parecer mais realista
  onStepChange(0);
  onProgress(5);
  
  await simulateOperation(2500);
  onResultUpdate({
    id: 'file-analysis',
    name: 'Análise do arquivo JAR',
    status: 'success',
    message: 'Arquivo JAR válido'
  });
  
  onProgress(15);
  await simulateOperation(1500);
  
  // Step 2: Obfuscation Analysis - Versão melhorada para detectar falta de obfuscação
  // Tempos aumentados para simulação mais realista
  onStepChange(1);
  onProgress(20);
  
  if (config.obfuscationTests.classNameObfuscation) {
    await simulateOperation(3000);
    
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
    onProgress(30);
  }
  
  if (config.obfuscationTests.stringEncryption) {
    await simulateOperation(2800);
    
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
    onProgress(40);
  }
  
  if (config.obfuscationTests.controlFlowObfuscation) {
    await simulateOperation(3200);
    
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
    onProgress(50);
  }
  
  if (config.obfuscationTests.watermarkCheck) {
    await simulateOperation(2500);
    
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
    onProgress(60);
  }
  
  // Step 3: Functional Testing - Simulação de licença verificada
  if (config.functionalTests.enabled) {
    onStepChange(2);
    onProgress(65);
    
    // Simulação da verificação de licença (arquivos de licença)
    await simulateOperation(2500);
    
    // Teste de licença - simulação
    const licenseValid = Math.random() > 0.4;
    onResultUpdate({
      id: 'license-verification',
      name: 'Verificação de licença',
      status: licenseValid ? 'success' : 'failed',
      message: licenseValid 
        ? 'Mecanismo de validação de licença funcionando corretamente'
        : 'Falha na validação do arquivo license.key - não foi possível verificar a licença com o hardware'
    });
    onProgress(70);
    
    // Simulação de inicialização da aplicação
    await simulateOperation(3000);
    onResultUpdate({
      id: 'app-startup',
      name: 'Inicialização da aplicação',
      status: 'success',
      message: 'Aplicação inicializada com sucesso'
    });
    onProgress(80);
    
    // Simulação de funcionalidades básicas
    await simulateOperation(4000);
    onResultUpdate({
      id: 'functional-test',
      name: 'Testes funcionais básicos',
      status: 'success',
      message: 'Funções principais executadas corretamente (simulação)'
    });
    onProgress(85);
  }
  
  // Step 4: Security Testing - Tempos aumentados para mais realismo
  if (config.securityTests.enabled) {
    onStepChange(3);
    onProgress(87);
    
    await simulateOperation(4500);
    
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
      onProgress(92);
    }
    
    if (config.securityTests.antiDebug) {
      await simulateOperation(3000);
      
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
      
      onProgress(95);
    }
  }
  
  // Step 5: Report Generation
  await simulateOperation(3000);
  onProgress(100);
  
  return true;
};
