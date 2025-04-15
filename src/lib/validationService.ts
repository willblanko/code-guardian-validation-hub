
// This file acts as a re-export facade for the validation services
// which have been reorganized into separate modules

import { runValidation } from "./validation/validationRunner";
import { 
  generateReport,
  generateCertificate,
  generateAndDownloadPDF,
  generateAndDownloadCertificate,
  downloadTextFile 
} from "./validation/reportGenerator";
import { saveTestResults } from "./validation/databaseService";
import { ValidationFiles } from "@/hooks/useValidation";

// Nova função para comparar os JARs
export const compareJars = async (
  originalJar: File,
  obfuscatedJar: File,
  mappingFile: File | undefined,
  onProgress: (progress: number) => void
): Promise<{
  differences: number;
  matches: number;
  unmappedClasses: string[];
  decompileUrl?: string;
}> => {
  // Simular processamento
  await new Promise(resolve => setTimeout(resolve, 2000));
  onProgress(20);
  
  // No ambiente web, não podemos descompilar diretamente
  // Portanto, vamos criar uma URL para o serviço javadecompilers.com
  let decompileUrl: string | undefined;
  
  // Gerar uma URL para o serviço online de descompilação
  if (originalJar && obfuscatedJar) {
    decompileUrl = `http://www.javadecompilers.com/`;
    
    // Simulação de análise do mapeamento
    await new Promise(resolve => setTimeout(resolve, 1500));
    onProgress(60);
    
    // Simulamos resultados baseados nos nomes dos arquivos
    // Em uma implementação real, isso viria da análise real dos JARs
    const differences = Math.floor(Math.random() * 50) + 30; // 30-80 diferenças
    const matches = Math.floor(Math.random() * 100) + 200; // 200-300 correspondências
    
    // Gerar algumas classes não mapeadas simuladas
    const unmappedClasses = [];
    if (!mappingFile) {
      unmappedClasses.push(
        'com.example.helper.ConfigLoader',
        'com.example.util.StringHelper',
        'com.example.model.UserData'
      );
    } else {
      // Se tiver mapping file, simular algumas poucas classes não mapeadas
      if (Math.random() > 0.7) {
        unmappedClasses.push('com.example.internal.Logger');
      }
    }
    
    onProgress(100);
    
    return {
      differences,
      matches,
      unmappedClasses,
      decompileUrl
    };
  }
  
  // Fallback
  return {
    differences: 0,
    matches: 0,
    unmappedClasses: [],
    decompileUrl
  };
};

export {
  runValidation,
  generateReport,
  generateCertificate,
  generateAndDownloadPDF,
  generateAndDownloadCertificate,
  downloadTextFile,
  saveTestResults
};
