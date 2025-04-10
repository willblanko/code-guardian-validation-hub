
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
      return true;
    } catch (error) {
      console.error("Validation error:", error);
      toast({
        title: "Erro de validação",
        description: "Ocorreu um erro durante o processo de validação.",
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
