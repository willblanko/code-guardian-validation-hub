
import React, { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Info } from 'lucide-react';

export interface TestConfig {
  obfuscationTests: {
    classNameObfuscation: boolean;
    stringEncryption: boolean;
    controlFlowObfuscation: boolean;
    watermarkCheck: boolean;
  };
  functionalTests: {
    enabled: boolean;
    customTestCommand: string;
    timeoutSeconds: number;
  };
  securityTests: {
    enabled: boolean;
    decompilationProtection: boolean;
    antiDebug: boolean;
  };
}

interface TestConfigFormProps {
  onConfigChange: (config: TestConfig) => void;
}

const defaultConfig: TestConfig = {
  obfuscationTests: {
    classNameObfuscation: true,
    stringEncryption: true,
    controlFlowObfuscation: true,
    watermarkCheck: false,
  },
  functionalTests: {
    enabled: false,
    customTestCommand: "",
    timeoutSeconds: 60,
  },
  securityTests: {
    enabled: false,
    decompilationProtection: false,
    antiDebug: false,
  },
};

const TestConfigForm: React.FC<TestConfigFormProps> = ({ onConfigChange }) => {
  const [config, setConfig] = useState<TestConfig>(defaultConfig);

  // Initialize with default config on mount
  useEffect(() => {
    onConfigChange(defaultConfig);
  }, [onConfigChange]);

  const handleConfigChange = <T extends keyof TestConfig, K extends keyof TestConfig[T]>(
    section: T,
    field: K,
    value: TestConfig[T][K]
  ) => {
    const newConfig = {
      ...config,
      [section]: {
        ...config[section],
        [field]: value,
      },
    };
    setConfig(newConfig);
    onConfigChange(newConfig);
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-md mb-6">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
          <div>
            <p className="text-blue-800 text-sm">
              Esta ferramenta realiza análise estática básica do arquivo JAR e fornece orientações sobre como 
              verificar a obfuscação usando ferramentas especializadas. A execução real dos testes de obfuscação 
              requer software local.
            </p>
          </div>
        </div>
      </div>

      <Accordion type="single" collapsible defaultValue="obfuscation" className="w-full">
        <AccordionItem value="obfuscation">
          <AccordionTrigger className="flex items-center">
            <div className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-guardian-blue" />
              <span>Análise de Obfuscação</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="classNameObfuscation" 
                      checked={config.obfuscationTests.classNameObfuscation}
                      onCheckedChange={(checked) => 
                        handleConfigChange('obfuscationTests', 'classNameObfuscation', Boolean(checked))
                      }
                    />
                    <Label htmlFor="classNameObfuscation">Verificar obfuscação de nomes de classes</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="stringEncryption" 
                      checked={config.obfuscationTests.stringEncryption}
                      onCheckedChange={(checked) => 
                        handleConfigChange('obfuscationTests', 'stringEncryption', Boolean(checked))
                      }
                    />
                    <Label htmlFor="stringEncryption">Verificar criptografia de strings</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="controlFlowObfuscation" 
                      checked={config.obfuscationTests.controlFlowObfuscation}
                      onCheckedChange={(checked) => 
                        handleConfigChange('obfuscationTests', 'controlFlowObfuscation', Boolean(checked))
                      }
                    />
                    <Label htmlFor="controlFlowObfuscation">Verificar obfuscação de fluxo de controle</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="watermarkCheck" 
                      checked={config.obfuscationTests.watermarkCheck}
                      onCheckedChange={(checked) => 
                        handleConfigChange('obfuscationTests', 'watermarkCheck', Boolean(checked))
                      }
                    />
                    <Label htmlFor="watermarkCheck">Verificar marca d'água digital</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default TestConfigForm;
