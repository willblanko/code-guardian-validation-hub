
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Settings, Shield, Code, Activity } from 'lucide-react';

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
    enabled: true,
    customTestCommand: "",
    timeoutSeconds: 60,
  },
  securityTests: {
    enabled: true,
    decompilationProtection: true,
    antiDebug: true,
  },
};

const TestConfigForm: React.FC<TestConfigFormProps> = ({ onConfigChange }) => {
  const [config, setConfig] = useState<TestConfig>(defaultConfig);

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
      <Accordion type="single" collapsible defaultValue="obfuscation" className="w-full">
        <AccordionItem value="obfuscation">
          <AccordionTrigger className="flex items-center">
            <div className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-guardian-blue" />
              <span>Testes de Obfuscação</span>
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

        <AccordionItem value="functional">
          <AccordionTrigger>
            <div className="flex items-center">
              <Code className="mr-2 h-5 w-5 text-guardian-green" />
              <span>Testes Funcionais</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="functionalEnabled" 
                      checked={config.functionalTests.enabled}
                      onCheckedChange={(checked) => 
                        handleConfigChange('functionalTests', 'enabled', Boolean(checked))
                      }
                    />
                    <Label htmlFor="functionalEnabled">Habilitar testes funcionais</Label>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="customTestCommand">Comando de teste personalizado (opcional)</Label>
                    <Input 
                      id="customTestCommand" 
                      placeholder="Ex: java -jar myapp.jar test" 
                      value={config.functionalTests.customTestCommand}
                      onChange={(e) => 
                        handleConfigChange('functionalTests', 'customTestCommand', e.target.value)
                      }
                      disabled={!config.functionalTests.enabled}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timeoutSeconds">Tempo limite de execução (segundos)</Label>
                    <Input 
                      id="timeoutSeconds" 
                      type="number" 
                      min="1" 
                      max="300"
                      value={config.functionalTests.timeoutSeconds}
                      onChange={(e) => 
                        handleConfigChange('functionalTests', 'timeoutSeconds', parseInt(e.target.value) || 60)
                      }
                      disabled={!config.functionalTests.enabled}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="security">
          <AccordionTrigger>
            <div className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-guardian-teal" />
              <span>Testes de Segurança</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="securityEnabled" 
                      checked={config.securityTests.enabled}
                      onCheckedChange={(checked) => 
                        handleConfigChange('securityTests', 'enabled', Boolean(checked))
                      }
                    />
                    <Label htmlFor="securityEnabled">Habilitar testes de segurança</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="decompilationProtection" 
                      checked={config.securityTests.decompilationProtection}
                      onCheckedChange={(checked) => 
                        handleConfigChange('securityTests', 'decompilationProtection', Boolean(checked))
                      }
                      disabled={!config.securityTests.enabled}
                    />
                    <Label htmlFor="decompilationProtection">Verificar proteção contra descompilação</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="antiDebug" 
                      checked={config.securityTests.antiDebug}
                      onCheckedChange={(checked) => 
                        handleConfigChange('securityTests', 'antiDebug', Boolean(checked))
                      }
                      disabled={!config.securityTests.enabled}
                    />
                    <Label htmlFor="antiDebug">Verificar proteções anti-debug</Label>
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
