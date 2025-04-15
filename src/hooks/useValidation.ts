
import { useState } from 'react';
import { TestConfig } from '@/components/TestConfigForm';
import { TestResult } from '@/components/ValidationProgress';
import { runValidation, compareJars } from '@/lib/validationService';
import { useToast } from '@/components/ui/use-toast';

export interface ValidationFiles {
  originalJar?: File;
  obfuscatedJar?: File;
  mappingFile?: File;
}

export const useValidation = () => {
  const { toast } = useToast();
  const [isValidating, setIsValidating] = useState(false);
  const [validationComplete, setValidationComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<TestResult[]>([]);
  const [comparisonResults, setComparisonResults] = useState<{
    differences: number;
    matches: number;
    unmappedClasses: string[];
    diffDetails?: Array<{
      className: string;
      type: string;
      original?: string;
      obfuscated?: string;
    }>;
    decompileUrl?: string;
  } | null>(null);

  const startValidation = async (
    files: ValidationFiles,
    testConfig: TestConfig | null
  ) => {
    if (!files.obfuscatedJar || !testConfig) return false;
    
    toast({
      title: "Análise iniciada",
      description: "Iniciando análise detalhada dos arquivos JAR.",
    });
    
    setIsValidating(true);
    setProgress(0);
    setCurrentStep(0);
    setResults([]);
    setComparisonResults(null);
    
    try {
      // Primeira etapa: análise estática básica
      await runValidation(
        files.obfuscatedJar,
        testConfig,
        (p) => setProgress(p * 0.5), // 50% para a primeira etapa
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
      
      // Segunda etapa: comparação de JARs (se disponível)
      if (files.originalJar && files.obfuscatedJar) {
        setCurrentStep(4); // Avançar para o próximo passo
        
        // Comparar os JARs e obter resultados
        const comparison = await compareJars(
          files.originalJar,
          files.obfuscatedJar,
          files.mappingFile,
          (p) => setProgress(50 + p * 0.5) // 50-100% para a segunda etapa
        );
        
        setComparisonResults(comparison);
        
        // Adicionar resultados de comparação
        setResults(prev => [
          ...prev,
          {
            id: 'jar-comparison',
            name: 'Comparação de JARs',
            status: 'success',
            message: `Análise comparativa concluída: ${comparison.differences} diferenças encontradas entre os arquivos`
          },
          {
            id: 'mapping-analysis',
            name: 'Análise de mapeamento',
            status: comparison.unmappedClasses.length > 0 ? 'warning' : 'success',
            message: comparison.unmappedClasses.length > 0 
              ? `${comparison.unmappedClasses.length} classes não mapeadas encontradas` 
              : 'Todas as classes estão corretamente mapeadas'
          }
        ]);
      }
      
      setValidationComplete(true);
      toast({
        title: "Análise concluída",
        description: "A análise comparativa dos arquivos JAR foi finalizada com sucesso.",
      });
      return true;
    } catch (error) {
      console.error("Erro na análise:", error);
      toast({
        title: "Erro na análise",
        description: "Ocorreu um erro durante o processo de análise dos arquivos.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  const resetValidation = () => {
    setValidationComplete(false);
    setResults([]);
    setProgress(0);
    setCurrentStep(0);
    setComparisonResults(null);
  };

  return {
    isValidating,
    validationComplete,
    currentStep,
    progress,
    results,
    comparisonResults,
    startValidation,
    resetValidation
  };
};
