
import { useState } from 'react';
import { TestConfig } from '@/components/TestConfigForm';
import { TestResult } from '@/components/ValidationProgress';
import { runValidation } from '@/lib/validationService';
import { useToast } from '@/components/ui/use-toast';

export const useValidation = () => {
  const { toast } = useToast();
  const [isValidating, setIsValidating] = useState(false);
  const [validationComplete, setValidationComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<TestResult[]>([]);

  const startValidation = async (
    selectedFile: File | null,
    testConfig: TestConfig | null
  ) => {
    if (!selectedFile || !testConfig) return false;
    
    toast({
      title: "Análise iniciada",
      description: "Iniciando análise estática do arquivo JAR.",
    });
    
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
        title: "Análise concluída",
        description: "A análise estática do arquivo JAR foi finalizada.",
      });
      return true;
    } catch (error) {
      console.error("Erro na análise:", error);
      toast({
        title: "Erro na análise",
        description: "Ocorreu um erro durante o processo de análise.",
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
  };

  return {
    isValidating,
    validationComplete,
    currentStep,
    progress,
    results,
    startValidation,
    resetValidation
  };
};
